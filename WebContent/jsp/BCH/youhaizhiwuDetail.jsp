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
<title>有害植物代码详情</title>
<style>
html, body {
	height: 95%;
	width: 100%;
	margin: 0 auto;
}
input[type="text"]{
	width:78px;
}
input:-moz-placeholder,
textarea:-moz-placeholder{ /* Mozilla Firefox 4 to 18 */
font-style: italic;
color:#B8B8B8
}

input::-moz-placeholder,
textarea::-moz-placeholder { /* Mozilla Firefox 19+ */
font-style: italic;
color:#B8B8B8
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
font-style: italic;
color:#B8B8B8
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
font-style: italic;
color:#B8B8B8
}
#table .colorF2{background-color:#F2F2F2;font-weight: bold;}
#table td{text-align:center;padding:5px 0; font-size:14px;border-color:#D3D3D3}
</style>
</head>
<body>
<div style="padding:5px;">
	<table id="table" class="layui-table" lay-size="sm" style="margin:0;">
		<tbody >
			<tr>
				<td class="colorF2" style="width:80px;">有害植物代码</td>
				<td style="padding:0;width:150px;" id="code"></td>
				<td class="colorF2" style="width:80px;">有害植物名称</td>
				<td style="padding:0;width:150px;" id="name"></td>
			</tr>
			<tr>
				<td class="colorF2" style="width:80px;">拉丁名称</td>
				<td style="padding:0;width:150px;" id="ladingM"></td>
				<td class="colorF2" style="width:80px;">树种名称</td>
				<td style="padding:0;width:150px;" id="jzzwMc"></td>
			</tr>	
			<tr>
				<td class="colorF2" style="width:80px;">有害植物级别</td>
				<td style="padding:0;width:150px;" id="jiBie"></td>
				<td class="colorF2" style="width:80px;">建议</td>
				<td style="padding:0;width:150px;" id="jianYi"></td>
			</tr>																
		</tbody>
	</table>
</div>
</body>
</html>