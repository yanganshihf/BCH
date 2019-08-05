var layerEve;
//
//
// 退出方法
//
//
function SystemOut() {
	localStorage.clear();
	window.location.href = "/ResourceMonitor/login.jsp";
/*	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);

	$.post(localhostPath + projectName + '/user/logout.action', function(
			respText) {
		respText = $.parseJSON(respText);
		if (respText.msg == "success") {
			// 跳转到map.jsp
			window.location.href = "/ResourceMonitor/login.jsp";
		}
	});*/
}
function GoBack(){
	window.location.href = "/ResourceMonitor/FunctionMenu.jsp";
}


/*function clearAllCookie() {
	
	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	if (keys) {
		for (var i = keys.length; i--;)
			document.cookie = keys[i] + '=0;expires='
					+ new Date(0).toUTCString()
	}
	document.cookie = "";
}*/
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


function smallRealtimeMonitor() {
	var childWindow = $("#mapFrame")[0].contentWindow;
	if (Frame == "monitor") {
		if (openMFlag) {
			monitorClose();
			childWindow.closeImg();
		} else {
			monitorOpen();
			childWindow.openImg();
		}
	} else if (Frame == "trail") {
		if (openTFlag) {
			trailClose();
			childWindow.closeImg();
		} else {
			trailOpen();
			childWindow.openImg();
		}
	}
}

//
//
// 轨迹回放
//
//
function replayTrack(patrolDate, mobile) {
	var childWindow = $("#mapFrame")[0].contentWindow;
	childWindow.replayTrack(patrolDate, mobile);
}
function locateToEvent(data,rowId) {
	if(eventFlag == 1){
		var EveWidth = $(window).width()/2 - 600;
		layer.open({
			type : 2,
			title : '事件定位',
			area : [ '600px', '550px' ],
			offset: ['80px',EveWidth+'px'],
			content : 'm_map/positionLayer_eve.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:											// // ['http://sentsin.com',										// 'no']
			success : function(layero, index) {
				var body = layer.getChildFrame('body', index);
				body.find("#rowId").val(rowId);
				body.find("#width").val($(window).width()/2);
				body.find('#longitude').val(data.longitude);
				body.find('#latitude').val(data.latitude);
			},
			cancel: function(index, layero){ 
			    layer.close(index);
			}    
		});
	}else{
		var childWindow = $("#mapFrame")[0].contentWindow;
		childWindow.locateToEVE(data,rowId);
	}
}
function showEVE(rowId){
	top.layer.close(layerEve);
	var EveWidth = $(window).width()/2;
	 layerEve =top.layer.open({
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
}
function locateToSos(data) {
	
	if(eventFlag == 1){
		layer.open({
			type : 2,
			title : 'sos定位',
			area : [ '600px', '550px' ],
			content : 'm_map/positionLayer_sos.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
			// ['http://sentsin.com', 'no']
			success : function(layero, index) {
				var body = layer.getChildFrame('body', index);
				body.find('#longitude').val(data.longitude);
				body.find('#latitude').val(data.latitude);
			}
		});
	}else{
		var childWindow = $("#mapFrame")[0].contentWindow;
		childWindow.locateToSos(data);
	}
}

function locateRegion(id) {
	layer.open({
		type : 2,
		title : '责任区定位',
		area : [ '600px', '550px' ],
		content : 'm_map/positionLayer_region.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
		// ['http://sentsin.com', 'no']
		success : function(layero, index) {
			var body = layer.getChildFrame('body', index);
			body.find('#id').val(id);
		}
	});
}


//
//
// 预览图片
// 
//
function viewPhoto(photosrc) {
	if (photosrc == "noPhoto") {
		
	}else{
		$("#view_Photo").attr("src", photosrc);
		
	}
	setTimeout(function() {
		$('#images').viewer();
		$('#view_Photo').click();
		$(".viewer-container").css("z-index","30000000");
	}, 300);
	
}

//
//
// 播放視頻
// 
//
function vedioPlayer(vedioName) {

	var vedioPlayer = layer.open({
		type : 2,
		area : [ '800px', '600px' ],
		resize : false,
		title : '视频播放',
		offset:'60px',
		content : '/ResourceMonitor/jsp/patrolForRanger/PatrolLog/vedioPlayer.jsp?' + encodeURI(vedioName)
	});
}

// 
//
// 播放音頻
//	
//
function redioPlayer(redioName) {

	var redioPlayer = layer.open({
		type : 2,
		title : '音频播放',
		resize : false,
		area : [ '800px', '600px' ],
		content : '/ResourceMonitor/jsp/patrolForRanger/PatrolLog/vedioPlayer.jsp?' + encodeURI(redioName)
	});
}

//
// 刷新时时监控列表
//
//
function refresh_ssjk() {
	setTimeout(function() {
		var childWindow = $("#contentFrame")[0].contentWindow;
		childWindow.queryByCond();
	}, 300);
}

/*// 标记人员点位
function markPersons(dataObj) {
	//debugger;
	var childWindow = $("#mapFrame")[0].contentWindow;
	//debugger;
	//childWindow.markPositions(dataObj);
	childWindow.markPersons(dataObj);
}*/

// 实时事件 计时器
queryRealtimeEvent();
queryRealtimeSos();
queryWaringAttence();
var timer_event = setInterval(queryRealtimeEvent, 30000);
var timer_sos = setInterval(queryRealtimeSos, 30000);
var timer_waringAttence = setInterval(queryWaringAttence, 30000);

var localhostPath;
var projectName;
var queryWaringAttence;
/**
 * ********************************************************
 * 
 * 出勤预警
 * 
 * ********************************************************
 */
function queryWaringAttence(){
	// alert("11111")
	// 查询实时事件
	// 获取路径
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
	$.ajax({
		url : localhostPath + projectName + '/attence/attenceWarning', // 请求的url地址
		dataType : "json", // 返回格式为json
		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
		type : "POST", // 请求方式
		beforeSend : function() {
			// 请求前的处理
		},
		success : function(req) {
			$("#img_chuqin").attr("src", "/ResourceMonitor/images/menuIcon/warning_chuqin.gif");
			
		},
		complete : function() {
			// 请求完成的处理
		},
		error : function() {
			// 请求出错处理
		}
	});
}

//
//
// 定位方法
//
//
//
function positionTo(data) {
	var childWindow = $("#mapFrame")[0].contentWindow;
	childWindow.positionTo(data);
}



/**
 * ********************************************************
 * 
 * 实时事件
 * 
 * ********************************************************
 */
function queryRealtimeEvent() {
	// alert("11111")
	// 查询实时事件
	// 获取路径
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);

	$.ajax({
		url : localhostPath + projectName + '/event/hasRealtimeEvent', // 请求的url地址
		dataType : "json", // 返回格式为json
		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
		type : "POST", // 请求方式
		beforeSend : function() {
			// 请求前的处理
		},
		success : function(req) {
			// 请求成功时处理
			// 如果有实时事件
			
			if (req) {
				// 渲染表头
				$("#sssj_img").attr("src", "/ResourceMonitor/images/menuIcon/event.gif");
				
				
			} else {
				$("#sssj_img").attr("src", "/ResourceMonitor/images/menuIcon/event.png");
				
			}
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
 * ********************************************************
 * 
 * 实时sos
 * 
 * ********************************************************
 */
function queryRealtimeSos() {
	// 获取路径
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
	
	// 查询实时sos
	$.ajax({
		url : localhostPath + projectName + '/sos/hasRealtimeSos', // 请求的url地址
		dataType : "json", // 返回格式为json
		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
		type : "POST", // 请求方式
		beforeSend : function() {
			// 请求前的处理
		},
		success : function(req) {
			// 请求成功时处理
			if (req) {
				// 渲染表头
				$("#sos_img").attr("src", "/ResourceMonitor/images/menuIcon/warning.gif");
				
				
			} else {
				$("#sos_img").attr("src", "/ResourceMonitor/images/menuIcon/warning.png");
				
			}
		},
		complete : function() {
			// 请求完成的处理
		},
		error : function() {
			// 请求出错处理
		}
	});
}


function showDetail(rowId) {
	debugger;
	$("#eventID").val(rowId);
	var layerIndex = layer.open({
		type : 2,
		title : '事件详情',
		content : '/ResourceMonitor/jsp/patrolForRanger/PatrolLog/showEventDetail.jsp?rowId='+rowId, // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
		// ['http://sentsin.com', 'no'] 
		btn : [ '关闭' ],
		area : [ '655px', '440px' ],
		resize : false,
		yes : function(index, layero) {
			// do something
			layer.close(layerIndex); // 如果设定了yes回调，需进行手工关闭
		},
		end : function(index, layero) {
			//queryList();
		},
		success : function(layero, index) {
		}
	});
}

function reponseEve(rowId) {
	// alert(rowId);
	$("#eventID").val(rowId);
	var logUser = localStorage.getItem('cookie_logingUser');
	var layerIndex = layer.open({
		type : 2,
		title : '回复事件',
		content : '/ResourceMonitor/jsp/patrolForRanger/PatrolLog/eventResp.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
		area : [ '655px', '467px' ],
		btn : [ '确定', '取消' ],
		yes : function(index, layero) {
			// do something
			var body = layer.getChildFrame('body', index);
			var iframeWin = window[layero.find('iframe')[0]['name']]; // 得到iframe页的窗口对象，执行iframe页的方法：
			// 获取事件id
			var respSuggestion = body.find('#respSuggestion').val();
			var currentdate = getCurrentDate(2);

			// 查询事件详情
			$.ajax({
				url : localhostPath + projectName + '/event/respEvent', // 请求的url地址
				dataType : "json", // 返回格式为json
				async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
				data : {
					id : rowId,
					respSuggestion : respSuggestion,
					currentdate : currentdate,
					responsePeople : logUser
				}, // 参数值
				type : "POST", // 请求方式
				beforeSend : function() {
					// 请求前的处理
				},
				success : function(req) {
					// 请求成功时处理
					layer.close(layerIndex);
					layer.msg(req.msg);
					//queryList();
				},
				complete : function() {
					// 请求完成的处理
				},
				error : function() {
					// 请求出错处理
				}
			});

		},
		btn2 : function(index, layero) {
			// do something
			layer.close(layerIndex); // 如果设定了yes回调，需进行手工关闭
		},
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
 * SOS详情查看
 */
function showSOSDetail(rowId) {
	$("#sosId").val(rowId);
	var layerIndex = layer.open({
		type : 2,
		title : 'SOS详情',
		content : '/ResourceMonitor/jsp/patrolForRanger/PatrolLog/SosDetail.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
		area : [ '635px', '275px' ], // ['http://sentsin.com', 'no']
		btn : [ '关闭' ],
		yes : function(index, layero) {
			layer.close(layerIndex); // 如果设定了yes回调，需进行手工关闭
		},
		end : function(index, layero) {
			//queryList();
		}
	});
}


function mapExport(){
	document.getElementById("mapFrame").contentWindow.printPdf();
}
