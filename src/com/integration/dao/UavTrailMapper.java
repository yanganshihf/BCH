package com.integration.dao;

import com.integration.entity.UavTrail;
import com.integration.entity.UavTrailExample;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface UavTrailMapper {
    long countByExample(UavTrailExample example);

    int deleteByExample(UavTrailExample example);

    int insert(UavTrail record);

    int insertSelective(UavTrail record);

    List<UavTrail> selectByExampleWithBLOBs(UavTrailExample example);

    List<UavTrail> selectByExample(UavTrailExample example);

    int updateByExampleSelective(@Param("record") UavTrail record, @Param("example") UavTrailExample example);

    int updateByExampleWithBLOBs(@Param("record") UavTrail record, @Param("example") UavTrailExample example);

    int updateByExample(@Param("record") UavTrail record, @Param("example") UavTrailExample example);
    List<Map<String, Object>> queryInfoByMonth(@Param("month") String month);
}