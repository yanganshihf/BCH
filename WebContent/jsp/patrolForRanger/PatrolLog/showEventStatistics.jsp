<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>事件统计</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="/ResourceMonitor/js/echarts.js"></script>
</head>

<style type="text/css">
#table {
	margin-bottom:0px;
	margin-top: 2px;
}
#table .tdone{
	/* width:100%; */
	height:36px;
	border: 1px solid #ddd;
	padding-left: 16px;
	border-right: 0;
}
#table .tdThree{
	/* width:100%; */
	height:36px;
	border: 1px solid #ddd;
	border-left:0;
	padding-right: 16px;
}
#table .tdtwo{
	width:100%;
	/* border: 1px solid #ddd; */
}
#table .tdwidth{
	padding: 5px;
    padding-right: 0px;
    padding-left: 7px;
    text-align: center;
}
.form-control {
	height: 22px;
	font-size: 14px;
	padding-top: 0px;
	padding-bottom: 0px;
	width:140px;
}
.btn-default {
	height: 22px;
	font-size: 14px;
	padding: 0 12px;
	margin-left: 8px;
}
.layui-layer-btn .layui-layer-btn0{border-color:#058563;background-color:#058563;color:#fff}
</style>
<body>
	<table class="table" id="table">
			<tbody>
				<tr>
				 <td class="tdone">
				 	<div style="display:flex;">
				 		<select id="statistics" class="form-control" style="width:210px;padding:0;">
	      					<option value="1">各类上报事件数量统计</option>
	      					<option value="2">各单位上报事件数量统计</option>
	      					<option value="3">年度各月份上报事件数量统计</option>
	      					<option value="4">各类上报事件数量年度对比</option>
	      					<option value="5">各单位上报事件数量年度对比</option>
	      				</select>
	      				<button type="button" class="btn btn-default" id="submit" title="查询">
							<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
						</button>
						<input style="display:none;" id="department">
						<input style="display:none;" id="startTime">
						<input style="display:none;" id="endTime">
					</div>
	      		</td>
	      		 <td class="tdThree">
						<button type="button" class="btn btn-default" id="one" style="float: right; padding: 0 3px;" title="地图展示">
							<img src="/ResourceMonitor/images/indexpage/send.png" class="" alt="xiazai">
						</button>
						<button type="button" class="btn btn-default" id="two" style="float: right;padding: 0 3px;" title="折线图">
							<img src="/ResourceMonitor/images/indexpage/send.png" class="" alt="xiazai">
						</button>
						<button type="button" class="btn btn-default" id="three" style="float: right;padding: 0 3px;" title="饼状图">
							<img src="/ResourceMonitor/images/indexpage/send.png" class="" alt="xiazai">
						</button>
						<button type="button" class="btn btn-default" id="four" style="float: right;padding: 0 3px;" title="柱状图">
							<img src="/ResourceMonitor/images/indexpage/send.png" class="" alt="xiazai">
						</button>
				 </td>
				</tr>
				<tr><td class="tdtwo" colspan="2">
					<div id="charts" style="margin: auto 20%;">
						<div id="container" style="height: 100%;" class="">
						</div>
					</div>
				</td></tr>
			</tbody>
	</table>
</body>
<script type="text/javascript" src="/ResourceMonitor/js/myJS/patrolForRanger/PatrolLog/showEventStatistics.js"></script>
</html>