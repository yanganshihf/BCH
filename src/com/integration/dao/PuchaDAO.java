package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.TC_ZHUBIAO;

public interface PuchaDAO {
	@Delete("delete from yhswpc_tcd where UUID_TCD = #{0}")
	void delete(String uuid_tcd);
	
	@Select("select YHSWPC_YX.UUID_YX,YHSWPC_YX.SHENG,YHSWPC_YX.SHI,YHSWPC_YX.XIAN,YHSWPC_YX.XIAN_MC,YHSWPC_YX.XIANG,YHSWPC_YX.XIANG_MC,YHSWPC_YX.XIANLU_BH,YHSWPC_YX.DIAOCHA_MJ,YHSWPC_YX.DIAOCHA_RY,YHSWPC_YX.DIAOCHA_SJ,\r\n" + 
			"YHSWPC_TCD.UUID_TCD,YHSWPC_TCD.TCD_BH, YHSWPC_TCD.TCD_MC,YHSWPC_TCD.TCD_JD,\r\n" + 
			"YHSWPC_TCD.TCD_WD,YHSWPC_TCD.TCD_HB,YHSWPC_TCD.TCD_SZZC,YHSWPC_TCD.YHSW_LB,YHSWPC_TCD.YHSW_MC,YHSWPC_TCD.JZZW_MC,YHSWPC_TCD.WEIHAI_BW,YHSWPC_TCD.TCD_SZBZD,YHSWPC_TCD.BZD_BH,YHSWPC_TCD.TCD_BZ,YHSWPC_TCD.LAST_CHANGETIME\r\n" + 
			"from YHSWPC_YX RIGHT JOIN YHSWPC_TCD on YHSWPC_YX.UUID_YX=YHSWPC_TCD.UUID_YX\r\n" + 
			"WHERE YHSWPC_YX.shi like #{0} AND YHSWPC_YX.xian like #{1} \r\n" + 
			"AND YHSWPC_YX.xiang like #{2} AND YHSWPC_YX.xianlu_bh like #{3} AND YHSWPC_TCD.BZD_BH like #{4} \r\n" + 
			"")
	List<TC_ZHUBIAO> queryList(String shi, String xian, String xiang, String tachaluxianbianhao,
			String biaozhundibianhao);
	
	@Select("select YHSWPC_YX.UUID_YX,YHSWPC_YX.SHENG,YHSWPC_YX.SHI,YHSWPC_YX.XIAN,YHSWPC_YX.XIAN_MC,YHSWPC_YX.XIANG,YHSWPC_YX.XIANG_MC,YHSWPC_YX.XIANLU_BH,YHSWPC_YX.DIAOCHA_MJ,YHSWPC_YX.DIAOCHA_RY,YHSWPC_YX.DIAOCHA_SJ,\r\n" + 
			"YHSWPC_TCD.UUID_TCD,YHSWPC_TCD.TCD_BH, YHSWPC_TCD.TCD_MC,YHSWPC_TCD.TCD_JD,\r\n" + 
			"YHSWPC_TCD.TCD_WD,YHSWPC_TCD.TCD_HB,YHSWPC_TCD.TCD_SZZC,YHSWPC_TCD.YHSW_LB,YHSWPC_TCD.YHSW_MC,YHSWPC_TCD.JZZW_MC,YHSWPC_TCD.WEIHAI_BW,YHSWPC_TCD.TCD_SZBZD,YHSWPC_TCD.BZD_BH,YHSWPC_TCD.TCD_BZ,YHSWPC_TCD.LAST_CHANGETIME\r\n" + 
			"from YHSWPC_YX RIGHT JOIN YHSWPC_TCD on YHSWPC_YX.UUID_YX=YHSWPC_TCD.UUID_YX\r\n" + 
			"WHERE YHSWPC_TCD.UUID_TCD = #{0} ")
	List<TC_ZHUBIAO> findById(String uuidTcd);
	
	@Update("update YHSWPC_YX set sheng =#{1},shi=#{2},xian =#{3},xian_Mc=#{4},"
			+ "xiang =#{5},xiang_Mc=#{6},xianlu_Bh =#{7},diaocha_Mj=#{8},diaocha_Ry =#{9},diaocha_Sj=#{10},last_Changetime =#{11}  "
			+ "where uuid_Yx = #{0}")
	void updateZB(String uuidYx, String sheng, String shi, String xian, String xianMc, String xiang, String xiangMc,
			String xianluBh, String diaochaMj, String diaochaRy, String diaochaSj, String lastChangetime);

	@Update("update YHSWPC_TCD  set "
			+ "tcd_Bh = #{1},tcd_Mc = #{2},tcd_Jd = #{3},tcd_Wd = #{4},"
			+ "tcd_Hb = #{5},tcd_Szzc = #{6},yhsw_Lb = #{7},yhsw_Mc = #{8},"
			+ "jzzw_Mc = #{9},weihai_Bw = #{10},tcd_Szbzd = #{11},bzd_Bh = #{12},"
			+ "tcd_Bz = #{13},last_changetime=#{14} "
			+ "where uuid_Tcd = #{0}")
	void updateFB(String uuid_Tcd, 
			String tcd_Bh, String tcd_Mc,  String tcd_Jd, String tcd_Wd,
			Float tcd_Hb, String tcd_Szzc, String yhsw_Lb, String yhsw_Mc,
			String jzzw_Mc, String weihai_Bw,String tcd_Szbzd, String bzd_Bh, 
			String tcd_Bz, String last_changetime);
	
	@Update("update YHSWPC_YX set diaocha_ry=#{0},diaocha_sj=#{1},xian=#{3},xiang=#{4} where uuid_yx=#{2}")
	void updateZB(String diaocha_ry, String diaocha_sj, String uuid_yx, String xian, String xiang);
	
}
