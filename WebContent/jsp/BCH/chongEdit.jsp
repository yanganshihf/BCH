
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="JqgridInclude.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>标准地详查编辑</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/js/layer/layui/css/layui.css" media="all">
 <script src="${pageContext.request.contextPath}/js/layer/layui/layui.js"></script>
<style type="text/css">
.input {
	/* width: '10%'; */
	/* margin-top: 0.5%; */
	/* display: block; */
	margin-left: 0.8% display:inline-block width: 20%;
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
	-webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow
		ease-in-out .15s;
	-o-transition: border-color ease-in-out .15s, box-shadow ease-in-out
		.15s;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

.selectpicker {
	margin-left: 0.5%;
}

.layui-form-label {
	width: 120px;
}
.layui-form-item{
	margin-top: -15px;
}
</style>
</head>
<body>
	<div class="layui-form">
	<div class="layui-form-item" style="margin-top: 10px">
		<div class="layui-inline">
			<label class="layui-form-label">调查时间</label>
			<div class="layui-input-inline">
				<input type="tel" name="phone" id="diaochasj" autocomplete="off" class="layui-input">
			</div>
		</div>
		<div class="layui-inline">
			<label class="layui-form-label">乡&emsp;&emsp;</label>
			<div class="layui-input-inline">
				<!-- <input type="text" name="email" id="xiang" lay-verify="email"
					autocomplete="off" class="layui-input"> -->
					<select id="xiang" style="width: 100px">
							
					</select>
			</div>
		</div>
	</div>
	</div>
	<div class="layui-form-item">
		<div class="layui-inline">
			<label class="layui-form-label">林&emsp;&emsp;&emsp;班</label>
			<div class="layui-input-inline">
				<input type="tel" name="phone" id="linban"
					lay-verify="required|phone" autocomplete="off" class="layui-input">
			</div>
		</div>
		<div class="layui-inline">
			<label class="layui-form-label">小&emsp;&emsp;&emsp;班</label>
			<div class="layui-input-inline">
				<input type="text" id="xiaoban" name="email" lay-verify="email"
					autocomplete="off" class="layui-input">
			</div>
		</div>
	</div>
	<div class="layui-form-item">
		<div class="layui-inline">
			<label class="layui-form-label">经&emsp;&emsp;&emsp;度</label>
			<div class="layui-input-inline">
				<input type="tel" name="phone" id="jingdu"
					lay-verify="required|phone" autocomplete="off" class="layui-input">
			</div>
		</div>
		<div class="layui-inline">
			<label class="layui-form-label">纬&emsp;&emsp;&emsp;度</label>
			<div class="layui-input-inline">
				<input type="text" name="email" id="weidu" lay-verify="email"
					autocomplete="off" class="layui-input">
			</div>
		</div>
	</div>
	<div class="layui-form-item">
		<div class="layui-inline">
			<label class="layui-form-label">样株数</label>
			<div class="layui-input-inline">
				<input type="tel" name="phone" id="yangzhus"
					lay-verify="required|phone" autocomplete="off" class="layui-input">
			</div>
		</div>
		<div class="layui-inline">
			<label class="layui-form-label">受害株数</label>
			<div class="layui-input-inline">
				<input type="text" name="email" id="shouhaizs" lay-verify="email"
					autocomplete="off" class="layui-input">
			</div>
		</div>
	</div>
	<div class="layui-form-item">
		<div class="layui-inline">
			<label class="layui-form-label">受害株率</label>
			<div class="layui-input-inline">
				<input type="tel" name="phone" id="shouhaizl"
					lay-verify="required|phone" autocomplete="off" class="layui-input">
			</div>
		</div>
		<div class="layui-inline">
			<label class="layui-form-label">样株数</label>
			<div class="layui-input-inline">
				<input type="text" name="email" id="yangzhus" lay-verify="email"
					autocomplete="off" class="layui-input">
			</div>
		</div>
	</div>
	<div class="layui-form-item">
		<div class="layui-inline">
			<label class="layui-form-label">受害株数</label>
			<div class="layui-input-inline">
				<input type="tel" name="phone" id="shouhaizs"
					lay-verify="required|phone" autocomplete="off" class="layui-input">
			</div>
		</div>
		<div class="layui-inline">
			<label class="layui-form-label">虫害密度</label>
			<div class="layui-input-inline">
				<input type="text" name="email" id="chonghaimd" lay-verify="email"
					autocomplete="off" class="layui-input">
			</div>
		</div>
	</div>
	<div class="layui-form-item">
		<div class="layui-inline">
			<label class="layui-form-label">受害株率</label>
			<div class="layui-input-inline">
				<input type="tel" name="phone" id="shouhaizl"
					lay-verify="required|phone" autocomplete="off" class="layui-input">
			</div>
		</div>
		<div class="layui-inline">
			<label class="layui-form-label">代表面积</label>
			<div class="layui-input-inline">
				<input type="text" name="email" id="daibiaomj" lay-verify="email"
					autocomplete="off" class="layui-input">
			</div>
		</div>
	</div>
	<div class="layui-input-inline" style="margin-left: 65%;margin-top: 5%">
    <button type="button" onclick="sure()" class="layui-btn">确定</button>
      </div>
      <div class="layui-input-inline" style="margin-left: 5%;margin-top: 5%">
    <button type="button" class="layui-btn">重置</button>
      </div>
	<script type="text/javascript">
	// 获取路径
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	var localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
		function parameter(param) {
			layui.use(['laydate','form'], function(){
				  var form=layui.form;
				  var laydate = layui.laydate;
				  //执行一个laydate实例
				  laydate.render({
				    elem: '#diaochasj', //指定元素
				  });
				  form.render();
			});
			/* 获取父页面传参 */
			console.log(param);
			//调查时间
			$("#diaochasj").val(param.diaocha_Sj);
			//乡（下拉）
			//村(林班)——下拉
			$("#linban").val(param.cun);
			//小班
			$("#xiaoban").val(param.xiao_Ban);
			//经度
			$("#jingdu").val(param.yangdi_Jd);
			//纬度
			$("#weidu").val(param.yangdi_Wd);
			//样株或枝梢树(株、个)
			$("#yangzhus").val(param.diaocha_Zs);
			//受害株(枝梢)数（枝个）
			$("#shouhaizs").val(param.shouhai_Zs);
			//虫口密度（头/株或单位长度、面积）
			$("#chonghaimd").val(param.chongk_Md);
			//受害株率%
			$("#shouhaizl").val(param.shouhai_Zl);
			//代表面积(亩)
			$("#daibiaomj").val(param.daibiao_Mj);
			   $.ajax({
					url : localhostPath + projectName + '/datalib/xingzhengquhua',
					type : 'POST',
					dataType : 'json',
					data : {},
					success : function(res) {
						console.log(res);
						var msg = res.rows;
						$("#xiang").append( "<option selected = 'selected'>" + param.xiang + "</option>");
						for (var i = 0; i < msg.length; i++) {
							if(msg[i].ji_Bie=="4"){
								$("#xiang").append( "<option value='" + msg[i].code + "'>" + msg[i].name + "</option>");
							}
							if(msg[i].ji_Bie=="3"){
								$("#xian").append( "<option value='" + msg[i].code + "'>" + msg[i].name + "</option>");
							}
						}
					}
				});
		}
	</script>
</body>
</html>