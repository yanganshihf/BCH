/**
 * 获取当前日期
 */
var logMobile = localStorage.getItem('cookie_mobile');
var logName = localStorage.getItem('cookie_logingUser');
var localhostPath;
var projectName;
var eachDepart;
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

	var myDate = getNowFormatDate();
	$("#startDatePicker").val(myDate);
	$("#endDatePicker").val(myDate);

	layui.use('laydate', function(){
		laydate = layui.laydate;
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
    });
	
	// 页面加载完成之后执行
	var father_width = $(window.parent.document).find("#contentFrame").width();
	var cond_height = $("#cond").height();

	// 初始化表单
	pageInit();

	/*$("#jqgrid").setGridWidth($("#gridCond").width());
	$("#jqgrid").setGridHeight($(window).height() - 45 - cond_height);*/

	$("#close").on('click', function() {
		parent.showFrame('地图');
	});
});

$(window).resize(function() {
	var father_width = $(window.parent.document).find("#contentFrame").width();
	var cond_height = $("#cond").height();

	/*$("#jqgrid").setGridWidth($("#gridCond").width());
	$("#jqgrid").setGridHeight($(window).height() - 45 - cond_height);*/
});

// 新建表单实例
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
									height : 'full-30',
									limit : 30,
									limits : [ 30, 60, 90 ],
									url : localhostPath + projectName
											+ '/sos/realtimeSos' // 数据接口
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
												field : 'departmentCode',
												title : '部门',
												width : '18%',
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
														if (eachDep[0] == d.departmentCode) {
															return eachDep[1];
														}
													}
													
											    }
											},
											{
												field : 'id',
												title : 'id',
												hide : true,
												width : '20%',
												hide : true
											},
											{
												field : 'projectType',
												title : '工程类别',
												width : '15%',
												hide : true,
												align : 'center',
											},
											{
												field : 'personName',
												title : '护林员',
												align : 'center',
												width : '17%'
											},
											{
												field : 'mobile',
												title : '电话',
												align : 'center',
												width : '24%'
											},
											
											{
												field : 'reportTime',
												title : '时间',
												align : 'center',
												hide : true,
												width : '11%'
											},
											
											{
												field : 'title',
												title : '详情',
												width : '12%',
												align : 'center',
												templet : function(d) {

													return '<img src="'
															+ projectName
															+ '/images/indexpage/details.png" onclick="showDetail('
															+ "'"
															+ d.id
															+ "'"
															+ ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="详情"/>'
												}
											},
											{
												field : 'title',
												title : '定位',
												width : '12%',
												align : 'center',
												templet : function(d) {
													if (menus.indexOf("SOS定位") > -1) {
														return '<img src="'
														+ projectName
														+ '/images/indexpage/dingwei.png" onclick="positionTo('
														+ "'"
														+ d.id
														+ "'"
														+ ')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="定位"/>';
													}else{
														return '<img src="'
														+ projectName
														+ '/images/indexpage/dingwei.png" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:not-allowed;" title="定位"/>';
													}
													
												}
											},{
												field : 'lock',
												title : '受理人',
												width : '17%',
												align : 'center',
												templet : function(d) {
													if(d.acceptor){
														var name = d.acceptor.split(",");
														return '<button type="button" style="background:none;border:0px;cursor:default">'+name[0]+'</button>'
													}else{
														return '<button class="'+d.id+'lock layui-btn layui-btn-xs layui-btn-radius" type="button" onclick="locked('
														+ "'"
														+ d.id
														+ "'"
														+ ')" style="margin-top:3px;background-color: #058563;border:0px;color:#fff;">&emsp;受理&emsp;</button>';
													}	
												}
											}] ],
											done: function (res, curr, count) {
									            $('.layui-table-header span').css('color','#038be9');
									            $('.layui-table-header span').css('font-weight','700');
									            $(".layui-table-view .layui-table").css("width","100%");
									            
									          //setInterval(queryList,30000);
									            
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

function locked(rowId) {
	var value = logName + ","+logMobile
	$.ajax({
	    url:localhostPath + projectName + '/sos/sosAccept', //请求的url地址
	    dataType:"json",   //返回格式为json
	    async:true,//请求是否异步，默认为异步，这也是ajax重要特性
	    data:{id:rowId,value:value},    //参数值
	    type:"POST",   //请求方式
	    beforeSend:function(){
	        //请求前的处理
	    },
	    success:function(req){
	    	$("[class^='"+rowId+"lock']").css({"color":"#666","cursor":"default","background":"none","margin-top":"0"});
	    	$("[class^='"+rowId+"lock']").attr("onclick", "");
	    	$("[class^='"+rowId+"lock']").removeClass("layui-btn layui-btn-xs layui-btn-radius");
	    	if(req.msg == "success"){
	    		$("[class^='"+rowId+"lock']").html(logName);
	    	}else{
	    		var name = req.msg.split(",");
	    		$("[class^='"+rowId+"lock']").html(name[0]);
	    		var msg = "该SOS已被 "+name[0]+" 受理！";
	    		top.layer.msg(msg);
	    	}
	    },
	    complete:function(){
	        //请求完成的处理
	    	
	    },
	    error:function(){
	        //请求出错处理
	    }
	});
}
function queryList() {
	
	thisTable.reload('layTable', {
		
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});

}

/**
 * sos定位
 */
function positionTo(rowId) {
	$.ajax({
		url : localhostPath + projectName + '/sos/sosDetail', // 请求的url地址
		dataType : "json", // 返回格式为json
		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
		data : {
			id : rowId,
		}, // 参数值
		type : "POST", // 请求方式
		beforeSend : function() {
			// 请求前的处理
		},
		success : function(req) {

			parent.locateToSos(req.rows[0]);
		},
		complete : function() {
			// 请求完成的处理
		},
		error : function() {
			// 请求出错处理
		}
	});
}

/**
 * 删除事件
 */
function delSOS(rowId) {
	layui.use('layer', function(){
        layer = layui.layer;
	layer.confirm('确定删除?', function(index) {
		// do something
		alert(localhostPath)
		$.ajax({
			url : localhostPath + projectName + '/sos/delSoS', // 请求的url地址
			dataType : "json", // 返回格式为json
			async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
			data : {
				id : rowId,
			}, // 参数值
			type : "POST", // 请求方式
			beforeSend : function() {
				// 请求前的处理
			},
			success : function(req) {

				// 刷新页面

				// 请求成功时处理
				layer.msg(req.msg);
			},
			complete : function() {
				// 请求完成的处理
			},
			error : function() {
				// 请求出错处理
			}
		});
		layer.close(index);
	});
	});
}

/**
 * SOS详情查看
 */
function showDetail(rowId) {
	parent.showSOSDetail(rowId);	
}

function downloadExcel() {
	department = $("#department").val();
	personName = $("#personName").val();
	startTime = $("#startDatePicker").val();
	endTime = $("#endDatePicker").val();
	readState = $("#readState").val();
	projectType = $("#projectType").find("option:selected").text();
	 layui.use('layer', function(){
	        layer = layui.layer;
	        var indexExport = layer.load(0);
	    	$.ajax({
	    		url : localhostPath + projectName + '/sos/downSos',// 请求的url地址
	    		dataType : "json", // 返回格式为json
	    		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
	    		data : {
	    			'department' : department,
	    			'personName' : personName,
	    			'startTime' : startTime,
	    			'endTime' : endTime,
	    			'readState' : readState,
	    			'projectType' : projectType
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
	 });
	
}
