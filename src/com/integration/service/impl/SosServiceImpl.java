package com.integration.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.SosDAO;
import com.integration.entity.PatrolRescue;
import com.integration.entity.PatrolRescueFullInfo;
import com.integration.service.SosService;

@Service
public class SosServiceImpl implements SosService {
	@Autowired
	private SosDAO sosDAO;
	
	@Override
	public List<PatrolRescue> find_SOS_List(String department, String personName, String startTime, String endTime,
			String readState, String value,String projectType) {
		switch (readState) {
		case "0":
			return sosDAO.find_SOS_unread(department, personName, startTime, endTime,value,projectType);

		case "1":
			return sosDAO.find_SOS_readed(department, personName, startTime, endTime,value,projectType);
		default:
			return sosDAO.find_SOS_All(department, personName, startTime, endTime,value,projectType);
		}
	}
	
	@Override
	public void delSOS(String id) {
		// TODO Auto-generated method stub
		sosDAO.delSOS(id);
		sosDAO.delSOScoor(id);
	}

	@Override
	public List<PatrolRescueFullInfo> find_Detail_ByID(String id) {
		// TODO Auto-generated method stub
		return sosDAO.find_Detail_ByID(id);
	}

	@Override
	public void markAsReaded(String value, String date,String id) {
		// TODO Auto-generated method stub
		sosDAO.markAsReaded(value,date, id);
	}
	
	@Override
	public String queryAcceptor(String id){
		return sosDAO.queryAcceptor(id);
	}

	/*@Override
	public List<PatrolRescue> queryRealtimeSos(String cookie_logingUser, String nowdayTime) {
		// TODO Auto-generated method stub
		return sosDAO.queryRealtimeSos(cookie_logingUser, nowdayTime);
	}

	@Override
	public Boolean hasRealtimeSos(String cookie_logingUser, String nowdayTime) {
		// TODO Auto-generated method stub
		int realtimeSosNum = sosDAO.hasRealtimeSos(cookie_logingUser, nowdayTime);
		
		if (realtimeSosNum != 0) {
			return true;
		} else {
			return false;
		} 	
	}*/
	@Override
	public List<PatrolRescue> queryRealtimeSos(String nowdayTime) {
		// TODO Auto-generated method stub
		return sosDAO.queryRealtimeSos(nowdayTime);
	}
	@Override
	public Boolean hasRealtimeSos(String nowdayTime) {
		// TODO Auto-generated method stub
		int realtimeSosNum = sosDAO.hasRealtimeSos(nowdayTime);
		
		if (realtimeSosNum != 0) {
			return true;
		} else {
			return false;
		} 	
	}
}