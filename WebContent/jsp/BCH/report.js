/**************************有害生物普查********************************/ 
$("#tcjlExport").click(function(){  
	var ids = $("#tcjl").jqGrid('getGridParam', 'selarrrow');
	if (ids==null || ids.length==0) {
		 alert("请选择需要导出的数据！"); 
	} 
	else
	{
		    var admincodetemp=[];
		    for(var index=0;index<ids.length;index++){
		       var rowData = $("#tcjl").jqGrid('getRowData',ids[index]);
		       if(admincodetemp.indexOf(rowData.uuid_Yx) < 0) {
		          admincodetemp.push(rowData.uuid_Yx);
		       }
		    } 
		    var admincode=admincodetemp.join(","); 
		    var indexExport = layer.load(0);
		    var curWwwPath = window.document.location.href;
			var pathname = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathname);
			var localhostPath = curWwwPath.substring(0, pos);
			// 获取项目名
			var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1); 
			var url=localhostPath + projectName + '/report/ReportPcTcd'; 
			
			$.ajax({
	            type: "POST",
	            url: url,
	            data:{uuidyxs:admincode},
	            contentType:'application/x-www-form-urlencoded',
	            dataType: "json",
	            success: function(data){ 
	             if(data!=null && data!='')
	             {
	            	var location = localhostPath + projectName +"/reportResult/"+data; 
					// 下载文件
				    var $form = $('<form method="GET"></form>');
				    $form.attr('action', location);
				    $form.appendTo($('body'));
				    $form.submit();
				    layer.close(indexExport);
				    layer.msg('导出成功!'); 
	              }
	            }
	        }); 
	}
	 
}); 

	//诱虫灯
$("#youchongExport").click(function(){  
	var ids = $("#youchong").jqGrid('getGridParam','selarrrow');
	console.log(ids);
	if (ids==null || ids.length==0) {
		 alert("请选择需要导出的数据！"); 
	} 
	else
	{
		 var indexExport = layer.load(0);
		    var admincodetemp=[];
		    for(var index=0;index<ids.length;index++){
		       var rowData = $("#youchong").jqGrid('getRowData',ids[index]);
		       if(admincodetemp.indexOf(rowData.uuid_ycd) < 0) {
		          admincodetemp.push(rowData.uuid_ycd);
		       }
		    } 
		    var curWwwPath = window.document.location.href;
			var pathname = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathname);
			var localhostPath = curWwwPath.substring(0, pos);
			// 获取项目名
			var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1); 
			var url=localhostPath + projectName + '/report/ReportPcYcd'; 
			var admincode=admincodetemp.join(',');
			$.ajax({
	            type: "POST",
	            url: url,
	            data:{uuidyxs:admincode},
	            contentType:'application/x-www-form-urlencoded',
	            dataType: "json",
	            success: function(data){ 
	             if(data!=null && data!='')
	             {
	            	var location = localhostPath + projectName +"/reportResult/"+data; 
					// 下载文件
				    var $form = $('<form method="GET"></form>');
				    $form.attr('action', location);
				    $form.appendTo($('body'));
				    $form.submit();
				    layer.close(indexExport);
				    layer.msg('导出成功!'); 
	              }
	            }
	        }); 
	}
	 
}); 


$("#zhongshiExport").click(function(){  
	var ids = $("#zhongshi").jqGrid('getGridParam','selarrrow');
	console.log(ids);
	if (ids==null || ids.length==0) {
		 alert("请选择需要导出的数据！"); 
	} 
	else
	{
		 var indexExport = layer.load(0);
		  var admincodetemp=[];
		   for(var index=0;index<ids.length;index++){
		       var rowData = $("#zhongshi").jqGrid('getRowData',ids[index]);
		       if(admincodetemp.indexOf(rowData.uuid_Zsgp) < 0) {
		          admincodetemp.push(rowData.uuid_Zsgp);
		       }
		    } 
		    var curWwwPath = window.document.location.href;
			var pathname = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathname);
			var localhostPath = curWwwPath.substring(0, pos);
			// 获取项目名
			var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1); 
			var url=localhostPath + projectName + '/report/ReportPcZsgp'; 
			var admincode=admincodetemp.join(',');
			$.ajax({
	            type: "POST",
	            url: url,
	            data:{uuidyxs:admincode},
	            contentType:'application/x-www-form-urlencoded',
	            dataType: "json",
	            success: function(data){ 
	             if(data!=null && data!='')
	             {
	            	var location = localhostPath + projectName +"/reportResult/"+data; 
					// 下载文件
				    var $form = $('<form method="GET"></form>');
				    $form.attr('action', location);
				    $form.appendTo($('body'));
				    $form.submit();
				    layer.close(indexExport);
				    layer.msg('导出成功!'); 
	              }
	            }
	        }); 
	}
	 
}); 
 
 
$("#miaopuExport").click(function(){  
	var ids = $("#miaopu").jqGrid('getGridParam','selarrrow');
	console.log(ids);
	if (ids==null || ids.length==0) {
		 alert("请选择需要导出的数据！"); 
	} 
	else
	{
		 var indexExport = layer.load(0);
		  var admincodetemp=[];
		   for(var index=0;index<ids.length;index++){
		       var rowData = $("#miaopu").jqGrid('getRowData',ids[index]);
		       if(admincodetemp.indexOf(rowData.uuid_Mp) < 0) {
		          admincodetemp.push(rowData.uuid_Mp);
		       }
		    } 
		    var curWwwPath = window.document.location.href;
			var pathname = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathname);
			var localhostPath = curWwwPath.substring(0, pos);
			// 获取项目名
			var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1); 
			var url=localhostPath + projectName + '/report/ReportPcMp'; 
			var admincode=admincodetemp.join(','); 
			$.ajax({
	            type: "POST",
	            url: url,
	            data:{uuidyxs:admincode},
	            contentType:'application/x-www-form-urlencoded',
	            dataType: "json",
	            success: function(data){ 
	             if(data!=null && data!='')
	             {
	            	var location = localhostPath + projectName +"/reportResult/"+data; 
					// 下载文件
				    var $form = $('<form method="GET"></form>');
				    $form.attr('action', location);
				    $form.appendTo($('body'));
				    $form.submit();
				    layer.close(indexExport);
				    layer.msg('导出成功!'); 
	              }
	            }
	        }); 
	}
	 
}); 

$("#jianyiExport").click(function(){  
	var ids = $("#jianyi").jqGrid('getGridParam','selarrrow');
	console.log(ids);
	if (ids==null || ids.length==0) {
		 alert("请选择需要导出的数据！"); 
	} 
	else
	{
		    var indexExport = layer.load(0);
		    var admincodetemp=[];
	        for(var index=0;index<ids.length;index++){
	          var rowData = $("#jianyi").jqGrid('getRowData',ids[index]);
	          if(admincodetemp.indexOf(rowData.uuid_Jyx) < 0) {
	             admincodetemp.push(rowData.uuid_Jyx);
	           }
	         } 
		    var curWwwPath = window.document.location.href;
			var pathname = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathname);
			var localhostPath = curWwwPath.substring(0, pos);
			// 获取项目名
			var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1); 
			var url=localhostPath + projectName + '/report/ReportPcJyx'; 
			var admincode=admincodetemp.join(',');
			$.ajax({
	            type: "POST",
	            url: url,
	            data:{uuidyxs:admincode},
	            contentType:'application/x-www-form-urlencoded',
	            dataType: "json",
	            success: function(data){ 
	             if(data!=null && data!='')
	             {
	            	var location = localhostPath + projectName +"/reportResult/"+data; 
					// 下载文件
				    var $form = $('<form method="GET"></form>');
				    $form.attr('action', location);
				    $form.appendTo($('body'));
				    $form.submit();
				    layer.close(indexExport);
				    layer.msg('导出成功!');
	              }
	            }
	        }); 
	}
	 
}); 

/**************************有害生物普查完********************************/ 


/**************************有害生物详查********************************/
//标准地详查          yhswxc_bzd_bhdc   uuid_Bzd
$("#bzdxcExport").click(function(){  
	var ids = $("#xiangcha").jqGrid('getGridParam','selarrrow');
	console.log(ids);
	if (ids==null || ids.length==0) {
		 alert("请选择需要导出的数据！"); 
	} 
	else
	{
		    var indexExport = layer.load(0);
		    var admincodetemp=[];
	        for(var index=0;index<ids.length;index++){
	          var rowData = $("#xiangcha").jqGrid('getRowData',ids[index]);
	          if(admincodetemp.indexOf(rowData.uuid_Bzd) < 0) {
	             admincodetemp.push(rowData.uuid_Bzd);
	           }
	         } 
		    var curWwwPath = window.document.location.href;
			var pathname = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathname);
			var localhostPath = curWwwPath.substring(0, pos);
			// 获取项目名
			var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1); 
			var url=localhostPath + projectName + '/report/yhswxc_bzd_bhdc'; 
			var admincode=admincodetemp.join(',');
			$.ajax({
	            type: "POST",
	            url: url,
	            data:{uuidyxs:admincode},
	            contentType:'application/x-www-form-urlencoded',
	            dataType: "json",
	            success: function(data){ 
	             if(data!=null && data!='')
	             {
	            	var location = localhostPath + projectName +"/reportResult/"+data; 
					// 下载文件
				    var $form = $('<form method="GET"></form>');
				    $form.attr('action', location);
				    $form.appendTo($('body'));
				    $form.submit();
				    layer.close(indexExport);
				    layer.msg('导出成功!');
	              }
	            }
	        }); 
	}
	 
}); 

//病害防后调查表（标准地调查汇总表）         yhswxc_bzd_bhhz_fh   uuid_Bzd

//虫害防后调查表（标准地调查汇总表）         yhswxc_bzd_chhz_fh   uuid_Bzd

//鼠害防后调查表（标准地调查汇总表）         yhswxc_bzd_shhz_fh   uuid_Bzd
$("#fhbzdhzExport").click(function(){ 
    var title=$("#fhbzdhzExport").attr("title");  
    var ids =null;
    var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	var localhostPath = curWwwPath.substring(0, pos);
		// 获取项目名
		var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1); 
		var admincodetemp=[];
    var url=localhostPath + projectName + '/report/yhswxc_bzd_bhhz_fh'; 
    if(title=="导出病害防后汇总报表"){
   	 ids = $("#binghai1").jqGrid('getGridParam','selarrrow'); 
   	for(var index=0;index<ids.length;index++){
        var rowData = $("#binghai1").jqGrid('getRowData',ids[index]);
        if(admincodetemp.indexOf(rowData.uuid_Bzd) < 0) {
           admincodetemp.push(rowData.uuid_Bzd);
         }
       }  
   	 url=localhostPath + projectName + '/report/yhswxc_bzd_bhhz_fh'; 
   		if (ids==null || ids.length==0) {
   			 alert("请选择需要导出的数据！"); 
   			 return;
   		} 
    }else if(title=="导出虫害防后汇总报表"){
   	  ids = $("#chonghai2").jqGrid('getGridParam','selarrrow');
   	   for(var index=0;index<ids.length;index++){
        var rowData = $("#chonghai2").jqGrid('getRowData',ids[index]);
        if(admincodetemp.indexOf(rowData.uuid_Bzd) < 0) {
           admincodetemp.push(rowData.uuid_Bzd);
         }
       }  
   	  url=localhostPath + projectName + '/report/yhswxc_bzd_bhhz_fh'; 
   		if (ids==null || ids.length==0) {
   			 alert("请选择需要导出的数据！"); 
   			 return;
   		} 
    }else{
   	  ids = $("#shuhai3").jqGrid('getGridParam','selarrrow'); 
    	for(var index=0;index<ids.length;index++){
        var rowData = $("#shuhai3").jqGrid('getRowData',ids[index]);
        if(admincodetemp.indexOf(rowData.uuid_Bzd) < 0) {
           admincodetemp.push(rowData.uuid_Bzd);
         }
       }  
   	  url=localhostPath + projectName + '/report/yhswxc_bzd_shhz_fh'; 
   		if (ids==null || ids.length==0) {
   			 alert("请选择需要导出的数据！"); 
   			 return;
   		} 
    } 
	{
		    var indexExport = layer.load(0); 
			var admincode=admincodetemp.join(',');
			$.ajax({
	            type: "POST",
	            url: url,
	            data:{uuidyxs:admincode},
	            contentType:'application/x-www-form-urlencoded',
	            dataType: "json",
	            success: function(data){ 
	             if(data!=null && data!='')
	             {
	            	var location = localhostPath + projectName +"/reportResult/"+data; 
					// 下载文件
				    var $form = $('<form method="GET"></form>');
				    $form.attr('action', location);
				    $form.appendTo($('body'));
				    $form.submit();
				    layer.close(indexExport);
				    layer.msg('导出成功!');
	              }
	            }
	        }); 
	}
	 
});


//病害防前调查表（标准地调查汇总表）        yhswxc_bzd_bhhz_fq   uuid_Bzd

//虫害防前调查表（标准地调查汇总表）        yhswxc_bzd_chhz_fq   uuid_Bzd

//鼠害防前调查表（标准地调查汇总表）         yhswxc_bzd_shhz_fq   uuid_Bzd
$("#fqbzdhzExport").click(function(){ 
    var title=$("#fqbzdhzExport").attr("title"); 
    var ids =null;
    var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	var localhostPath = curWwwPath.substring(0, pos);
		// 获取项目名
		var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1); 
		var admincodetemp=[];
    var url=localhostPath + projectName + '/report/yhswxc_bzd_bhhz_fq'; 
    if(title=="导出病害防前汇总报表"){
   	 ids = $("#binghai").jqGrid('getGridParam','selarrrow'); 
   	for(var index=0;index<ids.length;index++){
        var rowData = $("#binghai").jqGrid('getRowData',ids[index]);
        if(admincodetemp.indexOf(rowData.uuid_Bzd) < 0) {
           admincodetemp.push(rowData.uuid_Bzd);
         }
       }  
   	 url=localhostPath + projectName + '/report/yhswxc_bzd_bhhz_fq'; 
   		if (ids==null || ids.length==0) {
   			 alert("请选择需要导出的数据！"); 
   			 return;
   		} 
    }else if(title=="导出虫害防前汇总报表"){
   	  ids = $("#chonghai").jqGrid('getGridParam','selarrrow');
   	   for(var index=0;index<ids.length;index++){
        var rowData = $("#chonghai").jqGrid('getRowData',ids[index]);
        if(admincodetemp.indexOf(rowData.uuid_Bzd) < 0) {
           admincodetemp.push(rowData.uuid_Bzd);
         }
       }  
   	  url=localhostPath + projectName + '/report/yhswxc_bzd_bhhz_fq'; 
   		if (ids==null || ids.length==0) {
   			 alert("请选择需要导出的数据！"); 
   			 return;
   		} 
    }else{
   	    ids = $("#shuhai").jqGrid('getGridParam','selarrrow'); 
    	for(var index=0;index<ids.length;index++){
        var rowData = $("#shuhai").jqGrid('getRowData',ids[index]);
        if(admincodetemp.indexOf(rowData.uuid_Bzd) < 0) {
           admincodetemp.push(rowData.uuid_Bzd);
         }
       }  
   	  url=localhostPath + projectName + '/report/yhswxc_bzd_bhhz_fq'; 
   		if (ids==null || ids.length==0) {
   			 alert("请选择需要导出的数据！"); 
   			 return;
   		} 
    } 
	{
		    var indexExport = layer.load(0); 
			var admincode=admincodetemp.join(','); 
			$.ajax({
	            type: "POST",
	            url: url,
	            data:{uuidyxs:admincode},
	            contentType:'application/x-www-form-urlencoded',
	            dataType: "json",
	            success: function(data){ 
	             if(data!=null && data!='')
	             {
	            	var location = localhostPath + projectName +"/reportResult/"+data; 
					// 下载文件
				    var $form = $('<form method="GET"></form>');
				    $form.attr('action', location);
				    $form.appendTo($('body'));
				    $form.submit();
				    layer.close(indexExport);
				    layer.msg('导出成功!');
	              }
	            }
	        }); 
	}
	 
});


// 林业有害生物防治防前防后调查表    ReportXcFzFqfh   xuHao
$("#fanqianfanhouExport").click(function(){  
	var ids = $("#fangzong").jqGrid('getGridParam','selarrrow');
	console.log(ids);
	if (ids==null || ids.length==0) {
		 alert("请选择需要导出的数据！"); 
	} 
	else
	{
		    var indexExport = layer.load(0);
		    var admincodetemp=[];
	        for(var index=0;index<ids.length;index++){
	          var rowData = $("#fangzong").jqGrid('getRowData',ids[index]);
	          if(admincodetemp.indexOf(rowData.xuHao) < 0) {
	             admincodetemp.push(rowData.xuHao);
	           }
	         } 
		    var curWwwPath = window.document.location.href;
			var pathname = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathname);
			var localhostPath = curWwwPath.substring(0, pos);
			// 获取项目名
			var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1); 
			var url=localhostPath + projectName + '/report/ReportXcFzFqfh'; 
			var admincode=admincodetemp.join(',');
			$.ajax({
	            type: "POST",
	            url: url,
	            data:{uuidyxs:admincode},
	            contentType:'application/x-www-form-urlencoded',
	            dataType: "json",
	            success: function(data){ 
	             if(data!=null && data!='')
	             {
	            	var location = localhostPath + projectName +"/reportResult/"+data; 
					// 下载文件
				    var $form = $('<form method="GET"></form>');
				    $form.attr('action', location);
				    $form.appendTo($('body'));
				    $form.submit();
				    layer.close(indexExport);
				    layer.msg('导出成功!');
	              }
	            }
	        }); 
	}
	 
});

/**************************有害生物详查wa********************************/
//成灾面积调查表
$("#chzaimjdcExport").click(function(){  
	var ids = $("#chengzai").jqGrid('getGridParam','selarrrow');
	console.log(ids);
	if (ids==null || ids.length==0) {
		 alert("请选择需要导出的数据！"); 
	} 
	else
	{
		    var indexExport = layer.load(0);
		    var admincodetemp=[];
	        for(var index=0;index<ids.length;index++){
	          var rowData = $("#chengzai").jqGrid('getRowData',ids[index]);
	          console.log(rowData);
	          if(admincodetemp.indexOf(rowData.uuid_Czd) < 0) {
	             admincodetemp.push(rowData.uuid_Czd);
	           }
	         } 
		    var curWwwPath = window.document.location.href;
			var pathname = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathname);
			var localhostPath = curWwwPath.substring(0, pos);
			// 获取项目名
			var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1); 
			var url=localhostPath + projectName + '/report/yhswxc_czmjdcb'; 
			var admincode=admincodetemp.join(','); 
			$.ajax({
	            type: "POST",
	            url: url,
	            data:{uuidyxs:admincode},
	            contentType:'application/x-www-form-urlencoded',
	            dataType: "json",
	            success: function(data){ 
	             if(data!=null && data!='')
	             {
	            	var location = localhostPath + projectName +"/reportResult/"+data; 
					// 下载文件
				    var $form = $('<form method="GET"></form>');
				    $form.attr('action', location);
				    $form.appendTo($('body'));
				    $form.submit();
				    layer.close(indexExport);
				    layer.msg('导出成功!');
	              }
	            }
	        }); 
	}
	 
});
