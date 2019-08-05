<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>事件查询</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
@media ( min-width : 700px) {
	.container {
		width: 100%;
	}
}

.form-control{
	height: 27px;
	font-size: 15px;
	padding:0 0 1px 5px;
    margin-bottom: 3px;
	width: 117px;
}
.layui-table-header span{
	color:#058563;
	font-weight:700;
}
.layui-table-header th{
 	background-color:#E6E6E6;
}
#cond .form-control {
    height: 22px;
    font-size: 14px;
    padding: 0 0 1px 5px;
    margin-bottom: 3px;
    margin-left: 5px;
}
#cond .btn-default {
    height: 22px;
    font-size: 14px;
    padding: 0 12px;
    margin-bottom: 3px;
    margin-left: 10px;
}
.layui-laydate-content{
	padding: 0px 10px;
}
</style>
</head>
<body>
	<div class="container" id="cond" style="padding: 0px;line-height:30px;">
		<table style="margin-left:10px;">
			<tr>
				<td style="width:40px;">部门</td>
				<td><select id="department" class="form-control"></select></td>
				<td style="width:40px;">&nbsp;&nbsp;&nbsp;人员</td>
				<td><input class="form-control" type="text" id="personName"/></td>
				<td></td>
			</tr>
			<tr>
				<td>日期</td>
				<td><input  class="form-control" type="text" readonly="readonly" style="background-color: #fff;" id="startDatePicker"  /></td>
				<td>&nbsp;&nbsp;&nbsp;~</td>
				<td><input class="form-control" type="text" readonly="readonly" style="background-color: #fff;" id="endDatePicker" /></td>
				<td>
					<button style="margin-left:5px;float:left;" type="button" class="btn btn-default" id="submitButton" title="查询">
					<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
					</button>
				</td>
			</tr>
		</table>
		<div  id="gridCond" style="padding:5px;">
			<table id="table" lay-filter="filter"></table>
		</div>
	</div>
</body>
<script type="text/javascript">
var cookie_department = localStorage.getItem('cookie_department');
cookie_department = cookie_department.substring(0,
		cookie_department.length - 1);
// 每个单位id-名称
var eachDepart = cookie_department.split("&");
// 遍历
for (var i = 0; i < eachDepart.length; i++) {
	var eachDep = eachDepart[i].split("-");
	// 添加选项 department为select的id
	$("#department").append("<option value='" + eachDep[0] + "'>" + eachDep[1]+ "<oprion>")
}
layui.use('table', function(){
	  var closData =  [[
	      {type:'numbers',title: '序号'}
	      ,{field:'departmentName',title: '部门',align:'center'}
	      ,{field:'reportPeople',title: '人员',align:'center'}
	      ,{field:'eventText',title: '事件描述',align:'center'}
	      ,{field:'id',hide: true}
      ]];
		var myDate = getNowFormatDate();
		$("#startDatePicker").val(myDate);
		$("#endDatePicker").val(myDate);

		laydate.render({
			elem : '#startDatePicker' // 指定元素
			,
			showBottom : false
		});
		laydate.render({
			elem : '#endDatePicker' // 指定元素
			,
			showBottom : false
		});
	  var table = layui.table;
	  //病害调查表格渲染
	  table.render({
	    elem: '#table'
	    ,url:'/ResourceMonitor/event/queryEvent'
	    ,cols:closData
	  	,id: 'tableId'
	  	,page: true
	  	,height: '265px'
	  	,skin:'line'
		,page : true // 开启分页
		,method : 'post' // 如果无需自定义HTTP类型，可不加该参数
		,request : {
			pageName : 'page' // 页码的参数名称，默认：page
			,limitName : 'rows' // 每页数据量的参数名，默认：limit

		},
		response : {
			statusName : 'status' // 规定数据状态的字段名称，默认：code
			,statusCode : 200 // 规定成功的状态码，默认：0
			,msgName : 'msg' // 规定状态信息的字段名称，默认：msg
			,countName : 'records' // 规定数据总数的字段名称，默认：count
			,dataName : 'rows' // 规定数据列表的字段名称，默认：data
		},
		where : {
			department : '全部',
			startTime : $("#startDatePicker").val(),
			personName :'',
			endTime : $("#endDatePicker").val(),
			readState : '',
			projectType :''
		},
	  });
	  //监听行单击事件
	  table.on('row(filter)', function(obj){
	    var data = obj.data;
		locateTo(data.id);
	  });
	   function locateTo(rowId) {
	    	$.ajax({
	    		url : '/ResourceMonitor/event/findEventCoor', 
	    		dataType : "json", // 返回格式为json
	    		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
	    		data : {
	    			id : rowId,
	    		}, // 参数值
	    		type : "POST", // 请求方式
	    		beforeSend : function() {
	    		},
	    		success : function(req) {
	   			   var longitude = req.rows[0].longitude; 
	   			   var latitude =  req.rows[0].latitude;
	   			   parent.analysis.funSetEventLocation(longitude,latitude);
	    		},
	    		complete : function() {
	    			// 请求完成的处理
	    		},
	    		error : function() {
	    			// 请求出错处理
	    		}
	    	});
	    }
	  //查询
	  $("#submitButton").off().on("click",function(){
		var department = $("#department").val();
		if(department == "0"){
			department = "全部";
		}
		var personName = $("#personName").val();
		var startTime = $("#startDatePicker").val();
		var endTime = $("#endDatePicker").val();
		var readState = '';
		var projectType = '';
	      table.reload('tableId', {
	        page: {
	          curr: 1 
	        }
	        ,where: {
				department : department,
				personName : personName,
				startTime : startTime,
				endTime : endTime,
				readState : readState,
				projectType : projectType
	        }
	      });
	  });
	});	
/**
 * 获取当前日期
 */
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}
</script>
</html>