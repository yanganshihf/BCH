$(document).ready(
		function() {
			require([ "esri/Map", "esri/views/MapView", "esri/widgets/Compass",
					"esri/widgets/ScaleBar", "dojo/domReady!" ], function(Map,
					MapView, Compass, ScaleBar) {
				
				/**
				 * 
				 * 指南针 罗盘
				 * 
				 * 
				 * 
				 * 
				 * 
				 */
				var compass = new Compass({
					view : view
				});
				// adds the compass to the top left corner of
				// the MapView
				
				// 比例尺
				scalebar = new ScaleBar({
					view : view,
					unit : "metric",
					style : "line",
				});
				view.ui.add(scalebar, {
					position : "bottom-left"
				});

				/**
				 * 
				 * 全图按钮
				 * 
				 * 
				 * 
				 * 
				 * 
				 * 
				 */
				
				document.getElementById("initMap").addEventListener("click", function() {
					
					// 清理graphics
					view.graphics.removeAll();
					// 移动到初始位置
					view.goTo({
						center : [ 106.239722, 36.1158 ],
						zoom : 10,
						tilt : 45,
						heading : 0
					});
				});
				$("#hiddenDiv").css("display","none");
				view.ui.add(compass, "top-left");
				view.ui.add("topbar_initMap", "top-left");
				view.ui.add("topbar_loacte", "top-left");
				view.ui.add("topbar_disCal", "top-left");
				view.ui.add("topbar_areaCal", "top-left");
				view.ui.add("topbar_Ikey", "top-left");
				view.ui.add("topbar_mianjichaxun", "top-left");
				view.ui.add("topbar_mapExport", "top-left");
				/*view.ui.add("topbar_uploadLocations", "top-left");*/
				view.ui.add("topbar_refreash", "top-left");

			});
		});