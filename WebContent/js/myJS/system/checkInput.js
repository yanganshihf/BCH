/*
 * check input
 */
   function checkedLoading(inputId){
	   var inputFuId = inputId.substr(0,inputId.length-1);//上级inputID(不是父节点)
       var pattern = /^check([1-9]|[a-z])$/;//ID匹配正则
       var inputLength =$("input[id^='check']").length;//input的个数
       var inputName = $("input[id="+inputId+"]:checkbox").attr('name');//获取点击的name
      
           $("input[id^="+inputId+"]:checkbox").prop("checked", true);//选择所有子项
           if(inputName == "checkDisabled"){
               $("input[id^="+inputId+"]:checkbox").parent("label").nextAll().find("input:disabled").prop("disabled", false);
           }
           var inputSecondary = $("input[id="+inputId+"]:checkbox").parents("td").find("input").length;//该二级功能的所有input
           var checkedSecondary = $("input[id="+inputId+"]:checkbox").parents("td").find("input:checked").length;//该二级功能被选中的input
           if(inputSecondary == checkedSecondary){ //判断二级功能是否全选
               $("input[id="+inputFuId+"]:checkbox +label").css({"background":""});
               $("input[id="+inputFuId+"]:checkbox").prop("checked", true);
               inputLength = $("input[id^='check']").length;//input总的个数
               checkedLength = $("input[id^='check']:checked").length;//input选中的总个数
               if(checkedLength == (inputLength -1)){
                   $("input[id='check'] +label").css({"background":""});
                   $("input[id='check']:checkbox").prop("checked", true);
               }
           }else{
               $("input[id="+inputFuId+"]:checkbox").prop("checked",false);
               $("input[id="+inputFuId+"]:checkbox +label").css({"background":"url(/ResourceMonitor/images/indexpage/square1.png)","background-position":"center center"});
               $("input[id='check']:checkbox").prop("checked",false);
               $("input[id='check'] +label").css({"background":"url(/ResourceMonitor/images/indexpage/square1.png)","background-position":"center center"});
           }        
   }
   function disabledLayer(txt){
       top.layer.open({
            title : false
           ,closeBtn:0
           ,content : '<center>请先勾选 <span style="color:red;">'+txt+'</span> 该选项</center>'
       });
   }
   function clickInput(inputId,id){
	   
	   var inputFuId = inputId.substr(0,inputId.length-1);//上级inputID(不是父节点)
       var pattern = /^check([1-9]|[a-z])$/;//ID匹配正则
       var inputLength =$("input[id^='check']").length;//input的个数
       var inputName = $("input[id="+inputId+"]:checkbox").attr('name');//获取点击的name
       //
       var checkedLength = $("input[id^='check']:checked").length;//input选中的个数
       //alert(checkedLength);
     if($(id).children("input").is(':disabled')){        //点击disabled input
    	 //
          var labelTxt;
          labelTxt = $(id).siblings("label").children("input[name='checkDisabled']").parent().text();
          disabledLayer(labelTxt);  
      }else if(!$(id).children("input").is(':checked')){ //点击unchecked input 
    	  $("input[id^="+inputId+"]:checkbox").prop("checked", true);//选择所有子项
          
          //$("input[id^="+inputId+"]:checkbox").parent("label").nextAll().find("input:disabled").prop("disabled", false);//将子项的禁用解除
          
          if(pattern.test(inputFuId)){//如果选择的是二级功能 
       	   //alert($(this).text());
              var inputSecondary = $("input[id="+inputId+"]:checkbox").parents("td").find("input").length;//该二级功能的所有input
              var checkedSecondary = $("input[id="+inputId+"]:checkbox").parents("td").find("input:checked").length;//该二级功能被选中的input
              if(inputName == "checkDisabled"){
                  $("input[id^="+inputId+"]:checkbox").parent("label").nextAll().find("input:disabled").prop("disabled", false);
              }
              if(inputSecondary == checkedSecondary){ //判断二级功能是否全选
                  $("input[id="+inputFuId+"]:checkbox +label").css({"background":""});
                  $("input[id="+inputFuId+"]:checkbox").prop("checked", true);
                  inputLength = $("input[id^='check']").length;//input总的个数
                  checkedLength = $("input[id^='check']:checked").length;//input选中的总个数
                  if(checkedLength == (inputLength -1)){
                      $("input[id='check'] +label").css({"background":""});
                      $("input[id='check']:checkbox").prop("checked", true);
                  }
              }else{
                  $("input[id="+inputFuId+"]:checkbox").prop("checked",false);
                  $("input[id="+inputFuId+"]:checkbox +label").css({"background":"url(/ResourceMonitor/images/indexpage/square1.png)","background-position":"center center"});
                  $("input[id='check']:checkbox").prop("checked",false);
                  $("input[id='check'] +label").css({"background":"url(/ResourceMonitor/images/indexpage/square1.png)","background-position":"center center"});
              }
             // 
          }else if(inputFuId == "check"){
              $("input[id='check']:checkbox").prop("checked", true);//为了避免全选框状态不定
              inputLength = $("input[id^='check']").length;//input总的个数
              checkedLength = $("input[id^='check']:checked").length;//input选中的总个数
              $("input[id^="+inputId+"]:checkbox +label").css({"background":""});
              $("input[id^="+inputId+"]:checkbox").parent("label").nextAll().find("input:disabled").prop("disabled", false);
              //$("input[id^="+inputId+"]:checkbox").prop("checked", true);//选择所有子项
              $("input[id^="+inputId+"]:checkbox +label").css({"background":"url(/ResourceMonitor/images/indexpage/sclect.png)","background-position":"center center"});
              if(checkedLength != inputLength){
                  $("input[id='check']:checkbox").prop("checked",false);
                  $("input[id='check'] +label").css({"background":"url(/ResourceMonitor/images/indexpage/square1.png)","background-position":"center center"});
              }else{                    
                  $("input[id='check'] +label").css({"background":"url(/ResourceMonitor/images/indexpage/sclect.png)","background-position":"center center"});
              }
          }else if(inputId == "check"){
        	  
              $("input[id^="+inputId+"]:checkbox").parent("label").nextAll().find("input:disabled").prop("disabled", false);
              $("input[id^="+inputId+"]:checkbox").prop("checked", true);//选择所有子项
              $("input[id^="+inputId+"]:checkbox +label").css({"background":"url(/ResourceMonitor/images/indexpage/sclect.png)","background-position":"center center"});
          }    
      }else{ //点击checked input 
          $("input[id^="+inputId+"]:checkbox").prop("checked",false);//所有子项移除checked
          $("input[id^="+inputId+"]:checkbox +label").css({"background":""});
          if(pattern.test(inputFuId)){ //如果是二级功能项
             if(inputName == "checkDisabled"){
                  $("input[id^="+inputId+"]:checkbox").parent("label").nextAll().find("input").prop("checked", false);
                  $("input[id^="+inputId+"]:checkbox").parent("label").nextAll().children("label").css("background","");
                  $("input[id^="+inputId+"]:checkbox").parent("label").nextAll().find("input").prop("disabled", true);        
              }
              $("input[id='check']:checkbox").prop("checked",false);
              $("input[id="+inputFuId+"]:checkbox +label").css({"background":"url(/ResourceMonitor/images/indexpage/square1.png)","background-position":"center center"});
              var checkedSecondary = $("input[id="+inputId+"]:checkbox").parents("td").find("input:checked").length;
              if(checkedSecondary){
                  $("input[id="+inputFuId+"]:checkbox").prop("checked",false);
                  $("input[id='check'] +label").css({"background":"url(/ResourceMonitor/images/indexpage/square1.png)","background-position":"center center"});    
              }else{
                  $("input[id="+inputFuId+"]:checkbox").prop("checked",false);
                  $("input[id="+inputFuId+"]:checkbox +label").css({"background":""});
                  checkedLength = $("input[id^='check']:checked").length;
                  if(checkedLength == 0){
                      $("input[id='check']:checkbox").prop("checked",false);
                      $("input[id='check'] +label").css({"background":""});
                  }
              }        
          }else if(inputFuId == "check"){
              checkedLength = $("input[id^="+inputFuId+"]:checked").length;
              $(inputFuId).prop("checked",false);
              $("input[id^="+inputId+"][name^='checkDisabled']:checkbox").parent("label").nextAll().find("input").prop("disabled", true);
              $("input[id^="+inputId+"][name='checkDisabled']:checkbox").prop("disabled", false);
              $("input[id^="+inputId+"]:checkbox +label").css({"background":""});
              if(checkedLength != 0){
                  $("input[id='check'] +label").css({"background":"url(/ResourceMonitor/images/indexpage/square1.png)","background-position":"center center"});
              }else{
                  $("input[id='check'] +label").css("background","");
              }
          }
          else if(inputId == "check"){
              $("input[name^='checkDisabled']:checkbox").parent("label").nextAll().find("input").prop("disabled", true);
              $("input[name='checkDisabled']:checkbox").prop("disabled", false);
              $("input[id^="+inputId+"]:checkbox").prop("checked",false);
              $("input[id^="+inputId+"]:checkbox +label").css({"background":""});
          }
      }
   }
   