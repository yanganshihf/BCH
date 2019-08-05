package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import com.integration.entity.Notice;

public interface NoticeDAO {
	@Select("select * from patrolNotice where noticeTitle like #{0} and publicer like #{1} order by publicTime desc")
	List<Notice> find_Notice_List(String fileName, String pubilcer);

	@Insert("insert into patrolNotice " + " (noticeTitle,noticeCode,publicer,publicTime,id) "
			+ " values (#{0},#{1},#{2},#{3},#{4}) ")
	void addNew(String fileName, String fileText, String uploader, String uploadTime, String uuid);
	
	@Delete("delete from patrolNotice where "
			+ "id = #{0} ")
	public void delNotice(String id);
}
