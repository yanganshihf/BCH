<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="JqgridInclude.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>标准地详查编辑</title>
<link href="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/dist/css/bootstrap-select.min.css" rel="stylesheet" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/js/layer/layui/css/layui.css" media="all">
<script src="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/dist/js/bootstrap-select.min.js"></script>
<style type="text/css">
.input{
	/* width: '10%'; */
	/* margin-top: 0.5%; */
	/* display: block; */
	margin-left:0.8%
	display:inline-block
    width: 20%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.layui-form-label{
	width: 120px;
}
.layui-form-item{
	margin-top: -15px;
}
.layui-layer-title{
    text-align: center;
    padding: 0 ;
    font-size: 1.4em;
    color: black;
}
</style>
</head>
<body>
	<div class="layui-form-item" style="margin-top: 10px;">
    <div class="layui-inline">
      <label class="layui-form-label">有&nbsp;害&nbsp;物&nbsp;种</label>
      <div class="layui-input-inline">
        <input type="text" name="phone" id="opyh" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">寄&nbsp;生&nbsp;植&nbsp;物</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="opjs" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">  
      <label class="layui-form-label">寄&nbsp;生&nbsp;类&nbsp;型</label>
      <div class="layui-input-inline">
        <input type="text" name="phone" id="opjslx" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">危&nbsp;害&nbsp;数&nbsp;量</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="opwhsl" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">代&nbsp;表&nbsp;数&nbsp;量</label>
      <div class="layui-input-inline">
        <input type="text" name="phone" id="oppdbsl" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
       <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">危&nbsp;害&nbsp;程&nbsp;度</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="opwhcd" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">备&emsp;&emsp;注</label>
      <div class="layui-input-inline">
        <input type="text" name="phone" id="opbz" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	  <div class="layui-input-inline" style="margin-left: 70%">
    <button type="button" class="layui-btn">确定</button>
      </div>
      <div class="layui-input-inline" style="margin-left: 5%">
    <button type="button" id="edityccz" class="layui-btn">重置</button>
      </div>
	<script>
	          
		function parameter(rowData) {
			/* 获取父页面传参 */
			$("#opyh ").val(rowData.xiao_Ban);
			
			$("#opjs ").val(rowData.linfen_Lx);
			
			$("#opjslx ").val(rowData.linfen_Mj);
			
			$("#opwhsl ").val(rowData.zhuyao_Sz);
			
			$("#oppdbsl ").val(rowData.ycd_Jd);
			
			$("#opwhcd ").val(rowData.ycd_Wd);
			
			$("#opbz ").val(rowData.ycd_Hb);
		}
		$("#edityccz").click(function(){
	$("#opyh ").val(rowData.xiao_Ban);
			
			$("#opjs ").val("");
			
			$("#opjslx ").val("");
			
			$("#opwhsl ").val("");
			
			$("#oppdbsl ").val("");
			
			$("#opwhcd ").val("");
			
			$("#opbz ").val("");
		})
	</script>
</body>
</html>