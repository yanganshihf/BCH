package com.integration.action.user;


import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeoutException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.integration.entity.Department;
import com.integration.entity.SysRole;
import com.integration.entity.SysUser;
import com.integration.service.DepartmentService;
import com.integration.service.OperationLogService;
import com.integration.service.UserService;
import com.integration.util.CookiesUtil;

@Controller
@RequestMapping("user/")
public class UserAction {
	/*@Autowired
	CategoryService categoryService;*/
	@Autowired
	UserService userService;
	@Autowired
	DepartmentService departmentService;
        @Autowired
        OperationLogService os;	
	/*@Autowired
	private HttpServletResponse response;*/
	
	@RequestMapping("userLogin")
	@ResponseBody
	public String listCategory(String mobile,String password,HttpSession session,HttpServletResponse response) throws IOException, TimeoutException{
		
		
		SysUser loginUser = userService.loginUser(mobile,password);
		Map<String, Object> resultMap = new HashMap<>();
                Subject subject = SecurityUtils.getSubject();//状态为“未认证”
                //构造一个用户名密码令牌
                AuthenticationToken token = new UsernamePasswordToken(mobile, password);
                try{
                        subject.login(token);
                        SysUser user = (SysUser) subject.getPrincipal();
                        session.setAttribute("loginUser", user);
                        // 用户权限列表
                        // List<SysMenu> menuList = userService.findMenuByUserId(loginUser.getId());
                        // 用户对应角色
                        SysRole userRole = userService.findSysRoleById(loginUser.getRole_id());
                        // 获取单位列表
                        
			/*
			 * List<Department> listDepartment = departmentService.listDepartment(); //
			 * 单位字符串 String departmentStr = ""; // 拼接单位字符串 for (Department department :
			 * listDepartment) { departmentStr =departmentStr +
			 * department.getDepartmentCode()+"-"+department.getDepartmentName()+"&"; }
			 */
                        // 新建cookie 
                        // session.setAttribute("cookie_department", departmentStr);
                        session.setAttribute("cookie_id", loginUser.getId());
                        session.setAttribute("cookie_logingUser", loginUser.getUserName());
                        session.setAttribute("cookie_mobile", loginUser.getMobile());
                        session.setAttribute("cookie_userDepartmentVal", loginUser.getDepartmentVal());
                        String menus = userRole.getMenuArray();
                        menus = menus.replaceAll(",", "&");
                        session.setAttribute("cookie_menu",menus);
                        String id = UUID.randomUUID().toString().replaceAll("-", "");
                        Date now = new Date();
                        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                        String logTime = simpleDateFormat.format(now);
                        os.addInfo(id,"系统登录","登录",user.getUserName(),user.getMobile(),logTime,user.getUserName()+" 登录了  系统");
                        // 设置图层默认可见性
                        resultMap.put("msg", "success");
                }catch (UnknownAccountException e) {
                        e.printStackTrace();
                        resultMap.put("msg", "fail");
                }catch (Exception e) {
                        e.printStackTrace();
                        resultMap.put("msg", "fail");
                }
		return JSON.toJSONString(resultMap);
	}
	
	
	
	
	
	/**
	 * 设置cookies
	 * 
	 * @param newCookie
	 * @param response
	 */
	private void setcookies(Cookie newCookie,HttpServletResponse response) {
		// 设置有效时间,浏览器有效路径
		newCookie.setMaxAge(24 * 60 * 60);
		newCookie.setPath("/");
		
		// 添加cookies
		response.addCookie(newCookie);
	}
	
	@RequestMapping(value = "logout",method = RequestMethod.POST)
	@ResponseBody
	public String logOut(HttpSession session,HttpServletResponse response,HttpServletRequest request){
		session.invalidate();
		Cookie[] cookies = request.getCookies();
		for (int i = 0; i < cookies.length; i++) {
			Cookie cookie = cookies[i];//这里可以不创建新的Cookie对象存数组，只是为了方便使用
			
			//将有效期设置为0秒
			cookie.setMaxAge(0);
			
			//清空cookie的值
			cookie.setValue(null);
			
			//设置保存路径
			cookie.setPath("/");//路径必须与之前设置的Cookie的路径一致
			
			//添加到响应报头
			response.addCookie(cookie);
		}
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("msg", "success");
		return JSON.toJSONString(resultMap);
	}
        @RequestMapping(value = "getGGSatelliteLayer",method = RequestMethod.GET)
        @ResponseBody
        public String getGGSatelliteLayer(){
            String URL="http://www.google.cn/maps/vt/lyrs=s@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil";
            for(int i=840;i<865;i++) {
                try {
                    String httpUrl="http://khm.google.com/kh/v="+i+"&hl=en&x=28415&y=11580&z=15&s=Galil";
                    URL url = new URL(httpUrl);
                    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                    connection.setRequestMethod("GET");
                    connection.setConnectTimeout(50);
                    connection.connect();
                    int responseCode = connection.getResponseCode();
                    connection.disconnect();
                    if(responseCode == HttpURLConnection.HTTP_OK){
                        URL="http://khm.google.com/kh/v="+i+"&hl=en&x={x}&y={y}&z={z}&s=Galil";;
                        break;
                    }
                } catch (MalformedURLException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                } catch (ProtocolException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
            return URL;
        }	
}
