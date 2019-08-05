package com.integration.service;

import java.util.List;

import com.integration.entity.Notice;

public interface NoticeService {

	List<Notice> find_Notice_List(String fileName, String pubilcer);

	void addNew(String fileName, String fileText, String uploader, String uploadTime, String uuid);
	
	public void delNotice(String id);
	
}
