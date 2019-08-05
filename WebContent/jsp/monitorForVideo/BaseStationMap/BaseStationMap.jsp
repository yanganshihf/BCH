<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<html>
<head>
<meta name="viewport"
	content="initial-scale=1,maximum-scale=1,user-scalable=no;charset=UTF-8">
<title>护林员责任片区示意图</title>

<style>
html, body, #viewDiv {
	padding: 0;
	margin: 0;
	height: 100%;
	width: 100%;
}
.esri-ui .esri-ui-top-left{
	flex-flow: row;
}
.esri-ui .esri-ui-top-left .esri-component{
	margin-bottom: 0;
	margin-right: 10px;
	flex-flow: initial;
}
#panel .form-control {
	height: 22px;
	font-size: 14px;
	padding:0 0 1px 5px;
    margin-bottom: 3px;
	width:100px;
	margin-left: 10px;
}
#panel .btn-default {
	height: 22px;
	font-size: 14px;
	padding: 0 12px;
	margin-bottom: 3px;
	margin-left: 10px;
}
#panel label{
	font-size:14px;
	line-height: 22px;
	font-weight:normal;
	margin-bottom:0;
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
</style>
<link rel="stylesheet"
	href="/ResourceMonitor/js/arcgis_js_api/library/4.10/esri/css/main.css">
<link rel="stylesheet" href="/ResourceMonitor/iconClass/style.css" />
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/myJS/coordTransfer.js"></script>
<script src="/ResourceMonitor/js/proj4js-2.4.3/dists/proj4.js" type="text/javascript"></script>
<script src="/ResourceMonitor/js/arcgis_js_api/library/4.10/init.js"></script>
	
</head>
<body id="body">
	<div id="viewDiv" style="width: 100%; height: 100%;"></div>
	<div id="compassId" class="esri-widget--button esri-widget esri-interactive" title="恢复正北方向" style="display: none;padding-top: 4px;">
		<span class="icon-North" style="font-size:25px;"></span>
	</div>
	<div id="initialExtent" class="esri-widget--button esri-widget esri-interactive" title="初始视图" style="display: none;padding-top: 6px;">
		<span class="icon-earth" style="font-size:20px;"></span>
	</div>
<!-- 	<div id="viewSwitch" class="esri-widget--button esri-widget esri-interactive" title="视图转换" style="display: none;padding-top: 6px;">
		<span id="switch-btn" class="icon-switch2d" style="font-size:20px;"></span>
	</div> -->
	<div id="identify" class="esri-widget--button esri-widget esri-interactive" title="图查属性" style="display: none;padding-top: 6px;">
		<span id="identify-tool" class="icon-identify2" style="font-size:20px;"></span>
	</div>
	<div id="xyLocation" class="esri-widget--button esri-widget esri-interactive" title="坐标定位" style="display: none;padding-top: 6px;">
		<span class="icon-location" style="font-size:20px;"></span>
	</div>
	<div id="draw-polyline" class="esri-widget--button esri-widget esri-interactive" title="距离量算" style="display: none;padding-top: 6px;">
		<span class="icon-length" id="length-tool" style="font-size:20px;"></span>
	</div>
	<div id="refreshGraphics" class="esri-widget--button esri-widget esri-interactive" title="刷新地图" style="display: none;padding-top: 6px;">
		<span class="icon-refresh" style="font-size:20px;"></span>
	</div>
	<div id="toolShowDiv" style="position: absolute;top:60px;left:331px;display:none;background-color: #ffffff; width: 200px;"></div>
	<input type="hidden" id="xLocation" value="" />
	<input type="hidden" id="yLocation" value="" />
	<div id="InfoShowDiv" style="visibility:hidden;position: absolute;top:60px;left:15px;background-color: #ffffff;display: flex;">
		<div id="InfoTitle" style="width: 242px;height:32px;padding-left:10px;line-height:32px;font-weight: 700;/* border-right:1px solid #ccc; */">基站概览</div>
		<div id="InfoHide" class="esri-widget--button esri-widget esri-interactive" title="收起">
			<span id="InfoIcon" class="esri-icon-expand"></span>
		</div>
	</div>
	<div id="panel" style="visibility:hidden;position: absolute;top:92px;left:15px;width:274px;height:450px;background: rgba(255,255,255,.7);" >
		<div style="display: flex;margin: 10px 0 10px 25px;">
			<label for="deviceName">设备名称</label>
			<input id="deviceName" class="form-control" style="width:125px;"/>	
			<button type="button" class="btn btn-default" id="deviceSearch" title="查询">
				<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
			</button>
		</div>
		<div id="gridCond" style="border-collapse: inherit;height: 90%;background-color: #fff;">
			<table id="jqgrid"  lay-filter="filter"></table>
		</div>
	</div>
</body>
<script type="text/javascript">
//获取路径
var curWwwPath = window.document.location.href;
var pathname = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathname);
var localhostPath = curWwwPath.substring(0, pos);
// 获取项目名
var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
require(["esri/config","esri/core/urlUtils"], function(esriConfig,urlUtils) {
	   urlUtils.addProxyRule({
		   urlPrefix : "58.18.226.130:6080/arcgis/rest/services",
		   //proxyUrl : "http://60.205.206.180:8878/Java/proxy.jsp"
		   proxyUrl : "http://127.0.0.1:8878/Java/proxy.jsp"
	   });  	   
});  
var layer;
layui.use('layer', function(){
    layer = layui.layer;
});
var lineareaIndex=-1;
var xyLocationIndex=-1;
var is3D = false;
var vectorBasemap;
var imageBasemap;
var pxTileLayer,pdTileLayer;
var imageLayerArray=new Array();
var demLayer;
var demQueryLayer;
var baseGeoMapLayers;
var map, view,eErGuNaPolygon,handle;
var event3d_layer,locationLayer,highlightRouteLyr,signFlagLayer,dynamic_layers;
var symbol3dLayer,eventManageLayer,userPositionLayer,trackLasyer,eventLocationLayer,currentPositionLayer,patrolregion;
var funLocationGoto=null;
var funshowVideoDetail = function(data){
	var htmlStr ='<table class="layui-table" style="margin:0 0;text-align:center;width:300px;word-break:break-word"><tr>'  
		+ '<td style="width:100px;">相机名称</td><td>'+data['cameraName']
		+ '</td></tr><tr><td>相机类型</td><td>'+data['cameraTypeName']
		+ '</td></tr><tr><td>相机位置</td><td>'+data.longitude+','+data.latitude
		+ '</td></tr></table>';
	layer.open({
		type : 1,
		title : '详情',
		content : htmlStr,
		anim: -1,
		isOutAnim: false,
		scrollbar :false,
	});	
}
$(function() {
    // 加载地图
    scanMap(false);
/*     $("#viewSwitch").off("click").on("click",function(){
 	   is3D =$("#switch-btn").attr("class")=="icon-switch3d";
 	   scanMap(is3D);
    }); */
    /* 隐藏显示 */
    $("#InfoHide").off("click").on("click",function(){
    	var prevClassName = document.getElementById("InfoIcon").className;
    	$("#panel").toggle("slow");
    	$("#InfoTitle").toggle(550);
    	if(prevClassName == "esri-icon-collapse"){
    		document.getElementById("InfoIcon").className ="esri-icon-expand";
    		$("#InfoHide").attr("title","收起");
    	}else{
    		document.getElementById("InfoIcon").className ="esri-icon-collapse";
    		$("#InfoHide").attr("title","展开");
    	}
    });
    
    /* 基站数据biaoge */
    layui.use('table',function() {
		thisTable = layui.table;
		thisTable.render({
			id : 'layTable',
			elem : '#jqgrid',
			//height : 'full-50',
			url : localhostPath + projectName+ '/monitorVideo/queryCameras' // 数据接口
			,page : false // 开启分页
			,cols : [ [ // 表头
			{
				field : 'cameraName',
				title : '设备名称',
				width : '30%',
				align : 'center'
			},{
				field : 'title',
				title : '状态',
				width : '14%',
				templet : function(d) {
						return '<img src="'+ projectName+ 
						'/images/mark/16/Geye.png" lay-event="playVideo" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="状态"/>'
				},
				align : 'center'
			},{
				field : 'title',
				title : '详情',
				width : '14%',
				templet : function(d) {
						return '<img src="'+ projectName
								+ '/images/indexpage/details.png" lay-event="showVideoDetail" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="详情"/>'
				},
				align : 'center'
			},{
				title : '定位',
				width : '14%',
				templet : function(d) {
					return '<img src="'+ projectName+ '/images/indexpage/dingwei.png" lay-event="locationGoto" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="定位"/>'
				},
				align : 'center'
			},{
				field : 'title',
				title : '警报',
				width : '14%',
				align : 'center',
			}]],
			done : function(res, curr, count) {
 				$('.layui-table-header th').css('background-color', '#E6E6E6');
				$('.layui-table-header span').css('color', '#058563');
				$('.layui-table-header span').css('font-weight', '700');
				$('.layui-table-cell').css('padding','0px');
				$('.layui-table-view').css('margin','0px');
				$('[id^="layui-table-page"]').css('text-align', 'center');
				$(".layui-table-view .layui-table").css("width","100%");
			}
		});	
		thisTable.on('tool(filter)', function(obj){
			if(obj.event=="showVideoDetail"){
				//详情	
				var data=obj.data;
				funshowVideoDetail(data);
			}else if(obj.event=="locationGoto"){
				funLocationGoto(obj.data);
			//定位
			}else if(obj.event=="playVideo"){
			//播放
			}
/* 		 var data = obj.data;
		 var recordIndex = layer.open({
			type : 2,
			id:'recordLayer',
			title : '播放录像',
			area: ['100%', '100%'],
			content : '/ResourceMonitor/jsp/videoManager/flvPlayer.html'
		 });  */
	  });
		$('#deviceSearch').off().on('click',function(){
			thisTable.reload('layTable', {
				  where: {
					  name:$('#deviceName').val()
				  } 
			});	
		})

	});
});

//初始载入地图
function scanMap(is3D) {
	 require(
             [ "esri/Basemap", "esri/widgets/Search", "esri/Map", "esri/views/SceneView","esri/config", "esri/request","esri/widgets/Fullscreen",
                     "esri/widgets/BasemapGallery","esri/widgets/Expand", "esri/widgets/LayerList",
                     "esri/geometry/Point","esri/symbols/PictureMarkerSymbol","esri/symbols/PointSymbol3D","esri/layers/support/LabelClass",
                     "esri/Color", "esri/layers/TileLayer","esri/layers/support/TileInfo","esri/layers/WebTileLayer",
                     "esri/layers/ElevationLayer","esri/layers/BaseTileLayer","esri/layers/GraphicsLayer","esri/layers/MapImageLayer","esri/layers/FeatureLayer",
                     "esri/geometry/geometryEngine","esri/tasks/QueryTask", "esri/tasks/support/Query",
                     "esri/Graphic", "esri/geometry/Polygon","esri/geometry/Polyline","esri/views/2d/draw/Draw", 
                     "esri/tasks/IdentifyTask","esri/tasks/support/IdentifyParameters","dojo/_base/array",
                     "esri/widgets/Legend","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol","esri/Color",
                     "esri/renderers/smartMapping/statistics/uniqueValues","esri/widgets/Zoom","esri/widgets/NavigationToggle","esri/widgets/Compass",
                     "dojo/on","dojo/dom","dojo/domReady!" ],
             function(Basemap,Search, Map, SceneView, esriConfig, esriRequest,Fullscreen,
                     BasemapGallery, Expand, LayerList, 
                     Point,PictureMarkerSymbol,PointSymbol3D,LabelClass,Color,
                     TileLayer, TileInfo, WebTileLayer, ElevationLayer,
                     BaseTileLayer, GraphicsLayer, MapImageLayer,FeatureLayer,
                     geometryEngine, QueryTask, Query, Graphic, Polygon,
                     Polyline,Draw, IdentifyTask, IdentifyParameters,arrayUtils,Legend,SimpleLineSymbol,SimpleFillSymbol,Color,
                     uniqueValues,Zoom,NavigationToggle,Compass,on, dom) {
                 //不能用BaseTileLayer，否则BasemapGallyry不可用-roy 
          		var TintLayer = WebTileLayer.createSubclass({
                    properties : {
                        urlTemplate : null,
                        tint : {
                            value : null,
                            type : Color
                         }
                    },
                    getTileUrl : function(level, row, col) {
                         return this.urlTemplate.replace("{z}", level).replace("{x}", col).replace("{y}", row);
                    },
                    fetchTile : function(level, row, col) {
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
                             context.drawImage(image, 0, 0,width, height);
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
                    urlTemplate : "http://www.google.cn/maps/vt/lyrs=m@112&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
                    title : "Google Map2"
                });
                
                vectorBasemap = new Basemap({
                    baseLayers : [ ggVectorLayer, ggLabelLayer ],
                    title : "行政区划",
                    id : "vectorBasemap",
                    thumbnailUrl : "/ResourceMonitor/images/mappage/streets.png"
                });

                imageBasemap = new Basemap({
                    baseLayers : [ ggSatelliteLayer, ggLabelLayer ],
                    title : "卫星影像",
                    id : "imageBasemap",
                    thumbnailUrl : "/ResourceMonitor/images/mappage/satellite.png"
                });
                //
                var imageTileLayers = new TileLayer({
             	   url:"http://58.18.226.130:6080/arcgis/rest/services/five_DOM/MapServer",
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
                
                var rings = [[[119.1,50.0],[119.1,51.0],[121.0,51.0],[121.0,50.0],[119.1,50.0]]];
            	 eErGuNaPolygon = new Polygon({
            	     hasZ: false,
            	     hasM: false,
            	     rings: rings,
            	     spatialReference: { wkid: 4326 }
            	 });

                patrolregion = new FeatureLayer({
            		url:"http://60.205.206.180:6080/arcgis/rest/services/PATROL_REGION_7/FeatureServer/0",
            	 	 mode : FeatureLayer.MODE_ONDEMAND,
            		 //id : '1',
            		 outFields : ["*"],
            		 visible : true,
            		 //opacity : 0.8,
            		 title:"责任片区",
            	});
                
                map = new Map({
                    basemap : imageBasemap,//satellite
                });
                
                var viewingMode="global";
                if(is3D){
             	   viewingMode="local";
                }else{
             	   viewingMode="global";
                }
                view = new SceneView({
             	   viewingMode:viewingMode,
                    container : "viewDiv",
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
                view.ui.remove("attribution");
              	//底图选择
                var basemapGallery = new BasemapGallery({
                    view : view,
                    container : document.createElement("div"),
                    source : [ imageBasemap, vectorBasemap ]
                });
                var fullscreen = new Fullscreen({
             	   view: view,
             	   id:"fullScreenId",
                });
                var bgExpand = new Expand({
                    view : view,
                    content : basemapGallery.container,
                    expandIconClass : "esri-icon-basemap",
                    expandTooltip: "底图"
                });
                //document.getElementById("viewSwitch").style.display = "inline";
                document.getElementById("compassId").style.display = "inline";
                document.getElementById("initialExtent").style.display = "inline";
                document.getElementById("identify").style.display = "inline";
                document.getElementById("xyLocation").style.display = "inline";
                document.getElementById("draw-polyline").style.display = "inline";
                document.getElementById("refreshGraphics").style.display = "inline";
                document.getElementById("panel").style.visibility = "visible";
                document.getElementById("InfoShowDiv").style.visibility = "visible";
                //view.ui.add("viewSwitch","top-right");
                view.ui.add([bgExpand], "top-right");

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
                
                view.ui.remove("navigation-toggle");
                view.ui.remove("compass");
                view.ui.add(lyrLstExpand, "top-right");
                var navigationToggle = new NavigationToggle({
     			   view: view
     		   	});
         	   	if(is3D){
         		   $("#switch-btn").attr("class","icon-switch2d"); 
         	   	}else{
         		   $("#switch-btn").attr("class","icon-switch3d");
         		   view.ui.add(navigationToggle,"top-left");  
         	   	}
        		MeasurementLayer = new GraphicsLayer({
     	   			opacity : 0.80,
     	   			listMode:"hide",
     	   			elevationInfo:"on-the-ground"
     	   	    });
    			dingweiLayer = new GraphicsLayer({
    		        listMode : "hide",
    		        name:"dingweiLayer",
    		        elevationInfo:{
    		            mode : "relative-to-ground",
    		            offset : 0,
    		            unit : "meters"
    		        }
    		    });
         	   	//添加基础功能部件
         	   	view.ui.add("compassId","top-left");
         	   	view.ui.add("initialExtent","top-left");
         	   	view.ui.add("identify","top-left");
         	   	view.ui.add("xyLocation","top-left");
         	  	view.ui.add("draw-polyline","top-left");
       	  	 	view.ui.add("refreshGraphics","top-left");
         	  	map.addMany(imageLayerArray);                   
              	map.addMany([patrolregion]);
              	map.addMany([MeasurementLayer,dingweiLayer]);
              	 //初次加载定位到指定区域
                var myTilt;
                var myScale;
                if(is3D){
             	   myTilt=0;
             	   myScale=2000000;
                }else{
             	   myTilt=65;
             	   myScale=750000;
                }
                view.goTo({
                    target : eErGuNaPolygon,
                    heading : 0,
                    tilt : myTilt,
                    scale:myScale
                }, {
                    speedFactor : 0.4,
                    easing : 'ease-out'
                });
                
                /*指南针*/
                var compassButton = document.getElementById("compassId");
                compassButton.addEventListener("click",function() {
             	   view.goTo({
                        heading : 0,
                    });
                });	
                /*视图复位工具*/
                $("#initialExtent").off("click").on("click",function(){   
              	   view.goTo({
                         target : eErGuNaPolygon,
                         heading : 0,
                         tilt : myTilt,
                         scale:myScale
                     }, {
                         speedFactor : 0.7,
                         easing : 'ease-out'
                     });
                 });
                /*空间查询*/
				$("#identify").off("click").on("click",function(){	  	  
					var prevClassName=document.getElementById("identify-tool").className;
					if(prevClassName==="icon-identify1"){
					    document.getElementById("identify-tool").className ="icon-identify2";
					}else{
					    document.getElementById("identify-tool").className ="icon-identify1";
					}                
				});
             	// 坐标定位方法
                $("#xyLocation").click(function() {
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
                			var point = {
				                type: "point", 
				                x: longt,
				                y: lat,
				            };
				        	var dingweiSymbol = {
				                type: "point-3d", 
				                symbolLayers: [{
				                  type: "icon", 
				                  size:24,
				                  resource: { href:"/ResourceMonitor/images/mark/32/eventDisp_07.png" }           
				                }
				                ],             
				            };
				        	var graphic = new Graphic();
				    		graphic.geometry=point;
				    		graphic.symbol=dingweiSymbol;
				    		dingweiLayer.removeAll();
				    		dingweiLayer.add(graphic);
				    		view.goTo({
				               target :graphic,
				               heading : 0,
				               tilt : 45,
				               scale :50000
				            }, {
				               speedFactor : 1,
				               easing : 'ease-out'
				            }); 
                			layer.close(index); // 如果设定了yes回调，需进行手工关闭
                		},
                		btn2 : function(index, layero) {
                			// do something
                			layer.close(index); // 如果设定了yes回调，需进行手工关闭
                		},
                	});

                	
                });
				
                /*长度量算*/
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
                /*刷新视图工具*/
                $("#refreshGraphics").off("click").on("click",function(){	  
              	  	draw.reset();
              	  	view.popup.close();
                  	view.graphics.removeAll();
                  	MeasurementLayer.removeAll();
                  	dingweiLayer.removeAll();
                });
   			    view.on("click", clickEvnetHandler);
   			    function clickEvnetHandler(event) {
    			    if($('#identify-tool').attr('class')=='icon-identify1'){
   	   			    	view.hitTest(event).then(function(response) {
   	   			    		var clickResult = response.results[0];
   	   			    		var graphic = clickResult.graphic;
   							var attributes = graphic.attributes;
   							funshowVideoDetail(attributes);
   	   			    	})
   			    	} 
   			    }
                funLocationGoto=function(data){
					var pt = new Point(data.longitude,data.latitude);
					view.goTo({
						center : pt,
						zoom : 15
					});
					var markerSymbol = {
						type : "picture-marker", // autocasts as new
						url : "/ResourceMonitor/images/mark/16/Geye.png",
						width : 20,
						height : 20,
						xoffset : 0,
						yoffset : 8
					};
					
					var graphic = new Graphic({
						geometry : pt,
						symbol : markerSymbol,
						attributes:data
					});
					view.graphics.removeAll();
					view.graphics.add(graphic);
                }
                //面积和距离
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
}


</script>
</html>