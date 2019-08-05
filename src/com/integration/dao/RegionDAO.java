package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.PatrolRegion;

public interface RegionDAO {

	@Select("SELECT * FROM PATROLREGION5 where Departme_1  like #{0} and RegionNum like #{1} and RegionName like #{2} ")
	List<PatrolRegion> find_Region_List(String department, String startTime, String endTime);
	
	@Select("SELECT * FROM PATROLREGION5 where MobileNums like #{0} ")
	List<PatrolRegion> find_Region(String mobile);
	
	@Update("update PATROLREGION5 set Patrols = #{1} "
			+ ", MobileNums = #{2} "
			+ "where OBJECTID = #{0}")
	void updateRegion(String id, String personSelected, String mobileSelected);
	
	@Delete("delete from PATROLREGION5 "
			+ "where OBJECTID = #{0}")
	void delRegion(String id);
	
	@Select("select * from PATROLREGION5 "
			+ "where OBJECTID = #{0}")
	List<PatrolRegion> findById(String id);
	
	@Insert("INSERT INTO dianziweilan VALUES (#{0},#{1},GETDATE())")
	void setdianziweilan(String get32uuid, Integer jingjiefanwei);
	@Insert("INSERT INTO zhuliugaojing VALUES (#{0},#{1},GETDATE())")
	void setzhuliugaojing(String get32uuid, Integer zhuliugaojing);
}
