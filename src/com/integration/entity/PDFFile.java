package com.integration.entity;

public class PDFFile {
	private String id;
	private String pdfTitle;
	private String uploader;
	private String uploadtime;
	private Integer fileType;
	private String referenceNumber;
	
	
	
	public String getReferenceNumber() {
		return referenceNumber;
	}
	public void setReferenceNumber(String referenceNumber) {
		this.referenceNumber = referenceNumber;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPdfTitle() {
		return pdfTitle;
	}
	public void setPdfTitle(String pdfTitle) {
		this.pdfTitle = pdfTitle;
	}
	public String getUploader() {
		return uploader;
	}
	public void setUploader(String uploader) {
		this.uploader = uploader;
	}
	
	public String getUploadtime() {
		return uploadtime;
	}
	public void setUploadtime(String uploadtime) {
		this.uploadtime = uploadtime.substring(0, 16);
	}
	public Integer getFileType() {
		return fileType;
	}
	public void setFileType(Integer fileType) {
		this.fileType = fileType;
	}

	
}
