package com.integration.action.pucha;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.dao.PuchaDAO;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.TC_ZHUBIAO;
import com.integration.service.DictionaryManageService;
import com.integration.util.ParameUtil;

import cn.hutool.core.date.DateUtil;

@Controller
@RequestMapping("pucha/")
public class PuchaAction {
	@Autowired
	PuchaDAO pd;
	@Autowired
	DictionaryManageService ds;
	
	HashMap<String, String> yhsw_lbMap = new HashMap<>();
	
	/**
	  * 删除踏查记录主表
	 * 
	 * @param uuidTcd
	 * @return
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Object delete(String uuid_tcd) {
		JqgridPageResp<TC_ZHUBIAO> resp = new JqgridPageResp<TC_ZHUBIAO>();
		// 验证参数
		try {
			pd.delete(uuid_tcd);
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
	public Object queryList(Integer page, Integer rows,String shi,String xian,String xiang,String xianlu_bh,String uuid_tcd) {
		// 验证参数
		shi = ParameUtil.checkParam(shi);
		xian = ParameUtil.checkParam(xian);
		xiang = ParameUtil.checkParam(xiang);
		xianlu_bh = ParameUtil.checkParam(xianlu_bh);
		uuid_tcd = ParameUtil.checkParam(uuid_tcd);
		
		
		
		JqgridPageResp<TC_ZHUBIAO> resp = new JqgridPageResp<TC_ZHUBIAO>();
		// 验证参数
		try {
			PageHelper.offsetPage((page - 1) * rows, rows);
			List<TC_ZHUBIAO> list = pd.queryList(shi,xian,xiang,xianlu_bh,uuid_tcd);
			
			
			
			
			// 翻譯字段有害生物种类
			for (TC_ZHUBIAO tc_ZHUBIAO : list) {
				Map<String, String> yhswLbMap = ds.getYhswLbMap();
				Map<String, String> weihaiBwMap = ds.getWeihaiBwMap();
				
				String Yhsw_Lb_CH = yhswLbMap.get(tc_ZHUBIAO.getYhsw_Lb());
				String Weihai_Bw_CH = weihaiBwMap.get(tc_ZHUBIAO.getWeihai_Bw());
				
				tc_ZHUBIAO.setYhsw_Lb(Yhsw_Lb_CH);
				tc_ZHUBIAO.setWeihai_Bw(Weihai_Bw_CH);
			}
			
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
	public Object findById(String uuid_tcd) {
		JqgridPageResp<TC_ZHUBIAO> resp = new JqgridPageResp<TC_ZHUBIAO>();
		// 验证参数
		try {
			List<TC_ZHUBIAO> list = pd.findById(uuid_tcd);
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
	public Object updateZB(String uuidYx,String sheng,String shi,String xian,
			String xianMc,String xiang,String xiangMc,String xianluBh,String diaochaMj,
			String diaochaRy,String diaochaSj) {
		
		Date d = new Date();
		 String last_changetime = DateUtil.formatDateTime(d);
		
		JqgridPageResp<TC_ZHUBIAO> resp = new JqgridPageResp<TC_ZHUBIAO>();
		// 验证参数
		try {
			pd.updateZB(uuidYx,sheng,shi,xian,xianMc,xiang,xiangMc,xianluBh,diaochaMj,diaochaRy,diaochaSj,last_changetime);
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
	public Object updateFB(String uuid_tcd,String tcd_bh,String tcd_mc,String tcd_jd,
			String tcd_wd,Float tcd_hb,String tcd_szzc,String yhsw_lb,String yhsw_mc,
			String jzzw_mc,String weihai_bw,
			String tcd_szbzd,String bzd_bh,String tcd_bz,String diaocha_ry,String diaocha_sj,String uuid_yx,
			String xian,String xiang) {
		
		Date d = new Date();
		String last_changetime = DateUtil.formatDateTime(d);
		
		JqgridPageResp<TC_ZHUBIAO> resp = new JqgridPageResp<TC_ZHUBIAO>();
		// 验证参数
		try {
			pd.updateFB(uuid_tcd,tcd_bh,tcd_mc,tcd_jd,tcd_wd,tcd_hb,tcd_szzc,
					yhsw_lb,yhsw_mc,jzzw_mc,weihai_bw,tcd_szbzd,bzd_bh,tcd_bz,last_changetime);
			
			pd.updateZB(diaocha_ry,diaocha_sj,uuid_yx,xian,xiang);
			resp.setMsg("修改成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("修改失败");
		}
		return resp;
	}
}
