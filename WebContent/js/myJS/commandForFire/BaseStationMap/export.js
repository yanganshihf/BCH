	//以Table格式导为xls文件
    function TableToExcel(jsonData){
      //要导出的json数据
/*      var jsonData = [
        {
          name:'001',
          id:'621699190001011231'
        },
        {
          name:'002',
          id:'52069919000101547X'
        },
        {
          name:'003',
          id:'423699190103015469'
        },
        {
          name:'004',
          id:'341655190105011749'
        }
      ]*/
	  //导出前要将json转成table格式
      //列标题
      var str = '<tr><td>name</td><td>id</td></tr>';
      //具体数值 遍历
      for(let i = 0;i < jsonData.length;i++){
        str += '<tr>';
        for(let item in jsonData[i]){
			var cellvalue = jsonData[i][item];
            //不让表格显示科学计数法或者其他格式 
			//方法1 tr里面加 style="mso-number-format:'\@';" 方法2  是改为 = 'XXXX'格式  
			//如果纯数字且超过15位
			/*var reg = /^[0-9]+.?[0-9]*$/;
			if ((cellvalue.length>15) && (reg.test(cellvalue))){
				//cellvalue = '="' + cellvalue + '"';
			}*/
			//此处用`取代'，具体用法搜索模板字符串 ES6特性
            str+=`<td style="mso-number-format:'\@';">${cellvalue}</td>`;  
			// str+=`<td>${cellvalue}</td>`;  
        }
        str+='</tr>';		
      }	  	  
      var worksheet = '导出结果'
      var uri = 'data:application/vnd.ms-excel;base64,';
      //下载的表格模板数据
      var template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
      xmlns:x="urn:schemas-microsoft-com:office:excel" 
      xmlns="http://www.w3.org/TR/REC-html40">
      <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
        <x:Name>${worksheet}</x:Name>
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head><body><table>${str}</table></body></html>`;
      //下载模板
	  function base64 (s) { return window.btoa(unescape(encodeURIComponent(s)))}
      window.location.href = uri + base64(template);
    }
    
	
	function toCSV(){
		//要导出的json数据
      var jsonData = [
        {
          name:'001',
          id:'621699190001011231'
        },
        {
          name:'002',
          id:'52069919000101547X'
        },
        {
          name:'003',
          id:'423699190103015469'
        },
        {
          name:'004',
          id:'341655190105011749'
        }
      ]
	  //导出前要将json转成table格式
      //列标题
      var str = 'name,id\n';
      //具体数值 遍历
      for(let i = 0 ; i < jsonData.length ; i++ ){
        for(let item in jsonData[i]){
			
            //增加\t为了不让表格显示科学计数法或者其他格式
			//此处用`取代'，具体用法搜索模板字符串 ES6特性
            str+=`${jsonData[i][item] + '\t,'}`;     
        }
        str+='\n';		
      }	  
		let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
		var link = document.createElement("a");
		link.href = uri;
		link.download =  "分析结果.csv";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
	//支持大批量数据导出，目前测试15万行 30列通过，导出时间约为6秒
	function toLargerCSV(jsonData){
	//CSV格式可以自己设定，适用MySQL导入或者excel打开。
	//由于Excel单元格对于数字只支持15位，且首位为0会舍弃 建议用 =“数值” 
	
		var str = '序号,林班,小班,林种,地貌,坡向,坡位,坡度,郁闭度,地类,面积,林场,土地种,优势树,林种,保护等级\n';
		for(let i=0;i<jsonData.length;i++){
			var obj=jsonData[i];
			str += (i+1).toString()+',\t'+obj.linban+',\t'+obj.xiaoban+','+obj.linzhong+','+obj.dimao +','
			+obj.poxiang +','+obj.powei+','+obj.podu +','+obj.yubidu +','+obj.dilei  +','+obj.mianji+','
			+obj.linchang  +','+obj.tudzhong +','+obj.youshishu +','+obj.linzhong  +','+obj.baohudeng  +'\n';
		}
		var blob = new Blob([str], {type: "text/plain;charset=utf-8"});  	
		//解决中文乱码问题
		blob =  new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});  
		object_url = window.URL.createObjectURL(blob); 
		var link = document.createElement("a");
		link.href = object_url;
		link.download =  "分析结果.csv";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);		             
	}