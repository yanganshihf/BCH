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
		<table style="font-size:14px;line-height:35px;margin-top:8px;margin-left:10px;text-align:left">
			<tbody>
				<tr>
					<td style="text-align:right;width:95px"><label style="margin-right:10px;">事件点坐标</label></td> 
			    	<td colspan="3" style="width:240px;">
				    	<select id="locationType" onchange="onCoorTypeChanged()" style="width:220px;height:25px;text-align:center">
				    		<option value="optionDMS">度分秒</option>
				    		<option value="optionDegree">十进制度</option>
				    		<!-- <option value="optionXian80">西安80坐标</option> -->
				    	</select>
				    </td>		    	
				</tr>
				<tr>
					<td style="text-align:right;width:95px"><label style="margin-right:10px;">选点方式</label></td> 
			    	<td colspan="3">
				    	<input type="checkbox" id="screen_point" style="margin-left:10px;" />屏幕选点
				    	&nbsp;&nbsp;
				    	<button type="button" id ="openEventChoice" style="margin-left:0px;background-color:#058563;border-color:#058563;" class="btn btn-primary btn-sm" onclick="openEventChoice()">选择已录入事件</button>
				    </td>		    	
				</tr>				
				<tr id="longtTR">
					<td style="text-align:right;"><label style="margin-right:10px;font-weight:normal">经度</label></td>
					<td style="width:80px;"><input type="text" id="longtD" maxlength="3" 
						style="width:60px;height:25px" onchange="longtDegValidate()">&nbsp;°</td>
				    <td style="width:80px;"><input type="text" id="longtM" maxlength="2" 
				    	style="width:60px;height:25px" onchange=longtMValidate()>&nbsp;′</td>
				    <td style="width:80px;"><input type="text" id="longtS" maxlength="4" 
				    	style="width:60px;height:25px" onchange="longtSValidate()">&nbsp;″</td>
				    <td style="width:20px;" rowspan="2">
				    	<img src="../../../images/indexpage/dingwei.png" onclick="eventLocator()" 
				    	style="vertical-align:middle;width:16px;height:19px;margin-left:10px;margin-left:0px;"/>
				    </td>				    	
				</tr>

				<tr id="latTR">
					<td style="text-align:right"><label style="margin-right:10px;font-weight:normal">纬度</label></td>
					<td ><input type="text" id="latD" maxlength="2" 
						style="width:60px;height:25px" onchange="latDegValidate()">&nbsp;°</td>
				    <td><input type="text" id="latM" maxlength="2" 
				    	style="width:60px;height:25px" onchange="latMValidate()">&nbsp;′</td>
				    <td ><input type="text" id="latS" maxlength="4" 
				    	style="width:60px;height:25px" onchange="latSValidate()">&nbsp;″</td>
				</tr>
				<tr>
					<td style="text-align:right;"><label style="margin-right:10px;">搜索半径</label></td>
					<td colspan="3"><input type="text" id="radius" maxlength="5" value="5000" 
						onchange="radiusValidate()" style="width:220px;height:25px">m</td>
				</tr>
				<tr>
					<td style="text-align:right;"><label style="margin-right:10px;">分析方式</label></td>
					<td colspan="3">				    	
					<select id="analysisWay"  style="width:220px;height:25px;text-align:center">
				    		<option value="highway">公路优先</option>
				    		<option value="shortest">距离最短</option>
				    </select></td>
				</tr>
			</tbody>
		</table>
	</div>
	
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
			var xLabel,yLabel;
			var angle80 = '';
			var locateImage = '';
			if(locationType=="optionDMS"){
				xLabel='经度';
				yLabel='纬度';
				locateImage='<td style="width:20px;" rowspan="2">'
			    	+'<img src="../../../images/indexpage/dingwei.png" onclick="eventLocator()"' 
			    	+'style="vertical-align:middle;width:16px;height:19px;margin-left:10px;margin-left:0px;"/></td>';
			}else if(locationType=="optionDegree"){
				xLabel='经度';
				yLabel='纬度';
				angle80='°';
				locateImage='<td style="width:20px;" rowspan="2">'
			    	+'<img src="../../../images/indexpage/dingwei.png" onclick="eventLocator()"' 
			    	+'style="vertical-align:middle;width:16px;height:19px;margin-left:10px;margin-left:0px;"/></td>';
			}else{
				xLabel='X(加带号)';
				yLabel='Y'
			}
			var longtHtmlAble=
				'<td style="text-align:right"><label style="margin-right:10px;font-weight:normal">'+xLabel+'</label></td>'
				+'<td style="width:80px;"><input type="text" id="longtD" maxlength="3"' 
				+'	style="width:60px;height:25px" onchange="longtDegValidate()">&nbsp;°</td>'
				+'<td style="width:80px;"><input type="text" id="longtM" maxlength="2"' 
				+'	style="width:60px;height:25px" onchange=longtMValidate()>&nbsp;′</td>'
				+'<td style="width:80px;"><input type="text" id="longtS" maxlength="4"' 
				+'	style="width:60px;height:25px" onchange="longtSValidate()">&nbsp;″</td>'+locateImage;
		    
		    var latHtmlAble=    
				'<td style="text-align:right"><label style="margin-right:10px;font-weight:normal">'+yLabel+'</label></td>'
				+'<td><input type="text" id="latD" maxlength="2"' 
				+'	style="width:60px;height:25px" onchange="latDegValidate()">&nbsp;°</td>'
				+'<td><input type="text" id="latM" maxlength="2"' 
				+'	style="width:60px;height:25px" onchange="latMValidate()">&nbsp;′</td>'
				+'<td ><input type="text" id="latS" maxlength="4"' 
				+'	style="width:60px;height:25px" onchange="latSValidate()">&nbsp;″</td>';

			var longtHtmlEnable=
				'<td style="text-align:right;width:50px"><label style="margin-right:10px;font-weight:normal">'+xLabel+'</label></td>'
				+'<td colspan="6" style="width:240px"><input type="text" id="longtD" maxlength="3"' 
				+'	style="height:25px;width:220px;" onchange="longtDegValidate()">&nbsp;'+angle80+'</td>'+locateImage;
				
			    
		    var latHtmlEnable=    
				'<td style="text-align:right;width:50px"><label style="margin-right:10px;font-weight:normal">'+yLabel+'</label></td>'
				+'<td colspan="6" style="width:240px"><input type="text" id="latD" maxlength="2"' 
				+'	style="height:25px;width:220px;" onchange="latDegValidate()">&nbsp;'+angle80+'</td>';
				
			if(locationType=="optionDMS"){
				$("#longtTR").html(longtHtmlAble);
				$("#latTR").html( latHtmlAble);
				var longtD=document.getElementById("longtD");
				var latD=document.getElementById("latD");
				$("#screen_point").attr("disabled",false);	
				$("#openEventChoice").attr("disabled",false);
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
			}else if(locationType=="optionDegree"){
				$("#screen_point").attr("disabled",false);
				$("#openEventChoice").attr("disabled",false);
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
			}else{
				$("#screen_point").attr("disabled",true);
				$("#screen_point").attr("checked",false);
				$("#openEventChoice").attr("disabled",true);
				parent.closeEventChoice();
				$("#longtTR").html(longtHtmlEnable);
				$("#latTR").html(latHtmlEnable);
				var longtD=document.getElementById("longtD");
				var latD=document.getElementById("latD");
				longtD.maxLength=8;
				latD.maxLength=7;
				var lontDval=parseFloat(longtD.value);
				if(isNaN(lontDval)===false&&lontDval>1000000&&lontDval<99999999)
					document.getElementById("longtD").value=lontDval;
				else
					document.getElementById("longtD").value='';
				
				var latDval=parseFloat(latD.value);
				if(isNaN(latDval)===false&&latDval>1000000&&latDval<9999999)
					document.getElementById("latD").value=latDval;
				else
					document.getElementById("latD").value='';					
			}
		}
		
		/*经度输入验证*/
		//-度
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
			var strVal= document.getElementById(inputId).value;
			if(strVal==""){
				strVal = "0";
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
		////经纬度秒验证
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
		
		function radiusValidate(){
			var regu=new RegExp("^[0-9]+$");
			var val=document.getElementById("radius").value;
			if(val===""){
				layer.tips('请输入有效值', '#radius', {
					  tips: [3, '#009f95']
				});
				return false;
			}else if(!regu.test(val)){
				document.getElementById("radius").value="";
				layer.tips('请输入有效值', '#radius', {
					  tips: [3, '#009f95']
				});
				return false;
			}else{
				document.getElementById("radius").value=parseInt(val);
				return true;
			}
		}
		
		function sumbit(){
			if(!paramsValidate())
				return;
			var locationType=$("#locationType").val();
			var longtD=$("#longtD").val();
			var latD=$("#latD").val();
			if(locationType!="optionXian80"){
				longtD=parseFloat(longtD);
				latD=parseFloat(latD);	
			}
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
			//var observerOffsetVal=parseInt(document.getElementById("offset").value);
			var radiusVal=parseInt(document.getElementById("radius").value);
			var closestFacilityParams={
				longtitude:longtD,
				latitude:latD,
				radius:radiusVal,
				analysisWay:$("#analysisWay").val()
			};
			parent.analysis.funDoClosestFacilityAna(closestFacilityParams);
		}

		function paramsValidate(){
			if(!locateValidate()){
				return false;
			}			
			if(!radiusValidate()){
				return false;
			}
			return true;
		}
		function openEventChoice(){
			parent.analysis.funOpenEventChoice();
			parent.analysis.pointType='';
		}
	    function eventLocator() {
			if(!locateValidate()){
				return;
			}
	    	var longtD=0;
	    	var latD=0;
			var locationType=$("#locationType").val();
			if(locationType=="optionDMS"){
				longtD=parseFloat($("#longtD").val());
				latD=parseFloat($("#latD").val());
				var longtM=$("#longtM").val();
				var longtS=$("#longtS").val();
				var latM=$("#latM").val();
				var latS=$("#latS").val();
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
				longtD=parseFloat($("#longtD").val());
				latD=parseFloat($("#latD").val());
			}
			parent.analysis.funEventLocator({lon:longtD,lat:latD});
	    } 	
		function locateValidate(){
			var locationType=$("#locationType").val();
			if(!longtDegValidate()){
				return false;
			}	
			if(locationType=="optionDMS"){
				if(!mmValidate("longtM")){
					return false;
				}
				if(!ssValidate("longtS")){
					return false;
				}
			}			
			if(!latDegValidate()){
				return false;
			}
			if(locationType=="optionDMS"){
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