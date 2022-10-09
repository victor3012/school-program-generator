package me.victor.startup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Collections;
import java.util.Properties;

@SpringBootApplication
public class RestServiceApplication {
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(ConsoleRunner.class);

        Properties properties = new Properties();

        properties.put("server.port", "8888");

        app.setDefaultProperties(properties);
        app.run(args);
    }
}

