package com.integration.dao;

import com.integration.entity.Binglibushu;
import com.integration.entity.BinglibushuExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface BinglibushuMapper {
    long countByExample(BinglibushuExample example);

    int deleteByExample(BinglibushuExample example);

    int deleteByPrimaryKey(String objectId);

    int insert(Binglibushu record);

    int insertSelective(Binglibushu record);

    List<Binglibushu> selectByExample(BinglibushuExample example);

    Binglibushu selectByPrimaryKey(String objectId);

    int updateByExampleSelective(@Param("record") Binglibushu record, @Param("example") BinglibushuExample example);

    int updateByExample(@Param("record") Binglibushu record, @Param("example") BinglibushuExample example);

    int updateByPrimaryKeySelective(Binglibushu record);

    int updateByPrimaryKey(Binglibushu record);
}