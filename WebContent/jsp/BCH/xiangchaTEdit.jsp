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
<!-- 标准地详查病害防前防后中内嵌编辑页面 -->
<body>
	<div class="layui-form-item" style="margin-top: 10px">
    <div class="layui-inline">
      <label class="layui-form-label">样&emsp;&emsp;&emsp;方</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="yangfang" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">样株数</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="yangzhus" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">病&emsp;&emsp;&emsp;级</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="bingji" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">样地号取值</label>
      <div class="layui-input-inline">
        <input type="text" id="yangdihaoqz" name="email" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">病&emsp;&emsp;&emsp;情</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="bingqing" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">备&emsp;&emsp;&emsp;注</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="beizhu" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
      <div class="layui-input-inline" style="margin-left: 65%;margin-top: 5%">
    <button type="button" onclick="sure()" class="layui-btn">确定</button>
      </div>
      <div class="layui-input-inline" style="margin-left: 5%;margin-top: 5%">
    <button type="reset" onclick="cancel()" class="layui-btn">重置</button>
      </div>
	<script>
		function bianji(param) {
			console.log(param)
			/* 获取父页面传参 */
			//样方
			$("#yangfang").val(param.yangf_H);
			//样株数
			$("#yangzhus").val(param.yangz_H);
			//病级
			$("#bingji").val(param.bing_Ji);
			//样地号取值
			$("#yangdihaoqz").val(param.daibiaozhi);
			//病情
			$("#bingqing").val(param.bing_Qing);
			//备注
			$("#beizhu").val(param.bei_Zhu);
			
			/* $.ajax({
				url : '',
				dataType : 'json',
				type : 'POST',
				data : {
					
				},
			success : function(res) {
				
			}
			}) */
		}
	</script>