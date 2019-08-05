package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.YhswxcBzdBhhzFh;


public interface BH_FH_HZDAO {
	@Delete("delete from YHSWXC_BZD_BHHZ_FH where UUID = #{0}")
	void delete(String uuid);
	
	@Select("select t0.SHI,t0.XIAN,t0.YANGDI_H,t1.* from YHSWXC_BZD t0,YHSWXC_BZD_BHHZ_FH t1 \r\n" + 
			"WHERE t0.UUID_BZD = t1.UUID_BZD  "
			+ "and t0.SHI like #{0} and t0.XIAN like #{1}  "
			+ "and t1.XIANG like #{2} and t0.YANGDI_H like #{3} and "
			+ "t1.SHOUHAI_ZL like #{4} and t1.GANBING_ZS like #{5}")
	List<YhswxcBzdBhhzFh> queryList(String shi, String xian, String xiang, String yangdi_h, String shouhai_zlStr, String ganbing_zsStr);
	
	@Select("select t0.SHI,t0.XIAN,t0.YANGDI_H,t1.* from YHSWXC_BZD t0,YHSWXC_BZD_BHHZ_FH t1 \r\n" + 
			"WHERE t0.UUID_BZD = t1.UUID_BZD  "
			+ "and t1.UUID_BZD = #{0}")
	List<YhswxcBzdBhhzFh> findById(String uuid_bzd);
	
	@Update("update YHSWXC_BZD_BHHZ_FH set uuid_bzd =#{1},yhsw_lb=#{2},yhsw_mc =#{3},"
			+ "diaocha_sj =#{4},xiang=#{5},xiang_mc =#{6},cun=#{7},xiao_ban = #{8},"
			+ "yangdi_jd =#{9},yangdi_wd=#{10},diaocha_zs =#{11},shouhai_zs=#{12},shouhai_zl = #{13},"
			+ "shug_shmj =#{14},ganbing_zs=#{15},daibiao_mj =#{16},weihai_cd=#{17},chengzai = #{18},"
			+ "diaocha_ry =#{19},last_changetime=#{20}\r\n"
			+ "where uuid = #{0}")
	void updateZB(String uuid, String uuid_bzd, String yhsw_lb, Integer yhsw_mc, 
			String diaocha_sj, String xiang,
			String xiang_mc, String cun, String xiao_ban, String yangdi_jd, 
			String yangdi_wd, Integer diaocha_zs,
			Integer shouhai_zs, Integer shouhai_zl, String shug_shmj, 
			Integer ganbing_zs, Float daibiao_mj,
			String weihai_cd, String chengzai, String diaocha_ry, String last_changetime);
	
}
