// 获取路径
var curWwwPath = window.document.location.href;
var pathname = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathname);
var localhostPath = curWwwPath.substring(0, pos);
// 获取项目名
var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);

function pageInit(uuid_Zsgp) {
	console.log(uuid_Zsgp)
	$.ajax({
        url: localhostPath +projectName+ "/ZSGP/findById", //请求的url地址
        dataType: "json", //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: {
          "uuid_zsgp": uuid_Zsgp
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
        		$("#zsxm").val(topsj[i].xian_Mc);
        		$("#zsxcode").val(topsj[i].xian);
        		$("#zsxiangm").val(topsj[i].xiang_Mc);
        		$("#zsxiangcode").val(topsj[i].xiang);
        		$("#zscsmc").val(topsj[i].changs_Mc);
        		$("#zskc").val(topsj[i].ku_Cun);
        		$("#zscy").val(topsj[i].chouy_Sl);
        		$("#zsjd").val(topsj[i].changs_Jd);
        		$("#zswd").val(topsj[i].changs_Wd);
        		$("#zshb").val(topsj[i].changs_Hb);
        	}
        }
      });
	// 踏查记录
	jQuery("#zhongshiopen")
			.jqGrid(
					{
				url : localhostPath + projectName + '/ZSGP/findById',
				datatype : "json",
				postData : {
			          "uuid_zsgp": uuid_Zsgp
				},
				datatype : "json",
				mtype : "POST",
				autowidth : true,
				loadtext : "正在加载...",
				pager : "#zhonshiopenpage",// 翻页用的导航栏
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
						colNames : [ '有害生物种类', '寄生植物', '寄生类型', '危害数量', '代表数量', '发生危害程</br>轻度以下&emsp;&emsp;轻&emsp;&emsp;中&emsp;&emsp;重','备注','调查'],
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
									name : 'jzzw_Lx',
									index : 'jzzw_Lx',
									width : 50,
									sortable : false,
									editable : false
								},
								{
									name : 'weihai_Sl',
									index : 'weihai_Sl',
									width : 70,
									align : "right",
									sortable : false,
									editable : false
								},
								{
									name : 'tcd_Jd',
									index : 'tcd_Jd',
									width : 100,
									align : "right",
									sortable : false,
									editable : false
								},
								{
									name : 'weihai_Cd',
									index : 'weihai_Cd',
									width : 70,
									sortable : false,
									editable : false
								},
								{
									name : 'beizhu',
									index : 'beizhu',
									width : 70,
									sortable : false,
									editable : false
								},
								{
									name : 'note3',
									index : 'note3',
									width : 70,
									sortable : false,
									editable : false,
									formatter : opeditZs
								}],
					});
	function opeditZs(cellValue, rows, state){
		return "<button class='btn btn-danger' onclick=\"editZS(" + rows.rowId
				+ ")\">编辑</button>"
}
}
function editZS(rowId){
	var rowData=$("#zhongshiopen").jqGrid("getRowData", rowId);
	layui.use('layer', function() {
		var layer = layui.layer;
		var $ = layui.jquery;
		layer.open({
			type:2,
			title:'种实有害生物调查记录表编辑',
			area : [ '670px', '370px' ],
			resize:true,
			content:'editOpZs.jsp',
			success : function(layero, index) {
				var body = layer.getChildFrame('body', index);
				window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
			}
		})
})	
}