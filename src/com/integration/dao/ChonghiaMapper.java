package com.integration.dao;

import com.integration.entity.Chonghia;
import com.integration.entity.ChonghiaExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ChonghiaMapper {
    long countByExample(ChonghiaExample example);

    int deleteByExample(ChonghiaExample example);

    int deleteByPrimaryKey(String id);

    int insert(Chonghia record);

    int insertSelective(Chonghia record);

    List<Chonghia> selectByExample(ChonghiaExample example);

    Chonghia selectByPrimaryKey(String id);

    int updateByExampleSelective(@Param("record") Chonghia record, @Param("example") ChonghiaExample example);

    int updateByExample(@Param("record") Chonghia record, @Param("example") ChonghiaExample example);

    int updateByPrimaryKeySelective(Chonghia record);

    int updateByPrimaryKey(Chonghia record);
}