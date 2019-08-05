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
							url : localhostPath + projectName+ '/monitorVideo/queryCameras'// 数据接口
							,page : true // 开启分页
							,cols : [ [ // 表头
								{
									field : 'cameraName',
									title : '设备名称',
									width : '11%',
									align : 'center',
									
								},{
									field : 'cameraIndexCode',
									title : '视频编号',
									width : '13%',
									align : 'center',
								},{
									field : 'regionIndexCode',
									title : '设备地点',
									width : '13%',
									align : 'center',
									
								},{
									field : 'title',
									title : '坐标位置',
									width : '20%',
									align : 'center',
									templet : function(d) {
										return d.longitude+','+d.latitude
									},
								},{
									field : 'status',
									title : '状态',
									width : '8%',
									templet : function(d) {
											return '<img src="'
													+ projectName
													+ '/images/mark/16/Geye.png" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="状态"/>'
									},
									align : 'center'
								},{
									title : '直播',
									width : '8%',
									templet : function(d) {
											return '<img src="'+ projectName+ '/images/indexpage/delete.png" onclick="videoLive(\''+d.cameraIndexCode+'\')" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="详情"/>'
									},
									align : 'center'
								},{
									field : 'title',
									title : '定位',
									width : '8%',
									templet : function(d) {
											return '<img src="'+ projectName+ '/images/indexpage/dingwei.png" onclick="locationGoto('+d.longitude+','+d.latitude+');" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="定位"/>'
									},
									align : 'center'
								},{
									field : 'title',
									title : '回放',
									width : '8%',
									templet : function(d) {
											return '<img src="'
													+ projectName
													+ '/images/indexpage/delete.png" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="播放"/>'
									},
									align : 'center'
								},{
									field : 'title',
									title : '警报',
									width : '8%',
									templet : function(d) {
											return '<img src="'
													+ projectName
													+ '/images/indexpage/delete.png" style="width:16px;height:16px;margin:6px 10px 5px 5px;cursor:pointer;" title="警报"/>';	
									},
									align : 'center',
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
}
function locationGoto(lont,lat){
	layer.open({
		type : 2,
		title : '定位',
		area : [ '600px', '550px' ],
		content : 'location.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:											// // ['http://sentsin.com',										// 'no']
		success : function(layero, index) {
			var body = layer.getChildFrame('body', index);
			body.find("#width").val($(window).width()/2);
			body.find('#longitude').val(lont);
			body.find('#latitude').val(lat);
		}
	})
}
function queryList() {
	// 获取从查询参数
	var stationNum = $("#stationNum").val();

	thisTable.reload('layTable', {
		where : { // 设定异步数据接口的额外参数，任意设
			name : stationNum,
		},
		page : {
			curr : 1
		// 重新从第 1 页开始
		}
	});
}
function videoLive(cameraIndexCode){
	layer.open({
		type : 2,
		title : '直播',
		area : [ '600px', '550px' ],
		content : 'rtmpPlayer.html', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:											// // ['http://sentsin.com',										// 'no']
		success : function(layero, index) {
			var body = layer.getChildFrame('body', index);
		}
	})	
}
