package com.integration.dao;

import com.integration.entity.Chonghai;
import com.integration.entity.ShuHai;
import com.integration.entity.ShuHaiExample;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Param;

public interface ShuHaiMapper {
    long countByExample(ShuHaiExample example);

    int deleteByExample(ShuHaiExample example);

    int deleteByPrimaryKey(String id);

    int insert(ShuHai record);

    int insertSelective(ShuHai record);

    List<ShuHai> selectByExample(ShuHaiExample example);

    ShuHai selectByPrimaryKey(String id);

    int updateByExampleSelective(@Param("record") ShuHai record, @Param("example") ShuHaiExample example);

    int updateByExample(@Param("record") ShuHai record, @Param("example") ShuHaiExample example);

    int updateByPrimaryKeySelective(ShuHai record);

    int updateByPrimaryKey(ShuHai record);
    
    @MapKey("id")
    Map<Integer,ShuHai> getAllReturnMap();
}