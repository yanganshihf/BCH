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
import com.integration.entity.FlightModel;
import com.integration.entity.FlightModelCenter;
import com.integration.service.FlightModelService;
//飞行模式
@Controller
@RequestMapping("flightModel/")
public class FlightModelAction {
	//飞行轨迹查询
        @Autowired
        FlightModelService flightModelService;
        
	@RequestMapping(value = "queryFlightModel",method = RequestMethod.GET)
	@ResponseBody
	public Object queryFlightModel(Integer page,Integer limit,@RequestParam(defaultValue="")String name){
	        Map<String, Object> result = new HashMap<>();
                PageHelper.startPage(page, limit);
                List<FlightModel> results = flightModelService.queryFlightModel(name);
                PageInfo<FlightModel> info = new PageInfo<>(results,limit);
                result.put("count", info.getTotal());
                result.put("data", results);
                result.put("code", 0);
                return result;
	}
	//添加飞行轨迹
	@RequestMapping(value = "addFlightModel",method = RequestMethod.POST)
	@ResponseBody
	public Object addFlightModel(FlightModel fm){    
	        Map<String, Object> result = new HashMap<>();
	        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
	        fm.setId(uuid);
	        Integer code = flightModelService.addFlightModel(fm);
	        result.put("code",code);
	        return result;
	}
	//删除飞行轨迹
        @RequestMapping(value = "deleteFlightModel",method = RequestMethod.POST)
        @ResponseBody
        public Object deleteFlightModel(String id){    
                Map<String, Object> result = new HashMap<>();
                Integer code = flightModelService.deleteFlightModel(id);
                result.put("code",code);
                return result;
        }
        //根据ID查询飞行轨迹
        @RequestMapping(value = "queryFlightModelById",method = RequestMethod.POST)
        @ResponseBody
        public Object queryFlightModelById(String id){    
                FlightModel fm = flightModelService.queryFlightModelById(id);
                return fm;
        }
        //编辑飞行轨迹
        @RequestMapping(value = "editFlightModel",method = RequestMethod.POST)
        @ResponseBody
        public Object editFlightModel(FlightModel fm){    
            Map<String, Object> result = new HashMap<>();
            Integer code = flightModelService.editFlightModel(fm);
            result.put("code",code);
            return result;
        }
        //环绕飞行-------------------------------
        @RequestMapping(value = "queryFlightModelCenter",method = RequestMethod.GET)
        @ResponseBody
        public Object queryFlightModelCenter(Integer page,Integer limit,@RequestParam(defaultValue="")String name,@RequestParam(defaultValue="")String time){
                Map<String, Object> result = new HashMap<>();
                PageHelper.startPage(page, limit);
                List<FlightModelCenter> results = flightModelService.queryFlightModelCenter(name,time);
                PageInfo<FlightModelCenter> info = new PageInfo<>(results,limit);
                result.put("count", info.getTotal());
                result.put("data", results);
                result.put("code", 0);
                return result;
        }
        //添加飞行轨迹
        @RequestMapping(value = "addFlightModelCenter",method = RequestMethod.POST)
        @ResponseBody
        public Object addFlightModelCenter(FlightModelCenter fm){    
                Map<String, Object> result = new HashMap<>();
                String uuid = UUID.randomUUID().toString().replaceAll("-", "");
                fm.setId(uuid);
                Integer code = flightModelService.addFlightModelCenter(fm);
                result.put("code",code);
                return result;
        }
        //删除飞行轨迹
        @RequestMapping(value = "deleteFlightModelCenter",method = RequestMethod.POST)
        @ResponseBody
        public Object deleteFlightModelCenter(String id){    
                Map<String, Object> result = new HashMap<>();
                Integer code = flightModelService.deleteFlightModelCenter(id);
                result.put("code",code);
                return result;
        }
        //根据ID查询飞行轨迹
        @RequestMapping(value = "queryFlightModelCenterById",method = RequestMethod.POST)
        @ResponseBody
        public Object queryFlightModelCenterById(String id){    
                FlightModelCenter fm = flightModelService.queryFlightModelCenterById(id);
                return fm;
        }
        //编辑飞行轨迹
        @RequestMapping(value = "editFlightModelCenter",method = RequestMethod.POST)
        @ResponseBody
        public Object editFlightModelCenter(FlightModelCenter fm){    
            Map<String, Object> result = new HashMap<>();
            Integer code = flightModelService.editFlightModelCenter(fm);
            result.put("code",code);
            return result;
        }
}
