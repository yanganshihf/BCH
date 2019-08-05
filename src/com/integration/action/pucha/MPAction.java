package com.integration.action.pucha;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.dao.MPDAO;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.MaoPu;
import com.integration.util.ParameUtil;

import cn.hutool.core.date.DateUtil;


@Controller
@RequestMapping("mp/")
public class MPAction {
	@Autowired
	MPDAO pd;
	
	/**
	  * 删除踏查记录主表
	 * 
	 * @param uuidTcd
	 * @return
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Object delete(String uuid_mp) {
		JqgridPageResp<MaoPu> resp = new JqgridPageResp<MaoPu>();
		// 验证参数
		try {
			pd.delete(uuid_mp);
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
	 * 
	 */
	@RequestMapping(value = "queryList", method = RequestMethod.POST)
	@ResponseBody
	public Object queryList(Integer page, Integer rows,String shi,String xian,String xiang,String miaopu_mc) {
		// 验证参数
		shi = ParameUtil.checkParam(shi);
		xian = ParameUtil.checkParam(xian);
		xiang = ParameUtil.checkParam(xiang);
		miaopu_mc = ParameUtil.checkParam(miaopu_mc);
		miaopu_mc = ParameUtil.blur(miaopu_mc);
		
		JqgridPageResp<MaoPu> resp = new JqgridPageResp<MaoPu>();
		// 验证参数
		try {
			PageHelper.offsetPage((page - 1) * rows, rows);
			List<MaoPu> list = pd.queryList(shi,xian,xiang,miaopu_mc);
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
	public Object findById(String uuid_mp) {
		JqgridPageResp<MaoPu> resp = new JqgridPageResp<MaoPu>();
		// 验证参数
		try {
			List<MaoPu> list = pd.findById(uuid_mp);
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
	 * @param uuid_mp
	 * @param sheng
	 * @param shi
	 * @param xian
	 * @param xian_mc
	 * @param xiang
	 * @param xiang_mc
	 * @param miaopu_mc
	 * @param miaopu_mj
	 * @param miaopu_jd
	 * @param miaopu_wd
	 * @param miaopu_hb
	 * @param diaocha_ry
	 * @param diaocha_sj
	 * @param last_changetime
	 * @return
	 */
	@RequestMapping(value = "updateZB", method = RequestMethod.POST)
	@ResponseBody
	public Object updateZB(String uuid_mp,String sheng, String shi,String xian,
			String xian_mc,String xiang,String xiang_mc,String miaopu_mc,
			String miaopu_mj,String miaopu_jd,String miaopu_wd,String miaopu_hb,
			String diaocha_ry,String diaocha_sj) {
		
		Date d = new Date();
		 String last_changetime = DateUtil.formatDateTime(d);
		
		
		JqgridPageResp<MaoPu> resp = new JqgridPageResp<MaoPu>();
		pd.updateZB(uuid_mp, sheng, shi, xian, xian_mc, xiang, xiang_mc, miaopu_mc,
				miaopu_mj, miaopu_jd, miaopu_wd, miaopu_hb, diaocha_ry,
				diaocha_sj,last_changetime);
		// 验证参数
		try {
			// pd.updateZB();
			resp.setMsg("修改成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("修改失败");
		}
		return resp;
	}
	
	/**
	 * 修改附表
	 * 
	 * @param uuid
	 * @param uuid_mp
	 * @param yhsw_lb
	 * @param yhsw_mc
	 * @param jzzw_mc
	 * @param weihai_bw
	 * @param diaocha_zs
	 * @param shouhai_zs
	 * @param shouhai_zl
	 * @param weihai_cd
	 * @param chengzai
	 * @param beizhu
	 * @param last_changetime
	 * @return 
	 */
	@RequestMapping(value = "updateFB", method = RequestMethod.POST)
	@ResponseBody
	public Object updateFB(String uuid,String uuid_mp,String yhsw_lb,String yhsw_mc,
			String jzzw_mc,Float weihai_bw,String diaocha_zs,String shouhai_zs,
			String shouhai_zl,String weihai_cd,String chengzai,
			String beizhu) {
		JqgridPageResp<MaoPu> resp = new JqgridPageResp<MaoPu>();
		Date d = new Date();
		 String last_changetime = DateUtil.formatDateTime(d);
		
		// 验证参数
		try {
			pd.updateFB(uuid,uuid_mp,yhsw_lb,yhsw_mc,jzzw_mc,weihai_bw,
					diaocha_zs,shouhai_zs,shouhai_zl,weihai_cd,chengzai,
					beizhu,last_changetime);
			resp.setMsg("修改成功");
		} catch (Exception e) {
			System.out.println(e.getMessage());
			resp.setMsg("修改失败");
		}
		return resp;
	}
}
