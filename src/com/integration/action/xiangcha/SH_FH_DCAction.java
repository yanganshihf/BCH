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
import com.integration.dao.SH_FH_DCDAO;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.YhswxcBzdShdcFh;

import cn.hutool.core.date.DateUtil;


@Controller
@RequestMapping("shfhdc/")
public class SH_FH_DCAction {
	@Autowired
	SH_FH_DCDAO pd;
	
	/**
	  * 删除踏查记录主表
	 * 
	 * @param uuidTcd
	 * @return
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Object delete(String uuid) {
		JqgridPageResp<YhswxcBzdShdcFh> resp = new JqgridPageResp<YhswxcBzdShdcFh>();
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
		
		JqgridPageResp<YhswxcBzdShdcFh> resp = new JqgridPageResp<YhswxcBzdShdcFh>();
		// 验证参数
		try {
			PageHelper.offsetPage((page - 1) * rows, rows);
			List<YhswxcBzdShdcFh> list = pd.queryList();
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
	public Object findById(String uuid_bzd) {
		JqgridPageResp<YhswxcBzdShdcFh> resp = new JqgridPageResp<YhswxcBzdShdcFh>();
		// 验证参数
		try {
			List<YhswxcBzdShdcFh> list = pd.findById(uuid_bzd);
			resp.setRows(list);
			resp.setMsg("查询成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("查询失败");
		}
		return resp;
	}
	
	/**
	 * 修改
	 * 
	 * @param uuid
	 * @param uuid_bzd
	 * @param yangf_h
	 * @param tuqiu_gs
	 * @param youxiao_dk
	 * @param bushujia_s
	 * @param bushu_hj
	 * @param bushu_c
	 * @param bushu_x
	 * @param tuqiu_xs
	 * @param shu_mi_du
	 * @param diaocha_zs
	 * @param shouhai_zs
	 * @param shouhai_zl
	 * @param siwang_zs
	 * @param siwang_zl
	 * @param weihai_cd
	 * @param bei_zhu
	 * @param last_changetime
	 * @return
	 */
	@RequestMapping(value = "updateZB", method = RequestMethod.POST)
	@ResponseBody
	public Object updateZB(String uuid,String uuid_bzd,String yangf_h,Integer tuqiu_gs,
			Integer youxiao_dk,Integer bushujia_s,Integer bushu_hj,Integer bushu_c,Integer bushu_x,
			Integer tuqiu_xs,Integer shu_mi_du,Integer diaocha_zs,Integer shouhai_zs,Integer shouhai_zl,
			Integer siwang_zs,Integer siwang_zl,String weihai_cd,String bei_zhu) {
		
		Date d = new Date();
		String last_changetime = DateUtil.formatDateTime(d);
		
		JqgridPageResp<YhswxcBzdShdcFh> resp = new JqgridPageResp<YhswxcBzdShdcFh>();
		// 验证参数
		try {
			pd.updateZB(uuid,uuid_bzd,yangf_h,tuqiu_gs,
					youxiao_dk,bushujia_s,bushu_hj,bushu_c,bushu_x,
					tuqiu_xs,shu_mi_du,diaocha_zs,shouhai_zs,shouhai_zl,
					siwang_zs,siwang_zl,weihai_cd,bei_zhu,last_changetime);
			resp.setMsg("修改成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("修改失败");
		}
		return resp;
	}
	

}
