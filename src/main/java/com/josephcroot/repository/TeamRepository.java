package com.josephcroot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.josephcroot.entity.Team;

public interface TeamRepository extends CrudRepository<Team, Integer> {
	
	@Query( "SELECT T.fantasyFootballId FROM Team T" )
	List<Integer> getallTeamIds();
}
