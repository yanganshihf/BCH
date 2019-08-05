package com.integration.entity;

/**
 * 出勤预警包装类
 * 
 * @author yanganshi
 * @time 2019-1-9 16:37:00
 */
public class AttenceWaring {
	private String mobile;
	private String lastDay;
	private String personName;
	private String departmentVal;
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getLastDay() {
		return lastDay;
	}
	public void setLastDay(String lastDay) {
		this.lastDay = lastDay;
	}
	public String getPersonName() {
		return personName;
	}
	public void setPersonName(String personName) {
		this.personName = personName;
	}
	public String getDepartmentVal() {
		return departmentVal;
	}
	public void setDepartmentVal(String departmentVal) {
		this.departmentVal = departmentVal;
	}
	
}
