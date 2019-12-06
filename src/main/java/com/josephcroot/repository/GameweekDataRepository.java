package com.josephcroot.repository;

import org.springframework.data.repository.CrudRepository;

import com.josephcroot.entity.HistoricGameweekData;

public interface GameweekDataRepository extends CrudRepository<HistoricGameweekData, Integer> {

}
