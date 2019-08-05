<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>Insert title here</title>
<style>
	[v-cloak] {
        display: none !important;
    }
    tr {
    	height: 40px;
    	text-align: center;
    }
    td {
    	padding-top: 10px;
    } 
.table td:nth-child(1),.table td:nth-child(3){
	font-weight:700;
}
</style>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/css/bootstrap.css" />
<script
	src="${pageContext.request.contextPath}/js/jquery-2.1.4/jquery.js"
	type="text/javascript"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
	
<script type="text/javascript"
src="${pageContext.request.contextPath}/js/vue.min.js"></script>
</head>
<body>
	<div class="container">
		<div class="row clearfix">
			<div id="eveDetail" class="col-md-12 column">
				<table class="table table-condensed table-bordered" v-cloak style="margin-top:15px;margin-bottom:0;">
					
					<tbody>
						<!-- <tr>
							<td>事件类型</td>
							<td>{{ message.eventText }}</td>
							<td>发生描述</td>
							<td>{{ message.eventText }}</td>
						</tr> -->
						<tr  class="info">
							<td style="padding-top: 10px;">部门</td>
							<td style="padding-top: 10px;">{{ message.departmentCode }}</td>
							<td style="padding-top: 10px;">管护人员</td>
							<td style="padding-top: 10px;">{{ message.personName }}</td>
						</tr>
						<!-- <tr >
							<td>照片</td>
							<td>{{ message.eventPhoto }}</td>
							<td>录音</td>
							<td>{{ message.eventVedio }}</td>
						</tr>
						<tr  class="info">
							<td>视频</td>
							<td>{{ message.eventRedio }}</td>
							<td></td>
							<td></td>
						</tr> -->
						<tr >
							<td style="padding-top: 10px;">上传时间</td>
							<td style="padding-top: 10px;">{{ message.reportTime }}</td>
							<td style="padding-top: 10px;">状态</td>
							<td style="padding-top: 10px;">{{ message.hasReaded }}</td>
						</tr>
						<!-- <tr class="info">
							<td>回复人</td>
							<td>{{ message.responsePeople }}</td>
							<td>回复内容</td>
							<td>{{ message.responseSuggestion }}</td>
						</tr> -->
						<tr class="info">
							<td style="padding-top: 10px;">经度</td>
							<td style="padding-top: 10px;">{{ message.longitude }}</td>
							<td style="padding-top: 10px;">纬度</td>
							<td style="padding-top: 10px;">{{ message.latitude }}</td>
						</tr>
						<tr >
							<td style="padding-top: 10px;">x坐标</td>
							<td style="padding-top: 10px;">{{ message.xCoor }}</td>
							<td style="padding-top: 10px;">y坐标</td>
							<td style="padding-top: 10px;">{{ message.yCoor }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</body>
	<script type="text/javascript" src="/ResourceMonitor/js/myJS/patrolForRanger/PatrolLog/SosDetail.js"></script>
</html>