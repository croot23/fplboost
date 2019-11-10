package com.josephcroot.fantasyfootballAPI;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.nio.charset.Charset;

import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

public class FantasyFootballAPI {
	
	/*
	* API retrieval
	* Generic methods to retrieve data from the fantasy.premierleague.com API 
	*/

	/* Generic method to get JSON Object from fantasy API */
	public static JSONObject getJSONObject(String url, String object) throws IOException, JSONException {
		InputStream is = new URL("https://fantasy.premierleague.com/api/" + url).openStream();
		try {
			BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
			String jsonText = readAll(rd);
			JSONObject json = new JSONObject(jsonText);
			if (object != null && !object.equals(""))
				json = json.getJSONObject(object);
			return json;
		} finally {
			is.close();
		}
	}

	/* Generic method to get JSONArray from fantasy API */
	public static JSONArray getJSONArray(String url) throws JSONException, IOException {
		InputStream is = new URL(url).openStream();
		try {
			BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
			String jsonText = readAll(rd);
			JSONArray json = new JSONArray(jsonText);
			return json;
		} finally {
			is.close();
		}
	}

	 /* Generic method to get a JSONArray from a JSONObject retrieved from fantasy API */
	public static JSONArray getJSONArrayFromJSONObject(String url, String object, String array)
			throws IOException, JSONException {
		JSONObject jsonO = getJSONObject(url, object);
		return jsonO.getJSONArray(array);
	}

	/* Read the JSON from the API */
	private static String readAll(Reader rd) throws IOException {
		StringBuilder sb = new StringBuilder();
		int cp;
		while ((cp = rd.read()) != -1) {
			sb.append((char) cp);
		}
		return sb.toString();
	}
}
