package com.integration.action;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.JAXBException;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.integration.entity.ReportCzmjDx;
import com.integration.entity.ReportPcBhyd;
import com.integration.entity.ReportPcByxfc;
import com.integration.entity.ReportPcChyd;
import com.integration.entity.ReportPcMpfc;
import com.integration.entity.ReportPcShyd;
import com.integration.entity.ReportPcTcd;
import com.integration.entity.ReportPcYcZsgpfc;
import com.integration.entity.ReportPcYcdfc;
import com.integration.entity.ReportPcYhswyd;
import com.integration.entity.ReportXcBhdcFh;
import com.integration.entity.ReportXcBhhzFh;
import com.integration.entity.ReportXcChdcFh;
import com.integration.entity.ReportXcChhzFh;
import com.integration.entity.ReportXcFzqh;
import com.integration.entity.ReportXcShdcFh;
import com.integration.entity.ReportXcShhzFh;
import com.integration.service.DictionaryManageService;
import com.integration.service.ReportService;
import com.integration.util.ExcelExUtil;
import com.integration.util.XmlUtils;
import com.integration.util.ZipUtil; 
@Controller
@RequestMapping("report/")
public class ReportAction {
	
	@Autowired
	ReportService ns;
	
	
	@Autowired
	DictionaryManageService dicts;

	/**************************有害生物普查********************************/
	
	/**
	 * 林业有害生物踏查记录表    林木病害样地详查记录表  林木虫害样地详查记录表  林业地下鼠样地详查记录表  林业有害植物样地详查记录表
	 * @param uuidyxs  样地号多个用,分割
	 * @return
	 * @throws URISyntaxException
	 */ 
	
	@RequestMapping(value = "ReportPcTcd", method = RequestMethod.POST)
	@ResponseBody
	public String ReportPcTcd(String uuidyxs) throws URISyntaxException {
		// 时间
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddhhmmss");
		String datestr = dateformat.format(new Date());
		String path = this.getClass().getClassLoader().getResource("").toURI().getPath();
		String resultDri = path.replace("WEB-INF/classes/", "reportResult");
		String excelTempDri = path.replace("WEB-INF/classes/", "excel");   
		resultDri=resultDri+ "/M_" + datestr;
		if (!(new File(resultDri)).exists()) {
            (new File(resultDri)).mkdir(); 
		}
		
		String[] yxs=uuidyxs.split(",");
		for(String yxid:yxs) {
		   String sourceExcelName = "林业有害生物踏查记录表.xlsx";
		   String sourceXmlName = "林业有害生物踏查记录表.xml";
		   String targetExcelName = "林业有害生物踏查记录表"+yxid +"_"+datestr + ".xlsx";
		   String sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   String sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   String targetExcelTempPath = resultDri + "/" + targetExcelName;
		   File sourceExcelTempFile = new File(sourceExcelTempPath);
		   File targetExcelTempFile = new File(targetExcelTempPath); 
		
		  //踏查记录表
		  if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) {  
				List<ReportPcTcd>  tempdynamicData=ns.YHSW_TCJLB(yxid); 
                if(tempdynamicData.size()>0) {
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportPcTcd.class, dynamicData, ReportPcTcd.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
			 
			
		}
		
		List<String> bhbzdbh=ns.YHSW_BHYDBZD(yxid); 
		for(String bzd_bh:bhbzdbh) {
		  sourceExcelName = "林木病害样地详查记录表.xlsx";
		  sourceXmlName = "林木病害样地详查记录表.xml";
		  targetExcelName = "林木病害样地详查记录表"+yxid+"_"+bzd_bh+"_"+datestr + ".xlsx";
		  sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		  sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		  targetExcelTempPath = resultDri + "/" + targetExcelName;
		  sourceExcelTempFile = new File(sourceExcelTempPath);
		  targetExcelTempFile = new File(targetExcelTempPath); 
		  //林木病害样地详查记录表
		  if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) { 
				List<ReportPcBhyd>  tempdynamicData=ns.YHSW_BHYDJLB(bzd_bh); 
                if(tempdynamicData.size()>0) {
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportPcBhyd.class, dynamicData, ReportPcBhyd.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		    } 
		}
		
		//林木虫害样地详查记录表
		List<String> chbzdbh=ns.YHSW_CHYDBZD(yxid); 
		for(String bzd_bh:chbzdbh) {
		  sourceExcelName = "林木虫害样地详查记录表.xlsx";
		  sourceXmlName = "林木虫害样地详查记录表.xml";
		  targetExcelName = "林木虫害样地详查记录表"+yxid+"_"+bzd_bh+"_"+datestr + ".xlsx";
		  sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		  sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		  targetExcelTempPath = resultDri + "/" + targetExcelName;
		  sourceExcelTempFile = new File(sourceExcelTempPath);
		  targetExcelTempFile = new File(targetExcelTempPath); 
		  //林木病害样地详查记录表
		  if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) { 
				List<ReportPcChyd>  tempdynamicData=ns.YHSW_CHYDJLB(bzd_bh); 
                if(tempdynamicData.size()>0) {
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportPcChyd.class, dynamicData, ReportPcChyd.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		    } 
		}
		
		//林业地下鼠样地详查记录表
		List<String> shbzdbh=ns.YHSW_SHYDBZD(yxid); 
		for(String bzd_bh:shbzdbh) {
		  sourceExcelName = "林业地下鼠样地详查记录表.xlsx";
		  sourceXmlName = "林业地下鼠样地详查记录表.xml";
		  targetExcelName = "林业地下鼠样地详查记录表"+yxid+"_"+bzd_bh+"_"+datestr + ".xlsx";
		  sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		  sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		  targetExcelTempPath = resultDri + "/" + targetExcelName;
		  sourceExcelTempFile = new File(sourceExcelTempPath);
		  targetExcelTempFile = new File(targetExcelTempPath); 
		  //林木病害样地详查记录表
		  if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) { 
				List<ReportPcShyd>  tempdynamicData=ns.YHSW_SHYDJLB(bzd_bh); 
                if(tempdynamicData.size()>0) {
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportPcShyd.class, dynamicData, ReportPcShyd.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		    } 
		}
		
		//林业有害植物样地详查记录表
		List<String> zwbzdbh=ns.YHSW_ZWYDBZD(yxid); 
		for(String bzd_bh:zwbzdbh) {
		  sourceExcelName = "林业有害植物样地详查记录表.xlsx";
		  sourceXmlName = "林业有害植物样地详查记录表.xml";
		  targetExcelName = "林业有害植物样地详查记录表"+yxid+"_"+bzd_bh+"_"+datestr + ".xlsx";
		  sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		  sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		  targetExcelTempPath = resultDri + "/" + targetExcelName;
		  sourceExcelTempFile = new File(sourceExcelTempPath);
		  targetExcelTempFile = new File(targetExcelTempPath); 
		  //林木病害样地详查记录表
		  if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) { 
				List<ReportPcYhswyd>  tempdynamicData=ns.YHSW_ZWYDJLB(bzd_bh); 
                if(tempdynamicData.size()>0) {
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportPcYhswyd.class, dynamicData, ReportPcYhswyd.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		    } 
		} 
	}
	String zipPath=path.replace("WEB-INF/classes/", "reportResult");
	String zipFileName=datestr+".zip";
	try {
		ZipUtil.zip2(resultDri, zipPath, zipFileName);
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	return datestr+".zip";
  }
	 
	/**
	 * 辅助调查（诱虫灯、引诱剂）调查记录表
	 * @param uuidyxs UUID_YCD 多个用，分割
	 * @return
	 * @throws URISyntaxException
	 */
	@RequestMapping(value = "ReportPcYcd", method = RequestMethod.POST)
	@ResponseBody
	public String ReportPcYcd(String uuidyxs) throws URISyntaxException {
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddhhmmss");
		String datestr = dateformat.format(new Date());
		String path = this.getClass().getClassLoader().getResource("").toURI().getPath();
		String resultDri = path.replace("WEB-INF/classes/", "reportResult");
		String excelTempDri = path.replace("WEB-INF/classes/", "excel"); 
		resultDri=resultDri+ "/M_" + datestr;
		if (!(new File(resultDri)).exists()) {
            (new File(resultDri)).mkdir(); 
		}
		String[] yxs=uuidyxs.split(",");
		for(String yxid:yxs) {
		   String sourceExcelName = "辅助调查（诱虫灯、引诱剂）调查记录表.xlsx";
		   String sourceXmlName = "辅助调查（诱虫灯、引诱剂）调查记录表.xml";
		   String targetExcelName = "辅助调查（诱虫灯、引诱剂）调查记录表"+yxid +"_"+datestr + ".xlsx";
		   String sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   String sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   String targetExcelTempPath = resultDri + "/" + targetExcelName;
		   File sourceExcelTempFile = new File(sourceExcelTempPath);
		   File targetExcelTempFile = new File(targetExcelTempPath); 
		
		  //踏查记录表
		  if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) {  
				List<ReportPcYcdfc>  tempdynamicData=ns.YHSW_YCDJLB(yxid); 
                if(tempdynamicData.size()>0) {
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportPcYcdfc.class, dynamicData, ReportPcYcdfc.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		    } 
		}
		String zipPath=path.replace("WEB-INF/classes/", "reportResult");
		String zipFileName=datestr+".zip";
		try {
			ZipUtil.zip2(resultDri, zipPath, zipFileName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return datestr+".zip";
	}
	
	/**
	 *  种实、果品、花卉、木材及其制品有害生物调查记录表
	 * @param uuidyxs  UUID_ZSGP多个用，号分割
	 * @return
	 * @throws URISyntaxException
	 */
	@RequestMapping(value = "ReportPcZsgp", method = RequestMethod.POST)
	@ResponseBody
	public String ReportPcZsgp(String uuidyxs) throws URISyntaxException {
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddhhmmss");
		String datestr = dateformat.format(new Date());
		String path = this.getClass().getClassLoader().getResource("").toURI().getPath();
		String resultDri = path.replace("WEB-INF/classes/", "reportResult");
		String excelTempDri = path.replace("WEB-INF/classes/", "excel"); 
		resultDri=resultDri+ "/M_" + datestr;
		if (!(new File(resultDri)).exists()) {
            (new File(resultDri)).mkdir(); 
		}
		String[] yxs=uuidyxs.split(",");
		for(String yxid:yxs) {
		   String sourceExcelName = "种实、果品、花卉、木材及其制品有害生物调查记录表.xlsx";
		   String sourceXmlName = "种实、果品、花卉、木材及其制品有害生物调查记录表.xml";
		   String targetExcelName = "种实、果品、花卉、木材及其制品有害生物调查记录表"+yxid +"_"+datestr + ".xlsx";
		   String sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   String sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   String targetExcelTempPath = resultDri + "/" + targetExcelName;
		   File sourceExcelTempFile = new File(sourceExcelTempPath);
		   File targetExcelTempFile = new File(targetExcelTempPath); 
		
		  //踏查记录表
		  if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) {  
				List<ReportPcYcZsgpfc>  tempdynamicData=ns.YHSW_ZSGPJLB(yxid); 
                if(tempdynamicData.size()>0) {
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportPcYcZsgpfc.class, dynamicData, ReportPcYcZsgpfc.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		    } 
		}
		String zipPath=path.replace("WEB-INF/classes/", "reportResult");
		String zipFileName=datestr+".zip";
		try {
			ZipUtil.zip2(resultDri, zipPath, zipFileName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return datestr+".zip";
	}
	
	/**
	 *  苗圃（花圃）有害生物调查记录表
	 * @param uuidyxs  UUID_ZSGP多个用，号分割
	 * @return
	 * @throws URISyntaxException
	 */
	@RequestMapping(value = "ReportPcMp", method = RequestMethod.POST)
	@ResponseBody
	public String ReportPcMp(String uuidyxs) throws URISyntaxException {
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddhhmmss");
		String datestr = dateformat.format(new Date());
		String path = this.getClass().getClassLoader().getResource("").toURI().getPath();
		String resultDri = path.replace("WEB-INF/classes/", "reportResult");
		String excelTempDri = path.replace("WEB-INF/classes/", "excel"); 
		resultDri=resultDri+ "/M_" + datestr;
		if (!(new File(resultDri)).exists()) {
            (new File(resultDri)).mkdir(); 
		}
		String[] yxs=uuidyxs.split(",");
		for(String yxid:yxs) {
		   String sourceExcelName = "苗圃（花圃）有害生物调查记录表.xlsx";
		   String sourceXmlName = "苗圃（花圃）有害生物调查记录表.xml";
		   String targetExcelName = "苗圃（花圃）有害生物调查记录表"+yxid +"_"+datestr + ".xlsx";
		   String sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   String sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   String targetExcelTempPath = resultDri + "/" + targetExcelName;
		   File sourceExcelTempFile = new File(sourceExcelTempPath);
		   File targetExcelTempFile = new File(targetExcelTempPath); 
		
		  //踏查记录表
		  if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) {  
				List<ReportPcMpfc>  tempdynamicData=ns.YHSW_MPJLB(yxid); 
                if(tempdynamicData.size()>0) {
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportPcMpfc.class, dynamicData, ReportPcMpfc.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		    } 
		}
		String zipPath=path.replace("WEB-INF/classes/", "reportResult");
		String zipFileName=datestr+".zip";
		try {
			ZipUtil.zip2(resultDri, zipPath, zipFileName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return datestr+".zip";
	}
	
	/**
	 *  检疫性有害生物及国（境）外或省级行政区外传入的林业有害生物调查表
	 * @param uuidyxs  UUID_ZSGP多个用，号分割
	 * @return
	 * @throws URISyntaxException
	 */
	@RequestMapping(value = "ReportPcJyx", method = RequestMethod.POST)
	@ResponseBody
	public String ReportPcJyx(String uuidyxs) throws URISyntaxException {
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddhhmmss");
		String datestr = dateformat.format(new Date());
		String path = this.getClass().getClassLoader().getResource("").toURI().getPath();
		String resultDri = path.replace("WEB-INF/classes/", "reportResult");
		String excelTempDri = path.replace("WEB-INF/classes/", "excel"); 
		resultDri=resultDri+ "/M_" + datestr;
		if (!(new File(resultDri)).exists()) {
            (new File(resultDri)).mkdir(); 
		}
		String[] yxs=uuidyxs.split(",");
		for(String yxid:yxs) {
		   String sourceExcelName = "检疫性有害生物及国（境）外或省级行政区外传入的林业有害生物调查表.xlsx";
		   String sourceXmlName = "检疫性有害生物及国（境）外或省级行政区外传入的林业有害生物调查表.xml";
		   String targetExcelName = "检疫性有害生物及国（境）外或省级行政区外传入的林业有害生物调查表"+yxid +"_"+datestr + ".xlsx";
		   String sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   String sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   String targetExcelTempPath = resultDri + "/" + targetExcelName;
		   File sourceExcelTempFile = new File(sourceExcelTempPath);
		   File targetExcelTempFile = new File(targetExcelTempPath); 
		
		  //踏查记录表
		  if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) {  
				List<ReportPcByxfc>  tempdynamicData=ns.YHSW_BYXYHSWJLB(yxid); 
                if(tempdynamicData.size()>0) {
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportPcByxfc.class, dynamicData, ReportPcByxfc.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		    } 
		}
		String zipPath=path.replace("WEB-INF/classes/", "reportResult");
		String zipFileName=datestr+".zip";
		try {
			ZipUtil.zip2(resultDri, zipPath, zipFileName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return datestr+".zip";
	}
	/**************************有害生物普查完********************************/
	
	
	/**************************有害生物详查********************************/
	
	/**
	 *  林业有害生物防治防前防后调查表
	 * @param uuidyxs  UUID_ZSGP多个用，号分割
	 * @return
	 * @throws URISyntaxException
	 */
	@RequestMapping(value = "ReportXcFzFqfh", method = RequestMethod.POST)
	@ResponseBody
	public String ReportXcFzFqfh(String uuidyxs) throws URISyntaxException {
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddhhmmss");
		String datestr = dateformat.format(new Date());
		String path = this.getClass().getClassLoader().getResource("").toURI().getPath();
		String resultDri = path.replace("WEB-INF/classes/", "reportResult");
		String excelTempDri = path.replace("WEB-INF/classes/", "excel"); 
		resultDri=resultDri+ "/M_" + datestr;
		if (!(new File(resultDri)).exists()) {
            (new File(resultDri)).mkdir(); 
		}
	 
		   String sourceExcelName = "林业有害生物防治防前防后调查表.xlsx";
		   String sourceXmlName = "林业有害生物防治防前防后调查表.xml";
		   String targetExcelName = "林业有害生物防治防前防后调查表" +"_"+datestr + ".xlsx";
		   String sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   String sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   String targetExcelTempPath = resultDri + "/" + targetExcelName;
		   File sourceExcelTempFile = new File(sourceExcelTempPath);
		   File targetExcelTempFile = new File(targetExcelTempPath);  
		  //踏查记录表
		  if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) {  
			     Map<String, Object> param=new HashMap();
			     param.put("XU_HAO", uuidyxs);
				List<ReportXcFzqh>  tempdynamicData=ns.YHSWXC_FQFHDCB(param); 
                if(tempdynamicData.size()>0) {
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportXcFzqh.class, dynamicData, ReportXcFzqh.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		    } 
		 
		String zipPath=path.replace("WEB-INF/classes/", "reportResult");
		String zipFileName=datestr+".zip";
		try {
			ZipUtil.zip2(resultDri, zipPath, zipFileName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return datestr+".zip";
	}
	
	
	/**
	 *  病害防后调查表（标准地详查表），  病害防前调查表（标准地详查表） ，  虫害防后调查表（标准地详查表），   虫害防前调查表（标准地详查表）， 鼠害防后调查表（标准地详查表），  鼠害防前调查表（标准地详查表）
	 * @param uuidyxs  UUID_ZSGP多个用，号分割
	 * @return
	 * @throws URISyntaxException
	 */
	
	@RequestMapping(value = "yhswxc_bzd_bhdc", method = RequestMethod.POST)
	@ResponseBody
	public String yhswxc_bzd_bhdc(String uuidyxs) throws URISyntaxException {
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddhhmmss");
		String datestr = dateformat.format(new Date());
		String path = this.getClass().getClassLoader().getResource("").toURI().getPath();
		String resultDri = path.replace("WEB-INF/classes/", "reportResult");
		String excelTempDri = path.replace("WEB-INF/classes/", "excel"); 
		resultDri=resultDri+ "/M_" + datestr;
		if (!(new File(resultDri)).exists()) {
            (new File(resultDri)).mkdir(); 
		}
		String[] yxs=uuidyxs.split(",");
		for(String yxid:yxs) {  
			List<String> ydhs=ns.YHSWXC_BZD_BHDC_FH_COUNT(yxid); 
			String sourceExcelName = "";
			   String sourceXmlName ="";
			   String targetExcelName = "";
			   String sourceExcelTempPath = "";
			   String sourceXmlTempPath = "";
			   String targetExcelTempPath = "";
			   File sourceExcelTempFile = null;
			   File targetExcelTempFile =null;
			for(String ydh:ydhs) {
			// 病害防后调查表（标准地详查表）
		    sourceExcelName = "病害防后调查表（标准地详查表）.xlsx";
		    sourceXmlName = "病害防后调查表（标准地详查表）.xml";
		    targetExcelName = "病害防后调查表（标准地详查表）"+yxid +"_"+ydh+"_"+datestr + ".xlsx";
		    sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		    sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		    targetExcelTempPath = resultDri + "/" + targetExcelName;
		    sourceExcelTempFile = new File(sourceExcelTempPath);
		    targetExcelTempFile = new File(targetExcelTempPath); 
		   {
		      List<ReportXcBhdcFh>  tempdynamicData=ns.YHSWXC_BZD_BHDC_FH(yxid,ydh); 
		     if(tempdynamicData.size()>0) {
		     if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) { 
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportXcBhdcFh.class, dynamicData, ReportXcBhdcFh.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		    }
		   }
			}
		   ydhs=ns.YHSWXC_BZD_BHDC_FQ_COUNT(yxid); 
			for(String ydh:ydhs) {
		   sourceExcelName = "病害防前调查表（标准地详查表）.xlsx";
		   sourceXmlName = "病害防前调查表（标准地详查表）.xml";
		   targetExcelName = "病害防前调查表（标准地详查表）"+yxid +"_"+ydh+"_"+datestr + ".xlsx";
		   sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   targetExcelTempPath = resultDri + "/" + targetExcelName;
		   sourceExcelTempFile = new File(sourceExcelTempPath);
		   targetExcelTempFile = new File(targetExcelTempPath); 
		   {
		       List<ReportXcBhdcFh>  tempdynamicData=ns.YHSWXC_BZD_BHDC_FQ(yxid,ydh); 
		       if(tempdynamicData.size()>0) {
		         if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) { 
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportXcBhdcFh.class, dynamicData, ReportXcBhdcFh.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		      }
		   }
			}
		   
			
			 ydhs=ns.YHSWXC_BZD_CHDC_FH_COUNT(yxid); 
				for(String ydh:ydhs) {
		   sourceExcelName = "虫害防后调查表（标准地详查表）.xlsx";
		   sourceXmlName = "虫害防后调查表（标准地详查表）.xml";
		   targetExcelName = "虫害防后调查表（标准地详查表）"+yxid +"_"+ydh+"_"+datestr + ".xlsx";
		   sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   targetExcelTempPath = resultDri + "/" + targetExcelName;
		   sourceExcelTempFile = new File(sourceExcelTempPath);
		   targetExcelTempFile = new File(targetExcelTempPath); 
		   {
		       List<ReportXcChdcFh>  tempdynamicData=ns.YHSWXC_BZD_CHDC_FH(yxid,ydh); 
		       if(tempdynamicData.size()>0) {
		         if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) { 
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportXcChdcFh.class, dynamicData, ReportXcChdcFh.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		      }
		   }
				}
				 ydhs=ns.YYHSWXC_BZD_CHDC_FQ_COUNT(yxid); 
					for(String ydh:ydhs) {
		   sourceExcelName = "虫害防前调查表（标准地详查表）.xlsx";
		   sourceXmlName = "虫害防前调查表（标准地详查表）.xml";
		   targetExcelName = "虫害防前调查表（标准地详查表）"+yxid +"_"+ydh+"_"+datestr + ".xlsx";
		   sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   targetExcelTempPath = resultDri + "/" + targetExcelName;
		   sourceExcelTempFile = new File(sourceExcelTempPath);
		   targetExcelTempFile = new File(targetExcelTempPath); 
		   {
		       List<ReportXcChdcFh>  tempdynamicData=ns.YHSWXC_BZD_CHDC_FQ(yxid,ydh); 
		       if(tempdynamicData.size()>0) {
		         if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) { 
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportXcChdcFh.class, dynamicData, ReportXcChdcFh.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		      }
		   }
					 }
		   
					 ydhs=ns.YHSWXC_BZD_SHDC_FH_COUNT(yxid); 
						for(String ydh:ydhs) { 
		   sourceExcelName = "鼠害防后调查表（标准地详查表）.xlsx";
		   sourceXmlName = "鼠害防后调查表（标准地详查表）.xml";
		   targetExcelName = "鼠害防后调查表（标准地详查表）"+yxid +"_"+ydh+"_"+datestr + ".xlsx";
		   sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   targetExcelTempPath = resultDri + "/" + targetExcelName;
		   sourceExcelTempFile = new File(sourceExcelTempPath);
		   targetExcelTempFile = new File(targetExcelTempPath); 
		   {
		       List<ReportXcShdcFh>  tempdynamicData=ns.YHSWXC_BZD_SHDC_FH(yxid,ydh); 
		       if(tempdynamicData.size()>0) {
		         if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) { 
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportXcShdcFh.class, dynamicData, ReportXcShdcFh.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		      }
		   }
						}
		   
						 ydhs=ns.YHSWXC_BZD_SHDC_FQ_COUNT(yxid); 
							for(String ydh:ydhs) { 
		   sourceExcelName = "鼠害防前调查表（标准地详查表）.xlsx";
		   sourceXmlName = "鼠害防前调查表（标准地详查表）.xml";
		   targetExcelName = "鼠害防前调查表（标准地详查表）"+yxid +"_"+ydh+"_"+datestr + ".xlsx";
		   sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   targetExcelTempPath = resultDri + "/" + targetExcelName;
		   sourceExcelTempFile = new File(sourceExcelTempPath);
		   targetExcelTempFile = new File(targetExcelTempPath); 
		   {
		       List<ReportXcShdcFh>  tempdynamicData=ns.YHSWXC_BZD_SHDC_FQ(yxid,ydh); 
		       if(tempdynamicData.size()>0) {
		         if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) { 
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportXcShdcFh.class, dynamicData, ReportXcShdcFh.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		      }
		   }
		}
		}
		String zipPath=path.replace("WEB-INF/classes/", "reportResult");
		String zipFileName=datestr+".zip";
		try {
			ZipUtil.zip2(resultDri, zipPath, zipFileName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return datestr+".zip";
	}
	
	
	/**
	 *  病害防后调查表（标准地调查汇总表）
	 * @param uuidyxs  UUID_ZSGP多个用，号分割
	 * @return 
	 * @throws URISyntaxException
	 */	
	@RequestMapping(value = "yhswxc_bzd_bhhz_fh", method = RequestMethod.POST)
	@ResponseBody
	public String yhswxc_bzd_bhhz_fh(String uuidyxs) throws URISyntaxException {
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddhhmmss");
		String datestr = dateformat.format(new Date());
		String path = this.getClass().getClassLoader().getResource("").toURI().getPath();
		String resultDri = path.replace("WEB-INF/classes/", "reportResult");
		String excelTempDri = path.replace("WEB-INF/classes/", "excel"); 
		resultDri=resultDri+ "/M_" + datestr;
		if (!(new File(resultDri)).exists()) {
            (new File(resultDri)).mkdir(); 
		}
		/*String[] yxs=uuidyxs.split(",");
		for(String yxid:yxs) {*/
		   String sourceExcelName = "病害防后调查表（标准地调查汇总表）.xlsx";
		   String sourceXmlName = "病害防后调查表（标准地调查汇总表）.xml";
		   String targetExcelName = "病害防后调查表（标准地调查汇总表）" +"_"+datestr + ".xlsx";
		   String sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   String sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   String targetExcelTempPath = resultDri + "/" + targetExcelName;
		   File sourceExcelTempFile = new File(sourceExcelTempPath);
		   File targetExcelTempFile = new File(targetExcelTempPath); 
		
		  //踏查记录表
		  if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) {  
			    Map<String, Object> param=new HashMap();
			    param.put("UUID_BZD", uuidyxs);
				List<ReportXcBhhzFh>  tempdynamicData=ns.YHSWXC_BZD_BHHZ_FH(param); 
                if(tempdynamicData.size()>0) {
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportXcBhhzFh.class, dynamicData, ReportXcBhhzFh.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		    } 
		//}
		String zipPath=path.replace("WEB-INF/classes/", "reportResult");
		String zipFileName=datestr+".zip";
		try {
			ZipUtil.zip2(resultDri, zipPath, zipFileName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return datestr+".zip";
	}
	
	 
	
	/**
	 * 虫害防后调查表（标准地调查汇总表）
	 * @param uuidyxs  UUID_ZSGP多个用，号分割
	 * @return 
	 * @throws URISyntaxException
	 */
	@RequestMapping(value = "yhswxc_bzd_chhz_fh", method = RequestMethod.POST)
	@ResponseBody
	public String yhswxc_bzd_chhz_fh(String uuidyxs) throws URISyntaxException {
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddhhmmss");
		String datestr = dateformat.format(new Date());
		String path = this.getClass().getClassLoader().getResource("").toURI().getPath();
		String resultDri = path.replace("WEB-INF/classes/", "reportResult");
		String excelTempDri = path.replace("WEB-INF/classes/", "excel"); 
		resultDri=resultDri+ "/M_" + datestr;
		if (!(new File(resultDri)).exists()) {
            (new File(resultDri)).mkdir(); 
		}
		/*String[] yxs=uuidyxs.split(",");
		for(String yxid:yxs) {*/
		   String sourceExcelName = "虫害防后调查表（标准地调查汇总表）.xlsx";
		   String sourceXmlName = "虫害防后调查表（标准地调查汇总表）.xml";
		   String targetExcelName = "虫害防后调查表（标准地调查汇总表）" +"_"+datestr + ".xlsx";
		   String sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   String sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   String targetExcelTempPath = resultDri + "/" + targetExcelName;
		   File sourceExcelTempFile = new File(sourceExcelTempPath);
		   File targetExcelTempFile = new File(targetExcelTempPath); 
		
		  //踏查记录表
		  if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) { 
			    Map<String, Object> param=new HashMap();
			    param.put("UUID_BZD", uuidyxs);
				List<ReportXcChhzFh>  tempdynamicData=ns.YHSWXC_BZD_CHHZ_FH(param); 
                if(tempdynamicData.size()>0) {
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportXcChhzFh.class, dynamicData, ReportXcChhzFh.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		    } 
		//}
		String zipPath=path.replace("WEB-INF/classes/", "reportResult");
		String zipFileName=datestr+".zip";
		try {
			ZipUtil.zip2(resultDri, zipPath, zipFileName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return datestr+".zip";
	}
	
	
	
	
	
	/**
	 * 鼠害防后调查表（标准地调查汇总表）
	 * @param uuidyxs  UUID_ZSGP多个用，号分割
	 * @return 
	 * @throws URISyntaxException
	 */
	
	@RequestMapping(value = "yhswxc_bzd_shhz_fh", method = RequestMethod.POST)
	@ResponseBody
	public String yhswxc_bzd_shhz_fh(String uuidyxs) throws URISyntaxException {
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddhhmmss");
		String datestr = dateformat.format(new Date());
		String path = this.getClass().getClassLoader().getResource("").toURI().getPath();
		String resultDri = path.replace("WEB-INF/classes/", "reportResult");
		String excelTempDri = path.replace("WEB-INF/classes/", "excel"); 
		resultDri=resultDri+ "/M_" + datestr;
		if (!(new File(resultDri)).exists()) {
            (new File(resultDri)).mkdir(); 
		}
	/*	String[] yxs=uuidyxs.split(",");
		for(String yxid:yxs) {*/
		   String sourceExcelName = "鼠害防后调查表（标准地调查汇总表）.xlsx";
		   String sourceXmlName = "鼠害防后调查表（标准地调查汇总表）.xml";
		   String targetExcelName = "鼠害防后调查表（标准地调查汇总表）" +"_"+datestr + ".xlsx";
		   String sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   String sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   String targetExcelTempPath = resultDri + "/" + targetExcelName;
		   File sourceExcelTempFile = new File(sourceExcelTempPath);
		   File targetExcelTempFile = new File(targetExcelTempPath); 
		
		  //踏查记录表
		  if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) {  
			  Map<String, Object> param=new HashMap();
			    param.put("UUID_BZD", uuidyxs);
				List<ReportXcShhzFh>  tempdynamicData=ns.YHSWXC_BZD_SHHZ_FH(param); 
                if(tempdynamicData.size()>0) {
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportXcShhzFh.class, dynamicData, ReportXcShhzFh.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		    } 
		//}
		String zipPath=path.replace("WEB-INF/classes/", "reportResult");
		String zipFileName=datestr+".zip";
		try {
			ZipUtil.zip2(resultDri, zipPath, zipFileName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return datestr+".zip";
	}
	
	
	
	/**
	 * 病害防前调查表（标准地调查汇总表）
	 * @param uuidyxs  UUID_ZSGP多个用，号分割
	 * @return 
	 * @throws URISyntaxException
	 */
	@RequestMapping(value = "yhswxc_bzd_bhhz_fq", method = RequestMethod.POST)
	@ResponseBody
	public String yhswxc_bzd_bhhz_fq(String uuidyxs) throws URISyntaxException {
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddhhmmss");
		String datestr = dateformat.format(new Date());
		String path = this.getClass().getClassLoader().getResource("").toURI().getPath();
		String resultDri = path.replace("WEB-INF/classes/", "reportResult");
		String excelTempDri = path.replace("WEB-INF/classes/", "excel"); 
		resultDri=resultDri+ "/M_" + datestr;
		if (!(new File(resultDri)).exists()) {
            (new File(resultDri)).mkdir(); 
		}
		/*String[] yxs=uuidyxs.split(",");
		for(String yxid:yxs) {*/
		   String sourceExcelName = "病害防前调查表（标准地调查汇总表）.xlsx";
		   String sourceXmlName = "病害防前调查表（标准地调查汇总表）.xml";
		   String targetExcelName = "病害防前调查表（标准地调查汇总表）" +"_"+datestr + ".xlsx";
		   String sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   String sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   String targetExcelTempPath = resultDri + "/" + targetExcelName;
		   File sourceExcelTempFile = new File(sourceExcelTempPath);
		   File targetExcelTempFile = new File(targetExcelTempPath); 
		
		  //踏查记录表
		  if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) {  
			  Map<String, Object> param=new HashMap();
			    param.put("UUID_BZD", uuidyxs);
				List<ReportXcBhhzFh>  tempdynamicData=ns.YHSWXC_BZD_BHHZ_FQ(param); 
                if(tempdynamicData.size()>0) {
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportXcBhhzFh.class, dynamicData, ReportXcBhhzFh.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		    } 
		//}
		String zipPath=path.replace("WEB-INF/classes/", "reportResult");
		String zipFileName=datestr+".zip";
		try {
			ZipUtil.zip2(resultDri, zipPath, zipFileName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return datestr+".zip";
	}
	
	


	/**
	 *虫害防前调查表（标准地调查汇总表）
	 * @param uuidyxs  UUID_ZSGP多个用，号分割
	 * @return 
	 * @throws URISyntaxException
	 */
	@RequestMapping(value = "yhswxc_bzd_chhz_fq", method = RequestMethod.POST)
	@ResponseBody
	public String yhswxc_bzd_chhz_fq(String uuidyxs) throws URISyntaxException {
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddhhmmss");
		String datestr = dateformat.format(new Date());
		String path = this.getClass().getClassLoader().getResource("").toURI().getPath();
		String resultDri = path.replace("WEB-INF/classes/", "reportResult");
		String excelTempDri = path.replace("WEB-INF/classes/", "excel"); 
		resultDri=resultDri+ "/M_" + datestr;
		if (!(new File(resultDri)).exists()) {
            (new File(resultDri)).mkdir(); 
		}
		/*String[] yxs=uuidyxs.split(",");
		for(String yxid:yxs) {*/
		   String sourceExcelName = "虫害防前调查表（标准地调查汇总表）.xlsx";
		   String sourceXmlName = "虫害防前调查表（标准地调查汇总表）.xml";
		   String targetExcelName = "虫害防前调查表（标准地调查汇总表）" +"_"+datestr + ".xlsx";
		   String sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   String sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   String targetExcelTempPath = resultDri + "/" + targetExcelName;
		   File sourceExcelTempFile = new File(sourceExcelTempPath);
		   File targetExcelTempFile = new File(targetExcelTempPath); 
		
		  //踏查记录表
		  if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) {  
			  Map<String, Object> param=new HashMap();
			    param.put("UUID_BZD", uuidyxs);
				List<ReportXcChhzFh>  tempdynamicData=ns.YHSWXC_BZD_CHHZ_FQ(param); 
                if(tempdynamicData.size()>0) {
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportXcChhzFh.class, dynamicData, ReportXcChhzFh.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		    } 
		//}
		String zipPath=path.replace("WEB-INF/classes/", "reportResult");
		String zipFileName=datestr+".zip";
		try {
			ZipUtil.zip2(resultDri, zipPath, zipFileName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return datestr+".zip";
	}
	
	
	
	
	/**
	 * 鼠害防前调查表（标准地调查汇总表）
	 * @param uuidyxs  UUID_ZSGP多个用，号分割
	 * @return 
	 * @throws URISyntaxException
	 */
	@RequestMapping(value = "yhswxc_bzd_shhz_fq", method = RequestMethod.POST)
	@ResponseBody
	public String yhswxc_bzd_shhz_fq(String uuidyxs) throws URISyntaxException {
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddhhmmss");
		String datestr = dateformat.format(new Date());
		String path = this.getClass().getClassLoader().getResource("").toURI().getPath();
		String resultDri = path.replace("WEB-INF/classes/", "reportResult");
		String excelTempDri = path.replace("WEB-INF/classes/", "excel"); 
		resultDri=resultDri+ "/M_" + datestr;
		if (!(new File(resultDri)).exists()) {
            (new File(resultDri)).mkdir(); 
		}
		/*String[] yxs=uuidyxs.split(",");
		for(String yxid:yxs) {*/
		   String sourceExcelName = "虫害防前调查表（标准地调查汇总表）.xlsx";
		   String sourceXmlName = "虫害防前调查表（标准地调查汇总表）.xml";
		   String targetExcelName = "虫害防前调查表（标准地调查汇总表）" +"_"+datestr + ".xlsx";
		   String sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   String sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   String targetExcelTempPath = resultDri + "/" + targetExcelName;
		   File sourceExcelTempFile = new File(sourceExcelTempPath);
		   File targetExcelTempFile = new File(targetExcelTempPath); 
		
		  //踏查记录表
		  if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) {  
			  Map<String, Object> param=new HashMap();
			    param.put("UUID_BZD", uuidyxs);
				List<ReportXcShhzFh>  tempdynamicData=ns.YHSWXC_BZD_SHHZ_FQ(param); 
                if(tempdynamicData.size()>0) {
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportXcShhzFh.class, dynamicData, ReportXcShhzFh.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		    } 
		//}
		String zipPath=path.replace("WEB-INF/classes/", "reportResult");
		String zipFileName=datestr+".zip";
		try {
			ZipUtil.zip2(resultDri, zipPath, zipFileName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return datestr+".zip";
	}
	
	/**************************有害生物详查完********************************/
	
	/**************************成灾面积调查********************************/
	/**
	 * 鼠害防前调查表（标准地调查汇总表）
	 * @param uuidyxs  UUID_ZSGP多个用，号分割
	 * @return 
	 * @throws URISyntaxException
	 */
	@RequestMapping(value = "yhswxc_czmjdcb", method = RequestMethod.POST)
	@ResponseBody
	public String yhswxc_czmjdcb(String uuidyxs) throws URISyntaxException {
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddhhmmss");
		String datestr = dateformat.format(new Date());
		String path = this.getClass().getClassLoader().getResource("").toURI().getPath();
		String resultDri = path.replace("WEB-INF/classes/", "reportResult");
		String excelTempDri = path.replace("WEB-INF/classes/", "excel"); 
		resultDri=resultDri+ "/M_" + datestr;
		if (!(new File(resultDri)).exists()) {
            (new File(resultDri)).mkdir(); 
		}
		 Map<String, Object> param=new HashMap();
		 param.put("UUID_CZD", uuidyxs);
		List<ReportCzmjDx> ydhs=ns.YHSWXC_CZD_DCB_COUNT(param);
		//String[] yxs=uuidyxs.split(",");
		for(ReportCzmjDx yxid:ydhs) {
		   String sourceExcelName = "成灾面积调查表.xlsx";
		   String sourceXmlName = "成灾面积调查表.xml";
		   String targetExcelName = "成灾面积调查表"+yxid.getXIAO_BAN() +"_"+datestr + ".xlsx";
		   String sourceExcelTempPath = excelTempDri + "/" + sourceExcelName;
		   String sourceXmlTempPath = excelTempDri + "/" + sourceXmlName;
		   String targetExcelTempPath = resultDri + "/" + targetExcelName;
		   File sourceExcelTempFile = new File(sourceExcelTempPath);
		   File targetExcelTempFile = new File(targetExcelTempPath); 
		
		  //踏查记录表
		  if (CopyFile(sourceExcelTempFile, targetExcelTempFile)) {  
				List<ReportCzmjDx>  tempdynamicData=ns.YHSWXC_CZD_DCB(yxid.getXIANG(),yxid.getCUN(),yxid.getXIAO_BAN()); 
                if(tempdynamicData.size()>0) {
                	List<Object> dynamicData=new ArrayList();
                	dynamicData.addAll(tempdynamicData);
	                com.integration.entity.DataMapping xmlMapper;
					try {
						xmlMapper = XmlUtils.deserialize(sourceXmlTempPath, com.integration.entity.DataMapping.class);
						Boolean isSuccess= ExcelExUtil.ExcelWriteByinfos(xmlMapper, targetExcelTempPath, dynamicData.get(0), ReportCzmjDx.class, dynamicData, ReportCzmjDx.class,dicts);
					} catch (FileNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JAXBException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                   	 
                } 
		    } 
		}
		String zipPath=path.replace("WEB-INF/classes/", "reportResult");
		String zipFileName=datestr+".zip";
		try {
			ZipUtil.zip2(resultDri, zipPath, zipFileName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return datestr+".zip";
	}
	
	/**************************成灾面积调查完********************************/
	
	
	
    private boolean CopyFile(File sourceFile, File targetFile) {
	       boolean result = false;
	       if (sourceFile != null) {
	           if (targetFile.exists()) {
	               targetFile.delete();
	           }
	           // 如果该路径不存在，则创建文件目录
	           if (!targetFile.getParentFile().exists())
	               targetFile.getParentFile().mkdirs();
	           // 将文件复制到创建的文件存储路径
	           try {
	               FileUtils.copyFile(sourceFile, targetFile);
	               result = true;
	           } catch (IOException e) {
	               result = false;
	               e.printStackTrace();
	           }
	       }
	       return result;
	   }
}
