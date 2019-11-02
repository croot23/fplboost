package com.josephcroot.service;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.josephcroot.entity.Player;
import com.josephcroot.fantasyfootballAPI.PlayersAPIData;
import com.josephcroot.repository.PlayerRepository;

@Component
@Service
public class PlayerServiceImpl implements PlayerService {

	@Autowired
	private PlayerRepository PlayerRepository;
	
	@Transactional
	@Scheduled(fixedDelay = 60000)
	public void scheduleFixedDelayTask() throws JSONException, IOException {
		try {
			updatePlayerInfo();
		} catch (JSONException e) {
		}
	}

	@Transactional
	@Override
	public void updatePlayerInfo() throws JSONException, IOException {

		List<Integer> result = new ArrayList<Integer>(PlayerRepository.getallPlayerIds());
		for (int playerId : result) {
			Player updatedPlayer = PlayerRepository.findById(playerId).orElse(null);
			updatePlayer(updatedPlayer);
			PlayerRepository.save(updatedPlayer);
		}
	}

	@Transactional
	@Override
	public Player getPlayer(int playerId) throws JSONException, IOException {
		Player dbPlayer = PlayerRepository.findById(playerId).orElse(null);
		if (dbPlayer != null) {
			return dbPlayer;
		} else {
			Player tmpPlayer = new Player();
			tmpPlayer.setFantasyFootballId(playerId);
			updatePlayer(tmpPlayer);
			PlayerRepository.save(tmpPlayer);
			return tmpPlayer;
		}
	}

	public void updatePlayer(Player player) throws JSONException, IOException {
		JSONObject playerInfo = PlayersAPIData.getPlayer(player.getFantasyFootballId());
		player.setFirstName(playerInfo.getString("first_name"));
		player.setLastName(playerInfo.getString("second_name"));
		player.setForm(playerInfo.getDouble("form"));
		player.setTotalPoints(playerInfo.getInt("total_points"));
		player.setPrice(playerInfo.getDouble("now_cost") / 10);
		player.setGameweekPoints(playerInfo.getInt("event_points"));
		player.setPointsPerGame(playerInfo.getDouble("points_per_game"));
		player.setPosition(playerInfo.getInt("element_type"));
		player.setWebName(playerInfo.getString("web_name"));
		player.setTeam(playerInfo.getInt("team_code"));
		updatePlayersGameweek(player);
	}
	
	public void updatePlayersGameweek(Player player) throws JSONException, IOException {
		JSONArray playerGameweekInfo = PlayersAPIData.getPlayerGameweekInfo(player.getFantasyFootballId());
		int lastObjectInArray = playerGameweekInfo.length() - 1;
		JSONObject playerGameweekDetails = (JSONObject) playerGameweekInfo.getJSONObject(lastObjectInArray);
		player.setDidNotPlay(didNotPlay(playerGameweekDetails));
		player.setMinutesPlayed(Integer.parseInt(playerGameweekDetails.get("minutes").toString()));
		player.setGoalsScored(Integer.parseInt(playerGameweekDetails.get("goals_scored").toString()));
		player.setAssists(Integer.parseInt(playerGameweekDetails.get("assists").toString()));
		player.setCleanSheet(Integer.parseInt(playerGameweekDetails.get("clean_sheets").toString()) == 1 ? true : false);
		player.setBonusPoints(Integer.parseInt(playerGameweekDetails.get("bonus").toString()));
	}
	
	static SimpleDateFormat fantasyFootballDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");

	public static boolean didNotPlay(JSONObject playerGameweekDetails) throws JSONException, IOException {
		Date now = new Date();
		try {
			Date kickoff = fantasyFootballDateFormat.parse(playerGameweekDetails.get("kickoff_time").toString());
			if ((now.getTime() - kickoff.getTime()) > 7200000 && playerGameweekDetails.getInt("minutes") == 0) {
				return true;
				}
			} catch (ParseException e) {
		}
		return false;
	}

	@Override
	@Transactional
	public void deletePlayer(int playerId) {
		PlayerRepository.deleteById(playerId);
	}

}
