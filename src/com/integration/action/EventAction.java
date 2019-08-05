package com.integration.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
import com.integration.entity.EventCount;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.PatrolEvent;
import com.integration.entity.PatrolEventFull;
import com.integration.entity.PatrolRescue;
import com.integration.entity.Patroler;
import com.integration.entity.EventStatistics;
import com.integration.entity.SysUser;
import com.integration.service.DepartmentService;
import com.integration.service.OperationLogService;
import com.integration.service.PatrolEventService;
import com.integration.util.CookiesUtil;

import java.io.FileOutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

@Controller
@RequestMapping("event/")
public class EventAction {
	@Autowired
	PatrolEventService pes;
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
	
	@RequestMapping(value = "queryEvent", method = RequestMethod.POST)
	@ResponseBody
	public Object queryEvent(HttpSession session,HttpServletRequest request, Integer page, Integer rows, String department,
			String personName, String startTime, String endTime, String readState,String projectType) {
		JqgridPageResp<Patroler> resp = new JqgridPageResp<Patroler>();
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
		
		// 获取当前的登录用户
		Subject subject = SecurityUtils.getSubject();
		SysUser user = (SysUser) subject.getPrincipal();
		String cookie_logingUser = user.getMobile();
		cookie_logingUser = "%" + cookie_logingUser + "%";

		PageHelper.offsetPage((page - 1) * rows, rows);
		List<PatrolEvent> listEvents = pes.findPatrolEvent(department, personName, startTime, endTime, readState,
				cookie_logingUser,projectType);
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
	@RequestMapping(value = "realtimeEvent", method = RequestMethod.POST)
	@ResponseBody
	public Object realtimeEvent(HttpSession session,HttpServletRequest request) {
		JqgridPageResp<Patroler> resp = new JqgridPageResp<Patroler>();
		Subject subject = SecurityUtils.getSubject();
		SysUser user = (SysUser) subject.getPrincipal();
		// 获取当前的登录用户
		String cookie_logingUser = user.getMobile();
		cookie_logingUser = "%" + cookie_logingUser + "%";
		
		Date nowDate = new Date();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String nowdayTime = dateFormat.format(nowDate);
		
		List<PatrolEvent> listEvents = pes.queryRealtimeEvent(cookie_logingUser,nowdayTime);
		
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
	@RequestMapping(value = "hasRealtimeEvent", method = RequestMethod.POST)
	@ResponseBody
	public Boolean hasRealtimeEvent(HttpSession session,HttpServletRequest request) {
                Subject subject = SecurityUtils.getSubject();
                SysUser user = (SysUser) subject.getPrincipal();
		// 获取当前的登录用户
	        String cookie_logingUser = user.getMobile();
		cookie_logingUser = "%" + cookie_logingUser + "%";
		
		Date nowDate = new Date();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String nowdayTime = dateFormat.format(nowDate);
		
		Boolean hasRealtimeEvent = pes.hasRealtimeEvent(cookie_logingUser,nowdayTime);
		
		
		return hasRealtimeEvent;
	}
	/**
	 * 查询坐标
	 * 
	 * @param mobile
	 * @param patrolDate
	 * @return
	 */
	@RequestMapping(value = "findEventCoor", method = RequestMethod.POST)
	@ResponseBody
	public Object findEventCoor(String id) {
		JqgridPageResp<PatrolEventFull> resp = new JqgridPageResp<PatrolEventFull>();
		List<PatrolEventFull> listEvents = pes.findEventCoor(id);
		resp.setRows(listEvents);
		return resp;
	}

	/**
	 * 查询一人一天的事件列表
	 * 
	 * @param mobile
	 * @param patrolDate
	 * @return
	 */
	@RequestMapping(value = "queryOnedayEvents", method = RequestMethod.POST)
	@ResponseBody
	public Object queryOnedayEvents(String mobile, String patrolDate) {
		JqgridPageResp<PatrolEventFull> resp = new JqgridPageResp<PatrolEventFull>();
		patrolDate = blur(patrolDate);
		List<PatrolEventFull> listEvents = pes.queryOnedayEvents(mobile, patrolDate);
		resp.setRows(listEvents);
		return resp;
	}

	/**
	 * 删除事件
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "delEvent", method = RequestMethod.POST)
	@ResponseBody
	public Object delEvent(HttpSession session,HttpServletRequest request,String id) {
		JqgridPageResp<PatrolEventFull> resp = new JqgridPageResp<PatrolEventFull>();
		pes.delEvent(id);
	        Subject subject = SecurityUtils.getSubject();
	        SysUser user = (SysUser) subject.getPrincipal();
	        String logUser = user.getUserName();
	        String logMobile = user.getMobile();
		String ModuleType = "上报信息";
		String OperationType = "删除";
		String OperationInfo = logUser + " 删除了  一条事件";
		String Logid = UUID.randomUUID().toString().replaceAll("-", "");
		Date now = new Date();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String logTime = simpleDateFormat.format(now);
		os.addInfo(Logid,ModuleType,OperationType,logUser,logMobile,logTime,OperationInfo);
		resp.setMsg("删除成功");
		return resp;
	}

	/**
	 * 回复事件
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "respEvent", method = RequestMethod.POST)
	@ResponseBody
	public Object respEvent(String id, String respSuggestion, String currentdate, String responsePeople) {
		JqgridPageResp<PatrolEventFull> resp = new JqgridPageResp<PatrolEventFull>();

		pes.updateEvent(id, respSuggestion, currentdate, responsePeople);
		resp.setMsg("回复成功");
		return resp;
	}

	/**
	 * 事件想详情
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "eventDetail", method = RequestMethod.GET)
	@ResponseBody
	@Transactional
	public Object eventDetail(HttpServletRequest request,String id) {
		JqgridPageResp<PatrolEventFull> resp = new JqgridPageResp<PatrolEventFull>();
		List<PatrolEventFull> listEvents = pes.findEventDetail(id);
		String departmentCode = listEvents.get(0).getDepartmentCode();
		List<Department> dep = ds.findDepByCode(departmentCode);
		listEvents.get(0).setDepartmentCode(dep.get(0).getDepartmentName());
		resp.setRows(listEvents);
	        Subject subject = SecurityUtils.getSubject();
	        SysUser user = (SysUser) subject.getPrincipal();
		// 标记事件为已读状态
		String value = user.getMobile();
		String readedPerson = listEvents.get(0).getReadedPersons();
		
		if(readedPerson == null){
			readedPerson = "";
		}
		if (readedPerson.indexOf(value) > -1) {
			value = readedPerson;
		} else {
			value = readedPerson + value + ";";
		}
		
		pes.markAsReaded(value,id);
		return resp;
	}
	
	@RequestMapping(value = "Changestatus", method = RequestMethod.POST)
	@ResponseBody
	@Transactional
	public Object SetstatusCode(String id,String statusCode) {
		JqgridPageResp<PatrolRescue> resp = new JqgridPageResp<PatrolRescue>();
		pes.setstatusCode(id,statusCode);
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
	public Object survey(String dep,String startTime,String endTime,String Type){		
		JqgridPageResp<EventStatistics> resp = new JqgridPageResp<EventStatistics>();		
		// 验证参数
		dep = checkParam(dep);
		
		if (!"".equals(startTime)) {
			startTime = startTime + " 00:00:00";
		}
		if (!"".equals(endTime)) {
			endTime = endTime + " 23:59:59";
		}
		List<EventCount> eventCount = pes.querySurvey(dep,startTime,endTime);
		EventStatistics eventStatistics = new EventStatistics();
		eventStatistics.setEventCount(eventCount);
		
		List<EventStatistics> Event = new ArrayList<EventStatistics>();
		Event.add(eventStatistics);
		resp.setRows(Event);
		
		return resp;
	}
	
	
	@RequestMapping(value = "downevent", method = RequestMethod.POST)
	@ResponseBody
	public String exportExcel(HttpServletRequest request, String department, String personName, String startTime,
			String endTime, String readState,String projectType,String departmentName) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		// 验证参数
		String endTime1 = "";
		try {
			String title = "";
			if(department == null || department.length() <= 0 || "全部".equals(department)){
				title = "额尔古纳林业局事件列表" + "(" + startTime + "-" + endTime + ")";
			}else{
				title = departmentName + "事件列表" + "(" + startTime + "-" + endTime + ")";
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
			// 获取当前的登录用户
			String cookie_logingUser=user.getMobile();
			cookie_logingUser = "%" + cookie_logingUser + "%";
			List<PatrolEvent> listEvents = pes.findPatrolEvent(department, personName, startTime, endTime1, readState,
					cookie_logingUser,projectType);
			
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
			cell.setCellValue("巡护人员");
			cell.setCellStyle(style);

			cell = row.createCell((short) 3);
			cell.setCellValue("电话");
			cell.setCellStyle(style);

			cell = row.createCell((short) 4);
			cell.setCellValue("时间");
			cell.setCellStyle(style);

			cell = row.createCell((short) 5);
			cell.setCellValue("事件描述");
			cell.setCellStyle(style);

			int i = 0;
			
			for (PatrolEvent patrolEvent : listEvents) {
				row = sheet.createRow((int) i + 1);
				cell = row.createCell((short) 0);
				cell.setCellValue(patrolEvent.getDepartmentName());
		    	cell.setCellStyle(style);
		    	cell = row.createCell((short) 1);
		    	cell.setCellValue(patrolEvent.getProjectType());
		    	cell.setCellStyle(style);
		    	cell = row.createCell((short) 2);
		    	cell.setCellValue(patrolEvent.getReportPeople());
		    	cell.setCellStyle(style);
		    	cell = row.createCell((short) 3);
		    	cell.setCellValue(patrolEvent.getMobile());
		    	cell.setCellStyle(style);
		    	cell = row.createCell((short) 4);
		    	cell.setCellValue(patrolEvent.getHappenTime());
		    	cell.setCellStyle(style);
		    	cell = row.createCell((short) 5);
		    	cell.setCellValue(patrolEvent.getEventText());
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
	public String blur(String param) {
		if (!"".equals(param)) {
			param = param + '%';
		}
		return param;
	}

}
