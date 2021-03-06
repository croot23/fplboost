package com.josephcroot.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import lombok.Data;

@Data
@Entity
public class League {

	@Id
	@Column(name = "fantasy_football_id")
	private int fantasyFootballId;
	
	@Column(name = "league_name")
	private String name;
	
	@ManyToMany(fetch=FetchType.EAGER, cascade={CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH, })
	@JoinTable(name="league_team", joinColumns=@JoinColumn(name="league_id"), inverseJoinColumns=@JoinColumn(name="team_id"))
	private Set<Team> teams;

	public int getFantasyFootballId() {
		return fantasyFootballId;
	}

	public void setFantasyFootballId(int fantasyFootballId) {
		this.fantasyFootballId = fantasyFootballId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
