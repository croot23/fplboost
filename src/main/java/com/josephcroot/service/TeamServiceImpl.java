package com.josephcroot.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.josephcroot.entity.HistoricGameweekData;
import com.josephcroot.entity.Player;
import com.josephcroot.entity.Team;
import com.josephcroot.fantasyfootballAPI.GameweekData;
import com.josephcroot.fantasyfootballAPI.TeamsAPIData;
import com.josephcroot.repository.TeamRepository;

@Service
public class TeamServiceImpl implements TeamService {
	
	private static final Logger logger = LogManager.getLogger(TeamServiceImpl.class);
	private static final Integer secondWildcardGameweek = 17;
	
	@Autowired
	private TeamRepository teamRepository;

	@Autowired
	private PlayerService playerService;

	@Override
	@Scheduled(fixedRate = 180000)
	public void scheduleFixedDelayTask() throws JSONException, IOException {
		logger.info("Updating Teams");
		updateTeamInfo();
	}

	@Override
	public void updateTeamInfo() throws JSONException, IOException {
		List<Integer> teamIds = new ArrayList<Integer>(teamRepository.getallTeamIds());
		for (int teamId : teamIds) {
			Team updatedTeam = teamRepository.findById(teamId).orElse(null);
			if (updatedTeam != null) {
				updateTeam(updatedTeam);
				teamRepository.save(updatedTeam);
			}
		}
	}

	@Override
	public Team getTeam(int teamId) throws JSONException, IOException {
		Team dbTeam = teamRepository.findById(teamId).orElse(null);
		if (dbTeam != null) {
			return dbTeam;
		} else {
			Team newTeam = new Team();
			newTeam.setFantasyFootballId(teamId);
			updateTeam(newTeam);
			teamRepository.save(newTeam);
			return newTeam;
		}
	}

	public void updateTeam(Team teamToUpdate) throws JSONException, IOException {
		try {
			// General team info
			JSONObject teamInfo = TeamsAPIData.getTeamInfo(teamToUpdate.getFantasyFootballId());
			teamToUpdate.setTeamName(teamInfo.getString("name"));
			teamToUpdate.setTeamValue(teamInfo.getDouble("last_deadline_value"));
			teamToUpdate.setBank(teamInfo.getDouble("last_deadline_bank"));
			teamToUpdate.setTotalTransfers(teamInfo.getInt("last_deadline_total_transfers"));
			teamToUpdate.setGameweekPoints(teamInfo.getInt("summary_event_points"));
			teamToUpdate.setOverallRank(teamInfo.getInt("summary_overall_rank"));
			teamToUpdate.setManagerName(
					teamInfo.getString("player_first_name") + " " + teamInfo.getString("player_last_name"));
			if (teamInfo.getString("summary_event_rank") != "null") {
				teamToUpdate.setGameweekRank(teamInfo.getInt("summary_event_rank"));
			}
			
			// Chips info
			JSONArray chipInfo = TeamsAPIData.getTeamChipsInfo(teamToUpdate.getFantasyFootballId());
			for (int i = 0; i < chipInfo.length(); i++) {
				JSONObject currentChip = chipInfo.getJSONObject(i);
				if (currentChip.getString("name").equals("freehit")) {
					teamToUpdate.setFreeHit(true);
					teamToUpdate.setFreeHitGameweek(currentChip.getInt("event"));
				}
				teamToUpdate.setWildcard(false);
				if (currentChip.getString("name").equals("wildcard")) {
					if ((GameweekData.getGameweek() < secondWildcardGameweek && currentChip.getInt("event") < secondWildcardGameweek) 
						|| GameweekData.getGameweek() >= secondWildcardGameweek && currentChip.getInt("event") >= secondWildcardGameweek) {
						teamToUpdate.setWildcard(true);
						teamToUpdate.setWildcardGameweek(currentChip.getInt("event"));
					}
				}
				if (currentChip.getString("name").equals("3xc")) {
					teamToUpdate.setTripleCaptain(true);
					teamToUpdate.setTripleCaptainGameweek(currentChip.getInt("event"));
				}
				if (currentChip.getString("name").equals("bboost")) {
					teamToUpdate.setBenchBoost(true);
					teamToUpdate.setBenchBoostGameweek(currentChip.getInt("event"));
				}
			}
			
			// Transfer Info
			Map<Player, Player> transfers = new HashMap<Player, Player>();
			JSONArray transfersJSON = TeamsAPIData.getTransfers(teamToUpdate.getFantasyFootballId());
			for (int i = 0; i < transfersJSON.length(); i++) {
				JSONObject currentTransfer = transfersJSON.getJSONObject(i);
				if (currentTransfer.getInt("event") == GameweekData.getGameweek()) {
					Player playerOut = playerService.getPlayer(currentTransfer.getInt("element_out"));
					Player playerIn = playerService.getPlayer(currentTransfer.getInt("element_in"));
					transfers.put(playerOut, playerIn);
				}
			}
			teamToUpdate.setWeeklyTransfers(transfers);
			
			// Transfer Hits Info
			int totalTransferHitsCost = 0;
			JSONArray gameweekHistoryJSON = TeamsAPIData.getTeamGameweekHistory(teamToUpdate.getFantasyFootballId());
			for (int i = 0; i < gameweekHistoryJSON.length(); i++) {
				JSONObject currentTransfer = gameweekHistoryJSON.getJSONObject(i);
				int gameweekHits = currentTransfer.getInt("event_transfers_cost");
				totalTransferHitsCost += gameweekHits;
				if (i == gameweekHistoryJSON.length()-1) {
					teamToUpdate.setGameweekTransferHits(gameweekHits);
				}
			}
			teamToUpdate.setTransferHits(totalTransferHitsCost);

			// T-1 Total Points (we add current live points to last weeks score for live totals)
			for (int i = 0; i < gameweekHistoryJSON.length(); i++) {
				if (i == gameweekHistoryJSON.length() - 2) {
					JSONObject lastGameweek = gameweekHistoryJSON.getJSONObject(i);
					teamToUpdate.setTotalPoints(lastGameweek.getInt("total_points"));
				}
				if (i == gameweekHistoryJSON.length() - 1) {
					JSONObject thisGameweek = gameweekHistoryJSON.getJSONObject(i);
					teamToUpdate.setTransfersThisGameweek(thisGameweek.getInt("event_transfers"));
				}
			}
			
			// Players info
			Set<Player> players = new LinkedHashSet<>();
			Set<Player> substitutes = new LinkedHashSet<>();
			JSONArray playersJSON = TeamsAPIData.getTeamPlayers(teamToUpdate.getFantasyFootballId());
			for (int i = 0; i < playersJSON.length(); i++) {
				// Create Player
				JSONObject currentPlayer = playersJSON.getJSONObject(i);
				Player player = playerService.getPlayer(currentPlayer.getInt("element"));
				if (currentPlayer.getBoolean("is_captain")) {
					teamToUpdate.setCaptain(player);
				}
				if (currentPlayer.getBoolean("is_vice_captain")) {
					teamToUpdate.setViceCaptain(player);
				}
				if (currentPlayer.getInt("position") < 12) {
					players.add(player);
				} else {
					substitutes.add(player);
				}
			}
			teamToUpdate.setPlayers(players);
			teamToUpdate.setSubstitutes(substitutes);
			
			/* Make automatic substitutes */
			AutomaticSubstitutions autoSub = new AutomaticSubstitutions();
			autoSub.calculateSubstitutions(teamToUpdate);
			
			/* Set Historic gameweek Info */
			Set<HistoricGameweekData> historicGameweek = new HashSet<HistoricGameweekData>();
			JSONArray gameweekArray = TeamsAPIData.getTeamGameweekHistory(teamToUpdate.getFantasyFootballId());
			for (int i = 0; i < gameweekArray.length()-1; i++) {
				JSONObject currentGameweek = gameweekArray.getJSONObject(i);
				HistoricGameweekData gameweek = new HistoricGameweekData();
				gameweek.setFantasyFootballId(teamToUpdate.getFantasyFootballId());
				gameweek.setGameweek(i+1);
				String id =  Integer.toString(teamToUpdate.getFantasyFootballId())+ Integer.toString(i+1).trim();
				gameweek.setId(Integer.parseInt(id));
				gameweek.setGameweekPoints(currentGameweek.getInt("points"));
				gameweek.setTotalPoints(currentGameweek.getInt("total_points"));
				gameweek.setGameweekRank(currentGameweek.getInt("rank"));
				gameweek.setOverallRank(currentGameweek.getInt("overall_rank"));
				gameweek.setTeamValue(currentGameweek.getInt("bank")+currentGameweek.getInt("value"));
				gameweek.setTransfersMade(currentGameweek.getInt("event_transfers"));
				gameweek.setHitsTaken(currentGameweek.getInt("event_transfers_cost"));
				gameweek.setPointsOnTheBench(currentGameweek.getInt("points_on_bench"));
				historicGameweek.add(gameweek);
			}
			
			/* Set the current gameweeks historic gameweek entry */
			HistoricGameweekData gameweek = new HistoricGameweekData();
			gameweek.setFantasyFootballId(teamToUpdate.getFantasyFootballId());
			gameweek.setGameweek(gameweekArray.length());
			String id =  Integer.toString(teamToUpdate.getFantasyFootballId())+ Integer.toString(gameweekArray.length()).trim();
			gameweek.setId(Integer.parseInt(id));
			gameweek.setGameweekPoints(teamToUpdate.getCurrentFantasyGameweekPoints());
			gameweek.setTotalPoints(teamToUpdate.getTotalPoints());
			gameweek.setGameweekRank(teamToUpdate.getGameweekRank());
			gameweek.setOverallRank(teamToUpdate.getOverallRank());
			gameweek.setTeamValue((int) (teamToUpdate.getTeamValue()));
			gameweek.setTransfersMade(teamToUpdate.getTransfersThisGameweek());
			gameweek.setHitsTaken(0);
			gameweek.setPointsOnTheBench(0);
			historicGameweek.add(gameweek);
			
			teamToUpdate.setHistoricGameweekData(historicGameweek);

		} catch (JSONException e) {
			logger.warn(e);
		} catch (IOException e) {
			logger.warn(e);
		}
	}

	@Override
	public void deleteTeam(int teamId) {
		// Probably don't want to do that
	}

}
