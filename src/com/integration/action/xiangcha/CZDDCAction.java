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
import com.integration.dao.CZDDCDAO;
import com.integration.entity.CZDDC;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.CZDDC;
import com.integration.util.ParameUtil;

import cn.hutool.core.date.DateUtil;

/**
  * 成灾面积调查表
 * 
 * @author yanganshi
 *
 */
@Controller
@RequestMapping("czddc/")
public class CZDDCAction {
	@Autowired
	CZDDCDAO pd;
	
	/**
	  * 删除踏查记录主表
	 * 
	 * @param uuidTcd
	 * @return
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Object delete(String uuid_czd) {
		JqgridPageResp<CZDDC> resp = new JqgridPageResp<CZDDC>();
		// 验证参数
		try {
			pd.delete(uuid_czd);
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
	public Object queryList(Integer page, Integer rows,String shi,String xian,String xiang,String yangdi_h) {
		// 验证参数
		shi = ParameUtil.checkParam(shi);
		xian = ParameUtil.checkParam(xian);
		xiang = ParameUtil.checkParam(xiang);
		yangdi_h = ParameUtil.checkParam(yangdi_h);
		
		JqgridPageResp<CZDDC> resp = new JqgridPageResp<CZDDC>();
		// 验证参数
		try {
			PageHelper.offsetPage((page - 1) * rows, rows);
			List<CZDDC> list = pd.queryList(shi,xian,xiang,yangdi_h);
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
	public Object findById(String uuid_czd) {
		JqgridPageResp<CZDDC> resp = new JqgridPageResp<CZDDC>();
		// 验证参数
		try {
			List<CZDDC> list = pd.findById(uuid_czd);
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
	public Object updateZB(String uuid,String uuid_czd,String yangdi_h,Integer diaocha_zs,
			String yhsw_lb,String yhsw_mc,String jzzw_mc,String weihai_bw,String weihai_q,
			Integer shouhai_zl,String siwang_zl,String chengzai) {
		JqgridPageResp<CZDDC> resp = new JqgridPageResp<CZDDC>();
		
		Date d = new Date();
		String last_changetime = DateUtil.formatDateTime(d);
		
		// 验证参数
		try {
			pd.updateZB(uuid,uuid_czd,yangdi_h,diaocha_zs,
					yhsw_lb,yhsw_mc,jzzw_mc,weihai_bw,weihai_q,
					shouhai_zl,siwang_zl,chengzai,last_changetime);
			resp.setMsg("修改成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("修改失败");
		}
		return resp;
	}
	
	
	

}
