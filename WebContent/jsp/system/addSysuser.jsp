<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<%-- <script type="text/javascript"
	src="${pageContext.request.contextPath}/js/layer/layer-v3.0.3/layer/layer.js"></script> --%>
<title></title>
<style>
#table{
	margin-bottom:0;
}
.form-control {
	height: 27px;
	font-size: 15px;
	padding-top: 0px;
	padding-bottom: 0px;
	width:170px;
}
#table .tdwidth{
	width:80px;
	padding-right:0px;
	padding-left:0px;
}
#table .tdwidth span{
	font-size:15px;
}
.red{
	color:red;
}
#table .redtd{
	padding-left:0px;
}	
</style>
</head>
<body>
<div class="container">
	<div class="row clearfix">
		<table class="table" id="table">
			<tbody>
				<tr><td></td><td class="tdwidth"><span>用户角色</span></td><td><select id="userRole" class="form-control" onchange="rolechange()">
					<option value="0">系统管理员</option>
					<option value="1">管理员</option>
					<option value="2">普通用户</option>
				</select></td><td></td></tr>
				<tr><td></td><td class="tdwidth"><span>姓&emsp;&emsp;名</span></td><td><input type="text" id="userName" class="form-control"/></td><td class="redtd"><b class="red">*</b></td></tr>
				<tr><td></td><td class="tdwidth"><span>手机号码</span></td><td><input type="text" id="mobilephone" class="form-control" maxlength="11" onchange="checkMobile()"/></td><td class="redtd"><b class="red">*</b></td></tr>
				<tr><td></td><td class="tdwidth"><span>密&emsp;&emsp;码</span></td><td><input type="password" id="userPassword" class="form-control" autocomplete="new-password" maxlength="15"/></td><td class="redtd"><b class="red">*</b></td></tr>
				<tr><td></td><td class="tdwidth"><span>部&emsp;&emsp;门</span></td><td><select id="departmentNameSelect" class="form-control"></select></td><td></td></tr>	
				<tr><td></td><td class="tdwidth"><span>备&emsp;&emsp;注</span></td><td><input id="userremark" maxlength="100" class="form-control"></input></td></tr>
			</tbody>
		</table>
	</div>
</div>





<script type="text/javascript">
var logUser = localStorage.getItem('cookie_logingUser');
var logMobile = localStorage.getItem('cookie_mobile');
$(document).ready(function() {
	var cookie_department= localStorage.getItem('cookie_department');
	cookie_department = cookie_department.substring(0,cookie_department.length-1);
	// 每个单位id-名称
	eachDepart =  cookie_department.split("&");
	for (var i = 0; i < eachDepart.length; i++) {
		var eachDep =  eachDepart[i].split("-");
		$("#departmentNameSelect").append("<option value='"+eachDep[0]+"'>"+eachDep[1]+"<oprion>")
	}
	
	
	
});

function checkMobile(){
	var mobile=$("#mobilephone").val();
	if(mobile !==""){
		$.ajax({
			url : '/ResourceMonitor/system/querymobile',
			type : 'POST',
			data : {mobile: mobile},
			success : function(resp) {
				if (resp.msg == "fail") {
					top.layer.open({
						title : false
						,closeBtn:0
						,content : '<center><span>此登录名(手机号)已经存在，请重新输入!</span></center>'
					});
					$("#mobilephone").val("");
				}
			}
		});
	}
}

function sumbit(){
	var userRole=$("#userRole").val();
	var userName=$("#userName").val();
	var mobilephone=$("#mobilephone").val();
	var userPassword=$("#userPassword").val();	
	//var departmentName=$("#departmentNameSelect").find("option:selected").text();
	var departmentCode=$("#departmentNameSelect").val();
	//alert(userRole)
	var userremark=$("#userremark").val();
	
	var mobileNumReg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
	var pat=new RegExp("[#_%&'/\"\\,;:=!^]","i");
	if(userName==''){		
		top.layer.open({
			title : false
			,closeBtn:0
			,content : '<center><span>姓名不能为空</span></center>'
		});
	}else if(pat.test(userName)){
		top.layer.open({
			title : false
			,closeBtn:0
			,content : '<center><span>姓名中包含非法字符</span></center>'
		});
		$("#userName").val("");
	}else if(mobilephone==""){
		top.layer.open({
			title : false
			,closeBtn:0
			,content : '<center><span>手机号不能为空</span></center>'
		});
	}else if(!mobileNumReg.test(mobilephone)){
		top.layer.open({
			title : false
			,closeBtn:0
			,content : '<center><span>请输入有效的手机号码</span></center>'
		});
		$("#mobilephone").val("");
	}else if(userPassword.length<6){		
		top.layer.open({
			title : false
			,closeBtn:0
			,content : '<center><span>密码至少6位</span></center>'
		});
	}else if(pat.test(userPassword)){
		top.layer.open({
			title : false
			,closeBtn:0
			,content : '<center><span>密码中包含非法字符</span></center>'
		});
		$("#userPassword").val("");
	}else if(pat.test(userremark)){
		top.layer.open({
			title : false
			,closeBtn:0
			,content : '<center><span>备注中包含非法字符</span></center>'
		});
		$("#userremark").val("");
	}else{
		
		$.ajax({
			url : '/ResourceMonitor/system/add',
			type : 'POST',
			data : {password:userPassword,personName:userName,mobile:mobilephone,remark:userremark,department:departmentCode,role:userRole},
			success : function(resp) {
				if (resp.msg == "success") {
					flag = 1;
					top.layer.msg("添加成功");
					top.document.getElementById('mapFrame').contentWindow.document.getElementById('system').contentWindow.pageInit();
				}else{
					top.layer.msg("添加失败");
				}
			}
		});
	}

}
	
/* GetUserRoleList();
	$.get("departmentManage.action",function(data) {					
		var dataObj = eval(data).gridModel;
		if (dataObj.length>0) {
			$.each(dataObj, function(idx, item) { // 遍历后台数据数据
				$("#departmentNameSelect").append("<option value='"+item.departmentNum+"'>"
    					+item.departmentName+"</option>"); 
			});
		}else{
			$("#departmentNameSelect").append("<option value='9999'>无</option>"); 
		}
	});
});
function rolechange(){
	var roleType=$("#userRole").val();
	if(roleType==="0"){
		$("#departmentNameSelect").val("0");
		 //$("departmentNameSelect").attr("disabled",true);
		document.getElementById("departmentNameSelect").disabled=true;
	}else{
		document.getElementById("departmentNameSelect").disabled=false;
	}
}
function GetUserRoleList(){
	$.ajax({url:"authority_listRole.action",async:true,success:function(result){
		$("#userRole").empty();
		 
		for (i=0;i<result.gridModel.length;i++){
			//
			$("#userRole").append("<option value='"+result.gridModel[i].id+"'>"+result.gridModel[i].name+"</option>");
		}	
	}});	
} */
</script>
</body>
</html>