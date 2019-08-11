package com.josephcroot.repository;

import org.springframework.data.repository.CrudRepository;

import com.josephcroot.entity.Team;

public interface TeamRepository extends CrudRepository<Team, Integer> {

}
