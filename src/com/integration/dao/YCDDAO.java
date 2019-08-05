package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.YCD;

public interface YCDDAO {
	@Delete("delete from YHSWPC_YCD where UUID_YCD = #{0}")
	void delete(String uuidYcd);
	
	@Select("select * from YHSWPC_YCD where shi like #{0}"
			+ " and xian like #{1} and xiang like #{2}"
			+ " and XIAO_BAN like #{3}")
	List<YCD> queryList(String shi, String xian, String xiang, String xiao_ban);
	
	@Select("select t1.*,t2.UUID,t2.KUNCHONG,t2.SHULIANG_H,t2.SHULIANG_C,t2.SHULIANG_X,t2.BEI_ZHU \r\n" + 
			"from YHSWPC_YCD t1,YHSWPC_YCDDC t2\r\n" + 
			"where t1.UUID_YCD = t2.UUID_YCD "
			+ "and t1.uuid_ycd = #{0}")
	List<YCD> findById(String uuid_ycd);
	
	@Update("update YHSWPC_YCD set sheng =#{1},shi=#{2},xian =#{3},xian_Mc=#{4},"
			+ "xiang = #{5},xiang_Mc=#{6},xiao_ban =#{7},linfen_lx=#{8},linfen_mj =#{9},zhuyao_sz=#{10},ycd_jd =#{11},  "
			+ "ycd_wd = #{12},ycd_hb=#{13},diaocha_ry =#{14},diaocha_sj=#{15},last_changetime =#{16}  "
			+ "where uuid_ycd = #{0}")
	void updateZB(String uuid_ycd, String sheng, String shi, String xian, String xian_mc, String xiang, String xiang_mc,
			String xiao_ban, String linfen_lx, String linfen_mj, String zhuyao_sz, String ycd_jd,
			String ycd_wd, String ycd_hb, String diaocha_ry, String diaocha_sj, String last_changetime);

	@Select("update YHSWPC_YCDDC  set "
			+ "uuid_ycd = #{1},kunchong = #{2},shuliang_h = #{3},"
			+ "shuliang_c = #{4},shuliang_x = #{5},bei_zhu = #{6},last_changetime = #{7}\r\n"
			+ "where uuid = #{0}")
	void updateFB(String uuid, String uuid_ycd, String kunchong, String shuliang_h, String shuliang_c, Float shuliang_x,
			String bei_zhu, String last_changetime);
	
}
