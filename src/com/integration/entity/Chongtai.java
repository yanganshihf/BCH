package com.integration.entity;

public class Chongtai {
    private String id;

    private String name;

    private String code;

    private String leiXing;

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

    public String getLeiXing() {
        return leiXing;
    }

    public void setLeiXing(String leiXing) {
        this.leiXing = leiXing == null ? null : leiXing.trim();
    }
}