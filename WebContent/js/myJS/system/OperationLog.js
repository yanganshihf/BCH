var localhostPath;
var projectName;
/**
 * 
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
/**
 * 实时监控
 */
var eachDepart;
$(function() {
	pageInit();
	/**
	 * 条件查询
	 */
	$("#submit").on('click', function() {
		pageInit();
	});
	$("#excel").on('click', function() {
		downloadExcel();
	});
});

// 新建表单实例
var thisTable;

function pageInit() {

	//top.layer.closeAll();
	// 获取路径
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);

	// 获取从查询参数
	var ModuleType = $("#ModuleType").val();
	var OperationType = $("#OperationType").val();
	var logUser = $("#logUser").val();
	var logMobile = $("#logMobile").val();
	layui
			.use(
					'table',
					function() {
						thisTable = layui.table;

						// 第一个实例
						thisTable
								.render({
									id : 'layTable',
									elem : '#jqgrid',
									height : 'full-45',
									limit : 30,
									limits : [ 30, 60, 90 ],
									url : localhostPath + projectName
											+ '/OperationLog/queryInfo' // 数据接口
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
										'ModuleType' : ModuleType,
										'OperationType' : OperationType,
										'logUser' : logUser,
										'logMobile' : logMobile
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
												title : 'id',
												hide : true,
												width : '45%'
											},
											{
												field : 'logUser',
												title : '操作人员',
												align : 'center',
												width : '15%'
											},
											{
												field : 'logMobile',
												title : '人员电话',
												align : 'center',
												width : '15%'
											},
											{
												field : 'moduleType',
												title : '操作单元',
												align : 'center',
												hide : true,
												width : '12%'
											},
											{
												field : 'operationType',
												title : '操作类型',
												align : 'center',
												hide : true,
												width : '11%'
											},
											{
												field : 'logTime',
												title : '操作时间',
												align : 'center',
												width : '20%'
											},
											{
												field : 'operationInfo',
												title : '操作信息',
												align : 'center',
												width : '50%'
											}] ],
									done : function(res, curr, count) {
										$('.layui-table-header th').css(
												'background-color', '#E6E6E6');
										$('.layui-table-header span').css(
												'color', '#058563');
										$('.layui-table-header span').css(
												'font-weight', '700');
										/*$('.layui-table th,.layui-table td')
												.css('font-size', '15px');*/
										$('[id^="layui-table-page"]').css(
												'text-align', 'center');
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
}

$("#ModuleType").on("change",function(){
	var ModuleTypeVal = $("#ModuleType").val();
	changeModuleType(ModuleTypeVal);
});
function changeModuleType(value){
	$("#OperationType").empty();
	if(value == '全部' || value == '区域管理'|| value == '护林员管理' || value == '系统管理'  ){
		 $("#OperationType").append("<option>全部</option>");
	}
	if(value == '全部' || value == '系统登录'){
		 $("#OperationType").append("<option>登录</option>");
	}
	if(value == '全部' || value == '护林员管理' || value == '系统管理'){
		$("#OperationType").append("<option>新增</option>");
		$("#OperationType").append("<option>修改</option>");
	}
	if(value != '系统登录'){
		$("#OperationType").append("<option>删除</option>");
	}
	if(value == '全部' || value == '区域管理'){
		$("#OperationType").append("<option>下发</option>");
	}
	if(value == '全部' || value == '护林员管理'){
		$("#OperationType").append("<option>冻结</option>");
		$("#OperationType").append("<option>解冻</option>");
	}
}
function queryGrid() {
	// 获取从查询参数
	 ModuleType = $("#ModuleType").val();
	 OperationType = $("#OperationType").val();
	 logUser = $("#logUser").val();
	 logMobile = $("#logMobile").val();

	thisTable.reload('layTable', {
		where : { // 设定异步数据接口的额外参数，任意设
			'ModuleType' : ModuleType,
			'OperationType' : OperationType,
			'logUser' : logUser,
			'logMobile' : logMobile
		// …
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});
}

function downloadExcel() {
	ModuleType = $("#ModuleType").val();
	OperationType = $("#OperationType").val();
	logUser = $("#logUser").val();
	logMobile = $("#logMobile").val();
	var ModuleTypeName = $("#ModuleType").find("option:selected").text();
	var indexExport = top.layer.load(0);
	$.ajax({
		url : localhostPath + projectName + '/OperationLog/DownInfo',
		dataType : "json", // 返回格式为json
		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
		data : {
			'ModuleType' : ModuleType,
			'OperationType' : OperationType,
			'logUser' : logUser,
			'logMobile' : logMobile,
			'ModuleTypeName' : ModuleTypeName
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