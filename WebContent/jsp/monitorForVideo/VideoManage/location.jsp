<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<meta name="viewport"
	content="initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Synchronize MapView and SceneView - 4.10</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style>
html, body {
	padding: 0;
	margin: 0;
	height: 100%;
}

#switchImg:hover {
	background-color: #D3D3D3;
}

#switchImg {
	opacity: 0.8;
}
</style>

<link rel="stylesheet"
	href="/ResourceMonitor/js/arcgis_js_api/library/4.10/esri/css/main.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/js/myJS/coordTransfer.js"></script>
<script src="/ResourceMonitor/js/arcgis_js_api/library/4.10/init.js"></script>
</head>

<body>

	<div id="baseViewDiv" style="float: left; width: 100%; height: 100%;">
		<input type="hidden" id="longitude"> <input type="hidden"
			id="latitude">
		<input type="hidden" id="rowId">
	</div>

	<script type="text/javascript">
		$(document).ready(function() {
			// 获取路径
			var curWwwPath = window.document.location.href;
			var pathname = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathname);
			localhostPath = curWwwPath.substring(0, pos);
			// 获取项目名
			projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
		});
	</script>

	<script type="text/javascript">
		// 初始加载
		$(document).ready(function() {
			// 加载底图 谷歌
			require([ "esri/Map", "esri/views/MapView",
					"esri/layers/WebTileLayer",
					"esri/Color", "esri/config",
					"esri/Basemap",
					"esri/layers/MapImageLayer",
					"esri/request",
					"esri/widgets/BasemapGallery",
					"esri/widgets/Compass",
					"esri/widgets/Expand",
					"esri/geometry/Point",
					"esri/symbols/PictureMarkerSymbol",
					"esri/Graphic",
					"esri/symbols/Font",
					"esri/symbols/TextSymbol",
					"esri/layers/GraphicsLayer",
					"dojo/domReady!" ],
				function(Map, MapView, WebTileLayer, Color,
					esriConfig, Basemap, MapImageLayer,
					esriRequest, BasemapGallery, Point,
					Expand, Point, PictureMarkerSymbol,
					Graphic, esriFont, TextSymbol,
					GraphicsLayer) {
	
				// 不能用BaseTileLayer，否则BasemapGallyry不可用-roy
				TintLayer = WebTileLayer.createSubclass({
					properties : {
						urlTemplate : null,
						tint : {
							value : null,
							type : Color
						}
					},
					getTileUrl : function(
							level, row, col) {
						return this.urlTemplate
								.replace("{z}",
										level)
								.replace("{x}",
										col)
								.replace("{y}",
										row);
					},
					fetchTile : function(level,row, col) {
						var url = this.getTileUrl(level,row,col);
						return esriRequest(url,{
							responseType : "image",
							allowImageDataAccess : true
						}).then(function(response) {
							var image = response.data;
							var width = this.tileInfo.size[0];
							var height = this.tileInfo.size[0];
							var canvas = document
									.createElement("canvas");
							var context = canvas
									.getContext("2d");
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
					baseLayers : [
							ggSatelliteLayer,ggLabelLayer ],
					title : "卫星影像",
					id : "imageBasemap",
					thumbnailUrl : "/ResourceMonitor/images/mappage/satellite.png"
				});
				var vectorBasemap2 = new Basemap({
					baseLayers : [
							ggVectorLayer,ggLabelLayer ],
					title : "行政区划",
					id : "vectorBasemap",
					thumbnailUrl : "/ResourceMonitor/images/mappage/streets.png"
				});
				map = new Map({
					basemap : imageBasemap2
				});
				view = new MapView({
					container : 'baseViewDiv',
					map : map,
					// 初始地图中心位置
					center : [ 120, 50.5 ],
					zoom : 10,
					tilt : 45,
					heading : 0
				});
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
				// 去除logo
				view.ui.remove("attribution");
				view.ui.add(bgExpand,"top-right");
				view.when(function(){
					var pt = new Point($("#longitude").val(), $("#latitude").val());
					view.goTo({
						center : pt,
						zoom : 15
					});
					var markerSymbol = {
						type : "picture-marker", // autocasts as new
						// PictureMarkerSymbol()
						url : "/ResourceMonitor/images/mark/16/Geye.png",
						width : 20,
						height : 20,
						xoffset : 0,
						yoffset : 8
					};
	
					var graphic = new Graphic({
						geometry : pt,
						symbol : markerSymbol
					});
					// 将点图形添加在图层中
					var positionLayer = new GraphicsLayer({
						opacity : 0.90,
						listMode : "hide",
					});
					
					positionLayer.add(graphic);
					map.add(positionLayer);
				});
			});
		});
	</script>

</body>
</html>