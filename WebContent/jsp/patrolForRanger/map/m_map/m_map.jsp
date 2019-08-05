<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<html>
<head>
<meta name="viewport"
	content="initial-scale=1,maximum-scale=1,user-scalable=no;charset=UTF-8">
<title>护林员责任片区示意图</title>

<style>
#switchImg:hover {
	background-color: #D3D3D3;
}

#switchImg {
	opacity: 0.8;
}

.layui-layer-title {
	font-size: 15px;
	font-weight: 700;
}

html, body, #baseViewDiv {
	padding: 0;
	margin: 0;
	height: 100%;
	width: 100%;
	overflow: hidden; 
}

#topbar_initMap, #topbar_disCal, #topbar_areaCal, #topbar_refreash {
	background: #fff;
	padding: 0px;
}

.action-button, .nomore-button {
	font-size: 16px;
	background-color: #FFFFFF;
	border: 1px solid #D3D3D3;
	color: #6e6e6e;
	height: 32px;
	width: 32px;
	text-align: center;
	box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}

.action-button:hover, .action-button:focus {
	background: #0079c1;
	color: #e4e4e4;
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
.active {
	background: #0079c1;
	color: #e4e4e4;
}
#hiddenDiv div{
	margin-bottom: 6px;
}
#baseViewDiv .esri-compass{
	border-radius: 0;
	border: 1px solid #D3D3D3;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
#baseViewDiv .esri-zoom{
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
#baseViewDiv .esri-ui-top-right .esri-expand{	
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
#body .layui-layer-btn .layui-layer-btn0{border-color:#058563;background-color:#058563;color:#fff}
#PositionInfo {
	display: inline;
	bottom: 5px;
	color: white;
	margin-left:0px;
	box-shadow: none;
}
.esri-ui .esri-ui-top-left{
	 flex-flow: row; 
}
.esri-ui .esri-ui-top-left .esri-component{
	margin-bottom: 0;
	margin-right: 10px;
	flex-flow: initial; 
}
.esri-zoom .esri-widget--button:last-child {
   border-top: 0
}
 #body .form-control {
	height: 22px;
	font-size: 14px;
	padding:0 0 1px 5px;
    margin-bottom: 3px;
	width:178px;
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
#body .layui-colorpicker-trigger-span {
    height: 16px;
    width: 175px;
    margin-top: 5px;
    display:block;
}
#body .layui-colorpicker-trigger-i{
	display:none;
}
.layui-input-block {
    margin-left: 50px;
    min-height: auto;
}
.layui-form-radio i{
    color: #484545;
}
#body .esri-zoom .esri-widget--button:last-child,#body .esri-navigation-toggle__button--rotate {
    border-top: 0;
}
</style>
<link rel="stylesheet"
	href="/ResourceMonitor/js/arcgis_js_api/library/4.10/esri/css/main.css">
<link rel="stylesheet" href="/ResourceMonitor/iconClass/style.css" />
<link rel="stylesheet" href="/ResourceMonitor/js/jquery-ui-1.9.2/css/cupertino/jquery-ui.css" />
<script type="text/javascript" src="/ResourceMonitor/js/jquery-ui-1.9.2/js/jquery-ui-1.9.2.custom.min.js"></script>	
<script src="/ResourceMonitor/js/proj4js-2.4.3/dists/proj4.js" type="text/javascript"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/myJS/coordTransfer.js"></script>
<script src="/ResourceMonitor/js/arcgis_js_api/library/4.10/init.js"></script>
</head>
<body id="body">
	<div id="baseViewDiv" style="position: absolute;">
		<span id ="northIcon" class="icon-northImg"></span>
		<div id="titleInfo">护林员责任片区示意图</div>
		<span id="scaleInfo"></span>
	</div>
	<div style="display: none;">
		<input type="text" id="eventID">
	</div>
	<div id="hiddenDiv" style="position: absolute;top: 131px;left: 15px;display:none">
		<!-- <div id="topbar_disCal">
			<button class="action-button esri-icon-polyline" id="distanceButton"
				type="button" title="长度量算"></button>
		</div>
		<div id="topbar_areaCal">
			<button class="action-button esri-icon-polygon" id="areaButton"
				type="button" title="面积量算"></button>
		</div> -->
		<!-- <div id="topbar_mianjichaxun">
			<button class="nomore-button esri-icon-search" id="mianjichaxun"
				type="button" title="责任片区面积查询"></button>
		</div> -->
		<div id="PositionInfo">
				<span>经度:</span><span id="longt" style="display:inline-block;width:100px;">----------</span> 
				<span style="padding-left:10px;display:inline-block;">纬度:</span><span id="lat" style="display:inline-block;width:90px;">----------</span>
				<span style="padding-left:10px;display:inline-block;">海拔:</span><span id="elevation" style="display:inline-block;width:25px;">----</span>
				<span style="padding-left:10px;display:inline-block;">坡度:</span><span id="slope" style="display:inline-block;width:20px;">--</span>
				<span style="padding-left:10px;display:inline-block;">坡向:</span><span id="aspect" style="display:inline-block;">-</span>
		</div>
	</div>
	<div id="initialExtent" class="esri-widget--button esri-widget esri-interactive" title="初始视图" style="display: none;padding-top: 6px;">
		<span class="icon-earth" style="font-size:20px;"></span>
	</div>
	<div id="xyLocation" class="esri-widget--button esri-widget esri-interactive" title="坐标定位" style="display: none;padding-top: 6px;">
		<span class="icon-location" style="font-size:20px;"></span>
	</div>
	<div id="draw-polyline" class="esri-widget--button esri-widget esri-interactive" title="距离量算" style="display: none;padding-top: 6px;">
		<span class="icon-length" id="length-tool" style="font-size:20px;"></span>
	</div>
	<div id="draw-polygon" class="esri-widget--button esri-widget esri-interactive" title="面积量算" style="display: none;padding-top: 6px;">
		<span class="icon-area" id="area-tool" style="font-size:20px;"></span>
	</div>
	<div id="identify" class="esri-widget--button esri-widget esri-interactive" title="图查属性" style="display: none;padding-top: 6px;">
		<span id="identify-tool" class="icon-identify2" style="font-size:20px;"></span>
	</div>
	<div id="refreshGraphics" class="esri-widget--button esri-widget esri-interactive" title="刷新地图" style="display: none;padding-top: 6px;">
			<span class="icon-refresh" style="font-size:20px;"></span>
	</div>
	<div id="mapExport"  class="esri-widget--button esri-widget esri-interactive"  title="地图输出" style="display: none;padding:6px;">
		<span class="icon-mapExport" style="font-size:20px;"></span>
	</div>
	<div id="hulin" class="esri-widget--button esri-widget esri-interactive" title="实时监控" style="position: absolute;top:60px;left:15px;background-color: #ffffff;display: flex;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);">
			<span id="iconHulin" class="icon-shiMonitor" style="font-size:20px;"></span>
	</div>
	<div id="guiji" class="esri-widget--button esri-widget esri-interactive" title="轨迹回放" style="position: absolute;top:100px;left:15px;background-color: #ffffff;display: flex;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);">
			<span id="iconGuiji" class="icon-guijiReplay" style="font-size:20px;"></span>
	</div>
	<div id="panelhulin" style="position: absolute;top:60px;left:60px;width:274px;background: rgba(255,255,255,.7);display:none;" >
		<div style="background-color: #ffffff;display: flex;border-bottom: solid 1px #b9b9b9;">
			<div style="width: 242px;height:32px;padding-left:10px;line-height:32px;font-weight: 700;">实时监控</div>
			<div id="Infohulin" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;" title="收起">
				<span class="esri-icon-expand"></span>
			</div>
		</div>
		<div class="" style="padding: 0; height: 93%; border: solid #058563 0px;">
			<iframe name="hulinFrame" id="hulinFrame" style="height: 100%; width: 100%;border:0" src=""></iframe>
		</div>
	</div>
	<div id="panelGuiji" style="position: absolute;top:60px;left:60px;width:274px;background: rgba(255,255,255,.7);display:none;" >
		<div style="background-color: #ffffff;display: flex;border-bottom: solid 1px #b9b9b9;">
			<div style="width: 242px;height:32px;padding-left:10px;line-height:32px;font-weight: 700;">轨迹回放</div>
			<div id="InfoGuiji" class="esri-widget--button esri-widget esri-interactive" style="box-shadow: inherit;" title="收起">
				<span class="esri-icon-expand"></span>
			</div>
		</div>
		<div class="" style="padding: 0; height: 93%; border: solid #058563 0px;">
			<div style="display: flex;margin: 5px 0 5px 10px;">
				<label for="department2">管护单位</label>
    			<select id="department2" class="form-control"></select>
    			<select id="projectType2" style="display:none"><option>全部</option></select> 
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
			<div id="gridCond" style="margin:5px;margin-top:0px;border-collapse: inherit;background-color: #fff;">
				 <table style="width: 100%;">
					<thead>
						<tr style="width: 100%; height: 38px; background-color: #E6E6E6;">
							<th style="width: 20%; text-align: center; color: #058563;">姓名</th>
							<th style="width: 50%; text-align: center; color: #058563;">起止时间</th>
							<th style="width: 14%; text-align: center; color: #058563;">里程</th>
							<th style="width: 14%; text-align: center; color: #058563;">回放</th>
							<th style="width: 2%; text-align: center; color: #058563;"></th>
						</tr>
					</thead>
				</table>
				<table id="jqgrid2"></table>
			</div>
		</div>
	</div>
	<!-- 地图输出方法 -->
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
      					<input type="text" id="titleContent" value="护林员责任片区示意图" class="form-control" style="width: 240px;margin:0">
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
			</form>
								
  			<button type="button" class="btn btn-default" onclick="mapExport()" style="width:250px;height:25px;color:#fff;background-color:#058563;margin-top:15px;" id="export">导出</button>
		</div>
	</div>
	<script type="text/javascript">
		var layer;
		var lineareaIndex=-1;
		var xyLocationIndex = -1;
		var step = 0;// 轨迹回放参数
		var trackCount = 0;// 轨迹回放参数
		layui.use('layer', function(){
		    layer = layui.layer;
		});
		var appVersion = navigator.appVersion.toLowerCase();

		// 坐标定位方法
		$("#mianjichaxun").click(function() {
			layui.use('layer', function(){
		        layer = layui.layer;
		        layer.open({
					title : "面积查询",
					type : 2,
					resize : false,
					area : [ '325px', '255px' ],
					content : '/ResourceMonitor/jsp/patrolForRanger/map/layers/areaQuery.jsp',
					btn : [ '确定', '取消' ],
					yes : function(index, layero) {
						var body = layer.getChildFrame('body', index);
						var departmentVal = body.find('#department');
						var departmentVal = body.find('#department');
						
					},
					btn2 : function(index, layero) {
						// do something
						layer.close(index); // 如果设定了yes回调，需进行手工关闭
					},
				});
		    });
		});
		
		 $("#mapExport").off("click").on("click",function(){
			 	layer.close(lineareaIndex);
			 	layer.close(xyLocationIndex);
			 	draw.reset();
			 	$("#area-tool").css("color","#6e6e6e");
         	   	$("#draw-polygon").css("background","");
         	   	$("#length-tool").css("color","#6e6e6e");
             	$("#draw-polyline").css("background","");
				//view.graphics.removeAll();
				$("#northIcon").css("visibility","visible");
		    	$("[id^='panel']").hide();
		    	getIcon("iconExport");
		    	$("#panExport").show("slow");
		    	$(".esri-widget").css("visibility","hidden");
	   		 	$("#PositionInfo").css("visibility","hidden");
	   		 	$("#analisisButtons").css("visibility","hidden");
	   		 	$("#titleInfo").css("visibility","visible");
		 	 	$("#scaleInfo").css("visibility","visible");
		 		$("#InfoExport").css("visibility","visible");
		 	 	$("#titleInfo").draggable();
	         	$("#scaleInfo").draggable();
	         	$("#titleInfo").css("color","#000");
	         	$("#titleInfo").css("font-size","20px");
	         	$("#scaleInfo").css("color","#000");
	         	$("#scaleInfo").css("font-size","20px");
	         	layui.use('colorpicker', function(){
	         		  var colorpicker = layui.colorpicker;
	         		  //渲染
	         		  colorpicker.render({
	         		    elem: '#colorpicker' 
	         		    ,color: '#000' //设置默认色//绑定元素
	         		    ,done: function(color){
	         		    		$("#titleInfo").css("color",color);
	         		    }
	         		  });
	         		 colorpicker.render({
		         		  elem: '#colorpicker2' 
		         		  ,color: '#000' //设置默认色//绑定元素
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
	    	  $("#northIcon").css("visibility","hidden");
			  $("#panExport").hide("slow");
			  $(".esri-widget").css("visibility","visible");
	   		  $("#PositionInfo").css("visibility","visible");
	   		  $("#analisisButtons").css("visibility","visible");
	   		  $("#titleInfo").css("visibility","hidden");
		 	  $("#scaleInfo").css("visibility","hidden");
		 });
		 
		 function mapExport(){
			 viewWidth = $(window).width();
			 $("#baseViewDiv").width(viewWidth);
		     viewHeight = $(window).height();
			 $("#baseViewDiv").height(viewHeight);
			 $("#panExport").css("display","none");
			 window.print();
			 $("#panExport").css("display","block");
			 $("#baseViewDiv").height("100%");
			 $("#baseViewDiv").width("100%");
		}
		$(document).ready(function() {
			
			// 获取路径
			var curWwwPath = window.document.location.href;
			var pathname = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathname);
			localhostPath = curWwwPath.substring(0, pos);
			// 获取项目名
			projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
			//debugger;
			
			var aheight = $(window).height() - 100;
			if(aheight < 600){
				$("[id^='panel']").height(aheight);
			}else{
				$("[id^='panel']").height(600);
			}
			 $(window).resize(function () {
				 var aheight = $(window).height() - 100;
					if(aheight < 600){
						$("[id^='panel']").height(aheight);
					}else{
						$("[id^='panel']").height(600);
				    } 
			 });
			 
			 $("#hulin").off("click").on("click",function(){
				    locationLayer.removeAll();
				    view.graphics.removeAll();
				    trackLasyer.removeAll();
				    //控制轨迹回放结束
				    step = trackCount;
			    	var prevClassName = document.getElementById("iconHulin").className;
			    	$("[id^='panel']").hide();
			    	getIcon("iconHulin");
			    	if(prevClassName == "icon-shiMonitor"){
			    		$("#hulin").css("background-color","#058563");
			    		$("#iconHulin").attr("class","icon-shiMonitor2");
			    		$("#panelhulin").show("slow");
			    		setTimeout(function() {
			    			$("#hulinFrame").attr("src", "/ResourceMonitor/jsp/patrolForRanger/realtime/shishijiankong.jsp");
			    		},500);	
			    	}else{
			    		var childWindow = $("#hulinFrame")[0].contentWindow;
			    		childWindow.clearInterval(playBackTimer);
			    		$("#hulin").css("background-color","rgb(255, 255, 255)");
			    		$("#iconHulin").attr("class","icon-shiMonitor");
			    		$("#hulinFrame").attr("src", "");
			    	}
			    });
				$("#Infohulin").off("click").on("click",function(){
					var childWindow = $("#hulinFrame")[0].contentWindow;
		    		childWindow.clearInterval(playBackTimer);
					 locationLayer.removeAll();
					 view.graphics.removeAll();
					 trackLasyer.removeAll();
					 step = trackCount;
				     $("#panelhulin").hide("slow");
				     $("#iconHulin").attr("class","icon-shiMonitor");
				     $("#hulinFrame").attr("src", "");
				     $("#hulin").css("background-color","rgb(255, 255, 255)");
				 });
				
				$("#guiji").off("click").on("click",function(){
					locationLayer.removeAll();
					view.graphics.removeAll();
					trackLasyer.removeAll();
					step = trackCount;
			    	var prevClassName = document.getElementById("iconGuiji").className;
			    	$("[id^='panel']").hide();
			    	getIcon("iconGuiji");
			    	if(prevClassName == "icon-guijiReplay"){
			    		$("#guiji").css("background-color","#058563");
			    		$("#iconGuiji").attr("class","icon-guijiReplay2");
			    		$("#panelGuiji").show("slow");
			    		tableHeight2 = $(window).height() - 270;
			    		if(tableHeight2 > 430){
			    			tableHeight = 430;
			    		}
			    		// 初始化表单
			    		setTimeout(function() {
			    			pageInit2();
						},500);
			    	}else{
			    		$("#iconGuiji").attr("class","icon-guijiReplay");
			    		$("#guiji").css("background-color","rgb(255, 255, 255)");
			    	}
			    });
				$("#InfoGuiji").off("click").on("click",function(){
					 view.graphics.removeAll();
					 trackLasyer.removeAll();
					 step = trackCount;
				     $("#panelGuiji").hide("slow");
				     $("#iconGuiji").attr("class","icon-guijiReplay");
				     $("#guiji").css("background-color","rgb(255, 255, 255)");
				});	

		});
		function getIcon(iconId){
			if(iconId != "iconHulin"){
				$("#iconHulin").attr("class","icon-shiMonitor");
				$("#hulin").css("background-color","rgb(255, 255, 255)");
			}
			if(iconId != "iconGuiji"){
				$("#guiji").css("background-color","rgb(255, 255, 255)");
				$("#iconGuiji").attr("class","icon-guijiReplay");
			}
		}
		function getCookieValue(name) {
			var strCookie = document.cookie;
			var arrCookie = strCookie.split(";");
			for (var i = 0; i < arrCookie.length; i++) {
				var c = arrCookie[i].split("=");
				if (c[0].trim() == name) {
					return c[1] == '0' ? false : true;
				}
			}
			if (name === "xj" || name == "xjanno")
				return true;
			return false;
		}

		function openLayer(data) {
			layer.closeAll();
			var personInfo = layer.open({
				type : 2,
				shade : 0,
				title : [ "人员信息", 'font-size:15px;'],
				content : '/ResourceMonitor/jsp/patrolForRanger/map/layers/personInfo.jsp',
				id : 'personInfo',
				resize : false,
				anim : -1,
				area : [ '230px', '450px' ],
				offset : 'rb',
				isOutAnim : false,
				success : function(layero, index) {
					var body = layer.getChildFrame('body', index);
					//
					// 设置人员照片
					// 
					if (data.identifyPhoto.length > 0) {
						body.find('#identifyPhoto').attr("src",
								"/ResourceMonitor/IdentifyPhoto/" + data.identifyPhoto);
					}

					//
					// 翻译单位字段
					// 
					var cookie_department = localStorage.getItem('cookie_department');
					cookie_department = cookie_department.substring(0,
							cookie_department.length - 1);
					// 每个单位id-名称
					var eachDepart = cookie_department.split("&");

					for (var i = 0; i < eachDepart.length; i++) {
						var eachDep = eachDepart[i].split("-");

						if (data.departmentVal == eachDep[0]) {
							body.find('#department').html(eachDep[1]);
						}
					}

					body.find('#personName').html(data.personName);

					if (data.personSex == '1') {
						body.find('#personSex').html('男');
					} else {
						body.find('#personSex').html('女');
					}

					body.find('#mobile').html(data.mobile);
					body.find('#employDate').html(data.employDate);
					body.find('#longitude').html(data.longitude);
					body.find('#latitude').html(data.latitude);
					body.find('#xCoor').html(data.xCoor);
					body.find('#yCoor').html(data.yCoor);
				}
			});
		}
	</script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/js/myJS/patrolForRanger/map/m_map/baseMap.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/js/myJS/patrolForRanger/map/m_map/positionTo.js"></script>
	<!-- 轨迹回放 -->
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/js/myJS/patrolForRanger/map/m_map/replayTrack.js"></script>
	<!-- 轮询 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/myJS/patrolForRanger/map/m_map/polling.js"></script>
	<script type="text/javascript" src="/ResourceMonitor/js/myJS/patrolForRanger/realtime/guijihuifang.js"></script>
</body>
</html>