<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ include file="JqgridInclude.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>有害生物普查</title>
  <!-- layui的css -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/js/layer/layui/css/layui.css" media="all">
  <!-- jQuery -->
    <script src="${pageContext.request.contextPath}js/jquery-2.1.4/jquery.min.js"></script>
  <script src="${pageContext.request.contextPath}/js/layer/layui/layui.js"></script>
 <style type="text/css">
 /* 修改table表格样式  */
.ui-state-default, .ui-widget-content .ui-state-default,
	.ui-widget-header .ui-state-default {
	background: #ececec !important;
	text-align: center;
	vertical-align: middle;
	border: 1px #aaa solid;
	font-size: 14px;
	padding-bottom: 2px;
	color: #00867F;
}
.ui-jqgrid .ui-jqgrid-htable th div {
	height: 20px;
}

.ui-jqgrid .ui-jqgrid-htable {
   table-layout: auto;
   margin: 0em;
}

.ui-jqgrid .ui-jqgrid-btable {
   table-layout: auto;
   margin: 0em;
   outline-style: none;
}
.ui-jqgrid tr.ui-row-ltr td {
	text-align: center !important;
	padding: 5px;
	font-size: 14px;
	border: 1px #aaa solid;
}
.ui-jqgrid td.jqgrid-rownum {
	background-color: #fff !important;
}

.ui-jqgrid .ui-pg-input {
	height: 18px !important;
	font-size: 13px;
}

.ui-jqgrid .ui-pg-selbox {
	font-size: 13px;
}

.ui-state-disabled, .ui-widget-content .ui-state-disabled,
	.ui-widget-header .ui-state-disabled {
	opacity: 2;
}

 .ui-jqgrid .ui-paging-info {
	margin-top: 0px;
	margin-right: 10px;
} 
#gridPager {
	position: absolute;
	bottom: 0;
}

#gridPager {
	font-size: 14px;
	color: #000;
	bottom: 0;
}
/* 修改table表格样式结束  */
/* 行政区文本框样式 */
.combo-text {
	font-size: 14px;
	border: 0px;
	line-height: 20px;
	height: 20px;
	margin: 0;
	padding: 0px 2px;
	display: inline-block;
}

.form-control[readonly] {
	background-color: #fff;
	opacity: 1;
	padding: 10px;
}

.tabcontent {
	color: #00867F;
	font-size: 16px;
	font-weight: bold;
	border-right: dotted 2px #cbd1dc;;
	margin-top: 5px;
	margin-bottom: 5px;
	background-color: #ECECEC;
	height: 37px;
	text-align: center;
	line-height: 38px;
}

.combo-arrow {
	width: 18px;
	height: 20px;
	overflow: hidden;
	display: inline-block;
	vertical-align: top;
	cursor: pointer;
	opacity: 0.6;
	filter: alpha(opacity = 60);
	background: url('../../js/zTreeStyle/img/combo_arrow.png') no-repeat
		center center;
	background-color: #E0ECFF;
}

.ztree li span.button {
	background: url("../../js/zTreeStyle/img/zTreeStandard.png");
	*background-image: url("js/zTreeStyle/img/zTreeStandard.gif")
}

.combo {
	border-color: #95B8E7;
	background-color: #ffffff;
	display: inline-block;
	white-space: nowrap;
	margin: 0;
	padding: 0;
	border-width: 1px;
	border-style: solid;
	overflow: hidden;
	vertical-align: middle;
	border-radius: 4px;
	border: 1px solid #ccc;
	margin-left: 10px;
	margin-right: 30px;
}
.ztree {
	margin-top: 0px;
	border: 1px solid #617775;
	background: #f0f6e4;
	height: 260px;
	overflow-y: auto;
	min-width: 132px;
}
/* 行政区文本框样式结束 */
.tabbable-custom .nav-tabs > li.active {
    border-top: 3px solid #00867f;
}
.nav-tabs > li > a {
    margin-right: 0px;
    border-radius: 0px 0px 0 0;
} 
li{
	font-weight: bold;
}
span{
	font-weight: bold;
}
/* jqgrid的表头换行 */
th.ui-th-column div{
    white-space:normal !important;
    height:auto !important;
    padding:0px;
}
.layui-layer-title{
    text-align: center;
    padding: 0 ;
    font-size: 1.4em;
}
label {
	font-weight: bold;
}
  </style>
</head>
<body>
  <!-- 第一行 -->
  <div class="layui-form-item">
    <label class="layui-form-label" style="width: 100px;">县&nbsp;名&nbsp;称</label>
    <div class="layui-input-inline" style="width:7%;">
      <input  name="text" required lay-verify="required" readonly="readonly" id="shxianmc" autocomplete="off" class="layui-input">
    </div>
     <label class="layui-form-label">县&nbsp;代&nbsp;码</label>
    <div class="layui-input-inline" style="width:7%;">
      <input  name="text" required lay-verify="required" readonly="readonly" id="shxcode"  autocomplete="off" class="layui-input">
    </div>
     <label class="layui-form-label" style="width: 100px;">乡镇名称</label>
    <div class="layui-input-inline" style="width:7%;">
      <input  name="text" required lay-verify="required" readonly="readonly" id="shxzmc"  autocomplete="off" class="layui-input">
    </div>
     <label class="layui-form-label" style="width: 100px;">乡镇代码</label>
    <div class="layui-input-inline" style="width:7%;">
      <input  name="text" required lay-verify="required" readonly="readonly" id="shxzcode" autocomplete="off" class="layui-input">
    </div>
     <label class="layui-form-label" style="width: 100px;">林分类型</label>
    <div class="layui-input-inline" style="width:7%;">
      <input  name="text" required lay-verify="required" readonly="readonly" id="shlflx" autocomplete="off" class="layui-input">
    </div>
    <label class="layui-form-label" style="width: 100px;">林分面积</label>
    <div class="layui-input-inline" style="width:7%;">
      <input  name="text" required lay-verify="required" readonly="readonly" id="shlflmj" autocomplete="off" class="layui-input">
    </div>
  </div>
  <!-- 第二行 -->
  <div class="layui-form-item">
    <label class="layui-form-label" style="width: 100px;">主要树种</label>
    <div class="layui-input-inline" style="width:7%;">
      <input  name="text" required lay-verify="required" readonly="readonly" id="shzysz"  autocomplete="off" class="layui-input">
    </div>
    <label class="layui-form-label" style="width: 100px; margin-left: -20px">经&emsp;&emsp;度</label>
    <div class="layui-input-inline" style="width:7%;">
      <input  name="text" required lay-verify="required" readonly="readonly"  id="shjd" autocomplete="off" class="layui-input">
    </div>
     <label class="layui-form-label" style="margin-left: 1.5%">纬&emsp;&nbsp;度</label>
    <div class="layui-input-inline" style="width:7%;">
      <input  name="text" required lay-verify="required" readonly="readonly" id="shwd" autocomplete="off" class="layui-input">
    </div>
     <label class="layui-form-label" style="width: 100px;">海&emsp;&emsp;拔</label>
    <div class="layui-input-inline" style="width:7%;">
      <input  name="text" required lay-verify="required" readonly="readonly" id="shhb" autocomplete="off" class="layui-input">
    </div>
     <label class="layui-form-label" style="width: 100px;">种苗来源</label>
    <div class="layui-input-inline" style="width:7%;">
      <input  name="text" required lay-verify="required" readonly="readonly" id="shzmly" autocomplete="off" class="layui-input">
    </div>
     <label class="layui-form-label" style="width: 100px;">植被类型</label>
    <div class="layui-input-inline" style="width:7%;">
      <input  name="text" required lay-verify="required" readonly="readonly" id="shzblx" autocomplete="off" class="layui-input">
    </div>
  </div>
  <!-- 第三行 -->
   <div class="layui-form-item">
    <label class="layui-form-label" style="width: 110px;">平均树高(m)</label>
    <div class="layui-input-inline" style="width:7%;">
      <input  name="text" required lay-verify="required" readonly="readonly" id="shpjsg" autocomplete="off" class="layui-input">
    </div>
    <label class="layui-form-label" style="width: 120px;">有害生物名称</label>
    <div class="layui-input-inline" style="width:7%;">	
      <input  name="text" required lay-verify="required" readonly="readonly" id="shswmc" autocomplete="off" class="layui-input">
    </div>
     <label class="layui-form-label">郁闭度</label>
    <div class="layui-input-inline" style="width:7%;">
      <input  name="text" required lay-verify="required" readonly="readonly" id="shybd" autocomplete="off" class="layui-input">
    </div>
     <label class="layui-form-label" style="width: 170px;">主要寄生树种的树龄</label>
    <div class="layui-input-inline" style="width:7%;">
      <input  name="text" required lay-verify="required" readonly="readonly" id="shjsnl" autocomplete="off" class="layui-input">
    </div>
     <label class="layui-form-label" style="width: 100px; margin-left:4%">林分组成</label>
    <div class="layui-input-inline" style="width:7%;">
      <input  name="text" required lay-verify="required" readonly="readonly" id="shlfzc" autocomplete="off" class="layui-input">
    </div>
  </div>
  <div style="margin-top: 20px;margin-left: -6px">
	<table id="shyd" style="width: 100%;"></table>
	<div id="shydpage" style="position: fixed; bottom: 0px;"></div>
  </div>
</body>
<!-- 自定义js -->
<script  type="text/javascript" src="pcshuhai.js" >
  </script> 
</html>