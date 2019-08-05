package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import com.integration.entity.PDFFile;

public interface PDFFileDAO {
	@Select("select * from pdfFile "
			+ "where pdfTitle like #{0} and referenceNumber like #{1} "
			+ "and fileType = #{2}")
	List<PDFFile> find_File_List(String fileName, String fileNum, Integer fileType);
	
	@Insert("insert into pdfFile "
			+ "VALUES  (#{0},#{1},#{3},#{4},#{2},#{5})")
	void newFileInsert(String fileName, String fileCode, Integer fileType, String uploader, String uploadTime,String id);

	@Delete("delete from pdfFile where "
			+ "id = #{0} "
			+ "and fileType = #{1} ")
	public void delFile(String id,String fileType);
	
	@Select("select * from pdfFile "
			+ "where pdfTitle like #{0} and referenceNumber like #{1} "
			+ "and fileType <> 0")
	List<PDFFile> findAllFile(String fileName, String fileNum);
}
