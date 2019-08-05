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

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.entity.Binghai;
import com.integration.entity.Chonghia;
import com.integration.entity.ShuHai;
import com.integration.entity.XingzhengQuhua;
import com.integration.entity.YouhaiZhiwu;
import com.integration.service.CodeManageService;
import com.integration.util.ExcelUtil;
//代码管理
@Controller
@RequestMapping("codemanage/")
public class CodeManageAction {
	@Autowired
	CodeManageService cms;
	//病害查询
	@RequestMapping(value = "queryBinghaiCode",method = RequestMethod.GET)
	@ResponseBody
	public Object queryBinghaiCode(Integer page,Integer limit,@RequestParam(defaultValue="")String name,@RequestParam(defaultValue="")String code){	
	        Map<String, Object> result = new HashMap<>();
                PageHelper.startPage(page, limit);
                List<Binghai> results = cms.queryCodeManageBinghai(name, code);
                PageInfo<Binghai> info = new PageInfo<>(results,limit);
                result.put("count", info.getTotal());
                result.put("data", results);
                result.put("code", 0);
                return result;
	}
        //病害添加
        @RequestMapping(value = "addBinghaiCode",method = RequestMethod.POST)
        @ResponseBody
        public Object addBinghaiCode(Binghai binghai){ 
                Map<String, Object> result = new HashMap<>();
                Integer code = cms.addCodeManageBinghai(binghai);
                result.put("code", code);
                return result;
        }	
	//病害导出
        @RequestMapping(value = "exportBinghaiCode",method = RequestMethod.POST)
        @ResponseBody
        public Object exportBinghaiCode(@RequestParam(defaultValue="")String name,@RequestParam(defaultValue="")String code){ 
            Map<String, Object> result = new HashMap<>();
            List<Binghai> results = cms.queryCodeManageBinghai(name,code);
            String title="病害代码表";
            String path = this.getClass().getClassLoader().getResource("").getPath();
            path = path.replace("pest/WEB-INF/classes/", "pest/excel/");
            List fields = this.getBinghaiFields();
            ExcelUtil.export(path, title,fields,results,true);
            result.put("title",title);
            return result;                
        }
	//病害删除
        @RequestMapping(value = "deleteBinghaiCode",method = RequestMethod.POST)
        @ResponseBody
        public Object deleteBinghaiCode(String ids){ 
                Map<String, Object> result = new HashMap<>();
                String [] idlist = ids.split(",");
                Integer count= cms.deleteCodeManageBinghai(idlist);
                result.put("code", count);
                return result;
        }  
 
        
        //虫害查询
        @RequestMapping(value = "queryChonghaiCode",method = RequestMethod.GET)
        @ResponseBody
        public Object queryChonghaiCode(Integer page,Integer limit,@RequestParam(defaultValue="")String name,@RequestParam(defaultValue="")String code){ 
                Map<String, Object> result = new HashMap<>();
                PageHelper.startPage(page, limit);
                List<Chonghia> results = cms.queryCodeManageChonghai(name, code);
                PageInfo<Chonghia> info = new PageInfo<>(results,limit);
                result.put("count", info.getTotal());
                result.put("data", results);
                result.put("code", 0);
                return result;
        }
        //虫害添加
        @RequestMapping(value = "addChonghaiCode",method = RequestMethod.POST)
        @ResponseBody
        public Object addChonghaiCode(Chonghia chonghia){ 
                Map<String, Object> result = new HashMap<>();
                Integer code = cms.addCodeManageChonghai(chonghia);
                result.put("code", code);
                return result;
        }       
        //虫害导出
        @RequestMapping(value = "exportChonghaiCode",method = RequestMethod.POST)
        @ResponseBody
        public Object exportChonghaiCode(@RequestParam(defaultValue="")String name,@RequestParam(defaultValue="")String code){ 
            Map<String, Object> result = new HashMap<>();
            List<Chonghia> results = cms.queryCodeManageChonghai(name, code);
            String title="虫害代码表";
            String path = this.getClass().getClassLoader().getResource("").getPath();
            path = path.replace("pest/WEB-INF/classes/", "pest/excel/");
            List fields = this.getChonghaiFields();
            ExcelUtil.export(path, title,fields,results,true);
            result.put("title",title);
            return result; 
        }
        //虫害删除
        @RequestMapping(value = "deleteChonghaiCode",method = RequestMethod.POST)
        @ResponseBody
        public Object deleteChonghaiCode(String ids){ 
                Map<String, Object> result = new HashMap<>();
                String [] idlist = ids.split(",");
                Integer count= cms.deleteCodeManageChonghai(idlist);
                result.put("code", count);
                return result;
        }
        
        //鼠害查询
        @RequestMapping(value = "queryShuhaiCode",method = RequestMethod.GET)
        @ResponseBody
        public Object queryShuhaiCode(Integer page,Integer limit,@RequestParam(defaultValue="")String name,@RequestParam(defaultValue="")String code){ 
                Map<String, Object> result = new HashMap<>();
                PageHelper.startPage(page, limit);
                List<ShuHai> results = cms.queryCodeManageShuhai(name, code);
                PageInfo<ShuHai> info = new PageInfo<>(results,limit);
                result.put("count", info.getTotal());
                result.put("data", results);
                result.put("code", 0);
                return result;
        }
        //鼠害添加
        @RequestMapping(value = "addShuhaiCode",method = RequestMethod.POST)
        @ResponseBody
        public Object addShuhaiCode(ShuHai shuhai){ 
                Map<String, Object> result = new HashMap<>();
                Integer code = cms.addCodeManageShuhai(shuhai);
                result.put("code", code);
                return result;
        }       
        //鼠害导出
        @RequestMapping(value = "exportShuhaiCode",method = RequestMethod.POST)
        @ResponseBody
        public Object exportShuhaiCode(@RequestParam(defaultValue="")String name,@RequestParam(defaultValue="")String code) { 
                Map<String, Object> result = new HashMap<>();
                List<ShuHai> results = cms.queryCodeManageShuhai(name, code);
                String title="鼠害代码表";
                String path = this.getClass().getClassLoader().getResource("").getPath();
                path = path.replace("pest/WEB-INF/classes/", "pest/excel/");
                List fields = this.getShuhaiFields();
                ExcelUtil.export(path, title,fields,results,true);
                result.put("title",title);
                return result;
        }
        //鼠害删除
        @RequestMapping(value = "deleteShuhaiCode",method = RequestMethod.POST)
        @ResponseBody
        public Object deleteShuhaiCode(String ids){ 
                Map<String, Object> result = new HashMap<>();
                String [] idlist = ids.split(",");
                Integer count= cms.deleteCodeManageShuhai(idlist);
                result.put("code", count);
                return result;
        }   
        
        //有害植物查询
        @RequestMapping(value = "queryYouhaizhiwuCode",method = RequestMethod.GET)
        @ResponseBody
        public Object queryYouhaizhiwuCode(Integer page,Integer limit,@RequestParam(defaultValue="")String name,@RequestParam(defaultValue="")String code){ 
                Map<String, Object> result = new HashMap<>();
                PageHelper.startPage(page, limit);
                List<YouhaiZhiwu> results = cms.queryCodeManageYouhaizhiwu(name, code);
                PageInfo<YouhaiZhiwu> info = new PageInfo<>(results,limit);
                result.put("count", info.getTotal());
                result.put("data", results);
                result.put("code", 0);
                return result;
        }
        //有害植物添加
        @RequestMapping(value = "addYouhaizhiwuCode",method = RequestMethod.POST)
        @ResponseBody
        public Object addYouhaizhiwuCode(YouhaiZhiwu youhaizhiwu){ 
                Map<String, Object> result = new HashMap<>();
                Integer code = cms.addCodeManageYouhaizhiwu(youhaizhiwu);
                result.put("code", code);
                return result;
        }       
        //有害植物导出
        @RequestMapping(value = "exportYouhaizhiwuCode",method = RequestMethod.POST)
        @ResponseBody
        public Object exportYouhaizhiwuCode(@RequestParam(defaultValue="")String name,@RequestParam(defaultValue="")String code){ 
            Map<String, Object> result = new HashMap<>();
            List<YouhaiZhiwu> results = cms.queryCodeManageYouhaizhiwu(name, code);
            String title="有害植物代码表";
            String path = this.getClass().getClassLoader().getResource("").getPath();
            path = path.replace("pest/WEB-INF/classes/", "pest/excel/");
            List fields = this.getYouhaizhiwuFields();
            ExcelUtil.export(path, title,fields,results,true);
            result.put("title",title);
            return result;    
        }
        //有害植物删除
        @RequestMapping(value = "deleteYouhaizhiwuCode",method = RequestMethod.POST)
        @ResponseBody
        public Object deleteYouhaizhiwuCode(String ids){ 
                Map<String, Object> result = new HashMap<>();
                String [] idlist = ids.split(",");
                Integer count= cms.deleteCodeManageYouhaizhiwu(idlist);
                result.put("code", count);
                return result;
        }     

        
        //行政区划查询
        @RequestMapping(value = "queryXingzhengquhuaCode",method = RequestMethod.GET)
        @ResponseBody
        public Object queryXingzhengquhuaCode(Integer page,Integer limit,@RequestParam(defaultValue="")String name,@RequestParam(defaultValue="")String code){ 
                Map<String, Object> result = new HashMap<>();
                PageHelper.startPage(page, limit);
                List<XingzhengQuhua> results = cms.queryCodeManageXingzhengquhua(name, code);
                PageInfo<XingzhengQuhua> info = new PageInfo<>(results,limit);
                result.put("count", info.getTotal());
                result.put("data", results);
                result.put("code", 0);
                return result;
        }
        //行政区划添加
        @RequestMapping(value = "addXingzhengquhuaCode",method = RequestMethod.POST)
        @ResponseBody
        public Object addXingzhengquhuaCode(XingzhengQuhua xingzhengquhua){ 
                Map<String, Object> result = new HashMap<>();
                Integer code = cms.addCodeManageXingzhengquhua(xingzhengquhua);
                result.put("code", code);
                return result;
        }       
        //行政区划导出
        @RequestMapping(value = "exportXingzhengquhuaCode",method = RequestMethod.POST)
        @ResponseBody
        public Object exportXingzhengquhuaCode(@RequestParam(defaultValue="")String name,@RequestParam(defaultValue="")String code){ 
                Map<String, Object> result = new HashMap<>();
                List<XingzhengQuhua> results = cms.queryCodeManageXingzhengquhua(name, code);
                String title="行政区划代码表";
                String path = this.getClass().getClassLoader().getResource("").getPath();
                path = path.replace("pest/WEB-INF/classes/", "pest/excel/");
                List fields = this.getXingzhengquhuaFields();
                ExcelUtil.export(path, title,fields,results,true);
                result.put("title",title);
                return result;  
        }
        //行政区划删除
        @RequestMapping(value = "deleteXingzhengquhuaCode",method = RequestMethod.POST)
        @ResponseBody
        public Object deleteXingzhengquhuaCode(String ids){ 
                Map<String, Object> result = new HashMap<>();
                String [] idlist = ids.split(",");
                Integer count= cms.deleteCodeManageXingzhengquhua(idlist);
                result.put("code", count);
                return result;
        }
        public List<Map<String, String>> getBinghaiFields(){
            List<Map<String, String>> fields = new ArrayList<>();
            Map<String,String> map = new HashMap<>();
            map.put("field","code");
            map.put("title","病害代码");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","name");
            map.put("title","病害名称");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","jiBie");
            map.put("title","病害级别");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","ladingM");
            map.put("title","拉丁名称");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","jiBie");
            map.put("title","病害级别");
            map = new HashMap<>();
            map.put("field","jzzwMc");
            map.put("title","树种名称");
            fields.add(map);
            return fields;
        }   
        public List<Map<String, String>> getChonghaiFields(){
            List<Map<String, String>> fields = new ArrayList<>();
            Map<String,String> map = new HashMap<>();
            map.put("field","code");
            map.put("title","虫害代码");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","name");
            map.put("title","虫害名称");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","jiBie");
            map.put("title","虫害级别");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","ladingM");
            map.put("title","拉丁名称");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","jiBie");
            map.put("title","病害级别");
            map = new HashMap<>();
            map.put("field","jzzwMc");
            map.put("title","树种名称");
            fields.add(map);
            return fields;
        }
        public List<Map<String, String>> getShuhaiFields(){
            List<Map<String, String>> fields = new ArrayList<>();
            Map<String,String> map = new HashMap<>();
            map.put("field","code");
            map.put("title","鼠害代码");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","name");
            map.put("title","鼠害名称");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","jiBie");
            map.put("title","鼠害级别");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","ladingM");
            map.put("title","拉丁名称");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","jiBie");
            map.put("title","病害级别");
            map = new HashMap<>();
            map.put("field","jzzwMc");
            map.put("title","树种名称");
            fields.add(map);
            return fields;
        }
        public List<Map<String, String>> getYouhaizhiwuFields(){
            List<Map<String, String>> fields = new ArrayList<>();
            Map<String,String> map = new HashMap<>();
            map.put("field","code");
            map.put("title","有害植物代码");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","name");
            map.put("title","有害植物名称");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","jiBie");
            map.put("title","有害植物级别");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","ladingM");
            map.put("title","拉丁名称");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","jiBie");
            map.put("title","病害级别");
            map = new HashMap<>();
            map.put("field","jzzwMc");
            map.put("title","树种名称");
            fields.add(map);
            return fields;
        }
        public List<Map<String, String>> getXingzhengquhuaFields(){
            List<Map<String, String>> fields = new ArrayList<>();
            Map<String,String> map = new HashMap<>();
            map.put("field","code");
            map.put("title","代码");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","name");
            map.put("title","名称");
            fields.add(map);
            map = new HashMap<>();
            map.put("field","jiBie");
            map.put("title","级别");
            fields.add(map);
            return fields;
        }
}
