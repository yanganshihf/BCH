package com.integration.action;

import java.io.FileOutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.entity.Department;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.PatrolRescue;
import com.integration.entity.PatrolRescueFullInfo;
import com.integration.entity.Patroler;
import com.integration.entity.SysUser;
import com.integration.service.DepartmentService;
import com.integration.service.OperationLogService;
import com.integration.service.SosService;
import com.integration.util.CookiesUtil;

@Controller
@RequestMapping("sos/")
public class SOSAction {

	@Autowired
	SosService ss;
	@Autowired
	DepartmentService ds;
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
	@RequestMapping(value = "querySOS", method = RequestMethod.POST)
	@ResponseBody
	public Object querySOS(HttpServletRequest request, Integer page, Integer rows, String department, String personName,
			String startTime, String endTime, String readState,String projectType) {
		JqgridPageResp<PatrolRescue> resp = new JqgridPageResp<PatrolRescue>();
		// 验证参数
		department = checkParam(department);
		projectType = checkParam(projectType);
		if (!"".equals(personName)) {
			personName = blur(personName);
		} else {
			personName = checkParam(personName);
		}
		if ("".equals(startTime)) {
			startTime = startTime + " 00:00:00";
		}
		if (!"".equals(endTime)) {
			endTime = endTime + " 23:59:59";
		}
		PageHelper.offsetPage((page - 1) * rows, rows);
                Subject subject = SecurityUtils.getSubject();
                SysUser user = (SysUser) subject.getPrincipal();
		String value = user.getMobile();

		value = "%" + value + "%";

		List<PatrolRescue> listEvents = ss.find_SOS_List(department, personName, startTime, endTime, readState, value,projectType);

		// 记录数
		int records = (int) new PageInfo<>(listEvents).getTotal();
		// 总页数
		int total = 0;
		if (records % rows == 0) {
			total = records / rows;
		} else {
			total = records / rows + 1;
		}
		resp.setRecords(records);
		resp.setTotal(total);
		resp.setRows(listEvents);
		return resp;
	}
	/**
	 * 实时事件查询
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	
	@RequestMapping(value = "realtimeSos", method = RequestMethod.POST)
	@ResponseBody
	public Object realtimeSos(HttpServletRequest request, Integer page, Integer rows) {
		JqgridPageResp<PatrolRescue> resp = new JqgridPageResp<PatrolRescue>();
		
		// 获取当前的登录用户
		//Cookie cookieByName = CookiesUtil.getCookieByName(request, "cookie_mobile");
		//String cookie_logingUser = cookieByName.getValue();
		//cookie_logingUser = "%" + cookie_logingUser + "%";
		
		Date nowDate = new Date();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String nowdayTime = dateFormat.format(nowDate);
		
		List<PatrolRescue> listEvents = ss.queryRealtimeSos(nowdayTime);
		
		resp.setRows(listEvents);
		return resp;
	}
	
	/**
	 * 实时事件查询
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "hasRealtimeSos", method = RequestMethod.POST)
	@ResponseBody
	public Boolean hasRealtimeSos(HttpServletRequest request) {
		
		// 获取当前的登录用户
		//Cookie cookieByName = CookiesUtil.getCookieByName(request, "cookie_mobile");
		//String cookie_logingUser = cookieByName.getValue();
		//cookie_logingUser = "%" + cookie_logingUser + "%";
		
		Date nowDate = new Date();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String nowdayTime = dateFormat.format(nowDate);
		
		//Boolean hasRealtimeSos = ss.hasRealtimeSos(cookie_logingUser,nowdayTime);
		Boolean hasRealtimeSos = ss.hasRealtimeSos(nowdayTime);
		return hasRealtimeSos;
	}
	/**
	 * 条件查询位置
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "sosDetail", method = RequestMethod.POST)
	@ResponseBody
	@Transactional
	public Object sosDetail(HttpServletRequest request, String id) {
		JqgridPageResp<PatrolRescueFullInfo> resp = new JqgridPageResp<PatrolRescueFullInfo>();

		List<PatrolRescueFullInfo> listEvents = ss.find_Detail_ByID(id);
		String departmentCode = listEvents.get(0).getDepartmentCode();
		List<Department> dep = ds.findDepByCode(departmentCode);
		listEvents.get(0).setDepartmentCode(dep.get(0).getDepartmentName());
		resp.setRows(listEvents);

		// 标记事件为已读状态
		//Cookie cookieByName = CookiesUtil.getCookieByName(request, "cookie_mobile");
		//String value = cookieByName.getValue();
		/*String readedPerson = listEvents.get(0).getReadedPersons();

		if (readedPerson.indexOf(value) > -1) {
			value = readedPerson;
		} else {
			
			value = readedPerson + value + ";";
		}*/
		//ss.markAsReaded(value, id);
		return resp;
	}
	@RequestMapping(value = "sosAccept", method = RequestMethod.POST)
	@ResponseBody
	@Transactional
	public Object sosAccept(String id,String value) {
		JqgridPageResp<PatrolRescue> resp = new JqgridPageResp<PatrolRescue>();
		String acceptor = ss.queryAcceptor(id);
		if(acceptor == "" ||acceptor == null){
			Date now = new Date();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String logTime = simpleDateFormat.format(now);
			ss.markAsReaded(value,logTime, id);
			resp.setMsg("success");
		}else{
			resp.setMsg(acceptor);
		}
		return resp;
	}
	

	@RequestMapping(value = "delSoS", method = RequestMethod.POST)
	@ResponseBody
	public Object delEvent(HttpServletRequest request,String id) {
		JqgridPageResp<Patroler> resp = new JqgridPageResp<Patroler>();
		ss.delSOS(id);
                Subject subject = SecurityUtils.getSubject();
                SysUser user = (SysUser) subject.getPrincipal();		
		String logUser = user.getUserName();	
		String logMobile = user.getMobile();
		String ModuleType = "上报信息";
		String OperationType = "删除";
		String OperationInfo = logUser + " 删除了  一条SOS消息";
		String Logid = UUID.randomUUID().toString().replaceAll("-", "");
		Date now = new Date();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String logTime = simpleDateFormat.format(now);
		os.addInfo(Logid,ModuleType,OperationType,logUser,logMobile,logTime,OperationInfo);
		resp.setMsg("删除成功");
		return resp;
	}

	@RequestMapping(value = "downSos", method = RequestMethod.POST)
	@ResponseBody
	public String exportExcel(HttpServletRequest request, String department, String personName, String startTime,
			String endTime, String readState,String projectType,String departmentName) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		// 验证参数
		String endTime1 = "";
		try {
			String title = "";
			if(department == null || department.length() <= 0 || "全部".equals(department)){
				title = "额尔古纳林业局SOS列表" + "(" + startTime + "-" + endTime + ")";
			}else{
				title = departmentName + "SOS列表" + "(" + startTime + "-" + endTime + ")";
			}
			department = checkParam(department);
			projectType = checkParam(projectType);
			if (!"".equals(personName)) {
				personName = blur(personName);
			} else {
				personName = checkParam(personName);
			}
			if ("".equals(startTime)) {
				startTime = startTime + " 00:00:00";
			}
			if (!"".equals(endTime)) {
				endTime1 = endTime + " 23:59:59";
			}
	                Subject subject = SecurityUtils.getSubject();
	                SysUser user = (SysUser) subject.getPrincipal();
			String value = user.getMobile();
			value = "%" + value + "%";
			List<PatrolRescue> listEvents = ss.find_SOS_List(department, personName, startTime, endTime1, readState,
					value,projectType);

			
			// 第一步，创建一个webbook，对应一个Excel文件
			HSSFWorkbook wb = new HSSFWorkbook();
			// 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
			HSSFSheet sheet = wb.createSheet(title);
			// 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short
			sheet.setColumnWidth(5, 15 * 256);
			sheet.setColumnWidth(6, 15 * 256);
			sheet.setColumnWidth(7, 35 * 256);
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
			cell.setCellValue("护林员");
			cell.setCellStyle(style);

			cell = row.createCell((short) 3);
			cell.setCellValue("电话");
			cell.setCellStyle(style);

			cell = row.createCell((short) 4);
			cell.setCellValue("时间");
			cell.setCellStyle(style);

			cell = row.createCell((short) 5);
			cell.setCellValue("经纬度");
			cell.setCellStyle(style);

			cell = row.createCell((short) 6);
			cell.setCellValue("XY坐标");
			cell.setCellStyle(style);
			
			int i = 0;
			for (PatrolRescue patrolRescue : listEvents) {
				row = sheet.createRow((int) i + 1);
				cell = row.createCell((short) 0);
				cell.setCellValue(patrolRescue.getDepartmentName());
		    	cell.setCellStyle(style);
		    	cell = row.createCell((short) 1);
		    	cell.setCellValue(patrolRescue.getProjectType());
		    	cell.setCellStyle(style);
		    	cell = row.createCell((short) 2);
		    	cell.setCellValue(patrolRescue.getPersonName());
		    	cell.setCellStyle(style);
		    	cell = row.createCell((short) 3);
		    	cell.setCellValue(patrolRescue.getMobile());
		    	cell.setCellStyle(style);
		    	cell = row.createCell((short) 4);
		    	cell.setCellValue(patrolRescue.getReportTime());
		    	cell.setCellStyle(style);
		    	cell = row.createCell((short) 5);
		    	cell.setCellValue(patrolRescue.getLatitude()+","+patrolRescue.getLongitude());
		    	cell.setCellStyle(style);
		    	cell = row.createCell((short) 6);
		    	cell.setCellValue(patrolRescue.getxCoor()+","+patrolRescue.getyCoor());
		    	cell.setCellStyle(style);
				i = i + 1;
			}
			try {
				String path = this.getClass().getClassLoader().getResource("").getPath();
				path = path.replace("ResourceMonitor/WEB-INF/classes/", "ResourceMonitor/excel/");
				FileOutputStream fout = new FileOutputStream(path + title + ".xls");
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
	public String checkParam(String param) {
		// 如果参数为空 则跳过该参数
		if (param == null || param.length() <= 0 || "全部".equals(param)) {
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
	public String blur(String param) {
		if (!"".equals(param)) {
			param = param + '%';
		}
		return param;
	}

}
