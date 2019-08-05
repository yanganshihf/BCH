<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>公示监督</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<style type="text/css">
@media (min-width: 700px){
	.container {
    	width: 100%;
	}
}
.container{
	padding-left:0;
	padding-right:0;
	
}
.form-control {
	height: 27px;
	font-size: 10px;
	padding-top: 0px;
	padding-bottom: 0px;
}

.btn-default {
	height: 27px;
	font-size: 10px;
	padding: 0 12px;
}


#gridPager {
	position: absolute;
	bottom: 0;
}
.row{
	width: 99%;
	margin:5px;
}
.row-last{
	margin-bottom: 5px;
}
.dateTime{
	padding-top: 0px;
	padding-bottom: 0px;
	padding-left: 5px;
}
div.ui-datepicker, .ui-datepicker td{
 font-size:10px;
}
.removeLp{
	padding-left:0;
	padding-right:0;
}
.removeRp{
	padding-right:0;
}
</style>
</head>
<body>
	<div class="container" id="cond">
		
		<div class="row">
			<div id="showDetail" class="col-xs-12 "></div>
		</div>
	</div>
	
</body>


</html>