<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<%-- <script type="text/javascript"
	src="${pageContext.request.contextPath}/js/layer/layer-v3.0.3/layer/layer.js"></script> --%>
<title></title>
<style>
#table{
	margin-bottom:0;
}
.form-control {
	height: 27px;
	font-size: 15px;
	padding-top: 0px;
	padding-bottom: 0px;
	width:170px;
}
#table .tdwidth{
	width:50px;
	padding-right:0px;
	padding-left:0px;
	padding-top: 10px;
}
#table .tdwidth span{
	font-size:15px;
}
.red{
	color:red;
}
#table .redtd{
	padding-left:0px;
}	
input:-moz-placeholder{ /* Mozilla Firefox 4 to 18 */
font-style: italic;
color:#B8B8B8;
font-size:14px;
}

input::-moz-placeholder{ /* Mozilla Firefox 19+ */
font-style: italic;
color:#B8B8B8;
font-size:14px;
}

input:-ms-input-placeholder {
font-style: italic;
color:#B8B8B8;
font-size:14px;
}

input::-webkit-input-placeholder {
font-style: italic;
color:#B8B8B8;
font-size:14px;
}
.Img1 {
  position:absolute;
  left:220px;
  top:100px;
}
.Img2 {
  position:absolute;
  left:220px;
  top:142px;
}
.Img3 {
  position:absolute;
  left:220px;
  top:185px;
}
.bm1{
 	width: 16px;
  	height: 16px;
	background-image: url(/ResourceMonitor/images/indexpage/closeeye.png);
	cursor:pointer;
}
.bm2{
	width: 16px;
  	height: 16px;
	background-image: url(/ResourceMonitor/images/indexpage/openeye.png);
	cursor:pointer;
}
</style>
</head>
<body>
<div class="container">
	<div class="row clearfix">
		<table class="table" id="table">
			<tbody>
				<tr><td></td><td class="tdwidth"><span>姓&emsp;名</span></td><td><input type="text" id="userName" class="form-control" style="cursor:not-allowed;background-color:transparent;" readonly/></td><td></td></tr>
				<tr><td></td><td class="tdwidth"><span>手机号</span></td><td><input type="text" id="mobilephone" class="form-control" style="cursor:not-allowed;background-color:transparent;" readonly/></td><td></td></tr>
				<tr><td></td><td class="tdwidth"><span>原密码</span></td><td><input type="password" id="Password" class="form-control" maxlength="15" placeholder="请输入原密码" onchange="checkPassword()"/> <a href="#" id="a_old" class="Img1 bm1"></a></td><td class="redtd"><b class="red">*</b></td></tr>
				<tr><td></td><td class="tdwidth"><span>新密码</span></td><td><input type="password" id="newPassword" class="form-control" maxlength="15" placeholder="请输入6-15位新密码" onchange ="checkNewPwd()"/><a href="#" id="a_new" class="Img2 bm1"></a></td><td class="redtd"><b class="red">*</b></td></tr>	
				<tr><td></td><td class="tdwidth"><span>&emsp;&emsp;&emsp;</span></td><td><input type="password" id="rePassword" class="form-control" maxlength="15"placeholder="请再次输入新密码" onchange ="checkNewPwd()"/><a href="#" id="a_reNew" class="Img3 bm1"></a></td><td class="redtd"><b class="red">*</b></td></tr>
				<tr><td></td><td class="tdwidth"><span>&emsp;&emsp;&emsp;</span></td><td><span id="info" class="red"></span></td><td></td></tr>
			</tbody>
		</table>
	</div>
</div>





<script type="text/javascript">
var id;
var pwd;
var flag = 1;
$(document).ready(function() {
	id = localStorage.getItem("cookie_id");
	$.ajax({
		url : '/ResourceMonitor/system/queryPwd',
		type : 'POST',
		data : {id:id},
		success : function(resp) {
			pwd = resp.msg;
		}
	});
	$("#a_old").click(function(){
		if($("#a_old").hasClass("bm1")){
			$("#a_old").removeClass("bm1").addClass("bm2");
			$("#Password").prop("type","text");
		}else{
			$("#a_old").removeClass("bm2").addClass("bm1");
			$("#Password").prop("type","password");
		}
	});
	$("#a_new").click(function(){
		if($("#a_new").hasClass("bm1")){
			$("#a_new").removeClass("bm1").addClass("bm2");
			$("#newPassword").prop("type","text");
		}else{
			$("#a_new").removeClass("bm2").addClass("bm1");
			$("#newPassword").prop("type","password");
		}
	});
	$("#a_reNew").click(function(){
		if($("#a_reNew").hasClass("bm1")){
			$("#a_reNew").removeClass("bm1").addClass("bm2");
			$("#rePassword").prop("type","text");
		}else{
			$("#a_reNew").removeClass("bm2").addClass("bm1");
			$("#rePassword").prop("type","password");
		}
	});
});
function checkPassword(){
	var password = $("#Password").val();
	if(password){
		//$("#info").html("");
		//$("#info").html("请输入原密码!");
		if (pwd != password) {
				$("#info").html("");
				$("#info").html("原密码输入错误！");
				flag = 0;
		}else{
			$("#info").html("");
			flag = 1;
		}
		
	}else{
		$("#info").html("");
	}	
}
function checkNewPwd(){
	var newPassword = $("#newPassword").val();
	var rePassword = $("#rePassword").val();
	if(newPassword && newPassword.length < 6 ){
		//alert(newPassword)
		$("#info").html("");
		$("#info").html("新密码不少于6位数！");
		flag = 0;
	}else if(newPassword && newPassword.length >= 6 ){
		$("#info").html("");
		flag = 1;
	}
	if(rePassword && rePassword.length < 6 ){
		//alert(newPassword)
		$("#info").html("");
		$("#info").html("新密码不少于6位数！");
		flag = 0;
	}else if(rePassword && rePassword.length >= 6 ){
		$("#info").html("");
		flag = 1;
	}
	if(newPassword && rePassword && newPassword != rePassword){
		$("#info").html("");
		$("#info").html("两次新密码输入不一致！");
		flag = 0;
	}else if(newPassword && rePassword && newPassword == rePassword && rePassword.length < 6 && newPassword.length >= 6){
		$("#info").html("");
		flag = 1;
	}
	if(!newPassword && !rePassword){
		$("#info").html("");
	}
}

function submit(){
	var password = $("#Password").val();
	var newPassword = $("#newPassword").val();
	var rePassword = $("#rePassword").val();
	if(!password){
		$("#info").html("");
		$("#info").html("请输入原密码！");
		flag = 0;
	}else if(pwd != password){
		$("#info").html("");
		$("#info").html("原密码输入错误！");
		flag = 0;
	}
	else if(!newPassword || !rePassword){
		$("#info").html("");
		$("#info").html("请输入新密码！");
		flag = 0;
	}else if(flag){
		$.ajax({
			url : '/ResourceMonitor/system/editPwdById',
			type : 'POST',
			data : {id:id,password:newPassword},
			success : function(resp) {
				if (resp.msg == "success") {
					layui.use('layer', function(){
				        layer = layui.layer;
				        top.layer.open({
							title : false
							,closeBtn:0
							,content : '<center><span>修改成功</span></center>'
							,yes:function (index, layero){
								top.layer.close(index);
				    		}
						});
				    });
				}else{
					layui.use('layer', function(){
				        layer = layui.layer;
				        top.layer.open({
							title : false
							,closeBtn:0
							,content : '<center><span>修改失败</span></center>'
							,yes:function (index, layero){
								top.layer.close(index);
				    		}
						});
					});
				}
			}
		});
	}
}
</script>
</body>
</html>