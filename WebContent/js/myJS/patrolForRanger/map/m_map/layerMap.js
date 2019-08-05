// 初始加载
setTimeout(
		function() {
			// 加载底图 谷歌
			require(
					[ "esri/Map", "esri/views/MapView",
							"esri/layers/TileLayer",
							"esri/layers/MapImageLayer",
							"esri/layers/FeatureLayer","esri/layers/GraphicsLayer",
							"esri/widgets/LayerList", "esri/widgets/Expand","esri/core/urlUtils" ],
					function(Map, MapView, TileLayer, MapImageLayer,
							FeatureLayer,GraphicsLayer, LayerList, Expand,urlUtils) {
						
						urlUtils.addProxyRule({
					           urlPrefix : "http://39.104.66.222:6080/arcgis/rest/services",
					           // 本地环境
					           //proxyUrl : "http://127.1.1.1:8081/Java/proxy.jsp"
					           proxyUrl : "http://127.0.0.1:8078/Java/proxy.jsp"
					           // 发布环境
					           // proxyUrl : "http://39.104.66.222:8080/Java/proxy.jsp"
					       });
						
						// 影像图
						var imageTileLayer = new TileLayer(
								{
									url : "http://39.104.66.222:6080/arcgis/rest/services/YZQ_GF2/ImageServer",
									visible : true,
									title : "彭阳影像"
								});
						// 小班图层
						var base_Layer = new MapImageLayer(
								{
									url : "http://39.104.66.222:6080/arcgis/rest/services/yzGYL0828/MapServer",
									title : "林业基础数据",
									visible : getCookieValue('view_base'),
									sublayers : [ {
										id : 0,
										title : "天保小班",
										visible : getCookieValue('view_xb')
									} ]
								});
						// 行政界
						var lineLayer = new MapImageLayer(
								{
									url : "http://39.104.66.222:6080/arcgis/rest/services/yzDatezqj0828/MapServer",
									title : "行政界",
									visible : getCookieValue('view_xzj'),
									sublayers : [ {
										id : 1,
										title : "村界",
										visible : getCookieValue('view_cj')
									}, {
										id : 0,
										title : "乡界",
										visible : getCookieValue('view_xj')
									} ]
								});
						// 责任区
						// 特征图层 -巡护区划分（特征服务）
						patrolregion = new FeatureLayer(
								{
									url : "http://120.253.8.211:6080/arcgis/rest/services/patrol_region/FeatureServer",
									visible : getCookieValue('view_region'),
									title : "管护责任片区"
								});
						bufferLayer = new GraphicsLayer({
				            opacity : 0.80,
				            listMode : "hide"
				        });
						map.addMany([ base_Layer, lineLayer, patrolregion,bufferLayer ]);

						// 图层列表
						var layerList = new LayerList({
							container : document.createElement("div"),
							view : view
						});
						
						layerListExpand = new Expand({
							expandIconClass : "esri-icon-layer-list", // see
							// expandIconClass : "esri-icon-basemap", //
							// https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
							// expandTooltip: "Expand LayerList", // optional,
							// defaults to "Expand" for English locale
							view : view,
							content : layerList.domNode
						});
						view.ui.add(layerListExpand, "top-right");

						// 监听图层可见性变化,并存入cookies
						lineLayer.watch('visible',
								function(newValue, oldValue) {
									document.cookie = "view_xzj="
											+ (newValue ? 1 : 0) + ";path=/;";
									lineLayer.visible = newValue;
								});
						// 乡界
						lineLayer
								.findSublayerById(0)
								.watch(
										'visible',
										function(newValue, oldValue) {
											document.cookie = "view_xj="
													+ (newValue ? 1 : 0)
													+ ";path=/;";
											lineLayer.findSublayerById(0).visible = newValue;
										});
						// 村界
						lineLayer
								.findSublayerById(1)
								.watch(
										'visible',
										function(newValue, oldValue) {
											document.cookie = "view_cj="
													+ (newValue ? 1 : 0)
													+ ";path=/;";
											lineLayer.findSublayerById(1).visible = newValue;
										});
						// 基础数据
						base_Layer.watch('visible',
								function(newValue, oldValue) {
									document.cookie = "view_base="
											+ (newValue ? 1 : 0) + ";path=/;";
									base_Layer.visible = newValue;
								});
						// 小班
						base_Layer
								.findSublayerById(0)
								.watch(
										'visible',
										function(newValue, oldValue) {
											document.cookie = "view_xb = "
													+ (newValue ? 1 : 0)
													+ ";path=/;";
											base_Layer.findSublayerById(0).visible = newValue;
										});
						// 管护区
						patrolregion.watch('visible', function(newValue,
								oldValue) {
							document.cookie = "view_region="
									+ (newValue ? 1 : 0) + ";path=/;";
							patrolregion.visible = newValue;
						});
					});
		}, 1200);

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