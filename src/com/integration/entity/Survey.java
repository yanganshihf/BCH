package com.integration.entity;

import java.util.List;

/**
 * 巡护概况实体类
 * 
 * @author yanganshi
 * @time 2019-1-7 09:51:52
 */
public class Survey {
	private String month;
	private Integer renci_chuqin;
	private Integer shichang;
	private Double licheng;
	private Integer days_dabiao;
	private Integer num_events;
	private Integer num_photos;
	private List<SumLength> topTen;
	private List<SumLength> eachDep;
	private String diff_Time;
	private String eventsDep;
	
	public List<SumLength> getTopTen() {
		return topTen;
	}
	public void setTopTen(List<SumLength> topTen) {
		this.topTen = topTen;
	}
	public List<SumLength> getEachDep() {
		return eachDep;
	}
	public void setEachDep(List<SumLength> eachDep) {
		this.eachDep = eachDep;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public Integer getRenci_chuqin() {
		return renci_chuqin;
	}
	public void setRenci_chuqin(Integer renci_chuqin) {
		this.renci_chuqin = renci_chuqin;
	}
	public Integer getShichang() {
		return shichang;
	}
	public void setShichang(Integer shichang) {
		this.shichang = shichang;
	}
	
	
	public Double getLicheng() {
		return licheng;
	}
	public void setLicheng(Double licheng) {
		this.licheng = licheng;
	}
	public Integer getDays_dabiao() {
		return days_dabiao;
	}
	public void setDays_dabiao(Integer days_dabiao) {
		this.days_dabiao = days_dabiao;
	}
	public Integer getNum_events() {
		return num_events;
	}
	public void setNum_events(Integer num_events) {
		this.num_events = num_events;
	}
	public Integer getNum_photos() {
		return num_photos;
	}
	public void setNum_photos(Integer num_photos) {
		this.num_photos = num_photos;
	}
	
	public String getDiff_Time(){
		return diff_Time;
	}
	public void setDiff_Time(String diff_Time){
		this.diff_Time = diff_Time;
	}
	public String getEventsDep(){
		return eventsDep;
	}
	public void setEventsDep(String eventsDep){
		this.eventsDep = eventsDep;
	}
}
