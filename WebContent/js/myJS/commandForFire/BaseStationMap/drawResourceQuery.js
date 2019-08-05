 function drawResourceQuery(type){
   	 require([
	      "esri/Map",
	      "esri/views/MapView",
	      "esri/views/2d/draw/Draw",
	      "esri/Graphic",
	      "esri/geometry/Polyline",
	      "esri/geometry/Polygon",
	      "esri/tasks/support/Query",
	      "esri/geometry/geometryEngine",
	      "esri/geometry/Point",
	      "esri/geometry/Circle",
	      "dojo/domReady!"
	    ], function(
	      Map, MapView,Draw, Graphic,Polyline,Polygon,Query,geometryEngine,Point,Circle
	    ){
		     draw = new Draw({
    		   view: view
    		 });
		     document.body.style.cursor='crosshair';
		     enableCreatePolygon(draw, view);
    		 function enableCreatePolygon(draw, view) {
    		   var action = null;
    		   if(type=='yuan'){
    			   action = draw.create("circle", {mode: "click"});
    		   }else if(type=='juxing'){
    			   action = draw.create("rectangle",{mode: "click"});
    		   }else{
    			   action = draw.create("polygon");
    		   }
			   view.focus();
			   if(type=='zidingyi'){
    			   action.on("vertex-add", function (evt) {
      			     createPolygonGraphic(evt.vertices);
      			   });
			   }
  			   action.on("vertex-remove", function (evt) {
  			     createPolygonGraphic(evt.vertices);
  			   });
  			   action.on("cursor-update", function (evt) {
  			     createPolygonGraphic(evt.vertices);
  			   });

  			   action.on("draw-complete", function (evt) {
  			     createPolygonGraphicComplete(evt.vertices);
  			   });  

			 }

			 function createPolygonGraphic(vertices){
			   view.graphics.removeAll();
			   var polygon = createPolygon(vertices);
			   if(!polygon){
				   return;
			   }
			   var graphic = new Graphic({
			     geometry: polygon,
			     symbol:{
						type : "simple-fill",
						color : [ 255, 0, 0, 0.3 ],
						style : "solid",
						outline : {
							color : [ 255, 255, 0 ],
							width : 2
						}
					}
			   });
			   view.graphics.add(graphic);
			 }
             function createPolygonGraphicComplete(vertices) {
            	 document.body.style.cursor='default';
                 view.graphics.removeAll();
                 var polygon = createPolygon(vertices);
  			     if(!polygon){
				     return;
			     }
      			 var graphic = new Graphic({
      			    geometry: polygon,
      			    symbol:{
      					type : "simple-fill",
      					color : [ 255, 0, 0, 0.3 ],
      					style : "solid",
      					outline : {
      						color : [ 255, 255, 0 ],
      						width : 2
      					}
      				}
      			 });
      			 drawResourceLayer.removeAll();
      			 drawResourceLayer.add(graphic);
             } 

             // 使用所提供的顶点创建多边形
             function createPolygon(vertices) {
    		   if(type=='yuan'){
                   //少于一个点无法展示圆
                   if(vertices.length<2){
                       return
                   }
                   //生成绘制的图形,两点画圆
                   var center=new Point({
                       x:vertices[0][0],
                       y:vertices[0][1],
                       spatialReference: view.spatialReference
                   });
                   var dis=center.distance(new Point({
                       x:vertices[1][0],
                       y:vertices[1][1],
                       spatialReference: view.spatialReference
                   }));
                   return new Circle({
                       center:center,
                       radius:dis,
                       spatialReference: view.spatialReference
                   })
    		   }else if(type=='juxing'){
    	            //两点画矩形
    	            if(vertices.length<2){
    	                return
    	            }
    	            var rings=[vertices[0],[vertices[0][0],vertices[1][1]],vertices[1],[vertices[1][0],vertices[0][1]]];
    	            return new Polygon({
                        rings: [rings],
                        spatialReference: view.spatialReference
                    })
    		   }else{
                   return new Polygon({
                       rings : vertices,
                       spatialReference : view.spatialReference
                   });
    		   }
             }
                                               
   });
 }