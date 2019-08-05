// 获取当前登陆用户名
var cookie_logingUser = localStorage.getItem('cookie_logingUser');
var cookie_mobile = localStorage.getItem('cookie_mobile');
var cookie_id = localStorage.getItem("cookie_id");
$("#menu1").html(
		'<img src="/ResourceMonitor/images/menuIcon/user.png"  style="height:16px; width:16px;margin-right:2px;">你好,'
				+ cookie_logingUser);
$(document)
.ready(
		function() {
			$("#main").height($(window).height() - 95);
			$("#childrenPage").width($("#header").width());
			var menus = localStorage.getItem('cookie_menu');
			$("#menuslist").append(
					'<div class="top_menu_div" id="yonghuguanli" style="color: #028061; border-bottom: solid 2px #028061;" onclick="yonghuguanli()"><img alt="" class="img" src="/ResourceMonitor/images/mark/16/bar.png">'
					+'<img alt="" class="imgG" style = "display:none" src="/ResourceMonitor/images/mark/16/Gbar.png"><strong>用户管理</strong></div>');

			if (menus.indexOf("权限管理") > -1) {
				$("#yonghuguanli").after(
						'<div class="top_menu_div" id="rizhi" onclick="rizhi()"><img alt="" class="img" src="/ResourceMonitor/images/mark/16/person.png">'
						+'<img alt="" class="imgG" style = "display:none" src="/ResourceMonitor/images/mark/16/Gperson.png"><strong>日志</strong></div>');
			}
			if (menus.indexOf("权限管理") > -1) {
				$("#yonghuguanli")
				.after(
						'<div class="top_menu_div" id="xitongguanli" onclick="xitongguanli()"><img alt="" class="img" src="/ResourceMonitor/images/mark/16/gear.png">'
						+'<img alt="" class="imgG" style = "display:none" src="/ResourceMonitor/images/mark/16/Ggear.png"><strong>权限管理</strong></div>');
			}
		});
$(window).resize(function() {
	$("#main").height($(window).height() - 95);
	$("#childrenPage").width($("#header").width());
});
function yonghuguanli(){
	$("#mapFrame").attr("src", "/ResourceMonitor/jsp/system/system.jsp");
	$("#mapPage").css("display", "inline");
	
	$(".top_menu_div").css("color","#333333");
	$(".top_menu_div").css("border-bottom","0px");
	
	$("#yonghuguanli").css("color","#028061");
	$("#yonghuguanli").css("border-bottom","solid 2px #028061");
	$(".imgG").css("display","none");
	$(".img").css("display","");
	$("#yonghuguanli .imgG").css("display","");
	$("#yonghuguanli .img").css("display","none");
}
function xitongguanli(){
	$("#mapFrame").attr("src", "/ResourceMonitor/jsp/system/systemRole.jsp");
	$("#mapPage").css("display", "inline");
	
	$(".top_menu_div").css("color","#333333");
	$(".top_menu_div").css("border-bottom","0px");
	
	$("#xitongguanli").css("color","#028061");
	$("#xitongguanli").css("border-bottom","solid 2px #028061");
	$(".imgG").css("display","none");
	$(".img").css("display","");
	$("#xitongguanli .imgG").css("display","");
	$("#xitongguanli .img").css("display","none");
}
function rizhi(){
	$("#mapFrame").attr("src", "/ResourceMonitor/jsp/system/OperationLog.jsp");
	$("#mapPage").css("display", "inline");
	
	$(".top_menu_div").css("color","#333333");
	$(".top_menu_div").css("border-bottom","0px");
	
	$("#rizhi").css("color","#028061");
	$("#rizhi").css("border-bottom","solid 2px #028061");
	$(".imgG").css("display","none");
	$(".img").css("display","");
	$("#rizhi .imgG").css("display","");
	$("#rizhi .img").css("display","none");
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
function SystemOut() {
	localStorage.clear();
	window.location.href = "/ResourceMonitor/login.jsp";
}
function GoBack(){
	window.location.href = "/ResourceMonitor/FunctionMenu.jsp";
}

