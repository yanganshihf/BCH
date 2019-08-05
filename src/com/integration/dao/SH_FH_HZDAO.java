package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.YhswxcBzdShhzFh;

/**
  * 鼠虫害防后汇总
 * 
 * @author Administrator
 *
 */
public interface SH_FH_HZDAO {
	@Delete("delete from YHSWXC_BZD_SHHZ_FH where UUID = #{0}")
	void delete(String uuid);
	
	@Select("select t0.SHI,t0.XIAN,t0.YANGDI_H,t1.* from YHSWXC_BZD t0,YHSWXC_BZD_SHHZ_FH t1 \r\n" + 
			"WHERE t0.UUID_BZD = t1.UUID_BZD  "
			+ "and t0.SHI like #{0} and t0.XIAN like #{1}  "
			+ "and t1.XIANG like #{2} and t0.YANGDI_H like #{3} and t1.shouhai_zl like #{4}")
	List<YhswxcBzdShhzFh> queryList(String shi, String xian, String xiang, String yangdi_h, String shouhai_zlStr);
	
	@Select("select t0.SHI,t0.XIAN,t0.YANGDI_H,t1.* from YHSWXC_BZD t0,YHSWXC_BZD_SHHZ_FH t1 \r\n" + 
			"WHERE t0.UUID_BZD = t1.UUID_BZD  "
			+ "and t1.uuid = #{0}")
	List<YhswxcBzdShhzFh> findById(String uuid);
	
	@Update("update YHSWXC_BZD_SHHZ_FH set uuid_bzd =#{1},"
			+ "diaocha_sj =#{4},xiang=#{5},xiang_mc =#{6},cun=#{7},xiao_ban = #{8},"
			+ "yangdi_jd =#{9},yangdi_wd=#{10},yangf_h =#{11},diaocha_zs=#{12},shouhai_zs = #{13},"
			+ "shouhai_zl =#{14},youxiao_dk=#{15},shu_mi_du=#{16},tuqiu_gs = #{17},"
			+ "tuqiu_xs =#{18},weihai_cd=#{19},daibiao_mj=#{20},diaocha_ry=#{22}"
			+ ",last_changetime=#{23}"
			+ " where uuid = #{0}")
	void updateZB(String uuid, String uuid_bzd, String yhsw_lb, Integer yhsw_mc, 
			String diaocha_sj, String xiang,
			String xiang_mc, String cun, String xiao_ban, String yangdi_jd, 
			String yangdi_wd, String yangf_h,Integer diaocha_zs,
			Integer shouhai_zs, String shouhai_zl, Integer youxiao_dk,
			Integer shu_mi_du,Integer tuqiu_gs,Integer tuqiu_xs,
			String weihai_cd,Float daibiao_mj, String chengzai, 
			String diaocha_ry, String last_changetime);
}
