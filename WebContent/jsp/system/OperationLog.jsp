<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<head>
<title>系统管理</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%-- <script type="text/javascript"
	src="${pageContext.request.contextPath}/js/layer/layer-v3.0.3/layer/layer.js"></script> --%>
<style type="text/css">
@media (min-width: 700px){
	.container {
    	width: 100%;
	}
}
#cond .form-control {
	height: 22px;
	font-size: 14px;
	padding:0 0 1px 5px;
    margin-bottom: 3px;
	width:100px;
}
#cond {
	margin-top: 10px;
	margin-bottom: 9px;
}
#cond label{
	font-size:14px;
	line-height: 22px;
	font-weight:normal;
	margin-bottom:0;
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
 font-size:10px;
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
}
.layui-layer-btn .layui-layer-btn0{border-color:#058563;background-color:#058563;color:#fff}
</style>
</head>
<body>
	<form class="form-inline" id="cond">
		<div class="form-group">
    		<label for="ModuleType">&emsp;操作单元</label>
    		<select id="ModuleType" class="form-control">
				<option>全部</option>	
				<option>系统登录</option>	
				<option>上报信息</option>	
				<option>上传下达</option>	
				<option>区域管理</option>	
				<option>护林员管理</option>
				<option>系统管理</option>
			</select>	
  		</div>
  		<div class="form-group">
    		<label for="OperationType">&emsp;操作类型</label>
    		<select id="OperationType" class="form-control">
					<option>全部</option>
					<option>登录</option>
					<option>新增</option>
					<option>修改</option>
					<option>删除</option>
					<option>下发</option>
					<option>冻结</option>
					<option>解冻</option>
			</select>
  		</div>
  		<div class="form-group">
    		<label for="logUser">&emsp;操作人员</label>
    		<input id="logUser" class="form-control" />
  		</div>
  		<div class="form-group">
    		<label for="logMobile">&emsp;人员电话</label>
    		<input id="logMobile" class="form-control" />
  		</div>
  		<button type="button" class="btn btn-default" id="submit" title="查询">
			<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
		</button>
		<button type="button" class="btn btn-default" id="excel" style="float: right;" title="导出">
			<img src="/ResourceMonitor/images/indexpage/download.png" class="" alt="xiazai">
		</button>
	</form>
	<div class="container removeLp" id="jqgridCont">
		<table id="jqgrid"></table>
		<div id="gridPager"></div>
	</div>
</body>
	<script type="text/javascript" src="/ResourceMonitor/js/myJS/system/OperationLog.js"></script>
</html>