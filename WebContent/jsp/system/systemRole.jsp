<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html lang="cn">
<head>
<title>角色管理</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%-- <script type="text/javascript"
	src="${pageContext.request.contextPath}/js/layer/layer-v3.0.3/layer/layer.js"></script> --%>
<script type="text/javascript" src="/ResourceMonitor/js/myJS/system/checkInput.js"></script>
<style type="text/css">
@media (min-width: 700px){
	.container {
    	width: 100%;
    	padding:0;
	}
}
#cond .col-md-3{
	width:30%;
}
#cond .col-md-9{
	width:70%;
}

.form-control {
	height: 22px;
	font-size: 14px;
	padding-top: 0px;
	padding-bottom: 0px;
}

.btn-default {
	height: 22px;
	font-size: 10px;
	padding: 0 12px;
}

#gridPager {
	position: absolute;
	bottom: 0;
}
.row{
	width: 100%;
	margin: 0;
	margin-top:5px;
}
.row-last{
	margin-bottom: 5px;
}
.dateTime{
	padding-top: 0px;
	padding-bottom: 0px;
	padding-left: 5px;
}
div.ui-datepicker, .ui-datepicker td{
 font-size:10px;
}
.removeLp{
	padding-left:0;
	padding-right:0;
}
.removeRp{
	padding-right:0;
}
#tabContent,#tabContent1{
	font-size:14px;
	margin-bottom:0;
}
#tabContent2{
	font-size:14px;
	margin-bottom:0;
}
#tabContent td:nth-child(1),#tabContent1 th:nth-child(1){
   		width:18%;
}
#tabContent input[type="checkbox"],#tabContent2 input[type="checkbox"]{
  	 display:none;
}
#tabContent input[type="checkbox"]+label,#tabContent2 input[type="checkbox"]+label{
    background-color: white;
    border-radius: 2px;
    border:1px solid #058563;
    width:14px;
    height:14px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 16px;
    margin-right: 5px;
    cursor:pointer;
}
#tabContent .checkbox-inline, #tabContent2 .checkbox-inline{
    width: 140px;
    padding-left:0;
    margin:0;
    -moz-user-select:none;
    -webkit-user-select: none;       
    -ms-user-select: none; 
}
#tabContent input[type="checkbox"]:checked + label,#tabContent2 input[type="checkbox"]:checked + label{ 
    background:url(/ResourceMonitor/images/indexpage/sclect.png);
}
#tabContent input[type="checkbox"]:disabled + label,#tabContent2 input[type="checkbox"]:disabled + label{  
    /* background:#ccc;/* 不允许一级功能勾选禁选功能 */
      background:"";
      background-color: #ccc;
}
/* #gridrow .ui-jqgrid-bdiv{
	overflow:hidden;
} */
#roleedit{
	width:100%;
    height: 100%;
}
.layui-layer-title {
	font-size: 15px;
	font-weight: 700;
}
.layui-form{
	margin:0;
}
.layui-layer-btn .layui-layer-btn0{border-color:#058563;background-color:#058563;color:#fff}
</style>
</head>
<body>
	<div class="container" id="cond">
		<div class="row">
			<div class="col-md-3 removeLp" id="gridrow">
				<div class="row" id="addRole">
					<label style="font-size:15px;">&emsp;添加角色：</label>
					<button type="button" class="btn btn-default" id="addSysRole" style="float:right;padding:0 30px" title="添加权限">
					<img src="/ResourceMonitor/images/indexpage/add_role.png" class="" alt="添加权限">
					</button>
				</div>
				<div class="row">
					<table id="jqgrid" style="width:98%;border-collapse: inherit;"></table>
					<div id="gridPager"></div>
				</div>
			</div>
			<div class="col-md-9 removeRp"> 
				<table id="tabContent1" class="table-bordered table">
					<thead>
    					<tr>
      						<th >一级模块</th>
      						<th >二级模块</th>
    					</tr>
  					</thead>
  				</table>
  				<div id="roleedit">
				<table id="tabContent" class="table-bordered table">
  					<tbody>
    					<tr>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="check1"><label for="check1"></label>巡护监管</label></td>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="check11"><label for="check11"></label>实时监控</label><label class="checkbox-inline"><input type="checkbox" id="check12"><label for="check12"></label>巡护轨迹</label></td>
               			</tr>
   					    <tr>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="check2"><label for="check2"></label>事件管理</label></td>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="check21" name="checkDisabled"><label for="check21"></label>事件查询</label><label class="checkbox-inline"><input type="checkbox" id="check22" disabled><label for="check22"></label>回复事件</label><label class="checkbox-inline"><input type="checkbox" id="check23" disabled><label for="check23"></label>删除事件</label><label class="checkbox-inline"><input type="checkbox" id="check24" disabled><label for="check24"></label>导出事件</label></td>
               			</tr>
               			<tr>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="check3" onclick="javascript:return false;"><label for="check3"></label>SOS管理</label></td>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="check31"><label for="check31"></label>实时SOS</label><label class="checkbox-inline"><input type="checkbox" id="check32" name="checkDisabled"><label for="check32"></label>SOS查询</label><label class="checkbox-inline"><input type="checkbox" id="check33" disabled><label for="check33"></label>SOS删除</label><label class="checkbox-inline"><input type="checkbox" id="check34" disabled><label for="check34"></label>SOS定位</label><label class="checkbox-inline"><input type="checkbox" id="check35" disabled><label for="check35"></label>SOS导出</label></td>
               			</tr>
               			<tr>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="check4" onclick=javascript:return false;><label for="check4"></label>日志管理</label></td>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="check41" name="checkDisabled"><label for="check41"></label>日志浏览</label><label class="checkbox-inline"><input type="checkbox" id="check42" disabled><label for="check42"></label>导出日志</label><label class="checkbox-inline"><input type="checkbox" id="check43" disabled><label for="check43"></label>删除日志</label></td>
               			</tr>
               			<tr>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="check5"><label for="check5"></label>责任区管理</label></td>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="check51" name="checkDisabled"><label for="check51"></label>责任区查询</label><label class="checkbox-inline"><input type="checkbox" id="check52" disabled><label for="check52"></label>责任区下发</label><label class="checkbox-inline"><input type="checkbox" id="check53" disabled><label for="check53"></label>责任区删除</label><label class="checkbox-inline"><input type="checkbox" id="check54" disabled><label for="check54"></label>责任区定位</label></td>
               			</tr>
               			<tr>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="check7"><label for="check7"></label>考勤管理</label></td>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="check74" name="checkDisabled"><label for="check74"></label>查询考勤</label><label class="checkbox-inline"><input type="checkbox" id="check71" disabled><label for="check71"></label>考勤统计</label><label class="checkbox-inline"><input type="checkbox" id="check72" disabled><label for="check72"></label>出勤详情</label><label class="checkbox-inline"><input type="checkbox" id="check73" disabled><label for="check73"></label>设置出勤天数</label></td>
               			</tr>
               			<tr>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="check6"><label for="check6"></label>政策法规</label></td>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="check61" name="checkDisabled"><label for="check61"></label>查询政策法规</label><label class="checkbox-inline"><input type="checkbox" id="check62" disabled><label for="check62"></label>上传政策法规</label><label class="checkbox-inline"><input type="checkbox" id="check63" disabled><label for="check63"></label>删除政策法规</label></td>
               			</tr>
               			<tr>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="check8"><label for="check8"></label>通知公告</label></td>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="check81" name="checkDisabled"><label for="check81"></label>查询通知公告</label><label class="checkbox-inline"><input type="checkbox" id="check82" disabled><label for="check82"></label>发布通知公告</label><label class="checkbox-inline"><input type="checkbox" id="check83" disabled><label for="check83"></label>删除通知公告</label></td>
               			</tr>
               			<tr>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="checkb"><label for="checkb"></label>公示监督</label></td>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="checkb1" name="checkDisabled"><label for="checkb1"></label>公示监督</label><label class="checkbox-inline"><input type="checkbox" id="checkb2" disabled><label for="checkb2"></label>月季度考核公示</label><label class="checkbox-inline"><input type="checkbox" id="checkb3" disabled><label for="checkb3"></label>工资发放公示</label><label class="checkbox-inline"><input type="checkbox" id="checkb4" disabled><label for="checkb4"></label>选聘续聘公示</label><label class="checkbox-inline"><input type="checkbox" id="checkb5" disabled><label for="checkb5"></label>护林员培训</label><label class="checkbox-inline"><input type="checkbox" id="checkb6" disabled><label for="checkb6"></label>发布公示</label><label class="checkbox-inline"><input type="checkbox" id="checkb7" disabled><label for="checkb7"></label>删除公示</label></td>
               			</tr>
               			<tr>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="checkd"><label for="check6"></label>护林员管理</label></td>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="checkd1" name="checkDisabled"><label for="checkd1"></label>护林员查询</label><label class="checkbox-inline"><input type="checkbox" id="checkd2" disabled><label for="checkd2"></label>添加护林员</label><label class="checkbox-inline"><input type="checkbox" id="checkd3" disabled><label for="checkd3"></label>护林员信息编辑</label><label class="checkbox-inline"><input type="checkbox" id="checkd4" disabled><label for="checkd4"></label>删除护林员</label><label class="checkbox-inline"><input type="checkbox" id="checkd5" disabled><label for="checkd5"></label>冻结/解冻</label></td>
               			</tr>
               			<tr>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="checka"><label for="checka"></label>系统用户管理</label></td>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="checka1" name="checkDisabled"><label for="checka1"></label>用户管理</label><label class="checkbox-inline"><input type="checkbox" id="checka2" disabled><label for="checka2"></label>添加用户</label><label class="checkbox-inline"><input type="checkbox" id="checka3" disabled><label for="checka3"></label>用户信息编辑</label><label class="checkbox-inline"><input type="checkbox" id="checka4" disabled><label for="checka4"></label>删除用户</label><label class="checkbox-inline"><input type="checkbox" id="checka5" disabled><label for="checka5"></label>导出用户信息</label></td>
               			</tr>
               			<tr>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="checkc"><label for="checkc"></label>系统角色管理</label></td>
                   			<td><label class="checkbox-inline"><input type="checkbox" id="checkc1" name="checkDisabled"><label for="checkc1"></label>权限管理</label><label class="checkbox-inline"><input type="checkbox" id="checkc2" disabled><label for="checkc2"></label>添加角色</label><label class="checkbox-inline"><input type="checkbox" id="checkc3" disabled><label for="checkc3"></label>重命名角色</label><label class="checkbox-inline"><input type="checkbox" id="checkc4" disabled><label for="checkc4"></label>删除角色</label><label class="checkbox-inline"><input type="checkbox" id="checkc5" disabled><label for="checkc5"></label>角色权限修改</label></td>
               			</tr>
               			</tbody>
				</table>
				</div>
				<table id="tabContent2" class="table-bordered table">
					<tbody>
               			<tr id="quanxianId">
                   			<td colspan="2" style="border:0;">
                       			<div><label class="checkbox-inline" id="checkAll"> <input type="checkbox" id="check" class="checkInput"><label for="check"></label>全选</label>
                       			<button style="margin-left:10px;" id="sure1" type="button" class="btn btn-default" title="保存">
                       				<img src="/ResourceMonitor/images/indexpage/save.png" class="" alt="保存">
                       			</button>
                       			</div>
                   			</td>
              			 </tr>
  					</tbody>
				</table>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
$(function(){
	var menus=localStorage.getItem('cookie_menu');
	if(menus.indexOf("添加角色") == -1){
		$("#addRole").css("display","none");
	}
	if(menus.indexOf("角色权限修改") == -1){
		$("#quanxianId").css("display","none");
	}	
})
</script>
	<script type="text/javascript" src="/ResourceMonitor/js/myJS/system/systemRole.js"></script>
</html>