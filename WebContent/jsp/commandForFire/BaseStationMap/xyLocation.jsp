<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="renderer" content="webkit">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	
	<title>经纬度输入</title>

</head>
<body ng-app="eventApp" ng-controller="eventAddCtrl">
	<div>
		<table style="font-size:14px;line-height:40px;margin-top:8px;margin-left:10px;margin-right:10px;;text-align:left">
			<tbody> 
				<tr>
					<td style="text-align:right;width:65px;"><label style="margin-right:5px;">地点坐标</label></td> 
		    		<td colspan="3">
			    		<select id="locationType" onchange="onCoorTypeChanged()" style="width:100px;height:25px;text-align:center">
				    		<option value="optionDMS">度分秒</option>
				    		<option value="optionDegree">十进制度</option>
				    	</select>	
			    	</td>
				</tr>
				<tr id="longtTR">
					<td style="text-align:right"><label style="margin-right:5px;font-weight:normal">经度</label></td>
					<td style="width:80px;"><input type="text" id="longtD" maxlength="3" 
						style="width:60px;height:25px" onchange="longtDegValidate()">&nbsp;°</td>
				    <td style="width:80px;"><input type="text" id="longtM" maxlength="2" 
				    	style="width:60px;height:25px" onchange=longtMValidate()>&nbsp;′</td>
				    <td style="width:80px;"><input type="text" id="longtS" maxlength="4" 
				    	style="width:60px;height:25px" onchange="longtSValidate()">&nbsp;″</td>
				</tr>

				<tr  id="latTR">
					<td style="text-align:right"><label style="margin-right:5px;font-weight:normal">纬度</label></td>
					<td><input type="text" id="latD" maxlength="2" 
						style="width:60px;height:25px" onchange="latDegValidate()">&nbsp;°</td>
				    <td><input type="text" id="latM" maxlength="2" 
				    	style="width:60px;height:25px" onchange="latMValidate()">&nbsp;′</td>
				    <td><input type="text" id="latS" maxlength="4" 
				    	style="width:60px;height:25px" onchange="latSValidate()">&nbsp;″</td>
				</tr>
			</tbody>
		</table>
	</div>
	
	<script>	
	var layer;
	layui.use('layer', function(){
	    layer = layui.layer;
	});
		/*控制分、秒输入可用性*/
		/*控制十进制度到度的整数转换*/
		function onCoorTypeChanged(){
			var locationType=$("#locationType").val();
			var xLabel,yLabel;
			if(locationType=="optionDMS"){
				xLabel='经度';
				yLabel='纬度';
			}else if(locationType=="optionDegree"){
				xLabel='经度';
				yLabel='纬度';
			}
			var longtHtmlAble=
				'<td style="text-align:right"><label style="margin-right:5px;font-weight:normal">'+xLabel+'</label></td>'
				+'<td style="width:80px;"><input type="text" id="longtD" maxlength="3"' 
				+'	style="width:60px;height:25px" onchange="longtDegValidate()">&nbsp;°</td>'
				+'<td style="width:80px;"><input type="text" id="longtM" maxlength="2"' 
				+'	style="width:60px;height:25px" onchange=longtMValidate()>&nbsp;′</td>'
				+'<td style="width:80px;"><input type="text" id="longtS" maxlength="4"' 
				+'	style="width:60px;height:25px" onchange="longtSValidate()">&nbsp;″</td>';			
			
			var latHtmlAble=	
				'<td style="text-align:right"><label style="margin-right:5px;font-weight:normal">'+yLabel+'</label></td>'
				+'<td><input type="text" id="latD" maxlength="2"' 
				+'	style="width:60px;height:25px" onchange="latDegValidate()">&nbsp;°</td>'
				+'<td><input type="text" id="latM" maxlength="2"' 
				+'	style="width:60px;height:25px" onchange="latMValidate()">&nbsp;′</td>'
				+'<td><input type="text" id="latS" maxlength="4"' 
				+'	style="width:60px;height:25px" onchange="latSValidate()">&nbsp;″</td>';	 
			var longtHtmlEnable=
				'<td style="text-align:right"><label style="margin-right:5px;font-weight:normal">'+xLabel+'</label></td>'
				+'<td colspan="3"><input type="text" id="longtD" maxlength="3"' 
				+'	style="width:219px;height:25px" onchange="longtDegValidate()">&nbsp;°</td>';			
			var latHtmlEnable=	
				'<td style="text-align:right"><label style="margin-right:5px;font-weight:normal">'+yLabel+'</label></td>'
				+'<td colspan="3"><input type="text" id="latD" maxlength="2"' 
				+'	style="width:219px;height:25px" onchange="latDegValidate()">&nbsp;°</td>';	
			if(locationType=="optionDMS"){	
				$("#longtTR").html(longtHtmlAble);
				$("#latTR").html( latHtmlAble);
				var longtD=document.getElementById("longtD");
				var latD=document.getElementById("latD");
				longtD.maxLength=3;
				latD.maxLength=3;
				var lontDval=parseInt(document.getElementById("longtD").value);
				if(isNaN(lontDval)===false)
					document.getElementById("longtD").value=lontDval;
				else
					document.getElementById("longtD").value='';				
				var latDval=parseInt(document.getElementById("latD").value);
				if(isNaN(latDval)===false)
					document.getElementById("latD").value=latDval;
				else
					document.getElementById("latD").value='';				
			}else{
				$("#longtTR").html(longtHtmlEnable);
				$("#latTR").html(latHtmlEnable);
				var longtD=document.getElementById("longtD");
				var latD=document.getElementById("latD");
				longtD.maxLength=10;
				latD.maxLength=10;			
				var lontDval=parseFloat(longtD.value);
				if(isNaN(lontDval)===false&&lontDval<180&&lontDval>50)
					document.getElementById("longtD").value=lontDval;
				else
					document.getElementById("longtD").value='';
				
				var latDval=parseFloat(latD.value);
				if(isNaN(latDval)===false&&latDval>3&&latDval<60)
					document.getElementById("latD").value=latDval;
				else
					document.getElementById("latD").value='';				
			}
		}
	
		function longtDegValidate(){
			var locationType=$("#locationType").val();
			
			if(locationType=="optionDMS"){
				var lontDval=parseInt(document.getElementById("longtD").value);
				if(isNaN(lontDval)===true || lontDval>135 ||lontDval<73){
					document.getElementById("longtD").value="";
					layer.tips('请输入有效值', '#longtD', {
						  tips: [3, '#009f95']
					});
					return false;
				}
			}else if(locationType=="optionDegree"){
				var lontDval=parseFloat(document.getElementById("longtD").value);
				if(isNaN(lontDval)===true || lontDval>135 ||lontDval<73){
					document.getElementById("longtD").value="";
					//document.getElementById("longtD").setAttribute("placeholder","请输入有效值");
					layer.tips('请输入有效值', '#longtD', {
						  tips: [3, '#009f95']
					});
					return false;
				}else{
					document.getElementById("longtD").value=lontDval;
				}
			}else{
				var lontStr=document.getElementById("longtD").value;
				var lontDval=parseFloat(lontStr);
				if(isNaN(lontDval)){
					layer.tips('请输入有效值', '#longtD', {
						  tips: [3, '#009f95']
					});
					return false;
				}else{
					if(lontDval<1000000){
						layer.tips('横坐标需包含带号', '#longtD', {
							  tips: [3, '#009f95']
						});
						return false;
					}
					else if(lontStr.substring(0,2)!=='20'&&lontStr.substring(0,2)!=='21'){
						layer.tips('横坐标带号错误', '#longtD', {
							  tips: [3, '#009f95']
						});
						return false;
					}
				}	
			}
			return true;
		}
		
		//-分
		function longtMValidate(){
			mmValidate("longtM");
		}
		
		//-秒
		function longtSValidate(){
			ssValidate("longtS");
		}
		
		/*纬度输入验证*/
		//-度
		function latDegValidate(){
			var locationType=$("#locationType").val();
			if(locationType=="optionDMS"){
				var latDval=parseInt(document.getElementById("latD").value);
				if(isNaN(latDval)===true || latDval>54 ||latDval<3){
					document.getElementById("latD").value="";
					//document.getElementById("latD").setAttribute("placeholder","请输入有效值");
					layer.tips('请输入有效值', '#latD', {
						  tips: [3, '#009f95']
					});
					return false;
				}
			}else if(locationType=="optionDegree"){
				var latDval=parseFloat(document.getElementById("latD").value);
				if(isNaN(latDval)===true || latDval>54 ||latDval<3){
					document.getElementById("latD").value="";
					//document.getElementById("latD").setAttribute("placeholder","请输入有效值");
					layer.tips('请输入有效值', '#latD', {
						  tips: [3, '#009f95']
					});
					return false;
				}else{
					document.getElementById("latD").value=latDval;
				}
			}else{
				var latDval=parseFloat(document.getElementById("latD").value);
				if(isNaN(latDval)||latDval<1000000){
					layer.tips('请输入有效值', '#latD', {
						  tips: [3, '#009f95']
					});
					return false;
				}
			}
			return true;
		}
		
		//-分
		function latMValidate(){
			mmValidate("latM");
		}
		
		//-秒
		function latSValidate(){
			ssValidate("latS");
		}

		//经纬度分验证
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
				return true;
			}
		}
		//经纬度秒验证
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
		function xySumbit(){
			if(!paramsValidate())
				return;
			var locationType=$("#locationType").val();
			var longtD=$("#longtD").val();
			var latD=$("#latD").val();
			longtD=parseFloat(longtD);
			latD=parseFloat(latD);
			if(locationType=="optionDMS"){
				var longtM=$("#longtM").val();
				var longtS=$("#longtS").val();
				if(longtM !==null&&longtM !==""){
					longtD+=parseFloat(longtM)/60;
				}
				if(longtS !==null&&longtS !==""){
					longtD+=parseFloat(longtS)/3600;
				}
				longtD=longtD.toFixed(6);
				var latM=$("#latM").val();
				var latS=$("#latS").val();
				if(latM !==null&&latM !==""){
					latD+=parseFloat(latM)/60;
				}
				if(latS !==null&&latS !==""){
					latD+=parseFloat(latS)/3600;
				}
				latD=latD.toFixed(6);
			}
	        parent.$("#xLocation").val("");
	        parent.$("#yLocation").val("");
	        parent.$("#xLocation").val(longtD);
	        parent.$("#yLocation").val(latD);
	        return true;	        
		}

		function paramsValidate(){
			if(!longtDegValidate()){
				return false;
			}	
			if(!latDegValidate()){
				return false;
			}
			var locationType=$("#locationType").val();
			if(locationType=="optionDMS"){
				if(!mmValidate("longtM")){
					return false;
				}
				if(!ssValidate("longtS")){
					return false;
				}
				if(!mmValidate("latM")){
					return false;
				}
				if(!ssValidate("latS")){
					return false;
				}	
			}
			return true;
		}
		
		
	</script>
</body>
</html>