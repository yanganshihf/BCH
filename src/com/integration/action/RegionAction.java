package com.integration.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
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

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.PatrolRegion;
import com.integration.entity.SysUser;
import com.integration.service.OperationLogService;
import com.integration.service.RegionService;
import com.integration.util.CookiesUtil;
import com.integration.util.UUIDUtile;

/**
 * 责任区
 * 
 * @author yanganshi
 * @time 2018-10-26 13:20:09
 */
@Controller
@RequestMapping("region/")
public class RegionAction {

	@Autowired
	RegionService rs;
	@Autowired
	OperationLogService os;
	
	@RequestMapping(value = "dianziweilan", method = RequestMethod.POST)
	@ResponseBody
	public Object dianziweilan(Integer jingjiefanwei) {
		// System.out.println(jingjiefanwei);
		String get32uuid = UUIDUtile.get32UUID();
		rs.setdianziweilan(get32uuid,jingjiefanwei);
		return "";
	}
	@RequestMapping(value = "zhuliugaojing", method = RequestMethod.POST)
	@ResponseBody
	public Object zhuliugaojing(Integer zhuliugaojing) {
		// System.out.println(jingjiefanwei);
		String get32uuid = UUIDUtile.get32UUID();
		rs.setzhuliugaojing(get32uuid,zhuliugaojing);
		return "";
	}
	
	
	/**
	 * 条件查询位置
	 * 
	 * @param department find_Region
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "queryRegion", method = RequestMethod.POST)
	@ResponseBody
	public Object queryLocation(String department, String personName, String regionNum, String regionName,String mobile, Integer page,
			Integer rows) {
		JqgridPageResp<PatrolRegion> resp = new JqgridPageResp<PatrolRegion>();
		// 验证参数
		department = checkParam(department);

		if (!"".equals(regionNum)) {
			regionNum = blur(regionNum);
		} else {
			regionNum = checkParam(regionNum);
		}
		if (!"".equals(regionName)) {
			regionName = blur(regionName);
		} else {
			regionName = checkParam(regionName);
		}
		PageHelper.offsetPage((page - 1) * rows, rows);
		List<PatrolRegion> listRegion = rs.find_Region_List(department, regionNum, regionName);

		// 记录数
		int records = (int) new PageInfo<>(listRegion).getTotal();
		// 总页数
		int total = 0;
		if (records % rows == 0) {
			total = records / rows;
		} else {
			total = records / rows + 1;
		}
		resp.setRecords(records);
		resp.setTotal(total);

		resp.setRows(listRegion);
		return resp;
	}

	/**
	 * 修改region
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "updateRegion", method = RequestMethod.POST)
	@ResponseBody
	public Object updateRegion(HttpServletRequest request,String id, String personSelected, String mobileSelected,String regionName) {
		JqgridPageResp<PatrolRegion> resp = new JqgridPageResp<PatrolRegion>();
		try {
			rs.updateRegion(id, personSelected, mobileSelected);
		        Subject subject = SecurityUtils.getSubject();
		        SysUser user = (SysUser) subject.getPrincipal();
			String logUser = user.getUserName();	
			String logMobile = user.getMobile();
			String ModuleType = "区域管理";
			String OperationType = "下发";
			String OperationInfo = logUser + " 下发了 责任区" + regionName;
			String Logid = UUID.randomUUID().toString().replaceAll("-", "");
			Date now = new Date();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String logTime = simpleDateFormat.format(now);
			os.addInfo(Logid,ModuleType,OperationType,logUser,logMobile,logTime,OperationInfo);
			resp.setMsg("下发成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("下发失败,请重试");
		}

		return resp;
	}

	
	/**
	 * 删除管护区
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "delRegion", method = RequestMethod.POST)
	@ResponseBody
	public Object delRegion(HttpServletRequest request,String id,String regionName) {
		JqgridPageResp<PatrolRegion> resp = new JqgridPageResp<PatrolRegion>();
		try {
			rs.delRegion(id);
		        Subject subject = SecurityUtils.getSubject();
		        SysUser user = (SysUser) subject.getPrincipal();
			String logUser = user.getUserName();	
			String logMobile = user.getMobile();
			String ModuleType = "区域管理";
			String OperationType = "删除";
			String OperationInfo = logUser + " 删除了 责任区" + regionName;
			String Logid = UUID.randomUUID().toString().replaceAll("-", "");
			Date now = new Date();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String logTime = simpleDateFormat.format(now);
			os.addInfo(Logid,ModuleType,OperationType,logUser,logMobile,logTime,OperationInfo);
			resp.setMsg("删除成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("删除失败,请重试");
		}

		return resp;
	}

	
	
	
	//
	@RequestMapping(value = "findNUM", method = RequestMethod.POST)
	@ResponseBody
	public Object findRegionNum(String departmentVal,String regionName,String regionNum) {
		JqgridPageResp<PatrolRegion> resp = new JqgridPageResp<PatrolRegion>();
		try {
			List<PatrolRegion> listRegion = rs.find_Region_List(departmentVal, regionNum, regionName);
			resp.setRows(listRegion);
		} catch (Exception e) {
			// TODO: handle exception
		}

		return resp;
	}
	
	
	@RequestMapping(value = "findById", method = RequestMethod.POST)
	@ResponseBody
	public Object findById(String id) {
		JqgridPageResp<PatrolRegion> resp = new JqgridPageResp<PatrolRegion>();
		try {
			List<PatrolRegion> listRegion = rs.findById(id);
			resp.setRows(listRegion);
		} catch (Exception e) {
			// TODO: handle exception
		}

		return resp;
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
