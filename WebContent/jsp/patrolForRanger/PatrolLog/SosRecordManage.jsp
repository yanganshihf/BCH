<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>SOS管理</title>
<%-- <script type="text/javascript"
	src="${pageContext.request.contextPath}/js/layer/layer-v3.0.3/layer/layer.js"></script> --%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<style type="text/css">
@media ( min-width : 700px) {
	.container {
		width: 100%;
		padding-left:0px;
		padding-right:0px;
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
	margin-top:10px;
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
	margin-bottom: 3px;
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
.layui-layer-title {
	font-size: 15px;
	font-weight: 700;
}
.layui-form{
	margin:0;
}
.layui-layer-btn .layui-layer-btn0{border-color:#058563;background-color:#058563;color:#fff}
</style>
</head>
<body>
	<div class="container" id="cond" style="padding: 0px;">
		<div class="tabbable" id="tabs-269204">
			
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
							<label for="personName">&emsp;人员</label> <input id="personName"
								class="form-control" />
						</div>
						<div class="form-group">
							<label for="startDatePicker">&emsp;开始日期</label> <input
								class="form-control dateTime" type="text" readonly="readonly" style="background-color: #fff;"
								id="startDatePicker" />
						</div>
						<div class="form-group">
							<label for="endDatePicker">&emsp;结束日期</label> <input
								class="form-control dateTime" type="text" readonly="readonly" style="background-color: #fff;"
								id="endDatePicker" />
						</div>
						<div class="form-group">
							<label for="readState">&emsp;状态</label> <select id="readState"
								class="form-control" style="width: 70px; padding-left: 3px;">
								<option value=5>全部</option>
								<option value=0>未受理</option>
								<option value=1>已受理</option>
							</select>
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
					</form>
					<div class="container" id="gridCond">
						<table id="jqgrid"></table>
					</div>
				</div>
			</div>
		</div> 
	</div>

	<div style="display: none;">
		<input type="text" id="sosId">
	</div>
</body>
<!-- <script type="text/javascript"> 
var logMobile = unescape(document.cookie.split("cookie_mobile=")[1].split(";")[0]);
</script>
<script type="text/html" id="checkboxTpl">
  <input type="checkbox" name="lock" value="{{d.id}}" title="已读" lay-filter="lockDemo" {{ d.readedPersons.indexOf(logMobile) > -1 ? 'checked' : '' }}>
</script> -->
<script type="text/javascript">
$(function(){
	var menus=localStorage.getItem('cookie_menu');
	if(menus.indexOf("SOS导出") == -1){
		$("#excel").css("display","none");
	}
})
</script>
<script type="text/javascript"
	src="/ResourceMonitor/js/myJS/patrolForRanger/PatrolLog/SosRecordManage.js"></script>

</html>