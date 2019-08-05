<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>日志管理</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<style type="text/css">
	*{
		padding: 0px;
	}
@media (min-width: 700px){
	.container {
    	width: 100%;
	}
}
/* .container{
	padding-left:0;
	padding-right:0;
} */
a{
	color: #555;
}
#tabs-339226 a{
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
						<li id="chaxunLi" class="active">
							 <a id="lawA" href="#panel-553584" data-toggle="tab"><strong>政策法规</strong></a>
						</li>
						<li id="gongshiLi">
							 <a id="signA" href="#panel-674324" data-toggle="tab"><strong>公示监督</strong></a>
						</li>
						<li id="tongzhi">
							 <a id="messageA" href="#panel-67432" data-toggle="tab"><strong>通知公告</strong></a>
						</li>
						<!-- <li>
							 <a href="#panel-6743" data-toggle="tab">私信管理</a>
						</li> -->
						
					</ul>
					<div class="tab-content">
						<div class="tab-pane active" id="panel-553584">
							<iframe id="law" src="" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>
						</div>
						<div class="tab-pane" id="panel-674324">
							<iframe id="publicSign" src="" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>
						</div>
						<div class="tab-pane" id="panel-67432">
							<iframe id="publicMessage" src="" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>
						</div>
						<!-- <div class="tab-pane" id="panel-6743">
							<iframe id="privateMessage" src="privateMessage.jsp" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>
						</div> -->
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- <img src="/gmms/images/indexpage/hk_quit.png" id="close" class="" style="cursor:pointer;position:absolute;top:10px;right:15px" alt="关闭" title="关闭"> -->
</body>

<script type="text/javascript">
	$(document).ready(function(){
		var menus=localStorage.getItem('cookie_menu');
		if(menus.indexOf("查询政策法规") == -1){
			$("#chaxunLi").css("display","none");
			$("#panel-553584").css("display","none");
		}
		if(menus.indexOf("公示监督") == -1){
			$("#gongshiLi").css("display","none");
			$("#panel-674324").css("display","none");
		}
		if(menus.indexOf("查询通知公告") == -1){
			$("#tongzhi").css("display","none");
			$("#panel-67432").css("display","none");
		}		
		var lawA = 0;
		var signA = 0;
		var messageA = 0;
		var winHeight =  $(window).height()-40;
		// alert(winHeight);
	 	$("#law").css("height",winHeight);
	 	$("#publicSign").css("height",winHeight);
	 	$("#publicMessage").css("height",winHeight);
	 	//$("#privateMessage").css("height",winHeight);
	 	$('#tabs-339226 a:first').tab('show');
	 	
	 	var name = $('#tabs-339226 a:first strong').html();
	 	if(name == "政策法规"){
	 		$("#law").attr("src","law.jsp");
	 		lawA = 1;
	 	}else if(name == "公示监督"){
	 		$("#publicSign").attr("src","publicSign.jsp");
	 		signA = 1;
	 	}else if(name == "通知公告"){
	 		$("#publicMessage").attr("src","publicMessage.jsp");
	 		messageA = 1;
	 	}
	 	$("#lawA").on('click', function() {
	 		if(!lawA){
	 			$("#law").attr("src","law.jsp");
	 			lawA = 1;
		 	}
		});
	 	$("#signA").on('click', function() {
	 		if(!signA){
	 			$("#publicSign").attr("src","publicSign.jsp");
	 			signA = 1;
		 	}
		});
	 	$("#messageA").on('click', function() {
	 		if(!messageA){
	 			$("#publicMessage").attr("src","publicMessage.jsp");
	 			messageA = 1;
		 	} 		
		});
	});
</script>
</html>