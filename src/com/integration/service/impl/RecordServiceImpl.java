package com.integration.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.RecordMapper;
import com.integration.dao.UavTrailMapper;
import com.integration.entity.Record;
import com.integration.entity.RecordExample;
import com.integration.entity.UavTrail;
import com.integration.entity.UavTrailExample;
import com.integration.service.RecordService;
@Service
public class RecordServiceImpl implements RecordService{
    @Autowired
    RecordMapper recordMapper;
    @Autowired
    UavTrailMapper uavTrailMapper;    
    @Override
    public List<Record> queryRecord(String name, String code,String time,String field,String type) {
        RecordExample example = new RecordExample();
        RecordExample.Criteria criteria = example.createCriteria();
        criteria.andNameLike(name+"%");
        criteria.andCodeLike(code+"%");
        if(!time.isEmpty()) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
            Date start;
            Date end;
            try {
                String startStr = time.split("-")[0];
                String endStr = time.split("-")[1];
                start = sdf.parse(startStr);
                start.setHours(0);
                start.setMinutes(0);
                start.setSeconds(0);
                end = sdf.parse(endStr);
                end.setHours(23);
                end.setMinutes(59);
                end.setSeconds(59);
                criteria.andStarttimeGreaterThanOrEqualTo(start);
                criteria.andStarttimeLessThanOrEqualTo(end);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        example.setOrderByClause(field+" "+type);
        return recordMapper.selectByExample(example);
    }
    @Override
    public Integer deleteRecord(String[] ids) {
        RecordExample example = new RecordExample();
        RecordExample.Criteria criteria = example.createCriteria();
        List<String> list=Arrays.asList(ids);
        criteria.andIdIn(list);
        return recordMapper.deleteByExample(example);
    }
    @Override
    public Integer addRecord(Record record) {
        return recordMapper.insert(record);
    }
    @Override
    public List<UavTrail> queryTrailByCode(String code, Date start, Date end) {
        UavTrailExample example = new UavTrailExample();
        UavTrailExample.Criteria  criteria = example.createCriteria();
        criteria.andCodeEqualTo(code);
        criteria.andEndtimeGreaterThanOrEqualTo(start);
        criteria.andStarttimeLessThanOrEqualTo(end);
        return uavTrailMapper.selectByExampleWithBLOBs(example);
       
        
    }
    @Override
    public List<Map<String, Object>> queryInfoByMonth(String month) {
        return uavTrailMapper.queryInfoByMonth(month);
    }
}
