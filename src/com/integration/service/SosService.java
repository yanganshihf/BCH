package com.integration.service;

import java.util.List;

import com.integration.entity.PatrolRescue;
import com.integration.entity.PatrolRescueFullInfo;


public interface SosService {

	public List<PatrolRescue> find_SOS_List(String department, String personName, String startTime, String endTime, String readState, String value,String projectType);
	public void delSOS(String id);
	public List<PatrolRescueFullInfo> find_Detail_ByID(String id);
	public void markAsReaded(String value,String date, String id);
	public String queryAcceptor(String id);
	/*public List<PatrolRescue> queryRealtimeSos(String cookie_logingUser, String nowdayTime);
	/*public Boolean hasRealtimeSos(String cookie_logingUser, String nowdayTime);*/
	public Boolean hasRealtimeSos(String nowdayTime);
	public List<PatrolRescue> queryRealtimeSos(String nowdayTime);
}
