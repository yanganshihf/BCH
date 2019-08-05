<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>巡检直播授权</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="../../icomoon/style.css" />
<style type="text/css">
@media ( min-width : 700px) {
	.container {
		width: 100%;
	}
}
.form-control {
	height: 22px;
	font-size: 15px;
	padding:0 0 1px 5px;
    margin-bottom: 3px;
	width: 163px;
}
.layui-table-header span{
	color:#058563;
	font-weight:700;
}
.layui-table-header th{
 	background-color:#E6E6E6;
}
.layui-layer-btn .layui-layer-btn0 {
    border-color: #009688;
    background-color: #009688;
}
.layui-table-view .layui-table td{
	padding:0px 0;
}
.layui-table, .layui-table-view {
    margin-bottom:0px;
}
.layui-table-cell .layui-form-checkbox[lay-skin=primary]{
	top:5px;
}
.layui-table-page{
	text-align:center;
}
html body{
    height: 100%;
}
</style>
</head>
<body>
	<div class="container" id="cond" style="padding-top: 10px;padding-bottom:0px;">
		<table>
			<tr  style="height:28px;">
				<td><label style="margin-right: 5px;">部门</label></td>
				<td><select class="form-control"  id="department" style="margin-right: 15px;"></select></td>
				<td><label style="margin-right: 5px;">姓名</label></td> 
				<td colspan="2"><input style="" class="form-control" type="text" id="name" /></td>
			</tr>
			<tr>
				<td><label style="margin-right: 5px;">电话</label></td> 
				<td><input style="" class="form-control" type="text" id="code" /></td> 
				<td></td>
				<td>
				<button style="float:right;height:22px;line-height:22px;padding: 0; width: 50px;" type="button" class="btn btn-default" id="selectAllButton" title="全部授权">
					<img id="passAllImg" src="/ResourceMonitor/images/indexpage/passAll.png">
				</button>
				<button style="margin-right: 15px;float:right;height:22px;line-height:22px;padding: 0; width: 50px;" type="button" class="btn btn-default" id="submitButton" title="查询">
					<img src="/ResourceMonitor/images/indexpage/search.png">
				</button>
				
				</td> 
			</tr>
		</table>
		<div id="gridCond">
			<table id="table" lay-filter="filter"></table>
		</div>
	</div>
</body>
<script type="text/javascript">
var persons='';
var videoID = parent.$("#videoID").val();
 $.post("/ResourceMonitor/video/queryVideoById",
 {
  id:videoID
 },
 function(data,status){
	 persons=data.mobiles;
 });
layui.use(['table'], function(){
	var cookie_department = localStorage.getItem('cookie_department');
	cookie_department = cookie_department.substring(0,cookie_department.length - 1);
	var eachDepart = cookie_department.split("&");
	for (var i = 0; i < eachDepart.length; i++) {
		var eachDep = eachDepart[i].split("-");
		// 添加选项 department为select的id
		$("#department").append("<option value='" + eachDep[0] + "'>" + eachDep[1]+ "<oprion>")
	}
	  var table = layui.table;
	  var form = layui.form;
	  var closData =  [[
	      {type:'numbers',title: '序号',align:'center'}
	      ,{field:'userName',title: '姓名',align:'center'}
	      ,{field:'mobile',title: '手机号码',align:'center'}
	      ,{field:'isPass', title:'是否授权', 
	    	  width:110, unresize: true
	    	  , templet: function(data){
	    		  if(persons.indexOf(data.mobile) == -1){
	    			  return '<input type="checkbox" mobile="'+data.mobile+'" title="授权" lay-filter="passFilter">'
	    		  }else{
	    			  return '<input type="checkbox" mobile="'+data.mobile+'" title="授权" lay-filter="passFilter" checked>'
	    		  }
	    	  }
	      },
      ]];
	  //视频回放表格渲染
	  table.render({
	    elem: '#table'
	    ,url:'/ResourceMonitor/video/querySysusers'
	    ,cols:closData
	  	,id: 'tableId'
	  	,page: false
	  	,height: '320'
	  	,page: true
	  	,limits:[10,30,90]
	  });
	  //查询
	  $("#submitButton").off().on("click",function(){
		  queryTable();
	  });
	  function queryTable(){
		  var department = $("#department").val();
		  if(department=='0'){
			  department='';
		  }
	      table.reload('tableId', {
	        where: {
	            name:$("#name").val(),
	            mobile:$("#code").val(),
	            department:department
	        }
	      });
	  }
	  $("#selectAllButton").off().on("click",function(){
		  if($("#selectAllButton").attr("title")=="全部授权"){
			  $("#selectAllButton").attr("title","全部取消");
			  $("#passAllImg").attr("src","/ResourceMonitor/images/indexpage/unpassAll.png");
			  var department = $("#department").val();
			  if(department=='0'){
				  department='';
			  }
			  $.post('/ResourceMonitor/video/queryMobiles', 
			  {   name:$("#name").val(),
	              mobile:$("#code").val(),
	              department:department}, 
			  function(data){
	              persons = data.persons.join(',');	
		  	      table.reload('tableId', {
		  	        where: {
		  	            name:$("#name").val(),
		  	            mobile:$("#code").val(),
		  	            department:department
		  	        }
		  	      });
			  }); 
		  }else{
			  $("#selectAllButton").attr("title","全部授权");
			  $("#passAllImg").attr("src","/ResourceMonitor/images/indexpage/passAll.png"); 
			  persons='';
	  	      table.reload('tableId', {
	  	        where: {
	  	            name:$("#name").val(),
	  	            mobile:$("#code").val(),
	  	            department:department
	  	        }
	  	      });
		  }


	  });
	  //监听授权操作
	  form.on('checkbox(passFilter)', function(obj){
		  var mobile = $(this).attr("mobile");
		  var checked = obj.elem.checked;
		  if(checked){
			  persons+=mobile+";";
		  }else{
			  persons= persons.replace(mobile+";","");
		  }
	  });
});
</script>
</html>