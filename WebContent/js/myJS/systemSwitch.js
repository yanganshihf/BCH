var menus = localStorage.getItem('cookie_menu',menus);
function goHuLin(){
	if(menus.indexOf("实时监控") > -1){
		window.location.href = "/ResourceMonitor/jsp/patrolForRanger/map/map.jsp";
	}
}
function goWuRenJi(){
	if(menus.indexOf("实时监控") > -1){
		window.location.href = "/ResourceMonitor/jsp/videoManager/map.jsp";
	}
}
function goShiPin(){
	if(menus.indexOf("视频监控管理") > -1){
		window.location.href = "/ResourceMonitor/jsp/monitorForVideo/Home.jsp";
	}
}
function goZongHeJianGuan(){
	if(menus.indexOf("实时监控") > -1){
		window.location.href = "/ResourceMonitor/jsp/commandForFire/Home.jsp";
	}
}
function goYunXingWeiHu(){
	if(menus.indexOf("用户管理") > -1){
		window.location.href = "/ResourceMonitor/jsp/system/systemHome.jsp";
	}
}
$(function(){
	if(menus.indexOf("实时监控") == -1){
		$("#goHuLin").css("color","#b7b7b7")
		$("#goHuLin").css("cursor","not-allowed")
	}
	if(menus.indexOf("实时监控") ==-1){
		$("#goWuRenJi").css("color","#b7b7b7")
		$("#goWuRenJi").css("cursor","not-allowed")
	}
	if(menus.indexOf("视频监控管理")==-1){
		$("#goShiPin").css("color","#b7b7b7")
		$("#goShiPin").css("cursor","not-allowed")
	}
	if(menus.indexOf("实时监控")==-1){
		$("#goZongHeJianGuan").css("color","#b7b7b7")
		$("#goZongHeJianGuan").css("cursor","not-allowed")
	}
	if(menus.indexOf("用户管理")==-1){
		$("#goYunXingWeiHu").css("color","#b7b7b7")
		$("#goYunXingWeiHu").css("cursor","not-allowed")
	}
})