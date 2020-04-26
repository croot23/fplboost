package com.josephcroot.entity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.MapKeyJoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.OrderBy;
import org.springframework.boot.configurationprocessor.json.JSONException;

import com.josephcroot.fantasyfootballAPI.GameweekData;

@Entity
@Table(name = "team")
public class Team {
	
	@Id
	@Column(name = "fantasy_football_id")
	private int fantasyFootballId;

	@Column(name = "team_name")
	private String teamName;

	@Column(name = "manager_name")
	private String managerName;

	@Column(name = "total_points")
	private int totalPoints;

	@Column(name = "form")
	private double form;

	@Column(name = "team_value")
	private double teamValue;

	@Column(name = "total_transfers")
	private int totalTransfers;

	@Column(name = "bank")
	private double bank;

	@Column(name = "gameweek_points")
	private int gameweekPoints;

	@Column(name = "wildcard")
	private boolean wildcard;

	@Column(name = "bench_boost")
	private boolean benchBoost;

	@Column(name = "free_hit")
	private boolean freeHit;

	@Column(name = "triple_captain")
	private boolean tripleCaptain;
	
	@Column(name = "overall_rank")
	private int overallRank;
	
	@Column(name = "hits")
	private int transferHits;
	
	@Column(name = "transfer_hits")
	private int gameweekTransferHits;
	
	@Column(name = "gameweek_rank")
	private int gameweekRank;
	
	@Column(name = "expected_points")
	private int expectedPoints;
	
	@Column(name = "weekly_transfers")
	private int transfersThisGameweek;
	
	@Column(name = "wildcard_gameweek")
	private int wildcardGameweek;
	
	@Column(name = "triple_captain_gameweek")
	private int tripleCaptainGameweek;
	
	@Column(name = "free_hit_gameweek")
	private int freeHitGameweek;
	
	@Column(name = "bench_boost_gameweek")
	private int benchBoostGameweek;
	
	@ManyToOne
	@JoinColumn(name = "captain_id")
	private Player captain;
	
	@ManyToOne
	@JoinColumn(name = "vice_captain_id")
	private Player viceCaptain;
	
	public Player getViceCaptain() {
		return viceCaptain;
	}

	public void setViceCaptain(Player viceCaptain) {
		this.viceCaptain = viceCaptain;
	}
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, })
	@JoinTable(name = "team_player", 
	joinColumns = @JoinColumn(name = "team_id"), 
	inverseJoinColumns = @JoinColumn(name = "player_id"))
	private Set<Player> players;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, })
	@JoinTable(name = "team_substitutes", 
	joinColumns = @JoinColumn(name = "team_id"), 
	inverseJoinColumns = @JoinColumn(name = "player_id"))
	private Set<Player> substitutes;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, })
	@JoinTable(name="team_transfers", 
	joinColumns=@JoinColumn(name="team_id"),
	inverseJoinColumns=@JoinColumn(name="player_out"))
	@MapKeyJoinColumn(name="player_in")
	private Map<Player, Player> weeklyTransfers;
	
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name="historic_team_gameweek_data_id")
	@OrderBy(clause = "gameweek ASC")
	private Set<HistoricGameweekData> historicGameweekData;
	
	public Set<Player> getAllPlayers() {
		Set<Player> allPlayers = new LinkedHashSet<Player>(getPlayers());
		allPlayers.addAll(getSubstitutes());
		return allPlayers;
	}
	public int getFirstElevenGameweekPoints() throws JSONException, IOException {
		int firstElevenGameweekPoints = 0;
		Set<Player> firstEleven = new HashSet<Player>(getPlayers());
		for (Player player : firstEleven) {
			firstElevenGameweekPoints += player.getGameweekPoints();
			//If it's the captain the points are doubled remember!
			if (player == getCaptain()) {
				firstElevenGameweekPoints += player.getGameweekPoints();
				if (GameweekData.getGameweek() == getTripleCaptainGameweek()) {
					firstElevenGameweekPoints += player.getGameweekPoints();
				}
			}
		}
		if (GameweekData.getGameweek() == getBenchBoostGameweek()) {
			firstElevenGameweekPoints += getSubstitutePoints();
		}
		return firstElevenGameweekPoints;
	}
	
	public int getGameweekPoints() throws JSONException, IOException {
		int firstElevenPoints = getFirstElevenGameweekPoints();
		if (gameweekPoints < firstElevenPoints)
			return firstElevenPoints;
		else
			return gameweekPoints;
	}

	public int getCurrentFantasyGameweekPoints() {
		return gameweekPoints;
	}
	
	public int getTotalPoints() throws JSONException, IOException {
		int firstElevenPoints = getFirstElevenGameweekPoints();
			return totalPoints + (firstElevenPoints - gameweekTransferHits);
	}
	public int getSubstitutePoints() {
		int substitutePoints = 0;
		Set<Player> substitutes = new HashSet<Player>(getSubstitutes());
		for (Player player : substitutes) {
			substitutePoints += player.getGameweekPoints();
		}
		return substitutePoints;
	}

	public Set<Player> getSubstitutes() {
		return substitutes;
	}

	public void setSubstitutes(Set<Player> substitutes) {
		this.substitutes = substitutes;
	}
	public Set<HistoricGameweekData> getHistoricGameweekData() {
		return historicGameweekData;
	}

	public void setHistoricGameweekData(Set<HistoricGameweekData> historicGameweekData) {
		this.historicGameweekData = historicGameweekData;
	}

	public Set<Player> getPlayers() {
		return players;
	}
	
	public void setPlayers(Set<Player> players) {
		this.players = players;
	}
	
	public int getFantasyFootballId() {
		return fantasyFootballId;
	}

	public void setFantasyFootballId(int fantasyFootballId) {
		this.fantasyFootballId = fantasyFootballId;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public String getManagerName() {
		if (managerName.contentEquals("Nik Goodley")) {
			return "Lord of the Pit";
		} else {
		return managerName;
		}
	}

	public void setManagerName(String managerName) {
		this.managerName = managerName;
	}

	public void setTotalPoints(int totalPoints) {
		this.totalPoints = totalPoints;
	}

	public double getForm() {
		return form;
	}

	public void setForm(double form) {
		this.form = form;
	}

	public double getTeamValue() {
		return teamValue;
	}

	public void setTeamValue(double teamValue) {
		this.teamValue = teamValue;
	}

	public int getTotalTransfers() {
		return totalTransfers;
	}

	public void setTotalTransfers(int totalTransfers) {
		this.totalTransfers = totalTransfers;
	}

	public double getBank() {
		return bank;
	}

	public void setBank(double d) {
		this.bank = d;
	}

	public void setGameweekPoints(int gameweekPoints) {
		this.gameweekPoints = gameweekPoints;
	}

	public boolean isWildcard() {
		return wildcard;
	}

	public void setWildcard(boolean wildcard) {
		this.wildcard = wildcard;
	}

	public boolean isBenchBoost() {
		return benchBoost;
	}

	public void setBenchBoost(boolean benchBoost) {
		this.benchBoost = benchBoost;
	}

	public boolean isFreeHit() {
		return freeHit;
	}

	public void setFreeHit(boolean freeHit) {
		this.freeHit = freeHit;
	}

	public boolean isTripleCaptain() {
		return tripleCaptain;
	}

	public void setTripleCaptain(boolean tripleCaptain) {
		this.tripleCaptain = tripleCaptain;
	}
	
	public Player getCaptain() {
		if (captain.didNotPlay() == false)
			return captain;
		else 
			return viceCaptain;
	}

	public void setCaptain(Player captain) {
		this.captain = captain;
	}
	
	public int getOverallRank() {
		return overallRank;
	}

	public void setOverallRank(int overallRank) {
		this.overallRank = overallRank;
	}
	public Map<Player, Player> getWeeklyTransfers() {
		return weeklyTransfers;
	}
	
	public void setWeeklyTransfers(Map<Player, Player> weeklySubstitutes) {
		this.weeklyTransfers = weeklySubstitutes;
	}
	public int getTransferHits() {
		return transferHits;
	}

	public void setTransferHits(int transferHits) {
		this.transferHits = transferHits;
	}
	
	// GrpahQL doesn't handle Maps very well, so splitting the transfers Map out to two Lists 
	public List<Player> getWeeklyTransfersListOut() {
		Map<Player, Player> weeklyTransfers = getWeeklyTransfers();
		ArrayList<Player> playersOut = new ArrayList<Player>(weeklyTransfers.keySet());
		return playersOut;
	}
	
	public List<Player> getWeeklyTransfersListIn() {
		Map<Player, Player> weeklyTransfers = getWeeklyTransfers();
		ArrayList<Player> playersOut = new ArrayList<Player>(weeklyTransfers.values());
		return playersOut;
	}
	
	public int getGameweekRank() {
		return gameweekRank;
	}

	public void setGameweekRank(int gameweekRank) {
		this.gameweekRank = gameweekRank;
	}

	public int getExpectedPoints() {
		double calculatedExpectedPoints = 0;
		for (Player P : players) {
			if (P.getWebName().equals(captain.getWebName())) {
				calculatedExpectedPoints += (P.getForm()*2);
			} else {
				calculatedExpectedPoints += P.getForm();
			}
		}
		return (int) calculatedExpectedPoints;
	}

	public void setExpectedPoints(int expectedPoints) {
		this.expectedPoints = expectedPoints;
	}

	public int getTransfersThisGameweek() {
		return transfersThisGameweek;
	}

	public void setTransfersThisGameweek(int transfers_this_gameweek) {
		this.transfersThisGameweek = transfers_this_gameweek;
	}

	public int getGameweekTransferHits() {
		return gameweekTransferHits;
	}

	public void setGameweekTransferHits(int gameweekTransferHits) {
		this.gameweekTransferHits = gameweekTransferHits;
	}

	public int getWildcardGameweek() {
		return wildcardGameweek;
	}

	public void setWildcardGameweek(int wildcardGameweek) {
		this.wildcardGameweek = wildcardGameweek;
	}

	public int getTripleCaptainGameweek() {
		return tripleCaptainGameweek;
	}

	public void setTripleCaptainGameweek(int tripleCaptainGameweek) {
		this.tripleCaptainGameweek = tripleCaptainGameweek;
	}

	public int getFreeHitGameweek() {
		return freeHitGameweek;
	}

	public void setFreeHitGameweek(int freeHitGameweek) {
		this.freeHitGameweek = freeHitGameweek;
	}

	public int getBenchBoostGameweek() {
		return benchBoostGameweek;
	}

	public void setBenchBoostGameweek(int benchBoostGameweek) {
		this.benchBoostGameweek = benchBoostGameweek;
	}
	
}
