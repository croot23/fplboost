package com.josephcroot.fantasyfootball;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.josephcroot.entity.Employee;
import com.josephcroot.repository.EmployeeRepository;

@Component
public class Query implements GraphQLQueryResolver {
	
	@Autowired
	private EmployeeRepository EmployeeRepository;
	
	public List<Employee> employees() {
        return (List<Employee>) EmployeeRepository.findAll();
    }

}
