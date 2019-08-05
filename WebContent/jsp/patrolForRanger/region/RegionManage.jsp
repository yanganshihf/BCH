<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>区域管理</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<%-- <script type="text/javascript"
	src="${pageContext.request.contextPath}/js/layer/layer-v3.0.3/layer/layer.js"></script> --%>
<style type="text/css">
@media ( min-width : 700px) {
	.container {
		width: 100%;
	}
}

#formDiv .form-control {
	height: 22px;
	font-size: 14px;
	padding:0 0 1px 5px;
    margin-bottom: 3px;
	width: 100px;
}

#formDiv {
	margin-bottom: 4px;
    margin-top: 5px;
}

#formDiv label {
	font-size: 14px;
	line-height: 22px;
	font-weight: normal;
	margin-bottom: 0;
}

.btn-default {
	height: 22px;
	font-size: 10px;
	padding: 0 12px;
	margin-bottom: 2px;
}

#gridPager {
	position: absolute;
	bottom: 0;
}

.row {
	width: 99%;
	margin-top: 5px;
}

.row-last {
	margin-bottom: 5px;
}

.dateTime {
	padding-top: 0px;
	padding-bottom: 0px;
	padding-left: 5px;
}

div.ui-datepicker, .ui-datepicker td {
	font-size: 14px;
}

.removeLp {
	padding-left: 0;
	padding-right: 0;
	text-align: right;
}

.removeRp {
	padding-right: 0;
}

#cond table {
	margin: 0;
}

#cond td {
	padding: 0;
}

.layui-layer-title {
	font-size: 15px;
	font-weight: 700;
}

.layui-form {
	margin: 0;
}
.layui-layer-btn .layui-layer-btn0{border-color:#058563;background-color:#058563;color:#fff}
a{
	color: #555;
}
#tabs-269204 a{
	font-size:14px;
	padding-top: 3px;
    padding-bottom: 3px;
}
.nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus{
	color: #058563;
    cursor: default;
}
.tab-content{
	/* padding-left: 10px;
    padding-right: 10px; */
    border: 1px #ddd solid;
    border-top: 0;
}
</style>
</head>
<body>
					<form class="form-inline" id="formDiv">
						<div class="form-group">
							<label for="department">&emsp;部门</label> <select id="department"
								class="form-control">
								<!-- <option>全部</option> -->
							</select>
						</div>
						<div class="form-group">
							<label for="regionNum">&emsp;责任区编号</label> <input
								class="form-control" type="text" id="regionNum" />
						</div>
						<div class="form-group">
							<label for="regionName">&emsp;责任区名称</label> <input
								class="form-control" type="text" id="regionName" />
						</div>
						<button type="button" class="btn btn-default" id="submit"
							title="查询">
							<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
						</button>
					</form>
					<div class="container" id="gridCond" style="padding-right: 0px;padding-left: 0px;">
						<table id="jqgrid"></table>
					</div>

</body>
<script type="text/javascript"
	src="/ResourceMonitor/js/myJS/patrolForRanger/region/RegionManage.js"></script>

</html>