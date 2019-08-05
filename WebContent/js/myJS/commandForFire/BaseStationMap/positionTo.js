/*******************************************************************************
 * 
 * 
 * 
 * 
 * **************************定位人员
 ******************************************************************************/
var dataObj;
var oldGraphic;
var oldlabelGraphic;
function positionTo(data) {
	//markPersons(dataObj);
	markPosition(data);
	require([ "esri/Map", "esri/views/MapView", "esri/geometry/Point",
			"dojo/domReady!" ], function(Map, MapView, Point) {
		// 利用经纬度信息创建巡护人员坐标点
		var pt = new Point(data.longitude, data.latitude);

		view.goTo({
			center : pt,
			zoom : 15
		});
	});
}

function positionVR(long,lat){
	require([ "esri/Map", "esri/views/MapView", "esri/geometry/Point",
		"dojo/domReady!" ], function(Map, MapView, Point) {
	// 利用经纬度信息创建巡护人员坐标点
	var pt = new Point(long, lat);

	view.goTo({
		center : pt,
		zoom : 15
	});
});
}


function locateToEvent(data,id) {
	require([ "esri/Map", "esri/views/MapView", "esri/geometry/Point",
			"dojo/domReady!" ], function(Map, MapView, Point) {
		markEventPosition(data,id);
		// 利用经纬度信息创建巡护人员坐标点
		var pt = new Point(data.longitude, data.latitude);

		view.goTo({
			center : pt,
			zoom : 15
		});

	});
}





/**
 * *******************************************************
 * 标记坐标点
 * ******************************************************
 */
function markLocationPosition(longt,lat) {
	require([ "esri/Map", "esri/geometry/Point",
			"esri/symbols/PictureMarkerSymbol", "esri/Graphic",
			"esri/symbols/Font", "esri/symbols/TextSymbol",
			"esri/layers/GraphicsLayer" ], function(Map, Point,
			PictureMarkerSymbol, Graphic, esriFont, TextSymbol, GraphicsLayer) {
		// 利用经纬度信息创建巡护人员坐标点
		var pt = new Point(longt, lat);
		// 巡护人员坐标点的表示符号
		var markerSymbol = {
			type : "picture-marker", // autocasts as new
			// PictureMarkerSymbol()
			url : "/ResourceMonitor/images/mark/32/sos.png",
			width : 20,
			height : 20,
			xoffset : 0,
			yoffset : 8
		};

		// 利用经纬度及符号画出巡护人员点
		var graphic = new Graphic({
			geometry : pt,
			symbol : markerSymbol
		});

		// 将点图形添加在图层中
		positionLayer = new GraphicsLayer({
			opacity : 0.90,
			listMode : "hide",
		});

		positionLayer.remove(graphic);
		positionLayer.add(graphic);
		map.remove(positionLayer);
		map.add(positionLayer);
	});
}

/**
 * *******************************************************
 * 标记事件
 * ******************************************************
 */
function markEventPosition(data,id) {
	view.graphics.removeAll();
	require([ "esri/Map", "esri/geometry/Point",
			"esri/symbols/PictureMarkerSymbol", "esri/Graphic",
			"esri/symbols/Font", "esri/symbols/TextSymbol",
			"esri/layers/GraphicsLayer" ], function(Map, Point,
			PictureMarkerSymbol, Graphic, esriFont, TextSymbol, GraphicsLayer) {
		// 利用经纬度信息创建巡护人员坐标点
		var pt = new Point(data.longitude, data.latitude);
		// 巡护人员坐标点的表示符号
		var markerSymbol = {
			type : "picture-marker", // autocasts as new
			// PictureMarkerSymbol()
			url : "/ResourceMonitor/images/mark/32/fire.png",
			width : 20,
			height : 20,
			xoffset : 0,
			yoffset : 8
		};

		// 利用经纬度及符号画出巡护人员点
		var graphic = new Graphic({
			geometry : pt,
			symbol : markerSymbol
		});
		graphic.attributes = {
				"id" : id,
				"GRAPHYFLAG" : 5
		};
		view.graphics.add(graphic);
	});
}



/**
 * *******************************************************
 * 
 * 标记人员
 * 
 * ******************************************************
 */
function markPosition(data) {
	if(oldGraphic){
		locationLayer.remove(oldGraphic);
	}
	if(oldlabelGraphic){
		locationLayer.remove(oldlabelGraphic);
	}
	
	require([ "esri/Map", "esri/geometry/Point",
			"esri/symbols/PictureMarkerSymbol", "esri/Graphic",
			"esri/symbols/Font", "esri/symbols/TextSymbol",
			"esri/layers/GraphicsLayer" ], function(Map, Point,
			PictureMarkerSymbol, Graphic, esriFont, TextSymbol, GraphicsLayer) {
		// 利用经纬度信息创建巡护人员坐标点
		var pt = new Point(data.longitude, data.latitude);
		// 巡护人员坐标点的表示符号
		var markerSymbol = {
			type : "picture-marker", // autocasts as new
			// PictureMarkerSymbol()
			url : "/ResourceMonitor/images/mark/32/person_red.png",
			width : 20,
			height : 20,
			xoffset : 0,
			yoffset : 8
		};
		// 利用经纬度及符号画出巡护人员点
		var graphic = new Graphic({
			geometry : pt,
			symbol : markerSymbol
		});

		// 设置点图形的属性信息
		graphic.attributes = {
			"personName" : data.personName,
			"personSex" : data.personSex,
			"mobile" : data.mobile,
			"longitude" : data.longitude,
			"latitude" : data.latitude,
			"xCoor" : data.xCoor,
			"yCoor" : data.yCoor,
			"projectType" : data.projectType,
			"departmentVal" : data.departmentVal,
			"regionNum" : data.regionNum,
			"regionArea" : data.regionArea,
			"regionName" : data.regionName,
			"employDate" : data.employDate,
			"identifyPhoto" : data.identifyPhoto,
			"GRAPHYFLAG" : 2
		};

		// 将点图形添加在图层中

		

		var name = data.personName;

		// 标出在线设备的名称
		var text = new TextSymbol({
			text : "                  "+ name,
			font : {
				size : 12,
				family : "宋体",
				weight : "bold"
			},
			color : new dojo.Color([ 252, 41, 6, 3 ]),
			xoffset : 30,
			yoffset : 30,
		});
		var labelGraphic = new Graphic(pt, text);

		locationLayer.add(labelGraphic);
		locationLayer.add(graphic);
		oldlabelGraphic = labelGraphic;
		oldGraphic = graphic;
	});
}

/**
 * *******************************************************
 * 
 * 标记VR
 * 
 * ******************************************************
 */
function markVR(dataObj){
		view.graphics.removeAll();
		VrmarkLayer.removeAll();
		require([ "esri/Map", "esri/geometry/Point",
				"esri/symbols/PictureMarkerSymbol", "esri/Graphic",
				"esri/symbols/Font", "esri/symbols/TextSymbol",
				"esri/layers/GraphicsLayer" ], function(Map, Point,
				PictureMarkerSymbol, Graphic, esriFont, TextSymbol, GraphicsLayer) {
			
			var markerSymbol = {
					type : "picture-marker", // autocasts as new
					// PictureMarkerSymbol()
					url : "/ResourceMonitor/images/indoor.png",
					//url : "/ResourceMonitor/images/mark/32/observer_pnt_icon.png",
					width : 25,
					height : 25,
					xoffset : 0,
					yoffset : 8
				};
			for (var i = 0; i < dataObj.length; i++) {
				// 利用经纬度信息创建巡护人员坐标点
				var pt = new Point(dataObj[i].longitude, dataObj[i].latitude);
				// 巡护人员坐标点的表示符号
				
				// 利用经纬度及符号画出巡护人员点
				var graphic = new Graphic({
					geometry : pt,
					symbol : markerSymbol
				});

				// 设置点图形的属性信息
				
				graphic.attributes = {
				    "longitude" : dataObj[i].longitude,
					"latitude" : dataObj[i].latitude,
					"id" : dataObj[i].id,
					"info" : dataObj[i].info,
					"photo" : dataObj[i].photo,
					"photoGroup" : dataObj[i].photoGroup,
					"GRAPHYFLAG" : 6
				};
				VrmarkLayer.add(graphic);
			}
			
			
		});
}
