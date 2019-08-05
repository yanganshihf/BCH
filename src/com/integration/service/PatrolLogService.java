package com.integration.service;

import java.util.List;

import com.integration.entity.PatrolLog;

public interface PatrolLogService {

	List<PatrolLog> find_PatrlLog_List(String department, String personName, String startTime, String endTime,String projectType);
	void del(String id);

}
