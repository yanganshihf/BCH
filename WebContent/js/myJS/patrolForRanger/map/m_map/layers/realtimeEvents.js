var cookie_logingUser;
var localhostPath;
var projectName;

/**
 * * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * *
 * 
 * 查看视频
 *  * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * *
 */
function vedioPlayer(vedioName) {

	parent.vedioPlayer(vedioName);
}

/**
 * * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * *
 * 
 * 播放音频
 *  * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * *
 */
function redioPlayer(redioName) {
	
	parent.redioPlayer(redioName);
}

/**
 * * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * *
 * 
 * 看图
 *  * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * *
 */
function viewPhoto(photosrc) {
	parent.viewPhoto(photosrc);
}
/**
 * 实时监控
 */
$(function() {
	// 获取路径
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);

	// 获取当前登陆用户名
	cookie_logingUser = localStorage.getItem('cookie_logingUser');
	// alert(cookie_logingUser);

	// 设置部门
	// 获取单位
	var cookie_department = localStorage.getItem('cookie_department');
	cookie_department = cookie_department.substring(0,
			cookie_department.length - 1);
	// 每个单位id-名称
	var eachDepart = cookie_department.split("&");
	// 遍历
	for (var i = 0; i < eachDepart.length; i++) {
		var eachDep = eachDepart[i].split("-");
		// 添加选项 department为select的id
		$("#department")
				.append(
						"<option value='" + eachDep[0] + "'>" + eachDep[1]
								+ "<oprion>")
	}

	var myDate = getNowFormatDate();
	$("#startDatePicker").val(myDate);
	$("#endDatePicker").val(myDate);

	layui.use('laydate', function(){
		laydate = layui.laydate;
		laydate.render({
			elem : '#startDatePicker' // 指定元素
			,
			showBottom : false
		});
		laydate.render({
			elem : '#endDatePicker' // 指定元素
			,
			showBottom : false
		});
    });
	

	// 页面加载完成之后执行
	var father_width = $(window.parent.document).find("#contentFrame").width();
	// 初始化
	pageInit();

	/*
	 * $("#jqgrid").setGridWidth($("#gridCond").width());
	 * $("#jqgrid").setGridHeight($(window).height() - 135);
	 */

	$("#close").on('click', function() {
		parent.showFrame('地图');
	});

});

$(window).resize(function() {
	var father_width = $(window.parent.document).find("#contentFrame").width();
	/*
	 * $("#jqgrid").setGridWidth($("#gridCond").width());
	 * $("#jqgrid").setGridHeight($(window).height() - 135);
	 */
});

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1)
				c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}

/**
 * 删除事件
 */
function delEve(rowId) {
	  layui.use('layer', function(){
	        layer = layui.layer;
	        layer.confirm('确定删除?', function(index) {
	    		// do something
	    		/*
	    		 * alert(localhostPath); alert(projectName);
	    		 */
	    		$.ajax({
	    			url : localhostPath + projectName + '/event/delEvent', // 请求的url地址
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
	    				// 请求成功时处理
	    				layer.msg(req.msg);
	    				// 刷新页面
	    				queryList();
	    			},
	    			complete : function() {
	    				// 请求完成的处理
	    			},
	    			error : function() {
	    				// 请求出错处理
	    			}
	    		});
	    		layer.close(index);
	    	});
	   });
	

}

/**
 * 事件详情查看
 */
function showDetail(rowId,index) {
	parent.showDetail(rowId);
	$("[data-index='"+index+"']").css("display","none");
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
			/*
			 * var longitude = req.rows[0].longitude; var latitude =
			 * req.rows[0].latitude;
			 */
			parent.locateToEvent(req.rows[0],rowId);	
		},
		complete : function() {
			// 请求完成的处理
		},
		error : function() {
			// 请求出错处理
		}
	});
}

/**
 * 回复事件方法
 * 
 * @param rowId
 * @returns
 */
function reponseEve(rowId) {
	
	$("#eventID").val(rowId);
	
	parent.reponseEve(rowId);
}

/**
 * 获取当前时间 format=1精确到天 format=2精确到分
 */
function getCurrentDate(format) {
	var now = new Date();
	var year = now.getFullYear(); // 得到年份
	var month = now.getMonth();// 得到月份
	var date = now.getDate();// 得到日期
	var day = now.getDay();// 得到周几
	var hour = now.getHours();// 得到小时
	var minu = now.getMinutes();// 得到分钟
	var sec = now.getSeconds();// 得到秒
	month = month + 1;
	if (month < 10)
		month = "0" + month;
	if (date < 10)
		date = "0" + date;
	if (hour < 10)
		hour = "0" + hour;
	if (minu < 10)
		minu = "0" + minu;
	if (sec < 10)
		sec = "0" + sec;
	var time = "";
	// 精确到天
	if (format == 1) {
		time = year + "-" + month + "-" + date;
	}
	// 精确到分
	else if (format == 2) {
		time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":"
				+ sec;
	}
	return time;
}

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

// 新建表单实例
var thisTable;

function pageInit() {
	// 获取路径
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	var localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	var projectName = pathname
			.substring(0, pathname.substr(1).indexOf('/') + 1);

	// 获取从查询参数
	/*var department = $("#department").val();
	var projectType = $("#projectType").find("option:selected").text();
	var personName = $("#personName").val();
	var startTime = $("#startDatePicker").val();
	var endTime = $("#endDatePicker").val();
	var readState = $("#readState").val();*/
	
	var menus = localStorage.getItem('cookie_menu');
	layui.use('table',function() {
				thisTable = layui.table;
				
				// 第一个实例
				thisTable
						.render({
							id : 'layTable',
							elem : '#jqgrid',
							height : 'full-30',
							limit : 30,
							limits : [ 30, 60, 90 ],
							url : localhostPath + projectName + '/event/realtimeEvent' // 数据接口
							,
							page : false // 开启分页
							,
							method : 'post' // 如果无需自定义HTTP类型，可不加该参数
							,
							request : {
								pageName : 'page' // 页码的参数名称，默认：page
								,
								limitName : 'rows' // 每页数据量的参数名，默认：limit

							},
							/*where : {
								department : department,
								startTime : startTime,
								personName : personName,
								endTime : endTime,
								readState : readState,
								projectType : projectType
							},*/
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
									width : '10%',
									hide : true,
									align : 'center',
									templet: function(d){
										// 设置部门
										// 获取单位
										var cookie_department = localStorage.getItem('cookie_department');
										cookie_department = cookie_department.substring(0,
												cookie_department.length - 1);
										// 每个单位id-名称
										var eachDepart = cookie_department.split("&");
										// 遍历
										for (var i = 0; i < eachDepart.length; i++) {
											var eachDep = eachDepart[i].split("-");
											// 添加选项 department为select的id
											if (eachDep[0] == d.departmentCode) {
												return eachDep[1];
											}
										}
										
								    }
									
								},
								{
									field : 'projectType',
									title : '工程类别',
									width : '10%',
									hide : true,
									align : 'center',
									
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
										field : 'reportPeople',
										title : '巡护人员',
										align : 'center',
										width : '20%'
									},
									{
										field : 'mobile',
										title : '电话',
										align : 'center',
										width : '24%'
									},
									{
										field : 'happenTime',
										title : '时间',
										hide : true,
										align : 'center',
										width : '15%',
									},
									{
										field : 'eventText',
										title : '事件描述',
										align : 'center',
										width : '17%'
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
										width : '17%'
									},
									{
										field : 'uploadTime',
										title : '上传时间',
										hide : true,
										width : '15%'
									},
									{
										field : 'title',
										title : '详情',
										width : '13%',
										align : 'center',
										templet : function(d) {
											return '<img src="'
											+ projectName
											+ '/images/indexpage/details.png" onclick="showDetail('
											+ "'"
											+ d.id
											+ "'"
											+ ","
											+ "'"
											+ d.LAY_TABLE_INDEX
											+ "'"
											+ ')" style="width:16px;height:16px;margin:10px 10px 5px 5px;cursor:pointer;" title="详情"/>'
										}
									},
									{
										field : 'title',
										title : '定位',
										width : '13%',
										align : 'center',
										templet : function(d) {
											return '<img src="'
											+ projectName
											+ '/images/indexpage/dingwei.png" onclick="locateTo('
											+ "'"
											+ d.id
											+ "'"
											+ ')" style="width:16px;height:16px;margin:10px 10px 5px 5px;cursor:pointer;" title="定位"/>'
										}
									},{
										field : 'title',
										title : '回复',
										align : 'center',
										width : '13%',
										templet : function(d) {
											if (menus.indexOf("回复事件") > -1) {
												return '<img src="'
												+ projectName
												+ '/images/indexpage/reponse.png" onclick="reponseEve('
												+ "'"
												+ d.id
												+ "'"
												+ ')" style="width:16px;height:16px;margin:10px 10px 5px 5px;cursor:pointer;" title="回复"/>';
											}else{
												return '<img src="'
												+ projectName
												+ '/images/indexpage/reponse.png" style="width:16px;height:16px;margin:10px 10px 5px 5px;cursor:not-allowed;" title="回复"/>'
											}
										}
									} ] ],
									done: function (res, curr, count) {
							            $('.layui-table-header span').css('color','#058563');
							            $('.layui-table-header span').css('font-weight','700');
							            //$(".layui-table-view .layui-table").css("width","100%");
							            $('.layui-table-cell').css('padding','0px');
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
						});
					});

	/**
	 * 条件查询
	 */
	$("#submit").on('click', function() {
		queryList();
	});

	$("#excel").on('click', function() {
		downloadExcel();
	});
}

function queryList() {
	// 获取从查询参数
	/*department = $("#department").val();
	personName = $("#personName").val();
	startTime = $("#startDatePicker").val();
	endTime = $("#endDatePicker").val();
	readState = $("#readState").val();
	projectType = $("#projectType").find("option:selected").text();
*/
	thisTable.reload('layTable', {
		/*where : { // 设定异步数据接口的额外参数，任意设
			department : department,
			personName : personName,
			startTime : startTime,
			endTime : endTime,
			readState : readState,
			projectType : projectType
		// …
		},*/
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});

}

function downloadExcel() {
	department = $("#department").val();
	personName = $("#personName").val();
	startTime = $("#startDatePicker").val();
	endTime = $("#endDatePicker").val();
	readState = $("#readState").val();

	 layui.use('layer', function(){
	        layer = layui.layer;
	        var indexExport = layer.load(0);
	    	$.ajax({
	    		url : localhostPath + projectName + '/event/downevent',// 请求的url地址
	    		dataType : "json", // 返回格式为json
	    		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
	    		data : {
	    			'department' : department,
	    			'personName' : personName,
	    			'startTime' : startTime,
	    			'endTime' : endTime,
	    			'readState' : readState
	    		},
	    		type : "POST", // 请求方式
	    		beforeSend : function() {
	    			// 请求前的处理
	    		},
	    		success : function(respText) {
	    			respText = $.parseJSON(respText);
	    			// 请求成功时处理
	    			var title = respText.title;
	    			// var location = "../excel/"+title+".xls";
	    			var location = "/ResourceMonitor/excel/" + title + ".xls";
	    			top.layer.open({
	    				content : '<center><span>' + respText.msg + '</span></center>',
	    				success : function(layero, index) {
	    					// 下载文件
	    					var $form = $('<form method="GET"></form>');
	    					$form.attr('action', location);
	    					$form.appendTo($('body'));
	    					$form.submit();
	    					layer.close(indexExport);
	    				},
	    				cancel : function(index, layero) {
	    					// 删除临时文件
	    				}
	    			});
	    		},
	    		complete : function() {
	    			// 请求完成的处理
	    		},
	    		error : function() {
	    			// 请求出错处理
	    		}
	    	});
	 });
	
}
