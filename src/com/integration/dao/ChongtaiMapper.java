package com.integration.dao;

import java.util.Map;

import org.apache.ibatis.annotations.MapKey;

import com.integration.entity.Chongtai;
import com.integration.entity.WeihaiCd;

public interface ChongtaiMapper {
    int insert(Chongtai record);

    int insertSelective(Chongtai record);
    
    @MapKey("id")
    Map<Integer,Chongtai> getAllReturnMap();
}