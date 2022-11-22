package me.victor.utils.config;

public interface Config {
    String getValue(String key);
    String[] getValues(String key);
}
