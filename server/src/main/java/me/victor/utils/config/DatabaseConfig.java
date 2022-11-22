package me.victor.utils.config;

public class DatabaseConfig extends JsonConfig {
    public DatabaseConfig() {
        super("database");
    }

    public String getDriver() {
        return get("driverClassName");
    }

    public String getJDBCUrl() {
        return get("jdbcUrl");
    }

    public String getUsername() {
        return get("username");
    }

    public String getPassword() {
        return get("password");
    }
}
