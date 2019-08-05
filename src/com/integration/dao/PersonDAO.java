package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.AttenceStatic;
import com.integration.entity.PatrolPerson;

public interface PersonDAO {
	@Select("select p.*,(SELECT  departmentName from department where departmentCode = p.departmentVal) as departmentName from patrolPerson p "
			+ "where isOnGard=1 and personName like #{1} "
			+ "and mobile like #{2} "
			+ "and departmentVal like #{0} "
			+ "and projectType like #{3}")
	List<PatrolPerson> find_PatrlLog_List(String department, String personName, String mobile,String projectType);

	@Insert("insert into patrolPerson "
			+ "(identifyPhoto,personName,personSex,mobile,departmentVal,authorized,freezed,remark,id,nationality,age,birthplace,idCode,birthday,educated,healthy,homeAddress,medicare,old_age,poverty,superiorTree,nationalForestArea,nationalForestCode,employState,patrolPlace,contractDateBegin,contractDateEnd,regionForestArea,regionForestCode,projectType,accountNum,regionName,regionArea) "
			+ " values (#{0},#{1},#{2},#{3},#{4},#{5},#{6},#{7},#{8},#{9},#{10},#{11},#{12},#{13},#{14},#{15},#{16},#{17},#{18},#{19},#{20},#{21},#{22},#{23},#{24},#{25},#{26},#{27},#{28},#{29},#{30},#{31},#{32})")
	void addNew(String identifyPhoto,String personName, Integer personSex, String mobile, String departmentVal,
			Integer authorized, Integer freezed, String remark,String id,String nationality,Integer age,String birthplace,String idCode,String birthday,Integer educated,
			Integer healthy,String homeAddress,Integer medicare,Integer old_age,Integer poverty,String superiorTree,
			Double nationalForestArea,String nationalForestCode,Integer employState,String patrolPlace,
			String contractDateBegin,String contractDateEnd,Double regionForestArea,String regionForestCode,String projectType,String accountNum,String regionName,Double regionArea);
	
	@Update("update patrolPerson "
			+ "set identifyPhoto = #{8}, personName = #{0},personSex = #{1},mobile = #{2},departmentVal = #{3} "
			+ ",authorized = #{4},freezed = #{5},remark = #{6},nationality = #{9},age = #{10},birthplace = #{11},idCode = #{12},birthday = #{13},educated = #{14} "
			+ ",healthy = #{15},homeAddress = #{16},medicare = #{17},old_age = #{18},poverty = #{19},superiorTree = #{20},nationalForestArea = #{21},nationalForestCode = #{22} "
			+ ",employState = #{23},patrolPlace = #{24},contractDateBegin = #{25},contractDateEnd = #{26},regionForestArea = #{27},regionForestCode = #{28},unemployReason = #{29},unEmployDate = #{30},projectType = #{31},accountNum = #{32},regionName = #{33},regionArea = #{34} "
			+ " where id = #{7}")
	void edit(String personName, Integer personSex, String mobile, String departmentVal,
			Integer authorized, Integer freezed, String remark, String id,String identifyPhoto,
			String nationality,Integer age,String birthplace,String idCode,String birthday,Integer educated,
			Integer healthy,String homeAddress,Integer medicare,Integer old_age,Integer poverty,String superiorTree,
			Double nationalForestArea,String nationalForestCode,Integer employState,String patrolPlace,
			String contractDateBegin,String contractDateEnd,Double regionForestArea,String regionForestCode,
			Integer unemployReason,String unEmployDate,String projectType,String accountNum,String regionName,Double regionArea);
	
	@Delete("delete from patrolPerson "
			+ "where idCode = #{0} ")
	void remove(String id);
        @Update("update  patrolPerson set isOnGard=0,unEmployDate = GETDATE() "
                + "where id = #{0} ")
        void Del(String id);	
	@Select("select * from patrolPerson "
			+ "where mobile = #{0} and isOnGard=1")
	public PatrolPerson findPersonBymobile(String mobile);
        @Select("select * from patrolPerson "
                + "where idCode = #{0}")
        public List<PatrolPerson> findPersonByIdCode(String idCode);	
        
        @Select("select * from patrolPerson "
                + "where idCode = #{0} and isOnGard=1")
        public List<PatrolPerson> findPersonOnGradByIdCode(String idCode);
	@Select("select projectType from patrolPerson "
			+ "where id = #{0}")
	public String findProjectType(String id);
	
	@Update("update patrolPerson "
			+ "set freezed = 1,IMEI='', freezeIMEI = IMEI "
			+ "where id = #{0}")
	void doFreeze(String id, String uuid);
	
	@Update("update patrolPerson "
			+ "set freezed = 0, unfreezeTime = #{0} "
			+ "where id = #{1}")
	void cancleFreeze(String nowTime, String id);
	
	@Insert("insert into patrolAttence "
			+ "(personName,personMobile,patrolMonth,day_1,day_2,day_3,day_4,day_5,day_6,day_7,day_8,day_9,day_10,day_11,day_12,day_13,day_14,day_15,day_16,day_17,day_18,day_19,day_20,day_21,day_22,day_23,day_24,day_25,day_26,day_27,day_28,day_29,day_30,day_31,id,projectType,idCode) "
			+ " values (#{0},#{1},#{2},#{3},#{4},#{5},#{6},#{7},#{8},#{9},#{10},#{11},#{12},#{13},#{14},#{15},#{16},#{17},#{18},#{19},#{20},#{21},#{22},#{23},#{24},#{25},#{26},#{27},#{28},#{29},#{30},#{31},#{32},#{33},#{34},#{35},#{36})")
	void addAttenceNew(String personName,String mobile,String today,Integer d1,Integer d2,Integer d3,Integer d4,Integer d5,Integer d6,Integer d7,Integer d8,Integer d9,Integer d10,Integer d11,Integer d12,Integer d13,Integer d14,Integer d15,Integer d16,Integer d17,Integer d18,Integer d19,Integer d20,Integer d21,Integer d22,Integer d23,Integer d24,Integer d25,Integer d26,Integer d27,Integer d28,Integer d29,Integer d30,Integer d31,String uuid,String projectType,String idCode);

	@Select("select * from patrolAttence "
			+ "where idCode = #{0} "
			+ "and LEFT(patrolMonth,7) = #{1} ")
	AttenceStatic AttenceInfo(String idCode, String patrolMonth);
	
	@Update("update patrolAttence "
			+ "set day_1 = #{3},day_2 = #{4},day_3 = #{5},day_4 = #{6},day_5 = #{7},day_6 = #{8},day_7 = #{9},day_8 = #{10},day_9 = #{11},day_10 = #{12},day_11 = #{13},"
			+ "day_12 = #{14},day_13 = #{15},day_14 = #{16},day_15 = #{17},day_16 = #{18},day_17 = #{19},day_18 = #{20},day_19 = #{21},day_20 = #{22},day_21 = #{23},day_22 = #{24},"
			+ "day_23 = #{25},day_24 = #{26},day_25 = #{27},day_26 = #{28},day_27 = #{29},day_28 = #{30},day_29 = #{31},day_30 = #{32},day_31 = #{33} "
			+ "where personName = #{0} and personMobile = #{1} and LEFT(patrolMonth,7) = #{2} ")
	void editAttenceOld(String personName,String personMobile,String patrolMonth,Integer d1,Integer d2,Integer d3,Integer d4,Integer d5,Integer d6,Integer d7,Integer d8,Integer d9,Integer d10,Integer d11,Integer d12,Integer d13,Integer d14,Integer d15,Integer d16,Integer d17,Integer d18,Integer d19,Integer d20,Integer d21,Integer d22,Integer d23,Integer d24,Integer d25,Integer d26,Integer d27,Integer d28,Integer d29,Integer d30,Integer d31);
	
	@Select("select * from patrolPerson p "
			+ "where isOnGard = 1 ")
	List<PatrolPerson> findList();

}
