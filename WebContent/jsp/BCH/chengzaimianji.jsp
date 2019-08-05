<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="JqgridInclude.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>成灾面积调查</title>
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
  </style>
</head>
	<body>
		<div class="layui-tab layui-tab-brief"  style="width: 100%;height: 100%">
		  <ul class="layui-tab-title">
		    <li class="layui-this">成灾面积调查</li>
		  </ul>
		  <div class="layui-tab-content">
		    <div class="layui-tab-item layui-show" style="margin-top: 10px"	>
		    	<span><span>市：</span> 
		    	<span><select id="shi" style="width: 11%"><option>请选择--</option></select></span></span>
		    	<span style="margin-left: 20px"><span>县：</span><span><select id="xian"  style="width: 8%"><option>请选择--</option></select></span></span>
		    	<span style="margin-left: 20px"><span>乡镇：</span> <span>
		    	<select id="zhen"  style="width: 8%">
		    	<option>请选择--</option>
		    	</select></span></span>
		    	<span style="margin-left: 20px"><span><button type="button" onclick="select()" class="layui-btn layui-btn-radius layui-btn-sm" style="width: 5%;background-color:#009688">查询</button></span></span>
			    <span style="margin-left: 30%"><span><button type="button" onclick="del()" class="layui-btn layui-btn-radius layui-btn-sm" style="width: 5%;background-color:#009688">删除</button></span></span>
			    <span style="margin-left: 0.5%"><span><button type="button" id="chzaimjdcExport" class="layui-btn layui-btn-radius layui-btn-sm" style="width: 5%;background-color:#009688">导出</button></span></span>
		    	<div style="margin-top: 20px">
		    	<table id="chengzai"></table>
		    	<div id="page" style="position: fixed; bottom: 0px;"></div>
		    	</div>
		    </div>
		  </div>
		</div>
		 <script  type="text/javascript" src="report.js" >  </script>
		<script type="text/javascript">
			layui.use(['element','table'], function(){
			  var $ = layui.jquery 
			  ,element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
			});
		</script>
		<script type="text/javascript">
		// 获取路径
		var curWwwPath = window.document.location.href;
		var pathname = window.document.location.pathname;
		var pos = curWwwPath.indexOf(pathname);
		var localhostPath = curWwwPath.substring(0, pos);
		// 获取项目名
		var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
		$(function(){
			  pageInit();
			  selectTop();
			  $(window).resize(function() {
			  $("#chengzai").setGridWidth($(window).width()-20);
			  $("#chengzai").setGridHeight($(window).height()-187);
			});
		});
			function pageInit(){
			  jQuery("#chengzai").jqGrid(
			      {
			    	  url : localhostPath + projectName + '/czddc/queryList',
			    	  rowNum : 10,
				      rowList : [ 10, 20, 30 ],
				      sortname : 'id',
				      mtype : "post",
				      width:"100%",
				      sortorder : "desc",
				      autowidth:true,
				      multiselect : true,//开启多选
				      pager : '#page',
				      pgbuttons : true,// 是否显示翻页按钮
			          forceFit : false,// 调整列宽度是否改变表格的宽度
					  loadonce : false,// 只从服务器加载一次数据
				 	  multiselect : true,// 是否可以多选
				 	  multiboxonly: true,
					  viewrecords : true,// 是否在浏览导航栏显示记录总数
					  recordpos : 'right',// 记录数的显示位置
					  pginput : true,// 跳转页面输入框
					  loadtext: '信息读取中...',
			        datatype : "json",
			        colNames : [ 'uuid','uuid_czd','县', '乡', '林班', '监测样地<br/>序号', '样方调查植株(株)','有害生物<br/>名称', '被害植物名称','危害部位','危害期','失叶率(%)<br/>受害株率(%)','死亡率','是否成灾','调查人','调查时间','备注','编辑' ],
			        colModel : [ 
			                     {name : 'uuid',index : 'uuid',width : 55,sortable : false,hidden : true}, 
			                     {name : 'uuid_Czd',index : 'uuid_Czd',width : 55,sortable : false,hidden : true}, 
			                     {name : 'xian_Mc',index : 'xian_Mc',width : 55,sortable : false}, 
			                     {name : 'xiang_Mc',index : 'xiang_Mc',width : 55,sortable : false}, 
			                     {name : 'cun',index : 'cun',width : 65,align : "right",sortable : false}, 
			                     {name : 'yangdi_H',index : 'yangdi_H',width : 65,align : "right",sortable : false}, 
			                     {name : 'diaocha_Zs',index : 'diaocha_Zs',width : 100,align : "right",sortable : false}, 
			                     {name : 'yhsw_Mc',index : 'yhsw_Mc',width : 100,sortable : false},
			                     {name : 'jzzw_Mc',index : 'jzzw_Mc',width : 90  ,sortable : false},
			                     {name : 'weihai_Bw',index : 'weihai_Bw',width : 100,sortable : false},
			                     {name : 'weihai_Q',index : 'weihai_Q',width : 90,sortable : false},
			                     {name : 'shouhai_Zl',index : 'shouhai_Zl',width : 95,sortable : false},
			                     {name : 'siwang_Zl',index : 'siwang_Zl',width : 80,sortable : false},
			                     {name : 'chengzai',index : 'chengzai',width : 65,sortable : false,formatter: 'checkbox',
			                         edittype: 'checkbox', editoptions: {value: 'Yes:No', defaultValue: 'No'}},
			                     {name : 'diaocha_Ry',index : 'diaocha_Ry',width : 80,sortable : false},
			                     {name : 'diaocha_Sj',index : 'diaocha_Sj',width : 65,sortable : false},
			                     {name : 'beizhu',index : 'beizhu',width : 65,sortable : false},
			                     {name : 'bianji',index : 'bianji',width : 65,sortable : false}
			                   ],
			                   jsonReader : {
									root : "rows",
									records : "records",
									total : "total",
									repeatitems : false
								},
								gridComplete: function () {
									$("#chengzai").setGridWidth($(window).width()-20);
									$("#chengzai").setGridHeight($(window).height()-187);
									var ids = $("#chengzai").getDataIDs();
									// 遍历获取每行数据
									for (var i = 0; i < ids.length; i++) {
									// 点击根据id
										$("#chengzai").setCell(ids[i],"bianji","<button class='btn btn-danger' onclick ='edit("+ ids[i] +")'>编辑</ button>");
									}
								},
					});
			}
			function selectTop(){
				$.ajax({
					url :  localhostPath + projectName + '/chengzai/selectTop', 
					type : 'POST',
					dataType : 'json',
					data : {},
					success : function(res){
						var xingzheng = res.xingzheng;
						console.log(xingzheng);
						for (var i = 0; i < xingzheng.length; i++) {
							if(xingzheng[i].ji_Bie=="2"){
								$("#shi").append("<option value='"+xingzheng[i].code+"'>"+xingzheng[i].name+"</option>");
							}
							if(xingzheng[i].ji_Bie=="3"){
								$("#xian").append("<option value='"+xingzheng[i].code+"'>"+xingzheng[i].name+"</option>"); 
							}
							if(xingzheng[i].ji_Bie=="4"){
								$("#zhen").append("<option value='"+xingzheng[i].code+"'>"+xingzheng[i].name+"</option>"); 
							}
						}
					}
				})
			}
		/* 编辑 */
		function edit(id){
			  var rowData = $("#chengzai").jqGrid("getRowData",id);//根据上面的id获得本行的所有数据
		      layui.use('layer', function() {
					var layer = layui.layer;
					var $ = layui.jquery;
						layer.open({
							type : 2,
							title : '成灾面积编辑',
							// 这里content是一个普通的String
							content : "chengzaiEdit.jsp",
							area : [ '720px', '550px' ],
							fixed : false, // 不固定
							resize : false,
							success : function(layero, index) {
								// 设置弹窗中的默认属性，巧妙的地方在这里哦var index = layer
								var body = layer.getChildFrame('body', index);
								window["layui-layer-iframe" + index].parameter(rowData);// 执行子页面方法(传参数)
							}
					}); 
				})
		}
		/* 条件查询 */
			function select() {
            var shiVal = $('#shi option:selected').val(); 
            var xianVal = $('#xian option:selected').val(); 
            var zhenVal = $('#zhen option:selected').val();
            if(shiVal == "请选择--" && xianVal == "请选择--" && zhenVal == "请选择--"){
            	alert("请先选择查询条件");
            }
            if(shiVal == "请选择--"){
            	shiVal = "";
            }
            if(xianVal == "请选择--"){
            	xianVal = "";
            }
            if(zhenVal == "请选择--"){
            	zhenVal = "";
            }
            $("#chengzai").jqGrid('setGridParam',{ 
                url : localhostPath + projectName + '/chengzai/selectWhere',
                postData : {
                	'shi' : shiVal,
                	'xian' : xianVal,
                	'zhen' : zhenVal
                }, //发送数据 -携带参数
                page:1 
            }).trigger("reloadGrid"); //重新载入
        
        }; 
        /* 删除 */
        function del(){
        	var id = $("#chengzai").jqGrid('getGridParam', 'selrow');
        	var rowData = $("#chengzai").jqGrid('getRowData', id);
        	console.log(rowData)
        	var uuid_Czd = rowData.uuid_Czd;
        	alert(uuid_Czd);
        	$.ajax({
        		url : localhostPath + projectName + '/czddc/delete',
        		type : "POST",
        		dataType : "json",
        		data : {
        			'uuid_czd' : uuid_Czd
        		},
        		success : function(res) {
        			if (res.msg == "删除成功") {
        				alert("删除成功");
        			}
        			jQuery("#chengzai").trigger("reloadGrid");
        		}
        	})
        	/* var ids = $("#chengzai").jqGrid('getGridParam', 'selarrrow');
        	var list = new Array();
        	 for (var i = 0; i < ids.length; i++) {
        	   var rowData = $("#chengzai").jqGrid("getRowData",ids[i]);//根据上面的id获得本行的所有数据
   			    val= rowData.uuid_Czd; //获得指定列的值 (yhsw_Mc 为colModel的name)var rowData = $("#chengzai").jqGrid("getRowData",id);//根据上面的id获得本行的所有数据
        		list.push(val);
        	 }
			var str = list.toString();
			console.log(str)
			$.ajax({
				   url : localhostPath + projectName + '/chengzai/del',
				   type : 'POST',
				   datatype : "json",
				   data : {
					   'uuid_Czd' : str
				   },
			success : function(res){
				alert("删除成功")
			}
		  }) */			
        }
		</script>
	</body>
</html>