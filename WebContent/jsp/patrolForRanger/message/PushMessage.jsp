<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>发布公告</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript" src="${pageContext.request.contextPath}/js/wangEditor-3.1.1/release/wangEditor.js"></script>
</head>

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
.form-control {
	height: 27px;
	font-size: 15px;
	padding-top: 0px;
	padding-bottom: 0px;
}
.row{
	width: 100%;
	margin:0;
	margin-top: 5px;
	margin-bottom: 5px;
}
.removeRp{
	padding-right:0;
	padding-left: 0;
}
.text {
    border: 1px solid #ccc;
    height: 400px;
}
.btn-default {
	height: 27px;
	font-size: 15px;
	padding: 0 12px;
}
</style>
<body>
	<!-- <div class="container" id="cond">
		<div class="row">
			<div class="col-xs-1 removeRp" style="font-size:15px;">标&emsp;题</div>
			<div class="col-xs-6 remove">
				<input id="fileName" class="form-control" />
			</div>
		</div>
		<div class="row">
			<div id="editor" class="col-xs-12 removeRp">
				<p>请输入内容...</p>
			</div>
		</div>
	</div> -->
	<form class="form-inline" id="formDiv">
  		<div class="form-group" style="margin-top: 5px;">
    		<label for="fileName">标&emsp;题</label>
    		<input id="fileName" class="form-control" style="width:300px;" />
  		</div>
  		<button type="button" class="btn btn-default" id="Send" style="margin-top: 5px;">
				<img src="/ResourceMonitor/images/indexpage/send.png" class="" alt="发布" title="发布">
		</button>
  		<img src="/ResourceMonitor/images/indexpage/hk_quit.png" id="close" class="" style="cursor:pointer;position:absolute;top:10px;right:0px" alt="关闭" title="关闭">
  		
  		<div class="row">
			<div id="editor" class="col-xs-12 removeRp">
				<p id='editorP'>请输入内容...</p>
			</div>
		</div>
  	</form>
</body>
<script type="text/javascript" src="/ResourceMonitor/js/myJS/patrolForRanger/message/PushMessage.js"></script>
</html>