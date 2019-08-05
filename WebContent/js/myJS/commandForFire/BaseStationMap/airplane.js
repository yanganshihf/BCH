var airplane={
	source:null,
	layerIndex:-1,
	clearLayer:function(){
		positionLayer.removeAll();
		trailLayer.removeAll();
	},
	loadAirplane:function(){
		if (!!window.EventSource) { 
			this.source= new EventSource('http://60.205.206.180:8080/ResourceMonitor/video/sse');//发送消息
			//this.source= new EventSource('http://127.0.0.1:8878/ResourceMonitor/video/sse');//发送消息
		}
		var html='<table style="width: 100%;">'
			+'<thead>'
			+'<tr style="width: 100%; height: 38px; background-color: #E6E6E6;">'
			+'<th style="width:125px; text-align: center; color: #058563;">名称</th>'
			+'<th style="width:90px; text-align: center; color: #058563;">状态</th>'
			+'<th style="text-align: center; color: #058563;">播放</th>'
			+'</tr>'
			+'</thead>'
			+'</table>'
			+'<table id="table" lay-filter="filter" style="margin:0px;"></table>';
		$("#airplaneDiv").html(html);
		airplane.loadLive();
		
		$("#airplaneLive").off().on("click",function(){
			$("#airplaneLive").css({"background-color":"#058563","color":"#fff"});
			$("#airplaneRecord").css({"background-color":"transparent","color":"#555;"});
			var html='<table style="width: 100%;">'
				+'<thead>'
				+'<tr style="width: 100%; height: 38px; background-color: #E6E6E6;">'
				+'<th style="width:125px; text-align: center; color: #058563;">名称</th>'
				+'<th style="width:90px; text-align: center; color: #058563;">状态</th>'
				+'<th style="text-align: center; color: #058563;">播放</th>'
				+'</tr>'
				+'</thead>'
				+'</table>'
				+'<table id="table" lay-filter="filter" style="margin:0px;"></table>';
			$("#airplaneDiv").html(html);
			airplane.loadLive();
		});
		$("#airplaneRecord").off().on("click",function(){
			$("#airplaneRecord").css({"background-color":"#058563","color":"#fff"});
			$("#airplaneLive").css({"background-color":"transparent","color":"#555;"});
			var html='<table id="formTable">'
				+'<tr style="height:30px;">'
				+'<td style="width:80px;"><label for="time" style="float:left;">起止时间</label></td>'
				+'<td><input class="form-control" type="text" id="time" style="width:200px;float:left;"/>'
				+'</td>'
				+'</tr>'
				+'<tr style="height:30px;">'
				+'<td><label for="name">无人机名称</label> </td>'
				+'<td><input class="form-control" type="text" id="name" style="width:200px;"/></td>'
				+'</tr>'
				+'<tr style="height:30px;">'
				+'<td><label for="code">无人机ID</label> </td>'
				+'<td><input class="form-control" type="text" id="code" style="float:left;width:130px;"/>'
				+'<button style="float:left;margin-left:25px;" type="button" class="btn btn-default" id="submitButton" title="查询">'
				+'<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">'
				+'</button></td>'
				+'</tr>'
				+'</table>'
				+'<div  id="gridCond">'
				+'<table style="width: 100%;">'
				+'<thead>'
				+'<tr style="width: 100%; height: 38px; background-color: #E6E6E6;">'
				+'<th style="width:80px; text-align: center; color: #058563;">名称</th>'
				+'<th style="width:135px; text-align: center; color: #058563;">开始时间</th>'
				+'<th style="text-align: center; color: #058563;">播放</th>'
				+'</tr>'
				+'</thead>'
				+'</table>'
				+'<table id="table" lay-filter="filter"></table>'
				+'</div>';
			$("#airplaneDiv").html(html);
			airplane.loadRecord();
		});
	},
	/*无人机直播*/
	loadLive:function(){
		var source=this.source;
		layui.use(['table','util'], function(){
			  var util = layui.util;
			  var table = layui.table;
			  var closData =  [[
			      {field:'name',title: '名称',align:'center',width:125}
			      ,{field:'state',title: '状态',align:'center',width:90,
			          templet: function(d){
			        	  if(d.time==null){
			        		  return '无直播';
			        	  }else{
			        		  return '正在直播';
			        	  }
			          } 
			      }
			      ,{field:'play',title: '播放',align:'center',
			          templet: function(d){
			        	  if(d.time==null){
			        		  return '<span class="icon-play" code="'+d.code+'" address="'+d.address+'" style="display:none;font-size:20px;line-height:28px;"></span>';
			        	  }else{
			        		  return '<span class="icon-play" code="'+d.code+'" address="'+d.address+'" style="font-size:20px;line-height:28px;"></span>';
			        	  }
			          } 
			      }
			      ,,{field:'code',hide:true}
		      ]];
			  var tableData=null;
			  //视频回放表格渲染
			  table.render({
			    elem: '#table'
			    ,url:'/ResourceMonitor/video/queryVideo'
			    ,cols:closData
			  	,id: 'tableId'
			  	,title:'视频直播'
			  	,page: false
			  	//,height: 'full-200'
			  	, skin: 'line' 
		  	  	,done: function(res, curr, count){
		  	  		tableHeight = $("#panelUAV").height() - 110;
			  		$('.layui-table-header th').css('display', 'none');
			  		$(".layui-table-body").height(tableHeight);
			  		$(".layui-table-box").height(tableHeight);
			  		$(".layui-form").height(tableHeight);
		  			source.onmessage=function(event){
		  				var data = JSON.parse(event.data);
		  				for(var i=0;i<count;i++){
		  					var tr = $("tr[data-index="+i+"]");
		  					var rowCode = tr.find("td[data-field=code]").find("div").html();
		  					var video = data[rowCode];
		  					if(video!= undefined){
		  						var time = video.time;
		  						tr.find("td[data-field=state]").find("div").html("正在直播");
		  						tr.find("td[data-field=play]").find("div").find(".icon-play").css("display","");
		  					}else{
		  						tr.find("td[data-field=state]").find("div").html("无直播");
		  						tr.find("td[data-field=play]").find("div").find(".icon-play").css("display","none");
		  					}
		  				}
		  	 		}; 
		  	  	}
			  });
			  $(window).resize(function() {
				  tableHeight = $("#panelUAV").height() - 110;
				  $(".layui-table-body").height(tableHeight);
				  $(".layui-table-box").height(tableHeight);
				  $(".layui-form").height(tableHeight);
				  
			  });
				$('body').on("click",".icon-play",function(){
					var address = $(this).attr("address");
					var code = $(this).attr("code");
					$("#address").val(address);
					$("#usercode").val(code);
					if(airplane.layerIndex!=-1){
						layer.msg("请关闭正在运行的视频播放窗口！");
						return;
					}
					view.goTo({
						tilt: 0,
						heading:0
					});
					airplane.layerIndex = layer.open({
						type : 2,
						id:'liveLayer',
						title : '无人机-'+code,
						content : '/ResourceMonitor/jsp/commandForFire/layer/rtmpPlayer.html',
						area: ['450px', '400px'],
						offset: 'rb',
						shade :0,
						success:function(layero, index){
						    var body = layer.getChildFrame('body', index);
						    var iframeWin = window[layero.find('iframe')[0]['name']]; 
							$(".layui-layer-iframe").append("<span class='layui-layer-setwin' style='right: 45px;'><a id='lockId' class='icon-lock'  title='锁定' href='javascript:;' style='font-size:20px;text-decoration: none;'></a></span>")
							$("#lockId").off().on("click",function(){
					        	   if($("#lockId").attr("title")=='锁定'){
					        		   $("#lockId").attr("title","解锁");
					        		   $("#lockId").attr("class","icon-unlock");
					        		   iframeWin.ws.onmessage=function(evt){
					    	               var result = evt.data;
					    	               var message = result.split(',');
					    	               iframeWin.moveTo(message,0)
					        		   }
					        	   }else{
					        		   $("#lockId").attr("title","锁定");
					        		   $("#lockId").attr("class","icon-lock");
					        		   iframeWin.ws.onmessage=function(evt){
					    	               var result = evt.data;
					    	               var message = result.split(',');
					    	               iframeWin.moveTo(message,1)
					        		   }
					        	   }
							})
						},
						end:function(index, layero){
							layer.close(index);
							airplane.layerIndex=-1;
							airplane.clearLayer();
						}
					});
				});
			});		
	},
	/*回放*/
	loadRecord:function(){
		$("body").off();
		layui.use(['laydate','table','util'], function(){
			//var nginxserver = 'http://127.0.0.1:8088/';
			  var nginxserver = 'http://60.205.206.180:8088/';
			  var rtspUrl = 'rtmp://60.205.206.180:1935/vod//';
			  var laydate = layui.laydate;
			  var util = layui.util;
			  //日期时间范围
			  laydate.render({
			    elem: '#time'
			    ,range: '~'
			    ,format: 'yyyy-M-d'
			  });
			  var threeAgo = moment().subtract(2,'days').format("YYYY-M-DD");
			  var now=moment().format("YYYY-M-DD");
			  $("#time").val(threeAgo+" ~ "+now);
			  var table = layui.table;
			  var closData =  [[
			      {field:'name',title: '名称',align:'center',width:74}
			      ,{field:'starttime',title: '开始时间',align:'center',width:144
			          ,templet: function(d){
			              return util.toDateString(d.starttime,'yyyy/MM/dd HH:mm:ss').substr(2);
			          }    
			      }
			      ,{title: '播放',align:'center',toolbar: '#goRecord',width:58}
		      ]];
			  var time = $("#time").val();
			  var start=time.split(' ~ ')[0];
			  var end=time.split(' ~ ')[1];
			  start=start.replace('-','年').replace('-','月')+'日';
			  end=end.replace('-','年').replace('-','月')+'日';
			  //视频回放表格渲染
			  table.render({
			    elem: '#table'
			    ,url:'/ResourceMonitor/record/queryRecord'
			    ,cellMinWidth: 60 
			    ,cols:closData
			  	,id: 'tableId'
			  	,page: {
			  		layout:['prev', 'page', 'next']			  		
			  	}
			  
			  	//,height: 'full-300'
			  	, skin: 'line' 
			  	,limits:[10,30,90]
			  	,where:{
			  		time:(start+'-'+end),
			  	},
			  	done:function(){
			  		tableHeight = $("#panelUAV").height() - 240;
			  		$('.layui-table-header').css('display', 'none');
			  		$(".layui-table-body").height(tableHeight);
			  		$(".layui-table-box").height(tableHeight);
			  		$(".layui-form").height(tableHeight);
			  	}
			  });
			  $(window).resize(function() {
				  tableHeight = $("#panelUAV").height() - 240;
				  $(".layui-table-body").height(tableHeight);
				  $(".layui-table-box").height(tableHeight);
				  $(".layui-form").height(tableHeight);
			  });
			  //查询
			  $("#submitButton").off().on("click",function(){
				  queryTable();
			  }); 
			  function queryTable(){
				  var time = $("#time").val();
				  var start=time.split(' ~ ')[0];
				  var end=time.split(' ~ ')[1];
				  start=start.replace('-','年').replace('-','月')+'日';
				  end=end.replace('-','年').replace('-','月')+'日';
			      table.reload('tableId', {
			        page: {
			          curr: 1 
			        }
			        ,where: {
			            name:$("#name").val(),
			            code:$("#code").val(),
			            time:(start+'-'+end),
			        }
			      });
			  }
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
				 if(airplane.layerIndex!=-1){
					layer.msg("请关闭正在运行的视频播放窗口！");
					return;
				 }
				 view.goTo({
					tilt: 0,
					heading:0
				 });
				 airplane.layerIndex =  layer.open({
					type : 2,
					id:'recordLayer',
					title : '播放录像',
					area: ['450px', '400px'],
					offset: 'rb',
					shade :0,
					content : '/ResourceMonitor/jsp/commandForFire/layer/flvPlayer.html',
					end:function(index, layero){
						layer.close(index);
						airplane.layerIndex=-1;
						airplane.clearLayer();
					}
				 }); 
			  });
			});	
	}
}







     

     


    //

