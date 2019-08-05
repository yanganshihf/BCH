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
#monthSelector td , #forcastData td,#forcastData2 td{
	text-align: center;
	border:0;
}
#monthSelector td{
	padding: 15px;
}
body{
	background-color: #F0F0F0;
	font-family: "Microsoft YaHei";
	font-size: 15px;
}
#containerimg div{
	position:absolute; 
	border-radius: 50%;
	z-index:99999;
	text-align:center;
}
#containerimg .eventDiv{
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
	<div id="monthSelector" style="height: 70px; padding: 10px;">
		<table class="table table-bordered table-condensed"
			style="margin: 0px; background-color: #FFFFFF;">
			<tr>
				<td>年份</td> 
				<td style="padding: 0px;width: 110px;padding-top: 10px;"><select id="yearSelector" class="form-control"
					style="width: 110px;margin-right: 10px; border: 0;">
						<option value="2018">2018</option>
						<option value="2019">2019</option>
				</select></td>
				<td class="yuefen"  id="0" style="cursor:pointer" ><div>全年</div></td>
				<td class="yuefen" id="01" style="cursor: not-allowed;"><div>&nbsp;1月&nbsp;</div></td>
				<td class="yuefen" id="02" style="cursor: not-allowed;"><div>&nbsp;2月&nbsp;</div></td>
				<td class="yuefen" id="03" style="cursor: not-allowed;"><div>&nbsp;3月&nbsp;</div></td>

				<td class="yuefen" id="04" style="cursor: not-allowed;"><div>&nbsp;4月&nbsp;</div></td>
				<td class="yuefen" id="05" style="cursor: not-allowed;"><div>&nbsp;5月&nbsp;</div></td>
				<td class="yuefen" id="06" style="cursor: not-allowed;"><div>&nbsp;6月&nbsp;</div></td>
				<td class="yuefen" id="07" style="cursor: not-allowed;"><div>&nbsp;7月&nbsp;</div></td>
				<td class="yuefen" id="08" style="cursor: not-allowed;"><div>&nbsp;8月&nbsp;</div></td>

				<td class="yuefen" id="09" style="cursor: not-allowed;"><div>&nbsp;9月&nbsp;</div></td>
				<td class="yuefen" id="10" style="cursor: not-allowed;"><div>10月</div></td>
				<td class="yuefen" id="11" style="cursor: not-allowed;"><div>11月</div></td>
				<td class="yuefen" id="12" style="cursor: not-allowed;"><div>12月</div></td>
			</tr>
		</table>
	</div>
	<div id="content" style="padding:10px;padding-top: 5px;">
		<div id="container" style="height:100%;padding:0;padding-right: 5px;" class="col-xs-5 column">
			<div id="EventImage" style="width:100%;height:100%;background-color: #FFFFFF;border: 1px solid #ddd;">
				<div id="containerimg" style="position:relative;height: 450px;text-align:center;" class="col-xs-12 column">
					<img id="conimg" src="/ResourceMonitor/images/timg.png" style="width:100%;height:100%;">
					<!-- <div id="eventDate" style="width:100%;font-size: large;font-weight:700;left:0;top:0;">2019年各单位累计上报事件</div> -->
					<div id="events1" class="eventDiv" style="left:43%;top:16%;">11</div>
					<div id="events2" class="eventDiv" style="left:43%;top:31%;">12</div>
					<div id="events3" class="eventDiv" style="left:56%;top:49%;">13</div>
					<div id="events4" class="eventDiv" style="left:36%;top:51%;">7</div>
					<div id="events5" class="eventDiv" style="left:10%;top:61%;">14</div>
					<div id="events6" class="eventDiv" style="left:60%;top:73%;">3</div>
					<!-- <a id="download" download= "累计上报事件" style="display:none">aa</a>			
					<div class="" id="download1" style="width:20px;height:20px;right:5px;top:5px;background:url(/ResourceMonitor/images/indexpage/down.png);background-repeat: no-repeat;"></div> -->
				</div>
			</div>
		</div>
		<div id="container2" style="height:100%;padding:0;padding-left: 5px;" class="col-xs-7 column">
			<div id="forcastData" style="height: 86px;background-color: #FFFFFF;border:0;padding: 0px;margin-bottom:6px;">
				<table class="table table-bordered table-condensed" style="height: 100%;margin: 0px; text-align: center; background-color: #FFFFFF;">
					<tr>
						<td id="hulinyuan" style="height: 73px;width:25%;padding-right:5px">
							<div style="width:100%;height:100%;background-color: #E25352;color:#ffffff;border-radius:5px;padding-top: 5px;">
								<span style="font-size:1.6em;">2019年3月</span><br>护林员巡检信息
							</div>
						</td>
						<td id="chuqinrenci" style="height: 73px;width:25%;padding-right:5px">
							<div style="width:100%;height:100%;background-color: #99C836;color:#ffffff;border-radius:5px;padding-top: 5px;">
								<span style="font-size:1.6em;">200人</span><br>出勤人次
							</div>
						</td>
						<td id="guijilicheng" style="height: 73px;width:25%;padding-right:5px">
							<div style="width:100%;height:100%;background-color: #DA7137;color:#ffffff;border-radius:5px; padding-top: 5px;">
								<span style="font-size:1.6em;">65公里</span><br>轨迹总里程
							</div>
						</td>
						<td id="shangbaoshijian" style="height: 73px;width:25%;padding-right:5px">
							<div style="width:100%;height:100%;background-color: #FF9F7A;color:#ffffff;border-radius:5px;padding-top: 5px;">
								<span style="font-size:1.6em;">60件</span><br>上报事件条数
							</div>
						</td>
					</tr>
				</table>
			</div>
			
			<div id="forcastData2" style="height: 86px;background-color: #FFFFFF;border:0;padding: 0px;margin-bottom:6px;">
				<table class="table table-bordered table-condensed" style="height: 100%;margin: 0px; text-align: center; background-color: #FFFFFF;">
					<tr>
						<td id="wurenji" style="height: 73px;width:25%;padding-right:5px">
							<div style="width:100%;height:100%;background-color: #E25352;color:#ffffff;border-radius:5px;padding-top: 5px;">
								<span style="font-size:1.6em;">2019年3月</span><br>无人机巡检信息
							</div>
						</td>
						<td id="chuqinjiaci" style="height: 73px;width:37.5%;padding-right:5px">
							<div style="width:100%;height:100%;background-color: #E25A94;color:#ffffff;border-radius:5px;padding-top: 5px;">
								<span style="font-size:1.6em;">200架</span><br>总出动架次
							</div>
						</td>
						<td id="feixinglicheng" style="height: 73px;width:37.5%;padding-right:5px">
							<div style="width:100%;height:100%;background-color: #2E9AD6;color:#ffffff;border-radius:5px; padding-top: 5px;">
								<span style="font-size:1.6em;">200公里</span><br>总飞行总里程
							</div>
						</td>
					</tr>
				</table>
			</div>
			
			<div id="charts" style="">
				<div style="height:100%;padding:0; padding-right:3px;" class="col-xs-6 column">
					<div id="charts1" style="border: 1px solid #dddddd;height: 100%;background-color: #FFFFFF;">
					</div>	
				</div>
				<div style="height: 100%;padding:0;padding-left:3px;" class="col-xs-6 column">
					<div id="charts2" style="border: 1px solid #dddddd;height: 100%;background-color: #FFFFFF;" >
					</div>
				</div>
			</div>
			
		</div>
	</div>

	 
</body>

<script type="text/javascript" src="/ResourceMonitor/js/myJS/commandForFire/BaseStationMap/survey.js"></script>

</html>