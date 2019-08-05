package com.integration.service;

import java.util.List;

import com.integration.entity.RouteReplay;

public interface RouteRrplayService {

	public List<RouteReplay> QueryCurrentTrace(String department, String personName, String startTime, String endTime,String projectType);

	public List<RouteReplay> listTrail(String patrolDate, String mobile);
}
