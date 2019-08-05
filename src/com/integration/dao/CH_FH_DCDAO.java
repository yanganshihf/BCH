package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.integration.entity.YhswxcBzdChdcFh;

public interface CH_FH_DCDAO {
	@Delete("delete from YHSWXC_BZD_CHHZ_FH where UUID = #{0}")
	void delete(String uuid);
	
	@Select("select * from  YHSWXC_BZD_CHHZ_FH")
	List<YhswxcBzdChdcFh> queryList();
	
	@Select("select * from YHSWXC_BZD_CHHZ_FH where  "
			+ "UUID = #{0}")
	List<YhswxcBzdChdcFh> findById(String uuid_bzd);

	@Update("update YHSWXC_BZD_CHHZ_FH set uuid_bzd =#{1},yangf_h=#{2},yangz_h =#{3},"
			+ "shouhai=#{4},"
			+ "chongk_md =#{5},bei_zhu=#{6},last_changetime =#{7}  "
			+ "where uuid = #{0}")
	void updateZB(String uuid, String uuid_bzd, String yangf_h, Integer yangz_h, 
			String shouhai, Integer chongk_md,
			String bei_zhu, String last_changetime);
	
}
