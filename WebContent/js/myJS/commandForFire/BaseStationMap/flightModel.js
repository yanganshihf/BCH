var iIsGoingTime=1;
var iIsGoingData=null;
var eChartTimer=null;
var beforObj=null;
function loadFlight(){
	$('#flightEchart').css('visibility','hidden');
	$("#flightModelMessage").attr('class','esri-icon-non-visible');
	$("#flightModelMessage").attr('title','剖面信息隐藏');
	$('#flightVisual').val('80');
	$("#flightVisual").off().on("change",function(){
		view.goTo({
			tilt: parseInt($('#flightVisual').val()),
		})
		if(beforObj!=null){
			beforObj.update({
  	  	      start: 1
  	  	    });
		}
	});
	$("#flightModelMessage").off().on("click",function(){
		if($(this).attr('class')=='esri-icon-visible'){
			$('#flightEchart').css('visibility','hidden');
			$(this).attr('class','esri-icon-non-visible');
			$(this).attr('title','剖面信息隐藏');
		}else{
			if(iIsGoingData==null){
				layer.msg('没有正在飞行的路线！');
			}else{
				$('#flightEchart').css('visibility','visible');
				$(this).attr('class','esri-icon-visible');
				$(this).attr('title','剖面信息可视');
			}
		}
	});
	layui.use(['laydate','table','util'], function(){
	  var util = layui.util;
	  var table = layui.table;
	  var closData =  [[
		{field:'name',title: '路线名称',align:'center',width:126}
	   ,{field:'start',title: '飞行',align:'center',width:40,
		   templet: function(d){
			   if(d.start==1){
				   return '<img style="margin-top:5px;" title="飞行" lay-event="start" src="/ResourceMonitor/images/mark/32/going.png">';
			   }else{
				   return '<img style="margin-top:5px;" title="暂停" lay-event="start" src="/ResourceMonitor/images/mark/32/pause.png">'
			   }
	       }
	   }
	   ,{field:'stop',title: '停止',align:'center',width:36,toolbar: '#flightModelStop'}
	   ,{field:'delete',title: '删除',align:'center',width:36,toolbar: '#flightModelDelete'}
	   ,{field:'edit',title: '编辑',align:'center',width:36,toolbar: '#flightModelEdit'}
	   ,{field:'detail',title: '详情',align:'center',width:36,toolbar: '#flightModelDetail'}
      ]];
	  //事件渲染
	  table.render({
	    elem: '#FlightTable'
	    ,url:'/ResourceMonitor/flightModel/queryFlightModel'
	    //,cellMinWidth: 60 
	    ,cols:closData
	  	,id: 'FlightTableId'
	  	,page: {
	  		layout:['prev', 'page', 'next']			  		
	  	}
	  	,height: '370'
	  	, skin: 'line' 
	  	,limit:11
		,where : {
			name : "",
			//time : $("#timesFlight").val()
		},
	  	done:function(){
	  		tableHeight = $(window).height();
	  		$('.layui-table-cell').css('padding','0px');
	  		$('.layui-table-header').css('display', 'none');
	  		$(".layui-table-body").height(tableHeight-345);
	  		$(".layui-table-box").height(tableHeight-345);
	  		$(".layui-form").height(tableHeight-345);
	  	}
	  });
	  $(window).resize(function() {
		  	tableHeight = $(window).height();
	  		$(".layui-table-body").height(tableHeight-345);
	  		$(".layui-table-box").height(tableHeight-345);
	  		$(".layui-form").height(tableHeight-345);
	  });
	  function reloadTable(){
		  var personName = $("#panelFlight #personName").val();
	      table.reload('FlightTableId', {
	        page: {
	          curr: 1 
	        }
	        ,where: {
	        	name : personName,
  				//time : time
	        }
	      });
	  }
	  //查询
	 $("#refreshFlightButton").off().on("click",function(){
		 $("#panelFlight #personName").val('');
		 reloadTable();
	  }); 
	 //重置3
	 $("#submitFlightButton").off().on("click",function(){
		 reloadTable();
	  }); 
	  $("#flightLineDraw").off().on("click",function(){
		  funFlightLineDraw(reloadTable);
	  });
	  $("#flightLineExcel").off().on("click",function(){
		 layer.open({
    			title:'导入坐标信息',
    			type: 2,
    			id:"uploadExcel",
    			area: ['400px', '300px'],
    			btn : [ '上传', '取消' ],
    			content: ['/ResourceMonitor/jsp/commandForFire/BaseStationMap/layers/importFlightExcel.jsp','no'],
    			yes : function(index, layero) {
					var iframeWin = window[layero.find('iframe')[0]['name']]; 
					layer.close(index);
					iframeWin.uploadFile(reloadTable);
				},
    	 });
	  });
	  //点击定位事件
  	  table.on('tool(FlightFilter)', function(obj){
	        function gotoPoint(i,data) {
				require(["esri/Camera","esri/geometry/Point","esri/Graphic",
	  				"esri/geometry/Polyline","esri/geometry/geometryEngine"], 
	  			function(Camera,Point,Graphic,Polyline,geometryEngine) {
					var points = data.points;
					var zoom = data.zoom;
					var speed = data.speed;
	            	if(i>points.length-1){
	      				if(beforObj!=null){
	      					beforObj.update({
	      		  	  	      start: 1
	      		  	  	    });
	      		            if(eChartTimer!=null){
	      		            	clearInterval(eChartTimer);
	      		            }
	      				}
	            		return;
	            	}
	                var twoPointLine = new Polyline({
	                    paths : [points[i-1],points[i]],
	                    spatialReference : view.spatialReference
	                });
	                var twoPointLength = geometryEngine.geodesicLength(twoPointLine,'meters');
	                var duration = (twoPointLength/speed)*1000;
	                var heading = pointToAngle(points[i-1],points[i]);
					var x= points[i][0];
					var y= points[i][1];
	  				var  point = new Point({
		  				x: x, 
		  			    y: y,      
		  			    spatialReference:view.spatialReference
	  				})
	  				view.goTo({
	  					heading: heading, 
	  				}).then(function(){
		  				view.goTo({
		  					target : point,
		  					zoom:zoom,
		  					tilt: parseInt($('#flightVisual').val()),
		  				}, {
		  					maxDuration:duration,
		  					duration:duration,
		  					easing : 'linear'
		  				}).then(function(){
		  					iIsGoingTime++;
		  					gotoPoint(iIsGoingTime,data);
		  				});
	  				});
				});
	    	}
  		  if(obj.event=='start'){
  			  if(iIsGoingData==null||iIsGoingData.id != obj.data.id){
  				if(beforObj!=null){
  					beforObj.update({
  		  	  	      start: 1
  		  	  	    });
  				}
  				beforObj=obj;
  	  			var data=obj.data;
	  	  	    obj.update({
	  	  	      start: 0
	  	  	    });
  	  			require(["esri/Camera","esri/geometry/Point","esri/Graphic",
  	  				"esri/geometry/Polyline","esri/geometry/geometryEngine"], 
  	  			function(Camera,Point,Graphic,Polyline,geometryEngine) {
  					var points = JSON.parse(data.points);
  					var zoom = data.zoom;
  					var speed = data.speed;
  	                var flightline=new Polyline({
  	                    paths : points,
  	                    spatialReference : view.spatialReference
  	                });
  	                var graphic = new Graphic({
  	                    geometry : flightline,
  	                    symbol : {
  	                        type : "simple-line", 
  	                        color : [0, 0,255],
  	                        width : 6,
  	                        cap : "round",
  	                        join : "round"
  	                    }
  	                });
  	                var flightlineDensify=geometryEngine.densify(flightline,5000,'meters');
  	                points=flightlineDensify.paths[0];
  	                data.points=points;
  	                iIsGoingData=data;

  	  				var  firstPoint = new Point({
  		  				x: points[0][0], 
  		  			    y: points[0][1],      
  		  			    spatialReference:view.spatialReference
  	  				})
  	  				
  	  				var heading = pointToAngle(points[0],points[1]);
  	  				iIsGoingTime=1;
  	  				view.goTo({
  	  					target : firstPoint,
  	  					heading: heading, 
  	  					tilt: parseInt($('#flightVisual').val()),
  	  					zoom:zoom
  	  				}).then(function(){
  	  					view.graphics.removeAll();
  	  					view.graphics.add(graphic);
  	  					setTimeout(() => {
	  	  	                flightline=geometryEngine.densify(flightline,500,'meters');
	  	  	                demQueryLayer.queryElevation(
	  	  	                flightline, 
	  	  	                {returnSampleInfo:false}).then(function(result){
	  	  	                    var myChart = echarts.init(document.getElementById('flightEchart'));
	  	  	                    var geometry=result.geometry;
	  	  	                    var path = geometry.paths[0];
	  	  	                    var data=[];
	  	  	                    for (var i = 0; i < path.length; i++) {
	  	  	                        var polyline=new Polyline({
	  	  	                            paths : flightline.paths[0].slice(0,i+1),
	  	  	                            spatialReference : view.spatialReference
	  	  	                        });
	  	  	                        var length = geometryEngine.geodesicLength(polyline,'meters');
	  	  	                        data.push([length.toFixed(0), path[i][2].toFixed(2)]);
	  	  	                    }
	  	  	                    var getOption=function(param){
	  	  	                        return{
	  	  	                                animation: false,
	  	  	                                legend: {
	  	  	                                	textStyle:{
	  	  	                                		color:'#fff'
	  	  	                                	}
	  	  	                                },
	  	  	                                tooltip: {
	  	  	                                    trigger: 'axis',
	  	  	                                    axisPointer: {
	  	  	                                        type: 'line',
	  	  	                                        label: {
	  	  	                                            backgroundColor: '#6a7985'
	  	  	                                        }
	  	  	                                    }
	  	  	                                },
	  		  	                            toolbox: {
	  		  	                                feature: {
	  		  	                                    myTool2: {
	  		  	                                        show: true,
	  		  	                                        title: '关闭',
	  		  	                                        icon: 'image:///ResourceMonitor/images/layerTitle/closeButton.png',
	  		  	                                        onclick: function (){
	  		  	                                        	$('#flightEchart').css('visibility','hidden');
	  		  	                                        	$('#flightModelMessage').attr('class','esri-icon-non-visible');
	  		  	                                        	$('#flightModelMessage').attr('title','剖面信息隐藏');
	  		  	                                        	if($('#panelFlight').css('display')=='none'){
	  		  	                                        		view.center=view.center;
	  		    	  	          		           	            if(eChartTimer!=null){
	  			    	  	      		           	            	clearInterval(eChartTimer);
	  			    	  	      		           	            	eChartTimer=null;
	  		    	  	          		           	            }
	  	    	  	          		           	            }
	  		  	                                        }
	  		  	                                    }
	  		  	                                }
	  		  	                            },
	  	  	                                xAxis: {
	  	  	                                    type: 'category',
	  	  	                                    //boundaryGap: false,
	  	  	                                    splitLine: {
	  	  	                                        show: false
	  	  	                                    },
	  	  	                                    show:false
	  	  	                                },
	  	  	                                yAxis: {
	  	  	                                    type: 'value',
	  	  	                                    axisTick: {
	  	  	                                        inside: true
	  	  	                                    },
	  	  	                                    splitLine: {
	  	  	                                        show: false
	  	  	                                    },
	  	  	                                    axisLabel: {
	  	  	                                        color:'#fff',
	  	  	                                        formatter: '{value}米\n'
	  	  	                                    },
	  	  	                                },
	  	  	                                grid: {
	  	  	                                    top: 40,
	  	  	                                    left: 60,
	  	  	                                    right: 0,
	  	  	                                    height: 140,
	  	  	                                    width:600
	  	  	                                    //containLabel:true
	  	  	                                },
	  	  	                                series: [
	  	  	                                    {
	  	  	                                        name:'地面海拔',
	  	  	                                        type:'line',
	  	  	                                        smooth: true,
	  	  	                                        symbol:'none',
	  	  	                                        areaStyle:{
	  	  	                                        	//color:'rgb(255,70,131)'
	  	  	                                        },
	  	  	                                        data: data
	  	  	                                    },
	  	  	                                    {
	  	  	                                        name:'已漫游',
	  	  	                                        type:'line',
	  	  	                                        smooth: true,
	  	  	                                        symbol:'none',
	  	  	                                        itemStyle:{
	  	  	                                        	color:'rgb(238,204,89)'
	  	  	                                        },
	  	  	                                        areaStyle:{
	  	  	                                        	color:'rgb(238,204,89)'
	  	  	                                        },
	  	  	                                        data: data.slice(0,param+1)
	  	  	                                    }
	  	  	                                ]
	  	  	                            };
	  	  	                    }
	  	  	                    var option=getOption(data[0][0]);
	  	  	                    // 使用刚指定的配置项和数据显示图表。
	  	  	                    myChart.setOption(option);
	  	  	                    if(eChartTimer!=null){
	  	  	                    	clearInterval(eChartTimer);
	  	  	                    }
	  	  	                    eChartTimer=setInterval(() => {
	  	  	                    	var center = geometryEngine.nearestVertex(flightline,view.center);
	  	  	                    	if(center.distance<300){
	  	  	  	                    	var option=getOption(center.vertexIndex);
	  	  	  	                    	myChart.setOption(option);
	  	  	                    	}
	  	  						}, 500);
	  	  	                });
	  	  					gotoPoint(1,data);
  	  					}, 3000);
  	  				});
  	  			});  
  			  }else if(iIsGoingData.id == obj.data.id){
  				  if(obj.data.start==1){
  		  	  	    obj.update({
  		  	  	      start: 0
  		  	  	    });
  		  			require(["esri/Camera","esri/geometry/Point","esri/Graphic",
  	  	  				"esri/geometry/Polyline","esri/geometry/geometryEngine"], 
  	  	  			function(Camera,Point,Graphic,Polyline,geometryEngine) {
  	  					var nowPnt = view.center;
  	    				var points = iIsGoingData.points;
  	    				var zoom = iIsGoingData.zoom;
  	    				var speed = iIsGoingData.speed;
  		                var twoPointLine = new Polyline({
  		                    paths : [[nowPnt.x,nowPnt.y],points[iIsGoingTime]],
  		                    spatialReference : view.spatialReference
  		                });
  		                var twoPointLength = geometryEngine.geodesicLength(twoPointLine,'meters');
  		                var duration = (twoPointLength/speed)*1000;
  		  				var  nextPoint = new Point({
  			  				x: points[iIsGoingTime][0], 
  			  			    y: points[iIsGoingTime][1],      
  			  			    spatialReference:view.spatialReference
  		  				})
  		  				var heading = pointToAngle([nowPnt.x,nowPnt.y],points[iIsGoingTime]);
  		  				view.goTo({
  		  					target : nextPoint,
  		  					heading:heading,
  		  					zoom:zoom,
  		  					tilt: parseInt($('#flightVisual').val()),
  		  				}, {
  		  					maxDuration:duration,
  		  					duration:duration,
  		  					easing : 'linear'
  		  				}).then(function(){
  		  					iIsGoingTime++;
  		  					gotoPoint(iIsGoingTime,iIsGoingData);
  		  				});
  	  	  			});
  				  }else{
  		  	  	    obj.update({
  		  	  	      start: 1
  		  	  	    });
  					view.center=view.center;    
  				  }
  			  }
  		  }else if(obj.event=='stop'){
  			if(iIsGoingData.id == obj.data.id){
  				view.center=view.center;
	  	  	    obj.update({
	  	  	      start: 1
	  	  	    });
  	  			iIsGoingTime=1;
  	  			iIsGoingData=null;
  			}else{
  				 layer.msg('该路线当前不在飞行！');
  			}
  		  }else if(obj.event=='delete'){
  			  var data=obj.data;
  			  var id=data.id;
  			  layer.confirm('确定删除这条记录?', function(index){
  				  	layer.close(index);
				  	$.post("/ResourceMonitor/flightModel/deleteFlightModel",
		    	    {
				    	id
		    	    },
		    	        function(data,status){
				    	if(data.code>0){
				    		layer.msg('删除成功！');
				    		reloadTable();
				    	}
		    	    });
  			  }); 

  			  
  		  }else if(obj.event=='edit'){
  			var data=obj.data;
  			var id=data.id;
  			layer.open({
  				title : "飞行漫游设置",
  				type : 2,
  				resize : false,
  				area : [ '245px', '250px' ],
  				content : 'flightLineDraw.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
  				btn : [ '确定', '取消' ],
  				success:function(layero,index) {
				    $.post("/ResourceMonitor/flightModel/queryFlightModelById",
		    	    {
				    	id
		    	    },
		    	        function(data,status){
	  					var body = layer.getChildFrame('body', index);
	  					body.find("#name").val(data.name);
	  					body.find("#zoom").val(data.zoom);
	  					body.find("#speed").val(data.speed);
	  					body.find("#speedVal").html(data.speed+'M/S');
		    	    });
  				},
  				yes : function(index, layero) {
  					var body = layer.getChildFrame('body', index);
  					var name = body.find("#name").val();
  					if(name==''){
  						layer.msg('路线名称不能为空!');
  						return;
  					}
  					var zoom = body.find("#zoom").val();
  					var speed = body.find("#speed").val();
					zoom=parseFloat(zoom);
					speed=parseFloat(speed);
					var time=new Date();
				    $.post("/ResourceMonitor/flightModel/editFlightModel",
		    	    {
				    	id,
				    	zoom,
				    	speed,
				    	time,
				    	name
		    	    },
		    	        function(data,status){
				    	if(data.code>0){
				    		layer.close(index);
				  			if(iIsGoingData.id == obj.data.id){
				  				layer.msg("飞行方案编辑成功,重新开始飞行生效!");
			  		  	  	    obj.update({
		  				    	  zoom:zoom,
						    	  speed:speed,
						    	  time:time,
						    	  name:name
		    		  	  	    });
				  			}else{
				  				layer.msg("飞行方案编辑成功!");
				  				reloadTable();
				  			}
				    	}
		    	    });	
  				},
  				btn2 : function(index, layero) {
  					layer.close(index); // 如果设定了yes回调，需进行手工关闭
  				},
  			}); 			  
  		  }else if(obj.event=='detail'){
			var data=obj.data;
  			var id=data.id;
  			layer.open({
  				title : "详情",
  				type : 2,
  				resize : false,
  				area : [ '270px', '240px' ],
  				content : 'flightLineDetail.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
  				success:function(layero,index) {
				    $.post("/ResourceMonitor/flightModel/queryFlightModelById",
		    	    {
				    	id
		    	    },
		    	        function(data,status){
	  					var body = layer.getChildFrame('body', index);
	  					body.find("#name").val(data.name);
	  					body.find("#zoom").val(data.zoom);
	  					body.find("#speed").val(data.speed+'M/S');
	  					var time = util.toDateString(new Date(data.time), 'yyyy-MM-dd HH:mm:ss');
	  					body.find("#time").val(time);
		    	    });
  				}
  			}); 			  
  		  }
  	  });
	  
	}); 	 
}
function loadFlight2(){
	layui.use(['laydate','table','util'], function(){
	  var laydate = layui.laydate;
	  var util = layui.util;
	  laydate.render({
	    elem: '#timesFlight2'
	    ,range: '~'
	    ,format: 'yyyy-M-d'
	  });
	 //var threeAgo = moment().subtract(3,'days').format("YYYY-M-DD");
	  var now=moment().format("YYYY-M-DD");
	  $("#timesFlight2").val(now+" ~ "+now);
	  var table = layui.table;
	  var closData =  [[
		    {field:'time',title: '设计日期',align:'center',width:65,templet: function(d){
	              return util.toDateString(d.time,'yyyy/MM/dd').substr(2)
	          }  
		    }
		   ,{field:'name',title: '路线名称',align:'center',width:100}
		   ,{field:'start',title: '飞行',align:'center',width:36,
			   templet: function(d){
				   if(d.start==1){
					   return '<img style="margin-top:5px;" title="飞行" lay-event="start" src="/ResourceMonitor/images/indexpage/fei.png">';
				   }else{
					   return '<img style="margin-top:5px;" title="暂停" lay-event="start" src="/ResourceMonitor/images/indexpage/pause.png">'
				   }
		       }
		   }
		   ,{field:'stop',title: '停止',align:'center',width:36,toolbar: '#flightModelStop'}
		   ,{field:'delete',title: '删除',align:'center',width:36,toolbar: '#flightModelDelete'}
		   ,{field:'edit',title: '编辑',align:'center',width:36,toolbar: '#flightModelEdit'}
	      ]];
	  //事件渲染
	  table.render({
	    elem: '#FlightTable2'
	    ,url:'/ResourceMonitor/flightModel/queryFlightModelCenter'
	    //,cellMinWidth: 60 
	    ,cols:closData
	  	,id: 'FlightTableId2'
	  	,page: {
	  		layout:['prev', 'page', 'next']			  		
	  	}
	  	,height: '350'
	  	, skin: 'line' 
	  	,limits:[10,30,90]
		,where : {
			name : "",
			time : $("#timesFlight2").val()
		},
	  	done:function(){
	  		tableHeight = $(window).height();
	  		$('.layui-table-cell').css('padding','0px');
	  		$('.layui-table-header').css('display', 'none');
	  		$(".layui-table-body").height(tableHeight-350);
	  		$(".layui-table-box").height(tableHeight-350);
	  		$(".layui-form").height(tableHeight-350);
	  	}
	  });
	  $(window).resize(function() {
		  	tableHeight = $(window).height();
	  		$(".layui-table-body").height(tableHeight-350);
	  		$(".layui-table-box").height(tableHeight-350);
	  		$(".layui-form").height(tableHeight-350);
	  });
	  function reloadTable(){
		  var personName = $("#panelFlight #personName2").val();
		  var time = $("#panelFlight #timesFlight2").val();	
	      table.reload('FlightTableId2', {
	        page: {
	          curr: 1 
	        }
	        ,where: {
	        	name : personName,
  				time : time
	        }
	      });
	  }
	  //查询
	 $("#submitFlightButton2").off().on("click",function(){
		 reloadTable();
	  }); 
	  $("#flightLineDraw2").off().on("click",function(){
		  funFlightLineDrawCenter(reloadTable);
	  });
	  //点击定位事件
  	  table.on('tool(FlightFilter2)', function(obj){
	        function gotoPoint(i,data) {
				require(["esri/Camera","esri/geometry/Point","esri/Graphic",
	  				"esri/geometry/Polyline","esri/geometry/geometryEngine"], 
	  			function(Camera,Point,Graphic,Polyline,geometryEngine) {
					var points = data.points;
					var zoom = data.zoom;
					var speed = data.speed;
					var center = data.center;
					var targetPoint = points[i];
					var startPoint = points[i-1];
	            	if(i>points.length-1){
	            		startPoint = points[points.length-1]
	            		targetPoint = points[0];
	            		iIsGoingTime=0;
	            	}
	                var twoPointLine = new Polyline({
	                    paths : [startPoint,targetPoint],
	                    spatialReference : view.spatialReference
	                });
	                var twoPointLength = geometryEngine.geodesicLength(twoPointLine,'meters');
	                var duration = (twoPointLength/speed)*1000;
	                var heading = pointToAngle(targetPoint,center);
					var x= targetPoint[0];
					var y= targetPoint[1];
	  				var  point = new Point({
		  				x: x, 
		  			    y: y,      
		  			    spatialReference:view.spatialReference
	  				})
	  				view.goTo({
	  					heading: heading, 
	  					target : point,
	  					zoom:zoom
	  				}, {
	  					maxDuration:duration,
	  					duration:duration,
	  					easing : 'linear'
	  				}).then(function(){
	  					iIsGoingTime++;
	  					gotoPoint(iIsGoingTime,data);
	  				});
				});
	    	}
  			
  		  if(obj.event=='start'){
  			  if(iIsGoingData==null||iIsGoingData.id != obj.data.id){
    				if(beforObj!=null){
    					beforObj.update({
    		  	  	      start: 1
    		  	  	    });
    				}
    				beforObj=obj;
    	  			var data=obj.data;
	  	  	  	    obj.update({
	  	  	  	      start: 0
	  	  	  	    });
		  			require(["esri/Camera","esri/geometry/Point","esri/Graphic",
		  				"esri/geometry/Polyline","esri/geometry/geometryEngine"], 
		  			function(Camera,Point,Graphic,Polyline,geometryEngine) {
						var points = JSON.parse(data.points).rings;
						var center = JSON.parse(data.points).center;
						var zoom = data.zoom;
						var speed = data.speed;
		                var flightline=new Polyline({
		                    paths : points,
		                    spatialReference : view.spatialReference
		                });
		                data.points=points;
		                data.center=center;
		                iIsGoingData=data;
	  	                demQueryLayer.queryElevation(
	  	                flightline, 
    	                {returnSampleInfo:false}).then(function(result){
    	                    var myChart = echarts.init(document.getElementById('flightEchart'));
    	                    var geometry=result.geometry;
    	                    var path = geometry.paths[0];
    	                    var data=[];
    	                    for (var i = 0; i < path.length; i++) {
    	                        var polyline=new Polyline({
    	                            paths : flightline.paths[0].slice(0,i),
    	                            spatialReference : view.spatialReference
    	                        });
    	                        var length = geometryEngine.geodesicLength(polyline,'meters');
    	                        data.push([length.toFixed(0), path[i][2].toFixed(2)]);
    	                    }
    	                    var getOption=function(param){
    	                        return{
    	                                animation: false,
    	                                legend: {
    	                                	textStyle:{
    	                                		color:'#fff'
    	                                	}
    	                                },
    	                                tooltip: {
    	                                    trigger: 'axis',
    	                                    axisPointer: {
    	                                        type: 'line',
    	                                        label: {
    	                                            backgroundColor: '#6a7985'
    	                                        }
    	                                    }
    	                                },
    	  	                            toolbox: {
    	  	                                feature: {
    	  	                                    myTool2: {
    	  	                                        show: true,
    	  	                                        title: '关闭',
    	  	                                        icon: 'image:///ResourceMonitor/images/layerTitle/closeButton.png',
    	  	                                        onclick: function (){
    	  	                                        	$('#flightEchart').css('visibility','hidden');
    	  	                                        	$('#flightModelMessage').attr('class','esri-icon-non-visible');
    	  	                                        	$('#flightModelMessage').attr('title','剖面信息隐藏');
    	  	                                        	if($('#panelFlight').css('display')=='none'){
    	  	                                        		view.center=view.center;
    	    	  	          		           	            if(eChartTimer!=null){
    		    	  	      		           	            	clearInterval(eChartTimer);
    		    	  	      		           	            	eChartTimer=null;
    	    	  	          		           	            }
        	  	          		           	            }
    	  	                                        }
    	  	                                    }
    	  	                                }
    	  	                            },
    	                                xAxis: {
    	                                    type: 'value',
    	                                    boundaryGap: false,
    	                                    splitLine: {
    	                                        show: false
    	                                    },
    	                                    show:false
    	                                },
    	                                yAxis: {
    	                                    type: 'value',
    	                                    axisTick: {
    	                                        inside: true
    	                                    },
    	                                    splitLine: {
    	                                        show: false
    	                                    },
    	                                    axisLabel: {
    	                                        color:'#fff',
    	                                        formatter: '{value}米\n'
    	                                    },
    	                                },
    	                                grid: {
    	                                    top: 40,
    	                                    left: 60,
    	                                    right: 0,
    	                                    height: 140,
    	                                    //containLabel:true
    	                                },
    	                                series: [
    	                                    {
    	                                        name:'地面海拔',
    	                                        type:'line',
    	                                        smooth: true,
    	                                        symbol:'none',
    	                                        areaStyle:{
    	                                        	//color:'rgb(255,70,131)'
    	                                        },
    	                                        data: data
    	                                    },
    	                                    {
    	                                        name:'已漫游',
    	                                        type:'line',
    	                                        smooth: true,
    	                                        symbol:'none',
    	                                        itemStyle:{
    	                                        	color:'rgb(238,204,89)'
    	                                        },
    	                                        areaStyle:{
    	                                        	color:'rgb(238,204,89)'
    	                                        },
    	                                        data: data.slice(0,param+1)
    	                                    }
    	                                ]
    	                            };
    	                    }
    	                    var option=getOption(data[0][0]);
    	                    // 使用刚指定的配置项和数据显示图表。
    	                    myChart.setOption(option);
    	                    if(eChartTimer!=null){
    	                    	clearInterval(eChartTimer);
    	                    }
    	                    eChartTimer=setInterval(() => {
    	                    	var center = geometryEngine.nearestVertex(flightline,view.center);
      	                    	if(center.distance<300){
      	  	                    	var option=getOption(center.vertexIndex);
      	  	                    	myChart.setOption(option);
      	                    	}
    						}, 500);
    	                });
		                var graphic = new Graphic({
		                    geometry : flightline,
		                    symbol : {
		                        type : "simple-line", 
		                        color : [255, 90, 0],
		                        width : 4,
		                        cap : "round",
		                        join : "round"
		                    }
		                });
		                view.graphics.removeAll();
		                view.graphics.add(graphic);
		  				var  firstPoint = new Point({
			  				x: points[0][0], 
			  			    y: points[0][1],      
			  			    spatialReference:view.spatialReference
		  				})
		  				var heading = pointToAngle(points[0],center);
		  				iIsGoingTime=1;
		  				view.goTo({
		  					target : firstPoint,
		  					heading: heading, 
		  					zoom:zoom,
		  					tilt: 75,
		  					
		  				}).then(function(){
		  					gotoPoint(1,data);
		  				});
		  			});
  			  }else if(iIsGoingData.id == obj.data.id){
  				  if(obj.data.start==1){
    		  	  	    obj.update({
    		  	  	      start: 0
    		  	  	    });
		  	  			require(["esri/Camera","esri/geometry/Point","esri/Graphic",
	  	  				"esri/geometry/Polyline","esri/geometry/geometryEngine"], 
		  	  			function(Camera,Point,Graphic,Polyline,geometryEngine) {
	  	  					var nowPnt = view.center;
		    				var points = iIsGoingData.points;
		    				var zoom = iIsGoingData.zoom;
		    				var speed = iIsGoingData.speed;
			                var twoPointLine = new Polyline({
			                    paths : [[nowPnt.x,nowPnt.y],points[iIsGoingTime]],
			                    spatialReference : view.spatialReference
			                });
			                var twoPointLength = geometryEngine.geodesicLength(twoPointLine,'meters');
			                var duration = (twoPointLength/speed)*1000;
			  				var  nextPoint = new Point({
				  				x: points[iIsGoingTime][0], 
				  			    y: points[iIsGoingTime][1],      
				  			    spatialReference:view.spatialReference
			  				})
			  				view.goTo({
			  					target : nextPoint,
			  					zoom:zoom
			  				}, {
			  					maxDuration:duration,
			  					duration:duration,
			  					easing : 'linear'
			  				}).then(function(){
			  					iIsGoingTime++;
			  					gotoPoint(iIsGoingTime,iIsGoingData);
			  				});
		  	  			});
  				  }else{
    		  	  	    obj.update({
	  		  	  	      start: 1
	  		  	  	    });
	  					view.center=view.center; 
  				  }
  			  }
  		  }else if(obj.event=='stop'){
  			if(iIsGoingData.id == obj.data.id){
  				view.center=view.center;
	  	  	    obj.update({
	  	  	      start: 1
	  	  	    });
  	  			iIsGoingTime=1;
  	  			iIsGoingData=null;
  			}else{
  				 layer.msg('该路线当前不在飞行！');
  			}
  		  }else if(obj.event=='delete'){
  			  var data=obj.data;
  			  var id=data.id;
  			  layer.confirm('确定删除这条记录?', function(index){
  				  	layer.close(index);
				  	$.post("/ResourceMonitor/flightModel/deleteFlightModelCenter",
		    	    {
				    	id
		    	    },
		    	        function(data,status){
				    	if(data.code>0){
				    		layer.msg('删除成功！');
				    		reloadTable();
				    	}
		    	    });
  			  }); 

  			  
  		  }else if(obj.event=='edit'){
  			var data=obj.data;
  			var id=data.id;
  			layer.open({
  				title : "飞行漫游设置",
  				type : 2,
  				resize : false,
  				area : [ '245px', '250px' ],
  				content : 'flightLineDraw.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
  				btn : [ '确定', '取消' ],
  				success:function(layero,index) {
				    $.post("/ResourceMonitor/flightModel/queryFlightModelCenterById",
		    	    {
				    	id
		    	    },
		    	        function(data,status){
	  					var body = layer.getChildFrame('body', index);
	  					body.find("#name").val(data.name);
	  					body.find("#zoom").val(data.zoom);
	  					body.find("#speed").val(data.speed);
	  					body.find("#speedVal").html(data.speed+'M/S');
		    	    });
  				},
  				yes : function(index, layero) {
  					var body = layer.getChildFrame('body', index);
  					var name = body.find("#name").val();
  					if(name==''){
  						layer.msg('路线名称不能为空!');
  						return;
  					}
  					var zoom = body.find("#zoom").val();
  					var speed = body.find("#speed").val();
					zoom=parseFloat(zoom);
					speed=parseFloat(speed);
					var time=new Date();
				    $.post("/ResourceMonitor/flightModel/editFlightModelCenter",
		    	    {
				    	id,
				    	zoom,
				    	speed,
				    	time,
				    	name
		    	    },
		    	        function(data,status){
				    	if(data.code>0){
				    		layer.close(index);
				    		layer.msg("飞行方案编辑成功!");
				    		reloadTable();
				    	}
		    	    });	
  				},
  				btn2 : function(index, layero) {
  					layer.close(index); // 如果设定了yes回调，需进行手工关闭
  				},
  			}); 			  
  		  }
  	  });
	  
	}); 	 
}
function pointToAngle(start,end){
	y_se=end[1]-start[1];
	x_se=end[0]-start[0];
	//var x = Math.atan(xLen/yLen);
	var angle=0;
	if (x_se==0 && y_se>0){
		angle = 360;
	}
	if (x_se==0 && y_se<0){
		angle = 180;
	}
	if (y_se==0 && x_se>0){
		angle = 90;
	}
	if (y_se==0 && x_se<0){
		angle = 270;
	}
	if (x_se>0 && y_se>0){
		angle = Math.atan(x_se/y_se)*180/Math.PI
	}else if(x_se<0 && y_se>0){
		angle = 360 + Math.atan(x_se/y_se)*180/Math.PI
	}else if(x_se<0 && y_se<0){
		angle = 180 + Math.atan(x_se/y_se)*180/Math.PI
	}else if(x_se>0 && y_se<0){
		angle = 180 + Math.atan(x_se/y_se)*180/Math.PI
	}
	return angle;

}
function funFlightLineDraw(reloadTable){
	   	 require([
		      "esri/Map",
		      "esri/views/MapView",
		      "esri/views/2d/draw/Draw",
		      "esri/Graphic",
		      "esri/geometry/Polyline",
		      "esri/geometry/Polygon",
		      "esri/tasks/support/Query",
		      "esri/geometry/geometryEngine",
		      "esri/geometry/Point",
		      "dojo/domReady!"
		    ], function(
		      Map, MapView,Draw, Graphic,Polyline,Polygon,Query,geometryEngine,Point
		    ){
   		     draw = new Draw({
       		   view: view
       		 });
   		     document.body.style.cursor='crosshair';
   		    enablecreatePolyline(draw, view);
            function enablecreatePolyline(draw, view) {
                var action = draw.create("polyline");
                view.focus();
                action.on("vertex-add", drawPolyline);
                action.on("cursor-update",drawPolyline);
                action.on("vertex-remove",drawPolyline);
                action.on("draw-complete",drawPolylineComplete);
            }
            function drawPolyline(evt) {
                var vertices = evt.vertices;           
                view.graphics.removeAll();
                // 新建一个多边形
                var polygon = createPolygon(vertices);
                var polyline = createPolyline(vertices);
                // 创建一个表示多边形的新图形，将其添加到视图中
                var graphic = createGraphic(polyline);
                view.graphics.add(graphic);
                // 计算缓冲线的长度
                var lineLength = geometryEngine.geodesicLength(polyline,"kilometers");
                labelLength(polygon, lineLength);
            }                    
            function drawPolylineComplete(evt) {
            	document.body.style.cursor='default';
                var vertices = evt.vertices;           
                view.graphics.removeAll();
                // 新建一个多边形
                var polygon = createPolygon(vertices);
                var polyline = createPolyline(vertices);
                 // 创建一个表示多边形的新图形，将其添加到视图中
                var graphic = createGraphic(polyline);
                view.graphics.add(graphic);
                openFlightLineSetting (vertices,reloadTable);
            }   
            // 使用所提供的顶点创建多边形
            function createPolygon(vertices) {
                return new Polygon({
                    rings : vertices,
                    spatialReference : view.spatialReference
                });
            }

            // 使用所提供的顶点创建折线
            function createPolyline(vertices) {
                return new Polyline(
                        {
                            paths : vertices,
                            spatialReference : view.spatialReference
                        });
            }

            // 创建一个新的图形，表示在视图上绘制的多边形。
            function createGraphic(polyline) {
                graphic = new Graphic({
                    geometry : polyline,
                    symbol : {
                        type : "simple-line", 
                        color : [0, 0,255],
                        width : 6,
                        cap : "round",
                        join : "round"
                    }
                });
                return graphic;
            } 
                              
            function labelLength(geom, length) {
              var screenPoint = view.toScreen(geom.centroid);
              var mapPoint = view.toMap({
            	   x : screenPoint.x,
          		   y : screenPoint.y-20
              });
              var centroid = {
                type : "point", 
                x : mapPoint.longitude,
                y : mapPoint.latitude,
            };
            var graphicCD = new Graphic({
                geometry : centroid,
                symbol : {
                    type : "text",
                    color : "white",
                    haloColor : "black",
                    haloSize : "1px",
                    /*保留的小数位*/
                    text : length.toFixed(3)
                            + "千米",
                    xoffset : 3,
                    yoffset : 3,
                    font : { // 自动字体
                        size : 14,
                        family : "sans-serif"
                    }
                }
            });  
            view.graphics.add(graphicCD);   
        }                                                    
	   });
}
function openFlightLineSetting (vertices,reloadTable){
	layer.open({
		title : "飞行漫游设置",
		type : 2,
		resize : false,
		area : [ '245px', '250px' ],
		content : 'flightLineDraw.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
		btn : [ '确定', '取消' ],
		yes : function(index, layero) {
			var body = layer.getChildFrame('body', index);
			var name = body.find("#name").val();
			if(name==''){
				layer.msg('路线名称不能为空!');
				return;
			}
			var zoom = body.find("#zoom").val();
			var speed = body.find("#speed").val();
			
			zoom=parseFloat(zoom);
			speed=parseFloat(speed);
			var time=new Date();
			var points = JSON.stringify(vertices);
		    $.post("/ResourceMonitor/flightModel/addFlightModel",
    	    {
		    	zoom,
		    	speed,
		    	time,
		    	points,
		    	name
    	    },
    	        function(data,status){
		    	if(data.code>0){
		    		layer.close(index);
		    		layer.msg("飞行方案保存成功!");
		    		reloadTable();
		    	}
    	    });
		},
		btn2 : function(index, layero) {
			layer.close(index); // 如果设定了yes回调，需进行手工关闭
		},
	});	
}
//画圆
function funFlightLineDrawCenter(reloadTable){
	   	 require([
 		      "esri/Map",
 		      "esri/views/MapView",
 		      "esri/views/2d/draw/Draw",
 		      "esri/Graphic",
 		      "esri/geometry/Polyline",
 		      "esri/geometry/Polygon",
 		      "esri/tasks/support/Query",
 		      "esri/geometry/geometryEngine",
 		      "esri/geometry/Point",
 		      "esri/geometry/Circle",
 		      "dojo/domReady!"
 		    ], function(
 		      Map, MapView,Draw, Graphic,Polyline,Polygon,Query,geometryEngine,Point,Circle
 		    ){
   		     draw = new Draw({
       		   view: view
       		 });
   		     enableCreatePolygon(draw, view);
	    	function enableCreatePolygon(draw, view) {
    		   var action  = draw.create("circle", {mode: "click"});
    		   view.focus();
 			   action.on("vertex-remove", function (evt) {
 			     createPolygonGraphic(evt.vertices);
 			   });
 			   action.on("cursor-update", function (evt) {
 			     createPolygonGraphic(evt.vertices);
 			   });

 			   action.on("draw-complete", function (evt) {
 			     createPolygonGraphicComplete(evt.vertices);
 			   });  
   			 }
   			 function createPolygonGraphic(vertices){
   			   view.graphics.removeAll();
   			   var polygon = createPolygon(vertices);
   			   if(!polygon){
   				   return;
   			   }
   			   var graphic = new Graphic({
   			     geometry: polygon,
   			     symbol:{
   						type : "simple-fill",
   						color : [ 255, 0, 0, 0.1 ],
   						style : "solid",
   						outline : {
   							color : [ 255, 90, 0],
   							width : 2
   						}
   					}
   			   });
   			   view.graphics.add(graphic);
   			 }
            function createPolygonGraphicComplete(vertices) {
				 view.graphics.removeAll();
				 var polygon = createPolygon(vertices);
				 var graphic = new Graphic({
				    geometry: polygon,
				    symbol:{
					type : "simple-fill",
					color : [ 255, 0, 0, 0.1 ],
					style : "solid",
						outline : {
							color : [255, 90, 0],
							width : 2
						}
					}
				 });
      			view.graphics.add(graphic);
      			openFlightLineSettingCenter ({rings:polygon.rings[0],center:[polygon.center.x,polygon.center.y]},reloadTable);
            } 
            // 使用所提供的顶点创建多边形
            function createPolygon(vertices) {
                if(vertices.length<2){
                    return
                }
                //生成绘制的图形,两点画圆
                var center=new Point({
                    x:vertices[0][0],
                    y:vertices[0][1],
                    spatialReference: view.spatialReference
                });
                var dis=center.distance(new Point({
                    x:vertices[1][0],
                    y:vertices[1][1],
                    spatialReference: view.spatialReference
                }));
                return new Circle({
                    center:center,
                    radius:dis,
                    spatialReference: view.spatialReference
                })
            }
                                                  
 	   });
}
function openFlightLineSettingCenter (vertices,reloadTable){
	layer.open({
		title : "飞行漫游设置",
		type : 2,
		resize : false,
		area : [ '245px', '250px' ],
		content : 'flightLineDraw.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
		btn : [ '确定', '取消' ],
		yes : function(index, layero) {
			var body = layer.getChildFrame('body', index);
			var name = body.find("#name").val();
			if(name==''){
				layer.msg('路线名称不能为空!');
				return;
			}
			var zoom = body.find("#zoom").val();
			var speed = body.find("#speed").val();
			zoom=parseFloat(zoom);
			speed=parseFloat(speed);
			var time=new Date();
			var points = JSON.stringify(vertices);
		    $.post("/ResourceMonitor/flightModel/addFlightModelCenter",
		    {
		    	zoom,
		    	speed,
		    	time,
		    	points,
		    	name
		    },
		        function(data,status){
		    	if(data.code>0){
		    		layer.close(index);
		    		layer.msg("飞行方案保存成功!");
		    		reloadTable();
		    	}
		    });
		},
		btn2 : function(index, layero) {
			layer.close(index); // 如果设定了yes回调，需进行手工关闭
		},
	});	
}