package com.integration.service;

import java.util.List;

import com.integration.entity.SysUser;
import com.integration.entity.SysRole;

public interface SystemService {

	List<SysUser> find_SysUser_List(String department, String personName, String mobile,String role);
	public SysUser findUserBymobile(String mobile);
	void insert_Sysuser(String password,String personName,String mobile,String remark,String department,String uuid,String role);
	void update_Sysuser(String password,String personName,String mobile,String remarks,String department,String id,String role);
	void del_Sysuser(String id);
	public SysUser findPwdByID(String id);
	void editPwdById(String id,String password);
	List<SysRole> queryRole();
	void del_SysRole(String id);
	void editSysRole(String id,String roleName,String menuArray);
	public String getMaxId();
	void addSysRole(String roleName,String id);
}
