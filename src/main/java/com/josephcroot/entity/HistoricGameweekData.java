package com.josephcroot.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "historic_team_gameweek_data")
public class HistoricGameweekData {
	
	@Id
	@Column(name = "id")
	private int id;
	
	@Column(name = "gameweek")
	private int gameweek;

	@Column(name = "fantasy_football_id")
	private int fantasyFootballId;
	
	@Column(name = "gameweek_points")
	private int gameweekPoints;
	
	@Column(name = "total_points")
	private int totalPoints;
	
	@Column(name = "gameweek_rank")
	private int gameweekRank;
	
	@Column(name = "overall_rank")
	private int overallRank;
	
	@Column(name = "team_value")
	private int teamValue;
	
	@Column(name = "transfers_made")
	private int transfersMade;
	
	@Column(name = "hits_taken")
	private int hitsTaken;
	
	@Column(name = "points_on_the_bench")
	private int pointsOnTheBench;
	
	@ManyToOne
	@JoinColumn(name = "captain_id")
	private Player captain;
	
	@ManyToOne
	private Team team;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getGameweek() {
		return gameweek;
	}

	public void setGameweek(int gameweek) {
		this.gameweek = gameweek;
	}

	public int getFantasyFootballId() {
		return fantasyFootballId;
	}

	public void setFantasyFootballId(int fantasyFootballId) {
		this.fantasyFootballId = fantasyFootballId;
	}

	public int getGameweekPoints() {
		return gameweekPoints;
	}

	public void setGameweekPoints(int gameweekPoints) {
		this.gameweekPoints = gameweekPoints;
	}

	public int getTotalPoints() {
		return totalPoints;
	}

	public void setTotalPoints(int totalPoints) {
		this.totalPoints = totalPoints;
	}

	public int getGameweekRank() {
		return gameweekRank;
	}

	public void setGameweekRank(int gameweekRank) {
		this.gameweekRank = gameweekRank;
	}

	public int getOverallRank() {
		return overallRank;
	}

	public void setOverallRank(int overallRank) {
		this.overallRank = overallRank;
	}

	public int getTeamValue() {
		return teamValue;
	}

	public void setTeamValue(int teamValue) {
		this.teamValue = teamValue;
	}

	public int getTransfersMade() {
		return transfersMade;
	}

	public void setTransfersMade(int transfersMade) {
		this.transfersMade = transfersMade;
	}

	public int getHitsTaken() {
		return hitsTaken;
	}

	public void setHitsTaken(int hitsTaken) {
		this.hitsTaken = hitsTaken;
	}

	public int getPointsOnTheBench() {
		return pointsOnTheBench;
	}

	public void setPointsOnTheBench(int pointsOnTheBench) {
		this.pointsOnTheBench = pointsOnTheBench;
	}
/*
	public Player getCaptain() {
		return captain;
	}

	public void setCaptain(Player captain) {
		this.captain = captain;
	}
	*/
}
