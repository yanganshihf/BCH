package com.integration.entity;

public class ShuHai {
    private String id;

    private String name;

    private String code;

    private String ladingM;

    private String jiBie;

    private String jzzwMc;

    private String jianYi;

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

    public String getLadingM() {
        return ladingM;
    }

    public void setLadingM(String ladingM) {
        this.ladingM = ladingM == null ? null : ladingM.trim();
    }

    public String getJiBie() {
        return jiBie;
    }

    public void setJiBie(String jiBie) {
        this.jiBie = jiBie == null ? null : jiBie.trim();
    }

    public String getJzzwMc() {
        return jzzwMc;
    }

    public void setJzzwMc(String jzzwMc) {
        this.jzzwMc = jzzwMc == null ? null : jzzwMc.trim();
    }

    public String getJianYi() {
        return jianYi;
    }

    public void setJianYi(String jianYi) {
        this.jianYi = jianYi == null ? null : jianYi.trim();
    }
}