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
.layui-layer-title{
    text-align: center;
    padding: 0 ;
    font-size: 1.4em;
}
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
  </style>
</head>
	<body>
		<div class="layui-tab layui-tab-brief">
		  <ul class="layui-tab-title">
		    <li class="layui-this" id="tcjlb">踏查记录表</li>
<!-- 		    <li id="bzddcb">标准地调查表</li> -->
		    <li id="youchongdeng">诱虫灯&nbsp;&nbsp;引诱剂调查</li>
		    <li id="zhongshigp">种实&nbsp;果品&nbsp;花卉&nbsp;木材</li>
		  	<li id="miaopuhecha">苗圃查询</li>
		  	<li id="jianyixiang">检疫性有害生物</li>
		  </ul>
		  <div class="layui-tab-content" >
		  <!-- 踏查记录表 -->
		     <div class="layui-tab-item layui-show">
		    	<span><span>市</span> <span><select id="tc_shi" style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>县</span> <span><select id="tc_xian" style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>乡镇</span> <span><select id="tc_xiang"  style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>踏查路线编号</span> <span><input type="text" style="width: 70px" id="tclx_bh"/></span></span>
		    	<span style="margin-left: 20px"><span>标准地编号</span> <span><input type="text" style="width: 70px" id="bzd_bh"/></span></span>
		    	<span style="margin-left: 20px"><button type="button" class="layui-btn layui-btn-radius layui-btn-sm" id="tc_search">查询</button></span>
			    <span style="margin-left: 32%"><button type="button" class="layui-btn layui-btn-radius layui-btn-sm" id="tc_delete">删除</button></span>
			    <span style="margin-left: 20px"><button type="button" id="tcjlExport" class="layui-btn layui-btn-radius layui-btn-sm">导出</button></span> 
		    	<div style="margin-top: 20px;margin-left: -6px; width: 100%;">
		    	<table id="tcjl" style="width: 100% "  ></table>
		    	<div id="tcjlpage" style="position: fixed; bottom: 0px;"></div>
		    	</div>
		    </div>
		    <!-- 标准地  -->
		   <!--  <div class="layui-tab-item" >
		    	<span><span>市</span> <span><select style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>县</span> <span><select style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>乡镇</span> <span><select style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>样地号</span> <span><input type="text" style="width: 70px"/></span></span>
		    	<span style="margin-left: 20px"><button type="button" class="layui-btn layui-btn-radius layui-btn-sm">查询</button></span>
			    <span style="margin-left: 350px"><button type="button" class="layui-btn layui-btn-radius layui-btn-sm">删除</button></span>
			    <span style="margin-left: 20px"><button type="button" id="huiqianExport" class="layui-btn layui-btn-radius layui-btn-sm">导出</button></span>
		    	<div style="margin-top: 20px;margin-left: -6px">
		    	<table id="huiqian" style="margin-top: 150px;width: 100%;"></table>
		    	<div id="page2"></div>
		    	</div>
		    </div> -->
		    <!-- 诱虫灯 -->
		    <div class="layui-tab-item" >
		    	<span><span>市</span> <span><select id="ycd_shi" style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>县</span> <span><select id="ycd_xian" style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>乡镇</span> <span><select id="ycd_xiang" style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>诱虫灯(引诱剂)所在小班</span> <span><input id="ycdxb" type="text" style="width: 70px"/></span></span>
		    	<span style="margin-left: 20px"><button type="button" class="layui-btn layui-btn-radius layui-btn-sm" id="ycd_search">查询</button></span>
			    <span style="margin-left: 40%"><button type="button" class="layui-btn layui-btn-radius layui-btn-sm" id="ycd_delete">删除</button></span>
			    <span style="margin-left: 20px"><button type="button" id="youchongExport" class="layui-btn layui-btn-radius layui-btn-sm">导出</button></span>
				<div style="margin-top: 20px;margin-left: -6px;width: 100%" >
		    	<table id="youchong" style="width: 100%"></table>
		    	<div id="youchongpage" style="position: fixed; bottom: 0px;"></div>
		    	</div>		   
		        </div>
			<!-- 种实 -->
			    <div class="layui-tab-item">
		    	<span><span>市</span> <span><select id="zs_shi" style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>县</span> <span><select id="zs_xian" style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>乡镇</span> <span><select id="zs_xiang"  style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>场所名称</span> <span><input id="csmc" type="text" style="width: 70px"/></span></span>
		    	<span style="margin-left: 20px"><button type="button" id="zs_search" class="layui-btn layui-btn-radius layui-btn-sm">查询</button></span>
			    <span style="margin-left: 46%"><button type="button" id="ddeletezhongshi" class="layui-btn layui-btn-radius layui-btn-sm">删除</button></span>
			    <span style="margin-left: 20px"><button type="button" id="zhongshiExport" class="layui-btn layui-btn-radius layui-btn-sm">导出</button></span>
		   		<div style="margin-top: 20px;margin-left: -6px">
		    	<table id="zhongshi" style="width:100%;"></table>
		    	<div id="zhongshipage" style="position: fixed; bottom: 0px;"></div>
		    	</div>		   
		        </div>
			    <!-- 苗圃核查 -->
			    <div class="layui-tab-item">
		    	<span><span>市</span> <span><select id="mp_shi" style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>县</span> <span><select id="mp_xian" style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>乡镇</span> <span><select id="mp_xiang" style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>场所名称</span> <span><input id="mp_csmc" type="text" style="width: 70px"/></span></span>
		    	<span style="margin-left: 20px"><button type="button" id="mp_search" class="layui-btn layui-btn-radius layui-btn-sm">查询</button></span>
			    <span style="margin-left: 43%"><button type="button" id="mp_delete" class="layui-btn layui-btn-radius layui-btn-sm">删除</button></span>
			    <span style="margin-left: 20px"><button type="button" id="miaopuExport" class="layui-btn layui-btn-radius layui-btn-sm">导出</button></span>
				<div style="margin-top: 20px;margin-left: -6px">
		    	<table id="miaopu" style="width: 100%;"></table>
		    	<div id="miaopupage" style="position: fixed; bottom: 0px;"></div>
		    	</div>		   
		        </div>		
		         <!-- 检疫性有害生物 -->
			    <div class="layui-tab-item" >
		    	<span><span>市</span> <span><select id="jyx_shi" style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>县</span> <span><select id="jyx_xian" style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>乡镇</span> <span><select id="jyx_xiang" style="width: 70px;"><option value="">请选择</option></select></span></span>
		    	<span style="margin-left: 20px"><span>踏查路线编号</span> <span><input type="text" id="jyx_tclxbh" style="width: 70px"/></span></span>
		    	<span style="margin-left: 20px"><span>标准地编号</span> <span><input type="text" id="jyc_bzdbh" style="width: 70px"/></span></span>
		    	<span style="margin-left: 20px"><button type="button" class="layui-btn layui-btn-radius layui-btn-sm" id="jyxsearch">查询</button></span>
			    <span style="margin-left: 32%"><button type="button" id="jyx_del" class="layui-btn layui-btn-radius layui-btn-sm">删除</button></span>
			    <span style="margin-left: 20px"><button type="button" id="jianyiExport" class="layui-btn layui-btn-radius layui-btn-sm">导出</button></span>
				<div style="margin-top: 20px;margin-left: -6px; width: 100%">
		    	<table id="jianyi" style="width: 100%" ></table>
		    	<div id="jianyipage" style="position: fixed; bottom: 0px;"></div>
		    	</div>			   
		    	</div>   
		     </div>
		    </div>
		<script type="text/javascript">
			layui.use(['element','table'], function(){
			  var $ = layui.jquery 
			  ,element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
			});
		</script>
	</body>
	<!-- 自定义的js -->
  <script  type="text/javascript" src="pucha.js" >  </script>
  <script  type="text/javascript" src="report.js" >  </script>
</html>