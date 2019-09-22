package com.josephcroot.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.josephcroot.entity.Player;
import com.josephcroot.entity.Team;
import com.josephcroot.fantasyfootballAPI.GameweekData;
import com.josephcroot.fantasyfootballAPI.TeamsAPIData;
import com.josephcroot.repository.TeamRepository;

@Component
@Service
public class TeamServiceImpl implements TeamService {

	@Autowired
	private TeamRepository teamRepository;

	@Autowired
	private PlayerService playerService;

	@Override
	@Scheduled(fixedRate = 150000)
	public void scheduleFixedDelayTask() throws JSONException, IOException {
		System.out.println("Updating Teams");
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

	public void updateTeam(Team newTeam) throws JSONException, IOException {
		try {
			// General team info
			JSONObject teamInfo = TeamsAPIData.getTeamInfo(newTeam.getFantasyFootballId());
			newTeam.setTeamName(teamInfo.getString("name"));
			newTeam.setTeamValue(teamInfo.getDouble("last_deadline_value"));
			newTeam.setBank(teamInfo.getDouble("last_deadline_bank"));
			newTeam.setTotalTransfers(teamInfo.getInt("last_deadline_total_transfers"));
			newTeam.setGameweekPoints(teamInfo.getInt("summary_event_points"));
			newTeam.setOverallRank(teamInfo.getInt("summary_overall_rank"));
			newTeam.setManagerName(
					teamInfo.getString("player_first_name") + " " + teamInfo.getString("player_last_name"));
			// Chips info
			JSONArray chipInfo = TeamsAPIData.getTeamChipsInfo(newTeam.getFantasyFootballId());
			for (int i = 0; i < chipInfo.length(); i++) {
				JSONObject currentChip = chipInfo.getJSONObject(i);
				if (currentChip.getString("name").equals("freehit")) {
					newTeam.setFreeHit(true);
				}
				if (currentChip.getString("name").equals("wildcard")) {
					newTeam.setWildcard(true);
				}
				if (currentChip.getString("name").equals("3xc")) {
					newTeam.setTripleCaptain(true);
				}
				if (currentChip.getString("name").equals("bboost")) {
					newTeam.setBenchBoost(true);
				}
			}

			// T-1 Total Points (we add current live points to last weeks score for live
			// totals)
			JSONArray totalPointsInfo = TeamsAPIData.getTeamPoints(newTeam.getFantasyFootballId());
			for (int i = 0; i < totalPointsInfo.length(); i++) {
				if (i == totalPointsInfo.length() - 2) {
					JSONObject lastGameweek = totalPointsInfo.getJSONObject(i);
					newTeam.setTotalPoints(lastGameweek.getInt("total_points"));
				}
			}
			// Players info
			Set<Player> players = new HashSet<>();
			Set<Player> substitutes = new HashSet<>();
			int defenders = 0;
			int forwards = 0;
			JSONArray playersJSON = TeamsAPIData.getTeamPlayers(newTeam.getFantasyFootballId());
			for (int i = 0; i < playersJSON.length(); i++) {
				// Create Player

				JSONObject currentPlayer = playersJSON.getJSONObject(i);
				Player player = playerService.getPlayer(currentPlayer.getInt("element"));
				if (currentPlayer.getBoolean("is_captain")) {
					newTeam.setCaptain(player);
				}
				if (currentPlayer.getBoolean("is_vice_captain")) {
					newTeam.setViceCaptain(player);
				}
				if (currentPlayer.getInt("position") < 12) {
					players.add(player);
					if (player.getPosition() == 2)
						defenders++;
					else if (player.getPosition() == 4)
						forwards++;
				} else {
					substitutes.add(player);
				}
			}

			// Automatic substitutes
			Set<Player> playersToAdd = new HashSet<>();
			Set<Player> playersToRemove = new HashSet<>();
			for (Player player : players) {
				if (player.didNotPlay() == true) {
					// Goalkeepers
					if (player.getPosition() == 1) {
						for (Player substitute : substitutes) {
							if (substitute.getPosition() == 1 && substitute.didNotPlay() == false) {
								playersToAdd.add(substitute);
								playersToRemove.add(player);

							}
						}
					}

					// Defenders
					if (player.getPosition() == 2) {
						for (Player substitute : substitutes) {
							if (substitute.didNotPlay() == false) {
								if (defenders > 3) {
									playersToAdd.add(substitute);
									playersToRemove.add(player);
									defenders = (substitute.getPosition() == 2) ? defenders + 1 : defenders - 1;
									break;
								} else {
									if (substitute.getPosition() == 2 && substitute.didNotPlay() == false) {
										playersToAdd.add(substitute);
										playersToRemove.add(substitute);
										break;
									}
								}
							}
						}
					}

					// Midfielders
					if (player.getPosition() == 3) {
						for (Player substitute : substitutes) {
							if (substitute.didNotPlay() == false && substitute.getPosition() != 1) {
								playersToAdd.add(substitute);
								playersToRemove.add(player);
								break;
							}
						}

						// Forwards
						if (player.getPosition() == 4) {
							for (Player substitute : substitutes) {
								if (substitute.didNotPlay() == false && substitute.getPosition() != 1) {
									if (forwards > 1) {
										playersToAdd.add(substitute);
										playersToRemove.add(substitute);
										forwards = (substitute.getPosition() == 4) ? forwards + 1 : forwards - 1;
										break;
									} else {
										if (substitute.getPosition() == 4 && substitute.didNotPlay() == false) {
											playersToAdd.add(substitute);
											playersToRemove.add(player);
											break;
										}
									}
								}
							}
						}
					}
				}
			}

			for (Player player : playersToRemove) {
				players.remove(player);
				substitutes.add(player);
			}
			for (Player player : playersToAdd) {
				players.add(player);
				substitutes.remove(player);
			}
			newTeam.setPlayers(players);
			newTeam.setSubstitutes(substitutes);
			// Transfer info
			Map<Player, Player> transfers = new HashMap<Player, Player>();
			JSONArray transfersJSON = TeamsAPIData.getTransfers(newTeam.getFantasyFootballId());
			for (int i = 0; i < transfersJSON.length(); i++) {
				JSONObject currentTransfer = transfersJSON.getJSONObject(i);
				if (currentTransfer.getInt("event") == GameweekData.getGameweek()) {
					Player playerOut = playerService.getPlayer(currentTransfer.getInt("element_out"));
					Player playerIn = playerService.getPlayer(currentTransfer.getInt("element_in"));
					transfers.put(playerOut, playerIn);
				}
			}
			newTeam.setWeeklyTransfers(transfers);
			// Transfer hits
			JSONObject teamHits = TeamsAPIData.getTeamHits(newTeam.getFantasyFootballId());
			newTeam.setTransferHits(teamHits.getInt("event_transfers_cost"));

		} catch (JSONException e) {
			// log.error(e);
		} catch (IOException e) {
			// log.error(e);
		}
	}

	@Override
	public void deleteTeam(int teamId) {
		// Probably don't wanna do that
	}

}
