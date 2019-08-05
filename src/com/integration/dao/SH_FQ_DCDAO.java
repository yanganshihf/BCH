package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.YhswxcBzdShdcFq;

public interface SH_FQ_DCDAO {
	@Delete("delete from YHSWXC_BZD_SHDC_FQ where UUID = #{0}")
	void delete(String uuid);
	
	@Select("select * from  YHSWXC_BZD_SHDC_FQ")
	List<YhswxcBzdShdcFq> queryList();
	
	@Select("select * from YHSWXC_BZD_SHDC_FQ where  "
			+ "UUID = #{0}")
	List<YhswxcBzdShdcFq> findById(String uuid_bzd);

	@Update("update YHSWXC_BZD_SHDC_FQ set uuid_bzd =#{1},yangf_h=#{2},tuqiu_gs =#{3},"
			+ "youxiao_dk =#{4},bushujia_s=#{5},bushu_hj =#{6},bushu_c=#{7},"
			+ "bushu_x =#{8},tuqiu_xs=#{9},shu_mi_du =#{10},diaocha_zs=#{11},"
			+ "shouhai_zs =#{12},shouhai_zl=#{13},siwang_zs =#{14},siwang_zl=#{15},"
			+ "weihai_cd =#{16},bei_zhu=#{17},last_changetime =#{18}  "
			+ "where uuid = #{0}")
	void updateZB(String uuid, String uuid_bzd, String yangf_h, Integer tuqiu_gs, 
			Integer youxiao_dk,Integer bushujia_s, Integer bushu_hj, 
			Integer bushu_c, Integer bushu_x, Integer tuqiu_xs, Integer shu_mi_du,
			Integer diaocha_zs, Integer shouhai_zs, Integer shouhai_zl,
			Integer siwang_zs, Integer siwang_zl,
			String weihai_cd, String bei_zhu, String last_changetime);
	
}
