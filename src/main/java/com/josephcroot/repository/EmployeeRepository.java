package com.josephcroot.repository;

import org.springframework.data.repository.CrudRepository;
import com.josephcroot.entity.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {

}
