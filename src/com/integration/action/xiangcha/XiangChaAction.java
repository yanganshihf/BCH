package com.integration.action.xiangcha;

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
import com.integration.dao.XiangChaDAO;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.YhswxcBzd;
import com.integration.service.DictionaryManageService;
import com.integration.util.ParameUtil;

import cn.hutool.core.date.DateUtil;


@Controller
@RequestMapping("xiangcha/")
public class XiangChaAction {
	@Autowired
	XiangChaDAO pd;
	@Autowired
	DictionaryManageService ds;
	/**
	  * 删除踏查记录主表
	 * 
	 * @param uuidTcd
	 * @return
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Object delete(String uuid_bzd) {
		JqgridPageResp<YhswxcBzd> resp = new JqgridPageResp<YhswxcBzd>();
		// 验证参数
		try {
			pd.delete(uuid_bzd);
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
		JqgridPageResp<YhswxcBzd> resp = new JqgridPageResp<YhswxcBzd>();
		// 验证参数
		try {
			PageHelper.offsetPage((page - 1) * rows, rows);
			List<YhswxcBzd> list = pd.queryList(shi,xian,xiang,yangdi_h);
			for (YhswxcBzd yhswxcBzd : list) {
				Map<String, String> yhswLbMap = ds.getYhswLbMap();
				String Yhsw_Lb_CH = yhswLbMap.get(yhswxcBzd.getYhsw_Lb());
				yhswxcBzd.setYhsw_Lb(Yhsw_Lb_CH);
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
		JqgridPageResp<YhswxcBzd> resp = new JqgridPageResp<YhswxcBzd>();
		// 验证参数
		try {
			List<YhswxcBzd> list = pd.findById(uuid_bzd);
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
	public Object updateZB(String uuid_bzd,String sheng,String shi,String xian,
			String xianMc,String xiang,String xiangMc,String cun,String xiao_ban,
			String yangdi_h,String dcsj_fq,String dcsg_fh,String yangdi_jd,
			String yangdi_wd,String yhsw_lb,String yhsw_mc,Float yangdi_mj,
			Integer yangf_sl,String yangdi_bz,String diaocha_ry) {
		
		Date d = new Date();
		String last_changetime = DateUtil.formatDateTime(d);
		
		JqgridPageResp<YhswxcBzd> resp = new JqgridPageResp<YhswxcBzd>();
		// 验证参数
		try {
			pd.updateZB(uuid_bzd,sheng,shi,xian,
					xianMc,xiang,xiangMc,cun,xiao_ban,
					yangdi_h,dcsj_fq,dcsg_fh,yangdi_jd,
					yangdi_wd,yhsw_lb,yhsw_mc, yangdi_mj,
					yangf_sl,yangdi_bz,diaocha_ry,last_changetime);
			resp.setMsg("修改成功");
		} catch (Exception e) {
			System.out.println(e.getMessage());
			resp.setMsg("修改失败");
		}
		return resp;
	}
	

}
