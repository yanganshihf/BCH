package com.integration.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.integration.entity.Record;
import com.integration.entity.UavTrail;
public interface RecordService {
    public List<Record> queryRecord(String name,String code,String time,String field,String type);
    public Integer deleteRecord(String[] ids);
    public Integer addRecord(Record record);
    public List<UavTrail> queryTrailByCode(String code,Date start,Date end);
    public List<Map<String,Object>> queryInfoByMonth(String month);
}
