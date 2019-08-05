<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="JqgridInclude.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>鼠害防前调查记录表</title>
  <!-- layui的css -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/js/layer/layui/css/layui.css" media="all">
  <script src="${pageContext.request.contextPath}/js/layer/layui/layui.js"></script>
  <script src="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/js/bootstrap.js"></script>
 <style type="text/css">
   .layui-layer-title{
    text-align: center;
    padding: 0 ;
    font-size: 1.4em;
}	
 /* 修改table表格样式  */
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
<body>
	<!-- <div style="width: 100%"> 
			<table id="shuhaiall"></table>
			<div id="page" style="position: fixed; bottom: 0px;"></div>
	</div> -->
	<div style="margin-top: 2%;margin-left: 1%">
		<table id="shuhaiall"></table>
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
	 var t;
	 var url;
		$(function() {
			/* 初始化方法 */
			diaocha2();
			$(window).resize(function() {
				$("#shuhaiall").setGridWidth($(window).width() - 35);
				$("#shuhaiall").setGridHeight($(window).height()-180);
			});
		});
	 function diaocha2(tit){
			t = tit;
	 if(t=="鼠害防前调查记录表"){
	 jQuery("#shuhaiall").jqGrid({
		 		url : localhostPath + projectName + '/shfqhdc/queryList',
		        datatype : "json",
		        colNames : [ 'uuid','样方', '土丘树<br/>(个)', '有效洞口<br/>(个)', '捕鼠夹<br/>(个)', '实际鼠数(只)<br/>计雌雄','土丘系数','捕获率<br/>%','鼠密度(只/公顷)','调查<br>株数','受害<br/>株数','受害株率<br/>(%)','死亡株数','死亡株率<br/>%','轻','中','重','备注(表明<br/>代表面积)','编辑'],
		        colModel : [ 
		                     {name : 'uuid',index : 'uuid',width : 63,sortable : false,hidden : true}, 
		                     {name : 'yangf_H',index : 'yangf_H',width : 70}, 
		                     {name : 'tuqiu_Gs',index : 'tuqiu_Gs',width : 70}, 
		                     {name : 'youxiao_Dk',index : 'youxiao_Dk',width : 70,align : "center"}, 
		                     {name : 'bushujia_S',index : 'bushujia_S',width : 70,align : "center"}, 
		                     {name : 'bushu_Hj',index : 'bushu_Hj',width : 100,align : "center"},
		                     {name : 'tuqiu_Xs',index : 'tuqiu_Xs',width : 100,align : "center"}, 
		                     {name : 'tuqiu_Xs',index : 'tuqiu_Xs',width : 100,align : "center"}, /* ?? */
		                     {name : 'shu_Mi_Du',index : 'shu_Mi_Du',width : 100,align : "center"},
		                     {name : 'diaocha_Zs',index : 'diaocha_Zs',width : 63,sortable : false}, 
		                     {name : 'shouhai_Zs',index : 'shouhai_Zs',width : 55}, 
		                     {name : 'shouhai_Zl',index : 'shouhai_Zl',width : 55}, 
		                     {name : 'siwang_Zs',index : 'siwang_Zs',width : 70}, 
		                     {name : 'siwang_Zl',index : 'siwang_Zl',width : 70}, 
		                     {name : 'WEIHAI_CD',index : 'WEIHAI_CD',width : 70,align: 'center', formatter: 'checkbox'},
		                     {name : 'WEIHAI_CD1',index : 'WEIHAI_CD1',width : 70,align : "center",formatter: 'checkbox'}, 
		                     {name : 'WEIHAI_CD2',index : 'WEIHAI_CD2',width : 70,align : "center",formatter: 'checkbox'}, 
		                     {name : 'bei_Zhu',index : 'bei_Zhu',width : 100,align : "center"}, 
		                     {name : 'bianji',index : 'bianji',width : 100,align : "center"}
		                   ],
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
				gridComplete: function () {
					$("#shuhaiall").setGridWidth($(window).width() - 35);
					$("#shuhaiall").setGridHeight($(window).height()-180);
					var ids = $("#shuhaiall").getDataIDs();
					// 遍历获取每行数据
					for (var i = 0; i < ids.length; i++) {
					// 点击根据id
						$("#shuhaiall").setCell(ids[i],"bianji","<button class='btn btn-danger'   onclick ='edit("+ ids[i] +")'>编辑</ button>");
					}
				},
		      });
		 jQuery("#shuhaiall").jqGrid('setGroupHeaders',{
			 useColSpanStyle: true, 
			 groupHeaders:[
				  {startColumnName: 'WEIHAI_CD', numberOfColumns: 3, titleText: '发生程度(相对应的栏中打钩)'},
				    ]  
		 });
	 }else{
		 jQuery("#shuhaiall").jqGrid({
			    url : localhostPath + projectName + '/shfhdc/queryList',
		        datatype : "json",
		        colNames : [ 'uuid','样方', '土丘树<br/>(个)', '有效洞口<br/>(个)', '捕鼠夹<br/>(个)', '实际鼠数(只)<br/>计雌雄','土丘系数','捕获率<br/>%','鼠密度(只/公顷)','调查<br>株数','受害<br/>株数','受害株率<br/>(%)','死亡株数','死亡株率<br/>%','轻','中','重','备注(表明<br/>代表面积)','编辑'],
		        colModel : [ 
		        	{name : 'uuid',index : 'uuid',width : 63,sortable : false,hidden : true}, 
                    {name : 'yangf_H',index : 'yangf_H',width : 55}, 
                    {name : 'tuqiu_Gs',index : 'tuqiu_Gs',width : 55}, 
                    {name : 'youxiao_Dk',index : 'youxiao_Dk',width : 70,align : "center"}, 
                    {name : 'bushujia_S',index : 'bushujia_S',width : 70,align : "center"}, 
                    {name : 'bushu_Hj',index : 'bushu_Hj',width : 100,align : "center"},
                    {name : 'tuqiu_Xs',index : 'tuqiu_Xs',width : 100,align : "center"}, 
                    {name : 'tuqiu_Xs',index : 'tuqiu_Xs',width : 100,align : "center"}, /* ?? */
                    {name : 'shu_Mi_Du',index : 'shu_Mi_Du',width : 100,align : "center"},
                    {name : 'diaocha_Zs',index : 'diaocha_Zs',width : 63,sortable : false}, 
                    {name : 'shouhai_Zs',index : 'shouhai_Zs',width : 55}, 
                    {name : 'shouhai_Zl',index : 'shouhai_Zl',width : 55}, 
                    {name : 'siwang_Zs',index : 'siwang_Zs',width : 70}, 
                    {name : 'siwang_Zl',index : 'siwang_Zl',width : 70}, 
                    {name : 'WEIHAI_CD',index : 'WEIHAI_CD',width : 70,align: 'center', formatter: 'checkbox'},
                    {name : 'WEIHAI_CD1',index : 'WEIHAI_CD1',width : 70,align : "center",formatter: 'checkbox'}, 
                    {name : 'WEIHAI_CD2',index : 'WEIHAI_CD2',width : 70,align : "center",formatter: 'checkbox'}, 
                    {name : 'bei_Zhu',index : 'bei_Zhu',width : 100,align : "center"}, 
                    {name : 'bianji',index : 'bianji',width : 100,align : "center"}
		                   ],
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
				gridComplete: function () {
					$("#shuhaiall").setGridWidth($(window).width() - 35);
					$("#shuhaiall").setGridHeight($(window).height()-180);
					var ids = $("#shuhaiall").getDataIDs();
					// 遍历获取每行数据
					for (var i = 0; i < ids.length; i++) {
					// 点击根据id
						$("#shuhaiall").setCell(ids[i],"bianji","<button class='btn btn-danger' onclick ='edit("+ ids[i] +")'>编辑</ button>");
					}
				},
		  })
		  jQuery("#shuhaiall").jqGrid('setGroupHeaders',{
				 useColSpanStyle: true, 
				 groupHeaders:[
					  {startColumnName: 'WEIHAI_CD', numberOfColumns: 3, titleText: '发生程度(相对应的栏中打钩)'},
					    ]  
			 });
	   }
	 }
	 
	 function edit(id) {
		 var rowData = $("#shuhaiall").jqGrid("getRowData", id);// 根据上面的id获得本行的所有数据
			var msg = t;
			if(msg=="鼠害防前调查记录表"){
			layui.use('layer', function() {
				var layer = layui.layer;
				var $ = layui.jquery;
					layer.open({
						type : 2,
						title : '鼠害防前编辑',
						// 这里content是一个普通的String
						content : "xiangchaVEdit.jsp",
						area : [ '720px', '310px' ],
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
		}else {
			layui.use('layer', function() {
				var layer = layui.layer;
				var $ = layui.jquery;
					layer.open({
						type : 2,
						title : '鼠害防后编辑',
						// 这里content是一个普通的String
						content : "xiangchaVEdit.jsp",
						area : [ '720px', '310px' ],
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