// 获取路径
var curWwwPath = window.document.location.href;
var pathname = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathname);
var localhostPath = curWwwPath.substring(0, pos);
// 获取项目名
var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
function pageInit(uuid) {
	$(window).resize(function(){
		$("#lmbhyd").setGridHeight($(window).height()-180);
		$("#lmbhyd").jqGrid("setGridWidth",$(window).width()-10);
	})
	console.log(uuid)
			$.ajax({
		        url: localhostPath +projectName+ "/PCYHZWDC/findById", //请求的url地址
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
		        	console.log(req)
		        	var topsj=req.rows;
		        	for (var i = 0; i < topsj.length; i++) {
		        		console.log(topsj[i])
		        		$("#yhxmc").val(topsj[i].xian_Mc);
		        		$("#yhxcode").val(topsj[i].xian);
		        		$("#yhxzmc").val(topsj[i].xiang_Mc);
		        		$("#yhxzcode").val(topsj[i].xiang);
		        		$("#yhlflx").val(topsj[i].bzd_Lflx);
		        		//无查询字段
		        		$("#yhldmj").val(topsj[i].bzd_Lfmj);
		        		$("#yhzysz").val(topsj[i].bzd_Zysz);
		        		$("#yhjd").val(topsj[i].bzd_Jd);
		        		$("#yhwd").val(topsj[i].bzd_Wd);
		        		$("#yhhb").val(topsj[i].bzd_Hb);
		        		$("#yhzmly").val(topsj[i].bzd_Zmly);
		        		$("#yhzblx").val(topsj[i].bzd_Zblx);
		        		$("#yhpjsg").val(topsj[i].bzd_Pjsg);	
		        		$("#yhswmc").val(topsj[i].yhsw_Mc);
		        		$("#yhybd").val(topsj[i].bzd_Ybd);
		        		$("#yhjssl").val(topsj[i].bzd_Lmzc);
		        		$("#yhlfzc").val(topsj[i].bzd_Jzsznl);
		        	}
		        }
		      });
		console.log(uuid)	// 踏查记录
			jQuery("#lmbhyd").jqGrid(
					{

						url : localhostPath + projectName
								+ '/PCYHZWDC/findById',
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
						pager : '#lmbhydpage',
						pgbuttons : true,// 是否显示翻页按钮
						forceFit : false,// 调整列宽度是否改变表格的宽度
						loadonce : false,// 只从服务器加载一次数据
						multiselect : true,// 是否可以多选
						viewrecords : true,// 是否在浏览导航栏显示记录总数
						recordpos : 'right',// 记录数的显示位置
						pginput : true,
						datatype : "json",
						prmNames : {
							search : "search",
						},
						colNames : [
								'标准地编号',
								'样方序号',
								'调查株树',
								'受害株树',
								'受害株率(%)',
								'植物地上面部分/<br/>垂直投影面积',
								'样地面积',
								'盖率(%)',
								'发生程度(相对应的栏中打钩)<br/>轻&emsp;&emsp;&emsp;中&emsp;&emsp;&emsp;重',
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
							width : 50,
							sortable : false,
							editable : false
						}, {
							name : 'shouhai_Zs',
							index : 'shouhai_Zs',
							width : 70,
							align : "right",
							sortable : false,
							editable : false
						}, {
							name : 'shouhai_Zl',
							index : 'shouhai_Zl',
							width : 70,
							align : "right",
							sortable : false,
							editable : false
						}, {
							name : 'touying_Mj',
							index : 'touying_Mj',
							width : 70,
							sortable : false,
							editable : false
						}, {
							name : 'yangdi_Mj',
							index : 'yangdi_Mj',
							width : 90,
							sortable : false,
							editable : false
						}, {
							name : 'gaidu',
							index : 'gaidu',
							width : 70,
							sortable : false,
							editable : false
						}, {
							name : 'weihai_Cd',
							index : 'weihai_Cd',
							width : 100,
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
							formatter : editYouhia
							} ],jsonReader : {
							root : "rows",
							records : "records",
							total : "total",
							repeatitems : false
						},
						gridComplete : function() {
							$("#lmbhyd").setGridHeight($(window).height()-180);
							$("#lmbhyd").jqGrid("setGridWidth",$(window).width()-10);
						},
					});
		function editYouhia(cellValue, rows, state){
			console.log(rows)
			return "<button class='btn btn-danger' onclick=\"editYou(" + rows.rowId
					+ ")\">编辑</button>"
		}
}
   		function editYou(rowId){
   			var rowData=$("#lmbhyd").jqGrid("getRowData", rowId);
   			layui.use('layer', function() {
   				var layer = layui.layer;
   				var $ = layui.jquery;
   				layer.open({
   					type:2,
   					title:'林业有害植物样地调查表编辑',
   					area : [ '710px', '400px' ],
   					resize:true,
   					content:'editYH.jsp',
   					success : function(layero, index) {
   						var body = layer.getChildFrame('body', index);
   						window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
   					}
   				})
   		})	
}