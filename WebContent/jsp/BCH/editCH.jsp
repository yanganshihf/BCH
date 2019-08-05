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
.selectpicker{
margin-left: 0.5%;

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
      <label class="layui-form-label">标&nbsp;准&nbsp;地&nbsp;号</label>
      <div class="layui-input-inline">
        <input type="text" name="phone" lay-verify="required|phone" id="edchbzdbh" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px">
      <label class="layui-form-label">样&nbsp;方&nbsp;序&nbsp;号</label>
      <div class="layui-input-inline">
        <input type="text" name="email" lay-verify="email" id="edchyfxh" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">调&nbsp;查&nbsp;株&nbsp;树</label>
      <div class="layui-input-inline">
        <input type="text" name="phone" lay-verify="required|phone" id="edchdczs" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px">
      <label class="layui-form-label">危&emsp;害&emsp;期</label>
      <div class="layui-input-inline">
        <input type="text" name="email" lay-verify="email" id="edchwhq" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">有&nbsp;虫&nbsp;株&nbsp;数</label>
      <div class="layui-input-inline">
        <input type="text" name="phone" lay-verify="required|phone" id="edchyczs" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px">
      <label class="layui-form-label">有&nbsp;虫&nbsp;株&nbsp;率</label>
      <div class="layui-input-inline">
        <input type="text" name="email" lay-verify="email" id="edchyczl" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">发&nbsp;生&nbsp;程&nbsp;度</label>
      <div class="layui-input-inline">
        <input type="text" name="phone" lay-verify="required|phone" id="edchfscd" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px">
      <label class="layui-form-label">备&emsp;&emsp;&emsp;注</label>
      <div class="layui-input-inline">
        <input type="text" name="email" lay-verify="email" id="edchbz" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-input-inline" style="margin-left: 70%">
    <button type="button" class="layui-btn">确定</button>
      </div>
      <div class="layui-input-inline" style="margin-left: 5%">
    <button type="button" class="layui-btn">重置</button>
      </div>
	<script>
		
		function parameter(rowData) {
			/* 获取父页面传参 */
			  $("#edchbzdbh").val(rowData.bzd_Bh);
			  $("#edchyfxh").val(rowData.yangf_Xh);
			  $("#edchdczs").val(rowData.diaocha_Zs);
			  $("#edchwhq").val(rowData.chongtai);
			  $("#edchyczs").val(rowData.shouhai_Zs);
			  $("#edchyczl").val(rowData.shouhai_Zl);
			  $("#edchfscd").val(rowData.weihai_Cd);
			  $("#edchbz").val(rowData.beizhu);
			
		}
	</script>
</body>
</html>