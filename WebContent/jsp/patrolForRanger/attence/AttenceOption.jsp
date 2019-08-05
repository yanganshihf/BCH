<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>考勤设置</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%-- <script type="text/javascript"
	src="${pageContext.request.contextPath}/js/layer/layer-v3.0.3/layer/layer.js"></script> --%>

<style type="text/css">
@media (min-width: 700px){
	.container {
    	width: 100%;
	}
}
.form-control {
	height: 22px;
	font-size: 14px;
	padding-top: 0px;
	padding-bottom: 0px;
}

.btn-default {
	height: 22px;
	font-size: 14px;
	padding: 0 12px;
}

#gridPager {
	position: absolute;
	bottom: 0;
}
.row{
	width: 99%;
	margin-top: 5px;
}
.row-last{
	margin-bottom: 5px;
}
.dateTime{
	padding-top: 0px;
	padding-bottom: 0px;
	padding-left: 5px;
}
div.ui-datepicker, .ui-datepicker td{
 font-size:14px;
}
.removeLp{
	padding-left:0;
	padding-right:0;
}
.removeRp{
	padding-right:0;
}
.layui-layer-title {
	font-size: 15px;
	font-weight: 700;
}
.layui-form{
	margin:0;
	margin-top:5px;
}
.layui-layer-btn .layui-layer-btn0{border-color:#058563;background-color:#058563;color:#fff}
</style>
</head>
<body>
	<div style="height:27px;margin-top:5px;"><h5 style="line-height:27px;font-size:15px;float:left;margin:0;"><strong>更改记录</strong></h5>
	<button type="button" class="btn btn-default" onclick="setStandardDay()" style="float:right;" title="设置">
		<img src="/ResourceMonitor/images/indexpage/setting.png" class="" alt="设置">
	</button></div>
	<div class="container removeLp" id="gridCond">
		<table id="jqgrid2"></table>
	</div>
</body>

<script type="text/javascript" src="/ResourceMonitor/js/myJS/patrolForRanger/attence/AttenceOption.js"></script>

</html>