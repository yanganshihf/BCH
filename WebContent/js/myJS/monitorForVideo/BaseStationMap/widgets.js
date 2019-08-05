//**********计算绘制图形的长度或者面积***************
//type(distance:长度、area:面积)
function disAreaMeasure(view,draw,type){
	var title = "";
	if(type=="distance"){
		title="距离量算";
		/*if(is3D){
			$("#toolShowDiv").css("left","258px");
		}else{
			$("#toolShowDiv").css("left","331px");
		}*/
		
	}else{
		title="面积量算";
	}
	if(is3D){
		$("#toolShowDiv").css("left","299px");
	}else{
		$("#toolShowDiv").css("left","373px");
	}
	var html ='<div style="padding-left:20px;border-radius:2px 2px 0 0;background-color:#F8F8F8;overflow:hidden;color:#333;line-height:32px;border-bottom:1px solid #eee;font-size:14px;">'+title
	   +'<img id="closeButton" src="/ResourceMonitor/images/indexpage/hk_quit.png" height="16" width="16" style="margin-left:100px;cursor:pointer;"/></div>'
	   +'<div id="'+type+'Span" style="width:120px;height:25px;float:left;font-size:16px;padding-top:5px;padding-left:20px">0.000</div>'
	   +'<select id="'+type+'Unit"  style="width:80px;height:30px;float:left;">';
	if(type=="distance"){
		title="距离量算";
		html+='<option value="kilometers" selected="">千米</option>';
		html+='<option value="meters">米</option></select>' 
		document.getElementById("length-tool").className ="icon-length2";
	}else{
		title="面积量算";
		html+='<option value="hectares"  selected="">公顷</option>';
		html+='<option value="square-meters">亩</option></select>' 
		document.getElementById("area-tool").className ="icon-area2";
	}
	var toolShowDiv=document.getElementById("toolShowDiv");
	toolShowDiv.style.display = "inline";
	toolShowDiv.innerHTML=html;
    $("#closeButton").click(function (){
    	if(type=="distance"){
    		document.getElementById("length-tool").className ="icon-length";
    	}else{
    		document.getElementById("area-tool").className ="icon-area";
    	}
  		draw.reset();
  		toolShowDiv.style.display = "none";
  		view.graphics.removeAll();
    });
    var unitVal=$("#"+type+"Unit option:selected").val();
    var unitName=$("#"+type+"Unit option:selected").text();
    calculateDisArea(draw, view, unitName, unitVal,type);
    $("#"+type+"Unit").click(function() {
        var unitVal=$("#"+type+"Unit option:selected").val();
        var unitName=$("#"+type+"Unit option:selected").text();				
   		calculateDisArea(draw, view, unitName, unitVal,type);
    });	
}
function calculateDisArea(draw, view, unitName, unitVal,type) {
	enablecreatePoly(draw, view);
	function enablecreatePoly(draw, view) {
		var action=null;
		if(type=="distance"){
			action = draw.create("polyline");
		}else{
			action = draw.create("polygon");
		}
		action.on("vertex-add", drawPoly);
		action.on("cursor-update",drawPoly);
		action.on("vertex-remove",drawPoly);
		action.on("draw-complete",drawPoly);
	}

	function drawPoly(evt) {
		require([ "esri/geometry/geometryEngine" ], function(geometryEngine) {
			var vertices = evt.vertices;
			view.graphics.removeAll();
			var sumVal=0;
			if(type=="distance"){
				var polyline = createPolyline(vertices);
				var graphic = createGraphic(polyline);
				view.graphics.add(graphic);
				var lineLength = geometryEngine.geodesicLength(polyline,unitVal);
				$("#"+type+"Span").html(lineLength.toFixed(3));
			}else{
				var polygon = createPolygon(vertices);
				var graphic = createGraphic(polygon);
				view.graphics.add(graphic);
				var area = geometryEngine.geodesicArea(polygon, unitVal);
				if (area < 0) {
					var simplifiedPolygon = geometryEngine.simplify(polygon);
					if (simplifiedPolygon) {
						area = geometryEngine.geodesicArea(simplifiedPolygon,unitVal);
					}
				}
				if (unitVal == "square-meters") {
					area *= 0.0015;
				}
				$("#"+type+"Span").html(area.toFixed(3));
			}
		});
	}

	// 使用所提供的顶点创建折线
	function createPolyline(vertices) {
		var polyline = null;
		require([ "esri/geometry/Polyline" ], function(Polyline) {
			polyline = new Polyline({
				paths : vertices,
				spatialReference : view.spatialReference
			});
		});
		return polyline;
	}
	function createPolygon(vertices) {
		var polygon = null;
		require([ "esri/geometry/Polygon" ], function(Polygon) {
			polygon = new Polygon({
				rings : vertices,
				spatialReference : view.spatialReference
			});
		});
		return polygon;
	}
	// 创建一个新的图形，表示在视图上绘制的多边形。
	function createGraphic(geometry) {
		var graphic = null;
		require([ "esri/Graphic" ], function(Graphic) {
			var symbol=null;
			if(type=="distance"){
				symbol= {
					type : "simple-line", 
					color : [ 255, 255, 0 ],
					width : 4,
					cap : "round",
					join : "round"
				}
			}else{
			    symbol={
					type : "simple-fill",
					color : [ 255, 0, 0, 0.3 ],
					style : "solid",
					outline : {
						color : [ 255, 255, 0 ],
						width : 2
					}
				}	
			}

			graphic = new Graphic({
				geometry : geometry,
				symbol :symbol
			});
		});
		return graphic;
	}
}
