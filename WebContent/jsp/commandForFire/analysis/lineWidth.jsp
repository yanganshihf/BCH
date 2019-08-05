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
			    	<td colspan="4">
				    	<select id="locationType" onchange="onCoorTypeChanged()" style="width:80px;height:25px;text-align:center">
				    		<option value="optionDMS">度分秒</option>
				    		<option value="optionDegree">十进制度</option>
				    	</select>
				    	<button type="button" style="margin-left:0px;background-color:#058563;border-color:#058563;" class="btn btn-primary btn-sm" onclick="openEventChoice()">选择已录入事件</button>    	
				   		<input type="checkbox" id="screen_point" style="margin-left:10px;"/>屏幕选点
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
				    <td style="width:50px;" rowspan="2">
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
				    	style="width:60px;height:25px" onchange="latSValidate()">&nbsp;″ 
				    </td>
				</tr>
				<tr>
					<td style="text-align:right;"><label style="margin-right:10px;">隔离带宽度</label></td>
					<td colspan="4"><input type="text" id="radius" maxlength="5" value="25" 
						onchange="radiusValidate()" style="width:220px;height:25px">m
						</td>
				</tr>
			</tbody>
		</table>
	</div>
	
	<script>
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
	    //选择事件
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
		function openEventChoice(){
			parent.analysis.funOpenEventChoice();
			parent.analysis.pointType='';
		}
				
		/*控制分、秒输入可用性*/
		/*控制十进制度到度的整数转换*/
		function onCoorTypeChanged(){
			var locationType=$("#locationType").val();
			var xLabel,yLabel;
			var angle80 = '';
			if(locationType=="optionDMS"){
				xLabel='经度';
				yLabel='纬度';
			}else if(locationType=="optionDegree"){
				xLabel='经度';
				yLabel='纬度';
				angle80='°';
			}
			var longtHtmlAble=
				'<td style="text-align:right"><label style="margin-right:10px;font-weight:normal">'+xLabel+'</label></td>'
				+'<td style="width:80px;"><input type="text" id="longtD" maxlength="3"' 
				+'	style="width:60px;height:25px" onchange="longtDegValidate()">&nbsp;°</td>'
				+'<td style="width:80px;"><input type="text" id="longtM" maxlength="2"' 
				+'	style="width:60px;height:25px" onchange=longtMValidate()>&nbsp;′</td>'
				+'<td style="width:80px;"><input type="text" id="longtS" maxlength="4"' 
				+'	style="width:60px;height:25px" onchange="longtSValidate()">&nbsp;″</td>'
				+'<td style="width:50px;" rowspan="2">'
				+'<img src="../../../images/indexpage/dingwei.png" onclick="eventLocator()"' 
				+' style="vertical-align:middle;width:16px;height:19px;margin-left:10px;margin-left:0px;"/>'
				+'</td>';;
		    
		    var latHtmlAble=    
				'<td style="text-align:right"><label style="margin-right:10px;font-weight:normal">'+yLabel+'</label></td>'
				+'<td><input type="text" id="latD" maxlength="2"' 
				+'	style="width:60px;height:25px" onchange="latDegValidate()">&nbsp;°</td>'
				+'<td><input type="text" id="latM" maxlength="2"' 
				+'	style="width:60px;height:25px" onchange="latMValidate()">&nbsp;′</td>'
				+'<td ><input type="text" id="latS" maxlength="4"' 
				+'	style="width:60px;height:25px" onchange="latSValidate()">&nbsp;″'
				+'</td>';

			var longtHtmlEnable=
				'<td style="text-align:right;width:50px"><label style="margin-right:10px;font-weight:normal">'+xLabel+'</label></td>'
				+'<td  style="width:240px"><input type="text" id="longtD" maxlength="3"' 
				+'	style="height:25px;width:220px;" onchange="longtDegValidate()">&nbsp;'+angle80+'</td>'
				+'<td style="width:50px;" rowspan="2">'
				+'<img src="../../../images/indexpage/dingwei.png" onclick="eventLocator()"' 
				+' style="vertical-align:middle;width:16px;height:19px;margin-left:10px;margin-left:0px;"/>'
				+'</td>';
			    
		    var latHtmlEnable=    
				'<td style="text-align:right;width:50px"><label style="margin-right:10px;font-weight:normal">'+yLabel+'</label></td>'
				+'<td  style="width:240px"><input type="text" id="latD" maxlength="2"' 
				+'	style="height:25px;width:220px;" onchange="latDegValidate()">&nbsp;'+angle80
				+'</td>';
				
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
			}else if(locationType=="optionDegree"){
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
		
		function paramsValidate(){
			if(!locateValidate()){
				return false;
			}			
			if(!radiusValidate()){
				return false;
			}
			return true;
		}
	</script>
</body>
</html>