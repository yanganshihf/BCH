package com.integration.dao;

import com.integration.entity.Flagback;
import com.integration.entity.FlagbackExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface FlagbackMapper {
    long countByExample(FlagbackExample example);

    int deleteByExample(FlagbackExample example);

    int deleteByPrimaryKey(String id);

    int insert(Flagback record);

    int insertSelective(Flagback record);

    List<Flagback> selectByExample(FlagbackExample example);

    Flagback selectByPrimaryKey(String id);

    int updateByExampleSelective(@Param("record") Flagback record, @Param("example") FlagbackExample example);

    int updateByExample(@Param("record") Flagback record, @Param("example") FlagbackExample example);

    int updateByPrimaryKeySelective(Flagback record);

    int updateByPrimaryKey(Flagback record);
}