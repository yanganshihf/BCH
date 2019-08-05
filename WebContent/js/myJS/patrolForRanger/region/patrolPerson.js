// 选中人员 cond
var personSelected = "";
// 选中电话
var mobileSelected = "";
var regionName = "";
var logUser = localStorage.getItem('cookie_logingUser');
var logMobile = localStorage.getItem('cookie_mobile');
var response;
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
var eachDepart;

window.onload = function () {
	// 设置部门
	// alert(cookie_department);
	// 获取单位
	var cookie_department= localStorage.getItem('cookie_department');
	cookie_department = cookie_department.substring(0,cookie_department.length-1);
	// 每个单位id-名称
	eachDepart =  cookie_department.split("&");
	for (var i = 0; i < eachDepart.length; i++) {
		var eachDep =  eachDepart[i].split("-");
		
		$("#department").append("<option value='"+eachDep[0]+"'>"+eachDep[1]+"<oprion>")
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
	//var father_width = $(window.parent.document).width();
	//var cond_height = $("#cond").height();
	// 初始化表单
	setTimeout(function(){
		personSelected = $("#personSelected").val();
		mobileSelected = $("#mobileSelected").val();
		regionName = $("#regionName").val();
		pageInit();
		
	}, 200);
	
};

$(window).resize(function() {});

//新建表单实例
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

	// 获取从查询参数
	var department = $("#department").val();
	// alert(department);
	var personName = $("#personName").val();
	var mobile = $("#mobile").val();
	
	layui.use(
			'table',
			function() {
				thisTable = layui.table;
				
				// 第一个实例
				thisTable.render({
							id : 'layTable',
							elem : '#jqgrid',
							height : 'full-93',
							limit : 30,
							limits : [ 30, 60, 90 ],
							url : localhostPath + projectName + '/person/queryPersons' // 数据接口
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
								personName : personName,
								mobile : mobile
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
										field : 'personName',
										title : '姓名',
										align : 'center',
										width : '15%'
									},
									{
										field : 'personSex',
										title : '性别',
										align : 'center',
										width : '15%',
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
										width : '25%'
									},
									{
										field : 'employDate',
										title : '聘用日期',
										align : 'center',
										width : '25%'
									},
									{
										field : 'title',
										title : '操作',
										align : 'center',
										width : '20%',
										templet : function(d) {
											//
											if (mobileSelected.indexOf(d.mobile) == -1) {
												return '<button type="button" class="'+d.mobile+'select" onclick="selectPerson('+"'"+d.personName+"'"+','+"'"+d.mobile+"'"
						                           + ')" style="background:none;border:0px;color:#058563;margin-right:10px">选中</button><button class="'+d.mobile+'disselect" type="button" '
						                           + 'style="margin-left:10px;background:none;border:0px;color:#ccc;cursor:not-allowed;">取消</button>';
											}else{
												return '<button type="button" class="'+d.mobile+'select" style="background:none;border:0px;color:#ccc;cursor:not-allowed;margin-right:10px">选中</button><button class="'+d.mobile+'disselect" type="button" onclick="disselectPerson('+"'"+d.personName+"'"+','+"'"+d.mobile+"'"
						                           + ')" style="margin-left:10px;background:none;border:0px;color:#058563;">取消</button>';
											}
										}
									}] ],
									done: function (res, curr, count) {
										response = res.rows;
										
										$('.layui-table-header th').css('background-color', '#E6E6E6');
							            $('.layui-table-header span').css('color','#058563');
							            $('.layui-table-header span').css('font-weight','700');
							            $('.layui-table th,.layui-table td').css('font-size','15px');
							            $('[id^="layui-table-page"]').css('text-align','center');
							            $(".layui-table-view .layui-table").css("width","100%");
							            
							            
							            $("#allSelect").on('click', function() {
							            	
							            	var i;
							            	for(i in response){
							            		var personName = response[i].personName;
							            		var mobile = response[i].mobile;
							            		selectPerson(personName,mobile);
							            	}
							            	$("#allSelect").css("display","none");
							            	$("#noSelect").css("display","");
							            });
							            
							            $("#noSelect").on('click', function() {
							            	//alert(res.rows[1].personName)
							            	var i;
							            	for(i in response){
							            		var personName = response[i].personName;
							            		var mobile = response[i].mobile;
							            		disselectPerson(personName,mobile);
							            	}
							            	$("#noSelect").css("display","none");
							            	$("#allSelect").css("display","");
							            });
							            
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
		// 获取从查询参数
		/*department = $("#department").val();
		personName = $("#personName").val();
		mobile = $("#mobile").val();
		
		thisTable.reload('layTable', {
			where : { 
				// 设定异步数据接口的额外参数，任意设
				'department' : department,
				'personName' : personName,
				'mobile' : mobile
				// …
			},
			page : {
				curr : 1
			// 重新从第 1 页开始
			}
		});*/
		pageInit();
	});
	
	/**
	 * 执行下发
	 */
	$("#push").on('click', function() {
		var id = $("#id").val();
		if(mobileSelected == null){
			mobileSelected = "";
		}
		$.ajax({
		    url:localhostPath + projectName + '/region/updateRegion',    //请求的url地址
		    dataType:"json",   //返回格式为json
		    async:false,//请求是否异步，默认为异步，这也是ajax重要特性
		    data:{
		    	'id' : id,
				'personSelected' : personSelected,
				'mobileSelected' : mobileSelected,
				'regionName' : regionName
		    },    //参数值
		    type:"POST",   //请求方式
		    beforeSend:function(){
		        //请求前的处理
		    },
		    success:function(req){
		    	close(id,personSelected,mobileSelected);
		    	top.layer.msg(req.msg);
		    },
		    complete:function(){
		        //请求完成的处理
		    },
		    error:function(){
		        //请求出错处理
		    }
		});
	});
}

/**
 * 选中人员
 */
function selectPerson(personName,mobile){
	//
	if (mobileSelected.indexOf(mobile) == -1) {
		personSelected = personSelected + personName + ";";
		mobileSelected = mobileSelected + mobile + ";";
	}
	$("[class='"+mobile+"select']").css({"color":"#CCC","cursor":"not-allowed"});
	$("[class='"+mobile+"disselect']").css({"color":"#058563","cursor":"pointer"});
	$("[class='"+mobile+"select']").attr("onclick", "");
	$("[class='"+mobile+"disselect']").attr("onclick", "disselectPerson('"+personName+"','"+mobile+"');");
	$("#personSelected").val(personSelected);
	$("#mobileSelected").val(mobileSelected);
}

/**
 * 取消人员
 */
function disselectPerson(personName,mobile){
	if (mobileSelected.indexOf(mobile) > -1) {
		personSelected = personSelected.replace(personName+";","");
		mobileSelected = mobileSelected.replace(mobile+";","");
	}
	$("[class='"+mobile+"disselect']").css({"color":"#CCC","cursor":"not-allowed"});
	$("[class='"+mobile+"select']").css({"color":"#058563","cursor":"pointer"});
	$("[class='"+mobile+"disselect']").attr("onclick", "");
	$("[class='"+mobile+"select']").attr("onclick", "selectPerson('"+personName+"','"+mobile+"');");
	$("#personSelected").val(personSelected);
	$("#mobileSelected").val(mobileSelected);
}