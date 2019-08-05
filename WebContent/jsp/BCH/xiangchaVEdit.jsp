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
<!-- 标准地详查鼠害防前防后中内嵌编辑页面 -->
<body>
	<div class="layui-form-item" style="margin-top: 10px">
    <div class="layui-inline">
      <label class="layui-form-label">样&emsp;&emsp;&emsp;方</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="yangfang" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">土丘树(个)</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="yangzhus" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">有效洞口(个)</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="bingji" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">捕鼠夹(个)</label>
      <div class="layui-input-inline">
        <input type="text" id="yangdihaoqz" name="email" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
	    <div class="layui-inline">
	      <label class="layui-form-label">实际鼠数(只)计雌雄</label>
	      <div class="layui-input-inline">
	        <input type="tel" name="phone" id="bingqing" lay-verify="required|phone" autocomplete="off" class="layui-input">
	      </div>
	    </div>
	    <div class="layui-inline">
	      <label class="layui-form-label">土丘系数</label>
	      <div class="layui-input-inline">
	        <input type="tel" name="phone" id="bingqing" lay-verify="required|phone" autocomplete="off" class="layui-input">
	    </div>
  	    </div>
 	 </div>
 	  <div class="layui-form-item">
	    <div class="layui-inline">
	      <label class="layui-form-label">捕获率%</label>
	      <div class="layui-input-inline">
	        <input type="tel" name="phone" id="bingqing" lay-verify="required|phone" autocomplete="off" class="layui-input">
	      </div>
	    </div>
	    <div class="layui-inline">
	      <label class="layui-form-label">鼠密度</label>
	      <div class="layui-input-inline">
	        <input type="tel" name="phone" id="bingqing" lay-verify="required|phone" autocomplete="off" class="layui-input">
	    </div>
  	    </div>
 	 </div>
 	  <div class="layui-form-item">
	    <div class="layui-inline">
	      <label class="layui-form-label">调查株数</label>
	      <div class="layui-input-inline">
	        <input type="tel" name="phone" id="bingqing" lay-verify="required|phone" autocomplete="off" class="layui-input">
	      </div>
	    </div>
	    <div class="layui-inline">
	      <label class="layui-form-label">受害株数</label>
	      <div class="layui-input-inline">
	        <input type="tel" name="phone" id="bingqing" lay-verify="required|phone" autocomplete="off" class="layui-input">
	    </div>
  	    </div>
 	 </div>
 	  <div class="layui-form-item">
	    <div class="layui-inline">
	      <label class="layui-form-label">受害株率</label>
	      <div class="layui-input-inline">
	        <input type="tel" name="phone" id="bingqing" lay-verify="required|phone" autocomplete="off" class="layui-input">
	      </div>
	    </div>
	    <div class="layui-inline">
	      <label class="layui-form-label">死亡株数</label>
	      <div class="layui-input-inline">
	        <input type="tel" name="phone" id="bingqing" lay-verify="required|phone" autocomplete="off" class="layui-input">
	    </div>
  	    </div>
 	 </div>
 	 <div class="layui-form-item">
	    <div class="layui-inline">
	      <label class="layui-form-label">发生程度</label>
	      <div class="layui-input-inline">
	        <input type="tel" name="phone" id="bingqing" lay-verify="required|phone" autocomplete="off" class="layui-input">
	      </div>
	    </div>
	    <div class="layui-inline">
	      <label class="layui-form-label">备注(表明面积)</label>
	      <div class="layui-input-inline">
	        <input type="tel" name="phone" id="bingqing" lay-verify="required|phone" autocomplete="off" class="layui-input">
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
			/* 获取父页面传参 */
			$("#linban").val(param.cun);
			$("#yangdihao").val(param.yangdi_H);
			$("#beforetime").val(param.dcsj_Fq);
			$("#lasttime").val(param.dcsj_Fh);
			$("#diaochary").val(param.diaocha_Ry);
			$("#jingdu").val(param.yangdi_Jd);
			$("#weidu").val(param.yangdi_Wd);
			$("#xiang").val(param.xiang_Mc);
			$("#xiaoban").val(param.xiao_Ban);
			$("#yangfangsl").val(param.yangf_Sl);
			$("#dimj").val(param.yangdi_Mj);
			$("#youhaizl").val(param.yhsw_Mc);
			$("#beizhu").val(param.yangdi_Bz);
			
		}
	</script>