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
      <label class="layui-form-label">县</label>
      <div class="layui-input-inline">
       <!--  <input type="tel" name="phone" id="xian" lay-verify="required|phone" autocomplete="off" class="layui-input"> -->
     	<select id="xian" style="width: 100px">
     				
     	</select>
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">乡&emsp;&emsp;</label>
      <div class="layui-input-inline">
       <!--  <input type="text" name="email" id="xiang" lay-verify="email" autocomplete="off" class="layui-input"> -->
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
        <input type="tel" name="phone" id="linban" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">小&emsp;&emsp;&emsp;班</label>
      <div class="layui-input-inline">
        <input type="text" id="xiaoban" name="xiaoban" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">监测样地序号</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="yangdixh" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">样方调查植株</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="diaochazs" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">有害生物名称</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="youhaimc" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">被害植物名称</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="beihaimc" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">危害部位</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="weihaibw" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">危害期</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="weihaiqi" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	<div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">失叶率%&nbsp;受害率%</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="shouhailv" lay-verify="required|phone" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">死亡率</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="siwanglv" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 <div class="layui-form">
 	 <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">是否成灾</label>
      <div class="layui-input-inline">
        <!-- <input type="tel" name="phone" id="ischengzai" lay-verify="required|phone" autocomplete="off" class="layui-input"> -->
      	<select id="ischengzai">
      				
      	</select>
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">调查人</label>
      <div class="layui-input-inline">
        <input type="text" name="email" id="diaochary" lay-verify="email" autocomplete="off" class="layui-input">
      </div>
    </div>
 	 </div>
 	 </div>
 	<div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">调查时间</label>
      <div class="layui-input-inline">
        <input type="tel" name="phone" id="diaochasj" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">备注</label>
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
			function parameter(param) {
				console.log(param);
				layui.use(['laydate','form'], function(){
					  var laydate = layui.laydate;
					  var form=layui.form;
					  //执行一个laydate实例
					  laydate.render({
					    elem: '#diaochasj', //指定元素
					  });
					  form.render();
				});
				$("#linban").val(param.cun);
				//监测样地序号
				$("#yangdihao").val(param.yangdi_H);
				//样方调查株数
				$("#diaochazs").val(param.diaocha_Zs);
				//有害生物名称
				$("#youhaimc").val(param.yhsw_Mc);
				//被害植物名称
				$("#beihaihaimc").val(param.jzzw_Mc);
				//危害部位
				$("#weihaibw").val(param.weihai_Bw);
				//危害期
				$("#weihaiqi").val(param.weihai_Q);
				//失叶率
				$("#shouhailv").val(param.shouhai_Zl);
				//死亡率
				$("#siwanglv").val(param.siwang_Zl);
				//是否成灾
				$("#chengzai").val(param.chengzai);
				//调查人
				$("#diaochary").val(param.diaocha_Ry);
				//调查时间
				$("#diaochasj").val(param.diaocha_Sj);
				//备注
				$("#beizhu").val(param.beizhu);
				$.ajax({
					url : localhostPath + projectName + '/datalib/xingzhengquhua',
					type : 'POST',
					dataType : 'json',
					data : {},
					success : function(res) {
						console.log(res);
						var msg = res.rows;
						/* $("#xiang").append( "<option selected = 'selected'>" + param.xiang_Mc + "</option>");
						$("#xian").append( "<option selected = 'selected'>" + param.xian_Mc + "</option>"); */
						for (var i = 0; i < msg.length; i++) {
							if(msg[i].ji_Bie=="4"){
								if(param.xiang_Mc==msg[i].name){
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
			}
		</script>
</body>
</html>