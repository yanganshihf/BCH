package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.integration.entity.SysMenu;

public interface MenuDAO {
	@Select("SELECT m.* FROM systemUser u INNER JOIN user_Role ur ON u.id = ur.user_id "
			+ " INNER JOIN role_Authority rm ON ur.role_id = rm.authority_id "
			+ " INNER JOIN systemAuthority m ON rm.authority_id = m.id WHERE u.id = #{0} order by m.authorityCode")
	public List<SysMenu> findByUserId(String id);
}
