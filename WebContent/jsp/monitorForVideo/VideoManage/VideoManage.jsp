<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title></title>
<%-- <script type="text/javascript"
	src="${pageContext.request.contextPath}/js/layer/layer-v3.0.3/layer/layer.js"></script> --%>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<style type="text/css">
@media ( min-width : 700px) {
	.container {
		width: 100%;
		/* padding-right: 0px;
    	padding-left: 0px; */
	}
}
html,body{
	height:100%;
}
.container {
		padding-right: 0px;
    	padding-left: 0px;
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
	<div class="container" id="cond" style="padding: 0px;float:left;">
		<div class="tabbable" id="tabs-269204">
			
			<div class="tab-content">
				<div class="tab-pane active" id="panel-851281">
					<form class="form-inline" id="formDiv">
						<div class="form-group">
							<label for="stationNum">&emsp;设备名称</label> <input id="stationNum"
								class="form-control" />
						</div>
						<button type="button" class="btn btn-default" id="submit"
							title="查询">
							<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
						</button>
						
						<div class="form-group" style="float:right">
							<label for="DisplayMode">显示模式</label> <select id="DisplayMode"
								class="form-control">
								<option>列表模式</option>
								<option>分屏模式</option>
							</select>
						</div>
					</form>
					<div class="container" id="gridCond">
						<table id="jqgrid"></table>
						<div id="gridPager"></div>
					</div>
				</div>

			</div>
		</div>
	</div>
	<div id="playWnd" class="playWnd" style="width:50%;float:left;margin-top:93px;"></div>
</body>
<script src="/ResourceMonitor/js/hikvision/jsencrypt.min.js"></script>
<script src="/ResourceMonitor/js/hikvision/jsWebControl-1.0.0.min.js"></script>
<script type="text/javascript"
	src="/ResourceMonitor/js/myJS/monitorForVideo/VideoManage/VideoManage.js"></script>
<script type="text/javascript"
	src="/ResourceMonitor/js/myJS/monitorForVideo/VideoManage/previewPlugin.js"></script>
</html>