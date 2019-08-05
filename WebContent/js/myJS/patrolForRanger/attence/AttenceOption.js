var localhostPath;
// 获取项目名
var projectName;
var effecLastDate;
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

	var myDate = getNowFormatDate();
	$("#startDatePicker").val(myDate);
	$("#endDatePicker").val(myDate);

	// 初始化表单
	pageInit();

	// 页面加载完成之后执行
	// var childrenPageHeight = $('#AttenceOption',
	// window.parent.document).height();
	// var childrenPageWidth = $('#AttenceOption',
	// window.parent.document).width();

	// $("#jqgrid").setGridHeight(childrenPageHeight - 70);
	// $("#jqgrid").setGridWidth($("#gridCond").width());

});

$(window).resize(function() {

	// 页面加载完成之后执行
	/*
	 * var childrenPageHeight = $('#AttenceOption',
	 * window.parent.document).height(); var childrenPageWidth =
	 * $('#AttenceOption', window.parent.document).width();
	 * 
	 * $("#jqgrid").setGridHeight(childrenPageHeight - 70);
	 * $("#jqgrid").setGridWidth($("#gridCond").width());
	 */

});
// 新建表单实例
var tableIns;

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
	var personName = $("#personName").val();
	var startTime = $("#startDatePicker").val();
	var endTime = $("#endDatePicker").val();

	layui.use('table', function() {
		var thisTable2 = layui.table;

		// 第一个实例
		tableIns = thisTable2.render({
			id : 'layTable2',
			elem : '#jqgrid2',
			height : 'full-45',
			limit : 30,
			limits : [ 30, 60, 90 ],
			url : localhostPath + projectName + '/attence/changeRecords'// 数据接口
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
				'startTime' : startTime,
				'endTime' : endTime
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
				field : 'standardDay',
				title : '达标天数',
				align : 'center',
				width : '20%',
				/*templet: function(d){
					switch (d.isEffective) {
					case 1:
						return d.standardDay;
					default:
						return "<span style='text-decoration:line-through;'>"+d.standardDay+"<span>";
					}
			    }*/
			}, {
				field : 'isEffective',
				title : '是否生效',
				width : '20%',
				align : 'center',
				hide : true
			}, {
				field : 'effectiveDate',
				title : '生效日期',
				width : '20%',
				align : 'center',
				/*templet: function(d){
					var year = d.effectiveDate.substring(0,4);
					var month;
					if(d.effectiveDate.substring(5,6) == "0"){
						month = d.effectiveDate.substring(6,7);
					}else{
						month = d.effectiveDate.substring(5,7);
					}
					switch (d.isEffective) {
					case 1:
						return year+"年"+month+"月";
					default:
						return "<span style='text-decoration:line-through;'>"+year+"年"+month+"月<span>";
					}
			    }*/
			}, {
				field : 'effectiveness',
				title : '有效期',
				width : '20%',
				align : 'center',
				templet: function(d){
					var lastday;
					var dStr = d.effectiveDate//2010-03-11
					 var year = dStr.substring(0,4);     //年
		            var month= dStr.substring(5,7);     //月   
					if(effecLastDate){
						var lastyear = effecLastDate.substring(0,4);     //年
			            var lastmonth= effecLastDate.substring(5,7); 
			            if(lastyear == year){
			            	if(lastmonth == month || parseInt(lastmonth) == parseInt(month)+1){}
			            	else{
			            		month = lastmonth - 1;
			            	}
			            }else{
			            	if(parseInt(lastyear) == parseInt(year)+1){
			            		
			            		if(lastmonth == "01" && month == "12"){}
			            		else{
			            			year = lastyear;
			            			month = lastmonth - 1;
			            		}
			            	}else{
			            		year = lastyear;
		            			month = lastmonth - 1;
			            	}
			            }
					}
					var day = new Date(year, month, 0); //Wed Mar 31 00:00:00 UTC+0800 2010
		            var daysCount = day.getDate();
		            effecLastDate = d.effectiveDate;
		            
					switch (d.isEffective) {
					case 1:
						if(d.LAY_INDEX == 1){
							return dStr.substring(0,4)+"."+dStr.substring(5,7)+".01" + " - &emsp;&emsp;&emsp;&emsp;&emsp; ";
						}else{
							return dStr.substring(0,4)+"."+dStr.substring(5,7)+".01" + " - " + year+"."+month+"."+daysCount;
						}
					default:
						return "----";
					}				
			    }	
			},{
				field : 'id',
				title : 'id',
				hide : true,
				width : '20%'
			}, {
				field : 'managerName',
				title : '提交人',
				align : 'center',
				width : '20%'
			}, {
				field : 'configDate',
				title : '提交时间',
				width : '20%',
				align : 'center'
			}, {
				field : 'managerMobile',
				title : '电话',
				width : '25%',
				hide : true
			} ] ],
			done : function(res, curr, count) {
				$('.layui-table-header span').css('color', '#058563');
				$('.layui-table-header th').css('background-color', '#E6E6E6');
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
			thisTable2.resize('layTable2');
		});
	});

	/**
	 * 条件查询
	 */
	$("#submit").on('click', function() {
		queryByCond();
	});
}

function queryByCond() {
	// 获取从查询参数
	department = $("#department").val();
	personName = $("#personName").val();
	startTime = $("#startDatePicker").val();
	endTime = $("#endDatePicker").val();

	tableIns.reload({
		where : { // 设定异步数据接口的额外参数，任意设
			'department' : department,
			'personName' : personName,
			'startTime' : startTime,
			'endTime' : endTime
		// …
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});
}
/**
 * 设置考勤达标日期
 */
function setStandardDay() {
	layui.use('layer', function(){
        layer = layui.layer;
        layer.open({
    		type : 2,
    		resize : false,
    		title : '达标天数设定',
    		content : 'StandardDayConfig.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
    		btn : [ '确定', '取消' ],
    		area:['300px','175px'],
    		yes : function(index, layero) { // 成功后回调函数
    			// 按钮【按钮一】的回调
    			// 获取参数
    			var cookie_logingUser = localStorage.getItem('cookie_logingUser');
    			var cookie_mobile = localStorage.getItem('cookie_mobile');
    			var body = layer.getChildFrame('body', index);
    			var standardDay = body.find('#standardDay').val();
    			var pat=new RegExp("[#_%&'/\"\\,;:=!^]","i");
    			if(standardDay==''){		
    				layer.msg("规定出勤天数不能为空");
    			}else if(pat.test(standardDay)){
    				layer.msg("出勤天数只能是1-31间数字");
    			}else if(standardDay<1 || standardDay>31){		
    				layer.msg("出勤天数只能是1-31间数字");
    			}else{
    				standardDay = parseInt(standardDay);
        			// 插入数据库
        			$.ajax({
        				url : localhostPath + projectName + '/attence/setStandardDay', // 请求的url地址
        				dataType : "json", // 返回格式为json
        				async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
        				data : {
        					userName : cookie_logingUser, 
        					mobile : cookie_mobile,
        					standardDay : standardDay
        				}, // 参数值
        				type : "POST", // 请求方式
        				beforeSend : function() {
        					// 请求前的处理
        				},
        				success : function(req) {
        					layer.closeAll();
        					// 请求成功时处理

        					layer.msg(req.msg);
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

    		}
    	});
    });
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
