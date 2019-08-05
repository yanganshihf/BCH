package com.integration.action;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.Notice;
import com.integration.entity.PDFFile;
import com.integration.entity.SysUser;
import com.integration.service.NoticeService;
import com.integration.service.OperationLogService;
import com.integration.util.CookiesUtil;

@Controller
@RequestMapping("notice/")
public class NoticeAction {
	
	
	@Autowired
	NoticeService ns;
	@Autowired
	OperationLogService os;
	/**
	 * 条件查询位置
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "listNotice",method = RequestMethod.POST)
	@ResponseBody
	public Object queryNotice(Integer page,Integer rows,String fileName,String personName){		
		JqgridPageResp<Notice> resp = new JqgridPageResp<Notice>();		
		// 验证参数
		fileName = checkParam(fileName);
		personName = checkParam(personName);
		fileName = blur(fileName);
		personName = blur(personName);
		
		PageHelper.offsetPage((page-1)*rows, rows);
		List<Notice> listEvents = ns.find_Notice_List(fileName,personName);
		// 记录数
		int records = (int) new PageInfo<>(listEvents).getTotal();
		// 总页数
		int total = 0;
		if (records%rows == 0) {
			total = records/rows;
		}else {
			total = records/rows +1;
		}
		resp.setRecords(records);
		resp.setTotal(total);
		resp.setRows(listEvents);
		return resp;
	}
	
	/**
	 * 新通知
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "addNew",method = RequestMethod.POST)
	@ResponseBody
	public Object addNew(String fileName,String fileText,String uploader,String uploadTime){		
		
		JqgridPageResp<Notice> resp = new JqgridPageResp<Notice>();		
		// 验证参数
		fileName = checkParam(fileName);
		fileText = checkParam(fileText);
		uploader = checkParam(uploader);
		uploadTime = checkParam(uploadTime);
		
		String uuid = UUID.randomUUID().toString().replaceAll("-",""); 
		
		try {
			ns.addNew(fileName,fileText,uploader,uploadTime,uuid);
			resp.setMsg("发布成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("发布失败,请重试");
		}
		return resp;
	}
	
	/**
	 *删除通知公告 
	 * 
	 **/
	@RequestMapping(value = "delNotice",method = RequestMethod.POST)
	@ResponseBody
	public Object delNotice(HttpServletRequest request,String id) {
		JqgridPageResp<Notice> resp = new JqgridPageResp<Notice>();
		ns.delNotice(id);
	        Subject subject = SecurityUtils.getSubject();
	        SysUser user = (SysUser) subject.getPrincipal();
		String logUser = user.getUserName();	
		String logMobile = user.getMobile();
		String ModuleType = "上传下达";
		String OperationType = "删除";
		String OperationInfo = " 删除了  一条通知公告";
		String Logid = UUID.randomUUID().toString().replaceAll("-", "");
		Date now = new Date();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String logTime = simpleDateFormat.format(now);
		os.addInfo(Logid,ModuleType,OperationType,logUser,logMobile,logTime,OperationInfo);
		resp.setMsg("删除成功");
		return resp;
	}
	
	
	/**
	 * 校验参数
	 * 
	 * @param param
	 * @return
	 */
	public String checkParam(String param){		
		// 如果参数为空 则跳过该参数
		if (param == null || param.length()<=0 || "全部".equals(param)) {
			param = "%";
		}
		return param;	
	}
	/**
	 * 模糊查询参数过滤
	 * 
	 * @param param
	 * @return
	 */
	public String blur(String param){
		param = param + '%';
	
		return param;
	}
	

}
