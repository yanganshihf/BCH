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
</style>
</head>
<body style="padding:5px">
	<table class="table" id="table">
			<tbody>
				<tr><td class="tdwidth"><span>账户名</span></td><td><input type="text" id="name" maxlength="10" readonly  class="form-control" style="border: 0;box-shadow: none;background-color: #fff;cursor: not-allowed;"  /></td></tr>
				<tr><td class="tdwidth"><span>密码</span></td><td><input type="password" id="password"   autocomplete="new-password" class="form-control" style="border: 0;box-shadow: none;"/></td></tr>
				<tr><td class="tdwidth"><span>姓名</span></td><td><input type="text" id="person" class="form-control" style="border: 0;box-shadow: none;" /></td></tr>
				<tr><td class="tdwidth"><span>电话</span></td><td><input type="text" id="mobile" maxlength="11" class="form-control" style="border: 0;box-shadow: none;"/></td></tr>
				<tr><td class="tdwidth"><span>无人机类型</span></td><td><input id="type" readonly  class="form-control" style="border: 0;box-shadow: none;background-color: #fff;cursor: not-allowed;" /></td></tr>
				<tr><td class="tdwidth"><span>无人机ID</span></td><td><input id="code" readonly  class="form-control" style="border: 0;box-shadow: none;background-color: #fff;cursor: not-allowed;"/></td></tr>
	      		<tr><td class="tdwidth"><span>录像保存</span></td><td><select id="day" class="form-control" style="border: 0;box-shadow: none;">
	      				<option value="7">7天</option>
	      				<option value="30">30天</option>
	      				<option value="90">90天</option>
	      				<option value="180">180天</option>
	      				<option value="360">360天</option>
	      			</select></td></tr>
	      		<tr><td class="tdwidth"><span>秘钥</span></td><td><input  type="text" id="sign" readonly  class="form-control" style="border: 0;box-shadow: none;background-color: #fff;cursor: not-allowed;" /><input type="hidden" id="id"></td></tr>
			</tbody>
	</table>
</body>
</html>