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
	margin-left:20px;
	margin-top: 5px;
	margin-bottom: 3px;
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
	<div class="container" id="cond" style="padding-bottom:0px;padding-right: 10px; padding-left: 10px;">
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
	       {type:'numbers',title: '序号',align:'center',width:'10%'}
	      ,{field:'name',title: '账户名',align:'center',width:'12%'}
	      ,{field:'code',title: '无人机ID',align:'center',width:'12%'}
	      ,{field:'saveday',title: '录像保存(天)',align:'center',width:'10%'}
	      ,{field:'time',title: '直播时长',align:'center',width:'12%'}
	      ,{field:'bwin',title: '推送码率',align:'center',width:'12%'}
	      ,{field:'bytesin',title: '推送流量',align:'center',width:'12%'}
	      ,{field:'online',title: '在线人数',align:'center',width:'10%'}
	      ,{field:'address',title: '推流地址',hide:true}
	      ,{field:'play',title: '播放',align:'center',width:'10%'
	          ,templet: function(d){
	        	  if(d.time==null){
	        		  return '<span class="icon-play" code="'+d.code+'" address="'+d.address+'" style="display:none;font-size:20px;line-height:28px;"></span>';
	        	  }else{
	        		  return '<span class="icon-play" code="'+d.code+'" address="'+d.address+'" style="font-size:20px;line-height:28px;"></span>';
	        	  }
	          } 
	      }
	      ,{field:'id',hide:true}
	      ,{field:'sign',hide:true}
	      ,{field:'allowpersons',hide:true}
      ]];
	  var tableData=null;
	  //视频回放表格渲染
	  table.render({
	    elem: '#table'
	    ,url:'/ResourceMonitor/video/queryVideo'
	    //,cellMinWidth:85 
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