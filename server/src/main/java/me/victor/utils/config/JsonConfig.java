package me.victor.utils.config;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public abstract class JsonConfig implements Config {
    private final String fileName;
    private final JSONObject config;

    public JsonConfig(String fileName) {
        this.fileName = fileName;
        this.config = loadConfig(fileName);
    }

    @Override
    public String getValue(String key) {
        return get(key);
    }

    @Override
    public String[] getValues(String key) {
        JSONArray array = getArray(key);
        String[] values = new String[array.length()];

        for (int i = 0; i < array.length(); i++) {
            values[0] = array.optString(i, "NOT_SPECIFIED");
        }

        return values;
    }

    protected String get(String name) {
        String retrieved = config.optString(name);

        if (retrieved == null) {
            throwError(name);
        }

        return retrieved;
    }

    protected JSONObject getObject(String name) {
        JSONObject retrieved = config.optJSONObject(name);

        if (retrieved == null) {
            throwError(name);
        }

        return retrieved;
    }

    protected JSONArray getArray(String name) {
        JSONArray retrieved = config.optJSONArray(name);

        if (retrieved == null) {
            throwError(name);
        }

        return retrieved;
    }

    private JSONObject loadConfig(String fileName) {
        String developmentPath = String.format("src/main/resources/%s.json", fileName);
        String path = String.format("./%s.json", fileName);

        String fileContent;

        try {
            fileContent = readFile(path);
        } catch (IOException exception) {
            try {
                fileContent = readFile(developmentPath);
            } catch (IOException ex) {
                ex.printStackTrace();
                return null;
            }
        }

        try {
            return new JSONObject(fileContent);
        } catch (JSONException e) {
            throw new IllegalStateException("Could not load config file " + this.fileName);
        }
    }

    private String readFile(String path) throws IOException {
        BufferedReader br;

        br = new BufferedReader(new FileReader(path));

        StringBuilder text = new StringBuilder();

        String line = br.readLine();
        while (line != null) {
            text.append(line);
            text.append("\n");
            line = br.readLine();
        }

        return text.toString();
    }

    private void throwError(String name) {
        String error = "The application is unable to retrieve field %s from %s".formatted(name, this.fileName);
        throw new IllegalStateException(error);
    }
}
