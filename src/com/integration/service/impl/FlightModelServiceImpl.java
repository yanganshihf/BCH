package com.integration.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.FlightModelCenterMapper;
import com.integration.dao.FlightModelMapper;
import com.integration.entity.FlightModel;
import com.integration.entity.FlightModelCenter;
import com.integration.entity.FlightModelCenterExample;
import com.integration.entity.FlightModelExample;
import com.integration.entity.FlightModelExample.Criteria;
import com.integration.service.FlightModelService;

@Service
public class FlightModelServiceImpl implements FlightModelService{
    @Autowired
    private FlightModelMapper flightModelMapper;
    @Autowired
    private FlightModelCenterMapper flightModelCenterMapper;
    public List<FlightModel> queryFlightModel(String name) {
        FlightModelExample example = new FlightModelExample();
        Criteria c = example.createCriteria();
        c.andNameLike(name+"%");
        example.setOrderByClause("time desc");
        return flightModelMapper.selectByExampleWithBLOBs(example);
    }
    @Override
    public Integer addFlightModel(FlightModel fb) {
        return flightModelMapper.insertSelective(fb);
    }
    @Override
    public Integer deleteFlightModel(String id) {
        FlightModelExample example = new FlightModelExample();
        Criteria c = example.createCriteria();
        c.andIdEqualTo(id);
        return flightModelMapper.deleteByExample(example);
    }
    @Override
    public FlightModel queryFlightModelById(String id) {
        FlightModelExample example = new FlightModelExample();
        Criteria c = example.createCriteria();
        c.andIdEqualTo(id);
        return flightModelMapper.selectByExample(example).get(0);
    }
    @Override
    public Integer editFlightModel(FlightModel fb) {
        FlightModelExample example = new FlightModelExample();
        Criteria c = example.createCriteria();
        c.andIdEqualTo(fb.getId());
        return flightModelMapper.updateByExampleSelective(fb,example);
    }

    public List<FlightModelCenter> queryFlightModelCenter(String name,String time) {
        FlightModelCenterExample example = new FlightModelCenterExample();
        com.integration.entity.FlightModelCenterExample.Criteria c = example.createCriteria();
        c.andNameLike(name+"%");
        if(!time.isEmpty()) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date start;
            Date end;
            try {
                String startStr = time.split(" ~ ")[0];
                String endStr = time.split(" ~ ")[1];
                start = sdf.parse(startStr);
                start.setHours(0);
                start.setMinutes(0);
                start.setSeconds(0);
                end = sdf.parse(endStr);
                end.setHours(23);
                end.setMinutes(59);
                end.setSeconds(59);
                c.andTimeGreaterThanOrEqualTo(start);
                c.andTimeLessThanOrEqualTo(end);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        example.setOrderByClause("time desc");
        return flightModelCenterMapper.selectByExampleWithBLOBs(example);
    }
    @Override
    public Integer addFlightModelCenter(FlightModelCenter fb) {
        return flightModelCenterMapper.insertSelective(fb);
    }
    @Override
    public Integer deleteFlightModelCenter(String id) {
        FlightModelCenterExample example = new FlightModelCenterExample();
        com.integration.entity.FlightModelCenterExample.Criteria c = example.createCriteria();
        c.andIdEqualTo(id);
        return flightModelCenterMapper.deleteByExample(example);
    }
    @Override
    public FlightModelCenter queryFlightModelCenterById(String id) {
        FlightModelCenterExample example = new FlightModelCenterExample();
        com.integration.entity.FlightModelCenterExample.Criteria c = example.createCriteria();
        c.andIdEqualTo(id);
        return flightModelCenterMapper.selectByExample(example).get(0);
    }
    @Override
    public Integer editFlightModelCenter(FlightModelCenter fb) {
        FlightModelCenterExample example = new FlightModelCenterExample();
        com.integration.entity.FlightModelCenterExample.Criteria c = example.createCriteria();
        c.andIdEqualTo(fb.getId());
        return flightModelCenterMapper.updateByExampleSelective(fb,example);
    }
}
