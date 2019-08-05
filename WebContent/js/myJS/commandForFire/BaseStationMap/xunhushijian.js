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
	
	var dateTime =  getNowFormatDate() +" ~ " + getNowFormatDate();
	layui.use('laydate',function(){
		laydate = layui.laydate;
	});
	laydate.render({ 
		elem: '#times'
		,range: '~' //或 range: '~' 来自定义分割字符
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
		var isDisplay = $('#panelHulin').css('display');
    	if(isDisplay != "none" && locationLayer.visible == false){
    		setTimeout(function() {
    			pageInit2();
			},300);
    		resizeFlag = 'shijian2';
    	}
		
		
		//pageInit2();
	});
});

var thisTable2;

function pageInit2() {
	var department = $("#department2").val();
	if(department == "0"){
		department = "全部";
	}
	var personName = $("#personName2").val();
	var projectType = "全部";
	var readState = $("#readState").val();
	var Time = $("#times").val().split(' ~ ');
	var startTime = Time[0];
	var endTime = Time[1];
	layui.use('table',function() {
		thisTable2 = layui.table;
		// 第一个实例
		thisTable2.render({
				id : 'layTable2',
				elem : '#jqgrid2',
				height : tableHeight2,
				limit : 30,
				limits : [ 30, 60, 90 ],
				url : localhostPath + projectName+ '/event/queryEvent' // 数据接口
				,
			  	page: {
			  		layout:['prev', 'page', 'next']			  		
			  	}
				,
				method : 'post' // 如果无需自定义HTTP类型，可不加该参数
				,
				skin: 'line', 
				request : {
					pageName : 'page' // 页码的参数名称，默认：page
					,
					limitName : 'rows' // 每页数据量的参数名，默认：limit
				},
				where : {
					department : department,
					startTime : startTime,
					personName : personName,
					endTime : endTime,
					readState : readState,
					projectType : projectType
				},
				response : {
					statusName : 'status' // 规定数据状态的字段名称，默认：code
					,statusCode : 200 // 规定成功的状态码，默认：0
					,msgName : 'msg' // 规定状态信息的字段名称，默认：msg
					,countName : 'records' // 规定数据总数的字段名称，默认：count
					,dataName : 'rows' // 规定数据列表的字段名称，默认：data
				},
				cols :[ [ // 表头
					{
						type : 'numbers',
						
						width : '10%'
					},
					{
						field : 'reportPeople',
						title : '巡护人员',
						align : 'center',
						width : '25%'
					},
					{
						field : 'departmentName',
						title : '单位',
						width : '35%',
						align : 'center',
					},
				
					{
						field : 'projectType',
						title : '工程类别',
						width : '10%',
						align : 'center',
						hide : true,
					},
					{
						field : 'eventPhoto',
						title : '照片',
						hide : true,
						width : '45%'
					},
						{
							field : 'eventRedio',
							title : '音频',
							hide : true,
							width : '20%',
							hide : true
						},
						
						{
							field : 'mobile',
							title : '电话',
							align : 'center',
							hide : true,
							width : '12%'
						},
						{
							field : 'happenTime',
							title : '时间',
							align : 'center',
							width : '15%',
							hide : true
						},
						{
							field : 'eventText',
							title : '事件描述',
							align : 'center',
							hide : true,
							width : '20%'
						},
						{
							field : 'eventVedio',
							title : '视频',
							hide : true,
							width : '30%'
						},
						
						{
							field : 'id',
							title : 'id',
							hide : true,
							width : '30%'
						},
						{
							field : 'responsePeople',
							title : '回复人员',
							hide : true,
							width : '30%'
						},
						{
							field : 'responseSuggestion',
							title : '回复内容',
							hide : true,
							width : '30%'
						},{
							field : 'responseTime',
							title : '回复时间',
							hide : true,
							width : '25%'
						},
						{
							field : 'uploadTime',
							title : '上传时间',
							hide : true,
							width : '25%'
						},
						{
							field : 'title',
							title : '详情',
							width : '15%',
							align : 'center',
							templet : function(d) {
								return '<img src="'
								+ projectName
								+ '/images/indexpage/details.png" onclick="showDetail('
								+ "'"
								+ d.id
								+ "'"
								+ ')" style="width:16px;height:16px;margin:7px 7px 7px 7px;cursor:pointer;" title="详情"/>'
							}
						},
						{
							field : 'title',
							title : '定位',
							width : '15%',
							align : 'center',
							templet : function(d) {
								//debugger;
								return '<img src="'
								+ projectName
								+ '/images/indexpage/dingwei.png" onclick="locateTo('
								+ "'"
								+ d.id
								+ "'"
								+ ')" style="width:16px;height:16px;margin:7px 7px 7px 7px;cursor:pointer;" title="定位"/>'
							}
						}] ],			
					done : function(res, curr, count) {
						$('.layui-table-header th').css('display', 'none');
						$('.layui-table-cell').css('padding','0px');
						$('.layui-table-view').css('margin','0px');
						$('[id^="layui-table-page"]').css('text-align', 'center');
						$(".layui-table-view .layui-table").css("width","100%");
						$("#shijian2 .layui-table-body").height(tableHeight2 - 40);
					}				
				});
			});
	/**
	 * 条件查询
	 */
	
}

$("#submit2").on('click', function() {
	//queryByCond2();
	pageInit2();
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
/**
 * 事件详情查看
 */
function showDetail(rowId) {
	var layerIndex =top.layer.open({
		type : 2,
		title : '事件详情',
		content : '/ResourceMonitor/jsp/commandForFire/BaseStationMap/layers/showEventDetail.jsp?rowId='+rowId, // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
		// ['http://sentsin.com', 'no']
		btn : [ '关闭' ],
		area : [ '655px', '440px' ],
		resize : false,
		yes : function(index, layero) {
			// do something
			top.layer.close(index);
			//top.layer.closeAll() // 如果设定了yes回调，需进行手工关闭
		},
		end : function(index, layero) {
			//queryList();
			//layer.closeAll() 
		}
	});
}

/**
 * 定位方法
 * 
 * @returns
 */
function locateTo(rowId) {
	$.ajax({
		url : localhostPath + projectName + '/event/findEventCoor', // 请求的url地址
		dataType : "json", // 返回格式为json
		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
		data : {
			id : rowId,
		}, // 参数值
		type : "POST", // 请求方式
		beforeSend : function() {
			// 请求前的处理
		},
		success : function(req) {
			locateToEvent(req.rows[0],rowId);
			//locateToEvent(req.rows[0]);
		},
		complete : function() {
			// 请求完成的处理
		},
		error : function() {
			// 请求出错处理
		}
	});
}


/*function showEVE(rowId){
	var EveWidth = $(window).width()/2;
	 var layerIndex =top.layer.open({
			type : 2,
			title : '事件详情',
			content : '/ResourceMonitor/jsp/patrolForRanger/PatrolLog/showEventDetail.jsp?rowId='+rowId, // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
			// ['http://sentsin.com', 'no']
			btn : [ '关闭' ],
			shade: 0,
			offset: ['80px',EveWidth+'px'],
			area : [ '550px', '440px' ],
			resize : false,
			yes : function(index, layero) {
				// do something
				top.layer.close(index); // 如果设定了yes回调，需进行手工关闭
			}	
	});
}*/
