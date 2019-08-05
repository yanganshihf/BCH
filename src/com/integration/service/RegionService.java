package com.integration.service;

import java.util.List;

import com.integration.entity.PatrolRegion;

public interface RegionService {

	List<PatrolRegion> find_Region_List(String department,  String startTime, String endTime);
	List<PatrolRegion> find_Region(String mobile);
	void updateRegion(String id, String personSelected, String mobileSelected);

	void delRegion(String id);

	List<PatrolRegion> findById(String id);
	void setdianziweilan(String get32uuid, Integer jingjiefanwei);
	void setzhuliugaojing(String get32uuid, Integer zhuliugaojing);

}
