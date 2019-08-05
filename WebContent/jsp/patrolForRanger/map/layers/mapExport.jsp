<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/css/bootstrap.css" />
<link rel="stylesheet" type="text/css"
	href="/ResourceMonitor/js/layer/layui/css/layui.css" />
<script
	src="${pageContext.request.contextPath}/js/jquery-2.1.4/jquery.js"
	type="text/javascript"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="/ResourceMonitor/js/layer/layui/layui.js"></script>
<style>
.column {
	margin: 3px;
}

.form-control {
	height:27px;
	line-height:27px;
	width:190px;
}

.clearfix {
	margin-top: 10px;
}
</style>
</head>

<body
	style="height: 170px; width: 300px; margin-left: 5px; overflow-y: hidden; overflow-x: hidden;">
	<div class="row clearfix">
		<div class="col-xs-12 column">
			<form class="layui-form" action="">
				<div class="layui-form-item" style="margin-bottom: 0px;">
    				<label class="layui-form-label" style="font-weight: bold;padding: 9px 10px;">标题栏：</label>
    				<div class="layui-input-block">
      					<input lay-filter="test" type="radio" id="titleInfo1" name="titleInfo" value=1 title="显示" checked>
      					<input lay-filter="test" type="radio" id="titleInfo2" name="titleInfo" value=0 title="不显示">
    				</div>
  				</div>
  				<div class="layui-form-item" style="margin-bottom: 0px;">
    				<label class="layui-form-label" style="font-weight: bold;padding: 9px 10px;">指北针：</label>
    				<div class="layui-input-block">
      					<input lay-filter="test1" type="radio" name="northIcon" value=1 title="显示" checked>
      					<input lay-filter="test1" type="radio" name="northIcon" value=0 title="不显示">
    				</div>
  				</div>
  				<div class="layui-form-item" style="margin-bottom: 0px;">
    				<label class="layui-form-label" style="font-weight: bold;padding: 9px 10px;">比例尺：</label>
    				<div class="layui-input-block">
      					<input lay-filter="test2" type="radio" name="scaleInfo" value=1 title="显示" checked>
      					<input lay-filter="test2" type="radio" name="scaleInfo" value=0 title="不显示">
    				</div>
  				</div>
  				<div class="layui-form-item" style="margin-bottom: 0px;">
    				<label class="layui-form-label" style="font-weight: bold;padding: 5px 10px 14px 10px;">标&emsp;题：</label>
    				<div class="layui-input-block" style="margin-left:80px">
      					<input type="text" id="titleContent" value="护林员责任片区示意图" class="form-control">
    				</div>
  				</div>
			</form>		
		</div>
	</div>
</body>
<script type="text/javascript">
	layui.use('form', function(){
	  var form = layui.form; 
	  form.on('radio(test)', function(data){
		  //alert(data.value); //被点击的radio的value值
		  parent.radioOne(data.value);
	  }); 
	  form.on('radio(test1)', function(data){
		  parent.radioTwo(data.value);
	  });
	  form.on('radio(test2)', function(data){
		  parent.radioThr(data.value);
	  });
	  $("#titleContent").off().on("input",function(){
			//$('#contentFrameId').contents().find("#titleInfo").html($(this).val());
			parent.setValue($(this).val());
		})
	});
	
	
	//设置部门
	// 获取单位
	var cookie_department = localStorage.getItem('cookie_department');
	cookie_department = cookie_department.substring(0,
			cookie_department.length - 1);
	// 每个单位id-名称
	var eachDepart = cookie_department.split("&");
	// 遍历
	for (var i = 0; i < eachDepart.length; i++) {
		var eachDep = eachDepart[i].split("-");
		// 添加选项 department为select的id
		$("#department")
				.append(
						"<option value='" + eachDep[0] + "'>" + eachDep[1]
								+ "<oprion>")
	}
	
	
</script>
</html>