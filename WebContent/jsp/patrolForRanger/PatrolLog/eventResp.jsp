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
			<div id="eveDetail" class="col-md-12 column" style="padding-left:10px;padding-right:10px;">
				<table class="table table-condensed table-bordered" style="margin-top:5px;">

					<tbody>
						<tr class="info">
							<td>事件描述</td>
							<!-- <td>{{ message.eventText }}</td> -->
							<td id="eventText"></td>
							<td>照片</td>
							<td id="photoBtn"><img onclick="viewPhoto()"
								src="/ResourceMonitor/images/indexpage/Photo.png" style="cursor:pointer;"> <img  id="eventPhoto" src=""
								style="width: 100px;display: none;"></td>
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
							<!-- <td>{{ message.happenTime }}</td> -->
							<td id="happenTime"></td>
							<td>管护人员</td>
							<td id="reportPeople"></td>
							<!-- <td>{{ message.reportPeople }}</td> -->
						</tr>
						<tr>
							<td>部门</td>
							<td id="departmentCode"></td>
							<!-- <td>{{ message.departmentCode }}</td> -->
							<td>工程类别</td>
							<td id="projectType"></td>
							<!-- <td>{{ message.projectType }}</td> -->
						</tr>
						<tr class="info">
							<td>经度</td>
							<td id="longitude"></td>
							<!-- <td>{{ message.longitude }}</td> -->
							<td>纬度</td>
							<td id="latitude"></td>
							<!-- <td>{{ message.latitude }}</td> -->
						</tr>
						<tr >
							<td>x坐标</td>
							<td id="xCoor"></td>
							<!-- <td>{{ message.xCoor }}</td> -->
							<td>y坐标</td>
							<td id="yCoor"></td>
							<!-- <td>{{ message.yCoor }}</td> -->
						</tr>
						<tr class="info">
							<td>上报时间</td>
							<td id="uploadTime"></td>
							<!-- <td>{{ message.uploadTime }}</td> -->
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="col-md-12 column" style="padding-left:10px;padding-right:10px;">
				
				<label for="name">回复内容</label>
				<textarea class="form-control" id="respSuggestion" rows="4" placeholder="请在此输入回复内容..."></textarea>
			</div>
			<!-- 隐藏字段 -->
			<div style="display: none;">
				<input type="text" id="eventID">
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="/ResourceMonitor/js/myJS/patrolForRanger/PatrolLog/eventResp.js"></script>
</html>