<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/LaytableInclude.jsp"%>   
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<style type="text/css">
td {
	text-align: center;
}
</style>
<link rel="stylesheet" type="text/css"
   href="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/css/bootstrap.css" />
<script
   src="${pageContext.request.contextPath}/js/jquery-2.1.4/jquery.min.js"
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
           <div class="col-md-12 column">
               <table class="table table-bordered table-condensed">
                   <tbody>
                       <tr>
                           <td >照片</td>
                           <td id="photoBtn" onclick="viewPhoto()">
                               <!-- <img id="eventPhoto" style="width: 100px;height: 75px;" src="eventMedia/NoEventPhoto.png"> -->
                           	   <img id="eventPhoto" src="/ResourceMonitor/images/indexpage/Photo.png">
                           </td>
                       </tr>
                       <tr>
                           <td>音频</td>
                           <td id="redioBtn"  onclick="redioPlayer()">
                               <img id="redioName" src="/ResourceMonitor/images/indexpage/Recording.png">
                            	<input type="hidden"
								id="redioName" v-model="message.eventRedio">
                           </td>
                       </tr>
                       <tr>
                           <td>视频</td>
                           <td id="vedioBtn" onclick="vedioPlayer()">
                               <img id="vedio" src="/ResourceMonitor/images/indexpage/Video.png">
                               <input type="hidden"
								id="vedioName" v-model="message.eventVedio">
                           </td>
                       </tr>
                       <tr>
                           <td>单位</td>
                           <td id="department"></td>
                       </tr>
                       <tr>
                           <td>事件描述</td>
                           <td id="eventText"></td>
                       </tr>
                       <tr>
                           <td>发生时间</td>
                           <td id="happenTime"></td>
                       </tr>
                       <tr>
                           <td>上报人</td>
                           <td id="reportPeople"></td>
                       </tr>
                       
                       <tr>
                           <td>上报时间</td>
                           <td id="uploadTime"></td>
                       </tr>
                       <tr>
                           <td>电话</td>
                           <td id="mobile"></td>
                       </tr>
                       <tr>
                           <td>回复人</td>
                           <td id="responsePeople"></td>
                       </tr>
                       <tr>
                           <td>回复时间</td>
                           <td id="responseTime"></td>
                       </tr>
                       <tr>
                           <td>回复内容</td>
                           <td id="responseSuggestion"></td>
                       </tr>
                       <tr>
                           <td>经度</td>
                           <td id="longitude"></td>
                       </tr>
                       <tr>
                           <td>纬度</td>
                           <td id="latitude"></td>
                       </tr>
                       <tr>
                           <td>x坐标</td>
                           <td id="xCoor"></td>
                       </tr>
                       <tr>
                           <td>y坐标</td>
                           <td id="yCoor"></td>
                       </tr>
                   </tbody>
               </table>
           </div>
       </div>
   </div>
   
   
  

	<script type="text/javascript">
	/**
	 * * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * *
	 * 
	 * 查看图片
	 *  * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * *
	 */
	function viewPhoto() {
		parent.viewPhoto("noPhoto");
	}
	
	/**
	 * * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * * 
	 * 
	 * 查看视频
	 * 
	 * * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * *
	 */
	function vedioPlayer(){
		var vedioName = $("#vedioName").val();
		
		parent.vedioPlayer(vedioName);
	}
	/**
	 * * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * * 
	 * 
	 * 播放音频
	 * 
	 * * * * ** * * * ** * * * ** * * * ** * * * ** * * * ** * * * *
	 */
	function redioPlayer(){
		var redioName = $("#redioName").val();
		
		parent.redioPlayer(redioName);
	}
	</script>
</body>
</html>
