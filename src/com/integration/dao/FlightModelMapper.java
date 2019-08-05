package com.integration.dao;

import com.integration.entity.FlightModel;
import com.integration.entity.FlightModelExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface FlightModelMapper {
    long countByExample(FlightModelExample example);

    int deleteByExample(FlightModelExample example);

    int insert(FlightModel record);

    int insertSelective(FlightModel record);

    List<FlightModel> selectByExampleWithBLOBs(FlightModelExample example);

    List<FlightModel> selectByExample(FlightModelExample example);

    int updateByExampleSelective(@Param("record") FlightModel record, @Param("example") FlightModelExample example);

    int updateByExampleWithBLOBs(@Param("record") FlightModel record, @Param("example") FlightModelExample example);

    int updateByExample(@Param("record") FlightModel record, @Param("example") FlightModelExample example);
}