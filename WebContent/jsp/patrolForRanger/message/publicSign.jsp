<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>公示监督</title>
<%-- <script type="text/javascript"
	src="${pageContext.request.contextPath}/js/layer/layer-v3.0.3/layer/layer.js"></script> --%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<style type="text/css">
@media (min-width: 700px){
	.container {
    	width: 100%;
	}
}
.container{
	padding-left:0;
	padding-right:0;
	
}
#formDiv .form-control {
	height: 22px;
	font-size: 14px;
	padding:0 0 1px 5px;
    margin-bottom: 3px;
	width:200px;
}
#formDiv {
    margin-top:10px;
	margin-bottom: 9px;
}
#formDiv label{
	font-size:14px;
	line-height: 22px;
	font-weight:normal;
	margin-bottom:0;
}
.btn-default {
	height: 22px;
	font-size: 14px;
	padding: 0 12px;
	margin-bottom: 3px;
}


#gridPager {
	position: absolute;
	bottom: 0;
}
.layui-layer-title {
	font-size: 15px;
	font-weight: 700;
}
.layui-form{
	margin:0;
}
.layui-layer-btn .layui-layer-btn0{border-color:#058563;background-color:#058563;color:#fff}
</style>
</head>
<body>
	<form class="form-inline" id="formDiv">
		<div class="form-group">
			<label for="fileType">&emsp;类型</label>
			<select id="fileType" class="form-control">
					<option value =99>全部</option>
					<option value =1 >月季度考核公示</option>
					<option value =2>工资发放公示</option>
					<option value =3>选聘续聘公示</option>
					<option value =4>护林员培训</option>
			</select>
		</div>
  		<div class="form-group">
    		<label for="fileNum">&emsp;文号</label>
    		<input id="fileNum" class="form-control" />
  		</div>
  		<div class="form-group">
    		<label for="fileName">&emsp;文件名</label>
    		<input id="fileName" class="form-control" />
  		</div>
  		<button type="button" class="btn btn-default" id="submit" title="查询">
			<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
		</button>
		<button type="button" class="btn btn-default" id="addFile" style="float:right;" title="发布公示">
			<img src="/ResourceMonitor/images/indexpage/Add_files.png" class="" alt="发布公示">
		</button>
	</form>
	<div class="container" id="gridCond">
		<table id="jqgrid"></table>
		<div id="gridPager"></div>
	</div>
</body>
<script type="text/javascript">
$(function(){
	var menus=localStorage.getItem('cookie_menu');
	if(menus.indexOf("月季度考核公示") == -1){
		$("option[value=1]").css("display","none");
	}	
	if(menus.indexOf("工资发放公示") == -1){
		$("option[value=2]").css("display","none");
	}
	if(menus.indexOf("选聘续聘公示") == -1){
		$("option[value=3]").css("display","none");
	}
	if(menus.indexOf("护林员培训") == -1){
		$("option[value=4]").css("display","none");
	}
	if(menus.indexOf("发布公示") == -1){
		$("#addFile").css("display","none");
	}
})
</script>
<script type="text/javascript" src="/ResourceMonitor/js/myJS/patrolForRanger/message/publicSign.js"></script>

</html>