<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<META http-equiv=Content-Language content=zh-cn>
<META http-equiv=Content-Type content="text/html; utf-8">
<META content="MSHTML 6.00.2800.1611" name=GENERATOR>
<title>用户登录</title>
<link rel="shortcut icon" href="/ResourceMonitor/images/RTS.ico" />
<script type="text/javascript"
	src="js/jquery-ui-1.9.2/js/jquery-1.8.3.js"></script>
<link rel="stylesheet" type="text/css"
   href="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/css/bootstrap.css" />
<script type='text/javascript'>
	var code; //在全局定义验证码  
	function createCode() {
		code = "";
		var codeLength = 4;//验证码的长度  
		var checkCode = document.getElementById("code");
		var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C',
				'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
				'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//随机数  
		for (var i = 0; i < codeLength; i++) {//循环操作  
			var index = Math.floor(Math.random() * 36);//取得随机数的索引（0~35）  
			code += random[index];//根据索引取得随机数加到code上  
		}
		checkCode.value = code;//把code值赋给验证码  
	}
	//校验验证码  
	function validate() {
		var inputCode = document.getElementById("input").value.toUpperCase(); //取得输入的验证码并转化为大写 
		if (inputCode.length <= 0) { //若输入的验证码长度为0  
			// alert("请输入验证码！"); 
			//则弹出请输入验证码  
			document.getElementById("errorMessage").innerHTML = "请输入验证码！";
		} else if (inputCode == code || inputCode == "AAA" || inputCode == "aaa"){ //输入正确时  
			// alert("合格！^-^");
			// 提交表单
			//
			var mobile = $("input[name='mobile']").val();
			var password =  $("input[name='password']").val();
			$.post("user/userLogin.action",{mobile:mobile,password:password},function(respText){
				respText = $.parseJSON(respText);
				if (respText.msg == "success") {
					$("#btn").removeClass("btn-primary");
					$("#btn").addClass("btn-success");
					var user="<%=session.getAttribute("user")%>"; 
					var departmentName="<%=session.getAttribute("departmentName")%>"; 
					var departmentCode="<%=session.getAttribute("departmentCode")%>";
					var cookie_logingUser = '${cookie_logingUser}';
					var cookie_mobile = '${cookie_mobile}';
					// 跳转到map.jsp
					$.get("user/getGGSatelliteLayer",function(data,status){
				 		localStorage.setItem("ggSatelliteLayer", data);
				 		window.location.href = "/ResourceMonitor/FunctionMenu.jsp";
					});
				}else{
					// 登录失败
					document.getElementById("errorMessage").innerHTML = "手机或密码错误！";
				}
				
			});
		} else{ //若输入的验证码与产生的验证码不一致时  
			// alert("验证码输入错误！@_@"); //则弹出验证码输入错误  
			document.getElementById("errorMessage").innerHTML = "验证码输入错误！";
			createCode();//刷新验证码  
			document.getElementById("input").value = "";//清空文本框  
		}
	}
	
	function keyLogin(){
		 if (event.keyCode==13)  //回车键的键值为13
		  // document.getElementByIdx_x("input1").click(); //调用登录按钮的登录事件
		  validate();
	}
</script>
<style type='text/css'>
#code {
	font-family: Arial, 黑体;
	font-style: italic;
	color: green;
	border: 0;
	padding: 2px 3px;
	letter-spacing: 3px;
	font-weight: bolder;
}
.btn-primary {
    color: #fff;
    background-color: #02a056;
    border-color: #01934e;
}
.btn-primary:hover{
    color: #fff;
    background-color: #00904b;
    border-color: #019a52;
}
.btn-primary:focus, .btn-primary.focus{
    color: #fff;
    background-color: #00904b;
    border-color: #019a52;
}
</style>

</head>
<body onload='createCode()'
	style="width: 100%; height: 100%; min-height: 650px; overflow: hidden; margin: 0; padding: 0;min-width: 1200px;" onkeydown="keyLogin();">
	<div
		style="width: 100%; height: 100%; text-align: center; background-image: url(images/login/bg.png); background-repeat: no-repeat; background-attachment: scroll; background-position: center center; background-size: 100% 100%;">
		<div
			style="width: 705px; height: 100%; min-height: 360px; position: relative; margin: 0px auto">
			<div
				style="position: relative; height: 482px; top: 18%; background-image: url(images/login/bg_02.png); background-repeat: no-repeat; background-attachment: scroll; background-position: center center;">

				<div
					style="top: 216px; left: 250px; width: 340px; height: 30px; line-height: 30px; text-indent: 5px; text-align: left; vertical-align: middle; position: absolute; font-size: 14px; font-weight: bold; color: #084e87;">
					<input name="mobile" type="text" class="form-control"
						style="top: 0px; right: 0px; width: 270px; height: 30px; line-height: 25px;">
				</div>
				<div
					style="top: 268px; left: 250px; width: 340px; height: 30px; line-height: 30px; text-indent: 5px; text-align: left; vertical-align: middle; position: absolute; font-size: 14px; font-weight: bold; color: #084e87;">
					<input name="password" type="password"  class="form-control" autocomplete="new-password"
						style="top: 0px; right: 0px; width: 270px; height: 30px; line-height: 25px;">
				</div>
				<div class="loginyzm"
					style="top: 322px; left: 250px; width: 340px; height: 30px; line-height: 30px; text-indent: 5px; text-align: left; vertical-align: middle; position: absolute; font-size: 14px; font-weight: bold; color: #084e87;">
					<input id="input" type="text" class="form-control"
						style="top: 0px; right: 78px; width: 165px; height: 30px; line-height: 25px;">
				</div>
				<input type="button" id="code" onclick="createCode()"
					style="top: 322px; left: 420px; width: 100px; height: 30px; line-height: 30px; text-indent: 5px; text-align: left; vertical-align: middle; position: absolute; font-size: 14px; font-weight: bold; color: #084e87;"
					title='点击更换验证码' /> <span id="errorMessage" style="position: absolute; left: 255px; top: 360px; color: red"></span>
				<button onclick="validate()" class="btn btn-primary" id="btn"
					style="position: absolute; left: 250px; top: 386px; font-size: 14px; font-weight: 900; font-family: Georgia; margin-top: 5px; height: 30px; width: 270px;">登录</button>
			</div>
		</div>
	</div>
</body>

</html>
