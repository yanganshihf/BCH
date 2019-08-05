package com.integration.service;

import java.util.List;

import com.integration.entity.Department;

public interface DepartmentService {
	public List<Department> listDepartment();

	public List<Department> findDepByCode(String departmentCode);
}
