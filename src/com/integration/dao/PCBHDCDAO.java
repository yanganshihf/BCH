package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.MaoPu;
import com.integration.entity.PCBHDC;

public interface PCBHDCDAO {
	
	@Select("select t1.*, t2.uuid,t2.YANGF_XH,t2.DIAOCHA_ZS,t2.SHOUHAI_ZS,\r\n" + 
			"t2.SHOUHAI_ZL,t2.DIAOCHA_YS,t2.SHOUHAI_YS,t2.SHOUHAI_YL,\r\n" + 
			"t2.WEIHAI_CD,t2.CHENGZAI,t2.BEIZHU,t0.XIAN,t0.XIANG,t0.XIAN_MC,t0.XIANG_MC\r\n" + 
			"FROM YHSWPC_BZD t1,YHSWPC_BZD_BHDC t2,YHSWPC_YX t0\r\n"+
			"where t1.UUID_BZD = t2.UUID_BZD and t1.UUID_YX = t0.UUID_YX and"
			+ " t0.xian like #{0} and t0.xian_mc like #{1} and t0.xiang like #{2} "
			+ "and t0.xiang_mc like #{3}\r\n"+
			"and t1.bzd_lflx like #{4} and t1.bzd_lfmj = #{5} and t1.bzd_zysz like #{6}\r\n"+
			"and t1.bzd_jd like #{7} and t1.bzd_wd like #{8} and t1.bzd_hb = #{9}\r\n"+
			"and t1.bzd_zmly like #{10} and t1.bzd_zblx like #{11} and t1.bzd_pjsg = #{12}\r\n"+
			"and t1.yhsw_mc like #{13} and t1.ybd = #{14} and t1.bzd_jzsznl = #{15}\r\n"+
			"and t1.bzd_lmzc like #{16}")
	List<PCBHDC> queryList(String xian, String xian_mc, String xiang, 
			String xiang_mc, String bzd_lflx, Float bzd_lfmj,
			String bzd_zysz, String bzd_jd, String bzd_wd, Float bzd_hb, 
			String bzd_zmly, String bzd_zblx,Float bzd_pjsg, 
			String yhsw_mc, Float ybd, Integer bzd_jzsznl, String bzd_lmzc);
	
	@Select("select t1.*, t2.uuid,t2.YANGF_XH,t2.DIAOCHA_ZS,t2.SHOUHAI_ZS,\r\n" + 
			"t2.SHOUHAI_ZL,t2.DIAOCHA_YS,t2.SHOUHAI_YS,t2.SHOUHAI_YL,\r\n" + 
			"t2.WEIHAI_CD,t2.CHENGZAI,t2.BEIZHU,t0.XIAN,t0.XIANG,t0.XIAN_MC,t0.XIANG_MC\r\n" + 
			"FROM YHSWPC_BZD t1,YHSWPC_BZD_BHDC t2,YHSWPC_YX t0\r\n" + 
			"where t1.UUID_BZD = t2.UUID_BZD and t1.UUID_YX = t0.UUID_YX and t1.UUID_TCD = #{0}")
	List<PCBHDC> findById(String uuid);
	
	@Update("update YHSWPC_BZD set uuid_yx =#{0},"
			+ "uuid_tcd=#{1},bzd_bh =#{3},bzd_xb=#{4},"
			+ "bzd_lflx = #{5},bzd_lfmj=#{6},bzd_zysz=#{7},"
			+ "bzd_jd = #{8},bzd_wd=#{9},bzd_hb =#{10},bzd_zmly=#{11},"
			+ "bzd_zblx =#{12},bzd_pjsg=#{13},yhsw_mc =#{14},bzd_ybd =#{15},  "
			+ "bzd_jzsznl = #{16},bzd_lmzc = #{17},"
			+ "bzd_bz = #{18} ,last_changetime=#{19} "
			+ "where uuid_bzd = #{2}")
	void updateZB(String uuid_yx, String uuid_tcd, String uuid_bzd, String bzd_bh, 
			String bzd_xb, String bzd_lflx, Float bzd_lfmj,
			String bzd_zysz, String bzd_jd, String bzd_wd,
			Float bzd_hb, String bzd_zmly, String bzd_zblx,
			Float bzd_pjsg, String yhsw_mc, Float bzd_ybd, 
			Integer bzd_jzsznl, String bzd_lmzc,String bzd_bz , 
			 String last_changetime);
	
	@Select("update YHSWPC_BZD_BHDC  set "
			+ "uuid_yx = #{1},uuid_tcd = #{2},uuid_bzd = #{3},"
			+ "bzd_bh = #{4},yangf_xh = #{5},diaocha_zs = #{6},shouhai_zs = #{7},\r\n"
			+ "shouhai_zl = #{8},diaocha_ys = #{9},shouhai_ys = #{10},shouhai_yl = #{11},"
			+ "weihai_cd = #{12},chengzai = #{13},beizhu = #{14},last_changetime = #{15}\r\n"
			+ "where uuid = #{0}")
	void updateFB(String uuid, String uuid_yx, String uuid_tcd, 
			String uuid_bzd, String bzd_bh, Integer yangf_xh,
			Integer diaocha_zs, Integer shouhai_zs, Integer shouhai_zl, 
			Integer diaocha_ys, Integer shouhai_ys,
			Integer shouhai_yl, String weihai_cd, String chengzai,
			String beizhu,String last_changetime);
	
}
