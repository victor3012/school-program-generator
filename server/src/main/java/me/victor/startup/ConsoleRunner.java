package me.victor.startup;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Component;

@Component
@EntityScan("me.victor.data.entities")
@EnableJpaRepositories(basePackages = "me.victor.data.repositories")
@ComponentScan("me.victor")
public class ConsoleRunner implements CommandLineRunner {
    @Override
    public void run(String... strings) {
        //TODO (possibly run the front-end)
    }
}
