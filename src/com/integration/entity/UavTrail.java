package com.integration.entity;

import java.util.Date;

public class UavTrail {
    private String id;

    private String code;

    private Date starttime;

    private Date endtime;

    private String trailpoint;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }

    public Date getStarttime() {
        return starttime;
    }

    public void setStarttime(Date starttime) {
        this.starttime = starttime;
    }

    public Date getEndtime() {
        return endtime;
    }

    public void setEndtime(Date endtime) {
        this.endtime = endtime;
    }

    public String getTrailpoint() {
        return trailpoint;
    }

    public void setTrailpoint(String trailpoint) {
        this.trailpoint = trailpoint == null ? null : trailpoint.trim();
    }
}