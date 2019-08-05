package com.integration.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.PatrolEventDAO;
import com.integration.entity.PatrolEvent;
import com.integration.entity.PatrolEventFull;
import com.integration.entity.EventCount;
import com.integration.service.PatrolEventService;


@Service
public class PatrolEventServiceImpl implements PatrolEventService {
	@Autowired
	private PatrolEventDAO patrolEventDAO;

	
	@Override
	public List<PatrolEvent> findPatrolEvent(String department, String personName, String startTime, String endTime,String readState,String cookie_logingUser,String projectType) {
		
	switch (readState) {
		// 未读
		case "0":
			return patrolEventDAO.findPatrolEvent_unread(department,personName,startTime,endTime,cookie_logingUser,projectType);
		// 已读
		case "1":
			return patrolEventDAO.findPatrolEvent_readed(department,personName,startTime,endTime,cookie_logingUser,projectType);
		// 已回复
		case "2":
			return patrolEventDAO.findPatrolEvent_resped(department,personName,startTime,endTime,cookie_logingUser,projectType);
		default:
			return patrolEventDAO.findPatrolEvent_All(department,personName,startTime,endTime,cookie_logingUser,projectType);
			
	}
		
	}


	@Override
	public List<PatrolEventFull> findEventDetail(String id) {
		// TODO Auto-generated method stub
		return patrolEventDAO.findEventDetail(id);
	}


	@Override
	public void updateEvent(String id, String respSuggestion, String currentdate, String responsePeople) {
		// TODO Auto-generated method stub
		patrolEventDAO.updateEvent(id, respSuggestion,currentdate,responsePeople);
	}


	@Override
	public void delEvent(String id) {
		// TODO Auto-generated method stub
		patrolEventDAO.delEvent(id);
		patrolEventDAO.delEventCoor(id);
	}

	@Override
	public List<PatrolEventFull> queryOnedayEvents(String mobile, String patrolDate) {
		// TODO Auto-generated method stub
		return patrolEventDAO.queryOnedayEvents(mobile,patrolDate);
	}
	
	@Override
	public List<PatrolEventFull> findEventCoor(String id) {
		// TODO Auto-generated method stub
		return patrolEventDAO.findEventCoor(id);
	}


	@Override
	public void markAsReaded(String value,String id) {
		// TODO Auto-generated method stub
		patrolEventDAO.markAsReaded(value,id);
	}


	@Override
	public List<PatrolEvent> queryRealtimeEvent(String cookie_logingUser, String nowdayTime ) {
		// TODO Auto-generated method stub
		return patrolEventDAO.queryRealtimeEvent(cookie_logingUser  ,nowdayTime);
	}

	
	@Override
	public Boolean hasRealtimeEvent(String cookie_logingUser, String nowdayTime) {
		// TODO Auto-generated method stub
		int realtimeEventNum = patrolEventDAO.hasRealtimeEvent(cookie_logingUser  ,nowdayTime);
		
		if (realtimeEventNum != 0) {
			return true;
		} else {
			return false;
		}
		 
	}
	
	@Override
	public void setstatusCode(String id,String statusCode) {
		// TODO Auto-generated method stub
		patrolEventDAO.setstatusCode(id,statusCode);
	}
	
	@Override
	public List<EventCount> querySurvey(String dep,String startTime,String endTime) {
		List<EventCount> eventCount = patrolEventDAO.queryeventType(dep,startTime,endTime);
		return eventCount;
	}
	
	

}