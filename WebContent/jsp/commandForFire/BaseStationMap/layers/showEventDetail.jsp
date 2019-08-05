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

td {
	text-align: center;
}
*{
 overflow: no;
}
.table td:nth-child(1),.table td:nth-child(3){
	font-weight:700;
}
</style>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/js/viewer-0.5.1/viewer.min.css" />
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/css/bootstrap.css" />
<script
	src="${pageContext.request.contextPath}/js/jquery-2.1.4/jquery.js"
	type="text/javascript"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
<%-- <script type="text/javascript"
	src="${pageContext.request.contextPath}/js/layer/layer-v3.0.3/layer/layer.js"></script> --%>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/vue.min.js"></script>
<script
	src="${pageContext.request.contextPath}/js/viewer-0.5.1/viewer.min.js"
	type="text/javascript"></script>
</head>
<body>
	<div class="container">
		<div class="row clearfix">
			<div id="eveDetail" class="col-md-12 column" style="padding:5px 10px 0 10px">
				<table class="table table-condensed table-bordered" style="margin-bottom:0;"  v-cloak>
					<tbody>
						<tr class="info">
							<td>事件描述</td>
							<td>{{ message.eventText }}</td>
							<td>照片</td>
							<td id="photoBtn"><img onclick="viewPhoto()" 
								src="/ResourceMonitor/images/indexpage/Photo.png" style="cursor:pointer;"> <img  id="eventPhoto" src=""
								style="width: 100px;display: none;"></td>
						</tr>
						<tr >
							<td>视频</td>
							<td id="vedioBtn"><img onclick="vedioPlayer()" 
								src="/ResourceMonitor/images/indexpage/Video.png" style="cursor:pointer;"> <input type="hidden"
								id="vedioName" v-model="message.eventVedio"></td>

							<td>录音</td>
							<td id="redioBtn"><img onclick="redioPlayer()" 
								src="/ResourceMonitor/images/indexpage/Recording.png" style="cursor:pointer;"> <input type="hidden"
								id="redioName" v-model="message.eventRedio"></td>
						</tr>
						<tr class="info">
							<td>发现时间</td>
							<td>{{ message.happenTime }}</td>
							<td>管护人员</td>
							<td>{{ message.reportPeople }}</td>
						</tr>
						<tr>
							<td>部门</td>
							<td>{{ message.departmentCode }}</td>
							<td>工程类别</td>
							<td>{{ message.projectType }}</td>
						</tr>
						<!-- <tr class="info">
							<td>回复人</td>
							<td>{{ message.responsePeople }}</td>
							<td>回复内容</td>
							<td>{{ message.responseSuggestion }}</td>
						</tr> -->
						<tr class="info">
							<td>经度</td>
							<td>{{ message.longitude }}</td>
							<td>纬度</td>
							<td>{{ message.latitude }}</td>
						</tr>
						<tr >
							<td>x坐标</td>
							<td>{{ message.xCoor }}</td>
							<td>y坐标</td>
							<td>{{ message.yCoor }}</td>
						</tr>
						<tr class="info">
							<td>上报时间</td>
							<td>{{ message.uploadTime }}</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>回复人员</td>
							<td>{{ message.responsePeople }}</td>
							<td>回复时间</td>
							<td>{{ message.responseTime }}</td>
						</tr>
						<tr class="info" style="height: 80px;">
							<td style="padding-top: 30px;">回复内容</td>
							<td colspan="3">{{ message.responseSuggestion }}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div style="display: none;">
				<input type="text" id="eventID">
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="/ResourceMonitor/js/myJS/commandForFire/BaseStationMap/showEventDetail.js"></script>
</html>