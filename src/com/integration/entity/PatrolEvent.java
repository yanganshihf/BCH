package com.integration.entity;

public class PatrolEvent {

	private String eventPhoto;// 事件照片
	private String eventVedio;// 事件视频
	private String eventRedio;// 事件录音
	private String mobile;//  上报人员电话
	private String happenTime;// 发生时间
	private String uploadTime;// 上传时间
	private String eventText;// 事件描述
	
	private String responseTime;// 回复时间
	private String responsePeople;// 回复人员
	private String responseSuggestion; // 回复意见
	private String readedPersons; // 已读人员
	
	private String departmentCode;// 单位
	private String projectType;// 
	private String id;// 主键
	private String reportPeople;// 上报人员
	private String departmentName;// 单位
	private String responsed;// 回复状态
	private String statusCode;//处理状态
	private String eventType;//事件类型
	
	
	public String getResponsed() {
		return responsed;
	}
	public void setResponsed(String responsed) {
		this.responsed = responsed;
	}
	public String getEventPhoto() {
		return eventPhoto;
	}
	public void setEventPhoto(String eventPhoto) {
		this.eventPhoto = eventPhoto;
	}
	public String getEventVedio() {
		return eventVedio;
	}
	public void setEventVedio(String eventVedio) {
		this.eventVedio = eventVedio;
	}
	public String getEventRedio() {
		return eventRedio;
	}
	public void setEventRedio(String eventRedio) {
		this.eventRedio = eventRedio;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getHappenTime() {
		return happenTime;
	}
	public void setHappenTime(String happenTime) {
		this.happenTime = happenTime.substring(0, 16);
	}
	public String getUploadTime() {
		return uploadTime;
	}
	public void setUploadTime(String uploadTime) {
		this.uploadTime = uploadTime.substring(0, 16);
	}
	public String getEventText() {
		return eventText;
	}
	public void setEventText(String eventText) {
		this.eventText = eventText;
	}
	
	public String getResponseTime() {
		return responseTime;
	}
	public void setResponseTime(String responseTime) {
		this.responseTime = responseTime.substring(0, 16);
	}
	public String getResponsePeople() {
		return responsePeople;
	}
	public void setResponsePeople(String responsePeople) {
		this.responsePeople = responsePeople;
	}
	public String getResponseSuggestion() {
		return responseSuggestion;
	}
	public void setResponseSuggestion(String responseSuggestion) {
		this.responseSuggestion = responseSuggestion;
	}
	public String getReadedPersons() {
		return readedPersons;
	}
	public void setReadedPersons(String readedPersons) {
		this.readedPersons = readedPersons;
	}
	public String getDepartmentCode() {
		return departmentCode;
	}
	public void setDepartmentCode(String departmentCode) {
		this.departmentCode = departmentCode;
	}
	public String getProjectType() {
		return projectType;
	}
	public void setProjectType(String projectType) {
		this.projectType = projectType;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getReportPeople() {
		return reportPeople;
	}
	public void setReportPeople(String reportPeople) {
		this.reportPeople = reportPeople;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	
	public String getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}
	
	public String getEventType() {
		return eventType;
	}
	public void setEventType(String eventType) {
		this.eventType = eventType;
	}
}
