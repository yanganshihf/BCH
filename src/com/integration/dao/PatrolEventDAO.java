package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.PatrolEvent;
import com.integration.entity.PatrolEventFull;
import com.integration.entity.EventCount;

public interface PatrolEventDAO {

	@Select("SELECT * FROM patrolEvent e "
			+ "LEFT JOIN eventCoor c "
			+ " on e.id = c.eventId "
			+ "WHERE e.id = #{0}")
	public List<PatrolEventFull> findEventDetail(String id);
	
	@Update("update patrolEvent set  responsePeople = #{3} , "
			+ "responseSuggestion = #{1} , responseTime = #{2} "
			+ "where id = #{0}")
	public void updateEvent(String id, String respSuggestion, String currentdate, String responsePeople);
	
	@Delete("delete from patrolEvent where "
			+ "id = #{0}")
	public void delEvent(String id);
	@Delete("delete from eventCoor where "
			+ "eventId = #{0}")
	public void delEventCoor(String id);
	
	@Select("select * from patrolEvent e "
			+ "left join  eventCoor c "
			+ " on e.id = c.eventId "
			+ " where e.mobile = #{0} and "
			+ " Convert(varchar,e.uploadTime,120) LIKE #{1}")
	public List<PatrolEventFull> queryOnedayEvents(String mobile, String patrolDate);
	
	@Select("select * from eventCoor where eventId = #{0}")
	public List<PatrolEventFull> findEventCoor(String id);
	
	@Select("SELECT e.eventPhoto,e.eventVedio,e.eventRedio,e.happenTime,e.uploadTime,e.eventText,e.statusCode,e.eventType,"
	                +"e.responseTime,e.responsePeople,e.responseSuggestion,e.readedPersons,e.id,e.reportPeople,"
	                +"pp.mobile,pp.projectType,pp.departmentVal as departmentCode,"
	                +"(SELECT  departmentName from department where departmentCode = pp.departmentVal) as departmentName "
	                +"FROM patrolEvent e,patrolPerson pp where e.idCode=pp.idCode "
			+ "and  pp.departmentVal  "
			+ "like #{0} and e.reportPeople like #{1} and e.happenTime > #{2} "
			+ "and e.happenTime < #{3} "
			+ "and e.readedPersons not like #{4} "
			+ "and pp.projectType like #{5} "
			+ "order by e.happenTime desc")
	public List<PatrolEvent> findPatrolEvent_unread(String department, String personName, String startTime,
			String endTime, String cookie_logingUser,String projectType);
	
        @Select("SELECT e.eventPhoto,e.eventVedio,e.eventRedio,e.happenTime,e.uploadTime,e.eventText,e.statusCode,e.eventType,"
                        +"e.responseTime,e.responsePeople,e.responseSuggestion,e.readedPersons,e.id,e.reportPeople,"
                        +"pp.mobile,pp.projectType,pp.departmentVal as departmentCode,"
                        +"(SELECT  departmentName from department where departmentCode = pp.departmentVal) as departmentName "
                        +"FROM patrolEvent e,patrolPerson pp where e.idCode=pp.idCode "
                        + "and  pp.departmentVal  "
			+ "like #{0} and e.reportPeople like #{1} and e.happenTime > #{2} "
			+ "and e.happenTime < #{3} "
			+ "and e.readedPersons like #{4} "
			+ "and pp.projectType like #{5} "
			+ "order by e.happenTime desc")
	public List<PatrolEvent> findPatrolEvent_readed(String department, String personName, String startTime,
			String endTime, String cookie_logingUser,String projectType);
	
        @Select("SELECT e.eventPhoto,e.eventVedio,e.eventRedio,e.happenTime,e.uploadTime,e.eventText,e.statusCode,e.eventType,"
                        +"e.responseTime,e.responsePeople,e.responseSuggestion,e.readedPersons,e.id,e.reportPeople,"
                        +"pp.mobile,pp.projectType,pp.departmentVal as departmentCode,"
                        +"(SELECT  departmentName from department where departmentCode = pp.departmentVal) as departmentName "
                        +"FROM patrolEvent e,patrolPerson pp where e.idCode=pp.idCode "
                        + "and  pp.departmentVal  "
			+ "like #{0} and e.reportPeople like #{1} and e.happenTime > #{2} "
			+ "and e.happenTime < #{3} "
			+ "and e.responsePeople is  not  null "
			+ "and pp.projectType like #{5} "
			+ "order by e.happenTime desc")
	public List<PatrolEvent> findPatrolEvent_resped(String department, String personName, String startTime,
			String endTime, String cookie_logingUser,String projectType);
	
        @Select("SELECT e.eventPhoto,e.eventVedio,e.eventRedio,e.happenTime,e.uploadTime,e.eventText,e.statusCode,e.eventType,"
                        +"e.responseTime,e.responsePeople,e.responseSuggestion,e.readedPersons,e.id,e.reportPeople,"
                        +"pp.mobile,pp.projectType,pp.departmentVal as departmentCode,"
                        +"(SELECT  departmentName from department where departmentCode = pp.departmentVal) as departmentName "
                        +"FROM patrolEvent e,patrolPerson pp where e.idCode=pp.idCode "
                        + "and  pp.departmentVal  "
			+ "like #{0} and e.reportPeople like #{1} and e.happenTime > #{2} "
			+ "and e.happenTime < #{3} "
			+ "and pp.projectType like #{5} "
			+ "order by e.happenTime desc")
	public List<PatrolEvent> findPatrolEvent_All(String department, String personName, String startTime, String endTime,
			String cookie_logingUser,String projectType);
	
	@Update("update patrolEvent set readedPersons = #{0} "
			+ "where id = #{1}")
	public void markAsReaded(String value, String id);
	
	@Select("select * from patrolEvent "
			+ "where readedPersons not like #{0} "
			+ "and responsePeople is  null or responsePeople = '' "
			+ "and uploadTime > #{1} ")
	public List<PatrolEvent> queryRealtimeEvent(String cookie_logingUser, String nowdayTime);

	@Select("select count(id) from patrolEvent "
			+ "where readedPersons not like #{0} "
			+ "and responsePeople is  null or responsePeople = '' "
			+ "and uploadTime > #{1} ")
	public Integer hasRealtimeEvent(String cookie_logingUser, String nowdayTime);
	
	@Update("update patrolEvent "
			+ "set statusCode = #{1}  "
			+ "where id = #{0}")
	public void setstatusCode(String id,String statusCode);
	
	@Select("SELECT eventType as name,COUNT(*) as counts FROM patrolEvent "
			+ "WHERE departmentCode  like #{0} and  happenTime > #{1} and happenTime < #{2} GROUP BY eventType")
	public List<EventCount> queryeventType(String dep,String startTime,String endTime);
	
	@Select("SELECT (SELECT  departmentName from department where departmentCode = pe.departmentCode) as depName ,pe.departmentCode as name,COUNT(*) as counts FROM patrolEvent "
			+ "WHERE  happenTime > #{1} and happenTime < #{2} GROUP BY departmentCode")
	public List<EventCount> queryDepType(String dep,String startTime,String endTime);
}
