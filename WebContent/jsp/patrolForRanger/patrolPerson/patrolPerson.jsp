<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<html lang="cn">
<head>
<title>人员管理</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

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
	margin-bottom: 9px;
}

#formDiv label {
	font-size: 14px;
	line-height: 22px;
	font-weight: normal;
	margin-bottom: 0;
}

.btn-default {
	height: 22px;
	font-size: 14px;
	padding: 0 12px;
	margin-bottom: 2px;
}

#gridPager {
	position: absolute;
	bottom: 0;
}

.dateTime {
	padding-top: 0px;
	padding-bottom: 0px;
	padding-left: 5px;
}

div.ui-datepicker, .ui-datepicker td {
	font-size: 10px;
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
.layui-form{
	margin:0;
}
.layui-layer-title {
	font-size: 15px;
	font-weight: 700;
}
.layui-layer-btn .layui-layer-btn0{border-color:#058563;background-color:#058563;color:#fff}
a{
	color: #555;
}
#tabs-269204 a{
	font-size:14px;
	padding-top:3px;
	padding-bottom:3px;
}
.nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus{
	color: #058563;
    cursor: default;
}
.tab-content{
	padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    border: 1px #ddd solid;
    border-top: 0;
}
@("@")page 
{
        size:  auto;   /* auto is the initial value */
        margin:0;  /* this affects the margin in the printer settings */
} 
</style>

</head>
<body>
	<div class="container" id="cond" style="padding: 0px;">
		<div class="tabbable" id="tabs-269204">
			<ul class="nav nav-tabs" style="padding-top:6px;background-color:#f0f0f0;">
				<li class="active"><a href="#panel-851281" data-toggle="tab"><strong style="font-size:14px;font-weight:700;">人员管理</strong></a>
				</li>
			</ul>
			<div class="tab-content">
				<div class="tab-pane active" id="panel-851281">
					<form class="form-inline" id="formDiv">
						<div class="form-group">
							<label for="department">&emsp;部门</label> <select id="department"
								class="form-control">
								<!-- <option>全部</option> -->
							</select>
						</div>
						<div class="form-group" style="display:none">
							<label for="department">&emsp;工程类别</label> <select
								id="projectType" class="form-control"><option>全部</option>
								<option>天保</option>
								<option>生态护林员</option></select>
						</div>
						<div class="form-group">
							<label for="personName">&emsp;姓名</label> <input id="personName"
								class="form-control" />
						</div>
						<div class="form-group">
							<label for="mobile">&emsp;电话</label> <input id="mobile"
								class="form-control" />
						</div>
						<button type="button" class="btn btn-default" id="submit"
							title="查询">
							<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
						</button>
						<button type="button" class="btn btn-default" id="excel"
							style="float: right;" title="导出">
							<img src="/ResourceMonitor/images/indexpage/download.png" class=""
								alt="xiazai">
						</button>
							<button type="button" class="btn btn-default" id="addNew"
								style="float: right; margin-right: 5px;" title="添加护林员">
								<img src="/ResourceMonitor/images/indexpage/Add_person.png" class=""
									alt="添加护林员">
							</button>
							<button type="button" class="btn btn-default" id="send"
							title="请勿点击">
							<img src="/ResourceMonitor/images/indexpage/send.png" class="" alt="rk">
						</button>
					</form>
					<div class="container" id="gridCond" style="padding:0">
						<table id="jqgrid"></table>
						<div id="gridPager"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
$(function(){
	var menus=localStorage.getItem('cookie_menu');
	if(menus.indexOf("添加护林员") == -1){
		$("#addNew").css("display","none");
	}
	var cookie_mobile = localStorage.getItem('cookie_mobile');
	if(cookie_mobile != "18392679492"){
		$("#send").css("display","none");
	}
})
</script>
<script type="text/javascript"
	src="/ResourceMonitor/js/myJS/patrolForRanger/patrolPerson/patrolPerson.js"></script>

</html>