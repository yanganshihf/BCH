package com.integration.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.integration.dao.RecentEventMapper;
import com.integration.entity.RecentEvent;
import com.integration.entity.RecentEventExample;
import com.integration.entity.RecentEventExample.Criteria;
import com.integration.service.RecentEventService;
@Service
public class RecentEventServiceImpl implements RecentEventService{
    @Autowired
    private RecentEventMapper recentEventMapper;
    public List<RecentEvent> queryEvent(String department,String time) {
        RecentEventExample example = new RecentEventExample();
        Criteria c = example.createCriteria();
        if(!"".equals(department)) {
            c.andDepartmentEqualTo(department); 
        }
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
        return recentEventMapper.selectByExample(example);
    }
    @Override
    public Integer addEvent(RecentEvent re) {
        return recentEventMapper.insertSelective(re);
    }

}
