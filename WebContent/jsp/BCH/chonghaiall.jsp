<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="JqgridInclude.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>虫害调查记录表</title>
  <!-- layui的css -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/js/layer/layui/css/layui.css" media="all">
  <script src="${pageContext.request.contextPath}/js/layer/layui/layui.js"></script>
  <script src="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/js/bootstrap.js"></script>
 <style type="text/css">
 /* 修改table表格样式  */
   .layui-layer-title{
    text-align: center;
    padding: 0 ;
    font-size: 1.4em;
}	
.ui-state-default, .ui-widget-content .ui-state-default,
	.ui-widget-header .ui-state-default {
	background: #ececec !important;
	text-align: center;
	vertical-align: middle;
	border: 1px #aaa solid;
	font-size: 14px;
	padding-bottom: 2px;
	color: #00867F;
}
.ui-jqgrid .ui-jqgrid-htable th div {
	height: 20px;
}
.ui-jqgrid tr.ui-row-ltr td {
	text-align: center !important;
	padding: 5px;
	font-size: 14px;
	border: 1px #aaa solid;
}
.ui-jqgrid td.jqgrid-rownum {
	background-color: #fff !important;
}

.ui-jqgrid .ui-pg-input {
	height: 18px !important;
	font-size: 13px;
}

.ui-jqgrid .ui-pg-selbox {
	font-size: 13px;
}

.ui-state-disabled, .ui-widget-content .ui-state-disabled,
	.ui-widget-header .ui-state-disabled {
	opacity: 2;
}

.ui-jqgrid .ui-paging-info {
	margin-top: 0px;
	margin-right: 10px;
}
#gridPager {
	position: absolute;
	bottom: 0;
}

#gridPager {
	font-size: 14px;
	color: #000;
	bottom: 0;
}
/* 修改table表格样式结束  */
/* 行政区文本框样式 */
.combo-text {
	font-size: 14px;
	border: 0px;
	line-height: 20px;
	height: 20px;
	margin: 0;
	padding: 0px 2px;
	display: inline-block;
}

.form-control[readonly] {
	background-color: #fff;
	opacity: 1;
	padding: 10px;
}

.tabcontent {
	color: #00867F;
	font-size: 16px;
	font-weight: bold;
	border-right: dotted 2px #cbd1dc;;
	margin-top: 5px;
	margin-bottom: 5px;
	background-color: #ECECEC;
	height: 37px;
	text-align: center;
	line-height: 38px;
}

.combo-arrow {
	width: 18px;
	height: 20px;
	overflow: hidden;
	display: inline-block;
	vertical-align: top;
	cursor: pointer;
	opacity: 0.6;
	filter: alpha(opacity = 60);
	background: url('../../js/zTreeStyle/img/combo_arrow.png') no-repeat
		center center;
	background-color: #E0ECFF;
}

.ztree li span.button {
	background: url("../../js/zTreeStyle/img/zTreeStandard.png");
	*background-image: url("js/zTreeStyle/img/zTreeStandard.gif")
}

.combo {
	border-color: #95B8E7;
	background-color: #ffffff;
	display: inline-block;
	white-space: nowrap;
	margin: 0;
	padding: 0;
	border-width: 1px;
	border-style: solid;
	overflow: hidden;
	vertical-align: middle;
	border-radius: 4px;
	border: 1px solid #ccc;
	margin-left: 10px;
	margin-right: 30px;
}
.ztree {
	margin-top: 0px;
	border: 1px solid #617775;
	background: #f0f6e4;
	height: 260px;
	overflow-y: auto;
	min-width: 132px;
}
th.ui-th-column div{
    white-space:normal !important;
    height:auto !important;
    padding:0px;
}
/* 行政区文本框样式结束 */
.tabbable-custom .nav-tabs > li.active {
    border-top: 3px solid #00867f;
}
.nav-tabs > li > a {
    margin-right: 0px;
    border-radius: 0px 0px 0 0;
} 
.layui-form-label {
	width: 110px
}
/* 按钮样式 */
</style>
<body >
<!-- 	<div style="width: 100%;margin-top: 2%;margin-left: 3%"> 
		<span>受害株率(%):<span><input	style=" width: 10%"/></span></span> 
		<div style="margin-left: -3%;margin-top: 2%">
			<table id="chonghai"></table>
			<div id="page" style="position: fixed; bottom: 0px;"></div>
		</div>
	</div> -->
	
	<div class="layui-form-item" style="margin-top: 10px">
		<div class="layui-inline">
			<label class="layui-form-label">受害株率(%)</label>
			<div class="layui-input-inline">
				<input type="text" name="email" id="xiang" autocomplete="off" class="layui-input">
			</div>
		</div>
	</div>
	<div style="margin-top: 2%;margin-left: 1%">
		<table id="chonghai"></table>
		<div id="page" style="position: fixed; bottom: 0px;"></div>
	</div>
	
	<script type="text/javascript">
	// 获取路径
	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	var localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
	$(function(){
		diaocha1();
		$(window).resize(function() {
			$("#chonghai").setGridWidth($(window).width() - 35);
			$("#chonghai").setGridHeight($(window).height()-180);
		});
	});
	var t;
	var url;
	function diaocha1(tit){
		t = tit;
		if(t=="虫害防前调查记录表"){
	 jQuery("#chonghai").jqGrid(
		      {
		    	    url : localhostPath + projectName + '/chfqdc/queryList',
			    	rowNum : 10,
				    rowList : [ 10, 20, 30 ],
				    sortname : 'id',
				    mtype : "post",
				    width:"100%",
			        height:'100%',			        
				    sortorder : "desc",
				    autowidth:true,
				    multiselect : true,
				    pager : '#page',
				    pgbuttons : true,// 是否显示翻页按钮
			        forceFit : false,// 调整列宽度是否改变表格的宽度
					loadonce : false,// 只从服务器加载一次数据
					multiselect : true,// 是否可以多选
					viewrecords : true,// 是否在浏览导航栏显示记录总数
					recordpos : 'right',// 记录数的显示位置
					pginput : true,// 跳转页面输入框
			        datatype : "json", 
		        datatype : "json",
		        colNames : [ 'uuid','样方', '样株或枝梢数(株、个)', '是否受害', '虫口密度(头/株或单位长度、面积)', '备注','编辑'],
		        colModel : [ 
		                     {name : 'uuid',index : 'uuid',width : 63,sortable : false, hidden : true}, 
		                     {name : 'yangf_H',index : 'yangf_H',width : 55}, 
		                     {name : 'yangz_H',index : 'yangz_H',width : 55}, 
		                     {name : 'shouhai',index : 'shouhai',width : 70,align : "right"}, 
		                     {name : 'chongk_Md',index : 'chongk_Md',width : 70,align : "right"}, 
		                     {name : 'bei_Zhu',index : 'bei_Zhu',width : 100,align : "right"}, 
		                     {name : 'bianji',index : 'bianji',width : 100,align : "right"}, 
		                   ],
		         jsonReader : {
							root : "rows",
							records : "records",
							total:"total",
							repeatitems : false
						},
						gridComplete: function () {
							var ids = $("#chonghai").getDataIDs();
							// 遍历获取每行数据
							for (var i = 0; i < ids.length; i++) {
							// 点击根据id
								$("#chonghai").setCell(ids[i],"bianji","<button class='btn btn-danger'  onclick ='edit("+ ids[i] +")'>编辑</ button>");
							}
						}
			      });
	}else{
		jQuery("#chonghai").jqGrid(
			      {
		url : localhostPath + projectName + '/chfhdc/queryList',
    	rowNum : 10,
	    rowList : [ 10, 20, 30 ],
	    sortname : 'id',
	    mtype : "post",
	    width:"100%",
        height:'100%',			        
	    sortorder : "desc",
	    autowidth:true,
	    multiselect : true,
	    pager : '#page',
	    pgbuttons : true,// 是否显示翻页按钮
        forceFit : false,// 调整列宽度是否改变表格的宽度
		loadonce : false,// 只从服务器加载一次数据
		multiselect : true,// 是否可以多选
		viewrecords : true,// 是否在浏览导航栏显示记录总数
		recordpos : 'right',// 记录数的显示位置
		pginput : true,// 跳转页面输入框
        datatype : "json", 
    datatype : "json",
    colNames : [ 'uuid','样方', '样株或枝梢数(株、个)', '是否受害', '虫口密度(头/株或单位长度、面积)', '备注','编辑'],
    colModel : [ 
                 {name : 'uuid',index : 'uuid',width : 63,sortable : false, hidden : true}, 
                 {name : 'yangf_H',index : 'yangf_H',width : 55}, 
                 {name : 'yangz_H',index : 'yangz_H',width : 55}, 
                 {name : 'shouhai',index : 'shouhai',width : 70,align : "right"}, 
                 {name : 'chongk_Md',index : 'chongk_Md',width : 70,align : "right"}, 
                 {name : 'bei_Zhu',index : 'bei_Zhu',width : 100,align : "right"}, 
                 {name : 'bianji',index : 'bianji',width : 100,align : "right"}, 
               ],
     jsonReader : {
				root : "rows",
				records : "records",
				total:"total",
				repeatitems : false
			},
			gridComplete: function () {
				$("#chonghai").setGridWidth($(window).width() - 35);
				$("#chonghai").setGridHeight($(window).height()-180);
				var ids = $("#chonghai").getDataIDs();
				// 遍历获取每行数据
				for (var i = 0; i < ids.length; i++) {
				// 点击根据id
					$("#chonghai").setCell(ids[i],"bianji","<button class='btn btn-danger'  onclick ='edit("+ ids[i] +")'>编辑</ button>");
				}
			}
		   });
	      }
		}
	
	function edit(id){
		var rowData = $("#chonghai").jqGrid("getRowData", id);// 根据上面的id获得本行的所有数据
		var msg = t;
		if(msg=="虫害防前调查记录表"){
		layui.use('layer', function() {
			var layer = layui.layer;
			var $ = layui.jquery;
				layer.open({
					type : 2,
					title : '虫害防前编辑',
					// 这里content是一个普通的String
					content : "xiangchaUEdit.jsp",
					area : [ '720px', '313px' ],
					fixed : false, // 不固定
					maxmin : true,
					resize : false,
					success : function(layero, index) {
						$("#chonghai").setGridWidth($(window).width() - 35);
						$("#chonghai").setGridHeight($(window).height()-180);
						// 设置弹窗中的默认属性，巧妙的地方在这里哦var index = layer
						var body = layer.getChildFrame('body', index);
						window["layui-layer-iframe" + index].bianji(rowData);// 执行子页面方法(传参数)
					}
			}); 
		})
	  }else {
		  layui.use('layer', function() {
				var layer = layui.layer;
				var $ = layui.jquery;
					layer.open({
						type : 2,
						title : '虫害防后编辑',
						// 这里content是一个普通的String
						content : "xiangchaUEdit.jsp",
						area : [ '720px', '313px' ],
						fixed : false, // 不固定
						maxmin : true,
						resize : false,
						success : function(layero, index) {
							// 设置弹窗中的默认属性，巧妙的地方在这里哦var index = layer
							var body = layer.getChildFrame('body', index);
							window["layui-layer-iframe" + index].bianji(rowData);// 执行子页面方法(传参数)
						}
				}); 
			})
	  }
	}
	</script>
</body>
</html>