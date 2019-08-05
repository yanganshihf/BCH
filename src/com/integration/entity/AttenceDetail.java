package com.integration.entity;

/**
 * 考勤详情
 * 
 * @author yanganshi
 *
 */
public class AttenceDetail {
	private String id;
	private String patrolDate;
	private String departmentCode;
	private String qualified;
	private String trailLen;
	private String personName;
	private String regionNameList;
	private String projectType;
	private String mobile;
	private String departmentName;// 单位
	private String regionNum;
	private Integer standardday;
	public Integer getStandardday() {
		return standardday;
	}
	public void setStandardday(Integer standardday) {
		this.standardday = standardday;
	}
	public String getRegionNum() {
		return regionNum;
	}
	public void setRegionNum(String regionNum) {
		this.regionNum = regionNum;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
	public String getQualified() {
		return qualified;
	}
	public void setQualified(String qualified) {
		this.qualified = qualified;
	}
	public String getTrailLen() {
		return trailLen;
	}
	public void setTrailLen(String trailLen) {
		this.trailLen = trailLen;
	}
	public String getPersonName() {
		return personName;
	}
	public void setPersonName(String personName) {
		this.personName = personName;
	}
	public String getRegionNameList() {
		return regionNameList;
	}
	public void setRegionNameList(String regionNameList) {
		this.regionNameList = regionNameList;
	}
	public String getProjectType(){
		return projectType;
	}
	public void setProjectType(String projectType){
		this.projectType = projectType;
	}
	public String getMobile(){
		return mobile;
	}
	public void setMobile(String mobile){
		this.mobile = mobile;
	}
	
}
