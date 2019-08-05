package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.JYX;

public interface JYXDAO {
	@Delete("delete from YHSWPC_JYX where UUID_JYX = #{0}")
	void delete(String uuid_jyx);
	
	@Select("select * from YHSWPC_JYX "
			+ " where shi like #{0} and xian like #{1} and "
			+ " xiang like #{2}")
	List<JYX> queryList(String shi, String xian, String xiang);
	
	@Select("select t1.*,t2.UUID,t2.YHSW_LB,t2.YHSW_MC,t2.LADING_XM,t2.FAXIAN_SJ,\r\n" + 
			"t2.CHUANRU_D,t2.CHUANRU_TJ,t2.JZZW_MC,t2.JZZW_LX,t2.FENBU_FW,t2.FASHENG_MJ,\r\n" + 
			"t2.GANBING_ZS,t2.WEIHAI_CD,t2.YINGXIANG,t2.BEIZHU\r\n" + 
			"from YHSWPC_JYX t1,YHSWPC_JYX_DC t2\r\n" + 
			"where t1.UUID_JYX = t2.UUID_JYX\r\n" 
			+ "and t1.uuid_jyx = #{0}")
	List<JYX> findById(String uuid_jyx);
	
	@Update("update YHSWPC_JYX set sheng =#{1},shi=#{2},xian =#{3},xian_Mc=#{4},"
			+ "xiang = #{5},xiang_Mc=#{6},xiao_ban=#{7},"
			+ "linfen_lx = #{8},linfen_mj=#{9},zhuyao_sz =#{10},jyx_jd=#{11},"
			+ "jyx_wd =#{12},jyx_hb=#{13},jyx_zmly =#{14},jyx_ybd =#{15},  "
			+ "diaocha_ry = #{16},diaocha_sj=#{17},last_changetime =#{18}  "
			+ "where uuid_jyx = #{0}")
	void updateZB(String uuid_jyx, String sheng, String shi, 
			String xian, String xian_mc, String xiang, String xiang_mc,
			String xiao_ban, String linfen_lx, String linfen_mj, 
			String zhuyao_sz, String jyx_jd, String jyx_wd,
			String jyx_hb, String jyx_zmly, String jyx_ybd, 
			String daocha_ry, String diaocha_sj,String last_changetime);
	
	@Select("update YHSWPC_JYX_DC  set "
			+ "uuid_jyx = #{1},yhsw_lb = #{2},yhsw_mc = #{3},"
			+ "lading_xm = #{4},faxian_sj = #{5},chuanru_d = #{6},chuanru_tj = #{7},\r\n"
			+ "jzzw_mc = #{8},jzzw_lx = #{9},fenbu_fw = #{10},fasheng_mj = #{11},"
			+ "ganbing_zs = #{12},weihai_cd = #{13},yingxiang = #{14},beizhu = #{15},"
			+ "last_changetime = #{16} where uuid = #{0}")
	void updateFB(String uuid, String uuid_jyx, String yhsw_lb, String yhsw_mc, 
			String lading_xm, String faxian_sj,
			String chuanru_d, String chuanru_tj, String jzzw_mc, 
			String jzzw_lx, String fenbu_fw, Float fasheng_mj,
			String ganbing_zs, String weihai_cd, String yingxiang, String beizhu, 
			String last_changetime);
	
}
