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
import com.integration.entity.Flagback;
import com.integration.service.FlagBackService;
//插旗回看
@Controller
@RequestMapping("flagBack/")
public class FlagBackAction {
	//最近事件查询
        @Autowired
        FlagBackService flagBackService;
        
	@RequestMapping(value = "queryFlagBack",method = RequestMethod.GET)
	@ResponseBody
	public Object queryFlagBack(Integer page,Integer limit,@RequestParam(defaultValue="")String name,@RequestParam(defaultValue="")String time){	
	        Map<String, Object> result = new HashMap<>();
                PageHelper.startPage(page, limit);
                List<Flagback> results = flagBackService.queryFlagBack();
                PageInfo<Flagback> info = new PageInfo<>(results,limit);
                result.put("count", info.getTotal());
                result.put("data", results);
                result.put("code", 0);
                return result;
	}
	@RequestMapping(value = "addFlagBack",method = RequestMethod.POST)
	@ResponseBody
	public Object addFlagBack(Flagback fb){    
	        Map<String, Object> result = new HashMap<>();
	        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
	        fb.setId(uuid);
	        Integer code = flagBackService.addFlagBack(fb);
	        result.put("code",code);
	        return result;
	}
}
