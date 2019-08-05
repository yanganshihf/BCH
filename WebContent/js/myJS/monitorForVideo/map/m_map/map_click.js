/**
 * ******************************************
 * 
 * 地图上事件
 * 
 * ******************************************
 */
var oldGraphic;
var oldlabelGraphic;
// 初始加载
setTimeout(
		function() {
			var haeExacuteQuery;
			require(
					[ "esri/Map", "esri/views/MapView", "esri/tasks/QueryTask",
							"esri/tasks/support/Query", "esri/Graphic", "esri/geometry/Point",
								"esri/symbols/PictureMarkerSymbol", 
								"esri/symbols/Font", "esri/symbols/TextSymbol",
								"esri/layers/GraphicsLayer" ],
					function(Map, MapView, QueryTask, Query, Graphic, Point,
							PictureMarkerSymbol, esriFont, TextSymbol, GraphicsLayer) {
						/**
						 * ******************************************
						 * 
						 * 鼠标单击
						 * 
						 * ******************************************
						 */
						view.on("click", pointerClickHandler);
						function pointerClickHandler(event) {
							
							haeExacuteQuery = 0;

							/**
							 * ******************************************
							 * 
							 * 鼠标单击事件
							 * 
							 * ******************************************
							 */
							view.hitTest(event).then(function(response) {
								/* code goes here */
								var graphic = response.results[0].graphic;
								var attributes = graphic.attributes;
								
								switch (attributes.GRAPHYFLAG) {
								// 当点击事件时
								case 4:
									haeExacuteQuery = 1;
									if(IkeyFlag){
										parent.openLayer_event(attributes);
									}else{
										layer.msg("请打开 i键查询！")
									}
									break;
								// 当点击人员时
								case 2:
									haeExacuteQuery = 1;
									if(IkeyFlag){
										if(oldGraphic){
											view.graphics.remove(oldGraphic);
										}
										if(oldlabelGraphic){
											view.graphics.remove(oldlabelGraphic);
										}
										var markerSymbol = {
												type : "picture-marker", // autocasts as new
												// PictureMarkerSymbol()
												url : "/ResourceMonitor/images/mark/32/person_red.png",
												width : 20,
												height : 20,
												xoffset : 0,
												yoffset : 8
										};
										var pt = new Point(attributes.longitude, attributes.latitude);
										var Newgraphic = new Graphic({
											geometry : pt,
											symbol : markerSymbol
										});
										Newgraphic.attributes = attributes;
										view.graphics.add(Newgraphic);
										var name = attributes.personName;
										var text = new TextSymbol({
											text : name,
											font : {
												size : 12,
												family : "sans-serif",
												weight : "bold"
											},
											color : new dojo.Color([ 216, 30, 6, 3 ]),
											xoffset : 30,
											yoffset : 30,
										});
										var NewlabelGraphic = new Graphic(pt, text);
										view.graphics.add(NewlabelGraphic);
										oldlabelGraphic = NewlabelGraphic;
										oldGraphic = Newgraphic;
										parent.openLayer(attributes);
									}else{
										layer.msg("请打开i键查询！")
									}
									break;
								default:
									break;
								}
							});

							if (haeExacuteQuery == 0
									&& getCookieValue('view_xb')
									&& getCookieValue('view_base')){
								if(IkeyFlag){

									/**
									 * ******************************************
									 * 
									 * 执行空间查询小班
									 * 
									 * ******************************************
									 */
									var query = new Query();
									query.returnGeometry = true;
									query.geometry = event.mapPoint; // mapPoint
									// obtained from
									// view-click
									query.distance = 1;
									query.outFields = [ "*" ];
									query.units = "meters";
									query.spatialRelationship = "intersects";

									var queryXBTask = new QueryTask(
											{
												url : "http://39.104.66.222:6080/arcgis/rest/services/yzGYL0828/MapServer/0"
											});

									queryXBTask
											.execute(query)
											.then(
													function(result) {
														if (result.features.length > 0) {
															var graphic = result.features[0];
															var attributes = graphic.attributes;
															// 显示弹窗
															layer
																	.open({
																		type : 2,
																		content : '../layers/message_xiaoBan.jsp',
																		title : '小班详情',
																		offset : 'r',
																		id : 'xiaoBanDetail',
																		resize : false,
																		area : [
																				'240px',
																				'420px' ],
																		success : function(
																				layero,
																				index) {
																			var body = layer
																					.getChildFrame(
																							'body',
																							index);
																			body
																					.find(
																							'#SHENG')
																					.html(
																							attributes.SHENG);
																			body
																					.find(
																							'#XIAN')
																					.html(
																							attributes.XIAN);
																			body
																					.find(
																							'#XIANG')
																					.html(
																							attributes.乡镇);
																			body
																					.find(
																							'#CUN')
																					.html(
																							attributes.行政村);
																			body
																					.find(
																							'#DI_LEI')
																					.html(
																							attributes.DI_LEI);

																			body
																					.find(
																							'#DI_MAO')
																					.html(
																							attributes.DI_MAO);
																			body
																					.find(
																							'#GH_BHDJ')
																					.html(
																							attributes.保护等级);
																			body
																					.find(
																							'#LD_QS')
																					.html(
																							attributes.权属);
																			body
																					.find(
																							'#PO_DU')
																					.html(
																							attributes.PO_DU);
																			body
																					.find(
																							'#PO_WEI')
																					.html(
																							attributes.PO_WEI);

																			body
																					.find(
																							'#PO_XIANG')
																					.html(
																							attributes.PO_XIANG);
																		}
																	});
														}
													});
								}else{
									layer.msg("请打开i键查询！")
								}
							} 

						}

						/**
						 * ******************************************
						 * 
						 * 鼠标双击
						 * 
						 * ******************************************
						 */

						// Get the screen point from the view's click event
						view.on("double-click", doubleClickEvnetHandler);
						function doubleClickEvnetHandler(event) {

							event.stopPropagation();

							var query = new Query();
							query.returnGeometry = true;
							query.geometry = event.mapPoint; // mapPoint
							// obtained from
							// view-click
							query.distance = 1;
							query.outFields = [ "*" ];
							query.units = "meters";
							query.spatialRelationship = "intersects";

							var queryGHQTask = new QueryTask(
									{
										url : "http://120.253.8.211:6080/arcgis/rest/services/patrol_region/FeatureServer/0"
									});

							queryGHQTask
									.execute(query)
									.then(
											function(result) {

												if (result.features.length > 0) {

													var graphic = result.features[0];
													if (graphic == null)
														return;

													

													var attributes = graphic.attributes;

													var OBJECTID = attributes.OBJECTID;

													// 弹出添加区域弹窗
													layer
															.open({
																title : '修改区域',
																type : 2,
																area : ['335px','260px'],
																content : '../layers/editRegion.jsp',
																btn : [ '确定',
																		'取消',
																		'删除' ],
																yes : function(
																		index,
																		layero) {
																	// 按钮【按钮一】的回调
																	var idFieldName = "RegionNum";
																	var nameFieldName = "RegionName";
																	var departmentFieldName = "Department";
																	// departmentValFieldName="DepartmentVal";
																	var departmentValFieldName = "Departme_1";
																	var body = layer
																			.getChildFrame(
																					'body',
																					index); // 巧妙的地方在这里哦
																	var nameVal = body
																			.contents()
																			.find(
																					"#regionName")
																			.val();
																	var idVal = body
																			.contents()
																			.find(
																					"#regionNum")
																			.val();
																	var departmentVal = body
																			.contents()
																			.find(
																					"#departmentNameSelect")
																			.val();// val
																					// 是顺序
																	var department = body
																			.contents()
																			.find(
																					"#departmentNameSelect")
																			.find(
																					"option:selected")
																			.text();// val
																					// 是顺序

																	graphic.attributes[idFieldName] = idVal;
																	graphic.attributes[nameFieldName] = nameVal;
																	graphic.attributes[departmentFieldName] = department;
																	graphic.attributes[departmentValFieldName] = departmentVal;
																	// 
																	var updateParams = {
																		updateFeatures : [ graphic ]
																	};
																	var promise = patrolregion
																			.applyEdits(updateParams);
																	promise
																			.then(
																					function(
																							editsResult) {
																						// get
																						// the
																						// objectId
																						// of
																						// the
																						// newly
																						// added
																						// feature
																						layer
																								.close(index);
																					})
																			.otherwise(
																					function(
																							error) {
																						// window.parent.showInfo(
																						// error.code+':'+error.message);
																						layer
																								.msg("管护区域编辑失败");
																					});
																},
																btn2 : function(
																		index,
																		layero) {
																	// 按钮【按钮二】的回调
																	view.graphics
																			.removeAll();
																	// return
																	// false
																	// 开启该代码可禁止点击该按钮关闭
																},
																btn3 : function(
																		index,
																		layero) {
																	// 按钮【按钮二】的回调
																	layer
																			.confirm(
																					'确定删除区域?',
																					function(
																							index) {
																						// do
																						// something

																						var deleteParams = {
																							deleteFeatures : [ graphic ]
																						};
																						promise = patrolregion
																								.applyEdits(deleteParams);

																						promise
																								.then(
																										function(
																												editsResult) {
																											//
																											layer
																													.close(index);
																										})
																								.otherwise(
																										function(
																												error) {
																											// window.parent.showInfo(
																											// error.code+':'+error.message);
																											layer
																													.msg("管护区删除失败");
																										});
																					});

																},
																success : function(
																		layero,
																		index) {
																	$
																			.ajax({
																				url : localhostPath
																						+ projectName
																						+ '/region/findById', // 请求的url地址
																				dataType : "json", // 返回格式为json
																				async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
																				data : {
																					id : OBJECTID
																				}, // 参数值
																				type : "POST", // 请求方式
																				beforeSend : function() {
																					// 请求前的处理
																				},
																				success : function(
																						req) {
																					// 请求成功时处理
																					var thisRegion = req.rows[0];
																					var body = layer
																							.getChildFrame(
																									'body',
																									index);
																					body
																							.find(
																									'#department')
																							.val(
																									thisRegion.departmentCode);
																					body
																							.find(
																									'#regionName')
																							.val(
																									thisRegion.regionName);
																					body
																							.find(
																									'#regionNum')
																							.val(
																									thisRegion.regionNum);
																				},
																				complete : function() {
																					// 请求完成的处理
																				},
																				error : function() {
																					// 请求出错处理
																				}
																			});
																}
															});

												}
											});
						}
					});
		}, 3500);

/**
 * ****************************************************************
 * 
 * 获取cookies
 * 
 * ****************************************************************
 */
function getCookieValue(name) {
	var strCookie = document.cookie;
	var arrCookie = strCookie.split(";");
	for (var i = 0; i < arrCookie.length; i++) {
		var c = arrCookie[i].split("=");
		if (c[0].trim() == name) {
			return c[1] == '0' ? false : true;
		}
	}
	if (name === "xj" || name == "xjanno")
		return true;
	return false;
}