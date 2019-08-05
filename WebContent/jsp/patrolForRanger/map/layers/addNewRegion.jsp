<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/css/bootstrap.css" />

<script
	src="${pageContext.request.contextPath}/js/jquery-2.1.4/jquery.js"
	type="text/javascript"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>

<title>Insert title here</title>
<style type="text/css">
	#cont .table{
		border:0;
		margin-bottom:0;
	}
	#cont td{
		//text-align: center;
		border:0;
	}
	.form-control {
		height: 27px;
		font-size: 15px;
		padding:0 0 1px 5px;
   		margin-bottom: 3px;
		display: inline-block;
}
</style>
</head>
<body>
	<div class="container" id="cont">
		<div class="row clearfix">
			<div class="col-md-12 column">
				<table class="table table-condensed table-bordered" style="border:0">

					<tbody>
						<tr>
							<td style="padding-top: 15px;">部门</td>
							<td><select id="department" class="form-control"></select></td>
						</tr>
						<tr>
							<td style="padding-top: 10px;">责任区名</td>
							<td><input id="regionName" class="form-control"></td>
						</tr>
						<tr>
							<td style="padding-top: 10px;">责任区编号</td>
							<td><input id="regionNum" class="form-control"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	
	<script type="text/javascript">
		// 设置部门
		// alert(cookie_department);
		// 获取单位
		var cookie_department = localStorage.getItem('cookie_department');
		cookie_department = cookie_department.substring(0,
				cookie_department.length - 1);
		// 每个单位id-名称
		eachDepart = cookie_department.split("&");
		for (var i = 1; i < eachDepart.length; i++) {
			var eachDep = eachDepart[i].split("-");
			$("#department").append(
					"<option value='" + eachDep[0] + "'>" + eachDep[1]
							+ "<oprion>")
		}
	</script>
</body>


</html>