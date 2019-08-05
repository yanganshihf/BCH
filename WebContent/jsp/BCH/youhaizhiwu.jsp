<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>代码管理-有害植物</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
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
	margin-top: 15px;
	margin-bottom: 3px;
}

#formDiv label {
	font-size: 15px;
	line-height: 27px;
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
.layui-table-page{
	text-align:center;
}
</style>
</head>
<body>
	<div class="container" id="cond" style="padding: 0px;">
		<form class="form-inline" id="formDiv">
			<div class="form-group">
				<label for="nameField">&emsp;名称</label> 
				<input class="form-control" type="text" id="nameField" />
			</div>
			<div class="form-group">
				<label for="codeField">&emsp;代码</label> 
				<input class="form-control" type="text" id="codeField" />
			</div>			
			<input type="button" value="确定" id="submitButton" class="layui-btn layui-btn-xs">
			<input type="button" value="重置"id="resetButton" class="layui-btn layui-btn-xs">
			
			<input type="button" value="导出" id="exportButton" class="layui-btn layui-btn-xs" style="float:right;margin-right:25px;">
			<input type="button" value="删除" id="deleteButton" class="layui-btn layui-btn-xs" style="float:right;">
			<input type="button" value="增加" id="addButton" class="layui-btn layui-btn-xs" style="float:right;">
		</form>
		<div class="container" id="gridCond">
			<table id="table" lay-filter="filter"></table>
		</div>
	</div>
</body>
<script type="text/javascript">
layui.use('table', function(){
	  var closData =  [[
		  {type:'checkbox'}
	      ,{type:'numbers',title: '序号',align:'center'}
	      ,{field:'code',title: '有害植物代码',align:'center'}
	      ,{field:'name',title: '有害植物名称',align:'center'}
	      ,{field:'ladingM',title: '拉丁名称',align:'center'}
	      ,{field:'jiBie',title: '有害植物级别',align:'center'}
	      ,{field:'jzzwMc',title: '树种名称',align:'center'}
	      ,{title: '详情',toolbar: '#barDetail',align:'center'}	  
	      ,{field:'jianYi',hide:true,title:'建议'}
	      ,{field:'id',hide:true}
      ]];
	  var table = layui.table;
	  //植物调查表格渲染
	  table.render({
	    elem: '#table'
	    ,url:'/ResourceMonitor/codemanage/queryYouhaizhiwuCode'
	    ,cellMinWidth: 60 
	    ,cols:closData
	  	,id: 'tableId'
	  	,title:'有害植物编码'
	  	,page: true
	  	,height: 'full-70'
	  });
	  //查询
	  $("#submitButton").off().on("click",function(){
	      table.reload('tableId', {
	        page: {
	          curr: 1 
	        }
	        ,where: {
	            name:$("#nameField").val(),
	            code:$("#codeField").val(),
	        }
	      });
	  });
	  //重置
 	  $("#resetButton").off().on("click",function(){
		  $("#nameField").val('');
		  $("#codeField").val('');
	      table.reload('tableId', {
	        page: {
	          curr: 1 
	        }
	        ,where: {
	            name:'',
	            code:'',
	        }
	      });
	  }); 
	  //增加
 	  $("#addButton").off().on("click",function(){
 			layer.open({
 				title : '添加信息',
 				type : 2,
 				resize : false,
 				content : 'youhaizhiwuAdd.jsp',
 				area : [ '340px', '340px' ],
 				btn: ['确定', '取消'],
 			    yes: function(index, layero){
 			    	var body = layer.getChildFrame('body', index);
 			    	var code = body.find('#code').val();
 					var name = body.find('#name').val();
 					var ladingM = body.find('#ladingM').val();
 					var jzzwMc = body.find('#jzzwMc').val();
 					var jiBie = body.find('#jiBie').val();
 					var jianYi = body.find('#jianYi').val();
 					if(code==''){
 						layer.msg('有害植物代码不能为空!');
 					}else if(name==''){
 						layer.msg('有害植物名称不能为空!');
 					}else if(ladingM==''){
 						layer.msg('拉丁名称不能为空!');
 					}else if(jzzwMc==''){
 						layer.msg('树种名称不能为空!');
 					}else if(jiBie==''){
 						layer.msg('有害植物级别不能为空!');
 					}else if(jianYi==''){
 						layer.msg('建议不能为空!');
 					}else{
 					    var data={
							code:code,
							name:name,
							ladingM:ladingM,
							jzzwMc:jzzwMc,
							jiBie:jiBie,
							jianYi:jianYi
 					   }
		 	 		   $.post("/ResourceMonitor/codemanage/addYouhaizhiwuCode",
 	 	 			   data,
 	 	 			   function(data,status){
	 	 				 if(data.code!=0){
	 	 					 layer.close(index);
	 	 					 layer.msg("成功添加1条数据");
	 	 					 $("#nameField").val('');
	 	 					 $("#codeField").val('');
	 	 				     table.reload('tableId', {
	 	 				        page: {
	 	 				          curr: 1 
	 	 				        }
	 	 				        ,where: {
	 	 				            name:'',
	 	 				            code:'',
	 	 				        }
	 	 				     });
 	 	 				  }else{
 	 	 					 layer.msg("添加失败！");
 	 	 				  } 
 	 	 			   });
 					}
 			    },
 			    btn2: function(index, layero){
 			    	
 			    }
 			});
	  });
	  //删除
 	  $("#deleteButton").off().on("click",function(){
 		 var checkStatus = table.checkStatus('tableId');
 		 var data = checkStatus.data;
 		 if(data.length>0){
 	 		 var ids=[];
 	 		 for(var i = 0;i<data.length;i++){
 	 			 var id= data[i].id;
 	 			 ids.push(id);
 	 		 }
 	 		  $.post("/ResourceMonitor/codemanage/deleteYouhaizhiwuCode",
 			  {
 			    ids:ids.join(','),
 			  },
 			  function(data,status){
 				  if(data.code>0){
 					 layer.msg("成功删除"+data.code+"条数据");
 					  $("#nameField").val('');
 					  $("#codeField").val('');
 				      table.reload('tableId', {
 				        page: {
 				          curr: 1 
 				        }
 				        ,where: {
 				            name:'',
 				            code:'',
 				        }
 				      });
 				  }else{
 					 layer.msg("删除失败！");
 				  }
 			  });
 		 }else{
 			 layer.msg("请选择需要删除的项目");
 		 }

	  }); 
 	  $("#exportButton").off().on("click",function(){
		    $.post("/ResourceMonitor/codemanage/exportYouhaizhiwuCode",
	   	    {
	            name:$("#nameField").val(),
	            code:$("#codeField").val(),
	   	    },
	   	    function(data,status){
	   			var title = data.title;
	   			var location = "/pest/excel/" + title + ".xls";
				var $form = $('<form method="GET"></form>');
				$form.attr('action', location);
				$form.appendTo($('body'));
				$form.submit();
	   	    });
	  });
	  //详情点击事件
	  table.on('tool(filter)', function(obj){
		  var data = obj.data;
		  detailLayer(data);
	  });
	});	
function detailLayer(data){
	var detail = layer.open({
		title : '详细信息',
		type : 2,
		resize : false,
		content : 'youhaizhiwuDetail.jsp',
		area : [ '600px', '180px' ],
		success : function(layero, index) {
			var body = layer.getChildFrame('body', index);
			body.find('#code').html(data.code);
			body.find('#name').html(data.name);
			body.find('#ladingM').html(data.ladingM);
			body.find('#jzzwMc').html(data.jzzwMc);
			body.find('#jiBie').html(data.jiBie);
			body.find('#jianYi').html(data.jianYi);
		}			
	}); 
}	
</script>
<script type="text/html" id="barDetail">
  <a class="layui-btn layui-btn-xs" lay-event="detail">查看</a>
</script>
</html>