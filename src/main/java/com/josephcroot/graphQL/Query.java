package com.josephcroot.graphQL;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.josephcroot.entity.League;
import com.josephcroot.entity.Player;
import com.josephcroot.fantasyfootballAPI.GameweekData;
import com.josephcroot.repository.LeagueRepository;
import com.josephcroot.repository.PlayerRepository;

@Component
public class Query implements GraphQLQueryResolver {

	@Autowired
	private LeagueRepository LeagueRepository;

	@Autowired
	private PlayerRepository PlayerRepository;

	public Optional<League> leagueById(int id) {
		return LeagueRepository.findById(id);
	}

	public Optional<Player> playerById(int id) {
		return PlayerRepository.findById(id);
	}
	
	public int gameweek() throws JSONException, IOException {
		return GameweekData.getGameweek();
	}
	
	public List<League> getAllLeagues() {
		return (List<League>) LeagueRepository.findAll();
	}

}

