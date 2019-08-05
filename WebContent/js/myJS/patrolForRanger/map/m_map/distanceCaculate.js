
var activeWidget = null;
// 初始加载
setTimeout(
		function() {
			 require([
			      "esri/views/MapView",
			      "esri/WebMap",
			      "esri/views/2d/draw/Draw",
			      "esri/Graphic",
			      "esri/geometry/Polygon",
			      "esri/geometry/Polyline",
			      "esri/geometry/geometryEngine"
			    ], function (
			      MapView,
			      WebMap,
			      Draw,
			      Graphic,
			      Polygon,
			      Polyline,
			      geometryEngine
			    ) {
				 
			      
				 draw = new Draw({
		     			view: view
		     	 });
			      // load a webmap
			      /* const webmap = new WebMap({
			        portalItem: {
			          id: "990d0191f2574db495c4304a01c3e65b"
			        }
			      });

			      // create the map view
			      const view = new MapView({
			        container: "viewDiv",
			        map: webmap
			      });*/
			      
			      // add the toolbar for the measurement widgets
			      
			      
			      document.getElementById("distanceButton").addEventListener("click",
			        function () {
			    	  //bufferLayer.removeAll();
			    	  //choosedClassLayer.removeAll();
			    	  view.graphics.removeAll();
			    	  //reNameLayerIndex=-1;
			    	  layer.closeAll();
			    	  var distanceButton = document.getElementById('distanceButton'); 
			          if (!this.classList.contains('active')) {
			        	  setActiveButton(distanceButton);
			        	  var lengthTop = distanceButton.getBoundingClientRect().top;
			        	  var index=layer.open({
			        		   type: 1,
			        		   id:'distanceUnit',
			        		   title:false,
			        		   shade: 0,
			        		   resize:false,
			        		   scrollbar: false,
			        		   shadeClose:false,       		   
			        		   offset: [lengthTop+'px', '51px'],	
							   area:['100px','30px'],
			        		   content:
			        			   '<select id="distanceUnit" name="distanceUnit" style="width:100px;height:30px">'+
										'<option value="meters"  selected="">米</option>'+ 
										'<option value="kilometers">千米</option>'+
			        			   '</select>',
		        			   cancel: function(){ 
		        				   distanceButton.classList.remove("active");
		        				   view.graphics.removeAll();
		        				   draw.reset();
		 						   view.focus();
		        				   layer.close(index);
		        			   }
			        	   });
			        	  	distanceUnitVal=$("#distanceUnit option:selected").val();
			        	  	distanceUnitName=$("#distanceUnit option:selected").text();
			        	    view.graphics.removeAll();
			        	    enablecreatePolyline(draw, view);
		 					$("#distanceUnit").click(function(){
								distanceUnitVal=$("#distanceUnit option:selected").val();
							    distanceUnitName=$("#distanceUnit option:selected").text();
								view.graphics.removeAll();
								enablecreatePolyline(draw, view); 
							});
			          } else {
			        	  distanceButton.classList.remove("active");
       				   	  view.graphics.removeAll();
       				      draw.reset();
						  view.focus();
						  layer.closeAll();
			          }
			        });


			      document.getElementById("areaButton").addEventListener("click",
			        function () {
			    	  view.graphics.removeAll();
			    	  layer.closeAll();
			    	  var areaButton=document.getElementById('areaButton'); 
			          if (!this.classList.contains('active')) { 
			        	setActiveButton(areaButton);
			        	var areaTop = areaButton.getBoundingClientRect().top;
			        	 var index=layer.open({
			        		   type: 1,
			        		   id:'areaUnit',
			        		   title:false,
			        		   shade: 0,
			        		   resize:false,
			        		   scrollbar: false,
			        		   shadeClose:false,
			        		   offset: [areaTop+'px', '51px'],
			        		   area:['100px','30px'],
			        		   content:
			        			   '<select id="areaUnit" name="areaUnit" style="width:100px;height:30px">'+
			        			    '<option value="acres" selected="">亩</option>'+
			        			    '<option value="hectares">公顷</option>'+
			        			    '<option value="square-meters">平方米</option>'+       		  
			        			   '</select>',
		        			   cancel: function(){ 
		        				   areaButton.classList.remove("active");
		 						   view.focus(); 
		        				   view.graphics.removeAll();
		        				   draw.reset();
		        				   layer.closeAll();
		        			   }
			        		});
			        	 	areaUnitVal=$("#areaUnit option:selected").val();	       		
							areaUnitName=$("#areaUnit option:selected").text();
							enableCreatePolyArea(draw, view);
							$("#areaUnit").click(function(){
								areaUnitVal=$("#areaUnit option:selected").val();
								areaUnitName=$("#areaUnit option:selected").text();
								enableCreatePolyArea(draw, view);  
							});
			          } else {
			        	  areaButton.classList.remove("active");
						  view.focus(); 
       				   	  view.graphics.removeAll();
       				   	  draw.reset();
       				   	  layer.close(index);
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
			      
			      function enablecreatePolyline(draw, view) {
						var action = draw.create("polyline");
						action.on("vertex-add", drawPolyline);
						action.on("cursor-update", drawPolyline);
						action.on("vertex-remove", drawPolyline);
						action.on("draw-complete", drawPolyline);
				 }
			      function drawPolyline(evt) {
						var vertices = evt.vertices;
			
						//remove existing graphic
						view.graphics.removeAll();
			
						// 新建一个多边形
						var polygon = createPolygon(vertices);
			
						var polyline = createPolyline(vertices);
			
						// 创建一个表示多边形的新图形，将其添加到视图中
						var graphic = createGraphic(polyline);
						view.graphics.add(graphic);
			
						// 计算多边形的长度
						//meters 米| feet 英尺| kilometers 千米| miles 英里| nautical-miles 海里| yards码
						var lineLength = geometryEngine.geodesicLength(polyline,distanceUnitVal);
						
						// 开始显示多边形的长度
						labelLength(polygon, lineLength);
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
					function labelLength(geom, area) {
						var graphic = new Graphic({
							geometry: geom.centroid,
							symbol: {
								type: "text",
								color: "black",
								/*保留的小数位*/
								text: area.toFixed(3) + distanceUnitName,
								xoffset: 3,
								yoffset: 3,
								font: { // 自动字体
									size: 14,
									family: "宋体"
								}
							}
						});
						view.graphics.add(graphic);
					}
					
					function enableCreatePolyArea(draw, view){		
					    var action = draw.create("polygon");
					    action.on("vertex-add", drawPolyArea);
					    action.on("cursor-update", drawPolyArea);
					    action.on("vertex-remove", drawPolyArea);
					    action.on("draw-complete", drawPolyArea);
					}
					function drawPolyArea(evt) {
						var vertices = evt.vertices;
						// remove existing graphic
						view.graphics.removeAll();
						// 新建一个多边形createPolygon
						var polygon = createPolygon(vertices);
						// create a new graphic representing the polygon, add it to the view
						var graphic = createPolygonGraphic(polygon);
						view.graphics.add(graphic);
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
						// 开始显示多边形的面积
						labelAreas(polygon, area); 
					}
					//距离标签
					function labelAreas(geom, area) {
						var graphic = new Graphic({
							geometry: geom.centroid,
							symbol: {
								type: "text",
								color: "black",
								/*保留的小数位*/
								text: area.toFixed(3) + areaUnitName,
								xoffset: 3,
								yoffset: 3,
								font: { // 自动字体
									size: 14,
									family: "宋体"
								}
							}
						});
						view.graphics.add(graphic);
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
		}, 300);


