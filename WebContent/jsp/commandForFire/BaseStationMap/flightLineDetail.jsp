<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/css/bootstrap.css" />
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/js/layer/layui/css/layui.css" />
<script
	src="${pageContext.request.contextPath}/js/jquery-2.1.4/jquery.js"
	type="text/javascript"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/layer/layer-v3.0.3/layer/layer.js"></script>
<title>Insert title here</title>
<style>
</style>
</head>
<body>
	<table style="line-height:40px;margin:15px;">
		<tr>
			<td style="width:90px;">线路名称</td>
			<td ><input id="name" style="width:140px;height:20px;" type="text" disabled="disabled"></td>
		</tr>
		<tr>
			<td>缩放级别</td>
			<td colspan="2">	
				<input id="zoom" style="width:140px;height:20px;" type="text" disabled="disabled">      	 
	      	 </td>
		</tr>
		<tr>
			<td>飞行速度</td>
			<td><input id="speed" style="width:140px;height:20px;" type="text" disabled="disabled"/></td>
		</tr>
		<tr>
			<td>设计时间</td>
			<td ><input id="time" style="width:140px;height:20px;" type="text" disabled="disabled"/></td>
		</tr>
	</table>
</body>

</html>