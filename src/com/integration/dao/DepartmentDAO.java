package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.integration.entity.Department;

/**
 * 
 * 
 * @author yanganshi
 * @time 2018-10-15 16:11:46
 */
public interface DepartmentDAO {
	@Select("select * from department")
	List<Department> listDepartment();
	@Select("select * from department where departmentCode = #{0}")
	List<Department> findDepByCode(String departmentCode);
}
