package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.AttenceDetail;
import com.integration.entity.AttenceStatic;
import com.integration.entity.AttenceWaring;
import com.integration.entity.PatrolEvent;
import com.integration.entity.StandardDay;
import com.integration.entity.SumLength;
import com.integration.entity.RouteReplay;

public interface AttenceDAO {
        @Select("select ptt.patrolDate,pp.departmentVal departmentCode,(select departmentName from department where departmentCode=pp.departmentVal) as departmentName,"
                + "(select regionName from patrolRegion pr where pr.patrolMobileList like '%'+ pp.mobile +'%') as regionNameList,"
                + "(select regionNum from patrolRegion pr where pr.patrolMobileList like '%'+ pp.mobile +'%') as regionNum,ptt.qualified,ptt.trailLen,pp.personName,pp.mobile,pp.projectType from "
            +"(select pt.patrolDate,MAX(pt.qualified) as qualified,sum(pt.trailLen) as trailLen,pt.idCode from "
            +"(select patrolDate,(case qualified when 1 then 1 else 0 end) as qualified,trailLen ,idCode  from patrolTrail) pt "
            +"GROUP BY pt.patrolDate,pt.idCode) ptt,"
            +"patrolPerson pp where ptt.idCode=pp.idCode "
            + "and pp.departmentVal like #{0} "
            + "and pp.personName like #{1} " 
            + "and ptt.patrolDate like  #{2} "
            + "and pp.projectType like #{3} "
        + "ORDER BY pp.departmentVal ASC, pp.personName ASC,ptt.patrolDate DESC ")
	List<AttenceDetail> QueryAttenceDetail(String department, String personName, String attenceMonth,String projectType);
	
	@Select("select standardDay from standardDay  "
			+ "WHERE isEffective = 1 and  LEFT(effectiveDate,7) = #{0}")
	Integer getStandardDay(String attenceMonth);
	
	
	@Select("select pp.departmentCode,pp.departmentName, "
	        +"pp.mobile personMobile,pp.personName,pp.projectType,info.* " 
	        +"from (select dept.departmentCode,dept.departmentName,"
	        +"person.mobile,person.personName,person.projectType,person.idCode from patrolPerson person,department dept "
	        +"where person.isOnGard = 1 and dept.departmentCode=person.departmentVal and  person.departmentVal like #{0} and person.personName like #{1} and  person.projectType like #{3} and LEFT(person.employDate,7) <= #{2} and LEFT(person.unEmployDate,7)>=#{2}) as pp left join "
	        +"((select pa.day_1,pa.day_2,pa.day_3,pa.day_4,pa.day_5, "
	        +"pa.day_6,pa.day_7,pa.day_8,pa.day_9,pa.day_10,pa.day_11,"
	        + "pa.day_12,pa.day_13,pa.day_14,pa.day_15,pa.day_16,pa.day_17, "
	        +"pa.day_18,pa.day_19,pa.day_20,pa.day_21,pa.day_22,pa.day_23,"
	        + "pa.day_24,pa.day_25,pa.day_26,pa.day_27,pa.day_28, "
	        +"pa.day_29,pa.day_30,pa.day_31,pa.patrolMonth,pa.id,pa.idCode,"
	        + "pt.patrolDate,pt.sumLength  from patrolAttence pa, "
	        +"(select idCode,LEFT(patrolDate,7)  as patrolDate,sum(trailLen) "
	        + "as sumLength from patrolTrail  GROUP BY idCode,"
	        + "LEFT(patrolDate,7)) as pt "
	        +"where LEFT(pa.patrolMonth,7) = #{2} and pa.idCode = pt.idCode and LEFT(pa.patrolMonth,7)"
	        + "=LEFT(pt.patrolDate,7))) as info "
	        +"on  pp.idCode = info.idCode "
	        )
	List<AttenceStatic> AttenceStatic(String department, String personName, String attenceMonth,String projectType);
	
	@Select("select * from standardDay "
			+ "ORDER BY configDate DESC")
	List<StandardDay> QueryChangeRecords();
	
	@Insert("insert into standardDay "
			+ "VALUES (#{2},#{4},#{0},#{1},#{5},#{3},#{6})")
	void insert_setStandardDay_Record(String userName, String mobile, Integer standardDay, String today,
			String effectDay, String uuid,Integer isEffective);
	
	@Update("update standardDay set isEffective = 0 where effectiveDate = #{0}")
	void updateEff(String effectDay);
	
	
	@Select("select LEFT(pt.patrolDate,7) AS patrolMonth,SUM(pt.trailLen)  AS sumLength, "
			+ "pt.departmentCode,pt.personName,COUNT(pt.qualified) as qualifiedDays "
			+ "FROM patrolTrail pt "
			+ "where pt.qualified = 1 "
			+ "and LEFT(pt.patrolDate,7) = #{0} "
			+ "GROUP BY LEFT(pt.patrolDate,7),pt.departmentCode,pt.personName ")
	List<com.integration.entity.AttenceStatic> queryTrail(String thisMonth);
	
	@Select("select LEFT(pt.patrolDate,7) AS patrolMonth,SUM(pt.trailLen)  AS sumLength, "
			+ "pt.departmentCode,pt.personName,COUNT(pt.qualified) as qualifiedDays "
			+ "FROM patrolTrail pt "
			+ "where pt.qualified = 1 "
			+ "and LEFT(pt.patrolDate,4) = #{0} "
			+ "GROUP BY LEFT(pt.patrolDate,7),pt.departmentCode,pt.personName ")
	List<com.integration.entity.AttenceStatic> queryTrailYear(String thisMonth);
	
	@Select("select * from patrolEvent "
			+ "WHERE uploadtime > #{0} "
			+ "AND uploadtime < #{1}")
	List<PatrolEvent> queryEvent(String day_before, String day_after);
	
	@Select("SELECT TOP 10 SUM(trailLen) as licheng,personName as name from patrolTrail " 
			+ "where patrolDate LIKE #{0} "
			+ "GROUP BY personName "
			+ "ORDER BY licheng DESC")
	List<SumLength> queryTopTen(String thisMonth);
	
	@Select("SELECT licheng,departmentName as name \r\n" + 
			"FROM (SELECT  SUM(trailLen) as licheng,departmentCode as name from patrolTrail\r\n" + 
			"where patrolDate LIKE #{0}\r\n" + 
			"GROUP BY departmentCode)  t1 \r\n" + 
			"RIGHT JOIN department t2 \r\n" + 
			"on t1.name = t2.departmentCode where departmentCode <> '0' ")
	List<SumLength> queryEachDep(String thisMonth);
	
	@Select("SELECT p.mobile,p.idCode,t1.lastDay,p.personName,p.departmentVal FROM patrolPerson p "	
	+ "LEFT JOIN (select idCode,MAX(patrolDate) as lastDay FROM  patrolTrail GROUP BY mobile,idCode) t1  "
	+ "ON t1.idCode = p.idCode WHERE lastDay < #{0} or lastDay is NULL "
	+ "ORDER BY lastDay DESC")
	List<AttenceWaring> QueryAttenceWaring(String date_qiantian);
	
	@Select("SELECT COUNT(id) as renci_chuqin FROM patrolTrail " + 
			"WHERE patrolDate >= #{0} AND patrolDate < #{1} ")
	Integer find_renci_chuqin(String day_before, String day_after);
	
	@Select("SELECT * FROM " + 
			"patrolTrail pt "
			+ "where patrolDate LIKE #{0} ")
	List<RouteReplay> QueryShichang(String thisMonth);
}
