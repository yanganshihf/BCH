package com.integration.entity;

public class Bingji {
    private String id;

    private String name;

    private String code;

    private String yhsw_Mc;

    private String daibiaozhi;

    private String bing_Qing;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }

	public String getYhsw_Mc() {
		return yhsw_Mc;
	}

	public void setYhsw_Mc(String yhsw_Mc) {
		this.yhsw_Mc = yhsw_Mc;
	}

	public String getDaibiaozhi() {
		return daibiaozhi;
	}

	public void setDaibiaozhi(String daibiaozhi) {
		this.daibiaozhi = daibiaozhi;
	}

	public String getBing_Qing() {
		return bing_Qing;
	}

	public void setBing_Qing(String bing_Qing) {
		this.bing_Qing = bing_Qing;
	}

   
   
}