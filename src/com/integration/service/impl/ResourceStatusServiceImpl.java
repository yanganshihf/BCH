package com.integration.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.integration.dao.GuanjianzhibiaoMapper;
import com.integration.entity.Guanjianzhibiao;
import com.integration.service.ResourceStatusService;
@Service
public class ResourceStatusServiceImpl implements ResourceStatusService{
    @Autowired
    private GuanjianzhibiaoMapper guanjianzhibiaoMapper;
    @Override
    public Guanjianzhibiao queryGuanjianzhibiaoHuiZong() {
        return guanjianzhibiaoMapper.queryGuanjianzhibiaoHuiZong();
    }
    @Override
    public List<Guanjianzhibiao> queryGuanjianzhibiaos() {
        return guanjianzhibiaoMapper.selectByExample(null);
    }

}
