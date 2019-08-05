var cookie_logingUser;
var localhostPath;
var projectName;

$(function() {
	// 获取路径
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
	// 初始化
	pageInit();

});

$(window).resize(function() {});

// 新建表单实例
var thisTable;

function pageInit() {
	layui.use('table',function() {
				thisTable = layui.table;
				
				// 第一个实例
				thisTable
						.render({
							id : 'layTable',
							elem : '#jqgrid',
							height : 'full-45',
							limit : 30,
							limits : [ 30, 60, 90 ],
							url : localhostPath + projectName+ '/system/querySysRole'// 数据接口
							,page : true // 开启分页
							,
							method : 'post' // 如果无需自定义HTTP类型，可不加该参数
							,
							request : {
								pageName : 'page' // 页码的参数名称，默认：page
								,
								limitName : 'rows' // 每页数据量的参数名，默认：limit

							},
							response : {
								statusName : 'status' // 规定数据状态的字段名称，默认：code
								,statusCode : 200 // 规定成功的状态码，默认：0
								,msgName : 'msg' // 规定状态信息的字段名称，默认：msg
								,countName : 'records' // 规定数据总数的字段名称，默认：count
								,dataName : 'rows' // 规定数据列表的字段名称，默认：data
							},
							cols : [ [ // 表头
								{
									field : 'title',
									title : '设备名称',
									width : '11%',
									align : 'center',
								},{
									field : 'title',
									title : '用户账号',
									width : '11%',
									align : 'center',
								},{
									field : 'title',
									title : '密码',
									width : '11%',
									align : 'center',
									
								},{
									field : 'title',
									title : 'IP地址',
									width : '15%',
									align : 'center',
									
								},{
									field : 'title',
									title : '端口号',
									width : '11%',
									align : 'center',
									
								},{
									field : 'title',
									title : '通道',
									width : '11%',
									align : 'center',
									
									
								},{
									field : 'title',
									title : '经纬度',
									width : '15%',
									align : 'center',
									
								},{
									field : 'title',
									title : '所属机构',
									width : '15%',
									align : 'center',
									
								}] ],
									done: function (res, curr, count) {
										$('.layui-table-header th').css('background-color', '#E6E6E6');
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
		queryList();
	});

	$("#excel").on('click', function() {
		downloadExcel();
	});
}

function queryList() {
	// 获取从查询参数
	department = $("#department").val();
	personName = $("#personName").val();
	startTime = $("#startDatePicker").val();
	endTime = $("#endDatePicker").val();
	readState = $("#readState").val();
	projectType = $("#projectType").find("option:selected").text();

	thisTable.reload('layTable', {
		where : { // 设定异步数据接口的额外参数，任意设
			department : department,
			personName : personName,
			startTime : startTime,
			endTime : endTime,
			readState : readState,
			projectType : projectType
		// …
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});

}
