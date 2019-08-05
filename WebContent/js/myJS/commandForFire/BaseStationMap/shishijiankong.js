var localhostPath;
var projectName;
/**
 * 实时监控
 */
$(function() {
	// 获取单位
	var cookie_department = localStorage.getItem('cookie_department');
	cookie_department = cookie_department.substring(0,
			cookie_department.length - 1);
	// 每个单位id-名称
	var eachDepart = cookie_department.split("&");
	for (var i = 0; i < eachDepart.length; i++) {
		var eachDep = eachDepart[i].split("-");
		$("#department").append("<option value='" + eachDep[0] + "'>" + eachDep[1]+ "<oprion>");
	}
	/**
	 * *******************************************************
	 * 
	 * 窗口變化
	 * 
	 * *******************************************************
	 */
	$(window).resize(function() {
		tableHeight = $("#panelHulin").height() - 165
		var isDisplay = $('#panelHulin').css('display');
    	if(isDisplay!='none'&&locationLayer.visible == true){
    		setTimeout(function() {
    			pageInit();
			},300);
    		resizeFlag = 'shijian1';
    	}
	});
});

var thisTable;

function pageInit() {
	var department = $("#department").val();
	if(department == "0"){
		department = "全部";
	}
	var mobile = "";
	var personName = $("#personName").val();
	var projectType = "全部";
	layui.use('table',function() {
		thisTable = layui.table;
		// 第一个实例
		thisTable.render({
				id : 'layTable',
				elem : '#jqgrid1',
				height : tableHeight,
				// limit : 30,
				// limits : [ 30, 60, 90 ],
				url : localhostPath + projectName+ '/realtime/queryLocation' // 数据接口
				,
				method : 'post' // 如果无需自定义HTTP类型，可不加该参数
				,
				skin: 'line', 
			  	page: {
			  		layout:['prev', 'page', 'next']			  		
			  	},
				where : {
					department : department,
					mobile : mobile,
					personName : personName,
					projectType : projectType
				},
				response : {
					statusName : 'status' // 规定数据状态的字段名称，默认：code
					,statusCode : 200 // 规定成功的状态码，默认：0
					,msgName : 'msg' // 规定状态信息的字段名称，默认：msg
					,countName : 'records' // 规定数据总数的字段名称，默认：count
					,dataName : 'rows' // 规定数据列表的字段名称，默认：data
				},
				cols : [ [ // 表头
					{
						type : 'numbers',
						
						width : '10%'
					},
					{
						field : 'id',
						title : 'ID',
						width : '20%',
						hide : true,
						fixed : 'left'
					},
					{
						field : 'personName',
						title : '巡护人员',
						align : 'center',
						width : '25%'
					},
					{
						field : 'personSex',
						title : '性别',
						hide : true,
						width : '20%',
						hide : true
					},
					{
						field : 'department',
						title : '单位',
						width : '35%',
						align : 'center',
					},
					{
						field : 'departmentVal',
						title : '单位id',
						hide : true,
						width : '30%'
					},
					{
						field : 'employDate',
						title : '聘用日',
						hide : true,
						width : '30%'
					},
					{
						field : 'identifyPhoto',
						title : '照片',
						hide : true,
						width : '30%'
					},
					{
						field : 'latitude',
						title : '纬度',
						hide : true,
						width : '30%'
					},
					{
						field : 'longitude',
						title : '经度',
						hide : true,
						width : '30%'
					},
					{
						field : 'mobile',
						title : '电话',
						hide : true,
						width : '30%'
					},
					{
						field : 'xCoor',
						title : '横坐标',
						hide : true,
						width : '30%'
					},

					{
						field : 'yCoor',
						title : '纵坐标',
						hide : true,
						width : '25%'
					},						
					{
						field : 'title',
						title : '详情',
						align : 'center',
						width : '15%',
						templet : function(d) {
							return '<img src="'
									+ projectName
									+ '/images/indexpage/gerenxinxi.png" onclick="showPersonalInfo('
									+ "'"
									+ d.LAY_TABLE_INDEX
									+ "'"
									+ ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;"/>'
						}
					},
					{
						field : 'title',
						title : '定位',
						width : '15%',
						align : 'center',
						templet : function(d) {
							return '<img src="'
									+ projectName
									+ '/images/indexpage/dingwei.png" onclick="position('
									+ "'"
									+ d.LAY_TABLE_INDEX
									+ "'"
									+ ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;"/>'
						}
					} ] ],						
					done : function(res, curr, count) {
						$('.layui-table-header th').css('display', 'none');
						$('.layui-table-cell').css('padding','0px');
						$('.layui-table-view').css('margin','0px');
						$('[id^="layui-table-page"]').css('text-align', 'center');
						$(".layui-table-view .layui-table").css("width","100%");
						$("#shijian1 .layui-table-body").height(tableHeight - 41);
						var dataObj = eval(res.rows);
                           // 标记人员点位
                           markPersons(dataObj);
					}	
				
				});
			});
	/**
	 * 条件查询
	 */
	
}

$("#submit").on('click', function() {
	//queryByCond();
	pageInit();
});	

/**
 * 人员详情查看
 */
function showPersonalInfo(LAY_TABLE_INDEX) {

	var rowData = thisTable.cache.layTable[parseInt(LAY_TABLE_INDEX)]
	openLayer(rowData);
	//positionTo(rowData);
}

/**
 * 人员定位
 */
function position(LAY_TABLE_INDEX) {
	var rowData = thisTable.cache.layTable[parseInt(LAY_TABLE_INDEX)]
	positionTo(rowData);
}


//标记人员位置点
function markPersons(dataObj){
	/**
	 * *******************************************************
	 * 
	 * 标记人员
	 * 
	 * ******************************************************
	 */
		view.graphics.removeAll();
		map.remove(trackLasyer);
		locationLayer.removeAll();
		require([ "esri/Map", "esri/geometry/Point",
				"esri/symbols/PictureMarkerSymbol", "esri/Graphic",
				"esri/symbols/Font", "esri/symbols/TextSymbol",
				"esri/layers/GraphicsLayer" ], function(Map, Point,
				PictureMarkerSymbol, Graphic, esriFont, TextSymbol, GraphicsLayer) {
			
			var markerSymbol = {
					type : "picture-marker", // autocasts as new
					// PictureMarkerSymbol()
					url : "/ResourceMonitor/images/mark/32/person_navy.png",
					width : 20,
					height : 20,
					xoffset : 0,
					yoffset : 8
				};
			for (var i = 0; i < dataObj.length; i++) {
				// 利用经纬度信息创建巡护人员坐标点
				var pt = new Point(dataObj[i].longitude, dataObj[i].latitude);
				// 巡护人员坐标点的表示符号
				
				// 利用经纬度及符号画出巡护人员点
				var graphic = new Graphic({
					geometry : pt,
					symbol : markerSymbol
				});

				// 设置点图形的属性信息
				
				graphic.attributes = {
					"personName" : dataObj[i].personName,
					"personSex" : dataObj[i].personSex,
					"mobile" : dataObj[i].mobile,
					"longitude" : dataObj[i].longitude,
					"latitude" : dataObj[i].latitude,
					"xCoor" : dataObj[i].xCoor,
					"yCoor" : dataObj[i].yCoor,
					"projectType" : dataObj[i].projectType,
					"departmentVal" : dataObj[i].departmentVal,
					"regionNum" : dataObj[i].regionNum,
					"regionArea" : dataObj[i].regionArea,
					"regionName" : dataObj[i].regionName,
					"employDate" : dataObj[i].employDate,
					"identifyPhoto" : dataObj[i].identifyPhoto,
					"GRAPHYFLAG" : 2
				};

				// 将点图形添加在图层中
						
				var name = dataObj[i].personName;
				// 标出在线设备的名称
				var text = new TextSymbol({
					text : "                  "+ name,
					font : {
						size : 12,
						family : "宋体",
						weight : "bold"
					},
					color : new dojo.Color([ 0, 121, 193, 3 ]),
					xoffset : 30,
					yoffset : 30,
				});
				var labelGraphic = new Graphic(pt, text);	
				locationLayer.add(labelGraphic);
				locationLayer.add(graphic);
			}
			
			
		});
}


function openLayer(data) {
	layer.closeAll();
	var personInfo = layer.open({
		type : 2,
		shade : 0,
		title : [ "人员信息", 'font-size:15px;'],
		content : '/ResourceMonitor/jsp/commandForFire/BaseStationMap/layers/personInfo.jsp',
		id : 'personInfo',
		resize : false,
		anim : -1,
		area : [ '230px', '450px' ],
		offset : 'r',
		isOutAnim : false,
		success : function(layero, index) {
			var body = layer.getChildFrame('body', index);
			//
			// 设置人员照片
			// 
			if (data.identifyPhoto.length > 0) {
				body.find('#identifyPhoto').attr("src",
						"/ResourceMonitor/IdentifyPhoto/" + data.identifyPhoto);
			}

			//
			// 翻译单位字段
			// 
			var cookie_department = localStorage.getItem('cookie_department');
			cookie_department = cookie_department.substring(0,
					cookie_department.length - 1);
			// 每个单位id-名称
			var eachDepart = cookie_department.split("&");

			for (var i = 0; i < eachDepart.length; i++) {
				var eachDep = eachDepart[i].split("-");

				if (data.departmentVal == eachDep[0]) {
					body.find('#department').html(eachDep[1]);
				}
			}

			body.find('#personName').html(data.personName);

			if (data.personSex == '1') {
				body.find('#personSex').html('男');
			} else {
				body.find('#personSex').html('女');
			}

			body.find('#mobile').html(data.mobile);
			body.find('#employDate').html(data.employDate);
			body.find('#longitude').html(data.longitude);
			body.find('#latitude').html(data.latitude);
			body.find('#xCoor').html(data.xCoor);
			body.find('#yCoor').html(data.yCoor);
		}
	});
}