package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.MaoPu;

public interface MPDAO {
	@Delete("delete from YHSWPC_MP where UUID_MP = #{0}")
	void delete(String UUID_MP);
	
	@Select("select * from YHSWPC_MP "
			+ "where shi like #{0} and xian like #{1} and "
			+ "xiang like #{2} and miaopu_mc like #{3}")
	List<MaoPu> queryList(String shi, String xian, String xiang, String miaopu_mc);
	
	@Select("select t1.*,t2.UUID,t2.YHSW_LB,t2.YHSW_MC,t2.JZZW_MC,t2.WEIHAI_BW,\r\n" + 
			"t2.DIAOCHA_ZS,t2.SHOUHAI_ZS,t2.SHOUHAI_ZL,t2.WEIHAI_CD,t2.CHENGZAI,t2.BEIZHU\r\n" + 
			"from YHSWPC_MP t1,YHSWPC_MPDC t2\r\n" + 
			"where t1.UUID_MP = t2.UUID_MP "
			+ "and t1.uuid_mp = #{0}")
	List<MaoPu> findById(String uuid_mp);
	
	@Update("update YHSWPC_MP set sheng =#{1},shi=#{2},xian =#{3},xian_Mc=#{4},"
			+ "xiang = #{5},xiang_Mc=#{6},miaopu_mc =#{7},miaopu_mj=#{8},"
			+ "miaopu_jd =#{9},miaopu_wd=#{10},miaopu_hb =#{11}  "
			+ ",diaocha_ry = #{12},diaocha_sj=#{13},last_changetime =#{14}  "
			+ "where uuid_mp = #{0}")
	void updateZB(String uuid_mp, String sheng, String shi, String xian, 
			String xian_mc, String xiang, String xiang_mc,
			String miaopu_mc, String miaopu_mj, String miaopu_jd, 
			String miaopu_wd, String miaopu_hb, String diaocha_ry,
			String diaocha_sj, String last_changetime);
	
	@Select("update YHSWPC_MPDC  set "
			+ "uuid_mp = #{1},yhsw_lb = #{2},yhsw_mc = #{3},"
			+ "jzzw_mc = #{4},weihai_bw = #{5},diaocha_zs = #{6},shouhai_zs = #{7},"
			+ "shouhai_zl = #{8},weihai_cd = #{9},chengzai = #{10},beizhu = #{11},"
			+ "last_changetime = #{12} where uuid = #{0}")
	void updateFB(String uuid, String uuid_mp, String yhsw_lb, 
			String yhsw_mc,String jzzw_mc, Float weihai_bw,
			String diaocha_zs, String shouhai_zs, String shouhai_zl,
			String weihai_cd, String chengzai, String beizhu,String last_changetime);
	
}
