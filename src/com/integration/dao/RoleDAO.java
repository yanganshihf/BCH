package com.integration.dao;
 
import java.util.List;
 
import org.apache.ibatis.annotations.Select;
 
import com.integration.entity.SysRole;
 
public interface RoleDAO {
   public void saveRole(SysRole sysRole);
 
   public void removeRole(SysRole sysRole);
 
   public void updateRole(SysRole sysRole);
   /*@Select("SELECT r.* FROM systemUser u "
           +" INNER JOIN user_Role ur ON  u.id = ur.user_id "
           +" INNER JOIN systemRole r ON r.id = ur.role_id"
           +" WHERE u.id = #{0}")*/
   @Select("select * from systemRole "
			+ "where id = #{0}")
   public SysRole findRoleById(String sysRoleId);
   /**
    * Method:通过用户id获取用户的角色
    * 修改人：石敏
    * 日期：2017.10.31 10:50:45
    */
   public String findRoleByUserName(String username);
   
   public List<SysRole> listRoles();
   
}