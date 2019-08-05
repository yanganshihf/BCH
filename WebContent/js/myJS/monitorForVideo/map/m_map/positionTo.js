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
// 坐标定位方法
$("#loacte_zuobiao").click(function() {
	
	var longt;
	var lat;
	
	
	layer.open({
		title : "坐标定位",
		type : 2,
		resize : false,
		area : [ '325px', '300px' ],
		content : '/ResourceMonitor/jsp/patrolForRanger/map/layers/locateTo.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
														// ['http://sentsin.com',
														// 'no']
		btn : [ '确定', '取消' ],
		yes : function(index, layero) {
			var body = layer.getChildFrame('body', index);
			
			var class_dfz = body.find('#dfz').attr("Class");
			var class_sjz = body.find('#sjz').attr("Class");
			var class_xian80 = body.find('#xian80').attr("Class");
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
				longt = Math.abs(du) + "." + (Math.abs(fen)/60 + Math.abs(miao)/3600);
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
				lat = Math.abs(du) + "." + (Math.abs(fen)/60 + Math.abs(miao)/3600);
				
				
			}
			if (class_sjz == "active") {
				longt = body.find('#longtFull').val();
				lat = body.find('#latFull').val();
			}
			if (class_xian80 == "active") {
				xCoor = body.find('#xCoor').val();
				yCoor = body.find('#yCoor').val();
				// 墨卡托转经纬度
				var x = xCoor/20037508.34*180;  
					var y = yCoor/20037508.34*180;  
					y= 180/Math.PI*(2*Math.atan(Math.exp(y*Math.PI/180))-Math.PI/2);  
					longt = x;  
					lat = y;  
				
			}
			
			
			require([ "esri/Map", "esri/views/MapView", "esri/geometry/Point",
				"dojo/domReady!" ], function(Map, MapView, Point) {
			// 利用经纬度信息创建巡护人员坐标点
			var pt = new Point(longt, lat);

			view.goTo({
				center : pt,
				zoom : 15
				});
			});
			
			markLocationPosition(longt,lat);
			// do something
			layer.close(index); // 如果设定了yes回调，需进行手工关闭
		},
		btn2 : function(index, layero) {
			// do something
			layer.close(index); // 如果设定了yes回调，需进行手工关闭
		},
	});
	
	
});


/*******************************************************************************
 * 
 * 
 * 
 * 
 * **************************定位责任区
 ******************************************************************************/
function locateRegion(id) {
	require(
			[ "esri/Map", "esri/views/MapView", "esri/tasks/FindTask",
					"esri/tasks/support/FindParameters",
					"esri/symbols/SimpleLineSymbol",
					"esri/symbols/SimpleFillSymbol",
					"esri/layers/GraphicsLayer", "dojo/domReady!" ],
			function(Map, MapView, FindTask, FindParameters, SimpleLineSymbol,
					SimpleFillSymbol, GraphicsLayer) {
				var findTask = new FindTask(
						{
							url : "http://120.253.8.211:6080/arcgis/rest/services/patrol_region/MapServer"
						});

				// Set parameters to only query the Counties layer by name
				var findParams = new FindParameters({
					layerIds : [ 0 ],
					searchFields : [ "OBJECTID" ]
				});
				findParams.searchText = id;
				findParams.returnGeometry = true;

				// 执行查询对象
				findTask.execute(findParams).then(function(response) {
					var results = response.results;
					if (results.length >= 1) {

						// 获得图形graphic
						var graphic = results[0].feature;

						// 创建面符号
						var fillSymbol = {
							type : "simple-fill", // autocasts as new
							// SimpleFillSymbol()
							color : [ 51, 51, 204, 0.5 ],
							style : "solid",
							outline : { // autocasts as new SimpleLineSymbol()
								color : "white",
								width : 1
							}
						};
						graphic.symbol = fillSymbol;

						regionGeoLayer = new GraphicsLayer({
							opacity : 0.80,
							listMode : "hide"
						});
						map.remove(regionGeoLayer);
						map.add(regionGeoLayer);
						regionGeoLayer.remove(graphic);
						regionGeoLayer.add(graphic);

						view.goTo(graphic.geometry.extent);

						setTimeout(function() {
							view.goTo({
								zoom : view.zoom - 1
							});
						}, 200);
					}
				});
			});
}
/*******************************************************************************
 * 
 * 
 * 
 * 
 * **************************定位事件
 ******************************************************************************/
function locateTo(data) {
	require([ "esri/Map", "esri/views/MapView", "esri/geometry/Point",
			"dojo/domReady!" ], function(Map, MapView, Point) {

		markEventPosition(data);
		// 利用经纬度信息创建巡护人员坐标点
		var pt = new Point(data.longitude, data.latitude);

		view.goTo({
			center : pt,
			zoom : 15
		});

	});
}
/*******************************************************************************
 * 
 * 
 * 
 * 
 * **************************定位sos
 ******************************************************************************/
function locateToSos(data) {
	require([ "esri/Map", "esri/views/MapView", "esri/geometry/Point",
			"dojo/domReady!" ], function(Map, MapView, Point) {

		markSosPosition(data);
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
 * 
 * 标记坐标点
 * 
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
 * 
 * 标记sos
 * 
 * ******************************************************
 */
function markSosPosition(data) {
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
 * 
 * 标记事件
 * 
 * ******************************************************
 */
function markEventPosition(data) {
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
 * 
 * 标记人员
 * 
 * ******************************************************
 */
function markPosition(data) {
	if(oldGraphic){
		view.graphics.remove(oldGraphic);
	}
	if(oldlabelGraphic){
		view.graphics.remove(oldlabelGraphic);
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

		view.graphics.add(graphic);

		var name = data.personName;

		// 标出在线设备的名称
		var text = new TextSymbol({
			text : name,
			font : {
				size : 12,
				family : "sans-serif",
				weight : "bold"
			},
			color : new dojo.Color([ 252, 41, 6, 3 ]),
			xoffset : 30,
			yoffset : 30,
		});
		var labelGraphic = new Graphic(pt, text);

		view.graphics.add(labelGraphic);
		oldlabelGraphic = labelGraphic;
		oldGraphic = graphic;
	});
}