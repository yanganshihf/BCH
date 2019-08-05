package com.integration.entity;

public class Notice {
	private String noticeTitle;
	private String noticeCode;
	private String publicer;
	private String publicTime;
	private String publicText;
	private String id;
	public String getNoticeTitle() {
		return noticeTitle;
	}
	public void setNoticeTitle(String noticeTitle) {
		this.noticeTitle = noticeTitle;
	}
	public String getNoticeCode() {
		return noticeCode;
	}
	public void setNoticeCode(String noticeCode) {
		this.noticeCode = noticeCode;
	}
	public String getPublicer() {
		return publicer;
	}
	public void setPublicer(String publicer) {
		this.publicer = publicer;
	}
	
	public String getPublicTime() {
		return publicTime;
	}
	public void setPublicTime(String publicTime) {
		this.publicTime = publicTime.substring(0, 16);
	}
	public String getPublicText() {
		return publicText;
	}
	public void setPublicText(String publicText) {
		this.publicText = publicText;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	
}
