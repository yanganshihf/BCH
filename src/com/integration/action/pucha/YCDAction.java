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
import com.integration.dao.YCDDAO;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.TC_ZHUBIAO;
import com.integration.entity.YCD;
import com.integration.util.ParameUtil;

import cn.hutool.core.date.DateUtil;


@Controller
@RequestMapping("ycd/")
public class YCDAction {
	@Autowired
	YCDDAO pd;
	
	/**
	  * 删除踏查记录主表
	 * 
	 * @param uuidTcd
	 * @return
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Object delete(String uuidYcd) {
		JqgridPageResp<YCD> resp = new JqgridPageResp<YCD>();
		// 验证参数
		try {
			pd.delete(uuidYcd);
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
	public Object queryList(Integer page, Integer rows,String shi,String xian,String xiang,String xiao_ban) {
		
			// 验证参数
			shi = ParameUtil.checkParam(shi);
			xian = ParameUtil.checkParam(xian);
			xiang = ParameUtil.checkParam(xiang);
			xiao_ban = ParameUtil.checkParam(xiao_ban);
			
			JqgridPageResp<TC_ZHUBIAO> resp = new JqgridPageResp<TC_ZHUBIAO>();
			// 验证参数
			try {
				PageHelper.offsetPage((page - 1) * rows, rows);
				List<YCD> list = pd.queryList(shi,xian,xiang,xiao_ban);
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
			System.out.println(e.getMessage());
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
	public Object findById(String uuid_ycd) {
		JqgridPageResp<YCD> resp = new JqgridPageResp<YCD>();
		// 验证参数
		try {
			List<YCD> list = pd.findById(uuid_ycd);
			resp.setRows(list);
			resp.setMsg("删除成功");
		} catch (Exception e) {
			System.out.println(e.getMessage());
			resp.setMsg("删除失败");
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
	public Object updateZB(String uuid_ycd,String sheng, String shi,String xian,
			String xian_mc,String xiang,String xiang_mc,String xiao_ban,
			String linfen_lx,String linfen_mj,String zhuyao_sz,String ycd_jd,
			String ycd_wd,String ycd_hb,String diaocha_ry,String diaocha_sj) {
		Date d = new Date();
		String last_changetime = DateUtil.formatDateTime(d);
		
		JqgridPageResp<YCD> resp = new JqgridPageResp<YCD>();
		pd.updateZB(uuid_ycd, sheng, shi, xian, xian_mc, xiang, xiang_mc, xiao_ban,
				linfen_lx, linfen_mj, zhuyao_sz, ycd_jd, ycd_wd,
				ycd_hb,diaocha_ry,diaocha_sj,last_changetime);
		// 验证参数
		try {
			resp.setMsg("修改成功");
		} catch (Exception e) {
			System.out.println(e.getMessage());
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
	public Object updateFB(String uuid,String uuid_ycd,String kunchong,String shuliang_h,
			String shuliang_c,Float shuliang_x,String bei_zhu) {
		Date d = new Date();
		String last_changetime = DateUtil.formatDateTime(d);
		
		JqgridPageResp<YCD> resp = new JqgridPageResp<YCD>();
		// 验证参数
		try {
			pd.updateFB(uuid,uuid_ycd,kunchong,shuliang_h,shuliang_c,shuliang_x,bei_zhu,last_changetime);
			resp.setMsg("修改成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("修改失败");
		}
		return resp;
	}
	
	
	
}
