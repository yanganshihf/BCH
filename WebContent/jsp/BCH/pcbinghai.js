// 获取路径
var curWwwPath = window.document.location.href;
var pathname = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathname);
var localhostPath = curWwwPath.substring(0, pos);
// 获取项目名
var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
function pageInit(uuid) {
	$(window).resize(function(){
		$("#bhyd").setGridHeight($(window).height()-180);
		$("#bhyd").jqGrid("setGridWidth",$(window).width()-10);
	})
		$.ajax({
	        url: localhostPath +projectName+ "/pcbhdc/findById", //请求的url地址
	        dataType: "json", //返回格式为json
	        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
	        data: {
	          "uuid_tcd": uuid
	        }, //参数值
	        type: "POST", //请求方式
	        beforeSend: function(data,message) {
	    
	        },
	        //请求成功时处理
	        success: function(req) {
	        	var topsj=req.rows;
	        	for (var i = 0; i < topsj.length; i++) {
	        		console.log(topsj[i])
	        		$("#bhzb").val(topsj[i].bzd_Zblx);
	        		$("#bhxianmc").val(topsj[i].xian_Mc);
	        		$("#xiancode").val(topsj[i].xian);
	        		$("#xiangmc").val(topsj[i].xiang_Mc);
	        		$("#linfenlx").val(topsj[i].bzd_Lflx);
	        		$("#linfenmj").val(topsj[i].bzd_Lfmj);
	        		$("#bhsz").val(topsj[i].bzd_Zysz);
	        		$("#bhjd").val(topsj[i].bzd_Jd);
	        		$("#bhwd").val(topsj[i].bzd_Wd);
	        		$("#bhhb").val(topsj[i].bzd_Hb);
	        		$("#bhzm").val(topsj[i].bzd_Zmly);
	        		$("#bhsg").val(topsj[i].bzd_Pjsg);
	        		$("#bhmc").val(topsj[i].yhsw_Mc);	
	        		$("#bhybd").val(topsj[i].bzd_Ybd);
	        		$("#bhjs").val(topsj[i].bzd_Jzsznl);
	        		$("#bhlf").val(topsj[i].bzd_Lmzc);
	        	}
	        }
	      });
	// 踏查记录
	jQuery("#bhyd")
			.jqGrid(
					{
						url : localhostPath + projectName
								+ '/pcbhdc/findById',
						datatype : "json",
						postData : { // 传递查询参数到后台
							"uuid_tcd": uuid
						},
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						mtype : "post",
						width : "100%",
						height : 400,
						sortorder : "desc",
						autowidth : true,
						multiselect : true,
						pager : '#bhydpage',
						pgbuttons : true,// 是否显示翻页按钮
						forceFit : false,// 调整列宽度是否改变表格的宽度
						loadonce : false,// 只从服务器加载一次数据
						multiselect : true,// 是否可以多选
						viewrecords : true,// 是否在浏览导航栏显示记录总数
						recordpos : 'right',// 记录数的显示位置
						pginput : true,
						colNames : [ '标准地编号', '样方序号', '调查株树', '发病株树/<br/>受害株树', '感病株率/<br/>受害株率',
								'调查样枝梢数/<br/>调查叶片数', '出现被害状样枝<br/>梢树/受害叶片数', '枝梢受害率/叶子受害率', '发生程度(相对应的栏中打钩)<br/>轻&emsp;&emsp;&emsp;中&emsp;&emsp;&emsp;重', '备注(表明<br/>代表面积)',
								'编辑'],
						colModel : [
								{
									name : 'bzd_Bh',
									index : 'bzd_Bh',
									width : 40,
									sortable : false,
									editable : false
								},
								{
									name : 'yangf_Xh',
									index : 'yangf_Xh',
									width : 40,
									sortable : false,
									editable : false
								},
								{
									name : 'diaocha_Zs',
									index : 'diaocha_Zs',
									width : 50,
									sortable : false,
									editable : false
								},
								{
									name : 'shouhai_Zs',
									index : 'shouhai_Zs',
									width : 70,
									align : "right",
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
									name : 'diaocha_Ys',
									index : 'diaocha_Ys',
									width : 70,
									sortable : false,
									editable : false
								},
								{
									name : 'shouhai_Ys',
									index : 'shouhai_Ys',
									width : 90,
									sortable : false,
									editable : false
								},
								{
									name : 'shouhai_Yl',
									index : 'shouhai_Yl',
									width : 70,
									sortable : false,
									editable : false
								},
								{
									name : 'yhsw_Lb',
									index : 'yhsw_Lb',
									width : 100,
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
									name : 'note',
									index : 'note',
									width : 100,
									sortable : false,
									editable : false,
									formatter : editBH
								}],jsonReader : {
									root : "rows",
									records : "records",
									total : "total",
									repeatitems : false
								},
								gridComplete : function() {
									$("#bhyd").setGridHeight($(window).height()-180);
									$("#bhyd").jqGrid("setGridWidth",$(window).width()-10);
								},
					});
	function editBH(cellValue, rows, state){
		console.log(rows)
		return "<button class='btn btn-danger' onclick=\"editBingH(" + rows.rowId
				+ ")\">编辑</button>"
	}
}
function editBingH(rowId){
	var rowData=$("#bhyd").jqGrid("getRowData", rowId);
	layui.use('layer', function() {
		var layer = layui.layer;
		var $ = layui.jquery;
		layer.open({
			type:2,
			title:'林木虫害样地调查记录表',
			area : [ '650px', '500px' ],
			resize:false,
			content:'editBH.jsp',
			success : function(layero, index) {
				var body = layer.getChildFrame('body', index);
				window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
			}
		})
})	

}