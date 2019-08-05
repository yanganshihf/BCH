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
import com.integration.dao.PCBHDCDAO;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.MaoPu;
import com.integration.entity.PCBHDC;
import com.integration.util.ParameUtil;

import cn.hutool.core.date.DateUtil;


@Controller
@RequestMapping("pcbhdc/")
public class PCBHDCAction {
	@Autowired
	PCBHDCDAO pd;
	
	/**
	  * 删除踏查记录主表
	 * 
	 * @param uuidTcd
	 * @return
	 */
	/*@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Object delete(String uuid) {
		JqgridPageResp<PCBHDC> resp = new JqgridPageResp<PCBHDC>();
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
	*/
	
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
	public Object queryList(Integer page, Integer rows,String xian,String xian_mc,
			String xiang,String xiang_mc,String bzd_lflx,Float bzd_lfmj,String bzd_zysz,
			String bzd_jd,String bzd_wd,Float bzd_hb,String bzd_zmly,String bzd_zblx,
			Float bzd_pjsg,String yhsw_mc,Float ybd,Integer bzd_jzsznl,String bzd_lmzc) {
		// 验证参数
		
		xian = ParameUtil.checkParam(xian);
		xian_mc = ParameUtil.checkParam(xian_mc);
		xiang = ParameUtil.checkParam(xiang);
		xiang_mc = ParameUtil.checkParam(xiang_mc);
		bzd_lflx = ParameUtil.checkParam(bzd_lflx);
		
		bzd_zysz = ParameUtil.checkParam(bzd_zysz);
		bzd_jd = ParameUtil.checkParam(bzd_jd);
		bzd_wd = ParameUtil.checkParam(bzd_wd);
		bzd_zmly = ParameUtil.checkParam(bzd_zmly);
		bzd_zblx = ParameUtil.checkParam(bzd_zblx);
		yhsw_mc = ParameUtil.checkParam(yhsw_mc);
		bzd_lmzc = ParameUtil.checkParam(bzd_lmzc);
		
		JqgridPageResp<PCBHDC> resp = new JqgridPageResp<PCBHDC>();
		// 验证参数
		try {
			PageHelper.offsetPage((page - 1) * rows, rows);
			List<PCBHDC> list = pd.queryList(xian,xian_mc,xiang,xiang_mc,bzd_lflx,bzd_lfmj,
					bzd_zysz,bzd_jd,bzd_wd,bzd_hb,bzd_zmly,bzd_zblx,bzd_pjsg,yhsw_mc,
					ybd,bzd_jzsznl,bzd_lmzc);
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
	public Object findById(String uuid_tcd) {
		JqgridPageResp<MaoPu> resp = new JqgridPageResp<MaoPu>();
		// 验证参数
		try {
			List<PCBHDC> list = pd.findById(uuid_tcd);
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
	public Object updateZB(String uuid_yx, String uuid_tcd, 
			String uuid_bzd, String bzd_bh, 
			String bzd_xb, String bzd_lflx, Float bzd_lfmj,
			String bzd_zysz, String bzd_jd, String bzd_wd,
			Float bzd_hb, String bzd_zmly, String bzd_zblx,
			Float bzd_pjsg, String yhsw_mc, Float bzd_ybd, 
			Integer bzd_jzsznl, String bzd_lmzc,String bzd_bz
			) {
		Date d = new Date();
		String last_changetime = DateUtil.formatDateTime(d);
		
		JqgridPageResp<MaoPu> resp = new JqgridPageResp<MaoPu>();
		
		pd.updateZB(uuid_yx, uuid_tcd, uuid_bzd, bzd_bh, 
				bzd_xb, bzd_lflx, bzd_lfmj,
				bzd_zysz, bzd_jd, bzd_wd,
				bzd_hb, bzd_zmly, bzd_zblx,
				bzd_pjsg, yhsw_mc, bzd_ybd, 
				bzd_jzsznl, bzd_lmzc,bzd_bz , 
				 last_changetime);
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
	public Object updateFB(String uuid,String uuid_yx,String uuid_tcd,String uuid_bzd,
			String bzd_bh,Integer yangf_xh,Integer diaocha_zs,Integer shouhai_zs,
			Integer shouhai_zl,Integer diaocha_ys,Integer shouhai_ys,Integer shouhai_yl,
			String weihai_cd,String chengzai,String beizhu) {
		Date d = new Date();
		 String last_changetime = DateUtil.formatDateTime(d);
		
		JqgridPageResp<MaoPu> resp = new JqgridPageResp<MaoPu>();
		// 验证参数
		try {
			pd.updateFB( uuid, uuid_yx, uuid_tcd, uuid_bzd,bzd_bh,
					 yangf_xh,diaocha_zs, shouhai_zs, shouhai_zl,
					 diaocha_ys, shouhai_ys, shouhai_yl, weihai_cd,
					 chengzai, beizhu,  last_changetime);
			resp.setMsg("修改成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("修改失败");
		}
		return resp;
	}
}
