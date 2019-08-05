<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/css/bootstrap.css" />
<script
	src="${pageContext.request.contextPath}/js/jquery-2.1.4/jquery.min.js"
	type="text/javascript"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
<title>Insert title here</title>
<style type="text/css">
	td{
		text-align: center;
	}
</style>
</head>
<body>
				<table class="table table-bordered table-condensed" style="margin:5px; width:218px">
					<tbody>
						<tr>
							<td style="padding-top: 40px;">照片</td>
							<td >
								<img id="identifyPhoto" style="width: 71px;height: 99px;" src="/ResourceMonitor/IdentifyPhoto/NoPeoplePhoto.png">
							</td>
						</tr>
						<tr>
							<td>部门</td>
							<td id="department"></td>
						</tr>
						<tr>
							<td>姓名</td>
							<td id="personName"></td>
						</tr>
						<tr>
							<td>性别</td>
							<td id="personSex"></td>
						</tr>
						<tr>
							<td>电话</td>
							<td id="mobile"></td>
						</tr>
						<tr>
							<td>聘用日期</td>
							<td id="employDate"></td>
						</tr>
						<tr>
							<td>经度</td>
							<td id="longitude"></td>
						</tr>
						<tr>
							<td>纬度</td>
							<td id="latitude"></td>
						</tr>
						<tr>
							<td>x坐标</td>
							<td id="xCoor"></td>
						</tr>
						<tr>
							<td>y坐标</td>
							<td id="yCoor"></td>
						</tr>
					</tbody>
				</table>
</body>
</html>