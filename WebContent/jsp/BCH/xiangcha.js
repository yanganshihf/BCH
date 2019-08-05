layui.use([ 'element', 'table' ], function() {
	var $ = layui.jquery, element = layui.element; // Tab的切换功能，切换事件监听等，需要依赖element模块
});
// 获取路径
var curWwwPath = window.document.location.href;
var pathname = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathname);
var localhostPath = curWwwPath.substring(0, pos);
// 获取项目名
var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
$(function() {
	/* 初始化方法 */
	pageInit();
	selectTop();
	$(window).resize(function() {
		$("#xiangcha").setGridWidth($(window).width() - 15);
		$("#xiangcha").setGridHeight($(window).height()-180);
		$("#binghai").setGridWidth($(window).width() - 25);
		$("#binghai").setGridHeight($(window).height()-220);
		$("#chonghai").setGridWidth($(window).width() - 20);
		$("#chonghai").setGridHeight($(window).height()-220);
		$("#shuhai").setGridWidth($(window).width() - 20);
		$("#shuhai").setGridHeight($(window).height()-240);
		$("#binghai1").setGridWidth($(window).width() - 20);
		$("#binghai1").setGridHeight($(window).height()-225);
		$("#chonghai2").setGridWidth($(window).width() - 25);
		$("#chonghai2").setGridHeight($(window).height() -225);
		$("#shuhai3").setGridWidth($(window).width() - 20);
		$("#shuhai3").setGridHeight($(window).height()-240);
		$("#fangzong").setGridWidth($(window).width() - 30);
		$("#fangzong").setGridHeight($(window).height()-190);
	});
});
function pageInit() {
	jQuery("#xiangcha")
			.jqGrid(
					{
						url : localhostPath + projectName
								+ '/xiangcha/queryList',
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						sortname : 'id',
						mtype : "post",
						width : "100%",
						height : 400,
						sortorder : "desc",
						autowidth : true,
						multiselect : true,
						pager : '#page1',
						pgbuttons : true,// 是否显示翻页按钮
						forceFit : false,// 调整列宽度是否改变表格的宽度
						loadonce : false,// 只从服务器加载一次数据
						multiselect : true,// 是否可以多选
						viewrecords : true,// 是否在浏览导航栏显示记录总数
						recordpos : 'right',// 记录数的显示位置
						pginput : true,
						datatype : "json",
						colNames : [ 'uuid_Bzd', '县', '乡', '村(林班)', '小班',
								'样地号', '防前<br>调查时间', '防后<br/>调查时间', '经度', '纬度','有害生物名称',
								'有害生物种类', '标准地<br/>面积', '样方数', '备注', '调查人',
								'编辑', '防前调查', '防后调查 ' ],
						colModel : [ {
							name : 'uuid_Bzd',
							index : 'uuid_Bzd',
							width : '55%',
							sortable : false,
							hidden : true,
							editable : true
						}, {
							name : 'xian_Mc',
							index : 'xian_Mc',
							width : '55%',
							sortable : false,
							editable : false,
							editable : true
						}, {
							name : 'xiang_Mc',
							index : 'xiang_Mc',
							width : 55,
							sortable : false,
							editable : true
						}, {
							name : 'cun',
							index : 'cun',
							width : 55,
							sortable : false,
							editable : true
						}, {
							name : 'xiao_Ban',
							index : 'xiao_Ban',
							width : 65,
							align : "right",
							sortable : false,
							editable : true
						}, {
							name : 'yangdi_H',
							index : 'yangdi_H',
							width : 65,
							align : "right",
							sortable : false,
							editable : true
						}, {
							name : 'dcsj_Fq',
							index : 'dcsj_Fq',
							width : 100,
							align : "right",
							sortable : false,
							editable : true
						}, {
							name : 'dcsj_Fh',
							index : 'dcsj_Fh',
							width : 100,
							sortable : false,
							editable : true
						}, {
							name : 'yangdi_Jd',
							index : 'yangdi_Jd',
							width : 60,
							sortable : false,
							editable : true
						}, {
							name : 'yangdi_Wd',
							index : 'yangdi_Wd',
							width : 60,
							sortable : false,
							editable : true
						}, {
							name : 'yhsw_Mc',
							index : 'yhsw_Mc',
							width : 100,
							sortable : false,
							editable : true,
							hidden : true
						}, {
							name : 'yhsw_Lb',
							index : 'yhsw_Lb',
							width : 100,
							sortable : false,
							editable : true
						}, {
							name : 'yangdi_Mj',
							index : 'yangdi_Mj',
							width : 95,
							sortable : false,
							editable : true
						}, {
							name : 'yangf_Sl',
							index : 'yangf_Sl',
							width : 80,
							sortable : false,
							editable : true
						}, {
							name : 'yangdi_Bz',
							index : 'yangdi_Bz',
							width : 65,
							sortable : false,
							editable : true
						}, {
							name : 'diaocha_Ry',
							index : 'diaocha_Ry',
							width : 80,
							sortable : false,
							editable : true
						}, {
							name : 'bianji',
							index : 'bianji',
							width : 65,
							sortable : false
						}, {
							name : 'diaochaqian',
							index : 'diaocha',
							width : 65,
							sortable : false
						}, {
							name : 'diaochahou',
							index : 'diaocha',
							width : 65,
							sortable : false
						} ],
						jsonReader : {
							root : "rows",
							records : "records",
							total : "total",
							repeatitems : false
						},
						gridComplete : function() {
							$("#xiangcha").setGridWidth($(window).width() - 20);
							$("#xiangcha").setGridHeight($(window).height()-180);
							var ids = $("#xiangcha").getDataIDs();
							// 遍历获取每行数据
							for (var i = 0; i < ids.length; i++) {
								// 点击根据id
								$("#xiangcha").setCell(
										ids[i],
										"bianji",
										"<button class='btn btn-danger'   onclick ='editxiangcha("
												+ ids[i] + ")'>编辑</ button>");
								$("#xiangcha")
										.setCell(
												ids[i],
												"diaochaqian",
												"<button class='btn btn-danger'  onclick ='defense("
														+ ids[i]
														+ ",0)'>防前 </ button>");
								$("#xiangcha").setCell(
										ids[i],
										"diaochahou",
										"<button class='btn btn-danger' onclick ='defense("
												+ ids[i] + ",1)'>防后</ button>");
							}
						},
					});
}
/* 编辑 */
function editxiangcha(id) {
	var rowData = $("#xiangcha").jqGrid("getRowData", id);// 根据上面的id获得本行的所有数据
	var uuid_bzd = rowData.uuid_Bzd; // 获得指定列的值 (cun 为colModel的name)
	var index = layer.open({
		type : 2,
		title : "标准地详查编辑",
		// 这里content是一个普通的String
		content : 'xiangchaEdit.jsp',
		fixed : false, // 不固定
		/* area : [ '50%', '90%' ], */
		area : [ '720px', '550px' ],
		success : function(layero, index) {
			// 设置弹窗中的默认属性，巧妙的地方在这里哦var index = layer
			var body = layer.getChildFrame('body', index);
			window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
		}
	});
}
function edit(id) {
	if (Title == "病害防前") {
		var rowData = $("#binghai").jqGrid("getRowData", id);// 根据上面的id获得本行的所有数据
		var uuid_bzd = rowData.uuid_Bzd; // 获得指定列的值 (cun 为colModel的name)
		var index = layer.open({
			type : 2,
			title : "标准地汇总(病害防前)编辑",
			// 这里content是一个普通的String
			content : 'bingEdit.jsp',
			area : [ '720px', '550px' ],
			fixed : false, // 不固定
			success : function(layero, index) {
				// 设置弹窗中的默认属性，巧妙的地方在这里哦var index = layer
				var body = layer.getChildFrame('body', index);
				window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
			}
		});
	}
	if (Title == "鼠害防前") {
		var rowData = $("#shuhai").jqGrid("getRowData", id);// 根据上面的id获得本行的所有数据
		var uuid_bzd = rowData.uuid_Bzd; // 获得指定列的值 (cun 为colModel的name)
		var index = layer.open({
			type : 2,
			title : "标准地汇总(鼠害防前)编辑",
			// 这里content是一个普通的String
			content : 'shuEdit.jsp',
			area : [ '720px', '550px' ],
			fixed : false, // 不固定
			success : function(layero, index) {
				// 设置弹窗中的默认属性，巧妙的地方在这里哦var index = layer
				var body = layer.getChildFrame('body', index);
				window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
			}
		});
	}
	if (Title == "虫害防前") {
		var rowData = $("#chonghai").jqGrid("getRowData", id);// 根据上面的id获得本行的所有数据
		var uuid_bzd = rowData.uuid_Bzd; // 获得指定列的值 (cun 为colModel的name)
		var index = layer.open({
			type : 2,
			title : "标准地汇总(虫害防前)编辑",
			// 这里content是一个普通的String
			content : 'chongEdit.jsp',
			area : [ '720px', '550px' ],
			fixed : false, // 不固定
			success : function(layero, index) {
				// 设置弹窗中的默认属性，巧妙的地方在这里哦var index = layer
				var body = layer.getChildFrame('body', index);
				window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
			}
		});
	}
	if (Title == "病害防后") {
		var rowData = $("#binghai1").jqGrid("getRowData", id);// 根据上面的id获得本行的所有数据
		var uuid_bzd = rowData.uuid_Bzd; // 获得指定列的值 (cun 为colModel的name)
		var index = layer.open({
			type : 2,
			title : "标准地汇总(病害防后)编辑",
			// 这里content是一个普通的String
			content : 'bingEdit.jsp',
			area : [ '720px', '550px' ],
			fixed : false, // 不固定
			success : function(layero, index) {
				// 设置弹窗中的默认属性，巧妙的地方在这里哦var index = layer
				var body = layer.getChildFrame('body', index);
				window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
			}
		});
	}
	if (Title == "鼠害防后") {
		var rowData = $("#shuhai3").jqGrid("getRowData", id);// 根据上面的id获得本行的所有数据
		var uuid_bzd = rowData.uuid_Bzd; // 获得指定列的值 (cun 为colModel的name)
		var index = layer.open({
			type : 2,
			title : "标准地汇总(鼠害防后)编辑",
			// 这里content是一个普通的String
			content : 'shuEdit.jsp',
			area : [ '720px', '550px' ],
			fixed : false, // 不固定
			success : function(layero, index) {
				// 设置弹窗中的默认属性，巧妙的地方在这里哦var index = layer
				var body = layer.getChildFrame('body', index);
				window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
			}
		});
	}
	if (Title == "虫害防后") {
		var rowData = $("#chonghai2").jqGrid("getRowData", id);// 根据上面的id获得本行的所有数据
		var uuid_bzd = rowData.uuid_Bzd; // 获得指定列的值 (cun 为colModel的name)
		var index = layer.open({
			type : 2,
			title : "标准地汇总(虫害防后)编辑",
			// 这里content是一个普通的String
			content : 'chongEdit.jsp',
			area : [ '720px', '550px' ],
			fixed : false, // 不固定
			success : function(layero, index) {
				// 设置弹窗中的默认属性，巧妙的地方在这里哦var index = layer
				var body = layer.getChildFrame('body', index);
				window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
			}
		});
	}
	if (Title == "防前防后调查") {
		var rowData = $("#fangzong").jqGrid("getRowData", id);// 根据上面的id获得本行的所有数据
		var uuid_bzd = rowData.uuid_Bzd; // 获得指定列的值 (cun 为colModel的name)
		var index = layer.open({
			type : 2,
			title : "标准地汇总编辑",
			// 这里content是一个普通的String
			content : 'fangzongEdit.jsp',
			area : [ '720px', '550px' ],
			fixed : false, // 不固定
			success : function(layero, index) {
				// 设置弹窗中的默认属性，巧妙的地方在这里哦var index = layer
				var body = layer.getChildFrame('body', index);
				window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
			}
		});
	}

}

/* 删除 */
function shanchu() {
	var id = $("#xiangcha").jqGrid('getGridParam', 'selrow');
	var rowData = $("#xiangcha").jqGrid('getRowData', id);
	var uuid_bzd = rowData.uuid_Bzd;
	$.ajax({
		url : localhostPath + projectName + '/xiangcha/delete',
		type : "POST",
		dataType : "json",
		data : {
			'uuid_bzd' : uuid_bzd
		},
		success : function(res) {
			if (res.msg == "删除成功") {
			layer.msg('删除成功', { icon: 1 });
				
			}
			jQuery("#xiangcha").trigger("reloadGrid");
		}
	})
}
/* 删除 */
var Title = "";
function del() {
	if (Title == "病害防前") {
		var id = $("#binghai").jqGrid('getGridParam', 'selrow');
		var rowData = $("#binghai").jqGrid('getRowData', id);
		var uuid = rowData.uuid;
		var url = localhostPath + projectName + '/bhfqhz/delete';
		$.ajax({
			url : url,
			type : "POST",
			dataType : "json",
			data : {
				'uuid' : uuid
			},
			success : function(res) {
				if (res.msg == "删除成功") {
					layer.msg('删除成功', { icon: 1 });
				}
				jQuery("#binghai").trigger("reloadGrid");
			}
		})
	}
	if (Title == "鼠害防前") {
		var id = $("#shuhai").jqGrid('getGridParam', 'selrow');
		var rowData = $("#shuhai").jqGrid('getRowData', id);
		var uuid = rowData.uuid;
		var url = localhostPath + projectName + '/shfqhz/delete';
		$.ajax({
			url : url,
			type : "POST",
			dataType : "json",
			data : {
				'uuid' : uuid
			},
			success : function(res) {
				if (res.msg == "删除成功") {
					layer.msg('删除成功', { icon: 1 });
				}
				jQuery("#shuhai").trigger("reloadGrid");
			}
		})
	}
	if (Title == "虫害防前") {
		var id = $("#chonghai").jqGrid('getGridParam', 'selrow');
		var rowData = $("#chonghai").jqGrid('getRowData', id);
		var uuid = rowData.uuid;
		var url = localhostPath + projectName + '/chfqhz/delete';
		$.ajax({
			url : url,
			type : "POST",
			dataType : "json",
			data : {
				'uuid' : uuid
			},
			success : function(res) {
				if (res.msg == "删除成功") {
					layer.msg('删除成功', { icon: 1 });
				}
				jQuery("#chonghai").trigger("reloadGrid");
			}
		})
	}
	if (Title == "病害防后") {
		var id = $("#binghai1").jqGrid('getGridParam', 'selrow');
		var rowData = $("#binghai1").jqGrid('getRowData', id);
		var uuid = rowData.uuid;
		var url = localhostPath + projectName + '/bhfhhz/delete';
		$.ajax({
			url : url,
			type : "POST",
			dataType : "json",
			data : {
				'uuid' : uuid
			},
			success : function(res) {
				if (res.msg == "删除成功") {
					layer.msg('删除成功', { icon: 1 });
				}
				jQuery("#binghai1").trigger("reloadGrid");
			}
		})
	}
	if (Title == "鼠害防后") {
		var id = $("#shuhai3").jqGrid('getGridParam', 'selrow');
		var rowData = $("#shuhai3").jqGrid('getRowData', id);
		var uuid = rowData.uuid;
		var url = localhostPath + projectName + '/shfhhz/delete';
		$.ajax({
			url : url,
			type : "POST",
			dataType : "json",
			data : {
				'uuid' : uuid
			},
			success : function(res) {
				if (res.msg == "删除成功") {
					layer.msg('删除成功', { icon: 1 });
				}
				jQuery("#shuhai3").trigger("reloadGrid");
			}
		})
	}
	if (Title == "虫害防后") {
		var id = $("#chonghai2").jqGrid('getGridParam', 'selrow');
		var rowData = $("#chonghai2").jqGrid('getRowData', id);
		var uuid = rowData.uuid;
		var url = localhostPath + projectName + '/chfhqhz/delete';
		$.ajax({
			url : url,
			type : "POST",
			dataType : "json",
			data : {
				'uuid' : uuid
			},
			success : function(res) {
				if (res.msg == "删除成功") {
					layer.msg('删除成功', { icon: 1 });
				}
				jQuery("#chonghai2").trigger("reloadGrid");
			}
		})
	}
	if (Title == "防前防后调查") {
		var id = $("#fangzong").jqGrid('getGridParam', 'selrow');
		var rowData = $("#fangzong").jqGrid('getRowData', id);
		var uuid = rowData.uuid_Bzd;
		var url = localhostPath + projectName + '/hqfhdc/delete';
	}
	$.ajax({
		url : url,
		type : "POST",
		dataType : "json",
		data : {
			'uuid_bzd' : uuid
		},
		success : function(res) {
			if (res.msg == "删除成功") {
				layer.msg('删除成功', { icon: 1 });
			}
			jQuery("#fangzong").trigger("reloadGrid");
		}
	})
}
/* 标准地详查条件查询 */
/* 条件查询 */
function select() {
	var shiVal = $('#shi option:selected').val();
	var xianVal = $('#xian option:selected').val();
	var zhenVal = $('#zhen option:selected').val();
	var yangDH = $("#yangdi").val();
	if (shiVal == "请选择--" && xianVal == "请选择--" && zhenVal == "请选择--") {
		layer.alert('请选择内容进行查询', {
		 icon: 2,
		 skin: 'layer-ext-moon' //该皮肤由layer.seaning.com友情扩展。关于皮肤的扩展规则，去这里查阅
		})
	}
	if (shiVal == "请选择--") {
		shiVal = "";
	}
	if (xianVal == "请选择--") {
		xianVal = "";
	}
	if (zhenVal == "请选择--") {
		zhenVal = "";
	}
	$("#xiangcha").jqGrid('setGridParam', {
		url : localhostPath + projectName + '/xiangcha/queryList',
		postData : {
			'shi' : shiVal,
			'xian' : xianVal,
			'xiang' : zhenVal,
			'yangdi_h' : yangDH
		}, // 发送数据 -携带参数
		page : 1
	}).trigger("reloadGrid"); // 重新载入

};
function selectAll() {
	var shiqianVal = $('#shiqian option:selected').val();
	var xianqianVal = $('#xianqian option:selected').val();
	var zhenqianVal = $('#zhenqian option:selected').val();
	var yangqianDH = $("#yangdiqian").val();

	var shihouVal = $('#shihou option:selected').val();
	var xianhouVal = $('#xianhou option:selected').val();
	var zhenhouVal = $('#zhenhou option:selected').val();
	var yanghouDH = $("#yangdihou").val();

	var shiallVal = $('#shizong option:selected').val();
	var xianallVal = $('#xianzong option:selected').val();
	var zhenallVal = $('#zhenzong option:selected').val();
	var yangallDH = $("#yangdizong").val();
	if (Title == "病害防前") {
		if (shiqianVal == "请选择--" && xianqianVal == "请选择--" && zhenqianVal == "请选择--") {
			layer.alert('请选择内容进行查询', {
				 icon: 2,
				 skin: 'layer-ext-moon' //该皮肤由layer.seaning.com友情扩展。关于皮肤的扩展规则，去这里查阅
			})
		}
		if (shiqianVal == "请选择--") {
			shiqianVal = "";
		}
		if (xianqianVal == "请选择--") {
			xianqianVal = "";
		}
		if (zhenqianVal == "请选择--") {
			zhenqianVal = "";
		}
		var url = localhostPath + projectName + '/bhfqhz/queryList';
		$("#binghai").jqGrid('setGridParam', {
			url : url,
			postData : {
				'shi' : shiqianVal,
				'xian' : xianqianVal,
				'xiang' : zhenqianVal,
				'yangdi_h' : yangqianDH
			}, // 发送数据 -携带参数
			page : 1
		}).trigger("reloadGrid"); // 重新载入
	}
	if (Title == "虫害防前") {
		if (shiqianVal == "请选择--" && xianqianVal == "请选择--"
				&& zhenqianVal == "请选择--") {
			layer.alert('请选择内容进行查询', {
				 icon: 2,
				 skin: 'layer-ext-moon' //该皮肤由layer.seaning.com友情扩展。关于皮肤的扩展规则，去这里查阅
			})
		}
		if (shiqianVal == "请选择--") {
			shiqianVal = "";
		}
		if (xianqianVal == "请选择--") {
			xianqianVal = "";
		}
		if (zhenqianVal == "请选择--") {
			zhenqianVal = "";
		}
		var url = localhostPath + projectName + '/chfqhz/queryList';
		$("#chonghai").jqGrid('setGridParam', {
			url : url,
			postData : {
				'shi' : shiqianVal,
				'xian' : xianqianVal,
				'xiang' : zhenqianVal,
				'yangdi_h' : yangqianDH
			}, // 发送数据 -携带参数
			page : 1
		}).trigger("reloadGrid"); // 重新载入
	}
	if (Title == "鼠害防前") {
		if (shiqianVal == "请选择--" && xianqianVal == "请选择--"
				&& zhenqianVal == "请选择--") {
			layer.alert('请选择内容进行查询', {
				 icon: 2,
				 skin: 'layer-ext-moon' //该皮肤由layer.seaning.com友情扩展。关于皮肤的扩展规则，去这里查阅
				})
		}
		if (shiqianVal == "请选择--") {
			shiqianVal = "";
		}
		if (xianqianVal == "请选择--") {
			xianqianVal = "";
		}
		if (zhenqianVal == "请选择--") {
			zhenqianVal = "";
		}
		var url = localhostPath + projectName + '/shfqhz/queryList';
		$("#shuhai").jqGrid('setGridParam', {
			url : url,
			postData : {
				'shi' : shiqianVal,
				'xian' : xianqianVal,
				'xiang' : zhenqianVal,
				'yangdi_h' : yangqianDH
			}, // 发送数据 -携带参数
			page : 1
		}).trigger("reloadGrid"); // 重新载入
	}
	if (Title == "病害防后") {
		if (shihouVal == "请选择--" && xianhouVal == "请选择--"
				&& zhenhouVal == "请选择--") {
			layer.alert('请选择内容进行查询', {
				 icon: 2,
				 skin: 'layer-ext-moon' //该皮肤由layer.seaning.com友情扩展。关于皮肤的扩展规则，去这里查阅
				})
		}
		if (shihouVal == "请选择--") {
			shihouVal = "";
		}
		if (xianhouVal == "请选择--") {
			xianhouVal = "";
		}
		if (zhenhouVal == "请选择--") {
			zhenhouVal = "";
		}
		var url = localhostPath + projectName + '/bhfhhz/queryList';
		$("#binghai1").jqGrid('setGridParam', {
			url : url,
			postData : {
				'shi' : shihouVal,
				'xian' : xianhouVal,
				'xiang' : zhenhouVal,
				'yangdi_h' : yanghouDH
			}, // 发送数据 -携带参数
			page : 1
		}).trigger("reloadGrid"); // 重新载入
	}
	if (Title == "虫害防后") {
		if (shihouVal == "请选择--" && xianhouVal == "请选择--"
				&& zhenhouVal == "请选择--") {
			layer.alert('请选择内容进行查询', {
				 icon: 2,
				 skin: 'layer-ext-moon' //该皮肤由layer.seaning.com友情扩展。关于皮肤的扩展规则，去这里查阅
				})
		}
		if (shihouVal == "请选择--") {
			shihouVal = "";
		}
		if (xianhouVal == "请选择--") {
			xianhouVal = "";
		}
		if (zhenhouVal == "请选择--") {
			zhenhouVal = "";
		}
		var url = localhostPath + projectName + '/chfhqhz/queryList';
		$("#chonghai2").jqGrid('setGridParam', {
			url : url,
			postData : {
				'shi' : shihouVal,
				'xian' : xianhouVal,
				'xiang' : zhenhouVal,
				'yangdi_h' : yanghouDH
			}, // 发送数据 -携带参数
			page : 1
		}).trigger("reloadGrid"); // 重新载入
	}
	if (Title == "鼠害防后") {
		if (shihouVal == "请选择--" && xianhouVal == "请选择--"
				&& zhenhouVal == "请选择--") {
			layer.alert('请选择内容进行查询', {
				 icon: 2,
				 skin: 'layer-ext-moon' //该皮肤由layer.seaning.com友情扩展。关于皮肤的扩展规则，去这里查阅
				})
		}
		if (shihouVal == "请选择--") {
			shishouVal = "";
		}
		if (xianhouVal == "请选择--") {
			xianhouVal = "";
		}
		if (zhenhouVal == "请选择--") {
			zhenhouVal = "";
		}
		var url = localhostPath + projectName + '/shfhhz/queryList';
		$("#shuhai3").jqGrid('setGridParam', {
			url : url,
			postData : {
				'shi' : shihouVal,
				'xian' : xianhouVal,
				'xiang' : zhenhouVal,
				'yangdi_h' : yanghouDH
			}, // 发送数据 -携带参数
			page : 1
		}).trigger("reloadGrid"); // 重新载入
	}
	if (Title == "防前防后调查") {
		if (shiallVal == "请选择--" && xianallVal == "请选择--"
				&& zhenallVal == "请选择--") {
			layer.alert('请选择内容进行查询', {
				 icon: 2,
				 skin: 'layer-ext-moon' //该皮肤由layer.seaning.com友情扩展。关于皮肤的扩展规则，去这里查阅
				})
		}
		if (shiallVal == "请选择--") {
			shiallVal = "";
		}
		if (xianallVal == "请选择--") {
			xianallVal = "";
		}
		if (zhenallVal == "请选择--") {
			zhenallVal = "";
		}
		var url = localhostPath + projectName + '/hqfhdc/queryList';
		$("#fangzong").jqGrid('setGridParam', {
			url : url,
			postData : {
				'shi' : shiallVal,
				'xian' : xianallVal,
				'xiang' : zhenallVal,
				'yangdi_h' : yangallDH
			}, // 发送数据 -携带参数
			page : 1
		}).trigger("reloadGrid"); // 重新载入
	}
}

function huizongqian() {
	Title = "病害防前";
	/* 标准低汇总(防前)病害 */
	jQuery("#fqbzdhzExport").attr("title", "导出病害防前汇总报表");
	jQuery("#binghai").jqGrid(
			{
				url : localhostPath + projectName + '/bhfqhz/queryList',
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				sortname : 'id',
				mtype : "post",
				width : "100%",
				height : '355px',
				sortorder : "desc",
				autowidth : true,
				multiselect : true,
				pager : '#page2',
				pgbuttons : true,// 是否显示翻页按钮
				forceFit : false,// 调整列宽度是否改变表格的宽度
				loadonce : false,// 只从服务器加载一次数据
				multiselect : true,// 是否可以多选
				viewrecords : true,// 是否在浏览导航栏显示记录总数
				recordpos : 'right',// 记录数的显示位置
				pginput : true,// 跳转页面输入框
				datatype : "json",
				colNames : [ 'uuid_Bzd', 'id', '调查时间', '乡', '村(林班)', '小班',
						'经度', '纬度', '样株数(株、<br/>叶片)', '受害株数、百叶<br/>受害数(株、叶片)',
						'受害株数%<br/> 百叶受害率%', '树冠受害<br/>面积', '感病指数', '代表面积(亩)',
						'危害程度', '是否成灾', '编辑' ],
				colModel : [ {
					name : 'uuid_Bzd',
					index : 'uuid_Bzd',
					width : '55%',
					sortable : false,
					hidden : true
				}, {
					name : 'uuid',
					index : 'uuid',
					width : 85,
					sortable : false,
					hidden : true
				}, {
					name : 'diaocha_Sj',
					index : 'diaocha_Sj',
					width : 85,
					sortable : false
				}, {
					name : 'xiang_Mc',
					index : 'xiang_Mc',
					width : 70
				}, {
					name : 'cun',
					index : 'cun',
					width : 80
				}, {
					name : 'xiao_Ban',
					index : 'xiao_Ban',
					width : 70,
					align : "center"
				}, {
					name : 'yangdi_Jd',
					index : 'yangdi_Jd',
					width : 70,
					align : "center"
				}, {
					name : 'yangdi_Wd',
					index : 'yangdi_Wd',
					width : 70,
					align : "center"
				}, {
					name : 'diaocha_Zs',
					index : 'diaocha_Zs',
					width : 100,
					sortable : false
				}, {
					name : 'shouhai_Zs',
					index : 'shouhai_Zs',
					width : 120,
					sortable : false
				}, {
					name : 'note',
					index : 'note',
					width : 100,
					sortable : false
				}, {
					name : 'shug_Shmj',
					index : 'shug_Shmj',
					width : 80,
					sortable : false
				}, {
					name : 'ganbing_Zs',
					index : 'ganbing_Zs',
					width : 80,
					sortable : false
				}, {
					name : 'daibiao_Mj',
					index : 'daibiao_Mj',
					width : 80,
					sortable : false
				}, {
					name : 'weihai_Cd',
					index : 'weihai_Cd',
					width : 70,
					sortable : false
				}, {
					name : 'chengzai',
					index : 'chengzai',
					width : 70,
					sortable : false
				}, {
					name : 'bianji',
					index : 'bianji',
					width : 70,
					sortable : false
				} ],
				jsonReader : {
					root : "rows",
					records : "records",
					total : "total",
					repeatitems : false
				},
				gridComplete : function() {
					$("#binghai").setGridWidth($(window).width() - 25);
					$("#binghai").setGridHeight($(window).height()-220);
					var ids = $("#binghai").getDataIDs();
					// 遍历获取每行数据
					for (var i = 0; i < ids.length; i++) {
						// 点击根据id
						$("#binghai").setCell(
								ids[i],
								"bianji",
								"<button class='btn btn-danger'   onclick ='edit("
										+ ids[i] + ")'>编辑</ button>");
					}
				}
			});
}
function huizonghou() {
	Title = "病害防后";
	jQuery("#fhbzdhzExport").attr("title", "导出病害防后汇总报表");
	/* 标准低汇总(防后)病害 */
	jQuery("#binghai1").jqGrid(
			{
				url : localhostPath + projectName + '/bhfhhz/queryList',
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				sortname : 'id',
				mtype : "post",
				width : "100%",
				height : '355px',
				sortorder : "desc",
				autowidth : true,
				multiselect : true,
				pager : '#page7',
				pgbuttons : true,// 是否显示翻页按钮
				forceFit : false,// 调整列宽度是否改变表格的宽度
				loadonce : false,// 只从服务器加载一次数据
				multiselect : true,// 是否可以多选
				viewrecords : true,// 是否在浏览导航栏显示记录总数
				recordpos : 'right',// 记录数的显示位置
				pginput : true,// 跳转页面输入框
				datatype : "json",
				colNames : [ 'uuid_Bzd', 'id', '调查时间', '乡', '村(林班)', '小班',
						'经度', '纬度', '样株数(株、<br/>叶片)', '受害株数、百叶<br/>受害数(株、叶片)',
						'受害株数%<br/> 百叶受害率%', '树冠受害<br/>面积', '感病指数', '代表面积(亩)',
						'危害程度', '是否成灾', '编辑' ],
				colModel : [ {
					name : 'uuid_Bzd',
					index : 'uuid_Bzd',
					width : '55%',
					sortable : false,
					hidden : true
				}, {
					name : 'uuid',
					index : 'uuid',
					width : 85,
					sortable : false,
					hidden : true
				}, {
					name : 'diaocha_Sj',
					index : 'diaocha_Sj',
					width : 85,
					sortable : false
				}, {
					name : 'xiang_Mc',
					index : 'xiang_Mc',
					width : 70
				}, {
					name : 'cun',
					index : 'cun',
					width : 80
				}, {
					name : 'xiao_Ban',
					index : 'xiao_Ban',
					width : 70,
					align : "right"
				}, {
					name : 'yangdi_Jd',
					index : 'yangdi_Jd',
					width : 100,
					align : "right"
				}, {
					name : 'yangdi_Wd',
					index : 'yangdi_Wd',
					width : 100,
					align : "right"
				}, {
					name : 'diaocha_Zs',
					index : 'diaocha_Zs',
					width : 100,
					sortable : false
				}, {
					name : 'shouhai_Zs',
					index : 'shouhai_Zs',
					width : 120,
					sortable : false
				}, {
					name : 'note',
					index : 'note',
					width : 100,
					sortable : false
				}, {
					name : 'shug_Shmj',
					index : 'shug_Shmj',
					width : 80,
					sortable : false
				}, {
					name : 'ganbing_Zs',
					index : 'ganbing_Zs',
					width : 80,
					sortable : false
				}, {
					name : 'daibiao_Mj',
					index : 'daibiao_Mj',
					width : 80,
					sortable : false
				}, {
					name : 'weihai_Cd',
					index : 'weihai_Cd',
					width : 70,
					sortable : false
				}, {
					name : 'chengzai',
					index : 'chengzai',
					width : 70,
					sortable : false
				}, {
					name : 'bianji',
					index : 'bianji',
					width : 70,
					sortable : false
				} ],
				jsonReader : {
					root : "rows",
					records : "records",
					total : "total",
					repeatitems : false
				},
				gridComplete : function() {
					$("#binghai1").setGridWidth($(window).width() - 20);
					$("#binghai1").setGridHeight($(window).height()-225);
					var ids = $("#binghai1").getDataIDs();
					// 遍历获取每行数据
					for (var i = 0; i < ids.length; i++) {
						// 点击根据id
						$("#binghai1").setCell(
								ids[i],
								"bianji",
								"<button class='btn btn-danger'  onclick ='edit("
										+ ids[i] + ")'>编辑</ button>");
					}
				}
			});
}
function huizongall() {
	Title = "防前防后调查";
	jQuery("#fangzong").jqGrid(
			{
				url : localhostPath + projectName + '/fqfhdc/queryList',
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				sortname : 'id',
				mtype : "post",
				width : "100%",
				height : '400px',
				sortorder : "desc",
				autowidth : true,
				pager : '#page4',
				multiselect : true,
				pgbuttons : true,// 是否显示翻页按钮
				forceFit : false,// 调整列宽度是否改变表格的宽度
				loadonce : false,// 只从服务器加载一次数据
				multiselect : true,// 是否可以多选
				viewrecords : true,// 是否在浏览导航栏显示记录总数
				recordpos : 'right',// 记录数的显示位置
				pginput : true,// 跳转页面输入框
				datatype : "json",
				colNames : ['uuid_Bzd','序号','xian','地点', '样地号', '监测对象', '调查株数',
						"防前调查<br/>虫口密度感病株率", '调查时间', '调查株数',
						'防后调查<br/>虫口密度感病株率', '调查时间', '备注', '编辑' ],
				colModel : [ {
					name : 'uuid_Bzd',
					index : 'uuid_Bzd',
					width : '80%',
					sortable : false,
					hidden : true
				},
					{
					name : 'xu_Hao',
					index : 'xu_Hao',
					width : '80%',
					sortable : false
				}, 
				{
					name : 'xian',
					index : 'xian',
					width : '80%',
					sortable : false,
					hidden : true
				},
				{
					name : 'xian_Mc',
					index : 'xian_Mc',
					width : '80%',
					sortable : false
				}, {
					name : 'yangdi_H',
					index : 'yangdi_H',
					width : '80%',
					sortable : false
				}, {
					name : 'yhsw_Mc',
					index : 'yhsw_Mc',
					width : '80%',
					align : "center",
					sortable : false
				}, {
					name : 'zhushu_Fq',
					index : 'zhushu_Fq',
					width : '80%',
					align : "center",
					sortable : false
				}, {
					name : 'zhulv_Fq',
					index : 'zhulv_Fq',
					width : '170%',
					align : "center",
					sortable : false,
					hidden : false
				}, {
					name : 'dcsj_Fq',
					index : 'dcsj_Fq',
					width : '80%',
					sortable : false
				}, {
					name : 'zhushu_Fh',
					index : 'zhushu_Fh',
					width : '80%',
					sortable : false
				}, {
					name : 'zhulv_Fh',
					index : 'zhulv_Fh',
					width : '170%',
					sortable : false
				}, {
					name : 'dcsj_Fh',
					index : 'dcsj_Fh',
					width : '80%',
					sortable : false
				}, {
					name : 'bei_Zhu',
					index : 'bei_Zhu',
					width : '80%',
					sortable : false
				}, {
					name : 'bianji',
					index : 'bianji',
					width : '80%',
					sortable : false
				} ],
				jsonReader : {
					root : "rows",
					records : "records",
					total : "total",
					repeatitems : false
				},
				gridComplete : function() {
					$("#fangzong").setGridWidth($(window).width() - 30);
					$("#fangzong").setGridHeight($(window).height() - 190);
					var ids = $("#fangzong").getDataIDs();
					// 遍历获取每行数据
					for (var i = 0; i < ids.length; i++) {
						// 点击根据id
						$("#fangzong").setCell(
								ids[i],
								"bianji",
								"<button class='btn btn-danger' onclick ='edit("
										+ ids[i] + ")'>编辑</ button>");
					}
				}

			});
}
function chonghaiBefore() {
	Title = "虫害防前"
	/* 标准低汇总(防前虫害) */
	jQuery("#fqbzdhzExport").attr("title", "导出虫害防前汇总报表");
	jQuery("#chonghai").jqGrid(
			{
				url : localhostPath + projectName + '/chfqhz/queryList',
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				sortname : 'id',
				mtype : "post",
				width : "100%",
				height : '355px',
				viewrecords : true,
				sortorder : "desc",
				autowidth : true,
				multiselect : true,
				pager : '#page3',
				pgbuttons : true,// 是否显示翻页按钮
				forceFit : false,// 调整列宽度是否改变表格的宽度
				loadonce : false,// 只从服务器加载一次数据
				multiselect : true,// 是否可以多选
				viewrecords : true,// 是否在浏览导航栏显示记录总数
				recordpos : 'right',// 记录数的显示位置
				pginput : true,// 跳转页面输入框
				datatype : "json",
				colNames : [ 'uuid_Bzd', 'uuid', '调查时间', '乡', '村(林班)', '小班',
						'经度', '维度 ', '样株或枝梢树<br/>(株、个)', '受害株(枝梢)<br/>数(枝、个)',
						'虫口密度(头/株或<br/>单位长度、面积)', '受害株率%', '代表面积(亩)', '编辑' ],
				colModel : [ {
					name : 'uuid_Bzd',
					index : 'uuid_Bzd',
					width : 55,
					sortable : false,
					hidden : true
				}, {
					name : 'uuid',
					index : 'uuid',
					width : 63,
					sortable : false,
					hidden : true
				}, {
					name : 'diaocha_Sj',
					index : 'diaocha_Sj',
					width : 80
				}, {
					name : 'xiang',
					index : 'xiang',
					width : 70
				}, {
					name : 'cun',
					index : 'cun',
					width : 90,
					align : "right"
				}, {
					name : 'xiao_Ban',
					index : 'xiao_Ban',
					width : 70,
					align : "right"
				}, {
					name : 'yangdi_Jd',
					index : 'yangdi_Jd',
					width : 80,
					sortable : false
				}, {
					name : 'yangdi_Wd',
					index : 'yangdi_Wd',
					width : 80,
					sortable : false
				}, {
					name : 'diaocha_Zs',
					index : 'diaocha_Zs',
					width : 140,
					sortable : false
				}, {
					name : 'shouhai_Zs',
					index : 'shouhai_Zs',
					width : 160,
					sortable : false
				}, {
					name : 'chongk_Md',
					index : 'chongk_Md',
					width : 140,
					sortable : false
				}, {
					name : 'shouhai_Zl',
					index : 'shouhai_Zl',
					width : 90,
					sortable : false
				}, {
					name : 'daibiao_Mj',
					index : 'daibiao_Mj',
					width : 90,
					sortable : false
				}, {
					name : 'bianji',
					index : 'bianji',
					width : 80,
					sortable : false
				} ],
				jsonReader : {
					root : "rows",
					records : "records",
					total : "total",
					repeatitems : false
				},
				gridComplete : function() {
					$("#chonghai").setGridWidth($(window).width() - 20);
					$("#chonghai").setGridHeight($(window).height()-220);
					var ids = $("#chonghai").getDataIDs();
					// 遍历获取每行数据
					for (var i = 0; i < ids.length; i++) {
						// 点击根据id
						$("#chonghai").setCell(
								ids[i],
								"bianji",
								"<button class='btn btn-danger'  onclick ='edit("
										+ ids[i] + ")'>编辑</button>");
					}
				}
			});
}
function shuhaiBefore() {
	Title = "鼠害防前"
	jQuery("#fqbzdhzExport").attr("title", "导出鼠害防前汇总报表");
	/* 标准低鼠害(防前) */
	jQuery("#shuhai").jqGrid(
			{
				url : localhostPath + projectName + '/shfqhz/queryList',
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				sortname : 'id',
				mtype : "post",
				width : "100%",
				height : '355px',
				viewrecords : true,
				sortorder : "desc",
				autowidth : true,
				multiselect : true,
				pager : '#page4',
				pgbuttons : true,// 是否显示翻页按钮
				forceFit : false,// 调整列宽度是否改变表格的宽度
				loadonce : false,// 只从服务器加载一次数据
				multiselect : true,// 是否可以多选
				viewrecords : true,// 是否在浏览导航栏显示记录总数
				recordpos : 'right',// 记录数的显示位置
				pginput : true,// 跳转页面输入框
				datatype : "json",
				colNames : [ 'uuid_Bzd', 'id', '调查时间', '乡', '村(林班)', '小班',
						"经度", '纬度', '样方号', '调查总株数<br/>(株、个)',
						'受害或死亡株数<br/>(株、个)', '受害或死亡<br/>株率%', '有效洞口<br/>(个)',
						'鼠密度<br/>(只/公顷)', '新土丘<br/>树(个)', '土丘<br/>系数',
						'代表面<br/>积(亩)', '危害<br/>程度', '编辑' ],
				colModel : [ {
					name : 'uuid_Bzd',
					index : 'uuid_Bzd',
					width : '55%',
					sortable : false,
					hidden : true
				}, {
					name : 'uuid',
					index : 'uuid',
					width : 65,
					sortable : false,
					hidden : true
				}, {
					name : 'diaocha_Sj',
					index : 'diaocha_Sj',
					width : 65,
					sortable : false
				}, {
					name : 'xiang_Mc',
					index : 'xiang_Mc',
					width : 50,
					sortable : false
				}, {
					name : 'cun',
					index : 'cun',
					width : 50,
					sortable : false
				}, {
					name : 'xiao_Ban',
					index : 'xiao_Ban',
					width : 50,
					align : "right",
					sortable : false
				}, {
					name : 'yangdi_Jd',
					index : 'yangdi_Jd',
					width : 50,
					align : "right",
					sortable : false
				}, {
					name : 'yangdi_Wd',
					index : 'yangdi_Wd',
					width : 50,
					align : "right",
					sortable : false
				}, {
					name : 'yangf_H',
					index : 'yangf_H',
					width : 80,
					align : "right",
					sortable : false,
					hidden : false
				}, {
					name : 'diaocha_Zs',
					index : 'diaocha_Zs',
					width : 70,
					sortable : false
				}, {
					name : 'shouhai_Zs',
					index : 'shouhai_Zs',
					width : 90,
					sortable : false
				}, {
					name : 'shouhai_Zl',
					index : 'shouhai_Zl',
					width : 120,
					sortable : false
				}, {
					name : 'youxiao_Dk',
					index : 'youxiao_Dk',
					width : 80,
					sortable : false
				}, {
					name : 'shu_Mi_Du',
					index : 'shu_Mi_Du',
					width : 70,
					sortable : false
				}, {
					name : 'tuqiu_Gs',
					index : 'tuqiu_Gs',
					width : 70,
					sortable : false
				}, {
					name : 'tuqiu_Xs',
					index : 'tuqiu_Xs',
					width : 70,
					sortable : false
				}, {
					name : 'daibiao_Mj',
					index : 'daibiao_Mj',
					width : 70,
					sortable : false
				}, {
					name : 'weihai_Cd',
					index : 'weihai_Cd',
					width : 70,
					sortable : false
				}, {
					name : 'bianji',
					index : 'bianji',
					width : 70,
					sortable : false
				}, ],
				jsonReader : {
					root : "rows",
					records : "records",
					total : "total",
					repeatitems : false
				},
				gridComplete : function() {
					$("#shuhai").setGridWidth($(window).width() - 20);
					$("#shuhai").setGridHeight($(window).height()-240);
					var ids = $("#shuhai").getDataIDs();
					// 遍历获取每行数据
					for (var i = 0; i < ids.length; i++) {
						// 点击根据id
						$("#shuhai").setCell(
								ids[i],
								"bianji",
								"<button class='btn btn-danger' onclick ='edit("
										+ ids[i] + ")'>编辑</button>");
					}
				}
			});
}
function chonghaiLast() {
	Title = "虫害防后";
	jQuery("#fhbzdhzExport").attr("title", "导出虫害防后汇总报表");
	/* 标准低虫害（防后） */
	jQuery("#chonghai2").jqGrid(
			{
				url : localhostPath + projectName + '/chfhqhz/queryList',
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				sortname : 'id',
				mtype : "post",
				width : "100%",
				height : '355px',
				viewrecords : true,
				sortorder : "desc",
				autowidth : true,
				multiselect : true,
				pager : '#page8',
				pgbuttons : true,// 是否显示翻页按钮
				forceFit : false,// 调整列宽度是否改变表格的宽度
				loadonce : false,// 只从服务器加载一次数据
				multiselect : true,// 是否可以多选
				viewrecords : true,// 是否在浏览导航栏显示记录总数
				recordpos : 'right',// 记录数的显示位置
				pginput : true,// 跳转页面输入框
				datatype : "json",
				colNames : [ 'uuid_Bzd', 'id', '调查时间', '乡', '村(林班)', '小班',
						'经度', '纬度', '样株或枝梢树(株、个)', '受害株(枝梢)数(枝、个)',
						'虫口密度(头/株或单位长度、面积)', '受害株率%', '代表面积(亩)', '编辑' ],
				colModel : [ {
					name : 'uuid_Bzd',
					index : 'uuid_Bzd',
					width : 55,
					sortable : false,
					hidden : true
				}, {
					name : 'uuid',
					index : 'uuid',
					width : 63,
					sortable : false,
					hidden : true
				}, {
					name : 'diaocha_Sj',
					index : 'diaocha_Sj',
					width : 90
				}, {
					name : 'xiang',
					index : 'xiang',
					width : 85
				}, {
					name : 'cun',
					index : 'cun',
					width : 90,
					align : "right"
				}, {
					name : 'xiao_Ban',
					index : 'xiao_Ban',
					width : 90,
					align : "right"
				}, {
					name : 'yangdi_Jd',
					index : 'yangdi_Jd',
					width : 90,
					sortable : false
				}, {
					name : 'yangdi_Wd',
					index : 'yangdi_Wd',
					width : 90,
					sortable : false
				}, {
					name : 'diaocha_Zs',
					index : 'diaocha_Zs',
					width : 160,
					sortable : false
				}, {
					name : 'shouhai_Zs',
					index : 'shouhai_Zs',
					width : 160,
					sortable : false
				}, {
					name : 'chongk_Md',
					index : 'chongk_Md',
					width : 220,
					sortable : false
				}, {
					name : 'shouhai_Zl',
					index : 'shouhai_Zl',
					width : 90,
					sortable : false
				}, {
					name : 'daibiao_Mj',
					index : 'daibiao_Mj',
					width : 90,
					sortable : false
				}, {
					name : 'bianji',
					index : 'bianji',
					width : 80,
					sortable : false
				} ],
				jsonReader : {
					root : "rows",
					records : "records",
					total : "total",
					repeatitems : false
				},
				gridComplete : function() {
					$("#chonghai2").setGridWidth($(window).width() - 25);
					$("#chonghai2").setGridHeight($(window).height() -225);
					var ids = $("#chonghai2").getDataIDs();
					// 遍历获取每行数据
					for (var i = 0; i < ids.length; i++) {
						// 点击根据id
						$("#chonghai2").setCell(
								ids[i],
								"bianji",
								"<button class='btn btn-danger' onclick ='edit("
										+ ids[i] + ")'>编辑</ button>");
					}
				},
			});
}
function shuhaiLast() {
	Title = "鼠害防后";
	jQuery("#fhbzdhzExport").attr("title", "导出鼠害防后汇总报表");
	/* 标准低鼠害(防后) */
	jQuery("#shuhai3").jqGrid(
			{
				url : localhostPath + projectName + '/shfhhz/queryList',
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				sortname : 'id',
				mtype : "post",
				width : "100%",
				height : "100%",
				viewrecords : true,
				sortorder : "desc",
				autowidth : true,
				multiselect : true,
				pager : '#page9',
				pgbuttons : true,// 是否显示翻页按钮
				forceFit : false,// 调整列宽度是否改变表格的宽度
				loadonce : false,// 只从服务器加载一次数据
				multiselect : true,// 是否可以多选
				viewrecords : true,// 是否在浏览导航栏显示记录总数
				recordpos : 'right',// 记录数的显示位置
				pginput : true,// 跳转页面输入框
				datatype : "json",
				colNames : [ 'uuid_Bzd', 'id', '调查时间', '乡', '村(林班)', '小班',
						"经度", '纬度', '样方号', '调查总株数<br/>(株、个)',
						'受害或死亡株数<br/>(株、个)', '受害或死亡<br/>株率%', '有效洞口<br/>(个)',
						'鼠密度<br/>(只/公顷)', '新土丘<br/>树(个)', '土丘<br/>系数',
						'代表面<br/>积(亩)', '危害<br/>程度', '编辑' ],
				colModel : [ {
					name : 'uuid_Bzd',
					index : 'uuid_Bzd',
					width : '55%',
					sortable : false,
					hidden : true
				}, {
					name : 'uuid',
					index : 'uuid',
					width : 65,
					sortable : false,
					hidden : true
				},
				 {
					name : 'diaocha_Sj',
					index : 'diaocha_Sj',
					width : 65,
					sortable : false
				}, 
				 {
					name : 'xian',
					index : 'xian',
					width : 50,
					sortable : false,
					hidden : true
				},{
					name : 'cun',
					index : 'cun',
					width : 50,
					sortable : false
				}, {
					name : 'xiao_Ban',
					index : 'xiao_Ban',
					width : 50,
					align : "right",
					sortable : false
				}, {
					name : 'yangdi_Jd',
					index : 'yangdi_Jd',
					width : 50,
					align : "right",
					sortable : false
				}, {
					name : 'yangdi_Wd',
					index : 'yangdi_Wd',
					width : 50,
					align : "right",
					sortable : false
				}, {
					name : 'yangf_H',
					index : 'yangf_H',
					width : 80,
					align : "right",
					sortable : false,
					hidden : false
				}, {
					name : 'diaocha_Zs',
					index : 'diaocha_Zs',
					width : 70,
					sortable : false
				}, {
					name : 'shouhai_Zs',
					index : 'shouhai_Zs',
					width : 90,
					sortable : false
				}, {
					name : 'shouhai_Zl',
					index : 'shouhai_Zl',
					width : 120,
					sortable : false
				}, {
					name : 'youxiao_Dk',
					index : 'youxiao_Dk',
					width : 80,
					sortable : false
				}, {
					name : 'shu_Mi_Du',
					index : 'shu_Mi_Du',
					width : 70,
					sortable : false
				}, {
					name : 'tuqiu_Gs',
					index : 'tuqiu_Gs',
					width : 70,
					sortable : false
				}, {
					name : 'tuqiu_Xs',
					index : 'tuqiu_Xs',
					width : 70,
					sortable : false
				}, {
					name : 'daibiao_Mj',
					index : 'daibiao_Mj',
					width : 70,
					sortable : false
				}, {
					name : 'weihai_Cd',
					index : 'weihai_Cd',
					width : 70,
					sortable : false
				}, {
					name : 'bianji',
					index : 'bianji',
					width : 70,
					sortable : false
				}, ],
				jsonReader : {
					root : "rows",
					records : "records",
					total : "total",
					repeatitems : false
				},
				gridComplete : function() {
					$("#shuhai3").setGridWidth($(window).width() - 20);
					$("#shuhai3").setGridHeight($(window).height() -240);
					var ids = $("#shuhai3").getDataIDs();
					// 遍历获取每行数据
					for (var i = 0; i < ids.length; i++) {
						// 点击根据id
						$("#shuhai3").setCell(
								ids[i],
								"bianji",
								"<button class='btn btn-danger'  onclick ='edit("
										+ ids[i] + ")'>编辑</button>");
					}
				},
			});
}
/* 防前、防后 */
function defense(id, flag) {
	// var id =
	// $("#xiangcha").jqGrid('getGridParam','selrow');根据点击行获得点击行的id（id为jsonReader:
	// {id: "id" },）
	var rowData = $("#xiangcha").jqGrid("getRowData", id);// 根据上面的id获得本行的所有数据
	var val = rowData.yhsw_Lb; // 获得指定列的值 (yhsw_Mc 为colModel的name-有害生物种类)
	var tit = "";
	if (flag == "0") {
		tit = val + "防前调查记录表";
	}
	if (flag == "1") {
		tit = val + "防后调查记录表";
	}
	layui.use('layer', function() {
		var layer = layui.layer;
		var $ = layui.jquery;
		if (val == "病害") {
			var index = layer.open({
				type : 2,
				title : tit,
				// 这里content是一个普通的String
				content : "binghaiall.jsp",
				area : [ '80%', '80%' ],
				fixed : false, // 不固定
				resize : false,
				success : function(layero, index) {
					// 设置弹窗中的默认属性，巧妙的地方在这里哦var index = layer
					var body = layer.getChildFrame('body', index);
					window["layui-layer-iframe" + index].diaocha(tit);// 执行子页面方法(传参数)
				}
			});
			layer.full(index);
		}
		if (val == "虫害") {
			var index2 = layer.open({
				type : 2,
				title : tit,
				// 这里content是一个普通的String
				content : 'chonghaiall.jsp',
				area : [ '80%', '80%' ],
				fixed : false, // 不固定
				resize : false,
				success : function(layero, index) {
					// 设置弹窗中的默认属性，巧妙的地方在这里哦var index = layer
					var body = layer.getChildFrame('body', index);
					window["layui-layer-iframe" + index].diaocha1(tit);// 执行子页面方法(传参数)
				}
			});
			layer.full(index2);
		}
		if (val == "鼠害") {
			var index3 = layer.open({
				type : 2,
				title : tit,
				// 这里content是一个普通的String
				content : 'shuhaiall.jsp',
				area : [ '80%', '80%' ],
				fixed : false, // 不固定
				resize : false,
				success : function(layero, index) {
					// 设置弹窗中的默认属性，巧妙的地方在这里哦var index = layer
					var body = layer.getChildFrame('body', index);
					window["layui-layer-iframe" + index].diaocha2(tit);// 执行子页面方法(传参数)
				}
			});
			layer.full(index2);
		}
	})
}
/* select赋值 */
function selectTop() {
	$.ajax({
		url : localhostPath + projectName + '/chengzai/selectTop',
		type : 'POST',
		dataType : 'json',
		data : {},
		success : function(res) {
			var xingzheng = res.xingzheng;
			for (var i = 0; i < xingzheng.length; i++) {
				if (xingzheng[i].ji_Bie == "2") {
					$("#shi").append(
							"<option value='" + xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#shiqian").append(
							"<option value='" + xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#shihou").append(
							"<option value='" + xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#shizong").append(
							"<option value='" + xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
				}
				if (xingzheng[i].ji_Bie == "3") {
					$("#xian").append(
							"<option value='" + xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#xianqian").append(
							"<option value='" + xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#xianhou").append(
							"<option value='" + xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#xianzong").append(
							"<option value='" + xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
				}
				if (xingzheng[i].ji_Bie == "4") {
					$("#zhen").append(
							"<option value='" + xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#zhenqian").append(
							"<option value='" + xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#zhenhou").append(
							"<option value='" + xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
					$("#zhenzong").append(
							"<option value='" + xingzheng[i].code + "'>"
									+ xingzheng[i].name + "</option>");
				}
			}
		}
	})
}
