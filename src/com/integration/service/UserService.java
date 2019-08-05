package com.integration.service;
import java.util.List;

import com.integration.entity.SysMenu;
import com.integration.entity.SysRole;
import com.integration.entity.SysUser;
public interface UserService {
	
	public List<SysMenu> findMenuByUserId(String id);	
	public SysUser loginUser(String mobile, String password);
	public SysRole findSysRoleById(String id);
	public SysUser findUserByMobile(String mobile);
	public List<SysUser> findUserByMobileAndName(String mobile,String name,String department);
}
