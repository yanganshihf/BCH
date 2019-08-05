package com.integration.action;

import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.OperationLog;
import com.integration.entity.VRList;
import com.integration.entity.VRPhoto;
import com.integration.service.OperationLogService;

@Controller
@RequestMapping("OperationLog/")
public class OperationLogAction {
	@Autowired
	OperationLogService os;
	
	/**
	 * 新增记录
	 */
	@RequestMapping(value="addInfo",method = RequestMethod.POST)
	@ResponseBody
	public Object add(String ModuleType,String OperationType,String logUser,String logMobile,String OperationInfo){
		
		JqgridPageResp<OperationLog> resp = new JqgridPageResp<OperationLog>();
		try {
			// 插入记录
		    //Integer uuid = Integer.valueOf(os.getMaxId()); 
			//String id = Integer.valueOf(uuid+1).toString();
			String id = UUID.randomUUID().toString().replaceAll("-", "");
			Date now = new Date();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String logTime = simpleDateFormat.format(now);
			os.addInfo(id,ModuleType,OperationType,logUser,logMobile,logTime,OperationInfo);
			resp.setMsg("success");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("fail");
		}
		return resp;
	}
	
	/**
	 * 查询记录
	 */
	@RequestMapping(value = "queryInfo",method = RequestMethod.POST)
	@ResponseBody
	public Object queryInfo(Integer page,Integer rows,String ModuleType,String OperationType,String logUser,String logMobile){		
		JqgridPageResp<OperationLog> resp = new JqgridPageResp<OperationLog>();	
		// 验证参数
		ModuleType = checkParam(ModuleType);
		OperationType = checkParam(OperationType);
		if (!"".equals(logUser)) {
			logUser = blur(logUser);			
		}else{
			logUser = checkParam(logUser);
		}
		if (!"".equals(logMobile)) {
			logMobile = blur(logMobile);			
		}else{
			logMobile = checkParam(logMobile);
		}
		PageHelper.offsetPage((page-1)*rows, rows);
		List<OperationLog> listEvents = os.queryInfo(ModuleType,OperationType,logUser,logMobile);
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
	 * 条件查询设置记录
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "DownInfo",method = RequestMethod.POST)
	@ResponseBody
	public String DownInfo(String ModuleType,String OperationType,String logUser,String logMobile,String ModuleTypeName){		
		Map<String, Object> resultMap = new HashMap<>();	
		// 验证参数
	try{
		String title = "";
		if(ModuleType == null || ModuleType.length() <= 0 || "全部".equals(ModuleType)){
			title = "操作日志";
		}else{
			title = ModuleTypeName + "操作日志";
		}
		ModuleType = checkParam(ModuleType);
		OperationType = checkParam(OperationType);
		if (!"".equals(logUser)) {
			logUser = blur(logUser);			
		}else{
			logUser = checkParam(logUser);
		}
		if (!"".equals(logMobile)) {
			logMobile = blur(logMobile);			
		}else{
			logMobile = checkParam(logMobile);
		}
		List<OperationLog> listEvents = os.queryInfo(ModuleType,OperationType,logUser,logMobile);
		HSSFWorkbook wb = new HSSFWorkbook();
	    HSSFSheet sheet = wb.createSheet(title);
	    HSSFRow row = sheet.createRow(0);
	    HSSFCellStyle style = wb.createCellStyle();    
	    style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
	    HSSFCell cell = row.createCell((short) 0);
	    cell.setCellValue("序号");    
	    cell.setCellStyle(style);  
	       
	    cell = row.createCell((short) 1);    
	    cell.setCellValue("操作人员");    
	    cell.setCellStyle(style); 
	       
	    cell = row.createCell((short) 2);    
	    cell.setCellValue("人员电话");    
	    cell.setCellStyle(style); 
	       
	    cell = row.createCell((short) 3);    
	    cell.setCellValue("操作类型");    
	    cell.setCellStyle(style);  
	       
	    cell = row.createCell((short) 4);    
	    cell.setCellValue("操作时间");    
	    cell.setCellStyle(style);
	    
	    cell = row.createCell((short) 5);    
	    cell.setCellValue("操作信息");    
	    cell.setCellStyle(style);
	    
	    int i = 0;
	    for(OperationLog LogInfo : listEvents){
	    	row = sheet.createRow((int) i + 1);
	    	row.createCell((short) 0).setCellValue((double)(i+1));
	    	  row.createCell((short) 1).setCellValue(LogInfo.getlogUser());
	    	   row.createCell((short) 2).setCellValue(LogInfo.getlogMobile());
	    	   row.createCell((short) 3).setCellValue(LogInfo.getModuleType());
	    	   row.createCell((short) 4).setCellValue(LogInfo.getlogTime());
	    	   row.createCell((short) 5).setCellValue(LogInfo.getOperationInfo());
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
	
	@RequestMapping(value="queryphoto",method = RequestMethod.POST)
	@ResponseBody
	public Object queryphoto(String id){		
		JqgridPageResp<VRPhoto> resp = new JqgridPageResp<VRPhoto>();
		//resp.setMsg("success");
		List<VRPhoto> photoList = os.findList(id);
		resp.setRows(photoList);
		return resp;
	}
	
	@RequestMapping(value="photoList",method = RequestMethod.POST)
	@ResponseBody
	public Object photoList(String name){		
		JqgridPageResp<VRList> resp = new JqgridPageResp<VRList>();
		if (!"".equals(name)) {
			name = blur(name);			
		}else{
			name = checkParam(name);
		}
		//resp.setMsg("success");
		List<VRList> photoList = os.findAllList(name);
		resp.setRows(photoList);
		return resp;
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
			param = '%' +param + '%';
		}
		return param;
	}
	
	
}

