package com.integration.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.OperationLogDAO;
import com.integration.entity.OperationLog;
import com.integration.entity.VRPhoto;
import com.integration.entity.VRList;
import com.integration.service.OperationLogService;

@Service
public class OperationLogServiceImpl implements OperationLogService{
	@Autowired
	OperationLogDAO od;
	
	@Override
	public void addInfo(String id,String ModuleType,String OperationType,String logUser,String logMobile,String logTime,String OperationInfo){
		od.addInfo(id,ModuleType,OperationType,logUser,logMobile,logTime,OperationInfo);
	}
	
	@Override
	public List<OperationLog> queryInfo(String ModuleType,String OperationType,String logUser,String logMobile) {
		// TODO Auto-generated method stub
		return od.queryInfo(ModuleType,OperationType,logUser,logMobile);
	}
	
	@Override
	public List<VRPhoto> findList(String id) {
		// TODO Auto-generated method stub
		return od.findList(id);
	}
	
	@Override
	public List<VRList> findAllList(String name) {
		// TODO Auto-generated method stub
		return od.findAllList(name);
	}
}
