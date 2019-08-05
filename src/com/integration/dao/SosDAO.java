package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.PatrolRescue;
import com.integration.entity.PatrolRescueFullInfo;

public interface SosDAO {

	
	@Delete("delete from patrolSos where "
			+ "id = #{0}")
	public void delSOS(String id);
	@Delete("delete from sosCoor where "
			+ "sosId = #{0}")
	public void delSOScoor(String id);
	
	@Select("SELECT * FROM patrolSos s"
			+ " left join sosCoor c"
			+ " on s.id = c.sosId"
			+ " where s.id = #{0}")
	public List<PatrolRescueFullInfo> find_Detail_ByID(String id);
	
	@Select("SELECT s.personName,s.reportTime,s.id,s.readedPersons,s.Acceptor,s.AcceptTime,p.mobile,p.projectType,p.departmentVal as departmentCode,"
        	        +"c.* ,(SELECT  departmentName from department where departmentCode = p.departmentVal) as departmentName "
        	        +"FROM (patrolSos s INNER JOIN patrolPerson p ON s.idCode = p.idCode) INNER JOIN sosCoor c ON s.id = c.sosId  "
        	        +"where p.departmentVal like #{0} "
			+ "and p.personName like #{1} and s.ReportTime > #{2} "
			+ "and s.ReportTime < #{3} "
			+ "and s.Acceptor is null "
			+ "and p.projectType like #{5} ")	
	public List<PatrolRescue> find_SOS_unread(String department, String personName, String startTime, String endTime,
			String value,String projectType);
	
        @Select("SELECT  s.personName,s.reportTime,s.id,s.readedPersons,s.Acceptor,s.AcceptTime,p.mobile,p.projectType,p.departmentVal as departmentCode,"
                        +"c.* ,(SELECT  departmentName from department where departmentCode = p.departmentVal) as departmentName "
                        +"FROM (patrolSos s INNER JOIN patrolPerson p ON s.idCode = p.idCode) INNER JOIN sosCoor c ON s.id = c.sosId  "
                        +"where p.departmentVal like #{0} "
			+ "and s.PersonName like #{1} and s.ReportTime > #{2} "
			+ "and s.ReportTime < #{3} "
			+ "and s.Acceptor is not null  "
			+ "and p.projectType like #{5} ")
	public List<PatrolRescue> find_SOS_readed(String department, String personName, String startTime, String endTime,
			String value,String projectType);
	
        @Select("SELECT  s.personName,s.reportTime,s.id,s.readedPersons,s.Acceptor,s.AcceptTime,p.mobile,p.projectType,p.departmentVal as departmentCode,"
                        +"c.* ,(SELECT  departmentName from department where departmentCode = p.departmentVal) as departmentName "
                        +"FROM (patrolSos s INNER JOIN patrolPerson p ON s.idCode = p.idCode) INNER JOIN sosCoor c ON s.id = c.sosId  "
                        +"where p.departmentVal like #{0} "
			+ "and s.PersonName like #{1} and s.ReportTime > #{2} "
			+ "and s.ReportTime < #{3} "
			+ "and p.projectType like #{5} ")
	public List<PatrolRescue> find_SOS_All(String department, String personName, String startTime, String endTime,
			String value,String projectType);
	
	@Update("update patrolSos "
			+ "set Acceptor = #{0} , AcceptTime = #{1} "
			+ "where id = #{2}")
	public void markAsReaded(String value, String date, String id);
	
	@Select("select Acceptor from patrolSos WHERE id = #{0}")
	public String queryAcceptor(String id); 
	/*@Select("select * from patrolSos "
			+ "where readedPersons not like #{0} "
			+ "and reportTime > #{1} ")
	public List<PatrolRescue> queryRealtimeSos(String cookie_logingUser, String nowdayTime);
	
	@Select("select count(id) from patrolSos "
			+ "where readedPersons not like #{0} "
			+ "and reportTime > #{1} ")
	public Integer hasRealtimeSos(String cookie_logingUser, String nowdayTime);*/
	
	@Select("select count(id) from patrolSos "
			+ "where Acceptor is null "
			+ "and reportTime > #{0} ")
	public Integer hasRealtimeSos(String nowdayTime);
	
	@Select("select * from patrolSos "
			+ "where Acceptor is null "
			+ "and reportTime > #{0} ")
	public List<PatrolRescue> queryRealtimeSos(String nowdayTime);
}
