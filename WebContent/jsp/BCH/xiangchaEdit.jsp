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
	width: 120px;
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
      <label class="layui-form-label">县&emsp;&emsp;</label>
      <div class="layui-input-inline">
       <!--  <input type="tel" name="phone" id="xian" lay-verify="required|phone" autocomplete="off" class="layui-input"> -->
      	<select id="xian" style="width: 100px">
      				
      	</select>
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">乡&emsp;&emsp;</label>
      <div class="layui-input-inline">
      <!--   <input type="text" name="email" id="xiang" lay-verify="email" autocomplete="off" class="layui-input"> -->
      	<select id="xiang" style="width: 100px">
      				
      	</select>
      </div>
    </div>
 	 </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">林&emsp;&emsp;&emsp;班</label>
      <div class="layui-input-inline">
        <input type="text"  name="phone" id="linban" lay-verify="required|text" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">样地号</label>
      <div class="layui-input-inline">
        <input class="layui-input" onkeyup="value=change(this.value)" maxlength="7" lay-verify="required|number" id="yangdihao" name="email"  autocomplete="off" >
      </div>
    </div>
 	 </div>
 	 <div class="layui-form">
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">小&emsp;&emsp;&emsp;班</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="xiaoban" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">有害生物种类</label>
      <div class="layui-input-inline">
      <!--   <input type="text" name="email" id="youhaizl" lay-verify="email" autocomplete="off" class="layui-input"> -->
        <select id="youhaizl" style="width: 100px">
      				
      	</select>
      </div>
    </div>
 	 </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">防前调查时间</label>
      <div class="layui-input-inline">
        <input type="text" name="phone" id="beforetime"  autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">防后调查时间</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="lasttime"  autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">经&emsp;&emsp;&emsp;度</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="jingdu" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
      <div class="layui-inline">
      <label class="layui-form-label">纬&emsp;&emsp;&emsp;度</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="weidu" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">标准地面积</label>
      <div class="layui-input-inline">
        <input  id="dimj" class="layui-input" onkeyup="value=change(this.value)" maxlength="7" lay-verify="required|number" autocomplete="off" >
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">样方数</label>
      <div class="layui-input-inline">
        <input  id="yangfangsl" class="layui-input" onkeyup="value=change(this.value)" maxlength="7" lay-verify="required|number"  autocomplete="off" >
      </div>
    </div>
 	 </div>
 	  <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">备注</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="beizhu" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">调查人</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="diaochary" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
    <div class="layui-input-inline" style="margin-left: 65%;margin-top: 5%">
    <button type="button" onclick="sure()" class="layui-btn">确定</button>
      </div>
      <div class="layui-input-inline" style="margin-left: 5%;margin-top: 5%">
    <button type="button" class="layui-btn">重置</button>
      </div>
	<script>
		// 获取路径
		var curWwwPath = window.document.location.href;
		var pathname = window.document.location.pathname;
		var pos = curWwwPath.indexOf(pathname);
		var localhostPath = curWwwPath.substring(0, pos);
		// 获取项目名
		var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
		var uuid_Bzd;
		var yhsw_lb;
		function parameter(param) {
			uuid_Bzd = param.uuid_Bzd;
			layui.use(['laydate','form'], function(){
				  var form=layui.form;
				  var laydate = layui.laydate;
				  //执行一个laydate实例
				  laydate.render({
				    elem: '#beforetime', //指定元素
				  });
				  laydate.render({
					elem: '#lasttime', //指定元素
				});
				  form.render();
			});
			/* 获取父页面传参 */
			//县（下拉）
			//乡（下拉）
			//获取id
			uuid_Bzd = param.uuid_Bzd;
			$("#linban").val(param.cun);
			//样地号
			$("#yangdihao").val(param.yangdi_H);
			//小班
			$("#xiaoban").val(param.xiao_Ban);
			//有害生物种类（下拉）
			$("#youhaizl").val(param.yhsw_Mc);
			//防前调查时间
			$("#beforetime").val(param.dcsj_Fq);
			//防后调查时间
			$("#lasttime").val(param.dcsj_Fh);
			//经度
			$("#jingdu").val(param.yangdi_Jd);
			//纬度
			$("#weidu").val(param.yangdi_Wd);
			//标准地面积
			$("#dimj").val(param.yangdi_Mj);
			//样方数
			$("#yangfangsl").val(param.yangf_Sl);
			//备注
			$("#beizhu").val(param.yangdi_Bz);
			//调查人
			$("#diaochary").val(param.diaocha_Ry);
		    $.ajax({
				url : localhostPath + projectName + '/datalib/xingzhengquhua ',
				type : 'POST',
				dataType : 'json',
				data : {
				},
				success : function(res) {
				 var msg = res.rows;
					for (var i = 0; i < msg.length; i++) {
						if(msg[i].ji_Bie=="4"){
							if(param.xiang_Mc == msg[i].name){
								$("#xiang").append( "<option selected value='" + msg[i].code + "'>" + msg[i].name + "</option>");
							}else{
								$("#xiang").append( "<option value='" + msg[i].code + "'>" + msg[i].name + "</option>");
							}
						}
						if(msg[i].ji_Bie=="3"){
							if(param.xian_Mc == msg[i].name){
								$("#xian").append( "<option selected value='" + msg[i].code + "'>" + msg[i].name + "</option>");
							}else{
								$("#xian").append( "<option value='" + msg[i].code + "'>" + msg[i].name + "</option>");
							}
							
						}
					}
				}
			});
		    /* 取出有害生物类别和名称 */
		    $.ajax({
		    	url : localhostPath + projectName + '/datalib/yhsw_lb',
				type : 'POST',
				dataType : 'json',
				data : {},
				success : function(res) {
					var msg = res.rows;
					for (var i = 0; i < msg.length; i++) {
						if(param.yhsw_Lb== msg[i].name){
						$("#youhaizl").append( "<option selected   value='" + msg[i].code + "'>" + msg[i].name + "</option>");
						}else{
						$("#youhaizl").append( "<option value='" + msg[i].code + "'>" + msg[i].name + "</option>");
						}
					}
				}
		    })
		} 
		
		/* 转换数字 */
		function change(value) {
		    value = value.replace(/[^\d]/g,'');
		    if(''!=value){
		        value = parseInt(value);
		    }
		    return value;
		}
		/** 编辑 
			[].filter.call(xianMc,(s,i,o)=>o.indexOf(s)==i).join('');
		**/
		function sure() {
			var uuid = uuid_Bzd;
			var sheng = "630000";
			var shi = "632800";
			var xian = $("#xian").val();
			var xianMc = $("#xian option:selected").text(); //获取选中的项
			var xiang = $("#xiang").val();
			var xiangMc = $("#xiang option:selected").text(); //获取选中的项
			var cun = $("#linban").val();
			var xiao_ban =  $("#xiaoban").val();
			var yangdi_h =  $("#yangdihao").val();/* youhaizl */
			var dcsj_fq =  $("#beforetime").val();
			var dcsg_fh =  $("#lasttime").val();
			var yangdi_jd =  $("#jingdu").val();
			var yangdi_wd =  $("#weidu").val();   
			var yhsw_lb =  $("#youhaizl").val();
		    var yhsw_mc =  "C15312005050";
			var yangdi_mj =  $("#dimj").val(); 
			var yangf_sl =  $("#yangfangsl").val();
			var yangdi_bz =  $("#beizhu").val();  
			var diaocha_ry =  $("#diaochary").val();
			 $.ajax({
				url : localhostPath + projectName + '/xiangcha/updateZB',
				type : 'POST',
				dataType : 'json',
				data : {
					'uuid_bzd': uuid,  
					'sheng' : sheng, 
					'shi' : shi,  
					'xian' : xian, 
					'xianMc' : xianMc, 
				    'xiang' : xiang,  
				    'xiangMc' : xiangMc,   
				    'cun' : cun,    
				    'xiao_ban' : xiao_ban,   
				    'yangdi_h' : yangdi_h,   
				    'dcsj_fq' : dcsj_fq,   
				    'dcsg_fh' : dcsg_fh,    
				    'yangdi_jd' : yangdi_jd,   
				    'yangdi_wd' : yangdi_wd,    
				    'yhsw_lb' : yhsw_lb,    
				    'yhsw_mc' : yhsw_mc,
				    'yangdi_mj' : yangdi_mj,   
				    'yangf_sl' : yangf_sl,    
				    'yangdi_bz' : yangdi_bz,    
				    'diaocha_ry' : diaocha_ry
				},
				success : function(res) {
					if(res.msg=="修改成功"){
						layer.msg('修改成功', { icon: 1 });
					}
				}
			})
		}
	</script>