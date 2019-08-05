package com.integration.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.dao.ChengZaiMapper;
import com.integration.entity.ChengZai;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.XingzhengQuhua;
import com.integration.entity.YhswxcCzd;
import com.integration.service.ChengZaiService;
import com.integration.util.ParameUtil;

@Controller
@RequestMapping("chengzai")
public class ChengZaiAction {
	@Autowired
	private ChengZaiService chengServ;
	@Autowired
	private ChengZaiMapper chengMapper;
	
	
	@RequestMapping(value="selectAll",method=RequestMethod.POST)
	@ResponseBody
	public Object selectAll(Integer page,Integer rows) throws Exception{
		JqgridPageResp<YhswxcCzd> resp = new JqgridPageResp<YhswxcCzd>();
		try {
			PageHelper.offsetPage((page - 1) * rows, rows);
			//查询
			List<YhswxcCzd> list = chengServ.selectAll();
			 // 记录数
		       int records = (int) new PageInfo<>(list).getTotal();
		       // 总页数
		       int total = 0;
		       if (records % rows == 0) {
		           total = records / rows;
		       } else {
		           total = records / rows + 1;
		       }
		       resp.setRecords(records);
		       resp.setTotal(total);
		       resp.setRows(list);
		       resp.setMsg("查询成功");
		} catch (Exception e) {
			resp.setMsg("查询失败");
		}
		return resp;
	}
	
	@RequestMapping(value="selectTop",method=RequestMethod.POST)
	@ResponseBody
	public ChengZai selectTop() throws Exception{
		ChengZai cheng = new ChengZai();
		//查詢頂部
		List<XingzhengQuhua> selectTop = chengServ.selectTop();
		if(selectTop.isEmpty() || selectTop.size() <= 0) {
			return null;
		}
		cheng.setXingzheng(selectTop);
		return cheng;
	}
	
	@RequestMapping(value="selectWhere",method=RequestMethod.POST)
	@ResponseBody
	public Object selectWhere(Integer page,Integer rows,String shi,String xian,String zhen) throws Exception{
		if(shi.equals("请选择")) {
			shi.replace(shi, "");
		}
		if(xian.equals("请选择")) {
			xian.replace(xian, "");
		}
		if(zhen.equals("请选择")) {
			zhen.replace(zhen, "");
		}
		//验证参数
		shi = ParameUtil.checkParam(shi);
		xian = ParameUtil.checkParam(xian);
		zhen = ParameUtil.checkParam(zhen);
		JqgridPageResp<YhswxcCzd> resp = new JqgridPageResp<YhswxcCzd>();
		try {
			PageHelper.offsetPage((page - 1) * rows, rows);
			List<YhswxcCzd> list = chengMapper.selectWhere(shi,xian,zhen);
			 // 记录数
		       int records = (int) new PageInfo<>(list).getTotal();
		       // 总页数
		       int total = 0;
		       if (records % rows == 0) {
		           total = records / rows;
		       } else {
		           total = records / rows + 1;
		       }
		       resp.setRecords(records);
		       resp.setTotal(total);
		       resp.setRows(list);
			resp.setMsg("查询成功");
		} catch (Exception e) {
			
			resp.setMsg("查询失败");
		}
		return resp;
	}
	
	@RequestMapping(value="del",method=RequestMethod.POST)
	@ResponseBody
	public String del(String uuid_Czd) throws Exception{
		System.err.println(uuid_Czd);
		
		return null;
	}
}
