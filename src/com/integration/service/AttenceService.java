package com.integration.service;

import java.util.List;

import com.integration.entity.AttenceDetail;
import com.integration.entity.AttenceStatic;
import com.integration.entity.AttenceWaring;
import com.integration.entity.StandardDay;
import com.integration.entity.Survey;

public interface AttenceService {

	List<AttenceDetail> QueryAttenceDetail(String department, String personName, String startTime,String projectType);

	List<AttenceStatic> AttenceStatic(String department, String personName, String startTime,String projectType);

	List<StandardDay> QueryChangeRecords();
	
	Integer getStandardDay(String attenceMonth); 
	
	void insert_setStandardDay_Record(String userName, String mobile, Integer standardDay, String today,
			String effectDay, String uuid, Integer isEffective);

	Survey querySurvey(String thisMonth);

	List<AttenceWaring> QueryAttenceWaring();
	
	void updateEff(String effectDay);
}
