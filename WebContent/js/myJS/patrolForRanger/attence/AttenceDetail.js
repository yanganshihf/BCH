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


$(function() {
	// 设置部门
	// alert(cookie_department);
	// 获取单位
	var cookie_department = localStorage.getItem('cookie_department');
	cookie_department = cookie_department.substring(0,
			cookie_department.length - 1);
	// 每个单位id-名称
	eachDepart = cookie_department.split("&");
	for (var i = 0; i < eachDepart.length; i++) {
		var eachDep = eachDepart[i].split("-");
		$("#department")
				.append(
						"<option value='" + eachDep[0] + "'>" + eachDep[1]
								+ "<oprion>")
	}
	
	/*
	 * $("#startDatePicker").datepicker({ autoSize : true, });
	 * $("#endDatePicker").datepicker({ autoSize : true, });
	 */

	var myDate = getNowFormatDate();
	var myDateSplit = myDate.split("-");
	$("#year").val(myDateSplit[0]);
	$("#month").val(myDateSplit[1]);

	/*
	 * $("#startDatePicker").val(myDate); $("#endDatePicker").val(myDate);
	 */

	// 页面加载完成之后执行
	// 初始化表单
	pageInit();

	// 页面加载完成之后执行
});

$(window)
		.resize(
				function() {
					
				});

// 新建表单实例
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
	var personName = $("#personName").val();
	var projectType = $("#projectType").find("option:selected").text();
	var year = $("#year").val();
	var month = $("#month").val();
	//getStandardday(year,month);
	layui.use('table', function() {
		var thisTable1 = layui.table;

		// 第一个实例
		tableIns = thisTable1.render({
			id : 'layTable1',
			elem : '#jqgrid1',
			height : 'full-45',
			limit : 30, // 每页显示数
			limits : [ 30, 60, 90 ], // 支持的分页数
			url : localhostPath + projectName + '/attence/queryAttenceDetail'// 数据接口
			/*,
			page : true // 开启分页
*/			,
			method : 'post' // 如果无需自定义HTTP类型，可不加该参数
			,
			request : {
				pageName : 'page' // 页码的参数名称，默认：page
				,
				limitName : 'rows' // 每页数据量的参数名，默认：limit

			},
			where : { // 向后台传输的数据
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
				field : 'id',
				title : 'ID',
				width : '15%',
				hide : true,
			}, {
				field : 'departmentName',
				title : '部门',
				width : '12%',
				align : 'center',
				sort: true
			}, {
				field : 'projectType',
				title : '工程类别',
				width : '12%',
				align : 'center',
			},{
				field : 'personName',
				title : '姓名',
				align : 'center',
				width : '12%',
				sort: true
			}, {
				field : 'mobile',
				title : '电话',
				align : 'center',
				width : '13%'
			},{
				field : 'regionNum',
				title : '责任区编号',
				align : 'center',
				width : '11%'
			},{
				field : 'regionNameList',
				title : '责任区名',
				align : 'center',
				width : '11%'
			},{
				field : 'patrolDate',
				title : '日期',
				align : 'center',
				width : '13%',
				sort: true
			},
			{
				field : 'qualified',
				title : '是否达标',
				align : 'center',
				width : '8%',
				templet: function(d){
					switch (d.qualified) {
					case "1":
						return "是";

					default:
						return "否";
					}
					
			    }
			}, {
				field : 'trailLen',
				title : '里程',
				align : 'center',
				width : '8%',
				templet: function(d){
					if(d.trailLen){
						return parseFloat(d.trailLen).toFixed(1);
					}else{
						return "";
					}
			    }
			} ] ],
			done: function (res, curr, count) {
	            $('.layui-table-header span').css('color','#058563');
	            $('.layui-table-header th').css('background-color', '#E6E6E6');
	            $('.layui-table-header span').css('font-weight','700');
	            /*$('.layui-table th,.layui-table td').css('font-size','15px');*/
	            $('[id^="layui-table-page"]').css('text-align','center');
	           /* $(".layui-table-view .layui-table").css("width","100%");*/
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
			thisTable1.resize('layTable1');
		});
	});

	

	/**
	 * 条件查询
	 */
	$("#submit").on('click', function() {
		// 获取从查询参数
		department = $("#department").val();
		if(department == "0"){
			department = "全部";
		}
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
		//getStandardday(year,month);
	});
}

$("#excel").on('click', function() {
	downloadExcel();
});

/*function getStandardday(year,month){
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
}*/
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

function downloadExcel() {
	department = $("#department").val();
	if(department == "0"){
		department = "全部";
	}
	personName = $("#personName").val();
	year = $("#year").val();
	month = $("#month").val();
	projectType = $("#projectType").find("option:selected").text();
	departmentName = $("#department").find("option:selected").text();
	var type = "Detail";
	var indexExport = layer.load(0);
	$.ajax({
		url : '/ResourceMonitor/attence/downloadDetail',// 请求的url地址
		dataType : "json", // 返回格式为json
		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
		// 向后台传输的数据
		data : {
			'department' : department,
			'personName' : personName,
			'year' : year,
			'month' : month,
			'type' : type,
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
			// var location = "../excel/"+title+".xls";
			var location = "/ResourceMonitor/excel/" + title + ".xls";
			top.layer.open({
				content : '<center><span>' + respText.msg + '</span></center>',
				success : function(layero, index) {
					// 下载文件
					var $form = $('<form method="GET"></form>');
					$form.attr('action', location);
					$form.appendTo($('body'));
					$form.submit();
					layer.close(indexExport);

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