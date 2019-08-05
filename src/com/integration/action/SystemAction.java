package com.integration.action;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.SysUser;
import com.integration.entity.SysRole;
import com.integration.service.OperationLogService;
import com.integration.service.SystemService;
import com.integration.util.CookiesUtil;

@Controller
@RequestMapping("system/")
public class SystemAction {
	
	@Autowired
	SystemService ss;
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
	@RequestMapping(value = "querySysUsers",method = RequestMethod.POST)
	@ResponseBody
	public Object queryLog(Integer page,Integer rows,String department,String personName,String mobile,String role){		
		JqgridPageResp<SysUser> resp = new JqgridPageResp<SysUser>();		
		// 验证参数
		department = checkParam(department);
		
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
		if("99".equals(role)){
			role = "%";
		}
		PageHelper.offsetPage((page-1)*rows, rows);
		List<SysUser> listEvents = ss.find_SysUser_List(department,personName,mobile,role);
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
	 * 电话重复查询
	 * 
	 * @param mobile
	 * @return
	 */
	@RequestMapping(value="querymobile",method = RequestMethod.POST)
	@ResponseBody
	public Object queryMobile(String mobile){		
		JqgridPageResp<SysUser> resp = new JqgridPageResp<SysUser>();
		resp.setMsg("success");
		 if (!mobile.isEmpty()) {
			 SysUser sysuser = ss.findUserBymobile(mobile);
			 if(sysuser == null){
				 resp.setMsg("success");
			 }else{
				 resp.setMsg("fail");
			 }
		 }
		return resp;
	}
	

	/**
	 * ID查询密码
	 * 
	 * @param mobile
	 * @return
	 */
	@RequestMapping(value="queryPwd",method = RequestMethod.POST)
	@ResponseBody
	public Object queryPwdById(String id){		
		JqgridPageResp<SysUser> resp = new JqgridPageResp<SysUser>();
		//resp.setMsg("success");
		 if (!id.isEmpty()) {
			 SysUser sysuser = ss.findPwdByID(id);
			 if(sysuser == null){
				 resp.setMsg("");
			 }else{
				 resp.setMsg(sysuser.getPassword());
			 }
		 }
		return resp;
	}
	/**
	 * IDxiugai密码
	 * 
	 * @param mobile
	 * @return
	 */
	@RequestMapping(value="editPwdById",method = RequestMethod.POST)
	@ResponseBody
	public Object editPwdById(String id,String password){		
		JqgridPageResp<SysUser> resp = new JqgridPageResp<SysUser>();
		 try {
				// 插入修改记录
			 ss.editPwdById(id,password);
				resp.setMsg("success");
			} catch (Exception e) {
				// TODO: handle exception
				resp.setMsg("fail");
			}
			return resp;
	}
	/**
	 * 添加系统用户
	 * @param department
	 * @param mobile
	 * @param personName
	 * @param password
	 * @param role
	 * @param remark
	 * @return
	 */
	@RequestMapping(value="add",method = RequestMethod.POST)
	@ResponseBody
	public Object add(HttpServletRequest request,String password,String personName,String mobile,String remark,String department,String role){		
		JqgridPageResp<SysUser> resp = new JqgridPageResp<SysUser>();
		try {
			// 插入修改记录
			String uuid = UUID.randomUUID().toString().replaceAll("-", "");
			ss.insert_Sysuser(password,personName,mobile,remark,department,uuid,role);
	                Subject subject = SecurityUtils.getSubject();
	                SysUser user = (SysUser) subject.getPrincipal();			
			String logUser = user.getUserName();
			String logMobile = user.getMobile();
			String ModuleType = "系统管理";
			String OperationType = "新增";
			String OperationInfo = logUser + " 新增了 系统用户 " + personName;
			String Logid = UUID.randomUUID().toString().replaceAll("-", "");
			Date now = new Date();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String logTime = simpleDateFormat.format(now);
			os.addInfo(Logid,ModuleType,OperationType,logUser,logMobile,logTime,OperationInfo);
			resp.setMsg("success");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("fail");
		}
		
		return resp;
	}
	
	/**
	 * 修改系统用户
	 * @param department
	 * @param mobile
	 * @param personName
	 * @param password
	 * @param role
	 * @param remark
	 * @return
	 */
	@RequestMapping(value="edit",method = RequestMethod.POST)
	@ResponseBody
	public Object edit(HttpServletRequest request,String password,String personName,String mobile,String remarks,String department,String id,String role){		
		JqgridPageResp<SysUser> resp = new JqgridPageResp<SysUser>();
		try {
			// 插入修改记录
			ss.update_Sysuser(password,personName,mobile,remarks,department,id,role);
		        Subject subject = SecurityUtils.getSubject();
		        SysUser user = (SysUser) subject.getPrincipal();		
			String logUser = user.getUserName();
			String logMobile = user.getMobile();
			String ModuleType = "系统管理";
			String OperationType = "修改";
			String OperationInfo = logUser + " 修改了 系统用户 " + personName;
			String Logid = UUID.randomUUID().toString().replaceAll("-", "");
			Date now = new Date();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String logTime = simpleDateFormat.format(now);
			os.addInfo(Logid,ModuleType,OperationType,logUser,logMobile,logTime,OperationInfo);
			resp.setMsg("success");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("fail");
		}
		return resp;
	}
	/**
	 * 删除系统用户
	 * @param id
	 * @return
	 */
	@RequestMapping(value="del",method = RequestMethod.POST)
	@ResponseBody
	public Object del(HttpServletRequest request,String id,String personName){		
		JqgridPageResp<SysUser> resp = new JqgridPageResp<SysUser>();
		try {
			// 插入修改记录
			ss.del_Sysuser(id);
		        Subject subject = SecurityUtils.getSubject();
		        SysUser user = (SysUser) subject.getPrincipal();		
			String logUser = user.getUserName();	
			String logMobile = user.getMobile();
			String ModuleType = "系统管理";
			String OperationType = "删除";
			String OperationInfo = logUser + " 删除了 系统用户 " + personName;
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
	/**
	 * 查询系统角色
	 * @param id
	 * @return
	 */
	@RequestMapping(value="querySysRole",method = RequestMethod.POST)
	@ResponseBody
	public Object querySysUsers(Integer page,Integer rows){		
		JqgridPageResp<SysRole> resp = new JqgridPageResp<SysRole>();
		List<SysRole> sysRole = ss.queryRole();
		// 记录数
		int records = (int) new PageInfo<>(sysRole).getTotal();
		// 总页数
		int total = 0;
		if (records%rows == 0) {
			total = records/rows;
		}else {
			total = records/rows +1;
		}
		resp.setRecords(records);
		resp.setTotal(total);
		resp.setRows(sysRole);
		return resp;
	}
	
	@RequestMapping(value="delSysRole",method = RequestMethod.POST)
	@ResponseBody
	public Object delSysRole(String id){
		JqgridPageResp<SysRole> resp = new JqgridPageResp<SysRole>();
		try {
			// 插入修改记录
			ss.del_SysRole(id);
			resp.setMsg("删除成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("删除失败");
		}
		return resp;
	}
	/**
	 * 修改角色权限
	 * @param department
	 * @param mobile
	 * @param personName
	 * @param password
	 * @param role
	 * @param remark
	 * @return
	 */
	@RequestMapping(value="editSysRole",method = RequestMethod.POST)
	@ResponseBody
	public Object editSysRole(String id,String roleName,String menuArray){		
		JqgridPageResp<SysRole> resp = new JqgridPageResp<SysRole>();
		try {
			// 插入修改记录
			ss.editSysRole(id,roleName,menuArray);
			resp.setMsg("success");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("fail");
		}
		return resp;
	}
	
	/**
	 * 查询juese
	 * 
	 * @param mobile
	 * @return
	 */
	@RequestMapping(value="queryRole",method = RequestMethod.POST)
	@ResponseBody
	public Object queryRolename(){		
		JqgridPageResp<SysRole> resp = new JqgridPageResp<SysRole>();
		//resp.setMsg("success");
		List<SysRole> sysRole = ss.queryRole();
		resp.setRows(sysRole);
		return resp;
	}
	
	/**
	 * 添加角色
	 * @param roleName
	 * @return
	 */
	@RequestMapping(value="addSysRole",method = RequestMethod.POST)
	@ResponseBody 
	public Object addSysRole(String roleName){		
		JqgridPageResp<SysRole> resp = new JqgridPageResp<SysRole>();
		try {
			// 插入修改记录
		    Integer uuid = Integer.valueOf(ss.getMaxId()); 
			String id = Integer.valueOf(uuid+1).toString();
			
			//String uuid = UUID.randomUUID().toString().replaceAll("-", "");
			ss.addSysRole(roleName,id);
			resp.setMsg("success");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("fail");
		}
		
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
