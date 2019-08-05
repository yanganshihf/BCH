var regionDraw;

/***********************************************************************
		 * 
		 * 
		 * 
		 * 
		 * **************************绘制管护区域
		 **********************************************************************/		
setTimeout(function() {
	require([ "esri/views/2d/draw/Draw", "esri/Map", "esri/views/MapView",
			"esri/Graphic", "esri/geometry/Polygon",
			"esri/geometry/geometryEngine" ], function(Draw, Map, MapView,
			Graphic, Polygon, geometryEngine) {
		// 新建绘制对象
		regionDraw = new Draw({
			view : view
		});
		/**
		 * 
		 * 
		 * 绘制管护区
		 * 
		 * 
		 * 
		 */
		var drawRegion = document.createElement("img");
		drawRegion.src = "/ResourceMonitor/images/mappage/menuBtn/pen.png";
		drawRegion.id = "regionDr";
		view.ui.add(drawRegion, "top-left");
		
		// 点击执行
		drawRegion.addEventListener("click", function() {
			
			// 判斷按钮点亮状态
			if ($("#regionDr").attr("src").indexOf("light") > -1) {
				// 如果按鈕已經被點亮
				drawRegion.src = "/ResourceMonitor/images/mappage/menuBtn/pen.png";
				regionDraw.reset();
				
			}else{
				// 如果按钮没有被点亮
				drawRegion.src = "/ResourceMonitor/images/mappage/menuBtn/pen_light.png";
				enableCreatePolygon(regionDraw, view);
			}
		});
		
		/***********************************************************************
		 * 
		 * 
		 * 
		 * 
		 * **************************BEGIN管护区域BEGIN
		 **********************************************************************/
		function enableCreatePolygon(regionDraw, view) {
			var background = $("#draw-polygon").css('backgroundImage');

			// create() will return a reference to an instance of
			// PolygonDrawAction
			var action = regionDraw.create("polygon");

			// focus the view to activate keyboard shortcuts for drawing
			// polygons
			view.focus();

			// listen to vertex-add event on the action
			action.on("vertex-add", drawPolygon);

			// listen to cursor-update event on the action
			action.on("cursor-update", drawPolygon);

			// listen to vertex-remove event on the action
			action.on("vertex-remove", drawPolygon);

			// *******************************************
			// listen to draw-complete event on the action
			// *******************************************
			// 获取按钮元素属性
			action.on("draw-complete", polygonDrawComplete);

		}

		/***********************************************************************
		 * 
		 * 
		 * create a polygon using the provided vertices
		 * 
		 **********************************************************************/
		function createPolygon(vertices) {
			return new Polygon({
				rings : vertices,
				spatialReference : view.spatialReference
			});
		}

		/***********************************************************************
		 * 
		 * 
		 * create a new graphic representing the polygon that is being drawn on
		 * the view
		 * 
		 **********************************************************************/
		function createPolygonGraphic(polygon) {
			var graphic = new Graphic({
				geometry : polygon,
				symbol : {
					type : "simple-fill", // autocasts as SimpleFillSymbol
					color : [ 255, 0, 0, 0.3 ],
					style : "solid",
					outline : { // autocasts as SimpleLineSymbol
						color : [ 255, 255, 0 ],
						width : 2
					}
				}
			});
			return graphic;
		}

		/***********************************************************************
		 * 
		 * 
		 * 
		 * 
		 * *********************绘制多边形
		 **********************************************************************/
		function drawPolygon(evt) {
			var vertices = evt.vertices;
			// remove existing graphic
			view.graphics.removeAll();
			// create a new polygon
			var polygon = createPolygon(vertices);
			// create a new graphic representing the polygon, add it to the view
			var graphic = createPolygonGraphic(polygon);
			view.graphics.add(graphic);
		}

		/***********************************************************************
		 * 
		 * 
		 * 
		 * 
		 * *********************完成绘制后方法
		 **********************************************************************/
		function polygonDrawComplete(evt) {

			var vertices = evt.vertices;
			// create a new polygon
			var polygon = createPolygon(vertices);
			// create a new graphic representing the polygon, add it to the view
			var patrolRegionGraphic = createPolygonGraphic(polygon);
			
			if (polygon.isSelfIntersecting) {
				layer.msg("区域不能自相交");
				// 清除
				view.graphics.removeAll();
			}else{
				// layer.msg("222");
				// 弹出添加区域弹窗
				layer.open({
					title : '添加区域',
					type : 2,
					content : '/ResourceMonitor/jsp/patrolForRanger/map/layers/addNewRegion.jsp',
					btn : [ '确定', '取消' ],
					area : ['330px','255px'],
					yes : function(index, layero) {
						// 按钮【按钮一】的回调
						// 获得表单参数
						var body = layer.getChildFrame('body', index);
						var departmentVal = body.find('#department').val();
						var departmentName = body.find('#department').find(
								"option:selected").text();
						var department = body.find('#department').val();
						var regionName = body.find('#regionName').val();
						var regionNum = body.find('#regionNum').val();

						// 设置图形属性
						patrolRegionGraphic.attributes = {
							"RegionNum" : regionNum,
							"RegionName" : regionName,
							"Patrols" : '',
							"Department" : departmentName,
							"Departme_1" : departmentVal,
							"GRAPHYFLAG" : 6
						};
						
						// 向特征图层中添加图形
						var addparams = {
							addFeatures : [ patrolRegionGraphic ]
						};
						var promise = patrolregion.applyEdits(addparams);

						promise.then(function(editsResult) {
							// get the objectId of the newly added feature
							if (editsResult.addFeatureResults.length > 0) {
								view.graphics.removeAll();
								layer.close(index);
							}
						}).otherwise(function(error) {
							layer.msg('管护责任区添加失败！');
						});
					},
					btn2 : function(index, layero) {
						// 按钮【按钮二】的回调
						view.graphics.removeAll();
						// return false 开启该代码可禁止点击该按钮关闭
					}
				});
			}
		}
	});

}, 3000);

