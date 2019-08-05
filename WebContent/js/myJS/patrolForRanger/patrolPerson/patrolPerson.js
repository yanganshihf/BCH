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
	var father_width = $(window.parent.document).find("#contentFrame").width();
	var cond_height = $("#cond").height();

	// 初始化表单
	pageInit();
});

$(window).resize(function() {
	var father_width = $(window.parent.document).find("#contentFrame").width();
	var cond_height = $("#cond").height();
});

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
	var personName = $("#personName").val();
	var mobile = $("#mobile").val();
	var projectType = $("#projectType").find("option:selected").text();
	var menus = localStorage.getItem('cookie_menu');
	layui.use(
					'table',
					function() {
						thisTable = layui.table;

						// 第一个实例
						thisTable
								.render({
									id : 'layTable',
									elem : '#jqgrid',
									height : 'full-90',
									limit : 30,
									limits : [ 30, 60, 90 ],
									url : localhostPath + projectName
											+ '/person/queryPersons' // 数据接口
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
												title : 'id',
												width : '10%',
												hide : true,
											},
											{
												field : 'departmentName',
												title : '部门',
												align : 'center',
												width : '10%',
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
												field : 'projectType',
												title : '工程类别',
												width : '10%',
												align : 'center'
											},
											{
												field : 'personName',
												title : '姓名',
												align : 'center',
												width : '8%'
											},
											{
												field : 'personSex',
												title : '性别',
												align : 'center',
												width : '6%',
												templet : function(d) {
													switch (d.personSex) {
													case 1:
														return "男";

													default:
														return "女";
													}
												}
											},
											{
												field : 'mobile',
												title : '电话',
												align : 'center',
												width : '12%'
											},
											{
												field : 'identifyPhoto',
												title : '照片',
												width : '1%',
												hide : true
											},

											{
												field : 'uploadTime',
												title : '上传时间',
												hide : true,
												width : '10%'
											},
											{
												field : 'employDate',
												title : '聘用日期',
												hide : true,
												width : '10%'
											},
											{
												field : 'unEmployDate',
												title : '解聘日期',
												hide : true,
												width : '30%'
											},

											{
												field : 'isOnline',
												title : '在线状态',
												hide : true,
												width : '25%'
											},

											{
												field : 'IMEI',
												title : 'IMEI',
												hide : true,
												width : '30%'
											},
											{
												field : 'unfreezeIMEI',
												title : 'unfreezeIMEI',
												hide : true,
												width : '30%'
											},

											{
												field : 'accountNum',
												title : 'accountNum',
												hide : true,
												width : '25%'
											},
											{
												field : 'regionName',
												title : '管护区名',
												align : 'center',
												width : '10%'
											},
											{
												field : 'remark',
												title : '备注',
												align : 'center',
												width : '10%'
											},
											{
												field : 'regionArea',
												title : '管护区面积',
												hide : true,
												width : '30%'
											},
											{
												field : 'nationality',
												title : '民族',
												hide : true,
												width : '30%'
											},

											{
												field : 'age',
												title : '年龄',
												hide : true,
												width : '25%'
											},
											{
												field : 'birthplace',
												title : '出生地',
												hide : true,
												width : '25%'
											},
											{
												field : 'idCode',
												title : 'idCode',
												hide : true,
												width : '25%'
											},
											{
												field : 'birthday',
												title : 'birthday',
												hide : true,
												width : '30%'
											},
											{
												field : 'educated',
												title : '教育情况',
												hide : true,
												width : '30%'
											},

											{
												field : 'healthy',
												title : '健康状况',
												hide : true,
												width : '25%'
											},
											{
												field : 'homeAddress',
												title : '家庭地址',
												hide : true,
												width : '25%'
											},

											{
												field : 'medicare',
												title : 'medicare',
												hide : true,
												width : '25%'
											},
											{
												field : 'old_age',
												title : 'old_age',
												hide : true,
												width : '25%'
											},
											{
												field : 'poverty',
												title : 'poverty',
												hide : true,
												width : '30%'
											},
											{
												field : 'patrolPlace',
												title : 'patrolPlace',
												hide : true,
												width : '30%'
											},

											{
												field : 'superiorTree',
												title : '优势树种',
												hide : true,
												width : '25%'
											},
											{
												field : 'nationalForestArea',
												title : '国家级保护区',
												hide : true,
												width : '25%'
											},
											{
												field : 'nationalForestCode',
												title : '国家级保护区编号',
												hide : true,
												width : '25%'
											},
											{
												field : 'employState',
												title : '雇佣状态',
												hide : true,
												width : '30%'
											},

											{
												field : 'contractDateBegin',
												title : 'contractDateBegin',
												hide : true,
												width : '25%'
											},
											{
												field : 'contractDateEnd',
												title : 'contractDateEnd',
												hide : true,
												width : '25%'
											},
											{
												field : 'regionForestArea',
												title : 'regionForestArea',
												hide : true,
												width : '25%'
											},
											{
												field : 'regionForestCode',
												title : 'regionForestCode',
												hide : true,
												width : '30%'
											},
											{
												field : 'contractPeriod',
												title : 'contractPeriod',
												hide : true,
												width : '30%'
											},

											{
												field : 'unemployReason',
												title : 'unemployReason',
												hide : true,
												width : '25%'
											},
											{
												field : 'homeAddress',
												title : '家庭地址',
												hide : true,
												width : '25%'
											},

											{
												field : 'medicare',
												title : 'medicare',
												hide : true,
												width : '25%'
											},
											{
												field : 'old_age',
												title : 'old_age',
												hide : true,
												width : '25%'
											},
											{
												field : 'poverty',
												title : 'poverty',
												hide : true,
												width : '30%'
											},
											{
												field : 'patrolPlace',
												title : 'patrolPlace',
												hide : true,
												width : '30%'
											},

											{
												field : 'superiorTree',
												title : '优势树种',
												hide : true,
												width : '25%'
											},
											{
												field : 'nationalForestArea',
												title : '国家级保护区',
												hide : true,
												width : '25%'
											},
											{
												field : 'nationalForestCode',
												title : '国家级保护区编号',
												hide : true,
												width : '25%'
											},
											{
												field : 'authorized',
												title : '授权',
												align : 'center',
												width : '7%',
												templet : function(d) {
													switch (d.authorized) {
													
												case 1:

													return "是";

												default:
													return "否";
												}
												}
											},
											{
												field : 'freezed',
												title : '冻结',
												align : 'center',
												width : '7%',
												templet : function(d) {
													switch (d.freezed) {
													case 1:

														return "<a class='"+d.id+"' onclick=\"cancleFreeze('"
																+ d.LAY_TABLE_INDEX
																+ "')\">是</a>";

													default:
														return "<a class='"+d.id+"' onclick=\"doFreeze('"
																+ d.LAY_TABLE_INDEX
																+ "')\">否</a>";
													}

												}
											},
											{
												field : 'title',
												title : '详情',
												width : '7%',
												align : 'center',
												templet : function(d) {

													return '<img src="'
															+ projectName
															+ '/images/indexpage/details.png" onclick="detail('
															+ "'"
															+ d.LAY_TABLE_INDEX
															+ "'"
															+ ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="详情"/>'
												}
											},
											{
												field : 'title',
												title : '编辑',
												width : '7%',
												align : 'center',
												templet : function(d) {
													if (menus
															.indexOf("护林员信息编辑") > -1) {
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
												width : '6%',
												align : 'center',
												templet : function(d) {
													if (menus.indexOf("删除护林员") > -1) {
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
										//$(".layui-table-view .layui-table").css("width","100%");
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
	$("#send").on('click', function() {
		$.ajax({
			url : localhostPath + projectName + '/person/findList',
			dataType : "json", // 返回格式为json
			async : false,// 请求是否异步，默认为异步，这也是ajax重要特性
			type : "POST", // 请求方式
			beforeSend : function() {
				// 请求前的处理
			},
			success : function(req) {
				
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

// 冻结
function doFreeze(id) {
	var rowID = id;
	var rowData = thisTable.cache.layTable[id];
	var id = rowData.id;
	var personName = rowData.personName;
	top.layer.confirm('确定冻结?', function(index) {
		$.ajax({
			url : localhostPath + projectName + '/person/doFreeze',
			dataType : "json", // 返回格式为json
			async : false,// 请求是否异步，默认为异步，这也是ajax重要特性
			data : {
				"id" : id,
				"personName":personName
			}, // 参数值
			type : "POST", // 请求方式
			beforeSend : function() {
				// 请求前的处理
			},
			success : function(req) {
				$("[class='"+id+"']").attr("onclick",  "cancleFreeze('"+rowID+"');");
		    	$("[class='"+id+"']").html("是");
				// 请求成功时处理
				top.layer.close(index);
				top.layer.msg(req.msg);
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

// 解冻
function cancleFreeze(id) {
	var rowID = id;
	var rowData = thisTable.cache.layTable[id];
	var id = rowData.id;
	var personName = rowData.personName;
	top.layer.confirm('确定解冻?', function(index) {
		$.ajax({
			url : localhostPath + projectName + '/person/cancleFreeze',
			dataType : "json", // 返回格式为json
			async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
			data : {
				"id" : id,
				"personName":personName
			}, // 参数值
			type : "POST", // 请求方式
			beforeSend : function() {
				// 请求前的处理
			},
			success : function(req) {
		    	$("[class='"+id+"']").attr("onclick",  "doFreeze('"+rowID+"');");
		    	$("[class='"+id+"']").html("否");
				// 请求成功时处理
				top.layer.close(index);
				top.layer.msg(req.msg);
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

$("#excel").on('click', function() {
	downloadExcel();
});

function queryByCond() {
	// 获取从查询参数
	department = $("#department").val();
	if(department == "0"){
		department = "全部";
	}
	personName = $("#personName").val();
	mobile = $("#mobile").val();
	projectType = $("#projectType").find("option:selected").text();
	thisTable.reload('layTable', {
		where : { // 设定异步数据接口的额外参数，任意设
			'department' : department,
			'personName' : personName,
			'mobile' : mobile,
			'projectType' : projectType
		// …
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});

}

/**
 * 新增
 */
$("#addNew")
		.on(
				'click',
				function() {
					var addNew = top.layer.open({
								title : '新增人员',
								type : 2,
								resize : false,
								content : '/ResourceMonitor/jsp/patrolForRanger/patrolPerson/addPerson.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
								// ['http://sentsin.com', 'no']
								btn : [ '确定', '取消' ],
								area : [ '800px', '540px' ],
								offset : '65px',
								resize : false,
								yes : function(index, layero) {
									// 按钮【按钮一】的回调
									// 从子页面读取参数
									var oldmobile = "";
									var body = top.layer.getChildFrame('body',
											index);
									var personName = body.find('#personName')
											.val();
									var personSex = body.find(
											"input[name='personSex']:checked")
											.val()
									if (personSex == "1") {
										personSex = 1
									} else {
										personSex = 0
									}
									var nationality = body.find('#nationality')
											.val();
									var age = body.find(
											"input[name='age']:checked").val();
									var birthplace = body.find('#birthplace')
											.val();
									var idCode = body.find('#idcode').val();
									var birthday = body.find('#birthday').val();
									var homeAddress = body.find('#homeAddress')
											.val();
									var educated = body.find('#educated').val();

									var projectTypeval = body.find(
											'#projectTypeSelect').val();
									if (projectTypeval == "1") {
										projectType = '天保';
									} else {
										projectType = '生态护林员';
									}

									var healthy = body.find('#healthy').val();
									var medicare = body.find(
											"input[name='medical']:checked")
											.val();
									var old_age = body.find(
											"input[name='oldage']:checked")
											.val();
									var poverty = body.find(
											"input[name='poverty']:checked")
											.val();
									var accountNum = body.find('#accountNum')
											.val();
									var regionName = body.find('#regionName')
											.val();
									var patrolPlace = body.find('#patrolPlace')
											.val();
									var regionArea = body.find('#regionArea')
											.val();

									var superiorTree = body.find(
											'#superiorTree').val();
									var nationalForestArea = body.find(
											'#nationalForestArea').val();
									var nationalForestCode = body.find(
											'#nationalForestCode').val();
									var regionForestArea = body.find(
											'#regionForestArea').val();
									var regionForestCode = body.find(
											'#regionForestCode').val();
									var employState = body.find('#employState')
											.val();
									var contractDateBegin = body.find(
											'#contractDateBegin').val();
									var contractDateEnd = body.find(
											'#contractDateEnd').val();
									var mobile = body.find('#mobile').val();
									var departmentVal = body.find(
											'#departmentVal').val();
									var authorized = body.find(
											"input[name='authorized']:checked")
											.val();
									if (authorized == "1") {
										authorized = 1
									} else {
										authorized = 0
									}
									var freezed = body.find('#freezed').val();
									if (freezed == "1") {
										freezed = 1
									} else {
										freezed = 0
									}
									var remark = body.find('#remark').val();

									// 校验
									var result = compareDate(contractDateBegin,
											contractDateEnd);// 验证结束日期在起始日期之前
									var pat = new RegExp("[#_%&'/\"\\,;:=!^]",
											"i");
									var patternAge = /^[1-9][0-9]$/;
									var reg_15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
									var reg_18 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;
									var digitalReg = /^\d+(\.\d+)?$/;
									var datePat = /^(2[0-9][1-9][0-9])-(0?[1-9]|1[0-2])-((0?[1-9])|((1|2)[0-9])|30|31)$/;
									var addFlag = 1;
														if (personName == "") {
															top.layer
																	.msg("用户名不能为空");
														} else if (pat
																.test(personName)) {
															top.layer
																	.msg("用户名包含非法字符");
														} else if (age
																&& !patternAge
																		.test(age)) {
															top.layer
																	.msg("请输入有效的年龄");
														}else if (idCode=='') {
															top.layer.msg("身份证号不能为空");
														} else if (idCode && !reg_15
																.test(idCode)
																&& !reg_18
																		.test(idCode)) {
															top.layer
																	.msg("身份证号格式不正确");
														} else if (mobile == "") {
															top.layer
																	.msg("手机号不能为空");
														} else if (!(/^1[34578]\d{9}$/
																.test(mobile))) {
															top.layer
																	.msg("手机号格式错误");
														} else if (homeAddress.length > 20) {
															top.layer
																	.msg("家庭住址不超过20个汉字");
														} else if (pat
																.test(accountNum)) {
															top.layer
																	.msg("责任区编号中包含非法字符");
														} else if (pat
																.test(regionName)) {
															top.layer
																	.msg("责任区名中包含非法字符");
														} else if (patrolPlace.length > 20) {
															top.layer
																	.msg("管护地点不超过20个汉字");
														} else if (regionArea
																&& !digitalReg
																		.test(regionArea)) {
															top.layer
																	.msg("管护面积包含非法字符");
														} else if (superiorTree.length > 25) {
															top.layer
																	.msg("主要林种不超过25个汉字");
														} else if (nationalForestArea
																&& !digitalReg
																		.test(nationalForestArea)) {
															top.layer
																	.msg("国家公益林面积包含非法字符");
														} else if (!/^(\d{1,5}[,])*(\d{1,5})?$/
																.test(nationalForestCode)) {
															top.layer
																	.msg("国家公益林小班号必须是以逗号(英文)隔开的数字");
														} else if (regionForestArea
																&& !digitalReg
																		.test(regionForestArea)) {
															top.layer
																	.msg("地方公益林面积包含非法字符");
														} else if (!/^(\d{1,5}[,])*(\d{1,5})?$/
																.test(regionForestCode)) {
															top.layer
																	.msg("地方公益林小班号必须是以逗号(英文)隔开的数字");
														} else if (parseFloat(nationalForestArea)
																+ parseFloat(regionForestArea) > parseFloat(regionArea)) {
															top.layer
																	.msg("国家公益林面积和地方公益林的面积和不应大于管护面积");
														} else if (result > 0) {
															top.layer
																	.msg("结束日期不能早于开始日期");
														} else if (pat
																.test(remark)) {
															top.layer
																	.msg("备注中包含非法字符");
														} else if (addFlag == 1) {
															var identifyPhoto;
															// 如果未添加图片
															if (body
																	.find(
																			'#imghead')
																	.attr("src")
																	.indexOf(
																			"photo_icon") > -1) {
																identifyPhoto = "";
															} else {
																identifyPhoto = mobile
																		+ ".jpg";

																var iframeWin = top.window[layero
																		.find('iframe')[0]['name']]; // 得到iframe页的窗口对象，执行iframe页的方法：
																// 上传文件
																iframeWin
																		.uploadFile(identifyPhoto);

															}
															// 插入记录
															$
																	.ajax({
																		url : localhostPath
																				+ projectName
																				+ '/person/addNew', // 请求的url地址
																		dataType : "json", // 返回格式为json
																		async : false,// 请求是否异步，默认为异步，这也是ajax重要特性
																		data : {
																			identifyPhoto : identifyPhoto,
																			personName : personName,
																			personSex : personSex,
																			mobile : mobile,
																			departmentVal : departmentVal,
																			authorized : authorized,
																			freezed : freezed,
																			remark : remark,
																			nationality : nationality,
																			age : age,
																			birthplace : birthplace,
																			idCode : idCode,
																			birthday : birthday,
																			educated : educated,
																			healthy : healthy,
																			homeAddress : homeAddress,
																			medicare : medicare,
																			old_age : old_age,
																			poverty : poverty,
																			superiorTree : superiorTree,
																			nationalForestArea : nationalForestArea,
																			nationalForestCode : nationalForestCode,
																			employState : employState,
																			patrolPlace : patrolPlace,
																			contractDateBegin : contractDateBegin,
																			contractDateEnd : contractDateEnd,
																			regionForestArea : regionForestArea,
																			regionForestCode : regionForestCode,
																			projectType : projectType,
																			accountNum : accountNum,
																			regionName : regionName,
																			regionArea : regionArea
																		}, // 参数值
																		type : "POST", // 请求方式
																		beforeSend : function() {
																			// 请求前的处理
																		},
																		success : function(
																				req) {
																			// 请求成功时处理
																			// 关闭弹窗
																			top.layer.close(addNew);
																			// 打开提示
																			top.layer
																					.msg(req.msg);
																			// 刷新列表
																			queryByCond();
																		},
																		complete : function() {
																			// 请求完成的处理
																		},
																		error : function() {
																			// 请求出错处理
																		}
																	});
														}
								},
								btn2 : function(index, layero) {
									// 按钮【按钮二】的回调
									// return false 开启该代码可禁止点击该按钮关闭
								}
							});
					// layer.full(addNew);
				});

/**
 * 显示详情
 */
function detail(id) {
	var detail = top.layer.open({
		title : '人员详细信息',
		type : 2,
		resize : false,
		content : '/ResourceMonitor/jsp/patrolForRanger/patrolPerson/PersonDetail.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
		 btn: ['打印', '关闭' ],
		area : [ '800px', '560px' ],
		offset : '65px',
		success : function(layero, index) {
			var body = top.layer.getChildFrame('body', index);
			findBody(id, body);
		},
		btn1 : function(index, layero) {
			//layer.closeAll();
			var body = top.layer.getChildFrame('body', index);
			var iframeWin = top.window[layero.find('iframe')[0]['name']];
			//pagesetup_default();
			iframeWin.print();
		},
		btn2 :function(index,layero){
			top.layer.close(index);
		}
	});
	// layer.full(detail);
}

/**
 * 修改信息,冻结解冻,授权取消授权
 */
function edit(id) {
	// 获取当前行数据
	var rowData = thisTable.cache.layTable[id];
	var oldmobile = rowData.mobile;
	var oldPerson = rowData.personName;
	var oldauthorized = rowData.authorized;
	var oldDepartmentVal = rowData.departmentVal;
	var detail = top.layer.open({
				title : '人员信息修改',
				type : 2,
				resize : false,
				content : '/ResourceMonitor/jsp/patrolForRanger/patrolPerson/PersonEdit.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
				// ['http://sentsin.com', 'no']
				btn : [ '确定', '取消' ],
				area : [ '800px', '560px' ],
				offset : '65px',
				success : function(layero, index) {
					var body = top.layer.getChildFrame('body', index);
					findEditBody(id, body);
				},
				yes : function(index, layero) {
					var id = rowData.id;

					// 按钮【按钮一】的回调
					// 从子页面读取参数
					var body = top.layer.getChildFrame('body', index);
					var personSex = body.find("input[name='personSex']:checked").val()
					if (personSex == "1") {
						personSex = 1
					} else {
						personSex = 0
					}
					var personName = body.find('#personName').val();
					var age = body.find("input[name='age']:checked").val();
					var nationality = body.find('#nationality').val();
					var age = body.find('#age').val();
					var birthplace = body.find('#birthplace').val();
					var idCode = body.find('#idcode').val();
					var birthday = body.find('#birthday').val();
					var homeAddress = body.find('#homeAddress').val();
					var educated = body.find('#educated').val();

					var projectTypeval = body.find('#projectTypeSelect').val();
					if (projectTypeval == "1") {
						projectType = '天保';
					} else {
						projectType = '生态护林员';
					}

					var healthy = body.find('#healthy').val();
					var medicare = body.find("input[name='medical']:checked")
							.val();
					var old_age = body.find("input[name='oldage']:checked")
							.val();
					var poverty = body.find("input[name='poverty']:checked")
							.val();
					var accountNum = body.find('#accountNum').val();
					var regionName = body.find('#regionName').val();
					var patrolPlace = body.find('#patrolPlace').val();
					var regionArea = body.find('#regionArea').val();

					var superiorTree = body.find('#superiorTree').val();
					var nationalForestArea = body.find('#nationalForestArea')
							.val();
					var nationalForestCode = body.find('#nationalForestCode')
							.val();
					var regionForestArea = body.find('#regionForestArea').val();
					var regionForestCode = body.find('#regionForestCode').val();
					var employState = body.find('#employState').val();
					var contractDateBegin = body.find('#contractDateBegin')
							.val();
					var contractDateEnd = body.find('#contractDateEnd').val();
					var unemployReason = body.find('#unemployReason').val();
					var unEmployDate = body.find('#unEmployDate').val();
					if(!unEmployDate){
						unEmployDate = "2099-12-12";
					}
					var mobile = body.find('#mobile').val();
					var departmentVal = body.find('#departmentVal').val();
					var authorized = body.find(
							"input[name='authorized']:checked").val();
					if (authorized == "1") {
						authorized = 1
					} else {
						authorized = 0
					}
					var freezed = body.find('#freezed').val();
					if (freezed == "1") {
						freezed = 1
					} else {
						freezed = 0
					}
					var remark = body.find('#remark').val();

					// 校验
					var result = compareDate(contractDateBegin, contractDateEnd);// 验证结束日期在起始日期之前
					var pat = new RegExp("[#_%&'/\"\\,;:=!^]", "i");
					var patternAge = /^[1-9][0-9]$/;
					var reg_15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
					var reg_18 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;
					var digitalReg = /^\d+(\.\d+)?$/;
					var datePat = /^(2[0-9][1-9][0-9])-(0?[1-9]|1[0-2])-((0?[1-9])|((1|2)[0-9])|30|31)$/;
										if (personName == "") {
											top.layer.msg("用户名不能为空");
										} else if (pat.test(personName)) {
											top.layer.msg("用户名包含非法字符");
										} else if (age && !patternAge.test(age)) {
											top.layer.msg("请输入有效的年龄");
										} else if (idCode && !reg_15.test(idCode)
												&& !reg_18.test(idCode)) {
											top.layer.msg("身份证号格式不正确");
										} else if (mobile == "") {
											top.layer.msg("手机号不能为空");
										} else if (!(/^1[34578]\d{9}$/.test(mobile))) {
											top.layer.msg("手机号格式错误");
										}else if (homeAddress.length > 20) {
											top.layer.msg("家庭住址不超过20个汉字");
										} else if (pat.test(accountNum)) {
											top.layer.msg("责任区编号中包含非法字符");
										} else if (pat.test(regionName)) {
											top.layer.msg("责任区名中包含非法字符");
										} else if (patrolPlace.length > 20) {
											top.layer.msg("管护地点不超过20个汉字");
										} else if (regionArea
												&& !digitalReg.test(regionArea)) {
											top.layer.msg("管护面积包含非法字符");
										} else if (superiorTree.length > 25) {
											layer.msg("主要林种不超过25个汉字");
										} else if (nationalForestArea
												&& !digitalReg
														.test(nationalForestArea)) {
											top.layer.msg("国家公益林面积包含非法字符");
										} else if (!/^(\d{1,5}[,])*(\d{1,5})?$/
												.test(nationalForestCode)) {
											top.layer
													.msg("国家公益林小班号必须是以逗号(英文)隔开的数字");
										} else if (regionForestArea
												&& !digitalReg
														.test(regionForestArea)) {
											top.layer.msg("地方公益林面积包含非法字符");
										} else if (!/^(\d{1,5}[,])*(\d{1,5})?$/
												.test(regionForestCode)) {
											top.layer
													.msg("地方公益林小班号必须是以逗号(英文)隔开的数字");
										} else if (parseFloat(nationalForestArea)
												+ parseFloat(regionForestArea) > parseFloat(regionArea)) {
											top.layer
													.msg("国家公益林面积和地方公益林的面积和不应大于管护面积");
										} else if (result > 0) {
											top.layer.msg("结束日期不能早于开始日期");
										} else if (unEmployDate
												&& !datePat.test(unEmployDate)) {
											top.layer.msg("解聘日期无效");
										} else if (pat.test(remark)) {
											top.layer.msg("备注中包含非法字符");
										} else {
											var identifyPhoto;
											// 如果未添加图片
											if (body.find('#imghead').attr(
													"src")
													.indexOf("photo_icon") > -1) {
												identifyPhoto = "";
											} else {
												identifyPhoto = mobile + ".jpg";

												var iframeWin = top.window[layero
														.find('iframe')[0]['name']]; // 得到iframe页的窗口对象，执行iframe页的方法：
												// 上传文件
												iframeWin.uploadFile(identifyPhoto);

											}

											$.ajax({
												url : localhostPath + projectName + '/person/edit', // 请求的url地址
														dataType : "json", // 返回格式为json
														async : false,// 请求是否异步，默认为异步，这也是ajax重要特性
														data : {
															identifyPhoto : identifyPhoto,
															personName : personName,
															personSex : personSex,
															mobile : mobile,
															departmentVal : departmentVal,
															authorized : authorized,
															freezed : freezed,
															remark : remark,
															id : id,
															nationality : nationality,
															age : age,
															birthplace : birthplace,
															idCode : idCode,
															birthday : birthday,
															educated : educated,
															healthy : healthy,
															homeAddress : homeAddress,
															medicare : medicare,
															old_age : old_age,
															poverty : poverty,
															superiorTree : superiorTree,
															nationalForestArea : nationalForestArea,
															nationalForestCode : nationalForestCode,
															employState : employState,
															patrolPlace : patrolPlace,
															contractDateBegin : contractDateBegin,
															contractDateEnd : contractDateEnd,
															regionForestArea : regionForestArea,
															regionForestCode : regionForestCode,
															unemployReason : unemployReason,
															unEmployDate : unEmployDate,
															projectType : projectType,
															accountNum : accountNum,
															regionName : regionName,
															regionArea : regionArea,
															oldPerson : oldPerson,
															oldMobile : oldmobile,
															oldauthorized : oldauthorized,
															oldDepartmentVal : oldDepartmentVal,
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
															queryByCond();
														},
														complete : function() {
															// 请求完成的处理
														},
														error : function() {
															// 请求出错处理
														}
													});
										}
				},
				btn2 : function(index, layero) {
					// 按钮【按钮二】的回调
					// return false 开启该代码可禁止点击该按钮关闭10 3.5 3.5
				}
			});
	// layer.full(detail);
}
function compareDate(strDate1, strDate2) {
	var date1 = new Date(strDate1.replace(/\-/g, "\/"));
	var date2 = new Date(strDate2.replace(/\-/g, "\/"));
	return date1 - date2;
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
	var personName = rowData.personName;
	var oldmobile = rowData.mobile;
	var idCode = rowData.idCode;
	top.layer.confirm('确定删除', function(index) {
		// do something
		$.ajax({
			url : localhostPath + projectName + '/person/Del', // 请求的url地址
			dataType : "json", // 返回格式为json
			async : false,// 请求是否异步，默认为异步，这也是ajax重要特性
			data : {
				id : id,
				oldMobile : oldmobile,
				oldPerson : personName,
				idCode : idCode
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
				queryByCond();
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

function downloadExcel() {
	department = $("#department").val();
	if(department == "0"){
		department = "全部";
	}
	personName = $("#personName").val();
	mobile = $("#mobile").val();
	var departmentName = $("#department").find("option:selected").text();
	var indexExport = layer.load(0);
	$.ajax({
		url : localhostPath + projectName + '/person/download',// 请求的url地址
		dataType : "json", // 返回格式为json
		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
		data : {
			'department' : department,
			'personName' : personName,
			'mobile' : mobile,
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

function findEditBody(id,body){
	var rowData = thisTable.cache.layTable[id];
	
	
	body.find('#personName').val(rowData.personName);
	
	body.find(":radio[name='personSex'][value='"+rowData.personSex+"']").prop("checked",true);
	body.find('#nationality').val(rowData.nationality);
	body.find('#age').val(rowData.age);
	body.find('#birthplace').val(rowData.birthplace);
	body.find('#idcode').val(rowData.idCode);
	if(rowData.birthday == "1900-01-01"){
		body.find('#birthday').val("");
	}else{
		body.find('#birthday').val(rowData.birthday);
	}
	//body.find('#birthday').val(rowData.birthday);
	body.find('#mobile').val(rowData.mobile);
	body.find('#homeAddress').val(rowData.homeAddress);
	body.find('#educated').val(rowData.educated);
	
	if(rowData.projectType == '天保'){
		body.find('#projectTypeSelect').val(1);
	}else{
		body.find('#projectTypeSelect').val(2);
	}
	body.find('#healthy').val(rowData.healthy);
	body.find(":radio[name='medical'][value='"+rowData.medicare+"']").prop("checked",true);
	body.find(":radio[name='oldage'][value='"+rowData.old_age+"']").prop("checked",true);
	body.find(":radio[name='poverty'][value='"+rowData.poverty+"']").prop("checked",true);
	body.find('#accountNum').val(rowData.accountNum);
	body.find('#regionName').val(rowData.regionName);
	body.find('#patrolPlace').val(rowData.patrolPlace);
	body.find('#regionArea').val(rowData.regionArea);
	
	body.find('#superiorTree').val(rowData.superiorTree);
	body.find('#nationalForestArea').val(rowData.nationalForestArea);
	body.find('#nationalForestCode').val(rowData.nationalForestCode);
	body.find('#regionForestArea').val(rowData.regionForestArea);
	body.find('#regionForestCode').val(rowData.regionForestCode);
	body.find('#employState').val(rowData.employState);
	/*body.find('#contractDateBegin').val(rowData.contractDateBegin);
	body.find('#contractDateEnd').val(rowData.contractDateEnd);*/
	body.find('#unemployReason').val(rowData.unemployReason);
	body.find('#unEmployDate').val(rowData.unEmployDate);
	if(rowData.contractDateBegin == "1900-01-01"){
		body.find('#contractDateBegin').val("");
	}else{
		body.find('#contractDateBegin').val(rowData.contractDateBegin);
	}
	if(rowData.contractDateEnd == "1900-01-01"){
		body.find('#contractDateEnd').val("");
	}else{
		body.find('#contractDateEnd').val(rowData.contractDateEnd);
	}
	body.find('#employDate').val(rowData.employDate);

	body.find(":radio[name='authorized'][value='"+rowData.authorized+"']").prop("checked",true);
	if (rowData.authorized != 1) {
		body.find('#authorized').val(0);
	}
	body.find('#freezed').val(rowData.freezed);
	if (rowData.freezed != 1) {
		body.find('#freezed').val(0);
	}
	body.find('#remark').val(rowData.remark);

	// 设置头像
	if (rowData.identifyPhoto.length > 0) {
		//body.find('#imghead').attr("src","../../identifyPhoto/" + rowData.identifyPhoto);
		body.find('#preview').empty();
		body.find('#preview').append("<div id=delSpan><span id=delImg></span></div><img id=imghead border=0 width=130 height=160>");
		body.find('#imghead').attr("src","../../../IdentifyPhoto/" + rowData.identifyPhoto);
	}

	window.setTimeout(function() {
		// alert(rowData.departmentVal);
		// 设置选中
		body.find('#departmentVal').val(rowData.departmentVal);
	}, 300);
}
function findBody(id,body){
	var rowData = thisTable.cache.layTable[id];
	
	
	body.find('#personName').val(rowData.personName);
	if(rowData.personSex){
		body.find("#personSex").val("男");
	}else{
		body.find("#personSex").val("女");
	}
	
	body.find('#nationality').val(rowData.nationality);
	if(rowData.age){
		body.find('#age').val(rowData.age+"岁");
	}
	body.find('#birthplace').val(rowData.birthplace);
	body.find('#idcode').val(rowData.idCode);
	body.find('#birthday').val(rowData.birthday);
	if(rowData.birthday == "1900-01-01"){
		body.find('#birthday').val("");
	}else{
		body.find('#birthday').val(rowData.birthday);
	}
	body.find('#mobile').val(rowData.mobile);
	body.find('#homeAddress').val(rowData.homeAddress);
	switch(rowData.educated){
	case 1:
		body.find('#educated').val("大学");
		break;
	case 2:
		body.find('#educated').val("大专");
		break;
	case 3:
		body.find('#educated').val("高职");
		break;
	case 4:
		body.find('#educated').val("高中");
		break;
	case 5:
		body.find('#educated').val("初中");
		break;
	case 6:
		body.find('#educated').val("小学");
		break;
	default:
		body.find('#educated').val("文盲");
	}
	body.find('#projectTypeSelect').val(rowData.projectType);
	switch(rowData.healthy){
	case 1:
		body.find('#healthy').val("健康");
		break;
	case 2:
		body.find('#healthy').val("良好");
		break;
	default:
		body.find('#healthy').val("其他");
	}
	if(rowData.medicare){
		body.find("#medical").val("是");
	}else{
		body.find("#medical").val("否");
	}
	if(rowData.old_age){
		body.find("#oldage").val("是");
	}else{
		body.find("#oldage").val("否");
	}
	if(rowData.poverty){
		body.find("#poverty").val("是");
	}else{
		body.find("#poverty").val("否");
	}
	
	body.find('#accountNum').val(rowData.accountNum);
	body.find('#regionName').val(rowData.regionName);
	body.find('#patrolPlace').val(rowData.patrolPlace);
	body.find('#regionArea').val(rowData.regionArea);
	
	body.find('#superiorTree').val(rowData.superiorTree);
	body.find('#nationalForestArea').val(rowData.nationalForestArea);
	body.find('#nationalForestCode').val(rowData.nationalForestCode);
	body.find('#regionForestArea').val(rowData.regionForestArea);
	body.find('#regionForestCode').val(rowData.regionForestCode);
	switch(rowData.employState){
	case 1:
		body.find('#employState').val("选聘");
		break;
	case 2:
		body.find('#employState').val("续聘");
		break;
	default:
		body.find('#employState').val("解聘");
	}
	if(rowData.contractDateBegin == "1900-01-01"){
		body.find('#contractDateBegin').val("");
	}else{
		body.find('#contractDateBegin').val(rowData.contractDateBegin);
	}
	if(rowData.contractDateEnd == "1900-01-01"){
		body.find('#contractDateEnd').val("");
	}else{
		body.find('#contractDateEnd').val(rowData.contractDateEnd);
	}
	switch(rowData.unemployReason){
	case 1:
		body.find('#unemployReason').val("死亡");
		break;
	case 2:
		body.find('#unemployReason').val("已脱贫");
		break;
	case 3:
		body.find('#unemployReason').val("分户");
		break;
	case 4:
		body.find('#unemployReason').val("刑拘");
		break;
	case 5:
		body.find('#unemployReason').val("外出务工");
		break;
	case 6:
		body.find('#unemployReason').val("生病");
		break;
	case 7:
		body.find('#unemployReason').val("脱岗");
		break;
	case 8:
		body.find('#unemployReason').val("考核不合格");
		break;
	case 9:
		body.find('#unemployReason').val("自愿退出");
		break;
	case 10:
		body.find('#unemployReason').val("违反管理办法");
		break;
	default:
		body.find('#unemployReason').val("");
	}
	if(rowData.employState == 3){
		body.find('#unEmployDate').val(rowData.unEmployDate);
	}else{
		body.find('#unEmployDate').val("");
	}
	if (rowData.authorized) {
		body.find('#authorized').val("是");
	}else{
		body.find('#authorized').val("否");
	}
	/*body.find('#freezed').val(rowData.freezed);
	if (rowData.freezed != 1) {
		body.find('#freezed').val(0);
	}*/
	body.find('#remark').val(rowData.remark);

	// 设置头像
	if (rowData.identifyPhoto.length > 0) {
		body.find('#imghead').attr("src","../../../IdentifyPhoto/" + rowData.identifyPhoto);
	}
	
	
	var cookie_department = localStorage.getItem('cookie_department');
	cookie_department = cookie_department.substring(0,cookie_department.length - 1);
	// 每个单位id-名称
	var eachDepart = cookie_department.split("&");
	// 遍历
	for (var i = 0; i < eachDepart.length; i++) {
		var eachDep = eachDepart[i].split("-");
		// 添加选项 department为select的id
		if (eachDep[0] == rowData.departmentVal) {
			return body.find('#departmentVal').val(eachDep[1]);
		}
	}
	
	
	//body.find('#departmentVal').val(rowData.departmentVal);
}
function pagesetup_default()
{
try{
  var RegWsh = new ActiveXObject("WScript.Shell");
  hkey_key="header";    
  RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"&w&b页码，&p/&P");
  hkey_key="footer";
  RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"&u&b&d");
}catch(e){ alert(e); }
}