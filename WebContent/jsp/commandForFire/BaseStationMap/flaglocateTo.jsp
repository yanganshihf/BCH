<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>视频回放</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="/ResourceMonitor/js/moment.min.js"></script> 
<link rel="stylesheet" href="/ResourceMonitor/icomoon/style.css" />
<title>Insert title here</title>
<style>
@media ( min-width : 700px) {
	.container {
		width: 100%;
	}
}

.layui-table-header span{
	color:#058563;
	font-weight:700;
}
.layui-table-header th{
 	background-color:#E6E6E6;
}
.layui-table-view .layui-table td{
	padding:0px 0;
}

.layui-table-page{
	text-align:center;
}
html body{
    height: 100%;
}

.tab-pane {
	margin-top: 10px;
}

.form-control {
	margin: 3px;
	height: 25px;
}

.tab-pane label {
	margin-bottom: 0;
	margin-top: 5px;
	margin-right: 10px;
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
.layui-table, .layui-table-view {
    margin: 0;
}
.layui-table-cell{
	padding:0;
}
</style>
</head>

	<body style="width: 300px;margin-left:5px;" id="body">
		<ul id="myTab" class="nav nav-tabs">
			<li class="active"><a id="ashijian1" href="#shijian1" data-toggle="tab">插旗标注</a></li>
			<li><a id="ashijian2" href="#shijian2" data-toggle="tab">历史回顾</a></li>
		</ul>
		<div id="myTabContent" class="tab-content">
			<div class="tab-pane fade in active" id="shijian1">
				<table style="line-height:40px;margin:10px;">
					<tr>
						<td style="width:100px;">符号颜色</td>
						<td colspan="2" style=""><div style="height: 20px;background-color: red;cursor: pointer;" class="flagColor" id="red"></div></td>
					</tr>
					<tr>
						<td>符号大小</td>
						<td><input type="range" id="flagSize" min="1" max="40" value="24" style="width:150px;"/></td>
						<td><span class="layui-badge layui-bg-black" id="flagSizeVal">24</span></td>
					</tr>
					<tr>
						<td colspan="3">插旗标注坐标</td>
					</tr>
				</table>	
				<!-- <div class="row clearfix">
					<div class="col-xs-12 column"> -->
						<div class="tabbable" id="tabs-6109" style="margin-left:10px;">
							<ul id="ul" class="nav nav-tabs" style="border-bottom:0">
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
									<div style="display:flex;">
										<label>经度</label>
										<input id="longtDu" style="width: 65px;float: left;" class="form-control" /><span style="float: right;margin-top: 5px;margin-right: 6px;">°</span>
										<input id="longtFen" style="width: 65px;float: left;" class="form-control" /><span style="float: right;margin-top: 5px;margin-right: 6px;">′</span>
										<input id="longtMiao" style="width: 65px;float: left;" class="form-control" /><span style="float: right;margin-top: 5px;margin-right: 6px;">″</span>
									</div>
									<div style="display:flex;">
										<label>纬度</label>
										<input id="latDu" style="width: 65px;float: left;" class="form-control" /><span style="float: right;margin-top: 5px;margin-right: 6px;">°</span>
										<input id="latFen" style="width: 65px;float: left;" class="form-control" /><span style="float: right;margin-top: 5px;margin-right: 6px;">′</span>
										<input id="latMiao" style="width: 65px;float: left;" class="form-control" /><span style="float: right;margin-top: 5px;margin-right: 6px;">″</span>
									</div>
								</div>
								<div class="tab-pane" id="panel-895752">
									<div style="display:flex;">
										<label>经度</label>
										<input id="longtFull" class="form-control" style="width: 220px;float: left;" /><span style="float: left;margin-top: 5px;margin-left: 5px;">°</span>
									</div>
									<div style="display:flex;">
										<label>纬度</label>
										<input id="latFull" class="form-control" style="width: 220px;float: left;" /><span style="float: left;margin-top: 5px;margin-left: 5px;">°</span>
									</div>
								</div>
								<div class="tab-pane" id="panel-89575">
									<div style="display:flex;">
										<label>x坐标</label>
										<input id="xCoor" class="form-control" style="width: 225px;"/>
									</div>
									<div style="display:flex;">
										<label>y坐标</label>
										<input id="yCoor" class="form-control" style="width: 225px;"/>
									</div>
								</div>
							</div>
						</div>
				<!-- 	</div>
				</div> -->
				<table style="margin-left:10px;margin-top:20px;">
					<tr>
						<td style="width:103px;"><button id="pointFlagButton" class="layui-btn layui-btn-sm layui-btn-primary" style="width:68px;">鼠标插旗</button></td>
						<td style="width:103px;"><button id="locationFlagButton" class="layui-btn layui-btn-sm layui-btn-primary" style="width:68px;">坐标插旗</button></td>
						<td><button id="saveFlagButton" class="layui-btn layui-btn-sm layui-btn-primary" style="width:68px;">保存</button></td>
					</tr>
				</table>
			</div>
			<div class="tab-pane fade" id="shijian2">
				<table id="table" lay-filter="filter"></table>
			</div>
		</div>
		<div id="panel" class="" style="display:none;position: absolute; width: 180px; height: 60px;top: 73px;left: 113px;border-radius: 2px;box-shadow: 1px 1px 50px rgba(0,0,0,.3);">
			<div style="height: 20px;background-color: red;cursor: pointer;" class="fColor" id="red"></div>
			<div style="height: 20px;background-color: blue;cursor: pointer;" class="fColor" id="blue"></div>
			<div style="height: 20px;background-color: yellow;cursor: pointer;" class="fColor" id="yellow"></div>
		</div>
	</body>
<script type="text/javascript">
var colorLayer = -1;
$(document).ready(function() {
		$(".flagColor").off().on("click",function(){
			if(colorLayer == -1){	
				$("#panel").show("slow");
				colorLayer = 1;
				$(".fColor").off().on("click",function(){	
					$("#panel").hide("slow");
					colorLayer = -1;
					$(".flagColor").attr("id",$(this).attr("id"));
				    $(".flagColor").css("background-color",$(this).attr("id"));		
				});
		}else{
			$("#panel").hide("slow");
			colorLayer = -1;
		}
	});
	
	
	
	
	
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
	var locationType=$("#ul li[class=active]").attr("id");
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
	var locationType=$("#ul li[class=active]").attr("id");
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
<script type="text/javascript">
layui.use(['laydate','table','util'], function(){
  var util = layui.util;
  var table = layui.table;
  var closData =  [[
      {field:'time',title: '时间',align:'center',width:145
          ,templet: function(d){
              return util.toDateString(d.time,'yyyy/MM/dd HH:mm:ss').substr(2)
          }    
      }
      ,{field:'person',title: '保存人',align:'center'}
      ,{title: '回看',align:'center',toolbar: '#goRecord'}
     ]];
  //视频回放表格渲染
  table.render({
    elem: '#table'
    ,url:'/ResourceMonitor/flagBack/queryFlagBack'
    ,cellMinWidth: 60 
    ,cols:closData
  	,id: 'tableId'
  	,page: true
  	,height: 'full-40'
  	,limits:[10,30,90]
  	,page: {
  		layout:['prev', 'page', 'next']			  		
  	}
  	, skin: 'line' 
  });
  //回看
  table.on('tool(filter)', function(obj){
	 var data = obj.data;
	 var points = data.points;
	 parent.analysis.addFlagPoints(points);
  });
});	
</script>
<script type="text/html" id="goRecord">
	<span class="icon-play" lay-event="record" style="font-size:20px;line-height:28px;"></span>
</script>
</html>