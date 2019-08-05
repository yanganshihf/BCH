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
@media (min-width: 700px){
	.container {
    	width: 100%;
	}
}
#formDiv .form-control {
	height: 22px;
	font-size: 10px;
	padding-top: 0px;
	padding-bottom: 0px;
	width:100px;
}
#formDiv {
	margin-bottom: 5px;
    margin-top: 5px;
}
#formDiv label{
	font-weight:normal;
}
.btn-default {
	height: 22px;
	font-size: 10px;
	padding: 0 12px;
	margin-top: 5px;
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
	text-align:right;
}
.removeRp{
	padding-right:0;
}
#cond table{
	margin:0;
}
#cond td{
	padding-left:0;
	padding-right:0;
	padding-bottom:0;
}
</style>
</head>
<body>
	<div class="container" id="cond">
		
		
	</div> 
	<div class="container" id="gridCond">
	<label style="margin-top:10px">&emsp;预警列表</label>
		<button type="button" class="btn btn-default" id="excel" style="float: right;" title="导出">
			<img src="/ResourceMonitor/images/indexpage/download.png" class="" alt="xiazai">
		</button>
		<table id="jqgrid"></table>
		
	</div>
	<div style = "display: none;">
		<input type="text" id="sosId">
	</div>
</body>

<script type="text/javascript" src="/ResourceMonitor/js/myJS/patrolForRanger/map/m_map/layers/warningAttence.js"></script>

</html>