package com.integration.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.PatrolLogDAO;
import com.integration.entity.PatrolLog;
import com.integration.service.PatrolLogService;

@Service
public class PatrolLogServiceImpl implements PatrolLogService {
	@Autowired
	private PatrolLogDAO pld;

	
	@Override
	public List<PatrolLog> find_PatrlLog_List(String department, String personName, String startTime,
			String endTime,String projectType) {
		// TODO Auto-generated method stub
		return pld.find_PatrlLog_List(department,personName,startTime,endTime,projectType);
	}
	@Override
	public void del(String id) {
		// TODO Auto-generated method stub
		pld.del(id);
	}

}
