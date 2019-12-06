package com.josephcroot.service;

import java.io.IOException;

import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.stereotype.Service;

import com.josephcroot.entity.HistoricGameweekData;

@Service
public interface GameweekDataService {

	public HistoricGameweekData getGameweekData(int fantasyFootballId, int gameweek) throws JSONException, IOException;
	
	public void updateGameweekDataInfo() throws JSONException, IOException;

	public void deleteGameweekData(int teamId);

}
