<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/JqgridInclude.jsp"%>

<html lang="cn">
<head>
<title>日志管理</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<style type="text/css">
* {
	padding: 0px;
}

@media ( min-width : 700px) {
	.container {
		width: 100%;
	}
}
a{
	color: #555;
}
#tabs-339226 a {
	font-size:14px;
	padding-top:3px;
	padding-bottom:3px;
}
.nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus{
	color: #058563;
    cursor: default;
}
.tab-content{
	padding-left: 10px;
    padding-right: 10px;
    border: 1px #ddd solid;
    border-top: 0;
}
</style>
</head>
<body>
	<div class="container">
		<div class="row clearfix">
			<div class="col-md-12 column" style="padding-left: 0;padding-right: 0;">
				<div class="tabbable" id="tabs-339226">
					<ul class="nav nav-tabs" style="padding-top:6px;background-color:#f0f0f0;">
						<li id="shijianchaxunLi" class="active"><a id="staticA" href="#panel-553584" data-toggle="tab"><strong>巡护事件</strong></a></li>
						<li id="rizhiliulanLi"><a id="detailA" href="#panel-674324" data-toggle="tab"><strong>巡护日志</strong></a></li>
						<li id="soschaxunLi"><a id="optionA" href="#panel-67432" data-toggle="tab"><strong>SOS管理</strong></a></li>
					</ul>
					<div class="tab-content" >
						<div class="tab-pane active" id="panel-553584">
							<iframe id="AttenceStatic" src="" width="100%"
								height="100%" frameborder="0" scrolling="no"></iframe>
						</div>
						<div class="tab-pane" id="panel-674324">
							<iframe id="AttenceDetail" src="" width="100%"
								height="100%" frameborder="0" scrolling="no"></iframe>
						</div>
						<div class="tab-pane" id="panel-67432">
							<iframe id="AttenceOption" src="" width="100%"
								height="100%" frameborder="0" scrolling="no"></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</body>

<script type="text/javascript">
	$(document).ready(function() {
		var menus=localStorage.getItem('cookie_menu');
		if(menus.indexOf("事件查询") == -1){
			$("#shijianchaxunLi").css("display","none");
			$("#panel-553584").css("display","none");
		}
		if(menus.indexOf("日志浏览") == -1){
			$("#rizhiliulanLi").css("display","none");
			$("#panel-674324").css("display","none");
		}
		if(menus.indexOf("SOS查询") == -1){
			$("#soschaxunLi").css("display","none");
			$("#panel-67432").css("display","none");
		}
		var staticA = 0;
		var detailA = 0;
		var optionA = 0;
		var winHeight = $(window).height() - 38;
		//alert(winHeight);
		$("#AttenceStatic").css("height", winHeight);
		$("#AttenceDetail").css("height", winHeight);
		$("#AttenceOption").css("height", winHeight);
		$('#tabs-339226 a:first').tab('show');
		var name = $('#tabs-339226 a:first strong').html();
	 	if(name == "巡护事件"){
	 		$("#AttenceStatic").attr("src","patrolEvents.jsp");
	 		staticA = 1;
	 	}else if(name == "巡护日志"){
	 		$("#AttenceDetail").attr("src","LogManage.jsp");
	 		detailA = 1;
	 	}else if(name == "SOS管理"){
	 		$("#AttenceOption").attr("src","SosRecordManage.jsp");
	 		optionA = 1;
	 	}
	 	$("#staticA").on('click', function() {
	 		if(!staticA){
	 			$("#AttenceStatic").attr("src","patrolEvents.jsp");
	 			staticA = 1;
		 	}
		});
	 	$("#detailA").on('click', function() {
	 		if(!detailA){
	 			$("#AttenceDetail").attr("src","LogManage.jsp");
	 			detailA = 1;
		 	}
		});
	 	$("#optionA").on('click', function() {
	 		if(!optionA){
	 			$("#AttenceOption").attr("src","SosRecordManage.jsp");
	 			optionA = 1;
		 	} 		
		});
		
		
		
		
	});

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
	
	function  locateToEvent(data,rowId){
		parent.locateToEvent(data,rowId);
	}
	
	function  locateToSos(data){
		parent.locateToSos(data);
	}
		
</script>
</html>