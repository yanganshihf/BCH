$(document).ready(
		function() {

			setTimeout(function() {

				require([ "esri/Map", "esri/views/MapView", "esri/Graphic",
						"dojo/domReady!" ], function(Map, MapView, Graphic) {
					/**
					 * 
					 * 添加清空地图按鈕
					 * 
					 * 
					 */

					// view.ui.add(ClearMap, "top-left");
					document.getElementById("refreash").addEventListener(
							"click", function() {
								// 清理graphics
								clearMap();
							});
				});
			}, 4500);

		});

// 清空地图方法
function clearMap() {
	require([ "esri/Map", "esri/views/MapView", "esri/Graphic",
			"dojo/domReady!" ], function(Map, MapView, Graphic) {
		map.remove(trackLasyer);
		// 清理graphics
		view.graphics.removeAll();
		
		var elements = document.getElementsByClassName("active");
        for (var i = 0; i < elements.length; i++) {
          elements[i].classList.remove("active");
        }
		view.ui.remove(activeWidget);
		activeWidget.destroy();
		activeWidget = null;
	});
}