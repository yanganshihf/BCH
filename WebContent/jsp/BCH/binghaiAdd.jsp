<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>添加病害代码</title>
<style>
html, body {
	height: 95%;
	width: 100%;
	margin: 0 auto;
}
#table .colorF2{background-color:#F2F2F2;font-weight: bold;}
</style>
</head>
<body>
<div style="padding:5px;">
	<table id="table" class="layui-table" lay-size="sm" style="margin:0;">
		<tbody >
			<tr>
				<td class="colorF2" style="width:60px;">病害代码</td>
				<td style="padding:0;width:150px;">
					<input id="code" type="text" class="form-control">
				</td>
			</tr>
			<tr>
				<td class="colorF2">病害名称</td>
				<td style="padding:0;width:150px;">
					<input id="name" type="text" class="form-control">
				</td>
			</tr>
			<tr>
				<td class="colorF2">拉丁名称</td>
				<td style="padding:0;width:150px;">
					<input id="ladingM" type="text" class="form-control">
				</td>
			</tr>	
			<tr>
				<td class="colorF2">树种名称</td>
				<td style="padding:0;width:150px;">
					<input id="jzzwMc" type="text" class="form-control">
				</td>
			</tr>			
			<tr>
				<td class="colorF2">病害级别</td>
				<td style="padding:0;width:150px;">
					<input id="jiBie" type="text" class="form-control">
				</td>
			</tr>		
			<tr>
				<td class="colorF2">建议</td>
				<td style="padding:0;width:150px;">
					<input id="jianYi" type="text" class="form-control">
				</td>
			</tr>															
		</tbody>
	</table>
</div>
</body>
</html>