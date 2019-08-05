// 获取当前登陆用户名
var cookie_logingUser = localStorage.getItem('cookie_logingUser');
var cookie_mobile = localStorage.getItem('cookie_mobile');
var cookie_id = localStorage.getItem("cookie_id");
$("#menu1")
		.html(
				'<img src="/ResourceMonitor/images/menuIcon/user.png"  style="height: 16px; width:16px;margin-right: 3px;">你好,'
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

// 初始化高度
var openMFlag = 0;
var openTFlag = 0;
var Frame = "";
$(document)
		.ready(
				function() {
					
					$("#mapFrame").height($(window).height() - 95);
					//$("#childrenPage").width($("#header").width());
					var menus = localStorage.getItem('cookie_menu');
					$("#menuslist").append(
							'<div class="top_menu_div"  id="xunhugaikuang" style="display:none;color: #028061; border-bottom: solid 2px #028061;" onclick="xunhugaikuang()"><img alt="" style = "display:none" class="img" src="/ResourceMonitor/images/mark/16/bar.png">'
							+'<img alt="" class="imgG" src="/ResourceMonitor/images/mark/16/Gbar.png"><strong>巡护概况</strong></div>');
					
					if (menus.indexOf("查询政策法规") > -1
							|| menus.indexOf("查询通知公告") > -1
							|| menus.indexOf("公示监督") > -1) {
						$("#xunhugaikuang")
								.after(
										'<div class="top_menu_div" id="shangchuanxiada" onclick="shangchuanxiada()"><img alt="" class="img" src="/ResourceMonitor/images/mark/16/updown.png">'
										+'<img alt="" class="imgG" style = "display:none" src="/ResourceMonitor/images/mark/16/Gupdown.png"><strong>上传下达</strong></div>');
					}
					if (menus.indexOf("护林员查询") > -1) {
						$("#xunhugaikuang")
								.after(
										'<div class="top_menu_div" id="hulinyuanguanli" onclick="hulinyuanguanli()"><img alt="" class="img" src="/ResourceMonitor/images/mark/16/person.png">'
										+'<img alt="" class="imgG" style = "display:none" src="/ResourceMonitor/images/mark/16/Gperson.png"><strong>护林员管理</strong></div>');
					}
					if (menus.indexOf("责任区查询") > -1) {
						$("#xunhugaikuang")
								.after(
										'<div class="top_menu_div" id="quyuguanli" onclick="quyuguanli()"><img alt="" class="img" src="/ResourceMonitor/images/mark/16/area.png">'
										+'<img alt="" class="imgG" style = "display:none" src="/ResourceMonitor/images/mark/16/Garea.png"><strong>责任区</strong></div>');
					}
					//
					if (menus.indexOf("查询考勤") > -1) {
						$("#xunhugaikuang")
								.after(
										'<div class="top_menu_div" id="chuqinkaohe" onclick="chuqinkaohe()"><img alt="" class="img" src="/ResourceMonitor/images/mark/16/table.png">'
										+'<img alt="" class="imgG" style = "display:none" src="/ResourceMonitor/images/mark/16/Gtable.png"><strong>出勤考核</strong></div>');
					}
					if (menus.indexOf("事件查询") > -1
							|| menus.indexOf("SOS查询") > -1
							|| menus.indexOf("日志浏览") > -1) {
						$("#xunhugaikuang")
								.after(
										'<div class="top_menu_div" id="shangbaoxinxi" onclick="shangbaoxinxi()"><img alt="" class="img" src="/ResourceMonitor/images/mark/16/thunder.png">'
										+'<img alt="" class="imgG" style = "display:none" src="/ResourceMonitor/images/mark/16/Gthunder.png"><strong>上报信息</strong></div>');
					}
					if (menus.indexOf("实时监控") > -1
							|| menus.indexOf("巡护轨迹") > -1) {
						$("#xunhugaikuang")
								.after(
										'<div class="top_menu_div" id="xunhujiankong" onclick="xunhujiankong()"><img alt="" class="img" src="/ResourceMonitor/images/mark/16/eye.png">'
										+'<img alt="" style = "display:none" class="imgG" src="/ResourceMonitor/images/mark/16/Geye.png"><strong>巡护监控</strong></div>');
					}
					
					$("#header").mouseenter(function(){
					    $("#header").css("z-index","20009999");
					});
					$("#header").mouseleave(function(){
						$("#header").css("z-index","9999");
					});

				});

$(window).resize(function() {
	$("#mapFrame").height($(window).height() - 95);
	//$("#childrenPage").width($("#header").width());
});


//点击巡巡护概况
function xunhugaikuang(){
	
	/*$("#mapPage").attr("class", "col-xs-12 column");*/
	//$("#mapFrame").attr("src", "/ResourceMonitor/jsp/patrolForRanger/survey/survey.jsp");
	openFrameLayer('/ResourceMonitor/jsp/patrolForRanger/survey/survey.jsp');
	/*$("#mapPage").css("display", "inline");*/
	
	$(".top_menu_div").css("color","#333333");
	$(".top_menu_div").css("border-bottom","0px");
	
	$("#xunhugaikuang").css("color","#028061");
	$("#xunhugaikuang").css("border-bottom","solid 2px #028061");
	$(".imgG").css("display","none");
	$(".img").css("display","");
	$("#xunhugaikuang .imgG").css("display","");
	$("#xunhugaikuang .img").css("display","none");
}

// 点击巡护轨监控
function xunhujiankong(){
	eventFlag = 0;
	/*$("#mapPage").attr("class", "col-xs-9 column");*/
	layer.closeAll();
	/*$("#mapPage").css("display", "inline");*/
	/*if($("#contentFrame").attr("src")==''){
		$("#contentFrame").attr("src","/ResourceMonitor/jsp/patrolForRanger/realtime/jiankongHome.jsp");
	}*/
	if($("#mapFrame").attr("src")==''){
		$("#mapFrame").attr("src","/ResourceMonitor/jsp/patrolForRanger/map/m_map/m_map.jsp")
	}
	
    
	$(".top_menu_div").css("color","#333333");
	$(".top_menu_div").css("border-bottom","0px");
	
	$("#xunhujiankong").css("color","#028061");
	$("#xunhujiankong").css("border-bottom","solid 2px #028061");
	$(".imgG").css("display","none");
	$(".img").css("display","");
	$("#xunhujiankong .imgG").css("display","");
	$("#xunhujiankong .img").css("display","none");
}
// 点击上报信息 
function shangbaoxinxi(){
	/*$("#mapPage").attr("class", "col-xs-12 column");*/
	//$("#mapFrame").attr("src", "/ResourceMonitor/jsp/patrolForRanger/PatrolLog/LogHome.jsp");
	openFrameLayer('/ResourceMonitor/jsp/patrolForRanger/PatrolLog/LogHome.jsp');
	/*$("#mapPage").css("display", "inline");*/
	
	$(".top_menu_div").css("color","#333333");
	$(".top_menu_div").css("border-bottom","0px");
	
	$("#shangbaoxinxi").css("color","#028061");
	$("#shangbaoxinxi").css("border-bottom","solid 2px #028061");
	
	$(".imgG").css("display","none");
	$(".img").css("display","");
	$("#shangbaoxinxi .imgG").css("display","");
	$("#shangbaoxinxi .img").css("display","none");
}
function chuqinkaohe(){
	openFrameLayer('/ResourceMonitor/jsp/patrolForRanger/attence/AttenceHome.jsp');
/*	$("#mapPage").css("display", "inline");*/
	
	$(".top_menu_div").css("color","#333333");
	$(".top_menu_div").css("border-bottom","0px");
	
	$("#chuqinkaohe").css("color","#028061");
	$("#chuqinkaohe").css("border-bottom","solid 2px #028061");
	
	$(".imgG").css("display","none");
	$(".img").css("display","");
	$("#chuqinkaohe .imgG").css("display","");
	$("#chuqinkaohe .img").css("display","none");
}

function xianchangshikuang(){
	$("#mapFrame").attr("src", "/ResourceMonitor/jsp/patrolForRanger/Live/shikuang.jsp");
	$("#mapPage").css("display", "inline");
	layer.msg("功能开发中~~")
	$(".top_menu_div").css("color","#333333");
	$(".top_menu_div").css("border-bottom","0px");
	
	$("#xianchangshikuang").css("color","#028061");
	$("#xianchangshikuang").css("border-bottom","solid 2px #028061");
	
	$(".imgG").css("display","none");
	$(".img").css("display","");
	$("#xianchangshikuang .imgG").css("display","");
	$("#xianchangshikuang .img").css("display","none");
}

function shangchuanxiada(){
	/*$("#mapPage").attr("class", "col-xs-12 column");*/
	//$("#mapFrame").attr("src", "/ResourceMonitor/jsp/patrolForRanger/message/MessageHome.jsp");
	openFrameLayer('/ResourceMonitor/jsp/patrolForRanger/message/MessageHome.jsp');
	/*$("#mapPage").css("display", "inline");*/
	
	$(".top_menu_div").css("color","#333333");
	$(".top_menu_div").css("border-bottom","0px");
	
	$("#shangchuanxiada").css("color","#028061");
	$("#shangchuanxiada").css("border-bottom","solid 2px #028061");
	
	$(".imgG").css("display","none");
	$(".img").css("display","");
	$("#shangchuanxiada .imgG").css("display","");
	$("#shangchuanxiada .img").css("display","none");
}

function quyuguanli(){
	//$("#mapFrame").attr("src", "/ResourceMonitor/jsp/patrolForRanger/region/RegionManage.jsp");
	openFrameLayer('/ResourceMonitor/jsp/patrolForRanger/map/m_map/regionDesign.jsp'); //重新设计 完全地图形式展示
	//$("#mapPage").css("display", "inline");
	
	$(".top_menu_div").css("color","#333333");
	$(".top_menu_div").css("border-bottom","0px");
	
	$("#quyuguanli").css("color","#028061");
	$("#quyuguanli").css("border-bottom","solid 2px #028061");
	
	$(".imgG").css("display","none");
	$(".img").css("display","");
	$("#quyuguanli .imgG").css("display","");
	$("#quyuguanli .img").css("display","none");
}

function hulinyuanguanli(){
	//$("#mapFrame").attr("src", "/ResourceMonitor/jsp/patrolForRanger/patrolPerson/patrolPerson.jsp");
	openFrameLayer('/ResourceMonitor/jsp/patrolForRanger/patrolPerson/patrolPerson.jsp');
	//$("#mapPage").css("display", "inline");
	
	$(".top_menu_div").css("color","#333333");
	$(".top_menu_div").css("border-bottom","0px");
	
	$("#hulinyuanguanli").css("color","#028061");
	$("#hulinyuanguanli").css("border-bottom","solid 2px #028061");
	
	$(".imgG").css("display","none");
	$(".img").css("display","");
	$("#hulinyuanguanli .imgG").css("display","");
	$("#hulinyuanguanli .img").css("display","none");
}
function openFrameLayer(jsp){
	eventFlag = 1;
	var height = $(window).height();
	layer.closeAll();
  	var index = layer.open({
		scrollbar: false,
		type : 2,
		shade:0,
		closeBtn:0,
		offset: 'rb',
		title : false,
		area: ['100%', height-93+'px'],
		anim: -1,
		content :jsp,
	});
	$(window).resize(function() {
	    layer.style(index, {
	    	top:'93px',
	        height:$(window).height()-93+'px'
	    });
	});
}
