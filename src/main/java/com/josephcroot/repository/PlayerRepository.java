package com.josephcroot.repository;

import org.springframework.data.repository.CrudRepository;

import com.josephcroot.entity.Player;

public interface PlayerRepository extends CrudRepository<Player, Integer> {

}
