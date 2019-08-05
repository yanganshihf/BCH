package com.integration.action;


import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.entity.AttenceStatic;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.PatrolLog;
import com.integration.entity.Patroler;
import com.integration.entity.SysUser;
import com.integration.service.OperationLogService;
import com.integration.service.PatrolLogService;
import com.integration.util.CookiesUtil;

import java.io.FileOutputStream;
import java.text.SimpleDateFormat;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.formula.functions.T;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

@Controller
@RequestMapping("PatrolLog/")
public class LogAction {
	
	@Autowired
	PatrolLogService pls;
	@Autowired
	OperationLogService os;
	/**
	 * 条件查询位置
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "queryLog",method = RequestMethod.POST)
	@ResponseBody
	public Object queryLog(Integer page,Integer rows,String department,String personName,String startTime,String endTime,String projectType){		
		JqgridPageResp<PatrolLog> resp = new JqgridPageResp<PatrolLog>();		
		// 验证参数
		department = checkParam(department);
		projectType = checkParam(projectType);
		if (!"".equals(personName)) {
			personName = blur(personName);			
		}else{
			personName = checkParam(personName);
		}
		if ("".equals(startTime)) {
			startTime = startTime+" 00:00:00";
		}
		if (!"".equals(endTime)) {
			endTime = endTime + " 23:59:59";
		}
		PageHelper.offsetPage((page-1)*rows, rows);
		List<PatrolLog> listEvents = pls.find_PatrlLog_List(department,personName,startTime,endTime,projectType);
		// 记录数
		int records = (int) new PageInfo<>(listEvents).getTotal();
		// 总页数
		int total = 0;
		if (records%rows == 0) {
			total = records/rows;
		}else {
			total = records/rows +1;
		}
		resp.setRecords(records);
		resp.setTotal(total);
		resp.setRows(listEvents);
		return resp;
	}
	
	/**
	 * 删除
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value="delLog",method = RequestMethod.POST)
	@ResponseBody
	public Object del(HttpServletRequest request,String id){	
		JqgridPageResp<PatrolLog> resp = new JqgridPageResp<PatrolLog>();
		try {
			// 插入修改记录
			pls.del(id);
		        Subject subject = SecurityUtils.getSubject();
		        SysUser user = (SysUser) subject.getPrincipal();
			String logUser = user.getUserName();	
			String logMobile = user.getMobile();
			String ModuleType = "上报信息";
			String OperationType = "删除";
			String OperationInfo = logUser + " 删除了  一条日志";
			String Logid = UUID.randomUUID().toString().replaceAll("-", "");
			Date now = new Date();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String logTime = simpleDateFormat.format(now);
			os.addInfo(Logid,ModuleType,OperationType,logUser,logMobile,logTime,OperationInfo);
			resp.setMsg("删除成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("删除失败");
		}
		return resp;
	}
	
	@RequestMapping(value="downLog",method = RequestMethod.POST)
	@ResponseBody
	public String exportExcel(String department,String personName,String startTime,String endTime,String projectType,String departmentName) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		// 验证参数
		String endTime1 = "";
		String title = "";
		if(department == null || department.length() <= 0 || "全部".equals(department)){
			title = "额尔古纳林业局日志列表"+"("+startTime+"-"+endTime+")";
		}else{
			title = departmentName + "日志列表" + "(" + startTime + "-" + endTime + ")";
		}
		department = checkParam(department);
		projectType = checkParam(projectType);
		if (!"".equals(personName)) {
			personName = blur(personName);			
		}else{
			personName = checkParam(personName);
		}
		if ("".equals(startTime)) {
			startTime = startTime+" 00:00:00";
		}
		if (!"".equals(endTime)) {
			endTime1 = endTime + " 23:59:59";
		}
		
		List<PatrolLog> listEvents = pls.find_PatrlLog_List(department,personName,startTime,endTime1,projectType);
		
		// 第一步，创建一个webbook，对应一个Excel文件    
	    HSSFWorkbook wb = new HSSFWorkbook();
	    // 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet    
	    HSSFSheet sheet = wb.createSheet(title);
	    // 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short    
	    // 第四步，创建单元格，并设置值表头 设置表头居中   
	    HSSFRow row = sheet.createRow(0);
	    HSSFCellStyle style = wb.createCellStyle();    
	    style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
		
	    HSSFCell cell = row.createCell((short) 0);    
	       cell.setCellValue("部门");     
	       cell.setCellStyle(style);  
	       
	       cell = row.createCell((short) 1);    
	       cell.setCellValue("工程类别");    
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 2);    
	       cell.setCellValue("人员");    
	       cell.setCellStyle(style);   
	       
	       cell = row.createCell((short) 3);    
	       cell.setCellValue("电话");    
	       cell.setCellStyle(style);  
	       
	       cell = row.createCell((short) 4);    
	       cell.setCellValue("日期");    
	       cell.setCellStyle(style);   
	       
	       cell = row.createCell((short) 5);    
	       cell.setCellValue("上传时间");    
	       cell.setCellStyle(style);  
	       
	       cell = row.createCell((short) 6);    
	       cell.setCellValue("天气");    
	       cell.setCellStyle(style);   
	       
	       cell = row.createCell((short) 7);    
	       cell.setCellValue("描述");    
	       cell.setCellStyle(style);
	       
	       
	       int i = 0;
	       for (PatrolLog patrolLog : listEvents) {
	    	   row = sheet.createRow((int) i + 1);
	    	   cell = row.createCell((short) 0);
			   cell.setCellValue(patrolLog.getDepartmentName());
		       cell.setCellStyle(style);
		       cell = row.createCell((short) 1);
			   cell.setCellValue(patrolLog.getProjectType());
		       cell.setCellStyle(style);
		       cell = row.createCell((short) 2);
			   cell.setCellValue(patrolLog.getPersonName());
		       cell.setCellStyle(style);
		       cell = row.createCell((short) 3);
			   cell.setCellValue(patrolLog.getMobile());
		       cell.setCellStyle(style);
		       cell = row.createCell((short) 4);
			   cell.setCellValue(patrolLog.getPatrolDate());
		       cell.setCellStyle(style);
		       cell = row.createCell((short) 5);
			   cell.setCellValue(patrolLog.getUploadTime());
		       cell.setCellStyle(style);
		       
		       cell = row.createCell((short) 6);
			   cell.setCellValue(patrolLog.getWeather());
		       cell.setCellStyle(style);
		       cell = row.createCell((short) 7);
			   cell.setCellValue(patrolLog.getLogText());
		       cell.setCellStyle(style);
	    	   i = i+1;
	       } 
	       try {
	    	  String path = this.getClass().getClassLoader().getResource("").getPath();         	
	          path = path.replace("ResourceMonitor/WEB-INF/classes/", "ResourceMonitor/excel/");              
	          FileOutputStream fout = new FileOutputStream(path+title+".xls");    
	          wb.write(fout);    
	          fout.close();  
	          resultMap.put("msg", "导出成功");
			} catch (Exception e) {
				resultMap.put("msg", "导出失败");
				e.printStackTrace(); 
			}
	    resultMap.put("title", title);
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
