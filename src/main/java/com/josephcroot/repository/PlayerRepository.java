package com.josephcroot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.josephcroot.entity.Player;

public interface PlayerRepository extends CrudRepository<Player, Integer> {
	
	@Query( "SELECT P.fantasyFootballId FROM Player P" )
	List<Integer> getallPlayerIds();
	
}
