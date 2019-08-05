var localhostPath;
var projectName;
var laydate;
var tableHeight2;

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
		$("#department2").append("<option value='" + eachDep[0] + "'>" + eachDep[1]+ "<oprion>");
	}
	
	tableHeight2 = $(window).height() - 300;
	if(tableHeight2 > 400){
		tableHeight2 = 400;
	}
	var dateTime =  getNowFormatDate() +" - " + getNowFormatDate();
	layui.use('laydate',function(){
		laydate = layui.laydate;
	});
	laydate.render({ 
		elem: '#times'
		,range: true //或 range: '~' 来自定义分割字符
		,value: dateTime
	});
	/**
	 * *******************************************************
	 * 
	 * 窗口變化
	 * 
	 * *******************************************************
	 */
	
	
	
	
	$(window).resize(function() {
		tableHeight2 = $(window).height() - 300;
		if(tableHeight2 > 400){
			tableHeight2 = 400;
		}
		pageInit2();
	});
});




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









var thisTable2;

function pageInit2() {
	var department = $("#department2").val();
	if(department == "0"){
		department = "全部";
	}
	var personName = $("#personName2").val();
	var projectType = "全部";
	var Time = $("#times").val().split(' - ');
	var startTime = Time[0];
	var endTime = Time[1];
	
	layui.use('table',function() {
		thisTable2 = layui.table;
		
		thisTable2.render({
			id : 'layTable2',
			elem : '#jqgrid2',
			height : tableHeight2,
			limit : 30,
			url : localhostPath + projectName + '/realtime/queryRegion' // 数据接口
			,
			method : 'post' // 如果无需自定义HTTP类型，可不加该参数
			,
			request : {
				//pageName : 'page' // 页码的参数名称，默认：page
				//,
				limitName : 'rows' // 每页数据量的参数名，默认：limit
			},
			where : {
				department : department,
				personName : personName,
				startTime : startTime,
				endTime : endTime,
				projectType:projectType
			},
			response : {
				statusName : 'status' // 规定数据状态的字段名称，默认：code
				,
				statusCode : 200 // 规定成功的状态码，默认：0
				,
				msgName : 'msg' // 规定状态信息的字段名称，默认：msg
				,
				countName : 'records' // 规定数据总数的字段名称，默认：count
				,
				dataName : 'rows' // 规定数据列表的字段名称，默认：data

			},
			cols : [ [ // 表头
					{
						field : 'departmentCode',
						title : '部门',
						width : '20%',
						hide : true,
						fixed : 'left'
					},
					{
						field : 'endTime',
						title : '结束时间',
						hide : true,
						width : '45%'
					},
					{
						field : 'id',
						title : 'id',
						hide : true,
						width : '20%',
						hide : true
					},
					{
						field : 'personName',
						title : '姓名',
						align : 'center',
						width : '20%'
					},
					{
						field : 'mobile',
						title : '电话',
						align : 'center',
						hide : true,
						width : '35%'
					},
					{
						field : 'patrolDate',
						title : '巡护日期',
						hide : true,
						width : '30%'
					},
					
					{
						field : 'startTime',
						title : '开始时间',
						hide : true,
						width : '30%'
					},
					{
						field : 'time',
						title : '起止时间',
						align : 'center',
						width : '50%'			
					},
					{
						field : 'trailLen',
						title : '里程',
						align : 'center',
						width : '15%',
						templet : function(d){
							var Length = parseFloat(d.trailLen).toFixed(1);
							return Length;
						}
					},
					{
						field : 'uploadtime',
						title : '上传时间',
						hide : true,
						width : '30%'
					},
					{
						field : 'title',
						title : '回放',
						width : '15%',
						align : 'center',
						templet : function(d) {
							return '<img src="'
							+ projectName
							+ '/images/indexpage/replay.png" onclick="replayTrack('+"'"+d.patrolDate+"'"+','+"'"+d.mobile+"'"
                       + ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="回放"/>'
						}
					}] ],
					
					done: function (res, curr, count) {
						
			            $('.layui-table th,.layui-table td').css('font-size','14px');
			            $('.layui-table-header th').css('display', 'none');
						$('.layui-table-cell').css('padding','0px');
						$('.layui-table-view').css('margin','0px');
						$('[id^="layui-table-page"]').css('text-align', 'center');
						//$(".layui-table-view .layui-table").css("width","100%");
						$(".layui-table-body").height(tableHeight2);
						if(res.rows.length > 8){
							$("#gridCond table").css("width","93%");
						}else{
							$("#gridCond table").css("width","100%");
						}
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
							thisTable2.resize('layTable2');
							$(".layui-table-view .layui-table").css("width","100%");
						});
					});	
			}

$("#submit2").on('click', function() {
	pageInit2();
});

