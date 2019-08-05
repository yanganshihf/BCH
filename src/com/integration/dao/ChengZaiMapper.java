package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.integration.entity.XingzhengQuhua;
import com.integration.entity.YhswxcCzd;

public interface ChengZaiMapper {
		/**
		 * 查询表格填充
		 * select * from 表名 where 要去重的字段 in (select max(要去重的字段) from 表名 group by 要去重的字段 )
		 * SELECT count(0) FROM YHSWXC_CZD WHERE UUID_CZD IN (SELECT max(UUID) FROM YHSWXC_CZD_DC GROUP BY UUID) 
		 **/ 		
		@Select("SELECT YHSWXC_CZD.UUID_CZD,XIAN_MC,XIANG_MC,CUN,YHSWXC_CZD.YANGDI_H,DIAOCHA_ZS,YHSW_MC,WEIHAI_BW,WEIHAI_Q,SHOUHAI_ZL,SIWANG_ZL,CHENGZAI,DIAOCHA_RY,DIAOCHA_SJ FROM YHSWXC_CZD, YHSWXC_CZD_DC where YHSWXC_CZD.UUID_CZD=YHSWXC_CZD_DC.UUID_CZD ")
		List<YhswxcCzd> selectAll();
		
		//查询顶部下拉	
		@Select("select * from XINGZHENGQUHUA")
		List<XingzhengQuhua> selectTop();
		
		@Select("select * from YHSWXC_CZD,YHSWXC_CZD_DC where shi like #{0} and xian_MC like #{1} and xiang_MC like #{2}")
		List<YhswxcCzd> selectWhere(String shi,String xian,String zhen);
		
}
