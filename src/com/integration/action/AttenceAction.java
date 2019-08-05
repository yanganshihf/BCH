package com.integration.action;


import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;


import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.entity.AttenceDetail;
import com.integration.entity.AttenceStatic;
import com.integration.entity.AttenceWaring;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.StandardDay;
import com.integration.entity.Survey;
import com.integration.service.AttenceService;
@Controller
@RequestMapping("attence/")
public class AttenceAction {
	

	@Autowired
	private AttenceService as;
	/**
	 * 条件查询统计
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "queryAttenceStatic",method = RequestMethod.POST)
	@ResponseBody
	public Object queryAttenceStatic(Integer page,Integer rows,String department,String personName,String year,String month,String projectType){		
		JqgridPageResp<AttenceStatic> resp = new JqgridPageResp<AttenceStatic>();
		// 验证参数
		department = checkParam(department);
		projectType = checkParam(projectType);
		if (!"".equals(personName)) {
			personName = blur(personName);
			
		}else{
			personName = checkParam(personName);
		}
		
		String attenceMonth = year+"-"+month;
		
		PageHelper.offsetPage((page-1)*rows, rows);
		List<AttenceStatic> AttenceStaticList = as.AttenceStatic(department,personName,attenceMonth,projectType);
		/*for (AttenceStatic attenceStatic : AttenceStaticList) {
			double result = new BigDecimal((float)attenceStatic.getQualifiedDays()*100 / attenceStatic.getStandardday()).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
			attenceStatic.setAttenceRate(result+"");
		}*/
		int records = (int) new PageInfo<>(AttenceStaticList).getTotal();
		// 总页数
		int total = 0;
		if (records%rows == 0) {
			total = records/rows;
		}else {
			total = records/rows +1;
		}
		resp.setRecords(records);
		resp.setTotal(total);
		resp.setRows(AttenceStaticList);
		return resp;
	}
	
	
	
	/**
	 * 条件查询考勤详情
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "queryAttenceDetail",method = RequestMethod.POST)
	@ResponseBody
	public Object queryAttenceDetail(Integer page,Integer rows,String department,String personName,String year,String month,String projectType){		
		JqgridPageResp<AttenceDetail> resp = new JqgridPageResp<AttenceDetail>();
		// 验证参数
		department = checkParam(department);
		projectType = checkParam(projectType);
		if (!"".equals(personName)) {
			personName = blur(personName);
			
		}else{
			personName = checkParam(personName);
		}
		
		String attenceMonth = year+"-"+month;
		// 模糊查询条件
		attenceMonth = blur(attenceMonth);
		
		List<AttenceDetail> attenceDetail = as.QueryAttenceDetail(department,personName,attenceMonth,projectType);
		
		resp.setRows(attenceDetail);
		return resp;
	}
	
	/**
	 * 条件查询设置记录
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "changeRecords",method = RequestMethod.POST)
	@ResponseBody
	public Object changeRecords(){		
		JqgridPageResp<StandardDay> resp = new JqgridPageResp<StandardDay>();		
		// 验证参数
		
		
		List<StandardDay> standardDay = as.QueryChangeRecords();
		
		resp.setRows(standardDay);
		
		return resp;
	}
	
	/**
	 * 条件查询设置记录
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "attenceWarning",method = RequestMethod.POST)
	@ResponseBody
	public Object attenceWarning(){		
		JqgridPageResp<AttenceWaring> resp = new JqgridPageResp<AttenceWaring>();		
		// 验证参数
		
		List<AttenceWaring> attenceWaring = as.QueryAttenceWaring();
		
		resp.setRows(attenceWaring);
		
		return resp;
	}
	
	/**
	 * 条件查询设置记录
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "survey",method = RequestMethod.POST)
	@ResponseBody
	public Object survey(String thisMonth){		
		JqgridPageResp<Survey> resp = new JqgridPageResp<Survey>();		
		// 验证参数
		
		Survey survey = as.querySurvey(thisMonth);
		
		List<Survey> listSurvey = new ArrayList<Survey>();
		listSurvey.add(survey);
		resp.setRows(listSurvey);
		
		return resp;
	}
	
	/**
	 * 设置达标天数
	 * 
	 * @param userName
	 * @param mobile
	 * @param standardDay
	 * @return
	 */
	@RequestMapping(value = "setStandardDay",method = RequestMethod.POST)
	@ResponseBody
	public Object setStandardDay(String userName,String mobile,Integer standardDay){		
		JqgridPageResp<StandardDay> resp = new JqgridPageResp<StandardDay>();
		
		// 获取当前日期
		Date now = new Date();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		String today = simpleDateFormat.format(now);
		
		String[] split_today = today.split("-");
		Integer nextmonth = Integer.parseInt(split_today[1])+1;
		String effectDay = "";
		if (nextmonth == 13) {
			effectDay = (Integer.parseInt(split_today[0])+1)+"-01-01";
		}else {
			effectDay = split_today[0]+"-"+nextmonth+"-01";
		}
		as.updateEff(effectDay);
		String uuid = UUID.randomUUID().toString().replaceAll("-", "");
		Integer isEffective = 1 ;
		try {
			// 插入修改记录
			as.insert_setStandardDay_Record(userName,mobile,standardDay,today,effectDay,uuid,isEffective);
			resp.setMsg("设置成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("设置失败,请重试");
		}
		
		return resp;
	}
	/**
	 * 查询达标天数
	 * 
	 * @param userName
	 * @return
	 */
	@RequestMapping(value = "GetDays",method = RequestMethod.POST)
	@ResponseBody
	public String getStandard(String year,String month){
		Map<String, Object> resultMap = new HashMap<>();
		String attenceMonth = year+"-"+month;
		Integer StandardDays = as.getStandardDay(attenceMonth);
		while (StandardDays == null) {
			//month = ((int)month - 1).toString();
			month = String.valueOf(Integer.parseInt(month) - 1);
			if(month.length() == 1){
				month = "0" + month;
			}
			if(month.equals("00")){
				year = String.valueOf(Integer.parseInt(year) - 1);
				attenceMonth = year+"-12";
				StandardDays = as.getStandardDay(attenceMonth);
			}else{
				attenceMonth = year+"-"+month;
				StandardDays = as.getStandardDay(attenceMonth);
			}
		}
		resultMap.put("msg", StandardDays);
		return JSON.toJSONString(resultMap);
	}
	
	
	
	/**
	 * 条件查询设置记录
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "DownWarning",method = RequestMethod.POST)
	@ResponseBody
	public String DownWarning(){		
		Map<String, Object> resultMap = new HashMap<>();	
		// 验证参数
	try{
		List<AttenceWaring> attenceWaring = as.QueryAttenceWaring();
		String title = "出勤预警";
		HSSFWorkbook wb = new HSSFWorkbook();
	    HSSFSheet sheet = wb.createSheet(title);
	    HSSFRow row = sheet.createRow(0);
	    HSSFCellStyle style = wb.createCellStyle();    
	    style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
	    HSSFCell cell = row.createCell((short) 0);
	    cell.setCellValue("序号");    
	    cell.setCellStyle(style);  
	       
	    cell = row.createCell((short) 1);    
	    cell.setCellValue("部门");    
	    cell.setCellStyle(style); 
	       
	    cell = row.createCell((short) 2);    
	    cell.setCellValue("护林员");    
	    cell.setCellStyle(style); 
	       
	    cell = row.createCell((short) 3);    
	    cell.setCellValue("电话");    
	    cell.setCellStyle(style);  
	       
	    cell = row.createCell((short) 4);    
	    cell.setCellValue("最近出勤日");    
	    cell.setCellStyle(style);
	    
	    int i = 0;
	    for(AttenceWaring DWaring : attenceWaring){
	    	row = sheet.createRow((int) i + 1);
	    	row.createCell((short) 0).setCellValue((double)(i+1));
	    	  row.createCell((short) 1).setCellValue(DWaring.getDepartmentVal());
	    	   row.createCell((short) 2).setCellValue(DWaring.getPersonName());
	    	   row.createCell((short) 3).setCellValue(DWaring.getMobile());
	    	   if(DWaring.getLastDay() != null){
	    		   row.createCell((short) 4).setCellValue(DWaring.getLastDay());
	    	   }else{
	    		  row.createCell((short) 4).setCellValue("从未出勤");
	    	   }	   
	    	   i = i+1;
	       }
	       try {
		    	  String path = this.getClass().getClassLoader().getResource("").getPath();         	
		          path = path.replace("ResourceMonitor/WEB-INF/classes/", "ResourceMonitor/excel/");              
		          FileOutputStream fout = new FileOutputStream(path+title+".xls");    
		          wb.write(fout);    
		          fout.close();  
				} catch (Exception e) {
					e.printStackTrace(); 
				}
		resultMap.put("title", title);
		resultMap.put("msg", "导出成功");
	 } catch (Exception e) {
		resultMap.put("msg", "导出失败");
	 }
	  return JSON.toJSONString(resultMap);
	}
	
	@RequestMapping(value="download",method = RequestMethod.POST)
	@ResponseBody
	public String exportExcel(String department,String personName,String year,String month,String projectType,String departmentName) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		// 验证参数
	 try{
		 String title = "";
			if(department == null || department.length() <= 0 || "全部".equals(department)){
				title = "额尔古纳林业局"+year+"年" +month+ "月考勤统计";
			}else{
				title = departmentName +year+"年" +month+ "月考勤统计";
			}
		 department = checkParam(department);
		 projectType = checkParam(projectType);
		 if (!"".equals(personName)) {
			personName = blur(personName);	
		 }else{
			personName = checkParam(personName);
		 }	
		String attenceMonth = year+"-"+month;
		List<AttenceStatic> listEvents = as.AttenceStatic(department,personName,attenceMonth,projectType);
		
			
	    HSSFWorkbook wb = new HSSFWorkbook();
	    HSSFSheet sheet = wb.createSheet(title);
	    HSSFRow row = sheet.createRow(0);
	    HSSFCellStyle style = wb.createCellStyle();
	    HSSFCellStyle style1 = wb.createCellStyle();
	    style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
	   HSSFFont font = wb.createFont();
	   font.setColor(HSSFColor.RED.index);
	   style1.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
	   style1.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
	   style1.setFont(font);
	    HSSFCell cell = row.createCell((short) 0);
	       cell.setCellValue("部门");    
	       cell.setCellStyle(style);  
	       
	       cell = row.createCell((short) 1);    
	       cell.setCellValue("工程类别");    
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 2);    
	       cell.setCellValue("姓名");    
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 3);    
	       cell.setCellValue("电话");    
	       cell.setCellStyle(style);  
	       
	       cell = row.createCell((short) 4);    
	       cell.setCellValue(1);    
	       cell.setCellStyle(style);
	       
	       cell = row.createCell((short) 5);    
	       cell.setCellValue(2);    
	       cell.setCellStyle(style);
	       
	       cell = row.createCell((short) 6);    
	       cell.setCellValue(3);    
	       cell.setCellStyle(style);  	             
	       cell = row.createCell((short) 7);    
	       cell.setCellValue(4);    
	       cell.setCellStyle(style);	       
	       cell = row.createCell((short) 8);    
	       cell.setCellValue(5);    
	       cell.setCellStyle(style);  	       
	       cell = row.createCell((short) 9);    
	       cell.setCellValue(6);    
	       cell.setCellStyle(style);  		
	       cell = row.createCell((short) 10);    
	       cell.setCellValue(7);    
	       cell.setCellStyle(style);  	       
	       cell = row.createCell((short) 11);    
	       cell.setCellValue(8);    
	       cell.setCellStyle(style);  	       
	       cell = row.createCell((short) 12);    
	       cell.setCellValue(9);    
	       cell.setCellStyle(style);  	       
	       cell = row.createCell((short) 13);    
	       cell.setCellValue(10);    
	       cell.setCellStyle(style);  	       
	       cell = row.createCell((short) 14);    
	       cell.setCellValue(11);    
	       cell.setCellStyle(style);  	       
	       cell = row.createCell((short) 15);    
	       cell.setCellValue(12);    
	       cell.setCellStyle(style);  	       
	       cell = row.createCell((short) 16);    
	       cell.setCellValue(13);    
	       cell.setCellStyle(style);  	       
	       cell = row.createCell((short) 17);    
	       cell.setCellValue(14);    
	       cell.setCellStyle(style);  	       
	       cell = row.createCell((short) 18);    
	       cell.setCellValue(15);    
	       cell.setCellStyle(style);         
	       cell = row.createCell((short) 19);    
	       cell.setCellValue(16);    
	       cell.setCellStyle(style);   
	       cell = row.createCell((short) 20);    
	       cell.setCellValue(17);    
	       cell.setCellStyle(style);  
	       cell = row.createCell((short) 21);    
	       cell.setCellValue(18);    
	       cell.setCellStyle(style);
	       cell = row.createCell((short) 22);    
	       cell.setCellValue(19);    
	       cell.setCellStyle(style); 
	       cell = row.createCell((short) 23);    
	       cell.setCellValue(20);    
	       cell.setCellStyle(style);
	       cell = row.createCell((short) 24);    
	       cell.setCellValue(21);    
	       cell.setCellStyle(style);
	       cell = row.createCell((short) 25);    
	       cell.setCellValue(22);    
	       cell.setCellStyle(style);
	       cell = row.createCell((short) 26);    
	       cell.setCellValue(23);    
	       cell.setCellStyle(style);
	       cell = row.createCell((short) 27);    
	       cell.setCellValue(24);    
	       cell.setCellStyle(style);
	       cell = row.createCell((short) 28);    
	       cell.setCellValue(25);    
	       cell.setCellStyle(style);
	       cell = row.createCell((short) 29);    
	       cell.setCellValue(26);    
	       cell.setCellStyle(style);
	       cell = row.createCell((short) 30);    
	       cell.setCellValue(27);    
	       cell.setCellStyle(style);
	       cell = row.createCell((short) 31);    
	       cell.setCellValue(28);    
	       cell.setCellStyle(style);
	       cell = row.createCell((short) 32);    
	       cell.setCellValue(29);    
	       cell.setCellStyle(style);
	       cell = row.createCell((short) 33);    
	       cell.setCellValue(30);    
	       cell.setCellStyle(style);
	       cell = row.createCell((short) 34);    
	       cell.setCellValue(31);    
	       cell.setCellStyle(style);
	       cell = row.createCell((short) 35);    
	       cell.setCellValue("达标天数");  
	       cell.setCellStyle(style);
	       cell = row.createCell((short) 36);    
	       cell.setCellValue("里程");   
	       cell.setCellStyle(style);
	       int i = 0;
	       for(AttenceStatic attenceStatic : listEvents){
	    	    Integer size = 31;
				Integer[] AA = new Integer[size];
				AA[0] = attenceStatic.getday_1();
				if(AA[0] == null) { AA[0] = 2 ;}
				AA[1] = attenceStatic.getday_2();
				if(AA[1] == null) { AA[1] = 2 ;}
				AA[2] = attenceStatic.getday_3();
				if(AA[2] == null) { AA[2] = 2 ;}
				AA[3] = attenceStatic.getday_4();
				if(AA[3] == null) { AA[3] = 2 ;}
				AA[4] = attenceStatic.getday_5();
				if(AA[4] == null) { AA[4] = 2 ;}
				AA[5] = attenceStatic.getday_6();
				if(AA[5] == null) { AA[5] = 2 ;}
				AA[6] = attenceStatic.getday_7();
				if(AA[6] == null) { AA[6] = 2 ;}
				AA[7] = attenceStatic.getday_8();
				if(AA[7] == null) { AA[7] = 2 ;}
				AA[8] = attenceStatic.getday_9();
				if(AA[8] == null) { AA[8] = 2 ;}
				AA[9] = attenceStatic.getday_10();
				if(AA[9] == null) { AA[9] = 2 ;}
				AA[10] = attenceStatic.getday_11();
				if(AA[10] == null) { AA[10] = 2 ;}
				AA[11] = attenceStatic.getday_12();
				if(AA[11] == null) { AA[11] = 2 ;}
				AA[12] = attenceStatic.getday_13();
				if(AA[12] == null) { AA[12] = 2 ;}
				AA[13] = attenceStatic.getday_14();
				if(AA[13] == null) { AA[13] = 2 ;}
				AA[14] = attenceStatic.getday_15();
				if(AA[14] == null) { AA[14] = 2 ;}
				AA[15] = attenceStatic.getday_16();
				if(AA[15] == null) { AA[15] = 2 ;}
				AA[16] = attenceStatic.getday_17();
				if(AA[16] == null) { AA[16] = 2 ;}
				AA[17] = attenceStatic.getday_18();
				if(AA[17] == null) { AA[17] = 2 ;}
				AA[18] = attenceStatic.getday_19();
				if(AA[18] == null) { AA[18] = 2 ;}
				AA[19] = attenceStatic.getday_20();
				if(AA[19] == null) { AA[19] = 2 ;}
				AA[20] = attenceStatic.getday_21();
				if(AA[20] == null) { AA[20] = 2 ;}
				AA[21] = attenceStatic.getday_22();
				if(AA[21] == null) { AA[21] = 2 ;}
				AA[22] = attenceStatic.getday_23();
				if(AA[22] == null) { AA[22] = 2 ;}
				AA[23] = attenceStatic.getday_24();
				if(AA[23] == null) { AA[23] = 2 ;}
				AA[24] = attenceStatic.getday_25();
				if(AA[24] == null) { AA[24] = 2 ;}
				AA[25] = attenceStatic.getday_26();
				if(AA[25] == null) { AA[25] = 2 ;}
				AA[26] = attenceStatic.getday_27();
				if(AA[26] == null) { AA[26] = 2 ;}
				AA[27] = attenceStatic.getday_28();
				if(AA[27] == null) { AA[27] = 2 ;}
				AA[28] = attenceStatic.getday_29();
				if(AA[28] == null) { AA[28] = 2 ;}
				AA[29] = attenceStatic.getday_30();
				if(AA[29] == null) { AA[29] = 2 ;}
				AA[30] = attenceStatic.getday_31();
				if(AA[30] == null) { AA[30] = 2 ;}
				
	    	   row = sheet.createRow((int) i + 1);
	    	   cell = row.createCell((short) 0);
	    	   cell.setCellValue(attenceStatic.getDepartmentName());
	    	   cell.setCellStyle(style);
	    	   cell = row.createCell((short) 1);
	    	   cell.setCellValue(attenceStatic.getProjectType());
	    	   cell.setCellStyle(style);
	    	   cell = row.createCell((short) 2);
	    	   cell.setCellValue(attenceStatic.getPersonName());
	    	   cell.setCellStyle(style);
	    	   cell = row.createCell((short) 3);
	    	   cell.setCellValue(attenceStatic.getPersonMobile());
	    	   cell.setCellStyle(style);
	    	   int count = 0;
	    	   for (int j = 0; j < size; j++) {
	    		   if(AA[j].equals(1)){
	    			   count = count + 1;
	    			   cell = row.createCell((short) j+4);
					   cell.setCellValue("√");
			    	   cell.setCellStyle(style);
	    		   }else if(AA[j].equals(0)){
	    			   cell = row.createCell((short) j+4);
	    			   cell.setCellValue("×");
	    	    	   cell.setCellStyle(style1);
	    		   }else{
	    			   cell = row.createCell((short) j+4);
	    			   cell.setCellValue("-");
	    	    	   cell.setCellStyle(style);
	    		   }
				}
	    	   cell = row.createCell((short) 35);
	    	   cell.setCellValue(count);
	    	   cell.setCellStyle(style);
	    	   cell = row.createCell((short) 36);
	    	   if(attenceStatic.getSumLength()==null) {
	    	       cell.setCellValue(0);  
	    	   }else {
	    	       cell.setCellValue(attenceStatic.getSumLength());
	    	   }
	    	  
	    	   cell.setCellStyle(style);
	    	   i = i+1;
	       }
	       try {
		    	  String path = this.getClass().getClassLoader().getResource("").getPath();         	
		          path = path.replace("ResourceMonitor/WEB-INF/classes/", "ResourceMonitor/excel/");              
		          FileOutputStream fout = new FileOutputStream(path+title+".xls");    
		          wb.write(fout);    
		          fout.close();  
				} catch (Exception e) {
					e.printStackTrace(); 
				}
		resultMap.put("title", title);
		resultMap.put("msg", "导出成功");
	 } catch (Exception e) {
		resultMap.put("msg", "导出失败");
	 }
	  return JSON.toJSONString(resultMap);
	}
	
	
	@RequestMapping(value="downloadDetail",method = RequestMethod.POST)
	@ResponseBody
	public String downloadDetail(String department,String personName,String year,String month,String projectType,String departmentName){		
		Map<String, Object> resultMap = new HashMap<>();
		// 验证参数
	try{
		String title = "";
		if(department == null || department.length() <= 0 || "全部".equals(department)){
			title = "额尔古纳林业局"+year+"年" +month+ "月出勤详情";
		}else{
			title = departmentName +year+"年" +month+ "月出勤详情";
		}
		department = checkParam(department);
		projectType = checkParam(projectType);
		if (!"".equals(personName)) {
			personName = blur(personName);
			
		}else{
			personName = checkParam(personName);
		}
		
		String attenceMonth = year+"-"+month;
		// 模糊查询条件
		attenceMonth = blur(attenceMonth);
		
		List<AttenceDetail> attenceDetail = as.QueryAttenceDetail(department,personName,attenceMonth,projectType);
	    HSSFWorkbook wb = new HSSFWorkbook();
	    HSSFSheet sheet = wb.createSheet(title);
	    HSSFRow row = sheet.createRow(0);
	    HSSFCellStyle style = wb.createCellStyle();
	    style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
	    HSSFCell cell = row.createCell((short) 0);
	  
	    
	       cell.setCellValue("部门");     
	       cell.setCellStyle(style);  
	       
	       cell = row.createCell((short) 1);    
	       cell.setCellValue("工程类别"); 
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 2);    
	       cell.setCellValue("姓名");   
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 3);    
	       cell.setCellValue("电话");    
	       cell.setCellStyle(style);  
	       
	       cell = row.createCell((short) 4);    
	       cell.setCellValue("责任区");    
	       cell.setCellStyle(style);
	       
	       cell = row.createCell((short) 5);    
	       cell.setCellValue("日期");    
	       cell.setCellStyle(style);
	       
	       cell = row.createCell((short) 6);    
	       cell.setCellValue("是否达标");    
	       cell.setCellStyle(style);  
	       
	       cell = row.createCell((short) 7);    
	       cell.setCellValue("里程");    
	       cell.setCellStyle(style);
	        	       
	       int i = 0;
	       for(AttenceDetail attenceD : attenceDetail){
	    	    
	    	   row = sheet.createRow((int) i + 1);
	    	   cell = row.createCell((short) 0);
	    	   cell.setCellValue(attenceD.getDepartmentName());
	    	   cell.setCellStyle(style);
	    	   cell = row.createCell((short) 1);
	    	   cell.setCellValue(attenceD.getProjectType());
	    	   cell.setCellStyle(style);
	    	   cell = row.createCell((short) 2);
	    	   cell.setCellValue(attenceD.getPersonName());
	    	   cell.setCellStyle(style);
	    	   cell = row.createCell((short) 3);
	    	   cell.setCellValue(attenceD.getMobile());
	    	   cell.setCellStyle(style);
	    	   cell = row.createCell((short) 4);
	    	   cell.setCellValue(attenceD.getRegionNameList());
	    	   cell.setCellStyle(style);
	    	  
	    	   cell = row.createCell((short) 5);
			   cell.setCellValue(attenceD.getPatrolDate());
			   cell.setCellStyle(style);
	    		
	    	   cell = row.createCell((short) 6);
	    	   if(attenceD.getQualified().equals("1")){
	    		   cell.setCellValue("是");
	    	   }else{
	    		   cell.setCellValue("否");
	    	   }
	    	   cell.setCellStyle(style);
	    		   
	    	   cell = row.createCell((short) 7);
	    	   cell.setCellValue(attenceD.getTrailLen());
	    	   cell.setCellStyle(style);
	    	   i = i+1;
	       }
	       try {
		    	  String path = this.getClass().getClassLoader().getResource("").getPath();         	
		          path = path.replace("ResourceMonitor/WEB-INF/classes/", "ResourceMonitor/excel/");              
		          FileOutputStream fout = new FileOutputStream(path+title+".xls");    
		          wb.write(fout);    
		          fout.close();  
				} catch (Exception e) {
					e.printStackTrace(); 
				}
		resultMap.put("title", title);
		resultMap.put("msg", "导出成功");
	 } catch (Exception e) {
		resultMap.put("msg", "导出失败");
	 }
	  return JSON.toJSONString(resultMap);
	}
	
	
	/**
	 * 校验参数
	 * 
	 * @param param
	 * @return
	 */
	public String checkParam(String param){		
		// 如果参数为空 则跳过该参数
		if (param == null || param.length()<=0 || "全部".equals(param)) {
			param = "%";
		}
		return param;	
	}
	/**
	 * 模糊查询参数过滤
	 * 
	 * @param param
	 * @return
	 */
	public String blur(String param){
		if (!"".equals(param)) {
			param = param + '%';
		}
		return param;
	}
	

}
