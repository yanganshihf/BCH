package com.integration.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.PDFFileDAO;
import com.integration.entity.PDFFile;
import com.integration.service.PDFFileService;

@Service
public class PDFFileServiceImpl implements PDFFileService {

	@Autowired
	PDFFileDAO pd;
	
	@Override
	public List<PDFFile> find_File_List(String fileName, String fileNum,Integer fileType) {
		// TODO Auto-generated method stub
		if(fileType == 99){
			return pd.findAllFile(fileName,fileNum);
		}else{
			return pd.find_File_List(fileName,fileNum,fileType);
		}
	}

	@Override
	public void newFileInsert(String fileName, String fileCode, Integer fileType, String uploader, String uploadTime,String id) {
		// TODO Auto-generated method stub
		pd.newFileInsert(fileName,fileCode,fileType,uploader,uploadTime,id);
	}
	
	@Override
	public void delFile(String id,String fileType) {
		// TODO Auto-generated method stub
		pd.delFile(id,fileType);
	}

}
