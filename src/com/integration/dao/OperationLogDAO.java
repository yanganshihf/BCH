package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import com.integration.entity.OperationLog;
import com.integration.entity.VRList;
import com.integration.entity.VRPhoto;


public interface OperationLogDAO {

	
	@Insert("insert into OperationLog "
			+"VALUES (#{0},#{1},#{2},#{3},#{4},#{5},#{6})")
	void addInfo(String id,String ModuleType,String OperationType,String logUser,String logMobile,String logTime,String OperationInfo);
	
	@Select("select * from OperationLog "
			+ "where ModuleType like #{0} "
			+ "and OperationType like #{1} "
			+ "and logUser like #{2} "
			+"and logMobile like #{3} "
			+ "order by logTime desc")
	List<OperationLog> queryInfo(String ModuleType,String OperationType,String logUser,String logMobile);
	
	@Select("select * from VRPhoto "
			+ "where groupId = #{0} ")
	List<VRPhoto> findList(String id);
	
	@Select("select * from VRlist where photoGroup like #{0}")
	List<VRList> findAllList(String name);

}
