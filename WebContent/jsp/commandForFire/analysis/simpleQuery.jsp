<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="renderer" content="webkit">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<link rel="stylesheet" href="../../../js/bootstrap-3.3.5-dist/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="../../../js/layer/layui/css/layui.css" media="all"/>
	<script type="text/javascript" src="../../../js/jquery-2.1.4/jquery.min.js"></script>
	<script type="text/javascript" src="../../../js/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="../../../js/layer/layui/layui.all.js"></script>
<style type="text/css">
#linchangDiv button{
	width: 70px;
}
#poduDiv button{
	width: 70px;
}
#baohuDiv button{
	width: 70px;
}
#poxiangDiv button{
	width: 45px;
}
</style>
</head>
<body>
	<div>
		<table style="font-size:14px;line-height:35px;margin:10px;text-align:left">
			<tbody>
				<tr>
					<td style="width:70px;">林场</td>
					<td>
						<div  id="linchangDiv" class="layui-btn-group" data="">
						</div>
					</td>
				</tr>	
				<tr>
					<td>坡度</td>
					<td>
						<div  id="poduDiv" class="layui-btn-group" data="">
						</div>
					</td>
				</tr>
				<tr>
					<td>坡向</td>
					<td>
						<div  id="poxiangDiv" class="layui-btn-group" data="">
						</div>					
					</td>
				</tr>	
				<tr>
					<td>保护等级</td>
					<td>
						<div  id="baohuDiv" class="layui-btn-group" data="">
						</div>	
					</td>
				</tr>																										
			</tbody>
		</table>
	</div>
</body>
<script type="text/javascript">
$(function(){
	$("#linchangDiv").off().on("click","button",function(){
		$("#linchangDiv").find("button").css("background","");
		$("#linchangDiv").find("button").css("color","");
		$(this).css("background","#058563");
		$(this).css("color","#fff");
		var text = $(this).text();
		if(text=='全部'){
			$("#linchangDiv").attr("data","")
		}else{
			$("#linchangDiv").attr("data",text)
		}
		
	})
	$("#poduDiv").off().on("click","button",function(){
		$("#poduDiv").find("button").css("background","");
		$("#poduDiv").find("button").css("color","");
		$(this).css("background","#058563");
		$(this).css("color","#fff");
		var text = $(this).text();
		if(text=='全部'){
			$("#poduDiv").attr("data","")
		}else{
			$("#poduDiv").attr("data",text)
		}
	})
	$("#poxiangDiv").off().on("click","button",function(){
		$("#poxiangDiv").find("button").css("background","");
		$("#poxiangDiv").find("button").css("color","");
		$(this).css("background","#058563");
		$(this).css("color","#fff");
		var text = $(this).text();
		if(text=='全部'){
			$("#poxiangDiv").attr("data","")
		}else{
			$("#poxiangDiv").attr("data",text)
		}
	})
	$("#baohuDiv").off().on("click","button",function(){
		$("#baohuDiv").find("button").css("background","");
		$("#baohuDiv").find("button").css("color","");
		$(this).css("background","#058563");
		$(this).css("color","#fff");
		var text = $(this).text();
		if(text=='全部'){
			$("#baohuDiv").attr("data","")
		}else{
			$("#baohuDiv").attr("data",text)
		}
	})
})
</script>
</html>