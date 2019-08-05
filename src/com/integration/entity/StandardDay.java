package com.integration.entity;

public class StandardDay {
	private Integer standardDay;
	private String effectiveDate;
	private String managerName;
	private String managerMobile;
	private String configDate;
	private String id;
	private Integer isEffective;
	public Integer getStandardDay() {
		return standardDay;
	}
	public void setStandardDay(Integer standardDay) {
		this.standardDay = standardDay;
	}
	public String getEffectiveDate() {
		return effectiveDate;
	}
	public void setEffectiveDate(String effectiveDate) {
		this.effectiveDate = effectiveDate;
	}
	public String getManagerName() {
		return managerName;
	}
	public void setManagerName(String managerName) {
		this.managerName = managerName;
	}
	public String getManagerMobile() {
		return managerMobile;
	}
	public void setManagerMobile(String managerMobile) {
		this.managerMobile = managerMobile;
	}
	public String getConfigDate() {
		return configDate;
	}
	public void setConfigDate(String configDate) {
		this.configDate = configDate.substring(0, 16);
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Integer getIsEffective() {
		return isEffective;
	}
	public void setIsEffective(Integer isEffective) {
		this.isEffective = isEffective;
	}
}
