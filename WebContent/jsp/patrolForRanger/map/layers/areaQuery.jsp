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
<style>
.column {
	margin: 3px;
}

.form-control {
	margin-right: 15px;
}

.clearfix {
	margin-top: 10px;
}
</style>
</head>

<body
	style="height: 125px; width: 300px; margin-left: 5px; overflow-y: hidden; overflow-x: hidden;">
	<div class="row clearfix">
		<div class="col-xs-12 column">
			<select id="department" style="float: right; width: 210px;" class="form-control"></select><span
				style="float: right; margin-top: 5px; margin-right: 5px;"><strong>管护单位</strong></span>
		</div>

		<div class="col-xs-12 column">
			<input style="float: right; width: 210px" class="form-control" /><span
				style="float: right; margin-top: 5px; margin-right: 5px;"><strong>人员姓名</strong></span>
		</div>

		<div class="col-xs-12 column">
			<input style="float: right; width: 210px" class="form-control" readonly="readonly"/><span
				style="float: right; margin-top: 5px; margin-right: 5px;"><strong>管护面积</strong></span>
		</div>
	</div>
</body>
<script type="text/javascript">
	//设置部门
	// 获取单位
	var cookie_department = localStorage.getItem('cookie_department');
	cookie_department = cookie_department.substring(0,
			cookie_department.length - 1);
	// 每个单位id-名称
	var eachDepart = cookie_department.split("&");
	// 遍历
	for (var i = 0; i < eachDepart.length; i++) {
		var eachDep = eachDepart[i].split("-");
		// 添加选项 department为select的id
		$("#department")
				.append(
						"<option value='" + eachDep[0] + "'>" + eachDep[1]
								+ "<oprion>")
	}
</script>
</html>