package com.integration.action;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.entity.RecentEvent;
import com.integration.service.RecentEventService;
//最近事件
@Controller
@RequestMapping("recentEvent/")
public class RecentEventAction {
	//最近事件查询
        @Autowired
        RecentEventService recentEventService;
        
	@RequestMapping(value = "queryEvent",method = RequestMethod.GET)
	@ResponseBody
	public Object queryRecord(Integer page,Integer limit,@RequestParam(defaultValue="")String department,@RequestParam(defaultValue="")String time){	
	        Map<String, Object> result = new HashMap<>();
                PageHelper.startPage(page, limit);
                List<RecentEvent> results = recentEventService.queryEvent(department,time);
                PageInfo<RecentEvent> info = new PageInfo<>(results,limit);
                result.put("count", info.getTotal());
                result.put("data", results);
                result.put("code", 0);
                return result;
	}
	@RequestMapping(value = "addEvent",method = RequestMethod.POST)
	@ResponseBody
	public Object addEvent(RecentEvent re){    
	        Map<String, Object> result = new HashMap<>();
	        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
	        re.setId(uuid);
	        Integer code = recentEventService.addEvent(re);
	        result.put("code",code);
	        return result;
	}
}
