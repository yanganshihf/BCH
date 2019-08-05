package com.integration.dao;

import com.integration.entity.ShuHai;
import com.integration.entity.YouhaiZhiwu;
import com.integration.entity.YouhaiZhiwuExample;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Param;

public interface YouhaiZhiwuMapper {
    long countByExample(YouhaiZhiwuExample example);

    int deleteByExample(YouhaiZhiwuExample example);

    int deleteByPrimaryKey(String id);

    int insert(YouhaiZhiwu record);

    int insertSelective(YouhaiZhiwu record);

    List<YouhaiZhiwu> selectByExample(YouhaiZhiwuExample example);

    YouhaiZhiwu selectByPrimaryKey(String id);

    int updateByExampleSelective(@Param("record") YouhaiZhiwu record, @Param("example") YouhaiZhiwuExample example);

    int updateByExample(@Param("record") YouhaiZhiwu record, @Param("example") YouhaiZhiwuExample example);

    int updateByPrimaryKeySelective(YouhaiZhiwu record);

    int updateByPrimaryKey(YouhaiZhiwu record);
    
    @MapKey("id")
    Map<Integer,YouhaiZhiwu> getAllReturnMap();
}