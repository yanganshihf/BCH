/**
 * ******************************************
 * 
 * 地图上事件
 * 
 * ******************************************
 */
// 初始加载
setTimeout(
		function() {
			require(
					[ "esri/Map", "esri/views/MapView", "esri/geometry/Point" ],
					function(Map, MapView, Point) {
						var jingweidu_span = document.createElement("span");
						view.ui.add(jingweidu_span, "bottom-right");
						// 设置经纬度高度
						/**
						 * ******************************************
						 * 
						 * 鼠标移动
						 * 
						 * ******************************************
						 */
						view.on("pointer-move", pointerMoveEventHandler);
						function pointerMoveEventHandler(event) {
							var point = view.toMap({
								x : event.x,
								y : event.y
							});
							if (point == null)
								return;
							var lonlat = mercator2lonlat(point);
							var longitude = lonlat.x;
							var latitude = lonlat.y;
							longtD = parseInt(longitude);
							latD = parseInt(latitude);
							longtM = parseInt((longitude - longtD) * 60);
							latM = parseInt((latitude - latD) * 60);
							longtS = parseInt(((longitude - longtD) * 60 - longtM) * 60);
							latS = parseInt(((latitude - latD) * 60 - latM) * 60);

							// alert("鼠标移动中")
							jingweidu_span.innerHTML = "经度:" + longtD + ' °  '
									+ longtM + ' ′  ' + longtS + ' ″'
									+ "&nbsp;&nbsp;&nbsp;纬度:&nbsp; " + latD
									+ ' °  ' + latM + ' ′  ' + latS ;
						}
					});
		}, 3000);