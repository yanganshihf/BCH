package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.integration.entity.YHZWDC;

public interface PCYHZWDCDAO {
	
	@Select("select t1.*, t2.uuid,t2.YANGF_XH,t2.DIAOCHA_ZS,t2.SHOUHAI_ZS,t2.SHOUHAI_ZL,\r\n" + 
			"t2.TOUYING_MJ,t2.YANGDI_MJ,t2.GAIDU,t2.WEIHAI_CD,t2.CHENGZAI,t2.BEIZHU,\r\n" + 
			"t0.XIAN,t0.XIANG,t0.XIAN_MC,t0.XIANG_MC\r\n" + 
			"FROM YHSWPC_BZD t1,YHSWPC_BZD_YHZWDC t2,YHSWPC_YX t0\r\n" + 
			"where t0.xian like #{0} and t0.xian_mc like #{1} and t0.xiang like #{2} "
			+ "and t0.xiang_mc like #{3}\r\n"+
			"and t1.bzd_lflx like #{4} and t1.bzd_lfmj = #{5} and t1.bzd_zysz like #{6}\r\n"+
			"and t1.bzd_jd like #{7} and t1.bzd_wd like #{8} and t1.bzd_hb = #{9}\r\n"+
			"and t1.bzd_zmly like #{10} and t1.bzd_zblx like #{11} and t1.bzd_pjsg = #{12}\r\n"+
			"and t1.yhsw_mc like #{13} and t1.ybd = #{14} and t1.bzd_jzsznl = #{15}\r\n"+
			"and t1.bzd_lmzc like #{16}")
	List<YHZWDC> queryList(String xian, String xian_mc, String xiang, 
			String xiang_mc, String bzd_lflx, Float bzd_lfmj,
			String bzd_zysz, String bzd_jd, String bzd_wd, Float bzd_hb, 
			String bzd_zmly, String bzd_zblx,Float bzd_pjsg, 
			String yhsw_mc, Float ybd, Integer bzd_jzsznl, String bzd_lmzc);
	
	@Select("select t1.*, t2.uuid,t2.YANGF_XH,t2.DIAOCHA_ZS,t2.SHOUHAI_ZS,t2.SHOUHAI_ZL,\r\n" + 
			"t2.TOUYING_MJ,t2.YANGDI_MJ,t2.GAIDU,t2.WEIHAI_CD,t2.CHENGZAI,t2.BEIZHU,\r\n" + 
			"t0.XIAN,t0.XIANG,t0.XIAN_MC,t0.XIANG_MC\r\n" + 
			"FROM YHSWPC_BZD t1,YHSWPC_BZD_YHZWDC t2,YHSWPC_YX t0\r\n" + 
			"where t1.UUID_BZD = t2.UUID_BZD and t2.UUID_YX = t0.UUID_YX and"
			+ " t1.uuid_tcd = #{0}")
	List<YHZWDC> findById(String uuid_tcd);
	
	@Select("update YHSWPC_BZD_YHZWDC  set "
			+ "uuid_yx = #{1},uuid_tcd = #{2},uuid_bzd = #{3},"
			+ "bzd_bh = #{4},yangf_xh = #{5},diaocha_zs = #{6},shouhai_zl = #{7},\r\n"
			+ "touying_mj = #{8},yangdi_mj = #{9},gaidu = #{10},weihai_cd = #{11},"
			+ "chengzai = #{12},beizhu = #{13},last_changetime=#{14}\r\n"
			+ "where uuid = #{0}")
	void updateFB(String uuid, String uuid_yx, String uuid_tcd, String uuid_bzd, 
			String bzd_bh, Integer yangf_xh,
			Integer shouhai_zs, Integer shouhai_zl, Float touying_mj, 
			Float yangdi_mj, Integer gaidu, String weihai_cd,
			String chengzai, String beizhu, String last_changetime);
	
}
