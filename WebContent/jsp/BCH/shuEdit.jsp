    <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="JqgridInclude.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>标准地详查编辑</title>
<link href="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/dist/css/bootstrap-select.min.css" rel="stylesheet" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/js/layer/layui/css/layui.css" media="all">
 <script src="${pageContext.request.contextPath}/js/layer/layui/layui.js"></script>
<script src="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/dist/js/bootstrap-select.min.js"></script>
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
      <label class="layui-form-label">调查时间</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="diaochasj" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">乡(林班)&emsp;&emsp;</label>
      <div class="layui-input-inline">
        <!-- <input type="text" name="email" id="xiang" lay-verify="email" autocomplete="off" class="layui-input"> -->
    	<select id="xiang" style="width: 100px">  </select> 
      </div> 
    </div>
 	 </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">林&emsp;&emsp;&emsp;班</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="linban" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">小&emsp;&emsp;&emsp;班</label>
      <div class="layui-input-inline">
        <input type="text" id="xiaoban" name="email" lay-verify="email" autocomplete="off" class="layui-input">
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
        <input type="text" name="email" id="weidu" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">样方号</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="yangfanghao" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">调查总株数(个)</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="diaochashu" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">受害或死亡株数(个)</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="shouhaishu" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">受害或死亡率(%)</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="shouhailv" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	<div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">有效洞口(个)</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="dongkoushu" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">鼠密度(只/公顷)</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="shumidu" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">新土丘树(个)</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="newtuqiu" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">土丘系数</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="tuqiuxs" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form">
 	<div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">代表面积(亩)</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="daibiaomj" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">危害程度</label>
      <div class="layui-input-inline">
      <!--   <input type="text" name="email" id="shifousz" lay-verify="email" autocomplete="off" class="layui-input"> -->
      	<select id="weihaicd">
      				
      	</select>
      </div>
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
		var id;
			function parameter(param) {
				uuid_Bzd = param.uuid_Bzd;
				id = param.uuid;
				console.log(param);
				layui.use(['laydate','form'], function(){
					  var form=layui.form;
					  var laydate = layui.laydate;
					  //执行一个laydate实例
					  laydate.render({
					    elem: '#diaochasj', //指定元素
					  });
					  form.render();
				});
				//调查时间
				$("#diaochasj").val(param.diaocha_Sj);
				//乡
			/* 	$("#xiang").val(param.xiang_Mc); */
				//林班
				$("#linban").val(param.cun);
				//小班
				$("#xiaoban").val(param.xiao_Ban);
				//经度
				$("#jingdu").val(param.yangdi_Jd);
				//纬度
				$("#weidu").val(param.yangdi_Wd);
				//样方号
				$("#yangfanghao").val(param.yangf_H);
				//调查总株数
				$("#diaochashu").val(param.diaocha_Zs);
				//受害株数
				$("#shouhaishu").val(param.shouhai_Zs);
				//受害率
				$("#shouhailv").val(param.shouhai_Zl);
				//有效洞口
				$("#dongkoushu").val(param.youxiao_Dk);
				//鼠密度
				$("#shumidu").val(param.shu_Mi_Du);
				//新土丘树
				$("#newtuqiu").val(param.tuqiu_Gs);
				//土丘系数
				$("#tuqiuxs").val(param.tuqiu_Xs);
				//代表面积
				$("#daibiaomj").val(param.daibiao_Mj);
				//危害程度
				/* $("#weihaicd").val(param.weihai_Cd); */
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
								 if(msg[i].ji_Bie=="4"){
									if(param.xiang_Mc == msg[i].name){
										$("#xiang").append( "<option selected value='" + msg[i].code + "'>" + msg[i].name + "</option>");
									}else{
										$("#xiang").append( "<option value='" + msg[i].code + "'>" + msg[i].name + "</option>");
									}
								}
							}
						}
					});
				$.ajax({
					url : localhostPath + projectName + '/datalib/weihai_cd ',
					dataType : 'json',
					type : 'POST',
					data : {},
					success : function(res) {
						var msg = res.rows;
						console.log(res);
						for (var i = 0; i < msg.length; i++) {
							if(param.weihai_Cd == msg[i].name){
								$("#weihaicd").append( "<option selected value='" + msg[i].code + "'>" + msg[i].name + "</option>");
							}else{
								$("#weihaicd").append( "<option value='" + msg[i].code + "'>" + msg[i].name + "</option>");
							}
						}
					}
				})
			}
			function sure() {
			 var uuid = id;
			 var uuid_bzd  = uuid_Bzd;
			 var yhsw_lb = "1";
			 var  yhsw_mc = "1";
			 var diaocha_sj = $("#diaochasj").val();
			 var xiang = $("#xiang").val();
			 var xiang_mc = $("#xiang option:selected").text(); //获取选中的项
			 var cun  = $("#linban").val(); 
			 var xiao_ban  = $("#xiaoban").val();
			 var yangdi_jd = $("#jingdu").val();
			 var yangdi_wd = $("#weidu").val();
			 var yangf_h = $("#yangfanghao").val();
			 var diaocha_zs = $("#diaochashu").val();
			 var shouhai_zs = $("#shouhaishu").val();
			 var shouhai_zl = $("#shouhailv").val();
			 var youxiao_dk  = $("#dongkoushu").val();
			 var shu_mi_du  = $("#shumidu").val();
			 var tuqiu_gs  = $("#newtuqiu").val();
			 var tuqiu_xs  = $("#tuqiuxs").val();
			 var weihai_cd  = $("#weihaicd option:selected").val(); //获取选中的项
			 var daibiao_mj  = $("#daibiaomj").val();
			 var chengzai = "1";
			 var diaocha_ry  = "1";
			 debugger;
			 $.ajax({
				 	url : localhostPath + projectName + '/shfhhz/updateZB',
					dataType : 'json',
					type : 'POST',
					data : {
						 uuid : uuid,    
						 uuid_bzd : uuid_bzd,  
						 yhsw_lb : yhsw_lb,   
						 yhsw_mc : yhsw_mc,  
						 diaocha_sj : diaocha_sj,   
						 xiang : xiang,    
						 xiang_mc : xiang_mc,    
						 cun : cun,    
						 xiao_ban : xiao_ban,   
						 yangdi_jd :yangdi_jd,    
						 yangdi_wd : yangdi_wd,    
						 yangf_h : yangf_h,    
						 diaocha_zs :diaocha_zs,    
						 shouhai_zs :shouhai_zs,    
						 shouhai_zl : shouhai_zl,   
						youxiao_dk : youxiao_dk,   
						shu_mi_du :shu_mi_du,    
						tuqiu_gs : tuqiu_gs,    
						tuqiu_xs : 432,   
						weihai_cd :weihai_cd,    
						daibiao_mj : daibiao_mj,    
						chengzai :chengzai,    
						diaocha_ry :diaocha_ry
					},
					success : function(res) {
						console.log(res);
					}
			 })
			 
				
			}
		</script>
</body>
</html>