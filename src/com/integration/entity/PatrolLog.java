package com.integration.entity;

public class PatrolLog {
	private String personName;
	private String patrolDate;
	private String logText;
	private String uploadTime;
	private String weather;
	private String mobile;
	private String departmentCode;
	private String id;
	private String projectType;
	private String departmentName;// 单位
	public String getPersonName() {
		return personName;
	}
	public void setPersonName(String personName) {
		this.personName = personName;
	}
	public String getPatrolDate() {
		return patrolDate;
	}
	public void setPatrolDate(String patrolDate) {
		this.patrolDate = patrolDate;
	}
	public String getLogText() {
		return logText;
	}
	public void setLogText(String logText) {
		this.logText = logText;
	}
	public String getUploadTime() {
		return uploadTime.substring(0, 16);
	}
	public void setUploadTime(String uploadTime) {
		this.uploadTime = uploadTime.substring(0, 16);
	}
	public String getWeather() {
		return weather;
	}
	public void setWeather(String weather) {
		this.weather = weather;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getDepartmentCode() {
		return departmentCode;
	}
	public void setDepartmentCode(String departmentCode) {
		this.departmentCode = departmentCode;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getProjectType(){
		return projectType;
	}
	public void setProjectType(String projectType){
		this.projectType = projectType;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
}
