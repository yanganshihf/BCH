<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<html lang="cn">
<head>
<title>叠加分析</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="/ResourceMonitor/js/moment.min.js"></script> 
<style type="text/css">
@media ( min-width : 700px) {
	.container {
		width: 100%;
	}
}
.layui-table-header span {
    color: #058563;
    font-weight: 700;
}
.layui-table-header th {
    background-color: #E6E6E6;
}
.layui-table-page{
	text-align:center;
}
html body{
    height: 100%;
}
</style>
</head>
<body>
	<div >
		<div style="height:40px;">
			<button type="button" class="btn btn-default" style="float:right;margin-top:10px;" id="exportButton" title="导出">
				<img src="/ResourceMonitor/images/indexpage/download.png" class="" alt="xiazai">
			</button>			
		</div>
		<div class="container" id="gridCond">
			<table id="resourceQueryTable" lay-filter="filter"></table>
		</div>
	</div>
	<input type="hidden" id="results">
</body>
<script type="text/javascript">
layui.use(['laydate','table','util'], function(){
	  var table = layui.table;
	  var util = layui.util;
	  var closData =  [[
		  {type:'numbers',title: '序号',align:'center'}
	      ,{field:'linban',title: '林班',align:'center'}
 	      ,{field:'xiaoban',title: '小班',align:'center'}
	      ,{field:'linzhong',title: '林种',align:'center'}
 	      //,{field:'qiyuan',title: '起源',align:'center'}
	      ,{field:'dimao',title: '地貌',align:'center'}
	      ,{field:'poxiang',title: '坡向',align:'center'}
	      ,{field:'powei',title: '坡位',align:'center'}
	      ,{field:'podu',title: '坡度',align:'center'}
	      ,{field:'yubidu',title: '郁闭度',align:'center'}
	      //,{field:'kejidu',title: '可积度',align:'center'}
	      ,{field:'dilei',title: '地类',align:'center'}
	      ,{field:'mianji',title: '面积',align:'center'}
	      ,{field:'linchang',title: '林场',align:'center',width:100}
	      ,{field:'tudzhong',title: '土地种',align:'center',width:100}
	      ,{field:'youshishuzhong',title: '优势树种',align:'center'}
	      ,{field:'youshishu',title: '优势树',align:'center'}
	      ,{field:'shuzhong',title: '林种',align:'center'}
	      ,{field:'baohudeng',title: '保护等级',align:'center'}
      ]];
	  var features=parent.resourceResultData;
	  parent.resourceResultData=null;
	  var data=[];
	  for(var i=0;i<features.length;i++){
	        var linban = features[i]['LIN_BAN'];
	        var xiaoban = features[i]['XIAO_BAN'];
	        var linzhong = features[i]['LIN_ZHONG'];
	        var qiyuan = features[i]['QI_YUAN'];
	        var dimao = features[i]['DI_MAO'];
	        var powei = features[i]['PO_WEI'];
	        var podu = features[i]['坡度'];
	        var poxiang = features[i]['坡向'];
	        var zldj = features[i]['ZL_DJ'];
	        var yubidu = features[i]['YU_BI_DU'];
	        var kejidu = features[i]['KE_JI_DU'];
	        var bhdj = features[i]['BH_DJ'];
	        var dilei = features[i]['DI_LEI'];
	        var mianji = features[i]['MIAN_JI'];
	        var linchang = features[i]['林场'];
	        var tudzhong = features[i]['土地种'];
	        var youshishuzhong = features[i]['优势树种'];
	        var youshishu = features[i]['优势树'];
	        var shuzhong = features[i]['林种'];
	        var baohudeng = features[i]['保护等'];
	        var obj={
        	  linban ,
         	  xiaoban,
        	  linzhong,
        	  qiyuan,
        	  dimao,
        	  poxiang,
        	  powei,
        	  podu,
        	  zldj,
        	  yubidu,
        	  kejidu,
        	  bhdj,
        	  dilei,
        	  mianji,
        	  linchang,
        	  tudzhong,
        	  youshishuzhong,
        	  youshishu,
        	  shuzhong,
        	  baohudeng
	        }
	        data.push(obj);
	  }
	  //视频回放表格渲染
	  var tableExport = table.render({
	    elem: '#resourceQueryTable'
	    ,cellMinWidth: 60 
	    ,data:data
	    ,cols:closData
	  	,id: 'tableId'
	  	,title:'小班信息'
	  	,page: {
	  		elem:'pageTool'
	  	}
	  	,height: 'full-70'
	  	,limits:[10,30,90]
	  	//,size:'sm'
	  });
	   $('#exportButton').on('click',function(){
		   table.exportFile(tableExport.config.id, data);
	   })
	});	
</script>
</html>