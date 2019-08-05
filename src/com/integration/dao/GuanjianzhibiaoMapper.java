package com.integration.dao;

import com.integration.entity.Guanjianzhibiao;
import com.integration.entity.GuanjianzhibiaoExample;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface GuanjianzhibiaoMapper {
    long countByExample(GuanjianzhibiaoExample example);

    int deleteByExample(GuanjianzhibiaoExample example);

    int deleteByPrimaryKey(String linchang);

    int insert(Guanjianzhibiao record);

    int insertSelective(Guanjianzhibiao record);
    Guanjianzhibiao queryGuanjianzhibiaoHuiZong();
    List<Guanjianzhibiao> selectByExample(GuanjianzhibiaoExample example);

    Guanjianzhibiao selectByPrimaryKey(String linchang);

    int updateByExampleSelective(@Param("record") Guanjianzhibiao record, @Param("example") GuanjianzhibiaoExample example);

    int updateByExample(@Param("record") Guanjianzhibiao record, @Param("example") GuanjianzhibiaoExample example);

    int updateByPrimaryKeySelective(Guanjianzhibiao record);

    int updateByPrimaryKey(Guanjianzhibiao record);
}