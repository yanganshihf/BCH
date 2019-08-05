package com.integration.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.integration.dao.DataLibraryDAO;
import com.integration.entity.Binghai;
import com.integration.entity.Bingji;
import com.integration.entity.Chonghai;
import com.integration.entity.Department;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.ShugShmj;
import com.integration.entity.WeihaiBw;
import com.integration.entity.WeihaiCd;
import com.integration.entity.XingzhengQuhua;
import com.integration.entity.YhswLb;

/**
  *  数据字典
 * 
 * @author Administrator
 *
 */
@Controller
@RequestMapping("datalib/")
public class DataLibrary {
	@Autowired
	DataLibraryDAO pd;
	
	/**
	  * 危害部位
	 * 
	 * @param uuid
	 * @return
	 */
	@RequestMapping(value = "weihai_bw", method = RequestMethod.POST)
	@ResponseBody
	public Object weihai_wb() {
		JqgridPageResp<WeihaiBw> resp = new JqgridPageResp<WeihaiBw>();
		// 验证参数
		try {
			List<WeihaiBw> rows = pd.weihai_wb();
			resp.setRows(rows);
			resp.setMsg("查询成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("查询失败");
		}
		return resp;
	}
	
	/**
	  * 危害程度
	 * 
	 * @param uuid
	 * @return
	 */
	@RequestMapping(value = "weihai_cd", method = RequestMethod.POST)
	@ResponseBody
	public Object weihai_cd() {
		JqgridPageResp<WeihaiCd> resp = new JqgridPageResp<WeihaiCd>();
		// 验证参数
		try {
			List<WeihaiCd> rows = pd.weihai_cd();
			resp.setRows(rows);
			resp.setMsg("查询成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("查询失败");
		}
		return resp;
	}
	
	
	/**
	  * 行政区划
	 * 
	 * @param uuid
	 * @return
	 */
	@RequestMapping(value = "department", method = RequestMethod.POST)
	@ResponseBody
	public Object department() {
		JqgridPageResp<Department> resp = new JqgridPageResp<Department>();
		// 验证参数
		try {
			List<Department> listDepartment = pd.department();
			// 单位字符串
	          String departmentStr = "";
	          // 拼接单位字符串
	          for (Department department : listDepartment) {
	                  departmentStr =departmentStr + department.getDepartmentCode()+"-"+department.getDepartmentName()+"&";
	          }
			
			resp.setMsg(departmentStr);
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("查询失败");
		}
		return resp;
	}
	/**
	  * 行政区划
	 * 
	 * @param uuid
	 * @return
	 */
	@RequestMapping(value = "xingzhengquhua", method = RequestMethod.POST)
	@ResponseBody
	public Object xingzhengquhua() {
		JqgridPageResp<XingzhengQuhua> resp = new JqgridPageResp<XingzhengQuhua>();
		// 验证参数
		try {
			List<XingzhengQuhua> rows = pd.xingzhengquhua();
			resp.setRows(rows);
			resp.setMsg("查询成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("查询失败");
		}
		return resp;
	}
	
	/**
	  * 有害生物类别
	 * 
	 * @return
	 */
	@RequestMapping(value = "yhsw_lb", method = RequestMethod.POST)
	@ResponseBody
	public Object yhsw_lb() {
		JqgridPageResp<YhswLb> resp = new JqgridPageResp<YhswLb>();
		// 验证参数
		try {
			List<YhswLb> rows = pd.yhsw_lb();
			resp.setRows(rows);
			resp.setMsg("查询成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("查询失败");
		}
		return resp;
	}
	
	/**
	 * 寄主生物类型
	 * 
	 * @return
	 */
	@RequestMapping(value = "jzzw_lx", method = RequestMethod.POST)
	@ResponseBody
	public Object jzzw_lx() {
		JqgridPageResp<YhswLb> resp = new JqgridPageResp<YhswLb>();
		// 验证参数
		try {
			List<YhswLb> rows = pd.jzzw_lx();
			resp.setRows(rows);
			resp.setMsg("查询成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("查询失败");
		}
		return resp;
	}
	
	/**
	  * 昆虫名称
	 * 
	 * @return
	 */
	@RequestMapping(value = "chonghai", method = RequestMethod.POST)
	@ResponseBody
	public Object chonghai() {
		JqgridPageResp<Chonghai> resp = new JqgridPageResp<Chonghai>();
		// 验证参数
		try {
			List<Chonghai> rows = pd.chonghai();
			resp.setRows(rows);
			resp.setMsg("查询成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("查询失败");
		}
		return resp;
	}
	
	/**
	  * 虫态或危害期
	 * 
	 * @return
	 */
	@RequestMapping(value = "chongtai", method = RequestMethod.POST)
	@ResponseBody
	public Object chongtai() {
		JqgridPageResp<Chonghai> resp = new JqgridPageResp<Chonghai>();
		// 验证参数
		try {
			List<Chonghai> rows = pd.chongtai();
			resp.setRows(rows);
			resp.setMsg("查询成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("查询失败");
		}
		return resp;
	}
	/**
	  *  树冠受害面积
	  *  
	 * @return
	 */
	@RequestMapping(value = "shug_shmj", method = RequestMethod.POST)
	@ResponseBody
	public Object shug_shmj() {
		JqgridPageResp<ShugShmj> resp = new JqgridPageResp<ShugShmj>();
		// 验证参数
		try {
			List<ShugShmj> rows = pd.shug_shmj();
			resp.setRows(rows);
			resp.setMsg("查询成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("查询失败");
		}
		return resp;
	}
	
	/**
	  * 病害
	 * 
	 * @return
	 */
	@RequestMapping(value = "binghai", method = RequestMethod.POST)
	@ResponseBody
	public Object binghai() {
		JqgridPageResp<Binghai> resp = new JqgridPageResp<Binghai>();
		// 验证参数
		try {
			List<Binghai> rows = pd.binghai();
			resp.setRows(rows);
			resp.setMsg("查询成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("查询失败");
		}
		return resp;
	}
	
	/**
	  * 病级
	 * 
	 * @return
	 */
	@RequestMapping(value = "bingji", method = RequestMethod.POST)
	@ResponseBody
	public Object bingji() {
		JqgridPageResp<Bingji> resp = new JqgridPageResp<Bingji>();
		// 验证参数
		try {
			List<Bingji> rows = pd.Bingji();
			resp.setRows(rows);
			resp.setMsg("查询成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("查询失败");
		}
		return resp;
	}
}	
