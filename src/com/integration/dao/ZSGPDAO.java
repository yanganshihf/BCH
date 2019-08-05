package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.ZSGP;

public interface ZSGPDAO {
	@Delete("delete from YHSWPC_ZSGPDC where UUID_ZSGP = #{0}")
	void delete(String uuidYcd);
	
	
	@Select(" select * " + 
			" from YHSWPC_ZSGP " + 
			" where "
			+ "shi like #{0} and xian like #{1} "
			+ "and xiang like #{2} and CHANGS_MC like #{3}")
	List<ZSGP> queryList(String shi, String xian, String xiang, String CHANGS_MC);
	
	@Select("select t1.*,t2.UUID,t2.YHSW_LB,t2.YHSW_MC,t2.JZZW_MC,t2.JZZW_LX,t2.WEIHAI_SL,\r\n" + 
			"t2.DAIBIAO_SL,t2.WEIHAI_CD,t2.CHENGZAI,t2.BEIZHU\r\n" + 
			"from YHSWPC_ZSGP t1,YHSWPC_ZSGPDC t2\r\n" + 
			"where t1.UUID_ZSGP = t2.UUID_ZSGP\r\n"
			+ "and t1.UUID_ZSGP = #{0}")
	List<ZSGP> findById(String uuid_zsgp);
	
	@Update("update YHSWPC_ZSGP set sheng =#{1},shi=#{2},xian =#{3},xian_Mc=#{4},"
			+ "xiang = #{5},xiang_Mc=#{6},changs_mc =#{7},ku_cun=#{8},chouy_ls =#{9},changs_jd=#{10},changs_wd =#{11},  "
			+ "changs_bh = #{12},diaocha_ry=#{13},diaocha_sj =#{14},last_changetime=#{15}  "
			+ "where uuid_zsgp = #{0}")
	void updateZB(String uuid_zsgp, String sheng, String shi, String xian, String xian_mc, String xiang,
			String xiang_mc, String changs_mc, String ku_cun, String chouy_ls, String changs_jd, String changs_wd,
			String changs_bh, String diaocha_ry, String diaocha_sj, String last_changetime);

	@Select("update YHSWPC_ZSGPDC  set "
			+ "uuid_zsgp = #{1},yhws_lb = #{2},yhws_mc = #{3},jzzw_mc = #{4},"
			+ "jzzw_lx = #{5},weihai_sl = #{6},daibiao_sl = #{7},weihai_cd = #{8},\r\n"
			+ "chengzai = #{9},beizhu = #{10}\r\n"
			+ "where uuid = #{0}")
	void updateFB(String uuid, String uuid_zsgp, String yhws_lb, String yhws_mc, String jzzw_mc, Float jzzw_lx,
			String weihai_sl, String daibiao_sl, String weihai_cd, String chengzai, String beizhu,
			String last_changetime);
}
