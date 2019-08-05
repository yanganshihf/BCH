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
import com.integration.dao.BH_FQ_HZDAO;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.YhswxcBzdBhhzFq;
import com.integration.service.DictionaryManageService;
import com.integration.util.ParameUtil;

import cn.hutool.core.date.DateUtil;


@Controller
@RequestMapping("bhfqhz/")
public class BH_FQ_HZAction {
	@Autowired
	BH_FQ_HZDAO pd;
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
	public Object delete(String uuid) {
		JqgridPageResp<YhswxcBzdBhhzFq> resp = new JqgridPageResp<YhswxcBzdBhhzFq>();
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
	public Object queryList(Integer page, Integer rows,String shi,String xian,String xiang,String yangdi_h,String shouhai_zl,String ganbing_zs) {
		// 验证参数
		shi = ParameUtil.checkParam(shi);
		xian = ParameUtil.checkParam(xian);
		xiang = ParameUtil.checkParam(xiang);
		yangdi_h = ParameUtil.checkParam(yangdi_h);
		shouhai_zl = ParameUtil.checkParam(shouhai_zl);
		ganbing_zs = ParameUtil.checkParam(ganbing_zs);
		JqgridPageResp<YhswxcBzdBhhzFq> resp = new JqgridPageResp<YhswxcBzdBhhzFq>();
		// 验证参数
		try {
			PageHelper.offsetPage((page - 1) * rows, rows);
			List<YhswxcBzdBhhzFq> list = pd.queryList(shi,xian,xiang,yangdi_h, shouhai_zl, ganbing_zs);
			Map<String, String> weihaiCdMap = ds.getWeihaiCdMap();
			
			for (YhswxcBzdBhhzFq yhswxcBzdBhhzFq : list) {
				yhswxcBzdBhhzFq.setWeihai_Cd(weihaiCdMap.get(yhswxcBzdBhhzFq.getWeihai_Cd()));
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
		JqgridPageResp<YhswxcBzdBhhzFq> resp = new JqgridPageResp<YhswxcBzdBhhzFq>();
		// 验证参数
		try {
			List<YhswxcBzdBhhzFq> list = pd.findById(uuid_bzd);
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
	public Object updateZB(String uuid,String uuid_bzd,String yhsw_lb,Integer yhsw_mc,
			String diaocha_sj,String xiang,String xiang_mc,String cun,
			String xiao_ban,String yangdi_jd,String yangdi_wd,Integer diaocha_zs,
			Integer shouhai_zs,Integer shouhai_zl,String shug_shmj,Integer ganbing_zs,
			Float daibiao_mj,String weihai_cd,String chengzai,String diaocha_ry) {
		Date d = new Date();
		String last_changetime = DateUtil.formatDateTime(d);
		
		
		JqgridPageResp<YhswxcBzdBhhzFq> resp = new JqgridPageResp<YhswxcBzdBhhzFq>();
		// 验证参数
		try {
			pd.updateZB(uuid,uuid_bzd,yhsw_lb,yhsw_mc,
					diaocha_sj,xiang,xiang_mc,cun,
					xiao_ban,yangdi_jd,yangdi_wd,diaocha_zs,
					shouhai_zs,shouhai_zl,shug_shmj,ganbing_zs,
					daibiao_mj,weihai_cd,chengzai,diaocha_ry,
					last_changetime);
			resp.setMsg("修改成功");
		} catch (Exception e) {
			System.out.println(e.getMessage());
			// TODO: handle exception
			resp.setMsg("修改失败");
		}
		return resp;
	}
	

}
