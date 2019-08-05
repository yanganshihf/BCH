package com.integration.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.entity.Patroler;
import com.integration.dao.LocationDAO;
import com.integration.service.LocationService;
@Service
public class LocationServiceImpl implements LocationService {
	@Autowired
	private LocationDAO locationDAO;

	@Override
	// 实时巡护列表
	public List<Patroler> listPatroler() {
		return locationDAO.listPatroler();
	}

	@Override
	public List<Patroler> queryPatroler(String department, String mobile, String personName,String projectType) {
		mobile = mobile+"%";
		personName = personName+"%";
		return locationDAO.queryPatroler(department,mobile,personName,projectType);
	}
}