//
//
// 退出方法
//
//

function Weather(){
	if($("#weather").css("display") != "none"){
		$("#weather").css("display","none");	
	}else{
		$("#weather").css("display","");
	}
	
}

function SystemOut() {
	localStorage.clear();
	window.location.href = "/ResourceMonitor/login.jsp";
}
function GoBack(){
	window.location.href = "/ResourceMonitor/FunctionMenu.jsp";
}

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
 * ********************************************************
 * 
 * 实时警报
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


//
//
// 预览图片
// 
//
function viewPhoto(photosrc) {
	//debugger;
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