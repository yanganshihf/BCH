<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>人员管理</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%-- <script type="text/javascript"
	src="${pageContext.request.contextPath}/js/layer/layer-v3.0.3/layer/layer.js"></script> --%>

<style type="text/css">
@media ( min-width : 700px) {
	.container {
		width: 100%;
	}
}

.form-control {
	height: 27px;
	font-size: 10px;
	padding-top: 0px;
	padding-bottom: 0px;
}

.btn-primary {
	height: 27px;
	font-size: 10px;
}

#gridPager {
	position: absolute;
	bottom: 0;
}

.row {
	width: 99%;
	margin-top: 5px;
    margin-right: 0;
    margin-left: 0px;

}

.row-last {
	margin-bottom: 5px;
}
.col-md-12{
	padding:0;
}
.dateTime {
	padding-top: 0px;
	padding-bottom: 0px;
	padding-left: 5px;
}

div.ui-datepicker, .ui-datepicker td {
	font-size: 10px;
}
.table td:nth-child(1){
	font-weight:700;
}
.table td{
	text-align: center;
}
</style>
</head>
<body>
	<div class="container">
		<div class="row clearfix">
			<div class="col-md-12 column">
				<table class="table table-condensed table-bordered">
					<tbody>
						<tr>
							<td>林场</td>
							<td id="linchang"></td>
						</tr>
						<tr>
							<td>地点</td>
							<td id="linbanhao"></td>
						</tr>
						<tr>
							<td>经度</td>
							<td id="xiaobanhao"></td>
						</tr>
						<tr>
							<td>纬度</td>
							<td id="dilei"></td>
						</tr>
						<tr>
							<td>类型</td>
							<td id="mianji"></td>

						</tr>
						<tr>
							<td colspan="2" id="youshi">
								<img   src=""  width="200" />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</body>
</html>