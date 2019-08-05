/**
 * 获取当前日期
 *//*
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
}*/


/*window.setTimeout(function() {
	// alert(rowData.departmentVal);
	// 设置选中
	var value = $("#employState").val();
	if(value == 3){
		$("#showUnemploy").css("display","");
		$("#hideUnemploy").css("display","none");
	}else{
		$("#hideUnemploy").css("display","");
		$("#showUnemploy").css("display","none");
	}
	 if(value == 3){
		  $("#hideThis").css("background-color","transparent");
		  $("#unemployReason").css("color","#000");
		  $("#unEmployDate").css("color","#000");
	  }else{
		  $("#hideThis").css("background-color","#CCC");
		  $("#unemployReason").val(99);
		  $("#unemployReason").css("color","#FFF");
		  $("#unEmployDate").css("color","#FFF");
		  $("#unEmployDate").val(""); 
	  } 
	
}, 200);*/

/*var cookie_department = unescape(document.cookie.split("cookie_department=")[1]
		.split(";")[0]);
cookie_department = cookie_department
		.substring(0, cookie_department.length - 1);
// 每个单位id-名称
eachDepart = cookie_department.split("&");

for (var i = 0; i < eachDepart.length; i++) {
	var eachDep = eachDepart[i].split("-");
	$("#departmentVal").append(
			"<option value='" + eachDep[0] + "'>" + eachDep[1] + "<oprion>")
}

var myDate = getNowFormatDate();
$("#employDate").val(myDate);

laydate.render({
	elem : '#employDate' // 指定元素
	,
	showBottom : false
});
*/