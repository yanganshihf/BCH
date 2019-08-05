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
import com.integration.dao.ZSGPDAO;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.ZSGP;
import com.integration.util.ParameUtil;

import cn.hutool.core.date.DateUtil;


@Controller
@RequestMapping("ZSGP/")
public class ZSGPAction {
	@Autowired
	ZSGPDAO pd;
	
	/**
	  * 删除踏查记录主表
	 * 
	 * @param uuidTcd
	 * @return
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Object delete(String uuid) {
		JqgridPageResp<ZSGP> resp = new JqgridPageResp<ZSGP>();
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
	public Object queryList(Integer page, Integer rows,String shi,String xian,String xiang,String changs_mc) {
		// 验证参数
		shi = ParameUtil.checkParam(shi);
		xian = ParameUtil.checkParam(xian);
		xiang = ParameUtil.checkParam(xiang);
		changs_mc = ParameUtil.checkParam(changs_mc);
		
		JqgridPageResp<ZSGP> resp = new JqgridPageResp<ZSGP>();
		// 验证参数
		try {
			PageHelper.offsetPage((page - 1) * rows, rows);
			List<ZSGP> list = pd.queryList(shi,xian,xiang,changs_mc);
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
			e.printStackTrace();
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
	public Object findById(String uuid_zsgp) {
		JqgridPageResp<ZSGP> resp = new JqgridPageResp<ZSGP>();
		// 验证参数
		try {
			List<ZSGP> list = pd.findById(uuid_zsgp);
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
	public Object updateZB(String uuid_zsgp,String sheng, String shi,String xian,
			String xian_mc,String xiang,String xiang_mc,String changs_mc,
			String ku_cun,String chouy_ls,String changs_jd,String changs_wd,
			String changs_bh,String diaocha_ry,String diaocha_sj) {
		Date d = new Date();
		String last_changetime = DateUtil.formatDateTime(d);
		
		JqgridPageResp<ZSGP> resp = new JqgridPageResp<ZSGP>();
		pd.updateZB(uuid_zsgp, sheng,  shi, xian,
				 xian_mc, xiang, xiang_mc, changs_mc,
				 ku_cun, chouy_ls, changs_jd, changs_wd,
				 changs_bh, diaocha_ry, diaocha_sj, last_changetime);
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
	  * 修改子表
	 * 
	 * @param uuid_Tcd
	 * @param tcd_Bh
	 * @param tcd_Mc
	 * @param tcd_Jd
	 * @param tcd_Wd
	 * @param tcd_Hb
	 * @param tcd_Szzc
	 * @param yhsw_Lb
	 * @param yhsw_Mc
	 * @param jzzw_Mc
	 * @param weihai_Bw
	 * @param tcd_Szbzd
	 * @param bzd_Bh
	 * @param tcd_Bz
	 * @return 
	 */
	@RequestMapping(value = "updateFB", method = RequestMethod.POST)
	@ResponseBody
	public Object updateFB(String uuid,String uuid_zsgp,String yhws_lb,String yhws_mc,
			String jzzw_mc,Float jzzw_lx,String weihai_sl,String daibiao_sl,String weihai_cd,String chengzai,String beizhu) {
		Date d = new Date();
		String last_changetime = DateUtil.formatDateTime(d);
		
		JqgridPageResp<ZSGP> resp = new JqgridPageResp<ZSGP>();
		// 验证参数
		try {
			pd.updateFB(uuid,uuid_zsgp,yhws_lb,yhws_mc,jzzw_mc,jzzw_lx,weihai_sl,daibiao_sl,weihai_cd,chengzai,beizhu,last_changetime);
			resp.setMsg("修改成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("修改失败");
		}
		return resp;
	}
}
