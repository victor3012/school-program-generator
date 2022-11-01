package me.victor.startup;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
@EntityScan("me.victor.data.entities")
@EnableJpaRepositories(basePackages = "me.victor.data.dao")
@ComponentScan("me.victor")
public class ConsoleRunner implements CommandLineRunner {
    @Override
    public void run(String... strings) {
        //TODO (possibly run the front-end)
    }
}
