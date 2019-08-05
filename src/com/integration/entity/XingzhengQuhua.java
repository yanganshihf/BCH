package com.integration.entity;

public class XingzhengQuhua {
	
    private String id;

    private String name;

    private String code;

    private String ji_Bie;
    private String jiBie;
    
    
    public String getJiBie() {
		return jiBie;
	}

	public void setJiBie(String jiBie) {
		this.jiBie = jiBie;
	}

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

	public String getJi_Bie() {
		return ji_Bie;
	}

	public void setJi_Bie(String ji_Bie) {
		this.ji_Bie = ji_Bie;
	}
}