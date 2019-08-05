package com.integration.dao;

import java.util.Map;

import org.apache.ibatis.annotations.MapKey;

import com.integration.entity.YhswLb;

public interface YhswLbMapper {
    int insert(YhswLb record);

    int insertSelective(YhswLb record);

    @MapKey("id")
    Map<Integer,YhswLb> getAllReturnMap();
}