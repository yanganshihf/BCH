package com.integration.util;

/**
  * 参数工具类
 * 
 * @author Administrator
 *
 */
public class ParameUtil {
	/**
	    * 校验参数
	    * 
	    * @param param
	    * @return
	    */
	   public static String checkParam(String param) {
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
	   public static String blur(String param) {
	       if (!"".equals(param)) {
	           param = param + '%';
	       }
	       return param;
	   }
	   
	   
	   public static String setParma(String param) {
		   param = "'"+param+"'";
	       return param;
	   }
	 
}
