package com.integration.dao;

import java.util.Map;

import org.apache.ibatis.annotations.MapKey;

import com.integration.entity.WeihaiBw;
import com.integration.entity.WeihaiCd;

public interface WeihaiCdMapper {
    int insert(WeihaiCd record);

    int insertSelective(WeihaiCd record);
    
    @MapKey("id")
    Map<Integer,WeihaiCd> getAllReturnMap();
}