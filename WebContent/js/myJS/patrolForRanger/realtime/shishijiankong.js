var localhostPath;
var projectName;
var tableHeight;
var playBackTimer;
var i = 0;
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
	
		tableHeight = $(window).height() -160;
		if(tableHeight > 430){
			tableHeight = 430;
		}
		window.clearInterval(playBackTimer);
		pageInit();
		playBackTimer = window.setInterval("pageInit()",30000);
});

/**
 * 获取当前日期
 */
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

var thisTable;

function pageInit() {
	
	// 获取路径
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
	
	var department = $("#department").val();
	if(department == "0"){
		department = "全部";
	}
	var mobile = $("#mobile").val();
	var personName = $("#personName").val();
	var projectType = $("#projectType").find("option:selected").text();

	layui.use('table',function() {
		thisTable = layui.table;
		// 第一个实例
		thisTable.render({
				id : 'layTable',
				elem : '#jqgrid',
				height : tableHeight,
				// limit : 30,
				// limits : [ 30, 60, 90 ],
				url : localhostPath + projectName+ '/realtime/queryLocation' // 数据接口
				,
				method : 'post' // 如果无需自定义HTTP类型，可不加该参数
				,
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
						field : 'id',
						title : 'ID',
						width : '20%',
						hide : true,
						fixed : 'left'
					},
					{
						field : 'personName',
						title : '用户名',
						align : 'center',
						width : '40%'
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
						hide : true,
						width : '30%'
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
						title : '人员信息',
						align : 'center',
						width : '30%',
						templet : function(d) {

							return '<img src="'
									+ projectName
									+ '/images/indexpage/gerenxinxi.png" onclick="showPersonalInfo('
									+ "'"
									+ d.LAY_TABLE_INDEX
									+ "'"
									+ ')" style="width:12px;height:13px;margin-left:10px;margin-top:8px;margin-right:10px;cursor:pointer;"/>'
						}
					},
					{
						field : 'title',
						title : '定位',
						width : '29%',
						align : 'center',
						templet : function(d) {
							return '<img src="'
									+ projectName
									+ '/images/indexpage/dingwei.png" onclick="positionTo('
									+ "'"
									+ d.LAY_TABLE_INDEX
									+ "'"
									+ ')" style="width:16px;height:16px;margin-left:10px;margin-top:8px;margin-right:10px;cursor:pointer;"/>'
						}
					} ] ],						
					done : function(res, curr, count) {
						$('.layui-table-header th').css('display', 'none');
						$(".layui-border-box").css("margin-top","0px");
						$('.layui-table-header span').css('color', '#038be9');
						$('.layui-table-header span').css('font-weight','700');
						$('.layui-table th,.layui-table td').css('font-size','14px');
						$(".layui-table-view .layui-table").css("width","100%");
						$(".layui-table-body").height(tableHeight);
						$(".layui-table-body").css("background","#fff");
						if(res.rows.length > 10){
							$("#title").css("width","93%");
						}else{
							$("#title").css("width","100%");
						}
						var dataObj = eval(res.rows);
                           // 标记人员点位
                           parent.markPersons(dataObj);
                           
					}				
				});
						
						/**
						 * *******************************************************
						 * 
						 * 窗口變化
						 * 
						 * *******************************************************
						 */
						$(window).resize(function() {
							thisTable.resize('layTable');
							$(".layui-table-view .layui-table").css("width","100%");
							tableHeight = $(window).height() - 160;
							if(tableHeight > 430){
								tableHeight = 430;
							}
							setTimeout(function() {
								pageInit();
							},1000);
						});
					});
	/**
	 * 条件查询
	 */
	$("#submit").off("click").on("click",function(){		
		pageInit();
	});	
}



/**
 * 条件查询
 * 
 * @returns
 */
/*function queryByCond() {
	
	var department = $("#department").val();
	if(department == "0"){
		department = "全部";
	}
	var mobile = $("#mobile").val();
	var personName = $("#personName").val();
	var projectType = $("#projectType").find("option:selected").text();

	thisTable.reload('layTable', {
		where : { // 设定异步数据接口的额外参数，任意设
			department : department,
			mobile : mobile,
			personName : personName,
			projectType : projectType
		// …
		},
		page : false // 关闭分页
	});
}*/

/**
 * 人员详情查看
 */
function showPersonalInfo(LAY_TABLE_INDEX) {

	var rowData = thisTable.cache.layTable[parseInt(LAY_TABLE_INDEX)]
	parent.openLayer(rowData);
	//parent.positionTo(rowData);
}

/**
 * 人员定位
 */
function positionTo(LAY_TABLE_INDEX) {
	var rowData = thisTable.cache.layTable[parseInt(LAY_TABLE_INDEX)]
	parent.positionTo(rowData);
}