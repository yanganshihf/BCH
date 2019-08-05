// 获取路径
var curWwwPath = window.document.location.href;
var pathname = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathname);
var localhostPath = curWwwPath.substring(0, pos);
// 获取项目名
var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
function pageInit(uuid) {
	$(window).resize(function(){
		$("#chyd").setGridHeight($(window).height()-180);
		$("#chyd").jqGrid("setGridWidth",$(window).width()-10);
	})
			$.ajax({
	        url: localhostPath +projectName+ "/pcchdc/findById", //请求的url地址
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
	        		$("#chxm").val(topsj[i].xian_Mc);
	        		$("#chcode").val(topsj[i].xian);
	        		$("#chxiangmc").val(topsj[i].xiang_Mc);
	        		$("#chxiangcode").val(topsj[i].xiang);
	        		$("#ycdxb").val(topsj[i].bzd_Xb);
	        		$("#chlflx").val(topsj[i].bzd_Lflx);
	        		$("#chlflmj").val(topsj[i].bzd_Lfmj);
	        		$("#chlzysz").val(topsj[i].bzd_Zysz);
	        		$("#chjd").val(topsj[i].bzd_Jd);
	        		$("#chwd").val(topsj[i].bzd_Wd);
	        		$("#chhb").val(topsj[i].bzd_Hb);
	        		$("#chszly").val(topsj[i].bzd_Zmly);
	        		$("#chzblx").val(topsj[i].bzd_Zblx);
	        		$("#chpjsg").val(topsj[i].bzd_Pjsg);
	        		$("#chyhswmc").val(topsj[i].yhsw_Mc);
	        		$("#chybd").val(topsj[i].bzd_Ybd);
	        		$("#chzyjs").val(topsj[i].bzd_Jzsznl);
	        		$("#chlfzc").val(topsj[i].bzd_Lmzc);
	        	}
	        }
	      });
	// 踏查记录
	jQuery("#chyd")
			.jqGrid(
					{
						url : localhostPath + projectName
								+ '/pcchdc/findById',
						datatype : "json",
						postData : { // 传递查询参数到后台
						"uuid_tcd":uuid
						},
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						mtype : "post",
						width : "100%",
						height : 400,
						sortorder : "desc",
						autowidth : true,
						multiselect : true,
						pager : '#chydpage',
						pgbuttons : true,// 是否显示翻页按钮
						forceFit : false,// 调整列宽度是否改变表格的宽度
						loadonce : false,// 只从服务器加载一次数据
						multiselect : true,// 是否可以多选
						viewrecords : true,// 是否在浏览导航栏显示记录总数
						recordpos : 'right',// 记录数的显示位置
						pginput : true,
						colNames : [
								'标准地编号',
								'样方序号',
								'调查株树(调查样枝梢数,调<br/>查叶片数,调查种实数量)',
								'虫态或/<br/>危害期',
								'有虫株数(出现被害状样枝</br>梢数,受害叶片数,受害株树)',
								'有虫株率(枝梢受害率数,叶子受害率,</br>受害株率,条/50cm标准枝,被害种实)',
								'轻',
								'中',
								'重',
								'备注(表明<br/>代表面积)', '编辑' ],
						colModel : [ {
							name : 'bzd_Bh',
							index : 'bzd_Bh',
							width : 40,
							sortable : false,
							editable : false
						}, {
							name : 'yangf_Xh',
							index : 'yangf_Xh',
							width : 40,
							sortable : false,
							editable : false
						}, {
							name : 'diaocha_Zs',
							index : 'diaocha_Zs',
							width : 80,
							sortable : false,
							editable : false
						}, {
							name : 'chongtai',
							index : 'chongtai',
							width : 50,
							align : "right",
							sortable : false,
							editable : false
						}, {
							name : 'shouhai_Zs',
							index : 'shouhai_Zs',
							width : 90,
							align : "right",
							sortable : false,
							editable : false
						}, {
							name : 'shouhai_Zl',
							index : 'shouhai_Zl',
							width : 90,
							sortable : false,
							editable : false
						}, {
							name : 'weihai_Cd',
							index : 'weihai_Cd',
							width : 40,
							sortable : false,
							editable : false
						},{
							name : 'weihai_Cd1',
							index : 'weihai_Cd1',
							width : 40,
							sortable : false,
							editable : false
						},{
							name : 'weihai_Cd2',
							index : 'weihai_Cd2',
							width : 40,
							sortable : false,
							editable : false
						},{
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
							formatter : editCH
						}],jsonReader : {
							root : "rows",
							records : "records",
							total : "total",
							repeatitems : false
						},
						gridComplete : function() {
							$("#chyd").setGridHeight($(window).height()-180);
							$("#chyd").jqGrid("setGridWidth",$(window).width()-10);
						},
					});
	jQuery("#chyd").jqGrid('setGroupHeaders',{
		 useColSpanStyle: true, 
		 groupHeaders:[
			  {startColumnName: 'weihai_Cd', numberOfColumns: 3, titleText: '发生程度(相对应的栏中打钩)'},
			    ]  
	 });
	function editCH(cellValue, rows, state){
		console.log(rows)
		return "<button class='btn btn-danger' onclick=\"editChongH(" + rows.rowId
				+ ")\">编辑</button>"
	}
}
function editChongH(rowId){
	var rowData=$("#chyd").jqGrid("getRowData", rowId);
	layui.use('layer', function() {
		var layer = layui.layer;
		var $ = layui.jquery;
		layer.open({
			type:2,
			title:'林业虫害样地调查记录表编辑',
			area : [ '50%', '65%' ],
			resize:true,
			content:'editCH.jsp',
			success : function(layero, index) {
				var body = layer.getChildFrame('body', index);
				window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
			}
		})
})	
}