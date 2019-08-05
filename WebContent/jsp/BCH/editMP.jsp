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
		<select id="editmp_xian" lay-filter="edit_xianFil"><option value="请选择">请选择</option></select>
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">乡&emsp;&emsp;</label>
      <div class="layui-input-inline">
	<select id="editmp_xiang" lay-filter="edit_xiangFil"><option value="请选择">请选择</option></select>
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">场&nbsp;所&nbsp;名&nbsp;称</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edmpcs" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">面&emsp;&emsp;&emsp;积</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="edmpmj" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">经&emsp;&emsp;&emsp;度</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edmpjd" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">纬&emsp;&emsp;&emsp;度</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="edmpwd" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">海&emsp;&emsp;&emsp;拔</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edmphb" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline" style="margin-left: -40px;">
      <label class="layui-form-label">调&emsp;查&emsp;人</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="edmpdcr" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">调&nbsp;查&nbsp;时&nbsp;间</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="edmpdcsj" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	   <div class="layui-input-inline" style="margin-left: 70%">
    <button type="button"  class="layui-btn">确定</button>
      </div>
      <div class="layui-input-inline" style="margin-left: 5%">
    <button type="button" id="edmpcz" class="layui-btn">重置</button>
      </div>
      </div>
	<script src="${pageContext.request.contextPath}/js/layer/layui/layui.js"></script>
	<script>
		var curWwwPath = window.document.location.href;
		var pathname = window.document.location.pathname;
		var pos = curWwwPath.indexOf(pathname);
		var localhostPath = curWwwPath.substring(0, pos);
		var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
		function parameter(rowData) {
			layui.use(['layer','form'],function(){
				var layer = layui.layer;
				var $ = layui.jquery;
				form = layui.form;
			/* 获取父页面传参 */
			$("#edmpcs").val(rowData.miaopu_Mc);
			$("#edmpmj").val(rowData.miaopu_Mj);
			$("#edmpjd").val(rowData.miaopu_Jd);
			$("#edmpwd").val(rowData.miaopu_Wd);
			$("#edmphb").val(rowData.miaopu_Hb);
			$("#edmpdcr").val(rowData.diaocha_Ry);
			$("#edmpdcsj").val(rowData.diaocha_Sj);
			form.render('select')
			//乡县查询
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
								$("#editmp_xiang").append( "<option value='" + msg[i].code + "'>" + msg[i].name + "</option>");
								form.render('select')
							}
							if(msg[i].ji_Bie=="3"){
								$("#editmp_xian").append( "<option value='" + msg[i].code + "'>" + msg[i].name + "</option>");
								form.render('select')
							}
						}
						$("#editmp_xian").val(rowData.xian);
						form.render('select')
						$("#editmp_xiang").val(rowData.xiang);
						form.render('select')
					}
					});
			})
		}
		$("#edmpcz").click(function(){
			var index=layer.confirm('您确定要重置吗？', {
				btn:["确定","取消"]
			},function(){
				$("#edmpcs").val("");
				$("#edmpmj").val("");
				$("#edmpjd").val("");
				$("#edmpwd").val("");
				$("#edmphb").val("");
				$("#edmpdcr").val("");
				$("#edmpdcsj").val("");
				$("#editmp_xian").val("请选择");
				$("#editmp_xiang").val("请选择");
				form.render('select')
				layer.close(index)
			},function(){
				layer.close(index)
			})
		})
	</script>
</body>
</html>