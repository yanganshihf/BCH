<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<title>Insert title here</title>
</head>
<script src="/Patrol/js/jquery-ui-1.9.2/js/jquery-1.8.3.js"
	type="text/javascript"></script>
<script type="text/javascript">
	
	window.onbeforeunload = onbeforeunload_handler;
	window.onunload = onunload_handler;
	
	function onbeforeunload_handler() {		
		// 关闭浏览器退出登录			
		$.post("logoutService");	
	}
</script>
</html>