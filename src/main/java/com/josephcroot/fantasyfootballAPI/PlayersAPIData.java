package com.josephcroot.fantasyfootballAPI;

import java.io.IOException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.scheduling.annotation.Scheduled;

public class PlayersAPIData {
	
	private static JSONObject playerInfo;
	
	private static final Logger logger = LogManager.getLogger(PlayersAPIData	.class);
	
	/* Scehdule to update player JSONObject */
	@Scheduled(fixedDelay = 300000)
	public void updatePlayers() throws JSONException, IOException {
		logger.info("Updating All Player Info");
		playerInfo = updatePlayerInfo();
	}

	/* Method to update the player JSONObject */
	public static JSONObject updatePlayerInfo() throws JSONException, IOException {
		return FantasyFootballAPI.getJSONObject("bootstrap-static/", null);
	}
	
	public static JSONObject getPlayer(int id) throws JSONException, IOException {
		JSONObject json = getPlayerInfo();
		JSONArray arr = json.getJSONArray("elements");
		for (int j = 0; j < arr.length(); j++) {
			JSONObject currentPlayer = arr.getJSONObject(j);
			if (currentPlayer.getInt("id") == id) {
				return currentPlayer;
			}
		}
		return null;
	}

	public static JSONArray getPlayerGameweekInfo(int id) throws JSONException, IOException {
		return FantasyFootballAPI.getJSONArrayFromJSONObject("element-summary/" + id+"/", null, "history");
	}

	public static JSONObject getPlayerInfo() throws JSONException, IOException {
		if (playerInfo == null)
			playerInfo = FantasyFootballAPI.getJSONObject("bootstrap-static/", null);
		return playerInfo;
	}
}
