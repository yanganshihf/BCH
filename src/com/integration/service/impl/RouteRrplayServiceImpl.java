package com.integration.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.RouteRrplayDAO;
import com.integration.entity.RouteReplay;
import com.integration.service.RouteRrplayService;
@Service
public class RouteRrplayServiceImpl implements RouteRrplayService {
	@Autowired
	private RouteRrplayDAO locationCopyDAO;


	@Override
	public List<RouteReplay> QueryCurrentTrace(String department, String personName, String startTime, String endTime,String projectType) {
		// TODO Auto-generated method stub
		return this.locationCopyDAO.getUserTrackInfo(department,personName,startTime,endTime,projectType);
	}


	@Override
	public List<RouteReplay> listTrail(String patrolDate, String mobile) {
		// TODO Auto-generated method stub
		return locationCopyDAO.listTrail(patrolDate,mobile);
	}
}
