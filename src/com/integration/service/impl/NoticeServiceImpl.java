package com.integration.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.NoticeDAO;
import com.integration.entity.Notice;
import com.integration.service.NoticeService;
@Service
public class NoticeServiceImpl implements NoticeService {
	@Autowired
	NoticeDAO nd;
	
	@Override
	public List<Notice> find_Notice_List(String fileName, String pubilcer) {
		// TODO Auto-generated method stub
		return nd.find_Notice_List(fileName, pubilcer);
	}

	@Override
	public void addNew(String fileName, String fileText, String uploader, String uploadTime,String uuid) {
		// TODO Auto-generated method stub
		nd.addNew(fileName,fileText,uploader,uploadTime,uuid);
	}
	
	@Override
	public void delNotice(String id){
		nd.delNotice(id);
	}

}
