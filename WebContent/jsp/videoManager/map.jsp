<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<%pageContext.setAttribute("APP_PATH", request.getContextPath());%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>无人机巡检管理系统</title>
  <link rel="shortcut icon" href="/ResourceMonitor/images/RTS.ico" />
  <link rel="stylesheet" href="${APP_PATH}/js/layer/layui/css/layui.css">
  <style type="text/css">
	.top_menu_div {
		height: 28px;
		line-height: 28px;
		width: 10%;
		float: left;
		border-right: 1px solid #e6e6e6;
		margin-top: 3px;
		text-align: center;
		cursor: pointer;
	}
	img {
			margin-right: 5px;
			margin-bottom: 3px;
	}
	.layui-nav-bar{
		display:none;
	}
	.layui-nav .layui-nav-child dd.layui-this a, .layui-nav-child dd.layui-this{
		background-color: #fff;
    	color: #333;
	}
  </style>
</head>
<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin">
  <div class="layui-header" style="background-color: #058563;height:60px;">
    <div class="layui-left">
    	<img alt="" src="${APP_PATH}/images/videoManager/title.png" style="padding-left: -5px; float: left;">
    </div>
    <ul class="layui-nav layui-layout-right" style="font-weight:bold;">
      <li class="layui-nav-item" id="loginUserLi" style="margin-right:20px;cursor:pointer;"><img style="height:16px;width:16px;" class="layui-nav-img" src="/ResourceMonitor/images/menuIcon/user.png"></li>
      <!-- <li class="layui-nav-item"> -->
        <li class="layui-nav-item">
		    <a style="color:#FFF;" href="javascript:;"><img style="height:16px;width:16px;" class="layui-nav-img" src="/ResourceMonitor/images/menuIcon/systemSwitch.png">系统切换</a>
		    <dl class="layui-nav-child" id="systemSwitch"> 
		      <dd><a href="javascript:;" id="goHuLin" onclick="goHuLin()">护林员巡检管理系统</a></dd>
		      <!-- <dd><a href="javascript:;" id="goWuRenJi" onclick="goWuRenJi()">无人机巡检管理系统</a></dd> -->
		      <!-- <dd><a href="javascript:;" id="goShiPin" onclick="goShiPin()">视频监管管理系统</a></dd> -->
		      <dd><a href="javascript:;" id="goZongHeJianGuan" onclick="goZongHeJianGuan()">有害生物检测与预警系统</a></dd>
		      <dd><a href="javascript:;" id="goYunXingWeiHu" onclick="goYunXingWeiHu()">运行维护管理系统</a></dd>
		      <dd><a href="javascript:;" onclick="goHome()">返回首页</a></dd>
		    </dl>
		  </li>
      <!-- </li> -->
      <li class="layui-nav-item"><a style="color:#FFF;" href="javascript:;" onclick="SystemOut()"><img style="height:16px;width:16px;margin-right:0px;" class="layui-nav-img" src="/ResourceMonitor/images/menuIcon/quit.png">退出</a></li>
    </ul>
  </div>
  <div class="layui-body" style="left: 0px;bottom:0px;overflow-y:hidden;">
	<div id="menuslist" style="width: 100%; height:35px;border-bottom: 2px solid rgb(221, 221, 221);">
		<div class="top_menu_div" id="gotoLive" style="color: #028061; border-bottom: solid 2px #028061;">
			<img alt="" class="imgG" src="/ResourceMonitor/images/videoManager/glivebar.png">
			<img alt="" class="img"  style="display:none;" src="/ResourceMonitor/images/videoManager/Livebar.png">
			<strong>巡检直播</strong>
		</div>
		<div class="top_menu_div" id="gotoRecord" style="color: #333333; border-bottom:0px;">
			<img alt="" class="imgG" style = "display:none" src="/ResourceMonitor/images/videoManager/grecordbar.png">
			<img alt="" class="img" src="/ResourceMonitor/images/videoManager/recordbar.png">
			<strong>巡检回看</strong>
		</div>
		<div class="top_menu_div" id="setting" style="color: #333333; border-bottom:0px;">
			<img alt="" class="imgG" style = "display:none" src="/ResourceMonitor/images/videoManager/Ggear.png">
			<img alt="" class="img" src="/ResourceMonitor/images/videoManager/gear.png">
			<strong>设备管理</strong>
		</div>
	</div>
	<iframe id="mainIframe" style="width:100%;height:94%;border:0px;" src="${APP_PATH}/jsp/videoManager/live.jsp">
	</iframe>
  </div>
  
<script src="${APP_PATH}/js/layer/layui/layui.js"></script>
<script src="${APP_PATH}/js/jquery-2.1.4/jquery.js"></script>
<script>
//JavaScript代码区域
var layer;
layui.use(['element','layer'], function(){
  var element = layui.element;
  layer=layui.layer;
});
//返回首页
function goHome(){
	window.location.href = "/ResourceMonitor/FunctionMenu.jsp";
}
//退出并返回登录页
function SystemOut(){
	localStorage.clear();
	window.location.href = "/ResourceMonitor/login.jsp";
}
$(function(){
	var height = $(window).height();
	$("#mainIframe").css("height",(height-97)+"px");
	var cookie_logingUser = localStorage.getItem('cookie_logingUser');
	var cookie_mobile = localStorage.getItem('cookie_mobile');
	var cookie_id = localStorage.getItem("cookie_id");
	$("#loginUserLi").append("你好,"+cookie_logingUser);//填充登陆人员姓名
	//点击人员弹出修改人员信息界面
	$("#loginUserLi").off().on("click",function(){
		var detail = layer.open({
			title : '修改密码',
			type : 2,
			resize : false,
			area : [ '275px', '360px' ],
			content : '/ResourceMonitor/jsp/patrolForRanger/map/layers/editUserInfo.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
			// ['http://sentsin.com', 'no']
			btn : [ '确定','取消' ],
			success : function(layero, index) {
				var body = layer.getChildFrame('body', index);	
				body.find('#mobilephone').val(cookie_mobile);
				body.find('#userName').val(cookie_logingUser);
			},
			yes : function(index, layero) {
				 $(layero).find("iframe")[0].contentWindow.submit();
			},
			btn2 : function(index, layero) {
				// 按钮【按钮二】的回调
				// return false 开启该代码可禁止点击该按钮关闭
			}
		});	
	});
	//跳转到直播界面
	$("#gotoLive").off().on("click",function(){
		$("#mainIframe").attr("src","${APP_PATH}/jsp/videoManager/live.jsp");
		$(".top_menu_div").css("color","#333333");
		$(".top_menu_div").css("border-bottom","0px");
		$("#gotoLive").css("color","#028061");
		$("#gotoLive").css("border-bottom","solid 2px #028061");
		$(".imgG").css("display","none");
		$(".img").css("display","");
		$("#gotoLive .imgG").css("display","");
		$("#gotoLive .img").css("display","none");
	});
	//跳转到回放界面
	$("#gotoRecord").off().on("click",function(){
		$("#mainIframe").attr("src","${APP_PATH}/jsp/videoManager/record.jsp");
		$(".top_menu_div").css("color","#333333");
		$(".top_menu_div").css("border-bottom","0px");
		$("#gotoRecord").css("color","#028061");
		$("#gotoRecord").css("border-bottom","solid 2px #028061");
		$(".imgG").css("display","none");
		$(".img").css("display","");
		$("#gotoRecord .imgG").css("display","");
		$("#gotoRecord .img").css("display","none");
	});
	//跳转到管理设置
	$("#setting").off().on("click",function(){
		$("#mainIframe").attr("src","${APP_PATH}/jsp/videoManager/setting.jsp");
		$(".top_menu_div").css("color","#333333");
		$(".top_menu_div").css("border-bottom","0px");
		$("#setting").css("color","#028061");
		$("#setting").css("border-bottom","solid 2px #028061");
		$(".imgG").css("display","none");
		$(".img").css("display","");
		$("#setting .imgG").css("display","");
		$("#setting .img").css("display","none");
	});
})
</script>
<script type="text/javascript" src="${APP_PATH}/js/myJS/systemSwitch.js"></script>
</html>