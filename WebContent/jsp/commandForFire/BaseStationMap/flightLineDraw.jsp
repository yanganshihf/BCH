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
			<td style="width:75px;">线路名称</td>
			<td colspan="2"><input id="name" style="width:140px;height:20px;" type="text"></td>
		</tr>
		<tr>
			<td>缩放级别</td>
			<td colspan="2">	      	 
				<select id="zoom" style="width:140px;">
		      	 	<option value="10">10</option>
		      	 	<option value="11">11</option>
					<option value="12">12</option>
					<option value="13">13</option>
					<option value="14">14</option>
					<option value="15">15</option>
					<option value="16">16</option>
		      	 </select>
	      	 </td>
		</tr>
		<tr>
			<td>飞行速度</td>
			<td><input type="range" id="speed" min="10" max="1000" value="100" style="width:75px;"/></td>
			<td><span style="margin-left:5px;width:61px;" class="layui-badge layui-bg-black" id="speedVal">100M/S</span></td>
		</tr>
	</table>
</body>
<script type="text/javascript">
$(function(){
	$("#speed").off().on("input porpertychange",function(){
		$("#speedVal").html($(this).val()+'M/S');
	})
})

</script>
</html>