package com.integration.dao;

import java.util.Map;

import org.apache.ibatis.annotations.MapKey;

import com.integration.entity.Bingji;
import com.integration.entity.ShugShmj;

public interface BingjiMapper {
    int insert(Bingji record);

    int insertSelective(Bingji record);
    
    @MapKey("id")
    Map<Integer,Bingji> getAllReturnMap();
}