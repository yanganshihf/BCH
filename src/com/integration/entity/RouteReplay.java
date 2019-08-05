package com.integration.entity;

public class RouteReplay {
	
	private String startTime;
	private String endTime;
	private String trailPoint;
	private String trailLen;
	private String uploadtime;
	private String mobile;
	private String patrolDate;
	private String departmentCode;

	private String id;
	private String qualified;
	private String personName;
	
	private String time;
	

	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime.substring(0, 5);
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime.substring(0, 5);
	}
	public String getTrailPoint() {
		return trailPoint;
	}
	public void setTrailPoint(String trailPoint) {
		this.trailPoint = trailPoint;
	}
	public String getTrailLen() {
		return trailLen;
	}
	public void setTrailLen(String trailLen) {
		this.trailLen = trailLen;
	}
	public String getUploadtime() {
		return uploadtime;
	}
	public void setUploadtime(String uploadtime) {
		this.uploadtime = uploadtime;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getPatrolDate() {
		return patrolDate;
	}
	public void setPatrolDate(String patrolDate) {
		this.patrolDate = patrolDate;
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
	public String getQualified() {
		return qualified;
	}
	public void setQualified(String qualified) {
		this.qualified = qualified;
	}
	public String getPersonName() {
		return personName;
	}
	public void setPersonName(String personName) {
		this.personName = personName;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	
	
	
	
}