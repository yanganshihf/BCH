package com.integration.action.videoManager;


import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.entity.Record;
import com.integration.entity.UavTrail;
import com.integration.server.RecordInterface;
import com.integration.service.RecordService;
//视频回放
@Controller
@RequestMapping("record/")
public class RecordAction {
        @Value("${webservice}")
        private String webservice;
	@Autowired
	RecordService rs;
	//标准地病害调查
	@RequestMapping(value = "queryRecord",method = RequestMethod.GET)
	@ResponseBody
	public Object queryRecord(Integer page,Integer limit,@RequestParam(defaultValue="")String name,@RequestParam(defaultValue="")String code,@RequestParam(defaultValue="")String time,@RequestParam(defaultValue="starttime")String field,@RequestParam(defaultValue="desc")String type){	
	        Map<String, Object> result = new HashMap<>();
                PageHelper.startPage(page, limit);
                List<Record> results = rs.queryRecord(name, code,time,field,type);
                PageInfo<Record> info = new PageInfo<>(results,limit);
                result.put("count", info.getTotal());
                result.put("data", results);
                result.put("code", 0);
                return result;
	}
        @RequestMapping(value = "deleteRecord",method = RequestMethod.POST)
        @ResponseBody
        public Object deleteRecord(String ids,String files) throws MalformedURLException{ 
                Map<String, Object> result = new HashMap<>();
                String [] idlist = ids.split(",");
                Integer count= rs.deleteRecord(idlist);
                URL url = new URL(webservice+"/VideoLive3/ws/record?wsdl");
                QName qname = new QName("http://server.integration.com/", "RecordInterfaceService");
                Service service = Service.create(url, qname);
                RecordInterface mobileCodeWSSoap = service.getPort(RecordInterface.class);
                mobileCodeWSSoap.deleteRecord(files);
                result.put("code", count);
                return result;
        }
        @RequestMapping(value = "queryTrailByCode",method = RequestMethod.POST)
        @ResponseBody
        public Object queryTrailByCode (String code,Long start,Long end){
            Map<String, Object> result = new HashMap<>();
            Date startDate = new Date(start);
            Date endDate = new Date(end);
            List<UavTrail> results = rs.queryTrailByCode(code, startDate, endDate);
            if(results.size()>0) {
                result.put("data", results.get(0).getTrailpoint());
                result.put("code", 0);  
            }else {
                result.put("code", 1);  
            }
            return result;
        }  
        @RequestMapping(value = "queryCharts",method = RequestMethod.POST)
        @ResponseBody
        public Object queryTrailByCode (String month){
            Map<String, Object> data = new HashMap<>();
            List<Object> codes = new ArrayList<>();
            List<Object> counts = new ArrayList<>();
            List<Map<String,Object>> results = rs.queryInfoByMonth(month);
            int sum=0;
            for(Map<String,Object> result:results) {
                Integer count = (Integer) result.get("count");
                sum+=count;
                counts.add(count);
                codes.add(result.get("code"));
            }
            data.put("counts", counts);  
            data.put("codes", codes); 
            data.put("sum", sum);
            return data;
        }
}
