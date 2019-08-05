var count = 0;

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


/**
 * 实时监控
 */
var eachDepart;
var localhostPath;
var projectName;
$(function() {            
	// 设置部门s
	// alert(cookie_department);
	// 获取单位
	var cookie_department= localStorage.getItem('cookie_department');
	cookie_department = cookie_department.substring(0,cookie_department.length-1);
	// 每个单位id-名称
	eachDepart =  cookie_department.split("&");
	for (var i = 0; i < eachDepart.length; i++) {
		var eachDep =  eachDepart[i].split("-");
		
		$("#department").append("<option value='"+eachDep[0]+"'>"+eachDep[1]+"<oprion>")
	}
	
	/*$("#startDatePicker").datepicker({
		autoSize : true,
	});
	$("#endDatePicker").datepicker({
		autoSize : true,
	});
*/
	var myDate = getNowFormatDate();
	var myDateSplit = myDate.split("-");
	$("#year").val(myDateSplit[0]);
	$("#month").val(myDateSplit[1]);
	
	/*$("#startDatePicker").val(myDate);
	$("#endDatePicker").val(myDate);*/
	
	// 初始化表单
	pageInit();
	
	// 页面加载完成之后执行
	//var childrenPageHeight = $('#AttenceStatic', window.parent.document).height();
	//$("#jqgrid").setGridHeight(childrenPageHeight-75);
	
	//$("#jqgrid").setGridWidth($("#gridCond").width());
	
});

$(window).resize(function() {
	
});

//新建表单实例
var tableIns;

function pageInit() {
	// 获取路径
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	projectName = pathname
			.substring(0, pathname.substr(1).indexOf('/') + 1);

	// 获取从查询参数
	var department = $("#department").val();
	if(department == "0"){
		department = "全部";
	}
	var personName = $("#personName").val();
	var year = $("#year").val();
	var month = $("#month").val();
	var projectType = $("#projectType").find("option:selected").text();
	getStandardday(year,month);
	layui
	.use(
			'table',
			function() {
				var thisTable = layui.table;
				
				// 第一个实例
				tableIns = thisTable
						.render({
							id : 'layTable',
							elem : '#jqgrid',
							height : 'full-45',
							limit : 30,
							limits : [ 30, 60, 90 ],
							url : localhostPath + projectName + '/attence/queryAttenceStatic'// 数据接口
							,
							page : true // 开启分页
							,
							method : 'post' // 如果无需自定义HTTP类型，可不加该参数
							,
							request : {
								pageName : 'page' // 页码的参数名称，默认：page
								,
								limitName : 'rows' // 每页数据量的参数名，默认：limit

							},
							where : {
								'department' : department,
								'personName' : personName,
								'year' : year,
								'month' : month,
								'projectType' : projectType
							},
							response : {
								statusName : 'status' // 规定数据状态的字段名称，默认：code
								,
								statusCode : 200 // 规定成功的状态码，默认：0
								,
								msgName : 'msg' // 规定状态信息的字段名称，默认：msg
								,
								countName : 'records' // 规定数据总数的字段名称，默认：count
								,
								dataName : 'rows' // 规定数据列表的字段名称，默认：data

							},
							cols : [ [ // 表头
									{
										field : 'departmentName',
										title : '部门',
										width : '7.5%',
										align : 'center',
										/*templet: function(d){
											// 设置部门
											// 获取单位
											$("#standardday").html(d.standardday);
											var cookie_department = unescape(document.cookie
													.split("cookie_department=")[1].split(";")[0]);
											cookie_department = cookie_department.substring(0,
													cookie_department.length - 1);
											// 每个单位id-名称
											var eachDepart = cookie_department.split("&");
											// 遍历
											for (var i = 0; i < eachDepart.length; i++) {
												var eachDep = eachDepart[i].split("-");
												// 添加选项 department为select的id
												if (eachDep[0] == d.departmentCode) {
													return eachDep[1];
												}
											}
											
									    }*/
									},
									{
										field : 'projectType',
										title : '工程类别',
										width : '7.5%',
										align : 'center'
									},
									{
										field : 'personName',
										title : '姓名',
										align : 'center',
										width : '7%'
									},
									{
										field : 'personMobile',
										title : '电话',
										align : 'center',
										width : '9.1%',
										templet : function(d) {
											return '<span style="font-size:12px;">'+d.personMobile+'</span>';
										}
									},
									{
										field : 'patrolMonth',
										title : '年月',
										align : 'center',
										width : '20%',
										hide : true
									},
									{
										field : 'day_1',
										title : '1',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											count = 0;
											return DetailMonth(d.day_1);
										}
									},
									{
										field : 'day_2',
										title : '2',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_2);
										}
									},
									{
										field : 'day_3',
										title : '3',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_3);
										}
									},
									{
										field : 'day_4',
										title : '4',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_4);
										}
									},
									{
										field : 'day_5',
										title : '5',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_5);
										}
									},
									{
										field : 'day_6',
										title : '6',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_6);
										}
									},
									{
										field : 'day_7',
										title : '7',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_7);
										}
									},
									{
										field : 'day_8',
										title : '8',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_8);
										}
									},
									{
										field : 'day_9',
										title : '9',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_9);
										}
									},
									{
										field : 'day_10',
										title : '10',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_10);
										}
									},
									{
										field : 'day_11',
										title : '11',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_11);
										}
									},
									{
										field : 'day_12',
										title : '12',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_12);
										}
									},
									{
										field : 'day_13',
										title : '13',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_13);
										}
									},
									{
										field : 'day_14',
										title : '14',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_14);
										}
									},
									{
										field : 'day_15',
										title : '15',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_15);
										}
									},
									{
										field : 'day_16',
										title : '16',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_16);
										}
									},
									{
										field : 'day_17',
										title : '17',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_17);
										}
									},
									{
										field : 'day_18',
										title : '18',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_18);
										}
									},
									{
										field : 'day_19',
										title : '19',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_19);
										}
									},
									{
										field : 'day_20',
										title : '20',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_20);
										}
									},
									{
										field : 'day_21',
										title : '21',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_21);
										}
									},
									{
										field : 'day_22',
										title : '22',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_22);
										}
									},
									{
										field : 'day_23',
										title : '23',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_23);
										}
									},
									{
										field : 'day_24',
										title : '24',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_24);
										}
									},
									{
										field : 'day_25',
										title : '25',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_25);
										}
									},
									{
										field : 'day_26',
										title : '26',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_26);
										}
									},
									{
										field : 'day_27',
										title : '27',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_27);
										}
									},
									{
										field : 'day_28',
										title : '28',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_28);
										}
									},
									{
										field : 'day_29',
										title : '29',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_29);
										}
									},
									{
										field : 'day_30',
										title : '30',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_30);
										}
									},
									{
										field : 'day_31',
										title : '31',
										align : 'center',
										width : '1.9%',
										templet: function(d){
											return DetailMonth(d.day_31);
										}
									},
									{
										field : 'itss',
										title : '达标<br>天数',
										align : 'center',
										width : '4%',
										templet: function(d){
											if(count >= d.standardday){
												return count;
											}else{
												return '<span style="color:red;">'
												+ count
												+ '</span>';
											}
											
										}
									},
									{
										field : 'standardday',
										title : '规定<br>天数',
										align : 'center',
										hide : true,
										width : '4%'
									},
									{
										field : 'sumLength',
										title : '里程',
										align : 'center',
										width : '5%'
									}] ],
									done: function (res, curr, count) {
										/*$('.layui-table-header th').css('display', 'none');*/
										$(".layui-border-box").css("margin-top","0px");
										$('.layui-table-header span').css('color', '#058563');
										$('.layui-table-header span').css('font-weight','700');
										$('.layui-table th,.layui-table td').css('font-size','14px');
										$('.layui-table-header th').css('background-color', '#E6E6E6');
							            $('[id^="layui-table-page"]').css('text-align','center');
							            $('.layui-table-cell').css('padding','0px');
							            $("[data-field='itss'] div").css("padding","2px 0 0 0");
							            $("[data-field='itss'] div").css("height","35px");
							            $("[data-field='itss'] div span").css("line-height","16px");
							           /* $("[data-field='standardday'] div").css("padding","2px 0 0 0");
							            $("[data-field='standardday'] div").css("height","35px");
							            $("[data-field='standardday'] div span").css("line-height","16px");*/
							            $(".layui-table-body td").css("padding","0");
							            $(".layui-table-body [data-field='itss'] div span").css("line-height","28px");
							            var year = $("#year").val();
							        	var month = $("#month").val();    //月
							            var d = new Date(year, month, 0);   //Wed Mar 31 00:00:00 UTC+0800 2010
							            var daysCount = d.getDate();            
							            if(daysCount == '28'){
							            	var tables = $("#jqgrid").next().find(".layui-table-box"); 
							            	tables.find("[data-field='day_29']").css("display","none");
							            	tables.find("[data-field='day_30']").css("display","none");
							            	tables.find("[data-field='day_31']").css("display","none");
							            }else if(daysCount == '29'){
							            	var tables = $("#jqgrid").next().find(".layui-table-box"); 
							            	tables.find("[data-field='day_30']").css("display","none");
							            	tables.find("[data-field='day_31']").css("display","none");
							            }else if(daysCount == '30'){
							            	var tables = $("#jqgrid").next().find(".layui-table-box"); 
							            	tables.find("[data-field='day_31']").css("display","none");
							            }else{	
							            }
							            $(".layui-table-view .layui-table").css("width","100%");
							            $(".layui-table-header").css("margin-right","16px");
							        }
						});
				/**
				 * *******************************************************
				 * 
				 * 窗口變化
				 * 
				 * *******************************************************
				 */
				$(window).resize(function() {
					thisTable.resize('layTable');
				});
			});

	/**
	 * 条件查询
	 */
	
}

$("#submit").on('click', function() {
	/*// 获取从查询参数
	department = $("#department").val();
	personName = $("#personName").val();
	year = $("#year").val();
	month = $("#month").val();
	projectType = $("#projectType").find("option:selected").text();
	
	tableIns.reload({
		where : { // 设定异步数据接口的额外参数，任意设
			'department' : department,
			'personName' : personName,
			'year' : year,
			'month' : month,
			'projectType' : projectType
		// …
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});
	getStandardday(year,month);*/
	pageInit();
	
});


$("#excel").on('click', function() {
	downloadExcel();
});

function getStandardday(year,month){
	$.ajax({
		url : '/ResourceMonitor/attence/GetDays',// 请求的url地址
		dataType : "json", // 返回格式为json
		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
		// 向后台传输的数据
		data : {
			'year' : year,
			'month' : month
		},
		type : "POST", // 请求方式
		beforeSend : function() {
			// 请求前的处理
		},
		success : function(respText) {
			respText = $.parseJSON(respText);
			// 请求成功时处理
			$("#standardday").html("");
			$("#standardday").html(respText.msg);
			
		},
		complete : function() {
			// 请求完成的处理
		},
		error : function() {
			// 请求出错处理
		}
	});
}
function DetailMonth(s){
	if(s){
		count = count + 1 ;
		return '<img src="'
		+ projectName
		+ '/images/indexpage/yes.png" style="margin-top:6px;"/>';
	}else if(s == '0'){
		return '<img src="'
		+ projectName
		+ '/images/indexpage/no.png" style="margin-top:6px;"/>';
	}else{
		return '<img src="'
		+ projectName
		+ '/images/indexpage/dele.png" style="margin-top:6px;"/>';
	}
}

/**
 * 人员详情查看
 */
function showPersonalInfo(rowId) {
	var selectRowData = $("#jqgrid").jqGrid('getRowData', rowId);
	parent.openLayer(selectRowData);
}

/**
 * 人员定位
 */
function positionTo(rowId) {
	var selectRowData = $("#jqgrid").jqGrid('getRowData', rowId);
	parent.userPositonInfo(selectRowData);
}


function downloadExcel(){
	department = $("#department").val();
	if(department == "0"){
		department = "全部";
	}
	personName = $("#personName").val();
	year = $("#year").val();
	month = $("#month").val();
	projectType = $("#projectType").find("option:selected").text();
	var departmentName = $("#department").find("option:selected").text();
	layui.use('layer', function(){
        layer = layui.layer;
        var indexExport = layer.load(0);
   	 $.ajax({
   		 url :localhostPath + projectName + '/attence/download',// 请求的url地址
   		 dataType : "json", // 返回格式为json
   		 async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
   		 data : {
   			 'department' : department,
   				'personName' : personName,
   				'year' : year,
   				'month' : month,
   				'projectType' : projectType,
   				'departmentName' : departmentName
   		 },
   	 	 type : "POST", // 请求方式
   		 beforeSend : function() {
   			// 请求前的处理
   		 },
   		 success : function(respText) {
   			 respText = $.parseJSON(respText);
   			// 请求成功时处理
   			 var title = respText.title;
   	           //var location = "../excel/"+title+".xls";
   	           var location = "/ResourceMonitor/excel/"+title+".xls";
   	           
   	           top.layer.open({                  
   	               content : '<center><span>' + respText.msg
                      + '</span></center>',
   	               success: function(layero, index){
   	                    // 下载文件
   	                   var $form = $('<form method="GET"></form>');
   	                   $form.attr('action', location);
   	                   $form.appendTo($('body'));
   	                   $form.submit();
   	                   layer.close(indexExport);
   	                     
   	                },
   	                cancel: function(index, layero){ 
   	                    // 删除临时文件
   	                }
   	               
   	           });
   		 },
   		 complete : function() {
   			// 请求完成的处理
   		 },
   		 error : function() {
   			// 请求出错处理
   		 }
   	});
    });
}
