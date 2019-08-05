// 获取路径
var curWwwPath = window.document.location.href;
var pathname = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathname);
var localhostPath = curWwwPath.substring(0, pos);
// 获取项目名
var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
function pageInit(uuid_Mp) {
	console.log(uuid_Mp)
	$.ajax({
        url: localhostPath +projectName+ "/mp/findById", //请求的url地址
        dataType: "json", //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: {
          'uuid_mp': uuid_Mp
        }, //参数值
        type: "POST", //请求方式
        beforeSend: function(data,message) {
        },
        //请求成功时处理
        success: function(req) {
        	console.log(req)
        	var topsj=req.rows;
        	for (var i = 0; i < topsj.length; i++) {
        		console.log(topsj[i])
        		$("#mpxmc").val(topsj[i].xian_Mc);
        		$("#mpxcode").val(topsj[i].xian);
        		$("#mpxiangmc").val(topsj[i].xiang_Mc);
        		$("#mpxiangcode").val(topsj[i].xiang);
        		$("#mpcsmc").val(topsj[i].miaopu_Mc);
        		$("#mpmj").val(topsj[i].miaopu_Mj);
        		$("#mpjd").val(topsj[i].miaopu_Jd);
        		$("#mpwd").val(topsj[i].miaopu_Wd);
        		$("#mphb").val(topsj[i].miaopu_Hb);
        	}
        }
      });
	// 踏查记录
	jQuery("#mpyh")
			.jqGrid(
					{
						url : localhostPath + projectName
								+ '/mp/findById',
						datatype : "json",
						postData : { // 传递查询参数到后台
							'uuid_mp':uuid_Mp
						},
						datatype : "json",
						mtype : "POST",
						autowidth : true,
						loadtext : "正在加载...",
						pager : "#mpyhpage",// 翻页用的导航栏
						forceFit : false,// 调整列宽度是否改变表格的宽度
						loadonce : false,// 只从服务器加载一次数据
						pgbuttons : true,// 是否显示翻页按钮
						multiselect : true,// 是否可以多选
						viewrecords : true,// 是否在浏览导航栏显示记录总数
						recordpos : 'right',// 记录数的显示位置
						rownumbers : true,// 是否显示行号
						pginput : true,// 跳转页面输入框
						// rowNum : 30,
						// rowList : [ 30, 60, 90 ],
						prmNames : {
							search : "search",
						},
						colNames : [ '有害生物种类', '寄生植物', '危害部位', '被害株率', '发生(危害)程度<br/>&emsp;&emsp;轻&emsp;&emsp;中&emsp;&emsp;重',
								'是否成灾', '备注', '编辑'],
						colModel : [
								{
									name : 'yhsw_Lb',
									index : 'yhsw_Lb',
									width : 40,
									sortable : false,
									editable : false
								},
								{
									name : 'jzzw_Mc',
									index : 'jzzw_Mc',
									width : 40,
									sortable : false,
									editable : false
								},
								{
									name : 'weihai_Bw',
									index : 'weihai_Bw',
									width : 50,
									sortable : false,
									editable : false
								},
								{
									name : 'shouhai_Zl',
									index : 'shouhai_Zl',
									width : 70,
									align : "right",
									sortable : false,
									editable : false
								},
								{
									name : 'weihai_Cd',
									index : 'weihai_Cd',
									width : 100,
									align : "right",
									sortable : false,
									editable : false
								},
								{
									name : 'chengzai',
									index : 'chengzai',
									width : 70,
									sortable : false,
									editable : false
								},
								{
									name : 'beizhu',
									index : 'beizhu',
									width : 90,
									sortable : false,
									editable : false
								},
								{
									name : 'mote',
									index : 'mote',
									width : 70,
									sortable : false,
									editable : false,
									formatter :opeditMp
								}],
					});
	function opeditMp(cellValue, rows, state){
		return "<button class='btn btn-danger' onclick=\"editMp(" + rows.rowId
				+ ")\">编辑</button>"
}
}
function editMp(rowId){
	var rowData=$("#mpyh").jqGrid("getRowData", rowId);
		layui.use('layer', function() {
			var layer = layui.layer;
			var $ = layui.jquery;
			layer.open({
				type:2,
				title:'苗圃(花圃)有害生物调查记录表编辑',
				area : [ '650px', '370px' ],
				resize:true,
				content:'editYH.jsp',
				success : function(layero, index) {
					var body = layer.getChildFrame('body', index);
					window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
				}
			})
	})	
}