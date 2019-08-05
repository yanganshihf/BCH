package com.integration.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.BinglibushuMapper;
import com.integration.entity.Binglibushu;
import com.integration.entity.BinglibushuExample;
import com.integration.entity.BinglibushuExample.Criteria;
import com.integration.service.BinglibushuService;
@Service
public class BinglibushuServiceImpl implements BinglibushuService{
    @Autowired
    private BinglibushuMapper binglibushuMapper;
    public List<Binglibushu> queryBinglibushu(String cuntun) {
        BinglibushuExample example = new BinglibushuExample();
        Criteria c = example.createCriteria();
        if(!"".equals(cuntun)) {
            c.andCuntunEqualTo(cuntun.trim());
        }
        List<Binglibushu> list = binglibushuMapper.selectByExample(example);
        return list;
    }

}
