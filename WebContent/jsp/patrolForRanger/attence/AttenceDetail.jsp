<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>日志管理</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

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
#cond {
    margin-top:10px;
	margin-bottom: 9px;
}
#cond label{
	font-size:14px;
	line-height: 22px;
	font-weight:normal;
	margin-bottom:0;
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
    		<label for="department">&emsp;部门</label>
    		<select id="department" class="form-control">
					<!-- <option>全部</option>	 -->
			</select>
  		</div>
  		<div class="form-group" style="display:none">
    			<label for="department">&emsp;工程类别</label>
    			<select id="projectType" class="form-control"><option>全部</option>
					<option>天保</option>
					<option>生态护林员</option></select>	
  			</div>
  		<div class="form-group">
    		<label for="personName">&emsp;人员</label>
    		<input id="personName" class="form-control" />
  		</div>
  		<div class="form-group">
    		<label for="year">&emsp;年份</label>
    		<select id="year" class="form-control">
					<option value="2018">2018</option>
					<option value="2019">2019</option>
			</select>
  		</div>
  		<div class="form-group">
    		<label for="month">&emsp;月份</label>
    		<select id="month" class="form-control">
					<option value="01">1</option>
					<option value="02">2</option>
					<option value="03">3</option>
					<option value="04">4</option>
					<option value="05">5</option>
					<option value="06">6</option>
					<option value="07">7</option>
					<option value="08">8</option>
					<option value="09">9</option>
					<option value="10">10</option>
					<option value="11">11</option>
					<option value="12">12</option>
			</select>
  		</div>
  		<button type="button" class="btn btn-default" id="submit" title="查询">
			<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
		</button>
		<!-- <div class="form-group">
    		<label>&emsp;本月规定出勤天数：&emsp;<span style="color:red;font-size:16px;" id="standardday"></span>天</label>	
  		</div> -->
		<button type="button" class="btn btn-default" id="excel" style="float:right;" title="导出">
			<img src="/ResourceMonitor/images/indexpage/download.png" class="" alt="xiazai">
		</button>
	</form>
	<div class="container removeLp" id="gridCond">
		<table id="jqgrid1"></table>
	</div>
</body>

<script type="text/javascript" src="/ResourceMonitor/js/myJS/patrolForRanger/attence/AttenceDetail.js"></script>

 </html>