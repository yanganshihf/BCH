package com.integration.entity;

public class Video {
    private String id;

    private String name;

    private String code;

    private String sign;

    private Integer online;

    private Integer saveday;
    private String address;
    private String time;
    private String bwin;
    private String bytesin;
    private String allowpersons;

    private String person;

    private String password;

    private String mobile;

    private Integer type;

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

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign == null ? null : sign.trim();
    }

    public Integer getOnline() {
        return online;
    }

    public void setOnline(Integer online) {
        this.online = online;
    }

    public Integer getSaveday() {
        return saveday;
    }

    public void setSaveday(Integer saveday) {
        this.saveday = saveday;
    }

    public String getAllowpersons() {
        return allowpersons;
    }

    public void setAllowpersons(String allowpersons) {
        this.allowpersons = allowpersons == null ? null : allowpersons.trim();
    }

    public String getPerson() {
        return person;
    }

    public void setPerson(String person) {
        this.person = person == null ? null : person.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile == null ? null : mobile.trim();
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getBwin() {
        return bwin;
    }

    public void setBwin(String bwin) {
        this.bwin = bwin;
    }

    public String getBytesin() {
        return bytesin;
    }

    public void setBytesin(String bytesin) {
        this.bytesin = bytesin;
    }
    
}