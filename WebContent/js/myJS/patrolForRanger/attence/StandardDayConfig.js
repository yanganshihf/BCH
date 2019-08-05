function sumbit(){
	var standardDay=$("#standDay").val();	

	var mobileNumReg = /^[1][3,5,7,8,9][0-9]{9}$/;
	var pat=new RegExp("[#_%&'/\"\\,;:=!^]","i");
	if(standardDay==''){		
		layer.open({
			title : false
			,closeBtn:0
			,content : '<center><span>规定出勤天数不能为空</span></center>'
		});
	}else if(pat.test(standardDay)){
		layer.open({
			title : false
			,closeBtn:0
			,content : '<center><span>出勤天数只能是1-31间数字</span></center>'
		});
		$("#standDay").val("");
	}else if(standardDay<1 || standardDay>31){		
		layer.open({
			title : false
			,closeBtn:0
			,content : '<center><span>出勤天数只能是1-31间数字</span></center>'
		});
		$("#standDay").val("");
	}else{
		$.post("standDaysManage_edit.action",{requiredDays:standardDay,oper:'add'},function(data) {
			if(data.result=='0'){
				layer.open({
					title : false
					,closeBtn:0
					,content : '<center><span>设置成功</span></center>',
					yes:function(index, layero){
						parent.standDayConfigSuccess();
					}
				});
			}else{
				layer.open({
					title : false
					,closeBtn:0
					,content : '<center><span>设置失败</span></center>'
				});
			}
		});		
	}

}