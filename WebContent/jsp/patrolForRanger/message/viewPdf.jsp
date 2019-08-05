<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script
	src="${pageContext.request.contextPath}/js/jquery-2.1.4/jquery.js"
	type="text/javascript"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.media.js"></script>
<title>文件预览</title>
<style type="text/css">
* {
	padding: 0px;
	margin: 0px;
	boder: 0px;
}
</style>
</head>
<body>
	<a id="media" class="media"></a>
</body>

<script type="text/javascript">
	window.onload = function() {
		var fileName = window.location.search.substring(1);
		fileName = fileName.slice(9);
		$('#media').attr("href", "../../../uploadPoliceFiles/"+fileName);
		setTimeout(function(){ 
			$('#media').media({
				width : $(window).width() - 10,
				height : $(window).height() - 20
			});
		}, 300);
	}
</script>
</html>