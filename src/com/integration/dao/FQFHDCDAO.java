package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.YhswxcFqfhdcb;

public interface FQFHDCDAO {
	@Delete("delete from YHSWXC_FQFHDCB where UUID_BZD = #{0}")
	void delete(String uuid);
	
	@Select("select * from  YHSWXC_FQFHDCB\r\n"
			+ "where xian like #{0} "
			+ "and xiang like #{1} and yangdi_h like #{2}")
	List<YhswxcFqfhdcb> queryList(String xian, String xiang, String yangdi_h);
	
	@Select("select * from YHSWXC_FQFHDCB where  "
			+ "UUID_BZD = #{0}")
	List<YhswxcFqfhdcb> findById(String uuid_bzd);

	@Update("update YHSWXC_FQFHDCB set xu_hao =#{0},xian=#{1},xian_mc =#{2},"
			+ "xiang =#{3},xiang_mc=#{4},cun =#{5},xiao_ban=#{6},yangdi_h= #{7},"
			+ "didian_jd =#{8},didian_wd=#{9},yhsw_mc =#{10},zhushu_fq=#{11},zhulv_fq= #{12},"
			+ "dcsj_fq =#{13},zhushu_fh=#{14},zhulv_fh =#{15},dcsj_fh=#{16},bei_zhu= #{17},"
			+ "last_changetime= #{18} "
			+ "where uuid_bzd = #{19}")
	void updateZB(Integer xu_hao, String xian, String xian_mc, String xiang, 
			String xiang_mc, String cun,
			String xiao_ban, String yangdi_h, String didian_jd, 
			String didian_wd, String yhsw_mc, Integer zhushu_fq,
			Integer zhulv_fq, String dcsj_fq, Integer zhushu_fh, Integer zhulv_fh,
			String dcsj_fh, String bei_zhu,
			String last_changetime, String uuid_bzd);
}
