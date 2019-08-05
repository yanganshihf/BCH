package com.integration.dao;

import com.integration.entity.FlightModelCenter;
import com.integration.entity.FlightModelCenterExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface FlightModelCenterMapper {
    long countByExample(FlightModelCenterExample example);

    int deleteByExample(FlightModelCenterExample example);

    int insert(FlightModelCenter record);

    int insertSelective(FlightModelCenter record);

    List<FlightModelCenter> selectByExampleWithBLOBs(FlightModelCenterExample example);

    List<FlightModelCenter> selectByExample(FlightModelCenterExample example);

    int updateByExampleSelective(@Param("record") FlightModelCenter record, @Param("example") FlightModelCenterExample example);

    int updateByExampleWithBLOBs(@Param("record") FlightModelCenter record, @Param("example") FlightModelCenterExample example);

    int updateByExample(@Param("record") FlightModelCenter record, @Param("example") FlightModelCenterExample example);
}