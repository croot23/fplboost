package com.josephcroot.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.josephcroot.entity.HistoricGameweekData;
import com.josephcroot.repository.GameweekDataRepository;

@Service
public class GameweekDataServiceImpl implements GameweekDataService {

	@Autowired
	private GameweekDataRepository GameweekDataRepository;
	
	@Transactional
	@Override
	public HistoricGameweekData getGameweekData(int fantasyFootballId, int gameweek) throws JSONException, IOException {
		int id = Integer.valueOf(fantasyFootballId+""+gameweek);
		HistoricGameweekData dbGameweek = GameweekDataRepository.findById(id).orElse(null);
		if (dbGameweek != null) {
			return dbGameweek;
		} else {
			HistoricGameweekData tmpGameweek = new HistoricGameweekData();
			tmpGameweek.setId(id);
			//updateGameweekData(tmpGameweek);
			GameweekDataRepository.save(tmpGameweek);
			return dbGameweek;
		}
	}

	@Override
	public void updateGameweekDataInfo() throws JSONException, IOException {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public void deleteGameweekData(int teamId) {
		// TODO Auto-generated method stub
		
	}

}
