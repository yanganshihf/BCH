package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.integration.entity.Patroler;

public interface LocationDAO {


	@Select("select r.*,p.personName,p.personSex,p.identifyPhoto,p.departmentVal,p.employDate,p.unEmployDate  FROM patrolPosition r INNER JOIN patrolPerson p on r.Mobile = p.Mobile  ORDER BY r.UploadTime DESC")
	public List<Patroler> listPatroler();
	@Select("select r.*,p.personName,p.personSex,p.identifyPhoto,p.departmentVal,(select departmentName from department where departmentCode=p.departmentVal) as department,p.employDate,p.unEmployDate  FROM patrolPosition r INNER JOIN patrolPerson p on r.Mobile = p.Mobile "
			+ "where  r.isOnline = 1 and p.isOngard=1 and p.departmentVal like #{0} and r.Mobile like #{1} and p.PersonName like #{2} and p.projectType like #{3}  "
			+ "ORDER BY r.UploadTime DESC")
	public List<Patroler> queryPatroler(String department, String mobile, String personName,String projectType);
}
