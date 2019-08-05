package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.integration.entity.RouteReplay;

public interface RouteRrplayDAO {
	
	@Select("select pp.idCode,pt.patrolDate,pt.StartTime,pt.EndTime,pt.uploadtime,"
	        +"pt.TrailLen,pp.mobile,pp.personName, pp.departmentVal as DepartmentCode,pp.projectType "
	        +"from (select patrolDate,min(StartTime) as StartTime,max(EndTime) as EndTime, "
	        +"max(uploadtime) as uploadtime,sum(TrailLen) as TrailLen,idCode "
	        +"from patrolTrail  GROUP BY patrolDate,idCode) pt,patrolPerson pp "
	        +"where pt.idCode=pp.idCode "
	        + "and pp.departmentVal like #{0} "
	        + "and pp.personName like #{1} and pt.patrolDate >= #{2} and pt.patrolDate <= #{3} and"
			+ " pp.projectType like #{4} order by pt.uploadtime DESC")
	public List<RouteReplay> getUserTrackInfo(String department, String personName, String startTime, String endTime,String projectType);
	@Select("select * from patrolTrail "
			+ " where patrolDate = #{0} and mobile = #{1}"
			+ " order by EndTime DESC")
	public List<RouteReplay> listTrail(String patrolDate, String mobile);
}
