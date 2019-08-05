// 获取路径
var curWwwPath = window.document.location.href;
var pathname = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathname);
var localhostPath = curWwwPath.substring(0, pos);
// 获取项目名
var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
function pageInit(uuid) {
	$(window).resize(function(){
		$("#shyd").setGridHeight($(window).height()-180);
		$("#shyd").jqGrid("setGridWidth",$(window).width()-10);
	})
	$.ajax({
	        url: localhostPath +projectName+ "/pcshdc/findById", //请求的url地址
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
	        		$("#shxianmc").val(topsj[i].xian_Mc);
	        		$("#shxcode").val(topsj[i].xian);
	        		$("#shxzmc").val(topsj[i].xiang_Mc);
	        		$("#shxzcode").val(topsj[i].xiang);
	        		$("#shlflx").val(topsj[i].bzd_Lflx);
	        		$("#shlflmj").val(topsj[i].bzd_Lfmj);
	        		$("#shzysz").val(topsj[i].bzd_Zysz);
	        		$("#shjd").val(topsj[i].bzd_Jd);
	        		$("#shwd").val(topsj[i].bzd_Wd);
	        		$("#shhb").val(topsj[i].bzd_Hb);
	        		$("#shzmly").val(topsj[i].bzd_Zmly);
	        		$("#shzblx").val(topsj[i].bzd_Zblx);
	        		$("#shpjsg").val(topsj[i].bzd_Pjsg);
	        		$("#shswmc").val(topsj[i].yhsw_Mc);
	        		$("#shybd").val(topsj[i].bzd_Ybd);
	        		$("#shjsnl").val(topsj[i].bzd_Jzsznl);
	        		$("#shlfzc").val(topsj[i].bzd_Lmzc);
	        	}
	        }
	      });
	// 踏查记录
	jQuery("#shyd")
			.jqGrid(
					{
						url : localhostPath + projectName
								+ '/pcshdc/findById',
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
						pager : '#shydpage',
						pgbuttons : true,// 是否显示翻页按钮
						forceFit : false,// 调整列宽度是否改变表格的宽度
						loadonce : false,// 只从服务器加载一次数据
						multiselect : true,// 是否可以多选
						viewrecords : true,// 是否在浏览导航栏显示记录总数
						recordpos : 'right',// 记录数的显示位置
						pginput : true,
						datatype : "json",
						colNames : [
								'标准地编号',
								'土丘数(个)',
								'有效洞口(个)',
								'实捕鼠数(只)<br/>计&emsp;&emsp;&emsp;雌&emsp;&emsp;&emsp;雄',
								'土丘系数',
								'捕捉率(%)',
								'鼠密度(只/公顷)',
								'调查株树',
								'受害株树',
								'受害株率(%)',
								'死亡株树',
								'死亡株率(%)',
								'轻',
								'中',
								'重',
								'备注(表明代表面积)',
								'编辑' ],
						colModel : [ {
							name : 'bzd_Bh',
							index : 'bzd_Bh',
							width : 40,
							sortable : false,
							editable : false
						}, {
							name : 'tuqiu_Gs',
							index : 'tuqiu_Gs',
							width : 40,
							sortable : false,
							editable : false
						}, {
							name : 'youxiao_Dk',
							index : 'youxiao_Dk',
							width : 50,
							sortable : false,
							editable : false
						}, {
							name : 'bushu_Hj',
							index : 'bushu_Hj',
							width : 100,
							align : "right",
							sortable : false,
							editable : false
						}, {
							name : 'tuqiu_Xs',
							index : 'tuqiu_Xs',
							width : 40,
							align : "right",
							sortable : false,
							editable : false
						}, {
							name : 'bushujia_S',
							index : 'bushujia_S',
							width : 40,
							sortable : false,
							editable : false
						}, {
							name : 'shu_Mi_Du',
							index : 'shu_Mi_Du',
							width : 50,
							sortable : false,
							editable : false
						}, {
							name : 'diaocha_Zs',
							index : 'diaocha_Zs',
							width : 50,
							sortable : false,
							editable : false
						}, {
							name : 'shouhai_Zs',
							index : 'shouhai_Zs',
							width : 50,
							sortable : false,
							editable : false
						}, {
							name : 'shouhai_Zl',
							index : 'shouhai_Zl',
							width : 50,
							sortable : false,
							editable : false
						}, {
							name : 'siwang_Zs',
							index : 'siwang_Zs',
							width : 50,
							sortable : false,
							editable : false
						} , {
							name : 'siwang_Zl',
							index : 'siwang_Zl',
							width : 50,
							sortable : false,
							editable : false
						}, {
							name : 'weihai_Cd',
							index : 'weihai_Cd',
							width : 40,
							sortable : false,
							editable : false
						}, {
							name : 'weihai_Cd2',
							index : 'weihai_Cd2',
							width : 40,
							sortable : false,
							editable : false
						}, {
							name : 'weihai_Cd3',
							index : 'weihai_Cd3',
							width : 40,
							sortable : false,
							editable : false
						}, {
							name : 'beizhu',
							index : 'beizhu',
							width : 70,
							sortable : false,
							editable : false
						}, {
							name : 'note',
							index : 'note',
							width : 100,
							sortable : false,
							editable : false,
							formatter : edtishuhai
						}],jsonReader : {
							root : "rows",
							records : "records",
							total : "total",
							repeatitems : false
						},
						gridComplete : function() {
							$("#shyd").setGridHeight($(window).height()-180);
							$("#shyd").jqGrid("setGridWidth",$(window).width()-10);
						},
					});
	function edtishuhai(cellValue, rows, state){
		console.log(rows)
		return "<button class='btn btn-danger' onclick=\"editopshu(" + rows.rowId
				+ ")\">编辑</button>"
	}
	 jQuery("#shyd").jqGrid('setGroupHeaders',{
		 useColSpanStyle: true, 
		 groupHeaders:[
			  {startColumnName: 'weihai_Cd', numberOfColumns: 3, titleText: '发生程度(相对应的栏中打钩)'},
			    ]  
	 });
}
	function editopshu(rowId){
		var rowData=$("#shyd").jqGrid("getRowData", rowId);
		console.log(rowData)
		layui.use('layer', function() {
			var layer = layui.layer;
			var $ = layui.jquery;
			layer.open({
				type:2,
				title:'林木地下鼠样地调查记录表编辑',
				area : [ '50%', '80%' ],
				resize:false,
				content:'editSH.jsp',
				success : function(layero, index) {
					var body = layer.getChildFrame('body', index);
					window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
				}
			})
	})	

}