var menulistSave = new Array();
var Roleid = '';
var Rolename = '';

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

/**
 * 实时监控
 */
$(function() {

	// 初始化表单
	pageInit();
	var childrenPageHeight = $(window).height()-93;
	$("#roleedit").height(childrenPageHeight);
	$("#roleedit").css("overflow", "auto");
	if (childrenPageHeight > 500) {
		var value = childrenPageHeight - 508;
		value = Math.round(value / 26) + 8;

		$("#roleedit td").css("padding-top", value + "px");
		$("#roleedit td").css("padding-bottom", value + "px");
	}
	$("label.checkbox-inline").off('click', '.checkbox-inline').on("click",
			function() {
				var inputId = $(this).children("input").attr("id");// 获取点击的input的ID
				clickInput(inputId, this);
				return false;
			});
	$(window).resize(function() {
		var childrenPageHeight = $(window).height()-93;
		$("#roleedit").height(childrenPageHeight);
		$("#roleedit").css("overflow", "auto");
		if (childrenPageHeight > 500) {
			var value = childrenPageHeight - 508;
			value = Math.round(value / 26) + 9;
			$("#roleedit td").css("padding-top", value + "px");
			$("#roleedit td").css("padding-bottom", value + "px");
		}
	});
});

// 新建表单实例
var thisTable;

function pageInit() {
	// 获取路径
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	var localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	var projectName = pathname
			.substring(0, pathname.substr(1).indexOf('/') + 1);
	var menus = localStorage.getItem('cookie_menu');

	layui.use('table',function() {
						thisTable = layui.table;

						thisTable
								.render({
									id : 'layTable',
									elem : '#jqgrid',
									height : 'full-50',
									limit : 30,
									limits : [ 30, 60, 90 ],
									url : localhostPath + projectName
											+ '/system/querySysRole'// 数据接口
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
												type : 'numbers',
												fixed : 'left',
												width : '7%'
											},
											{
												field : 'roleName',
												title : '角色',
												width : '39%',
												align : 'center'
											},
											{
												field : 'id',
												title : 'id',
												hide : true
											},
											{
												field : 'menuArray',
												title : '拥有权限',
												hide : true
											},
											{
												field : 'remarks',
												title : '备注',
												width : '35%',
												hide : true
											},
											{
												field : 'title',
												title : '重命名',
												width : '27%',
												templet : function(d) {
													if (menus.indexOf("重命名角色") > -1) {

														return '<img src="'
																+ projectName
																+ '/images/indexpage/rename.png" onclick="renameSysRole('
																+ "'"
																+ d.LAY_TABLE_INDEX
																+ "'"
																+ ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="重命名"/>'
													} else {
														return '<img src="'
																+ projectName
																+ '/images/indexpage/rename.png" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:not-allowed;" title="重命名"/>'
													}

												},
												align : 'center'
											},
											
											/*{
												field : 'title',
												title : '赋权',
												width : '27%',
												templet : function(d) {

													return '<img src="'
															+ projectName
															+ '/images/indexpage/details.png" onclick="loadRolemenu('
															+ "'"
															+ d.menuArray
															+ "'"
															+ ",'"
															+ d.id
															+ "'"
															+ ",'"
															+ d.roleName
															+ "'"
															+ ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="赋权"/>';
												},
												align : 'center',
												
											} ,*/{
												field : 'title',
												title : '删除',
												width : '27%',
												templet : function(d) {
													if (menus.indexOf("删除角色") > -1) {
														return '<img src="'
																+ projectName
																+ '/images/indexpage/delete.png" onclick="deleteSysRole('
																+ "'"
																+ d.LAY_TABLE_INDEX
																+ "'"
																+ ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="删除"/>';
													} else {
														return '<img src="'
																+ projectName
																+ '/images/indexpage/delete.png" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:not-allowed;" title="删除"/>'
													}
												},
												align : 'center',
											}]],
											
									done : function(res, curr, count) {
										$('.layui-table-header th').css('background-color', '#E6E6E6');
										$('.layui-table-header span').css('color', '#058563');
										$('.layui-table-header span').css('font-weight', '700');
										/*$('.layui-table th,.layui-table td').css('font-size', '15px');*/
										$('[id^="layui-table-page"]').css('text-align', 'center');
										$(".layui-table-view .layui-table").css("width","100%");
									}
									
								});

						var tmpobj=null;
						layui.table.on('row', function(obj){
							if (tmpobj!=null){
								tmpobj.tr[0].style='background-color: #ffffff;';
								if (tmpobj.tr[1]){
									tmpobj.tr[1].style='background-color: #ffffff;';	
								}
							}
							tmpobj=obj;
							obj.tr[0].style='background-color: #00801c61;';
							if (obj.tr[1]){
								obj.tr[1].style='background-color: #00801c61;';
							}
							Roleid = obj.data.id;
							Rolename = obj.data.roleName;
							var menulist = obj.data.menuArray.split(",");
							menulist.pop();
							$("input[name='checkDisabled']:checkbox").prop("disabled", false);
							$("input[id^='check']:checkbox").prop("checked", false);
							$("input[id^='check']:checkbox +label").css({
								"background" : ""
							});
							$.getJSON("/ResourceMonitor/json/menuidStr.json", function(data) {
								for (var i = 0; i < menulist.length; i++) {
									var inputId = data[menulist[i]];
									checkedLoading(inputId);
								}
							});
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


// 重新渲染JQgrid
function reload() {
	pageInit();
	/*$("#jqgrid").jqGrid('setGridParam', {
		url : '/ResourceMonitor/system/querySysRole',
		datatype : 'json',
		page : 1
	}).trigger("reloadGrid");*/
}

function addSysRole() {
	//
	top.layer
			.open({
				type : 1,
				title : '新增角色',
				area : [ '290px', '155px' ],
				shade : 0,
				resize : false,
				content : '<div  style="margin:20px 20px 0px;">角色名<input class="form-control" id="roleName" style="margin-left:10px; width: 76%;display: inline;"></div>',
				btn : [ '提交', '取消' ],
				yes : function(index, layero) {
					var roleName = $(layero).find('#roleName').val();
					$.ajax({
						url : '/ResourceMonitor/system/addSysRole', // 请求的url地址
						dataType : "json", // 返回格式为json
						async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
						data : {
							roleName : roleName
						}, // 参数值
						type : "POST", // 请求方式
						beforeSend : function() {
							// 请求前的处理
						},
						success : function(req) {
							// 请求成功时处理
							// 关闭弹窗
							top.layer.close(index);
							if (req.msg == "success") {
								top.layer.msg("添加成功，可设置权限")
							} else {
								top.layer.msg("添加失败")
							}
							// 刷新列表
							pageInit();
						},
						complete : function() {
							// 请求完成的处理
						},
						error : function() {
							// 请求出错处理
						}
					});
				}
			});
}

/**
 * 删除系统角色
 */
function deleteSysRole(id) {
	top.layer.confirm('确定删除', function(index) {
		// do something
		$.ajax({
			url : '/ResourceMonitor/system/delSysRole', // 请求的url地址
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
				pageInit();
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
 * 重命名系统角色
 */
function renameSysRole(id) {
	var rowData = thisTable.cache.layTable[id];

	var strValue = rowData.roleName;
	var menuArray = rowData.menuArray;

	var index = top.layer
			.open({
				id : 'renameSysRole',
				type : 1,
				title : '重命名角色',
				area : [ '290px', '155px' ],
				shade : 0,
				resize : false,
				content : '<div  style="margin:20px 20px 0px;"><span>角色名</span><input class="form-control" id="roleName" style="margin-left:10px; width: 76%;display: inline;"  value="'+ strValue + '"></div>',
				btn : [ '提交', '取消' ],
				yes : function(index, layero) {
					// alert($("#roleName").val());
					var roleName = $(layero).find('#roleName').val();
					$.ajax({
						url : '/ResourceMonitor/system/editSysRole', // 请求的url地址
						dataType : "json", // 返回格式为json
						async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
						data : {
							roleName : roleName,
							id : id,
							menuArray : menuArray
						}, // 参数值
						type : "POST", // 请求方式
						beforeSend : function() {
							// 请求前的处理
						},
						success : function(req) {
							// 请求成功时处理
							top.layer.close(index);
							if (req.msg == "success") {
								top.layer.msg("重命名成功")
							}
							pageInit();
						},
						complete : function() {
							// 请求完成的处理
						},
						error : function() {
							// 请求出错处理
						}
					});
				}
			});
}

$("#sure1").on('click', function() {
	var x;
	// var rowid = $("#jqgrid").jqGrid('getGridParam', 'selrow');
	// var roleName = $("#jqgrid").jqGrid("getCell", rowid, "roleName");
	// var id = $("#jqgrid").jqGrid("getCell", rowid, "id");
	menulistSave = [];

	if (!Roleid) {
		top.layer.alert('请选择用户角色');
		return;
	}
	$.getJSON("/ResourceMonitor/json/idmenuStr.json", function(data) {
		for (x in data) {
			if ($("input[id='" + x + "']").prop("checked")) {
				menulistSave.push(data[x]);
			}
		}
		menuArray = menulistSave.join(",") + ",";
		$.ajax({
			url : '/ResourceMonitor/system/editSysRole', // 请求的url地址
			dataType : "json", // 返回格式为json
			async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
			data : {
				roleName : Rolename,
				id : Roleid,
				menuArray : menuArray
			}, // 参数值
			type : "POST", // 请求方式
			beforeSend : function() {
				// 请求前的处理
			},
			success : function(resp) {
				//top.layer.closeAll();
				if (resp.msg == "success") {
					top.layer.msg("权限修改成功");
				}
				pageInit();
			},
			complete : function() {
				// 请求完成的处理
			},
			error : function() {
				// 请求出错处理
			}
		});
	});
});

function loadRolemenu(menuArray, id, roleName) {
	$("[data-index]").css('background', '');
	$("[data-index = '" + id + "']").css('background', '#BBBBBB');
	Roleid = id;
	Rolename = roleName;
	var menulist = menuArray.split(",");
	menulist.pop();
	$("input[name='checkDisabled']:checkbox").prop("disabled", false);
	$("input[id^='check']:checkbox").prop("checked", false);
	$("input[id^='check']:checkbox +label").css({
		"background" : ""
	});
	$.getJSON("/ResourceMonitor/json/menuidStr.json", function(data) {
		for (var i = 0; i < menulist.length; i++) {
			var inputId = data[menulist[i]];
			checkedLoading(inputId);
		}
	});
}

$("#addSysRole").on('click', function() {
	addSysRole();
});