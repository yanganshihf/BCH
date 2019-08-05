var localhostPath;
var projectName;
var logUser = localStorage.getItem('cookie_logingUser');
var logMobile = localStorage.getItem('cookie_mobile');
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
	getRoleName();

	$("#startDatePicker").datepicker({
		autoSize : true,
	});
	$("#endDatePicker").datepicker({
		autoSize : true,
	});
	var myDate = getNowFormatDate();
	$("#startDatePicker").val(myDate);
	$("#endDatePicker").val(myDate);

	// 页面加载完成之后执行
	// 初始化表单
	pageInit();
	// var childrenPageHeight = $('#system', window.parent.document).height();

	// $("#jqgrid").setGridHeight(childrenPageHeight-75);
	// $("#jqgrid").setGridWidth($("#jqgridCont").width());

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
	var department = $("#department").val();
	var personName = $("#personName").val();
	var mobile = $("#mobile").val();
	var role = $("#role").val();
	var menus = localStorage.getItem('cookie_menu');
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
											+ '/system/querySysUsers' // 数据接口
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
										'mobile' : mobile,
										'role' : role
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
												field : 'departmentVal',
												title : '部门',
												width : '10%',
												align : 'center',
												templet : function(d) {

													// 设置部门
													// 获取单位
													var cookie_department = localStorage.getItem('cookie_department');
													cookie_department = cookie_department
															.substring(
																	0,
																	cookie_department.length - 1);
													// 每个单位id-名称
													var eachDepart = cookie_department
															.split("&");
													// 遍历
													for (var i = 0; i < eachDepart.length; i++) {
														var eachDep = eachDepart[i]
																.split("-");
														// 添加选项
														// department为select的id
														if (eachDep[0] == d.departmentVal) {
															return eachDep[1];
														}
													}

												}
											},
											{
												field : 'id',
												title : 'id',
												hide : true,
												width : '45%'
											},
											{
												field : 'userName',
												title : '用户名',
												align : 'center',
												width : '20%'
											},
											{
												field : 'mobile',
												title : '电话',
												align : 'center',
												width : '20%'
											},
											{
												field : 'role_id',
												title : '权限',
												align : 'center',
												hide : true,
												width : '15%',
												templet : function(d) {
													switch (d.role_id) {
													case 1:
														return "是";

													default:
														return "否";
													}

												}
											},
											{
												field : 'remarks',
												title : '备注',
												align : 'center',
												width : '35%'
											},
											{
												field : 'title',
												title : '编辑',
												width : '7%',
												align : 'center',
												templet : function(d) {
													if (menus.indexOf("用户信息编辑") > -1) {
														return '<img src="'
																+ projectName
																+ '/images/indexpage/edit.png" onclick="edit('
																+ "'"
																+ d.LAY_TABLE_INDEX
																+ "'"
																+ ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="编辑"/>';
													} else {
														return '<img src="'
																+ projectName
																+ '/images/indexpage/edit.png" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:not-allowed;" title="编辑"/>'
													}

												}
											},
											{
												field : 'title',
												title : '删除',
												width : '8%',
												align : 'center',
												templet : function(d) {
													if (menus.indexOf("删除用户") > -1) {
														return '<img src="'
																+ projectName
																+ '/images/indexpage/delete.png" onclick="Del('
																+ "'"
																+ d.LAY_TABLE_INDEX
																+ "'"
																+ ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="删除"/>';
													} else {
														return '<img src="'
																+ projectName
																+ '/images/indexpage/delete.png" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:not-allowed;" title="删除"/>'
													}

												}
											} ] ],
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

	/**
	 * 条件查询
	 */
	$("#submit").on('click', function() {
		queryGrid();
	});
	/**
	 * 添加系统用户
	 */
	$("#add").on('click', function() {
		// 获取从查询参数
		var layerIndex = top.layer.open({
			type : 2,
			title : '添加系统用户',
			content : '/ResourceMonitor/jsp/system/addSysuser.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
			// ['http://sentsin.com', 'no']
			btn : [ '确定', '取消' ],
			area : [ '305px', '365px' ],
			resize : false,
			yes : function(index, layero) {
				// do something
				var iframeWin = top.window[layero.find('iframe')[0]['name']]; // 得到iframe页的窗口对象，执行iframe页的方法：

				iframeWin.sumbit();
				top.layer.close(layerIndex);
				queryGrid();
			},
			btn2 : function(index, layero) {
				// do something
				top.layer.close(layerIndex); // 如果设定了yes回调，需进行手工关闭
			},
		});
	});
}

/**
 * 修改信息
 */
function edit(id) {
	// 获取当前行数据
	
	var rowData = thisTable.cache.layTable[id];
	var detail = top.layer.open({
		title : '编辑人员信息',
		type : 2,
		resize : false,
		area : [ '305px', '365px' ],
		content : '/ResourceMonitor/jsp/system/EditSysUser.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
		// ['http://sentsin.com', 'no']
		btn : [ '确定', '取消' ],
		success : function(layero, index) {
			var body = top.layer.getChildFrame('body', index);
			body.find('#userRole').val(rowData.role_id);
			body.find('#mobilephone').val(rowData.mobile);
			body.find('#userName').val(rowData.userName);
			body.find('#userPassword').val(rowData.password);
			body.find('#userremark').val(rowData.remarks);
			body.find('#departmentNameSelect').val(rowData.departmentVal);
		},
		yes : function(index, layero) {
			var id = rowData.id;

			// 按钮【按钮一】的回调
			// 从子页面读取参数
			var body = top.layer.getChildFrame('body', index);
			var userRole = body.find("#userRole").val();
			var userName = body.find("#userName").val();
			var mobilephone = body.find("#mobilephone").val();
			var userPassword = body.find("#userPassword").val();
			// var
			// departmentName=$("#departmentNameSelect").find("option:selected").text();
			var departmentCode = body.find("#departmentNameSelect").val();
			// alert(userRole)
			var userremark = body.find("#userremark").val();

			// 参数校验
			var addFlag = 1;
			var mobileNumReg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
			var pat = new RegExp("[#_%&'/\"\\,;:=!^]", "i");
			if (userName == '') {
				top.layer.msg("姓名不能为空");
				addFlag = 0;
			} else if (pat.test(userName)) {
				top.layer.msg("姓名中包含非法字符");
				$("#userName").val("");
				addFlag = 0;
			} else if (mobilephone == "") {
				top.layer.msg("手机号不能为空");
				addFlag = 0;
			} else if (!mobileNumReg.test(mobilephone)) {
				top.layer.msg("请输入有效的手机号码");
				$("#mobilephone").val("");
				addFlag = 0;
			} else if (userPassword.length < 6) {
				top.layer.msg("密码至少6位");
				addFlag = 0;
			} else if (pat.test(userPassword)) {
				top.layer.msg("密码中包含非法字符");
				$("#userPassword").val("");
				addFlag = 0;
			} else if (pat.test(userremark)) {
				top.layer.msg("备注中包含非法字符");
				$("#userremark").val("");
				addFlag = 0;
			}

			if (addFlag == 1) {
				$.ajax({
					url : '/ResourceMonitor/system/edit',
					type : 'POST',
					data : {
						password : userPassword,
						personName : userName,
						mobile : mobilephone,
						remarks : userremark,
						department : departmentCode,
						id : id,
						role : userRole
					},
					success : function(resp) {
						if (resp.msg == "success") {
							top.layer.msg("修改成功");
							queryGrid();
						} else {
							top.layer.msg("修改失败");
						}
					}
				});
			}
			queryGrid();
		},
		btn2 : function(index, layero) {
			// 按钮【按钮二】的回调
			// return false 开启该代码可禁止点击该按钮关闭
		}
	});
}

/**
 * 删除人员
 * 
 * @param id
 * @returns
 */
function Del(id) {

	// 获取当前行数据
	var rowData = thisTable.cache.layTable[id];

	var id = rowData.id;
	var userName = rowData.userName;
	top.layer.confirm('确定删除', function(index) {
		// do something
		$.ajax({
			url : '/ResourceMonitor/system/del', // 请求的url地址
			dataType : "json", // 返回格式为json
			async :true,// 请求是否异步，默认为异步，这也是ajax重要特性
			data : {
				id : id,
				'personName' : userName
			}, // 参数值
			type : "POST", // 请求方式
			beforeSend : function() {
				// 请求前的处理
			},
			success : function(req) {
				
				// 请求成功时处理
				// 关闭弹窗
				
				// 打开提示
				top.layer.msg(req.msg);
				top.layer.close(index);
				// 刷新列表
				queryGrid();
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

function queryGrid() {
	// 获取从查询参数
	department = $("#department").val();
	personName = $("#personName").val();
	mobile = $("#mobile").val();
	role = $("#role").val();

	thisTable.reload('layTable', {
		where : { // 设定异步数据接口的额外参数，任意设
			'department' : department,
			'personName' : personName,
			'mobile' : mobile,
			'role' : role
		// …
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});

}
// 加载用户角色
function getRoleName() {
	$.ajax({
		url : '/ResourceMonitor/system/queryRole', // 请求的url地址
		dataType : "json", // 返回格式为json
		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
		type : "POST", // 请求方式
		success : function(req) {

			for (i = 0; i < req.rows.length; i++) {
				//
				$("#role").append(
						"<option value='" + req.rows[i].id + "'>"
								+ req.rows[i].roleName + "</option>");
			}
		}
	});
}