var monthNum;
var localhostPath;
var projectName;
var myChartOne;
var myChartTwo;
var eachDepart;
$(function() {
    //创建一个新的canvas 
	$("#download1").hover(function(){
	    $("#downTitle").css("display","");
	},function(){
	    $("#downTitle").css("display","none");
	});
	$("#download1").click(function () {
		$("#download1").css("display","none");
		 var canvas2 = document.createElement("canvas");
		 var _canvas = document.querySelector('#container3');  
		    var w = parseInt(window.getComputedStyle(_canvas).width);  
		    var h = parseInt(window.getComputedStyle(_canvas).height);  
		    //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了  
		    canvas2.width = w * 2;  
		    canvas2.height = h * 2;  
		    canvas2.style.width = w + "px";  
		    canvas2.style.height = h + "px";  
		    var context = canvas2.getContext("2d");
			context.clearRect(0,0,canvas2.width,canvas2.height);
			context.beginPath();
		    context.scale(2, 2);
		    html2canvas(document.querySelector('#container3'), { canvas: canvas2, }).then(function(canvas) {
		    	//document.querySelector("#download").click();
		    	document.querySelector("#download").setAttribute('href', canvas.toDataURL());
		    	var htmlval = $("#eventDate").html();
		    	$("#download").attr("download",htmlval);
		    	document.querySelector("#download").click();
		    	$("#download1").css("display","");
		    });
     });
	
	var arrId = new Array('01','02','03','04','05','06','07','08','09','10','11','12','0');
	$("#charts").height($(window).height() - 140);
	/*var imgtopmargin = $("#charts").height() - 660;
	$("#conimg").css("margin-top",imgtopmargin/2)*/
	myChartOne =  echarts.init(document.getElementById('container'));
	myChartTwo =  echarts.init(document.getElementById('container2'));
	//异步查询巡护概况
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
	var cookie_department = localStorage.getItem('cookie_department');
	cookie_department = cookie_department.substring(0,cookie_department.length - 1);
	// 每个单位id-名称
	eachDepart = cookie_department.split("&");

	// 当前日期
	var now = getNowFormatDate();
	// 截取
	var dateSplit = now.split("-");
	// 设定年份
	$("#yearSelector").val(dateSplit[0]);

	thisMonth = now.substring(0,7);
	setMonthBtn();
	
	$("#yearSelector").change(function(){
		if(parseInt($("#yearSelector").val()) < parseInt(dateSplit[0])){
			for(var i = 0;i < arrId.length;i++){
				$("[id="+arrId[i]+"]").css("cursor","pointer");
				
			}
		}else{
			$(".yuefen").css("cursor","not-allowed");
		}
		setMonthBtn();
	});
	$("#0").click(function(){
		choseMonth('0')
	});
	$("#01").click(function(){
		var tdStyle = $("#01").attr("style");
		if (tdStyle.indexOf("pointer") > -1){
			choseMonth('01')
		}
	});
	$("#02").click(function(){
		var tdStyle = $("#02").attr("style");
		if (tdStyle.indexOf("pointer") > -1){
			choseMonth('02')
		}
	});
	$("#03").click(function(){
		var tdStyle = $("#03").attr("style");
		if (tdStyle.indexOf("pointer") > -1){
			choseMonth('03')
		}
	});
	$("#04").click(function(){
		var tdStyle = $("#04").attr("style");
		if (tdStyle.indexOf("pointer") > -1){
			choseMonth('04')
		}
	});
	$("#05").click(function(){
		var tdStyle = $("#05").attr("style");
		if (tdStyle.indexOf("pointer") > -1){
			choseMonth('05')
		}
	});
	$("#06").click(function(){
		var tdStyle = $("#06").attr("style");
		if (tdStyle.indexOf("pointer") > -1){
			choseMonth('06')
		}
	});
	$("#07").click(function(){
		var tdStyle = $("#07").attr("style");
		if (tdStyle.indexOf("pointer") > -1){
			choseMonth('07')
		}
	});
	$("#08").click(function(){
		var tdStyle = $("#08").attr("style");
		if (tdStyle.indexOf("pointer") > -1){
			choseMonth('08')
		}
	});
	$("#09").click(function(){
		var tdStyle = $("#09").attr("style");
		if (tdStyle.indexOf("pointer") > -1){
			choseMonth('09')
		}
	});
	$("#10").click(function(){
		var tdStyle = $("#10").attr("style");
		if (tdStyle.indexOf("pointer") > -1){
			choseMonth('10')
		}
	});
	$("#11").click(function(){
		var tdStyle = $("#11").attr("style");
		if (tdStyle.indexOf("pointer") > -1){
			choseMonth('11')
		}
	});
	$("#12").click(function(){
		var tdStyle = $("#12").attr("style");
		if (tdStyle.indexOf("pointer") > -1){
			choseMonth('12')
		}
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
	
	// 设定月份按钮样式
	 function setMonthBtn(){
		 
		
		// 设定选定月份
		for(var i = 0;i < arrId.length;i++){
			if(arrId[i] <= dateSplit[1]){
				//$("[id="+arrId[i]+"]").attr("onclick","choseMonth('"+arrId[i]+"')");
				$("[id="+arrId[i]+"]").css("cursor","pointer");
			}else{
				
			}
		}
		$("[id='"+dateSplit[1]+"']").css("background-color", "#028061");
		$("[id='"+dateSplit[1]+"']").css("color", "#FFFFFF");
		choseMonth(dateSplit[1]);
	}
	 
	// 选择要查询的月份
	 function choseMonth(monthNum) {
		monthNum = monthNum;
		$(".yuefen").css("background-color", "#FFFFFF");
		$(".yuefen").css("color", "#020202");

		// 变更选中样式
		switch (monthNum) {
		case "01":
			$("#01").css("background-color", "#028061");
			$("#01").css("color", "#FFFFFF");
			break;
		case "02":
			$("#02").css("background-color", "#028061");
			$("#02").css("color", "#FFFFFF");
			break;
		case "03":
			$("#03").css("background-color", "#028061");
			$("#03").css("color", "#FFFFFF");
			break;
		case "04":
			$("#04").css("background-color", "#028061");
			$("#04").css("color", "#FFFFFF");
			break;
		case "05":
			$("#05").css("background-color", "#028061");
			$("#05").css("color", "#FFFFFF");
			break;
		case "06":
			$("#06").css("background-color", "#028061");
			$("#06").css("color", "#FFFFFF");
			break;
		case "07":
			$("#07").css("background-color", "#028061");
			$("#07").css("color", "#FFFFFF");
			break;
		case "08":
			$("#08").css("background-color", "#028061");
			$("#08").css("color", "#FFFFFF");
			break;
		case "09":
			$("#09").css("background-color", "#028061");
			$("#09").css("color", "#FFFFFF");
			break;
		case "10":
			$("#10").css("background-color", "#028061");
			$("#10").css("color", "#FFFFFF");
			break;
		case "11":
			$("#11").css("background-color", "#028061");
			$("#11").css("color", "#FFFFFF");
			break;
		case "12":
			$("#12").css("background-color", "#028061");
			$("#12").css("color", "#FFFFFF");
			break;
		default:
			$("#0").css("background-color", "#028061");
			$("#0").css("color", "#FFFFFF");
			break;
		}
		if(monthNum == "0"){
			thisYear = $("#yearSelector").val();
			queryCharts(thisYear);
			
		}else{
			thisMonth = $("#yearSelector").val() + "-"+ monthNum;
			queryCharts(thisMonth);
		}
	}
	

	 function queryCharts(thisMonth) { 
		$.ajax({
					url : localhostPath + projectName + '/attence/survey', // 请求的url地址
					dataType : "json", // 返回格式为json
					async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
					data : {
						thisMonth : thisMonth
					}, // 参数值
					type : "POST", // 请求方式
					beforeSend : function() {
						// 请求前的处理
					},
					success : function(req) {
						var survey = req.rows[0];
						// 通过vue.js 把数据和对应的视图关联起来
						$("#shujuzonglan").empty(); 
						if(thisMonth.length == 4){
							$("#shujuzonglan").append("<p style='font-size:28px;'>"+survey.month.substring(0,4)+"年</p>");
						}else{
							$("#shujuzonglan").append("<p style='font-size:28px;'>"+survey.month.substring(0,4)+"年"+survey.month.substring(5,7)+"月</p>");
						}
						$("#shujuzonglan").append("数据总览");
						
						$("#chuqinrenci").empty();
						$("#chuqinrenci").append("<p style='font-size:28px;'>"+survey.renci_chuqin+"人次</p>");
						$("#chuqinrenci").append("出勤人次");
						
						$("#leijishichang").empty();
						$("#leijishichang").append("<p style='font-size:28px;'>"+survey.diff_Time+"</p>");
						//$("#leijishichang").append("<strong style='color: #007862;font-size:26px;'>100小时50分钟</strong>");
						$("#leijishichang").append("累计巡护时长");
						var licheng = survey.licheng.toFixed(1); 
						if(licheng.substr(licheng.length-2) == ".0"){
							licheng = licheng.substring(0,licheng.length-2);
						}
						$("#leijilicheng").empty();
						$("#leijilicheng").append("<p style='font-size:28px;'>"+licheng+"公里</p>");
						$("#leijilicheng").append("累计巡护里程");
						
						/*$("#dabiaotianshu").empty();
						$("#dabiaotianshu").append("<strong style='color: #007862;font-size:26px;'>"+survey.days_dabiao+"天</strong>");
						$("#dabiaotianshu").append("<br />达标天数");*/
						
						$("#shangbaoshijian").empty();
						$("#shangbaoshijian").append("<p style='font-size:28px;'>"+survey.num_events+"件</p>");
						$("#shangbaoshijian").append("上报事件");
						
						
						$("#shangchuanzhaopian").empty();
						$("#shangchuanzhaopian").append("<p style='font-size:28px;'>"+survey.num_photos+"张</p>");
						$("#shangchuanzhaopian").append("上传照片");
						
						//alert(survey.eventsDep)1727.88
						var eventsDep = survey.eventsDep.split(",");
						var counts=new Array() 
						for (var i = 1; i < eachDepart.length; i++) {
							counts[i] = 0;
							var eachDep = eachDepart[i].split("-");
							for (var j = 0; j < eventsDep.length; j++) {
								if(eventsDep[j] == eachDep[0]){
									counts[i] ++;
								}
							}
							if(eachDep[0] == "64040205"){
								$("#events1").html(counts[i])
							}
							if(eachDep[0] == "64040206"){
								$("#events2").html(counts[i])
							}
							if(eachDep[0] == "64040203"){
								$("#events3").html(counts[i])
							}
							if(eachDep[0] == "64040201"){
								$("#events4").html(counts[i])
							}
							if(eachDep[0] == "64040202"){
								$("#events5").html(counts[i])
							}
							if(eachDep[0] == "64040204"){
								$("#events6").html(counts[i])
							}
						}
						//debugger;
						
						var text,text2,text3;
						if(thisMonth.length == 4){
								text = thisMonth +'年护林员巡护里程TOP 10';
								text2 = thisMonth +'年各单位累计巡护里程';
								text3 = thisMonth +'年各单位累计上报事件';
								$("#eventDate").html(text3);
						}else{
								text = thisMonth.substring(0,4) +'年'+ thisMonth.substring(5,7) + '月护林员巡护里程TOP 10';
								text2 = thisMonth.substring(0,4) +'年'+ thisMonth.substring(5,7) + '月各单位累计巡护里程';
								text3 = thisMonth.substring(0,4) +'年'+ thisMonth.substring(5,7) + '月各单位累计上报事件';
								$("#eventDate").html(text3);
						}
						var color = ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'];
						var TopTenPerson = new Array();
						var TopName = new Array();
						for(var i= 0;i<req.rows[0].topTen.length;i++){
							TopTenPerson[i] = {value:req.rows[0].topTen[i].licheng,itemStyle:{normal:{color:color[i]}}};
							TopName[i] = req.rows[0].topTen[i].name;
						}
						
						var TopDep = new Array();
						var DepName = new Array();
						for(var i= 0;i<req.rows[0].eachDep.length;i++){
							TopDep[i] = {value:req.rows[0].eachDep[i].licheng,itemStyle:{normal:{color:color[i]}}};
							DepName[i] = req.rows[0].eachDep[i].name;
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
					        	formatter: '{b}<br/>里程：{c} Km'
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
					            data: TopName
					        },	        
					        yAxis: {
					        	name:'里程(Km)'
					        },	        
					        series: [{
					            name: '里程(Km)',
					            type: 'bar',
					            barWidth : 20,
					            data: TopTenPerson	              
							}]
						});
						myChartTwo.setOption({

							title: {
					            text: text2,
					            x:'center',
					            y:'top',
					        },	
					        grid:{
					        	right:'10',
					        	left:'50'
					        },
					        tooltip: {
					        	formatter: '{b}<br/>里程：{c} Km'
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
					            },
					            
					        },
					        yAxis: {
					        	name:'里程(Km)',
					        	//nameLocation:'center'
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
					            data: DepName
					        	
					        },	        
					        series: [{
					            name: '里程(Km)',
					            type: 'bar',
					            barWidth : 35,
					            data: TopDep	              
							}]
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

	 
	 $(window).resize(function() {
			$("#charts").height($(window).height() - 140);
			myChartOne.resize();
			myChartTwo.resize();	
			/*var imgtopmargin = $("#charts").height() - 366;
			$("#conimg").css("margin-top",imgtopmargin/2)*/
	 });
});
