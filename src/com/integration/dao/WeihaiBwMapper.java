package com.integration.dao;

import java.util.Map;

import org.apache.ibatis.annotations.MapKey;

import com.integration.entity.WeihaiBw;
import com.integration.entity.YouhaiZhiwu;

public interface WeihaiBwMapper {
    int insert(WeihaiBw record);

    int insertSelective(WeihaiBw record);
    
    @MapKey("id")
    Map<Integer,WeihaiBw> getAllReturnMap();
}