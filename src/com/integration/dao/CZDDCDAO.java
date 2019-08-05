package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.CZDDC;

public interface CZDDCDAO {
	@Delete("delete from YHSWXC_CZD where UUID_CZD = #{0}")
	void delete(String uuid);
	
	@Select("select t1.DIAOCHA_SJ,t1.SHENG,t1.SHI,t1.XIAN,t1.XIAN_MC,t1.XIANG,\r\n" + 
			"t1.XIANG_MC,t1.CUN,t1.XIAO_BAN,t1.DIAOCHA_RY,t2.* from YHSWXC_CZD t1,YHSWXC_CZD_DC t2\r\n" + 
			"where t1.UUID_CZD  = t2.UUID_CZD "
			+ "and t1.shi like #{0} and t1.xian like #{1} "
			+ "and t1.xiang like #{2} and t1.yangdi_h like #{3}")
	List<CZDDC> queryList(String shi, String xian, String xiang, String yangdi_h);
	
	@Select("select t1.DIAOCHA_SJ,t1.SHENG,t1.SHI,t1.XIAN,t1.XIAN_MC,t1.XIANG,\r\n" + 
			"t1.XIANG_MC,t1.CUN,t1.XIAO_BAN,t1.DIAOCHA_RY,t2.* from YHSWXC_CZD t1,YHSWXC_CZD_DC t2\r\n" + 
			"where t1.UUID_CZD  = t2.UUID_CZD and t2.UUID_CZD = #{0}")
	List<CZDDC> findById(String uuid_czd);
	
	@Update("update YHSWXC_CZD_DC set uuid_czd=#{1},yangdi_h =#{2},"
			+ "diaocha_zs =#{3},yhsw_lb=#{4},yhsw_mc =#{5},jzzw_mc=#{6},weihai_bw= #{7},"
			+ "weihai_q =#{8},shouhai_zl=#{9},siwang_zl =#{10},chengzai=#{11},last_changetime = #{12} "
			+ "where uuid = #{0}")
	void updateZB(String uuid, String uuid_czd, String yangdi_h, 
			Integer diaocha_zs, String yhsw_lb, String yhsw_mc,
			String jzzw_mc, String weihai_bw, String weihai_q, 
			Integer shouhai_zl, String siwang_zl, String chengzai, String last_changetime);
	
}
