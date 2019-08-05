package com.integration.action;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.integration.service.BinglibushuService;
//兵力部署
@Controller
@RequestMapping("binglibushu/")
public class BinglibushuAction {
	//最近事件查询
        @Autowired
        BinglibushuService binglibushuService;
        
	@RequestMapping(value = "queryBinglibushu",method = RequestMethod.POST)
	@ResponseBody
	public Object queryBinglibushu(String cuntun){	
	        return binglibushuService.queryBinglibushu(cuntun);
	}
}
