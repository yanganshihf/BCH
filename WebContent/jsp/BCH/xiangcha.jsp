<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="JqgridInclude.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>标准地详查</title>
  <!-- layui的css -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/js/layer/layui/css/layui.css" media="all">
  <script src="${pageContext.request.contextPath}/js/layer/layui/layui.js"></script>
  <script src="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/js/bootstrap.js"></script>
  <script src="${pageContext.request.contextPath}/jsp/BCH/xiangcha.js"></script>
 <style type="text/css">
  .layui-layer-title{
    text-align: center;
    padding: 0 ;
    font-size: 1.4em;
}	
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
th.ui-th-column div{
    white-space:normal !important;
    height:auto !important;
    padding:0px;
}
/* 行政区文本框样式结束 */
.tabbable-custom .nav-tabs > li.active {
    border-top: 3px solid #00867f;
}
.nav-tabs > li > a {
    margin-right: 0px;
    border-radius: 0px 0px 0 0;
} 
/* 按钮样式 */
  </style>
</head>
	<body>
		<div class="layui-tab layui-tab-brief"  style="width: 100%;height: 100%">
		  <ul class="layui-tab-title">
		    <li class="layui-this" onclick="xiangcha">标准地详查</li>
		    <li onclick="huizongqian()">标准地汇总(防前)</li>
		    <li onclick="huizonghou()">标准地汇总(防后)</li>
		    <li onclick="huizongall()">防前防后调查表</li>
		  </ul>
		  <div class="layui-tab-content" >
		    <div class="layui-tab-item layui-show" style="margin-top: 10px"	>
		    	<span><span>市：</span> <span><select id="shi" style="width: 11%"><option>请选择--</option></select></span></span>
		    	<span style="margin-left: 0.1%"><span>县：</span><span><select id="xian" style="width: 8%"><option>请选择--</option></select></span></span>
		    	<span style="margin-left: 0.1%"><span>乡镇：</span> <span><select id="zhen" style="width: 8%"><option>请选择--</option></select></span></span>
		    	<span style="margin-left: 0.1%"><span>样地号：</span> <span><input id="yangdi" type="text" style="width: 6%"/></span></span>
		    	<span style="margin-left: 0.1%"><span><button type="button" class="layui-btn layui-btn-radius layui-btn-sm" onclick="select()"  style="width: 5%;background-color:#009688;margin-left: 2%">查询</button></span></span>
			    <span style="margin-left: 27%"><span><button type="button" class="layui-btn layui-btn-radius layui-btn-sm" onclick="shanchu()" style="width: 5%;background-color:#009688">删除</button></span></span>
			    <span style="margin-left: 0.5%"><span><button id="bzdxcExport" title="导出病害防前汇总报表" type="button" class="layui-btn layui-btn-radius layui-btn-sm"  style="width: 5%;background-color:#009688">导出</button></span></span>
		    	<div style="margin-top: 1%;width: 100%">
		    	<table id="xiangcha" ></table>
		    	<div id="page1" style="position: fixed; bottom: 0px;"></div>
		    	</div>
		    </div>
		    <div class="layui-tab-item" style="margin-top: 0.5%;" >
		    <!-- 导航区 -->  
				  <ul class="nav nav-tabs" role="tablist">  
				  <li role="presentation" class="active"><a href="#home" onclick="huizongqian()" style="width:70px;height: 40px" role="tab" data-toggle="tab">病害</a></li>    
				  <li role="presentation"><a href="#profile" onclick="chonghaiBefore()" style="width:70px;height: 40px" role="tab" data-toggle="tab">虫害</a></li>  
				  <li role="presentation"><a href="#messages" onclick="shuhaiBefore()" style="width:70px;height: 40px"  role="tab" data-toggle="tab">鼠害</a></li>   
				</ul>
				<div style="margin-top: 1%">    
		    	<span><span>市：</span> <span><select id="shiqian" style="width: 11%"><option>请选择--</option></select></span></span>
		    	<span style="margin-left: 20px"><span>县：</span><span><select id="xianqian" style="width: 8%"><option>请选择--</option></select></span></span>
		    	<span style="margin-left: 20px"><span>乡镇：</span> <span><select id="zhenqian" style="width: 8%"><option>请选择--</option></select></span></span>
		    	<span style="margin-left: 20px"><span>样地号：</span> <span><input type="text" id="yangdiqian" style="width: 70px"/></span></span>
		    	<span style="margin-left: 20px"><span><button type="button" onclick="selectAll()" class="layui-btn layui-btn-radius layui-btn-sm" style="width: 5%;background-color:#009688">查询</button></span></span>
			    <span style="margin-left: 27%"><span><button type="button" onclick="del()" class="layui-btn layui-btn-radius layui-btn-sm" style="width: 5%;background-color:#009688">删除</button> </span></span>
			    <span style="margin-left: 0.5%"><span><button id="fqbzdhzExport" title="导出病害防后汇总报表" type="button" class="layui-btn layui-btn-radius layui-btn-sm"  style="width: 5%;background-color:#009688">导出</button></span>
		    	</div>
		    	<!-- 面板区 --> 
				<div class="tab-content" >
				<div role="tabpanel" class="tab-pane active" id="home" style="width:100%;margin-top: 0.4%">
					<table id="binghai"></table>
			    	<div id="page2" style="position: fixed; bottom: 0px;"></div>
				</div>  
				  <div role="tabpanel" class="tab-pane" id="profile" style="width:100%;margin-top: 0.4%">
				  	<table id="chonghai"></table>
			    	<div id="page3" style="position: fixed; bottom: 0px;"></div>
				  </div>  
				  <div role="tabpanel" class="tab-pane" id="messages" style="width:100%;margin-top: 0.4%">
				  	<table id="shuhai"></table>
			    	<div id="page4" style="position: fixed; bottom: 0px;"></div>
				  </div>  
				</div>
		    </div>
		    <div class="layui-tab-item" style="margin-top: 0.5%">
		    	 <!-- 导航区 -->  
				  <ul class="nav nav-tabs" role="tablist">  
				  <li role="presentation" class="active"><a href="#home1" onclick="huizonghou()" style="width:70px;height: 40px" role="tab" data-toggle="tab">病害</a></li>    
				  <li role="presentation"><a href="#profile1" onclick="chonghaiLast()" style="width:70px;height: 40px" role="tab" data-toggle="tab">虫害</a></li>  
				  <li role="presentation"><a href="#messages1" onclick="shuhaiLast()" style="width:70px;height: 40px"  role="tab" data-toggle="tab">鼠害</a></li>   
				</ul>
				<div style="margin-top: 1%">
		    	<span><span>市：</span> <span><select id="shihou" style="width: 11%"><option>请选择--</option></select></span></span>
		    	<span style="margin-left: 20px"><span>县：</span><span><select id="xianhou" style="width: 8%"><option>请选择--</option></select></span></span>
		    	<span style="margin-left: 20px"><span>乡镇：</span> <span><select id="zhenhou" style="width: 8%"><option>请选择--</option></select></span></span>
		    	<span style="margin-left: 20px"><span>样地号：</span> <span><input type="text" id="yangdihou" style="width: 70px"/></span></span>
		    	<span style="margin-left: 20px"><span><button type="button" onclick="selectAll()" class="layui-btn layui-btn-radius layui-btn-sm" style="width: 5%;background-color:#009688">查询</button> </span></span>
			    <span style="margin-left: 27%"><span><button type="button" onclick="del()" class="layui-btn layui-btn-radius layui-btn-sm" style="width: 5%;background-color:#009688">删除</button></span></span>
			    <span style="margin-left: 0.5%"><span><button id="fhbzdhzExport"  type="button" class="layui-btn layui-btn-radius layui-btn-sm" style="width: 5%;background-color:#009688">导出</button></span></span>
		    	</div>
		    	<!-- 面板区 --> 
				<div class="tab-content" >
				<div role="tabpanel" class="tab-pane active" id="home1" style="width:100%;margin-top: 0.4%">
					<table id="binghai1"></table>
			    	<div id="page7" style="position: fixed; bottom: 0px;"></div>
				</div>  
				  <div role="tabpanel" class="tab-pane" id="profile1" style="width:100%;margin-top: 0.4%">
				  	<table id="chonghai2"></table>
			    	<div id="page8" style="position: fixed; bottom: 0px;"></div>
				  </div>  
				  <div role="tabpanel" class="tab-pane" id="messages1" style="width:100%;margin-top: 0.4%">
				  	<table id="shuhai3"></table>
			    	<div id="page9" style="position: fixed; bottom: 0px;"></div>
				  </div>  
				</div>
		    </div>
		    <div class="layui-tab-item" style="margin-top: 10px">
		    	<span><span>市：</span> <span><select id="shizong" style="width: 11%"><option>请选择--</option></select></span></span>
		    	<span style="margin-left: 20px"><span>县：</span><span><select id="xianzong" style="width: 8%"><option>请选择--</option></select></span></span>
		    	<span style="margin-left: 20px"><span>乡镇：</span> <span><select id="zhenzong" style="width: 8%"><option>请选择--</option></select></span></span>
		    	<span style="margin-left: 20px"><span>样地号：</span> <span><input type="text" id="yangdizong" style="width: 70px"/></span></span>
		    	<span style="margin-left: 20px"><span><button type="button" onclick="selectAll()" class="layui-btn layui-btn-radius layui-btn-sm" style="width: 5%;background-color:#009688" value="查询">查询</button></span></span>
			    <span style="margin-left: 27%"><span><button type="button" onclick="del()" class="layui-btn layui-btn-radius layui-btn-sm" style="width: 5%;background-color:#009688" value="删除">删除</button></span></span>
			    <span style="margin-left: 0.5%"><span><button id="fanqianfanhouExport" class="layui-btn layui-btn-radius layui-btn-sm" type="button" style="width: 5%;background-color:#009688" value="导出">导出</button></span></span>
		   		<div style="margin-top: 20px">
		   		<table id="fangzong"></table>
		   		<div id="page6" style="position: fixed; bottom: 0px;"></div>
		   		</div>
		    </div>
		  </div>
		</div>
	</body>
	<script  type="text/javascript" src="report.js" >  </script>
</html>