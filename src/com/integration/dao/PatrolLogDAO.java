package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;

import com.integration.entity.PatrolLog;

public interface PatrolLogDAO {
	
	@Select("SELECT l.patrolDate,l.logText,l.uploadTime,l.weather,l.id,p.personName,p.mobile,p.departmentVal departmentCode,"
	                +"p.projectType,(SELECT departmentName from department "
	                +"where departmentCode = p.departmentVal) as departmentName "
	                +"FROM patrolLog l INNER JOIN patrolPerson p on l.idCode = p.idCode  "
			+ " where p.departmentVal like #{0} and p.personName like #{1} and l.uploadTime > #{2} and l.uploadTime < #{3} "
			+ "and p.projectType like #{4} order by l.uploadTime desc")
	List<PatrolLog> find_PatrlLog_List(String department, String personName, String startTime, String endTime,String projectType);
	
	@Delete("delete from patrolLog "
			+ "where id = #{0} ")
	void del(String id);
}
