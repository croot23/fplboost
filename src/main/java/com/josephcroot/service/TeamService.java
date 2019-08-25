package com.josephcroot.service;

import java.io.IOException;

import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.stereotype.Service;

import com.josephcroot.entity.Team;

@Service
public interface TeamService {

	public Team getTeam(int teamId) throws JSONException, IOException;

	public void deleteTeam(int teamId);

	public void updateTeamInfo() throws JSONException, IOException;

	public void scheduleFixedDelayTask() throws JSONException, IOException;
	
}
