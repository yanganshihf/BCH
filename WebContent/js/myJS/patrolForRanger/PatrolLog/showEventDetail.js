$(function() {
	var rowId = window.location.search.substring(1);
	var eventID = rowId.slice(6);

	// 获取路径
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	var localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	var projectName = pathname
			.substring(0, pathname.substr(1).indexOf('/') + 1);
	// 查询事件详情
	$.ajax({
		url : localhostPath + projectName + '/event/eventDetail', // 请求的url地址
		dataType : "json", // 返回格式为json
		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
		data : {
			id : eventID
		}, // 参数值
		type : "GET", // 请求方式
		beforeSend : function() {
			// 请求前的处理
		},
		success : function(req) {
			// 请求成功时处理
			var eveRows = req.rows;
			// 成功获取事件详情
			var thisEve = eveRows[0];

			var photoSrc = "/ResourceMonitor/eventMedia/" + thisEve.eventPhoto;
			var videoSrc = "/ResourceMonitor/eventMedia/" + thisEve.eventVedio;
			var redioSrc = "/ResourceMonitor/eventMedia/" + thisEve.eventRedio;
			
			if (thisEve.eventPhoto == "" || thisEve.eventPhoto == null) {
				$("#photoBtn").html("无");
			}
			if (thisEve.eventVedio == "" || thisEve.eventVedio == null) {
				$("#vedioBtn").html("无");
			}
			if (thisEve.eventRedio == "" || thisEve.eventRedio == null) {
				$("#redioBtn").html("无");
			}
			
			$("#eventPhoto").attr("src", photoSrc);

			// 通过vue.js 把数据和对应的视图关联起来
			new Vue({
				el : '#eveDetail',
				data : {
					message : thisEve
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

/**
 * * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * *
 * 
 * 查看图片
 *  * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * *
 */
function viewPhoto() {
	var photosrc = $('#eventPhoto').attr("src");
	// $('#eventPhoto').viewer();
	parent.viewPhoto(photosrc);
}

/**
 * * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * *
 * 
 * 查看视频
 *  * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * *
 */
function vedioPlayer() {
	var vedioName = $("#vedioName").val();

	/*
	 * var vedioPlayer = layer.open({ type : 2, title : '视频播放', area :
	 * ['642px','438px'], resize : false, content :
	 * 'vedioPlayer.jsp?'+encodeURI(vedioName) });
	 */
	parent.vedioPlayer(vedioName);
}
/**
 * * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * *
 * 
 * 播放音频
 *  * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * *
 */
function redioPlayer() {
	var redioName = $("#redioName").val();
	/*
	 *  var redioPlayer = layer.open({ type : 2, title : '音频播放', area :
	 * ['642px','438px'], resize : false, content :
	 * 'vedioPlayer.jsp?'+encodeURI(redioName) });
	 */
	parent.redioPlayer(redioName);
}