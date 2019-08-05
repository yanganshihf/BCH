var localhostPath;
var projectName;
var selectPerson;
var logUser = localStorage.getItem('cookie_logingUser');
var logMobile = localStorage.getItem('cookie_mobile');

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


	// 页面加载完成之后执行
	var father_width = $(window.parent.document).find("#contentFrame").width();
	var cond_height = $("#cond").height();

	// 初始化表单
	pageInit();

	/*$("#jqgrid").setGridWidth($("#gridCond").width());
	$("#jqgrid").setGridHeight($(window).height() - 45 - cond_height);*/

});

$(window).resize(function() {
	var father_width = $(window.parent.document).find("#contentFrame").width();
	var cond_height = $("#cond").height();

	/*$("#jqgrid").setGridWidth($("#gridCond").width());
	$("#jqgrid").setGridHeight($(window).height() - 45 - cond_height);*/
});

//新建表单实例
var thisTable;

function pageInit() {
	// 获取路径
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);

	// 获取从查询参数
	var department = $("#department").val();
	if(department == "0"){
		department = "全部";
	}
	//var personName = $("#personName").val();
	var regionNum = $("#regionNum").val();
	var regionName = $("#regionName").val();
	//var mobile = $("#mobile").val();
	var menus = localStorage.getItem('cookie_menu');
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
							url : localhostPath + projectName + '/region/queryRegion' // 数据接口
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
								regionNum : regionNum,
								regionName : regionName
								
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
										field : 'departme_1',
										title : '部门',
										width : '10%',
										align : 'center',
										templet: function(d){
											// 设置部门
											// 获取单位
											var cookie_department = localStorage.getItem('cookie_department');
											cookie_department = cookie_department.substring(0,
													cookie_department.length - 1);
											// 每个单位id-名称
											var eachDepart = cookie_department.split("&");
											// 遍历
											for (var i = 0; i < eachDepart.length; i++) {
												var eachDep = eachDepart[i].split("-");
												// 添加选项 department为select的id
												if (eachDep[0] == d.departme_1) {
													return eachDep[1];
												}
											}
											
									    }
									},
									{
										field : 'regionName',
										title : '责任区名称',
										align : 'center',
										width : '10%'
									},
									{
										field : 'regionNum',
										title : '区域编号',
										align : 'center',
										width : '10%'
									},
									{
										field : 'objectid',
										title : 'id',
										hide : true,
										width : '45%'
									},
									{
										field : 'mobileNums',
										title : '下辖人员电话',
										hide : true,
										width : '20%',
										templet : function(d) {
											return '<span class="'+d.objectid+'num" style="">'+d.mobileNums+'</span>';
										}
									},
									{
										field : 'patrols',
										title : '下发人员',
										align : 'center',
										width : '40%',
										templet : function(d) {
											return '<span class="'+d.objectid+'lock" style="">'+d.patrols+'</span>';
										}
									},
									{
										field : 'title',
										title : '定位',
										width : '10%',
										align : 'center',
										templet : function(d) {
											if(menus.indexOf("责任区定位") > -1){
												return '<img src="'
												+ projectName
												+ '/images/indexpage/dingwei.png" onclick="locateRegion('
												+ "'"
												+ d.objectid
												+ "'"
												+ ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="定位"/>'
											}else{
												return '<img src="'
												+ projectName
												+ '/images/indexpage/dingwei.png" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:not-allowed;" title="定位"/>'
											}
										}
									},
									{
										field : 'title',
										title : '下发',
										width : '10%',
										align : 'center',
										templet : function(d) {
											//
											if(menus.indexOf("责任区下发") > -1){
												return '<img src="'
												+ projectName
												+ '/images/indexpage/Issued.png" onclick="xiafa('
												+ "'"
												+ d.objectid
												+ "'"
												+ ','
												+ "'"
												+ d.regionName
												+ "'"
												+ ','
												+ "'"
												+ d.departme_1
												+ "'"
												+ ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="下发"/>';
											}else{
												return '<img src="'
												+ projectName
												+ '/images/indexpage/Issued.png" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:not-allowed;" title="下发"/>';
											}
											
										}
									},
									{
										field : 'title',
										title : '删除',
										width : '10%',
										align : 'center',
										templet : function(d) {
											if(menus.indexOf("责任区删除") > -1){
												return '<img src="'
												+ projectName
												+ '/images/indexpage/delete.png" onclick="delRegion('
												+ "'"
												+ d.objectid
												+ "'"
												+ ','
												+ "'"
												+ d.regionName
												+ "'"
												+ ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="删除"/>'
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
							            /*$('.layui-table th,.layui-table td').css('font-size','15px');*/
							            $('[id^="layui-table-page"]').css('text-align','center');
							            /*$(".layui-table-view .layui-table").css("width","100%");*/
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
$("#submit").on('click', function() {
	pageInit();
});
function queryByCond() {
	// 获取从查询参数
	department = $("#department").val();
	if(department == "0"){
		department = "全部";
	}
	regionNum = $("#regionNum").val();
	regionName = $("#regionName").val();
	thisTable.reload('layTable', {
		where : { 
			// 设定异步数据接口的额外参数，任意设
			department : department,
			regionNum : regionNum,
			regionName : regionName
			
			// …
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});
}
/**
 * 区域下发
 */
function xiafa(id,regionName, departmentCode) {
	var patrolMobileList = $("[class^='"+id+"num']").html();
	var personNameList = $("[class^='"+id+"lock']").html();
	selectPerson = top.layer.open({
		type : 2,
		title : '责任区下发',
		content : '/ResourceMonitor/jsp/patrolForRanger/region/patrolPerson.jsp',
		area : ['785px','550px'],
		btn:0,
		resize : false,
		success : function(layero, index) {
			var body = top.layer.getChildFrame('body', index);
			var iframeWin = top.window[layero.find('iframe')[0]['name']]; // 得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
			// console.log(body.html()) //得到iframe页的body内容
			iframeWin.close = closeLayer;
			body.find('#department').val(departmentCode);
			body.find('#id').val(id);
			body.find('#mobileSelected').val(patrolMobileList);
			body.find('#personSelected').val(personNameList);
			body.find('#regionName').val(regionName);
		}
	});
	// layer.full(selectPerson);
}
/**
 * 区域删除
 */
function delRegion(id) {
	parent.deleteFeatureFun(id,queryByCond);
/*	var index =top.layer.confirm('确定删除区域？', {
		btn : [ '确定', '取消' ]
	// 可以无限个按钮

	}, function(index, layero) {
		// 按钮【按钮一】的回调
		$.ajax({
			url : localhostPath + projectName + '/region/delRegion', // 请求的url地址
			dataType : "json", // 返回格式为json
			async : false,// 请求是否异步，默认为异步，这也是ajax重要特性
			data : {
				id : id,
				regionName: regionName
			}, // 参数值
			type : "POST", // 请求方式
			beforeSend : function() {
				// 请求前的处理
			},
			success : function(req) {
				// 请求成功时处理
				top.layer.close(index);
				queryByCond();
				layer.alert(req.msg);
			},
			complete : function() {
				// 请求完成的处理
			},
			error : function() {
				// 请求出错处理
			}
		});
	}, function(index) {
		// 按钮【按钮二】的回调
	});*/
}

function locateRegion(id) {
	parent.locateRegion(id);
}

var closeLayer = function(id,personSelected,mobileSelected) {
	$("[class^='"+id+"lock']").html(personSelected);
	$("[class^='"+id+"num']").html(mobileSelected);
}
