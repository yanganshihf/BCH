package com.integration.service;

import java.util.List;

import com.integration.entity.Patroler;

public interface LocationService {
	

	public List<Patroler> listPatroler();

	public List<Patroler> queryPatroler(String department, String mobile, String personName, String projectType);

}
