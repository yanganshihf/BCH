<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>考勤设置</title>
<style>


html, body {
	height: 100%;
	width: 100%;
	margin: 0 auto;
}
#standardDay {
	height: 22px;
	font-size: 14px;
	padding-top: 0px;
	padding-bottom: 0px;
	width:100px;
}
span {
	margin-left: 20px;
}
</style>
</head>
<body>
	<div>
		<table
			style="width: 100%; height: 100%; font-size: 12px; line-height: 30px; text-align: left;">
			<tbody>
				<tr style="line-height: 10px;">
					<td colspan="2">&nbsp;</td>
				</tr>
				<tr>
					<td style="width: 150px"><span style="font-size:15px;">规定每月出勤</span></td>
					<td><input class="form-control" type="text" id="standardDay" maxlength="2" /></td>
				</tr>
				<tr>
					<td colspan="2"><span style="color: #058563;font-size:15px;">请输入1-31间数字，本设置次月生效!</span></td>
				</tr>
			</tbody>
		</table>
	</div>
</body>

</html>