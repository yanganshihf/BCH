/*var activeWidget = null;
// 初始加载
setTimeout(
		function() {
			 require([
			      "esri/views/MapView",
			      "esri/WebMap",
			      "esri/widgets/DistanceMeasurement2D",
			      "esri/widgets/AreaMeasurement2D"
			    ], function (
			      MapView,
			      WebMap,
			      DistanceMeasurement2D,
			      AreaMeasurement2D
			    ) {
				 
			      

			      // load a webmap
			       const webmap = new WebMap({
			        portalItem: {
			          id: "990d0191f2574db495c4304a01c3e65b"
			        }
			      });

			      // create the map view
			      const view = new MapView({
			        container: "viewDiv",
			        map: webmap
			      });
			      
			      // add the toolbar for the measurement widgets
			      
			      
			      document.getElementById("distanceButton").addEventListener("click",
			        function () {
			          setActiveWidget(null);
			          if (!this.classList.contains('active')) {
			            setActiveWidget('distance');
			          } else {
			            setActiveButton(null);
			          }
			        });

			      document.getElementById("areaButton").addEventListener("click",
			        function () {
			          setActiveWidget(null);
			          if (!this.classList.contains('active')) { 
			            setActiveWidget('area');
			          } else {
			            setActiveButton(null);
			          }
			        });
			      
			      document.getElementById("IkeyButton").addEventListener("click",
					function () {
					   if (!this.classList.contains('active')) { 
					    	document.getElementById('IkeyButton').classList.add("active");
					    	view.focus();
					    	IkeyFlag = 1;
						} else {
						     document.getElementById('IkeyButton').classList.remove("active");
						     view.focus();
						     IkeyFlag = 0;
						}
					    	  	
				 });

			      function setActiveWidget(type) {
			        switch (type) {
			          case "distance":
			            activeWidget = new DistanceMeasurement2D({
			              view: view,
			              unitOptions: ["meters","kilometers"]
			            });

			            // skip the initial 'new measurement' button kilometers
			            activeWidget.viewModel.newMeasurement();
			            
			            view.ui.add(activeWidget, "top-right");
			            setActiveButton(document.getElementById('distanceButton'));
			            break;
			          case "area":
			            activeWidget = new AreaMeasurement2D({
			              view: view,
			              unitOptions: ["square-meters","square-kilometers","ares"]
			            });
			            
			            
			            // skip the initial 'new measurement' button
			            activeWidget.viewModel.newMeasurement();
			            view.ui.add(activeWidget, "top-right");
			            setActiveButton(document.getElementById('areaButton'));
			            break;
			          case null:
			            if (activeWidget) {
			              view.ui.remove(activeWidget);
			              activeWidget.destroy();
			              activeWidget = null;
			            }
			            break;
			        }
			      }

			      function setActiveButton(selectedButton) {
			        // focus the view to activate keyboard shortcuts for sketching
			        view.focus();
			        var elements = document.getElementsByClassName("active");
			        for (var i = 0; i < elements.length; i++) {
			        	if(elements[i].id != 'IkeyButton'){
			        		elements[i].classList.remove("active");
			        	}
			        }
			        if (selectedButton) {
			          selectedButton.classList.add("active");
			        }
			      }

			    });
		}, 1000);
*/





















































var drawArea;

setTimeout(function() {
	require([ "esri/views/2d/draw/Draw", "esri/Map", "esri/views/MapView",
			"esri/Graphic", "esri/geometry/Polygon",
			"esri/geometry/geometryEngine" ], function(Draw, Map, MapView,
			Graphic, Polygon, geometryEngine) {
		
		// 添加绘制对象
		drawArea = new Draw({
			view : view
		});
		/**
		 * 长度量算
		 * 
		 * 
		 * 
		 * 
		 * 
		 * 
		 * 
		 */
		var areaCaculate = document.createElement("img");
		areaCaculate.src = "/ResourceMonitor/images/mappage/menuBtn/areaCaculate.png";
		
		areaCaculate.id = "areaDr";
		
		view.ui.add(areaCaculate, "top-left");
		areaCaculate.addEventListener("click", function() {
			
			view.graphics.removeAll();
			
			// 判斷按钮点亮状态
			if ($("#areaDr").attr("src").indexOf("light") > -1) {
				// 如果按鈕已經被點亮
				areaCaculate.src = "/ResourceMonitor/images/mappage/menuBtn/areaCaculate.png";
				drawArea.reset();
			}else{
				// 如果按钮未点亮
				areaCaculate.src = "/ResourceMonitor/images/mappage/menuBtn/areaCaculate_light.png";
				// create() will return a
				// reference to an instance
				// of PolygonDrawAction
				var action = drawArea.create("polygon");

				// focus the view to
				// activate keyboard
				// shortcuts for drawing
				// polygons
				view.focus();

				// listen polygonDrawAction
				// events to give immediate
				// visual feedback
				// to users as the polygon
				// is being drawn on the
				// view.
				action.on("vertex-add", drawPolygon);
				action.on("cursor-update", drawPolygon);
				action.on("vertex-remove", drawPolygon);
				action.on("redo", drawPolygon);
				action.on("undo", drawPolygon);
				action.on("draw-complete", drawPolygon);
			}
			

		});

		// this function is called from the polygon draw
		// action events
		// to provide a visual feedback to users as
		// they are drawing a polygon
		function drawPolygon(event) {
			var vertices = event.vertices;

			// remove existing graphic
			view.graphics.removeAll();

			// create a new polygon
			var polygon = new Polygon({
				rings : vertices,
				spatialReference : view.spatialReference
			});

			// create a new graphic representing the
			// polygon, add it to the view
			var graphic = new Graphic({
				geometry : polygon,
				symbol : {
					type : "simple-fill", // autocasts
					// as
					// SimpleFillSymbol
					color : [ 255, 0, 0, 0.3 ],
					style : "solid",
					outline : { // autocasts as
						// SimpleLineSymbol
						color : [ 255, 255, 0 ],
						width : 2
					}
				}
			});

			view.graphics.add(graphic);

			// calculate the area of the polygon
			var area = geometryEngine.geodesicArea(polygon, "acres");
			if (area < 0) {
				// simplify the polygon if needed and
				// calculate the area again
				var simplifiedPolygon = geometryEngine.simplify(polygon);
				if (simplifiedPolygon) {
					area = geometryEngine.geodesicArea(simplifiedPolygon,
							"acres");
				}
			}
			// start displaying the area of the polygon
			labelAreas(polygon, area);
		}

		// Label polyon with its area
		function labelAreas(geom, area) {
			var graphic = new Graphic({
				geometry : geom.centroid,
				symbol : {
					type : "text",
					color : [ 255, 255, 0 ],
					haloColor : "black",
					haloSize : "1px",
					text : area.toFixed(2) + " 亩",
					xoffset : 3,
					yoffset : 3,
					font : { // autocast as Font
						size : 14,
						family : "sans-serif"
					}
				}
			});
			view.graphics.add(graphic);
		}
		
	});
}, 3000);