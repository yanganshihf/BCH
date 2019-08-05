var playBackTimer;
var TrackCollection = null;// 轨迹回放参数
var index;// 轨迹回放参数
var oneRoutePointsColl = new Array();



/*******************************************************************************
 * 
 * 
 * 
 * 
 * **************************轨迹回放
 ******************************************************************************/
function replayTrack(patrolDate, mobile) {
	trackLasyer.removeAll();
	oneRoutePointsColl = [];
	$.ajax({
				url : localhostPath + projectName + '/realtime/queryTrail', // 请求的url地址
				dataType : "json", // 返回格式为json
				async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
				data : {
					patrolDate : patrolDate,
					mobile : mobile
				}, // 参数值
				type : "POST", // 请求方式
				beforeSend : function() {
					// 请求前的处理
				},
				success : function(req) {
					// 请求成功时处理
					require(
							[ "esri/Map", "esri/symbols/SimpleLineSymbol",
									"esri/symbols/PictureMarkerSymbol",
									"esri/Color", "esri/geometry/Point",
									"esri/geometry/Polyline", "esri/Graphic",
									"esri/layers/GraphicsLayer",
									"esri/views/MapView", "dojo/domReady!" ],
							function(Map, SimpleLineSymbol,
									PictureMarkerSymbol, Color, Point,
									Polyline, Graphic, GraphicsLayer, MapView) {

								// 清空之前的
								view.graphics.removeAll();
								trackLasyer.removeAll();

								// 
								var symbol = new SimpleLineSymbol(
										SimpleLineSymbol.STYLE_SOLID,
										new Color([ 0, 255, 255 ]), 4);
								var Pointsymbol = new PictureMarkerSymbol(
										{
											url : "/ResourceMonitor/images/mark/32/startPoint.png",
											width : 24,
											height : 24,
											xoffset : 0,
											yoffset : 12
										});
								var endPointsymbol = new PictureMarkerSymbol({
									url : "/ResourceMonitor/images/mark/32/endPoint.png",
									width : 24,
									height : 24,
									xoffset : 0,
									yoffset : 12
								});

								// 轨迹绘制
								var maxX;
								var maxY;
								var minX;
								var minY;

								var trailLen = req.rows;
								var markGraphics = new Array();

								$
										.each(
												trailLen,
												function(idx, rf) {

													var pointCol = rf.trailPoint
															.split(',');
													//
													for (var i = 0; i < pointCol.length; i++) {
														var pointColEle = pointCol[i];
														oneRoutePointsColl
																.push(pointColEle);
													}
													var pointsCol = rf.trailPoint
															.split(',');

													var pointsColLength = pointsCol.length;
													// 获取及绘制第一个点
													var firstPoint = pointsCol[0]
															.split('-');
													maxX = firstPoint[0];
													maxY = firstPoint[1];
													minX = firstPoint[0];
													minY = firstPoint[1];

													// 如果亮点之间距离大于500m,则视为信号中断
													// if((max_x-min_x)*(max_x-min_x)+(max_y-min_y)*(max_y-min_y)<0.004*0.004){

													var firstMarkPoint = new Point(
															firstPoint[0],
															firstPoint[1]);
													var firstMarkGraphic = new Graphic(
															firstMarkPoint,
															Pointsymbol);
													firstMarkGraphic.attributes = {
														"Num" : '-1'
													};

													// 添加第一个点
													view.graphics
															.add(firstMarkGraphic);

													markGraphics
															.push(firstMarkGraphic);
													// 获取及绘制第2~N-1个点
													for (var i = 1; i < pointsColLength; i++) {
														var point = pointsCol[i]
																.split('-');
														var middlePoint = new Point(
																point[0],
																point[1]);
														var point_before = pointsCol[i - 1]
																.split('-');
														var middlePoint_before = new Point(
																point_before[0],
																point_before[1]);
														var middlePolyline = new Polyline();
														middlePolyline
																.addPath([
																		firstMarkPoint,
																		middlePoint ]);

														if (point[0] > maxX)
															maxX = point[0];
														if (point[1] > maxY)
															maxY = point[1];
														if (point[0] < minX)
															minX = point[0];
														if (point[1] < minY)
															minY = point[1];

														var this_x = parseFloat(point[0]);
														var this_y = parseFloat(point[1]);
														var before_x = parseFloat(point_before[0]);
														var before_y = parseFloat(point_before[1]);

														var pointlength = (this_x - before_x)
																* (this_x - before_x)
																+ (this_y - before_y)
																* (this_y - before_y);
														/*
														 * if (pointlength <
														 * 0.00001) {
														 */
														var middleGraphic = new Graphic(
																middlePolyline,
																symbol);
														var middlePointGraphic = new Graphic(
																middlePolyline,
																symbol);
														middlePointGraphic.geometry = middlePoint;
														var middlePointsymbol = {
														  type: "simple-marker", 
														  style: "circle",
														  color: [0, 255, 255,0],
														  size: "40px", 
														  outline: { 
														    color: [0, 255, 255,0],
														    width: 0  
														  }
														};
														middlePointGraphic.symbol = middlePointsymbol;
														
														
														var pointnum = i;
														var n = Math.floor(i/4);
														
														var timeStr = rf.startTime;
														var timeStrArr = timeStr.split(":");
														
														
														// 设置时间
														if((parseInt(timeStrArr[1])+n)<60){
															
															if((parseInt(timeStrArr[1])+n)<10){
																timeStr = timeStrArr[0]+":0"+(parseInt(timeStrArr[1])+n);
															}else{
																timeStr = timeStrArr[0]+":"+(parseInt(timeStrArr[1])+n);
															}
															
														}else{
															if(timeStrArr[1].length <2){
																timeStr = parseInt(timeStrArr[0])+Math.ceil(n/60)+":0"+timeStrArr[1];
															}else{
																timeStr = parseInt(timeStrArr[0])+Math.ceil(n/60)+":"+timeStrArr[1];
															}
															
														}
														
														
														var startTime = rf.patrolDate+" "+timeStr; 
														
														// debugger;
														middlePointGraphic.attributes={
															
															time:startTime,
															graphicFlag:10
														}
														
														eventLayer.add(middlePointGraphic);
														// 添加中间点
														view.graphics.add(middleGraphic);

														markGraphics.push(middleGraphic);
														firstMarkPoint = middlePoint;
														/*
														 * } else { var
														 * firstMarkGraphic =
														 * new Graphic(
														 * middlePoint,
														 * Pointsymbol);
														 * userPositionLayer
														 * .add(firstMarkGraphic);
														 * var lastMarkGraphic =
														 * new Graphic(
														 * middlePoint_before,
														 * endPointsymbol);
														 * userPositionLayer
														 * .add(lastMarkGraphic); }
														 */

														firstMarkPoint = middlePoint;
													}

													var lastMarkGraphic = new Graphic(
															firstMarkPoint,
															endPointsymbol);
													lastMarkGraphic.attributes = {
														"Num" : '-1'
													};
													// 添加终点
													view.graphics
															.add(lastMarkGraphic);
													markGraphics
															.push(lastMarkGraphic);

													// 添加图层
													view.goTo(markGraphics);

													/*setTimeout(
															function() {
																view
																		.goTo({
																			zoom : view.zoom - 1
																		});
															}, 500);*/

													//
													//
													// 标记事件
													//
													//
													$.ajax({
														url : localhostPath + projectName + '/event/queryOnedayEvents',// 后台接口路径
														type : 'POST',// 请求类型get或者post
														dataType : 'json',// 返回的数据类型
														data : {
															'mobile' : mobile,
															'patrolDate' : patrolDate
														},// 请求的时候向后台发送的参数
														success : function(data) {
															// 这里的data就是查询到的数据，然后在这里做操作，把data里面的值放到前台去渲染
															var dataObj = eval(data.rows);
															
															$.each(dataObj,function(idx,item) {
																// 利用经纬度信息创建事件坐标点
																var pt = new Point(item.longitude,item.latitude);
																var markerSymbol = new PictureMarkerSymbol({
																	url : "/ResourceMonitor/images/mark/32/fire.png",
																	width : 18,
																	height : 23
																});

																// 利用经纬度及符号画出巡护人员点
																var graphic = new Graphic(pt,markerSymbol);
																graphic.attributes = {
																	"id" : item.id,
																	"GRAPHYFLAG" : 5
																};
																// 将点图形添加在图层中
																	view.graphics.add(graphic);

																	});
																}
															});
													step = 0;
													trackCount = oneRoutePointsColl.length;

													window.clearInterval(playBackTimer);
													replayRunTrack();
													playBackTimer = window.setInterval("replayRunTrack()",1000);
												});

							});
				},
				complete : function() {
					// 请求完成的处理
				},
				error : function() {
					// 请求出错处理
				}
			});
}

function replayRunTrack() {
	require([ "esri/Map", "esri/views/MapView",
			"esri/symbols/PictureMarkerSymbol", "esri/geometry/Point",
			"esri/Graphic", "esri/layers/GraphicsLayer", "dojo/domReady!" ],
			function(Map, MapView, PictureMarkerSymbol, Point, Graphic,
					GraphicsLayer) {

		
				trackLasyer.removeAll();
				
				if (step < trackCount) {
					var positionpp = oneRoutePointsColl[step];
					var position = positionpp.split('-');
					var x = position[0];
					var y = position[1];
					var tpoint = new Point(x, y);
					var Pointsymbol = new PictureMarkerSymbol({
						url : "/ResourceMonitor/images/mark/32/person-location.png",
						width : 24,
						height : 18,
						xoffset : 0,
						yoffset : 12
					});
					var graphic = new Graphic(tpoint, Pointsymbol);
					trackLasyer.add(graphic);
				} else {
					window.clearInterval(playBackTimer);
					trackLasyer.removeAll();
				}
				step++;
			});
}
