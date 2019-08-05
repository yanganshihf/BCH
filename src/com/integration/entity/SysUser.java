package com.integration.entity;

import java.io.Serializable;

public class SysUser implements Serializable{
	
	private static final long serialVersionUID = -2143253453426L;
	
	private String id;
	private String userName;
	private String password;
	private String departmentVal;
	private String mobile;
	private String remarks;
	private String role_id;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getDepartmentVal() {
		return departmentVal;
	}
	public void setDepartmentVal(String departmentVal) {
		this.departmentVal = departmentVal;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getRole_id() {
		return role_id;
	}
	public void setRole_id(String role_id) {
		this.role_id = role_id;
	}
	

}
