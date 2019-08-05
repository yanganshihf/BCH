package com.integration.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.SystemDAO;
import com.integration.entity.SysUser;
import com.integration.entity.SysRole;
import com.integration.service.SystemService;

@Service
public class SystemServiceImpl implements SystemService {
	@Autowired
	SystemDAO sd;
	
	@Override
	public List<SysUser> find_SysUser_List(String department, String personName, String mobile,String role) {
		// TODO Auto-generated method stub
		return sd.find_SysUser_List(department, personName, mobile,role);
	}
	@Override
	public SysUser findUserBymobile(String mobile){
		return sd.findUserBymobile(mobile);
	}
	@Override
	public void insert_Sysuser(String password,String personName,String mobile,String remark,String department,String uuid,String role){
		sd.insert_Sysuser(password,personName,mobile,remark,department,uuid,role);
	}
	@Override
	public void update_Sysuser(String password,String personName,String mobile,String remarks,String department,String id,String role){
		sd.update_Sysuser(password,personName,mobile,remarks,department,id,role);
	}
	@Override
	public void del_Sysuser(String id) {
		// TODO Auto-generated method stub
		sd.del_Sysuser(id);
	}
	
	@Override
	public SysUser findPwdByID(String id){
		return sd.findPwdByID(id);
	}
	@Override
	public void editPwdById(String id,String password){
		sd.editPwdById(id,password);
	}
	@Override
	public List<SysRole> queryRole(){
		return sd.queryRole();
	}
	
	@Override
	public void del_SysRole(String id) {
		// TODO Auto-generated method stub
		sd.del_SysRole(id);
	}
	
	@Override
	public void editSysRole(String id,String roleName,String menuArray){
		sd.editSysRole(id,roleName,menuArray);
	}
	
	@Override
	public String getMaxId(){
		return sd.getMaxId();
	}
	@Override
	public void addSysRole(String roleName,String id){
		sd.addSysRole(roleName,id);
	}
	
}
