package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.YhswxcBzdChhzFh;

/**
  * 虫害防后汇总
 * 
 * @author yanganshi
 * @time 2019-7-31 15:22:28
 */
public interface CH_FH_HZDAO {
	@Delete("delete from YHSWXC_BZD_CHHZ_FH where UUID = #{0}")
	void delete(String uuid);
	
	@Select("select t0.SHI,t0.XIAN,t0.YANGDI_H,t1.* from YHSWXC_BZD t0,YHSWXC_BZD_CHHZ_FH t1 \r\n" + 
			"WHERE t0.UUID_BZD = t1.UUID_BZD  "
			+ "and t0.SHI like #{0} and t0.XIAN like #{1}  "
			+ "and t1.XIANG like #{2} and t0.YANGDI_H like #{3} and t1.SHOUHAI_ZL like #{4}")
	List<YhswxcBzdChhzFh> queryList(String shi, String xian, String xiang, String yangdi_h, String shouhai_zlStr);
	
	@Select("select t0.SHI,t0.XIAN,t0.YANGDI_H,t1.* from YHSWXC_BZD t0,YHSWXC_BZD_CHHZ_FH t1 \r\n" + 
			"WHERE t0.UUID_BZD = t1.UUID_BZD  "
			+ "and t1.UUID_BZD = #{0}")
	List<YhswxcBzdChhzFh> findById(String UUID_BZD);
	
	@Update("update YHSWXC_BZD_CHHZ_FH set uuid_bzd =#{1},yhsw_lb=#{2},yhsw_mc =#{3},"
			+ "diaocha_sj =#{4},xiang=#{5},xiang_mc =#{6},cun=#{7},xiao_ban = #{8},"
			+ "yangdi_jd =#{9},yangdi_wd=#{10},diaocha_zs =#{11},shouhai_zs=#{12},chongk_md = #{13},"
			+ "shouhai_zl =#{14},daibiao_mj=#{15},weihai_cd=#{16},chengzai = #{17},"
			+ "diaocha_ry =#{18},last_changetime=#{19} where uuid = #{0}")
	void updateZB(String uuid, String uuid_bzd, String yhsw_lb, Integer yhsw_mc, 
			String diaocha_sj, String xiang,
			String xiang_mc, String cun, String xiao_ban, String yangdi_jd, 
			String yangdi_wd, Integer diaocha_zs,
			Integer shouhai_zs, Integer chongk_md, String shouhai_zl, 
			Float daibiao_mj, 
			String weihai_cd, String chengzai, String diaocha_ry, String last_changetime);
}
