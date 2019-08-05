<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>实时监控</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<style type="text/css">

#gridCond table {
	margin: 0;
}

#gridCond td {
	padding-left: 0;
	padding-right: 0;
	padding-bottom: 0;
}

.formDiv .form-control {
	height: 22px;
	font-size: 14px;
	padding:0 0 1px 5px;
    margin-bottom: 3px;
	width: 55%;
	display: inline-block;
}

.formDiv label {
	font-size: 14px;
	line-height: 22px;
	font-weight: normal;
	margin-bottom: 0;
}

.btn-default {
	height: 22px;
	font-size: 14px;
	padding: 0 12px;
}

.form-group {
	margin-bottom: 5px;
}

.layui-form {
	margin: 0;
}
a{
	color: #555;
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
<body style="background: transparent;">
<div class="container-fluid" id="cond" style="padding: 0px;">
	<form class="form-inline formDiv" id="formDiv5" style="margin-top: 10px;">
		<div class="form-group">
			<label for="department">&emsp;部&emsp;门</label>
			<select id="department" class="form-control">
			</select>
		</div>
		<div class="form-group">
			<label for="personName">&emsp;人&emsp;员</label>
			<input id="personName" class="form-control" />	
		</div>
		<div class="form-group">
			<label for="mobile">&emsp;电&emsp;话</label>
			<input id="mobile" class="form-control" />
			<button type="button" class="btn btn-default" id="submit" title="查询" style="float: right; margin-right: 15px;">
				<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
			</button>	
		</div>
		<div class="form-group" style="display:none">
			<label for="projectType">&emsp;工程类别</label>
			<select id="projectType" class="form-control">
				<option>全部</option>
			</select> 
		</div>
	</form>	
	<div class="container" id="gridCond" style="padding-left:5px;padding-right:5px;">
		<table style="width: 100%;" id="title">
			<thead>
				<tr style="width: 100%; height: 38px; background-color: #E6E6E6;">
					<th style="width: 40%; text-align: center; color: #058563;">姓名</th>
					<th style="width: 30%; text-align: center; color: #058563;">人员信息</th>
					<th style="width: 30%; text-align: center; color: #058563;">定位</th>
				</tr>
			</thead>
		</table>
		<table id="jqgrid" lay-filter="test"></table>
	</div>	
</div>				
</body>

<script type="text/javascript"
	src="/ResourceMonitor/js/myJS/patrolForRanger/realtime/shishijiankong.js"></script>
</html>