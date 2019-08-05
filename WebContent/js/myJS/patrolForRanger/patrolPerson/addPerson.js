var index = -1;
//图片上传预览    IE是用了滤镜。
function previewImage(file) {
	var MAXWIDTH = 130;
	var MAXHEIGHT = 155;
	var div = document.getElementById('preview');
	
	if (file.files && file.files[0]) {
		//div.innerHTML = '<img id=imghead onclick=$("#previewImg").click()>';
		div.innerHTML = '<div id=delSpan><span id=delImg></span></div><img id=imghead>';
		var img = document.getElementById('imghead');
		img.onload = function() {
			var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth,
					img.offsetHeight);
			//img.width = rect.width;
			//img.height = rect.height;
			img.width = 130;
			img.height = 155;
			// img.style.marginLeft = rect.left+'px';
			img.style.marginTop = rect.top + 'px';
		}
		var reader = new FileReader();
		reader.onload = function(evt) {
			img.src = evt.target.result;
		}
		reader.readAsDataURL(file.files[0]);
	} else // 兼容IE
	{
		var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
		file.select();
		var src = document.selection.createRange().text;
		div.innerHTML = '<img id=imghead>';
		var img = document.getElementById('imghead');
		img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
		var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth,
				img.offsetHeight);
		status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
		div.innerHTML = "<div id=divhead style='width:" + rect.width
				+ "px;height:" + rect.height + "px;margin-top:" + rect.top
				+ "px;" + sFilter + src + "\"'></div>";
	}
}
function clacImgZoomParam(maxWidth, maxHeight, width, height) {
	var param = {
		top : 0,
		left : 0,
		width : width,
		height : height
	};
	if (width > maxWidth || height > maxHeight) {
		rateWidth = width / maxWidth;
		rateHeight = height / maxHeight;

		if (rateWidth > rateHeight) {
			param.width = maxWidth;
			param.height = Math.round(height / rateWidth);
		} else {
			param.width = Math.round(width / rateHeight);
			param.height = maxHeight;
		}
	}
	param.left = Math.round((maxWidth - param.width) / 2);
	param.top = Math.round((maxHeight - param.height) / 2);
	return param;
}

/**
 * 
 * 获取当前日期
 */
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

$("#idcode").blur(function(){
 	//var idcode = $("#idcode").val();
 	var idStr=$("#idcode").val();
	var idcode = $.trim(idStr)
		if(idcode != null && idcode != ""){  
	        if(idcode.length == 15){  
	        	birthday = "19"+idcode.substr(6,6); 
	        } else if(idcode.length == 18){  
	        	birthday = idcode.substr(6,8);  
	        }    
	        birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
	        $("#birthday").val(birthday);
	    }
		else if(idcode.length != 15 ||idcode.length != 18){
			 $("#birthday").val("");
		}
});
$("#birthday").click(function(){
	if($("#birthday").val() == ""){
			top.layer.msg("请输入身份证号");	
	}
});
var cookie_department = localStorage.getItem('cookie_department');
cookie_department = cookie_department
		.substring(0, cookie_department.length - 1);
// 每个单位id-名称
eachDepart = cookie_department.split("&");
for (var i = 0; i < eachDepart.length; i++) {
	var eachDep = eachDepart[i].split("-");
	if(eachDep[0] != "0"){
		$("#departmentVal").append("<option value='" + eachDep[0] + "'>" + eachDep[1] + "<oprion>")
	}
}

var myDate = getNowFormatDate();
$("#employDate").val(myDate);

laydate.render({
	elem : '#contractDateBegin' // 指定元素
	,
	showBottom : false
});
laydate.render({
	elem : '#contractDateEnd' // 指定元素
	,
	showBottom : false
});
var clicktag = 0;

$("#nationalityTd").off().click(function(){
	if(index == -1){
		layui.use('layer', function(){
			  var layer = layui.layer;
		          index  = layer.open({
		        	  title:false,
		        	  area:'275px',
		        	  offset:['60px','435px'],
		        	  btn:0,
		        	  closeBtn:2,
		        	  shade:0,
		        	  content : '<div id="nationalityDiv" style="padding-top:5px;"></div>',
		        	  success:function(layero,index){
		        		  $.getJSON("/ResourceMonitor/json/nation.json", function(data) {
								for(i in data.sites){
									//alert(data.sites[i])
									$("#nationalityDiv").append("<label class='nationalitylabel' value='"+data.sites[i]+"' id='"+data.sites[i]+"'>"+data.sites[i]+"</label>");
									if($("#nationality").val() == data.sites[i]){
										$("label[id='"+data.sites[i]+"']").css("background-color","#83B3DB");
									}
								}
								if($("#nationalityDiv").height() > 345){
									 layer.style(index, {
										 width:'285px',
										 height: '360px',
										 //padding:'0'
									}); 
								 }
							});
		        	  },
		        	  end: function(){ 
		        		  index = -1 ;
		        	  } 
		  })
	});
	}else{
		 top.layer.msg(' 当前窗口已打开！');
	}
	
});
$(document).on('click', '.nationalitylabel', function() {
		//
		if($(this).attr("id") != $("#nationality").val()){
			$(".nationalitylabel").css("background-color","");
			$(this).css("background-color","#83B3DB");
			//$("#nationality").val($(this).attr("id"));
			$("#nationality").val($(this).text());
			//layer.close(index);
		}	 
});

$("#preview").mouseover(function(){
	$("#delSpan").height(30);
	//$("#delSpan").animate({ height:'30px'});
});
$("#preview").mouseout(function(){
	//console.log(1);
	//$("#delSpan").animate({ height:'0px'});
	$("#delSpan").height(0)
});
$(document).on('mouseenter', '#delImg', function() {
	$("#delImg").css("background","url(/ResourceMonitor/images/indexpage/delete.png)  no-repeat")
});
$(document).on('mouseout', '#delImg', function() {
	$("#delImg").css("background","url(/ResourceMonitor/images/indexpage/Whitedelete.png)  no-repeat")
});
$(document).on('click', '#delImg', function() {
	var div = document.getElementById('preview');
	div.innerHTML = '<img id=imghead border=0 src="/ResourceMonitor/images/photo_icon.png" width="130" height="155" onclick=$("#previewImg").click()>';
	/*
	var file_obj = document.getElementById('previewImg').files[0];
	file_obj.name = "";*/
	$("#previewImg").val("");
});
/**
 * **********************************************************
 * 
 * 文件上传
 * 
 * 
 * ********************************************************
 */
function uploadFile(identifyPhoto) {
	var file_obj = document.getElementById('previewImg').files[0];
	
	var fd = new FormData();
	
	fd.append('pdfFile', file_obj);
	fd.append('newName', identifyPhoto);
	
	$.ajax({
		url : '/ResourceMonitor/file/upload_identifyPhoto',
		type : 'POST',
		data : fd,
		processData : false, //tell jQuery not to process the data
		contentType : false, //tell jQuery not to set contentType
		//这儿的三个参数其实就是XMLHttpRequest里面带的信息。
		success : function(resp) {
			
		}
	});
}