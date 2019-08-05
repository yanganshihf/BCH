package com.integration.entity;

public class PatrolRescue {
	
	private String departmentCode;
	private String personName;
	private String hasReaded;
	private String reportTime;
	private String mobile;
	private String id;
	private String Acceptor;
	private String projectType;
	private String departmentName;// 单位
	private String AcceptTime;
	
	
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getAcceptor() {
		return Acceptor;
	}
	public void setAcceptor(String Acceptor) {
		this.Acceptor = Acceptor;
	}
	public String getAcceptTime() {
		return AcceptTime;
	}
	public void setAcceptTime(String AcceptTime) {
		this.AcceptTime = AcceptTime.substring(0, 19);
	}
	public String getDepartmentCode() {
		return departmentCode;
	}
	public void setDepartmentCode(String departmentCode) {
		this.departmentCode = departmentCode;
	}
	public String getPersonName() {
		return personName;
	}
	public void setPersonName(String personName) {
		this.personName = personName;
	}
	public String getHasReaded() {
		return hasReaded;
	}
	public void setHasReaded(String hasReaded) {
		this.hasReaded = hasReaded;
	}
	public String getReportTime() {
		return reportTime;
	}
	public void setReportTime(String reportTime) {
		this.reportTime = reportTime.substring(0, 19);
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
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
	
	private String xCoor;
	private String yCoor;
	private String longitude;
	private String latitude;
	private String sosId;
	public String getxCoor() {
		return xCoor;
	}
	public void setxCoor(String xCoor) {
		this.xCoor = xCoor;
	}
	public String getyCoor() {
		return yCoor;
	}
	public void setyCoor(String yCoor) {
		this.yCoor = yCoor;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getSosId() {
		return sosId;
	}
	public void setSosId(String sosId) {
		this.sosId = sosId;
	}
	
}
