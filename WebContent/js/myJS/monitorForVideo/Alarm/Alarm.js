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
									type : 'numbers',
									title : '序号',
									fixed : 'left',
									width : '5%'
								},
								{
									field : 'title',
									title : '基站编号',
									width : '10%',
									align : 'center',
									templet : function(d) {
										return "56010";
									}
								},{
									field : 'title',
									title : '基站地点',
									width : '13%',
									align : 'center',
								},{
									field : 'title',
									title : '经度',
									width : '13%',
									align : 'center',
									templet : function(d) {
										return "35634293";
									}
								},{
									field : 'title',
									title : '纬度',
									width : '13%',
									align : 'center',
									templet : function(d) {
										return "4024201";
									}
								},{
									field : 'title',
									title : '警报时间',
									width : '18%',
									align : 'center',
									templet : function(d) {
										return "2019-03-08 11:55";
									}
								},{
									field : 'title',
									title : '警报状态',
									width : '12%',
									align : 'center',
									templet : function(d) {
										return "未处理";
									}
									
								},{
									field : 'title',
									title : '基站定位',
									width : '8%',
									align : 'center',
									templet : function(d) {
										return '<img src="'
											+ projectName
											+ '/images/indexpage/dingwei.png" onclick="showDetail('
											+ "'"
											+ d.id
											+ "'"
											+ ')" style="width:16px;height:16px;margin:7px 7px 7px 7px;cursor:pointer;" title="详情"/>'
									}
								},{
									field : 'title',
									title : '消除警报',
									width : '8%',
									align : 'center',
									templet : function(d) {
										return '<img src="'
											+ projectName
											+ '/images/indexpage/delete.png" onclick="showDetail('
											+ "'"
											+ d.id
											+ "'"
											+ ')" style="width:16px;height:16px;margin:7px 7px 7px 7px;cursor:pointer;" title="详情"/>'
									}
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
