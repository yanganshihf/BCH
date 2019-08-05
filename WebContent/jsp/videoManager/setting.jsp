<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>巡检直播</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="../../icomoon/style.css" />
<style type="text/css">
@media ( min-width : 700px) {
	.container {
		width: 100%;
	}
}

#formDiv {
	margin-left:5px;
	height:20px;
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
	<div class="container" id="cond" style="padding:7px;padding-bottom:0px;">
		<div id="formDiv">
			<button style="float:right;" type="button" class="btn btn-default" id="deleteButton" title="删除账号">
				<span class="glyphicon glyphicon-trash"></span>
			</button>
			<button style="float:right;margin-right:25px;" type="button" class="btn btn-default" id="passButton" title="授权管理">
				<span class="glyphicon glyphicon-user"></span>
			</button>	
			<button style="float:right;margin-right:25px;" type="button" class="btn btn-default" id="editButton" title="编辑账号">
				<span class="glyphicon glyphicon-edit"></span>
			</button>
			<button style="float:right;margin-right:25px;" type="button" class="btn btn-default" id="addButton" title="新增账号">
				<span class="glyphicon glyphicon-plus"></span>
			</button>
<!-- 			<input type="button" value="删除" id="deleteButton" class="layui-btn layui-btn-xs" style="float:right;margin-right:25px;">
			<input type="button" value="授权" id="passButton" class="layui-btn layui-btn-xs" style="float:right;margin-right:10px;">
			<input type="button" value="编辑" id="editButton" class="layui-btn layui-btn-xs" style="float:right;">
			<input type="button" value="添加" id="addButton" class="layui-btn layui-btn-xs" style="float:right;"> -->
		</div>
		<div class="container" id="gridCond">
			<table id="table" lay-filter="filter"></table>
		</div>
	</div>
	<input id="copyStr" value="" type="text" style="height:0px;margin-left:-200px;">
	<input type="hidden" id=address>
	<input type="hidden" id="usercode">
	<input type="hidden" id="videoID"><!-- 授权视频的ID -->
</body>
<script type="text/javascript">
layui.use(['table','util'], function(){
	  var source
	  if (!!window.EventSource) { 
		  source= new EventSource('http://60.205.206.180:8080/ResourceMonitor/video/sse');//发送消息
		  //source= new EventSource('http://127.0.0.1:8878/ResourceMonitor/video/sse');//发送消息
	  }
	  var util = layui.util;
	  var table = layui.table;
	  var closData =  [[
		  {type:'checkbox',width:'4%'}
	      ,{type:'numbers',title: '序号',align:'center',width:'4%'}
	      ,{field:'name',title: '账户名',align:'center',width:'10%'}
	      ,{field:'person',title: '姓名',align:'center',width:'8%'}
	      ,{field:'mobile',title: '电话',align:'center',width:'10%'}
	      ,{field:'type',title: '无人机类型',align:'center',width:'9%',templet: function(d){
        	 if(d.type == 1){return "悟2"}else if(d.type == 2){return "御2"}else if(d.type == 3){return "精灵4"}else if(d.type == 4){return "观察者3"}else if(d.type == 4){return "智绘鹰"}else{return ""}
          	}
	      }
	      ,{field:'code',title: '无人机ID',align:'center',width:'10%'}	      
	      ,{field:'saveday',title: '录像保存(天)',align:'center',width:'9%'}
	      ,{field:'address',title: '推流地址',align:'center',width:'30%'}
	      ,{title: '复制',toolbar: '#copyUrl',align:'center',width:'5%'}
	      ,{field:'id',hide:true}
	      ,{field:'sign',hide:true}
	      ,{field:'allowpersons',hide:true}
      ]];
	  var tableData=null;
	  //视频回放表格渲染
	  table.render({
	    elem: '#table'
	    ,url:'/ResourceMonitor/video/queryVideo'
	    ,cellMinWidth:85 
	    ,cols:closData
	  	,id: 'tableId'
	  	,title:'视频直播'
	  	,page: false
	  	,height: 'full-58'
  	  	,done: function(res, curr, count){
  			source.onmessage=function(event){
  				var data = JSON.parse(event.data);
  				for(var i=0;i<count;i++){
  					var tr = $("tr[data-index="+i+"]");
  					var rowCode = tr.find("td[data-field=code]").find("div").html();
  					var video = data[rowCode];
  					if(video!= undefined){
  						var time = video.time.replace(/H/, "时").replace(/M/, "分").replace(/S/, "秒");
  						tr.find("td[data-field=time]").find("div").html(time);
  						tr.find("td[data-field=bwin]").find("div").html(video.bwin);
  						tr.find("td[data-field=bytesin]").find("div").html(video.bytesin);
  						tr.find("td[data-field=play]").find("div").find(".icon-play").css("display","");
  					}else{
  						tr.find("td[data-field=time]").find("div").html("");
  						tr.find("td[data-field=bwin]").find("div").html("");
  						tr.find("td[data-field=bytesin]").find("div").html("");
  						tr.find("td[data-field=play]").find("div").find(".icon-play").css("display","none");
  					}
  				}
  	 		}; 
  	  	}
	  });
	  //模式改变
	  $("#viewModel").off().on("change",function(){
		 layer.closeAll();
		 var model = $(this).val();
		 if(model=='1'){
			 layer.open({
				scrollbar: false,
				type : 2,
				shade:0,
				offset: 'rb',
				title :false,
				closeBtn:0,
				area: ['100%','95%'],
				content : '4splitScreen.jsp',
			});
		 }else if(model=='2'){
			 layer.open({
				scrollbar: false,
				type : 2,
				shade:0,
				offset: 'rb',
				title :false,
				closeBtn:0,
				area: ['100%','95%'],
				content : '9splitScreen.jsp',
			}); 
		 }
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
	        }
	      });
	  });
	  //重置
 	  $("#resetButton").off().on("click",function(){
		  $("#name").val('');
		  $("#code").val('');
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
	  //添加直播
 	  $("#addButton").off().on("click",function(){
		var index = layer.open({
			type : 2,
			title : '新增账号',
			btn :['提交','取消'],
			area: ['260px', '400px'],
			yes:function (index, layero){
				 var body = layer.getChildFrame('body', index);
	  			 var name = body.find("#name").val();
	  			 var code = body.find("#code").val();
	  			 var day = body.find("#day").val();
	  			 var sign = body.find("#sign").val();
	  			 var person = body.find("#person").val();
	  			 var password = body.find("#password").val();
	  			 var mobile = body.find("#mobile").val();
	  			 var type = body.find("#type").val();
	  			 var mobileNumReg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
	  			 if(!name){
	  				 top.layer.msg("账户名不能为空！")
	  				 return;
	  			 }else if(!password){
	  				top.layer.msg("密码不能为空！")
	  				return;
	  			 }else if(!person){
	  				top.layer.msg("人员姓名不能为空！")
	  				return;
	  			 }else if(!mobile){
	  				top.layer.msg("手机号不能为空！")
	  				return;
	  			 }else if(!mobileNumReg.test(mobile)){
	  				top.layer.msg("请输入有效的手机号！")
	  				return;
	  			 }
			     var data={
					code:code,
					name:name,
					saveday:day,
					sign:sign,
					person:person,
					mobile:mobile,
					password:password,
					type:type,
			     }
 			    $.post("/ResourceMonitor/video/addVideo",
		   	    data,
	   	        function(data,status){
					if(data.code!=0){
						layer.close(index);
						layer.msg("成功添加1条数据");
						$("#name").val('');
						$("#code").val('');
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
					 	layer.msg("添加失败,无人机ID已存在！");
					 }
	   	    	});
	  		},
			content : 'addVideo.jsp',
		});
	  });
	  //编辑直播
 	  $("#editButton").off().on("click",function(){
  		 var checkStatus = table.checkStatus('tableId');
 		 var data = checkStatus.data;
 		 if(data.length==1){
			var id = data[0].id;
			var name = data[0].name;
			var code = data[0].code;
			var day = data[0].saveday;
			var sign = data[0].sign;
			var person = data[0].person;
			var mobile = data[0].mobile;
			var password = data[0].password;
			var type = data[0].type;
			var typeval = data[0].type;
			if(type == 1){type = "悟2"}else if(type == 2){type = "御2"}else if(type == 3){type = "精灵4"}else if(type == 4){type = "观察者3"}else if(type == 4){type = "智绘鹰"}else{type = ""}
			var index = layer.open({
				type : 2,
				title : '编辑账号',
				btn :['提交','取消'],
				area: ['260px', '400px'],
			    success: function(layero, index){
					 var body = layer.getChildFrame('body', index);
					 body.find("#id").val(id);
	    			 body.find("#name").val(name);
	    			 body.find("#code").val(code);
	    			 body.find("#day").val(day);
	    			 body.find("#sign").val(sign);
	    			 body.find("#person").val(person);
	    			 body.find("#mobile").val(mobile);
	    			 body.find("#password").val(password);
	    			 body.find("#type").val(type); 
				},
				yes:function (index, layero){
					 var body = layer.getChildFrame('body', index);
					 var id = body.find("#id").val();
	    			 var name = body.find("#name").val();
	    			 var code = body.find("#code").val();
	    			 var day = body.find("#day").val();
	    			 var sign = body.find("#sign").val();
	    			 var person = body.find("#person").val();
		  			 var password = body.find("#password").val();
		  			 var mobile = body.find("#mobile").val();
		  			 var type = typeval;
		  			 
		  			 var mobileNumReg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
		  			 if(!name){
		  				 top.layer.msg("账户名不能为空！")
		  				 return;
		  			 }else if(!password){
		  				top.layer.msg("密码不能为空！")
		  				return;
		  			 }else if(!person){
		  				top.layer.msg("人员姓名不能为空！")
		  				return;
		  			 }else if(!mobile){
		  				top.layer.msg("手机号不能为空！")
		  				return;
		  			 }else if(!mobileNumReg.test(mobile)){
		  				top.layer.msg("请输入有效的手机号！")
		  				return;
		  			 }
				    
    			    $.post("/ResourceMonitor/video/editVideo",
		    	    {
  			    	    id:id,
  			    	  	code:code,
						name:name,
						saveday:day,
						sign:sign,
						person:person,
						mobile:mobile,
						password:password,
						type:type,
		    	    },
	    	        function(data,status){
						if(data.code!=0){
							layer.close(index);
							layer.msg("编辑成功!");
							$("#name").val('');
							$("#code").val('');
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
						 	layer.msg("编辑失败！");
						 }
		    	    });
	    		},
				content : 'editVideo.jsp',
			});
 		 }else{
 			 layer.msg("请选择一个需要编辑的无人机");
 		 }
	  });
	  //授权
 	  $("#passButton").off().on("click",function(){
 		 var checkStatus = table.checkStatus('tableId');
 		 var data = checkStatus.data;
 		 if(data.length==1){
 			$("#videoID").val(data[0].id);
 			var index = layer.open({
				type : 2,
				title :'巡检视频阅览授权',
				btn :['确定','取消'],
				area: ['440px', '500px'],
			  	yes: function(index, layero){
			  		layer.close(index); 
			  	    var body = layer.getChildFrame('body', index);
			  	    var iframeWin = window[layero.find('iframe')[0]['name']];
 			  		$.post("/ResourceMonitor/video/toAllow",
		  			  {
		  				  allowpersons:iframeWin.persons,
		  				  id:iframeWin.videoID
		  			  },
		  			  function(data,status){
		  				  if(data.count>0){
		  					 layer.msg("授权成功!");
		  				  }else{
		  					 layer.msg("授权失败!");
		  				  }
		  			  });  
				},
				content : 'passVideo.jsp',
			}); 			 
 		 }else{
 			 layer.msg("请选择一个直播进行授权!");
 		 }
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
  	 	 		  $.post("/ResourceMonitor/video/deleteVideo",
  	 			  {
  	 			    ids:ids.join(','),
  	 			    files:files.join(',')
  	 			  },
  	 			  function(data,status){
  	 				  if(data.code>0){
  	 					  $("#name").val('');
  	 					  $("#code").val('');
  	 				      table.reload('tableId', {
  	 				        where: {
  	 				            name:'',
  	 				            code:'',
  	 				        }
  	 				      });
  	 				     layer.msg("成功删除"+data.code+"条数据");
  	 				  }else{
  	 					 layer.msg("删除失败！");
  	 				  }
  	 			  });
  			     layer.close(index);
  			 });
 		 }else{
 			 layer.msg("请选择需要删除的项目");
 		 } 
	  }); 
 	  //点击复制
	  table.on('tool(filter)', function(obj){
		 var data = obj.data;
		 if(obj.event === 'copyUrl'){
			 layer.msg("复制内容:"+data.address+"<br/>点击CTRL+V粘贴");
			 $("#copyStr").val(data.address);
			 var copyArea=document.getElementById("copyStr");
			 copyArea.select(); // 选择对象
			 document.execCommand("Copy"); 
		 }else if(obj.event === 'goVideo'){

		 }
	  });
		$('body').on("click",".icon-play",function(){
			var address = $(this).attr("address");
			var code = $(this).attr("code");
			$("#address").val(address);
			$("#usercode").val(code);
			var liveIndex = layer.open({
				type : 2,
				id:'liveLayer',
				title : '无人机-'+code,
				content : '/ResourceMonitor/jsp/videoManager/rtmpPlayer.html',
				area: ['100%', '100%'],
				success:function(layero, index){
				}
			});
		});
	});	
	/* <a class="layui-btn layui-btn-xs" lay-event="copyUrl">复制</a> */
</script>
<script type="text/html" id="copyUrl">
	<span class="icon-copy" lay-event="copyUrl" style="font-size:20px;line-height:28px;"></span>
</script>
</html>