package com.integration.service;

import java.util.List;

import com.integration.entity.EventCount;
import com.integration.entity.PatrolEvent;
import com.integration.entity.PatrolEventFull;

public interface PatrolEventService {


	public List<PatrolEvent> findPatrolEvent(String department, String personName, String startTime, String endTime, String readState, String cookie_logingUser,String projectType);

	public List<PatrolEventFull> findEventDetail(String id);

	public void updateEvent(String id, String respSuggestion, String currentdate, String responsePeople);

	public void delEvent(String id);

	public List<PatrolEventFull> queryOnedayEvents(String mobile, String patrolDate);

	public List<PatrolEventFull> findEventCoor(String id);

	public void markAsReaded(String value, String id);

	public List<PatrolEvent> queryRealtimeEvent(String cookie_logingUser, String nowdayTime);

	public Boolean hasRealtimeEvent(String cookie_logingUser, String nowdayTime);
	
	public void setstatusCode(String id,String statusCode);
	
	List<EventCount> querySurvey(String dep,String startTime,String endTime);

}
