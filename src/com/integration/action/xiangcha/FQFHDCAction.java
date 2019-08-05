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
import com.integration.dao.FQFHDCDAO;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.YhswxcFqfhdcb;
import com.integration.util.ParameUtil;

import cn.hutool.core.date.DateUtil;

/**
  * 防治前后调查表
 * 
 * @author yanganshi
 *
 */
@Controller
@RequestMapping("fqfhdc/")
public class FQFHDCAction {
	@Autowired
	FQFHDCDAO pd;
	
	/**
	  * 删除踏查记录主表
	 * 
	 * @param uuidTcd
	 * @return
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Object delete(String uuid_bzd) {
		JqgridPageResp<YhswxcFqfhdcb> resp = new JqgridPageResp<YhswxcFqfhdcb>();
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
	public Object queryList(Integer page, Integer rows,String xian,String xiang,String yangdi_h) {
		// 验证参数
		JqgridPageResp<YhswxcFqfhdcb> resp = new JqgridPageResp<YhswxcFqfhdcb>();
		// 验证参数
		xian = ParameUtil.checkParam(xian);
		xiang = ParameUtil.checkParam(xiang);
		yangdi_h = ParameUtil.checkParam(yangdi_h);
		
		try {
			PageHelper.offsetPage((page - 1) * rows, rows);
			List<YhswxcFqfhdcb> list = pd.queryList(xian,xiang,yangdi_h);
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
		JqgridPageResp<YhswxcFqfhdcb> resp = new JqgridPageResp<YhswxcFqfhdcb>();
		// 验证参数
		try {
			List<YhswxcFqfhdcb> list = pd.findById(uuid_bzd);
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
	public Object updateZB(Integer xu_hao,String xian,String xian_mc,String xiang,
			String xiang_mc,String cun,String xiao_ban,String yangdi_h,String didian_jd,
			String didian_wd,String yhsw_mc,Integer zhushu_fq,Integer zhulv_fq,String dcsj_fq
			,Integer zhushu_fh,Integer zhulv_fh,String dcsj_fh,String bei_zhu,String uuid_bzd) {
		JqgridPageResp<YhswxcFqfhdcb> resp = new JqgridPageResp<YhswxcFqfhdcb>();
		
		Date d = new Date();
		String last_changetime = DateUtil.formatDateTime(d);
		
		// 验证参数
		try {
			pd.updateZB( xu_hao, xian, xian_mc, xiang,
					 xiang_mc, cun, xiao_ban, yangdi_h, didian_jd,
					 didian_wd, yhsw_mc, zhushu_fq, zhulv_fq, dcsj_fq
					, zhushu_fh, zhulv_fh, dcsj_fh, bei_zhu, last_changetime,uuid_bzd);
			resp.setMsg("修改成功");
		} catch (Exception e) {
			System.out.println(e.getMessage());
			resp.setMsg("修改失败");
		}
		return resp;
	}
	

}
