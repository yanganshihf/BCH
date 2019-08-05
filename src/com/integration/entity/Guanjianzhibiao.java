package com.integration.entity;

public class Guanjianzhibiao {
    private String linchang;

    private String linchangname;

    private Double slfgl;

    private Double ldmj;

    private Double slxj;

    private Double lmlhl;

    public String getLinchang() {
        return linchang;
    }

    public void setLinchang(String linchang) {
        this.linchang = linchang == null ? null : linchang.trim();
    }

    public String getLinchangname() {
        return linchangname;
    }

    public void setLinchangname(String linchangname) {
        this.linchangname = linchangname == null ? null : linchangname.trim();
    }

    public Double getSlfgl() {
        return slfgl;
    }

    public void setSlfgl(Double slfgl) {
        this.slfgl = slfgl;
    }

    public Double getLdmj() {
        return ldmj;
    }

    public void setLdmj(Double ldmj) {
        this.ldmj = ldmj;
    }

    public Double getSlxj() {
        return slxj;
    }

    public void setSlxj(Double slxj) {
        this.slxj = slxj;
    }

    public Double getLmlhl() {
        return lmlhl;
    }

    public void setLmlhl(Double lmlhl) {
        this.lmlhl = lmlhl;
    }
}