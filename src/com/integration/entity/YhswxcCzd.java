package com.integration.entity;

import java.io.Serializable;
import java.util.List;

public class YhswxcCzd extends YhswxcCzdDc implements Serializable{
    
	private static final long serialVersionUID = 2406655155201433043L;

	private String uuid_Czd;

    private String diaocha_Sj;

    private String sheng;

    private String shi;

    private String xian;

    private String xian_Mc;

    private String xiang;

    private String xiang_Mc;

    private String cun;

    private String xiao_Ban;

    private String yangdi_H;

    private String diaocha_Ry;

    private String last_Changetime;
    
    private List<XingzhengQuhua> list;
    
	public String getUuid_Czd() {
		return uuid_Czd;
	}

	public void setUuid_Czd(String uuid_Czd) {
		this.uuid_Czd = uuid_Czd;
	}

	public String getDiaocha_Sj() {
		return diaocha_Sj;
	}

	public void setDiaocha_Sj(String diaocha_Sj) {
		this.diaocha_Sj = diaocha_Sj;
	}

	public String getSheng() {
		return sheng;
	}

	public void setSheng(String sheng) {
		this.sheng = sheng;
	}

	public String getShi() {
		return shi;
	}

	public void setShi(String shi) {
		this.shi = shi;
	}

	public String getXian() {
		return xian;
	}

	public void setXian(String xian) {
		this.xian = xian;
	}

	public String getXian_Mc() {
		return xian_Mc;
	}

	public void setXian_Mc(String xian_Mc) {
		this.xian_Mc = xian_Mc;
	}

	public String getXiang() {
		return xiang;
	}

	public void setXiang(String xiang) {
		this.xiang = xiang;
	}

	public String getXiang_Mc() {
		return xiang_Mc;
	}

	public void setXiang_Mc(String xiang_Mc) {
		this.xiang_Mc = xiang_Mc;
	}

	public String getCun() {
		return cun;
	}

	public void setCun(String cun) {
		this.cun = cun;
	}

	public String getXiao_Ban() {
		return xiao_Ban;
	}

	public void setXiao_Ban(String xiao_Ban) {
		this.xiao_Ban = xiao_Ban;
	}

	public String getYangdi_H() {
		return yangdi_H;
	}

	public void setYangdi_H(String yangdi_H) {
		this.yangdi_H = yangdi_H;
	}

	public String getDiaocha_Ry() {
		return diaocha_Ry;
	}

	public void setDiaocha_Ry(String diaocha_Ry) {
		this.diaocha_Ry = diaocha_Ry;
	}

	public String getLast_Changetime() {
		return last_Changetime;
	}

	public void setLast_Changetime(String last_Changetime) {
		this.last_Changetime = last_Changetime;
	}

   

	public List<XingzhengQuhua> getList() {
		return list;
	}

	public void setList(List<XingzhengQuhua> list) {
		this.list = list;
	}

	@Override
	public String toString() {
		return "YhswxcCzd [uuid_Czd=" + uuid_Czd + ", diaocha_Sj=" + diaocha_Sj + ", sheng=" + sheng + ", shi=" + shi
				+ ", xian=" + xian + ", xian_Mc=" + xian_Mc + ", xiang=" + xiang + ", xiang_Mc=" + xiang_Mc + ", cun="
				+ cun + ", xiao_Ban=" + xiao_Ban + ", yangdi_H=" + yangdi_H + ", diaocha_Ry=" + diaocha_Ry
				+ ", last_Changetime=" + last_Changetime + ", list=" + list + "]";
	}


}