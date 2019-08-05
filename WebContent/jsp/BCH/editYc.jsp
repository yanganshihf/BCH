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
</style>
</head>
<body>
	<div class="layui-form-item" style="margin-top: 10px;">
    <div class="layui-inline">
      <label class="layui-form-label">县&emsp;&emsp;</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">乡&emsp;&emsp;</label>
      <div class="layui-input-inline">
        <input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">诱虫灯小班</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edycxb" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">林&nbsp;分&nbsp;类&nbsp;型</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="edyclf" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">林&nbsp;地&nbsp;面&nbsp;积</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edycmj" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">主&nbsp;要&nbsp;树&nbsp;种</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="edycsz" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">经&emsp;&emsp;&emsp;度</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edycjd" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">经&emsp;&emsp;&emsp;度</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="edycwd" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">海&emsp;&emsp;&emsp;拔</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edychb" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">调&emsp;查&emsp;人</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="edycdcr" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	  <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">调&nbsp;查&nbsp;时&nbsp;间</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edycdcsj" lay-verify="required|phone" autocomplete="off" class="layui-input">
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
			$("#edycxb ").val(rowData.xiao_Ban);
			
			$("#edyclf ").val(rowData.linfen_Lx);
			
			$("#edycmj ").val(rowData.linfen_Mj);
			
			$("#edycsz ").val(rowData.zhuyao_Sz);
			
			$("#edycjd ").val(rowData.ycd_Jd);
			
			$("#edycwd ").val(rowData.ycd_Wd);
			
			$("#edychb ").val(rowData.ycd_Hb);
			
			$("#edycdcr ").val(rowData.diaocha_Ry);
			
			$("#edycdcsj ").val(rowData.diaocha_Sj);
		}
		$("#edityccz").click(function(){
			$("#edycxb ").val("");
			
			$("#edyclf ").val("");
			
			$("#edycmj ").val("");
			
			$("#edycsz ").val("");
			
			$("#edycjd ").val("");
			
			$("#edycwd ").val("");
			
			$("#edychb ").val("");
			
			$("#edycdcr ").val("");
			
			$("#edycdcsj ").val("");
		})
	</script>
</body>
</html>