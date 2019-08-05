// 获取路径
var curWwwPath = window.document.location.href;
var pathname = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathname);
var localhostPath = curWwwPath.substring(0, pos);
// 获取项目名
var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
function pageInit(uuid_ycd) {
	console.log(uuid_ycd)
	$.ajax({
        url: localhostPath +projectName+ "/ycd/findById", //请求的url地址
        dataType: "json", //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: {
          "uuid_ycd": uuid_ycd
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
        		$("ycdxm").val(topsj[i].xian_Mc);
        		$("#ycdcode").val(topsj[i].xian);
        		$("#ycdxiangm").val(topsj[i].xiang_Mc);
        		$("#ycdxiangc").val(topsj[i].xiang);
        		$("#ycdxb").val(topsj[i].xiao_Ban);
        		$("#ycdlflx").val(topsj[i].linfen_Lx);
        		$("#ycdlfmj").val(topsj[i].linfen_Mj);
        		$("#ycdzysz").val(topsj[i].zhuyao_Sz);
        		$("#ycdjd").val(topsj[i].ycd_Jd);
        		$("#ycdwd").val(topsj[i].ycd_Wd);
        		$("#ycdhb").val(topsj[i].ycd_Hb);
        		$("#ycddcr").val(topsj[i].diaocha_Ry);
        		$("#ycddcsj").val(topsj[i].diaocha_Sj);	
        	}
        }
      });
	// 踏查记录
	jQuery("#youcd")
			.jqGrid(
					{
						url : localhostPath + projectName
								+ '/ycd/findById',
						datatype : "json",
						postData : {// 传递查询参数到后台
						"uuid_ycd":uuid_ycd
						},
						datatype : "json",
						mtype : "POST",
						autowidth : true,
						loadtext : "正在加载...",
						pager : "#youcdpage",// 翻页用的导航栏
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
						colNames : [ 'id','昆虫名称', '昆虫数量合计', '昆虫数量雌', '昆虫数量雄', '备注', '编辑'],
						colModel : [
								{
									name : 'uuid_ycd',
									index : 'uuid_ycd',
									width : 40,
									hidden:true,
									sortable : false,
									editable : false
								},{
									name : 'kunchong',
									index : 'kunchong',
									width : 40,
									sortable : false,
									editable : false
								},
								{
									name : 'shuliang_H',
									index : 'shuliang_H',
									width : 40,
									sortable : false,
									editable : false
								},
								{
									name : 'shuliang_C',
									index : 'shuliang_C',
									width : 50,
									sortable : false,
									editable : false
								},
								{
									name : 'shuliang_X',
									index : 'shuliang_X',
									width : 70,
									align : "right",
									sortable : false,
									editable : false
								},
								{
									name : 'bei_Zhu',
									index : 'bei_Zhu',
									width : 100,
									align : "right",
									sortable : false,
									editable : false
								},
								{
									name : 'bzd_Bh',
									index : 'bzd_Bh',
									width : 100,
									sortable : false,
									editable : false,
									formatter : opeditYcd
								}],
					});
	function opeditYcd(cellValue, rows, state){
		return "<button class='btn btn-danger' onclick=\"editYC(" + rows.rowId
				+ ")\">编辑</button>"
}
}
function editYC(rowId){
	var rowData=$("#youcd").jqGrid("getRowData", rowId);
		layui.use('layer', function() {
			var layer = layui.layer;
			var $ = layui.jquery;
			layer.open({
				type:2,
				title:'辅助调查(诱虫灯,引诱剂)调查记录表',
				area : [ '700px', '260px' ],
				resize:true,
				content:'editOpYc.jsp',
				success : function(layero, index) {
					var body = layer.getChildFrame('body', index);
					window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
				}
			})
	})	
}