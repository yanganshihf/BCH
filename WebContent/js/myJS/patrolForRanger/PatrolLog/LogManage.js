
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
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1)
				c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}
var eachDepart;
/**
 * 实时监控
 */
$(function() {
	// 设置部门
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
	
	// 设定时间
	
	var myDate = getNowFormatDate();
	$("#startDatePicker").val(myDate);
	$("#endDatePicker").val(myDate);
	
	laydate.render({
		elem : '#startDatePicker' // 指定元素
		,
		showBottom : false
	});
	laydate.render({
		elem : '#endDatePicker' // 指定元素
		,
		showBottom : false
	});
	// 页面加载完成之后执行
	var father_width = $(window.parent.document).find("#contentFrame").width();
	var cond_height = $("#cond").height();

	// 初始化表单
	pageInit();

	$("#close").on('click',function(){
		parent.showFrame('地图');
	});
});

$(window).resize(function() {
	var father_width = $(window.parent.document).find("#contentFrame").width();
	var cond_height = $("#cond").height();
});

var tableIns;
function pageInit() {
	// 获取路径
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	var localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	var projectName = pathname
			.substring(0, pathname.substr(1).indexOf('/') + 1);

	// 获取从查询参数
	var department = $("#department").val();
	if(department == "0"){
		department = "全部";
	}
	var projectType = $("#projectType").find("option:selected").text();
	var personName = $("#personName").val();
	var startTime = $("#startDatePicker").val();
	var endTime = $("#endDatePicker").val();
	var menus = localStorage.getItem('cookie_menu');
	
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
							url : localhostPath + projectName + '/PatrolLog/queryLog' // 数据接口
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
								department : department,
								startTime : startTime,
								personName : personName,
								endTime : endTime,
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
										width : '10%',
										align : 'center',
										/*templet: function(d){
											// 设置部门
											// 获取单位
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
										width : '12%',
										align : 'center',
									},
									{
										field : 'personName',
										title : '人员',
										align : 'center',
										width : '10%'
									},
									{
										field : 'mobile',
										title : '电话',
										align : 'center',
										width : '12%',
									},
									{
										field : 'patrolDate',
										title : '日期',
										align : 'center',
										width : '10%'
									},
									{
										field : 'uploadTime',
										title : '上传时间',
										align : 'center',
										width : '14%'
									},
									
									{
										field : 'id',
										title : 'id',
										hide : true
									},
									
									{
										field : 'weather',
										title : '天气',
										align : 'center',
										width : '8%'
									},
									{
										field : 'logText',
										title : '描述',
										align : 'center',
										width : '18%'
									},
									{
										field : 'title',
										title : '删除',
										width : '6%',
										align : 'center',
										templet : function(d) {
											if(menus.indexOf("删除日志") > -1){
												return '<img src="'
												+ projectName
												+ '/images/indexpage/delete.png" onclick="deleteLog('
												+ "'"
												+ d.id
												+ "'"
												+ ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="删除"/>';
											}else{
												return '<img src="'
												+ projectName
												+ '/images/indexpage/delete.png" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:not-allowed;" title="删除"/>'
											}
										}
									} ] ],
									done: function (res, curr, count) {
										$('.layui-table-header th').css(
												'background-color', '#E6E6E6');
										$('.layui-table-header span').css('color','#058563');
							            $('.layui-table-header span').css('font-weight','700');
							            $('.layui-table th,.layui-table td').css('font-size','14px');
							            $('[id^="layui-table-page"]').css('text-align','center');
							            $(".layui-table-view .layui-table").css("width","100%");
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
	$("#submit").on('click', function() {
		
		// 获取从查询参数
		reload();
	});
	
	$("#excel").on('click', function() {
		downloadExcel();
	});
	
}

function reload(){
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	var localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	var projectName = pathname
			.substring(0, pathname.substr(1).indexOf('/') + 1);

	department = $("#department").val();
	if(department == "0"){
		department = "全部";
	}
	projectType = $("#projectType").find("option:selected").text();
	personName = $("#personName").val();
	startTime = $("#startDatePicker").val();
	endTime = $("#endDatePicker").val();
	
	tableIns.reload({
		where : { // 设定异步数据接口的额外参数，任意设
			'department' : department,
			'personName' : personName,
			'startTime' : startTime,
			'endTime' : endTime,
			'projectType' : projectType
		// …
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});
	
	
}
function deleteLog(id){
	var index = top.layer.confirm('确定删除', function(index){
		  //do something
			$.ajax({
				url : '/ResourceMonitor/PatrolLog/delLog', // 请求的url地址
				dataType : "json", // 返回格式为json
				async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
				data : {
					id : id
				}, // 参数值
				type : "POST", // 请求方式
				beforeSend : function() {
					// 请求前的处理
				},
				success : function(req) {
					// 请求成功时处理
					// 关闭弹窗
					top.layer.close(index);
					// 打开提示
					top.layer.msg(req.msg);
					// 刷新列表
					reload();
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
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	var localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	var projectName = pathname
			.substring(0, pathname.substr(1).indexOf('/') + 1);

	department = $("#department").val();
	if(department == "0"){
		department = "全部";
	}
	departmentName = $("#department").find("option:selected").text();
	projectType = $("#projectType").find("option:selected").text();
	personName = $("#personName").val();
	startTime = $("#startDatePicker").val();
	endTime = $("#endDatePicker").val();
	 var indexExport = top.layer.load(0);
	 $.ajax({
		 url :localhostPath + projectName + '/PatrolLog/downLog',// 请求的url地址
		 dataType : "json", // 返回格式为json
		 async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
		 data : {
			'department' : department,
			'personName' : personName,
			'startTime' : startTime,
			'endTime' : endTime,
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
					content : '<center><span>' + respText.msg + '</span></center>',
					success : function(layero, index) {
						// 下载文件
						var $form = $('<form method="GET"></form>');
						$form.attr('action', location);
						$form.appendTo($('body'));
						$form.submit();
						top.layer.close(indexExport);
					},
					cancel : function(index, layero) {
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
}

