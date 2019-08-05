// 获取路径
var curWwwPath = window.document.location.href;
var pathname = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathname);
var localhostPath = curWwwPath.substring(0, pos);
// 获取项目名
var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
function pageInit(uuid_Jyx) {
	console.log(uuid_Jyx)
	$.ajax({
        url: localhostPath +projectName+ "/jyx/findById", //请求的url地址
        dataType: "json", //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: {
			"uuid_jyx":uuid_Jyx
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
        		$("#jyxxmc").val(topsj[i].xian_Mc);
        		$("#jyxxcode").val(topsj[i].xian);
        		$("#jyxxiangmc").val(topsj[i].xiang_Mc);
        		$("#jyxxiangcode").val(topsj[i].xiang);
        		$("#jyxxb").val(topsj[i].xiao_Ban);
        		$("#jyxlflx").val(topsj[i].linfen_Lx);
        		$("#jyxlfmj").val(topsj[i].linfen_Mj);
        		$("#jyxzysz").val(topsj[i].zhuyao_Sz);
        		$("#jyxjd").val(topsj[i].jyx_Jd);
        		$("#jyxwd").val(topsj[i].jyx_Wd);
        		$("#jyxhb").val(topsj[i].jyx_Hb);
        		$("#jyxzmly").val(topsj[i].jyx_Zmly);
        		$("#jyxybd").val(topsj[i].jyx_Ybd);
        		
        	}
        }
      });
	// 踏查记录
	jQuery("#jyfyh")
			.jqGrid(
					{
						url : localhostPath + projectName
								+ '/jyx/findById',
						datatype : "json",
						postData : { // 传递查询参数到后台
							"uuid_jyx":uuid_Jyx
						},
						datatype : "json",
						mtype : "POST",
						autowidth : true,
						loadtext : "正在加载...",
						pager : "#jyfyhpage",// 翻页用的导航栏
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
						colNames : [ '有害生物种类', '拉丁学名', '发现时间', '传入地', '传入途径',
								'寄生植物', '寄生类型', '分布范围', '发生面积', '虫(鼠)口密度,<br/>感染指数','发生程度(相对应的栏中打钩)<br/>轻&emsp;&emsp;中&emsp;&emsp;重',
								'对当地经济,生态,社会影响','备注','编辑'],
						colModel : [
								{
									name : 'yhsw_lb',
									index : 'yhsw_lb',
									width : 40,
									sortable : false,
									editable : false
								},
								{
									name : 'lading_xm',
									index : 'lading_xm',
									width : 40,
									sortable : false,
									editable : false
								},
								{
									name : 'faxian_sj',
									index : 'faxian_sj',
									width : 50,
									sortable : false,
									editable : false
								},
								{
									name : 'chuanru_d',
									index : 'chuanru_d',
									width : 70,
									align : "right",
									sortable : false,
									editable : false
								},
								{
									name : 'chuanru_tj',
									index : 'chuanru_tj',
									width : 70,
									align : "right",
									sortable : false,
									editable : false
								},
								{
									name : 'jzzw_mc',
									index : 'jzzw_mc',
									width : 70,
									sortable : false,
									editable : false
								},
								{
									name : 'jzzw_lx',
									index : 'jzzw_lx',
									width : 90,
									sortable : false,
									editable : false
								},
								{
									name : 'fenbu_fw',
									index : 'fenbu_fw',
									width : 70,
									sortable : false,
									editable : false
								},
								{
									name : 'fasheng_mj',
									index : 'fasheng_mj',
									width : 100,
									sortable : false,
									editable : false
								},
								{
									name : 'ganbing_zs',
									index : 'ganbing_zs',
									width : 70,
									sortable : false,
									editable : false
								},
								{
									name : 'weihai_cd',
									index : 'weihai_cd',
									width : 120,
									sortable : false,
									editable : false
								},
								{
									name : 'yingxiang',
									index : 'yingxiang',
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
									name : 'weihai_Bw',
									index : 'weihai_Bw',
									width : 70,
									sortable : false,
									editable : false,
									formatter:editJyx
								}],
					});
	function editJyx(cellValue, rows, state){
		return "<button class='btn btn-danger' onclick=\"editOJyx(" + rows.rowId
				+ ")\">编辑</button>"
}
}
function editOJyx(rowId){
	var rowData=$("#jyfyh").jqGrid("getRowData", rowId);
	layui.use('layer', function() {
		var layer = layui.layer;
		var $ = layui.jquery;
		layer.open({
			type:2,
			title:'检疫性有害生物样地调查记录表编辑',
			area : [ '650px', '450px' ],
			resize:true,
			content:'editOpJyx.jsp',
			success : function(layero, index) {
				var body = layer.getChildFrame('body', index);
				window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
			}
		})
})	
}