package com.integration.service;

import java.util.List;

import com.integration.entity.OperationLog;
import com.integration.entity.VRPhoto;
import com.integration.entity.VRList;

public interface OperationLogService {
	
	void addInfo(String id,String ModuleType,String OperationType,String logUser,String logMobile,String logTime,String OperationInfo);
	
	List<OperationLog> queryInfo(String ModuleType,String OperationType,String logUser,String logMobile);
	
	List<VRPhoto> findList(String id);
	
	List<VRList> findAllList(String name);
}
