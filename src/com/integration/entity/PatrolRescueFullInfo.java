package com.integration.entity;

public class PatrolRescueFullInfo extends PatrolRescue {
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
