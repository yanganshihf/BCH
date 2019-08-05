package com.integration.action.pucha;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.dao.JYXDAO;
import com.integration.entity.JYX;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.TC_ZHUBIAO;
import com.integration.service.DictionaryManageService;

import cn.hutool.core.date.DateUtil;
import com.integration.util.ParameUtil;


@Controller
@RequestMapping("jyx/")
public class JYXAction {
	@Autowired
	JYXDAO pd;
	@Autowired
	DictionaryManageService ds;
	/**
	  * 删除
	 * 
	 * @param uuid_jyx
	 * @return
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Object delete(String uuid_jyx) {
		JqgridPageResp<JYX> resp = new JqgridPageResp<JYX>();
		// 验证参数
		try {
			pd.delete(uuid_jyx);
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
	public Object queryList(Integer page, Integer rows,String shi,String xian,String xiang) {
		// 验证参数
		shi = ParameUtil.checkParam(shi);
		xian = ParameUtil.checkParam(xian);
		xiang = ParameUtil.checkParam(xiang);
		
		JqgridPageResp<JYX> resp = new JqgridPageResp<JYX>();
		// 验证参数
		try {
			PageHelper.offsetPage((page - 1) * rows, rows);
			List<JYX> list = pd.queryList(shi,xian,xiang);
			
			// 翻譯字段有害生物种类
			for (JYX jyx : list) {
				Map<String, String> yhswLbMap = ds.getYhswLbMap();
				String Yhsw_Lb_CH = yhswLbMap.get(jyx.getYhsw_lb());
				jyx.setYhsw_lb(Yhsw_Lb_CH);
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
			e.printStackTrace();
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
	public Object findById(String uuid_jyx) {
		JqgridPageResp<JYX> resp = new JqgridPageResp<JYX>();
		// 验证参数
		try {
			List<JYX> list = pd.findById(uuid_jyx);
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
	public Object updateZB(String uuid_jyx,String sheng, String shi,String xian,
			String xian_mc,String xiang,String xiang_mc,String xiao_ban,
			String linfen_lx,String linfen_mj,String zhuyao_sz,String jyx_jd,
			String jyx_wd,String jyx_hb,String jyx_zmly,String jyx_ybd,
			String daocha_ry,String diaocha_sj) {
		
		
		 Date d = new Date();
		 String last_changetime = DateUtil.formatDateTime(d);
		 
		JqgridPageResp<JYX> resp = new JqgridPageResp<JYX>();
		pd.updateZB(uuid_jyx, sheng, shi, xian, xian_mc, xiang, xiang_mc,
				xiao_ban,linfen_lx,linfen_mj,zhuyao_sz,jyx_jd,jyx_wd,
				jyx_hb, jyx_zmly, jyx_ybd, daocha_ry,
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
	public Object updateFB(String uuid,String uuid_jyx,String yhsw_lb,String yhsw_mc,
			String lading_xm,String faxian_sj,String chuanru_d,String chuanru_tj,
			String jzzw_mc,String jzzw_lx,String fenbu_fw,Float fasheng_mj,
			String ganbing_zs,String weihai_cd,String yingxiang,
			String beizhu) {
		JqgridPageResp<JYX> resp = new JqgridPageResp<JYX>();
		
		 Date d = new Date();
		 String last_changetime = DateUtil.formatDateTime(d);
		// 验证参数
		try {
			pd.updateFB( uuid, uuid_jyx, yhsw_lb, yhsw_mc,
					 lading_xm,faxian_sj, chuanru_d, chuanru_tj,
					 jzzw_mc, jzzw_lx, fenbu_fw, fasheng_mj,
					 ganbing_zs, weihai_cd, yingxiang,
					 beizhu,  last_changetime);
			resp.setMsg("修改成功");
		} catch (Exception e) {
			System.out.println(e.getMessage());
			
			resp.setMsg("修改失败");
		}
		return resp;
	}
}
