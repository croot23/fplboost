package com.josephcroot.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "player")
public class Player {

	@Id
	@Column(name = "fantasy_football_id")
	private int fantasyFootballId;

	@Column(name = "web_name")
	private String webName;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "total_points")
	private int totalPoints;

	@Column(name = "gameweek_points")
	private int gameweekPoints;

	@Column(name = "form")
	private double form;

	@Column(name = "price")
	private double price;

	@Column(name = "injured")
	private boolean injured;

	@Column(name = "points_per_game")
	private double pointsPerGame;

	@Column(name = "bonus_points")
	private int bonusPoints;

	@Column(name = "position")
	private int position;

	@Column(name = "team")
	private int team;
	
	@Column(name = "did_not_play")
	private boolean didNotPlay;
	
	@Column(name = "minutes_played")
	private int minutesPlayed;
	
	@Column(name = "clean_sheet")
	private boolean cleanSheet;
	
	@Column(name = "goals_scored")
	private int goalsScored;
	
	@Column(name = "assists")
	private int assists;
	
	@Column(name = "change_percentage")
	private double changePercentage;
	
	public boolean isDidNotPlay() {
		return didNotPlay;
	}

	public double getTeam() {
		return team;
	}

	public void setTeam(int team) {
		this.team = team;
	}

	public void setBonusPoints(int bonusPoints) {
		this.bonusPoints = bonusPoints;
	}

	public String getWebName() {
		if (webName.contentEquals("Alexander-Arnold")) {
			return "TAA";
		} else if (webName.contentEquals("Callum Wilson")) {
			return "C Wilson";
		} else if (webName.contentEquals("Calvert-Lewin")){
			return "DCL";
		} else {
			return webName;
		}
	}

	public void setWebName(String webName) {
		this.webName = webName;
	}

	public double getPointsPerGame() {
		return pointsPerGame;
	}

	public void setPointsPerGame(double pointsPerGame) {
		this.pointsPerGame = pointsPerGame;
	}

	public double getBonusPoints() {
		return bonusPoints;
	}

	public int getPosition() {
		return position;
	}

	public void setPosition(int position) {
		this.position = position;
	}

	public double getForm() {
		return form;
	}

	public void setForm(double form) {
		this.form = form;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public boolean isInjured() {
		return injured;
	}

	public void setInjured(boolean injured) {
		this.injured = injured;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setTotalPoints(int totalPoints) {
		this.totalPoints = totalPoints;
	}

	public void setGameweekPoints(int gameweekPoints) {
		this.gameweekPoints = gameweekPoints;
	}

	public int getFantasyFootballId() {
		return fantasyFootballId;
	}

	public void setFantasyFootballId(int fantasyFootballId) {
		this.fantasyFootballId = fantasyFootballId;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getName() {
		return firstName + " " + lastName;
	}

	public int getTotalPoints() {
		return totalPoints;
	}

	public int getGameweekPoints() {
		return gameweekPoints;
	}
	
	public boolean didNotPlay() {
		return didNotPlay;
	}

	public void setDidNotPlay(boolean didNotPlay) {
		this.didNotPlay = didNotPlay;
	}
	
	public int getMinutesPlayed() {
		return minutesPlayed;
	}

	public void setMinutesPlayed(int minutesPlayed) {
		this.minutesPlayed = minutesPlayed;
	}

	public boolean isCleanSheet() {
		return cleanSheet;
	}

	public void setCleanSheet(boolean cleanSheet) {
		this.cleanSheet = cleanSheet;
	}

	public int getGoalsScored() {
		return goalsScored;
	}

	public void setGoalsScored(int goalsScored) {
		this.goalsScored = goalsScored;
	}

	public int getAssists() {
		return assists;
	}

	public void setAssists(int assists) {
		this.assists = assists;
	}

	public double getChangePercentage() {
		return changePercentage;
	}

	public void setChangePercentage(double changePercentage) {
		this.changePercentage = changePercentage;
	}
	
}
