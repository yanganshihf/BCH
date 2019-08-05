package com.integration.dao;

import java.util.Map;

import org.apache.ibatis.annotations.MapKey;

import com.integration.entity.Binghai;
import com.integration.entity.Chonghai;

public interface ChonghaiMapper {
    int deleteByPrimaryKey(String id);

    int insert(Chonghai record);

    int insertSelective(Chonghai record);

    Chonghai selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Chonghai record);

    int updateByPrimaryKey(Chonghai record);

    @MapKey("id")
    Map<Integer,Chonghai> getAllReturnMap();
}