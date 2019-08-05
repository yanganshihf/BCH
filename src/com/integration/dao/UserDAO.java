package com.integration.dao;
import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.integration.entity.SysUser;
public interface UserDAO {

	@Select("select * from systemUser where mobile = #{0} and password = #{1}")  
	public SysUser loginUser(String mobile, String password);
	@Select("select * from systemUser where mobile = #{0}")  
	public SysUser findUserByMobile(String mobile);
	@Select("select * from systemUser where mobile like #{0} and username like #{1} and departmentVal like #{2} and role_id <> '0'")  
	public List<SysUser> findUserByMobileAndName(String mobile,String name,String department);
}