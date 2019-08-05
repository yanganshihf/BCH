var localhostPath;
// 获取项目名
var projectName;
var logUser = localStorage.getItem('cookie_logingUser');
var logMobile = localStorage.getItem('cookie_mobile');
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
function getCookies(c_name) {
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
$(function() {
	// 设置部门
	// alert(cookie_department);
	// 获取单位
	var cookie_department = localStorage.getItem('cookie_department');
	cookie_department = cookie_department.substring(0,
			cookie_department.length - 1);
	// 每个单位id-名称
	var eachDepart = cookie_department.split("&");
	for (var i = 0; i < eachDepart.length; i++) {
		var eachDep = eachDepart[i].split("-");
		$("#department")
				.append(
						"<option value='" + eachDep[0] + "'>" + eachDep[1]
								+ "<oprion>")
	}

	$("#startDatePicker").datepicker({
		autoSize : true,
	});
	$("#endDatePicker").datepicker({
		autoSize : true,
	});
	;
	var myDate = getNowFormatDate();
	$("#startDatePicker").val(myDate);
	$("#endDatePicker").val(myDate);

	// 页面加载完成之后执行

	// 初始化表单
	pageInit();

	// 页面加载完成之后执行
	//var childrenPageHeight = $('#publicMessage', window.parent.document).height();
	//$("#jqgrid").setGridHeight(childrenPageHeight-85);
	//$("#jqgrid").setGridWidth($("#gridCond").width());

});

$(window)
		.resize(
				function() {
					// 页面加载完成之后执行
					//var childrenPageHeight = $('#publicMessage',window.parent.document).height();
					//$("#jqgrid").setGridHeight(childrenPageHeight-85);
					//$("#jqgrid").setGridWidth($("#gridCond").width());
				});
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
	var fileName = $("#fileName").val();
	var personName = $("#personName").val();
	var menus = localStorage.getItem('cookie_menu');
	layui.use('table',function() {
				var thisTable = layui.table;
				
				// 第一个实例
				tableIns =	thisTable
						.render({
							id : 'layTable',
							elem : '#jqgrid',
							height : 'full-40',
							limit : 30,
							limits : [ 30, 60, 90 ],
							url : localhostPath + projectName + '/notice/listNotice'// 数据接口
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
								'fileName' : $("#fileType").val(),
								'fileNum' : $("#fileNum").val(),
								'fileType' : parseInt($("#fileType").val())
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
										width : '10%',
										hide : true,
										fixed : 'left'
									},
									{
										field : 'noticeTitle',
										title : '标题',
										align : 'center',
										width : '30%'
									},
									{
										field : 'noticeCode',
										title : '内容',
										width : '25%',
										align : 'center'
									},
									{
										field : 'publicer',
										title : '发布者',
										align : 'center',
										width : '10%'
									},
									{
										field : 'publicTime',
										title : '发布时间',
										align : 'center',
										width : '15%'
									},
									{
										field : 'title',
										title : '详情',
										align : 'center',
										width : '10%',
										templet : function(d) {

											return '<img src="'
											+ projectName
											+ '/images/indexpage/details.png" onclick="showDetail('
											+ "'"
											+ d.noticeCode
											+ "'"
											+ ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="预览"/>';
										}
									},{
										field : 'title',
										title : '删除',
										width : '10%',
										align : 'center',
										templet : function(d) {
											//
											if (menus.indexOf("删除通知公告") > -1) {
												return '<img src="'
												+ projectName
												+ '/images/indexpage/delete.png" onclick="delNotice('
												+ "'"
												+ d.id
												+ "'" 
												+ ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="删除"/>';
											}else{
												return '<img src="'
												+ projectName
												+ '/images/indexpage/delete.png" style="width:16px;height:16px;margin:10px 10px 5px 5px;cursor:not-allowed;" title="删除"/>';
											}
										}
									}] ],
									done: function (res, curr, count) {
										$('.layui-table-header th').css(
												'background-color', '#E6E6E6');
										$('.layui-table-header span').css('color','#058563');
							            $('.layui-table-header span').css('font-weight','700');
							            /*$('.layui-table th,.layui-table td').css('font-size','15px');*/
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
		queryByCond();
	});
	
	/**
	 * 发布
	 */
	$("#PushMessage").on('click', function() {
		 layui.use('layer', function(){
		        layer = layui.layer;
		        var layerIndex = layer.open({
					type : 2,
					title: 0,
					closeBtn:0,
					resize : false,
					content : 'PushMessage.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
					btn : 0,
					success: function(layero, index){
						$(".layui-layer-btn").css("padding-bottom","0px");
					}
				});
				layer.full(layerIndex);
		 });
		
	});

}

function closeLayer(){
	layui.use('layer', function(){
	   layer = layui.layer;
	   layer.closeAll();
	});
	   // 刷新列表
	queryByCond();
}
/**
 * *************************************************************
 * 
 * 显示详情
 * 
 * **************************************************************
 */
function showDetail(noticeCode) {
	var aheight = $(document).height() -50;
	var awidth = $(document).width() - 50;
	 layui.use('layer', function(){
	        layer = layui.layer;
	        var noticeDetail = layer.open({
	    		type : 2,
	    		content : 'noticeDetail.jsp',
	    		title : '通知详情',
	    		area : [awidth+'px',aheight+'px'],
	    		resize : false,
	    		success : function(layero, index) {
	    			var body = layer.getChildFrame('body', index);
	    			body.find('#showDetail').html(noticeCode);
	    		}
	    	});
	 });
}

function delNotice(id){
	layui.use('layer', function(){
		layer = layui.layer;
		var index = top.layer.confirm('确定删除?', function(index) {
			$.ajax({
				url : localhostPath + projectName + '/notice/delNotice', // 请求的url地址
				dataType : "json", // 返回格式为json
				async : false,// 请求是否异步，默认为异步，这也是ajax重要特性
				data : {
					id : id
				}, // 参数值
				type : "POST", // 请求方式
				beforeSend : function() {
					// 请求前的处理
				},
				success : function(req) {
					// 请求成功时处理
					layer.msg(req.msg);
					// 刷新页面
					top.layer.close(index);
					queryByCond();
				},
				complete : function() {
					// 请求完成的处理
				},
				error : function() {
					// 请求出错处理
				}
			});
			top.layer.close(index);
		});
	});
}

function queryByCond() {
	// 获取从查询参数
	var fileName = $("#fileName").val();
	var personName = $("#personName").val();
	var fileType = $("#fileType").val();

	fileType = parseInt(fileType);
	
	tableIns.reload({
		where : { // 设定异步数据接口的额外参数，任意设
			'fileName' : fileName,
			'personName' : personName,
			'fileType' : fileType
		// …
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
