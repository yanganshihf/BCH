<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>代码管理-行政区划</title>

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
	      ,{field:'code',title: '代码',align:'center'}
	      ,{field:'name',title: '名称',align:'center'}
	      ,{field:'jiBie',title: '级别',align:'center'}
	      ,{field:'id',hide:true}
      ]];
	  var table = layui.table;
	  //行政区划调查表格渲染
	  table.render({
	    elem: '#table'
	    ,url:'/ResourceMonitor/codemanage/queryXingzhengquhuaCode'
	    ,cellMinWidth: 60 
	    ,cols:closData
	  	,id: 'tableId'
	  	,title:'行政区划编码'
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
 				content : 'xingzhengquhuaAdd.jsp',
 				area : [ '260px', '260px' ],
 				btn: ['确定', '取消'],
 			    yes: function(index, layero){
 			    	var body = layer.getChildFrame('body', index);
 			    	var code = body.find('#code').val();
 					var name = body.find('#name').val();
 					var jiBie = body.find('#jiBie').val();
 					if(code==''){
 						layer.msg('行政区划代码不能为空!');
 					}else if(name==''){
 						layer.msg('行政区划名称不能为空!');
 					}else{
 					    var data={
							code:code,
							name:name,
							jiBie:jiBie
 					   }
		 	 		   $.post("/ResourceMonitor/codemanage/addXingzhengquhuaCode",
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
 	 		  $.post("/ResourceMonitor/codemanage/deleteXingzhengquhuaCode",
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
		    $.post("/ResourceMonitor/codemanage/exportXingzhengquhuaCode",
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
	});		
</script>
</html>