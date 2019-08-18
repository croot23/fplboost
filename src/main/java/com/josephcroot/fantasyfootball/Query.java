package com.josephcroot.fantasyfootball;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.josephcroot.entity.League;
import com.josephcroot.repository.LeagueRepository;

@Component
public class Query implements GraphQLQueryResolver {
	
	@Autowired
	private LeagueRepository LeagueRepository;
	
	public Optional<League> leagueById(int id) {
        return LeagueRepository.findById(id);
    }

}
