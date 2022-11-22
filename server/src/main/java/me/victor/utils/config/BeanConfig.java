package me.victor.utils.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {
    @Bean
    public DatabaseConfig databaseConfig() {
        return new DatabaseConfig();
    }
}
