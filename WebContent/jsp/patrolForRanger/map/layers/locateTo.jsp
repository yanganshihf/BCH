<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/css/bootstrap.css" />

<script
	src="${pageContext.request.contextPath}/js/jquery-2.1.4/jquery.js"
	type="text/javascript"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/layer/layer-v3.0.3/layer/layer.js"></script>
<title>Insert title here</title>
<style>
.tab-pane {
	margin-top: 30px;
	margin-left: 7px;
	margin-right: 7px;
}

.form-control {
	margin: 3px;
	height: 25px;
}

.tab-content {
	margin-left: 12px;
}

.tab-pane label {
	margin-bottom: 0;
	margin-top: 5px;
}
a{
	color: #555;
}
#tabs-6109 a{
	font-size:15px;
}
 .nav-tabs>li.active{
 	color:#fff;
 	background-color:#058563;
 }
 .nav-tabs>li.active>a, .nav-tabs>li.active>a:focus{
 	color:#fff;
 }
#body li a{
	padding: 4px 10px;
	border:0;
	background-color: transparent;
}
</style>
</head>

	<body style="height: 200px;width: 300px;margin-left:5px;" id="body">
		<div class="row clearfix">
			<div class="col-xs-12 column">
				<div class="tabbable" id="tabs-6109">
					<ul class="nav nav-tabs" style="border-bottom:0">
						<li id="dfz" class="active">
							<a href="#panel-222257" data-toggle="tab"><strong>度分秒</strong></a>
						</li>
						<li id="sjz">
							<a href="#panel-895752" data-toggle="tab"><strong>十进制度</strong></a>
						</li>
						<li id="xian80">
							<a href="#panel-89575" data-toggle="tab"><strong>西安80坐标</strong></a>
						</li>
					</ul>
					<div class="tab-content">
						<div class="tab-pane active" id="panel-222257">
							<label>经度</label>
							<div class="row clearfix">
									<div class="col-xs-4 column" style="padding-right:7px">
										<input id="longtDu" style="width: 65px;float: left;" class="form-control" /><span style="float: right;margin-top: 5px;">°</span>
									</div>
									<div class="col-xs-4 column"  style="padding-right:11px;padding-left:11px">
										<input id="longtFen" style="width: 65px;float: left;" class="form-control" /><span style="float: right;margin-top: 5px;">′</span>
									</div>
									<div class="col-xs-4 column"  style="padding-left:7px">
										<input id="longtMiao" style="width: 65px;float: left;" class="form-control" /><span style="float: right;margin-top: 5px;">″</span>
									</div>
							</div>
							<label>纬度</label>
							<div class="row clearfix">
									<div class="col-xs-4 column" style="padding-right:7px">
										<input id="latDu" style="width: 65px;float: left;" class="form-control" /><span style="float: right;margin-top: 5px;">°</span>
									</div>
									<div class="col-xs-4 column"   style="padding-right:11px;padding-left:11px">
										<input id="latFen" style="width: 65px;float: left;" class="form-control" /><span style="float: right;margin-top: 5px;">′</span>
									</div>
									<div class="col-xs-4 column"  style="padding-left:7px">
										<input id="latMiao" style="width: 65px;float: left;" class="form-control" /><span style="float: right;margin-top: 5px;">″</span>
									</div>
							</div>
						</div>
						<div class="tab-pane" id="panel-895752">
							<label>经度</label>
							<div class="row clearfix">
									<div class="col-xs-12 column">
										<input id="longtFull" class="form-control" style="width: 257px;float: left;" /><span style="float: left;margin-top: 5px;margin-left: 5px;">°</span>
									</div>
							</div>
							<label>纬度</label>
							<div class="row clearfix">
									<div class="col-xs-12 column">
										<input id="latFull" class="form-control" style="width: 257px;float: left;" /><span style="float: left;margin-top: 5px;margin-left: 5px;">°</span>
									</div>
							</div>
						</div>
						<div class="tab-pane" id="panel-89575">
							<label>x坐标</label>
							<div class="row clearfix">
									<div class="col-xs-12 column">
										<input id="xCoor" class="form-control" />
									</div>
							</div>
							<label>y坐标</label>
							<div class="row clearfix">
									<div class="col-xs-12 column">
										<input id="yCoor" class="form-control" />
									</div>
							</div>
						</div> 
					</div>
				</div>
			</div>
		</div>
	</body>
<script type="text/javascript">
$(document).ready(function() {
	$("#longtDu").focus();
	$("#longtDu").off().on("input",function(){
		var length = $(this).val().length;
		var lontDval=parseInt($(this).val());
		if(isNaN(lontDval)===true || lontDval>135 || lontDval < 1){
			layer.tips('请输入有效值', '#longtDu', {
				  tips: [3, '#009f95']
			});
			$("#longtDu").val("");
		}else{
			if(length == 3){
				$("#longtFen").focus();
			}
		}
	})
	
	$("#longtFen").off().on("input",function(){
		var lontFval=parseInt($(this).val());
		if(isNaN(lontFval)===true || lontFval>60 || lontFval<0){
			layer.tips('请输入有效值', '#longtFen', {
				  tips: [3, '#009f95']
			});
			$("#longtFen").val("");
		}else{
			if(lontFval > 9){
				$("#longtMiao").focus();
			}
		}
	})
	
	$("#longtMiao").off().on("input",function(){
		var lontMval=parseInt($(this).val());
		if(isNaN(lontMval)===true || lontMval>60 ||lontMval<0){
			layer.tips('请输入有效值', '#longtMiao', {
				  tips: [3, '#009f95']
			});
			$("#longtMiao").val("");
		}else{
			if(lontMval > 9){
				$("#latDu").focus();
			}
		}
	})
	
	$("#latDu").off().on("input",function(){
		var length = $(this).val().length;
		var latDval=parseInt($(this).val());
		if(isNaN(latDval)===true || latDval>54 || latDval < 1){
			layer.tips('请输入有效值', '#latDu', {
				  tips: [3, '#009f95']
			});
			$("#latDu").val("");
		}else{
			if(length == 2){
				$("#latFen").focus();
			}
		}
	})
	
	$("#latFen").off().on("input",function(){
		var latFval=parseInt($(this).val());
		if(isNaN(latFval)===true || latFval>60 || latFval<0){
			layer.tips('请输入有效值', '#latFen', {
				  tips: [3, '#009f95']
			});
			$("#latFen").val("");
		}else{
			if(latFval > 9){
				$("#latMiao").focus();
			}
		}
	})
	
	$("#latMiao").off().on("input",function(){
		var latMval=parseInt($(this).val());
		if(isNaN(latMval)===true || latMval>60 ||latMval<0){
			layer.tips('请输入有效值', '#latMiao', {
				  tips: [3, '#009f95']
			});
			$("#latMiao").val("");
		}else{}
	})
	
});


function longtDegValidate(){
	var locationType=$("li[class=active]").prop("id");
	if(locationType=="dfz"){
		var lontDval=parseInt(document.getElementById("longtDu").value);
		if(isNaN(lontDval)===true || lontDval>135 ||lontDval<73){
			document.getElementById("longtDu").value="";
			layer.tips('请输入有效值', '#longtDu', {
				  tips: [3, '#009f95']
			});
			return false;
		}
	}else if(locationType=="sjz"){
		var lontDval=parseFloat(document.getElementById("longtFull").value);
		if(isNaN(lontDval)===true || lontDval>135 ||lontDval<73){
			document.getElementById("longtFull").value="";
			//document.getElementById("longtD").setAttribute("placeholder","请输入有效值");
			layer.tips('请输入有效值', '#longtFull', {
				  tips: [3, '#009f95']
			});
			return false;
		}else{
			document.getElementById("longtFull").value=lontDval;
		}
	}else{
		var lontStr=document.getElementById("xCoor").value;
		var lontDval=parseFloat(lontStr);
		if(isNaN(lontDval)){
			layer.tips('请输入有效值', '#xCoor', {
				  tips: [3, '#009f95']
			});
			return false;
		}else{
			if(lontDval<1000000){
				layer.tips('横坐标需包含带号', '#xCoor', {
					  tips: [3, '#009f95']
				});
				return false;
			}
			else if(lontStr.substring(0,2)!=='20'&&lontStr.substring(0,2)!=='21'){
				layer.tips('横坐标带号错误', '#xCoor', {
					  tips: [3, '#009f95']
				});
				return false;
			}
		}	
	}
	return true;
}

//-分
function longtMValidate(){
	mmValidate("longtFen");
}

//-秒
function longtSValidate(){
	ssValidate("longtMiao");
}

/*纬度输入验证*/
//-度
function latDegValidate(){
	var locationType=$("li[class=active]").prop("id");
	if(locationType=="dfz"){
		var latDval=parseInt(document.getElementById("latDu").value);
		if(isNaN(latDval)===true || latDval>54 ||latDval<3){
			document.getElementById("latDu").value="";
			//document.getElementById("latD").setAttribute("placeholder","请输入有效值");
			layer.tips('请输入有效值', '#latDu', {
				  tips: [3, '#009f95']
			});
			return false;
		}
	}else if(locationType=="sjz"){
		var latDval=parseFloat(document.getElementById("latFull").value);
		if(isNaN(latDval)===true || latDval>54 ||latDval<3){
			document.getElementById("latFull").value="";
			//document.getElementById("latD").setAttribute("placeholder","请输入有效值");
			layer.tips('请输入有效值', '#latFull', {
				  tips: [3, '#009f95']
			});
			return false;
		}else{
			document.getElementById("latFull").value=latDval;
		}
	}else{
		var latDval=parseFloat(document.getElementById("yCoor").value);
		if(isNaN(latDval)||latDval<1000000){
			layer.tips('请输入有效值', '#yCoor', {
				  tips: [3, '#009f95']
			});
			return false;
		}
	}
	return true;
}

//-分
function latMValidate(){
	mmValidate("latFen");
}

//-秒
function latSValidate(){
	ssValidate("latMiao");
}

//经纬度分验证
function mmValidate(inputId){
	var strVal = document.getElementById(inputId).value;
	if(strVal==""){
		strVal="0";
	}
	var val=parseInt(strVal);
	if(isNaN(val)===true || val>60 ||val<0){
		document.getElementById(inputId).value="";
		layer.tips('请输入有效值', '#'+inputId, {
			  tips: [3, '#009f95']
		});
		return false;
	}else{
		document.getElementById(inputId).value=val;
		return true;
	}
}
//经纬度秒验证
function ssValidate(inputId){
	var strVal=document.getElementById(inputId).value;
	if(strVal==""){
		strVal="0";
	}
	var val=parseFloat(strVal);
	var accure;
	if(strVal.indexOf('.')==-1){
		accure=0;
	}else{
	 	accure=strVal.length-strVal.indexOf('.')-1;
	}
	if(isNaN(val)===true || val>60 ||val<0||accure>1){
		document.getElementById(inputId).value="";
		layer.tips('请输入有效值', '#'+inputId, {
			  tips: [3, '#009f95']
		});
		return false;
	}else{
		document.getElementById(inputId).value=val;
		return true;
	}
}		

/* function xySumbit(){
	if(!paramsValidate())
		return;
	var locationType=$("#locationType").val();
	var longtD=$("#longtD").val();
	var latD=$("#latD").val();
	longtD=parseFloat(longtD);
	latD=parseFloat(latD);
	if(locationType=="optionDMS"){
		var longtM=$("#longtM").val();
		var longtS=$("#longtS").val();
		if(longtM !==null&&longtM !==""){
			longtD+=parseFloat(longtM)/60;
		}
		if(longtS !==null&&longtS !==""){
			longtD+=parseFloat(longtS)/3600;
		}
		longtD=longtD.toFixed(6);
		var latM=$("#latM").val();
		var latS=$("#latS").val();
		if(latM !==null&&latM !==""){
			latD+=parseFloat(latM)/60;
		}
		if(latS !==null&&latS !==""){
			latD+=parseFloat(latS)/3600;
		}
		latD=latD.toFixed(6);
	}
    return true;	        
} */

function paramsValidate(){
	if(!longtDegValidate()){
		return false;
	}	
	if(!latDegValidate()){
		return false;
	}
	var locationType=$("li[class=active]").prop("id");
	if(locationType=="dfz"){
		if(!mmValidate("longtFen")){
			return false;
		}
		if(!ssValidate("longtMiao")){
			return false;
		}
		if(!mmValidate("latFen")){
			return false;
		}
		if(!ssValidate("latMiao")){
			return false;
		}	
	}
	return true;
}
</script>
</html>