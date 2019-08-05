package com.integration.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.DepartmentDAO;
import com.integration.entity.Department;
import com.integration.service.DepartmentService;

@Service
public class DepartmentServiceImpl implements DepartmentService {
	@Autowired
	private DepartmentDAO departmentDAO;
	
	@Override
	public List<Department> listDepartment() {
		// TODO Auto-generated method stub
		return departmentDAO.listDepartment();
	}

	@Override
	public List<Department> findDepByCode(String departmentCode) {
		// TODO Auto-generated method stub
		return departmentDAO.findDepByCode(departmentCode);
	}
	
}
