package com.integration.service;

import java.util.List;

import com.integration.entity.FlightModel;
import com.integration.entity.FlightModelCenter;

public interface FlightModelService {
    public List<FlightModel> queryFlightModel(String name);
    public Integer addFlightModel(FlightModel fb);
    public Integer deleteFlightModel(String id);
    public FlightModel queryFlightModelById(String id);
    public Integer editFlightModel(FlightModel fb);
    
    public List<FlightModelCenter> queryFlightModelCenter(String name,String time);
    public Integer addFlightModelCenter(FlightModelCenter fb);
    public Integer deleteFlightModelCenter(String id);
    public FlightModelCenter queryFlightModelCenterById(String id);
    public Integer editFlightModelCenter(FlightModelCenter fb);
}
