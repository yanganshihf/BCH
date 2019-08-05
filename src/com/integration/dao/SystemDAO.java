package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.SysUser;
import com.integration.entity.SysRole;

public interface SystemDAO {
	@Select("select * from systemUser "
			+ "where userName like #{1} "
			+ "and mobile like #{2} "
			+ "and departmentVal like #{0} "
			+"and role_id like #{3}")
	List<SysUser> find_SysUser_List(String department, String personName, String mobile,String role);
	
	@Select("select * from systemUser "
			+ "where mobile = #{0}")
   public SysUser findUserBymobile(String mobile);
	
	@Insert("insert into systemUser "
			+"VALUES (#{0},#{1},#{2},#{3},#{4},#{5},#{6})")
	void insert_Sysuser(String password,String personName,String mobile,String remark,String department,String uuid,String role);
	
	@Update("update systemUser "
			+ "set password = #{0},userName = #{1},mobile = #{2},remarks = #{3},departmentVal = #{4},role_id = #{6} "
			+ "where id = #{5} ")
	void update_Sysuser(String password,String personName,String mobile,String remarks,String department,String id,String role);
	
	@Delete("delete from systemUser "
			+ "where id = #{0} ")
	void del_Sysuser(String id);
	
	@Select("select * from systemUser "
			+ "where id = #{0}")
	public SysUser findPwdByID(String id);
	
	@Update("update systemUser "
			+ "set password = #{1} "
			+ "where id = #{0}")
	void editPwdById(String id,String password);
	
	@Select("select * from systemRole "
			+ "where 1 = 1")
	List<SysRole> queryRole();
	
	@Delete("delete from systemRole "
			+ "where id = #{0} ")
	void del_SysRole(String id);
	
	@Update("update systemRole "
			+ "set menuArray = #{2},roleName = #{1} "
			+ "where id = #{0}")
	void editSysRole(String id,String roleName,String menuArray);
	
	@Select("select max(id) from systemRole")
	public String getMaxId();
	
	@Insert("insert into systemRole (roleName,id) "
			+"VALUES (#{0},#{1})")
	void addSysRole(String roleName,String id);
	
}
