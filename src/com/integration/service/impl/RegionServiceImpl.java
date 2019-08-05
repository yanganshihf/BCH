package com.integration.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.RegionDAO;
import com.integration.entity.PatrolRegion;
import com.integration.service.RegionService;
@Service
public class RegionServiceImpl implements RegionService {
	@Autowired
	RegionDAO rd;
	
	@Override
	public List<PatrolRegion> find_Region_List(String department, String startTime, String endTime) {
		// TODO Auto-generated method stub
		return rd.find_Region_List(department,startTime,endTime);
	}

	@Override
	public List<PatrolRegion> find_Region(String mobile) {
		// TODO Auto-generated method stub
		return rd.find_Region(mobile);
	}

	@Override
	public void updateRegion(String id, String personSelected, String mobileSelected) {
		// TODO Auto-generated method stub
		rd.updateRegion(id,personSelected,mobileSelected);
	}

	@Override
	public void delRegion(String id) {
		// TODO Auto-generated method stub
		rd.delRegion(id);
	}

	@Override
	public List<PatrolRegion> findById(String id) {
		// TODO Auto-generated method stub
		return rd.findById(id);
	}

	@Override
	public void setdianziweilan(String get32uuid, Integer jingjiefanwei) {
		// TODO Auto-generated method stub
		rd.setdianziweilan(get32uuid,jingjiefanwei);
	}

	@Override
	public void setzhuliugaojing(String get32uuid, Integer zhuliugaojing) {
		// TODO Auto-generated method stub
		rd.setzhuliugaojing(get32uuid,zhuliugaojing);
	}

}
