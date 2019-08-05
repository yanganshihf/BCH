package com.integration.dao;

import com.integration.entity.Binghai;
import com.integration.entity.BinghaiExample;
import com.integration.entity.YhswLb;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Param;

public interface BinghaiMapper {
    long countByExample(BinghaiExample example);

    int deleteByExample(BinghaiExample example);

    int deleteByPrimaryKey(String id);

    int insert(Binghai record);

    int insertSelective(Binghai record);

    List<Binghai> selectByExample(BinghaiExample example);

    Binghai selectByPrimaryKey(String id);

    int updateByExampleSelective(@Param("record") Binghai record, @Param("example") BinghaiExample example);

    int updateByExample(@Param("record") Binghai record, @Param("example") BinghaiExample example);

    int updateByPrimaryKeySelective(Binghai record);

    int updateByPrimaryKey(Binghai record);
    
    @MapKey("id")
    Map<Integer,Binghai> getAllReturnMap();
}