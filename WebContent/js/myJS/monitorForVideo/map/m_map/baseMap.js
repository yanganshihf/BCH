// 初始加载
$(document)
		.ready(
				function() {
					// 加载底图 谷歌
					require(
							[ "esri/Map", "esri/views/MapView",
									"esri/layers/WebTileLayer", "esri/Color",
									"esri/config", "esri/Basemap",
									"esri/request",
									"esri/widgets/BasemapGallery",
									"esri/widgets/Expand"],
							function(Map, MapView, WebTileLayer, Color,
									esriConfig, Basemap, esriRequest,
									BasemapGallery, Expand) {
									
								// 不能用BaseTileLayer，否则BasemapGallyry不可用-roy
								TintLayer = WebTileLayer
										.createSubclass({
											properties : {
												urlTemplate : null,
												tint : {
													value : null,
													type : Color
												}
											},
											// generate the tile url for a given
											// level, row and column
											getTileUrl : function(level, row,
													col) {
												return this.urlTemplate
														.replace("{z}", level)
														.replace("{x}", col)
														.replace("{y}", row);
											},

											// This method fetches tiles for the
											// specified level and size.
											// Override this method to process
											// the data returned from the
											// server.
											fetchTile : function(level, row,
													col) {
												// call getTileUrl() method to
												// construct the URL to tiles
												// for a given level, row and
												// col provided by the LayerView
												var url = this.getTileUrl(
														level, row, col);

												// request for tiles based on
												// the generated url
												// set allowImageDataAccess to
												// true to allow
												// cross-domain access to create
												// WebGL textures for 3D.
												return esriRequest(url, {
													responseType : "image",
													allowImageDataAccess : true
												})
														.then(
																function(
																		response) {
																	// when esri
																	// request
																	// resolves
																	// successfully
																	// get the
																	// image
																	// from the
																	// response
																	var image = response.data;
																	var width = this.tileInfo.size[0];
																	var height = this.tileInfo.size[0];
																	// create a
																	// canvas
																	// with 2D
																	// rendering
																	// context
																	var canvas = document
																			.createElement("canvas");
																	var context = canvas
																			.getContext("2d");
																	canvas.width = width;
																	canvas.height = height;
																	// Draw the
																	// blended
																	// image
																	// onto the
																	// canvas.
																	context
																			.drawImage(
																					image,
																					0,
																					0,
																					width,
																					height);

																	return canvas;
																}.bind(this));
											}
										});

								esriConfig.request.corsEnabledServers
										.push("http://www.google.cn/");
								// *******************************************************
								// *******************************************************
								// Start of JavaScript application
								// *******************************************************
								// Add stamen url to the list of servers known
								// to support CORS
								// specification.
								// esriConfig.request.corsEnabledServers.push("http://www.google.cn/");
								// *******************************************************
								// End Create a subclass of
								// WebTileLayer//BaseTileLayer
								// *******************************************************
								// Create a new instance of the TintLayer and
								// set its properties
								var ggSatelliteLayer = new TintLayer(
										{
											//urlTemplate : localStorage.getItem("ggSatelliteLayer"),
											urlTemplate : "http://www.google.cn/maps/vt/lyrs=s@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
											title : "Google Map"
										});

								var ggLabelLayer = new TintLayer(
										{
											urlTemplate : "http://www.google.cn/maps/vt/lyrs=h@177000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
											// tint: new Color("#FF0000"),
											title : "Google Map1"
										});

								var ggVectorLayer = new TintLayer(
										{
											urlTemplate : "http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0'",
											// tint: new Color("#004FBB"),
											title : "Google Map2"
										});
								var imageBasemap2 = new Basemap(
										{
											baseLayers : [ ggSatelliteLayer,
													ggLabelLayer ],
											title : "卫星影像",
											id : "imageBasemap",
											thumbnailUrl : "/ResourceMonitor/images/mappage/satellite.png"
										});
								var vectorBasemap2 = new Basemap(
										{
											baseLayers : [ ggVectorLayer,
													ggLabelLayer ],
											title : "行政区划",
											id : "vectorBasemap",
											thumbnailUrl : "/ResourceMonitor/images/mappage/streets.png"
										});

								map = new Map({
									basemap : vectorBasemap2
								});

								view = new MapView({
									container : 'baseViewDiv',
									map : map,
									// 初始地图中心位置
									center : [ 106.239722, 36.1158 ],
									zoom : 10,
									tilt : 45,
									heading : 0
								});
								// 去除logo
								view.ui.remove("attribution");

								// 底图切换
								var basemapGallery = new BasemapGallery({
									view : view,
									container : document.createElement("div"),
									source : [ vectorBasemap2, imageBasemap2 ]
								});
								// Add widget to the top right corner of the
								// view
								 var bgExpand = new Expand({
							            view: view,
							            content: basemapGallery.container,
							            expandIconClass: "esri-icon-basemap"
							     });
								view.ui.add(bgExpand,"top-right");
								view.watch("scale", function(newValue, oldValue, propertyName) {
							          if(newValue<800){
							            view.scale=800;
							          }
							          $("#scaleInfo").html('1:'+newValue.toFixed(0));
							    });
							});

				});
