package com.integration.service;

import java.util.List;

import com.integration.entity.PDFFile;

public interface PDFFileService {

	List<PDFFile> find_File_List(String fileName, String fileNum, Integer fileType);

	void newFileInsert(String fileName, String fileCode, Integer fileType, String uploader, String uploadTime, String uuid);

	public void delFile(String id,String fileType);
}
