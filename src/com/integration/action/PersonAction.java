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
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.entity.AttenceStatic;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.PatrolPerson;
import com.integration.entity.PatrolRegion;
import com.integration.entity.SysUser;
import com.integration.service.OperationLogService;
import com.integration.service.PersonService;
import com.integration.service.RegionService;
import com.integration.util.CookiesUtil;

import java.io.FileOutputStream;
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
@RequestMapping("person/")
public class PersonAction {
	
	@Autowired
	PersonService ps;
	@Autowired
	RegionService rs;
	@Autowired
	OperationLogService os;
	/**
	 * 冻结
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "doFreeze",method = RequestMethod.POST)
	@ResponseBody
	public Object doFreeze(HttpServletRequest request,String id,String personName){	
		
		JqgridPageResp<PatrolPerson> resp = new JqgridPageResp<PatrolPerson>();		
		// 验证参数
		try {
			String uuid = UUID.randomUUID().toString().replaceAll("-", "");
			ps.doFreeze(id,uuid);
			Date now = new Date();
			SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss" );
			String nowTime = sdf.format(now);
		        Subject subject = SecurityUtils.getSubject();
		        SysUser user = (SysUser) subject.getPrincipal();
			String logUser = user.getUserName();	
			String logMobile = user.getMobile();
			String ModuleType = "护林员管理";
			String OperationType = "冻结";
			String OperationInfo = logUser + " 冻结了 护林员 " + personName;
			String Logid = UUID.randomUUID().toString().replaceAll("-", "");
			os.addInfo(Logid,ModuleType,OperationType,logUser,logMobile,nowTime,OperationInfo);
			resp.setMsg("冻结成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("冻结失败");
		}
		
	
		return resp;
	}
	
	
	/**
	 * 解冻
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "cancleFreeze",method = RequestMethod.POST)
	@ResponseBody
	public Object cancleFreeze(HttpServletRequest request,String id,String personName){	
		
		JqgridPageResp<PatrolPerson> resp = new JqgridPageResp<PatrolPerson>();		
		
		// 验证参数
		try {
			Date now = new Date();
			SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss" );
			String nowTime = sdf.format(now);
			ps.cancleFreeze(nowTime,id);
		        Subject subject = SecurityUtils.getSubject();
		        SysUser user = (SysUser) subject.getPrincipal();
			String logUser = user.getUserName();	
			String logMobile = user.getMobile();
			String ModuleType = "护林员管理";
			String OperationType = "解冻";
			String OperationInfo = logUser + " 解冻了 护林员 " + personName;
			String Logid = UUID.randomUUID().toString().replaceAll("-", "");
			os.addInfo(Logid,ModuleType,OperationType,logUser,logMobile,nowTime,OperationInfo);
			resp.setMsg("解冻成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("解冻失败");
		}
		
		return resp;
	}
	
	/**
	 * 条件查询位置
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "queryPersons",method = RequestMethod.POST)
	@ResponseBody
	public Object queryPersons(	Integer page,Integer rows,String department,String personName,String mobile,String projectType){		
		JqgridPageResp<PatrolPerson> resp = new JqgridPageResp<PatrolPerson>();		
		// 验证参数
		if (department.equals("0")) {
			department = "";
		}
		department = checkParam(department);
		projectType = checkParam(projectType);
		if (!"".equals(personName)) {
			personName = blur(personName);			
		}else{
			personName = checkParam(personName);
		}
		if (!"".equals(mobile)) {
			mobile = blur(mobile);			
		}else{
			mobile = checkParam(mobile);
		}
		PageHelper.offsetPage((page-1)*rows, rows);
		List<PatrolPerson> listEvents = ps.find_PatrlLog_List(department,personName,mobile,projectType);
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
	 * 添加人员
	 * 
	 * @param personName
	 * @param personSex
	 * @param mobile
	 * @param employDate
	 * @param departmentVal
	 * @param authorized
	 * @param freezed
	 * @param remark
	 * @return
	 */
	@RequestMapping(value = "addNew",method = RequestMethod.POST)
	@ResponseBody
	public Object addNew(HttpServletRequest request,String identifyPhoto,String personName,Integer personSex,String mobile,String departmentVal,Integer authorized,Integer freezed,String remark,String nationality,Integer age,String birthplace,String idCode,String birthday,Integer educated,Integer healthy,String homeAddress,Integer medicare,Integer old_age,Integer poverty,String superiorTree,Double nationalForestArea,String nationalForestCode,Integer employState,String patrolPlace,String contractDateBegin,String contractDateEnd,Double regionForestArea,String regionForestCode,String projectType,String accountNum,String regionName,Double regionArea){		
		JqgridPageResp<PatrolPerson> resp = new JqgridPageResp<PatrolPerson>();	
		// 获取随机uuid作为id
		String uuid = UUID.randomUUID().toString().replaceAll("-", "");
		try {
		        if(ps.findPersonOnGradByIdCode(idCode).size()>0){
		            resp.setMsg("身份证号码已经存在!");   
		        }else if(!StringUtils.isEmpty(ps.findPersonBymobile(mobile))) {
		            resp.setMsg("电话号码已经存在!");  
		            
		        }else {
		                if(ps.findPersonByIdCode(idCode).size()>0) {
		                   ps.remove(idCode); 
		                }
        			ps.addNew(identifyPhoto,personName,personSex,mobile,departmentVal,authorized,freezed,remark,uuid,nationality,age,birthplace,idCode,birthday,educated,healthy,homeAddress,medicare,old_age,poverty,superiorTree,nationalForestArea,nationalForestCode,employState,patrolPlace,contractDateBegin,contractDateEnd,regionForestArea,regionForestCode,projectType,accountNum,regionName,regionArea);
        			Date now = new Date();
        			SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss" );
        			String nowTime = sdf.format(now);
        		        Subject subject = SecurityUtils.getSubject();
        		        SysUser user = (SysUser) subject.getPrincipal();
        			String logUser = user.getUserName();	
        			String logMobile = user.getMobile();
        			String ModuleType = "护林员管理";
        			String OperationType = "新增";
        			String OperationInfo = logUser + " 新增了 护林员 " + personName;
        			String Logid = UUID.randomUUID().toString().replaceAll("-", "");
        			os.addInfo(Logid,ModuleType,OperationType,logUser,logMobile,nowTime,OperationInfo);
        			resp.setMsg("添加成功");
        			if(authorized.equals(1)){
        				SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        				String today = simpleDateFormat.format(now);
        				Integer thisday = Integer.valueOf(today.substring(8));
        				Integer size = 31;
        			    // 定义数组
        				Integer[] dayList = new Integer[size];
        				for (Integer i = 0; i < size; i++) {
        			         //myList[i];
        					if( thisday < i+2 ){
        						dayList[i] = 0;
        					}else{
        						dayList[i] = null;
        					}
        				}
        				ps.addAttenceNew(personName,mobile,today,dayList[0],dayList[1],dayList[2],dayList[3],dayList[4],dayList[5],dayList[6],dayList[7],dayList[8],dayList[9],dayList[10],dayList[11],dayList[12],dayList[13],dayList[14],dayList[15],dayList[16],dayList[17],dayList[18],dayList[19],dayList[20],dayList[21],dayList[22],dayList[23],dayList[24],dayList[25],dayList[26],dayList[27],dayList[28],dayList[29],dayList[30],uuid,projectType,idCode);
        			}
		        }
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("添加失败,请重试");
		}
		
		return resp;
	}
	
	/**
	 * 修改人员
	 * 
	 * @param personName
	 * @param personSex
	 * @param mobile
	 * @param employDate
	 * @param departmentVal
	 * @param authorized
	 * @param freezed
	 * @param remark
	 * @return
	 */
	@RequestMapping(value = "edit",method = RequestMethod.POST)
	@ResponseBody
	public Object edit(HttpServletRequest request,String identifyPhoto,String personName,Integer personSex,String mobile,String departmentVal,Integer authorized,Integer freezed,String remark,String id,String nationality,Integer age,String birthplace,String idCode,String birthday,Integer educated,Integer healthy,String homeAddress,Integer medicare,Integer old_age,Integer poverty,String superiorTree,Double nationalForestArea,String nationalForestCode,Integer employState,String patrolPlace,String contractDateBegin,String contractDateEnd,Double regionForestArea,String regionForestCode,Integer unemployReason,String unEmployDate,String projectType,String accountNum,String regionName,Double regionArea,String oldPerson,String oldMobile,Integer oldauthorized,String oldDepartmentVal){		
		JqgridPageResp<PatrolPerson> resp = new JqgridPageResp<PatrolPerson>();	
		if(!(oldMobile.equals(mobile))&&!StringUtils.isEmpty(ps.findPersonBymobile(mobile))) {
                    resp.setMsg("电话号码已经存在!");  
        }else {
        		String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        		Date now = new Date();
        		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        		String today = simpleDateFormat.format(now);
        		Integer thisday = Integer.valueOf(today.substring(8));
        		try {
        			ps.edit(identifyPhoto,personName,personSex,mobile,departmentVal,authorized,freezed,remark,id,nationality,age,birthplace,idCode,birthday,educated,healthy,homeAddress,medicare,old_age,poverty,superiorTree,nationalForestArea,nationalForestCode,employState,patrolPlace,contractDateBegin,contractDateEnd,regionForestArea,regionForestCode,unemployReason,unEmployDate,projectType,accountNum,regionName,regionArea);
        			String uuidFreeze = UUID.randomUUID().toString().replaceAll("-", "");
                   
                    
        			//修改 不可能更换护林员
    				if(!departmentVal.equals(oldDepartmentVal)){
    					ps.doFreeze(id,uuidFreeze);
    					List<PatrolRegion> listRegions = rs.find_Region("%"+oldMobile+"%");
    					for(PatrolRegion listRegion:listRegions) {
    						//if(listRegion.getDepartme_1() == oldDepartmentVal){
    							 String[] MobileOldList = listRegion.getMobileNums().split(";");
    	                            String[] PersonOldList = listRegion.getPatrols().split(";");
    	                            String Rid = listRegion.getOBJECTID();
    	                            StringBuffer MobileList  = new StringBuffer();
    	                            StringBuffer PersonList  = new StringBuffer();
    	                            for (int i = 0; i < MobileOldList.length; i++) {
    	                                if(oldPerson.equals(PersonOldList[i]) && oldMobile.equals(MobileOldList[i])){
    	                                    PersonOldList[i] = "";
    	                                    MobileOldList[i] = "";
    	                                }else{
    	                                	PersonOldList[i] = PersonOldList[i] + ";";
    	                                	MobileOldList[i] = MobileOldList[i] + ";";
    	                                }
    	                                MobileList.append(MobileOldList[i]); 
    	                                PersonList.append(PersonOldList[i]);
    	                            }
    	                            String MObileList2 = MobileList.toString();
    	                            String PersonList2 = PersonList.toString();
    	                            rs.updateRegion(Rid, PersonList2, MObileList2);
    						//}
    					}
    				}
    					
    				if(!personName.equals(oldPerson) || !mobile.equals(oldMobile)){
    				    ps.doFreeze(id,uuidFreeze);
    					List<PatrolRegion> listRegions = rs.find_Region("%"+oldMobile+"%");
    					for(PatrolRegion listRegion:listRegions) {
                            String[] MobileOldList = listRegion.getMobileNums().split(";");
                            String[] PersonOldList = listRegion.getPatrols().split(";");
                            String Rid = listRegion.getOBJECTID();
                            StringBuffer MobileList  = new StringBuffer();
                            StringBuffer PersonList  = new StringBuffer();
                            for (int i = 0; i < MobileOldList.length; i++) {
                                if(oldPerson.equals(PersonOldList[i]) && oldMobile.equals(MobileOldList[i])){
                                    PersonOldList[i] = personName;
                                    MobileOldList[i] = mobile;
                                }
                                MobileList.append(MobileOldList[i] +";"); 
                                PersonList.append(PersonOldList[i] +";");
                            }
                            String MObileList2 = MobileList.toString();
                            String PersonList2 = PersonList.toString();
                            rs.updateRegion(Rid, PersonList2, MObileList2);
    					}
    				}
    					
    					
    					
    					
    					
    				
        			SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss" );
        			String nowTime = sdf.format(now);
        		        Subject subject = SecurityUtils.getSubject();
        		        SysUser user = (SysUser) subject.getPrincipal();
        			String logUser = user.getUserName();
        			String logMobile = user.getMobile();
        			String ModuleType = "护林员管理";
        			String OperationType = "修改";
        			String OperationInfo = logUser + " 修改了 护林员 " + personName;
        			String Logid = UUID.randomUUID().toString().replaceAll("-", "");
        			os.addInfo(Logid,ModuleType,OperationType,logUser,logMobile,nowTime,OperationInfo);
        			resp.setMsg("修改成功");
        		} catch (Exception e) {
        			// TODO: handle exception
        			resp.setMsg("修改失败,请重试");
        		}
                    }
		return resp;
	}
	
	/**
	 * 删除人员
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "Del",method = RequestMethod.POST)
	@ResponseBody
	public Object Del(HttpServletRequest request,String id,String oldMobile,String oldPerson,String idCode){		
		JqgridPageResp<PatrolPerson> resp = new JqgridPageResp<PatrolPerson>();	
		
		try {
			ps.Del(id);
			
			List<PatrolRegion> listRegions = rs.find_Region("%"+oldMobile+"%");
			for(PatrolRegion listRegion:listRegions) {
				//if(listRegion.getDepartme_1() == oldDepartmentVal){
					 String[] MobileOldList = listRegion.getMobileNums().split(";");
                        String[] PersonOldList = listRegion.getPatrols().split(";");
                        String Rid = listRegion.getOBJECTID();
                        StringBuffer MobileList  = new StringBuffer();
                        StringBuffer PersonList  = new StringBuffer();
                        for (int i = 0; i < MobileOldList.length; i++) {
                            if(oldPerson.equals(PersonOldList[i]) && oldMobile.equals(MobileOldList[i])){
                                PersonOldList[i] = "";
                                MobileOldList[i] = "";
                            }else{
                            	PersonOldList[i] = PersonOldList[i] + ";";
                            	MobileOldList[i] = MobileOldList[i] + ";";
                            }
                            MobileList.append(MobileOldList[i]); 
                            PersonList.append(PersonOldList[i]);
                        }
                        String MObileList2 = MobileList.toString();
                        String PersonList2 = PersonList.toString();
                        rs.updateRegion(Rid, PersonList2, MObileList2);
				//}
			}
			
			Date now = new Date();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
			String today = simpleDateFormat.format(now);
			Integer thisday = Integer.valueOf(today.substring(8));
			Integer size = 31;
			String patrolMonth = today.substring(0, 7);
			AttenceStatic List = ps.AttenceInfo(idCode, patrolMonth);
			if(!StringUtils.isEmpty(List)) {
		                 Integer[] oldList = new Integer[size];
		                        oldList[0] = List.getday_1();
		                        oldList[1] = List.getday_2();
		                        oldList[2] = List.getday_3();
		                        oldList[3] = List.getday_4();
		                        oldList[4] = List.getday_5();
		                        oldList[5] = List.getday_6();
		                        oldList[6] = List.getday_7();
		                        oldList[7] = List.getday_8();
		                        oldList[8] = List.getday_9();
		                        oldList[9] = List.getday_10();
		                        oldList[10] = List.getday_11();
		                        oldList[11] = List.getday_12();
		                        oldList[12] = List.getday_13();
		                        oldList[13] = List.getday_14();
		                        oldList[14] = List.getday_15();
		                        oldList[15] = List.getday_16();
		                        oldList[16] = List.getday_17();
		                        oldList[17] = List.getday_18();
		                        oldList[18] = List.getday_19();
		                        oldList[19] = List.getday_20();
		                        oldList[20] = List.getday_21();
		                        oldList[21] = List.getday_22();
		                        oldList[22] = List.getday_23();
		                        oldList[23] = List.getday_24();
		                        oldList[24] = List.getday_25();
		                        oldList[25] = List.getday_26();
		                        oldList[26] = List.getday_27();
		                        oldList[27] = List.getday_28();
		                        oldList[28] = List.getday_29();
		                        oldList[29] = List.getday_30();
		                        oldList[30] = List.getday_31();
		                        for (Integer i = 0; i < size; i++) {
		                                if( thisday < i+2 ){
		                                        oldList[i] = null;
		                                }
		                        }
		                        ps.editAttenceOld(oldPerson,oldMobile,patrolMonth,oldList[0],oldList[1],oldList[2],oldList[3],oldList[4],oldList[5],oldList[6],oldList[7],oldList[8],oldList[9],oldList[10],oldList[11],oldList[12],oldList[13],oldList[14],oldList[15],oldList[16],oldList[17],oldList[18],oldList[19],oldList[20],oldList[21],oldList[22],oldList[23],oldList[24],oldList[25],oldList[26],oldList[27],oldList[28],oldList[29],oldList[30]);
		                        
			}
			SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss" );
			String nowTime = sdf.format(now);
		        Subject subject = SecurityUtils.getSubject();
		        SysUser user = (SysUser) subject.getPrincipal();
			String logUser = user.getUserName();
			String logMobile = user.getMobile();
			String ModuleType = "护林员管理";
			String OperationType = "删除";
			String OperationInfo = logUser + " 删除了 护林员 " + oldPerson;
			String Logid = UUID.randomUUID().toString().replaceAll("-", "");
			os.addInfo(Logid,ModuleType,OperationType,logUser,logMobile,nowTime,OperationInfo);
			resp.setMsg("删除成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("删除失败,请重试");
		}
		
		return resp;
	}
	
	/**
	 * 电话重复查询
	 * 
	 * @param mobile
	 * @return
	 */
	@RequestMapping(value="querymobile",method = RequestMethod.POST)
	@ResponseBody
	public Object queryMobile(String mobile){		
		JqgridPageResp<PatrolPerson> resp = new JqgridPageResp<PatrolPerson>();
		resp.setMsg("success");
		 if (!mobile.isEmpty()) {
			 PatrolPerson patrolPerson = ps.findPersonBymobile(mobile);
			 if(patrolPerson == null){
				 resp.setMsg("success");
			 }else{
				 resp.setMsg("fail");
			 }
		 }
		return resp;
	}
	
	@RequestMapping(value="download",method = RequestMethod.POST)
	@ResponseBody
	public String exportExcel(String department,String personName,String mobile,String projectType,String departmentName) throws Exception {
		// 验证参数
			Map<String, Object> resultMap = new HashMap<>();	
			// 验证参数
		try{
			String title = "";
			if(department == null || department.length() <= 0 || "全部".equals(department)){
				title = "额尔古纳林业局人员列表";
			}else{
				title = departmentName + "人员列表";
			}
			if (department.equals("0")) {
				department = "";
			}
			department = checkParam(department);
			projectType = checkParam(projectType);
			if (!"".equals(personName)) {
				personName = blur(personName);			
			}else{
				personName = checkParam(personName);
			}
			if (!"".equals(mobile)) {
				mobile = blur(mobile);			
			}else{
				mobile = checkParam(mobile);
			}
		List<PatrolPerson> listEvents = ps.find_PatrlLog_List(department,personName,mobile,projectType);
		// 第一步，创建一个webbook，对应一个Excel文件    
	    HSSFWorkbook wb = new HSSFWorkbook();
	    // 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet    
	    HSSFSheet sheet = wb.createSheet(title);
	    // 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short    
	    // 第四步，创建单元格，并设置值表头 设置表头居中   
	    HSSFRow row = sheet.createRow(0);
	    HSSFCellStyle style = wb.createCellStyle();    
	    style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
		
	    HSSFCell  cell = row.createCell((short) 0);    
	       cell.setCellValue("部门");    
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 1);    
	       cell.setCellValue("工程类别");    
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 2);    
	       cell.setCellValue("姓名");    
	       cell.setCellStyle(style);
	       
	       cell = row.createCell((short) 3);    
	       cell.setCellValue("性别");    
	       cell.setCellStyle(style);
	       
	       cell = row.createCell((short) 4);    
	       cell.setCellValue("电话");    
	       cell.setCellStyle(style);   
	       
	       cell = row.createCell((short) 5);    
	       cell.setCellValue("民族");    
	       cell.setCellStyle(style);
	       
	       cell = row.createCell((short) 6);    
	       cell.setCellValue("年龄");    
	       cell.setCellStyle(style);
	       
	       cell = row.createCell((short) 7);    
	       cell.setCellValue("出生地");    
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 8);    
	       cell.setCellValue("身份证号");    
	       cell.setCellStyle(style);  
	       
	       cell = row.createCell((short) 9);    
	       cell.setCellValue("出生年月");    
	       cell.setCellStyle(style);   
	       
	       cell = row.createCell((short) 10);    
	       cell.setCellValue("教育情况");    
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 11);    
	       cell.setCellValue("健康状况");    
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 12);    
	       cell.setCellValue("家庭地址");    
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 13);    
	       cell.setCellValue("医疗保险");    
	       cell.setCellStyle(style);  
	       
	       cell = row.createCell((short) 14);    
	       cell.setCellValue("养老保险");    
	       cell.setCellStyle(style);   
	       
	       cell = row.createCell((short) 15);    
	       cell.setCellValue("是否建档立卡贫困户");    
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 16);
	       cell.setCellValue("管护地点");    
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 17);    
	       cell.setCellValue("优势树种");    
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 18);    
	       cell.setCellValue("国家级保护林面积");    
	       cell.setCellStyle(style);  
	       
	       cell = row.createCell((short) 19);    
	       cell.setCellValue("国家级保护林编号");    
	       cell.setCellStyle(style);   
	       
	       cell = row.createCell((short) 20);    
	       cell.setCellValue("地方级保护林面积");    
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 21);    
	       cell.setCellValue("地方级保护林编号");    
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 22);    
	       cell.setCellValue("授权状态");    
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 23);    
	       cell.setCellValue("冻结状态");    
	       cell.setCellStyle(style);
	       
	       cell = row.createCell((short) 24);    
	       cell.setCellValue("聘用状态");    
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 25);    
	       cell.setCellValue("合同起始日期");    
	       cell.setCellStyle(style);  
	       
	       cell = row.createCell((short) 26);    
	       cell.setCellValue("合同终止日期");    
	       cell.setCellStyle(style);   
	       
	       cell = row.createCell((short) 27);    
	       cell.setCellValue("解聘原因");    
	       cell.setCellStyle(style); 
	       
	       cell = row.createCell((short) 28);    
	       cell.setCellValue("解聘日期");    
	       cell.setCellStyle(style); 
	             
	       int i = 0;
	       for(PatrolPerson patrolPerson : listEvents){
	    	   row = sheet.createRow((int) i + 1);
	    	   row.createCell((short) 0).setCellValue(patrolPerson.getDepartmentName());
	    	   row.createCell((short) 1).setCellValue(patrolPerson.getProjectType());
	    	   row.createCell((short) 2).setCellValue(patrolPerson.getPersonName());
	    	   switch (patrolPerson.getPersonSex()) {
				case 1:
					row.createCell((short) 3).setCellValue("男");
					break;
				case 0:
					row.createCell((short) 3).setCellValue("女");
					break;
				default:
					break;
				}
	    	   /*row.createCell((short) 4).setCellValue(patrolPerson.getPersonSex());*/
	    	   row.createCell((short) 4).setCellValue(patrolPerson.getMobile());
	    	   row.createCell((short) 5).setCellValue(patrolPerson.getNationality());
	    	   if(patrolPerson.getAge() != null){
	    		   row.createCell((short) 6).setCellValue(patrolPerson.getAge()+""); 
	    	   }
	    	   /*row.createCell((short) 7).setCellValue(patrolPerson.getAge()+"");*/
	    	   row.createCell((short) 7).setCellValue(patrolPerson.getBirthplace());
	    	   row.createCell((short) 8).setCellValue(patrolPerson.getIdCode());
	    	   if(patrolPerson.getBirthday() != null){
	    		   if(!patrolPerson.getBirthday().equals("1900-01-01")){
	    			   row.createCell((short) 9).setCellValue(patrolPerson.getBirthday());
	    		   }
	    	   }
	    	   switch (patrolPerson.getEducated()) {
				case 1:
					row.createCell((short) 10).setCellValue("大学");
					break;
				case 2:
					row.createCell((short) 10).setCellValue("大专");
					break;
				case 3:
					row.createCell((short) 10).setCellValue("高职");
					break;
				case 4:
					row.createCell((short) 10).setCellValue("高中");
					break;
				case 5:
					row.createCell((short) 10).setCellValue("初中");
					break;
				case 6:
					row.createCell((short) 10).setCellValue("小学");
					break;
				default:
					row.createCell((short) 10).setCellValue("文盲");
					break;
				}  
	    	   switch (patrolPerson.getHealthy()) {
				case 1:
					row.createCell((short) 11).setCellValue("健康");
					break;
				case 2:
					row.createCell((short) 11).setCellValue("良好");
					break;
				default:
					row.createCell((short) 11).setCellValue("其他");
					break;
				}
	    	   row.createCell((short) 12).setCellValue(patrolPerson.getHomeAddress());
	    	   switch (patrolPerson.getMedicare()) {
				case 1:
					row.createCell((short) 13).setCellValue("是");
					break;
				case 0:
					row.createCell((short) 13).setCellValue("否");
					break;
				default:
					break;
				}
	    	   switch (patrolPerson.getOld_age()) {
				case 1:
					row.createCell((short) 14).setCellValue("是");
					break;
				case 0:
					row.createCell((short) 14).setCellValue("否");
					break;
				default:
					break;
				}
	    	   switch (patrolPerson.getPoverty()) {
				case 1:
					row.createCell((short) 15).setCellValue("是");
					break;
				case 0:
					row.createCell((short) 15).setCellValue("否");
					break;
				default:
					break;
				}
	    	   row.createCell((short) 16).setCellValue(patrolPerson.getPatrolPlace());
	    	   row.createCell((short) 17).setCellValue(patrolPerson.getSuperiorTree());
	    	   if(patrolPerson.getNationalForestArea() != null){
	    		   row.createCell((short) 18).setCellValue(patrolPerson.getNationalForestArea()+"");
	    	   }   
	    	   row.createCell((short) 19).setCellValue(patrolPerson.getNationalForestCode());
	    	   if(patrolPerson.getRegionForestArea() != null){
	    		   row.createCell((short) 20).setCellValue(patrolPerson.getRegionForestArea()+"");
	    	   }
	    	   row.createCell((short) 21).setCellValue(patrolPerson.getRegionForestCode());
	    	   switch (patrolPerson.getAuthorized()) {
				case 1:
					row.createCell((short) 22).setCellValue("是");
					break;
				case 0:
					row.createCell((short) 22).setCellValue("否");
					break;
				default:
					break;
				}
	    	   switch (patrolPerson.getFreezed()) {
				case 1:
					row.createCell((short) 23).setCellValue("是");
					break;
				case 0:
					row.createCell((short) 23).setCellValue("否");
					break;
				default:
					break;
				}
	    	   switch (patrolPerson.getEmployState()) {
				case 1:
					row.createCell((short) 24).setCellValue("选聘");
					break;
				case 2:
					row.createCell((short) 24).setCellValue("续聘");
					break;
				default:
					row.createCell((short) 24).setCellValue("解聘");
					break;
				}
	    	   if(patrolPerson.getContractDateBegin() != null){
	    		   if(!patrolPerson.getContractDateBegin().equals("1900-01-01")){
	    			   row.createCell((short) 25).setCellValue(patrolPerson.getContractDateBegin());
	    		   }
	    	   }
	    	   if(patrolPerson.getContractDateEnd() != null){
	    		   if(!patrolPerson.getContractDateEnd().equals("1900-01-01")){
	    			   row.createCell((short) 26).setCellValue(patrolPerson.getContractDateEnd());
	    		   }
	    	   }
	    	   switch (patrolPerson.getUnemployReason()==null?0:patrolPerson.getUnemployReason()) {
				case 1:
					row.createCell((short) 27).setCellValue("死亡");
					break;
				case 2:
					row.createCell((short) 27).setCellValue("已脱贫");
					break;
				case 3:
					row.createCell((short) 27).setCellValue("分户");
					break;
				case 4:
					row.createCell((short) 27).setCellValue("刑拘");
					break;
				case 5:
					row.createCell((short) 27).setCellValue("外出务工");
					break;
				case 6:
					row.createCell((short) 27).setCellValue("生病");
					break;
				case 7:
					row.createCell((short) 27).setCellValue("脱岗");
					break;
				case 8:
					row.createCell((short) 27).setCellValue("考核不合格");
					break;
				case 9:
					row.createCell((short) 27).setCellValue("自愿退出");
					break;
				case 10:
					row.createCell((short) 27).setCellValue("违反管理办法");
					break;
				default:
					row.createCell((short) 27).setCellValue("");
					break;
				}
	    	   if(patrolPerson.getunEmployDate() != null){
	    		   if(!patrolPerson.getunEmployDate().equals("2099-12-12") && !patrolPerson.getunEmployDate().equals("1900-01-01")){
	    			   row.createCell((short) 28).setCellValue(patrolPerson.getunEmployDate()+"");
	    		   } 
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
	
	
	/**
	 * 查询
	 * 
	 * @return
	 */
	@RequestMapping(value = "findList",method = RequestMethod.POST)
	@ResponseBody
	public Object findList(){		
		JqgridPageResp<PatrolPerson> resp = new JqgridPageResp<PatrolPerson>();		
		
		List<PatrolPerson> listEvents = ps.findList();
		Date now = new Date();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM");
		String toMonth = simpleDateFormat.format(now);
		String today = simpleDateFormat.format(now) + "-01";
		for(PatrolPerson patrolPerson : listEvents){
			AttenceStatic List = ps.AttenceInfo(patrolPerson.getIdCode(), toMonth);
			if(StringUtils.isEmpty(List)) {
				String uuid = UUID.randomUUID().toString().replaceAll("-", "");
				ps.addAttenceNew(patrolPerson.getPersonName(),patrolPerson.getMobile(),today,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,uuid,patrolPerson.getProjectType(),patrolPerson.getIdCode());
			}
		}
		//resp.setRows(listEvents);
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
			param = param + '%';
		}
		return param;
	}
	

}
