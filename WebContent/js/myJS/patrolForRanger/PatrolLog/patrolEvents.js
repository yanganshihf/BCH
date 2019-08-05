var cookie_logingUser;
var localhostPath;
var projectName;
var indexTip = -1;
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

	// 页面加载完成之后执行
	var father_width = $(window.parent.document).find("#contentFrame").width();
	// 初始化
	pageInit();

	/*
	 * $("#jqgrid").setGridWidth($("#gridCond").width());
	 * $("#jqgrid").setGridHeight($(window).height() - 135);
	 */

	$("#analysis").on('click', function() {
		var aheight = $(top.document).height() -80;
		var awidth = $(top.document).width()- 30;
		var layerIndex = top.layer.open({
			type : 2,
			title : '事件统计',
			content : '/ResourceMonitor/jsp/patrolForRanger/PatrolLog/showEventStatistics.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
			// ['http://sentsin.com', 'no']
			offset:'60px',
			area : [awidth+'px',aheight+'px'],
			resize : false,
			shade: 0,
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
	var index = top.layer.confirm('确定删除?', function(index) {
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
				top.layer.close(index);
				top.layer.msg(req.msg);
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
	});

}

/**
 * 事件详情查看
 */
function showDetail(rowId) {
	
	var layerIndex =top.layer.open({
		type : 2,
		title : '事件详情',
		content : '/ResourceMonitor/jsp/patrolForRanger/PatrolLog/showEventDetail.jsp?rowId='+rowId, // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
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
			/*
			 * var longitude = req.rows[0].longitude; var latitude =
			 * req.rows[0].latitude;
			 */
			//
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
	// alert(rowId)
	var layerIndex = top.layer.open({
		type : 2,
		title : '回复事件',
		content : '/ResourceMonitor/jsp/patrolForRanger/PatrolLog/eventResp.jsp?rowId='+rowId, // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
		area : [ '655px', '465px' ],
		btn : [ '确定', '取消' ],
		yes : function(index, layero) {
			// do something
			var body = top.layer.getChildFrame('body', index);
			var iframeWin = top.window[layero.find('iframe')[0]['name']]; // 得到iframe页的窗口对象，执行iframe页的方法：
			// 获取事件id
			var respSuggestion = body.find('#respSuggestion').val();
			var currentdate = getCurrentDate(2);
			//
			// 查询事件详情
			$.ajax({
				url : localhostPath + projectName + '/event/respEvent', // 请求的url地址
				dataType : "json", // 返回格式为json
				async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
				data : {
					id : rowId,
					respSuggestion : respSuggestion,
					currentdate : currentdate,
					responsePeople : cookie_logingUser
				}, // 参数值
				type : "POST", // 请求方式
				beforeSend : function() {
					// 请求前的处理
				},
				success : function(req) {
					// 请求成功时处理
					top.layer.close(layerIndex);
					layer.msg(req.msg);
					$("[class^='"+rowId+"lock']").css("cursor","not-allowed");
			    	$("[class^='"+rowId+"lock']").attr("title", "已回复");
			    	$("[class^='"+rowId+"lock']").attr("src","/ResourceMonitor/images/indexpage/Greponse.png");
			    	$("[class^='"+rowId+"lock']").attr("onclick", "");
					//queryList();
				},
				complete : function() {
					// 请求完成的处理
				},
				error : function() {
					// 请求出错处理
				}
			});
			layer.close(layerIndex);
		},
		btn2 : function(index, layero) {
			// do something
			top.layer.close(layerIndex); // 如果设定了yes回调，需进行手工关闭
		}
	});
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
	var department = $("#department").val();
	if(department == "0"){
		department = "全部";
	}
	var projectType = $("#projectType").find("option:selected").text();
	var personName = $("#personName").val();
	var startTime = $("#startDatePicker").val();
	var endTime = $("#endDatePicker").val();
	var readState = $("#readState").val();
	var menus = localStorage.getItem('cookie_menu');
	layui.use('table',function() {
				thisTable = layui.table;
				
				// 第一个实例
				thisTable
						.render({
							id : 'layTable',
							elem : '#jqgrid',
							height : 'full-45',
							limit : 30,
							limits : [ 30, 60, 90 ],
							url : localhostPath + projectName + '/event/queryEvent' // 数据接口
							,
							page : true // 开启分页
							,
							method : 'post' // 如果无需自定义HTTP类型，可不加该参数
							,
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
									field : 'departmentName',
									title : '部门',
									width : '9%',
									align : 'center'	
								},
								{
									field : 'projectType',
									title : '工程类别',
									width : '8%',
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
										width : '8%'
									},
									{
										field : 'mobile',
										title : '电话',
										align : 'center',
										width : '12%'
									},
									{
										field : 'happenTime',
										title : '时间',
										align : 'center',
										width : '13%',
										sort : true
									},
									{
										field : 'eventText',
										title : '事件描述',
										align : 'center',
										width : '18%'
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
										title : '处理',
										width : '8%',
										align : 'center',
										templet : function(d) {
											if(d.statusCode == null){
												return '<span style="color:red;cursor:pointer;" id="'+d.id+'find" onclick="finded('
												+ "'"
												+ d.id
												+ "'"
												+ ')" class="'+d.id+'find">未处理</span>'
											}
											if(d.statusCode == "2"){
												return '<span style="color:#067862;" >排除</span>'
											}
											if(d.statusCode == "3"){
												return '<span style="color:#00b5ff;" >确认</span>'
											}
										}
									},
									{
										field : 'title',
										title : '详情',
										width : '6%',
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
										width : '6%',
										align : 'center',
										templet : function(d) {
											return '<img src="'
											+ projectName
											+ '/images/indexpage/dingwei.png" onclick="locateTo('
											+ "'"
											+ d.id
											+ "'"
											+ ')" style="width:16px;height:16px;margin:7px 7px 7px 7px;cursor:pointer;" title="定位"/>'
										}
									},{
										field : 'title',
										title : '回复',
										align : 'center',
										width : '6%',
										templet : function(d) {
											if (menus.indexOf("回复事件") > -1) {
												if(d.responsePeople == null){
													return '<img class="'+d.id+'lock" src="'
													+ projectName
													+ '/images/indexpage/reponse.png" onclick="reponseEve('
													+ "'"
													+ d.id
													+ "'"
													+ ')" style="width:16px;height:16px;margin:7px 7px 7px 7px;cursor:pointer;" title="回复"/>';
												}else{
													return '<img src="'
													+ projectName
													+ '/images/indexpage/Greponse.png" style="width:16px;height:16px;margin:7px 7px 7px 7px;cursor:not-allowed;" title="已回复"/>'
												}	
											}else{
												return '<img src="'
												+ projectName
												+ '/images/indexpage/reponse.png" style="width:16px;height:16px;margin:7px 7px 7px 7px;cursor:not-allowed;" title="无权限"/>'
											}
										}
									},{
										field : 'title',
										title : '删除',
										width : '6%',
										align : 'center',
										templet : function(d) {
											if (menus.indexOf("删除事件") > -1) {
												return '<img src="'
												+ projectName
												+ '/images/indexpage/delete.png" onclick="delEve('
												+ "'"
												+ d.id
												+ "'"
												+ ')" style="width:16px;height:16px;margin:7px 7px 7px 7px;cursor:pointer;" title="删除"/>';
											}else{
												return '<img src="'
												+ projectName
												+ '/images/indexpage/delete.png" style="width:16px;height:16px;margin:7px 7px 7px 7px;cursor:not-allowed;" title="无权限"/>';
											}
										}
									} ] ],
									done: function (res, curr, count) {
										$('.layui-table-header th').css('background-color', '#E6E6E6');
										$('.layui-table-header span').css('color','#058563');
							            $('.layui-table-header span').css('font-weight','700');
							            $('.layui-table th,.layui-table td').css('font-size','14px');
							            $('[id^="layui-table-page"]').css('text-align','center');
							            /*$(".layui-table-view .layui-table").css("width","100%");*/
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



function finded(rowId) {
	var id = '#'+rowId+'find'
	indexTip = layer.tips('<span style="color:#067862;cursor:pointer;" onclick="getID(2,' + "'"+ rowId +"'"+ ')">排除</span><br><span style="color:#00b5ff;cursor:pointer;" onclick="getID(3,' + "'"+ rowId +"'"+ ')" >确认</span>', id,{
		  tips: [2, '#f0f0f0']
	});	
}
function getID(type,id){
	layer.close(indexTip);
	$.ajax({
		url:localhostPath + projectName + '/event/Changestatus', //请求的url地址
		dataType:"json",   //返回格式为json
		async:true,//请求是否异步，默认为异步，这也是ajax重要特性
		data:{id:id,statusCode:type},    //参数值
		type:"POST",   //请求方式
		beforeSend:function(){
			//请求前的处理
		},
		success:function(req){	
			$("[class^='"+id+"find']").attr("onclick", "");
			if(type == "2"){
				$("[class^='"+id+"find']").css({"color":"#067862","cursor":"default"});
				$("[class^='"+id+"find']").html("排除");
			}else if(type == "3"){
				$("[class^='"+id+"find']").css({"color":"#00b5ff","cursor":"default"});
				$("[class^='"+id+"find']").html("确认");
			}
		},
		complete:function(){
        //请求完成的处理
		},
		error:function(){
        //请求出错处理
		}
	});
}

function queryList() {
	// 获取从查询参数
	department = $("#department").val();
	if(department == "0"){
		department = "全部";
	}
	personName = $("#personName").val();
	startTime = $("#startDatePicker").val();
	endTime = $("#endDatePicker").val();
	readState = $("#readState").val();
	projectType = $("#projectType").find("option:selected").text();

	thisTable.reload('layTable', {
		where : { // 设定异步数据接口的额外参数，任意设
			department : department,
			personName : personName,
			startTime : startTime,
			endTime : endTime,
			readState : readState,
			projectType : projectType
		// …
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});

}

function downloadExcel() {
	department = $("#department").val();
	if(department == "0"){
		department = "全部";
	}
	personName = $("#personName").val();
	startTime = $("#startDatePicker").val();
	endTime = $("#endDatePicker").val();
	readState = $("#readState").val();
	projectType = $("#projectType").find("option:selected").text();
	departmentName = $("#department").find("option:selected").text();
	
	var indexExport = top.layer.load(0);
	$.ajax({
		url : localhostPath + projectName + '/event/downevent',// 请求的url地址
		dataType : "json", // 返回格式为json
		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
		data : {
			'department' : department,
			'personName' : personName,
			'startTime' : startTime,
			'endTime' : endTime,
			'readState' : readState,
			'projectType' : projectType,
			'departmentName' : departmentName
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
					top.layer.close(indexExport);
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
}
