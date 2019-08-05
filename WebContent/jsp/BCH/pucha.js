// 获取路径
var curWwwPath = window.document.location.href;
var pathname = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathname);
var localhostPath = curWwwPath.substring(0, pos);
// 获取项目名
var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
$(function() {
	pageInit();
	selectcx()      
});
$(window).resize(function(){
	$("#tcjl").setGridHeight($(window).height()-180);
	$("#tcjl").jqGrid("setGridWidth",$(window).width()-10);
	
	$("#youchong").setGridHeight($(window).height()-180);
	$("#youchong").jqGrid("setGridWidth",$(window).width()-10)
	;
	$("#zhongshi").setGridHeight($(window).height()-180);
	$("#zhongshi").jqGrid("setGridWidth",$(window).width()-10);
	
	$("#miaopu").setGridHeight($(window).height()-180);
	$("#miaopu").jqGrid("setGridWidth",$(window).width()-10);
	
	$("#jianyi").setGridHeight($(window).height()-180);
	$("#jianyi").jqGrid("setGridWidth",$(window).width()-10);
})
function pageInit() {
	// 踏查记录
	jQuery("#tcjl")
			.jqGrid(
					{
						url : localhostPath + projectName + '/pucha/queryList',
						datatype : "json",
						postData : { // 传递查询参数到后台
						},
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						mtype : "post",
						width : "100%",
						height : 400,
						sortorder : "desc",
						autowidth : true,
						multiselect : true,
						pager : '#tcjlpage',
						pgbuttons : true,// 是否显示翻页按钮
						forceFit : false,// 调整列宽度是否改变表格的宽度
						loadonce : false,// 只从服务器加载一次数据
						multiselect : true,// 是否可以多选
						viewrecords : true,// 是否在浏览导航栏显示记录总数
						recordpos : 'right',// 记录数的显示位置
						pginput : true,
						datatype : "json",
						colNames : [ '有害生物名称','县code','乡code','id', 'uuid','县', '乡', '路线编号', '踏查点<br/>名称',
								'经度', '纬度', '海拔', '林分组成', '有害生物<br/>种类',
								'寄生植物', '危害部位', '是否需要<br/>设置标准地', '标准地<br/>编号',
								'备注', '调查人', '调查时间', '编辑', '调查' ],
						colModel : [
								{
									name : 'yhsw_Mc',
									index : 'yhsw_Mc',
									hidden : true,
									width : 55,
									sortable : false,
									editable : false
								},{
									name : 'xian',
									index : 'xian',
									hidden : true,
									width : 55,
									sortable : false,
									editable : false
								},{
									name : 'xiang',
									index : 'xiang',
									hidden : true,
									width : 55,
									sortable : false,
									editable : false
								},{
									name : 'uuid_Tcd',
									index : 'uuid_Tcd',
									hidden : true,
									width : 55,
									sortable : false,
									editable : false
								},
								{
									name : 'uuid_Yx',
									index : 'uuid_Yx',
									hidden : true,
									width : 55,
									sortable : false,
									editable : false
								},
								{
									name : 'xian_Mc',
									index : 'xian_Mc',
									width : 55,
									sortable : false,
									editable : false
								},
								{
									name : 'xiang_Mc',
									index : 'xiang_Mc',
									width : 55,
									sortable : false,
									editable : false
								},
								{
									name : 'xianlu_Bh',
									index : 'xianlu_Bh',
									width : 70,
									sortable : false,
									editable : false
								},
								{
									name : 'tcd_Mc',
									index : 'tcd_Mc',
									width : 100,
									align : "right",
									sortable : false,
									editable : false
								},
								{
									name : 'tcd_Jd',
									index : 'tcd_Jd',
									width : 70,
									align : "right",
									sortable : false,
									editable : false
								},
								{
									name : 'tcd_Wd',
									index : 'tcd_Wd',
									width : 70,
									sortable : false,
									editable : false
								},
								{
									name : 'tcd_Hb',
									index : 'tcd_Hb',
									width : 70,
									sortable : false,
									editable : false
								},
								{
									name : 'tcd_Szzc',
									index : 'tcd_Szzc',
									width : 70,
									sortable : false,
									editable : false
								},
								{
									name : 'yhsw_Lb',
									index : 'yhsw_Lb',
									width : 70,
									sortable : false,
									editable : false
								},
								{
									name : 'jzzw_Mc',
									index : 'jzzw_Mc',
									width : 70,
									sortable : false,
									editable : false
								},
								{
									name : 'weihai_Bw',
									index : 'weihai_Bw',
									width : 70,
									sortable : false,
									editable : false
								},
								{
									name : 'tcd_Szbzd',
									index : 'tcd_Szbzd',
									width : 100,
									sortable : false,
									editable : false,
									formatter : function(cellValue, options,
											rowData) {
										var check = "<input type='checkbox' id='check1'>";
										return check;
									}
								},
								{
									name : 'bzd_Bh',
									index : 'bzd_Bh',
									width : 80,
									sortable : false,
									editable : false
								},
								{
									name : 'tcd_Bz',
									index : 'tcd_Bz',
									width : 70,
									sortable : false,
									editable : false
								},
								{
									name : 'diaocha_Ry',
									index : 'diaocha_Ry',
									width : 70,
									sortable : false,
									editable : false
								},
								{
									name : 'diaocha_Sj',
									index : 'diaocha_Sj',
									width : 70,
									sortable : false,
									editable : false
								},
								// 编辑
								{
									name : 'note',
									index : 'note',
									width : 70,
									edittype : "button",
									formatter : editpucha
								},
								// 调查
								{
									name : 'note',
									index : 'note',
									width : 70,
									sortable : false,
									editable : false,
									formatter : function(cellValue, options,
											rowData) {
										var btnstr = "<button class='btn btn-danger' onclick=\"tcdiaocha('"+rowData.yhsw_Lb+"','"+rowData.uuid_Tcd+"')\">调查</button>";
										console.log(rowData)
										return btnstr;
									}
								}],jsonReader : {
									root : "rows",
									records : "records",
									total : "total",
									repeatitems : false
								},
								gridComplete : function() {
									$("#tcjl").setGridHeight($(window).height()-180);
									$("#tcjl").jqGrid("setGridWidth",$(window).width()-10);
								},
								
					});

	function editpucha(cellValue, rows, state) {
		console.log(rows)
		return "<button class='btn btn-danger' onclick=\"edittacha(" + rows.rowId
				+ ")\">编辑</button>"
	}
	// 标准地查询
	jQuery("#huiqian").jqGrid(
			{
				datatype : "json",
				colNames : [ '县', '乡', '路线编号', '踏查点名称', '经度', '纬度', '海拔',
						'林分组成', '有害生物种类', '寄生植物', '危害部位', '是否需要设置标准地', '标准地编号',
						'备注', '调查人', '调查时间', '编辑', '调查' ],
				colModel : [ {
					name : 'id',
					index : 'id',
					width : 55,
					sortable : false
				}, {
					name : 'invdate',
					index : 'invdate',
					width : 55
				}, {
					name : 'name',
					index : 'name asc, invdate',
					width : 55
				}, {
					name : 'amount',
					index : 'amount',
					width : 70,
					align : "right"
				}, {
					name : 'tax',
					index : 'tax',
					width : 70,
					align : "right"
				}, {
					name : 'total',
					index : 'total',
					width : 100,
					align : "right"
				}, {
					name : 'note1',
					index : 'note',
					width : 100,
					sortable : false
				}, {
					name : 'note2',
					index : 'note',
					width : 60,
					sortable : false
				}, {
					name : 'note3',
					index : 'note',
					width : 60,
					sortable : false
				}, {
					name : 'note4',
					index : 'note',
					width : 100,
					sortable : false
				}, {
					name : 'note5',
					index : 'note',
					width : 100,
					sortable : false
				}, {
					name : 'note6',
					index : 'note',
					width : 80,
					sortable : false
				}, {
					name : 'note7',
					index : 'note',
					width : 70,
					sortable : false
				}, {
					name : 'note8',
					index : 'note',
					width : 80,
					sortable : false
				}, {
					name : 'note9',
					index : 'note',
					width : 70,
					sortable : false
				}, {
					name : 'note0',
					index : 'note',
					width : 70,
					sortable : false
				}, {
					name : 'note11',
					index : 'note',
					width : 70,
					sortable : false
				}, {
					name : 'note12',
					index : 'note',
					width : 70,
					sortable : false
				} ],
				datatype : "json",
				postData : { // 传递查询参数到后台
				},
				mtype : "POST",
				autowidth : true,
				loadtext : "正在加载...",
				pager : "#page",// 翻页用的导航栏
				forceFit : false,// 调整列宽度是否改变表格的宽度
				loadonce : false,// 只从服务器加载一次数据
				pgbuttons : true,// 是否显示翻页按钮
				multiselect : true,// 是否可以多选
				viewrecords : true,// 是否在浏览导航栏显示记录总数
				recordpos : 'right',// 记录数的显示位置
				rownumbers : true,// 是否显示行号
				pginput : true,// 跳转页面输入框
				rowNum : 30,
				rowList : [ 30, 60, 90 ],
				prmNames : {
					search : "search",
				},
			});

}
// 跟随窗口的改变而改变表格的大小(自适应窗体的宽度)
//工具条的单击事件
				function tcdiaocha(yhsw_Lb,uuid_Tcd){
					var uuid=uuid_Tcd;
					layui.use('layer', function() {
							var layer = layui.layer;
							var $ = layui.jquery;
								if (yhsw_Lb==null && yhsw_Lb=="") {
									alert("请设置该条数据的有害生物类别")
								}else{
								if(yhsw_Lb!=null && yhsw_Lb!="") {
									if (yhsw_Lb=="病害") {
										var index = layer.open({
											type : 2,
											title : '林木病害样地调查记录表',
											content : 'pcbinghai.jsp',
											area : [ '80%', '80%' ],
											resize:false,
											success : function(layero,index) {
												// 调查打开页面的时候将  UUID_TCD传入病害页面
												var body = layer.getChildFrame('body', index);
												window["layui-layer-iframe" + index].pageInit(uuid);//执行子页面方法(传参数)
											}
										});
										layer.full(index);
									}else if(yhsw_Lb=="鼠害"){
										var index2 = layer.open({
											type : 2,
											title:'林木地下鼠样地调查记录表',
											content:'pcshuhai.jsp',
											area : [ '80%', '80%' ],
											resize:false,
											success : function(layero,index) {
												// 调查打开页面的时候将  UUID_TCD传入鼠害页面
												var body = layer.getChildFrame('body', index);
												window["layui-layer-iframe" + index].pageInit(uuid);//执行子页面方法(传参数)
											}
										})
										layer.full(index2);
									}else if(yhsw_Lb=="虫害"){
										var index3 = layer.open({
											type:2,
											title:'林木虫害样地调查记录表',
											content:'pcchonghai.jsp',
											area : [ '80%', '80%' ],
											resize:false,
											success : function(layero,index) {
												// 调查打开页面的时候将  UUID_TCD传入虫害页面
												var body = layer.getChildFrame('body', index);
												window["layui-layer-iframe" + index].pageInit(uuid);//执行子页面方法(传参数)
											}
										})
										layer.full(index3);
									}else if(yhsw_Lb=="有害植物"){
										var index4 = layer.open({
											type:2,
											title:'林业有害植物样地调查表',
											content:'pcyouhai.jsp',
											area : [ '80%', '80%' ],
											resize:false,
											success : function(layero,index) {
												// 调查打开页面的时候将  UUID_TCD传入有害页面
												var body = layer.getChildFrame('body', index);
												window["layui-layer-iframe" + index].pageInit(uuid);//执行子页面方法(传参数)
											}
										})			
										layer.full(index4);
										}else{
											alert("该条记录的有害生物种类不在调查范围内!")
										}
								}
							}
					})
				}
				function  edittacha(rowId){
					var rowData=$("#tcjl").jqGrid("getRowData", rowId);
					layui.use(['layer','form'], function() {
						var layer = layui.layer;
						var $ = layui.jquery;
						form = layui.form;
						layer.open({
							type:2,
							title:'踏查记录编辑',
							area : [ '650px', '500px' ],
							resize:false,
							content:'editPc.jsp',
							success : function(layero, index) {
								form.render();
								var body = layer.getChildFrame('body', index);
								window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
							}
						})
						form.render();
				})			
				}
				//诱虫灯编辑
				function edityouchong(rowId){
					var rowData=$("#youchong").jqGrid("getRowData", rowId);
					console.log(rowData)
					layui.use(['layer','form'], function() {
						var layer = layui.layer;
						var $ = layui.jquery;
						var form=layui.form;
						layer.open({
							type:2,
							title:'诱虫灯&emsp;引诱剂调查编辑',
							area : [ '660px', '400px' ],
							resize:false,
							content:'editYc.jsp',
							success : function(layero, index) {
							form.render('select');
							var body = layer.getChildFrame('body', index);
							window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
							}
						})
				})	
				}
				//种实编辑
				function editzhongshi(rowId){
					var rowData=$("#zhongshi").jqGrid("getRowData", rowId);
					layui.use('layer', function() {
						var layer = layui.layer;
						var $ = layui.jquery;
						layer.open({
							type:2,
							title:'种实记录编辑',
							area : [ '660px', '360px' ],
							resize:false,
							content:'editZS.jsp',
							success : function(layero, index) {
								var body = layer.getChildFrame('body', index);
								window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
								}
						})
				})	
				}
				//苗圃编辑
				function editMiaoP(rowId){
					var rowData=$("#miaopu").jqGrid("getRowData", rowId);
					console.log(rowData);
					layui.use('layer', function() {
						var layer = layui.layer;
						var $ = layui.jquery;
						layer.open({
							type:2,
							title:'苗圃编辑',
							area : [ '660px', '380px' ],
							resize:true,
							content:'editMP.jsp',
							success : function(layero, index) {
								var body = layer.getChildFrame('body', index);
								window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
								}
						})
				})	
				}
				function editJYX(rowId){
					var rowData=$("#jianyi").jqGrid("getRowData", rowId);
					console.log(rowData)
					layui.use('layer', function() {
						var layer = layui.layer;
						var $ = layui.jquery;
						layer.open({
							type:2,
							title:'检疫性编辑',
							area : [ '660px', '460px' ],
							resize:false,
							content:'editJYX.jsp',
							success : function(layero, index) {
								var body = layer.getChildFrame('body', index);
								window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
								}
						})
				})	
				}
// 点击tab选项卡执行的函数
$("#bzddcb").click(function() {
})
$("#youchongdeng").click(function(){
	var shi = "";
	var xiang = "";
	var xian = "";
	var xiaoban = "";
	// 诱虫灯
	jQuery("#youchong")
	.jqGrid(
			{
				url : localhostPath + projectName + '/ycd/queryList',
				datatype : "json",
				postData : { // 传递查询参数到后台
					'shi' : shi,
					'xian' : xian,
					'xiang' : xiang,
					'xiaoban' : xiaoban
				},
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				mtype : "post",
				width : "100%",
				height : 400,
				sortorder : "desc",
				autowidth : true,
				multiselect : true,
				pager : '#youchongpage',
				pgbuttons : true,// 是否显示翻页按钮
				forceFit : false,// 调整列宽度是否改变表格的宽度
				loadonce : false,// 只从服务器加载一次数据
				multiselect : true,// 是否可以多选
				viewrecords : true,// 是否在浏览导航栏显示记录总数
				recordpos : 'right',// 记录数的显示位置
				pginput : true,
				datatype : "json",
				colNames : [ 'id', '导出id', '县', '乡', '诱虫灯(引诱剂)所在小班',
						'林分类型', '林地面积', '主要树种', '经度', '纬度',
						'海拔', '调查人', '调查时间','编辑', '调查' ],
				colModel : [

						{
							name : 'uuid_ycd',
							index : 'uuid_ycd',
							hidden : true,
							width : 80,
							sortable : false,
							editable : false
						},
						{
							name : 'uuid_Yx',
							index : 'uuid_Yx',
							hidden : true,
							width : 80,
							sortable : false,
							editable : false
						},
						{
							name : 'xian_Mc',
							index : 'xian_Mc',
							width : 90,
							sortable : false,
							editable : false
						},
						{
							name : 'xiang_Mc',
							index : 'xiang_Mc',
							width : 100,
							sortable : false,
							editable : false
						},
						{
							name : 'xiao_Ban',
							index : 'xiao_Ban',
							width : 140,
							sortable : false,
							editable : false
						},
						{
							name : 'linfen_Lx',
							index : 'linfen_Lx',
							width : 100,
							align : "right",
							sortable : false,
							editable : false
						},
						{
							name : 'linfen_Mj',
							index : 'linfen_Mj',
							width : 100,
							align : "right",
							sortable : false,
							editable : false
						},
						{
							name : 'zhuyao_Sz',
							index : 'zhuyao_Sz',
							width : 100,
							sortable : false,
							editable : false
						},
						{
							name : 'ycd_Jd',
							index : 'ycd_Jd',
							width : 100,
							sortable : false,
							editable : false
						},
						{
							name : 'ycd_Wd',
							index : 'ycd_Wd',
							width : 100,
							sortable : false,
							editable : false
						},
						{
							name : 'ycd_Hb',
							index : 'ycd_Hb',
							width : 100,
							sortable : false,
							editable : false
						},
						{
							name : 'diaocha_Ry',
							index : 'diaocha_Ry',
							width : 100,
							sortable : false,
							editable : false
						},
						{
							name : 'diaocha_Sj',
							index : 'diaocha_Sj',
							width : 70,
							sortable : false,
							editable : false
						},
						// 编辑
						{
							name : 'note',
							index : 'note',
							width : 70,
							edittype : "button",
							formatter : editycd
						},
						// 调查
						{
							name : 'note',
							index : 'note',
							width : 70,
							sortable : false,
							editable : false,
							formatter : function(cellValue, options,
									rowData) {
								var btnstr = "<button class='btn btn-danger' onclick='searchYCD(\""
										+ rowData.uuid_ycd
										+ "\",0)' >调查</button>";
								return btnstr;
							}
						} ],jsonReader : {
							root : "rows",
							records : "records",
							total : "total",
							repeatitems : false
						},
						gridComplete : function() {
							$("#youchong").setGridHeight($(window).height()-180);
							$("#youchong").jqGrid("setGridWidth",$(window).width()-10);
						},
						
			});
function editycd(cellValue, rows, state) {
return "<button class='btn btn-danger' onclick=\"edityouchong(" + rows.rowId
		+ ")\">编辑</button>"
}
$("#youchong").jqGrid("setGridHeight", 370);
})
function searchYCD(uuid_ycd){
		layui.use('layer', function() {
			var layer = layui.layer;
			var $ = layui.jquery;
			var mpindex=layer.open({
				type : 2,
				title :'辅助调查(诱虫灯,引诱剂)调查记录表',
				content : 'youcd.jsp',
				area : [ '80%', '80%' ],
				resize:false,
				success : function(layero,index) {
					// 调查打开页面的时候将  UUID_TCD传入病害页面
					var body = layer.getChildFrame('body', index);
					window["layui-layer-iframe" + index].pageInit(uuid_ycd);//执行子页面方法(传参数)
				}
			})
			layer.full(mpindex);
		})
		}
//种实
$("#zhongshigp").click(function(){
	// 种实 果品 花卉 木材
	jQuery("#zhongshi")
	.jqGrid(
			{
				url : localhostPath + projectName + '/ZSGP/queryList',
				datatype : "json",
				postData : { // 传递查询参数到后台
				},
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				mtype : "post",
				width : "100%",
				height : 400,
				sortorder : "desc",
				autowidth : true,
				multiselect : true,
				pager : '#zhongshipage',
				pgbuttons : true,// 是否显示翻页按钮
				forceFit : false,// 调整列宽度是否改变表格的宽度
				loadonce : false,// 只从服务器加载一次数据
				multiselect : true,// 是否可以多选
				viewrecords : true,// 是否在浏览导航栏显示记录总数
				recordpos : 'right',// 记录数的显示位置
				pginput : true,
				datatype : "json",
				colNames : ['导出id', '县', '乡', '场所名称',
						'库存(m³,件,张,kg,株等)', '抽样数量(m³,件,张,kg,株等)', '经度','纬度', '海拔', '调查人',
						'调查时间', '编辑', '调查'],
				colModel : [

						{
							name : 'uuid_Zsgp',
							index : 'uuid_Zsgp',
							hidden : true,
							width : 55,
							sortable : false,
							editable : false
						},
						{
							name : 'xian_Mc',
							index : 'xian_Mc',
							width : 90,
							sortable : false,
							editable : false
						},
						{
							name : 'xiang_Mc',
							index : 'xiang_Mc',
							width : 90,
							sortable : false,
							editable : false
						},
						{
							name : 'changs_Mc',
							index : 'changs_Mc',
							width : 100,
							sortable : false,
							editable : false
						},
						{
							name : 'ku_Cun',
							index : 'ku_Cun',
							width : 140,
							align : "right",
							sortable : false,
							editable : false
						},
						{
							name : 'chouy_Sl',
							index : 'chouy_Sl',
							width : 150,
							sortable : false,
							editable : false
						},
						{
							name : 'changs_Jd',
							index : 'changs_Jd',
							width : 100,
							sortable : false,
							editable : false
						},
						{
							name : 'changs_Wd',
							index : 'changs_Wd',
							width : 100,
							sortable : false,
							editable : false
						},
						{
							name : 'changs_Hb',
							index : 'changs_Hb',
							width : 100,
							sortable : false,
							editable : false
						},
						{
							name : 'diaocha_Ry',
							index : 'diaocha_Ry',
							width : 100,
							sortable : false,
							editable : false
						},
						{
							name : 'diaocha_Sj',
							index : 'diaocha_Sj',
							width : 120,
							sortable : false,
							editable : false
						},
						// 编辑
						{
							name : 'note',
							index : 'note',
							width : 70,
							edittype : "button",
							formatter : editzs
						},
						// 调查
						{
							name : 'note',
							index : 'note',
							width : 70,
							sortable : false,
							editable : false,
							formatter : function(cellValue, options,
									rowData) {
								var btnstr = "<button class='btn btn-danger' onclick='searchZS(\""
										+ rowData.uuid_Zsgp
										+ "\",0)' >调查</button>";
								console.log(rowData)
								return btnstr;
							}
						}],jsonReader : {
							root : "rows",
							records : "records",
							total : "total",
							repeatitems : false
						},
						gridComplete : function() {
							$("#zhongshi").setGridHeight($(window).height()-180);
							$("#zhongshi").jqGrid("setGridWidth",$(window).width()-10);
						},
			});
	function editzs(cellValue, rows, state) {
		return "<button class='btn btn-danger' onclick=\"editzhongshi(" + rows.rowId
				+ ")\">编辑</button>"
	}
})
function searchZS(uuid_Zsgp){
		layui.use('layer', function() {
			var layer = layui.layer;
			var $ = layui.jquery;
			var mpindex=layer.open({
				type : 2,
				title :'种实有害生物调查记录表',
				content : 'zhongs.jsp',
				area : [ '80%', '80%' ],
				resize:false,
				success : function(layero,index) {
					// 调查打开页面的时候将  UUID_TCD传入病害页面
					var body = layer.getChildFrame('body', index);
					window["layui-layer-iframe" + index].pageInit(uuid_Zsgp);//执行子页面方法(传参数)
				}
			})
			layer.full(mpindex);
		})
		}
// 苗圃
$("#miaopuhecha").click(
		function() {
			// 苗圃地
			jQuery("#miaopu").jqGrid(
					{
						url : localhostPath + projectName + '/mp/queryList',
						datatype : "json",
						postData : { // 传递查询参数到后台
						},
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						mtype : "post",
						width : "100%",
						height : 400,
						sortorder : "desc",
						autowidth : true,
						multiselect : true,
						pager : '#miaopupage',
						pgbuttons : true,// 是否显示翻页按钮
						forceFit : false,// 调整列宽度是否改变表格的宽度
						loadonce : false,// 只从服务器加载一次数据
						multiselect : true,// 是否可以多选
						viewrecords : true,// 是否在浏览导航栏显示记录总数
						recordpos : 'right',// 记录数的显示位置
						pginput : true,
						datatype : "json",
						datatype : "json",
						colNames : [ '县code','乡code','县', 'uuid','乡', '场所名称', '面积(亩)', '经度', '纬度',
								'海拔', '调查人', '调查时间', '编辑', '调查' ],
						colModel : [ 
						{
							name : 'xian',
							index : 'xian',
							width : 120,
							hidden:true,
							sortable : false
						},
						{
							name : 'xiang',
							index : 'xiang',
							width : 120,
							hidden:true,
							sortable : false
						},{
							name : 'xian_Mc',
							index : 'xian_Mc',
							width : 120,
							sortable : false
						},{
							name : 'uuid_Mp',
							index : 'uuid_Mp',
							hidden : true,
							width : 80,
							sortable : false
						}, {
							name : 'xiang_Mc',
							index : 'xiang_Mc',
							width : 120
						}, {
							name : 'miaopu_Mc',
							index : 'miaopu_Mc',
							width : 140
						}, {
							name : 'miaopu_Mj',
							index : 'miaopu_Mj',
							width : 110,
							align : "right"
						}, {
							name : 'miaopu_Jd',
							index : 'miaopu_Jd',
							width : 110,
							align : "right"
						}, {
							name : 'miaopu_Wd',
							index : 'miaopu_Wd',
							width : 110,
							align : "right"
						}, {
							name : 'miaopu_Hb',
							index : 'miaopu_Hb',
							width : 110,
							sortable : false
						}, {
							name : 'diaocha_Ry',
							index : 'diaocha_Ry',
							width : 121,
							sortable : false
						}, {
							name : 'diaocha_Sj',
							index : 'diaocha_Sj',
							width : 130,
							sortable : false
						}, {
							name : 'note',
							index : 'note',
							width : 100,
							sortable : false,
							editable : false,
							formatter : editMp
						}, {
							name : 'note',
							index : 'note',
							width : 70,
							sortable : false,
							editable : false,
							formatter : function(cellValue, options,
									rowData) {
								console.log(rowData)
								var btnstr = "<button class='btn btn-danger' onclick='mpdiaocha(\""
										+ rowData.uuid_Mp
										+ "\",0)' >调查</button>";
								console.log(rowData)
								return btnstr;
							}
						}, ],jsonReader : {
							root : "rows",
							records : "records",
							total : "total",
							repeatitems : false
						},
						gridComplete : function() {
							$("#miaopu").setGridHeight($(window).height()-180);
							$("#miaopu").jqGrid("setGridWidth",$(window).width()-10);
						},

					});
		})
		function editMp(cellValue, rows, state) {
		return "<button class='btn btn-danger' onclick=\"editMiaoP(" + rows.rowId
				+ ")\">编辑</button>"
	}
		//苗圃的调查
			function mpdiaocha(uuid_Mp) {
				console.log(uuid_Mp)
			layui.use('layer', function() {
				var layer = layui.layer;
				var $ = layui.jquery;
				var mpindex=layer.open({
					type : 2,
					title :'苗圃(花圃)有害生物调查记录表',
					content : 'miaopuyh.jsp',
					area : [ '80%', '80%' ],
					resize:false,
					success : function(layero,index) {
						// 调查打开页面的时候将  UUID_TCD传入病害页面
						var body = layer.getChildFrame('body', index);
						window["layui-layer-iframe" + index].pageInit(uuid_Mp);//执行子页面方法(传参数)
					}
				})
				layer.full(mpindex);
			})
			}
// 检疫性
$("#jianyixiang").click(
		function() {
			// 检疫性有害生物
			jQuery("#jianyi").jqGrid(
					{
						url : localhostPath + projectName + '/jyx/queryList',
						datatype : "json",
						postData : { // 传递查询参数到后台
						},
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						mtype : "post",
						width : "100%",
						height : 400,
						sortorder : "desc",
						autowidth : true,
						multiselect : true,
						pager : '#jianyipage',
						pgbuttons : true,// 是否显示翻页按钮
						forceFit : false,// 调整列宽度是否改变表格的宽度
						loadonce : false,// 只从服务器加载一次数据
						multiselect : true,// 是否可以多选
						viewrecords : true,// 是否在浏览导航栏显示记录总数
						recordpos : 'right',// 记录数的显示位置
						pginput : true,
						datatype : "json",
						colNames : [ '县code','乡code','县','uuid', '乡', '诱虫灯(引诱剂)所在小班(林班)', '林分类型',
								'主要树种', '经度', '纬度', '海拔', '树苗来源', '郁闭度',
								'有害生物种类', '备注', '调查人', '调查时间', '编辑', '调查' ],
						colModel : [ 
						{
							name : 'xian',
							index : 'xian',
							width : 70,
							hidden:true,
							sortable : false
						},{
							name : 'xiang',
							index : 'xiang',
							width : 70,
							hidden:true,
							sortable : false
						},{
							name : 'xian_Mc',
							index : 'xian_Mc',
							width : 70,
							sortable : false
						},{
							name : 'uuid_Jyx',
							index : 'uuid_Jyx',
							hidden : true,
							width : 80,
							sortable : false
						}, {
							name : 'xiang_Mc',
							index : 'xiang_Mc',
							width : 70
						}, {
							name : 'xiao_Ban',
							index : 'xiao_Ban',
							width : 170
						}, {
							name : 'linfen_Lx',
							index : 'linfen_Lx',
							width : 70,
							align : "right"
						}, {
							name : 'zhuyao_Sz',
							index : 'zhuyao_Sz',
							width : 70,
							align : "right"
						}, {
							name : 'jyx_Jd',
							index : 'jyx_Jd',
							width : 70,
							align : "right",
							sortable : false
						}, {
							name : 'jyx_Wd',
							index : 'jyx_Wd',
							width : 70,
							sortable : false
						}, {
							name : 'jyx_Hb',
							index : 'jyx_Hb',
							width : 70,
							sortable : false
						}, {
							name : 'jyx_Zmly',
							index : 'jyx_Zmly',
							width : 70,
							sortable : false
						}, {
							name : 'jyx_Ybd',
							index : 'jyx_Ybd',
							width : 70,
							sortable : false
						}, {
							name : 'yhsw_lb',
							index : 'yhsw_lb',
							width : 100,
							sortable : false
						}, {
							name : 'beizhu',
							index : 'beizhu',
							width : 60,
							sortable : false
						}, {
							name : 'diaocha_Ry',
							index : 'diaocha_Ry',
							width : 80,
							sortable : false
						}, {
							name : 'diaocha_Sj',
							index : 'diaocha_Sj',
							width : 70,
							sortable : false
						}, {
							name : 'note',
							index : 'note',
							width : 70,
							sortable : false,
							editable : false,
							formatter :editJian
						}, {
							name : 'note',
							index : 'note',
							width : 70,
							sortable : false,
							editable : false,
							formatter : function(cellValue, options,
									rowData) {
								console.log(rowData)
								var btnstr = "<button class='btn btn-danger' onclick='jyxdiaocha(\""
										+ rowData.uuid_Jyx
										+ "\",0)' >调查</button>";
								console.log(rowData)
								return btnstr;
							}
						} ],jsonReader : {
							root : "rows",
							records : "records",
							total : "total",
							repeatitems : false
						},
						gridComplete : function() {
							$("#jianyi").setGridHeight($(window).height()-180);
							$("#jianyi").jqGrid("setGridWidth",$(window).width()-10);
						},
					});
		})
		function editJian(cellValue, rows, state){
		return "<button class='btn btn-danger' onclick=\"editJYX(" + rows.rowId
				+ ")\">编辑</button>"
}
		//检疫性调查
			function jyxdiaocha(uuid_Jyx) {
			layui.use('layer', function() {
				var layer = layui.layer;
				var $ = layui.jquery;
				var mpindex=layer.open({
					type : 2,
					title :'检疫性有害生物样地调查记录表',
					content : 'jyxyouhai.jsp',
					area : [ '80%', '80%' ],
					resize:false,
					success : function(layero,index) {
						// 调查打开页面的时候将  UUID_TCD传入病害页面
						var body = layer.getChildFrame('body', index);
						window["layui-layer-iframe" + index].pageInit(uuid_Jyx);//执行子页面方法(传参数)
					}
				})
				layer.full(mpindex);
			})
			}
	
// 踏查表记录头部条件查询
$("#tc_search").click(function() {
	var tclxbh = $("#tclx_bh").val();
	var bzdbh = $("#bzd_bh").val();
	var shi = $("#tc_shi").val();
	var xian = $("#tc_xian").val();
	var xiang = $("#tc_xiang").val();
	var page = $('#tcjl').getGridParam('page');
	$("#tcjl").jqGrid('setGridParam', {
		url : localhostPath + projectName + '/pucha/queryList',
		datatype : 'json',
		postData : { // 传递查询参数到后台
			'xianlu_bh' : tclxbh,
			'shi' : shi,
			'xian' : xian,
			'xiang' : xiang
		},
		page : page
	// 重新载入
	}).trigger("reloadGrid");
})

// 诱虫灯头部查询
$("#ycd_search").click(function() {
	var ycdshi = $("#ycd_shi").val();
	var ycdxian = $("#ycd_xian").val();
	var ycdxiang = $("#ycd_xiang").val();
	var ycdxb = $("#ycdxb").val();
	var page = $('#youchong').getGridParam('page');
	$("#youchong").jqGrid('setGridParam', {
		url : localhostPath + projectName + '/ycd/queryList',
		datatype : 'json',
		postData : { // 传递查询参数到后台
			'shi' : ycdshi,
			'xian' : ycdxian,
			'xiang' : ycdxiang,
			'xiao_ban' : ycdxb
		},
		page : page
	// 重新载入
	}).trigger("reloadGrid");
})

// 种实头部查询
$("#zs_search").click(function() {
	var zsshi = $("#zs_shi").val();
	var zsxian = $("#zs_xian").val();
	var zsxiang = $("#zs_xiang").val();
	var zscsmc = $("#csmc").val();
	var page = $('#zhongshi').getGridParam('page');
	$("#zhongshi").jqGrid('setGridParam', {
		url : localhostPath + projectName + '/ZSGP/queryList',
		datatype : 'json',
		postData : { // 传递查询参数到后台
			'shi' : zsycdshi,
			'xian' : zsycdxian,
			'xiang' : zsycdxiang,
			'changs_mc' : zscsmc
		},
		page : page
	// 重新载入
	}).trigger("reloadGrid");
})

// 苗圃头部查询
$("#mp_search").click(function() {
	var mpshi = $("#mp_shi").val();
	var mpxian = $("#mp_xian").val();
	var mpxiang = $("#mp_xiang").val();
	var mpcs = $("#mp_csmc").val();
	var page = $('#miaopu').getGridParam('page');
	$("#miaopu").jqGrid('setGridParam', {
		url : localhostPath + projectName + '/mp/queryList',
		datatype : 'json',
		postData : { // 传递查询参数到后台
			'shi' : mpshi,
			'xian' : mpxian,
			'xiang':mpxiang,
			'miaopu_mc' : mpcs
		},
		page : page
	// 重新载入
	}).trigger("reloadGrid");
})
	//检疫性头部
	$("#jyxsearch").click(function() {
	var jyxshi = $("#jyx_shi").val();
	var jyxxian = $("#jyx_xian").val();
	var jyxxiang = $("#jyx_xiang").val();
	var jyxcs = $("#jyx_tclxbh").val();
	var jyxcs = $("#jyc_bzdbh").val();
	var page = $('#miaopu').getGridParam('page');
	$("#miaopu").jqGrid('setGridParam', {
		url : localhostPath + projectName + '/mp/queryList',
		datatype : 'json',
		postData : { // 传递查询参数到后台
			'shi' : jyxshi,
			'xian' : jyxxian,
			'xiang':jyxxiang,
			'miaopu_mc' : mpcs
		},
		page : page
	// 重新载入
	}).trigger("reloadGrid");
})
// 踏查记录表删除选中行
$("#tc_delete").click(function() {
	layui.use(['layer'],function(){
		var layer=layui.layer;
		var $ = layui.jquery;
		var id = $("#tcjl").jqGrid('getGridParam', 'selrow');
		if (id==null) {
			layer.msg("请至少选择一条删除的数据")
		}else{
		var rowData = $("#tcjl").jqGrid('getRowData', id);
		var uuid=rowData.uuid_Tcd;
		layer.confirm('您确定要删除该条记录吗？', {
			  btn: ['确定','取消'] //按钮
			}, function(){
			$.ajax({
				url : localhostPath + projectName + '/pucha/delete',
				type : "POST",
				datatype : "json",
				data : {
					'uuid_tcd' : uuid
				},
				success : function(message, tcdids) {
					console.log(tcdids)
					console.log(message)
					if (message.msg == "删除成功") {
						jQuery("#tcjl").trigger("reloadGrid");
						layer.msg("删除成功")
					}
				},
				error : function(message) {
					var msgObj = JSON.parse(message);
					if (message.msg == "删除失败") {
						layer.msg("删除失败请联系管理员")
					}
				}
			});
			}, function(){
				layer.close();
			});
		}
	})
})
// 诱虫灯删除选中行
$("#ycd_delete").click(function() {
	layui.use(['layer'],function(){
		var layer=layui.layer;
		var $ = layui.jquery;
		var id = $("#youchong").jqGrid('getGridParam', 'selrow');
		if (id==null) {
			layer.msg("请至少选择一条删除的数据")
		}else{
		var rowData = $("#youchong").jqGrid('getRowData', id);
		var delycd=rowData.uuid_ycd;
		console.log(delycd)
		layer.confirm('您确定要删除该条记录吗？', {
			  btn: ['确定','取消'] //按钮
			}, function(){
			$.ajax({
				url : localhostPath + projectName + '/ycd/delete',
				type : "POST",
				datatype : "json",
				data : {
					'uuiYcd' : delycd
				},
				success : function(message, tcdids) {
					console.log(tcdids)
					console.log(message)
					if (message.msg == "删除成功") {
						jQuery("#youchong").trigger("reloadGrid");
						layer.msg("删除成功")
					}
				},
				error : function(message) {
					var msgObj = JSON.parse(message);
					if (message.msg == "删除失败") {
						layer.msg("删除失败请联系管理员")
					}
				}
			});
			}, function(){
				layer.close();
			});
		}
	})
})
//种实的删除
$("#ddeletezhongshi").click(function() {
	layui.use(['layer'],function(){
		var layer=layui.layer;
		var $ = layui.jquery;
		var id = $("#zhongshi").jqGrid('getGridParam', 'selrow');
		if (id==null) {
			layer.msg("请至少选择一条删除的数据")
		}else{
		var rowData = $("#zhongshi").jqGrid('getRowData', id);
		var uuid=rowData.uuid_Zsgp;
		console.log(uuid)
		layer.confirm('您确定要删除该条记录吗？', {
			  btn: ['确定','取消'] //按钮
			}, function(){
			$.ajax({
				url : localhostPath + projectName + '/ZSGP/delete',
				type : "POST",
				datatype : "json",
				data : {
					'uuid' : uuid
				},
				success : function(message, tcdids) {
					console.log(tcdids)
					console.log(message)
					if (message.msg == "删除成功") {
						jQuery("#zhongshi").trigger("reloadGrid");
						layer.msg("删除成功")
					}
				},
				error : function(message) {
					if (message.msg == "删除失败") {
						layer.msg("删除失败请联系管理员")
					}
				}
			});
			}, function(){
				layer.close();
			});
		}
	})
})

//苗圃删除
$("#mp_delete").click(function() {
	layui.use(['layer'],function(){
		var layer=layui.layer;
		var $ = layui.jquery;
		var id = $("#miaopu").jqGrid('getGridParam', 'selrow');
		if (id==null) {
			layer.msg("请至少选择一条删除的数据")
		}else{
		var rowData = $("#miaopu").jqGrid('getRowData', id);
		var uuid=rowData.uuid_Mp;
		console.log(uuid)
		layer.confirm('您确定要删除该条记录吗？', {
			  btn: ['确定','取消'] //按钮
			}, function(){
			$.ajax({
				url : localhostPath + projectName + '/mp/delete',
				type : "POST",
				datatype : "json",
				data : {
					'uuid_mp' : uuid
				},
				success : function(message, tcdids) {
					console.log(tcdids)
					console.log(message)
					if (message.msg == "删除成功") {
						jQuery("#miaopu").trigger("reloadGrid");
						layer.msg("删除成功")
					}
				},
				error : function(message) {
					if (message.msg == "删除失败") {
						layer.msg("删除失败请联系管理员")
					}
				}
			});
			}, function(){
				layer.close();
			});
		}
	})
})
//检疫性删除
$("#jyx_del").click(function() {
	layui.use(['layer'],function(){
		var layer=layui.layer;
		var $ = layui.jquery;
		var id = $("#jianyi").jqGrid('getGridParam', 'selrow');
		if (id==null) {
			layer.msg("请至少选择一条删除的数据")
		}else{
		var rowData = $("#jianyi").jqGrid('getRowData', id);
		var uuid=rowData.uuid_Jyx;
		console.log(uuid)
		layer.confirm('您确定要删除该条记录吗？', {
			  btn: ['确定','取消'] //按钮
			}, function(){
			$.ajax({
				url : localhostPath + projectName + '/jyx/delete',
				type : "POST",
				datatype : "json",
				data : {
					'uuid_jyx' : uuid
				},
				success : function(message, tcdids) {
					console.log(tcdids)
					console.log(message)
					if (message.msg == "删除成功") {
						jQuery("#miaopu").trigger("reloadGrid");
						layer.msg("删除成功")
					}
				},
				error : function(message) {
					if (message.msg == "删除失败") {
						layer.msg("删除失败请联系管理员")
					}
				}
			});
			}, function(){
				layer.close();
			});
		}
	})
})


// 头部搜索下拉框
function selectcx() {
	$.ajax({
		url : localhostPath + projectName + '/chengzai/selectTop',
		type : 'POST',
		dataType : 'json',
		data : {},
		success : function(res) {
			var xingzheng = res.xingzheng;
			console.log(xingzheng);
			for (var i = 0; i < xingzheng.length; i++) {
				if (xingzheng[i].ji_Bie == "2") {
					$("#tc_shi").append(
							"<option value='"
									+ xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#ycd_shi").append(
							 "<option value='"
									+ xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#zs_shi").append(
							 "<option value='"
									+ xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>")
					$("#mp_shi").append(
							 "<option value='"
									+ xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>")
					$("#jyx_shi").append(
							"<option value='"
									+ xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>")
				}
				if (xingzheng[i].ji_Bie == "3") {
					$("#tc_xian").append(
							"<option value='"
									+ xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#ycd_xian").append(
							"<option value='"
									+ xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#zs_xian").append(
							"<option value='"
									+ xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#mp_xian").append(
							 "<option value='"
									+ xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#jyx_xian").append(
							"<option value='"
									+ xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
				}
				if (xingzheng[i].ji_Bie == "4") {
					$("#tc_xiang").append(
						"<option value='"
									+ xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#ycd_xiang").append(
							"<option value='"
									+ xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#zs_xiang").append(
							"<option value='"
									+ xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#mp_xiang").append(
							 "<option value='"
									+ xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#jyx_xiang").append(
							"<option value='"
									+ xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
				}
			}

		}
	})
}