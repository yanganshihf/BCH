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
import com.integration.entity.RouteReplay;
import com.integration.service.RouteRrplayService;

@Controller
@RequestMapping("realtime/")
public class TrailAction {
	
	@Autowired
	private RouteRrplayService locationCopyService;
	/**
	 * 查询全部位置
	 * 
	 * @return
	 */
	/*@RequestMapping(value = "listRegion",method = RequestMethod.POST)
	@ResponseBody
	public Object listLocation(){		
		JqgridPageResp<Patroler> resp = new JqgridPageResp<Patroler>();		
		List<RouteReplay> queryCurrentTrace = locationCopyService.QueryCurrentTrace();
		for (RouteReplay routeReplay : queryCurrentTrace) {
			routeReplay.setTime(routeReplay.getStartTime()+"到"+routeReplay.getEndTime());
		}
		resp.setRows(queryCurrentTrace);
		return resp;
	}	*/
	
	
	/**
	 * 查询单人每天记录数 
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "queryTrail",method = RequestMethod.POST)
	@ResponseBody
	public Object queryTrail(String patrolDate,String mobile){		
		JqgridPageResp<RouteReplay> resp = new JqgridPageResp<RouteReplay>();		
		// 验证参数
		List<RouteReplay> listTrail = locationCopyService.listTrail(patrolDate,mobile);
		resp.setRows(listTrail);
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
	@RequestMapping(value = "queryRegion",method = RequestMethod.POST)
	@ResponseBody
	public Object queryLocation(String department,String personName,String startTime,String endTime,String projectType){		
		JqgridPageResp<Patroler> resp = new JqgridPageResp<Patroler>();		
		// 验证参数
		department = checkParam(department);
		
		if (!"".equals(personName)) {
			personName = blur(personName);
			
		}else{
			personName = checkParam(personName);
		}
		projectType = checkParam(projectType);
		
		//PageHelper.offsetPage((page-1)*rows, rows);
		List<RouteReplay> queryCurrentTrace = locationCopyService.QueryCurrentTrace(department,personName,startTime,endTime,projectType);
		for (RouteReplay routeReplay : queryCurrentTrace) {
			routeReplay.setTime(routeReplay.getPatrolDate().substring(5, 10) + " " +routeReplay.getStartTime()+"-"+routeReplay.getEndTime());
		}
		
		// 记录数
		int records = (int) new PageInfo<>(queryCurrentTrace).getTotal();
		/*// 总页数
		int total = 0;
		if (records%rows == 0) {
			total = records/rows;
		}else {
			total = records/rows +1;
		}*/
		resp.setRecords(records);
		//resp.setTotal(total);
		resp.setRows(queryCurrentTrace);
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
