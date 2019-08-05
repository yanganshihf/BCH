package com.integration.action;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.Patroler;
import com.integration.service.LocationService;

@Controller
@RequestMapping("realtime/")
public class LocationAction {
	
	@Autowired
	LocationService ls;
	/**
	 * 查询全部位置
	 * 
	 * @return
	 */
	@RequestMapping(value = "listLocation",method = RequestMethod.POST)
	@ResponseBody
	public Object listLocation(Integer page,Integer rows){		
		JqgridPageResp<Patroler> resp = new JqgridPageResp<Patroler>();	
		PageHelper.offsetPage((page-1)*rows, rows);
		List<Patroler> listPatroler  = ls.listPatroler();		
		// 记录数
		int records = (int) new PageInfo<>(listPatroler).getTotal();
		// 总页数
		int total = 0;
		if (records%rows == 0) {
			total = records/rows;
		}else {
			total = records/rows +1;
		}
		resp.setRecords(records);
		resp.setTotal(total);
		resp.setRows(listPatroler);
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
	@RequestMapping(value = "queryLocation",method = RequestMethod.POST)
	@ResponseBody
	public Object queryLocation(String department,String mobile,String personName,String projectType){		
		JqgridPageResp<Patroler> resp = new JqgridPageResp<Patroler>();		
		// 验证参数
		department = checkParam(department);
		mobile = checkParam(mobile);
		personName = checkParam(personName);
		projectType = checkParam(projectType);
		
		//PageHelper.offsetPage((page-1)*rows, rows);
		
		List<Patroler> listPatroler  = ls.queryPatroler(department,mobile,personName,projectType);		
		// 记录数
		int records = (int) new PageInfo<>(listPatroler).getTotal();
		// 总页数
		/*int total = 0;
		if (records%rows == 0) {
			total = records/rows;
		}else {
			total = records/rows +1;
		}*/
		resp.setRecords(records);
		//resp.setTotal(total);
		resp.setRows(listPatroler);
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
}
