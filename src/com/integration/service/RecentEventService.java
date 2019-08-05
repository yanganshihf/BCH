package com.integration.service;

import java.util.List;

import com.integration.entity.RecentEvent;


public interface RecentEventService {
    public List<RecentEvent> queryEvent(String department,String time);
    public Integer addEvent(RecentEvent re);
}
