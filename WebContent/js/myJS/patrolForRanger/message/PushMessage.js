
$(function() {
	var E = window.wangEditor
    var editor = new E('#editor');
	 editor.customConfig.onfocus = function () {
	    $(".w-e-text p:first").remove();
	 }
	 editor.customConfig.onblur = function (html) {
		 	var html = editor.txt.html()
	       if(html == "<p><br></p>"){
	    	   $(".w-e-text").prepend("<p>请输入内容...</p>");
	       }
	 }
    // 或者 var editor = new E( document.getElementById('editor') )
	 editor.customConfig.menus = [
		 	'head',  // 标题
		    'bold',  // 粗体
		    'fontSize',  // 字号
		    'fontName',  // 字体
		    'italic',  // 斜体
		    // 'link',  // 插入链接
		    'list',  // 列表
		    'justify',  // 对齐方式
		    //'quote',  // 引用
		    //'image',  // 插入图片
		    'table',  // 表格
		    //'video',  // 插入视频
		    //'code',  // 插入代码
		    'undo',  // 撤销
		    'redo'  // 重复s
    ];
    editor.create();
    var textHeight = $(document).height()-70;
    $(".w-e-text-container").height(textHeight);
    
    $("#close").on('click', function() {
    	parent.closeLayer();
    });
    $("#Send").on('click', function() {
    	// do something
		// 文件名
		var fileName = $('#fileName').val();
		// 发布内容
		var fileText = $('.w-e-text').html();
		// 发布者
		var uploader = localStorage.getItem('cookie_logingUser');
		// 发布时间
		var uploadTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
		
		if(fileName == ""){
			top.layer.msg("标题不能为空!");
		}else if(fileText == "<p><br></p>" || fileText.indexOf('请输入') > -1){
			top.layer.msg("内容不能为空!");
		}else{
			$.ajax({
				url : '/ResourceMonitor/notice/addNew', // 请求的url地址
				dataType : "json", // 返回格式为json
				async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
				data : {
					fileName : fileName,
					fileText : fileText,
					uploader : uploader,
					uploadTime : uploadTime
				}, // 参数值
				type : "POST", // 请求方式
				beforeSend : function() {
					// 请求前的处理
				},
				success : function(req) {
					// 请求成功时处理
					// 关闭弹窗
					// 提示
					top.layer.msg(req.msg);
				},
				complete : function() {
					// 请求完成的处理
				},
				error : function() {
					// 请求出错处理
				}
			});
			parent.closeLayer();
		}
		
    }); 
});
$(window).resize(function() {
	textHeight = $(document).height()-70;
    $(".w-e-text-container").height(textHeight);
});

Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒

		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

//editor.txt.clear()
