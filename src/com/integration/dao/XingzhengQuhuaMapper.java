package com.integration.dao;

import com.integration.entity.XingzhengQuhua;
import com.integration.entity.XingzhengQuhuaExample;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Param;

public interface XingzhengQuhuaMapper {
    long countByExample(XingzhengQuhuaExample example);

    int deleteByExample(XingzhengQuhuaExample example);

    int deleteByPrimaryKey(String id);

    int insert(XingzhengQuhua record);

    int insertSelective(XingzhengQuhua record);

    List<XingzhengQuhua> selectByExample(XingzhengQuhuaExample example);

    XingzhengQuhua selectByPrimaryKey(String id);

    int updateByExampleSelective(@Param("record") XingzhengQuhua record, @Param("example") XingzhengQuhuaExample example);

    int updateByExample(@Param("record") XingzhengQuhua record, @Param("example") XingzhengQuhuaExample example);

    int updateByPrimaryKeySelective(XingzhengQuhua record);

    int updateByPrimaryKey(XingzhengQuhua record);
    
    @MapKey("id")
    Map<Integer,XingzhengQuhua> getAllReturnMap();
}