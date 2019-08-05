package com.integration.dao;

import java.util.Map;

import org.apache.ibatis.annotations.MapKey;
 
import com.integration.entity.ShugShmj;

public interface ShugShmjMapper {
    int insert(ShugShmj record);

    int insertSelective(ShugShmj record);
    
    @MapKey("id")
    Map<Integer,ShugShmj> getAllReturnMap();
}