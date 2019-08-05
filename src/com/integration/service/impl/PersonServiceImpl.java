package com.integration.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.PersonDAO;
import com.integration.entity.AttenceStatic;
import com.integration.entity.PatrolPerson;
import com.integration.service.PersonService;
@Service
public class PersonServiceImpl implements PersonService {
	@Autowired
	PersonDAO pd;
	
	
	@Override
	public List<PatrolPerson> find_PatrlLog_List(String department, String personName, String mobile,String projectType) {
		return pd.find_PatrlLog_List(department, personName, mobile,projectType);
	}


	@Override
	public void addNew(String identifyPhoto,String personName, Integer personSex, String mobile, String departmentVal,
			Integer authorized, Integer freezed, String remark,String id,String nationality,Integer age,String birthplace,String idCode,String birthday,Integer educated,Integer healthy,String homeAddress,Integer medicare,Integer old_age,Integer poverty,String superiorTree,Double nationalForestArea,String nationalForestCode,Integer employState,String patrolPlace,String contractDateBegin,String contractDateEnd,Double regionForestArea,String regionForestCode,String projectType,String accountNum,String regionName,Double regionArea) {
		// TODO Auto-generated method stub
		pd.addNew(identifyPhoto,personName,personSex,mobile,departmentVal,authorized,freezed,remark,id,nationality,age,birthplace,idCode,birthday,educated,healthy,homeAddress,medicare,old_age,poverty,superiorTree,nationalForestArea,nationalForestCode,employState,patrolPlace,contractDateBegin,contractDateEnd,regionForestArea,regionForestCode,projectType,accountNum,regionName,regionArea);	
	}


	@Override
	public void edit(String identifyPhoto,String personName, Integer personSex, String mobile, String departmentVal,
			Integer authorized, Integer freezed, String remark, String id,String nationality,Integer age,String birthplace,String idCode,String birthday,Integer educated,Integer healthy,String homeAddress,Integer medicare,Integer old_age,Integer poverty,String superiorTree,Double nationalForestArea,String nationalForestCode,Integer employState,String patrolPlace,String contractDateBegin,String contractDateEnd,Double regionForestArea,String regionForestCode,Integer unemployReason,String unEmployDate,String projectType,String accountNum,String regionName,Double regionArea) {
		// TODO Auto-generated method stub
		pd.edit(personName,personSex,mobile,departmentVal,authorized,freezed,remark,id,identifyPhoto,nationality,age,birthplace,idCode,birthday,educated,healthy,homeAddress,medicare,old_age,poverty,superiorTree,nationalForestArea,nationalForestCode,employState,patrolPlace,contractDateBegin,contractDateEnd,regionForestArea,regionForestCode,unemployReason,unEmployDate,projectType,accountNum,regionName,regionArea);	
	}


	@Override
	public void Del(String id) {
		// TODO Auto-generated method stub
		pd.Del(id);
	}
        @Override
        public void remove(String id) {
                // TODO Auto-generated method stub
                pd.remove(id);
        }
	@Override
	public PatrolPerson findPersonBymobile(String mobile){
		return pd.findPersonBymobile(mobile);
	}
        @Override
        public List<PatrolPerson> findPersonByIdCode(String idCode){
            return pd.findPersonByIdCode(idCode);
        }

	@Override
	public void doFreeze(String id,String uuid) {
		// TODO Auto-generated method stub
		pd.doFreeze(id,uuid);
	}


	@Override
	public void cancleFreeze(String nowTime, String id) {
		// TODO Auto-generated method stub
		pd.cancleFreeze(nowTime, id);
	}
	
	@Override
	public void addAttenceNew(String personName,String mobile,String today,Integer d1,Integer d2,Integer d3,Integer d4,Integer d5,Integer d6,Integer d7,Integer d8,Integer d9,Integer d10,Integer d11,Integer d12,Integer d13,Integer d14,Integer d15,Integer d16,Integer d17,Integer d18,Integer d19,Integer d20,Integer d21,Integer d22,Integer d23,Integer d24,Integer d25,Integer d26,Integer d27,Integer d28,Integer d29,Integer d30,Integer d31,String uuid,String projectType,String idCode) {
		// TODO Auto-generated method stub
		pd.addAttenceNew(personName,mobile,today,d1,d2,d3,d4,d5,d6,d7,d8,d9,d10,d11,d12,d13,d14,d15,d16,d17,d18,d19,d20,d21,d22,d23,d24,d25,d26,d27,d28,d29,d30,d31,uuid,projectType,idCode);
	}
	
	@Override
	public String findProjectType(String id){
		return pd.findProjectType(id);
	}
	
	@Override
	public AttenceStatic AttenceInfo(String idCode, String patrolMonth){
		return pd.AttenceInfo(idCode, patrolMonth);
	}
	
	@Override
	public void editAttenceOld(String personName,String personMobile,String patrolMonth,Integer d1,Integer d2,Integer d3,Integer d4,Integer d5,Integer d6,Integer d7,Integer d8,Integer d9,Integer d10,Integer d11,Integer d12,Integer d13,Integer d14,Integer d15,Integer d16,Integer d17,Integer d18,Integer d19,Integer d20,Integer d21,Integer d22,Integer d23,Integer d24,Integer d25,Integer d26,Integer d27,Integer d28,Integer d29,Integer d30,Integer d31) {
		// TODO Auto-generated method stub
		pd.editAttenceOld(personName,personMobile,patrolMonth,d1,d2,d3,d4,d5,d6,d7,d8,d9,d10,d11,d12,d13,d14,d15,d16,d17,d18,d19,d20,d21,d22,d23,d24,d25,d26,d27,d28,d29,d30,d31);
	}


    @Override
    public List<PatrolPerson> findPersonOnGradByIdCode(String idcode) {
        // TODO Auto-generated method stub
        return pd.findPersonOnGradByIdCode(idcode);
    }

    @Override
	public List<PatrolPerson> findList() {
		return pd.findList();
	}
}
