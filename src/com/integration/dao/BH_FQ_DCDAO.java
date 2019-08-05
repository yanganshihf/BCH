package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.YhswxcBzdBhdcFq;

public interface BH_FQ_DCDAO {
	@Delete("delete from YHSWXC_BZD_BHDC_FQ where UUID = #{0}")
	void delete(String uuid);
	
	@Select("select * from  YHSWXC_BZD_BHDC_FQ")
	List<YhswxcBzdBhdcFq> queryList();
	
	@Select("select * from YHSWXC_BZD_BHDC_FQ where  "
			+ "UUID = #{0}")
	List<YhswxcBzdBhdcFq> findById(String uuid);

	@Update("update YHSWXC_BZD_BHDC_FQ set uuid_bzd =#{1},"
			+ "yangf_h=#{2},yangz_h=#{3},bing_ji =#{4},daibiaozhi=#{5},bing_qing =#{6},bei_zhu=#{7}"
			+ " where uuid = #{0}")
	void updateZB(String uuid, String uuid_bzd, String yangf_h, Integer yangz_h,
			String bing_ji, String daibiaozhi,
			String bing_qing, String bei_zhu, String lastchangetime);
	
}
