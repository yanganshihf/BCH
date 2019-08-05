package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.integration.entity.PCSHDC;

public interface PCSHDCDAO {
	
	@Select("select t1.*, t2.UUID,t2.YANGF_H,t2.TUQIU_GS,t2.YOUXIAO_DK,t2.BUSHUJIA_S,\r\n" + 
			"t2.BUSHU_HJ,t2.BUSHU_C,t2.BUSHU_X,t2.TUQIU_XS,t2.SHU_MI_DU,t2.DIAOCHA_ZS,\r\n" + 
			"t2.SHOUHAI_ZS,t2.SHOUHAI_ZL,t2.SIWANG_ZS,t2.SIWANG_ZL,t2.WEIHAI_CD,t2.BEIZHU,\r\n" + 
			"t0.XIAN,t0.XIANG,t0.XIAN_MC,t0.XIANG_MC\r\n" + 
			"FROM YHSWPC_BZD t1,YHSWPC_BZD_SHDC t2,YHSWPC_YX t0\r\n"+
			"where t1.UUID_TCD = t2.UUID_TCD and t1.UUID_YX = t2.UUID_YX and t0.UUID_YX = t2.UUID_YX  "
			+ "and t0.xian like #{0} and t0.xian_mc like #{1} and t0.xiang like #{2} "
			+ "and t0.xiang_mc like #{3}\r\n"+
			"and t1.bzd_lflx like #{4} and t1.bzd_lfmj = #{5} and t1.bzd_zysz like #{6}\r\n"+
			"and t1.bzd_jd like #{7} and t1.bzd_wd like #{8} and t1.bzd_hb = #{9}\r\n"+
			"and t1.bzd_zmly like #{10} and t1.bzd_zblx like #{11} and t1.bzd_pjsg = #{12}\r\n"+
			"and t1.yhsw_mc like #{13} and t1.ybd = #{14} and t1.bzd_jzsznl = #{15}\r\n"+
			"and t1.bzd_lmzc like #{16} and t1.bzd_xb like #{17}")
	List<PCSHDC> queryList(String xian, String xian_mc, String xiang, 
			String xiang_mc, String bzd_lflx, Float bzd_lfmj,
			String bzd_zysz, String bzd_jd, String bzd_wd, Float bzd_hb, 
			String bzd_zmly, String bzd_zblx,Float bzd_pjsg, 
			String yhsw_mc, Float ybd, Integer bzd_jzsznl, String bzd_lmzc,String bzd_xb);
	
	@Select("select t1.*, t2.UUID,t2.YANGF_H,t2.TUQIU_GS,t2.YOUXIAO_DK,t2.BUSHUJIA_S,\r\n" + 
			"t2.BUSHU_HJ,t2.BUSHU_C,t2.BUSHU_X,t2.TUQIU_XS,t2.SHU_MI_DU,t2.DIAOCHA_ZS,\r\n" + 
			"t2.SHOUHAI_ZS,t2.SHOUHAI_ZL,t2.SIWANG_ZS,t2.SIWANG_ZL,t2.WEIHAI_CD,t2.BEIZHU,\r\n" + 
			"t0.XIAN,t0.XIANG,t0.XIAN_MC,t0.XIANG_MC\r\n" + 
			"FROM YHSWPC_BZD t1,YHSWPC_BZD_SHDC t2,YHSWPC_YX t0\r\n" + 
			"where t1.UUID_TCD = t2.UUID_TCD and t1.UUID_YX = t2.UUID_YX and t0.UUID_YX = t2.UUID_YX "
			+ "and  t1.UUID_TCD = #{0}")
	List<PCSHDC> findById(String uuid);
	
	@Select("update YHSWPC_BZD_SHDC  set "
			+ "uuid_yx = #{1},uuid_tcd = #{2},uuid_bzd = #{3},"
			+ "bzd_bh = #{4},yangf_h = #{5},tuqiu_gs = #{6},youxiao_dk = #{7},\r\n"
			+ "bushujia_s = #{8},bushu_hj = #{9},bushu_c = #{10},bushu_x = #{11},"
			+ "tuqiu_xs = #{12},shu_mi_du = #{13},diaocha_zs=#{14},shouhai_zs=#{15},\r\n"
			+ "shouhai_zl = #{16},siwang_zs = #{17},siwang_zl=#{18},weihai_cd=#{19},\r\n"
			+ "beizhu = #{20},last_changetime = #{21}\r\n"
			+ "where uuid = #{0}")
	void updateFB(String uuid, String uuid_yx, String uuid_tcd, String uuid_bzd, 
			String bzd_bh, Integer yangf_h,
			Integer tuqiu_gs, Integer youxiao_dk, Integer bushujia_s, 
			Integer bushu_hj, Integer bushu_c,
			Integer bushu_x, Integer tuqiu_xs, Integer shu_mi_du, 
			Integer diaocha_zs, Integer shouhai_zs,
			Integer shouhai_zl, Integer siwang_zs, Integer siwang_zl, 
			String weihai_cd, String beizhu,String last_changetime);
	
}
