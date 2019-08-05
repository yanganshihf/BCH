<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>创建账号</title>
<style>
html, body {
	height: 95%;
	width: 100%;
	margin: 0 auto;
}
input[type="text"]{
	width:78px;
}
input:-moz-placeholder,
textarea:-moz-placeholder{ /* Mozilla Firefox 4 to 18 */
font-style: italic;
color:#B8B8B8
}

input::-moz-placeholder,
textarea::-moz-placeholder { /* Mozilla Firefox 19+ */
font-style: italic;
color:#B8B8B8
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
font-style: italic;
color:#B8B8B8
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
font-style: italic;
color:#B8B8B8
}
#table .colorF2{background-color:#F2F2F2;color:#035d45;}
#table td{text-align:center;padding:5px 0; font-size:14px;border-color:#D3D3D3}
#tabletwo .colorF2{background-color:#F2F2F2;color:#035d45;}
#tabletwo td{text-align:center;padding:5px 0;font-size:14px;border-color:#D3D3D3}
#tablethr .colorF2{background-color:#F2F2F2;color:#035d45;}
#tablethr td{text-align:center;padding:5px 0;font-size:14px;border-color:#D3D3D3}
.webuploader-pick{padding:10px 5px;}
/* #hideThis{background-color:#CCC} */
#table input,textarea,select{cursor:not-allowed;}
#tabletwo input,textarea,select{cursor:not-allowed;}
#tablethr input,textarea,select{cursor:not-allowed;}
.layui-table tbody tr:hover,.layui-table thead tr,.layui-table-hover{background-color:transparent}
</style>
</head>
<body>
<div style="padding:3px 0 0 5px;width:795px;">
<h6 style="margin-bottom:5px;font-weight:bold;margin-top:2px;">人员基本信息</h6>
	<table id="table" class="layui-table" lay-size="sm" style="margin:0;">
		<tbody >
			<tr>
				<td class="colorF2" style="width:78px;">姓&nbsp;&nbsp;名</td>
				<td style="padding:0;width:85px;"><input disabled="disabled" id="personName" type="text" style="border:0;background-color:transparent;text-align:center;"/></td>
				<td class="colorF2" style="width:90px;">性&nbsp;&nbsp;别</td>
				<td style="padding:0;width:84px;"><input disabled="disabled" id="personSex"  type="text" style="border:0;background-color:transparent;text-align:center;"/></td>
				<td class="colorF2" style="width:85px;">民&nbsp;&nbsp;族</td>
				<td style="padding:0;width:80px;"><input disabled="disabled" id="nationality" type="text"style="width:70px;border:0;background-color:transparent;text-align:center;"/></td>
				<td class="colorF2" style="width:65px;">年&nbsp;&nbsp;龄</td>
				<td style="padding:0; width:70px;"><input disabled="disabled" id="age" type="text" style="width:50px;border:0;background-color:transparent;text-align:center;"></td>	
				<td rowspan = 5 style="padding:0; width:130px;"><div style="width:130px;height:166px;text-align:center;">
					<img  id="imghead" border="0" src="../../../IdentifyPhoto/NoPeoplePhoto.png" style="width:134px;height:166px;max-width: 135px;">
				</div></td>
			</tr>
			<tr>
				<td class="colorF2">籍&nbsp;&nbsp;贯</td>
				<td style="padding:0;"><input disabled="disabled" id="birthplace" type="text" style="border:0;background-color:transparent;text-align:center;"></td>
				<td class="colorF2">身份证号码</td>
				<td colspan="3" style="padding:0;width:230px;"><input disabled="disabled" id="idcode" type="text" style="width: 230px;border:0;background-color:transparent;text-align:center;"></td>
				<td class="colorF2">出生年月</td>
				<td style="padding:0;width:79px;height:27px;"><input disabled="disabled" id="birthday" type="text" style="width:79px;border:0;background-color:transparent;text-align:center;"></td>
			</tr>
			 <tr>
				<td class="colorF2">工程类别</td>
				<td colspan="3" style="padding:0;"><input disabled="disabled" id="projectTypeSelect" style="width:220px;border:0;background-color:transparent;text-align:center;">
				</td>
				<td class="colorF2">管护单位</td>
				<td colspan="3" style="padding:0;"><input disabled="disabled" id="departmentVal" style="width:200px;border:0;background-color:transparent;text-align:center;"></td>
			</tr>
			<tr>
				<td class="colorF2" style="padding:3px 4px;">医疗保险是否购买</td>
				<td id="" style="padding:0;"><input disabled="disabled" type="text" id="medical" style="border:0;background-color:transparent;text-align:center" /></td>
				<td class="colorF2" style="padding:3px 5px;">养老保险是否购买</td>
				<td id="" style="padding:0;"><input disabled="disabled" type="text" id="oldage" style="border:0;background-color:transparent;text-align:center" /></td>
				<td class="colorF2" style="padding:3px 4px;">是否为建档立卡贫困户</td>
				<td id="" colspan="3" style="padding:0;"><input disabled="disabled" type="text" id="poverty" style="border:0;background-color:transparent;text-align:center" /></td>
			</tr>
			<tr>
				<td class="colorF2">文化程度</td>
				<td colspan="3" style="padding:0;"><input disabled="disabled" id="educated" style="width:220px; border:0;background-color:transparent;text-align:center;">
				</td>
				<td class="colorF2" style="padding:3px 0;" >身体健康状况</td>
				<td colspan="3" style="padding:0;"><input disabled="disabled" id="healthy" style="width:200px;border:0;background-color:transparent;text-align:center;">
				</td>
			</tr>
			<tr>
				<td class="colorF2">家庭住址</td>
				<td colspan="3" style="padding:0;"><input disabled="disabled" id="homeAddress" type="text" style="width: 230px;border:0;background-color:transparent;text-align:center;"></td>
				<td class="colorF2">手机号码</td>
				<td colspan="3" style="padding:0;"><input disabled="disabled" id="mobile" type="text" style="width: 200px;border:0;background-color:transparent;text-align:center;"></td>
			</tr>
		</tbody>
	</table>
</div>
<div style="padding:0 5px 0 5px;width:800px;">
	<table id="tabletwo" class="layui-table" lay-size="sm" style="margin:-1px 0 5px 0;">
		<tbody>
			<tr>
				<td class="colorF2" style="width:73px;">授权使用</td>
				<td id="" style="padding:0;width:130px;"><input disabled="disabled" type="text" id="authorized" style="border:0;background-color:transparent;text-align:center;"/></td>
				<td class="colorF2" style="width:110px;">责任区编号</td>
				<td style="padding:0;width: 1px;"><input disabled="disabled" id="accountNum" type="text" style="width: 160px;border:0;background-color:transparent;text-align:center;"></td>
				<td class="colorF2" style="width:100px">责任区名称</td>
				<td style="padding:0;width: 144px;"><input disabled="disabled" id="regionName" type="text" style="width: 154px;border:0;background-color:transparent;text-align:center;"></td>
			</tr>
			<tr>
				<td class="colorF2">管护地点</td>
				<td style="padding:0;"><input disabled="disabled" id="patrolPlace" type="text" style="width: 130px;border:0;background-color:transparent;text-align:center;"></td>
				<td class="colorF2">管护面积(亩)</td>
				<td style="padding:0;"><input disabled="disabled" id="regionArea" type="text" style="width: 160px;border:0;background-color:transparent;text-align:center;" value="0.0"></td>
				<td class="colorF2">主要林种</td>
				<td style="padding:0;"><input disabled="disabled" id="superiorTree" type="text" style="width: 154px;border:0;background-color:transparent;text-align:center;"></td>
			</tr>
		</tbody>
	</table>
</div>
<div style="padding:0 5px 0 5px;width:800px;">
	<h6 style="margin-bottom:0;font-weight:bold;">管护区域信息</h6>
	<table id="tabletwo" class="layui-table" lay-size="sm" style="margin:5px 0 0 0;">
		<tbody>
			<tr>
				<td class="colorF2" style="width:70px;padding:0 1px;">国家级公益林面积</td>
				<td id="" style="padding:0;width:80px;"><input disabled="disabled" id="nationalForestArea" type="text" style="width: 80px;border:0;background-color:transparent;text-align:center;" value="0.0"></td>
				<td class="colorF2" style="width:120px;">小班号</td>
				<td style="padding:0;width:110px;"><textarea disabled="disabled" id="nationalForestCode" style="width:110px;height:40px;border:0;background-color:transparent;text-align:center;resize:none"></textarea></td>
				<td class="colorF2" style="width:70px;padding:0 1px;">地方级公益林面积</td>
				<td id="" style="padding:0;width:100px;"><input disabled="disabled" value="0.0" id="regionForestArea" type="text" style="width: 90px;border:0;background-color:transparent;text-align:center;"></td>
				<td class="colorF2" style="width:60px;">小班号</td>
				<!-- <td style="padding:0;width: 90px;"><input type="text" style="width: 90px;border:0;background-color:transparent;text-align:center;"></td> -->
				<td style="padding:0;width: 90px;"><textarea disabled="disabled" id="regionForestCode" style="width:90px;height:40px;border:0;background-color:transparent;text-align:center;resize:none"></textarea></td>
			</tr>
			<tr>
				<td class="colorF2" style="padding:3px 0;" >聘用状态</td>
				<td style="padding:0;"><input disabled="disabled" id="employState" style="width:80px; border:0;background-color:transparent;text-align:center;">
				</td>
				<td class="colorF2">合同签订起止日期</td>
				<td colspan="3" style="padding:0;">
					<input type="text" id="contractDateBegin" disabled="disabled" style=" width:80px;border:0;background-color:transparent;text-align:center;"readonly>
					<span style="margin-left:30px">至</span>
					<input id="contractDateEnd" disabled="disabled" type="text" style="width:80px;border:0;background-color:transparent;text-align:center;margin-left:30px;"readonly>
				</td>
				<td class="colorF2">合同期限</td>
				<td style="padding:0;"><input disabled="disabled" id="contractPeriod" type="text" style="width: 90px;border:0;background-color:transparent;text-align:center;"></td>
			</tr>
			<tr id="hideThis">
				<td class="colorF2">解聘原因</td>
				<td colspan="3" style="padding:0;"><input disabled="disabled"  id="unemployReason" style="width:317px;border:0;background-color:transparent;text-align:center;" >
				
				<td class="colorF2">解聘日期</td>
				<td colspan="3" style="padding:0;"><input disabled="disabled"  id="unEmployDate" style="width:200px;border:0;background-color:transparent;text-align:center;" readonly></td>
			</tr>
			<tr>
				<td class="colorF2">备注</td>
				<td colspan="7" style="padding:0;"><input id="remark" disabled="disabled" type="text" style="width:630px;border:0;background-color:transparent;text-align:center;padding-right:10px;"></td>
			</tr>
		</tbody>
	</table>
</div>
<!-- <div style="position:absolute; top:23px; right:6px;width:130px;height:160px;text-align:center;border:#D3D3D3 solid 1px;">
	<img id="imghead" border="0" src="/ResourceMonitor/identifyPhoto/NoPeoplePhoto.png" width="130" height="160">
</div> -->
</body>
<script type="text/javascript" src="/ResourceMonitor/js/myJS/patrolForRanger/patrolPerson/PersonDetail.js"></script>
</html>