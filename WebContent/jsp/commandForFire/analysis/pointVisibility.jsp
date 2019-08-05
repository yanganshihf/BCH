<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="renderer" content="webkit">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<link rel="stylesheet" href="../../../js/bootstrap-3.3.5-dist/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="../../../js/layer/layui/css/layui.css" media="all"/>
	<script type="text/javascript" src="../../../js/jquery-2.1.4/jquery.min.js"></script>
	<script type="text/javascript" src="../../../js/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="../../../js/layer/layui/layui.all.js"></script>
</head>
<body>
	<div>
		<table style="font-size:14px;line-height:35px;margin-top:8px;margin-left:5px;text-align:left">
			<tbody>
				<tr>
					<td style="text-align:center;width:86px;"><label>坐标格式</label></td> 
			    	<td colspan="3" style="width:240px;">
				    	<select id="locationType" onchange="onCoorTypeChanged()" style="width:220px;height:25px;text-align:center">
				    		<option value="optionDMS">度分秒</option>
				    		<option value="optionDegree">十进制度</option>
				    		<!-- <option value="optionXian80">西安80坐标</option> -->
				    	</select>
				    </td>	
				</tr>
				<tr>
					<td style="text-align:center;width:86px;"><label>起点坐标</label></td>
					<td colspan="3">
						<input type="checkbox" id="screenStart" style="margin-left:10px;" onchange="onScreenStart()"/>屏幕选点
				    </td>
				</tr>				
				<tr id="longtSTR">
					<td style="text-align:right"><label style="font-weight:normal;margin-right:18px">经度</label></td>
					<td style="width:80px;"><input type="text" id="longtDStart" maxlength="3" 
						style="width:60px;height:25px" onchange="longtDegStartValidate()">&nbsp;°</td>
				    <td style="width:80px;"><input type="text" id="longtMStart" maxlength="2" 
				    	style="width:60px;height:25px" onchange="longtMStartValidate()">&nbsp;′</td>
				    <td style="width:80px;"><input type="text" id="longtSStart" maxlength="4" 
				    	style="width:60px;height:25px" onchange="longtSStartValidate()">&nbsp;″</td>
				    <td style="width:20px;" rowspan="2">
				    	<img src="../../../images/indexpage/dingwei.png" onclick="eventLocator(0)" 
				    	style="vertical-align:middle;width:16px;height:19px;margin-left:10px;margin-left:0px;"/>
				    </td>				    	
				</tr>

				<tr id="latSTR">
					<td style="text-align:right"><label style="font-weight:normal;margin-right:18px">纬度</label></td>
					<td><input type="text" id="latDStart" maxlength="2" 
						style="width:60px;height:25px" onchange="latDegStartValidate()">&nbsp;°</td>
				    <td><input type="text" id="latMStart" maxlength="2" 
				    	style="width:60px;height:25px" onchange="latMStartValidate()">&nbsp;′</td>
				    <td><input type="text" id="latSStart" maxlength="4" 
				    	style="width:60px;height:25px" onchange="latSStartValidate()">&nbsp;″</td>
				</tr>
				<tr>
					<td style="text-align:center;width:86px;"><label>终点坐标</label></td>
					<td colspan="3">
						<input type="checkbox" id="screenEnd" style="margin-left:10px;" onchange="onScreenEnd()"/>屏幕选点
				    </td>
				</tr> 				
 				<tr id="longtETR">
					<td style="text-align:right"><label style="font-weight:normal;margin-right:18px">经度</label></td>
					<td><input type="text" id="longtDEnd" maxlength="3" 
						style="width:60px;height:25px" onchange="longtDegEndValidate()">&nbsp;°</td>
				    <td><input type="text" id="longtMEnd" maxlength="2" 
				    	style="width:60px;height:25px" onchange="longtMEndValidate()">&nbsp;′</td>
				    <td><input type="text" id="longtSEnd" maxlength="4" 
				    	style="width:60px;height:25px" onchange="longtSEndValidate()">&nbsp;″</td>
				    <td style="width:20px;" rowspan="2">
				    	<img src="../../../images/indexpage/dingwei.png" onclick="eventLocator(1)" 
				    	style="vertical-align:middle;width:16px;height:19px;margin-left:10px;margin-left:0px;"/>
				    </td>				    	
				</tr>

				<tr id="latETR">
					<td style="text-align:right"><label style="font-weight:normal;margin-right:18px">纬度</label></td>
					<td><input type="text" id="latDEnd" maxlength="2" 
						style="width:60px;height:25px" onchange="latDegEndValidate()">&nbsp;°</td>
				    <td><input type="text" id="latMEnd" maxlength="2" 
				    	style="width:60px;height:25px" onchange="latMEndValidate()">&nbsp;′</td>
				    <td><input type="text" id="latSEnd" maxlength="4" 
				    	style="width:60px;height:25px" onchange="latSEndValidate()">&nbsp;″</td>
				</tr>
			</tbody>
		</table>
	</div>
	<input type="hidden" value="" id="pointId">
	<script>
	
		function closeDlg(){
			//关闭iframe页面
			var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
			parent.layer.close(index);
		}
				
		/*控制分、秒输入可用性*/
		/*控制十进制度到度的整数转换*/
		function onCoorTypeChanged(){
			var locationType=$("#locationType").val();
			var xLabel,ySLabel,xELabel,yELabel;
			var angle80 = '';
			var locateStartImage = '';
			locateEndImage = '';
			if(locationType=="optionDMS"){
				xSLabel='起点经度';
				ySLabel='起点纬度';
				xELabel='终点经度';
				yELabel='终点纬度';
				locateStartImage='<td style="width:20px;" rowspan="2">'
			    	+'<img src="../../../images/indexpage/dingwei.png" onclick="eventLocator(0)"' 
			    	+'style="vertical-align:middle;width:16px;height:19px;margin-left:10px;margin-left:0px;"/></td>';
				locateEndImage='<td style="width:20px;" rowspan="2">'
			    	+'<img src="../../../images/indexpage/dingwei.png" onclick="eventLocator(1)"' 
			    	+'style="vertical-align:middle;width:16px;height:19px;margin-left:10px;margin-left:0px;"/></td>';
			}else if(locationType=="optionDegree"){
				xSLabel='起点经度';
				ySLabel='起点纬度';
				xELabel='终点经度';
				yELabel='终点纬度';
				angle80='°';
				locateStartImage='<td style="width:20px;" rowspan="2">'
			    	+'<img src="../../../images/indexpage/dingwei.png" onclick="eventLocator(0)"' 
			    	+'style="vertical-align:middle;width:16px;height:19px;margin-left:10px;margin-left:0px;"/></td>';
				locateEndImage='<td style="width:20px;" rowspan="2">'
			    	+'<img src="../../../images/indexpage/dingwei.png" onclick="eventLocator(1)"' 
			    	+'style="vertical-align:middle;width:16px;height:19px;margin-left:10px;margin-left:0px;"/></td>';
			}else{
				xSLabel='起始X(加带号)';
				ySLabel='起始Y'
				xELabel='终点X(加带号)';
				yELabel='终点Y';
			}
			var longtSHtmlAble=
				'<td style="text-align:right"><label style="margin-right:10px;font-weight:normal">'+xSLabel+'</label></td>'
				+'<td style="width:80px;"><input type="text" id="longtDStart" maxlength="3"' 
				+'	style="width:60px;height:25px" onchange="longtDegStartValidate()">&nbsp;°</td>'
				+'<td style="width:80px;"><input type="text" id="longtMStart" maxlength="2"' 
				+'	style="width:60px;height:25px" onchange="longtMStartValidate()">&nbsp;′</td>'
				+'<td style="width:80px;"><input type="text" id="longtSStart" maxlength="4"' 
				+'	style="width:60px;height:25px" onchange="longtSStartValidate()">&nbsp;″</td>'+locateStartImage;
		    var latSHtmlAble=
				'<td style="text-align:right"><label style="margin-right:10px;font-weight:normal">'+ySLabel+'</label></td>'
				+'<td><input type="text" id="latDStart" maxlength="2"' 
				+'	style="width:60px;height:25px" onchange="latDegStartValidate()">&nbsp;°</td>'
				+'<td><input type="text" id="latMStart" maxlength="2"' 
				+'	style="width:60px;height:25px" onchange="latMStartValidate()">&nbsp;′</td>'
				+'<td><input type="text" id="latSStart" maxlength="4"' 
				+'	style="width:60px;height:25px" onchange="latSStartValidate()">&nbsp;″</td>';
			var longtEHtmlAble=
				'<td style="text-align:right"><label style="margin-right:10px;font-weight:normal">'+xELabel+'</label></td>'
				+'<td><input type="text" id="longtDEnd" maxlength="3"' 
				+'	style="width:60px;height:25px" onchange="longtDegEndValidate()">&nbsp;°</td>'
				+'<td><input type="text" id="longtMEnd" maxlength="2"' 
				+'	style="width:60px;height:25px" onchange="longtMEndValidate()">&nbsp;′</td>'
				+'<td><input type="text" id="longtSEnd" maxlength="4"' 
				+'	style="width:60px;height:25px" onchange="longtSEndValidate()">&nbsp;″</td>'+locateEndImage;
			var latEHtmlAble=
				'<td style="text-align:right"><label style="margin-right:10px;font-weight:normal">'+yELabel+'</label></td>'
				+'<td><input type="text" id="latDEnd" maxlength="2"' 
				+'	style="width:60px;height:25px" onchange="latDegEndValidate()">&nbsp;°</td>'
				+'<td><input type="text" id="latMEnd" maxlength="2"' 
				+'	style="width:60px;height:25px" onchange="latMEndValidate()">&nbsp;′</td>'
				+'<td><input type="text" id="latSEnd" maxlength="4"' 
				+'	style="width:60px;height:25px" onchange="latSEndValidate()">&nbsp;″</td>';
		    	
			var longtSHtmlEnable=
				'<td style="text-align:right"><label style="margin-right:10px;font-weight:normal">'+xSLabel+'</label></td>'
				+'<td colspan="3"><input type="text" id="longtDStart" maxlength="3"' 
				+'	style="width:220px;height:25px" onchange="longtDegStartValidate()">&nbsp;'+angle80+'</td>'+locateStartImage;
		    var latSHtmlEnable=
				'<td style="text-align:right"><label style="margin-right:10px;font-weight:normal">'+ySLabel+'</label></td>'
				+'<td colspan="3"><input type="text" id="latDStart" maxlength="2"' 
				+'	style="width:220px;height:25px" onchange="latDegStartValidate()">&nbsp;'+angle80+'</td>';
			var longtEHtmlEnable=
				'<td style="text-align:right"><label style="margin-right:10px;font-weight:normal">'+xELabel+'</label></td>'
				+'<td colspan="3"><input type="text" id="longtDEnd" maxlength="3"' 
				+'	style="width:220px;height:25px" onchange="longtDegEndValidate()">&nbsp;'+angle80+'</td>'+locateEndImage;
			var latEHtmlEnable=
				'<td style="text-align:right"><label style="margin-right:10px;font-weight:normal">'+yELabel+'</label></td>'
				+'<td colspan="3"><input type="text" id="latDEnd" maxlength="2"' 
				+'	style="width:220px;height:25px" onchange="latDegEndValidate()">&nbsp;'+angle80+'</td>';		    	

			if(locationType=="optionDMS"){
				$("#screenStart").attr("disabled",false);
				$("#screenEnd").attr("disabled",false);
				$("#longtSTR").html(longtSHtmlAble);
				$("#latSTR").html( latSHtmlAble);
				$("#longtETR").html(longtEHtmlAble);
				$("#latETR").html( latEHtmlAble);
				var longtDStart=document.getElementById("longtDStart");
				var	latDStart=document.getElementById("latDStart");
				var	longtDEnd=document.getElementById("longtDEnd");
				var	latDEnd=document.getElementById("latDEnd");
				longtDStart.maxLength=3;
				latDStart.maxLength=2;
				longtDEnd.maxLength=3;
				latDEnd.maxLength=2;
				var lontDStartVal=parseInt(longtDStart.value);
				if(isNaN(lontDStartVal)===false)
					longtDStart.value=lontDStartVal;
				var latDStartVal=parseInt(latDStart.value);
				if(isNaN(latDStartVal)===false)
					latDStart.value=latDStartVal;
				
				var longtDEndVal=parseInt(longtDEnd.value);
				if(isNaN(longtDEndVal)===false)
					longtDEnd.value=longtDEndVal;
				var latDEndVal=parseInt(latDEnd.value);
				if(isNaN(latDEndVal)===false)
					latDEnd.value=latDEndVal;
			}else if(locationType=="optionDegree"){
				$("#screenStart").attr("disabled",false);
				$("#screenEnd").attr("disabled",false);
				$("#longtSTR").html(longtSHtmlEnable);
				$("#latSTR").html( latSHtmlEnable);
				$("#longtETR").html(longtEHtmlEnable);
				$("#latETR").html( latEHtmlEnable);
				var longtDStart=document.getElementById("longtDStart");
				var	latDStart=document.getElementById("latDStart");
				var	longtDEnd=document.getElementById("longtDEnd");
				var	latDEnd=document.getElementById("latDEnd");
				longtDStart.maxLength=10;
				latDStart.maxLength=9;
				longtDEnd.maxLength=10;
				latDEnd.maxLength=9;
				var lontDStartVal=parseFloat(longtDStart.value);
				if(isNaN(lontDStartVal)===false&&lontDStartVal<180&&lontDStartVal>50)
					document.getElementById("longtDStart").value=lontDStartVal;
				else
					document.getElementById("longtDStart").value='';
				
				var latDStartVal=parseFloat(latDStart.value);
				if(isNaN(latDStartVal)===false&&latDStartVal>3&&latDStartVal<60)
					document.getElementById("latDStart").value=latDStartVal;
				else
					document.getElementById("latDStart").value='';
				
				var lontEndDVal=parseFloat(longtDEnd.value);
				if(isNaN(lontEndDVal)===false&&lontEndDVal<180&&lontEndDVal>50)
					document.getElementById("longtDEnd").value=lontEndDVal;
				else
					document.getElementById("longtDEnd").value='';
				
				var latDEndVal=parseFloat(latDEnd.value);
				if(isNaN(latDEndVal)===false&&latDEndVal>3&&latDEndVal<60)
					document.getElementById("latDEnd").value=latDEndVal;
				else
					document.getElementById("latDEnd").value='';				
			}else{
				$("#screenStart").attr("disabled",true);
				$("#screenStart").attr("checked",false);
				$("#screenEnd").attr("disabled",true);
				$("#screenEnd").attr("checked",false);
				$("#longtSTR").html(longtSHtmlEnable);
				$("#latSTR").html( latSHtmlEnable);
				$("#longtETR").html(longtEHtmlEnable);
				$("#latETR").html( latEHtmlEnable);
				var longtDStart=document.getElementById("longtDStart");
				var	latDStart=document.getElementById("latDStart");
				var	longtDEnd=document.getElementById("longtDEnd");
				var	latDEnd=document.getElementById("latDEnd");
				longtDStart.maxLength=8;
				latDStart.maxLength=7;
				longtDEnd.maxLength=8;
				latDEnd.maxLength=7;
				//起始坐标
				var lontDStartVal=parseFloat(longtDStart.value);
				if(isNaN(lontDStartVal)===false&&lontDStartVal>1000000&&lontDStartVal<99999999)
					document.getElementById("longtDStart").value=lontDStartVal;
				else
					document.getElementById("longtDStart").value='';
				
				var latDStartVal=parseFloat(latDStart.value);
				if(isNaN(latDStartVal)===false&&latDStartVal>1000000&&latDStartVal<9999999)
					document.getElementById("latDStart").value=latDStartVal;
				else
					document.getElementById("latDStart").value='';	
				//终点坐标
				var lontDEndVal=parseFloat(longtDEnd.value);
				if(isNaN(lontDEndVal)===false&&lontDEndVal>1000000&&lontDEndVal<99999999)
					document.getElementById("longtDEnd").value=lontDEndVal;
				else
					document.getElementById("longtDEnd").value='';
				
				var latDEndVal=parseFloat(latDEnd.value);
				if(isNaN(latDEndVal)===false&&latDEndVal>1000000&&latDEndVal<9999999)
					document.getElementById("latDEnd").value=latDEndVal;
				else
					document.getElementById("latDEnd").value='';				
			}
		}
		
		/*经度输入验证*/
		//-度
		function longtDegStartValidate(){
			longtDegValidate("longtDStart");	
		}
		function longtDegEndValidate(){
			longtDegValidate("longtDEnd");
		}
		function longtDegValidate(ctrlId){
			var locationType=$("#locationType").val();
			if(locationType=="optionDMS"){
				var lontDval=parseInt(document.getElementById(ctrlId).value);
				if(isNaN(lontDval)===true || lontDval>135 ||lontDval<73){
					document.getElementById(ctrlId).value="";
					layer.tips('请输入有效值', '#'+ctrlId, {
						  tips: [3, '#009f95']
					});
					return false;
				}
			}else if(locationType=="optionDegree"){
				var lontDval=parseFloat(document.getElementById(ctrlId).value);
				if(isNaN(lontDval)===true || lontDval>135 ||lontDval<73){
					document.getElementById(ctrlId).value="";
					//document.getElementById("longtD").setAttribute("placeholder","请输入有效值");
					layer.tips('请输入有效值', '#'+ctrlId, {
						  tips: [3, '#009f95']
					});
					return false;
				}else{
					document.getElementById(ctrlId).value=lontDval;
				}
			}else{
				var lontStrStart=document.getElementById("longtDStart").value;
				var lontDStartVal=parseFloat(lontStrStart);
				if(isNaN(lontDStartVal)){
					layer.tips('请输入有效值', '#longtDStart', {
						  tips: [3, '#009f95']
					});
					return false;
				}else{
					if(lontDStartVal<1000000){
						layer.tips('横坐标需包含带号', '#longtDStart', {
							  tips: [3, '#009f95']
						});
						return false;
					}
					else if(lontStrStart.substring(0,2)!=='20'&&lontStrStart.substring(0,2)!=='21'){
						layer.tips('横坐标带号错误', '#longtDStart', {
							  tips: [3, '#009f95']
						});
						return false;
					}
				}
				
				var lontStrEnd=document.getElementById("longtDEnd").value;
				var lontDEndVal=parseFloat(lontStrEnd);
				if(isNaN(lontDEndVal)){
					layer.tips('请输入有效值', '#longtDEnd', {
						  tips: [3, '#009f95']
					});
					return false;
				}else{
					if(lontDEndVal<1000000){
						layer.tips('横坐标需包含带号', '#longtDEnd', {
							  tips: [3, '#009f95']
						});
						return false;
					}
					else if(lontStrEnd.substring(0,2)!=='20'&&lontStrEnd.substring(0,2)!=='21'){
						layer.tips('横坐标带号错误', '#longtDEnd', {
							  tips: [3, '#009f95']
						});
						return false;
					}
				}
			}
			return true;
		}

		/*纬度输入验证*/
		function latDegStartValidate(){
			latDegValidate("latDStart");
		}
		function latDegEndValidate(){
			latDegValidate("latDEnd");
		}
		function latDegValidate(ctrlId){
			var locationType=$("#locationType").val();
			if(locationType=="optionDMS"){
				var latDval=parseInt(document.getElementById(ctrlId).value);
				if(isNaN(latDval)===true || latDval>54 ||latDval<3){
					document.getElementById(ctrlId).value="";
					layer.tips('请输入有效值', '#'+ctrlId, {
						  tips: [3, '#009f95']
					});
					return false;
				}
			}else if(locationType=="optionDegree"){
				var latDval=parseFloat(document.getElementById(ctrlId).value);
				if(isNaN(latDval)===true || latDval>54 ||latDval<3){
					document.getElementById(ctrlId).value="";
					layer.tips('请输入有效值', '#'+ctrlId, {
						  tips: [3, '#009f95']
					});
					return false;
				}else{
					document.getElementById(ctrlId).value=latDval;
				}
			}else{
				var latDStartVal=parseFloat(document.getElementById("latDStart").value);
				if(isNaN(latDStartVal)||latDStartVal<1000000){
					layer.tips('请输入有效值', '#latDStart', {
						  tips: [3, '#009f95']
					});
					return false;
				}	
				var latDEndVal=parseFloat(document.getElementById("latDEnd").value);
				if(isNaN(latDEndVal)||latDEndVal<1000000){
					layer.tips('请输入有效值', '#latDEnd', {
						  tips: [3, '#009f95']
					});
					return false;
				}
			}
			return true;
		}
		//经纬度分验证
		function longtMStartValidate(){
			mmValidate("longtMStart");
		}
		function latMStartValidate(){
			mmValidate("latMStart");
		}
		function longtMEndValidate(){
			mmValidate("longtMEnd");
		}
		function latMEndValidate(){
			mmValidate("latMEnd");
		}		
		function mmValidate(inputId){
			var strVal = document.getElementById(inputId).value;
			if(strVal==""){
				strVal="0";
			}
			var val=parseInt(strVal);
			if(isNaN(val)===true || val>60 ||val<0){
				document.getElementById(inputId).value="";
				layer.tips('请输入有效值', '#'+inputId, {
					  tips: [3, '#009f95']
				});
				return false;
			}else{
				document.getElementById(inputId).value=val;
			}
			return true;
		}
	
		//经纬度秒验证
		function longtSStartValidate(){
			ssValidate("longtSStart");
		}
		function latSStartValidate(){
			ssValidate("latSStart");
		}
		function longtSEndValidate(){
			ssValidate("longtSEnd");
		}
		function latSEndValidate(){
			ssValidate("latSEnd");
		}
		function ssValidate(inputId){
			var strVal=document.getElementById(inputId).value;
			if(strVal==""){
				strVal="0";
			}
			var val=parseFloat(strVal);
			var accure;
			if(strVal.indexOf('.')==-1){
				accure=0;
			}else{
			 	accure=strVal.length-strVal.indexOf('.')-1;
			}
			if(isNaN(val)===true || val>60 ||val<0||accure>1){
				document.getElementById(inputId).value="";
				layer.tips('请输入有效值', '#'+inputId, {
					  tips: [3, '#009f95']
				});
				return false;
			}else{
				document.getElementById(inputId).value=val;
				return true;
			}
		}		
//--------------------------------------------------------------------------------
		function sumbit(){
			if(!paramsValidate())
				return;
			var locationType=$("#locationType").val();
			//起点
			var longtDStartVar=$("#longtDStart").val();
			var latDStartVar=$("#latDStart").val();
			//终点
			var longtDEndVar=$("#longtDEnd").val();
			var latDEndVar=$("#latDEnd").val();
			
			if(locationType!="optionXian80"){
				longtDStartVar=parseFloat(longtDStartVar);
				latDStartVar=parseFloat(latDStartVar);
				longtDEndVar=parseFloat(longtDEndVar);
				latDEndVar=parseFloat(latDEndVar);
			}
			if(locationType=="optionDMS"){
				var longtMStartVar=$("#longtMStart").val();
				var longtSStartVar=$("#longtSStart").val();
				if(longtMStartVar !==null&&longtMStartVar !==""){
					longtDStartVar+=parseFloat(longtMStartVar)/60;
				}
				if(longtSStartVar !==null&&longtSStartVar !==""){
					longtDStartVar+=parseFloat(longtSStartVar)/3600;
				}
				longtDStartVar=longtDStartVar.toFixed(6);
				var latMStartVar=$("#latMStart").val();
				var latSStartVar=$("#latSStart").val();
				if(latMStartVar !==null&&latMStartVar !==""){
					latDStartVar+=parseFloat(latMStartVar)/60;
				}
				if(latSStartVar !==null&&latSStartVar !==""){
					latDStartVar+=parseFloat(latSStartVar)/3600;
				}
				latDStartVar=latDStartVar.toFixed(6);
				var longtMEndVar=$("#longtMEnd").val();
				var longtSEndVar=$("#longtSEnd").val();
				if(longtMEndVar !==null&&longtMEndVar !==""){
					longtDEndVar+=parseFloat(longtMEndVar)/60;
				}
				if(longtSEndVar !==null&&longtSEndVar !==""){
					longtDEndVar+=parseFloat(longtSEndVar)/3600;
				}
				longtDEndVar=longtDEndVar.toFixed(6);
				var latMEndVar=$("#latMEnd").val();
				var latSEndVar=$("#latSEnd").val();
				if(latMEndVar !==null&&latMEndVar !==""){
					latDEndVar+=parseFloat(latMEndVar)/60;
				}
				if(latSEndVar !==null&&latSEndVar !==""){
					latDEndVar+=parseFloat(latSEndVar)/3600;
				}
				latDEndVar=latDEndVar.toFixed(6);
			}
			var pntVisibilityParams={
				longtitudeStart:longtDStartVar,
				latitudeStart:latDStartVar,
				longtitudeEnd:longtDEndVar,
				latitudeEnd:latDEndVar,
			};
			parent.analysis.funDoPntVisibilityAnalysis(pntVisibilityParams);
		}

		function paramsValidate(){
			if(!locateValidate(0)){
				return false;
			}
			if(!locateValidate(1)){
				return false;
			}
			return true;
		}
		function onScreenStart(){
			document.getElementById("screenEnd").checked=false;
			parent.analysis.pointType="start";
		}
		function onScreenEnd(){
			document.getElementById("screenStart").checked=false;
			parent.analysis.pointType="end";
		}
	    //事件定位
	    function eventLocator(SE) {
			if(!locateValidate(SE)){
				return;
			}
	    	var longtD=0;
	    	var latD=0;
	    	var longtM=0;
	    	var longtS=0;
	    	var latM=0;
	    	var latS=0;
			var locationType=$("#locationType").val();
			if(locationType=="optionDMS"){
				if(SE==0){
					longtD=parseFloat($("#longtDStart").val());
					latD=parseFloat($("#latDStart").val());
					longtM=$("#longtMStart").val();
					longtS=$("#longtSStart").val();
					latM=$("#latMStart").val();
					latS=$("#latSStart").val();
				}else{
					longtD=parseFloat($("#longtDEnd").val());
					latD=parseFloat($("#latDEnd").val());
					longtM=$("#longtMEnd").val();
					longtS=$("#longtSEnd").val();
					latM=$("#latMEnd").val();
					latS=$("#latSEnd").val();
				}
				if(longtM !==null&&longtM !=="")
					longtD+=parseFloat(longtM)/60;
				if(longtS !==null&&longtS !=="")
					longtD+=parseFloat(longtS)/3600;
				longtD=longtD.toFixed(6);
	
				if(latM !==null&&latM !=="")
					latD+=parseFloat(latM)/60;
				if(latS !==null&&latS !=="")
					latD+=parseFloat(latS)/3600;
				latD=latD.toFixed(6);
			}else{
				if(SE==0){
					longtD=parseFloat($("#longtDStart").val());
					latD=parseFloat($("#latDStart").val());
				}else{
					longtD=parseFloat($("#longtDEnd").val());
					latD=parseFloat($("#latDEnd").val());
				}
			}
			parent.analysis.funEventLocator({lon:longtD,lat:latD});
	    }
		function locateValidate(SN){
			var locationType=$("#locationType").val();
			if(SN==0){
				if(!longtDegValidate("longtDStart")){
					return false;
				}	
				if(locationType=="optionDMS"){
					if(!mmValidate("longtMStart")){
						return false;
					}
					if(!ssValidate("longtSStart")){
						return false;
					}
				}
				if(!latDegValidate("latDStart")){
					return false;
				}
				if(locationType=="optionDMS"){
					if(!mmValidate("latMStart")){
						return false;
					}
					if(!ssValidate("latSStart")){
						return false;
					}
				}
			}else{
				if(!longtDegValidate("longtDEnd")){
					return false;
				}
				if(locationType=="optionDMS"){
					if(!mmValidate("longtMEnd")){
						return false;
					}
					if(!ssValidate("longtSEnd")){
						return false;
					}
				}
				if(!latDegValidate("latDEnd")){
					return false;
				}
				if(locationType=="optionDMS"){
					if(!mmValidate("latMEnd")){
						return false;
					}
					if(!ssValidate("latSEnd")){
						return false;
					}
				}
			}
			return true;
		}		
	</script>
</body>
</html>