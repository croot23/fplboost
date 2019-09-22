package com.josephcroot.fantasyfootballAPI;

import java.io.IOException;

import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

public class TeamsAPIData {
	
	public static JSONObject getTeamInfo(int team) throws JSONException, IOException {
		return FantasyFootballAPI.getJSONObject("entry/" + Integer.toString(team) + "/", null);
	}

	public static JSONObject getTeamHits(int team) throws JSONException, IOException {
		return FantasyFootballAPI.getJSONObject("entry/" + Integer.toString(team) + "/event/" + GameweekData.getGameweek() + "/picks/", "entry_history");
	}

	public static JSONArray getTeamPlayers(int team) throws JSONException, IOException {
		return FantasyFootballAPI.getJSONArrayFromJSONObject("entry/" + Integer.toString(team) + "/event/" + GameweekData.getGameweek() + "/picks/",
				null, "picks");
	}

	public static JSONArray getTeamChipsInfo(int team) throws JSONException, IOException {
		return FantasyFootballAPI.getJSONArrayFromJSONObject("entry/" + Integer.toString(team) + "/history/", null, "chips");
	}

	public static JSONArray getTransfers(int team) throws JSONException, IOException {
		return FantasyFootballAPI.getJSONArray("https://fantasy.premierleague.com/api/" + "entry/" + Integer.toString(team) + "/transfers/");
	}

	public static JSONArray getTeamPoints(int team) throws JSONException, IOException {
		return FantasyFootballAPI.getJSONArrayFromJSONObject("entry/" + Integer.toString(team) + "/history/", null, "current");
	}

}
