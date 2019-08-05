package com.integration.dao;

import com.integration.entity.RecentEvent;
import com.integration.entity.RecentEventExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface RecentEventMapper {
    long countByExample(RecentEventExample example);

    int deleteByExample(RecentEventExample example);

    int deleteByPrimaryKey(String id);

    int insert(RecentEvent record);

    int insertSelective(RecentEvent record);

    List<RecentEvent> selectByExample(RecentEventExample example);

    RecentEvent selectByPrimaryKey(String id);

    int updateByExampleSelective(@Param("record") RecentEvent record, @Param("example") RecentEventExample example);

    int updateByExample(@Param("record") RecentEvent record, @Param("example") RecentEventExample example);

    int updateByPrimaryKeySelective(RecentEvent record);

    int updateByPrimaryKey(RecentEvent record);
}