<%--<td class="fixWidth">冻&nbsp;结&nbsp;状&nbsp;态</td>
							<td><select 
								class="form-control" id="freezed">
									<option value=0>否</option>
									<option value=1>是</option>
							</select></td> --%>

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
#table td{text-align:center;padding:6px 0; font-size:14px;border-color:#D3D3D3}
#tabletwo .colorF2{background-color:#F2F2F2;color:#035d45;}
#tabletwo td{text-align:center;padding:6px 0;font-size:14px;border-color:#D3D3D3}
#tablethr .colorF2{background-color:#F2F2F2;color:#035d45;}
#tablethr td{text-align:center;padding:6px 0;font-size:14px;border-color:#D3D3D3}
#nationalityBtn {background:url(/ResourceMonitor/images/indexpage/listto.png);background-position: center center;}
.nationalitylabel{
	border:1px solid #ccc;
	margin-left:8px;
	width:80px;
	text-align:center;
	cursor:pointer;
}
div[id*='layui-layer'] .layui-layer-content{padding:0;}
.layui-table tbody tr:hover,.layui-table thead tr,.layui-table-hover{background-color:transparent}
#delSpan{
	position: absolute;
    height: 0;
    background: rgba( 0, 0, 0, 0.5 );
    width: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 300;
}
#delImg{
	width: 24px;
    height: 24px;
    display: inline;
    float: right;
    text-indent: -9999px;
    /* overflow: hidden; */
    background: url(/ResourceMonitor/images/indexpage/Whitedelete.png) no-repeat;
    margin: 5px 1px 1px;
    cursor: pointer;
}
</style>
</head>
<body>
<div style="padding:5px 0 0 6px;width:664px;">
<h6 style="margin-bottom:5px;font-weight:bold;margin-top:2px;">人员基本信息</h6>
	<table id="table" class="layui-table" lay-size="sm" style="margin:0;">
		<tbody >
			<tr>
				<td class="colorF2" style="width:70px;color:red;"><span style="color:red;">*</span>&nbsp;姓&nbsp;&nbsp;名&nbsp;&nbsp;</td>
				<td style="padding:0;width:80px;"><input id="personName" type="text" maxlength="18" style="border:0;background-color:transparent;text-align:center;"/></td>
				<td class="colorF2" style="width:80px;">性&nbsp;&nbsp;别</td>
				<td style="padding:0;width:80px;"><label style="margin-bottom:0"><input type="radio" checked name="personSex" value="1" style="margin:5px 5px 0 0;">男</label><label style="margin-left:10px;margin-bottom:0"><input type="radio" name="personSex" value="0" style="margin:5px 5px 0 0;">女</label></td>
				<td class="colorF2" style="width:80px;">民&nbsp;&nbsp;族</td>
				<!-- <td style="padding:0;width:70px;"><input id="nationality" type="text" style="width:55px;border:0;background-color:transparent;text-align:center;"/><button style="width:12px;height:12px;border:0;background-color:transparent;"></button><span style="position:absolute; top:3px; right:0px;width:20px;height:20px; border:0;">族</span>
				</td> -->
				<td id="nationalityTd" style="padding:0;width:70px;align:left;cursor:pointer;">
					<input id="nationality" type="text" readonly style="cursor:pointer;width:50px;border:0;background-color:transparent;text-align:center;" value="汉族"/>
					<!-- <input id="nationality" type="text" readonly style="width:50px;border:0;background-color:transparent;text-align:center;display:none;"/> -->
					<button style="width:12px;height:12px;border:0;background-color:transparent;">
					</button><button id="nationalityBtn" style="position:absolute; top:5px; right:0px;width:20px;height:20px; border:0;"></button>
				</td>
				<td class="colorF2" style="width:60px;">年&nbsp;&nbsp;龄</td>
				<td style="padding:0; width:70px;"><input id="age" type="text" style="width:50px;border:0;background-color:transparent;text-align:center;"><button style="width:12px;height:12px;border:0;background-color:transparent;"></button><span style="position:absolute; top:3px; right:5px;width:20px;height:20px; border:0;">岁</span></td>	
			</tr>
			<tr>
				<td class="colorF2">籍&nbsp;&nbsp;贯</td>
				<td style="padding:0;"><input id="birthplace" type="text" style="border:0;background-color:transparent;text-align:center;"></td>
				<td class="colorF2" style="color:red;"><span style="color:red;">*</span>&nbsp;身份证号码</td>
				<td colspan="3" style="padding:0;width:230px;"><input id="idcode" type="text" maxlength="18" style="width: 230px;border:0;background-color:transparent;text-align:center;"></td>
				<td class="colorF2">出生年月</td>
				<td style="padding:0;width:79px;height:27px;"><input id="birthday" type="text" style="width:79px;height:27px;border:0;color:#888888;background-color:#F3F3F3;text-align:center;"readonly></td>
			</tr>
			 <tr>
				<td class="colorF2">工程类别</td>
				<td colspan="3" style="padding:0;"><select id="projectTypeSelect" style="width:220px;border:0;background-color:transparent;align:center;">
					<option value="1">天保</option>
					<!-- <option value="2">生态护林员</option> -->
				</select></td>
				<td class="colorF2">管护单位</td>
				<td colspan="3" style="padding:0;"><select id="departmentVal" style="width:200px;border:0;background-color:transparent;align:center;">
				</select></td>
			</tr>
			<tr>
				<td class="colorF2" style="padding:3px 4px;">医疗保险是否购买</td>
				<td id="" style="padding:0;"><label style="margin-bottom:0"><input type="radio" value="1" name="medical" style="margin:5px 5px 0 0;" checked>是</label><label style="margin-left:10px;margin-bottom:0"><input type="radio" value="0" name="medical" style="margin:5px 5px 0 0;" >否</label></td>
				<td class="colorF2" style="padding:3px 5px;">养老保险是否购买</td>
				<td id="" style="padding:0;"><label style="margin-bottom:0"><input type="radio" value="1" name="oldage" style="margin:5px 5px 0 0;" checked>是</label><label style="margin-left:10px;margin-bottom:0"><input type="radio" value="0" name="oldage" style="margin:5px 5px 0 0;">否</label></td>
				<td class="colorF2" style="padding:3px 4px;">是否为建档立卡贫困户</td>
				<td id="" colspan="3" style="padding:0;"><label style="margin-bottom:0"><input type="radio" value="1" name="poverty" style="margin:5px 5px 0 0;">是</label><label style="margin-left:10px;margin-bottom:0"><input type="radio" value="0" name="poverty" style="margin:5px 5px 0 0;" checked>否</label></td>
			</tr>
			<tr>
				<td class="colorF2">文化程度</td>
				<td colspan="3" style="padding:0;"><select  id="educated" style="width:220px; border:0;background-color:transparent;align:center;">
					<option value="01">大学</option>
					<option value="02">大专</option>
					<option value="03">高职</option>
					<option value="04">高中</option>
					<option value="05" selected>初中</option>
					<option value="06">小学</option>
					<option value="07">文盲</option>
				</select></td>
				<td class="colorF2" style="padding:3px 0;" >身体健康状况</td>
				<td colspan="3" style="padding:0;"><select id="healthy" style="width:200px;border:0;background-color:transparent;align:center;">
					<option value="01" selected>健康</option>
					<option value="02">良好</option>
					<option value="03">其他</option>
				</select></td>
			</tr>
			<tr>
				<td class="colorF2">家庭住址</td>
				<td colspan="3" style="padding:0;"><input placeholder="不超过20个汉字" id="homeAddress" type="text" style="width: 230px;border:0;background-color:transparent;text-align:center;"></td>
				<td class="colorF2" style="color:red;"><span style="color:red;">*</span>&nbsp;手机号码</td>
				<td colspan="3" style="padding:0;"><input id="mobile" type="text" style="width: 200px;border:0;background-color:transparent;text-align:center;" maxlength="11"></td>
			</tr>
		</tbody>
	</table>
</div>
<div style="padding:0 5px 0 6px;width:800px;">
	<table id="tabletwo" class="layui-table" lay-size="sm" style="margin:-1px 0 5px 0;">
		<tbody>
			<tr>
				<td class="colorF2" style="width:73px;">授权使用</td>
				<td id="" style="padding:0;width:130px;"><label  style="margin-bottom:0"><input type="radio" name="authorized" value="1" style="margin:5px 5px 0 0;">是</label><label style="margin-left:10px;margin-bottom:0"><input type="radio" name="authorized" value="0" checked style="margin:5px 5px 0 0;">否</label></td>
				<td class="colorF2" style="width:112px;">责任区编号</td>
				<td style="padding:0;width: 1px;"><input id="accountNum" type="text" style="width: 160px;border:0;background-color:transparent;text-align:center;"></td>
				<td class="colorF2" style="width:100px">责任区名称</td>
				<td style="padding:0;width: 144px;"><input id="regionName" type="text" style="width: 154px;border:0;background-color:transparent;text-align:center;"></td>
			</tr>
			<tr>
				<td class="colorF2">管护地点</td>
				<td style="padding:0;"><input id="patrolPlace" placeholder="不超过20个汉字" type="text" style="width: 130px;border:0;background-color:transparent;text-align:center;"></td>
				<td class="colorF2">管护面积(亩)</td>
				<td style="padding:0;"><input id="regionArea" type="text" style="width: 160px;border:0;background-color:transparent;text-align:center;" value="0.0"></td>
				<td class="colorF2">主要林种</td>
				<td style="padding:0;"><input placeholder="不超过10个汉字" id="superiorTree" type="text" style="width: 154px;border:0;background-color:transparent;text-align:center;"></td>
			</tr>
		</tbody>
	</table>
</div>
<div style="padding:0 5px 0 6px;width:800px;">
	<h6 style="margin-bottom:0;font-weight:bold;">管护区域信息</h6>
	<table id="tabletwo" class="layui-table" lay-size="sm" style="margin:5px 0 0 0;">
		<tbody>
			<tr>
				<td class="colorF2" style="width:70px;padding:0 1px;">国家级公益林面积</td>
				<td id="" style="padding:0;width:90px;"><input id="nationalForestArea" type="text" style="width: 90px;border:0;background-color:transparent;text-align:center;" value="0.0"></td>
				<td class="colorF2" style="width:120px;">小班号</td>
				<td style="padding:0;width:110px;"><textarea placeholder="多个小班用 ,隔开" id="nationalForestCode" style="width:110px;height:40px;border:0;background-color:transparent;text-align:center;resize:none"></textarea></td>
				<td class="colorF2" style="width:70px;padding:0 1px;">地方级公益林面积</td>
				<td id="" style="padding:0;width:100px;"><input value="0.0" id="regionForestArea" type="text" style="width: 90px;border:0;background-color:transparent;text-align:center;"></td>
				<td class="colorF2" style="width:60px;">小班号</td>
				<!-- <td style="padding:0;width: 90px;"><input type="text" style="width: 90px;border:0;background-color:transparent;text-align:center;"></td> -->
				<td style="padding:0;width: 90px;"><textarea placeholder="多个小班用 ,隔开" id="regionForestCode" style="width:90px;height:40px;border:0;background-color:transparent;text-align:center;resize:none"></textarea></td>
			</tr>
			<tr>
				<td class="colorF2" style="padding:3px 0;" >聘用状态</td>
				<td style="padding:0;"><select id="employState" style="width:80px;border:0;background-color:transparent;align:center;">
					<option value="01">选聘</option>
					<option value="02">续聘</option>
				</select></td>
				<td class="colorF2">合同签订起止日期</td>
				<td colspan="3" style="padding:0;">
					<input type="text" id="contractDateBegin" style=" width:80px;border:0;background-color:transparent;text-align:center;"readonly>
					<span style="margin-left:30px">至</span>
					<input id="contractDateEnd" type="text" style=" width:80px;border:0;background-color:transparent;text-align:center;margin-left:30px;"readonly>
				</td>
				<td class="colorF2">合同期限</td>
				<td style="padding:0;"><input id="contractPeriod" type="text" style="width: 90px;border:0;background-color:transparent;text-align:center;"></td>
			</tr>
			<tr>
				<td class="colorF2">备注</td>
				<td colspan="7" style="padding:0;"><input id="remark" type="text" style="width:630px;border:0;background-color:transparent;text-align:center;padding-right:10px;"></td>
			</tr>
		</tbody>
	</table>
</div>
<div style="position:absolute; top:24.5px; right:6px;width:130px;height:155px;text-align:center;border:#D3D3D3 solid 1px;">
	<div id="preview" style="width:130px;height:155px;">
		<img id="imghead" border="0" src="../../../images/photo_icon.png"
			width="130" height="155" onclick="$('#previewImg').click();">
	</div> <input type="file" onchange="previewImage(this)" style="display: none;" id="previewImg">
	<div style="position:absolute; top:165px; right:5px;z-index:-1;color:red;font-align:center; font-size:12px;">JPG格式,不超过2M</div>
	</div>
</body>
<script type="text/javascript" src="/ResourceMonitor/js/myJS/patrolForRanger/patrolPerson/addPerson.js"></script>
</html>