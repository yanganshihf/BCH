var layerIndex = -1;
var localhostPath;
var projectName;
var curWwwPath = window.document.location.href;
var pathname = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathname);
localhostPath = curWwwPath.substring(0, pos);
// 获取项目名
projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);

//初始设置

var depVal = '';
var startD= '';
var endD= '';
var depName = ''
$(function() {
	$("#charts").height($(window).height() - 60);
	myChartOne =  echarts.init(document.getElementById('container'));
	
	var cookie_department = localStorage.getItem('cookie_department');
	cookie_department = cookie_department.substring(0,cookie_department.length - 1);
	// 每个单位id-名称
	var eachDepart = cookie_department.split("&");
	// 遍历
	for (var i = 0; i < 1; i++) {
		var eachDep = eachDepart[i].split("-");
		depVal= eachDep[0];
		depName = eachDep[1];
	}
	var myDate = getNowFormatDate();
	startD= '2019-04-01';
	endD= myDate;
	//Init(depVal,startD,endD);
	Init(1);
	var layer;
	layui.use('layer', function(){
	    layer = layui.layer;
	});
	var htmlstr = '<table class="table" id="table" style="margin-top:5px"><tbody>'+
		'<tr><td class="tdwidth"><span>部门</span></td><td class="tdwidth"> <select id="departmentval" class="form-control"> </select></td></tr>'+
		'<tr><td class="tdwidth"><span>开始时间</span></td><td class="tdwidth"><input class="form-control" type="text"  id="startDate" /></td></tr>'+
		'<tr><td class="tdwidth"><span>结束时间</span></td><td class="tdwidth"><input class="form-control" type="text"  id="endDate" /></td></tr></tbody></table>';
	$("#submit").on('click', function() {
		if(layerIndex == -1){
			layerIndex = layer.open({
				type : 1,
				title : false,
				content : htmlstr, 
				offset:['50px','10px'],
				area : ['230px','160px'],
				resize : false,
				shade: 0,
				closeBtn: 0,
				btn: ['确定', '取消'],
				yes : function(index, layero) {
					layer.close(layerIndex);
					layerIndex = -1;
					depVal = $("#departmentval").val();
					startD= $("#startDate").val();
					endD= $("#endDate").val();
					depName = $("#departmentval").find("option:selected").text();
				},
				btn2 :function(index,layero){
					layerIndex = -1;
				},
				success: function(layero, index){
					
					for (var i = 0; i < eachDepart.length; i++) {
						var eachDep = eachDepart[i].split("-");
						// 添加选项 department为select的id
						$("#departmentval").append("<option value='" + eachDep[0] + "'>" + eachDep[1]+ "<oprion>")
					}

					$("#startDate").val(myDate);
					$("#endDate").val(myDate);

					laydate.render({
						elem : '#startDate' // 指定元素
						,
						showBottom : false
					});
					laydate.render({
						elem : '#endDate' // 指定元素
						,
						showBottom : false
					});
				}
			});
		}
	});
	
	$("#statistics").on("change",function(){
		var TypeVal = $("#statistics").val();
		Init(TypeVal);
	});
	
});

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

function Init(type){ 
	if(depVal == "0"){
		depVal = "全部";
	}
	var thisMonth = '2019';
	$.ajax({
		url : localhostPath + projectName + '/event/survey', // 请求的url地址
		dataType : "json", // 返回格式为json
		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
		data : {
			dep:depVal,
			startTime:startD,
			endTime:endD,
			Type:type
			//thisMonth:thisMonth
		}, // 参数值
		type : "POST", // 请求方式
		beforeSend : function() {
			// 请求前的处理
		},
		success : function(req) {
			var survey = req.rows[0];
			var text;
			var color = ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'];
			if(type == "1"){
				if(startD == endD){
					text = startD.substring(0,4) +'年'+ startD.substring(5,7) + '月'+startD.substring(8,10) + '日' +depName+ '各类上报事件分析图' ;
				}else{
					text = startD.substring(0,4) +'年'+ startD.substring(5,7) + '月'+startD.substring(8,10) + '日-' +endD.substring(0,4) +'年'+ endD.substring(5,7) + '月'+endD.substring(8,10) + '日' +depName+ '各类上报事件分析图';	
				}
				var EveCount = [{value:0,itemStyle:{normal:{color:color[i]}}},{value:0,itemStyle:{normal:{color:color[i]}}},{value:0,itemStyle:{normal:{color:color[i]}}},{value:0,itemStyle:{normal:{color:color[i]}}},{value:0,itemStyle:{normal:{color:color[i]}}},{value:0,itemStyle:{normal:{color:color[i]}}},{value:0,itemStyle:{normal:{color:color[i]}}},{value:0,itemStyle:{normal:{color:color[i]}}},{value:0,itemStyle:{normal:{color:color[i]}}}];
				var EveName = ['火情火险','病虫害','盗伐','盗猎','毁林开荒','占地','人畜破坏','地质灾害','其他'];
			}
			if(type == "2"){
				
				if(startD == endD){
					text = startD.substring(0,4) +'年'+ startD.substring(5,7) + '月'+startD.substring(8,10) + '日' +depName+ '各单位上报事件分析图' ;
				}else{
					text = startD.substring(0,4) +'年'+ startD.substring(5,7) + '月'+startD.substring(8,10) + '日-' +endD.substring(0,4) +'年'+ endD.substring(5,7) + '月'+endD.substring(8,10) + '日' +depName+ '各单位上报事件分析图';	
				}
				var EveCount = [{value:0,itemStyle:{normal:{color:color[i]}}},{value:0,itemStyle:{normal:{color:color[i]}}},{value:0,itemStyle:{normal:{color:color[i]}}},{value:0,itemStyle:{normal:{color:color[i]}}},{value:0,itemStyle:{normal:{color:color[i]}}},{value:0,itemStyle:{normal:{color:color[i]}}},{value:0,itemStyle:{normal:{color:color[i]}}},{value:0,itemStyle:{normal:{color:color[i]}}},{value:0,itemStyle:{normal:{color:color[i]}}}];
				var EveName = ['火情火险','病虫害','盗伐','盗猎','毁林开荒','占地','人畜破坏','地质灾害','其他'];
			}
			
			
			var EventPie = [];
			for(var i= 0;i<EveName.length;i++){
				EventPie[i] = {value:0,name:EveName[i],itemStyle:{normal:{color:color[i]}}};
			}
			
			for(var i= 0;i<survey.eventCount.length;i++){
				var name = survey.eventCount[i].name;
				
				if(name == '1010'){
					EveCount[0] = {value:survey.eventCount[i].counts,itemStyle:{normal:{color:color[0]}}};
					EventPie[0] = {value:survey.eventCount[i].counts,name:EveName[0],itemStyle:{normal:{color:color[0]}}};
				}else if(name == '1020'){
					EveCount[1] = {value:survey.eventCount[i].counts,itemStyle:{normal:{color:color[1]}}};
					EventPie[1] = {value:survey.eventCount[i].counts,name:EveName[1],itemStyle:{normal:{color:color[1]}}};
				}else if(name == '1030'){
					EveCount[2] = {value:survey.eventCount[i].counts,itemStyle:{normal:{color:color[2]}}};
					EventPie[2] = {value:survey.eventCount[i].counts,name:EveName[2],itemStyle:{normal:{color:color[2]}}};
				}else if(name == '1040'){
					EveCount[3] = {value:survey.eventCount[i].counts,itemStyle:{normal:{color:color[3]}}};
					EventPie[3] = {value:survey.eventCount[i].counts,name:EveName[3],itemStyle:{normal:{color:color[3]}}};
				}else if(name == '1050'){
					EveCount[4] = {value:survey.eventCount[i].counts,itemStyle:{normal:{color:color[4]}}};
					EventPie[4] = {value:survey.eventCount[i].counts,name:EveName[4],itemStyle:{normal:{color:color[4]}}};
				}else if(name == '1060'){
					EveCount[5] = {value:survey.eventCount[i].counts,itemStyle:{normal:{color:color[5]}}};
					EventPie[5] = {value:survey.eventCount[i].counts,name:EveName[5],itemStyle:{normal:{color:color[5]}}};
				}else if(name == '1070'){
					EveCount[6] = {value:survey.eventCount[i].counts,itemStyle:{normal:{color:color[6]}}};
					EventPie[6] = {value:survey.eventCount[i].counts,name:EveName[6],itemStyle:{normal:{color:color[6]}}};
				}else if(name == '1080'){
					EveCount[7] = {value:survey.eventCount[i].counts,itemStyle:{normal:{color:color[7]}}};
					EventPie[7] = {value:survey.eventCount[i].counts,name:EveName[7],itemStyle:{normal:{color:color[7]}}};
				}else if(name == '1090'){
					EveCount[8] = {value:survey.eventCount[i].counts,itemStyle:{normal:{color:color[8]}}};
					EventPie[8] = {value:survey.eventCount[i].counts,name:EveName[8],itemStyle:{normal:{color:color[8]}}};
				}
			}
			
			
			myChartOne.setOption({

				title: {
		            text: text,
		            x:'center',
		            y:'top',
		        },
		        grid:{
		        	right:'10',
		        	left:'30'
		        },
		        tooltip: {
		        	formatter: '{b}<br/>数量：{c} 件'
		        },	        
		        legend: {
		            show:false
		        },	
		        toolbox: {
		            show: true,
		            feature: {
		                saveAsImage: {
		                	title:"保存"
		                }
		            }
		        },
		        xAxis: {
		        	axisTick:{
		        		show:false
		        	},
		        	axisLabel:{
                        rotate:45,
                        fontSize:13,
                        fontWeigth:'bold',
                        interval:0
		        	},
		            data: EveName
		        },	        
		        yAxis: {
		        	name:'数量(件)'
		        },	        
		        series: [{
		            name: '数量(件)',
		            type: 'bar',
		            barWidth : 20,
		            data: EveCount	              
				}]
			});
			//柱状图
			$("#four").on('click', function() {
				myChartOne.setOption({

					title: {
			            text: text,
			            x:'center',
			            y:'top',
			        },
			        grid:{
			        	right:'10',
			        	left:'30'
			        },
			        tooltip: {
			        	formatter: '{b}<br/>数量：{c} 件'
			        },	        
			        legend: {
			            show:false
			        },	
			        toolbox: {
			            show: true,
			            feature: {
			                saveAsImage: {
			                	title:"保存"
			                }
			            }
			        },
			        xAxis: {
			        	show: true,
			        	axisTick:{
			        		show:false
			        	},
			        	axisLabel:{
	                        rotate:45,
	                        fontSize:13,
	                        fontWeigth:'bold',
	                        interval:0
			        	},
			            data: EveName
			        },	        
			        yAxis: {
			        	show: true,
			        	name:'数量(件)'
			        },	        
			        series: [{
			            name: '数量(件)',
			            type: 'bar',
			            barWidth : 20,
			            data: EveCount	              
					}]
				});
			});
			//饼状图
			$("#three").on('click', function() {
				myChartOne.setOption({

					title: {
			            text: text,
			            x:'center',
			            y:'top',
			        },
			        grid:{
			        	right:'10',
			        	left:'30'
			        },
			        tooltip: {
			        	formatter: '{b}<br/>数量：{c} 件'
			        },	        
			        legend: {
			        	show:true,
			            orient: 'vertical',
			            right: 20,
			            top: 40,
			            data: EveName
			           
			        },	
			        toolbox: {
			            show: true,
			            feature: {
			                saveAsImage: {
			                	title:"保存"
			                }
			            }
			        },
			        xAxis: {
			        	show: false
			        },	        
			        yAxis: {
			        	show: false
			        },        
			        series: [{
			            //name: '数量(件)',
			            type: 'pie',
			            radius : '65%',
			            center: ['50%', '50%'],
			            selectedMode: 'single',
			            data: EventPie,
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
					}]
				});
			});
			//折线图
			$("#two").on('click', function() {
				myChartOne.setOption({

					title: {
			            text: text,
			            x:'center',
			            y:'top',
			        },
			        grid:{
			        	right:'10',
			        	left:'30'
			        },
			        tooltip: {
			        	formatter: '{b}<br/>数量：{c} 件'
			        },	        
			        legend: {
			            show:false
			        },	
			        toolbox: {
			            show: true,
			            feature: {
			                saveAsImage: {
			                	title:"保存"
			                }
			            }
			        },
			        xAxis: {
			        	show: true,
			        	axisTick:{
			        		show:false
			        	},
			        	axisLabel:{
	                        rotate:45,
	                        fontSize:13,
	                        fontWeigth:'bold',
	                        interval:0
			        	},
			            data: EveName
			        },	        
			        yAxis: {
			        	show: true,
			        	name:'数量(件)'
			        },	        
			        series: [{
			            name: '数量(件)',
			            type: 'line',
			            barWidth : 20,
			            data: EveCount	              
					}]
				});
			});
		},
		complete : function() {
			// 请求完成的处理
		},
		error : function() {
			// 请求出错处理
		}
	});
}







