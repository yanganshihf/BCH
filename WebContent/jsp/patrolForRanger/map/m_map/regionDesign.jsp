<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<html>
<head>
<meta name="viewport"
	content="initial-scale=1,maximum-scale=1,user-scalable=no;charset=UTF-8">
<title></title>
<%-- <script type="text/javascript"
	src="${pageContext.request.contextPath}/js/layer/layer-v3.0.3/layer/layer.js"></script> --%>
<link rel="stylesheet" href="/ResourceMonitor/iconClass/style.css" />
<link rel="stylesheet"
	href="/ResourceMonitor/js/arcgis_js_api/library/4.10/esri/css/main.css">
<style>
html, body, #baseViewDiv {
	padding: 0;
	margin: 0;
	height: 100%;
	width: 100%;
}

.esri-sketch__panel {
	padding-left: 0px;
	padding-right: 0px;
}

.esri-icon-map-pin, .esri-icon-polyline, .esri-icon-checkbox-unchecked,
	.esri-icon-radio-unchecked, .esri-sketch__info-panel {
	display: none;
}

.esri-sketch--vertical, .esri-sketch__section {
	margin-left: 0px;
	margin-right: 0px;
	padding: 0;
}
.esri-zoom .esri-widget--button:last-child {
   border-top: 0
}
.nomore-button {
	font-size: 16px;
	background-color: #FFFFFF;
	border: 1px solid #D3D3D3;
	color: #6e6e6e;
	height: 32px;
	width: 32px;
	text-align: center;
	box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}
.esri-sketch__button.esri-sketch__button--selected, .esri-sketch__button.esri-sketch__button--selected:hover {
    background: #058563;
    color: #fff;
}
body .layui-layer-btn .layui-layer-btn0{border-color:#058563;background-color:#058563;color:#fff}
.esri-compass {
    border-radius: 0;
}
.esri-ui .esri-ui-top-left{
	 flex-flow: row; 
}
.esri-ui .esri-ui-top-left .esri-component{
	margin-bottom: 0;
	margin-right: 10px;
	flex-flow: initial; 
}
</style>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/myJS/coordTransfer.js"></script>
<script src="/ResourceMonitor/js/arcgis_js_api/library/4.10/init.js"></script>
</head>
<body>
	<div id="baseViewDiv" style="width: 100%; height: 100%;"></div>
	<div id="hiddenDiv" style="display: none;">
		<div id="topbar_initMap" class="esri-widget--button esri-widget esri-interactive" title="初始视图" style="display: none;padding-top: 6px;">
			<span class="icon-earth" style="font-size:20px;margin-bottom: 6px;" id="initMap"></span>
		</div>
<!-- 		<div id="topbar_initMap">
			<button class="nomore-button esri-icon-globe" id="initMap"
				type="button" title="初始位置"></button>
		</div> -->
		<div id="topbar_delRegion">
			<button class="nomore-button esri-icon-trash" id="delRegion"
				type="button" title="删除区域"></button>
		</div>
		
		<div id="topbar_dianziweilan">
			<button class="nomore-button esri-icon-notice-triangle" id="dianziweilan"
				type="button" title="电子围栏"></button>
		</div>
		
		<div id="topbar_zhuliugaojing">
			<button class="nomore-button esri-icon-announcement" id="zhuliugaojing"
				type="button" title="驻留告警"></button>
		</div>
		
		<div id="topbar_editRegion">
			<button class="nomore-button esri-icon-edit" id="editRegion"
				type="button" title="属性修改"></button>
		</div>
		<!-- <div id="topbar_regionFile">
			<button class="nomore-button esri-icon-upload" id="regionFile"
				type="button" title="导入文件"></button>
		</div> -->
		<div id="refreshGraphics" class="esri-widget--button esri-widget esri-interactive" title="刷新地图" style="display: none;padding-top: 6px;">
			<span class="icon-refresh" style="font-size:20px;margin-bottom: 6px;"></span>
		</div>
	</div>
	<div id="huizong" class="esri-widget--button esri-widget esri-interactive" title="下发管理" style="display:none;position: absolute;top:60px;left:15px;background-color: #ffffff;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);">
		<span id="iconHuizong" class="esri-icon-down-arrow-circled" style="font-size:20px;"></span>
	</div>
	<script type="text/javascript">
		var funQueryByCond=null;
	    var deleteFeatureFun;
		var patrolregion;
		var baseGeoMapLayers;
		var localhostPath;
		var projectName;
		var positionLayer;
		var aheight;
		var awidth;
		var layer;
		var Info = -1;
		
		var polygonLayer;//责任区
		var map, view,eErGuNaPolygon;
		var patrolRegionGraphic;
		var imageLayerArray=new Array();
		var soilURL = "http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer";
		var startFea;
		layui.use('layer', function(){
	        layer = layui.layer;
	    });
		$(document).ready(function() {
			// 获取路径
			var curWwwPath = window.document.location.href;
			var pathname = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathname);
			localhostPath = curWwwPath.substring(0, pos);
			// 获取项目名
			projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
			//概况信息
			$("#huizong").off("click").on("click",function(){
				layer.close(Info);
				var iup = 1;
				view.graphics.removeAll();
		    	//var prevClassName = document.getElementById("iconHuizong").className;
		    	$("[id^='panel']").hide();
		    	//$("#iconHuizong").attr("class","icon-information");
		    	aheight = $(document).height()/2;
				awidth = $(document).width();
		    	Info = layer.open({
		    		type : 2,
		    		shade : 0,
		    		title : [ "下发管理", 'font-size:14px;'],
		    		content : '/ResourceMonitor/jsp/patrolForRanger/region/RegionManage.jsp',
		    		id : 'Info',
		    		resize : false,
		    		anim : 2,
		    		area : [awidth+'px',aheight+'px'],
		    		offset : 'b',
		    		//isOutAnim : false,
		    		//move : false,
		    		success : function(layero, index) {
						var body = layer.getChildFrame('body', index);
		                var iframeWin = window[layero.find('iframe')[0]['name']];
		                funQueryByCond = iframeWin.queryByCond;
		    			$(".layui-layer-iframe").append("<span id='up' class='layui-layer-setwin' style='right: 45px;' title='展开'><a class='layui-icon layui-icon-next' href='javascript:;' style='font-size: 16px;transform: rotate(-90deg);text-decoration: none;'></a></span>")
		    			
		    			$("body").on("click","#up", function(e){
		    				if(iup == 1){
		    					layer.full(Info);
		    					iup = 0;
		    					$("#up").attr("title","收起");
		    					$("#up a").css("transform","rotate(90deg)")
		    				}else{
		    					layer.restore(Info);
		    					iup = 1;
		    					$("#up").attr("title","展开");
		    					$("#up a").css("transform","rotate(-90deg)")
		    				}
		    	        });
		    		},
		    		cancel: function(index, layero){ 
		    			view.graphics.removeAll();
		    		}    
		    	});
		    });
			$(window).resize(function() {
				aheight = $(document).height()/2;
				awidth = $(document).width();
				layer.style(Info, {
					  width: awidth,
					  height: aheight
				}); 
			});
			
			require([ "esri/Map", "esri/views/MapView", "esri/layers/WebTileLayer", "esri/Color",
				"esri/config", "esri/Basemap","esri/request","esri/widgets/BasemapGallery","esri/widgets/Expand","esri/widgets/ScaleBar","esri/widgets/Compass",
				"esri/layers/TileLayer","esri/layers/MapImageLayer","esri/layers/FeatureLayer","esri/widgets/LayerList","esri/core/urlUtils", 
				"esri/tasks/QueryTask","esri/tasks/support/Query","esri/Graphic","esri/layers/GraphicsLayer","esri/geometry/Point","esri/symbols/TextSymbol", 
				"esri/layers/ElevationLayer","esri/layers/support/LabelClass", "esri/WebMap","esri/geometry/geometryEngine","esri/widgets/Legend",
				"esri/symbols/PictureMarkerSymbol","esri/symbols/Font","esri/tasks/IdentifyTask","esri/tasks/support/IdentifyParameters","dojo/_base/array",
				"esri/widgets/Sketch","esri/geometry/Polygon","esri/symbols/SimpleFillSymbol"],
				function(Map, MapView,WebTileLayer, Color,esriConfig, Basemap, esriRequest,BasemapGallery, Expand,ScaleBar,Compass, TileLayer, MapImageLayer,
						FeatureLayer, LayerList,urlUtils,QueryTask,Query,Graphic,GraphicsLayer,Point,TextSymbol,ElevationLayer,LabelClass, WebMap,geometryEngine,
						Legend,PictureMarkerSymbol,Font,IdentifyTask,IdentifyParameters,arrayUtils,Sketch, Polygon,SimpleFillSymbol){
				var rings = [[ [119.1,50.0],[119.1,51.0],[121.0,51.0],[121.0,50.0],[119.1,50.0] ]];
				urlUtils.addProxyRule({
					urlPrefix : "http://58.18.226.130:6080/arcgis/rest/services",
					// 本地环境
					proxyUrl : "http://60.205.206.180:8080/Java/proxy.jsp"
						// 发布环境
					//proxyUrl : "http://127.0.0.1:8878/Java/proxy.jsp"
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
					baseLayers : [ ggSatelliteLayer,ggLabelLayer ],
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
					url:"http://60.205.206.180:6080/arcgis/rest/services/guanhuqu_EEGN/FeatureServer/0",
				 	 mode : "hide",
					 //id : '1',
					 outFields : ["*"],
					 visible : true,
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
	            
	            tingJiPing=new  FeatureLayer({
	       		 	url: soilURL+"/1",
	     			title : "停机坪",
	                visible:false,
	     		});
	       	 	tingJiPing.renderer = {
	      		  type: "simple",  
	        		  symbol: {  
	        		    type: "picture-marker",
	        		    url:  "/ResourceMonitor/images/mark/32/tingjiping.png",
	        		  	width: "20px",
	        		  	height: "28px"
	        		  }
	        		};
	       	 	tower=new  FeatureLayer({
	       		 	url: soilURL+"/0",
	     			title : "塔",
	     			visible:false,
	     		});
	       	 	tower.renderer = {
	      		  type: "simple",  
	        		  symbol: {  
	        		    type: "picture-marker",
	        		    url:  "/ResourceMonitor/images/mark/32/tower.png",
	        		  	width: "20px",
	        		  	height: "28px"
	        		  }
	        		};
	       	 	guanHuZhan=new  FeatureLayer({
	       		 	url: soilURL+"/2",
	     			title : "管护站",
	     			visible:false,
	     		});
	       	 	guanHuZhan.renderer = {
	      		  type: "simple",  
	        		  symbol: {  
	        		    type: "picture-marker",
	        		    url:  "/ResourceMonitor/images/mark/32/ghz.png",
	        		  	width: "20px",
	        		  	height: "28px"
	        		  }
	        		};
	       	 	juMinDian=new  FeatureLayer({
	       		 	url: soilURL+"/6",
	     			title : "居民点",
	     			visible:false,
	     		}); 
	       	 	juMinDian.renderer = {
	      		  type: "simple",  
	        		  symbol: {  
	        		    type: "picture-marker",
	        		    url:  "/ResourceMonitor/images/mark/32/address.png",
	        		  	width: "20px",
	        		  	height: "28px"
	        		  }
	        		};
	       	 	muYeDian=new  FeatureLayer({
	       		 	url: soilURL+"/7",
	     			title : "牧业点",
	     			visible:false,
	     		}); 
	       	 	muYeDian.renderer = {
	      		  type: "simple",  
	        		  symbol: {  
	        		    type: "picture-marker",
	        		    url:  "/ResourceMonitor/images/mark/32/myd.png",
	        		  	width: "20px",
	        		  	height: "28px"
	        		  }
	        	};  
	       	 	
	       	 	baseGeoMapLayers = new MapImageLayer({
                 	url : soilURL,
                 	title : "基础数据",
                 	//visible : getCookieValue('view_base'),
                 	sublayers : [
                 		{
                 	  	id : 8,
                 	  	title : "道路",
                 	 	visible : false
                 		},{
                         	id : 9,
                         	title : "河流",
                         	visible : false
                     	},{
                         	id : 10,
                         	title : "林场界",
                         	visible : false
                     	},{
                         	id : 11,
                         	title : "小班面",
                         	visible : false
                     	} ]
       			});
	       	 	
	       	 	polygonLayer = new GraphicsLayer();
             	polygonLayer.title = '责任片区';
             	
	       		map = new Map({
					basemap : imageBasemap2,
				});
	       		
	       		map.addMany(imageLayerArray);
				map.addMany([baseGeoMapLayers,muYeDian,juMinDian,guanHuZhan,tower,tingJiPing,polygonLayer]);	
				
				view = new MapView({
					container : 'baseViewDiv',
					map : map,
                    popup: {
                        dockEnabled: true,
                        dockOptions: {
                       	 	buttonEnabled: false,
                        	breakpoint: false,
                      	}
                 	},
                 	extent:{
                		xmin: 118.8,
                		ymin: 49.8,
                		xmax: 121.3,
                		ymax: 51.8,
                	},
				});
				
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
                var compass = new Compass({
					view : view
				});
                scalebar = new ScaleBar({
   					view : view,
   					unit : "metric",
   					style : "line",
   				});
                
                var sketch = new Sketch({
    				layer : polygonLayer,
    				view : view,						
    			});
                
                view.ui.remove("attribution");
				view.ui.add(bgExpand,"top-right");
				view.ui.add(lyrLstExpand,"top-right");
				view.ui.add(compass, "top-left");
    			view.ui.add("topbar_initMap","top-left");
    			view.ui.add(sketch, "top-left");
    			view.ui.add("topbar_editRegion","top-left");
    			view.ui.add("topbar_delRegion","top-left");
    			view.ui.add("topbar_dianziweilan","top-left");
    			view.ui.add("topbar_zhuliugaojing","top-left");
    			view.ui.add("refreshGraphics","top-left");
    			view.ui.add(scalebar, {position : "bottom-left"});
    			$("#huizong").css("display","");	
    			$("#topbar_initMap").css("display","");
    			$("#refreshGraphics").css("display","");
    			$("#baseViewDiv .esri-ui .esri-ui-inner-container").css("bottom","15px");
    			setTimeout(function() {
    				$(".esri-icon-pan").attr("title","移动区域");
    				$(".esri-icon-cursor").attr("title","修改区域形状");
    				$(".esri-icon-polygon").attr("title","绘制区域");	
    			},300);	
    			view.when(function(){
    				view.goTo({
    					target : baseGeoMapLayers.fullExtent,
    					heading : 0,
    					zoom: 8,
    			});
    				
    				
    				
    				
    				
    				
    				
    			});
    			
    			
    			$("#initMap").click(function(){
					view.goTo({
						target : baseGeoMapLayers.fullExtent,
						heading : 0,
						zoom: 8,
					});
				})
				   var refreshButton = document.getElementById("refreshGraphics");
	               refreshButton.addEventListener("click", function() {
	                    	view.graphics.removeAll();   	 
	              }); 
				
				
				
				
	            deleteFeatureFun=function(id,queryByCond){
					layer.confirm('确定删除区域？', {btn: ['确定', '取消'] }, function(index, layero){//按钮【按钮一】的回调
						//图中删除
						var graphics = polygonLayer.graphics.items;
						var delGraphic = graphics.find(function(graphic){
							if(graphic.attributes.OBJECTID==id){
								return graphic;
							}
						});
						polygonLayer.remove(delGraphic);
						//后台删除
						const deleteFeature = {
						   objectId: [id]
						};
						const promise_del = patrolregion.applyEdits({
							deleteFeatures : [deleteFeature]
						}).then(function(){
							queryByCond(); 
						});									
						layer.close(index);
					}, function(index){// 刷新图层
					});
	            }
				
				// 点击删除区域
				$("#delRegion").click(function(){
					
					if (editFeatures.length < 1) {
						layer.msg("请选择要删除的区域");
					}else{
						layer.confirm('确定删除选中区域？', {btn: ['确定', '取消'] }, function(index, layero){//按钮【按钮一】的回调
							
							var patrolRegionGraphic = editFeatures;
							editFeatures[0].geometry = null;
							const promise_del = patrolregion.applyEdits({
								deleteFeatures : patrolRegionGraphic
							}).then(function(){
								if(funQueryByCond!=null){
									funQueryByCond();
								}
							})	
							layer.close(index);
							sketch.cancel();
							editFeatures = [];
						}, function(index){// 刷新图层
							layer.close(index);
							sketch.cancel();
							editFeatures = [];
						});
					}
				});
				
				// 电子围栏
				$("#dianziweilan").click(function(){
					layer.open({
						title : '电子围栏设置',
						type : 2,
						content : '/ResourceMonitor/jsp/patrolForRanger/map/layers/dianziweilan.jsp',
						btn : [ '确定', '取消' ],
						area : ['350px','235px'],
						yes : function(index, layero) {
							 var body = layer.getChildFrame('body', index);
							 // console.log(body.find('input').val());
							 var jingjiefanwei = body.find('input').val();
							 // 获得参数
							 $.ajax({
								    url:localhostPath + projectName + '/region/dianziweilan',    //查询责任区编号
								    dataType:"json",   //返回格式为json
								    async:false,//请求是否异步，默认为异步，这也是ajax重要特性
								    data:{
								    	'jingjiefanwei' : jingjiefanwei,
								    },    //参数值
								    type:"POST",   //请求方式
								    success:function(req){
								    	layer.closeAll();
								    	layer.msg("电子围栏设置成功");
								    }
							 });
						}
					});
				});
				
				// 驻留告警
				$("#zhuliugaojing").click(function(){
					layer.open({
						title : '驻留告警时长设置',
						type : 2,
						content : '/ResourceMonitor/jsp/patrolForRanger/map/layers/zhuliugaojing.jsp',
						btn : [ '确定', '取消' ],
						area : ['350px','235px'],
						yes : function(index, layero) {
							 var body = layer.getChildFrame('body', index);
							 // console.log(body.find('input').val());
							 var zhuliugaojing = body.find('input').val();
							 // 获得参数
							 $.ajax({
								    url:localhostPath + projectName + '/region/zhuliugaojing',    //查询责任区编号
								    dataType:"json",   //返回格式为json
								    async:false,//请求是否异步，默认为异步，这也是ajax重要特性
								    data:{
								    	'zhuliugaojing' : zhuliugaojing,
								    },    //参数值
								    type:"POST",   //请求方式
								    success:function(req){
								    	layer.closeAll();
								    	layer.msg("驻留告警时长设置设置成功");
								    }
							 });
						}
					});
				});
				
				//点击修改区域属性 editRegion
				$("#editRegion").click(function(){
					if (editFeatures < 1) {
						layer.msg("请选择要修改属性的区域");
					}else if(editFeatures.length>1){
						layer.msg("一次只能修改一个区域的属性");
					}else{
						layer.open({
							title : '修改区域',
							type : 2,
							content : '/ResourceMonitor/jsp/patrolForRanger/map/layers/editRegion.jsp',
							btn : [ '确定', '取消' ],
							area : ['330px','255px'],
							success: function(layero, index){
								var attr = editFeatures[0].attributes;
								var body = layer.getChildFrame('body', index);
								body.find('#department').val(attr.Departme_1);
								body.find('#regionName').val(attr.RegionName);
								body.find('#regionNum').val(attr.RegionNum);
							},
							yes : function(index, layero) {
								var attr = editFeatures[0].attributes;
								var body = layer.getChildFrame('body', index);
								var departmentVal = body.find('#department').val();
								var regionName = body.find('#regionName').val();
								var regionNum = body.find('#regionNum').val();
								
								$.ajax({
								    url:localhostPath + projectName + '/region/findNUM',    //查询责任区编号
								    dataType:"json",   //返回格式为json
								    async:false,//请求是否异步，默认为异步，这也是ajax重要特性
								    data:{
								    	'departmentVal' : departmentVal,
										'regionName' : regionName,
										'regionNum' : regionNum
								    },    //参数值
								    type:"POST",   //请求方式
								    success:function(req){
								    	if(departmentVal != attr.Departme_1 || regionName != attr.RegionName || regionNum != attr.RegionNum){
								    		if(!regionName || !regionNum){
								    			top.layer.msg("责任区名称或责任区为空，请重新输入！");
								    		}else if(req.rows.length){
								    			top.layer.msg("责任区名称或责任区编号重复，请重新输入！");
								    		}else{
								    			// 修改属性
									    		editFeatures[0].attributes.Departme_1 = body.find('#department').val();
												editFeatures[0].attributes.RegionName = body.find('#regionName').val();
												editFeatures[0].attributes.RegionNum = body.find('#regionNum').val();
												
												const promise_edit = patrolregion.applyEdits({
													updateFeatures : editFeatures
												}).then(function(){
													if(funQueryByCond!=null){
														funQueryByCond();
													}
												});								
												layer.close(index);
												layer.msg("修改成功");
												sketch.cancel();
												editFeatures = [];
								    		}
								    	}else{
								    		top.layer.msg("责任区属性未修改，请关闭或重新输入！");
								    	}
								    }
								});
								
								
								
							},
							btn2 : function(index, layero) {
								// 按钮【按钮二】的回调
								view.graphics.removeAll();
								sketch.cancel();
								editFeatures = [];
							}								
						});
					}
				});
				var editFeatures = [];
				loadingLayerAsGL();
				sketch.on("create",function(event) {
					if (event.state === "complete") {
						patrolRegionGraphic = event.graphic;
						
						if (patrolRegionGraphic.geometry.isSelfIntersecting) {
							layer.msg("区域不能自相交");
							view.graphics.removeAll();
							
						} else {
							layer.open({
								title : '添加区域',
								type : 2,
								content : '../layers/addNewRegion.jsp',
								btn : ['确定','取消'],
								area : ['330px','220px' ],
								yes : function(index,layero) {
									var body = layer.getChildFrame('body',index);
									var departmentVal = body.find('#department').val();
									var departmentName = body.find('#department').find("option:selected").text();
									//var department = body.find('#department').val();
									var regionName = body.find('#regionName').val();
									var regionNum = body.find('#regionNum').val();
									
									$.ajax({
									    url:localhostPath + projectName + '/region/findNUM',    //查询责任区编号
									    dataType:"json",   //返回格式为json
									    async:false,//请求是否异步，默认为异步，这也是ajax重要特性
									    data:{
									    	'departmentVal' : departmentVal,
											'regionName' : regionName,
											'regionNum' : regionNum
									    },    //参数值
									    type:"POST",   //请求方式
									    success:function(req){
									    	if(!regionName || !regionNum){
									    		top.layer.msg("责任区名称或责任区为空，请重新输入！");
									    	}else if(req.rows.length){
									    		top.layer.msg("责任区名称或责任区编号重复，请重新输入！");
									    	}else{
									    		// 设置图形属性
												patrolRegionGraphic.attributes = {
													"RegionNum" : regionNum,
													"RegionName" : regionName,
													"Patrols" : '',
													"Department" : departmentName,
													"Departme_1" : departmentVal,
													"GRAPHYFLAG" : 6
												};
												validSymbol = createSymbol([ 255, 255, 255, 0 ], "solid", 2, [255, 0, 0 ]);
												patrolRegionGraphic.symbol = validSymbol;
												// 向特征图层中添加图形
												var addparams = {
													addFeatures : [ patrolRegionGraphic ]
												};		
												var promise = patrolregion.applyEdits(addparams);
												promise.then(function(editsResult) {
													if (editsResult.addFeatureResults.length > 0) {
														
														setTimeout(function(){
															polygonLayer.remove(patrolRegionGraphic);
															loadingFinal();
															
													  	}, 300);														
														view.graphics.removeAll();
														layer.close(index);
														
													}
													if(funQueryByCond!=null){
														funQueryByCond();
													}
												}).otherwise(function(error) {
													//
													layer.msg('管护责任区添加失败！');
												});
												editFeatures = [];
									    	}
									    }
									});					
								},
								btn2 : function(index,layero) {
									view.graphics.removeAll();
									polygonLayer.remove(event.graphic);
									editFeatures = [];
								},
								cancel : function(index,layero) {
									view.graphics.removeAll();
									polygonLayer.remove(event.graphic);
									editFeatures = [];
								}
							});
						}
					}
				});
				sketch.on("update",function(event) {
					editFeatures =  event.graphics;
				});
			 sketch.on("update",function(event) {
					editFeatures =  event.graphics;
					//alert(event.state)
					if (event.state ==="start") {
						
						const startFeatures  =  event.graphics;
						startFea = startFeatures[0].geometry;
						//startFea[0].geometry
					}
					// 取消选中时
					if (event.state ==="cancel") {
						editFeatures = [];
					}
					if (event.state === "complete") {
						const adFeatures = event.graphics;
						layui.use('layer', function(){
							layer = layui.layer;
							layer.confirm('已修改,确定保存？', { btn: ['确定', '取消']}, function(index, layero){
								//按钮【按钮一】的回调
								const promise_del = patrolregion.applyEdits({
									deleteFeatures : editFeatures
								});
								
								const promise_add = patrolregion.applyEdits({
								   	addFeatures : adFeatures
								});				
								layer.closeAll();
								// 短时间以后刷新图层
								
								setTimeout(function(){
									polygonLayer.remove(adFeatures[0]);
									loadingFinal();
							  	}, 300);
								
							}, function(index){
								
								adFeatures[0].geometry = startFea;
								editFeatures = [];
							});		
						});
					}
				});
				
				// featureLayer转换为graphicsLayer
				function loadingLayerAsGL(){
					polygonLayer.removeAll();
					var query = patrolregion.createQuery();
					// query.where = "GRAPHYFLAG = '6'";
					query.where = " 1 = 1";
					query.outFields = [ "*" ];
					validSymbol = createSymbol([ 255, 255, 255, 0 ], "solid", 2, [255, 0, 0 ]);
					//经纬度转墨卡托  
					function lonlat2mercator_2(longitude,lat){  
						var x = longitude*20037508.34/180;  
						var y = Math.log(Math.tan((90+lat)*Math.PI/360))/(Math.PI/180);  
						y = y *20037508.34/180;  
						var mercator = [x,y]; 
						return mercator ;  
					} 
					patrolregion.queryFeatures(query).then(function(response) {
						var features = response.features;
						for (var i = 0; i < features.length; i++) {
							var vertices_zuobiao_array = new Array();
							if(features[i].geometry != null){
								var vertices_zuobiao = features[i].geometry.rings[0];
									for (var j = 0; j < vertices_zuobiao.length; j++) {
										var vertices_mercator = lonlat2mercator_2(vertices_zuobiao[j][0],vertices_zuobiao[j][1]);
										vertices_zuobiao_array.push(vertices_mercator);
									}
								var polygon_mercator = createGeometry(vertices_zuobiao_array);
								var newDevelopmentGraphic = new Graphic({
									geometry : polygon_mercator,
									symbol : validSymbol,
									attributes : features[i].attributes
								});
								polygonLayer.addMany([ newDevelopmentGraphic ]);
							}					
						}
					});
				}
				
				// featureLayer转换为graphicsLayer
				function loadingFinal(){
					var query = patrolregion.createQuery();
					// query.where = "GRAPHYFLAG = '6'";
					query.where = " 1 = 1";
					query.outFields = [ "*" ];
					validSymbol = createSymbol([ 255, 255, 255, 0 ], "solid", 2, [255, 0, 0 ]);
					//经纬度转墨卡托  
					function lonlat2mercator_2(longitude,lat){  
						var x = longitude*20037508.34/180;  
						var y = Math.log(Math.tan((90+lat)*Math.PI/360))/(Math.PI/180);  
						y = y *20037508.34/180;  
						var mercator = [x,y]; 
						return mercator ;  
					} 
					patrolregion.queryFeatures(query).then(function(response) {
						var features = response.features;
						for (var i = 0; i < features.length; i++) {
							if(i == features.length - 1){
								var vertices_zuobiao_array = new Array();
								if(features[i].geometry != null){
									var vertices_zuobiao = features[i].geometry.rings[0];
										for (var j = 0; j < vertices_zuobiao.length; j++) {
											var vertices_mercator = lonlat2mercator_2(vertices_zuobiao[j][0],vertices_zuobiao[j][1]);
											vertices_zuobiao_array.push(vertices_mercator);
										}
									var polygon_mercator = createGeometry(vertices_zuobiao_array);
									var newDevelopmentGraphic = new Graphic({
										geometry : polygon_mercator,
										symbol : validSymbol,
										attributes : features[i].attributes
									});
									polygonLayer.addMany([ newDevelopmentGraphic ]);
								}
							}					
						}
					});
				}
				function createGeometry(vertices) {
					return new Polygon({
						rings : vertices,
						spatialReference : view.spatialReference
					});
				}

				function createSymbol(color, style, width, outlineColor) {
					return {
						type : "simple-fill",
						style : style,
						color : color,
						outline : {
							color : outlineColor,
							width : width
						}
					}
				}	
			});
		});
function locateRegion(id) {
	view.graphics.removeAll();
	var indexload = layer.load(1, {
		  shade: [0.1,'#fff'] //0.1透明度的白色背景
	});
	require([ "esri/Map","esri/Basemap","esri/views/MapView","esri/layers/WebTileLayer","esri/layers/support/TileInfo","esri/layers/FeatureLayer","esri/layers/MapImageLayer",
		"esri/layers/TileLayer","esri/layers/GraphicsLayer","esri/geometry/SpatialReference","esri/tasks/FindTask","esri/tasks/support/FindParameters",
		"esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol","esri/Color","esri/request"], function(Map,Basemap,MapView,WebTileLayer,TileInfo,FeatureLayer,MapImageLayer,TileLayer,
				GraphicsLayer,SpatialReference,FindTask,FindParameters,SimpleLineSymbol,SimpleFillSymbol,Color,esriRequest) {
				var findTask = new FindTask({
		            url: "http://60.205.206.180:6080/arcgis/rest/services/guanhuqu_EEGN/MapServer"
		          });

				// Set parameters to only query the Counties layer by name
				 var findParams = new FindParameters({
         			 layerIds: [0],
          			 searchFields: ["OBJECTID"]
        		 });
        		findParams.searchText = id;
        		findParams.returnGeometry = true;
        		 //执行查询对象
                findTask.execute(findParams).then(function(response){
                	 // 
                	 var results = response.results;
                     if (results.length >= 1) {
                     	 //获得图形graphic
                         var graphic = results[0].feature;
                         var lineSymbol=new SimpleLineSymbol("solid", new Color([0, 0, 255]), 2);
                         //创建面符号
                          var fillSymbol=new SimpleFillSymbol({
                        	  color:[255, 0, 0, 0.2],
                        	  style:"solid",
                        	  outline:lineSymbol
                          });
                          
                        graphic.symbol=fillSymbol;
                        //regionGeoLayer.add(graphic);
                       // 
                        view.graphics.add(graphic);
                        layer.close(indexload);
                        graphic.geometry.extent.ymax = (graphic.geometry.extent.ymax + graphic.geometry.extent.center.y)/2;
	                    view.goTo({
	                    	  target:graphic.geometry.extent, 
	                    });
	                   
                     }
                });
			});
}



</script>
</body>
</html>