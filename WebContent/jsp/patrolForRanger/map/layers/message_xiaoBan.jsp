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
							<td>林班号</td>
							<td id="linbanhao"></td>
						</tr>
						<tr>
							<td>小班号</td>
							<td id="xiaobanhao"></td>
						</tr>
						<tr>
							<td>地类</td>
							<td id="dilei"></td>
						</tr>
						<tr>
							<td>面积</td>
							<td id="mianji"></td>

						</tr>
						<tr>
							<td>优势树种</td>
							<td id="youshi"></td>

						</tr>
						<tr>
							<td>林种</td>
							<td id="linzhong"></td>

						</tr>
						<tr>
							<td>坡度</td>
							<td id="podu"></td>
						</tr>
						<tr>
							<td>坡向</td>
							<td id="poxiang"></td>

						</tr>
						<tr>
							<td>郁闭度</td>
							<td id="yubidu"></td>

						</tr>
						<tr>
							<td>林地保护等级</td>
							<td id="baohu"></td>

						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</body>
</html>