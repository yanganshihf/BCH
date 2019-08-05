<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/css/bootstrap.css" />

<script
	src="${pageContext.request.contextPath}/js/jquery-2.1.4/jquery.js"
	type="text/javascript"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>

<title>Insert title here</title>
<style type="text/css">
	#cont .table{
		border:0;
		margin-bottom:0;
	}
	#cont td{
		//text-align: center;
		border:0;
	}
	.form-control {
		height: 27px;
		font-size: 15px;
		padding:0 0 1px 5px;
   		margin-bottom: 3px;
		display: inline-block;
}
</style>
</head>
<body>
	<div class="container" id="cont">
		<div class="row clearfix">
			<div class="col-md-12 column">
				<table class="table table-condensed table-bordered">

					<tbody>
						<tr >
							<td colspan="2"  style="padding-top: 10px;">
								<p class="text-info lead">
									配置电子围栏范围,人员进入或者离开责任区该范围时提示
								</p>
							</td>
						</tr>
						<tr>
							<td  style="padding-top: 10px;">警戒范围(米)</td>
							<td><input type="number"  class="form-control" value="50"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	
</body>


</html>