package com.integration.service;

import java.util.List;
import java.util.Map;

import com.integration.entity.Guanjianzhibiao;

public interface ResourceStatusService {
    //关键指标一级汇总信息
    public Guanjianzhibiao queryGuanjianzhibiaoHuiZong();
    //关键指标一详细信息
    public List<Guanjianzhibiao> queryGuanjianzhibiaos();
}
