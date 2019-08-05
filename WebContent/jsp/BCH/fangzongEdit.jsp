    <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="JqgridInclude.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>标准地详查编辑</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/js/layer/layui/css/layui.css" media="all">
 <script src="${pageContext.request.contextPath}/js/layer/layui/layui.js"></script>
<style type="text/css">
.input{
	/* width: '10%'; */
	/* margin-top: 0.5%; */
	/* display: block; */
	margin-left:0.8%
	display:inline-block
    width: 20%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.selectpicker{
margin-left: 0.5%;

}
.layui-form-label{
	width: 125px;
}
.layui-form-item{
	margin-top: -15px;
}
.layui-form-item{
	margin-top: -15px;
}
</style>
</head>
<body>
	<div class="layui-form">
	<div class="layui-form-item" style="margin-top: 10px">
    <div class="layui-inline">
      <label class="layui-form-label">序&emsp;&emsp;&emsp;号</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="xuhao" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">地点</label>
      <div class="layui-input-inline">
       <!--  <input type="text" name="email" id="didian" lay-verify="email" autocomplete="off" class="layui-input"> -->
     	<select id="didian"></select>
      </div>
    </div>
 	 </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">监测对象</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="jiancedx" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">样地号</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="yangdihao" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
 	  <div class="layui-inline">
      <label class="layui-form-label">调查株数(防前)</label>
      <div class="layui-input-inline">
        <input type="text" id="diaochazs" name="email" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">虫口密度感病株率(防前)</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="ganbingzlq" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
 	 <div class="layui-inline">
      <label class="layui-form-label">调查时间(防前)</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="diaochasjq"  autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">调查株数(防后)</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="diaochazsh"  autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
 	 <div class="layui-inline">
      <label class="layui-form-label">虫口密度感病株率(防后)</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="ganbingzlh"  autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">调查时间(防后)</label>
      <div class="layui-input-inline">
        <input type="text" name="phone" id="diaochasjh"  autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">备&emsp;&emsp;&emsp;注</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="beizhu" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
   <div class="layui-input-inline" style="margin-left: 65%;margin-top: 5%">
	   <button type="button" onclick="sure()" class="layui-btn">确定</button>
   </div>
	<div class="layui-input-inline" style="margin-left: 5%;margin-top: 5%">
	   <button type="button" class="layui-btn">重置</button>
    </div>
		<script type="text/javascript">
		// 获取路径
		var curWwwPath = window.document.location.href;
		var pathname = window.document.location.pathname;
		var pos = curWwwPath.indexOf(pathname);
		var localhostPath = curWwwPath.substring(0, pos);
		// 获取项目名
		var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
		var uuid_Bzd;
			function parameter(param) {
				uuid_Bzd = param.uuid_Bzd;
				layui.use(['laydate','form'], function(){
					  var form=layui.form;
					  var laydate = layui.laydate;
					  //执行一个laydate实例
					  laydate.render({
					    elem: '#diaochasjq', //指定元素
					  });
					  laydate.render({
						elem: '#diaochasjh', //指定元素
					});
					  form.render();
				});
				//序号
				$("#xuhao").val(param.xu_Hao);
				//地点
				/* $("#didian").val(param.xian_Mc); */
				//样地号
				$("#yangdihao").val(param.yangdi_H);
				//监测对象
				$("#jiancedx").val(param.yhsw_Mc);
				//调查株数
				$("#diaochazs").val(param.zhushu_Fq);
				//防前调查虫口密度感病株率
				$("#ganbingzlq").val(param.zhulv_Fq);
				//调查时间
				$("#diaochasjq").val(param.dcsj_Fq);
				//调查株数
				$("#diaochazsh").val(param.zhushu_Fh);
				//防后调查虫口密度感病株率
				$("#ganbingzlh").val(param.zhulv_Fh);
				//调查时间
				$("#diaochasjh").val(param.dcsj_Fh);
				//备注
				$("#beizhu").val(param.bei_Zhu);
				  $.ajax({
						url : localhostPath + projectName + '/datalib/xingzhengquhua ',
						type : 'POST',
						dataType : 'json',
						data : {
						},
						success : function(res) {
							console.log(res)
						 var msg = res.rows;
							for (var i = 0; i < msg.length; i++) {
								/* if(msg[i].ji_Bie=="4"){
									if(param.xiang_Mc == msg[i].name){
										$("#xiang").append( "<option selected value='" + msg[i].code + "'>" + msg[i].name + "</option>");
									}else{
										$("#xiang").append( "<option value='" + msg[i].code + "'>" + msg[i].name + "</option>");
									}
								} */
								if(msg[i].ji_Bie=="3"){
									if(param.xian_Mc == msg[i].name){
										$("#didian").append( "<option selected value='" + msg[i].code + "'>" + msg[i].name + "</option>");
									}else{
										$("#didian").append( "<option value='" + msg[i].code + "'>" + msg[i].name + "</option>");
									}
									
								}
							}
						}
					});
			}
		function sure() {
			var xuhao = $("#xuhao").val();
			var xian = $("#didian").val();
			var xianMc = $("#didian option:selected").text(); //获取选中的项
			var xiang = "乡镇"
			var xiangMc = "1234";
			var cun = "林班";
			var xiaoban = "小班";
			var yangdi_h = $("#yangdihao").val();
			var didian_jd = "经度";    
			var didian_wd = "纬度";
			var yhsw_mc = "有害生物名称";
			var zhushu_fq = $("#diaochazs").val();
			var zhulv_fq = $("#ganbingzlq").val();
			var dcsj_fq = $("#diaochasjq").val();
			var zhushu_fh = $("#diaochazsh").val();
			var zhulv_fh = $("#ganbingzlh").val();
			var dcsj_fh = $("#diaochasjh").val();
			var bei_zhu = $("#beizhu").val();
			$.ajax({
				url : localhostPath + projectName + '/fqfhdc/updateZB',
				type : 'POST',
				dataType : 'json',
				data : {
					 'xu_hao' : xuhao,    
					 'xian' : xian,   
					 'xian_mc' : xianMc,   
					 'xiang' : xiang,    
					 'xiang_mc' : xiangMc,    
					 'cun': cun,    
					 'xiao_ban' :xiaoban,   
					 'yangdi_h' : yangdi_h,    
					 'didian_jd' : didian_jd,    
					 'didian_wd' : didian_wd,    
					 'yhsw_mc' : yhsw_mc,    
					 'zhushu_fq' : zhushu_fq,    
					 'zhulv_fq' : zhulv_fq,    
					 'dcsj_fq' : dcsj_fq,    
					 'zhushu_fh' : zhushu_fh,    
					 'zhulv_fh' : zhulv_fh,    
					 'dcsj_fh' : dcsj_fh,    
					 'bei_zhu' : bei_zhu,   
					 'uuid_bzd' : uuid_Bzd
				},
				success : function(res) {
					console.log(res)
					if(res.msg=="修改成功"){
					layer.msg('修改成功', { icon: 1 });
					}
				}
			})
		}
		</script>
</body>
</html>