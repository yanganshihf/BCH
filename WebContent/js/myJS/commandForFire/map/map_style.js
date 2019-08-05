// 获取当前登陆用户名
var cookie_logingUser = localStorage.getItem('cookie_logingUser');
var cookie_mobile = localStorage.getItem('cookie_mobile');
var cookie_id = localStorage.getItem("cookie_id");


$("#menu1")
		.html(
				'<img src="/ResourceMonitor/images/menuIcon/user.png"  style="height:16px; width:16px;margin-right:3px;">你好,'
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

 $(document).ready(function() {
	$("#main").height($(window).height() - 60);
	$("#childrenPage").width($("#header").width());
	
	//const target = $('#target')[0];
	
	$('#full').click(function(){
		if(screenfull.isFullscreen){
			$("#full img").attr("src","/ResourceMonitor/images/menuIcon/full.png");
		}else{
			$("#full img").attr("src","/ResourceMonitor/images/menuIcon/full2.png");
		}
		if (screenfull.enabled) {
			screenfull.toggle();
	    }
		
	})
 });
 
 

$(window).resize(function() {
	$("#main").height($(window).height() - 60);
	$("#childrenPage").width($("#header").width());
});



