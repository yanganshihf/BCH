<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>addVideo</title>
	<link rel="stylesheet" type="text/css" href="../../js/bootstrap-3.3.5-dist/css/bootstrap.min.css"/>
	<script type="text/javascript" src="../../js/jquery-ui-1.9.2/js/jquery-1.8.3.js"></script>
	<script type="text/javascript" src="../../js/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
<style>
#table {
	margin-bottom:0px;
	/* border: 1px solid #ddd; */
}
#table td{
	padding:5px;
	border: 1px solid #ddd;
}
#table .tdwidth{
		margin-left:5px;
		width:90px;
		padding-right:0px;
		padding-left:0px;
		padding-top: 8px;
		text-align: center;
		
}
.form-control {
	height: 25px;
	font-size: 14px;
	padding-top: 0px;
	padding-bottom: 0px;
	width:140px;
	border:0;
	box-shadow: none;
}
.form-control :focus
</style>
</head>

<body style="padding:5px">
	<table class="table" id="table">
			<tbody>
				<tr><td class="tdwidth"><span>账户名</span></td><td><input type="text" id="name" maxlength="10" class="form-control" style="border: 0;box-shadow: none;" /></td></tr>
				<tr><td class="tdwidth"><span>密码</span></td><td><input type="password" id="password"   autocomplete="new-password" class="form-control" style="border: 0;box-shadow: none;" /></td></tr>
				<tr><td class="tdwidth"><span>姓名</span></td><td><input type="text" id="person" class="form-control" style="border: 0;box-shadow: none;"/></td></tr>
				<tr><td class="tdwidth"><span>电话</span></td><td><input type="text" id="mobile" maxlength="11" class="form-control" style="border: 0;box-shadow: none;"/></td></tr>
				<tr><td class="tdwidth"><span>无人机类型</span></td><td><select id="type" class="form-control" style="border: 0;box-shadow: none;">
	      				<option value="1">悟2</option>
	      				<option value="2">御2</option>
	      				<option value="3">精灵4</option>
	      				<option value="4">观察者3</option>
	      				<option value="5">智绘鹰</option>
	      			</select></td></tr>
				<tr><td class="tdwidth"><span>无人机ID</span></td><td><select id="code" class="form-control" style="border: 0;box-shadow: none;">
	      				<option value="UAV0000001">UAV0000001</option>
	      				<option value="UAV0000002">UAV0000002</option>
	      				<option value="UAV0000003">UAV0000003</option>
	      				<option value="UAV0000004">UAV0000004</option>
	      				<option value="UAV0000005">UAV0000005</option>
	      				<option value="UAV0000006">UAV0000006</option>
	      				<option value="UAV0000007">UAV0000007</option>
	      				<option value="UAV0000008">UAV0000008</option>
	      				<option value="UAV0000009">UAV0000009</option>
	      				<option value="UAV0000010">UAV0000010</option>
	      				<option value="UAV0000011">UAV0000011</option>
	      				<option value="UAV0000012">UAV0000012</option>
	      				<option value="UAV0000013">UAV0000013</option>
	      				<option value="UAV0000014">UAV0000014</option>
	      				<option value="UAV0000015">UAV0000015</option>
	      				<option value="UAV0000016">UAV0000016</option>
	      				<option value="UAV0000017">UAV0000017</option>
	      				<option value="UAV0000018">UAV0000018</option>
	      				<option value="UAV0000019">UAV0000019</option>
	      				<option value="UAV0000020">UAV0000020</option>
	      			</select></td></tr>
	      		<tr><td class="tdwidth"><span>录像保存</span></td><td><select id="day" class="form-control" style="border: 0;box-shadow: none;">
	      				<option value="7">7天</option>
	      				<option value="30" selected="selected">30天</option>
	      				<option value="90">90天</option>
	      				<option value="180">180天</option>
	      				<option value="360">360天</option>
	      			</select></td></tr>
	      		<tr><td class="tdwidth"><span>秘钥</span></td><td><input  type="text" id="sign" readonly  class="form-control" style="border: 0;box-shadow: none;background-color: #fff;cursor: not-allowed;"/></td></tr>
			</tbody>
	</table>	
</body>
<script type="text/javascript">
$(function(){
	function uuid() {
	    function S4() {
	       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    }
	    return (S4()+S4());
	}
	var uuid = uuid();
	$("#sign").val(uuid);
	
	$("#type").on("change",function(){
		var TypeVal = $("#type").val();
		changeModuleType(TypeVal);
	});
	function changeModuleType(value){
		$("#code").empty();
		if(value == '1' || value == '2'|| value == '3'  || value == '5'){
			 $("#code").append("<option value='UAV0000001'>UAV0000001</option>");
			 $("#code").append("<option value='UAV0000002'>UAV0000002</option>");
			 $("#code").append("<option value='UAV0000003'>UAV0000003</option>");
			 $("#code").append("<option value='UAV0000004'>UAV0000004</option>");
			 $("#code").append("<option value='UAV0000005'>UAV0000005</option>");
			 $("#code").append("<option value='UAV0000006'>UAV0000006</option>");
			 $("#code").append("<option value='UAV0000007'>UAV0000007</option>");
			 $("#code").append("<option value='UAV0000008'>UAV0000008</option>");
			 $("#code").append("<option value='UAV0000009'>UAV0000009</option>");
			 $("#code").append("<option value='UAV0000010'>UAV0000010</option>");
			 $("#code").append("<option value='UAV0000011'>UAV0000011</option>");
			 $("#code").append("<option value='UAV0000012'>UAV0000012</option>");
			 $("#code").append("<option value='UAV0000013'>UAV0000013</option>");
			 $("#code").append("<option value='UAV0000014'>UAV0000014</option>");
			 $("#code").append("<option value='UAV0000015'>UAV0000015</option>");
			 $("#code").append("<option value='UAV0000016'>UAV0000016</option>");
			 $("#code").append("<option value='UAV0000017'>UAV0000017</option>");
			 $("#code").append("<option value='UAV0000018'>UAV0000018</option>");
			 $("#code").append("<option value='UAV0000019'>UAV0000019</option>");
			 $("#code").append("<option value='UAV0000020'>UAV0000020</option>");
		}
		if(value == '4'){
			 $("#code").append("<option value='UAV1'>UAV1</option>");
			 $("#code").append("<option value='UAV2'>UAV2</option>");
			 $("#code").append("<option value='UAV3'>UAV3</option>");
			 $("#code").append("<option value='UAV4'>UAV4</option>");
			 $("#code").append("<option value='UAV5'>UAV5</option>");
			 $("#code").append("<option value='UAV6'>UAV6</option>");
			 $("#code").append("<option value='UAV7'>UAV7</option>");
			 $("#code").append("<option value='UAV8'>UAV8</option>");
			 $("#code").append("<option value='UAV9'>UAV9</option>");
			 $("#code").append("<option value='UAV10'>UAV10</option>");
		}
	}
});
</script>
</html>