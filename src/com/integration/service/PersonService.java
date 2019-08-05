package com.integration.service;

import java.util.List;

import com.integration.entity.AttenceStatic;
import com.integration.entity.PatrolPerson;

public interface PersonService {

	List<PatrolPerson> find_PatrlLog_List(String department, String personName, String mobile,String projectType);

	
	void addNew(String identifyPhoto, String personName, Integer personSex, String mobile, String departmentVal,
			Integer authorized, Integer freezed, String remark,String id,String nationality,Integer age,String birthplace,String idCode,String birthday,Integer educated,Integer healthy,String homeAddress,Integer medicare,Integer old_age,Integer poverty,String superiorTree,Double nationalForestArea,String nationalForestCode,Integer employState,String patrolPlace,String contractDateBegin,String contractDateEnd,Double regionForestArea,String regionForestCode,String projectType,String accountNum,String regionName,Double regionArea);


	void edit(String identifyPhoto, String personName, Integer personSex, String mobile, String departmentVal,
			Integer authorized, Integer freezed, String remark, String id,String nationality,Integer age,String birthplace,String idCode,String birthday,Integer educated,Integer healthy,String homeAddress,Integer medicare,Integer old_age,Integer poverty,String superiorTree,Double nationalForestArea,String nationalForestCode,Integer employState,String patrolPlace,String contractDateBegin,String contractDateEnd,Double regionForestArea,String regionForestCode,Integer unemployReason,String unEmployDate,String projectType,String accountNum,String regionName,Double regionArea);


	void Del(String id);
	void remove(String id);
	public PatrolPerson findPersonBymobile(String mobile);

	public List<PatrolPerson> findPersonByIdCode(String idcode);
	
	public List<PatrolPerson> findPersonOnGradByIdCode(String idcode);
	void doFreeze(String id, String uuid);


	void cancleFreeze(String nowTime, String id);
	
	void addAttenceNew(String personName,String mobile,String today,Integer d1,Integer d2,Integer d3,Integer d4,Integer d5,Integer d6,Integer d7,Integer d8,Integer d9,Integer d10,Integer d11,Integer d12,Integer d13,Integer d14,Integer d15,Integer d16,Integer d17,Integer d18,Integer d19,Integer d20,Integer d21,Integer d22,Integer d23,Integer d24,Integer d25,Integer d26,Integer d27,Integer d28,Integer d29,Integer d30,Integer d31,String uuid,String projectType,String idCode);
	
	public String findProjectType(String id);
	
	public AttenceStatic AttenceInfo(String idCode, String patrolMonth);
	
	void editAttenceOld(String personName,String personMobile,String patrolMonth,Integer d1,Integer d2,Integer d3,Integer d4,Integer d5,Integer d6,Integer d7,Integer d8,Integer d9,Integer d10,Integer d11,Integer d12,Integer d13,Integer d14,Integer d15,Integer d16,Integer d17,Integer d18,Integer d19,Integer d20,Integer d21,Integer d22,Integer d23,Integer d24,Integer d25,Integer d26,Integer d27,Integer d28,Integer d29,Integer d30,Integer d31);
	
	List<PatrolPerson> findList();
}
