<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>视频回放</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="/ResourceMonitor/js/moment.min.js"></script> 
<link rel="stylesheet" href="../../icomoon/style.css" />
<style type="text/css">
@media ( min-width : 700px) {
	.container {
		width: 100%;
	}
}

#formDiv .form-control {
	height: 22px;
	font-size: 15px;
	padding:0 0 1px 5px;
    margin-bottom: 3px;
	width: 100px;
}

#formDiv {
	margin-left:5px;
}

#formDiv label {
	font-size: 15px;
	line-height: 22px;
	font-weight: normal;
	margin-bottom: 0;
}
.layui-table-header span{
	color:#058563;
	font-weight:700;
}
.layui-table-header th{
 	background-color:#E6E6E6;
}
.layui-table-view .layui-table td{
	padding:0px 0;
}
.layui-table, .layui-table-view {
    margin-top: 10px;
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
.layui-layer-btn .layui-layer-btn0 {
    border-color: #009688;
    background-color: #009688;
}
.btn-default {
    height: 22px;
    font-size: 14px;
    padding: 0 12px;
    margin-bottom: 2px;
}
#gridCond{
	padding:0px;
}
.layui-table-view .layui-table {
    width:100%;
}
</style>
</head>
<body>
	<div class="container" id="cond" style="padding:10px;padding-bottom:0px;">
		<form class="form-inline" id="formDiv">
			<div class="form-group">
				<label for="name">无人机名称</label> 
				<input class="form-control" type="text" id="name" />
			</div>
			<div class="form-group">
				<label style="margin-left:20px;" for="code">无人机ID</label> 
				<input class="form-control" type="text" id="code" />
			</div>	
			<div class="form-group">
				<label style="margin-left:20px;" for=""time"">起止时间</label> 
				<input class="form-control" type="text" id="time" style="width:230px;"/>
			</div>
			<button style="margin-left:20px;" type="button" class="btn btn-default" id="submitButton" title="查询">
				<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">
			</button>
			<button style="float:right;" type="button" class="btn btn-default" id="deleteButton" title="删除">
				<span class="glyphicon glyphicon-trash"></span>
			</button>			
			<!-- <input style="margin-left:20px;" type="button" value="确定" id="submitButton" class="layui-btn layui-btn-xs">
			<input type="button" value="重置"id="resetButton" class="layui-btn layui-btn-xs">
			<input type="button" value="删除"id="deleteButton" class="layui-btn layui-btn-xs" style="float:right;margin-right:25px;"> -->
		</form>
		<div class="container" id="gridCond">
			<table id="table" lay-filter="filter"></table>
		</div>
	</div>
	<input type="hidden" id="recordFile">
	<input type="hidden" id="recordCode">
	<input type="hidden" id="recordStart">
	<input type="hidden" id="recordEnd">
</body>
<script type="text/javascript">
var sortField='starttime';
var sortType='desc';
layui.use(['laydate','table','util'], function(){
	//var nginxserver = 'http://127.0.0.1:8088/';
	  var nginxserver = 'http://60.205.206.180:8088/';
	  var rtspUrl = 'rtmp://60.205.206.180:1935/vod//';
	  var laydate = layui.laydate;
	  var util = layui.util;
	  //日期时间范围
	  laydate.render({
	    elem: '#time'
	    ,range: true
	    ,format: 'yyyy年M月d日'
	  });
	  var threeAgo = moment().subtract(2,'days').format("YYYY年M月DD日");
	  var now=moment().format("YYYY年M月DD日");
	  $("#time").val(threeAgo+" - "+now);
	  var table = layui.table;
	  var closData =  [[
		  {type:'checkbox'}
	      ,{type:'numbers',title: '序号',align:'center'}
	      ,{field:'name',title: '无人机名称',align:'center',sort:true}
	      ,{field:'code',title: '无人机ID',align:'center',sort:true}
	      ,{field:'starttime',title: '开始时间',align:'center',width:200,sort:true
	          ,templet: function(d){
	              return util.toDateString(d.starttime,'yyyy年MM月dd日 HH:mm:ss')
	          }    
	      }
	      ,{field:'endtime',title: '结束时间',align:'center',width:200
	          ,templet: function(d){
	              return util.toDateString(d.endtime,'yyyy年MM月dd日 HH:mm:ss')
	          }  
	      }
	      ,{field:'length',title: '时长',align:'center'}
	      ,{title: '播放',align:'center',toolbar: '#goRecord'}
	      ,{title: '下载',align:'center'
	          ,templet: function(d){
	              return '<a href="'+nginxserver+d.fileurl+'" class="icon-download" style="font-size:20px;line-height:28px;"></a>'
	          }  
	      }	  
	      ,{field:'fileurl',hide:true}
	      ,{field:'id',hide:true}
      ]];
	  //视频回放表格渲染
	  table.render({
	    elem: '#table'
	    ,url:'/ResourceMonitor/record/queryRecord'
	    ,cellMinWidth: 60 
	    ,cols:closData
	  	,id: 'tableId'
	  	,page: true
	  	,height: 'full-60'
	  	,limits:[10,30,90]
	  	,where:{
	  		field:sortField,
	  		type:sortType,
	  		time:$("#time").val()
	  	}
	  	,autoSort:false
	  	,initSort: {
		    field: sortField, //排序字段，对应 cols 设定的各字段名
		    type:sortType //排序方式  asc: 升序、desc: 降序、null: 默认排序
		  }
	  });
	//监听排序事件 
	  table.on('sort(filter)', function(obj){
		sortField=obj.field;
		sortType=obj.type;
	    table.reload('tableId', {
	      initSort: obj 
	      ,where: { 
	        field: obj.field, //排序字段
	        type: obj.type, //排序方式
            name:$("#name").val(),
            code:$("#code").val(),
            time:$("#time").val()
	      }
	    });
	    
	  });	  
	  //查询
	  $("#submitButton").off().on("click",function(){
	      table.reload('tableId', {
	        page: {
	          curr: 1 
	        }
	        ,where: {
	            name:$("#name").val(),
	            code:$("#code").val(),
	            time:$("#time").val(),
			    field: sortField,
			    type:sortType
	        }
	      });
	  });
	  //重置
 	  $("#resetButton").off().on("click",function(){
		  $("#name").val('');
		  $("#code").val('');
		  $("#time").val('');
		  sortField='starttime';
		  sortType='type';
	      table.reload('tableId', {
	        page: {
	          curr: 1 
	        }
		  	,initSort: {
		      field: sortField,
		      type:sortType
		    }
	        ,where: {
	            name:'',
	            code:'',
	            time:'',
				field:'starttime',
				type:'desc'
	        }
	      });
	  }); 
	  //删除
 	  $("#deleteButton").off().on("click",function(){
 		 var checkStatus = table.checkStatus('tableId');
 		 var data = checkStatus.data;
 		 if(data.length>0){
 			 layer.confirm('您确定要删除吗？', function(index){
	 	 		 var ids=[];
	 	 		 var files=[];
	 	 		 for(var i = 0;i<data.length;i++){
	 	 			 var id= data[i].id;
	 	 			 var file= data[i].fileurl;
	 	 			 ids.push(id);
	 	 			 files.push(file);
	 	 		 }
	 	 		  $.post("/ResourceMonitor/record/deleteRecord",
	 			  {
	 			    ids:ids.join(','),
	 			    files:files.join(',')
	 			  },
	 			  function(data,status){
	 				  if(data.code>0){
	 					 layer.msg("成功删除"+data.code+"条数据");
	 				      table.reload('tableId', {
	 				        page: {
	 				          curr: 1 
	 				        }
	 				        ,where: {
	 				            name:$("#name").val(),
	 				            code:$("#code").val(),
	 				            time:$("#time").val()
	 				        }
	 				      });
	 				  }else{
	 					 layer.msg("删除失败！");
	 				  }
	 			  });
	 	 		layer.close(index);
 			 })
 		 }else{
 			 layer.msg("请选择需要删除的项目");
 		 }
	  }); 
	  //详情点击事件
	  table.on('tool(filter)', function(obj){
		 var data = obj.data;
		 if(data.fileurl.indexOf('2019/')>-1){
			 $("#recordFile").val(nginxserver+data.fileurl);
		 }else{
			 $("#recordFile").val(rtspUrl+data.fileurl);
		 }
 	     
	     $("#recordCode").val(data.code);
	     $("#recordStart").val(data.starttime);
	     $("#recordEnd").val(data.endtime);
		 var recordIndex = layer.open({
			type : 2,
			id:'recordLayer',
			title : '播放录像',
			area: ['100%', '100%'],
			content : '/ResourceMonitor/jsp/videoManager/flvPlayer.html'
		 }); 
	  });
	});	
</script>
<script type="text/html" id="goRecord">
	<span class="icon-play" lay-event="record" style="font-size:20px;line-height:28px;"></span>
</script>
</html>