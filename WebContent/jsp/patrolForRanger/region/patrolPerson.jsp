<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>人员管理</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<style type="text/css">
@media (min-width: 700px){
	.container {
    	width: 100%;
	}
}
.form-control{
	height: 27px;
	font-size: 15px;
	padding-top: 0px;
	padding-bottom: 0px;
}
#formDiv .form-control{
	width:100px;
}
#formDiv1 .form-control{
	width:600px;
	background-color:transparent;
}
#formDiv ,#formDiv1 {
	margin-bottom: 5px;
    margin-top: 5px;
}
#formDiv label,#formDiv1 label{
	font-size:15px;
	line-height: 27px;
	font-weight:normal;
	margin-bottom:0;
}
.btn-default {
	height: 27px;
	font-size: 15px;
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
</style>
</head>
<body>
	<form class="form-inline" id="formDiv">
  		<div class="form-group">
    		<label for="personName">&emsp;姓&emsp;&emsp;名</label>
    		<input id="personName" class="form-control" />
  		</div>
  		<div class="form-group">
    		<label for="mobile">&emsp;电&emsp;&emsp;话</label>
    		<input id="mobile" class="form-control" />
  		</div>
  		<button type="button" class="btn btn-default" id="submit" title="查询">
			<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
		</button>
	</form>
	<form class="form-inline" id="formDiv1">
		<div class="form-group">
			<label for="personSelected">&emsp;选中人员</label>
			<input type="hidden" id="department">
			<input type="hidden" id="id">
			<input id="personSelected" class="form-control" readonly />
			<input id="mobileSelected" class="form-control" style="display: none;"/>
			<input id="regionName" class="form-control" style="display: none;"/>
		</div>
		<button type="button" class="btn btn-default" id="allSelect" title="全选">
			<img src="/ResourceMonitor/images/indexpage/allSelect.png" class="" alt="全选">
		</button>
		<button style="display:none" type="button" class="btn btn-default" id="noSelect" title="取消全选">
			<img src="/ResourceMonitor/images/indexpage/noSelect.png" class="" alt="取消全选">
		</button>
		<button type="button" class="btn btn-default" id="push" title="下发">
			<img src="/ResourceMonitor/images/indexpage/Issued.png" class="" alt="下发">
		</button>
	</form>
	<!-- <div class="container" id="cond">
		<div class="row">
			<div class="col-xs-2 column">选中人员</div>
			<div class="col-xs-9 column">
			</div>
			<div class="col-xs-1 column">
			</div>
		</div>
	</div> -->
	<div class="container"  id="gridCond">
		<table id="jqgrid"></table>
		<div id="gridPager"></div>
	</div>
</body>

<script type="text/javascript" src="/ResourceMonitor/js/myJS/patrolForRanger/region/patrolPerson.js"></script>

</html>