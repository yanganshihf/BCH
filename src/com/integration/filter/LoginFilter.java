package com.integration.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
public class LoginFilter implements Filter {
	 
    @Override
    public void destroy() {
 
    }
 
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res; 
        // 登录页不过滤
 		String path=request.getRequestURI();
 		if (path.indexOf("/login.jsp") == -1) {
 			// 当非登录访问时
 			String cookie_logingUser = "";
 			Cookie[] cookies = request.getCookies();
 			if (cookies == null) {
 				response.sendRedirect("/ResourceMonitor/login.jsp");
 			}else {
 				for (Cookie cookie : cookies) {
 					if (cookie.getName().equals("cookie_logingUser")) {
 						cookie_logingUser = cookie.getValue();
 						// 调用后才能访问目标资源
 						chain.doFilter(request, response);
 					}
 				}
 				if (cookie_logingUser == "") {
 					response.sendRedirect("/ResourceMonitor/login.jsp");
 				}
 			}
 		}else {
 			// 当登陆访问时
 			chain.doFilter(request, response);
 		}
 		
    }
    
    @Override
    public void init(FilterConfig arg0) throws ServletException {
       //  System.out.println("First Filter init()");
    }
    
}