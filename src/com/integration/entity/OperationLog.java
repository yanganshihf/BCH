package com.integration.entity;

public class OperationLog {
	private String id;
	private String ModuleType;
	private String OperationType;
	private String logUser;
	private String logMobile;
	private String logTime;
	private String OperationInfo;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	public String getModuleType() {
		return ModuleType;
	}
	public void setModuleType(String ModuleType) {
		this.ModuleType = ModuleType;
	}
	
	public String getOperationType() {
		return OperationType;
	}
	public void setOperationType(String OperationType) {
		this.OperationType = OperationType;
	}
	public String getlogUser() {
		return logUser;
	}
	public void setlogUser(String logUser) {
		this.logUser = logUser;
	}
	public String getlogMobile() {
		return logMobile;
	}
	public void setlogMobile(String logMobile) {
		this.logMobile = logMobile;
	}
	public String getlogTime() {
		return logTime;
	}
	public void setlogTime(String logTime) {
		this.logTime = logTime.substring(0, 19);
	}
	public String getOperationInfo() {
		return OperationInfo;
	}
	public void setOperationInfo(String OperationInfo) {
		this.OperationInfo = OperationInfo;
	}
}