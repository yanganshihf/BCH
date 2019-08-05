<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html>

<head>
<meta charset="UTF-8">
<title></title>

<script type="text/javascript" src="/ResourceMonitor/js/echarts.js"></script>
<script type="text/javascript" src="/ResourceMonitor/js/html2canvas.min.js"></script>
<style type="text/css">
#monthSelector td , #forcastData td{
	text-align: center;
	border:0;
}
#monthSelector td{
	padding-top: 7px;
}
body{
	background-color: #F0F0F0;
	font-family: "Microsoft YaHei";
	font-size: 15px;
}
#container3 div{
	position:absolute; 
	border-radius: 50%;
	z-index:99999;
	text-align:center;
}
#container3 .eventDiv{
	width:35px;
	height:35px;
	background-color:#FF6600;
	line-height:35px;
	color:#fff;
	box-shadow: 3px 2px 6px #4b4b4b;
	transform: rotate(-3deg);
	-webkit-transform: rotate(-3deg);
	-moz-transform: rotate(-3deg);
	-o-transform: rotate(-3deg);
	-ms-transform: rotate(-3deg);
}

</style>
</head>


<body>
	<div id="monthSelector" style="height: 40px; padding: 3px;">
		<table class="table table-bordered table-condensed table-hover"
			style="margin: 0px; background-color: #FFFFFF;">
			<tr>
				<td>年份</td> 
				<td style="padding: 0px; width: 110px;"><select id="yearSelector" class="form-control"
					style="width: 110px;margin-right: 10px; border: 0;">
						<option value="2018">2018</option>
						<option value="2019">2019</option>
				</select></td>
				<td class="yuefen" id="01" style="cursor: not-allowed;">&nbsp;1月&nbsp;</td>
				<td class="yuefen" id="02" style="cursor: not-allowed;">&nbsp;2月&nbsp;</td>
				<td class="yuefen" id="03" style="cursor: not-allowed;">&nbsp;3月&nbsp;</td>

				<td class="yuefen" id="04" style="cursor: not-allowed;">&nbsp;4月&nbsp;</td>
				<td class="yuefen" id="05" style="cursor: not-allowed;">&nbsp;5月&nbsp;</td>
				<td class="yuefen" id="06" style="cursor: not-allowed;">&nbsp;6月&nbsp;</td>
				<td class="yuefen" id="07" style="cursor: not-allowed;">&nbsp;7月&nbsp;</td>
				<td class="yuefen" id="08" style="cursor: not-allowed;">&nbsp;8月&nbsp;</td>

				<td class="yuefen" id="09" style="cursor: not-allowed;">&nbsp;9月&nbsp;</td>
				<td class="yuefen" id="10" style="cursor: not-allowed;">10月</td>
				<td class="yuefen" id="11" style="cursor: not-allowed;">11月</td>
				<td class="yuefen" id="12" style="cursor: not-allowed;">12月</td>
				<td class="yuefen"  id="0" style="cursor:pointer" >全年</td>
			</tr>
		</table>
	</div>

	<div id="forcastData" style="height: 86px; padding-top: 2px;padding-left:3px;padding-right:3px;margin-bottom: 3px;">
		<table class="table table-bordered table-condensed table-hover"
			style="margin: 0px; text-align: center; background-color: #FFFFFF;">

			<tr>
				<td id="shujuzonglan" style="height: 80px;width:16.6%; background-color: #E25352; color:#ffffff;border-right: 1px solid #f0f0f0;border-bottom: 1px solid #dddddd;border-radius:5px;"><p></p>数据总览</td>
				<td id="chuqinrenci" style="height: 80px;width:16.6%;background-color: #99C836; color:#ffffff;border-bottom: 1px solid #dddddd;border-right: 1px solid #f0f0f0;border-left: 2px solid #f0f0f0;border-radius:5px;"><p
					style="color: #007862;"></p>出勤人次</td>
				<td id="leijishichang" style="height: 80px;width:16.6%;background-color: #DA7137; color:#ffffff;border-bottom: 1px solid #dddddd;border-right: 1px solid #f0f0f0;border-left: 2px solid #f0f0f0;border-radius:5px;"><p
					style="color: #007862;"></p>累计时长</td>
				<td id="leijilicheng" style="height: 80px;width:16.6%;background-color: #FF9F7A; color:#ffffff;border-bottom: 1px solid #dddddd;border-right: 1px solid #f0f0f0;border-left: 2px solid #f0f0f0;border-radius:5px;"><p
					style="color: #007862;"></p>累计里程</td>
				<td id="shangbaoshijian" style="height: 80px;width:16.6%;background-color: #E25A94; color:#ffffff;border-bottom: 1px solid #dddddd;border-right: 1px solid #f0f0f0;border-left: 2px solid #f0f0f0;border-radius:5px;"><p
					style="color: #007862;"></p>上报事件</td>
				<td id="shangchuanzhaopian" style="height: 80px;width:16.6%;background-color: #2E9AD6; color:#ffffff;border-bottom: 1px solid #dddddd;border-left: 2px solid #f0f0f0;border-radius:5px;"><p
					style="color: #007862;"></p>上传照片</td>
			</tr>
		</table>
	</div>
	<div id="charts" style="background-color: #FFFFFF;margin-left:4px;margin-right:5px;margin-top:1px;">
		<div id="container" style="border-top: 1px solid #dddddd;border-right: 1px solid #dddddd;height: 100%;padding-left:5px;padding-right:0px;" class="col-xs-4 column">
		</div>
		<div id="container2" style="border-top: 1px solid #dddddd;border-left: 5px solid #f0f0f0;height: 100%;padding-right:5px;padding-left:0px;" class="col-xs-4 column">
		</div>
		<div id="container3" style="position:relative;border-top: 1px solid #dddddd;border-left: 5px solid #f0f0f0;height: 100%;padding-right:5px;padding-left:0px;text-align:center;" class="col-xs-4 column">
			<img id="conimg" src="/ResourceMonitor/images/timg.png" style="width:100%;height:100%;">
			<div id="eventDate" style="width:100%;font-size: large;font-weight:700;left:0;top:0;">2019年各单位累计上报事件</div>
			<div id="events1" class="eventDiv" style="left:43%;top:16%;">0</div>
			<div id="events2" class="eventDiv" style="left:43%;top:31%;">0</div>
			<div id="events3" class="eventDiv" style="left:56%;top:49%;">0</div>
			<div id="events4" class="eventDiv" style="left:36%;top:51%;">0</div>
			<div id="events5" class="eventDiv" style="left:10%;top:61%;">0</div>
			<div id="events6" class="eventDiv" style="left:60%;top:73%;">0</div>
			<a id="download" download= "累计上报事件" style="display:none">aa</a>			
			<div class="" id="download1" style="width:20px;height:20px;right:5px;top:5px;background:url(/ResourceMonitor/images/indexpage/down.png);background-repeat: no-repeat;cursor: pointer;"></div>
			<div id="downTitle" style="display:none;right:5px;top: 23px;color: #37a2da;font-size: 12px;">保存</div>
		</div>
	</div>

</body>

<script type="text/javascript" src="/ResourceMonitor/js/myJS/patrolForRanger/survey/survey.js"></script>

</html>