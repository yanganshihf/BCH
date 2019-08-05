package com.integration.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.FlagbackMapper;
import com.integration.entity.Flagback;
import com.integration.entity.FlagbackExample;
import com.integration.entity.FlagbackExample.Criteria;
import com.integration.service.FlagBackService;
@Service
public class FlagBackServiceImpl implements FlagBackService{
    @Autowired
    private FlagbackMapper flagbackMapper;
    public List<Flagback> queryFlagBack() {
        FlagbackExample example = new FlagbackExample();
        Criteria c = example.createCriteria();
        example.setOrderByClause("time desc");
        return flagbackMapper.selectByExample(example);
    }
    @Override
    public Integer addFlagBack(Flagback fb) {
        return flagbackMapper.insertSelective(fb);
    }

}
