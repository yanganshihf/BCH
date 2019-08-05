// 获取当前登陆用户名
var cookie_logingUser = localStorage.getItem('cookie_logingUser');
var cookie_mobile = localStorage.getItem('cookie_mobile');
var cookie_id = localStorage.getItem("cookie_id");
$("#menu1")
		.html(
				'<img src="/ResourceMonitor/images/menuIcon/user.png"  style="height: 16px; width: 16px;  margin-right: 3px;">你好,'
						+ cookie_logingUser);
$("#menu1").click(function(){
	//alert(cookie_logingUser);
	//alert(cookie_mobile);
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

$(document)
		.ready(
				function() {
					$("#main").height($(window).height() - 95);
					$("#childrenPage").width($("#header").width());
					var menus = localStorage.getItem('cookie_menu');
					$("#menuslist").append(
							'<div class="top_menu_div" id="jizhangaikuang" style="color: #028061; border-bottom: solid 2px #028061;" onclick="jizhangaikuang()"><img alt="" class="img" src="/ResourceMonitor/images/mark/16/bar.png">'
							+'<img alt="" class="imgG" style = "display:none" src="/ResourceMonitor/images/mark/16/Gbar.png"><strong>基站概况</strong></div>');

					if (menus.indexOf("护林员查询") > -1) {
						$("#jizhangaikuang")
								.after(
										'<div class="top_menu_div" id="jizhanpeizhi" onclick="jizhanpeizhi()"><img alt="" class="img" src="/ResourceMonitor/images/mark/16/person.png">'
										+'<img alt="" class="imgG" style = "display:none" src="/ResourceMonitor/images/mark/16/Gperson.png"><strong>基站配置</strong></div>');
					}
					if (menus.indexOf("责任区查询") > -1) {
						$("#jizhangaikuang")
								.after(
										'<div class="top_menu_div" id="jingbaoguanli" onclick="jingbaoguanli()"><img alt="" class="img" src="/ResourceMonitor/images/mark/16/area.png">'
										+'<img alt="" class="imgG" style = "display:none" src="/ResourceMonitor/images/mark/16/Garea.png"><strong>警报管理</strong></div>');
					}
					if (menus.indexOf("查询政策法规") > -1
							|| menus.indexOf("查询通知公告") > -1
							|| menus.indexOf("公示监督") > -1) {
						$("#jizhangaikuang")
								.after(
										'<div class="top_menu_div" id="shipinjiankong" onclick="shipinjiankong()"><img alt="" class="img" src="/ResourceMonitor/images/mark/16/updown.png">'
										+'<img alt="" class="imgG" style = "display:none" src="/ResourceMonitor/images/mark/16/Gupdown.png"><strong>视频监控</strong></div>');
					}
				});

$(window).resize(function() {
	$("#main").height($(window).height() - 95);
	$("#childrenPage").width($("#header").width());
});



//点击基站概况
function jizhangaikuang(){
	$("#mapPage").attr("class", "col-xs-12 column");
	$("#mapFrame").attr("src", "/ResourceMonitor/jsp/monitorForVideo/BaseStationMap/BaseStationMap.jsp");
	$("#mapPage").css("display", "inline");
	
	$(".top_menu_div").css("color","#333333");
	$(".top_menu_div").css("border-bottom","0px");
	
	$("#jizhangaikuang").css("color","#028061");
	$("#jizhangaikuang").css("border-bottom","solid 2px #028061");
	$(".imgG").css("display","none");
	$(".img").css("display","");
	$("#jizhangaikuang .imgG").css("display","");
	$("#jizhangaikuang .img").css("display","none");
}
function shipinjiankong(){
	$("#mapPage").attr("class", "col-xs-12 column");
	$("#mapFrame").attr("src", "/ResourceMonitor/jsp/monitorForVideo/VideoManage/VideoManage.jsp");
	$("#mapPage").css("display", "inline");
	
	$(".top_menu_div").css("color","#333333");
	$(".top_menu_div").css("border-bottom","0px");
	
	$("#shipinjiankong").css("color","#028061");
	$("#shipinjiankong").css("border-bottom","solid 2px #028061");
	$(".imgG").css("display","none");
	$(".img").css("display","");
	$("#shipinjiankong .imgG").css("display","");
	$("#shipinjiankong .img").css("display","none");
}
function jingbaoguanli(){
	$("#mapPage").attr("class", "col-xs-12 column");
	$("#mapFrame").attr("src", "/ResourceMonitor/jsp/monitorForVideo/Alarm/Alarm.jsp");
	$("#mapPage").css("display", "inline");
	
	$(".top_menu_div").css("color","#333333");
	$(".top_menu_div").css("border-bottom","0px");
	
	$("#jingbaoguanli").css("color","#028061");
	$("#jingbaoguanli").css("border-bottom","solid 2px #028061");
	$(".imgG").css("display","none");
	$(".img").css("display","");
	$("#jingbaoguanli .imgG").css("display","");
	$("#jingbaoguanli .img").css("display","none");
}
function jizhanpeizhi(){
	$("#mapPage").attr("class", "col-xs-12 column");
	$("#mapFrame").attr("src", "/ResourceMonitor/jsp/monitorForVideo/StationSetting/stationSetting.jsp");
	$("#mapPage").css("display", "inline");
	
	$(".top_menu_div").css("color","#333333");
	$(".top_menu_div").css("border-bottom","0px");
	
	$("#jizhanpeizhi").css("color","#028061");
	$("#jizhanpeizhi").css("border-bottom","solid 2px #028061");
	$(".imgG").css("display","none");
	$(".img").css("display","");
	$("#jizhanpeizhi .imgG").css("display","");
	$("#jizhanpeizhi .img").css("display","none");
}