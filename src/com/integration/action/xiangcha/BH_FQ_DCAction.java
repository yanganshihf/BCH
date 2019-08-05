package com.integration.action.xiangcha;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.dao.BH_FQ_DCDAO;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.YhswxcBzdBhdcFq;
import com.integration.util.ParameUtil;

import cn.hutool.core.date.DateUtil;


@Controller
@RequestMapping("bhfqdc/")
public class BH_FQ_DCAction {
	@Autowired
	BH_FQ_DCDAO pd;
	
	/**
	  * 删除踏查记录主表
	 * 
	 * @param uuidTcd
	 * @return
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Object delete(String uuid) {
		JqgridPageResp<YhswxcBzdBhdcFq> resp = new JqgridPageResp<YhswxcBzdBhdcFq>();
		// 验证参数
		try {
			pd.delete(uuid);
			resp.setMsg("删除成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("删除失败");
		}
		return resp;
	}
	
	/**
	  * 条件查询查记录主表
	 * 
	 * @param shi
	 * @param xian
	 * @param xiang
	 * @param tachaluxianbianhao
	 * @param biaozhundibianhao
	 * @return
	 */
	@RequestMapping(value = "queryList", method = RequestMethod.POST)
	@ResponseBody
	public Object queryList(Integer page, Integer rows) {
		// 验证参数
		
		JqgridPageResp<YhswxcBzdBhdcFq> resp = new JqgridPageResp<YhswxcBzdBhdcFq>();
		// 验证参数
		try {
			PageHelper.offsetPage((page - 1) * rows, rows);
			List<YhswxcBzdBhdcFq> list = pd.queryList();
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
			// TODO: handle exception
			resp.setMsg("查询失败");
		}
		return resp;
	}
	
	/**
	  * 根据id返回单条记录
	 * 
	 * @param uuidTcd
	 * @return
	 */
	@RequestMapping(value = "findById", method = RequestMethod.POST)
	@ResponseBody
	public Object findById(String uuid) {
		JqgridPageResp<YhswxcBzdBhdcFq> resp = new JqgridPageResp<YhswxcBzdBhdcFq>();
		// 验证参数
		try {
			List<YhswxcBzdBhdcFq> list = pd.findById(uuid);
			resp.setRows(list);
			resp.setMsg("查询成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("查询失败");
		}
		return resp;
	}
	
	/**
	 * 修改主表
	 * 
	 * @param uuidYx
	 * @param sheng
	 * @param shi
	 * @param xian
	 * @param xianMc
	 * @param xiang
	 * @param xiangMc
	 * @param xianluBh
	 * @param diaochaMj
	 * @param diaochaRy
	 * @param diaochaSj
	 * @param lastChangetime
	 * @return
	 */
	@RequestMapping(value = "updateZB", method = RequestMethod.POST)
	@ResponseBody
	public Object updateZB(String uuid,String uuid_bzd,String yangf_h,Integer yangz_h,
			String bing_ji,String daibiaozhi,String bing_qing,String bei_zhu) {
		JqgridPageResp<YhswxcBzdBhdcFq> resp = new JqgridPageResp<YhswxcBzdBhdcFq>();
		
		Date d = new Date();
		String last_changetime = DateUtil.formatDateTime(d);
		
		// 验证参数
		try {
			pd.updateZB( uuid, uuid_bzd, yangf_h, yangz_h,
					 bing_ji, daibiaozhi, bing_qing, bei_zhu, last_changetime);
			resp.setMsg("修改成功");
		} catch (Exception e) {
			System.out.println(e.getMessage());
			resp.setMsg("修改失败");
		}
		return resp;
	}
}
