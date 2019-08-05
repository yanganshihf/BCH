var map, view,eErGuNaPolygon;
var patrolregion;
var symbol3dLayer,locationLayer,highlightRouteLyr,eventLayer;
var highlightRoutes = new Array(4);
var lineWidth=-1,addEvent3dDlgIndex=-1, pntBufferDlgIndex = -1,viewshedDlgIndex=-1,routeAnaDlgIndex=-1,closestFacilityDlgIndex=-1,_IdentifyDlgIndex,progressDlg;
var xbQueryTask,lwtQueryTask,fhzQueryTask,jmdQueryTask;

var vectorBasemap;
var imageBasemap;
var pxTileLayer,pdTileLayer;
var imageLayerArray=new Array();
var demLayer;
var demQueryLayer;
var baseGeoMapLayers;

var xiaobanLayer;
var xiangzhenZhi_3d;
var signPointFlag=false;//是否处于标记状态的标志
var lineBufferFlag=false;
var xiangzhFeatureLayer,cuntFeatureLayer,liaoWangTai_3d,fangHuoZhan_3d,jmdFeatureLayer,mydFeatureLayer,heliudLayer;
var soilURL = "http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer";
// 属性查询
 var identifyTask, identifyParams;
 var dxLegend;
 var oldGraphic;
 var oldlabelGraphic;
 var haeExacuteQuery;
 var IkeyFlag = 0;
 var layerIndex=-1;
//轨迹回放人员图标
 var trackLasyer;
 var userPositionLayer;
 var positionLayer;
 
 var distanceUnitVal="";
 var distanceUnitName=""
 var areaUnitVal="";
 var areaUnitName="";
// 初始加载
$(document).ready(function() {
	require([ "esri/Map", "esri/views/MapView", "esri/views/SceneView","esri/layers/WebTileLayer", "esri/Color",
		"esri/config", "esri/Basemap","esri/request","esri/widgets/BasemapGallery","esri/widgets/Expand","esri/widgets/ScaleBar",
		"esri/layers/TileLayer","esri/layers/MapImageLayer","esri/layers/FeatureLayer","esri/widgets/LayerList","esri/core/urlUtils", 
		"esri/tasks/QueryTask","esri/tasks/support/Query","esri/Graphic","esri/layers/GraphicsLayer","esri/geometry/Point","esri/symbols/TextSymbol", "esri/layers/ElevationLayer",
		"esri/layers/support/LabelClass", "esri/WebMap", "esri/views/2d/draw/Draw","esri/geometry/Polygon","esri/geometry/Polyline",
	    "esri/geometry/geometryEngine","esri/widgets/Legend","esri/symbols/PictureMarkerSymbol","esri/symbols/Font","esri/tasks/IdentifyTask","esri/tasks/support/IdentifyParameters","dojo/_base/array"],
		function(Map, MapView, SceneView,WebTileLayer, Color,
				esriConfig, Basemap, esriRequest,BasemapGallery, Expand,ScaleBar
				, TileLayer, MapImageLayer,FeatureLayer, LayerList,urlUtils,
				QueryTask,Query,Graphic,GraphicsLayer,Point,TextSymbol,ElevationLayer,LabelClass, 
			      WebMap,Draw,Polygon,Polyline,geometryEngine,Legend,PictureMarkerSymbol,Font,IdentifyTask,IdentifyParameters,arrayUtils) {
		
			var rings = [[ 
        	     [119.1,50.0],[119.1,51.0],[121.0,51.0],[121.0,50.0],[119.1,50.0]  // same as first vertex
        	   ]];

        	  eErGuNaPolygon = new Polygon({
        	     hasZ: false,
        	     hasM: false,
        	     rings: rings,
        	     spatialReference: { wkid: 4326 }
        	  });
				urlUtils.addProxyRule({
					urlPrefix : "http://58.18.226.130:6080/arcgis/rest/services",
					// 本地环境
					proxyUrl : "http://60.205.206.180:8080/Java/proxy.jsp"
						// 发布环境
					//proxyUrl : "http://127.0.0.1:8878/Java/proxy.jsp"
				 });
						TintLayer = WebTileLayer.createSubclass({
							properties : {
								urlTemplate : null,
								tint : {
									value : null,
									type : Color
								}
							},
							getTileUrl : function(level, row,col) {
								return this.urlTemplate.replace("{z}", level).replace("{x}", col).replace("{y}", row);
							},
							fetchTile : function(level, row,col) {
								var url = this.getTileUrl(level, row, col);
								return esriRequest(url, {
									responseType : "image",
									allowImageDataAccess : true
								}).then(function(response) {
								var image = response.data;
								var width = this.tileInfo.size[0];
								var height = this.tileInfo.size[0];
								var canvas = document.createElement("canvas");
								var context = canvas.getContext("2d");
								canvas.width = width;
								canvas.height = height;
								context.drawImage(image,0,0,width,height);
								return canvas;
							}.bind(this));
							}				
						});

						esriConfig.request.corsEnabledServers.push("http://www.google.cn/");
								
						/*var ggSatelliteLayer = new TintLayer({
							urlTemplate : "http://www.google.cn/maps/vt/lyrs=s@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
							title : "Google Map"		
						});			

						var ggLabelLayer = new TintLayer({
							urlTemplate : "http://www.google.cn/maps/vt/lyrs=h@177000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
							title : "Google Map1"				
						});

						var ggVectorLayer = new TintLayer({
							urlTemplate : "http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0'",
							title : "Google Map2"				
						});*/
						var ggSatelliteLayer = new TintLayer({
							//urlTemplate : localStorage.getItem("ggSatelliteLayer"),
							urlTemplate : "http://www.google.cn/maps/vt/lyrs=s@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
							title : "Google Map"		
						});			

						var ggLabelLayer = new TintLayer({
							urlTemplate : "http://www.google.cn/maps/vt/lyrs=h@177000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
							title : "Google Map1"				
						});

						var ggVectorLayer = new TintLayer({
							urlTemplate : "http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0'",
							title : "Google Map2"				
						});
						
						vectorBasemap2 = new Basemap({
		                    baseLayers : [ ggVectorLayer, ggLabelLayer ],
							//baseLayers : [ ggVectorLayer ],
		                    title : "行政区划",
		                    id : "vectorBasemap",
		                    thumbnailUrl : "/ResourceMonitor/images/mappage/streets.png"
		                });

		                imageBasemap2 = new Basemap({
		                    baseLayers : [ ggSatelliteLayer , ggLabelLayer ],
		                    title : "卫星影像",
		                    id : "imageBasemap",
		                    thumbnailUrl : "/ResourceMonitor/images/mappage/satellite.png"
		                });
						
						// 特征图层 -巡护区划分（特征服务）
						   patrolregion = new FeatureLayer({
							url:"http://60.205.206.180:6080/arcgis/rest/services/guanhuqu_EEGN/FeatureServer",
						 	 mode : FeatureLayer.MODE_ONDEMAND,
							 //id : '1',
							 outFields : ["*"],
							 visible : true,
							 //opacity : 0.8,
							 title:"管护责任片区",
						   });
						 //除了上库力之外的五个影像
	                       var imageTileLayers = new TileLayer({
	                    	   url:"http://58.18.226.130:6080/arcgis/rest/services/five_DOM/MapServer",
	                           //url:"http://58.18.226.130:6080/arcgis/rest/services/enhe_DOM/MapServer",
	                           opacity : 0.8,
	                           listMode : "hide",
	                       });
	                        imageLayerArray.push(imageTileLayers);
	                       
	                       var imageTileLayerSKL = new TileLayer({
	                           url:"http://58.18.226.130:6080/arcgis/rest/services/shangkuli_DOM/MapServer",
	                           title : "上库力影像",
	                           opacity : 0.8,
	                           listMode : "hide",
	                       });
	                       imageLayerArray.push(imageTileLayerSKL);

	                       pxTileLayer = new TileLayer({
	                           url : "http://58.18.226.130:6080/arcgis/rest/services/PX_FL_eegn/MapServer",
	                           title : "坡向",
	                           visible : false,
	                           listMode:"hide-children",
	                           opacity : 0.8
	                       });
	                       
	                       pxQueryLayer = new ElevationLayer({
	                           url : "http://58.18.226.130:6080/arcgis/rest/services/PX_eegn/ImageServer",
	                           title : "坡向",
	                           visible : false,
	                           listMode:"hide-children",
	                           opacity : 0.8
	                       });
	                       
	                       pdTileLayer = new TileLayer({
	                           url : "http://58.18.226.130:6080/arcgis/rest/services/PD_eegn/MapServer",
	                           title : "坡度",
	                           visible : false,
	                           listMode:"hide-children",
	                           opacity : 0.8
	                       });
	                       
	                       pdQueryLayer = new ElevationLayer({
	                           url : "http://58.18.226.130:6080/arcgis/rest/services/PD_eegn/ImageServer",
	                           title : "坡度",
	                           visible : false,
	                           listMode:"hide-children",
	                           opacity : 0.8
	                       });

	                       demLayer = new ElevationLayer({
	                           url : "http://58.18.226.130:6080/arcgis/rest/services/DEM2_eegn/ImageServer",
	                           visible : true,
	                           title : "高程图层",
	                           opacity : 0.8
	                       });
	                       
	                       demQueryLayer = new ElevationLayer({
	                           url : "http://58.18.226.130:6080/arcgis/rest/services/DEM_eegn/ImageServer",
	                           visible : true,
	                           title : "高程查询图层",
	                           opacity : 0.8
	                       });
						
	                       symbol3dLayer = new GraphicsLayer({
	                           listMode : "hide",
	                           name:"symbol3dLayer",
	                           elevationInfo:{
	                               mode : "relative-to-ground",
	                               offset : 0,
	                               unit : "meters"
	                           }
	                       });
	                       locationLayer = new GraphicsLayer({
	                           listMode : "hide",
	                           name:"locationLayer",
	                           elevationInfo:{
	                               mode : "relative-to-ground",
	                               offset : 0,
	                               unit : "meters"
	                           }
	                       });
	                       eventLayer  = new GraphicsLayer({
	                           listMode : "hide",
	                           name:"eventLayer",
	                           elevationInfo:{
	                               mode : "relative-to-ground",
	                               offset : 0,
	                               unit : "meters"
	                           }
	                       });
	                    
	               			positionLayer = new GraphicsLayer({
	               				opacity : 0.90,
	               				listMode : "hide",
	               			});
	               			
	               			trackLasyer = new GraphicsLayer({
	               				opacity : 0.90,
	               				listMode : "hide",
	               			});
	                       
	                       highlightRouteLyr = new GraphicsLayer({
	                           listMode : "hide",
	                           name:"highlightRouteLyr",
	                           elevationInfo:"on-the-ground"
	                       });
	                       
	                       // 林场名标记	
	 				      var linchanglabelClass = new LabelClass({
	 				        symbol: {
	 				          type: "label-3d", // autocasts as new LabelSymbol3D()
	 				          symbolLayers: [{
	 				            type: "text", // autocasts as new TextSymbol3DLayer()
	 				            material: {
	 				              color: [255,4,4]
	 				            },
	 				            size: 18
	 				          }]
	 				        },
	 				        labelPlacement: "above-right",
	 				        labelExpressionInfo:{expression: "$feature.林场名"},
	 				      });
	                        			   	   
	 					   var linchangLayer = new FeatureLayer({
	 						 url:soilURL+"/10",
	 						 visible : true,
	 						 title:"林场名",
	 						 outFields: ["林场名"],
	 				         maxScale: 0,
	 				         minScale: 0,
	                          labelsVisible: true,
	                          labelingInfo: [linchanglabelClass],
	 					   }); 
	 					   
	 					  // 乡镇名标记	
	 	              		 var xiangzhenLableClass=linchanglabelClass.clone();
	 	              		 xiangzhenLableClass.labelExpressionInfo={expression:"$feature.cuntun"};
	 	              		 xiangzhenLableClass.symbol.symbolLayers=[{
	 	 				            type: "text", // autocasts as new TextSymbol3DLayer()
	 					            material: {
	 					              color: [0,255,0]
	 					            },
	 					            font:{
	 					            	family :'serif',
	 					            	weight :'bold',
	 					            },
	 					            size: 12
	 					          }];
	 	              		 xiangzhenLableClass.labelPlacement="above-center";

	 	              	 	 xiangzhFeatureLayer = new FeatureLayer({
	 							 url:soilURL+"/4",
	 							 visible : true,
	 							 title:"乡镇名",
	 							 outFields: ["cuntun"],
	 					         maxScale: 0,
	 					         minScale: 0,
	 	                         labelsVisible: true,
	 	                         labelingInfo: [xiangzhenLableClass],
	 	                         visible:false,
	 						   }); 

	 	              	 	 var cuntunLableClass=linchanglabelClass.clone();
	 	              	 	 cuntunLableClass.labelExpressionInfo={expression:"$feature.cuntun"};
	 	              	 	 cuntunLableClass.symbol.symbolLayers=[{
	 	 				            type: "text", // autocasts as new TextSymbol3DLayer()
	 					            material: {
	 					              color: [0,255,0]
	 					            },
	 					            font:{
	 					            	family :'serif',
	 					            	weight :'bold',
	 					            	style:'italic',
	 					            },
	 					            size: 12
	 					          }];
	 	              	 	cuntunLableClass.labelPlacement="above-center";

	 	                     cuntFeatureLayer=new FeatureLayer({
	 							//url:"http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer/5",
	 	                    	 mode : FeatureLayer.MODE_ONDEMAND,
	 							 outFields : ["*"],
	 							 url:soilURL+"/5",
	 							 visible : true,
	 							 title:"村屯名",
	 							 outFields: ["cuntun"],
	 	                         labelsVisible: true,
	 	                         labelingInfo: [cuntunLableClass],
	 	                         visible:false,
	 						});
	 	                    
	 	                    //基础地理数据
		                       baseGeoMapLayers = new MapImageLayer({
		                            url : soilURL,
		                            title : "基础数据",
		                            //visible : getCookieValue('view_base'),
		                            sublayers : [{
		                                    id : 11,
		                                    title : "小班面",
		                                }, {
		                                    id : 10,
		                                    title : "林场界",
		                                },  {
		                                    id : 9,
		                                    title : "河流",
		                                }, {
		                            	  id : 8,
		                            	  title : "道路",
		                     	   }]
		                       });
		                       xingzhengMapLayers = new MapImageLayer({
		                            url : 'http://60.205.206.180:6080/arcgis/rest/services/QUANGUOXZJ/MapServer',
		                            title : "行政区划",
		                            visible:false,
		                            sublayers : [{
		                                    id : 2,
		                                    title : "县界",
		                                },  {
		                                    id : 1,
		                                    title : "市界",
		                                }, {
		                            	  id : 0,
		                            	  title : "省界",
		                     	   }]
		                       });
		                    // 获取单个的矢量数据图层layer对象
		                       xiaobanLayer = baseGeoMapLayers.findSublayerById(11);
		                      /* if(linchangName==""){
		                    	   //xiaobanLayer.definitionExpression = "1=1"; 
		                       }else{
		                    	   xiaobanLayer.definitionExpression = "林场='"+linchangName+"'"; 
		                       }*/
		                       xiaobanLayer.visible=false;
		                     //初始化3d符号
		                       var simpleSymbol3d =  {
		                		  type: "simple",  
		                   		  symbol: {  
		                   		    type: "point-3d", 
		                   		    symbolLayers: [{ 
		                   		      type: "icon", 
		                   		      resource: { href: "" }, 
		                   		      size: 28,
		                   		    }],
		                   		  }
		             
		                   		};
		                      liaoWangTai_3d = new FeatureLayer({
		                    	 	title : "塔",
		                    	    url: "http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer/0"
		                      });
		                      var liaoWangTai_3dSymbol=simpleSymbol3d;
		                      liaoWangTai_3dSymbol.symbol.symbolLayers[0].resource.href="/ResourceMonitor/images/mark/32/tower.png";
		                      liaoWangTai_3d.renderer = liaoWangTai_3dSymbol;

		                       fangHuoZhan_3d  = new FeatureLayer({
		                    	   title : "管护站",
		                   	    	url: "http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer/2"
		                       });
		                       var fangHuoZhan_3dSymbol=simpleSymbol3d;
		                       fangHuoZhan_3dSymbol.symbol.symbolLayers[0].resource.href="/ResourceMonitor/images/mark/32/ghz.png";
		                       fangHuoZhan_3d.renderer = fangHuoZhan_3dSymbol;

		                       jmdFeatureLayer  = new FeatureLayer({
		                    	    title : "居民点",
		                   	    	url: "http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer/6",
		                   	    	visible:false
		                       });
		                       jmdFeatureLayer.renderer = {
		                   		  type: "simple",  // autocasts as new SimpleRenderer()
		                   		  symbol: {  // symbol type required for rendering point geometries
		                   		    type: "point-3d",  // autocasts as new PointSymbol3D()
		                   		    symbolLayers: [{  // renders points as volumetric objects
		                   		      type: "icon",  // autocasts as new ObjectSymbol3DLayer()
		                   		      resource: { href: "/ResourceMonitor/images/mark/32/address.png" },  // renders points as cones
		                   		      size: 28
		                   		    }],
		                   		  }
		             
		                   		};
		                       var tjpFeatureLayer  = new FeatureLayer({
		                    	   title : "停机坪",
		                   	    	url: "http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer/1",
		                   	    	visible:false
		                       });
		                       var tjp_3dSymbol=simpleSymbol3d;
		                       tjp_3dSymbol.symbol.symbolLayers[0].resource.href="/ResourceMonitor/images/mark/32/tingjiping.png";
		                       tjpFeatureLayer.renderer =tjp_3dSymbol;
		                       
		                       mydFeatureLayer  = new FeatureLayer({
		                    	   title : "牧业点",
		                   	    	url: "http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer/7",
		                   	    	visible:false
		                       });
		                       var myd_3dSymbol=simpleSymbol3d;
		                       myd_3dSymbol.symbol.symbolLayers[0].resource.href="/ResourceMonitor/images/mark/32/myd.png";
		                       mydFeatureLayer.renderer =myd_3dSymbol;

		                       xbQueryTask = new QueryTask({
		                           url: soilURL+"/11"
		                        });
		                       lwtQueryTask = new QueryTask({//瞭望塔
		                           url: soilURL+"/0"
		                        });
		                       fhzQueryTask = new QueryTask({//管护站
		                           url: soilURL+"/2"
		                        });
		                       jmdQueryTask = new QueryTask({//居民点
		                           url: soilURL+"/6"
		                        });
		                       linChangQueryTask = new QueryTask({//林场
		                           url: soilURL+"/10"
		                        });
		 					  
		                       heliudLayer=new FeatureLayer({
									url:"http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer/12",
									mode : FeatureLayer.MODE_ONDEMAND,
									outFields : ["*"],
							   });
		                       
		                       map = new Map({
									basemap : imageBasemap2,
								});
										
								view = new SceneView({
									container : 'baseViewDiv',
									map : map,
			                           popup: {
			                             dockEnabled: true,
			                             dockOptions: {
			                               buttonEnabled: false,
			                               breakpoint: false,
			                             }
			                           },
			                           camera : {
			                               position : [ 53, 36, 36000000 ],
			                        }
								});
		                   /* // 基础数据
		                       baseGeoMapLayers.watch('visible',
										function(newValue, oldValue) {
											document.cookie = "view_base="
													+ (newValue ? 1 : 0) + ";path=/;";
											base_Layer.visible = newValue;
										});
								// 小班
		                       baseGeoMapLayers.findSublayerById(11).watch(
										'visible',
										function(newValue, oldValue) {
												document.cookie = "view_xb = "
														+ (newValue ? 1 : 0)
														+ ";path=/;";
												baseGeoMapLayers.findSublayerById(11).visible = newValue;
								});*/
	 	                     
						
						// 底图切换
						var basemapGallery = new BasemapGallery({
							view : view,
							container : document.createElement("div"),
							source : [ vectorBasemap2, imageBasemap2 ]
						});
								
						 var bgExpand = new Expand({
					            view: view,
					            content: basemapGallery.container,
					            expandIconClass: "esri-icon-basemap"
					     });
						 
						  //图层列表
	                       var layerList = new LayerList({
	                           view : view,
	                           container : document.createElement("div")
	                       });
	               
	                       var lyrLstExpand = new Expand({
	                           view : view,
	                           content : layerList.container,
	                           expandIconClass : "esri-icon-layer-list",
	                           expandTooltip: "图层列表"
	                       });
	                     document.getElementById("identify").style.display = "inline";
	                    
	        			 if(appVersion.indexOf("chrome")==-1){}else{
	        				 document.getElementById("mapExport").style.display = "inline";
	             	   	 }  
	                     document.getElementById("refreshGraphics").style.display = "inline";
	                     document.getElementById("initialExtent").style.display = "inline";
	                     document.getElementById("xyLocation").style.display = "inline";
	                     document.getElementById("draw-polyline").style.display = "inline";
	                     document.getElementById("draw-polygon").style.display = "inline";
						// 去除logo
						 view.ui.remove("attribution");
						 view.ui.add(bgExpand,"top-right");
						 view.ui.add(lyrLstExpand,"top-right");
						
						 view.ui.add("initialExtent","top-left");
						 view.ui.add("identify","top-left");
						 view.ui.add("xyLocation","top-left");
						 
						 view.ui.add("draw-polyline","top-left");
			       	   	 view.ui.add("draw-polygon","top-left");
						 
						 /*view.ui.add("topbar_mianjichaxun", "top-left");*/
			       	   	 if(appVersion.indexOf("chrome")==-1){}else{
			       	   		 view.ui.add("mapExport","top-right");
	             	   	 }
						
						 view.ui.add("refreshGraphics","top-left");
						 view.ui.add("PositionInfo","bottom-left");
						 $("#baseViewDiv .esri-ui .esri-ui-inner-container").css("bottom","15px");
						 map.addMany(imageLayerArray);                   
	                     map.addMany([pdTileLayer,pxTileLayer,baseGeoMapLayers,symbol3dLayer,highlightRouteLyr,locationLayer,positionLayer,trackLasyer,
	                    	 mydFeatureLayer,jmdFeatureLayer,fangHuoZhan_3d,liaoWangTai_3d,tjpFeatureLayer,linchangLayer,
	                    	 cuntFeatureLayer,xiangzhFeatureLayer,xingzhengMapLayers,patrolregion,eventLayer]);
	                     // Add elevation layer to the map's ground.
	                     map.ground.layers.add(demLayer);
	                     dxLegend = new Legend({
                             view: view,
	                     });
	                     pdTileLayer.watch('visible',legendLayersChanged);
	                     pxTileLayer.watch('visible',legendLayersChanged);                    
	                     function legendLayersChanged(){
                           if(pdTileLayer.visible){
                               dxLegend.layerInfos=[{layer: pdTileLayer}];
                               view.ui.add(dxLegend, "bottom-right");
                           }else{
                               if(pxTileLayer.visible){
                                   dxLegend.layerInfos=[{layer: pxTileLayer}];
                                   view.ui.add(dxLegend, "bottom-right");
                               }else{
                                   view.ui.remove(dxLegend);
                               }
                           }
	                     }  
	                       
	                     //初次加载定位到指定区域
	                       view.goTo({
	                           target : eErGuNaPolygon,
	                           heading : 0,
	                           tilt : 75,
	                           scale:750000
	                       }, {
	                           speedFactor : 0.4,
	                           easing : 'ease-out'
	                       });
								
						 
						//加载控件
						// 比例尺
						 var scalebar = new ScaleBar({
								view : view,
								unit : "metric",
								style : "line",
						 });	
						 view.ui.add(scalebar, {
							 position : "bottom-left"
						 });
						 view.watch("scale", function(newValue, oldValue, propertyName) {
					          if(newValue<800){
					            view.scale=800;
					          }
					          $("#scaleInfo").html('1:'+newValue.toFixed(0));
					    });
				        view.watch("camera.heading", function(newValue, oldValue, propertyName) {
				        	$("#northIcon").css("transform","rotate("+(360-newValue)+"deg)");
				       	});
						 /*** 全图按钮*/
							$("#initialExtent").off("click").on("click",function(){  
					              view.graphics.removeAll();
					              view.goTo({
					                   target : eErGuNaPolygon,
					                   heading : 0,
					                   tilt : 75,
		                               scale:750000
					               }, {
					                  speedFactor : 0.7,
					                  easing : 'ease-out'
					               });
					         });
						
						 // 点击刷新
	                       var refreshButton = document.getElementById("refreshGraphics");
	                       refreshButton.addEventListener("click", function() {
	                    	   
	                    	   view.graphics.removeAll();
	                    	   positionLayer.removeAll();
	                    	   trackLasyer.removeAll();
	                    	   step = trackCount;
	                    	   /*analysis.funClearLayerGraphics();
	                    	   if(viewModel1 != null){
	                    		   viewModel1.clearMeasurement();
	                    		  
	                    	   }
							   if(viewModel2 != null){
								  viewModel2.clearMeasurement();
								 
	                    	   }*/
	                       }); 
						 
					   var trackTimeLabel=null; 
					   view.on("pointer-move", pointerMoveEventHandler); 
					   function pointerMoveEventHandler(event) {
							var point = view.toMap({
								x : event.x,
								y : event.y
							});
							if (point == null)
								return;
							
							var lonlat = mercator2lonlat(point);
							
							view.graphics.remove(trackTimeLabel);
							view.hitTest(event).then(function(response) {
								
								var attributes = response.results[0].graphic.attributes;
								if(attributes!=undefined&&attributes.graphicFlag==10){
									//debugger;
									var point = view.toMap({
										x : event.x,
										y : event.y-30
									});
									var lonlat = mercator2lonlat(point);
									var time = attributes.time;
									trackTimeLabel = new Graphic({
		       							geometry: new Point(lonlat.x, lonlat.y),
		       							symbol: {
		       								type: "text",
		       								color: "white",
		       								text:time,
		       								font: { // 自动字体
		       									size: 16,
		       									family: "宋体"
		       								}
		       							}
		       						});
		       						view.graphics.add(trackTimeLabel);
								}
							})
							var longitude = lonlat.x;
							var latitude = lonlat.y;
							longtD = parseInt(longitude);
							latD = parseInt(latitude);
							longtM = parseInt((longitude - longtD) * 60);
							latM = parseInt((latitude - latD) * 60);
							longtS = parseInt(((longitude - longtD) * 60 - longtM) * 60);
							latS = parseInt(((latitude - latD) * 60 - latM) * 60);
							document.getElementById("longt").innerHTML=longtD+' °  '+longtM+' ′  '+longtS+' ″';
                            document.getElementById("lat").innerHTML=latD+' °  '+latM+' ′  '+latS+' ″';
                            demQueryLayer.queryElevation(point, { returnSampleInfo: true }).then(function(result){
                           		document.getElementById("elevation").innerHTML=result.geometry.z.toFixed(0);
                            });
                            pdQueryLayer.queryElevation(point, { returnSampleInfo: true }).then(function(result){
                                var slopeVal=result.geometry.z;
                                document.getElementById("slope").innerHTML=slopeVal.toFixed(0);
                                if(slopeVal<=5){
                                    document.getElementById("aspect").innerHTML="无坡向";
                                }else{
                                    pxQueryLayer.queryElevation(point, { returnSampleInfo: true }).then(function(result){
                                         var pxName="-";
                                         var aspectVal=result.geometry.z;
                                         if(aspectVal<=112 || aspectVal>=292){
                                             pxName="阴坡";
                                         }else{//112-292
                                             pxName="阳坡";
                                         }
                                         document.getElementById("aspect").innerHTML=pxName;
                                     });
                                }
                            });
						}
					 
	                       draw = new Draw({
	   		     				view: view
	                       });
	                       
	                       document.getElementById("draw-polyline").addEventListener("click",function () {
	                    	   view.goTo({
		                           //target : eErGuNaPolygon,
		                           //heading : 0,
		                           tilt : 45,
		                           //scale:750000
		                       }, {
		                           speedFactor : 1,
		                           easing : 'ease-out'
		                       });
	           			    	  view.graphics.removeAll();
	           			    	  layer.closeAll();
	           			    	   $("#area-tool").css("color","#6e6e6e");
		                    	   $("#draw-polygon").css("background","");
		                    	   if($("#length-tool").css("color")=="rgb(238, 238, 238)"){
		                    		   $("#length-tool").css("color","#6e6e6e");
			                    		 $("#draw-polyline").css("background","");
		                  				  view.graphics.removeAll();
		                  				  draw.reset();
		           						  view.focus();
		           						  layer.closeAll();
		                           }else{
		                        	   $("#length-tool").css("color","#eee");
		                    		   $("#draw-polyline").css("background","#058563");
		                    		   lineareaIndex=layer.open({
	           			        		   type: 1,
	           			        		   id:'distanceUnit',
	           			        		   title:false,
	           			        		   shade: 0,
	           			        		   resize:false,
	           			        		   scrollbar: false,
	           			        		   shadeClose:false,       		   
	           			        		   offset: ['60px', '290px'],	
	           							   area:['100px','30px'],
	           			        		   content:
	           			        			   '<select id="distanceUnit" name="distanceUnit" style="width:100px;height:30px">'+
	           										'<option value="meters"  selected="">米</option>'+ 
	           										'<option value="kilometers">千米</option>'+
	           			        			   '</select>',
	           		        			   cancel: function(){ 
	           		        				 $("#length-tool").css("color","#6e6e6e");
				                    		 $("#draw-polyline").css("background","");
	           		        				   view.graphics.removeAll();
	           		        				   draw.reset();
	           		 						   view.focus();
	           		        				   layer.close(lineareaIndex);
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
	           			          }
	           			        });


	           			      document.getElementById("draw-polygon").addEventListener("click",function () {
	           			    	view.goTo({
			                           //target : eErGuNaPolygon,
			                           //heading : 0,
			                           tilt : 45,
			                           //scale:750000
			                       }, {
			                           speedFactor : 1,
			                           easing : 'ease-out'
			                       });
	           			    	  view.graphics.removeAll();
	           			    	  layer.closeAll();
	           			    	  $("#length-tool").css("color","#6e6e6e");
	                    		  $("#draw-polyline").css("background","");
		                          if($("#area-tool").css("color")=="rgb(238, 238, 238)"){
		                    		  $("#area-tool").css("color","#6e6e6e");
		                    		  $("#draw-polygon").css("background","");
		                    		  view.focus(); 
                  				   	  view.graphics.removeAll();
                  				   	  draw.reset();
                  				   	  layer.close(lineareaIndex);
		                          }else{
		                        	  $("#area-tool").css("color","#eee");
		                    		  $("#draw-polygon").css("background","#058563");
		                    		  lineareaIndex=layer.open({
	           			        		   type: 1,
	           			        		   id:'areaUnit',
	           			        		   title:false,
	           			        		   shade: 0,
	           			        		   resize:false,
	           			        		   scrollbar: false,
	           			        		   shadeClose:false,
	           			        		   offset: ['60px', '330px'],
	           			        		   area:['100px','30px'],
	           			        		   content:
	           			        			   '<select id="areaUnit" name="areaUnit" style="width:100px;height:30px">'+
	           			        			    '<option value="acres" selected="">亩</option>'+
	           			        			    '<option value="hectares">公顷</option>'+
	           			        			    '<option value="square-meters">平方米</option>'+       		  
	           			        			   '</select>',
	           		        			   cancel: function(){ 
	           		        				$("#area-tool").css("color","#6e6e6e");
	           		        				$("#draw-polygon").css("background","");
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
	           			          }
	           			        });
  
	                    document.getElementById("identify").addEventListener("click",function () { 
	                    		   layer.closeAll();
	                    		   $("#length-tool").css("color","#6e6e6e");
	                    		   $("#draw-polyline").css("background","");
	                    		   $("#area-tool").css("color","#6e6e6e");
	                    		   $("#draw-polygon").css("background","");
	                    	   if($("#identify-tool").css("color")=="rgb(238, 238, 238)"){
	                    		   $("#identify-tool").css("color","#6e6e6e");
	                    		   $("#identify").css("background","");
	                    		   IkeyFlag = 0;
	                    	   }else{
	                    		   $("#identify-tool").css("color","#eee");
	                    		   $("#identify").css("background","#058563");
	                    		   IkeyFlag = 1;
	                    	   }
	                    });
	           			      
	           			      
	           			    view.on("click", clickEvnetHandler);
	           			    function clickEvnetHandler(event) {
	           			    	eventLayer.visible = false;
	           			     if($("#length-tool").css("color")=="rgb(238, 238, 238)"){
	           			    	distanceUnitVal=$("#distanceUnit option:selected").val();
   							    distanceUnitName=$("#distanceUnit option:selected").text();
   								view.graphics.removeAll();
   								enablecreatePolyline(draw, view); 
	           		         }else if($("#area-tool").css("color")=="rgb(238, 238, 238)"){
	           		        	areaUnitVal=$("#areaUnit option:selected").val();
   								areaUnitName=$("#areaUnit option:selected").text();
   								enableCreatePolyArea(draw, view); 
	           		         }
	           			  setTimeout(function (){haeExacuteQuery = 0;
           			    	view.hitTest(event).then(function(response) {
           			    		var clickResult = response.results[0];
           			    		var graphic = clickResult.graphic;
           			    		eventLayer.visible = true;
           			    		if(graphic !==null){
           			    			
    								var attributes = graphic.attributes;
           			    			if(attributes.GRAPHYFLAG == 2){
           			    				haeExacuteQuery = 1;
										if(IkeyFlag){
											if(oldGraphic){
												locationLayer.remove(oldGraphic);
											}
											if(oldlabelGraphic){
												locationLayer.remove(oldlabelGraphic);
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
											
											var name = attributes.personName;
											var text = new TextSymbol({
												text : "                  "+ name,
												font : {
													size : 12,
													family : "宋体",
													weight : "bold"
												},
												color : new dojo.Color([ 216, 30, 6, 3 ]),
												xoffset : 30,
												yoffset : 30,
											});
											var NewlabelGraphic = new Graphic(pt, text);
											locationLayer.add(NewlabelGraphic);
											locationLayer.add(Newgraphic);
											oldlabelGraphic = NewlabelGraphic;
											oldGraphic = Newgraphic;
											openLayer(attributes);
										}else{
											layer.msg("请打开i键查询！")
										}
           			    			}
           			    			if(attributes.GRAPHYFLAG == 5){
           			    				haeExacuteQuery = 1;
										if(IkeyFlag){
											debugger;
											parent.showDetail(attributes.id);
										}else{
											layer.msg("请打开i键查询！")
										}
           			    			}
           			    		}

								identifyTask = new IdentifyTask(soilURL);
								// Set the parameters for the Identify
								identifyParams = new IdentifyParameters();
								identifyParams.tolerance = 5;
								identifyParams.layerIds = [0,2,6,7,8,9,11];
								identifyParams.layerOption = "top";
								identifyParams.maxAllowableOffset = 10;
								identifyParams.width = view.width;
								identifyParams.height = view.height;
								identifyParams.geometry = clickResult.mapPoint;
								identifyParams.mapExtent = view.extent;
								//document.getElementById("baseViewDiv").style.cursor = "wait";
								if(haeExacuteQuery == 0){
									identifyTask.execute(identifyParams).then(function(response) {
           			    		var results = response.results;
           	               		return arrayUtils.map(results, function(result) {
           	               			layer.closeAll();
           	               			parent.layer.closeAll();
           	               			var feature = result.feature;                        
           	               			var attr = feature.attributes;
           	               			var layerName = result.layerName;
           	               			if(layerName == '塔' && liaoWangTai_3d.visible){
           	               			
           	               				if(IkeyFlag){
           	               					htmlStr = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;">'
           	               						+ '<table class="layui-table" lay-even style="text-align:center;margin-bottom:-1px"><tbody>'  
           	               						+ '<td style="width:100px;">所在林场</td><td>'+attr.林场
           	               						+ '</td></tr><tr><td>地点</td><td>'+attr.地点 
           	               						+ '</td></tr><tr><td>经度</td><td>'+attr.经度
           	               						+ '</td></tr><tr><td>纬度</td><td>'+ attr.纬度
           	               						+ '</td></tr><tr><td>类型</td><td>'+ attr.类型
           	               						+ '</td></tr><tr><td colspan="2"><img  src="/ResourceMonitor/towerPhoto/'+attr.Id+'.jpg" style="height:100px;max-width:200px"/>'
           	               						+ '</td></tr></tbody></table></div>';
           	               					layerIndex=layer.open({
           	               						type : 1,
           	               						shade:0,
           	               						title : '塔',
           	               						content : htmlStr,
           	               						offset:  'rb',
           	               						area:'auto',
           	               						anim: -1,
           	               						isOutAnim: false,
           	               						scrollbar :false,
           	               					});
           	               				}else{
           	               					layer.msg("请打开i键查询！")
           	               				}
           	               			}else if(layerName == '管护站' && fangHuoZhan_3d.visible){
           	               				
           	               				if(IkeyFlag){
           	               					
           	               				htmlStr = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;">'
           	                               + '<table class="layui-table" lay-even style="text-align:center;margin-bottom:-1px"><tbody>'  
           	                               + '<td style="width:100px;">站点编号</td><td>'+attr.ID 
           	                              + '</td></tr><tr><td>名称</td><td>'+attr.管护站  
           	                               + '</td></tr><tr><td>所属林场</td><td><span>'+ attr.林场名
           	                               + '</td></tr><tr><td>经度</td><td>'+ attr.经度 
           	                               + '</td></tr><tr><td>纬度</td><td>'+ attr.纬度 
           	                               + '</td></tr><tr><td colspan="2"><img    src="/ResourceMonitor/zdPhoto/'+attr.ID+'.jpg"  style="height:100px;max-width:200px" />'
           	                               + '</td></tr></tbody></table></div>';
           	               					layerIndex=layer.open({
           	               						type : 1,
           	               						shade:0,
           	               						title : '管护站',
           	               						content : htmlStr,
           	               						offset:  'rb',
           	               						area: 'auto',
           	               						anim: -1,
           	               						isOutAnim: false,
           	               						scrollbar :false,
           	               					});
           	               				}else{
           	               					layer.msg("请打开i键查询！")
           	               				}		
           	               			}else if(layerName == '居民点' && jmdFeatureLayer.visible){
           	               				if(IkeyFlag){
           	               				htmlStr = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;">'
           	                               + '<table class="layui-table" lay-even style="text-align:center;margin-bottom:-1px"><tbody><tr><td style="width:80px;">名称</td><td>'
           	                               +attr.cuntun+ '</td></tr></tbody></table></div>';
           	               				layerIndex=layer.open({
       	               						type : 1,
       	               						shade:0,
       	               						title : '居民点', 
       	               						content : htmlStr,
       	               						offset:  'rb',
       	               						area: 'auto',
       	               						anim: -1,
       	               						isOutAnim: false,
       	               						scrollbar :false,
       	               					});
           	               				}else{
           	               					layer.msg("请打开i键查询！")
           	               				}
           	               			}else if(layerName == '牧业点' && mydFeatureLayer.visible){
           	               				if(IkeyFlag){
           	               				htmlStr = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;">'
           	                               + '<table class="layui-table" lay-even style="text-align:center;margin-bottom:-1px"><tbody>'                 
           	                               + '</td></tr><tr><td style="width:80px;">林场</td><td>'+attr.林场 
           	                               + '</td></tr><tr><td>名称</td><td>'+ attr.Name                   
           	                               + '</td></tr><tr><td>经度</td><td>'+ attr.经度 
           	                               + '</td></tr><tr><td>纬度</td><td>'+ attr.纬度  
           	                               + '</td></tr></tbody></table></div>';
	           	               				layerIndex=layer.open({
           	               						type : 1,
           	               						shade:0,
           	               						title : '牧业点', 
           	               						content : htmlStr,
           	               						offset:  'rb',
           	               						area: 'auto',
           	               						anim: -1,
           	               						isOutAnim: false,
           	               						scrollbar :false,
           	               					});
           	               				}else{
           	               					layer.msg("请打开i键查询！")
           	               				}
           	               			}else if(layerName == '河流' && baseGeoMapLayers.visible && baseGeoMapLayers.findSublayerById(9).visible){
           	               				if(IkeyFlag){
           	               				 htmlStr = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;width:200px">'
           	                               + '<table class="layui-table" lay-even style="text-align:center;margin-bottom:-1px"><tbody>'                 
           	                               + '<td>河流id</td><td>'+attr.ID 
           	                               + '</td></tr><tr><td>名称</td><td>'+attr.名称                   
           	                               + '</td></tr></tbody></table></div>';
           	               				 layerIndex=layer.open({
           	               					 type : 1,
           	               					 shade:0,
           	               					 title : '河流', 
           	               					 content : htmlStr,
           	               					 offset:  'rb',
           	               					 area: 'auto',
           	               					 anim: -1,
           	               					 isOutAnim: false,
           	               					 scrollbar :false,
           	               				 });
           	               				}else{
           	               					layer.msg("请打开i键查询！")
           	               				}
           	               			}else if(layerName == '道路' && baseGeoMapLayers.visible && baseGeoMapLayers.findSublayerById(8).visible){
           	               				if(IkeyFlag){
           	               				 htmlStr = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;width:200px">'
           	                               + '<table class="layui-table" lay-even style="text-align:center;margin-bottom:-1px"><tbody>'                 
           	                               + '</td></tr><tr><td>名称</td><td>'+attr.名称 
           	                               + '</td></tr><tr><td>等级</td><td>'+ attr.等级                    
           	                               + '</td></tr></tbody></table></div>';
           	               					layerIndex=layer.open({
           	               						type : 1,
           	               						shade:0,
           	               						title : '道路', 
           	               						content : htmlStr,
           	               						offset:  'rb',
           	               						area: 'auto',
           	               						anim: -1,
           	               						isOutAnim: false,
           	               						scrollbar :false,
           	               					});
           	               				}else{
           	               					layer.msg("请打开i键查询！")
           	               				}
           	               			}else if(layerName == '小班面' && baseGeoMapLayers.visible && xiaobanLayer.visible){
           	               				if(IkeyFlag){
           	               					htmlStr = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;">'
           	               						+ '<table class="layui-table" lay-even style="text-align:center;margin-bottom:-1px"><tbody>'
           	               						+ '</td></tr><tr><td>林场</td><td>'+ attr.林场 
           	               						+ '</td></tr><tr><td>林班号</td><td>'+ attr.LIN_BAN 
           	               						+ '</td></tr><tr><td>小班号</td><td>' + attr.XIAO_BAN 
           	               						+ '</td></tr><tr><td>地类</td><td>'+ attr.土地种
           	               						+ '<tr><td>面积</td><td>'+ attr.MIAN_JI
           	               						+ '</td></tr><tr><td>优势树种</td><td>'+ attr.优势树
           	               						+ '</td></tr><tr><td>林种</td><td>'+ attr.林种
           	               						+ '</td></tr><tr><td>坡度</td><td>'+ attr.PO_DU 
           	               						+ '</td></tr><tr><td>坡向</td><td>'+ attr.坡向
           	               						+ '</td></tr><tr><td>郁闭度</td><td>'+ attr.YU_BI_DU                            
           	               						+ '</td></tr><tr><td>林地保护等级</td><td>'+ attr.保护等
           	               						+ '</td></tr></tbody></table></div>';
           	               				layerIndex=layer.open({
           	               								type : 1,
           	               								content : htmlStr,
           	               								title : '小班详情',
           	               								offset : 'rb',
           	               								resize : false,
           	               								area : 'auto',
           	               								anim: -1,
           	               								isOutAnim: false,
           	               								scrollbar :false,
           	               								shade:0
           	               							});
           	               				}else{
           	               					layer.msg("请打开i键查询！")
           	               				}
           	               			}
           	               		});
           			    	});
           			     }
           			    	
           			});},500);	  	
	           			//eventLayer.visible = true;   	
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
	           								color: "white",
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
	           								color: "white",
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
		});