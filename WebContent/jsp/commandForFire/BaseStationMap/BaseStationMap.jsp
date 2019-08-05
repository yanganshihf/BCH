<%@ page language="java" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>

<html lang="cn">
<head>
<meta name="viewport"
	content="initial-scale=1,maximum-scale=1,user-scalable=no;charset=UTF-8">
<title>区域示意图</title>

<style>
html, body, #viewDiv {
	padding: 0;
	margin: 0;
	height: 100%;
	width: 100%;
	overflow: hidden; 
}
.esri-ui .esri-ui-top-left{
	 flex-flow: row-reverse; 
	 width: 100%;
	 padding-right:40px;
}
.esri-ui .esri-ui-top-left .esri-component{
	margin-bottom: 0;
	margin-left: 10px;
	flex-flow: initial; 
}
#PositionInfo {
	position: absolute;
	display: inline;
	bottom: 0px;
	color: white;
	padding-left:20px;
	height:20px;
	width:100%;
	box-shadow: none;
	background: rgb(0,0,0,0.3);
	left:60px;
	line-height:20px;
}
#viewDiv .esri-compass {
    border-radius: 0;
}
 #body .form-control {
	height: 22px;
	font-size: 14px;
	padding:0 0 1px 5px;
    margin-bottom: 3px;
	width:185px;
	margin-left: 5px;
}
#body .btn-default {
	height: 22px;
	font-size: 14px;
	padding: 0 12px;
	margin-bottom: 3px;
	margin-left: 10px;
}
#body label{
	font-size:14px;
	line-height: 22px;
	font-weight:normal;
	margin-bottom:0;
}
.esri-widget--button{
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
#panelHulin .nav li a,#panelUAV .nav li a,#panelEventDraw .nav li a{
	padding: 3px 10px;
	border:0;
	background-color: transparent;
}
.esri-ui-bottom-left{
	width:100%;
}
#panelHulin .nav-tabs,#panelUAV .nav-tabs,#panelEventDraw .nav-tabs{
	border:0;
} 
a{
	color: #555;
} 
.nav-tabs li.active a, .nav-tabs li.active a:hover, .nav-tabs li.active a:focus{
	color:#fff;
	background:#058563;
	padding: 3px 10px;
    border: 0;
}
.nav-tabs li a, .nav-tabs li a:hover, .nav-tabs li.active a:focus{
	padding: 3px 10px;
    border: 0;
}
/* 无人机巡护 */
#formTable .form-control {
	height: 22px;
	font-size: 15px;
	padding:0 0 1px 5px;
    margin-bottom: 3px;
    margin-left:0px;
	width: 110px;
}


#formTable label {
	font-size: 15px;
	line-height: 22px;
	font-weight: normal;
	margin-bottom: 0;
}
.layui-table-header span{
	color:#058563;
	font-weight:700;
}
.layui-table-header th{
 	background-color:#E6E6E6;
}
.layui-table-view .layui-table td{
	padding:0px 0;
}
.layui-table, .layui-table-view {
    margin-top: 0px;
    margin-bottom:0px;
}
.layui-table-cell .layui-form-checkbox[lay-skin=primary]{
	top:5px;
	padding:0px;
}
.layui-table-page{
	text-align:center;
}
#titleInfo {
	cursor:move;
	position: absolute;
	z-index:53;
	width:100%;
	top:10px;
	left:0px;
	text-align: center;
	font-size:20px;
	visibility:hidden;
}
#scaleInfo {
	cursor:move;
	position: absolute;
	z-index:53;
	width:100%;
	top:90%;
	font-size:20px;
	text-align: center;
	left:0px;
	visibility:hidden;
}
#northIcon {
	position: absolute;
	float:right;
	right:40px;
	top: 50px;
	z-index: 52;
	font-size:50px;
	visibility:hidden;
}
.layui-form-switch{
	height: 25px;
    line-height: 25px;
    width: 70px;
}
.layui-input-block {
    margin-left: 50px;
    min-height: auto;
}
.layui-form-onswitch em {
	margin-left: 2px;
    margin-right: 10px;
}
.layui-layer-btn .layui-layer-btn0{
	border-color: #058563;
    background-color: #058563;
}
.layui-colorpicker-main{
	width:290px;
}
.layui-form-radio i{
    color: #484545;
}
/* body .layer-class .layui-layer-ico{
	background: url(/ResourceMonitor/images/close.jpg) no-repeat;
} */
#intelQueryDiv {
	position: absolute;
	z-index: 52;
	left:75px;
	top:110px;
	background-color:#ffffff;
	width:350px;
	height:500px;
	margin-top:-50px;
}
#flightEchart{
	position: absolute;
	z-index: 55;
	background-color:#ffffff;
	width:700px;;
	right:40px;
	bottom:40px;
	height:200px;
	background:rgb(0,0,0,0.4);
	visibility:hidden;
}
#body .layui-colorpicker-trigger-span {
    height: 16px;
    width: 175px;
    margin-top: 5px;
    display:block;
}
#body .layui-colorpicker-trigger-i{
	display:none;
}
#panelLinchang .list-group-item{
	background-color:#ebeae5;
	border-width:0px;
}
#panelResourceQueryDiv .list-group-item{
	background-color:rgb(0,0,0,0);
	border-width:0px;
}
#panelFlight .layui-table-header{
	display:none;
}
.ui-menu .ui-menu-divider {
    margin: 0px 0; 
    height: 50px; 
    font-size: 0; 
    border-width: 0px 0 0 0;
}
#topSearchDiv{
	position: absolute;
	z-index: 60;
	top:10px;
	left:75px;
	width:274px;
	display:none;
}
#drawResourceQueryLi{
	position: absolute;
	z-index: 59;
	top:10px;
	left:75px;
	width:30px;
	height:30px;
	background:#fff;
	font-size:20px;
	padding:5px;
	
}
 .linebtn{
 	background-color: transparent;
    border: 0;
    width: 70px;
    margin: 2px;
    color: #000;
    height: 25px;
 }
 .lineSelect{
 	background-color: #058261;
    color: #fff;
 }
 .linediv{
 	margin: 10px;
    height: 25px;
    line-height: 25px;
    margin-bottom: 5px;
 }
.topSearchType{
	cursor:pointer;
	display:inline-block;
	text-align:center;
	width:80px;
	height:30px;
	line-height:30px;
}
#nav a {
    text-decoration: none;
    display: block;
    overflow: hidden;
    padding-left: 18px;
    line-height: 40px;
    max-height: 46px;
    color: #f3f3f3;
    transition: all .3s;
}
#eventDrawDiv .layui-table-cell {
    padding: 0 0px;
}
#resourceQueryResultDiv .layui-table-page{
    width: auto;
    position: absolute;
    top: 0;
    padding: 3px 7px 0;
}
#drawResourceQueryResultDiv .layui-table-page{
    width: auto;
    position: absolute;
    top: 0;
    padding: 3px 7px 0;
}
</style>
<link rel="stylesheet" type="text/css" href="/ResourceMonitor/js/myJS/nav/css/nav.css">
<link rel="stylesheet" type="text/css" href="/ResourceMonitor/js/myJS/nav/font/iconfont.css">
<link rel="stylesheet"
	href="/ResourceMonitor/js/arcgis_js_api/library/4.10/esri/css/main.css">
<link rel="stylesheet" href="/ResourceMonitor/iconClass/style.css" />
<link rel="stylesheet" href="/ResourceMonitor/js/jquery-ui-1.9.2/css/cupertino/jquery-ui.css" />
<link rel="stylesheet" href="/ResourceMonitor/js/bstreeview/bootstrap-treeview.min.css" />
<link rel="stylesheet" href="/ResourceMonitor/js/jquery-slider/jquery-ui-slider-pips.min.css" />
<script src="/ResourceMonitor/js/echarts.js"></script>
<script type="text/javascript" src="/ResourceMonitor/js/jquery-ui-1.9.2/js/jquery-ui-1.9.2.custom.min.js"></script>	
<script type="text/javascript"
	src="/ResourceMonitor/js/myJS/coordTransfer.js"></script>
<script src="/ResourceMonitor/js/moment.min.js"></script> 
<script src="/ResourceMonitor/js/proj4js-2.4.3/dists/proj4.js" type="text/javascript"></script>
<script src="/ResourceMonitor/js/arcgis_js_api/library/4.10/init.js"></script>
<script src="/ResourceMonitor/js/myJS/commandForFire/BaseStationMap/analysis.js"></script>	
<script src="/ResourceMonitor/js/myJS/commandForFire/BaseStationMap/airplane.js"></script>
<script src="/ResourceMonitor/js/myJS/commandForFire/BaseStationMap/flightModel.js"></script>
<script src="/ResourceMonitor/js/myJS/commandForFire/BaseStationMap/drawResourceQuery.js"></script>
<script type="text/javascript" src="/ResourceMonitor/js/bstreeview/bootstrap-treeview.min.js"></script>
<script src="/ResourceMonitor/js/screenfull.js"></script>
<script type="text/javascript" src="/ResourceMonitor/js/myJS/nav/js/nav.js"></script>
<script src="/ResourceMonitor/js/screenfull.js" type="text/javascript"></script>
<script src="/ResourceMonitor/js/jquery-slider/jquery-ui-slider-pips.js" type="text/javascript"></script>
<!-- VR -->
<link rel="stylesheet" href="/ResourceMonitor/pannellum/pannellum.css"/>
<link rel="stylesheet" type="text/css" href="/ResourceMonitor/pannellum/panVRStyle.css" />
<script type="text/javascript" src="/ResourceMonitor/pannellum/pannellum.js"></script>
<script type="text/javascript" src="/ResourceMonitor/pannellum/panVR.js"></script>
<!-- wktUtil -->
<script type="text/javascript" src="/ResourceMonitor/js/WKTUtil.js"></script>
<style type="text/css">
.esri-view-width-xlarge .esri-popup__main-container {
    width: 270px;
}
.esri-view-width-large .esri-popup__main-container {
    width: 270px;
} 
.layui-table[lay-size=sm] td, .layui-table[lay-size=sm] th {
    padding: 5px 0px;
}
.ui-menu .ui-menu-divider{
	border:0px;
}
#nav{
	opacity: 0.9;
	z-index:99999999;
}
#nav a {
    color: #f3f3f3;
}
#treeview-checkable .list-group-item{
	padding: 5px 15px;
}
#time_slider_div{
	width: 80px;
	height:500px;
	background: rgba(255, 255, 255, 0.7);
	opacity:0.8;
    left:75px;
    top:60px;
}

#slider-vertical .ui-slider-range { 
	background: #0062ac; 
}
#slider-vertical .ui-slider-handle { 
	border-color: #0062ac;
	background: #DAA520; 
}
.snow{position:absolute;top:0;color:#fff;}
/* 文件上传样式 */
.file {
    position: relative;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 2px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    width:100px;
    text-align:center;
    display:inline;
    margin:10px;
}
.file input {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #058563;
    border-color: #058563;
    color: #fff;
    text-decoration: none;
}
#fileName,#fileType{
	cursor:not-allowed;
	background-color:transparent;
}
.list-group-item:last-child{
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
}
}
</style>
</head>
<body id="body">
	<div id="viewDiv" style="position: absolute;">
		<span id ="northIcon" class="icon-northImg"></span>
		<div id="titleInfo">区域示意图</div>
		<span id="scaleInfo"></span>
	</div>
	<div id='drawResourceQueryLi' class="my-icon nav-icon icon-znfx" title="叠加分析" >
	</div>
	<div id='topSearchDiv'>
		<div id="topSearchHeadDiv" style="background:#fff;height:30px;">
			<div class="btn-group" style="float:left;">
				<button style="margin-left:0px;height:30px;border-radius:0px;width:80px;" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" id="topSearchTypeButton">地点 <span class="caret"></span></button>
				<ul class="dropdown-menu" role="menu">
					<li class="topSearchTypeSelect" data="place"><a href="#" style="color:#337ab7"><img style="margin-right:20px;" src="/ResourceMonitor/images/mark/32/place.png">地点</a></li>
					<li class="topSearchTypeSelect"  data="device"><a href="#" style="color:#337ab7"><img style="margin-right:20px;" src="/ResourceMonitor/images/mark/32/device.png">设备</a></li>
					<li class="topSearchTypeSelect"  data="person"><a href="#" style="color:#337ab7"><img style="margin-right:20px;" src="/ResourceMonitor/images/mark/32/person.png">人员</a></li>
				</ul>
			</div>
	    	<input style="float:left;display:inline;height:30px;margin:0px;width:160px;" type="text" id="topSearchInput"  placeholder="请输入查询条件"/>
    		<div style="float:left;display:inline;padding:7px;" id="topSearchExpand">
    			<span class="esri-icon-expand" id="topSearchExpandSpan"></span>
    		</div> 
    	</div>
    	<div id="topSearchBody" style="height:460px;background:#fff;">
	    	<div id="topSearchType" style="height:45px;background:rgb(255,255,255,0.7);padding:10px;">
				<span class="topSearchType"  style="background:rgb(5,133,99);color:#fff;" data="chosed">居民点</span>
				<span class="topSearchType">牧业点</span>
				<span class="topSearchType">停机坪</span>
	    	</div>
	    	<table id="topSearchTable" lay-filter="topSearchFilter" style="margin:0px;"></table>
	    	<div id="topSearchMessage" style="margin-top:15px;text-align:center;"></div>
    	</div> 
	</div>
	<!-- 左侧二级菜单 -->
	<div id="nav" class="nav-mini">
        <div class="nav-top">
            <div id="mini"  style="border-bottom:1px solid rgba(255,255,255,.1)"><img style="width:40px;margin-left: 10px;padding: 8px;" src="/ResourceMonitor/js/myJS/nav/images/2.png" ></div>
        </div>
        <ul>
            <li class="nav-item"  id="linchang">
                <a href="javascript:;">
                <i class="my-icon nav-icon icon-pestControl" style="margin-top:9px;font-size:25px;"></i><span>有害生物普查</span><i class="my-icon nav-more" style="visibility: hidden"></i></a>
            </li>
            <li class="nav-item"  id="xiangcha">
                <a href="javascript:;">
                <i class="my-icon nav-icon icon-analysis" style="margin-top:9px;font-size:25px;"></i><span>有害生物详查</span><i class="my-icon nav-more" style="visibility: hidden"></i></a>
            </li>
           <!--   <li class="nav-item"  id="jianyi">
                <a href="javascript:;">
                <i class="my-icon nav-icon  icon-messageManage" style="margin-top:9px;font-size:25px;"></i><span>产地检疫调查</span><i class="my-icon nav-more" style="visibility: hidden"></i></a>
            </li> -->
            <li class="nav-item"  id="chengzaimianji">
                <a href="javascript:;">
                <i class="my-icon nav-icon icon-patrolManage" style="margin-top:9px;font-size:25px;"></i><span>成灾面积调查</span><i class="my-icon nav-more" style="visibility: hidden"></i></a>
            </li>
            <!-- <li class="nav-item">
                <a href="javascript:;"><i class="my-icon nav-icon icon-ssjg"  style="margin-top:5px;font-size:32px;margin-left:-5px;"></i><span>动态监管</span><i class="my-icon nav-more"></i></a>
                <ul>
                    <li><a href="javascript:;" id="huizong"><span>监测概况</span></a></li>
                    <li><a href="javascript:;" id="hulin"><span>护林员巡检</span></a></li>
                    <li><a href="javascript:;"  id="UAV"><span>无人机巡检</span></a></li>
                    <li><a href="javascript:;"   id="shipin"><span>视频监控</span></a></li>
                    <li><a href="javascript:;"  ><span>环境监控</span></a></li>
                </ul>
            </li> -->
           <!--  <li class="nav-item">
                <a href="javascript:;"><i class="my-icon nav-icon icon-sourceSurvey"  style="margin-top:9px;font-size:25px;"></i><span>资源查询</span><i class="my-icon nav-more"></i></a>
           		<ul>
                    <li><a href="javascript:;" id="danyuanQuerey"><span>按行政单元</span></a></li>
                    <li><a href="javascript:;"  id="sourceSurveyId"><span>高级查询</span></a></li>
                </ul>
            </li> -->
            <li class="nav-item" style="display:none;">
                <a href="javascript:;"><i class="my-icon nav-icon icon-znfx"  style="margin-top:5px;font-size:32px;margin-left:-5px;"></i><span>智能分析</span><i class="my-icon nav-more"></i></a>
                 <ul>
                    <li  id="flagDrawId"><a href="javascript:;"><span>插旗标注</span></a></li>
                    <!-- <li><a href="javascript:;" id="jiantoubiaohui"><span>标会</span></a></li> -->
                    <li><a href="javascript:;"  id="eventDrawId"><span>事件标绘</span></a></li>
                    <!-- <li><a href="javascript:;"  id="manyanfenxi"><span>蔓延分析</span></a></li> -->
                    <li><a href="javascript:;"  id="clostestFacilityId"><span>最近设施</span></a></li>
                    <li><a href="javascript:;"  id="routeId"><span>最短路径</span></a></li>
                    <li><a href="javascript:;"  id="viewshedId"><span>视域分析</span></a></li>
                    <li><a href="javascript:;"  id="tongshiId"><span>通视分析</span></a></li>
                    <li><a href="javascript:;" id="drawResourceQueryLi2"><span>叠加分析</span></a></li>
                    <li><a href="javascript:;"  id="separatorId"><span>隔离带</span></a></li>
                    <li><a href="javascript:;"  id="bufferComputedId"><span>缓冲分析</span></a></li>
                    <li><a href="javascript:;"  id="lossComputedId"><span>损失评估</span></a></li>
                </ul> 
            </li>
            
            <li class="nav-item" >
               <a href="javascript:;"><i class="my-icon nav-icon icon-codeManage"  style="margin-top:5px;font-size:32px;margin-left:-5px;"></i><span>代码管理</span><i class="my-icon nav-more"></i></a>
                 <ul>
                    <li id="binghai"><a href="javascript:;"><span>病害</span></a></li>
                    <!-- <li><a href="javascript:;" id="jiantoubiaohui"><span>标会</span></a></li> -->
                    <li id="shuhai"><a href="javascript:;"  ><span>鼠害</span></a></li>
                    <!-- <li><a href="javascript:;"  id="manyanfenxi"><span>蔓延分析</span></a></li> -->
                    <li id="chonghai"><a href="javascript:;"  ><span>虫害</span></a></li>
                    <li id="youhaizhiwu"><a href="javascript:;"  ><span>有害植物</span></a></li>
                 	<li id="xingzhengquhua"><a href="javascript:;"  ><span>行政区划</span></a></li>
                </ul> 
            </li>
            
<!--              <li class="nav-item">
                <a href="javascript:;"><i class="my-icon nav-icon icon-information"  style="margin-top:9px;font-size:25px;"></i><span>资源现状</span><i class="my-icon nav-more"></i></a>
            	<ul>
                    <li><a href="javascript:;" id="guanjianzhibiaoId"><span>关键指标</span></a></li>
                </ul>
            </li> -->
<!--            <li class="nav-item">
                <a href="javascript:;"><i class="my-icon nav-icon icon-ztsj"  style="margin-top:9px;font-size:25px;"></i><span>专题信息</span><i class="my-icon nav-more"></i></a>
            </li> -->
            <!--  <li class="nav-item">
                <a href="javascript:;"><i class="my-icon nav-icon icon-tianqi"  style="margin-top:9px;font-size:25px;"></i><span>光线环境</span><i class="my-icon nav-more"></i></a>
                <ul>
                	<li><a href="javascript:;" id="clockSliderId"><i class="my-icon nav-icon icon-clock"  style="color:#fff;margin-top:9px;font-size:25px;"></i><span>时间轴</span></a></li>
                    <li><a href="javascript:;" id="day_night_swithcer"><i id="day_night_swithcer_icon" class="my-icon nav-icon icon-sunshine"  style="color:#fff;margin-top:9px;font-size:25px;"></i><span id="day_night_swithcer_span">日间模式</span></a></li>
                    <li><a href="javascript:;" id="atmosphere_swithcer"><i id="atmosphere_swithcer_icon"  class="my-icon nav-icon icon-atmosphere_low"  style="color:#fff;margin-top:9px;font-size:25px;"></i><span id="atmosphere_swithcer_span">大气质量：低</span></a></li>
                    <li><a href="javascript:;" id="snow_swithcer"><i id="snow_swithcerId"  class="my-icon nav-icon icon-qing"  style="color:#fff;margin-top:9px;font-size:25px;"></i><span id="snow_swithcer_span">晴</span></a></li>
                </ul>
            </li> 
            <li class="nav-item" id="i360">
                <a href="javascript:;"><i class="my-icon nav-icon icon-i360"  style="margin-top:9px;font-size:25px;"></i><span>VR全景</span><i class="my-icon nav-more" style="visibility: hidden"></i></a>
            </li> -->
        </ul>
    </div>
	<div id="time_slider_div" style=" display:none;position:absolute;">
		<div style="background-color: #ffffff;display: flex;border-bottom: solid 1px #b9b9b9;">
			<div style="width:80px;height:32px;padding-left:10px;line-height:33px;font-size:12px;">时间轴</div>
			<div id="time_slider_div_close" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;">
				<img style="width:12px;height:12px;" src="/ResourceMonitor/images/layerTitle/closeButton.png">
			</div>
		</div>
	 	 <div id="slider-vertical" style="height:430px;margin-left:10px;margin-top:15px;"></div>
	 </div>
	<div id="initialExtent" class="esri-widget--button esri-widget esri-interactive" title="初始视图" style="display: none;padding-top: 6px;">
		<span class="icon-earth" style="font-size:20px;"></span>
	</div>
	<div id="viewSwitch" class="esri-widget--button esri-widget esri-interactive" title="视图转换" style="display: none;padding-top: 6px;">
		<span id="switch-btn" class="icon-switch3d" style="font-size:20px;"></span>
	</div>
	<div id="identify" class="esri-widget--button esri-widget esri-interactive" title="图查属性" style="display: none;padding-top: 6px;">
		<span id="identify-tool" class="icon-identify2" style="font-size:20px;"></span>
	</div>
	<div id="xyLocation" class="esri-widget--button esri-widget esri-interactive" title="坐标定位" style="display: none;padding-top: 6px;">
		<span class="icon-location" style="font-size:20px;"></span>
	</div>
	<div id="draw-polyline" class="esri-widget--button esri-widget esri-interactive" title="量算" style="display: none;padding-top: 6px;">
		<span class="icon-length" id="length-tool" style="font-size:20px;"></span>
	</div>
	<!-- <div id="draw-polygon" class="esri-widget--button esri-widget esri-interactive" title="面积量算" style="display: none;padding-top: 6px;">
		<span class="icon-area" id="area-tool" style="font-size:20px;"></span>
	</div> -->
	<div id="refreshGraphics" class="esri-widget--button esri-widget esri-interactive" title="刷新地图" style="display: none;padding-top: 6px;">
		<span class="icon-refresh" style="font-size:20px;"></span>
	</div>
	<div id="mapExport"  class="esri-widget--button esri-widget esri-interactive"  title="地图输出" style="display: none;padding:6px;">
		<span class="icon-mapExport" style="font-size:20px;"></span>
	</div>
	<div id="fullMap"  class="esri-widget--button esri-widget esri-interactive"  title="地图全屏" style="display: none;padding:6px;">
		<div class="" style="width: 20px;height: 20px;background-image: url(/ResourceMonitor/images/menuIcon/fullMap.png);"></div>
	</div>
	<div id="Flight" class="esri-widget--button esri-widget esri-interactive" title="飞行模式" style="display: none;padding:6px;background-color: #ffffff;">
		<span id="iconFlight" class="icon-Flight" style="font-size:20px;"></span>
	</div>
	<!-- <div id="uploadExcel"  style="display: none;padding:6px;" class="esri-widget--button esri-widget esri-interactive" title="导入坐标">
		<span class="icon-uploadXY" style="font-size:20px;"></span>
	</div>	 -->
	<div id="PositionInfo" style="display: none;">
		 		<span>经度:</span><span id="pointlongt" style="display:inline-block;width:120px;">----------</span> 
				<span style="padding-left:10px;display:inline-block;">纬度:</span><span id="pointlat" style="display:inline-block;width:120px;">----------</span>
				<!-- <span style="padding-left:10px;display:inline-block;">X:</span><span id="pointX" style="display:inline-block;width:70px;">----------</span>
				<span style="padding-left:10px;display:inline-block;">Y:</span><span id="pointY" style="display:inline-block;width:70px;">----------</span> -->
				<span style="padding-left:10px;display:inline-block;">海拔:</span><span id="elevation" style="display:inline-block;width:25px;">----</span>
				<span style="padding-left:10px;display:inline-block;">坡度:</span><span id="slope" style="display:inline-block;width:20px;">--</span>
				<span style="padding-left:10px;display:inline-block;">坡向:</span><span id="aspect" style="display:inline-block;">-</span>
    </div>
    
	<!-- 属性查图start -->
	<div id="intelQueryDiv" style="visibility: hidden;">
		<div
			style="border-radius: 2px 2px 0 0; background-color: #F8F8F8; overflow: hidden; color: #333; line-height: 42px; border-bottom: 1px solid #eee; font-size: 14px;">
			&nbsp;&nbsp;&nbsp;&nbsp;资源查询
			<img id="closeButton" src="/ResourceMonitor/images/layerTitle/closeButton.png"
				height="16" width="16"
				style="margin-right: 10px; float: right; margin-top: 10px;" />
		</div>
		<div id="intelQueryTab">
			<div id="intelQueryLeft" style="width: 350px; float: left;">
				<ul class="nav nav-tabs" role="tablist" id="searchTab"
					style="width: 330px;">
					<li role="presentation" class="active">
						<a href="#searchCond" aria-controls="searchCond" role="tab"
							data-toggle="tab">检索条件</a>
					</li>
					<li role="presentation">
						<a href="#searchField" aria-controls="searchField" role="tab"
							data-toggle="tab">检索范围</a>
					</li>
				</ul>
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane active" id="searchCond">
						<table
							style="font-size: 14px; line-height: 35px; margin-top: 8px; margin-left: 15px; text-align: left">
							<tbody>
								<tr>
									<td colspan="4" style="line-height: 30px;">
										图层&nbsp;&nbsp;
										<select id="layerChoose"
											style="width: 280px; height: 25px; text-align: center">
											<option value="xb">小班</option>
											<option value="jmd">居民点</option>
											<option value="ghz">管护站</option>
											<option value="tower">塔</option> 
											<option value="xiangzhen">乡镇</option>
											<option value="cuntun">村屯</option>
											<option value="myd">牧业点</option>
											<option value="tjp">停机坪</option>
										</select>
									</td>
								</tr>
								<tr>
									<td colspan="2" style="height: 203px;">
										属性
										<select multiple id="fieldChoose"
											style="margin-top: 0px; width: 150px; height: 155px; text-align: center">
										</select>
									</td>
									<td colspan="2">
										唯一值
										<select multiple id="ableValSelect"
											style="margin-left: 0px; margin-top: 0px; width: 150px; height: 155px; text-align: center">
										</select>
									</td>
								</tr>
								<tr>
									<td style="width: 80px;">
										<button class="symbol" value="="
											style="height: 25px; width: 50px; line-height: 25px;">=</button>
									</td>
									<td style="width: 80px;">
										<button class="symbol" value="&lt;&gt;"
											style="height: 25px; width: 50px; line-height: 25px;">&lt;&gt;</button>
									</td>
									<td style="width: 80px;">
										<button class="symbol" value="&gt;"
											style="height: 25px; width: 50px; line-height: 25px;">&gt;</button>
									</td>
									<td style="width: 80px;">
										<button class="symbol" value="&gt;="
											style="height: 25px; width: 50px; line-height: 25px;">&gt;=</button>
									</td>
								</tr>
								<tr>
									<td>
										<button class="symbol" value="&lt;"
											style="height: 25px; width: 50px; line-height: 25px;">&lt;</button>
									</td>
									<td>
										<button class="symbol" value="&lt;="
											style="height: 25px; width: 50px; line-height: 25px;">&lt;=</button>
									</td>
									<td>
										<button class="symbol" value="且"
											style="margin-top: 5px; height: 25px; width: 50px; line-height: 25px;">且</button>
									</td>
									<td>
										<button class="symbol" value="或"
											style="margin-top: 5px; height: 25px; width: 50px; line-height: 25px;">或</button>
									</td>
								</tr>
								<tr>
									<td colspan="4" style="height: 80px;">
										<textarea id="sqlEditArea"
											style="float: left; margin-top: 0px; line-height: 30px; height: 66px; width: 250px;"></textarea>
										<button id="clearQuery"
											style="margin-left: 5px; margin-top: 17px; border: 1px solid #dedede; background-color: #fff; color: #333; border-radius: 2px; height: 30px; width: 65px; line-height: 30px;">清空</button>
									</td>
								</tr>
								<tr>
									<td colspan="4" style="height: 10px;"></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div role="tabpanel" class="tab-pane" id="searchField"
						style="margin-left: 15px; width: 350px;">
						<div style="margin-top: 10px; margin-bottom: 10px;">
							<input style="margin-left: 10px;" type="checkbox"
								id="flag_point" />
							设定检索范围
						</div>
						<table
							style="font-size: 14px; margin-top: 0px; margin-left: 0px; text-align: left; line-height: 40px;"
							id="findAttrLocation">
							<tbody>
								<tr>
									<td style="width: 70px;"></td>
									<td style="width: 80px;"></td>
									<td style="width: 80px;"></td>
									<td style="width: 80px;"></td>
									<td></td>
								</tr>
								<tr>
									<td colspan="5">
										<label
											style="margin-left: 10px; height: 30px; margin-bottom: 0px;">中心点坐标</label>
										<hr style="margin-top: 0px; width: 315px;">
									</td>
								</tr>
								<tr>
									<td style="text-align: right;">
										<span style="margin-right: 5px;">坐标类型</span>
									</td>
									<td colspan="4">
										<select id="locationType" onchange="onCoorTypeChanged()"
											style="width: 220px; height: 25px; text-align: center">
											<option value="optionDMS">度分秒</option>
											<option value="optionDegree">十进制度</option>
											<!-- <option value="optionXian80">西安80坐标</option> -->
										</select>
									</td>
								</tr>
								<tr>
									<td></td>
									<td colspan="4">
										<input type="checkbox" id="screen_point"
											style="margin-left: 0px;" />
										屏幕选点
										<button type="button" style="margin-left: 20px;background-color: #058563"
											class="btn btn-primary btn-sm" id="openEventChoice">选择已录入事件</button>
									</td>
								</tr>
								<tr id="longtTR">
									<td style="text-align: right">
										<label style="margin-right: 5px; font-weight: normal">经度</label>
									</td>
									<td>
										<input type="text" id="longtD" maxlength="3"
											style="width: 60px; height: 25px"
											onchange="longtDegValidate()">
										&nbsp;°
									</td>
									<td>
										<input type="text" id="longtM" maxlength="2"
											style="width: 60px; height: 25px" onchange=longtMValidate()>
										&nbsp;′
									</td>
									<td>
										<input type="text" id="longtS" maxlength="4"
											style="width: 60px; height: 25px"
											onchange="longtSValidate()">
										&nbsp;″
									</td>
									<td rowspan="2">
										<img src="/ResourceMonitor/images/indexpage/dingwei.png"
											onclick="eventLocator()"
											style="vertical-align: middle; width: 16px; height: 19px; margin-left: 0px;" />
									</td>
								</tr>

								<tr id="latTR">
									<td style="text-align: right">
										<label style="margin-right: 5px; font-weight: normal">纬度</label>
									</td>
									<td>
										<input type="text" id="latD" maxlength="2"
											style="width: 60px; height: 25px"
											onchange="latDegValidate()">
										&nbsp;°
									</td>
									<td>
										<input type="text" id="latM" maxlength="2"
											style="width: 60px; height: 25px" onchange="latMValidate()">
										&nbsp;′
									</td>
									<td>
										<input type="text" id="latS" maxlength="4"
											style="width: 60px; height: 25px" onchange="latSValidate()">
										&nbsp;″
									</td>
								</tr>
								<tr>
									<td colspan="5" style="height: 30px;">
										<hr style="margin-top: 0px; width: 315px;">
										<label
											style="margin-left: 10px; height: 30px; margin-bottom: 0px;">检索半径</label>
										
									</td>
								</tr>
								<tr>
									<td style="text-align: right;">
										<label style="margin-right: 5px; font-weight: normal">半径距离</label>
									</td>
									<td colspan="4">
										<input type="text" id="bufferRadius" maxlength="6"
											onchange="bufferRadiusValidate()"
											style="width: 220px; height: 25px">
										&nbsp;米
									</td>
								</tr>
								<tr>
									<td colspan="5" style="height: 44px;">&nbsp;</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div id="queryErrorSpan"
						style="height: 20px; margin-left: 15px; color: red; width: 150px; display: inline-block;">&nbsp;</div>
					<button id="sureQuery"
						style="margin-left: 30px; border: 1px solid #dedede; border-radius: 2px; height: 30px; width: 65px; line-height: 30px; border-color: #0062ac; background-color: #058563; color: #ffffff;">确定</button>
					<button id="cancelQuery"
						style="border: 1px solid #dedede; background-color: #fff; color: #333; border-radius: 2px; height: 30px; width: 65px; line-height: 30px;">取消</button>
				</div>
			</div>
			<div id="intelQueryRight"
				style="width: 290px; float: left; display: none; border-left: 1px solid #31708f;">
				<div style="margin-left: 10px; width: 100%;">
					<table style="width: 100%; height: 100%; font-size: 14px;">
						<tbody>
							<tr>
								<td>
									<label
										style="margin-right: 5px; font-weight: normal; height: 40px;">选择已录入事件</label>
								</td>
							</tr>
							<tr>
								<td style="height: 40px;">
									时间&nbsp;
									<input type="text" id="intelQuerytime" style="width:200px" />
								</td>
							</tr>
							<tr style="height: 40px;">
								<td>
									部门&nbsp;
									<select id="departmentNameSelect" style="height: 25px; width: 130px">
									</select>
									<button type="button" style="margin-left: 20px;" class="btn btn-default" id="findPatrolEvents" title="查询">
										<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div id="jqgridTable" style="margin-left: 10px;width:280px;">
					<table style="width: 100%;">
					<thead>
					<tr style="width: 100%; height: 38px; background-color: #E6E6E6;">
					<th style="width:80px; text-align: center; color: #058563;">部门</th>
					<th style="width:80px; text-align: center; color: #058563;">人员</th>
					<th style="text-align: center; color: #058563;">事件描述</th>
					</tr>
					</thead>
					</table>
					<table id="eventTable" lay-filter="eventFilter"></table>
				</div>
			</div>
		</div>
	</div>    

	<input type="hidden" id="xLocation" value="" />
	<input type="hidden" id="yLocation" value="" />
	<!-- 资源查询-自定义查询 -->
	<div id="drawResourceQuery" style="display:none;position: absolute;top:60px;left:75px;width:274px;background: rgba(255,255,255);">
		<div style="border-radius: 2px 2px 0 0; background-color: #F8F8F8; overflow: hidden; color: #333; line-height: 42px; border-bottom: 1px solid #eee; font-size: 14px;">
			&nbsp;&nbsp;&nbsp;&nbsp;叠加分析
			<img id="closeDrawResourceButton" src="/ResourceMonitor/images/layerTitle/closeButton.png"
				height="16" width="16"
				style="margin-right: 10px; float: right; margin-top: 10px;" />
			 <div style="float:right;display:inline;padding:10px;" id="drawResourceExpand">
    			<span class="esri-icon-expand" style="transform:rotate(90deg);" id="drawResourceExpandSpan"></span>
    		</div> 
			<div id="drawResourceQueryBody" style="height:180px;background: rgba(255,255,255);width:100%;">
				<div style="background: rgba(255,255,255);width:100%;border-top:#0000006b 2px solid;">
					<ul id="myTab" class="nav nav-tabs">
						<li class="active"><a id="kjhzId" href="#kjhzHref" data-toggle="tab">空间绘制</a></li>
						<li><a id="wbdrId" href="#wbdrHref" data-toggle="tab">外部导入</a></li>
					</ul>
					<div id="myTabContent" class="tab-content" style="height:45px;">
						<div class="tab-pane fade in active" id="kjhzHref">
							<button onclick="drawResourceQuery('yuan')" class="layui-btn  layui-btn-xs" style="margin-left:17px;width:70px;height:30px;">圆</button>
							<button onclick="drawResourceQuery('juxing')" class="layui-btn  layui-btn-xs" style="margin:7px;width:70px;height:30px;">矩形</button>
							<button onclick="drawResourceQuery('')" class="layui-btn  layui-btn-xs" style="margin:7px;width:70px;height:30px;">多边形</button>
						</div>
						<div class="tab-pane fade" id="wbdrHref" style="padding:10px;">
				        	<div class="file">选择文件<input type="file" id="pdfFile" style="width:50px;" name="file" class="form-control" accept="application/vnd.ms-excel,application/zip">
							</div>
				    		<input id="fileName" class="form-control showFileName" style="top:10px;width:150px;display: inline;" readonly />
						</div>
					</div>
				</div>
				<div style="margin-top:10px;margin-left:20px;">
					分析方式<select id="drawResourceSelect" class="form-control" style="height:34px;text-align:center;display:inline;width:175px;">
				        <option value="2">裁剪</option>
				        <option value="0">相交</option>
				        <option value="1">包含</option>
			      </select>					
				</div>
				<div>
					<button id="clearDrawResourceLayer" class="layui-btn  layui-btn-xs layui-btn-primary" style="margin-left:98px;width:70px;height:30px;">清空</button>
					<button id="queryDrawResource" class="layui-btn  layui-btn-xs layui-btn-primary" style="margin-left:15px;width:70px;height:30px;">查询</button>
				</div>
			</div>
			
		</div>	
				
	</div>
	<!-- 资源查询-按单位查询 -->
	<div id="panelResourceQueryDiv" style="display:none;position: absolute;top:60px;left:75px;width:274px;height:250px;background: rgba(255,255,255,0);">
		<div style="background-color: #ffffff;display: flex;border-bottom: solid 1px #b9b9b9;">
			<div style="width: 250px;height:32px;padding-left:10px;line-height:32px;font-weight: 700;">行政区划选择</div>
 			<div id="resourceQueryToggle" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;">
				<span id="resourceQueryToggleSpan" class="esri-icon-expand" style="transform:rotate(90deg);"></span>
			</div> 
			<div id="resourceQueryClose" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;">
				<img style="width:16px;heigth:16px;" src="/ResourceMonitor/images/layerTitle/closeButton.png">
			</div>
			
		</div>
		<div id="resourceQueryDivBody" style="height:226px;background: rgba(255,255,255,0.7);">
			<div id="treeview-checkable"></div>
			<button id="resourceQueryButton" class="btn btn-default" style="margin-bottom:10px;margin-right:10px;position:absolute;bottom:0px;right:0px;">查询</button>
		</div>
	</div>
	<div  id="resourceQueryResultDiv" style="z-index:60;display:none;position: absolute;bottom:0px;right:0px;width:274px;height:280px;background: rgba(255,255,255);">
		<div style="background-color: #ffffff;border-bottom: solid 1px #b9b9b9;">
			<div style="display:inline;width:5px;height:32px;padding-left:10px;line-height:32px;font-weight: 700;"></div>
 			<div id="resourceQueryResultClose" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;float:right;" >
				<span class="layui-icon layui-icon-close" style="font-weight:bold;"></span>
			</div>
 			<div id="resourceQueryResultToggle" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;float:right;">
				<span id="resourceQueryResultToggleSpan" class="esri-icon-expand" style="transform:rotate(90deg);"></span>
			</div> 
			<span  style="float:right;margin:8px;" id="resourceQueryExportButton" title="导出">
				<img src="/ResourceMonitor/images/indexpage/download.png" class="" alt="xiazai">
			</span>
 		    <span style="float:right;margin-top:8px;margin-right:8px;" id="resourceQuerySumButton" title="汇总">
				<span class="icon-sourceSurvey" style="font-size:20px;"><span>
			</span> 
		</div>
		<table id="resourceQueryTable" lay-filter="resourceQueryFilter"></table>
	</div>
	<!-- 智能分析-叠加分析 -->
	<div  id="drawResourceQueryResultDiv" style="z-index:60;display:none;position: absolute;bottom:0px;right:0px;width:274px;height:280px;background: rgba(255,255,255);">
		<div style="background-color: #ffffff;border-bottom: solid 1px #b9b9b9;">
			<div style="display:inline;width:5px;height:32px;padding-left:10px;line-height:32px;font-weight: 700;"></div>
 			<div id="drawResourceQueryResultClose" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;float:right;" >
				<span class="layui-icon layui-icon-close" style="font-weight:bold;"></span>
			</div>
 			<div id="drawResourceQueryResultToggle" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;float:right;">
				<span id="drawResourceQueryResultToggleSpan" class="esri-icon-expand" style="transform:rotate(90deg);"></span>
			</div> 
			<span type="button"  style="float:right;margin:8px;" id="drawResourceQueryExportButton" title="导出">
				<img src="/ResourceMonitor/images/indexpage/download.png" class="" alt="xiazai">
			</span>
			<span style="float:right;margin-top:8px;margin-right:8px;" data="0" id="drawResourceQuerySumButton" title="汇总">
				<span class="icon-sourceSurvey" style="font-size:20px;"><span>
			</span> 
		</div>
		<table id="drawResourceQueryTable" lay-filter="drawResourceQueryFilter"></table>
	</div>
	<!-- 关键之指标 -->
	<div  id="guanjianzhibiaoDiv" style="z-index:60;display:none;position:absolute;bottom:0px;right:0px;width:274px;height:280px;background: rgba(255,255,255);">
		<div style="width:20%;height:100%;float:left;padding-left:20px;padding-top:10px;background:#EDF2ED;">
			<div style="font-weight;font-size:15px;padding-left:40px;">关键指标-额尔古纳林业局</div>
			<div>
				<div style="margin:10px;float:left;">
					<div style="background:rgb(192, 39, 45);height:60px;width:100px;vertical-align: middle;display: table-cell;text-align: center;color:#fff;">100</div>
					<div style="width:100%;text-align:center;">森林覆盖率</div>
				</div>
				<div style="margin:10px;float:left;">
					<div style="background:#2E3191;height:60px;width:100px;vertical-align: middle;display: table-cell;text-align: center;color:#fff;">100</div>
					<div style="width:100%;text-align:center;">林地面积</div>
				</div>
				<div style="margin:10px;float:left;">
					<div style="background:rgb(102, 45, 144);height:60px;width:100px;vertical-align: middle;display: table-cell;text-align: center;color:#fff;">100</div>
					<div style="width:100%;text-align:center;">森林蓄积</div>
				</div>
				<div style="margin:10px;float:left;">
					<div style="background:rgb(0, 104, 55);height:60px;width:100px;vertical-align: middle;display: table-cell;text-align: center;color:#fff;">100</div>
					<div style="width:100%;text-align:center;">林木绿化率</div>
				</div>
			</div>
		</div>
		<div style="width:80%;height:100%;float:left;">
			<div style="background-color:#ffffff;">
				<div style="display:inline;width:5px;height:32px;padding-left:10px;line-height:32px;font-weight: 700;"></div>
	 			<div id="guanjianzhibiaoDivClose" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;float:right;" >
					<span class="layui-icon layui-icon-close" style="font-weight:bold;"></span>
				</div>
	 			<div id="guanjianzhibiaoDivToggle" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;float:right;">
					<span id="guanjianzhibiaoDivToggleSpan" class="esri-icon-expand" style="transform:rotate(90deg);"></span>
				</div> 
			</div>
			<div id="gjzbEchart" style="width:100%;height:200px;"></div>
		</div>
	</div>	
	<div id="panelHulin" style="position: absolute;top:60px;left:75px;width:274px;background: rgba(255,255,255,.7);display:none;" >
		<div style="background-color: #ffffff;display: flex;border-bottom: solid 1px #b9b9b9;">
			<div style="width: 242px;height:32px;padding-left:10px;line-height:32px;font-weight: 700;">护林员巡检</div>
			<div id="InfoHulin" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;" title="收起">
				<span class="esri-icon-expand"></span>
			</div>
		</div>
		<div class="tabbable" id="tabs-339226" style="width:98%;border-collapse: inherit;height: 93%;margin: 0 auto;">
			<ul id="myTab" class="nav nav-tabs">
				<li class="active"><a id="ashijian1" href="#shijian1" data-toggle="tab">实时位置</a></li>
				<li><a id="ashijian2" href="#shijian2" data-toggle="tab">上报事件</a></li>
			</ul>
			<div id="myTabContent" class="tab-content">
				<div class="tab-pane fade in active" id="shijian1">
					<div style="display: flex;margin: 5px 0 5px 10px;">
						<label for="department">管护单位</label>
    					<select id="department" class="form-control">
							<!-- <option>全部</option> -->	
						</select>
					</div>
					<div style="display: flex;margin: 5px 0 5px 10px;">
						<label for="personName">人员姓名</label>
    					<input id="personName" class="form-control" style="width:125px;"/>	
						<button type="button" class="btn btn-default" id="submit" title="查询">
							<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
						</button>
					</div>
					<div id="gridCond" style="width:100%;border-collapse: inherit;background-color: #fff;">
				     <table style="width: 100%;">
						<thead>
						<tr style="width: 100%; height: 38px; background-color: #E6E6E6;">
							<th style="width: 10%; text-align: center; color: #058563;"></th>
							<th style="width: 25%; text-align: center; color: #058563;">护林员</th>
							<th style="width: 35%; text-align: center; color: #058563;">单位</th>
							<th style="width: 15%; text-align: center; color: #058563;">概况</th>
							<th style="width: 15%; text-align: center; color: #058563;">定位</th>
						</tr>
						</thead>
					</table>
						<table id="jqgrid1"></table>
					</div>	
				</div>
				<div class="tab-pane fade" id="shijian2">
					<div style="display: flex;margin: 5px 0 5px 10px;">
						<label for="department2">管护单位</label>
    					<select id="department2" class="form-control">
							<!-- <option>全部</option> -->	
						</select>
						<select id="readState"
								class="form-control" style="width: 60px; padding-left: 3px;display:none">
								<option value=5>全部</option>
								<option value=0>未读</option>
								<option value=1>已读</option>
								<option value=2>已回复</option>
						</select>
					</div>
					<div style="display: flex;margin: 5px 0 5px 10px;">
						<label for="times">起止时间</label>
    					<input id="times" class="form-control"/>	
					</div>
					<div style="display: flex;margin: 5px 0 5px 10px;">
						<label for="personName2">人员姓名</label>
    					<input id="personName2" class="form-control" style="width:125px;"/>	
						<button type="button" class="btn btn-default" id="submit2" title="查询">
							<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
						</button>
					</div>
					<div id="gridCond" style="width:100%;border-collapse: inherit;background-color: #fff;">
				     <table style="width: 100%;">
						<thead>
						<tr style="width: 100%; height: 38px; background-color: #E6E6E6;">
							<th style="width: 10%; text-align: center; color: #058563;"></th>
							<th style="width: 20%; text-align: center; color: #058563;">护林员</th>
							<th style="width: 30%; text-align: center; color: #058563;padding-left:15px;">单位</th>
							<th style="width: 20%; text-align: center; color: #058563;">详情</th>
							<th style="width: 20%; text-align: left; color: #058563;">定位</th>
						</tr>
						</thead>
					</table>
						<table id="jqgrid2"></table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="panelLinchang" style="position: absolute;left:60px;width:250px;background: rgba(255,255,255,.7);display:none;z-index: 9999999" >
		<div style="background-color: #ffffff;display: flex;border-bottom: solid 1px #b9b9b9;">
			<div style="width:275px;height:32px;padding-left:10px;line-height:32px;font-weight: 700;">组织机构</div>
			<div id="infoLinchang" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;" title="收起">
				<span class="esri-icon-expand"></span>
			</div>
		</div>
		<div id="zuzhi_tree" class="treeview"></div>
	</div>	
	<div id="panelUAV" style="position: absolute;top:60px;left:75px;width:300px;background: rgba(255,255,255,.7);display:none;" >
		<div style="background-color: #ffffff;display: flex;border-bottom: solid 1px #b9b9b9;">
			<div style="width:275px;height:32px;padding-left:10px;line-height:32px;font-weight: 700;">无人机巡检</div>
			<div id="InfoUAV" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;" title="收起">
				<span class="esri-icon-expand"></span>
			</div>
		</div>
		<div style="margin:0;">
			<!-- <span id="airplaneLive" style="color:rgb(20, 124, 212);cursor:pointer;">巡检直播</span>
			<span id="airplaneRecord" style="cursor:pointer;margin-left:20px;">视频回放</span> -->
			<ul id="myTab" class="nav nav-tabs">
				<li class="active"><a id="airplaneLive" href="" data-toggle="tab">巡检直播</a></li>
				<li><a id="airplaneRecord" href="" data-toggle="tab">巡检回看</a></li>
			</ul>
		</div>
		<div id="airplaneDiv" style="margin:10px;">
			<table id="table" lay-filter="filter" style="margin:5px;"></table>
		</div>
	</div>
	<div id="panelShipin" style="position: absolute;top:60px;left:75px;width:274px;background: rgba(255,255,255,.7);display:none;" >
		<div style="background-color: #ffffff;display: flex;border-bottom: solid 1px #b9b9b9;">
			<div style="width: 242px;height:32px;padding-left:10px;line-height:32px;font-weight: 700;">林火视频监控</div>
			<div id="InfoShipin" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;" title="收起">
				<span class="esri-icon-expand"></span>
			</div>
		</div>
	</div>
	<!-- 事件绘制方法 -->
	<div id="panelEventDraw" style="position: absolute;top:60px;left:75px;width:330px;background: rgba(255,255,255,.7);display:none;" >
		<div style="background-color: #ffffff;display: flex;border-bottom: solid 1px #b9b9b9;">
			<div style="width:290px;height:32px;padding-left:10px;line-height:32px;font-weight:400;">事件标绘</div>
			<div id="closeEventDraw" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;" title="关闭">
				<img id="closeButton" src="/ResourceMonitor/images/layerTitle/closeButton.png"
				height="16" width="16"/>
			</div>
			
		</div>
		<div style="margin:0">
			<!-- <span id="recentEvent" style="color:rgb(20, 124, 212);cursor:pointer;">最近事件</span>
			<span id="reportEvent" style="cursor:pointer;margin-left:20px;cursor:pointer;">上报事件</span>
			<span id="sosAlert" style="cursor:pointer;margin-left:20px;cursor:pointer;">监控警报</span> -->
			<ul id="myTab" class="nav nav-tabs">
				<li class="active"><a id="recentEvent" href="" data-toggle="tab">最近事件</a></li>
				<li><a id="reportEvent" href="" data-toggle="tab">上报事件</a></li>
				<li><a id="sosAlert" href="" data-toggle="tab">监控警报</a></li>
			</ul>
		</div>
		<div id="eventDrawDiv" style="margin:10px;">	
			<div id="eventDrawDivHead"></div>
			<div id="eventDrawDivBottom" >
				<table style="margin-left:70px;margin-top:40px;">
					<tr><td width="100px;"><button id="doMapDraw" class="layui-btn layui-btn-sm layui-btn-primary" style="width:68px;">图上标绘</button></td>
					<td width="180px;"><button id="doDrawLocation" class="layui-btn layui-btn-sm layui-btn-primary" style="width:68px;">坐标标绘</button></td>
				</tr></table>
			</div>
		</div>
	</div>
	<div id="flightEchart"></div>
	<div id="panelFlight" style="position: absolute;top:60px;left:75px;width:330px;background: rgba(255,255,255,.7);display:none;" >
		<div style="background-color: #ffffff;display: flex;border-bottom: solid 1px #b9b9b9;">
			<div style="width:300px;height:32px;padding-left:10px;line-height:32px;font-weight: 700;">飞行模式</div>
			<div id="infoFlight" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;" title="收起">
				<span class="esri-icon-expand"></span>
			</div>
		</div>
		
		<div class="tabbable" style="width:98%;border-collapse: inherit;height: 93%;margin: 0 auto;">
<!-- 			<ul id="myTab" class="nav nav-tabs" style="height:30px;border-bottom:0px;">
				<li class="active"><a href="#flightModelLi1" data-toggle="tab">路线飞行</a></li>
				<li><a href="#flightModelLi2" data-toggle="tab">环绕飞行</a></li>
				<li style="left:10px;top:5px;">
					视角模式
					<select class="form-control" id="flightVisual" style="width:187px;display:inline;">
						<option value="80">第一视角</option>
						<option value="0">上帝视角</option>
					</select>
				</li>
				<li style="left:30px;top:10px;"><div id="flightModelMessage" class="esri-icon-non-visible" title="剖面信息隐藏"></div></li>
			</ul> -->
			<div id="myTabContent" class="tab-content">
				<div class="tab-pane fade in active" id="flightModelLi1">
					<div style="display: flex;margin: 5px 0 5px 10px;">
						<label for="personName">路线名称</label>
			    		<input id="personName" class="form-control" style="width:140px;" />	
						<button type="button" class="btn btn-default" id="submitFlightButton" title="查询">
							<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
						</button>
						<button type="button" class="btn btn-default" id="refreshFlightButton" title="重置">
							<span class="glyphicon glyphicon-refresh"></span>
						</button>
					</div>
					<div style="display: flex;margin: 5px 0 5px 10px;">
						<label for="flightVisual">视角模式</label>
			    		<select class="form-control" id="flightVisual" style="width:140px;display:inline;">
							<option value="80">第一视角</option>
							<option value="0">上帝视角</option>
						</select>
						<div style="margin-left:20px;margin-top:5px;" id="flightModelMessage" class="esri-icon-non-visible" title="剖面信息隐藏"></div>
					</div>
					<div  id="gridCond" style="margin-left:5px;margin-right:5px;">
						<table style="width: 100%;">
							<thead>
							<tr style="width: 100%; height: 38px; background-color: #E6E6E6;">
							<th style="width:50%; text-align: center; color: #058563;">路线名称</th>
							<th style="width:50%; text-align: center; color: #058563;">操作</th>
							</tr>
							</thead>
							</table>
						<table id="FlightTable" lay-filter="FlightFilter"></table>
					</div>
					<div style="display: flex;margin: 50px 0 5px 10px;font-size:10px">
						<button type="button" class="" id="flightLineDraw" title="" style="height:28px;width:90px;border:0;background-color:#fff;margin-right:10px;margin-left:105px;">路线绘制</button>
					</div>
				</div>
				<div class="tab-pane fade" id="flightModelLi2">
					<div style="display: flex;margin: 5px 0 5px 10px;">
						<label for="timesFlight2">设计日期</label>
			    		<input id="timesFlight2" class="form-control" style="width:240px"/>
					</div>
					<div style="display: flex;margin: 5px 0 5px 10px;">
						<label for="personName2">路线名称</label>
			    		<input id="personName2" class="form-control" style="width:187px;"/>	
						<button type="button" class="btn btn-default" id="submitFlightButton2" title="查询">
							<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
						</button>
					</div>
					<div  id="gridCond" style="margin-left:5px;margin-right:5px;">
						<table style="width: 100%;">
							<thead>
							<tr style="width: 100%; height: 38px; background-color: #E6E6E6;">
							<th style="width:20%; text-align: center; color: #058563;">设计日期</th>
							<th style="width:35%; text-align: center; color: #058563;">路线名称</th>
							<th style="width:45%; text-align: center; color: #058563;">操作</th>
							</tr>
							</thead>
							</table>
						<table id="FlightTable2" lay-filter="FlightFilter2"></table>
					</div>
					<div style="display: flex;margin: 70px 0 5px 10px;font-size:10px">
						<button type="button" class="" id="flightLineDraw2" title="" style="height:28px;width:90px;border:0;background-color:#fff;margin-right:10px;margin-left:105px;">兴趣点绘制</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 地图输出方法 -->
	<div id="panorama" style="display:none;"></div>
	<div id="panExport" style="position: absolute;top:140px;right:15px;width:274px;background: rgba(255,255,255,.7);z-index:999;height:400px;display: none;" >
		<div style="background-color: #ffffff;display: flex;border-bottom: solid 1px #b9b9b9;">
			<div style="width: 242px;height:32px;padding-left:10px;line-height:32px;font-weight: 700;">地图导出设置</div>
			<div id="InfoExport" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;" title="收起">
				<span class="esri-icon-close"></span>
			</div>			
		</div>
		<div id="SettingPage" style="padding: 0;height: 92%; border: 0;">
			<form class="layui-form" action="">
				<div class="layui-form-item" style="">
    				<label class="layui-form-label" style="padding: 9px; text-align: left;font-weight: 800;">标题栏：</label>
    				<div class="layui-input-block">
      					<input lay-filter="test" type="radio" id="titleInfo1" name="titleInfo" value=1 title="显示" checked>
      					<input lay-filter="test" type="radio" id="titleInfo2" name="titleInfo" value=0 title="不显示">
    				</div>
    				<div class="layui-input-block" style="margin: 10px 0 0 16px;">
      					<input type="text" id="titleContent" value="区域示意图" class="form-control" style="width: 240px;margin:0">
    				</div>
    				<div class="layui-input-block" style="margin: 10px 0 0 16px;">
      					<label class="" style="">字体颜色</label>
      					<div id="colorpicker" style="margin:0;"></div>
    				</div>
    				<div class="layui-input-block" style="margin: 10px 0 0 16px;display:flex">
      					<label class="" style="">字体大小</label>
      					<div id="slideTest1" class="demo-slider" style="width: 150px;margin: 8px 0 0 10px;"></div>
      					<span id="slideTest11" class="layui-badge layui-bg-black">20</span>
    				</div>
  				</div>
  				<div class="layui-form-item" style="">
    				<label class="layui-form-label" style="padding: 9px; text-align: left;font-weight: 800;">比例尺：</label>
    				<div class="layui-input-block">
      					<input lay-filter="test3" type="radio" name="scaleInfo" value=1 title="显示" checked>
      					<input lay-filter="test3" type="radio" name="scaleInfo" value=0 title="不显示">
    				</div>
    				<div class="layui-input-block" style="margin: 10px 0 0 16px;">
      					<label class="" style="">字体颜色</label>
      					<div id="colorpicker2" style="margin:0;"></div>
    				</div>
    				<div class="layui-input-block" style="margin: 10px 0 0 16px;display:flex">
      					<label class="" style="">字体大小</label>
      					<div id="slideTest2" class="demo-slider" style="width: 150px;margin: 8px 0 0 10px;"></div>
      					<span id="slideTest12" class="layui-badge layui-bg-black">20</span>
    				</div>
  				</div>
  				<div class="layui-form-item" style="">
    				<label class="layui-form-label" style="padding: 9px; text-align: left;font-weight: 800;">指北针：</label>
    				<div class="layui-input-block">
      					<input lay-filter="test4" type="radio" name="northIcon" value=1 title="显示" checked>
      					<input lay-filter="test4" type="radio" name="northIcon" value=0 title="不显示">
    				</div>
  				</div>
  				<div class="layui-form-item" style="">
    				<button type="button" class="btn btn-default" onclick="mapExport()" style="width:250px;height:25px;color:#fff;background-color:#058563;margin-top:15px;" id="export">导出</button>
  				</div>
			</form>
								
  			
		</div>
	</div>
	<!-- VR全景面板 -->
	<div id="panelVR" style="position: absolute;top:60px;left:75px;width:274px;background: rgba(255,255,255,.7);display:none;" >
		<div style="background-color: #ffffff;display: flex;border-bottom: solid 1px #b9b9b9;">
			<div style="width: 242px;height:32px;padding-left:10px;line-height:32px;font-weight: 700;">全景列表</div>
			<div id="InfoVR" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;" title="收起">
				<span class="esri-icon-expand"></span>
			</div>
		</div>
		<div style="display: flex;margin: 5px 0 5px 10px;">
			<label for="VRname">名称</label>
    		<input id="VRname" class="form-control" style="width:165px;"/>	
			<button type="button" class="btn btn-default" id="submitVR" title="查询">
				<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
			</button>
		</div>
		<div id="gridCond" style="width:100%;border-collapse: inherit;background-color: #fff;">
			<table style="width: 100%;">
				<thead>
					<tr style="width: 100%; height: 38px; background-color: #E6E6E6;">
						<th style="width: 10%; text-align: center; color: #058563;">序号</th>
						<th style="width: 25%; text-align: center; color: #058563;">名称</th>
						<th style="width: 15%; text-align: center; color: #058563;">定位</th>
					</tr>
				</thead>
			</table>
			<table id="jqgridVR"></table>
		</div>
	</div>
	<div id="VRInfo" style="display:none;position: absolute;top:60px;left:75px;width:115px;height:122px;background:url(/ResourceMonitor//images/pop.gif) no-repeat 0 0">
		<div id="VrPhoto" style="height: 75px;width: 105px;margin: 7px 5px 0 5px;">
			<img src="/ResourceMonitor/IdentifyPhoto/small/cerro.jpg" style="width: 100%;height: 100%;">
		</div>
		<div id="VrTitle" style="padding-left: 10px;">额尔古纳自然...</div>
	</div>
	<!-- 视频回放参数传递 -->
	<input type="hidden" id="recordFile">
	<input type="hidden" id="recordCode">
	<input type="hidden" id="recordStart">
	<input type="hidden" id="recordEnd">	
	<!-- 视频回放参数传递 -->
	<input type="hidden" id=address>
	<input type="hidden" id="usercode">
</body>

<script type="text/javascript">
var appVersion = navigator.appVersion.toLowerCase();
//获取路径
var curWwwPath = window.document.location.href;
var pathname = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathname);
var localhostPath = curWwwPath.substring(0, pos);
// 获取项目名
var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1); 
var layer;
layui.use('layer', function(){
    layer = layui.layer;
});
function showMap(){
	layer.closeAll();
}

var map, view,eErGuNaPolygon;
var patrolregion;
var symbol3dLayer,locationLayer,highlightRouteLyr,signFlagLayer;
var choosedGraphic=null;
var choosedFlag=false;
var highlightRoutes = new Array(4);
var lineWidth=-1,addEvent3dDlgIndex=-1, pntBufferDlgIndex = -1,viewshedDlgIndex=-1,routeAnaDlgIndex=-1,closestFacilityDlgIndex=-1,_IdentifyDlgIndex,progressDlg;
var xbQueryTask,lwtQueryTask,fhzQueryTask,jmdQueryTask;

var vectorBasemap;
var imageBasemap;
var pxTileLayer,pdTileLayer;
var imageLayerArray=new Array();
var demLayer;
var demQueryLayer;
var baseGeoMapLayers;

//VRmark图层
var VrmarkLayer;
var xiaobanLayer;
var xiangzhenZhi_3d;
var signPointFlag=false;//是否处于标记状态的标志
var lineBufferFlag=false;
var xiangzhFeatureLayer,cuntFeatureLayer,liaoWangTai_3d,fangHuoZhan_3d,jmdFeatureLayer,tjpFeatureLayer,mydFeatureLayer,heliudLayer;
var soilURL = "http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer";
// 属性查询
 var identifyTask, identifyParams;
 var dxLegend;
 var oldGraphic;
 var oldlabelGraphic;
 var haeExacuteQuery;
 var IkeyFlag = 0;
 var layerIndex=-1;
//轨迹回放人员图标
 var trackLasyer;
 var userPositionLayer;
 var tableHeight;
 var positionLayer,trailLayer;
 var drawResourceLayer;//叠加分析绘图图层
 var viewModel2;
 var viewModel1;
 var viewHeight;
 var viewWidth;
 var dynamic_layers;
 var resizeFlag = ''; 
  var lineareaIndex=-1;
 var xyLocationIndex = -1;
 var flagFullMap = 0;
 
 var indexpucha;
 var indexxiangcha;
 var indexjianyi;
 var indexmianji;
 var indexdaima;
// 初始加载
function setLayerStyle(){
	
	var hei = $(window).height()+"px";
	var wid = $(window).width()-$("#nav").width()+"px";
	
	layer.style(indexpucha, {
	  width: wid,
	  height: hei
	});  
	layer.style(indexxiangcha, {
	  width: wid,
	  height: hei
	}); 
	
	layer.style(indexjianyi, {
	  width: wid,
	  height: hei
	});  
	layer.style(indexmianji, {
	  width: wid,
	  height: hei
	}); 
	layer.style(indexdaima, {
		  width: wid,
		  height: hei
	}); 
}
function setLayerStyle2(math){
	
	var hei = $(window).height()+"px";
	var wid = $(window).width()-$("#nav").width()+math+"px";
	var lef;
	if(math > 0){
		lef = 160-math+"px";
	}else{
		lef = 160+"px";
	}
	layer.style(indexpucha, {
	  width: wid,
	  height: hei,
	  top: '0px',
	  left: lef
	});  
	layer.style(indexxiangcha, {
	  width: wid,
	  height: hei,
	  top: '0px',
	  left: lef
	}); 
	
	layer.style(indexjianyi, {
	  width: wid,
	  height: hei,
	  top: '0px',
	  left: lef
	});  
	layer.style(indexmianji, {
	  width: wid,
	  height: hei,
	  top: '0px',
	  left: lef
	}); 
	layer.style(indexdaima, {
		  width: wid,
		  height: hei,
		  top: '0px',
		  left: lef
	}); 
}




$(document).ready(function() {
	var cookie_userDepartmentName='额尔古纳林业局';
	var cookie_department =  localStorage.getItem('cookie_department');
	var cookie_userDepartmentVal =  localStorage.getItem('cookie_userDepartmentVal');
	cookie_department = cookie_department.substring(0,cookie_department.length - 1);
	var eachDepart = cookie_department.split("&");
 	for (var i = 0; i < eachDepart.length; i++) {
		var eachDep = eachDepart[i].split("-");
		if(eachDep[0]==cookie_userDepartmentVal){
			cookie_userDepartmentName=eachDep[1];
		}
	}
    function get_ZuZhiTree() {
 	   var iconZuZhi = "glyphicon glyphicon-tree-conifer";
 	   var nodes = [];
 	 	for (var i = 0; i < eachDepart.length; i++) {
 			var eachDep = eachDepart[i].split("-");
 			if(eachDep[0]!='0'){
 	 		   var node = {
	               text : eachDep[1],
	               icon : iconZuZhi,
	               state : {
	                   disabled :(cookie_userDepartmentVal!='0')&&(eachDep[0]!=cookie_userDepartmentVal),
	                   selected:eachDep[0]==cookie_userDepartmentVal
	               },
 	 		   }
 	 		   nodes.push(node);
 			}
 		}

        var tree = [ {
            text : "额尔古纳林业局",
            state : {
                selected : cookie_userDepartmentVal=='0',
            },
            nodes : nodes
        } ];

        return tree;
    }
    
	var aheight = $(window).height() - 100;
	if(aheight < 600){
		$("[id^='panel']").height(aheight);
	}else{
		$("[id^='panel']").height(600);
	}
	$("#panelVR").height(480);
	$("#panelLinchang").height(0);
	$("#panelResourceQueryDiv").height(258);
	 $(window).resize(function () {
		 // alert("2222")
		setLayerStyle();
		
		 var aheight = $(window).height() - 100;
			if(aheight < 600){
				$("[id^='panel']").height(aheight);
			}else{
				$("[id^='panel']").height(600);
		    } 
			$("#panelVR").height(480);
			$("#panelLinchang").height(0);
			$("#panelResourceQueryDiv").height(258);
			if(aheight<300){
				$('#zuzhi_tree').treeview('collapseAll', { silent: true });
			}
	 });
     var defaultData = [
         {
           text: '额尔古纳林业局',
           state: {
        	    expanded:true,
           },
           nodes: [
           	{
               text: '恩和林场',
               state: {
               }
             },
             {
               text: '七卡林场',
               state: {
               }
             },
             {
               text: '上护林林场',
               state: {
               }                  
             },
             {
               text: '上库力林场',
               state: {
               }                  
             },
             {
               text: '兴安林场',
               state: {
               }                  
             },
             {
                text: '自兴林场',
                state: {
                }                  
              }
           ]
         },


       ];
      var $checkableTree = $('#treeview-checkable').treeview({
         data: defaultData,
         showIcon: true,
         showCheckbox: true,
         //selectedBackColor:"#fff",
         //selectedColor:"#000",
         checkedIcon:"icon-cell-selected",
         uncheckedIcon:"icon-cell-unselected",
         expandIcon:"icon-cell-unexpand",
         collapseIcon:"icon-cell-expand",            
         onNodeChecked: function(event, node) {
         	var select0 = $('#treeview-checkable').treeview('getNode',0).state.checked;
        	var select1 = $('#treeview-checkable').treeview('getNode',1).state.checked;
        	var select2 = $('#treeview-checkable').treeview('getNode',2).state.checked;
        	var select3 = $('#treeview-checkable').treeview('getNode',3).state.checked;
        	var select4 = $('#treeview-checkable').treeview('getNode',4).state.checked;
        	var select5 = $('#treeview-checkable').treeview('getNode',5).state.checked;
        	var select6 = $('#treeview-checkable').treeview('getNode',6).state.checked;
        	if(node.nodeId==0){
        		for(var i=0;i<6;i++){
        			$('#treeview-checkable').treeview('checkNode', [i+1, { silent:true } ]);
        		}
        	}else{
        		if(select1&&select2&&select3&&select4&&select5&&select6){
        			$('#treeview-checkable').treeview('checkNode', [0, { silent:true } ]);
        		}
        	}
         },
         onNodeUnchecked: function (event, node) {
         	var select0 = $('#treeview-checkable').treeview('getNode',0).state.checked;
        	var select1 = $('#treeview-checkable').treeview('getNode',1).state.checked;
        	var select2 = $('#treeview-checkable').treeview('getNode',2).state.checked;
        	var select3 = $('#treeview-checkable').treeview('getNode',3).state.checked;
        	var select4 = $('#treeview-checkable').treeview('getNode',4).state.checked;
        	var select5 = $('#treeview-checkable').treeview('getNode',5).state.checked;
        	var select6 = $('#treeview-checkable').treeview('getNode',6).state.checked;
        	if(node.nodeId==0){
        		for(var i=0;i<6;i++){
        			$('#treeview-checkable').treeview('uncheckNode', [i+1, { silent:true } ]);
        		}
        	}else{
        		if(!(select1&&select2&&select3&&select4&&select5&&select6)){
        			$('#treeview-checkable').treeview('uncheckNode', [0, { silent:true } ]);
        		}
        	}
         }
      }); 

	 // 左侧菜单点击事件
	 //一级菜单点击事件
	 $("#Flight").off("click").on("click",function(){
	    	$("[id^='panel']").hide();
	    	getIcon("iconFlight");
	    	if($("#Flight").css("background-color")== "rgb(255, 255, 255)"){
	    		view.graphics.removeAll();
	    		$("#iconFlight").css("color","#fff");
	    		$("#Flight").css("background-color",analysis.themeColor);
	    		$("#panelFlight").show("slow");
	    		loadFlight();
	    		//loadFlight2();
	    	}else{
	    		$("#iconFlight").css("color","#6e6e6e");
	    		$("#Flight").css("background-color","rgb(255, 255, 255)");
	    	}
	    });
		$("#infoFlight").off().on("click",function(){
			 layer.closeAll();
			 locationLayer.removeAll();
		     $("#panelFlight").hide("slow");
	 		 $("#iconFlight").css("color","#6e6e6e");
			 $("#Flight").css("background-color","rgb(255, 255, 255)");
		 }); 
		
	
	$("#linchang").off("click").on("click",function(){
		console.log($(window).width());
		console.log($("#nav").width());
		var hei = $(window).height()+"px";
		var wid = $(window).width()-$("#nav").width()+"px";
		
		layer.closeAll();
		
		indexpucha = layer.open({
			 type: 2, 
			 content: '/ResourceMonitor/jsp/BCH/pucha.jsp', //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
			 area: [wid, hei],
			 offset: 'rb',
			 title: false,
			 closeBtn: 0,
			 id : 'pucha'
		});
		
    });
	
	$("#xiangcha").off("click").on("click",function(){
		var hei = $(window).height()+"px";
		var wid = $(window).width()-$("#nav").width()+"px";
		
		layer.closeAll();
		
		indexxiangcha = layer.open({
			 type: 2, 
			 content: '/ResourceMonitor/jsp/BCH/pucha.jsp', //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
			 area: [wid, hei],
			 offset: 'rb',
			 title: false,
			 closeBtn: 0
		});
    });
	
	$("#xiangcha").off("click").on("click",function(){
		var hei = $(window).height()+"px";
		var wid = $(window).width()-$("#nav").width()+"px";
		
		layer.closeAll();
		
		indexxiangcha = layer.open({
			 type: 2, 
			 content: '/ResourceMonitor/jsp/BCH/xiangcha.jsp', //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
			 area: [wid, hei],
			 offset: 'rb',
			 title: false,
			 closeBtn: 0
		});
    });
	
	$("#jianyi").off("click").on("click",function(){
		var hei = $(window).height()+"px";
		var wid = $(window).width()-$("#nav").width()+"px";
		
		layer.closeAll();
		
		indexjianyi = layer.open({
			 type: 2, 
			 content: '/ResourceMonitor/jsp/BCH/jianyi.jsp', //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
			 area: [wid, hei],
			 offset: 'rb',
			 title: false,
			 closeBtn: 0
		});
    });
	
	$("#chengzaimianji").off("click").on("click",function(){
		var hei = $(window).height()+"px";
		var wid = $(window).width()-$("#nav").width()+"px";
		layer.closeAll();
		indexmianji = layer.open({
			 type: 2, 
			 content: '/ResourceMonitor/jsp/BCH/chengzaimianji.jsp', //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
			 area: [wid, hei],
			 offset: 'rb',
			 title: false,
			 closeBtn: 0
		});
    });
	
	$("#binghai").off("click").on("click",function(){
		var hei = $(window).height()+"px";
		var wid = $(window).width()-$("#nav").width()+"px";
		layer.closeAll();
		indexdaima = layer.open({
			 type: 2, 
			 content: '/ResourceMonitor/jsp/BCH/binghai.jsp', //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
			 area: [wid, hei],
			 offset: 'rb',
			 title: false,
			 closeBtn: 0
		});
    });
	$("#shuhai").off("click").on("click",function(){
		var hei = $(window).height()+"px";
		var wid = $(window).width()-$("#nav").width()+"px";
		layer.closeAll();
		indexdaima = layer.open({
			 type: 2, 
			 content: '/ResourceMonitor/jsp/BCH/shuhai.jsp', //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
			 area: [wid, hei],
			 offset: 'rb',
			 title: false,
			 closeBtn: 0
		});
    });
	$("#chonghai").off("click").on("click",function(){
		var hei = $(window).height()+"px";
		var wid = $(window).width()-$("#nav").width()+"px";
		layer.closeAll();
		indexdaima = layer.open({
			 type: 2, 
			 content: '/ResourceMonitor/jsp/BCH/chonghai.jsp', //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
			 area: [wid, hei],
			 offset: 'rb',
			 title: false,
			 closeBtn: 0
		});
    });
	$("#youhaizhiwu").off("click").on("click",function(){
		var hei = $(window).height()+"px";
		var wid = $(window).width()-$("#nav").width()+"px";
		layer.closeAll();
		indexdaima = layer.open({
			 type: 2, 
			 content: '/ResourceMonitor/jsp/BCH/youhaizhiwu.jsp', //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
			 area: [wid, hei],
			 offset: 'rb',
			 title: false,
			 closeBtn: 0
		});
    });
	$("#xingzhengquhua").off("click").on("click",function(){
		var hei = $(window).height()+"px";
		var wid = $(window).width()-$("#nav").width()+"px";
		layer.closeAll();
		indexdaima = layer.open({
			 type: 2, 
			 content: '/ResourceMonitor/jsp/BCH/xingzhengquhua.jsp', //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
			 area: [wid, hei],
			 offset: 'rb',
			 title: false,
			 closeBtn: 0
		});
    });
	
	$("#infoLinchang").off("click").on("click",function(){
		 layer.closeAll();
		 view.graphics.removeAll();
		 locationLayer.removeAll();
	     $("#panelLinchang").hide("slow");
	 });
	$("#hulin").on("click",function(){
    	$("[id^='panel']").hide();
    	getIcon("iconHulin");
    	$("#ashijian2").css({"background-color":"transparent","color":"#555;"});
		$("#ashijian1").css({"background-color":"transparent","color":"#555;"});
    		
		$("#ashijian1").css({"background-color":"#058563","color":"#fff"});
   		$("#panelHulin").show("slow");
   		$("#tabs-339226 a:first").tab('show');
   		
   		
   		tableHeight2 = $(window).height() - 300;
   		if(tableHeight2 > 400){
   			tableHeight2 = 400;
   		}
   		// 初始化表单
   		setTimeout(function() {
   			tableHeight = $("#panelHulin").height() - 140;
   			pageInit();
		},500);
    });
	 $("#InfoHulin").off("click").on("click",function(){
		 //layer.closeAll();
		 view.graphics.removeAll();
		 locationLayer.removeAll();
	     $("#panelHulin").hide("slow");
	 });
	 $("#ashijian1").off("click").on("click",function(){
		 $("#ashijian1").css({"background-color":"#058563","color":"#fff"});
		 $("#ashijian2").css({"background-color":"transparent","color":"#555;"});
		 layer.closeAll()
		 locationLayer.visible=true;
		 if(resizeFlag == 'shijian2'){
			 setTimeout(function() {
		 			pageInit();
			 },300);
			 resizeFlag = '';
		 }else{
			 $("#shijian1 .layui-table-body").height(tableHeight - 40); 
		 }	 
		
	 });
	 $("#ashijian2").off("click").on("click",function(){
		 $("#ashijian2").css({"background-color":"#058563","color":"#fff"});
		 $("#ashijian1").css({"background-color":"transparent","color":"#555;"});
		locationLayer.visible=false;
		layer.closeAll()
		if(resizeFlag == 'shijian1'){
			setTimeout(function() {
				pageInit2();
			},300);
			resizeFlag = '';
		}else{
			$("#shijian2 .layui-table-body").height(tableHeight2 - 40);
		}

	 });
	 $("#UAV").on("click",function(){
		view.graphics.removeAll();
    	$("[id^='panel']").hide();
    	getIcon("iconUAV");
    	$("#airplaneRecord").css({"background-color":"transparent","color":"#555"});
		$("#airplaneLive").css({"background-color":"transparent","color":"#555;"});
		
   		$("#airplaneLive").css({"background-color":"#058563","color":"#fff"});
   		setTimeout(function() {
   			tableHeight = $("#panelUAV").height() - 110;
   			airplane.loadAirplane();
		},500);
   		$("#panelUAV").show("slow");
    });
	$("#InfoUAV").off("click").on("click",function(){
	     $("#panelUAV").hide("slow");
	     $("#airplaneRecord").css({"background-color":"transparent","color":"#555"});
		 $("#airplaneLive").css({"background-color":"transparent","color":"#555;"});
	 });
	$("#shipin").on("click",function(){
		view.graphics.removeAll();
    	$("[id^='panel']").hide();
    	getIcon("iconShipin");
   		$("#panelShipin").show("slow");
    });
	$("#InfoShipin").off("click").on("click",function(){
	     $("#panelShipin").hide("slow");
	 });
	
	
	//概况信息
 	$("#huizong").on("click",function(){
		view.graphics.removeAll();
    	$("[id^='panel']").hide();
    	getIcon("");
    	var aheight = $(document).height();
		var awidth = $(document).width();
    	var Info = layer.open({
    		type : 2,
    		shade : 0,
    		title : [ "监测概况", 'font-size:14px;'],
    		content : '/ResourceMonitor/jsp/commandForFire/BaseStationMap/layers/information.jsp',
    		//id : 'Info',
    		resize : false,
    		anim : 2,
    		zIndex:100000000,
    		area : [awidth+'px',aheight+'px'],
    		success : function(layero, index) {
    			
    		}
    	});
    	layer.full(Info);
    }); 
	
 	$("#InfoVR").off("click").on("click",function(){
		 layer.closeAll();
		 view.graphics.removeAll();
		 VrmarkLayer.removeAll();
	     $("#panelVR").hide("slow");
	 });
 	
 	$("#submitVR").off("click").on("click",function(){
 		VRTable();
	 });
 	
 	$("#danyuanQuerey").off("click").on("click",function(){
    	getIcon("");
   		$("#panelResourceQueryDiv").css("display","");
		$('#resourceQueryToggleSpan').attr('class','esri-icon-expand')
		$('#resourceQueryDivBody').css('display','');
	});
 	$("#resourceQueryClose").off("click").on("click",function(){
 		$("#panelResourceQueryDiv").css("display","none");
 		$('#resourceQueryResultDiv').css('display','none');
 		layer.close(layerIndex);
 	});
 	$("#resourceQueryToggle").off("click").on("click",function(){
 		if($("#resourceQueryToggleSpan").attr("class")=="esri-icon-collapse"){
 			 $('#resourceQueryToggleSpan').attr('class','esri-icon-expand')
 			 $('#resourceQueryDivBody').css('display','');
 		}else{
 			 $('#resourceQueryToggleSpan').attr('class','esri-icon-collapse');
 			 $('#resourceQueryDivBody').css('display','none');
 		}
 	}); 	
 	$("#drawResourceQueryLi").off("click").on("click",function(){
 		getIcon('');
 		$('#drawResourceQuery').css('display','');
 	});
 	
	 $('#drawResourceExpand').off().on('click',function(){
		 if($('#drawResourceExpandSpan').attr('class')=='esri-icon-collapse'){
			 $('#drawResourceQueryBody').css('display','');
			 $('#drawResourceExpandSpan').attr('class','esri-icon-expand')
		 }else{
			 $('#drawResourceQueryBody').css('display','none');
			 $('#drawResourceExpandSpan').attr('class','esri-icon-collapse')
		 }
	 })
	 $('#closeDrawResourceButton').off().on('click',function(){
	 	  $('#drawResourceQuery').css('display','none');
	 	  document.body.style.cursor='default';
	 	  if(draw){
	 		 draw.reset();  
	 	  }
		  $('#drawResourceQueryResultDiv').css('display','none');
   		  layer.close(layerIndex);
	 })
 	 $(".file").on("change","input[type='file']",function(){
	    var filePath=$(this).val();
	    if(filePath.indexOf("xls")!=-1||filePath.indexOf("zip")!=-1){
	        var arr=filePath.split('\\');
	        var fileName=arr[arr.length-1];
	        $(".showFileName").val(fileName);
	        $(".showFileName").attr('title',fileName);
			var file_obj = document.getElementById('pdfFile').files[0];
			if(!file_obj){
				$(".showFileName").val("");
				layer.msg("您未上传文件，或者您上传文件类型有误！")
			}else{
				var fileName = file_obj.name;	
				var fd = new FormData();
				fd.append('username', 'root')
				fd.append('pdfFile', file_obj);
				$.ajax({
					url : '/ResourceMonitor/file/diejiafenxiUpload',
					type : 'POST',
					data : fd,
					processData : false, //tell jQuery not to process the data
					contentType : false, //tell jQuery not to set contentType
					//这儿的三个参数其实就是XMLHttpRequest里面带的信息。
					success : function(resp) {
						if(resp.status == 0){
							var polygon;
							if(resp.type=='xls'){
								//处理xls导入
								var data = resp.rows;
								var vertices=[];
								var message='';
								var regX = new RegExp(/^[\d]+(\.[\d]+)?$/);
								var regY = new RegExp(/^[\d]+(\.[\d]+)?$/);
								for(var i=0;i<data.length;i++){
									var xStr=data[i].split(',')[0];
									if(!regX.test(xStr)){
										message+=(i+2)+":X错误  ";
									}
									var x= parseFloat(xStr);
									var yStr=data[i].split(',')[1];
									if(!regY.test(yStr)){
										message+=(i+2)+":Y错误  ";
									}
									var y= parseFloat(yStr);
									vertices.push([x,y]);
								}
								if(message!=''){
									layer.msg(message);
									return;
								}
								require(["esri/geometry/Polygon"], function(Polygon){
									polygon=new Polygon({
					                	rings:vertices,
					                    spatialReference : view.spatialReference
					                });
								})
							}else{
								//处理shp文件
								var data = resp.rows;
								polygon =WktToPolygon(data[0],{wkid:4326});
							}
						   	 require(["esri/Graphic"], function(Graphic){
					     			var graphic = new Graphic({
					      			    geometry: polygon,
					      			    symbol:{
					      					type : "simple-fill",
					      					color : [ 255, 0, 0, 0.3 ],
					      					style : "solid",
					      					outline : {
					      						color : [ 255, 255, 0 ],
					      						width : 2
					      					}
					      				}
					      			 });
					     			drawResourceLayer.removeAll();
					     			drawResourceLayer.add(graphic);
					     			view.goTo(polygon);
						   	 });

						}else{
							layer.msg(resp.msg);
						}
					}
				});
			}
	    }else{
	    	$(".showFileName").attr('title','');
	        $(".showFileName").val("");
	        layer.msg("您上传文件类型有误！请重新选择!")
	        return false 
	    }
	 })
/* 	 $(".file").on("change","input[type='file']",function(){
			var file_obj = document.getElementById('pdfFile').files[0];
			if(!file_obj){
				$(".showFileName").val("");
				layer.msg("您未上传文件，或者您上传文件类型有误！")
			}else{
				var fileName = file_obj.name;	
				var fd = new FormData();
				fd.append('username', 'root')
				fd.append('pdfFile', file_obj);
				$.ajax({
					url : '/ResourceMonitor/file/UploadExecl',
					type : 'POST',
					data : fd,
					processData : false, //tell jQuery not to process the data
					contentType : false, //tell jQuery not to set contentType
					//这儿的三个参数其实就是XMLHttpRequest里面带的信息。
					success : function(resp) {
						if(resp.status == 0){
							var data = resp.rows;
							var verties=[];
							var message='';
							var regX = new RegExp(/^\d{8}(\.[\d]+)?$/);
							var regY = new RegExp(/^\d{7}(\.[\d]+)?$/);
							for(var i=0;i<data.length;i++){
								var xStr=data[i].split(',')[0];
								if(!regX.test(xStr)){
									message+=(i+2)+":X错误  ";
								}
								var x= parseFloat(xStr);
								var yStr=data[i].split(',')[1];
								if(!regY.test(yStr)){
									message+=(i+2)+":Y错误  ";
								}
								var y= parseFloat(yStr);
								verties.push([x,y]);
							}
						}else{
							//parent.layer.closeAll();
							layer.msg(resp.msg);
						}
					}
				});
			}	
		}) */
	 //关键指标
	 $('#guanjianzhibiaoId').off().on('click',function(){
		getIcon("");
		$('#guanjianzhibiaoDiv').css('display','');
 	    var awidth = $(window).width();
 	    if ($('#nav').hasClass('nav-mini')) {
 	    	awidth-=60;
		}else{
			awidth-=160;
		}
 	    $('#guanjianzhibiaoDiv').css('width',awidth+'px');
 	    $('#guanjianzhibiaoDiv').css('height','220px');
 	    $('#guanjianzhibiaoDivToggleSpan').attr('class','esri-icon-expand');
 	   var myChart = echarts.init(document.getElementById('gjzbEchart'));
 	   
	   function setChart(title,keys,datas){
	       // 指定图表的配置项和数据
	       var option = {
    		    title : {
    		        text: '某地区蒸发量和降水量',
    		    },
    		    tooltip : {
    		        trigger: 'axis'
    		    },
/*     		    legend: {
    		        data:['蒸发量']
    		    }, */
    		    toolbox: {
    		        show : true,
    		        feature : {
    		            dataView : {show: true, readOnly: false},
    		            magicType : {show: true, type: ['line', 'bar']},
    		            restore : {show: true},
    		            saveAsImage : {show: true}
    		        }
    		    },
    		    calculable : true,
    		    xAxis : [
    		        {
    		            type : 'category',
    		            data : keys
    		        }
    		    ],
    		    yAxis : [
    		        {
    		            type : 'value'
    		        }
    		    ],
    		    series : [
    		        {
    		            name:'蒸发量',
    		            type:'bar',
    		            data:datas,
    		            markPoint : {
    		                data : [
    		                    {type : 'max', name: '最大值'},
    		                    {type : 'min', name: '最小值'}
    		                ]
    		            },
    		            markLine : {
    		                data : [
    		                    {type : 'average', name: '平均值'}
    		                ]
    		            }
    		        }
    		    ]
    		};

	       myChart.setOption(option);
	   }
	 })
 	
	function getIcon(iconId){
		VrmarkLayer.removeAll();
		document.body.style.cursor='default';
	    if(draw){
			draw.reset();
		}
		$('#drawResourceQuery').css('display','none');
		$('#topSearchDiv').css('display','none');
		$("[id^='panel']").hide();
		$("#iconFlight").css("color","#6e6e6e");
		$("#Flight").css("background-color","rgb(255, 255, 255)");
		$("#time_slider_div").css("display","none");
		if(iconId != "iconHulin"){
			locationLayer.removeAll();
		}
		if(iconId != "iconFlight" ){
			$('#flightEchart').css('visibility','hidden');
      		view.center=view.center;
            if(eChartTimer!=null){
            	clearInterval(eChartTimer);
            	eChartTimer=null;
            }
		}
		document.getElementById("intelQueryDiv").style.visibility = "hidden";
		$('#drawResourceQuery').css('display','none');
		if(iconId == "iconExport"){
			analysis.funClearLayers();
		}else{
			analysis.funClearLayerGraphics();
		}
   		layer.close(analysis.eventChoice);
   		$('#resourceQueryResultDiv').css('display','none');
   		$('#drawResourceQueryResultDiv').css('display','none');
   		layer.close(layerIndex);
	}
	//时间轴
	$("#slider-vertical").slider({
		 orientation: "vertical",
		 range: "min",
		 min: 0,
	     max: 24,
	     value:8,
	     step: 1,
	     change: function(event, ui) {
	    	 var timeVal=('0'+ui.value.toString()).slice(-2); 
	    	 var fullTimeString="Wed Aug 29 2018 "+timeVal+":00:00 GMT+0800";
	    	 view.environment.lighting.date = fullTimeString;
	     }
	 }).slider("pips", {
       rest: "label",
       //prefix: "",
       suffix: ":00"
   });
	require([ "esri/Map", "esri/views/MapView", "esri/views/SceneView","esri/layers/WebTileLayer","esri/symbols/LabelSymbol3D", "esri/Color","esri/widgets/DirectLineMeasurement3D/DirectLineMeasurement3DViewModel","esri/widgets/AreaMeasurement3D/AreaMeasurement3DViewModel",
		"esri/config", "esri/Basemap","esri/request","esri/widgets/BasemapGallery","esri/widgets/Expand","esri/widgets/ScaleBar",
		"esri/layers/TileLayer","esri/layers/MapImageLayer","esri/layers/FeatureLayer","esri/widgets/LayerList","esri/core/urlUtils", 
		"esri/tasks/QueryTask","esri/tasks/support/Query","esri/Graphic","esri/layers/GraphicsLayer","esri/geometry/Point","esri/symbols/TextSymbol", "esri/layers/ElevationLayer",
		"esri/layers/support/LabelClass", "esri/WebMap", "esri/views/2d/draw/Draw","esri/geometry/Polygon","esri/geometry/Polyline",
	    "esri/geometry/geometryEngine","esri/widgets/Legend","esri/symbols/PictureMarkerSymbol","esri/symbols/Font","esri/tasks/IdentifyTask","esri/tasks/support/IdentifyParameters","dojo/_base/array",
	    "esri/widgets/Zoom","esri/widgets/NavigationToggle","esri/widgets/Compass"],
		function(Map, MapView, SceneView,WebTileLayer,LabelSymbol3D, Color,DirectLineMeasurement3DViewModel,AreaMeasurement3DViewModel,
				esriConfig, Basemap, esriRequest,BasemapGallery, Expand,ScaleBar
				, TileLayer, MapImageLayer,FeatureLayer, LayerList,urlUtils,
				QueryTask,Query,Graphic,GraphicsLayer,Point,TextSymbol,ElevationLayer,LabelClass, 
			      WebMap,Draw,Polygon,Polyline,geometryEngine,Legend,PictureMarkerSymbol,Font,IdentifyTask,IdentifyParameters,arrayUtils,
			      Zoom,NavigationToggle,Compass) {
		
			var rings = [[ 
        	     [119.1,50.0],[119.1,51.0],[121.0,51.0],[121.0,50.0],[119.1,50.0]  // same as first vertex
        	   ]];
        	  eErGuNaPolygon = new Polygon({
        	     hasZ: false,
        	     hasM: false,
        	     rings: rings,
        	     spatialReference: { wkid: 4326 }
        	  });
				urlUtils.addProxyRule({
					urlPrefix : "http://58.18.226.130:6080/arcgis/rest/services",
					// 本地环境
					//proxyUrl : "http://127.0.0.1:8878/Java/proxy.jsp"
						// 发布环境
					proxyUrl : "http://60.205.206.180:8080/Java/proxy.jsp"
				 });
						TintLayer = WebTileLayer.createSubclass({
							properties : {
								urlTemplate : null,
								tint : {
									value : null,
									type : Color
								}
							},
							getTileUrl : function(level, row,col) {
								return this.urlTemplate.replace("{z}", level).replace("{x}", col).replace("{y}", row);
							},
							fetchTile : function(level, row,col) {
								var url = this.getTileUrl(level, row, col);
								return esriRequest(url, {
									responseType : "image",
									allowImageDataAccess : true
								}).then(function(response) {
								var image = response.data;
								var width = this.tileInfo.size[0];
								var height = this.tileInfo.size[0];
								var canvas = document.createElement("canvas");
								var context = canvas.getContext("2d");
								canvas.width = width;
								canvas.height = height;
								context.drawImage(image,0,0,width,height);
								return canvas;
							}.bind(this));
							}				
							
						});

						esriConfig.request.corsEnabledServers.push("http://www.google.cn/");
						var ggSatelliteLayer = new TintLayer({
							//urlTemplate : localStorage.getItem("ggSatelliteLayer"),
							urlTemplate : "http://www.google.cn/maps/vt/lyrs=s@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
							title : "Google Map"		
						});			
						var ggLabelLayer = new TintLayer({
							urlTemplate : "http://www.google.cn/maps/vt/lyrs=h@177000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
							title : "Google Map1"				
						});

						var ggVectorLayer = new TintLayer({
							urlTemplate : "http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0'",
							title : "Google Map2"				
						});
						var imageBasemap2 = new Basemap({
							baseLayers : [ ggSatelliteLayer],
							title : "卫星影像",
							id : "imageBasemap",
							thumbnailUrl : "/ResourceMonitor/images/mappage/satellite.png"		
						});		
						var vectorBasemap2 = new Basemap({
							baseLayers : [ ggVectorLayer,ggLabelLayer ],
							title : "行政区划",
							id : "vectorBasemap",
							thumbnailUrl : "/ResourceMonitor/images/mappage/streets.png"
						});		
						
						// 特征图层 -巡护区划分（特征服务）
						   patrolregion = new FeatureLayer({
							url:"http://60.205.206.180:6080/arcgis/rest/services/guanhuqu_EEGN/FeatureServer",
						 	 mode : FeatureLayer.MODE_ONDEMAND,
							 //id : '1',
							 outFields : ["*"],
							 visible : false,
							 //opacity : 0.8,
							 title:"管护责任片区",
						   });
						 //除了上库力之外的五个影像
	                       var imageTileLayers = new TileLayer({
	                    	   url:"http://58.18.226.130:6080/arcgis/rest/services/five_DOM/MapServer",
	                           //url:"http://58.18.226.130:6080/arcgis/rest/services/enhe_DOM/MapServer",
	                           opacity : 0.8,
	                           listMode : "hide",
	                       });
	                        imageLayerArray.push(imageTileLayers);
	                       
	                       var imageTileLayerSKL = new TileLayer({
	                           url:"http://58.18.226.130:6080/arcgis/rest/services/shangkuli_DOM/MapServer",
	                           title : "上库力影像",
	                           opacity : 0.8,
	                           listMode : "hide",
	                       });
	                       imageLayerArray.push(imageTileLayerSKL);

	                       pxTileLayer = new TileLayer({
	                           url : "http://58.18.226.130:6080/arcgis/rest/services/PX_FL_eegn/MapServer",
	                           title : "坡向",
	                           visible : false,
	                           listMode:"hide-children",
	                           opacity : 0.8
	                       });
	                       
	                       pxQueryLayer = new ElevationLayer({
	                           url : "http://58.18.226.130:6080/arcgis/rest/services/PX_eegn/ImageServer",
	                           title : "坡向",
	                           visible : false,
	                           listMode:"hide-children",
	                           opacity : 0.8
	                       });
	                       
	                       pdTileLayer = new TileLayer({
	                           url : "http://58.18.226.130:6080/arcgis/rest/services/PD_eegn/MapServer",
	                           title : "坡度",
	                           visible : false,
	                           listMode:"hide-children",
	                           opacity : 0.8
	                       });
	                       
	                       pdQueryLayer = new ElevationLayer({
	                           url : "http://58.18.226.130:6080/arcgis/rest/services/PD_eegn/ImageServer",
	                           title : "坡度",
	                           visible : false,
	                           listMode:"hide-children",
	                           opacity : 0.8
	                       });

	                       demLayer = new ElevationLayer({
	                           url : "http://58.18.226.130:6080/arcgis/rest/services/DEM2_eegn/ImageServer",
	                           visible : true,
	                           title : "高程图层",
	                           opacity : 0.8
	                       });
	                       
	                       demQueryLayer = new ElevationLayer({
	                           url : "http://58.18.226.130:6080/arcgis/rest/services/DEM_eegn/ImageServer",
	                           visible : true,
	                           title : "高程查询图层",
	                           opacity : 0.8
	                       });
						
	                       symbol3dLayer = new GraphicsLayer({
	                           listMode : "hide",
	                           name:"symbol3dLayer",
	                           elevationInfo:{
	                               mode : "relative-to-ground",
	                               offset : 0,
	                               unit : "meters"
	                           }
	                       });
	                       locationLayer = new GraphicsLayer({
	                           listMode : "hide",
	                           name:"locationLayer",
	                           elevationInfo:{
	                               mode : "relative-to-ground",
	                               offset : 0,
	                               unit : "meters"
	                           }
	                       });
	                       
	                       VrmarkLayer = new GraphicsLayer({
	                           listMode : "hide",
	                           elevationInfo:{
	                               mode : "relative-to-ground",
	                               offset : 0,
	                               unit : "meters"
	                           }
	                       });
	                        
	                       //无人机实时位置图层
		           		   positionLayer = new GraphicsLayer({
		     				   opacity : 0.80,
		     				   listMode:"hide",
			     	           elevationInfo:{
			     	               mode : "relative-to-ground",
			     	               offset : 0,
			     	               unit : "meters"
			     	           }
			     	   	   });
		           		  MeasurementLayer = new GraphicsLayer({
			     	   			opacity : 0.80,
			     	   			listMode:"hide",
			     	   			elevationInfo:"on-the-ground"
			     	   	   });
		           		   //无人机轨迹图层
			     		   trailLayer = new GraphicsLayer({
			     	   			opacity : 0.80,
			     	   			listMode:"hide",
			     	   			elevationInfo:"on-the-ground"
			     	   	   });
			     		   drawResourceLayer = new GraphicsLayer({
			     	   			opacity : 0.80,
			     	   			listMode:"hide",
			     	   			elevationInfo:"on-the-ground"
			     	   	   });
	                       // 林场名标记	
	 				      var linchanglabelClass = new LabelClass({
	 				        symbol: {
	 				          type: "label-3d", // autocasts as new LabelSymbol3D()
	 				          symbolLayers: [{
	 				            type: "text", // autocasts as new TextSymbol3DLayer()
	 				            material: {
	 				              color: [255,4,4]
	 				            },
	 				            size: 18
	 				          }]
	 				        },
	 				        labelPlacement: "above-right",
	 				        labelExpressionInfo:{expression: "$feature.林场名"},
	 				      });
	                        			   	   
	 					   var linchangLayer = new FeatureLayer({
	 						 url:soilURL+"/10",
	 						 visible : true,
	 						 title:"林场名",
	 						 outFields: ["林场名"],
	 				         maxScale: 0,
	 				         minScale: 0,
	                          labelsVisible: true,
	                          labelingInfo: [linchanglabelClass],
	 					   }); 
	 					   
	 					  // 乡镇名标记	
	 	              		 var xiangzhenLableClass=linchanglabelClass.clone();
	 	              		 xiangzhenLableClass.labelExpressionInfo={expression:"$feature.cuntun"};
	 	              		 xiangzhenLableClass.symbol.symbolLayers=[{
	 	 				            type: "text", // autocasts as new TextSymbol3DLayer()
	 					            material: {
	 					              color: [0,255,0]
	 					            },
	 					            font:{
	 					            	family :'serif',
	 					            	weight :'bold',
	 					            },
	 					            size: 12
	 					          }];
	 	              		 xiangzhenLableClass.labelPlacement="above-center";

	 	              	 	 xiangzhFeatureLayer = new FeatureLayer({
	 							 url:soilURL+"/4",
	 							 visible : true,
	 							 title:"乡镇名",
	 							 outFields: ["cuntun"],
	 					         maxScale: 0,
	 					         minScale: 0,
	 	                         labelsVisible: true,
	 	                         labelingInfo: [xiangzhenLableClass],
	 	                         visible:false,
	 						   }); 

	 	              	 	 var cuntunLableClass=linchanglabelClass.clone();
	 	              	 	 cuntunLableClass.labelExpressionInfo={expression:"$feature.cuntun"};
	 	              	 	 cuntunLableClass.symbol.symbolLayers=[{
	 	 				            type: "text", // autocasts as new TextSymbol3DLayer()
	 					            material: {
	 					              color: [0,255,0]
	 					            },
	 					            font:{
	 					            	family :'serif',
	 					            	weight :'bold',
	 					            	style:'italic',
	 					            },
	 					            size: 12
	 					          }];
	 	              	 	cuntunLableClass.labelPlacement="above-center";

	 	                     cuntFeatureLayer=new FeatureLayer({
	 							//url:"http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer/5",
	 	                    	 mode : FeatureLayer.MODE_ONDEMAND,
	 							 outFields : ["*"],
	 							 url:soilURL+"/5",
	 							 visible : true,
	 							 title:"村屯名",
	 							 outFields: ["cuntun"],
	 	                         labelsVisible: true,
	 	                         labelingInfo: [cuntunLableClass],
	 	                         visible:false,
	 						});
	 	                    
	 	                    //基础地理数据
		                       baseGeoMapLayers = new MapImageLayer({
		                            url : soilURL,
		                            title : "基础数据",
		                            //visible : getCookieValue('view_base'),
		                            sublayers : [{
		                                    id : 11,
		                                    title : "小班面",
		                                }, {
		                                    id : 10,
		                                    title : "林场界",
		                                },  {
		                                    id : 9,
		                                    title : "河流",
		                                }, {
		                            	  id : 8,
		                            	  title : "道路",
		                     	   }]
		                       });
		                       xingzhengMapLayers = new MapImageLayer({
		                            url : 'http://60.205.206.180:6080/arcgis/rest/services/QUANGUOXZJ/MapServer',
		                            title : "行政区划",
		                            visible:false,
		                            sublayers : [{
		                                    id : 2,
		                                    title : "县界",
		                                },  {
		                                    id : 1,
		                                    title : "市界",
		                                }, {
		                            	  id : 0,
		                            	  title : "省界",
		                     	   }]
		                       });
		                    // 获取单个的矢量数据图层layer对象
		                       xiaobanLayer = baseGeoMapLayers.findSublayerById(11);
		                       if(cookie_userDepartmentVal=="0"){
		                    	   xiaobanLayer.definitionExpression = "1=1"; 
		                       }else{
		                    	   xiaobanLayer.definitionExpression = "林场='"+cookie_userDepartmentName+"'"; 
		                       }
		                       xiaobanLayer.visible=false;
		                     //初始化3d符号
		                       var simpleSymbol3d =  {
		                		  type: "simple",  
		                   		  symbol: {  
		                   		    type: "point-3d", 
		                   		    symbolLayers: [{ 
		                   		      type: "icon", 
		                   		      resource: { href: "" }, 
		                   		      size: 28,
		                   		    }],
		                   		  }
		             
		                   		};
		                      liaoWangTai_3d = new FeatureLayer({
		                    	 	title : "塔",
		                    	    url: "http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer/0"
		                      });
		                      var liaoWangTai_3dSymbol=simpleSymbol3d;
		                      liaoWangTai_3dSymbol.symbol.symbolLayers[0].resource.href="/ResourceMonitor/images/mark/32/tower.png";
		                      liaoWangTai_3d.renderer = liaoWangTai_3dSymbol;

		                       fangHuoZhan_3d  = new FeatureLayer({
		                    	   title : "管护站",
		                   	    	url: "http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer/2"
		                       });
		                       var fangHuoZhan_3dSymbol=simpleSymbol3d;
		                       fangHuoZhan_3dSymbol.symbol.symbolLayers[0].resource.href="/ResourceMonitor/images/mark/32/ghz.png";
		                       fangHuoZhan_3d.renderer = fangHuoZhan_3dSymbol;

		                       jmdFeatureLayer  = new FeatureLayer({
		                    	    title : "居民点",
		                   	    	url: "http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer/6",
		                   	    	visible:false
		                       });
		                       jmdFeatureLayer.renderer = {
		                   		  type: "simple",  // autocasts as new SimpleRenderer()
		                   		  symbol: {  // symbol type required for rendering point geometries
		                   		    type: "point-3d",  // autocasts as new PointSymbol3D()
		                   		    symbolLayers: [{  // renders points as volumetric objects
		                   		      type: "icon",  // autocasts as new ObjectSymbol3DLayer()
		                   		      resource: { href: "/ResourceMonitor/images/mark/32/address.png" },  // renders points as cones
		                   		      size: 28
		                   		    }],
		                   		  }
		             
		                   		};
		                       tjpFeatureLayer  = new FeatureLayer({
		                    	   title : "停机坪",
		                   	    	url: "http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer/1",
		                   	    	visible:false
		                       });
		                       var tjp_3dSymbol=simpleSymbol3d;
		                       tjp_3dSymbol.symbol.symbolLayers[0].resource.href="/ResourceMonitor/images/mark/32/tingjiping.png";
		                       tjpFeatureLayer.renderer =tjp_3dSymbol;
		                       
		                       mydFeatureLayer  = new FeatureLayer({
		                    	   title : "牧业点",
		                   	    	url: "http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer/7",
		                   	    	visible:false
		                       });
		                       var myd_3dSymbol=simpleSymbol3d;
		                       myd_3dSymbol.symbol.symbolLayers[0].resource.href="/ResourceMonitor/images/mark/32/myd.png";
		                       mydFeatureLayer.renderer =myd_3dSymbol;

		                       xbQueryTask = new QueryTask({
		                           url: soilURL+"/11"
		                        });
		                       lwtQueryTask = new QueryTask({//瞭望塔
		                           url: soilURL+"/0"
		                        });
		                       fhzQueryTask = new QueryTask({//管护站
		                           url: soilURL+"/2"
		                        });
		                       jmdQueryTask = new QueryTask({//居民点
		                           url: soilURL+"/6"
		                        });
		                       linChangQueryTask = new QueryTask({//林场
		                           url: soilURL+"/10"
		                        });
		 					  
		                       heliudLayer=new FeatureLayer({
									url:"http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer/12",
									mode : FeatureLayer.MODE_ONDEMAND,
									outFields : ["*"],
							   });
		                     //渲染左上角查询列表
		               		   layui.use(['table','util'], function(){
			          			  var table = layui.table;
			         			  var closData =  [[
			        			      {field:'name',title: '名称',align:'center',width:'65%'},
			        			      {title: '定位',align:'center',align:'center'
			        			          ,templet: function(d){
			        			              return '<img type="'+d.type+'" x="'+d.x+'" y="'+d.y+'"style="width:16px;margin:5px;" src="/ResourceMonitor/images/indexpage/dingwei.png">'
			        			           }
			        			      }
			        		      ]];
			        			  //视频回放表格渲染
			        			  table.render({
			        			    elem: '#topSearchTable'
			        			    ,cols:closData
			        			    ,data:[]
			        			  	,id: 'topSearchTableId'
			        			  	,page: true
			        			  	,limit:10
			        			  	,page:{layout:['prev', 'page', 'next']}
			        			  	,skin: 'line' 
			        			  	,height:'370'
			        			  });
		        				 /*  左上角搜索栏 */
		        				 //下拉框选择事件
		        				 $('#topSearchExpand').off().on('click',function(){
		        					 $('#topSearchDiv').hide('slow');
		        				 })
		        				 $('#topSearchDivButton').off().on('click',function(){
	        						 getIcon("");
	        						 view.graphics.removeAll();
	        				    	 $("[id^='panel']").hide();
	        						 $('#topSearchDiv').show("slow",function(){
	        							 searchByInput();
	        						 });
		        				 })
		        				 
		        				 $('.topSearchTypeSelect').on('click',function(){
		        					 var type = $(this).attr('data');
		        					 $('#topSearchTypeButton').html($(this).text()+'  <span class="caret"></span>');
		        					 var html='';
		        					 if(type=='place'){
		        						 html='<span class="topSearchType" style="background:rgb(5,133,99);color:#fff;" data="chosed">居民点</span>'
		        						 +'<span class="topSearchType"  data="">牧业点</span>'
		        						 +'<span class="topSearchType"  data="">停机坪</span>';
		        					 }else if(type=='device'){
		        						 html='<span class="topSearchType" style="background:rgb(5,133,99);color:#fff;"  data="chosed">管护站</span>'
		        							 +'<span class="topSearchType"  data="">塔</span>'
		        					 }else{
		        						 html='<span class="topSearchType" style="background:rgb(5,133,99);color:#fff;"  data="chosed">护林员</span>';
		        					 }
		        					 $('#topSearchType').html(html);
		        					 searchByInput();
		        				 })
		        				 $('#topSearchType').off().on('click','.topSearchType',function(){
		        					 $('#topSearchType .topSearchType').css('background','');
		        					 $('#topSearchType .topSearchType').css('color','');
		        					 $('#topSearchType .topSearchType').attr('data','');
		        					 $(this).css('background','rgb(5,133,99)');
		        					 $(this).css('color','#fff');
		        					 $(this).attr('data','chosed');
		        					 searchByInput();
		        				 });
		        				 $('#topSearchBody').on("click",'img',function(){
		        					 	var x = parseFloat($(this).attr('x'));
		        					 	var y = parseFloat($(this).attr('y'));
		        					 	var type = $(this).attr('type');
		        					 	var href='';
		        					 	var GRAPHYFLAG=0;
		        					 	if(type=='jmd'){
		        					 		href="/ResourceMonitor/images/mark/32/cuntun.png";
										}else if(type=="ghz"){
											href="/ResourceMonitor/images/mark/32/guanhuzhan.png";
										}else if(type=="tower"){
											href="/ResourceMonitor/images/mark/32/ta.png";
										}else if(type=="myd"){
											href="/ResourceMonitor/images/mark/32/myd.png";
									    }else if(type=="tjp"){
									    	href="/ResourceMonitor/images/mark/32/tingjiping.png";
									    }else{
									    	GRAPHYFLAG=7;
									    	href="/ResourceMonitor/images/mark/32/eventDisp_07.png";
									    }
		        	    	        	var dingweiSymbol = {
	        	    	                    type: "point-3d", 
	        	    	                    symbolLayers: [{
	        	    	                      type: "icon", 
	        	    	                      size:24,
	        	    	                      resource: { href:href}           
	        	    	                    }
	        	    	                    ],             
	        	    	                };
	        	        	            var pnt = {
	        	    	                    type: "point", 
	        	    	                    x: x,
	        	    	                    y: y,
	        	    	                };
	        	        	        	var graphic = new Graphic();
	        	        	    		graphic.geometry=pnt;
	        	        	    		graphic.attributes={
	        	        	    			GRAPHYFLAG
	        	        	    		}
	        	        	    		graphic.symbol=dingweiSymbol;
	        	        	    		view.graphics.removeAll();
	        	        	    		view.graphics.add(graphic);
	        	                		view.goTo({
	        	                            target :graphic,
	        	                            heading : 0,
	        	                            tilt : 45,
	        	                            scale :50000
	        	                         }, {
	        	                            speedFactor : 1,
	        	                            easing : 'ease-out'
	        	                         });
		        				 })
		        				  $(document).keyup(function(event){
		        					  if(event.keyCode ==13){
		        						  searchByInput();
		        					  }
		        				  });
        						  function searchByInput(){
	        						  var data=[];
	        						  var type = $('.topSearchType[data=chosed]').text();
	        						  var searchInput=$('#topSearchInput').val();
    					              var query = new Query();
    					              query.outFields = ["*"];
    				                  query.returnGeometry = true; 
    				                  if(type=='塔'){
	        							    query.where = "地点 like'"+searchInput+"%'";
	        							    liaoWangTai_3d.queryFeatures(query).then(function(results){
	        				                	  var features = results.features;
	        				                	  for(var i=0;i<features.length;i++){
	        				                		  var name=features[i].attributes['地点'];
	        				                		  var x=features[i].geometry.x;
	        				                		  var y=features[i].geometry.y;
	        				                		  var type='tower';
	        				                		  data.push({name,x,y,type});
	        				                	  }
	        				         			  var clos =  [[
	        				        			      {field:'name',title: '地点',align:'center',width:'65%'},
	        				        			      {title: '定位',align:'center',align:'center'
	        				        			          ,templet: function(d){
	        				        			              return '<img type="'+d.type+'" x="'+d.x+'" y="'+d.y+'"style="width:16px;margin:5px;" src="/ResourceMonitor/images/indexpage/dingwei.png">'
	        				        			           }
	        				        			      }
	        				        		      ]];
	         				    			      table.reload('topSearchTableId', {
	         				    			    	cols:clos,
	      				    				        page: {
	      				    				          curr: 1 
	      				    				        },
	      				    				        data:data
	      				    				      });
	         				    			      $('#topSearchMessage').html('共'+features.length+'座塔');
	        				                });
	        				                
	        						  }else if(type=='居民点'){
	        							    query.where = "cuntun like'"+searchInput+"%'";
	        							    jmdFeatureLayer.queryFeatures(query).then(function(results){
	        				                	  var features = results.features;
	        				                	  for(var i=0;i<features.length;i++){
	        				                		  var name=features[i].attributes['cuntun'];
	        				                		  var x=features[i].geometry.x;
	        				                		  var y=features[i].geometry.y;
	        				                		  var type='jmd';
	        				                		  data.push({name,x,y,type});
	        				                	  }
	         				    			      table.reload('topSearchTableId', {
	         				    			    	cols:closData,
	      				    				        page: {
	      				    				          curr: 1 
	      				    				        },
	      				    				        data:data
	      				    				      });
	         				    			     $('#topSearchMessage').html('共'+features.length+'个居民点');
	        				                });
	        				                
	        						  }else if(type=='牧业点'){
	        							    query.where = "Name like'"+searchInput+"%'";
	        							    mydFeatureLayer.queryFeatures(query).then(function(results){
	        							    	  var features = results.features;
	        				                	  for(var i=0;i<features.length;i++){
	        				                		  var name=features[i].attributes['Name'];
	        				                		  var x=features[i].geometry.x;
	        				                		  var y=features[i].geometry.y;
	        				                		  var type='myd';
	        				                		  data.push({name,x,y,type});
	        				                	  }
	         				    			      table.reload('topSearchTableId', {
	         				    			    	cols:closData,
	      				    				        page: {
	      				    				          curr: 1 
	      				    				        },
	      				    				        data:data
	      				    				      });
	         				    			     $('#topSearchMessage').html('共'+features.length+'个牧业点');
	        				                });
	        							  
	        						  }else if(type=='停机坪'){
	        							    query.where = "cuntun like'"+searchInput+"%'";
	        							    tjpFeatureLayer.queryFeatures(query).then(function(results){
	        				                	  var features = results.features;
	        				                	  for(var i=0;i<features.length;i++){
	        				                		  var name=features[i].attributes['cuntun'];
	        				                		  var x=features[i].geometry.x;
	        				                		  var y=features[i].geometry.y;
	        				                		  var type='tjp';
	        				                		  data.push({name,x,y,type});
	        				                	  }
	         				    			      table.reload('topSearchTableId', {
	         				    			    	cols:closData,
	      				    				        page: {
	      				    				          curr: 1 
	      				    				        },
	      				    				        data:data
	      				    				      });
	         				    			     $('#topSearchMessage').html('共'+features.length+'个停机坪');
	        				                });
	        							  
	        						  }else if(type=='管护站'){
	        							    query.where = "管护站  like'"+searchInput+"%'";
	        							    fangHuoZhan_3d.queryFeatures(query).then(function(results){
	        				                	  var features = results.features;
	        				                	  for(var i=0;i<features.length;i++){
	        				                		  var name=features[i].attributes['管护站'];
	        				                		  var x=features[i].geometry.x;
	        				                		  var y=features[i].geometry.y;
	        				                		  var type='ghz';
	        				                		  data.push({name,x,y,type});
	        				                	  }
	         				    			      table.reload('topSearchTableId', {
	         				    			    	cols:closData,
	      				    				        page: {
	      				    				          curr: 1 
	      				    				        },
	      				    				        data:data
	      				    				      });
	         				    			     $('#topSearchMessage').html('共'+features.length+'个管护站');
	        				                });
	        							  
	        						  }else if(type=='护林员'){
        								  $.post("/ResourceMonitor/realtime/queryLocation",
   										  {
		        								department : '全部',
		        								mobile : '',
		        								personName : searchInput,
		        								projectType : '全部'
   										  },
   										  function(result,status){
   											  var persons = result.rows;
   											  for(var i=0;i<persons.length;i++){
   												var name= persons[i].personName;
   												var x= persons[i].longitude;
   												var y= persons[i].latitude;
      				                		    var type='person';
    				                		    data.push({name,x,y,type});
   											  }
         				    			      table.reload('topSearchTableId', {
         				    			    	cols:closData,
      				    				        page: {
      				    				          curr: 1 
      				    				        },
      				    				        data:data
      				    				      });
         				    			      $('#topSearchMessage').html('共'+persons.length+'个护林员在线');
   										  });
	        						  }  
        						  }
			        			  //资源查询-叠加分析查询
			        			  $('#clearDrawResourceLayer').off().on('click',function(){
			        				  drawResourceLayer.removeAll();
			        				  map.remove(dynamic_layers);
			        			  })
			        			  $('#queryDrawResource').off().on('click',function(){
			        				  var items = drawResourceLayer.graphics.items;
			        				  if(items.length==0){
			        					  layer.msg('请绘制图形后查询!');
			        					  return;
			        				  }
			        				  var items = drawResourceLayer.graphics.items;
			        				  var geometry = items[0].geometry;
    		                    	  var queryType = $('#drawResourceSelect').val();
    		                    	  var spatialRelationship='';
    		                    	  var loadIndex=layer.load(1);
    		                    	  if(queryType=='2'){
    		                    		  spatialRelationship='intersects';
	   		                              require(["esri/tasks/Geoprocessor","esri/tasks/support/FeatureSet"],function(Geoprocessor,FeatureSet) {
	 		                            	  var gp=new Geoprocessor("http://58.18.226.130:6080/arcgis/rest/services/Clip/GPServer/Clip");
	 		               	              	  var inputGraphicContainer = [];
		 		               	              var graphic = new Graphic({
			 		           	                  geometry : geometry
			 		           	                  //symbol : pointSym
			 		           	              });
	 		           	              	      inputGraphicContainer.push(graphic);
	 		           	                      var featureSet = new FeatureSet();
	 		           	                      featureSet.features = inputGraphicContainer;
	 		                            	  var params={
	 			                            		 'input':featureSet
				                              };
	 		                            	  gp.submitJob(params).then(function(data){
	  			                                   var jobId = data.jobId;
	 			                                   var status = data.jobStatus;
	 			                                   if(status=="job-succeeded"){
	 			                                       gp.getResultData(jobId, "Output").then(function(result){
	 			                                    	  	xiaobanFunc(result.value);
	 			                                       })
	 			                                   }
	 			                               })
	 		                               });
    		                    	  }else{
    		                    		  if(queryType=='0'){
    		                    			  spatialRelationship='intersects';
    		                    		  }else{
    		                    			  spatialRelationship='contains';
    		                    		  }
          		                    	  var query = new Query();
        					              query.outFields = ["*"];
        				                  query.returnGeometry = true; 
                						  query.geometry = geometry;
                						  query.spatialRelationship = spatialRelationship;
    			        				  map.remove(dynamic_layers);
    			        				  xiaobanLayer.queryFeatures(query).then(function(results){
    			        					  xiaobanFunc(results);
    			        				  })
    		                    		  
    		                    	  }

			        				  //结果展示
			        				  function xiaobanFunc(results){
 				                	    var features = results.features;
										var resourceResultData=[];
										var lindiList = [];	
  				                	    for(var i=0;i<features.length;i++){
  				                	    	if(queryType!='2'){
  				                	    		lindiList.push(features[i].attributes.FID);
  				                	    	}else{
    				                			var symbol = {
    		                   			    	 type: "simple-fill",  // autocasts as new SimpleFillSymbol()
 		                   			         	 color: [ 244, 134, 186, 0.5],
 		                   			         	 outline: {  // autocasts as new SimpleLineSymbol()
	 			                   			         width: 1,
	 			                   			         color: [ 255, 0, 0, 1]
 		                   			      	 	 }
	     				                		};
   		     				                	var graphic = new Graphic({
   		     				                	  geometry: features[i].geometry,
   		     				                	  symbol: symbol
   		     				                	});
   		     				              		drawResourceLayer.add(graphic);
  				                	    	}
      				            	        resourceResultData.push(features[i].attributes);
  				                	    }
  				                	  	if(queryType!='2'){
		  				  			        var lindiSql=lindiList.join(',');
		  				                    var dynamic_xb = dynamic_layers.findSublayerById(0);
		  				           	 	    dynamic_xb.definitionExpression ='FID in ('+lindiSql+')';
		  				         	        map.add(dynamic_layers,6);
  				                	  	}
  				                	    layer.close(loadIndex);
  				                	    
				                	    $('#drawResourceQueryResultDiv').css('display','');
				                	    var awidth = $(window).width();
				                	    if ($('#nav').hasClass('nav-mini')) {
				                	    	awidth-=60;
        								}else{
        									awidth-=160;
        								}
				                	    $('#drawResourceQueryResultDiv').css('width',awidth+'px');
				                	    $('#drawResourceQueryResultDiv').css('height','220px');
				                	    $('#drawResourceQueryResultToggleSpan').attr('class','esri-icon-expand')
				                		  var closData =  [[
				                			  {type:'numbers',title: '序号',align:'center'}
				                		      ,{field:'linban',title: '林班',align:'center'}
				                	 	      ,{field:'xiaoban',title: '小班',align:'center'}
				                		      ,{field:'linzhong',title: '林种',align:'center'}
				                		      ,{field:'dimao',title: '地貌',align:'center'}
				                		      ,{field:'poxiang',title: '坡向',align:'center'}
				                		      ,{field:'powei',title: '坡位',align:'center'}
				                		      ,{field:'podu',title: '坡度',align:'center'}
				                		      ,{field:'yubidu',title: '郁闭度',align:'center'}
				                		      ,{field:'dilei',title: '地类',align:'center'}
				                		      ,{field:'mianji',title: '面积',align:'center'}
				                		      ,{field:'linchang',title: '林场',align:'center',width:100}
				                		      ,{field:'tudzhong',title: '土地种',align:'center',width:100}
				                		      //,{field:'youshishuzhong',title: '优势树种',align:'center'}
				                		      ,{field:'youshishu',title: '优势树',align:'center'}
				                		      ,{field:'shuzhong',title: '林种',align:'center'}
				                		      ,{field:'baohudeng',title: '保护等级',align:'center'}
				                			  ,{title: '定位',align:'center',align:'center',
				                				   templet: function(d){
				                						   return '<img style="margin-top:5px;" data="'+d.fid+'"  lay-event="locate" src="/ResourceMonitor/images/indexpage/dingwei.png">';
				                			       }
				                			   }
				                	      ]];
				                		  var features=resourceResultData;
				                		  var data=[];
				                		  var shuzhongs=[];
				                		  var youshishus=[];
				                		  var baohudengs=[];
				                		  var mianjis=0;
				                		  for(var i=0;i<features.length;i++){
				                			  	var fid = features[i]['FID'];
				                			  	if(queryType=='2'){
				                			  		fid = i;
				                			  	}
				                		        var linban = features[i]['LIN_BAN'];
				                		        var xiaoban = features[i]['XIAO_BAN'];
				                		        var linzhong = features[i]['LIN_ZHONG'];
				                		        var qiyuan = features[i]['QI_YUAN'];
				                		        var dimao = features[i]['DI_MAO'];
				                		        var powei = features[i]['PO_WEI'];
				                		        var podu = features[i]['坡度'];
				                		        var poxiang = features[i]['坡向'];
				                		        var zldj = features[i]['ZL_DJ'];
				                		        var yubidu = features[i]['YU_BI_DU'];
				                		        var kejidu = features[i]['KE_JI_DU'];
				                		        var bhdj = features[i]['BH_DJ'];
				                		        var dilei = features[i]['DI_LEI'];
				                		        var mianji = features[i]['MIAN_JI'];
				                		        var linchang = features[i]['林场'];
				                		        var tudzhong = features[i]['土地种'];
				                		        var youshishuzhong = features[i]['优势树种'];
				                		        var youshishu = features[i]['优势树'];
				                		        var shuzhong = features[i]['林种'];
				                		        var baohudeng = features[i]['保护等'];
				                		        if(!shuzhongs.includes(shuzhong)&&shuzhong.trim()!=''){
				                		        	shuzhongs.push(shuzhong);
				                		        }
				                		        if(!youshishus.includes(youshishu)&&youshishu.trim()!=''){
				                		        	youshishus.push(youshishu);
				                		        }
				                		        if(!baohudengs.includes(baohudeng)&&baohudeng.trim()!=''){
				                		        	baohudengs.push(baohudeng);
				                		        }
				                		        mianjis+=mianji;
				                		        var obj={
				                		          fid,
				                	        	  linban ,
				                	         	  xiaoban,
				                	        	  linzhong,
				                	        	  qiyuan,
				                	        	  dimao,
				                	        	  poxiang,
				                	        	  powei,
				                	        	  podu,
				                	        	  zldj,
				                	        	  yubidu,
				                	        	  kejidu,
				                	        	  bhdj,
				                	        	  dilei,
				                	        	  mianji,
				                	        	  linchang,
				                	        	  tudzhong,
				                	        	  youshishuzhong,
				                	        	  youshishu,
				                	        	  shuzhong,
				                	        	  baohudeng
				                		        }
				                		        data.push(obj);
				                		  }
				                		  //视频回放表格渲染
				                		  var tableExport = table.render({
				                		    elem: '#drawResourceQueryTable'
				                		    ,cellMinWidth: 60 
				                		    ,data:data
				                		    ,cols:closData
				                		  	,id: 'drawResourceQueryTableId'
				                		  	,title:'小班信息'
				                		  	,page: true
				                		  	,height: '220'
				                		  	,limits:[10,30,90]
				                		  });
				                		  $('#drawResourceQuerySumButton').on('click',function(){
				                			  var area = 0 ;
				                			  if(queryType=='2'){
				                				  area = $('#drawResourceQuerySumButton').attr('data');
				                				  area=(parseFloat(mianjis)*0.0015).toFixed(1);
				                			  }else{
				                				  area=mianjis.toFixed(1);
				                			  }
				                			   
           	               					var htmlStr ='<table class="layui-table" style="text-align:center;width:300px;word-break:break-word"><tr>'  
           	               						+ '<td style="width:100px;">林种</td><td>'+shuzhongs.join(',')
           	               						+ '</td></tr><tr><td>优势树种</td><td>'+youshishus.join(',')
           	               						+ '</td></tr><tr><td>保护等级</td><td>'+baohudengs.join(',')
           	               						+ '</td></tr><tr><td>面积</td><td>'+ area+'亩'
           	               						+ '</td></tr></table>';
           	               					layer.close(layerIndex);
           	               					layerIndex=layer.open({
           	               						type : 1,
           	               						shade:0,
           	               						title : '汇总',
           	               						content : htmlStr,
           	               						anim: -1,
           	               						isOutAnim: false,
           	               						scrollbar :false,
           	               					});
				                		  })
   				                		  $('#drawResourceQueryExportButton').on('click',function(){
				                			   table.exportFile(tableExport.config.id, data,'csv');
				                		  })
				                		  $("#drawResourceQueryResultToggle").off("click").on("click",function(){
										 		if($("#drawResourceQueryResultToggleSpan").attr("class")=="esri-icon-collapse"){
										 			 $('#drawResourceQueryResultToggleSpan').attr('class','esri-icon-expand');
											 	     $('#drawResourceQueryResultDiv').css('height','220px');
	    				                			  table.reload('drawResourceQueryTableId', {
	    				                				  height:220
	    				                			  });
										 		}else{
										 			 $('#drawResourceQueryResultToggleSpan').attr('class','esri-icon-collapse');
										 			 var height = $(window).height();
	    				 				 			 $('#drawResourceQueryResultDiv').css('height',height+'px');
	    				                			  table.reload('drawResourceQueryTableId', {
	    				                				  height:height
	    				                			  });
										 		}
										   });
   				                		  //关闭
   				                		  $("#drawResourceQueryResultClose").off("click").on("click",function(){
   				                			  $('#drawResourceQueryResultDiv').css('display','none');
   				                			  layer.close(layerIndex);
   				                		  })
   				                		  table.on('tool(drawResourceQueryFilter)', function(obj){
   				                			  if(obj.event=='locate'){
   				                				  var fid = obj.data.fid;
   						                		  var symbol = {
   		     				                		  type: "simple-fill",  // autocasts as new SimpleFillSymbol()
   		     				                		  color: [ 51,51, 204, 0.5 ],
   		     				                		  style: "solid",
   		     				                		  outline: {  
   		     				                		    color: "white",
   		     				                		    width: 1
   		     				                		  }
   		     				                	  };
   						                		  if(queryType=='2'){
   						                			    var geometry = results.features[fid].geometry;
		   		     				                	var graphic = new Graphic({
		   		     				                	  geometry:geometry,
		   		     				                	  symbol: symbol
		   		     				                	});
		   		     				                	view.graphics.removeAll();
			     				                		view.graphics.add(graphic);
			     				                		view.goTo(geometry);
			     				                		return;
   						                		  }
	   		    		                    	  var query = new Query();
	   		    					              //query.outFields = ["*"];
	   		    				                  query.returnGeometry = true; 
	   		            						  query.where = "fid ="+fid;
	   		            						  query.outSpatialReference ={ // autocasts as new SpatialReference()
	   		            				              wkid : 102100
	   		            			              };
	   		            						  var clipgeometry=geometry;
	   		            						  xiaobanLayer.queryFeatures(query).then(function(results){
	   		     				                	    var geometry = results.features[0].geometry;
		   		     				                	var graphic = new Graphic({
		   		     				                	  geometry: geometry,
		   		     				                	  symbol: symbol
		   		     				                	});
	   		     				                	    view.graphics.removeAll();
	   		     				                		view.graphics.add(graphic);
	   		     				                		view.goTo(geometry)
	   		            						  })
   				                			}
   				                		  })
				                		  $(window).resize(function () {
				                			  var awidth = $(window).width();
				                			  var height = $(window).height();
				                			  if ($('#nav').hasClass('nav-mini')) {
				                			  	$('#drawResourceQueryResultDiv').css('width',(awidth-60)+'px');
				                			  }else{
				                				 $('#drawResourceQueryResultDiv').css('width',(awidth-160)+'px');
				                			  }
				                			  if($("#drawResourceQueryResultToggleSpan").attr("class")=="esri-icon-collapse"){
				                				  $('#drawResourceQueryResultDiv').css('height',height+'px');
    				                			  table.reload('drawResourceQueryTableId', {
    				                				  height:height
    				                			  }); 
				                			  }else{
				                				  $('#drawResourceQueryResultDiv').css('height','220px');
				                				  table.reload('drawResourceQueryTableId', {
				                					  height:220
    				                			  }); 
				                			  }
				                			  
				                		  });
			        				  }
			        			  })
    		                      //按行政单元统计
    		                      $('#resourceQueryButton').on('click',function(){
    		                    	  var selected = $('#treeview-checkable').treeview('getChecked');
    		                    	  if(selected.length==0){
    		                    		  layer.msg('请选择需要查询的林场');
    		                    		  return;
    		                    	  }
    		              			 $('#resourceQueryToggleSpan').attr('class','esri-icon-collapse');
    		             			 $('#resourceQueryDivBody').css('display','none');
    		                    	  var loadIndex=layer.load(1);
    		                    	  var where = "in(";
    		                    	  for(var i=0;i<selected.length;i++){
    		                    		  var text = selected[i].text;
    		                    		  if(i<selected.length-1){
    		                    			  where+="'"+text+"',";
    		                    		  }else{
    		                    			  where+="'"+text+"'";
    		                    		  }
    		                    	  }
    		                    	  where+=")";
    		                    	  var query = new Query();
 				 				      query.where = "林场名 "+where;
				 				      query.returnGeometry=true;
				 				      query.outFields = ["*"];
				 				      linChangQueryTask.execute(query).then(function(result){
				 					   	    view.goTo({
				 					   	    	target : result.features,
				 					   	    	heading : 0,
				                                tilt : 45,
				                                scale:500000
				                            },
				                            {
				                                speedFactor : 2,
				                                easing : 'ease-out'
				                            })
				 				      }) ; 
    					              //query.outFields = ["*"];
    				                  query.returnGeometry = false; 
            						  query.where = "林场  "+where;
            						  xiaobanLayer.queryFeatures(query).then(function(results){
     				                	    var features = results.features;
 											var resourceResultData=[];
 											var lindiList = [];
    				                	    for(var i=0;i<features.length;i++){
    				                	    	lindiList.push(features[i].attributes.FID);
        				            	        resourceResultData.push(features[i].attributes);
    				                	    }
     	  				  			        var lindiSql=lindiList.join(',');
    	  							        map.remove(dynamic_layers);
    	  				                    var dynamic_xb = dynamic_layers.findSublayerById(0);
    	  				           	 	    dynamic_xb.definitionExpression ='FID in ('+lindiSql+')';
    	  				         	        map.add(dynamic_layers,6); 
    				                	    layer.close(loadIndex);
    				                	    $('#resourceQueryResultDiv').css('display','');
    				                	    var awidth = $(window).width();
    				                	    if ($('#nav').hasClass('nav-mini')) {
    				                	    	awidth-=60;
            								}else{
            									awidth-=160;
            								}
    				                	    $('#resourceQueryResultDiv').css('width',awidth+'px');
    				                	    $('#resourceQueryResultDiv').css('height','220px');
    				                	    $('#resourceQueryResultToggleSpan').attr('class','esri-icon-expand')
    				                		  var closData =  [[
    				                			  {type:'numbers',title: '序号',align:'center'}
    				                		      ,{field:'linban',title: '林班',align:'center'}
    				                	 	      ,{field:'xiaoban',title: '小班',align:'center'}
    				                		      ,{field:'linzhong',title: '林种',align:'center'}
    				                		      ,{field:'dimao',title: '地貌',align:'center'}
    				                		      ,{field:'poxiang',title: '坡向',align:'center'}
    				                		      ,{field:'powei',title: '坡位',align:'center'}
    				                		      ,{field:'podu',title: '坡度',align:'center'}
    				                		      ,{field:'yubidu',title: '郁闭度',align:'center'}
    				                		      ,{field:'dilei',title: '地类',align:'center'}
    				                		      ,{field:'mianji',title: '面积',align:'center'}
    				                		      ,{field:'linchang',title: '林场',align:'center',width:100}
    				                		      ,{field:'tudzhong',title: '土地种',align:'center',width:100}
    				                		      //,{field:'youshishuzhong',title: '优势树种',align:'center'}
    				                		      ,{field:'youshishu',title: '优势树',align:'center'}
    				                		      ,{field:'shuzhong',title: '林种',align:'center'}
    				                		      ,{field:'baohudeng',title: '保护等级',align:'center'}
    				                			  ,{title: '定位',align:'center',align:'center',
    				                				   templet: function(d){
    				                						   return '<img style="margin-top:5px;" data="'+d.fid+'"  lay-event="locate" src="/ResourceMonitor/images/indexpage/dingwei.png">';
    				                			       }
    				                			   }
    				                	      ]];
    				                		  var features=resourceResultData;
    				                		  var data=[];
    				                		  var shuzhongs=[];
    				                		  var youshishus=[];
    				                		  var baohudengs=[];
    				                		  var mianjis=0;
    				                		  for(var i=0;i<features.length;i++){
    				                			  	var fid = features[i]['FID'];
    				                		        var linban = features[i]['LIN_BAN'];
    				                		        var xiaoban = features[i]['XIAO_BAN'];
    				                		        var linzhong = features[i]['LIN_ZHONG'];
    				                		        var qiyuan = features[i]['QI_YUAN'];
    				                		        var dimao = features[i]['DI_MAO'];
    				                		        var powei = features[i]['PO_WEI'];
    				                		        var podu = features[i]['坡度'];
    				                		        var poxiang = features[i]['坡向'];
    				                		        var zldj = features[i]['ZL_DJ'];
    				                		        var yubidu = features[i]['YU_BI_DU'];
    				                		        var kejidu = features[i]['KE_JI_DU'];
    				                		        var bhdj = features[i]['BH_DJ'];
    				                		        var dilei = features[i]['DI_LEI'];
    				                		        var mianji = features[i]['MIAN_JI'];
    				                		        var linchang = features[i]['林场'];
    				                		        var tudzhong = features[i]['土地种'];
    				                		        var youshishuzhong = features[i]['优势树种'];
    				                		        var youshishu = features[i]['优势树'];
    				                		        var shuzhong = features[i]['林种'];
    				                		        var baohudeng = features[i]['保护等'];
    				                		        if(!shuzhongs.includes(shuzhong)&&shuzhong.trim()!=''){
    				                		        	shuzhongs.push(shuzhong);
    				                		        }
    				                		        if(!youshishus.includes(youshishu)&&youshishu.trim()!=''){
    				                		        	youshishus.push(youshishu);
    				                		        }
    				                		        if(!baohudengs.includes(baohudeng)&&baohudeng.trim()!=''){
    				                		        	baohudengs.push(baohudeng);
    				                		        }
    				                		        mianjis+=mianji;
    				                		        var obj={
    				                		          fid,
    				                	        	  linban ,
    				                	         	  xiaoban,
    				                	        	  linzhong,
    				                	        	  qiyuan,
    				                	        	  dimao,
    				                	        	  poxiang,
    				                	        	  powei,
    				                	        	  podu,
    				                	        	  zldj,
    				                	        	  yubidu,
    				                	        	  kejidu,
    				                	        	  bhdj,
    				                	        	  dilei,
    				                	        	  mianji,
    				                	        	  linchang,
    				                	        	  tudzhong,
    				                	        	  youshishuzhong,
    				                	        	  youshishu,
    				                	        	  shuzhong,
    				                	        	  baohudeng
    				                		        }
    				                		        data.push(obj);
    				                		  }
    				                		  //视频回放表格渲染
    				                		  var tableExport = table.render({
    				                		    elem: '#resourceQueryTable'
    				                		    ,cellMinWidth: 60 
    				                		    ,data:data
    				                		    ,cols:closData
    				                		  	,id: 'resourceQueryTableId'
    				                		  	,title:'分析结果'
    				                		  	,page: true
    				                		  	,height: '220'
    				                		  	,limits:[10,30,90]
    				                		  });
    				                		  $('#resourceQuerySumButton').on('click',function(){
  	           	               					var htmlStr ='<table class="layui-table" style="text-align:center;width:300px;word-break:break-word"><tr>'  
	           	               						+ '<td style="width:100px;">林种</td><td>'+shuzhongs.join(',')
	           	               						+ '</td></tr><tr><td>优势树种</td><td>'+youshishus.join(',')
	           	               						+ '</td></tr><tr><td>保护等级</td><td>'+baohudengs.join(',')
	           	               						+ '</td></tr><tr><td>面积</td><td>'+ mianjis.toFixed(1)+'亩'
	           	               						+ '</td></tr></table>';
	           	               					layer.close(layerIndex);
	           	               					layerIndex=layer.open({
	           	               						type : 1,
	           	               						shade:0,
	           	               						title : '汇总',
	           	               						content : htmlStr,
	           	               						anim: -1,
	           	               						isOutAnim: false,
	           	               						scrollbar :false,
	           	               					});
					                		  })
	   				                		  $('#resourceQueryExportButton').off().on('click',function(){
	   				                			toLargerCSV(data);
					                			   //table.exportFile(tableExport.config.id, data,'xls');
/*  		   				               		    	$.post("/ResourceMonitor/resourceStatus/exportXingzhengExcel",
		   				               	    	    {
		   				               		    		data:JSON.stringify(data),
		   				               		    		title:'分析结果' 
		   				               	    	    },
		   				               	    	    function(data,status){
		   				               	    			var title = data.title;
		   				               	    			var location = "/ResourceMonitor/excel/" + title + ".xls";
		   				               					var $form = $('<form method="GET"></form>');
		   				               					$form.attr('action', location);
		   				               					$form.appendTo($('body'));
		   				               					$form.submit(); 
		   				               	    	    }); */ 
					                		  })
					                		  $("#resourceQueryResultToggle").off("click").on("click",function(){
											 		if($("#resourceQueryResultToggleSpan").attr("class")=="esri-icon-collapse"){
											 			 $('#resourceQueryResultToggleSpan').attr('class','esri-icon-expand');
												 	     $('#resourceQueryResultDiv').css('height','220px');
		    				                			  table.reload('resourceQueryTableId', {
		    				                				  height:220
		    				                			  });
											 		}else{
											 			 $('#resourceQueryResultToggleSpan').attr('class','esri-icon-collapse');
											 			 var height = $(window).height();
		    				 				 			 $('#resourceQueryResultDiv').css('height',height+'px');
		    				                			  table.reload('resourceQueryTableId', {
		    				                				  height:height
		    				                			  });
											 		}
											   });
	   				                		  //关闭
	   				                		  $("#resourceQueryResultClose").off("click").on("click",function(){
	   				                			  $('#resourceQueryResultDiv').css('display','none');
	   				                			  layer.close(layerIndex);
	   				                		  })
	   				                		  table.on('tool(resourceQueryFilter)', function(obj){
	   				                			  if(obj.event=='locate'){
	   				                				  var fid = obj.data.fid;
		   		    		                    	  var query = new Query();
		   		    					              //query.outFields = ["*"];
		   		    				                  query.returnGeometry = true; 
		   		            						  query.where = "fid ="+fid;
		   		            						  xiaobanLayer.queryFeatures(query).then(function(results){
		   		     				                	    var geometry = results.features[0].geometry;
		   		     				                		var symbol = {
		   		     				                		  type: "simple-fill",  // autocasts as new SimpleFillSymbol()
		   		     				                		  color: [ 51,51, 204, 0.5 ],
		   		     				                		  style: "solid",
		   		     				                		  outline: {  
		   		     				                		    color: "white",
		   		     				                		    width: 1
		   		     				                		  }
		   		     				                		};
			   		     				                	var graphic = new Graphic({
			   		     				                	  geometry: geometry,
			   		     				                	  symbol: symbol
			   		     				                	});
		   		     				                	    view.graphics.removeAll();
		   		     				                		view.graphics.add(graphic);
		   		     				                		view.goTo(geometry)
		   		            						  })
	   				                			}
	   				                		  })
    				                		  $(window).resize(function () {
    				                			  var awidth = $(window).width();
    				                			  var height = $(window).height();
    				                			  console.log(height);
    				                			  if ($('#nav').hasClass('nav-mini')) {
    				                			  	$('#resourceQueryResultDiv').css('width',(awidth-60)+'px');
    				                			  }else{
    				                				 $('#resourceQueryResultDiv').css('width',(awidth-160)+'px');
    				                			  }
    				                			  if($("#resourceQueryResultToggleSpan").attr("class")=="esri-icon-collapse"){
    				                				  $('#resourceQueryResultDiv').css('height',height+'px');
	    				                			  table.reload('resourceQueryTableId', {
	    				                				  height:height
	    				                			  }); 
    				                			  }else{
    				                				  $('#resourceQueryResultDiv').css('height','220px');
    				                				  table.reload('resourceQueryTableId', {
    				                					  height:220
        				                			  }); 
    				                			  }
    				                			  
    				                		  });
            						  })
    		                      })
		               		  });
		                       dynamic_layers= new MapImageLayer({
		                    	   url:"http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer",
		                    	   sublayers: [{
		                    		   renderer: {
		                   			      type: "simple",  // autocasts as new SimpleRenderer()
		                   			      symbol: {
		                   			    	 type: "simple-fill",  // autocasts as new SimpleFillSymbol()
		                   			         color: [ 244, 134, 186, 0.5],
		                   			         outline: {  // autocasts as new SimpleLineSymbol()
			                   			         width: 1,
			                   			         color: [ 255, 0, 0, 1]
		                   			      	 }
		                   			      }
		                   			    },
		                    		   source:{ //定义一个图层数据源
		                            	   type:"data-layer",
		                            	   dataSource: {//定义一个数据源
		                           	         type: "table",
		                           	         workspaceId: "MyShapefileWorkspaceID", //此处为我们设置的命名空间
		                           	         dataSourceName: "xiao_ban.shp"
		                           	       }
		                               },
		                               id : 0,
		                    	   }],
		                    	   listMode:"hide"                         
		                       });	                       
		                       map = new Map({
									basemap : imageBasemap2,
								});
										
								view = new SceneView({
									container : 'viewDiv',
									map : map,
			                           popup: {
			                             dockEnabled: true,
			                             dockOptions: {
			                               buttonEnabled: false,
			                               breakpoint: false,
			                             }
			                           },
			                           camera : {
			                               position : [ 53, 36, 36000000 ],
			                        }
								});
					             draw = new Draw({
					                 view : view
					              });
		                   /*  // 基础数据
		                       baseGeoMapLayers.watch('visible',
										function(newValue, oldValue) {
											document.cookie = "view_base="
													+ (newValue ? 1 : 0) + ";path=/;";
											base_Layer.visible = newValue;
										});
								// 小班
		                       baseGeoMapLayers.findSublayerById(11).watch(
										'visible',
										function(newValue, oldValue) {
												document.cookie = "view_xb = "
														+ (newValue ? 1 : 0)
														+ ";path=/;";
												baseGeoMapLayers.findSublayerById(11).visible = newValue;
								}); */
	 	                     
						
						// 底图切换
						var basemapGallery = new BasemapGallery({
							view : view,
							container : document.createElement("div"),
							source : [ vectorBasemap2, imageBasemap2 ]
						});
								
						 var bgExpand = new Expand({
					            view: view,
					            content: basemapGallery.container,
					            expandIconClass: "esri-icon-basemap"
					     });
						 
						  //图层列表
	                       var layerList = new LayerList({
	                           view : view,
	                           container : document.createElement("div")
	                       });
	               
	                       var lyrLstExpand = new Expand({
	                           view : view,
	                           content : layerList.container,
	                           expandIconClass : "esri-icon-layer-list",
	                           expandTooltip: "图层列表"
	                       });
	                       
	                       document.getElementById("viewSwitch").style.display = "inline";
	                       document.getElementById("initialExtent").style.display = "inline";
	                       document.getElementById("identify").style.display = "inline";
	                       document.getElementById("xyLocation").style.display = "inline";
	                       document.getElementById("draw-polyline").style.display = "inline";
	                       /* document.getElementById("draw-polygon").style.display = "inline"; */
	                       document.getElementById("refreshGraphics").style.display = "inline";
	                       document.getElementById("PositionInfo").style.display = "inline";
	                       if(appVersion.indexOf("chrome")==-1){}else{
		        				 document.getElementById("mapExport").style.display = "inline";
		             	   }
	                       document.getElementById("Flight").style.display = "inline";
	                       document.getElementById("fullMap").style.display ="inline";
	                       view.ui.remove("attribution");
	                       view.ui.remove("navigation-toggle");
	                       view.ui.remove("zoom");
	                       view.ui.remove("compass");
		               	   var navigationToggle = new NavigationToggle({
		               		   view: view
		               	   });
	                       var zoom = new Zoom({
	                    	   view: view
	                       });
	                       var compass = new Compass({
                    	      view: view
                    	   });
	                       if(appVersion.indexOf("chrome")==-1){}else{
	                    	   view.ui.add("mapExport","top-left");
		             	   }
	                       view.ui.add("identify","top-left");
	                       /* view.ui.add("draw-polygon","top-left"); */
	                       view.ui.add("draw-polyline","top-left");
	                       view.ui.add("xyLocation","top-left"); 
	                       view.ui.add("Flight","top-left");
	                       view.ui.add("initialExtent","top-left");
	                       view.ui.add(compass,"top-left");
	                       view.ui.add(navigationToggle,"top-left");
	                       view.ui.add(zoom,"top-left");  
	                       view.ui.add("viewSwitch","top-left");
	                       view.ui.add("refreshGraphics","top-right");
	                       view.ui.add([bgExpand], "top-right");
						   view.ui.add(lyrLstExpand,"top-right");
						   view.ui.add("fullMap","top-right");

						    $("#viewDiv .esri-ui .esri-ui-inner-container").css("bottom","15px");
						 map.addMany(imageLayerArray);                   
	                     map.addMany([patrolregion,pdTileLayer,pxTileLayer,baseGeoMapLayers,symbol3dLayer,locationLayer,
	                    	 mydFeatureLayer,jmdFeatureLayer,fangHuoZhan_3d,liaoWangTai_3d,tjpFeatureLayer,linchangLayer,
	                    	 cuntFeatureLayer,xiangzhFeatureLayer,xingzhengMapLayers,patrolregion,VrmarkLayer]);
	                     map.addMany([positionLayer,trailLayer,drawResourceLayer]);
	                     analysis.loadMapLayer();
	                     // Add elevation layer to the map's ground.
	                     map.ground.layers.add(demLayer);
	                     map.addMany([MeasurementLayer]);
	                     dxLegend = new Legend({
                             view: view,
	                     });
	                     pdTileLayer.watch('visible',legendLayersChanged);
	                     pxTileLayer.watch('visible',legendLayersChanged);                    
	                     function legendLayersChanged(){
                           if(pdTileLayer.visible){
                               dxLegend.layerInfos=[{layer: pdTileLayer}];
                               view.ui.add(dxLegend, "bottom-right");
                           }else{
                               if(pxTileLayer.visible){
                                   dxLegend.layerInfos=[{layer: pxTileLayer}];
                                   view.ui.add(dxLegend, "bottom-right");
                               }else{
                                   view.ui.remove(dxLegend);
                               }
                           }
	                     }  
	                       
	                     //初次加载定位到指定区域
	                       view.goTo({
	                           target : eErGuNaPolygon,
	                           heading : 0,
	                           tilt : 75,
	                           scale:750000
	                       }, {
	                           speedFactor : 0.4,
	                           easing : 'ease-out'
	                       });
								
						 
						//加载控件
						// 比例尺
						 var scalebar = new ScaleBar({
								view : view,
								unit : "metric",
								style : "line",
						 });	
						 view.ui.add(scalebar, {
							 position : "bottom-left"
						 });
						 view.watch("scale", function(newValue, oldValue, propertyName) {
					          if(newValue<800){
					            view.scale=800;
					          }
					          $("#scaleInfo").html('1:'+newValue.toFixed(0));
					    });
				        view.watch("camera.heading", function(newValue, oldValue, propertyName) {
				        	$("#northIcon").css("transform","rotate("+(360-newValue)+"deg)");
				       	});
				        //打开时间轴
				        $("#clockSliderId").on("click",function(){	
				        	getIcon("iconShipin");
				        	$("#time_slider_div").css('display','');
				        })
				        //关闭时间轴
				        $("#time_slider_div_close").on("click",function(){	
				        	$("#time_slider_div").css('display','none');
				        })
	                    $("#day_night_swithcer").on("click",function(){	 
	                    	var date;
	                    	if(document.getElementById("day_night_swithcer_icon").className =="my-icon nav-icon icon-sunshine"){
	                    		document.getElementById("day_night_swithcer_icon").className ="my-icon nav-icon icon-moon";
	                    		$("#day_night_swithcer_span").html("夜间模式");
	                    		date="Sun Mar 28 2018 20:00:00 GMT+0800 (CET)";
                            }else{
                                document.getElementById("day_night_swithcer_icon").className ="my-icon nav-icon icon-sunshine";
                                $("#day_night_swithcer_span").html("日间模式");
                                date="Sun Mar 28 2018 9:00:00 GMT+0800 (CET)";
                            }
	  
	                    	view.environment.lighting.date = new Date(date);
	                    });
	                    
	                    $("#atmosphere_swithcer").on("click",function(){	
	                    	if(document.getElementById("atmosphere_swithcer_icon").className =="my-icon nav-icon icon-atmosphere_low"){
	                    		document.getElementById("atmosphere_swithcer_icon").className ="my-icon nav-icon icon-atmosphere_high";
	                    		$("#atmosphere_swithcer_span").html("大气质量：高")
	                    		view.environment.atmosphere.quality ="high";
                            }else{
                                document.getElementById("atmosphere_swithcer_icon").className ="my-icon nav-icon icon-atmosphere_low";
                                $("#atmosphere_swithcer_span").html("大气质量：低")
                                view.environment.atmosphere.quality ="low";
                            }
	                    });
	                    var snowTimer,rainTimer;
	                    $("#snow_swithcer").off().on("click",function(){	
	                    	if(document.getElementById("snow_swithcerId").className =="my-icon nav-icon icon-qing"){
	                    		document.getElementById("snow_swithcerId").className ="my-icon nav-icon icon-snow";
	                    		$("#snow_swithcer_span").html("雪");
                   	    	    var d="<div class='snow'>❅<div>"
                   	    	    //var d="<div class='snow'>,<div>";
                   	 			snowTimer=setInterval(function(){
                   	 				var f=$(document).width();
                   	 				var e=Math.random()*f;
                   	 				var o=0.3+Math.random();
                   	 				var fon=10+Math.random()*30;
                   	 				var l = e - 100 + 200 * Math.random();
                   	 				var k=2000 + 5000 * Math.random();
                   	 				$(d).clone().appendTo("#viewDiv").css({
                   	 					left:e+"px",
                   	 					opacity:o,
                   	 					top:"10%",
                   	 					"font-size":fon,
                   	 				}).animate({
                   	 				    top:"800px",
                   	 					left:l+"px",
                   	 					opacity:0.1,
                   	 				},k,"linear",function(){$(this).remove()})
                   	 			},10);
                            }else if(document.getElementById("snow_swithcerId").className =="my-icon nav-icon icon-snow"){
	                    		document.getElementById("snow_swithcerId").className ="my-icon nav-icon icon-rain";
	                    		$("#snow_swithcer_span").html("雨");
                   	    	    var d="<div class='snow'>۵<div>";
                   	    	    clearInterval(snowTimer);
                   	    	    rainTimer=setInterval(function(){
                   	 				var f=$(document).width();
                   	 				var e=Math.random()*f;
                   	 				var o=0.3+Math.random();
                   	 				var l = e - 100 + 200 * Math.random();
                   	 				var k=2000;
                   	 				$(d).clone().appendTo("#viewDiv").css({
                   	 					left:e+"px",
                   	 					opacity:o,
                   	 					top:"10%",
                   	 					"font-size":20,
                   	 				}).animate({
                   	 				    top:"800px",
                   	 					left:l+"px",
                   	 					opacity:0.1,
                   	 				},k,"linear",function(){$(this).remove()})
                   	 			},1);
                            }else{
                                document.getElementById("snow_swithcerId").className ="my-icon nav-icon icon-qing";
                                $("#snow_swithcer_span").html("晴");
                                clearInterval(rainTimer);
                            }
	                    });
						 /*** 全图按钮*/
						$("#initialExtent").off("click").on("click",function(){  
				              view.graphics.removeAll();
				              view.goTo({
				                   target : eErGuNaPolygon,
				                   heading : 0,
				                   tilt : 75,
	                               scale:750000
				               }, {
				                  speedFactor : 0.7,
				                  easing : 'ease-out'
				               });
				         });
						 
						 $("#mapExport").off("click").on("click",function(){
							 	layer.close(lineareaIndex);
							 	layer.close(xyLocationIndex);
							 	draw.reset();
							 	$("#area-tool").css("color","#6e6e6e");
							 	$("#topSearchHeadDiv").css("visibility","hidden");
				         	   /* 	$("#draw-polygon").css("background",""); */
				         	   	$("#length-tool").css("color","#6e6e6e");
				             	$("#draw-polyline").css("background","");
							 	$("#northIcon").css("visibility","visible");
								//view.graphics.removeAll();
						    	$("[id^='panel']").hide();
						    	getIcon("iconExport");
						    	$("#topSearchDivButton").css("visibility","hidden");
						    	$("#panExport").show("slow");
						    	$(".esri-widget").css("visibility","hidden");
					   		 	$("#PositionInfo").css("visibility","hidden");
					   		 	$("#titleInfo").css("visibility","visible");
				   		 	 	$("#scaleInfo").css("visibility","visible");
				   		 		$("#InfoExport").css("visibility","visible");
				   		 	 	$("#titleInfo").draggable();
					         	$("#scaleInfo").draggable();
					         	$("#titleInfo").css("color","#000");
					         	$("#titleInfo").css("font-size","20px");
					         	$("#scaleInfo").css("color","#000");
					         	$("#scaleInfo").css("font-size","20px");
					         	$("#nav").css("visibility","hidden");
					         	layui.use('colorpicker', function(){
					         		  var colorpicker = layui.colorpicker;
					         		  //渲染
					         		  colorpicker.render({
					         		    elem: '#colorpicker' 
					         		    ,color: 'rgb(0,0,0)' //设置默认色//绑定元素
					         		    ,format:'rgb'
					         		    ,done: function(color){
					         		    		$("#titleInfo").css("color",color);
					         		    }
					         		  });
					         		 colorpicker.render({
						         		  elem: '#colorpicker2' 
						         		  ,color: 'rgb(0,0,0)' //设置默认色//绑定元素
							         	  ,format:'rgb'
						         		  ,done: function(color){
						         		       $("#scaleInfo").css("color",color);
						         		  }
						         	 });
					         		 
					         		  $(".layui-colorpicker").css({"padding":"0","padding-left":"5px","border":"0"});
					         		  //$(".layui-colorpicker-trigger-span").css("display","");
					         		  //$(".layui-colorpicker-main").css("width","290px");
					            });
					         	layui.use('slider', function(){
					         		  var slider = layui.slider;
					         		  //渲染
					         		//设置最大最小值
						         	  slider.render({
						         	    elem: '#slideTest1'
						         	    ,min: 14 //最小值
						         	    ,max: 32 //最大值
						         	    ,value: 20
						         	    ,theme: '#058563'
						         	   ,change: function(value){
						         		  $("#titleInfo").css("font-size",value+'px');
						         		  $("#slideTest11").html(value);
						         		}
						         	  });
					         		  
						         	 slider.render({
							         	elem: '#slideTest2'
							         	,min: 14 //最小值
							         	,max: 32 //最大值
							         	,value: 20
							         	,theme: '#058563'
							         	,change: function(value){
							         		$("#scaleInfo").css("font-size",value+'px');
							         		$("#slideTest12").html(value);
							         	}
							         });
					         	});
					         	
					         	layui.use('form', function(){
					         		  var form = layui.form; 
					         		  form.on('radio(test)', function(data){
					         			  if(data.value == "1"){
					         				  $("#titleInfo").css("visibility","visible");
					         			  }else{
					         				  $("#titleInfo").css("visibility","hidden");
					         			  }
					         		  }); 
					         		   form.on('radio(test4)', function(data){
					         			  if(data.value  == "1"){
					         				  $("#northIcon").css("visibility","visible");
					         			  }else{
					         				  $("#northIcon").css("visibility","hidden");
					         			  }
					         		  });
					         		  form.on('radio(test3)', function(data){
					         			  if(data.value  == "1"){
					         				  $("#scaleInfo").css("visibility","visible");
					         			  }else{
					         				  $("#scaleInfo").css("visibility","hidden");
					         			  }
					         		  });	 	
					         	});
						 });
						 
						 $("#titleContent").off().on("input",function(){
							    $("#titleInfo").html($(this).val());
						 })
					     $("#InfoExport").off("click").on("click",function(){
				   		 	 $("#nav").css("visibility","visible");
					    	  $("#northIcon").css("visibility","hidden");
							  $("#panExport").hide("slow");
							  $(".esri-widget").css("visibility","visible");
					   		  $("#PositionInfo").css("visibility","visible");
					   		  $("#titleInfo").css("visibility","hidden");
				   		 	  $("#scaleInfo").css("visibility","hidden");
				   		 	  $("#topSearchHeadDiv").css("visibility","visible");
				   		 	  $("#topSearchDivButton").css("visibility","visible");
						 });
						 
						 $("#fullMap").off("click").on("click",function(){
							 
							 if(screenfull.isFullscreen){						
									$("#fullMap div").css("background-image","url(/ResourceMonitor/images/menuIcon/fullMap.png)");
								}else{
									$("#fullMap div").css("background-image","url(/ResourceMonitor/images/menuIcon/fullMap2.png)");
								}
							 if (screenfull.enabled) {
	                   				screenfull.toggle();
	                   	     }
							
							 //
						 });
						 
						 /* $("#uploadExcel").off("click").on("click",function(){
							 layer.open({
					    			title:'导入坐标信息',
					    			type: 2,
					    			id:"uploadXY",
					    			area: ['400px', '300px'],
					    			btn : [ '上传', '取消' ],
					    			content: ['/ResourceMonitor/jsp/commandForFire/BaseStationMap/layers/importExcel.jsp','no'],
					    			yes : function(index, layero) {
										var iframeWin = window[layero.find('iframe')[0]['name']]; // 得到iframe页的窗口对象，执行iframe页的方法：
										iframeWin.uploadFile();
									},
					    	 }); 
						 }); */
						var viewSwitchButton = document.getElementById("viewSwitch");
				       	   viewSwitchButton.addEventListener("click",function() {
				        	   var is3D =$("#switch-btn").attr("class")=="icon-switch3d";
				        	   if(is3D){
				        		  $("#switch-btn").attr("class","icon-switch2d");
				        		  demLayer.visible=false;
				        	   }else{
				        		  demLayer.visible=true;
				        		  $("#switch-btn").attr("class","icon-switch3d");
				        	   }
				          });
						
						 view.on("pointer-move", pointerMoveEventHandler);
					        function pointerMoveEventHandler(event) {
					        	$("#VRInfo").css("display","none");
					         	view.when(function(response){
					         		
									var point = view.toMap({x: event.x, y: event.y});
					         	   	if(point==null){
					         	   		return;
					         	   	}
					                var lonlat = mercator2lonlat(point);                            
					                var longitude=lonlat.x;
					                var latitude=lonlat.y;
					                longtD = parseInt(longitude);
					                latD = parseInt(latitude);
					                longtM = parseInt((longitude - longtD) * 60);
					                latM = parseInt((latitude - latD) * 60);
					                longtS = (((longitude - longtD) * 60 - longtM) * 60).toFixed(2);
					                latS = (((latitude - latD) * 60 - latM) * 60).toFixed(2);
					                document.getElementById("pointlongt").innerHTML=longtD+' °  '+longtM+' ′  '+longtS+' ″';
					                document.getElementById("pointlat").innerHTML=latD+' °  '+latM+' ′  '+latS+' ″';
					                
					                demQueryLayer.queryElevation(point, { returnSampleInfo: true }).then(function(result){
		                           		document.getElementById("elevation").innerHTML=result.geometry.z.toFixed(0);
		                            });
		                            pdQueryLayer.queryElevation(point, { returnSampleInfo: true }).then(function(result){
		                                var slopeVal=result.geometry.z;
		                                document.getElementById("slope").innerHTML=slopeVal.toFixed(0);
		                                if(slopeVal<=5){
		                                    document.getElementById("aspect").innerHTML="无坡向";
		                                }else{
		                                    pxQueryLayer.queryElevation(point, { returnSampleInfo: true }).then(function(result){
		                                         var pxName="-";
		                                         var aspectVal=result.geometry.z;
		                                         if(aspectVal<=112 || aspectVal>=292){
		                                             pxName="阴坡";
		                                         }else{//112-292
		                                             pxName="阳坡";
		                                         }
		                                         document.getElementById("aspect").innerHTML=pxName;
		                                     });
		                                }
		                            }); 
					        	}); 
					         	 view.hitTest(event).then(function(response) {
		                            	var clickResult = response.results[0];
		           			    		var graphic = clickResult.graphic;
		           			    		if(graphic !==null && graphic.attributes.GRAPHYFLAG == 6){
		           			    			var x = event.x - 55;
		           			    			var y = event.y - 132;
		           			    			$("#VRInfo").css("left",x+"px");
		           			    			$("#VRInfo").css("top",y+"px");
		           			    			$("#VrPhoto img").attr("src","/ResourceMonitor/IdentifyPhoto/small/" + graphic.attributes.photo);
		           			    			if(graphic.attributes.photoGroup.length > 6){
		           			    				$("#VrTitle").html(graphic.attributes.photoGroup.substr(0,6)+"...");
		           			    			}else{
		           			    				$("#VrTitle").html(graphic.attributes.photoGroup);
		           			    			}
		           			    			$("#VRInfo").css("display","");
		           			    		}
		                            });
					         }
					        //林场切换方法
					        $('#zuzhi_tree').treeview({
					            data : get_ZuZhiTree(),
					            backColor:'#ebeae5',
					            showBorder : false,
					            color : '#000',
					            selectedBackColor:analysis.themeColor,
					            onhoverColor : '#089272',
					            onNodeSelected : function(event, data) {
					          	   if(data.nodeId==0){
					                    if (cookie_userDepartmentVal=='0') {
				 				        	view.goTo({
				                                target : eErGuNaPolygon,
				                                heading : 0,
				                                tilt : 75,
				                                scale:750000
				                            },
				                            {
				                                speedFactor : 1,
				                                easing : 'ease-out'
				                            })
				 				        	xiaobanLayer.definitionExpression = "1=1"; 
					                    }else {
					                        layer.alert("抱歉,您无权查看");
					                    } 
					         	   }else{
					         		    var linchangName=data.text;
			 				        	var query = new Query();
				 				        query.where = "林场名='"+linchangName+"'";
				 				      	query.returnGeometry=true;
				 				      	query.outFields = ["*"];
				 				      	linChangQueryTask.execute(query).then(function(result){
				 					   	    view.goTo({
				 					   	    	target : result.features,
				 					   	    	heading : 0,
				                                tilt : 75,
				                                scale:300000
				                            },
				                            {
				                                speedFactor : 2,
				                                easing : 'ease-out'
				                            })
				 				     	}) ;
				 				      	xiaobanLayer.definitionExpression = "林场='"+linchangName+"'";
					         	   } 
					            }
					        });
			             	// 坐标定位方法
			                $("#xyLocation").click(function() {
			                	analysis.funClearLayerGraphics();
			                	var longt;
			                	var lat;
			                	layer.close(xyLocationIndex);
			                	xyLocationIndex = layer.open({
			                		title : "坐标定位",
			                		type : 2,
			                		resize : false,
			                		area : [ '325px', '300px' ],
			                		content : 'locateTo.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
			                		btn : [ '确定', '取消' ],
			                		shade :0,
			                		yes : function(index, layero) {
			                			var body = layer.getChildFrame('body', index);
			                			var iframeWin = window[layero.find('iframe')[0]['name']];
			                			if(!iframeWin.paramsValidate())
			                				return;
			                			var class_dfz = body.find('#dfz').attr("Class");
			                			var class_sjz = body.find('#sjz').attr("Class");
			                			var class_xian80 = body.find('#xian80').attr("Class");
			                			//
			                			if (class_dfz == "active") {
			                				var du,fen,miao;
			                				du = body.find('#longtDu').val();
			                				if (du == "") {
			                					du = "0";
			                				}
			                				fen  = body.find('#longtFen').val();
			                				if (fen == "") {
			                					fen = "0";
			                				}
			                				miao  = body.find('#longtMiao').val();
			                				if (miao == "") {
			                					miao = "0";
			                				}
			                				// 度分秒转经纬度
			                				longt = Math.abs(du) + (Math.abs(fen)/60 + Math.abs(miao)/3600);
			                				du = body.find('#latDu').val();
			                				if (du == "") {
			                					du = "0";
			                				}
			                				fen  = body.find('#latFen').val();
			                				if (fen == "") {
			                					fen = "0";
			                				}
			                				miao  = body.find('#latMiao').val();
			                				if (miao == "") {
			                					miao = "0";
			                				}
			                				lat = Math.abs(du) + (Math.abs(fen)/60 + Math.abs(miao)/3600);
			                				
			                				
			                				
			                			}
			                			if (class_sjz == "active") {
			                				longt = body.find('#longtFull').val();
			                				lat = body.find('#latFull').val();
			                			}
			                			if (class_xian80 == "active") {
			                				xCoor = body.find('#xCoor').val();
			                				yCoor = body.find('#yCoor').val();
			                				var firstProjection='';
							                if(xCoor.substring(0,2)=='20'){
							                	firstProjection ='+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=20500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs';
							                }else{
							                	firstProjection ='+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=21500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs';
							                }
                                            var secondProjection = "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees";
                                            var mm = proj4(firstProjection,secondProjection,[parseInt(xCoor),parseInt(yCoor) ]);
                                            longt=mm[0];
                                            lat=mm[1];
			                			}
			                			analysis.funEventLocator({lon:longt,lat:lat})	
			                			layer.close(index); // 如果设定了yes回调，需进行手工关闭
			                		},
			                		btn2 : function(index, layero) {
			                			// do something
			                			layer.close(index); // 如果设定了yes回调，需进行手工关闭
			                		},
			                	});

			                	
			                });
					        var identifyButton = document.getElementById("identify");
		                       identifyButton.addEventListener("click", function() {
		                    	   //layer.closeAll();
		                    	   if(viewModel1 != null){
		                    		   viewModel1.clearMeasurement();
		                    		   
		                    	   }
	 							   if(viewModel2 != null){
	 								  viewModel2.clearMeasurement();
	 							
		                    	   }
	                    		   //$("#length-tool").css("color","#6e6e6e");
	                    		   //$("#draw-polyline").css("background","");
	                    		   //$("#area-tool").css("color","#6e6e6e");
	                    		   /* $("#draw-polygon").css("background",""); */
		                    	   //document.getElementById("renameId").className ="icon-rename";
		                    	   if($("#identify-tool").css("color")=="rgb(238, 238, 238)"){
		                    		   $("#identify-tool").css("color","#6e6e6e");
		                    		   $("#identify").css("background","");
		                    		   IkeyFlag = 0;
		                    	   }else{
		                    		   $("#identify-tool").css("color","#eee");
		                    		   $("#identify").css("background",analysis.themeColor);
		                    		   IkeyFlag = 1;
		                    	   }
		                    });
					        
		                    //VR显示方法
		                  $("#i360").off("click").on("click",function(){
							 view.graphics.removeAll();
							 VrmarkLayer.removeAll();
    						 $("[id^='panel']").hide();
    						 getIcon("i360");
    							 $("#panelVR").show("slow");
    							 setTimeout(function() {
    						  			VRTable();
    							 },500);
    					  });
	                     
	                       draw = new Draw({
	   		     				view: view
	                       });
	                       document.getElementById("draw-polyline").addEventListener("click",function () {
	                    	   view.goTo({
		                           tilt : 45,
		                       }, {
		                           speedFactor : 1,
		                           easing : 'ease-out'
		                       });
	           			    	  view.graphics.removeAll();
	           			    	  layer.close(lineareaIndex);
	           			    	   $("#area-tool").css("color","#6e6e6e");
		                    	  /*  $("#draw-polygon").css("background",""); */
		                    	   if($("#length-tool").css("color")=="rgb(238, 238, 238)"){
		                    		   document.body.style.cursor="default";
		                    		   $("#length-tool").css("color","#6e6e6e");
			                    		 $("#draw-polyline").css("background","");
		                  				  view.graphics.removeAll();
		                  				  MeasurementLayer.removeAll();
		                  				  draw.reset();
		           						  view.focus();
		           						  layer.close(lineareaIndex);
		                           }else{
		                        	   $("#length-tool").css("color","#eee");
		                    		   $("#draw-polyline").css("background","#058563");
		                    		   var left = $(window).width() - 260 ;
		                    		   lineareaIndex = layer.open({
	           			        		   type: 1,
	           			        		   id:'distanceUnit',
	           			        		   title:false,
	           			        		   shade: 0,
	           			        		   resize:false,
	           			        		   scrollbar: false,
	           			        		   shadeClose:false, 
	           			        		   closeBtn:0,
	           			        		   offset: ['60px', left+'px'],	
	           							   area:['185px','100px'],
	           			        		  /*  content:
	           			        			   '<select id="distanceUnit" name="distanceUnit" style="width:100px;height:30px">'+
	           										'<option value="meters"  selected="">米</option>'+ 
	           										'<option value="kilometers">千米</option>'+
	           			        			   '</select>', */
	           			        		   content:'<button id="drawline" class="linebtn lineSelect">距离量算</button><button id="drawarea" class="linebtn" style="margin-left: 15px;">面积量算</button>'
	           			        		   	+ '<div class="linediv line">单位<select id="disUnit" class="form-control" style="margin-bottom: 0;width:80px;display: inline; margin-left: 50px;border: 0;border-radius: 0;box-shadow: none;border-bottom: 1px solid #ccc;"><option value="meters">米</option><option value="kilometers">千米</option></select></div>'
	           			        			+ '<div class="linediv area" style="display: none;">单位<select id="areaUnit" class="form-control" style="margin-bottom: 0;width:80px;display: inline; margin-left: 50px;border: 0;border-radius: 0;box-shadow: none;border-bottom: 1px solid #ccc;"><option value="acres">亩</option><option value="hectares">公顷</option><option value="square-meters">平方米</option></select></div>'
	           			        			+ '<input id="type" value="1" style="display:none;"/>'
	           			        			+ '<hr style=" margin: 0px;margin-bottom: 5px;">'
	           			        			+ '<button id="empty" class="btn btn-default" style=" margin-left: 5px;margin-right: 10px; width: 75px; padding: 0 8px;">清空</button>'
	           			        			+ '<button id="draw" class="btn btn-default" style=" margin-left: 0px;">开始量算</button>',
	           		        			   cancel: function(){ 
	           		        				 $("#length-tool").css("color","#6e6e6e");
				                    		 $("#draw-polyline").css("background","");
	           		        				   view.graphics.removeAll();
	           		        				   MeasurementLayer.removeAll();
	           		        				   draw.reset();
	           		 						   view.focus();
	           		        				   layer.close(lineareaIndex);
	           		        			   }
	           			        	   });
		                    		   
		                    		   /*distanceUnitVal=$("#distanceUnit option:selected").val();
	           			        	  	distanceUnitName=$("#distanceUnit option:selected").text();
	           			        	    view.graphics.removeAll();
	           			        	    //enablecreatePolyline(draw, view);
	           		 					 $("#distanceUnit").click(function(){
	           								distanceUnitVal=$("#distanceUnit option:selected").val();
	           							    distanceUnitName=$("#distanceUnit option:selected").text();
	           								view.graphics.removeAll();
	           								//enablecreatePolyline(draw, view); 
	           							}); */
	           							$("#drawline").click(function(){
	           								$("#type").val("1");
	           								$("#drawarea").removeClass("lineSelect");
	           								$("#drawline").addClass("lineSelect");
	           								$(".line").css("display","");
	           								$(".area").css("display","none");
           								});
	           							
										$("#drawarea").click(function(){
											$("#type").val("2");
											$(".line").css("display","none");
											$(".area").css("display","");
											$("#drawline").removeClass("lineSelect");
	           								$("#drawarea").addClass("lineSelect");
           								});
	           		 					
	           		 					$("#draw").click(function(){
	           		 					    document.body.style.cursor='crosshair';
	           		 						var type = $("#type").val();
	           		 						if(type == "1"){
	           		 							distanceUnitVal=$("#disUnit option:selected").val();
           							   			distanceUnitName=$("#disUnit option:selected").text();
           							   			enablecreatePolyline(draw, view); 
	           		 						}else{
	           		 							areaUnitVal=$("#areaUnit option:selected").val();
	           									areaUnitName=$("#areaUnit option:selected").text();
	           									enableCreatePolyArea(draw, view);
	           		 						}
           								});
	           		 					$("#empty").click(function(){
	           		 						view.graphics.removeAll();
	           		 					 	MeasurementLayer.removeAll();
	           		 					});
	           		 					
	           			          }
	           			        });
	                        
	                       
	                       // 点击刷新
	                       var refreshButton = document.getElementById("refreshGraphics");
	                       refreshButton.addEventListener("click", function() {
	                    	   view.graphics.removeAll();
	                    	   MeasurementLayer.removeAll();
	                   		   positionLayer.removeAll();
	                		   trailLayer.removeAll();
	                	   	   map.remove(dynamic_layers);
	                		   dingweiLayer.removeAll();
	                		   analysisPointLayer.removeAll();
	                		   analysisGraphicLayer.removeAll();
	                		   signFlagLayer.removeAll();
	                		   drawResourceLayer.removeAll();
	                		   highlightRouteLyr.removeAll();
	                       });
	           			    view.on("mouse-wheel",function(){
	           	  				if(beforObj!=null){
	           	  					beforObj.update({
	           	  		  	  	      start: 1
	           	  		  	  	    });
	           	  				}
		           	            if(eChartTimer!=null&&$('#panelFlight').css('display')=='none'){
		           	            	clearInterval(eChartTimer);
		           	            	eChartTimer=null;
		           	            }
	           			    })
	           			    view.on("pointer-down",function(){
	           	  				if(beforObj!=null){
	           	  					beforObj.update({
	           	  		  	  	      start: 1
	           	  		  	  	    });
	           	  				}
		           	            if(eChartTimer!=null&&$('#panelFlight').css('display')=='none'){
		           	            	clearInterval(eChartTimer);
		           	            	eChartTimer=null;
		           	            }
	           			    })
	           			    view.on("drag",function(){
	           	  				if(beforObj!=null){
	           	  					beforObj.update({
	           	  		  	  	      start: 1
	           	  		  	  	    });
	           	  				}
		           	            if(eChartTimer!=null&&$('#panelFlight').css('display')=='none'){
		           	            	clearInterval(eChartTimer);
		           	            	eChartTimer=null;
		           	            }
	           			    }) 
	           			    view.on("click", clickEvnetHandler);
	           			    function clickEvnetHandler(event) {
	           	  				if(beforObj!=null){
	           	  					beforObj.update({
	           	  		  	  	      start: 1
	           	  		  	  	    });
	           	  				}
		           	            if(eChartTimer!=null&&$('#panelFlight').css('display')=='none'){
		           	            	clearInterval(eChartTimer);
		           	            	eChartTimer=null;
		           	            }
	           			    	haeExacuteQuery = 0;
	           			    	view.hitTest(event).then(function(response) {
	           			    		var clickResult = response.results[0];
	           			    		var graphic = clickResult.graphic;
	           			    		if(!IkeyFlag){
	           			    			return;
	           			    		}
	           			    		if(graphic !==null){
	    								var attributes = graphic.attributes;
	           			    			if(attributes.GRAPHYFLAG == 2||attributes.GRAPHYFLAG == 7){
	           			    				haeExacuteQuery = 1;
											if(IkeyFlag){
												if(attributes.GRAPHYFLAG == 2){
													if(oldGraphic){
														//locationLayer.removeAll();
														locationLayer.remove(oldGraphic);
													}
													if(oldlabelGraphic){
														locationLayer.remove(oldlabelGraphic);
													}
													var markerSymbol = {
															type : "picture-marker", // autocasts as new
															// PictureMarkerSymbol()
															url : "/ResourceMonitor/images/mark/32/person_red.png",
															width : 20,
															height : 20,
															xoffset : 0,
															yoffset : 8
													};
													var pt = new Point(attributes.longitude, attributes.latitude);
													var Newgraphic = new Graphic({
														geometry : pt,
														symbol : markerSymbol
													});
													Newgraphic.attributes = attributes;
													var name = attributes.personName;
													var text = new TextSymbol({
														text : "                  "+ name,
														font : {
															size : 12,
															family : "宋体",
															weight : "bold"
														},
														color : new dojo.Color([ 216, 30, 6, 3 ]),
														xoffset : 30,
														yoffset : 30,
													});
													var NewlabelGraphic = new Graphic(pt, text);
													locationLayer.add(NewlabelGraphic);
													locationLayer.add(Newgraphic);
													oldlabelGraphic = NewlabelGraphic;
													oldGraphic = Newgraphic;
												}
												openLayer(attributes);
											}else{
												//layer.msg("请打开i键查询！")
											}
	           			    			}
	           			    			if(attributes.GRAPHYFLAG == 5){
	           			    				haeExacuteQuery = 1;
											if(IkeyFlag){
												showDetail(attributes.id);
											}else{
												//layer.msg("请打开i键查询！")
											}
	           			    			}
	           			    			if(attributes.GRAPHYFLAG == 6){
	           			    				haeExacuteQuery = 1;
											if(IkeyFlag){
												if(screenfull.isFullscreen){
													pashowVR(attributes.id);
												}else{
													parent.pashowVR(attributes.id);
												}
												
											}
	           			    			}
	           			    		}

									identifyTask = new IdentifyTask(soilURL);
									// Set the parameters for the Identify
									identifyParams = new IdentifyParameters();
									identifyParams.tolerance = 5;
									identifyParams.layerIds = [0,1,2,6,7,8,9,11];
									identifyParams.layerOption = "top";
									identifyParams.maxAllowableOffset = 10;
									identifyParams.width = view.width;
									identifyParams.height = view.height;
									identifyParams.geometry = clickResult.mapPoint;
									identifyParams.mapExtent = view.extent;
									identifyParams.returnGeometry=true;
									//document.getElementById("viewDiv").style.cursor = "wait";
									if(haeExacuteQuery == 0){
										identifyTask.execute(identifyParams).then(function(response) {
	           			    		var results = response.results;
	           	               		return arrayUtils.map(results, function(result) {
	           	               			//
										//layer.closeAll();
	           	               			layer.close(layerIndex);
	           	               			//parent.layer.closeAll();
	           	               			var feature = result.feature;                        
	           	               			var attr = feature.attributes;
	           	               			var layerName = result.layerName;
	           	               			
	           	               			if(layerName == '塔' && (liaoWangTai_3d.visible||attributes.GRAPHYFLAG == 0)){
	           	               				if(IkeyFlag){
	           	               					dingweiLayer.removeAll();
					                      	  	var resultSymbol={
					          	    	            type: "picture-marker", 
				            	    	            url: "/ResourceMonitor/images/mark/32/ta.png",
				            	    	            height: 35,
				            	    	            width: 35
					             	    	     };
		                        	    		 var curGraphic=new Graphic({
		                            				  geometry: feature.geometry,
		                            				  symbol: resultSymbol,
		                        	    		 });
		                        	    		 if(attributes.GRAPHYFLAG != 0){
		                        	    			 dingweiLayer.add(curGraphic);
		                        	    		 }
	           	               					htmlStr = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;">'
	           	               						+ '<table class="layui-table" lay-even style="text-align:center;margin-bottom:-1px"><tbody>'  
	           	               						+ '<td style="width:100px;">所在林场</td><td>'+attr.林场
	           	               						+ '</td></tr><tr><td>地点</td><td>'+attr.地点 
	           	               						+ '</td></tr><tr><td>经度</td><td>'+attr.经度
	           	               						+ '</td></tr><tr><td>纬度</td><td>'+ attr.纬度
	           	               						+ '</td></tr><tr><td>类型</td><td>'+ attr.类型
	           	               						+ '</td></tr><tr><td colspan="2"><img   src="/ResourceMonitor/towerPhoto/'+attr.Id+'.jpg" style="height:100px;max-width:200px" />'
	           	               						+ '</td></tr></tbody></table></div>';
	           	               					layerIndex=layer.open({
	           	               						type : 1,
	           	               						shade:0,
	           	               						title : '塔',
	           	               						content : htmlStr,
	           	               						offset:  'rb',
	           	               						//area: ['250px', '400px'],
	           	               						//area:'auto',
	           	               						anim: -1,
	           	               						isOutAnim: false,
	           	               						scrollbar :false,
	           	               					});
	           	               				}else{
	           	               					//layer.msg("请打开i键查询！")
	           	               				}
	           	               			}else if(layerName == '管护站' && (fangHuoZhan_3d.visible||attributes.GRAPHYFLAG == 0)){
	           	               				if(IkeyFlag){
	           	               					dingweiLayer.removeAll();
					                      	  	var resultSymbol={
					          	    	            type: "picture-marker", 
				            	    	            url: "/ResourceMonitor/images/mark/32/guanhuzhan.png",
				            	    	            height: 35,
				            	    	            width: 35
					             	    	     };
		                        	    		 var curGraphic=new Graphic({
		                            				  geometry: feature.geometry,
		                            				  symbol: resultSymbol,
		                        	    		 });
		                        	    		 if(attributes.GRAPHYFLAG != 0){
		                        	    			 dingweiLayer.add(curGraphic);
		                        	    		 }
	           	               				htmlStr = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;">'
	           	                               + '<table class="layui-table" lay-even style="text-align:center;margin-bottom:-1px"><tbody>'  
	           	                               + '<td style="width:100px;">站点编号</td><td>'+attr.ID 
	           	                              + '</td></tr><tr><td>名称</td><td>'+attr.管护站  
	           	                               + '</td></tr><tr><td>所属林场</td><td><span>'+ attr.林场名
	           	                               + '</td></tr><tr><td>经度</td><td>'+ attr.经度 
	           	                               + '</td></tr><tr><td>纬度</td><td>'+ attr.纬度 
	           	                               + '</td></tr><tr><td colspan="2"><img   src="/ResourceMonitor/zdPhoto/'+attr.ID+'.jpg"  style="height:100px;max-width:200px"  />'
	           	                               + '</td></tr></tbody></table></div>';
	           	               					layerIndex=layer.open({
	           	               						type : 1,
	           	               						shade:0,
	           	               						title : '管护站',
	           	               						content : htmlStr,
	           	               						offset:  'rb',
	           	               						anim: -1,
	           	               						isOutAnim: false,
	           	               						scrollbar :false,
	           	               					});
	           	               				}else{
	           	               					//layer.msg("请打开i键查询！")
	           	               				}		
	           	               			}else if(layerName == '居民点' && (jmdFeatureLayer.visible||attributes.GRAPHYFLAG == 0)){
	           	               				if(IkeyFlag){
	           	               					dingweiLayer.removeAll();
					                      	  	var resultSymbol={
					          	    	            type: "picture-marker", 
				            	    	            url: "/ResourceMonitor/images/mark/32/cuntun.png",
				            	    	            height: 35,
				            	    	            width: 35
					             	    	     };
		                        	    		 var curGraphic=new Graphic({
		                            				  geometry: feature.geometry,
		                            				  symbol: resultSymbol,
		                        	    		 });
		                        	    		 if(attributes.GRAPHYFLAG != 0){
		                        	    			 dingweiLayer.add(curGraphic);
		                        	    		 }
	           	               				htmlStr = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;">'
	           	                               + '<table class="layui-table" lay-even style="text-align:center;margin-bottom:-1px"><tbody><tr><td style="width:80px;">名称</td><td>'
	           	                               +attr.cuntun+ '</td></tr></tbody></table></div>';
	           	               				layerIndex=layer.open({
           	               						type : 1,
           	               						shade:0,
           	               						title : '居民点', 
           	               						content : htmlStr,
           	               						offset:  'rb',
           	               						//area: ['250px', '400px'],
           	               						area:'auto',
           	               						anim: -1,
           	               						isOutAnim: false,
           	               						scrollbar :false,
           	               					});
	           	               				}else{
	           	               					//layer.msg("请打开i键查询！")
	           	               				}
	           	               			}else if(layerName == '牧业点' && (mydFeatureLayer.visible||attributes.GRAPHYFLAG == 0)){
	           	               				if(IkeyFlag){
	           	               					dingweiLayer.removeAll();
					                      	  	var resultSymbol={
					          	    	            type: "picture-marker", 
				            	    	            url: "/ResourceMonitor/images/mark/32/myd.png",
				            	    	            height: 35,
				            	    	            width: 35
					             	    	     };
		                        	    		 var curGraphic=new Graphic({
		                            				  geometry: feature.geometry,
		                            				  symbol: resultSymbol,
		                        	    		 });
		                        	    		 if(attributes.GRAPHYFLAG != 0){
		                        	    			 dingweiLayer.add(curGraphic);
		                        	    		 }
	           	               				htmlStr = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;">'
	           	                               + '<table class="layui-table" lay-even style="text-align:center;margin-bottom:-1px"><tbody>'                 
	           	                               + '</td></tr><tr><td style="width:80px;">林场</td><td>'+attr.林场 
	           	                               + '</td></tr><tr><td>名称</td><td>'+ attr.Name                   
	           	                               + '</td></tr><tr><td>经度</td><td>'+ attr.经度 
	           	                               + '</td></tr><tr><td>纬度</td><td>'+ attr.纬度  
	           	                               + '</td></tr></tbody></table></div>';
		           	               				layerIndex=layer.open({
	           	               						type : 1,
	           	               						shade:0,
	           	               						title : '牧业点', 
	           	               						content : htmlStr,
	           	               						offset:  'rb',
	           	               						//area: ['250px', '400px'],
	           	               						area:'auto',
	           	               						anim: -1,
	           	               						isOutAnim: false,
	           	               						scrollbar :false,
	           	               					});
	           	               				}else{
	           	               					//layer.msg("请打开i键查询！")
	           	               				}
	           	               			}else if(layerName == '停机坪' && tjpFeatureLayer.visible){
	           	               				if(IkeyFlag){
	           	               					dingweiLayer.removeAll();
					                      	  	var resultSymbol={
					          	    	            type: "picture-marker", 
				            	    	            url: "/ResourceMonitor/images/mark/32/tingjiping.png",
				            	    	            height: 35,
				            	    	            width: 35
					             	    	     };
		                        	    		 var curGraphic=new Graphic({
		                            				  geometry: feature.geometry,
		                            				  symbol: resultSymbol,
		                        	    		 });
		                        	    		 dingweiLayer.add(curGraphic);
	           	               				}else{
	           	               					//layer.msg("请打开i键查询！")
	           	               				}		
	           	               			}else if(layerName == '河流' && baseGeoMapLayers.visible && baseGeoMapLayers.findSublayerById(9).visible){
	           	               				if(IkeyFlag){
	           	               				 htmlStr = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;width:200px">'
	           	                               + '<table class="layui-table" lay-even style="text-align:center;margin-bottom:-1px"><tbody>'                 
	           	                               + '<td>河流id</td><td>'+attr.ID 
	           	                               + '</td></tr><tr><td>名称</td><td>'+attr.名称                   
	           	                               + '</td></tr></tbody></table></div>';
	           	               				 layerIndex=layer.open({
	           	               					 type : 1,
	           	               					 shade:0,
	           	               					 title : '河流', 
	           	               					 content : htmlStr,
	           	               					 offset:  'rb',
	           	               					 //area: ['250px', '400px'],
	           	               					 area:'auto',
	           	               					 anim: -1,
	           	               					 isOutAnim: false,
	           	               					 scrollbar :false,
	           	               				 });
	           	               				}else{
	           	               					//layer.msg("请打开i键查询！")
	           	               				}
	           	               			}else if(layerName == '道路' && baseGeoMapLayers.visible && baseGeoMapLayers.findSublayerById(8).visible){
	           	               				if(IkeyFlag){
	           	               				 htmlStr = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;width:200px">'
	           	                               + '<table class="layui-table" lay-even style="text-align:center;margin-bottom:-1px"><tbody>'                 
	           	                               + '</td></tr><tr><td>名称</td><td>'+attr.名称 
	           	                               + '</td></tr><tr><td>等级</td><td>'+ attr.等级                    
	           	                               + '</td></tr></tbody></table></div>';
	           	               					layerIndex=layer.open({
	           	               						type : 1,
	           	               						shade:0,
	           	               						title : '道路', 
	           	               						content : htmlStr,
	           	               						offset:  'rb',
	           	               						//area: ['250px', '400px'],
	           	               						area:'auto',
	           	               						anim: -1,
	           	               						isOutAnim: false,
	           	               						scrollbar :false,
	           	               					});
	           	               				}else{
	           	               					//layer.msg("请打开i键查询！")
	           	               				}
	           	               			}else if(layerName == '小班面' && baseGeoMapLayers.visible && xiaobanLayer.visible){
	           	               				if(IkeyFlag){
	           	               					//
	           	               					htmlStr = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;">'
	           	               						+ '<table class="layui-table" lay-even style="text-align:center;margin-bottom:-1px"><tbody>'
	           	               						+ '</td></tr><tr><td>林场</td><td>'+ attr.林场 
	           	               						+ '</td></tr><tr><td>林班号</td><td>'+ attr.LIN_BAN 
	           	               						+ '</td></tr><tr><td>小班号</td><td>' + attr.XIAO_BAN 
	           	               						+ '</td></tr><tr><td>地类</td><td>'+ attr.土地种
	           	               						+ '<tr><td>面积</td><td>'+ attr.MIAN_JI
	           	               						+ '</td></tr><tr><td>优势树种</td><td>'+ attr.优势树
	           	               						+ '</td></tr><tr><td>林种</td><td>'+ attr.林种
	           	               						+ '</td></tr><tr><td>坡度</td><td>'+ attr.PO_DU 
	           	               						+ '</td></tr><tr><td>坡向</td><td>'+ attr.坡向
	           	               						+ '</td></tr><tr><td>郁闭度</td><td>'+ attr.YU_BI_DU                            
	           	               						+ '</td></tr><tr><td>林地保护等级</td><td>'+ attr.保护等
	           	               						+ '</td></tr></tbody></table></div>';
	           	               					  layerIndex=layer.open({
	           	               								type : 1,
	           	               								content : htmlStr,
	           	               								title : '小班详情',
	           	               								offset : 'rb',
	           	               								resize : false,
	           	               								//area : ['250px','490px' ],
	           	               								area:'auto',
	           	               								anim: -1,
	           	               								isOutAnim: false,
	           	               								scrollbar :false,
	           	               								shade:0
	           	               							});
	           	               				}else{
	           	               					//layer.msg("请打开i键查询！")
	           	               				}
	           	               			}
	           	               		});
	           			    	});
	           			     }
	           			    	
	           			});  	
	           			    	
	           		} 
	           			    
	           			 function enablecreatePolyline(draw, view) {
        						var action = draw.create("polyline");
        						action.on("vertex-add", drawPolyline);
        						action.on("cursor-update", drawPolyline);
        						action.on("vertex-remove", drawPolyline);
        						action.on("draw-complete",  function (evt) {
        							drawPolyline(evt,true);
        					    });
        				 }
        			      function drawPolyline(evt,isComplete=false) {
         			    	    
        						var vertices = evt.vertices;
        			
        						//remove existing graphic
        						view.graphics.removeAll();
        			
        						// 新建一个多边形
        						var polygon = createPolygon(vertices);
        			
        						var polyline = createPolyline(vertices);
        			
        						// 创建一个表示多边形的新图形，将其添加到视图中
        						var graphic = createGraphic(polyline);
        						if(isComplete){
        			    	    	document.body.style.cursor="default";
        			    	    	MeasurementLayer.add(graphic);
        			    	    }else{
        			    	    	view.graphics.add(graphic);
        			    	    }
        						
        			
        						// 计算多边形的长度
        						//meters 米| feet 英尺| kilometers 千米| miles 英里| nautical-miles 海里| yards码
        						var lineLength = geometryEngine.geodesicLength(polyline,distanceUnitVal);
        						var fixed=4;
        						if(distanceUnitVal=='meters'){
        							fixed=1;
        						}
        						// 开始显示多边形的长度
        						labelLength(polygon, lineLength,isComplete,fixed);
        					} 

        					// 使用所提供的顶点创建折线
        					function createPolyline(vertices) {
        						return new Polyline({
        							paths: vertices,
        							spatialReference: view.spatialReference
        						});
        					}
        			
        					// 创建一个新的图形，表示在视图上绘制的多边形。
        					function createGraphic(polyline) {
        						graphic = new Graphic({
        							geometry: polyline,
        							symbol: {
        								type: "simple-line", // autocasts as new SimpleFillSymbol
        								color: [4, 90, 141],
        								width: 4,
        								cap: "round",
        								join: "round"
        							}
        						});
        						return graphic;
        					}
        			
        					//距离标签
        					function labelLength(geom, area,isComplete,fixed) {
        						 var graphic = new Graphic({
        							geometry: geom.centroid,
        							symbol: {
        								type: "text",
        								color: "white",
        								//保留的小数位
        								text: area.toFixed(fixed) + distanceUnitName,
        								xoffset: 0,
        								yoffset: 0,
        								font: { // 自动字体
        									size: 16,
        									family: "宋体"
        								}
        							}
        						});
        						if(isComplete){
         			    	    	MeasurementLayer.add(graphic);
         			    	    }else{
         			    	    	view.graphics.add(graphic);
         			    	    }

        						/* var labelClass = new LabelClass({
        							  labelExpressionInfo: {
        							    expression: area.toFixed(3) + distanceUnitName, // Text for labels comes from COUNTY field
        							  },
        							  symbol: {
        							    type: "label-3d",  // autocasts as new LabelSymbol3D()
        							    symbolLayers: [{
        							      type: "text",  // autocasts as new TextSymbol3DLayer()
        							      material: { color: [ 255,255,255 ] },
        							      size: 14  // points
        							    }]
        							  }
        						});
        						view.graphics.labelsVisible = true;
        						view.graphics.labelingInfo = [ labelClass ]; */
        					}
        					
        					function enableCreatePolyArea(draw, view){		
        					    var action = draw.create("polygon");
        					    action.on("vertex-add", drawPolyArea);
        					    action.on("cursor-update", drawPolyArea);
        					    action.on("vertex-remove", drawPolyArea);
        					    action.on("draw-complete", function (evt) {
        					    	drawPolyArea(evt,true);
        					    });
        					}
        					function drawPolyArea(evt,isComplete=false) {
        						var vertices = evt.vertices;
        						// remove existing graphic
        						view.graphics.removeAll();
        						// 新建一个多边形createPolygon
        						var polygon = createPolygon(vertices);
        						// create a new graphic representing the polygon, add it to the view
        						var graphic = createPolygonGraphic(polygon);
        						if(isComplete){
        			    	    	document.body.style.cursor="default";
        			    	    	MeasurementLayer.add(graphic);
        			    	    }else{
        			    	    	view.graphics.add(graphic);
        			    	    }
        						// 计算多边形的面积
        						var area = geometryEngine.geodesicArea(polygon, areaUnitVal);
        						if(area < 0) {
        							// 如果需要，简化多边形，再计算面积。
        							var simplifiedPolygon = geometryEngine.simplify(polygon);
        							if(simplifiedPolygon) {
        								area = geometryEngine.geodesicArea(simplifiedPolygon, areaUnitVal);
        							}
        						}

        						if (areaUnitVal=="acres"){
        							area*=6.07;	
        						}
        						var fixed=3;
        						if(areaUnitVal=='square-meters'){
        							fixed=0;
        						}
        						// 开始显示多边形的面积
        						labelAreas(polygon, area, isComplete,fixed); 
        					}
        					//距离标签
        					function labelAreas(geom, area,isComplete,fixed) {
        						var graphic = new Graphic({
        							geometry: geom.centroid,
        							symbol: {
        								type: "text",
        								color: "white",
        								/*保留的小数位*/
        								text: area.toFixed(fixed) + areaUnitName,
        								xoffset: 0,
        								yoffset: 0,
        								font: { // 自动字体
        									size: 16,
        									family: "宋体"
        								}
        							}
        						});
        						if(isComplete){
        			    	    	MeasurementLayer.add(graphic);
        			    	    }else{
        			    	    	view.graphics.add(graphic);
        			    	    }
        					}
        					
        					
        					function drawPolygon(evt) {
        						 var vertices = evt.vertices;
        					     //remove existing graphic
        					     view.graphics.removeAll();
        					     // create a new polygon
        					     var polygon = createPolygon(vertices);
        					     // create a new graphic representing the polygon, add it to the view
        					     var graphic = createPolygonGraphic(polygon);
        					     view.graphics.add(graphic);
        					  }

        					  // create a polygon using the provided vertices
        					  function createPolygon(vertices) {
        					    return new Polygon({
        					      rings: vertices,
        					      spatialReference: view.spatialReference
        					    });
        					  }

        					  // create a new graphic representing the polygon that is being drawn on the view
        					  function createPolygonGraphic(polygon) {
        						  var graphic = new Graphic({
        						      geometry: polygon,
        						      symbol: {
        						        type: "simple-fill", // autocasts as SimpleFillSymbol
        						        color: [255, 0, 0, 0.3],
        						        style: "solid",
        						        outline: { // autocasts as SimpleLineSymbol
        						          color: [255, 255, 0],
        						          width: 2
        						        }
        					      	}
        					    });
        					    return graphic;
        					  }
				});

		});

function mapExport(){
	
	viewWidth = $(window).width();
	$("#viewDiv").width(viewWidth);
	viewHeight = $(window).height();
	$("#viewDiv").height(viewHeight);
	$("#panExport").css("display","none");
	window.print();
	$("#panExport").css("display","block");
	$("#viewDiv").height("100%");
	$("#viewDiv").width("100%");
}
function setAreaVal(areaUnitVal,text){
	if(areaUnitVal == "acres"){
		text = text.substring(0,text.length-5);
		text = text.replace(/,/g, "");
		text*=15;	
	$("#areaval").html(text.toFixed(2) +" 亩");
	}
	if(areaUnitVal == "hectares"){
		text = text.substring(0,text.length-2);
		$("#areaval").html(text +" 公顷");
	}
	if(areaUnitVal == "square"){
		text = text.substring(0,text.length-2);
		$("#areaval").html(text +" 平方米");
	}
}
function uploadExcel(data){
	require(["esri/symbols/PictureMarkerSymbol","esri/Graphic"], function(PictureMarkerSymbol,Graphic) { 
		view.graphics.removeAll();
		var message='';
		for(var i=0;i<data.length;i++){
			var regX = new RegExp(/^\d{8}(\.[\d]+)?$/);
			var regY = new RegExp(/^\d{7}(\.[\d]+)?$/);
			var xy=data[i];
			var xStr = xy.split(',')[0];
			if(!regX.test(xStr)){
				message+=(i+2)+":X错误  ";
			}
			var x=parseFloat(xStr);
			var yStr = xy.split(',')[1];
			if(!regY.test(yStr)){
				message+=(i+2)+":Y错误  ";
			}
			if(regX.test(xStr)&&regY.test(yStr)){
				var y=parseFloat(yStr);
			    var firstProjection ='+proj=tmerc +lat_0=0 +lon_0=105 +k=1 +x_0=35500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +towgs84=-100.0,-60,-6,0,0,0,0 +no_defs';
			    var secondProjection = "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees";
			    var mm = proj4(firstProjection,secondProjection,[x,y]);
				var point = {
					type: "point", // autocasts as new Point()
					longitude: mm[0],
					latitude: mm[1]
				};
				var markerSymbol = new PictureMarkerSymbol({
					url:"/ResourceMonitor/images/mark/32/person_red.png",
					width:23,
					height:23,
					xoffset:0,
					yoffset:0
				});
				// Create a graphic and add the geometry and symbol to it
				var pointGraphic = new Graphic({
					geometry: point,
					symbol: markerSymbol
				}); 
				view.graphics.add(pointGraphic);
			}
		}
		layer.closeAll();
		if(message!=''){
			layer.alert(message);
		}
	});
}

function VRTable(){
	var name = $("#VRname").val();
	 layui.use('table',function() {
			thisTable = layui.table;
			// 第一个实例
			thisTable.render({
					id : 'layTable',
					elem : '#jqgridVR',
					height : '390px',
					// limit : 30,
					// limits : [ 30, 60, 90 ],
					url : '/ResourceMonitor/OperationLog/photoList' // 数据接口
					,
					method : 'post' // 如果无需自定义HTTP类型，可不加该参数
					,
					skin: 'line', 
				  	//page: {
				  	//	layout:['prev', 'page', 'next']			  		
				  	//},
				  	page:false,
					where : {
						name : name
					},
					response : {
						statusName : 'status' // 规定数据状态的字段名称，默认：code
						,statusCode : 200 // 规定成功的状态码，默认：0
						,msgName : 'msg' // 规定状态信息的字段名称，默认：msg
						,countName : 'records' // 规定数据总数的字段名称，默认：count
						,dataName : 'rows' // 规定数据列表的字段名称，默认：data
					},
					cols : [ [ // 表头
						{
							type : 'numbers',
							width : '20%'
						},
						{
							field : 'id',
							title : 'ID',
							width : '20%',
							hide : true,
						},
						{
							field : 'photoGroup',
							title : '名称',
							align : 'center',
							width : '55%'
						},
						{
							field : 'info',
							hide : true
						},
						{
							field : 'photo',
							hide : true,
						},
						{
							field : 'latitude',
							title : '纬度',
							hide : true,
							width : '30%'
						},
						{
							field : 'longitude',
							title : '经度',
							hide : true,
							width : '30%'
						},
						{
							field : 'title',
							title : '定位',
							width : '25%',
							align : 'center',
							templet : function(d) {
								return '<img src="'
										+ projectName
										+ '/images/indexpage/dingwei.png" onclick="positionVR('
										+ "'"
										+ d.longitude
										+ "'"
										+ ","
										+ "'"
										+ d.latitude
										+ "'"
										+ ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;"/>'
							}
						} ] ],						
						done : function(res, curr, count) {
							$('.layui-table-header th').css('display', 'none');
							$('.layui-table-cell').css('padding','0px');
							$('.layui-table-view').css('margin','0px');
							$('[id^="layui-table-page"]').css('text-align', 'center');
							var dataObj = eval(res.rows);
	                           // 标记人员点位
							markVR(dataObj);
						}				
					});
				});
}
/*--------------------------属性查图中的选点方法start-----------------------*/	
/*控制分、秒输入可用性*/
/*控制十进制度到度的整数转换*/
function onCoorTypeChanged(){
	var locationType=$("#locationType").val();
	var xLabel,yLabel;
	var angle80 = '';
	var locateImage='';
	if(locationType=="optionDMS"){
		xLabel='经度';
		yLabel='纬度';
		locateImage='<td  rowspan="2">'
    	+'<img src="/ResourceMonitor/images/indexpage/dingwei.png" onclick="eventLocator()"' 
    	+'style="vertical-align:middle;width:16px;height:19px;margin-left:0px;"/></td>';
	}else if(locationType=="optionDegree"){
		xLabel='经度';
		yLabel='纬度';
		angle80='°';
		locateImage='<td  rowspan="2">'
	    	+'<img src="/ResourceMonitor/images/indexpage/dingwei.png" onclick="eventLocator()"' 
	    	+'style="vertical-align:middle;width:16px;height:19px;margin-left:0px;"/></td>';
	}else{
		xLabel='X(加带号)';
		yLabel='Y';
		locateImage='<td  rowspan="2"></td>';
	}
	var longtHtmlAble=
		'<td style="text-align:right"><label style="margin-right:5px;font-weight:normal">'+xLabel+'</label></td>'
		+'<td style="width:80px;"><input type="text" id="longtD" maxlength="3"' 
		+'	style="width:60px;height:25px" onchange="longtDegValidate()">&nbsp;°</td>'
		+'<td style="width:80px;"><input type="text" id="longtM" maxlength="2"' 
		+'	style="width:60px;height:25px" onchange=longtMValidate()>&nbsp;′</td>'
		+'<td style="width:80px;"><input type="text" id="longtS" maxlength="4"' 
		+'	style="width:60px;height:25px" onchange="longtSValidate()">&nbsp;″</td>'+locateImage;			
	
	var latHtmlAble=	
		'<td style="text-align:right"><label style="margin-right:5px;font-weight:normal">'+yLabel+'</label></td>'
		+'<td><input type="text" id="latD" maxlength="2"' 
		+'	style="width:60px;height:25px" onchange="latDegValidate()">&nbsp;°</td>'
		+'<td><input type="text" id="latM" maxlength="2"' 
		+'	style="width:60px;height:25px" onchange="latMValidate()">&nbsp;′</td>'
		+'<td><input type="text" id="latS" maxlength="4"' 
		+'	style="width:60px;height:25px" onchange="latSValidate()">&nbsp;″</td>';	 
	var longtHtmlEnable=
		'<td style="text-align:right"><label style="margin-right:5px;font-weight:normal">'+xLabel+'</label></td>'
		+'<td colspan="3"><input type="text" id="longtD" maxlength="3"' 
		+'	style="width:220px;height:25px" onchange="longtDegValidate()">&nbsp;'+angle80+'</td>'+locateImage;			
	var latHtmlEnable=	
		'<td style="text-align:right"><label style="margin-right:5px;font-weight:normal">'+yLabel+'</label></td>'
		+'<td colspan="3"><input type="text" id="latD" maxlength="2"' 
		+'	style="width:220px;height:25px" onchange="latDegValidate()">&nbsp;'+angle80+'</td>';	
	if(locationType=="optionDMS"){	
		$("#screen_point").attr("disabled",false);	
		$("#openEventChoice").attr("disabled",false);
		$("#longtTR").html(longtHtmlAble);
		$("#latTR").html( latHtmlAble);
		var longtD=document.getElementById("longtD");
		var latD=document.getElementById("latD");
		longtD.maxLength=3;
		latD.maxLength=3;
		var lontDval=parseInt(document.getElementById("longtD").value);
		if(isNaN(lontDval)===false)
			document.getElementById("longtD").value=lontDval;
		else
			document.getElementById("longtD").value='';				
		var latDval=parseInt(document.getElementById("latD").value);
		if(isNaN(latDval)===false)
			document.getElementById("latD").value=latDval;
		else
			document.getElementById("latD").value='';				
	}else if(locationType=="optionDegree"){
		$("#screen_point").attr("disabled",false);
		$("#openEventChoice").attr("disabled",false);
		$("#longtTR").html(longtHtmlEnable);
		$("#latTR").html(latHtmlEnable);
		var longtD=document.getElementById("longtD");
		var latD=document.getElementById("latD");
		longtD.maxLength=10;
		latD.maxLength=10;			
		var lontDval=parseFloat(longtD.value);
		if(isNaN(lontDval)===false&&lontDval<180&&lontDval>50)
			document.getElementById("longtD").value=lontDval;
		else
			document.getElementById("longtD").value='';
		
		var latDval=parseFloat(latD.value);
		if(isNaN(latDval)===false&&latDval>3&&latDval<60)
			document.getElementById("latD").value=latDval;
		else
			document.getElementById("latD").value='';				
	}else{
		$("#screen_point").attr("disabled",true);
		$("#screen_point").attr("checked",false);
		$("#openEventChoice").attr("disabled",true);
		closeEventChoice();
		$("#longtTR").html(longtHtmlEnable);
		$("#latTR").html(latHtmlEnable);
		var longtD=document.getElementById("longtD");
		var latD=document.getElementById("latD");
		longtD.maxLength=8;
		latD.maxLength=7;
		var lontDval=parseFloat(longtD.value);
		if(isNaN(lontDval)===false&&lontDval>1000000&&lontDval<99999999)
			document.getElementById("longtD").value=lontDval;
		else
			document.getElementById("longtD").value='';
		
		var latDval=parseFloat(latD.value);
		if(isNaN(latDval)===false&&latDval>1000000&&latDval<9999999)
			document.getElementById("latD").value=latDval;
		else
			document.getElementById("latD").value='';				
	}
}



/*经度输入验证*/
//-度
function longtDegValidate(){
	var locationType=$("#locationType").val();
	
	if(locationType=="optionDMS"){
		var lontDval=parseInt(document.getElementById("longtD").value);
		if(isNaN(lontDval)===true || lontDval>135 ||lontDval<73){
			document.getElementById("longtD").value="";
			$("#queryErrorSpan").html("请输入有效经度");
			return false;
		}
	}else if(locationType=="optionDegree"){
		var lontDval=parseFloat(document.getElementById("longtD").value);
		if(isNaN(lontDval)===true || lontDval>135 ||lontDval<73){
			document.getElementById("longtD").value="";
			$("#queryErrorSpan").html("请输入有效经度");
			return false;
		}else{
			document.getElementById("longtD").value=lontDval;
		}
	}else{
		var lontStr=document.getElementById("longtD").value;
		var lontDval=parseFloat(lontStr);
		if(isNaN(lontDval)){
			$("#queryErrorSpan").html("请输入有效X值");
			return false;
		}else{
			if(lontDval<1000000){
				$("#queryErrorSpan").html("X值需包含带号");
				return false;
			}
			else if(lontStr.substring(0,2)!=='20'&&lontStr.substring(0,2)!=='21'){
				$("#queryErrorSpan").html("X值带号错误");
				return false;
			}
		}	
	}
	return true;
}

//-分
function longtMValidate(){
	mmValidate("longtM");
}

//-秒
function longtSValidate(){
	ssValidate("longtS");
}

/*纬度输入验证*/
//-度
function latDegValidate(){
	var locationType=$("#locationType").val();
	if(locationType=="optionDMS"){
		var latDval=parseInt(document.getElementById("latD").value);
		if(isNaN(latDval)===true || latDval>54 ||latDval<3){
			document.getElementById("latD").value="";
			//document.getElementById("latD").setAttribute("placeholder","请输入有效值");
			$("#queryErrorSpan").html("请输入有效纬度");
			return false;
		}
	}else if(locationType=="optionDegree"){
		var latDval=parseFloat(document.getElementById("latD").value);
		if(isNaN(latDval)===true || latDval>54 ||latDval<3){
			document.getElementById("latD").value="";
			$("#queryErrorSpan").html("请输入有效纬度");
			return false;
		}else{
			document.getElementById("latD").value=latDval;
		}
	}else{
		var latDval=parseFloat(document.getElementById("latD").value);
		if(isNaN(latDval)||latDval<1000000){
			$("#queryErrorSpan").html("请输入有效Y值");
			return false;
		}
	}
	return true;
}

//-分
function latMValidate(){
	mmValidate("latM");
}

//-秒
function latSValidate(){
	ssValidate("latS");
}

//经纬度分验证
function mmValidate(inputId){
	var strVal = document.getElementById(inputId).value;
	if(strVal==""){
		strVal="0";
	}
	var val=parseInt(strVal);
	if(isNaN(val)===true || val>60 ||val<0){
		document.getElementById(inputId).value="";
		return false;
	}else{
		document.getElementById(inputId).value=val;
		return true;
	}
}
//经纬度秒验证
function ssValidate(inputId){
	var strVal=document.getElementById(inputId).value;
	if(strVal==""){
		strVal="0";
	}
	var val=parseFloat(strVal);
	var accure;
	if(strVal.indexOf('.')==-1){
		accure=0;
	}else{
	 	accure=strVal.length-strVal.indexOf('.')-1;
	}
	if(isNaN(val)===true || val>60 ||val<0||accure>1){
		document.getElementById(inputId).value="";
		return false;
	}else{
		document.getElementById(inputId).value=val;
		return true;
	}
}		
//缓冲半径输入验证
function bufferRadiusValidate(){
	var regu=new RegExp("^[0-9]+$");
	var val=document.getElementById("bufferRadius").value;
	if(val===""){
		$("#queryErrorSpan").html("请输入半径");
		return false;
	}else if(!regu.test(val)){
		document.getElementById("bufferRadius").value="";
		$("#queryErrorSpan").html("请输入有效半径");
		return false;
	}else{
		document.getElementById("bufferRadius").value=parseInt(val);
		return true;
	}
}
function paramsValidate(){
	if(!locateValidate()){
		return false;
	}
	if (!bufferRadiusValidate()){
		return false;
	}
	return true;
}
//--------------------------------------------------------------------------------
   function eventLocator() {
	if(!locateValidate()){
		return;
	}
   	var longtD=0;
   	var latD=0;
	var locationType=$("#locationType").val();
	if(locationType=="optionDMS"){
		longtD=parseFloat($("#longtD").val());
		latD=parseFloat($("#latD").val());
		var longtM=$("#longtM").val();
		var longtS=$("#longtS").val();
		var latM=$("#latM").val();
		var latS=$("#latS").val();
		if(longtM !==null&&longtM !=="")
			longtD+=parseFloat(longtM)/60;
		if(longtS !==null&&longtS !=="")
			longtD+=parseFloat(longtS)/3600;
		longtD=longtD.toFixed(6);

		if(latM !==null&&latM !=="")
			latD+=parseFloat(latM)/60;
		if(latS !==null&&latS !=="")
			latD+=parseFloat(latS)/3600;
		latD=latD.toFixed(6);
	}else{
		longtD=parseFloat($("#longtD").val());
		latD=parseFloat($("#latD").val());
	}
	analysis.funEventLocator({lon:longtD,lat:latD});
   }
function locateValidate(){
	var locationType=$("#locationType").val();
	if(!longtDegValidate()){
		return false;
	}	
	if(locationType=="optionDMS"){
		if(!mmValidate("longtM")){
			return false;
		}
		if(!ssValidate("longtS")){
			return false;
		}
	}			
	if(!latDegValidate()){
		return false;
	}
	if(locationType=="optionDMS"){
		if(!mmValidate("latM")){
			return false;
		}
		if(!ssValidate("latS")){
			return false;
		}	
	}			
	return true;
}
/*--------------------------属性查图中的事件列表加载start-----------------------*/
function loadGrid(){ 
	var cookie_department = localStorage.getItem('cookie_department');
	cookie_department = cookie_department.substring(0,
			cookie_department.length - 1);
	// 每个单位id-名称
	var eachDepart = cookie_department.split("&");
	// 遍历
	$("#departmentNameSelect").html("");
	for (var i = 0; i < eachDepart.length; i++) {
		var eachDep = eachDepart[i].split("-");
		// 添加选项 department为select的id
		$("#departmentNameSelect").append("<option value='" + eachDep[0] + "'>" + eachDep[1]+ "<oprion>")
	}
  	layui.use(['laydate','table','util'], function(){
	  var laydate = layui.laydate;
	  var util = layui.util;
	  var table = layui.table;
	  //日期时间范围
	  laydate.render({
	    elem: '#intelQuerytime'
	    ,range: true
	    ,format: 'yyyy-M-d'
	  });
	  var threeAgo = moment().subtract(3,'days').format("YYYY-M-DD");
	  var now=moment().format("YYYY-M-DD");
	  $("#intelQuerytime").val(threeAgo+" - "+now);
	  var closData =  [[
	      ,{field:'departmentName',title: '部门',align:'center'}
	      ,{field:'reportPeople',title: '人员',align:'center'}
	      ,{field:'eventText',title: '事件描述',align:'center'}
	      ,{field:'id',hide: true}
      ]];
	  table.render({
	    elem: '#eventTable'
	    ,url:'/ResourceMonitor/event/queryEvent'
	    ,cols:closData
	  	,id: 'tableId'
	  	,page: true
	  	,height: '330px'
		,page : true // 开启分页
		,method : 'post' // 如果无需自定义HTTP类型，可不加该参数
		,request : {
			pageName : 'page' // 页码的参数名称，默认：page
			,limitName : 'rows' // 每页数据量的参数名，默认：limit

		},
		response : {
			statusName : 'status' // 规定数据状态的字段名称，默认：code
			,statusCode : 200 // 规定成功的状态码，默认：0
			,msgName : 'msg' // 规定状态信息的字段名称，默认：msg
			,countName : 'records' // 规定数据总数的字段名称，默认：count
			,dataName : 'rows' // 规定数据列表的字段名称，默认：data
		},
		where : {
			department : '全部',
			startTime : $("#intelQuerytime").val().split(" - ")[0],
			personName :'',
			endTime : $("#intelQuerytime").val().split(" - ")[1],
			readState : '',
			projectType :''
		},
	  	done:function(){
	  		$('.layui-table-header th').css('display', 'none');
	  	}
	  });
	  //监听行单击事件
	  table.on('row(eventFilter)', function(obj){
	    var data = obj.data;
		locateTo(data.id);
	  });
	   function locateTo(rowId) {
	    	$.ajax({
	    		url : '/ResourceMonitor/event/findEventCoor', 
	    		dataType : "json", // 返回格式为json
	    		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
	    		data : {
	    			id : rowId,
	    		}, // 参数值
	    		type : "POST", // 请求方式
	    		beforeSend : function() {
	    		},
	    		success : function(req) {
	   			   var longitude = req.rows[0].longitude; 
	   			   var latitude =  req.rows[0].latitude;
	   			   //
	   			   analysis.funSetEventLocation(longitude,latitude);
	    		},
	    		complete : function() {
	    			// 请求完成的处理
	    		},
	    		error : function() {
	    			// 请求出错处理
	    		}
	    	});
	    }
	  	$("#findPatrolEvents").off().on("click",function(){
			var department = $("#department").val();
			if(department == "0"){
				department = "全部";
			}
			var personName = $("#personName").val();
			var startTime = $("#intelQuerytime").val().split(" - ")[0];
			var endTime = $("#intelQuerytime").val().split(" - ")[1];
			var readState = '';
			var projectType = '';
		      table.reload('tableId', {
		        page: {
		          curr: 1 
		        }
		        ,where: {
					department : department,
					personName : personName,
					startTime : startTime,
					endTime : endTime,
					readState : readState,
					projectType : projectType
		        }
		      });
		  });
  	});
}
/*--------------------------属性查图中的事件列表加载end-----------------------*/
/*--------------------------视频直播和回放start-----------------------*/
function addPosition(lon,lat,isGoTo){
	require(["esri/geometry/Point","esri/Graphic"], function(Point,Graphic) {
		var pt = new Point(lon,lat);
	   	var symbol = {
	           type: "point-3d", 
	           symbolLayers: [{
	             type: "icon", 
	             size:24,
	             resource: { href:"/ResourceMonitor/images/airplane.png" }           
	           }
	           ],             
	        };
		var graphic = new Graphic();
	 	graphic.geometry=pt;
	 	graphic.symbol=symbol;
		positionLayer.removeAll();
		positionLayer.add(graphic);
		if(isGoTo==1){
	        view.goTo({
	   	  		center: [lon,lat],
	   	  		zoom: 18
	       	});
		}
	});
}
function addTrail(paths,isGoTo){
	require(["esri/Graphic"], function(Graphic) {
	 	  var polyline = {
			  type: "polyline", 
	      	  paths: paths
		  };
	   	  var polylineSymbol = {//轨迹绘制符号
				type: "simple-line",  
				color: [226, 119, 40],
				width: 4
		  };
	  	  var polylineGraphic = new Graphic({
		     geometry: polyline,   
		     symbol: polylineSymbol,   
		  });
		  trailLayer.add(polylineGraphic); 
		  if(isGoTo==1){
			  view.goTo(polylineGraphic);  
		  }
	})
}
/*--------------------------视频直播和回放end-----------------------*/
/* wkt转换为Polygon */
function WktToPolygon(wkt, spatialreference){
   var wktUtil = new WKTUtil();
   var points = wktUtil.read(wkt); 
   var json = {
           hasZ: false,
           hasM: false,
           rings: points,
           spatialReference: spatialreference
    }
   var polygon;
    require([ "esri/geometry/Polygon" ], function(Polygon) {    
        polygon = new Polygon(json);
    }); 
    return polygon;
}
</script>
<script type="text/html" id="goRecord">
	<span class="icon-play" lay-event="record" style="font-size:20px;line-height:28px;"></span>
</script>
<script type="text/html" id="flightModelStop">
	<img style="margin-top:5px;" title="停止" lay-event="stop" src="/ResourceMonitor/images/mark/32/stop.png">
</script>
<script type="text/html" id="flightModelDelete">
	<img style="margin-top:5px;" lay-event="delete" src="/ResourceMonitor/images/indexpage/delete.png">
</script>
<script type="text/html" id="flightModelEdit">
	<img style="margin-top:5px;" lay-event="edit" src="/ResourceMonitor/images/indexpage/edit.png">
</script>
<script type="text/html" id="flightModelDetail">
	<img style="margin-top:5px;width:16px;height:16px;" lay-event="detail" src="/ResourceMonitor/images/indexpage/details.png">
</script>
<script type="text/javascript" src="/ResourceMonitor/js/myJS/commandForFire/BaseStationMap/shishijiankong.js"></script>
<script type="text/javascript" src="/ResourceMonitor/js/myJS/commandForFire/BaseStationMap/xunhushijian.js"></script>
<script type="text/javascript" src="/ResourceMonitor/js/myJS/commandForFire/BaseStationMap/positionTo.js"></script>
<script type="text/javascript" src="/ResourceMonitor/js/myJS/commandForFire/BaseStationMap/export.js"></script>
</html>