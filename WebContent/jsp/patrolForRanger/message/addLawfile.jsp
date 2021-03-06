<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/jsp/include/JqgridInclude.jsp"%>
<%@ include file="/jsp/include/LaytableInclude.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<style type="text/css">
.form-control {
	height: 27px;
	font-size: 15px;
	padding:0 0 1px 5px;
    margin-bottom: 3px;
	text-align:center
}
.panel-default{
	width: 380px;
    height: 220px;
    margin: 15px auto;
    align: center;
    margin-bottom: 0;
}
.file {
    position: relative;
    left:100px;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 25px;
    width:150px;
    text-align:center;
}
.file input {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #058563;
    border-color: #058563;
    color: #fff;
    text-decoration: none;
}
.table{
	margin: 15px auto;
	width:90%;
}
#table td{
	border:0;
}
#fileName,#fileType{
	cursor:not-allowed;
	background-color:transparent;
}
</style>
<title>Insert title here</title>
</head>
<body>
	<div class="panel panel-default">
    	<div class="panel-body">
    		<div style="left: 150px; color: red; text-align: center; margin-top: 2%;margin-bottom:4%;">
				<strong>pdf文件,大小不超过10Mb</strong>
			</div>
        	<div class="file">选择文件
   	 			<input type="file" id="pdfFile" name="file" class="form-control" accept="application/pdf">
			</div>
			<form class="form-inline" id="formDiv">
  				<div class="form-group" style="margin-top: 10px;">
    				<label for="fileName">文件名</label>
    				<input id="fileName" class="form-control showFileName" style="width:300px;display: inline;" readonly />
  				</div>
  				<div class="form-group" style="margin-top: 10px;margin-bottom:0">
    				<label for="fileCode">文&emsp;号</label>
    				<input id="fileCode" class="form-control" style="width:300px;display: inline;margin-bottom:10px;" />
  				</div>
  			</form>
			<div class="fileerrorTip" style="display:none;color:red;margin-left: 45px;font-size:15px;"></div>
   		</div>
	</div>
	<script type="text/javascript">
	$(function() {
		$(".file").on("change","input[type='file']",function(){
			
		    var filePath=$(this).val();
		    if(filePath.indexOf("pdf")!=-1){
		        $(".fileerrorTip").html("").hide();
		        var arr=filePath.split('\\');
		        var fileName=arr[arr.length-1];
		        $(".showFileName").val(fileName);
		        $(".showFileName").attr('title',fileName);
		    }else{
		    	$(".showFileName").attr('title','');
		        $(".showFileName").val("");
		        $(".fileerrorTip").html("您上传文件类型有误！请重新选择").show();
		        return false 
		    }
		})
		$("#fileCode").on("change",function(){
			var fileCode = $("#fileCode").val();
			if(fileCode){
				$(".fileerrorTip").html("").hide();
			}
		})
	});
		function uploadFile() {
			
			var file_obj = document.getElementById('pdfFile').files[0];
			var fileCode = $("#fileCode").val();
			if(!file_obj){
				$(".fileerrorTip").html("").hide();
				$(".showFileName").val("");
		        $(".fileerrorTip").html("您未上传文件，或者您上传文件类型有误！").show();
			}else if(!fileCode){
				$(".fileerrorTip").html("").hide();
		        $(".fileerrorTip").html("请输入文号！").show();
			}else{
				var fileName = file_obj.name;	
				var fileType = 0; 
				var uploader = getCookie("cookie_logingUser");
				var uploadTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
				
				var fd = new FormData();
				fd.append('username', 'root')
				fd.append('pdfFile', file_obj);
				$.ajax({
					url : '/ResourceMonitor/file/springUpload',
					type : 'POST',
					data : fd,
					processData : false, //tell jQuery not to process the data
					contentType : false, //tell jQuery not to set contentType
					//这儿的三个参数其实就是XMLHttpRequest里面带的信息。
					success : function(resp) {
						if (resp.msg == "上传成功") {
							//top.document.getElementById('mapFrame').contentWindow.document.getElementById('law').contentWindow.finishUpload(fileName,fileCode,fileType,uploader,uploadTime);
							finishUpload(fileName,fileCode,fileType,uploader,uploadTime);
						}
					}
				});
			}	
		}
		
		
		function getCookie(name) 
		{ 
		    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		 
		    if(arr=document.cookie.match(reg))
		 
		        return unescape(arr[2]); 
		    else 
		        return null; 
		}
		
		
		
		// 对Date的扩展，将 Date 转化为指定格式的String
		// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
		// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
		// 例子：
		// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
		// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18

		Date.prototype.Format = function (fmt) { // author: meizz
		    var o = {
		        "M+": this.getMonth() + 1, // 月份
		        "d+": this.getDate(), // 日
		        "h+": this.getHours(), // 小时
		        "m+": this.getMinutes(), // 分
		        "s+": this.getSeconds(), // 秒
		       
		        "S": this.getMilliseconds() // 毫秒
		    };
		    if (/(y+)/.test(fmt))
		        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		    for (var k in o)
		        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		            return fmt;
		}
	</script>
</body>
</html>