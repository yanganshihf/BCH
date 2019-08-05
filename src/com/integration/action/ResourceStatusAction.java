package com.integration.action;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.integration.service.BinglibushuService;
import com.integration.service.ResourceStatusService;
import com.integration.util.ExcelUtil;
//资源现状
@Controller
@RequestMapping("resourceStatus/")
public class ResourceStatusAction {
	//最近事件查询
        @Autowired
        ResourceStatusService resourceStatusService;
        
	@RequestMapping(value = "queryBinglibushu",method = RequestMethod.GET)
	@ResponseBody
	public Object queryGuanjianzhibiaos(){	
	        return resourceStatusService.queryGuanjianzhibiaos();
	}
        @RequestMapping(value = "queryGuanjianzhibiaoHuiZong",method = RequestMethod.GET)
        @ResponseBody
        public Object queryGuanjianzhibiaoHuiZong(){     
                return resourceStatusService.queryGuanjianzhibiaoHuiZong();
        }
        //行政区查询小班导出
        @RequestMapping(value = "exportXingzhengExcel",method = RequestMethod.POST)
        @ResponseBody
        public Object exportBiaozhundiBinghaiDiaocha(String data,String title){ 
                Map<String, Object> result = new HashMap<>();
                String path = this.getClass().getClassLoader().getResource("").getPath();
                path = path.replace("ResourceMonitor/WEB-INF/classes/", "ResourceMonitor/excel/");
                List<Map<String, String>> fields = this.getFields();
                System.out.println(data.length());
                System.out.println(data.substring(data.length()-5));
                List<Map<String, String>> dataList = (List) JSONArray.parse(data);
                ExcelUtil.export(path,title,fields,dataList,true);
                result.put("title",title);
                return result;
        }
        public List<Map<String, String>> getFields(){
            List<Map<String, String>> fields = new ArrayList<>();
            Map<String,String> map = new HashMap<>();
            map.put("field","numbers");
            map.put("title","序号");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","linban");
            map.put("title","林班");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","linzhong");
            map.put("title","林种");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","poxiang");
            map.put("title","坡向");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","powei");
            map.put("title","坡位");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","podu");
            map.put("title","坡度");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","dilei");
            map.put("title","地类");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","mianji");
            map.put("title","面积");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","linchang");
            map.put("title","林场");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","tudzhong");
            map.put("title","土地种");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","youshishu");
            map.put("title","优势树");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","shuzhong");
            map.put("title","林种");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","baohudeng");
            map.put("title","保护等级");
            fields.add(map);
            return fields;
        }        
}
