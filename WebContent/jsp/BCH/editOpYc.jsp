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
      <label class="layui-form-label">昆&nbsp;虫&nbsp;名&nbsp;称</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edyckc" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">昆虫数合计</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="edyckchj" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">昆虫数量雌</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edycci" id="edycxb" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">昆虫数量雄</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="edycx" id="edyclf" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">备&emsp;&emsp;&emsp;注</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edycbz" lay-verify="required|phone" autocomplete="off" class="layui-input">
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
			$("#edyckc ").val(rowData.kunchong);
			
			$("#edyckchj ").val(rowData.shuliang_H);
			
			$("#edycci ").val(rowData.shuliang_C);
			
			$("#edycx ").val(rowData.shuliang_X);
			
			$("#edycbz ").val(rowData.bei_Zhu);
		}
		$("#edityccz").click(function(){
			$("#edyckc ").val("");
			
			$("#edyckchj ").val("");
			
			$("#edycci ").val("");
			
			$("#edycx ").val("");
			
			$("#edycbz ").val("");
		})
	</script>
</body>
</html>