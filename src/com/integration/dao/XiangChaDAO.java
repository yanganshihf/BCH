package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.YhswxcBzd;

public interface XiangChaDAO {
	@Delete("delete from YHSWXC_BZD where UUID_BZD = #{0}")
	void delete(String uuid_bzd);
	
	@Select("select * from YHSWXC_BZD where  "
			+ "shi like #{0} and xian like #{1} and xiang like #{2} and yangdi_h like #{3}")
	List<YhswxcBzd> queryList(String shi, String xian, String xiang, String yangdi_h);
	
	@Select("select * from YHSWXC_BZD where  "
			+ "uuid_bzd = #{0}")
	List<YhswxcBzd> findById(String uuid_bzd);
	
	@Update("update YHSWXC_BZD set sheng =#{1},shi=#{2},xian =#{3},xian_Mc=#{4},"
		      + "xiang =#{5},xiang_Mc=#{6},cun =#{7},xiao_ban=#{8},yangdi_h =#{9},"
		      + "dcsj_fq=#{10},dcsj_fh =#{11},yangdi_jd=#{12},  "
		      + "yangdi_wd =#{13},yhsw_lb=#{14},yhsw_mc =#{15},"
		      + "yangdi_mj=#{16},yangf_sl =#{17},yangdi_bz =#{18},"
		      + "diaocha_ry=#{19},last_changetime =#{20}  "
		      + "where uuid_bzd = #{0}")
		  void updateZB(String uuid_bzd, String sheng, String shi, String xian, 
		      String xianMc, String xiang, String xiangMc,
		      String cun, String xiao_ban, String yangdi_h, String dcsj_fq, 
		      String dcsg_fh, String yangdi_jd,
		      String yangdi_wd, String yhsw_lb, String yhsw_mc, 
		      Float yangdi_mj, Integer yangf_sl, String yangdi_bz,
		      String diaocha_ry, String last_changetime);
}
