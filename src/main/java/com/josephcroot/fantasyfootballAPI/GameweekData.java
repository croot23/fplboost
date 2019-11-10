package com.josephcroot.fantasyfootballAPI;

import java.io.IOException;

import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.scheduling.annotation.Scheduled;

public class GameweekData {
	
	private static int gameweek;
	
	/* Set gameweek from API */
	public static void setGameweek() throws JSONException, IOException {
		JSONArray gameweekInfo = FantasyFootballAPI.getJSONArrayFromJSONObject("bootstrap-static/",null,"events");
		for (int i = 0; i < gameweekInfo.length(); i++) {
			JSONObject current = gameweekInfo.getJSONObject(i);
			if (current.getBoolean("is_next") == true) {
				gameweek = current.getInt("id") - 1;
			}
		}
	}
	
	/* Get gameweek method */
	public static int getGameweek() throws JSONException, IOException {
		if (gameweek == 0)
			setGameweek();
		return gameweek;
	}
	
	/* Schedule to poll API and update the gameweek */
	@Scheduled(fixedDelay = 100000)
	public void updateGameweek() throws JSONException, IOException {
		setGameweek();
	}

}
