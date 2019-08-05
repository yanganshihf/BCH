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
<div class="layui-form">
	<div class="layui-form-item" style="margin-top: 10px;">
    <div class="layui-inline">
      <label class="layui-form-label">县&emsp;&emsp;</label>
      <div class="layui-input-inline">
		<select id="editjyx_xian" lay-filter="edit_xianFil"><option value="请选择">请选择</option></select>
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">乡&emsp;&emsp;</label>
      <div class="layui-input-inline">
	<select id="editjyx_xiang" lay-filter="edit_xiangFil"><option value="请选择">请选择</option></select>
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">诱虫灯小班</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edjyxb" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">林&nbsp;分&nbsp;类&nbsp;型</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="edjylf" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">主&nbsp;要&nbsp;树&nbsp;种</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edjysz" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">经&emsp;&emsp;&emsp;度</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="edjyjd" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">纬&emsp;&emsp;&emsp;度</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edjywd" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">海&emsp;&emsp;&emsp;拔</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="edjyhb"  lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">树&nbsp;苗&nbsp;来&nbsp;源</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edjyzm" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">郁&emsp;闭&emsp;度</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="edjyybd" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	  <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">有&nbsp;害&nbsp;物&nbsp;种</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edjyyh" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">备&emsp;&emsp;&emsp;注</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edjybz" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">调&emsp;查&emsp;人</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edjydc" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">调&nbsp;查&nbsp;时&nbsp;间</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edjysj" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	<div class="layui-input-inline" style="margin-left: 70%">
    <button type="button" class="layui-btn">确定</button>
      </div>
      <div class="layui-input-inline" style="margin-left: 5%">
    <button type="button" id="jyxeditcz" class="layui-btn">重置</button>
      </div>
      </div>
    <script src="${pageContext.request.contextPath}/js/layer/layui/layui.js"></script>
	<script>
	// 获取路径
			var curWwwPath = window.document.location.href;
			var pathname = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathname);
			var localhostPath = curWwwPath.substring(0, pos);
			var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
		function parameter(rowData) {
			layui.use(['layer','form'], function() {
				var layer = layui.layer;
				var $ = layui.jquery;
				form = layui.form;	
			/* 获取父页面传参 */
			$("#edjyxb").val(rowData.xiao_Ban);
			
			$("#edjylf").val(rowData.linfen_Lx);
			
			$("#edjysz").val(rowData.zhuyao_Sz);
			
			$("#edjyjd").val(rowData.jyx_Jd);
			
			$("#edjywd").val(rowData.jyx_Wd);
			
			$("#edjyhb").val(rowData.jyx_Hb);
			
			$("#edjyzm").val(rowData.jyx_Zmly);
			
			$("#edjyybd").val(rowData.jyx_Ybd);
			
			$("#edjyyh").val(rowData.yhsw_lb);
			
			$("#edjybz").val(rowData.beizhu);
			
			$("#edjydc").val(rowData.diaocha_Ry);
			
			$("#edjysj").val(rowData.diaocha_Sj);
			form.render('select')
			//县乡查询
			  $.ajax({
				url : localhostPath + projectName + '/datalib/xingzhengquhua',
				type : 'POST',
				dataType : 'json',
				data : {},
				success : function(res) {
					console.log(res);
					var msg = res.rows;
					for (var i = 0; i < msg.length; i++) {
						if(msg[i].ji_Bie=="4"){
							$("#editjyx_xiang").append( "<option value='" + msg[i].code + "'>" + msg[i].name + "</option>");
							form.render('select');
						}
						if(msg[i].ji_Bie=="3"){
							$("#editjyx_xian").append( "<option value='" + msg[i].code + "'>" + msg[i].name + "</option>");
							form.render('select');
						}
					}
					$("#editjyx_xian").val(rowData.xian);
					form.render('select');
					$("#editjyx_xiang").val(rowData.xiang);
					form.render('select')
				}
				});
				})
			}

		$("#jyxeditcz").click(function(){
			var index=layer.confirm('您确定要重置吗？', {
				btn:["确定","取消"]
			},function(){
				$("#edjyxb").val("");
				$("#edjylf").val("");
				$("#edjysz").val("");
				$("#edjyjd").val("");
				$("#edjywd").val("");
				$("#edjyhb").val("");
				$("#edjyzm").val("");
				$("#edjyybd").val("");
				$("#edjyyh").val("");
				$("#edjybz").val("");
				$("#edjydc").val("");
				$("#edjysj").val("");	
				$("#editjyx_xian").val("请选择");
				$("#editjyx_xiang").val("请选择");
				form.render('select')
				layer.close(index)
			},function(){
				layer.close(index)
			})
		})
	</script>
</body>
</html>