var timer;
function startPollingPersonLocate(){
	pollingPersonLocate();
	// 设置计时器
	timer = setInterval(pollingPersonLocate,30000);
}

function endPollingPersonLocate(){
	// 设置计时器
	clearInterval(timer);
}


// 轮训人员位置
function pollingPersonLocate(){
	// 刷新在线人员
	parent.refresh_ssjk();
	
}

// 标记人员位置点
function markPersons(dataObj){
	/**
	 * *******************************************************
	 * 
	 * 标记人员
	 * 
	 * ******************************************************
	 */
		
		view.graphics.removeAll();
		require([ "esri/Map", "esri/geometry/Point",
				"esri/symbols/PictureMarkerSymbol", "esri/Graphic",
				"esri/symbols/Font", "esri/symbols/TextSymbol",
				"esri/layers/GraphicsLayer" ], function(Map, Point,
				PictureMarkerSymbol, Graphic, esriFont, TextSymbol, GraphicsLayer) {
			
			var markerSymbol = {
					type : "picture-marker", // autocasts as new
					// PictureMarkerSymbol()
					url : "/ResourceMonitor/images/mark/32/person_navy.png",
					width : 20,
					height : 20,
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
					"personName" : dataObj[i].personName,
					"personSex" : dataObj[i].personSex,
					"mobile" : dataObj[i].mobile,
					"longitude" : dataObj[i].longitude,
					"latitude" : dataObj[i].latitude,
					"xCoor" : dataObj[i].xCoor,
					"yCoor" : dataObj[i].yCoor,
					"projectType" : dataObj[i].projectType,
					"departmentVal" : dataObj[i].departmentVal,
					"regionNum" : dataObj[i].regionNum,
					"regionArea" : dataObj[i].regionArea,
					"regionName" : dataObj[i].regionName,
					"employDate" : dataObj[i].employDate,
					"identifyPhoto" : dataObj[i].identifyPhoto,
					"GRAPHYFLAG" : 2
				};

				// 将点图形添加在图层中
				
				view.graphics.add(graphic);
				
				var name = dataObj[i].personName;
				
				
				// 标出在线设备的名称
				var text = new TextSymbol({
					text : name,
					font : {
						size : 12,
						family : "sans-serif",
						weight : "bold"
					},
					color : new dojo.Color([ 0, 121, 193, 3 ]),
					xoffset : 30,
					yoffset : 30,
				});
				var labelGraphic = new Graphic(pt, text);
				
				view.graphics.add(labelGraphic);
			}
			
			
		});
	
	
}