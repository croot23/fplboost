package com.josephcroot.fplboost;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;


@EnableScheduling
@EnableJpaRepositories(basePackages = "com.josephcroot.*")
@EntityScan(basePackages = "com.josephcroot.*")
@SpringBootApplication(scanBasePackages = "com.josephcroot.*")
public class FantasyFootballApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(FantasyFootballApplication.class, args);
	}
	
}
