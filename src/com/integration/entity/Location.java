package com.integration.entity;

public class Location {
	
private String sbid;//人员编号
private String date;
private String time;
private double longitude;
private double latitude;
private String xCoor;
private String yCoor;
private int isonline;

public String getSbid() {
	return sbid;
}
public void setSbid(String sbid) {
	this.sbid = sbid;
}
public String getDate() {
	return date;
}
public void setDate(String date) {
	this.date = date;
}
public String getTime() {
	return time;
}
public void setTime(String time) {
	this.time = time;
}

public double getLongitude() {
	return longitude;
}
public void setLongitude(double longitude) {
	this.longitude = longitude;
}
public double getLatitude() {
	return latitude;
}
public void setLatitude(double latitude) {
	this.latitude = latitude;
}
public int getIsonline() {
	return isonline;
}
public void setIsonline(int isonline) {
	this.isonline = isonline;
}
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



}
