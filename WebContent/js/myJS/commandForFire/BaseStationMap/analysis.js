var analysis={
	bodyIndex:-1,
	eventChoice:-1,
	layerName:'',
	pointType:'',
	layerMessageIndex:-1,
	isDrawing:false,
	themeColor:'rgb(5,133,99)',
	flagColor:'red',
	flagSize:24,
	offsetLeft:0,
	//加载空间分析图层
	loadMapLayer:function(){
		require(["esri/layers/GraphicsLayer","esri/tasks/support/Query","esri/Graphic",
			"esri/layers/FeatureLayer","esri/renderers/smartMapping/statistics/uniqueValues",
			"esri/geometry/Point","esri/geometry/geometryEngine"], 
				function(GraphicsLayer,Query,Graphic,FeatureLayer,uniqueValues,Point,geometryEngine) {
			dingweiLayer = new GraphicsLayer({
		        listMode : "hide",
		        name:"dingweiLayer",
		        elevationInfo:{
		            mode : "relative-to-ground",
		            offset : 0,
		            unit : "meters"
		        }
		    });
			analysisPointLayer = new GraphicsLayer({
		        listMode : "hide",
		        name:"analysisPointLayer",
		        elevationInfo:{
		            mode : "relative-to-ground",
		            offset : 0,
		            unit : "meters"
		        }
		    });
			analysisGraphicLayer = new GraphicsLayer({
		        listMode : "hide",
		        name:"analysisGraphicLayer",
		        elevationInfo:"on-the-ground"
		    });
			highlightRouteLyr = new GraphicsLayer({
		        listMode : "hide",
		        name:"highlightRouteLyr",
		        elevationInfo:"on-the-ground"
		    });
            signFlagLayer = new GraphicsLayer({
                listMode : "hide",
                name:"signFlagLayer",
                elevationInfo:{
                    mode : "relative-to-ground",
                    offset : 0,
                    unit : "meters"
                }
            });
			map.addMany([dingweiLayer,analysisPointLayer,analysisGraphicLayer,highlightRouteLyr,signFlagLayer]);
			view.on("click", function(event) {
                var point = view.toMap({
                    x : event.x,
                    y : event.y
                });
                var lonlat = mercator2lonlat(point);
                if(signPointFlag&&event.native.button==0){
                	//插旗开启的时候
                    var signImg="/ResourceMonitor/images/mark/32/signPoint-red.png";
                    if(analysis.flagColor=="red"){
                        signImg="/ResourceMonitor/images/mark/32/signPoint-red.png";
                    }else if(analysis.flagColor=="blue"){
                        signImg="/ResourceMonitor/images/mark/32/signPoint-blue.png";
                    }else{
                        signImg="/ResourceMonitor/images/mark/32/signPoint-yellow.png";
                    }
                    view.hitTest(event).then(signPointClick);
                    function signPointClick(){
                        var pt = view.toMap({
                     	   x : event.x+11.5,
                     		y : event.y-11.5

                        });
                        var signPoint3dPnt = {
                            type : "point", // autocasts as new Point()
                            x : pt.longitude,
                            y : pt.latitude,
                            z : 0
                        };
                        var signPoint3dPntSymbol = {
                            type: "point-3d", 
                            symbolLayers: [{
                              type: "icon", 
                              size:analysis.flagSize,
                              resource: { href: signImg },            
                            }]             
                        };
                        var signPoint3dGraphic = new Graphic({
                            geometry : signPoint3dPnt,
                            symbol : signPoint3dPntSymbol
                        });
                        signFlagLayer.add(signPoint3dGraphic);
                    };
                }   
                if(analysis.isDrawing){
    		   	 	analysis.isDrawing=false;
    		   	 	document.body.style.cursor='default';
    	        	var dingweiSymbol = {
	                    type: "point-3d", 
	                    symbolLayers: [{
	                      type: "icon", 
	                      size:24,
	                      resource: { href:"/ResourceMonitor/images/mark/32/eventDisp_07.png" }           
	                    }
	                    ],             
	                };
    	            var pnt = {
	                    type: "point", 
	                    x: lonlat.x,
	                    y: lonlat.y,
	                };
    	        	var graphic = new Graphic();
    	    		graphic.geometry=pnt;
    	    		graphic.symbol=dingweiSymbol;
    	    		dingweiLayer.add(graphic);
    	    		
                    var query = new Query();
                    query.geometry = point; 
                    query.distance = 1;
                    query.outFields = ["*"];
                    query.units = "meters";
                    query.spatialRelationship = "intersects";
                    query.returnGeometry = true;
                    linChangQueryTask.execute(query).then(function(result){
                    	var department = result.features[0].attributes.林场名;
                    	var longitude = lonlat.x;
                    	var latitude = lonlat.y;
                    	var time = new Date();
                        $.post("/ResourceMonitor/recentEvent/addEvent",
                	    {
                        	department,
                        	longitude,
                        	latitude,
                        	time
                	    },
                	        function(data,status){
                	    });
                    })
                }
                analysis.funSetPointByClick(lonlat);
			});
            view.on("double-click",doubleClickEvnetHandler);
            function doubleClickEvnetHandler(event) {
                event.stopPropagation();
                view.hitTest(event).then(elementDoubleMouseClick);
            }
            function elementDoubleMouseClick(response){
                if(response.results.length==0)
                    return;
			   if(response.results[0].graphic!== null){
                   var graphic = response.results.filter(function (result) {
                       return (result.graphic.layer === signFlagLayer);
                   })[0].graphic;
                   var preVal='';
                   if(graphic.symbol.symbolLayers.length>1){
                	   preVal=graphic.symbol.symbolLayers.items[1].text;
                   }
                   var html='<table style="line-height:40px;height:40px;"><tr>'
           			+'<td><span  style="margin-left:10px;">标注内容</span></td>'
           			+'<td><input id="editContent" maxlength="6" value="'+ $.trim(preVal)+'" style="width:160px;margin-left:10px;height:25px;"/></td></tr>'
               			+'<tr  stype="height:40px"><td></td><td>'
           			+'<button id="editFlag" class="layui-btn" style="margin-left:85px;padding: 0 5px;line-height: 28px;height: 28px;background-color:rgb(5, 133, 99)">保存</button>'
           			+'<button id="closeFlag" class="layui-btn" style="margin-left:10px;padding: 0 5px;line-height: 28px;height: 28px;background-color:rgb(5, 133, 99)">删除</button>'
               			+'</td></tr></table>';
               	    view.popup.open({
        	        title: '旗帜标注',
        	        autoCloseEnabled:false,
        	        actions:[],
        	        content:html
            	    });	
            	    view.popup.set("dockOptions", {
            		    breakpoint: false,
            		    buttonEnabled: false,
            		    position: 'bottom-center',
            		});
            	    $("#editFlag").click(function() {
            	    	var value=$("#editContent").val();
                        if(value.length>6){
           				  	layer.tips('内容最多为六个字', '#editContent', {
      							tips: [3, '#009f95']
       				  		});  
           				  	return;
                       }
                       var nullStr='    ';
                       for(var i=0;i<value.length;i++){
                     	  nullStr+='    ';
                       }
                       var signImg=graphic.symbol.symbolLayers.items[0].resource.href;
                       var signSize=graphic.symbol.symbolLayers.items[0].size;
                       var signColor=[];
                       if(signImg=="/ResourceMonitor/images/mark/32/signPoint-red.png"){
                    	   signColor=[255,0,0];
                       }else if(signImg=="/ResourceMonitor/images/mark/32/signPoint-blue.png"){
                    	   signColor=[0,0,255];
                       }else{
                    	   signColor=[255,255,0];
                       }
                       
                       var signPoint3dPntSymbol = {
                           type: "point-3d", 
                           symbolLayers: [{
                             type: "icon", 
                             size:signSize,
                             resource: { href: signImg },            
                           },{
                    	      type: "text",  
                    	      text: nullStr+value,
                    	      material: { color: signColor },
                    	      size: 12  
                    	    }
                           ],             
                       };
                       signFlagLayer.remove(graphic);
                       view.popup.close();
                       var graphicClone = graphic.clone();
                       graphicClone.symbol=signPoint3dPntSymbol;
                       signFlagLayer.add(graphicClone);
					});
            	    $("#closeFlag").click(function() {
            	    	view.popup.close();
            	    	signFlagLayer.remove(graphic);
					});
               }
            }
            
            view.on("pointer-down",downEvnetHandler);
            function downEvnetHandler(event) {
         	   //2代表按下右键
         	   if(event.native.button==2){
                	view.hitTest(event).then(elementDownMouseClick);
         	   }
            }
            function elementDownMouseClick(response){
                if(response.results.length==0)
                    return;
                choosedGraphic = response.results.filter(function (result) {
                    return result.graphic.layer === signFlagLayer;
                })[0].graphic;
                choosedFlag=true;
                signFlagLayer.remove(choosedGraphic);
                var href=choosedGraphic.symbol.symbolLayers.items[0].resource.href;
                document.body.style.cursor='url('+href+'),auto';
            }
            //按钮松开
            view.on("pointer-up",upEvnetHandler);
            function upEvnetHandler(event) {
         	   if(event.native.button==2){
                   	view.hitTest(event).then(elementUpMouseClick);
            	}
                function elementUpMouseClick(response){
              	   if(choosedFlag){
                         var pt = view.toMap({
                      	   x : event.x+11.5,
                     		y : event.y+18

                         });
                         var signPoint3dPnt = {
                              type : "point", // autocasts as new Point()
                              x : pt.longitude,
                              y : pt.latitude,
                              z : 0
                          };
                         choosedGraphic.geometry=signPoint3dPnt;
                         signFlagLayer.add(choosedGraphic);
              		   	document.body.style.cursor='default';   
              	   }
              	   choosedFlag=false; 
                 }                  	   
            }
            //拖拽
            view.on("drag",dragEvnetHandler);
            function dragEvnetHandler(event) {
         	   if(choosedFlag){
                	event.stopPropagation();
         	   }
            }
			//属性查图
			function clearLocationDiv(){
				$("#flag_point").prop("checked",false);
				$("#locationType").prop("disabled",true);
				$("#screen_point").prop("disabled",true);
				$("#screen_point").prop("checked",false);
				$("#openEventChoice").prop("disabled",true);
				$("#findAttrLocation").find("input").prop("disabled",true);
				$("#findAttrLocation").find("input").val("");
				$("#intelQueryRight").find("input").prop("disabled",true);
				$("#intelQueryRight").find("input").val("");	                   		   
				$("#bufferRadius").prop("disabled",true);
				$("#findPatrolEvents").prop("disabled",true);
				$("#forest").prop("disabled",true);
				$("#intelQueryDiv").css("width","350px");
				$("#intelQueryDiv").css("top","110px");
				if ($('#nav').hasClass('nav-mini')) {
					$("#intelQueryDiv").css("left","75px");
				}else{
					$("#intelQueryDiv").css("left","175px");
				}
				$("#intelQueryRight").css("display","none");
			}
			function clearAll(){
				  layer.close(analysis.bodyIndex);
				  layer.close(analysis.eventChoice);
				  document.getElementById("intelQueryDiv").style.visibility = "hidden";
				  $('#searchTab li:eq(0) a').tab('show');
				  $("#intelQueryDiv").css("left","75px");
				  $("#layerChoose").val("xb");
				  $("#fieldChoose").html("");
				  $("#ableValSelect").html("");
				  $("#sqlEditArea").val("");
				  $("#queryErrorSpan").html("&nbsp;");
			}
			$("#sourceSurveyId").off().on("click",function(){
				analysis.funCloseAllPanel();
				choosedFlag=false;
				signPointFlag=false;
				analysis.layerName ='资源查询';
				if(true){
					analysis.funClearLayerGraphics();
     		   		$("#intelQueryDiv").draggable({containment:'#body'});
         		   	//loadGrid();
     		   		var linchangList = $('#zuzhi_tree').treeview('getSelected');
     		   		var linchangName="";
     		   		if(linchangList.length>0&&linchangList[0].nodeId>0){
     		   			linchangName=linchangList[0].text;
     		   		}
    				document.getElementById("intelQueryDiv").style.visibility = "visible";
    				var xbfeatureLayer=new FeatureLayer({
							url: "http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer/11",
							definitionExpression:linchangName == ""?"1=1":"林场='"+linchangName+"'"
    				})
                   	var choicefeatureLayer = xbfeatureLayer;
                   	var xbOptions='<option value="林场">林场</option>'
						+'<option value="LIN_BAN">林班号</option>'
						+'<option value="XIAO_BAN">小班号</option>'
						+'<option value="土地种">地类</option>'
						+'<option value="优势树">优势树种</option>'
						+'<option value="林种">林种</option>'
						+'<option value="PO_DU">坡度</option>'
						+'<option value="坡向">坡向</option>'
						+'<option value="YU_BI_DU">郁闭度</option>'
						+'<option value="保护等">林地保护等级</option>';
				   	var jmdOptions='<option value="cuntun">名称</option>';	
				   	var ghzOptions='<option value="ID">站点编号</option>'
						+'<option value="管护站">名称</option>'
						+'<option value="林场名">所属林场</option>';
				   	var towerOptions='<option value="林场">所在林场</option>'
						+'<option value="地点">地点</option>'
						+'<option value="类型">类型</option>';
				   	var xiangzhenOptions='<option value="cuntun">乡镇名</option>';	
				   	var cuntunOptions='<option value="cuntun">村屯名</option>';	
				   	var mydOptions='<option value="Name">牧业点名</option>'
				   		+'<option value="林场">林场</option>';
				   	var tjpOptions='<option value="cuntun">停机坪名</option>';
				   	var otherOptions='<option value="类型">类型</option>'
				   		+'<option value="地点">地点</option>'
				   		+'<option value="摄像机">摄像机</option>'
				   		+'<option value="负责人">负责人</option>'
				   		+'<option value="林场">林场</option>';
				   	var shanfengOptions ='<option value="名称">名称</option>';
				   	$("#fieldChoose").html(xbOptions);
                   	$("#layerChoose").off("click").on("click",function() {
						var layerChoose = $("#layerChoose").val();
						var options = '';
						if(layerChoose=="xb"){
							choicefeatureLayer = xbfeatureLayer;
							options=xbOptions;
						}else if(layerChoose=="jmd"){
							choicefeatureLayer = jmdFeatureLayer;
							options=jmdOptions;
						}else if(layerChoose=="ghz"){
							choicefeatureLayer = fangHuoZhan_3d;	
							options=ghzOptions;
						}else if(layerChoose=="tower"){
							choicefeatureLayer = liaoWangTai_3d;
							options=towerOptions;
						}else if(layerChoose=="xiangzhen"){
							choicefeatureLayer = xiangzhFeatureLayer;
							options=xiangzhenOptions;
						}else if(layerChoose=="cuntun"){
							choicefeatureLayer = cuntFeatureLayer;
							options=cuntunOptions;
						}else if(layerChoose=="myd"){
							choicefeatureLayer = mydFeatureLayer;
							options=mydOptions;
						}else if(layerChoose=="tjp"){
							choicefeatureLayer = tjpFeatureLayer;
							options=tjpOptions;
						}
						$("#fieldChoose").html(options);
						$("#ableValSelect").html("");
					});
                   	clearLocationDiv();
     		 		//绑定选点开启关闭事件
                   	$("#flag_point").off("click").on("click",function(){
                	   	if($("#flag_point").prop("checked")){
                		   	$("#locationType").prop("disabled",false);
                		   	if($("#locationType").val()=="optionXian80"){
                			   	$("#openEventChoice").prop("disabled",true);
                		   	}else{
                			   	$("#openEventChoice").prop("disabled",false);
                		   	}
                		   	$("#bufferRadius").val("1000");
                		   	$("#findAttrLocation").find("input").prop("disabled",false);
                   		   	$("#intelQueryRight").find("input").prop("disabled",false);
                		   	$("#bufferRadius").prop("disabled",false);
                		   	$("#findPatrolEvents").prop("disabled",false);
                		   	$("#forest").prop("disabled",false);
                		    var myDate = getNowFormatDate();
                		    $("#startDate").val(myDate);
                		    $("#endDate").val(myDate);
                	   }else{
                		   	clearLocationDiv();
                	   }
                   });
                   $("#fieldChoose").off("click").on("click",function(){
                	   $("#ableValSelect").html("");
                	   var sqlEditArea = $("#sqlEditArea");
                	   var fieldChooseVal = $("#fieldChoose option:selected").text();
                	   sqlEditArea.val(sqlEditArea.val()+fieldChooseVal+" ");
                	   if($("#fieldChoose").val()!=null){
                    	   	var fieldChooseVal = $("#fieldChoose").val()[0];
                    	   	uniqueValues({
                    		   	layer: choicefeatureLayer,
                    		   	field: fieldChooseVal
                		 	}).then(function(response){
                		   	var infos = response.uniqueValueInfos;
                		   	var buttons=[];
                		   	$("#ableValSelect").html("");
                		   	infos.forEach(function(info){
                			   	if(typeof(info.value)=='string'){
                			   		$("#ableValSelect").append('<option value="&apos;'+info.value+'&apos;">'+info.value+'</option>');
                			   	}else{
                				    $("#ableValSelect").append('<option value="'+info.value+'">'+info.value+'</option>');
                			   	}
                		   	});
	                       	$("#ableValSelect").off("click").on("click",function() {
	                    	   	var sqlEditArea = $("#sqlEditArea");
	                    	   	sqlEditArea.val(sqlEditArea.val()+this.value+" ");
	                       	});
                		 });  
                	   }
                	   return false;
                   });
                   $("button.symbol").off("click").on("click",function() {
                	   var sqlEditArea = $("#sqlEditArea");
                	   sqlEditArea.val(sqlEditArea.val()+this.value+" ");
                	   return false;
                   });
                   $("#closeButton").off("click").on("click",function() {
                	   clearLocationDiv();
                	   clearAll();
                   });
                   $("#cancelQuery").off("click").on("click",function() {
                	   clearLocationDiv();
                	   clearAll();
                   });
                   $("#openEventChoice").off("click").on("click",function() {
                	   if($("#intelQueryRight").css("display")=="none"){
                		   $("#intelQueryDiv").css("width","650px");
                		   $("#intelQueryRight").css("display","");
                		   var threeAgo = moment().subtract(3,'days').format("YYYY-M-DD");
                		   var now=moment().format("YYYY-M-DD");
                		   $("#intelQuerytime").val(now+" - "+now);
                		   loadGrid();
                	   }else{
                		   $("#intelQueryDiv").css("width","350px");
                		   $("#intelQueryRight").css("display","none");
                	   }
                   });
                   $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                	   if($(e.target).attr("href")=="#searchCond"){
                		   $("#intelQueryDiv").css("width","350px");
                		   $("#intelQueryRight").css("display","none");
                	   }
                   })
                   $("#sureQuery").off("click").on("click",function() {
                	   analysisGraphicLayer.removeAll();
                	   analysisPointLayer.removeAll();
                       var sqlEditAreaVal = $("#sqlEditArea").val();
                       if(sqlEditAreaVal.trim()==''){
                    	   $("#queryErrorSpan").html("条件为空");
                    	   return;
                       }
                       analysisPointLayer.removeAll();
                       analysisGraphicLayer.removeAll();
                	   view.popup.close();
                	   $("#queryErrorSpan").html("&nbsp;");
                	   var loadIndex = layer.load(0, {shade : false,zIndex :9999999999});
                       var layerChoose = $("#layerChoose").val();
                       var query = new Query();
                       if($("#intelQueryDiv").find("#flag_point").get(0).checked){
                       		if(!paramsValidate()){
                       			layer.close(loadIndex);
                       			return;
                       		}
                    		var locationType=$("#locationType").val();
                    		var longtD=$("#longtD").val();
                    		var latD=$("#latD").val();
                    		if(locationType!="optionXian80"){
                    			longtD=parseFloat(longtD);
                    			latD=parseFloat(latD);
                    		}
                    		if(locationType=="optionDMS"){
                    			var longtM=$("#longtM").val();
                    			var longtS=$("#longtS").val();
                    			if(longtM !==null&&longtM !==""){
                    				longtD+=parseFloat(longtM)/60;
                    			}
                    			if(longtS !==null&&longtS !==""){
                    				longtD+=parseFloat(longtS)/3600;
                    			}
                    			longtD=longtD.toFixed(6);
                    			var latM=$("#latM").val();
                    			var latS=$("#latS").val();
                    			if(latM !==null&&latM !==""){
                    				latD+=parseFloat(latM)/60;
                    			}
                    			if(latS !==null&&latS !==""){
                    				latD+=parseFloat(latS)/3600;
                    			}
                    			latD=latD.toFixed(6);
                    		}
                    		
                    		var bufferRadius=parseInt(document.getElementById("bufferRadius").value);
                    		var bufferParams={
                    			longtitude:longtD,
                    			latitude:latD,
                    			bufferRadius:bufferRadius,
                    		};
                            var polySym = {
                                type : "simple-fill", // autocasts as new SimpleFillSymbol()
                                color : [ 1, 97, 255, 0.2 ],//[250,128,114][233,150,122]
                                outline : {
                                    color : [ 255, 255, 0, 1 ],
                                    width : 2
                                }
                            };
              
                            var pointSym = {
                               type: "point-3d",  // autocasts as new PointSymbol3D()
                               symbolLayers: [{
                                 type: "icon",  // autocasts as new ObjectSymbol3DLayer()
                                 size:24,
                                 resource: { href: "images/mark/32/huanchong.png" },
                                 //material: { color: "red" }
                               }],
                               verticalOffset: {
                                 screenLength: 0,
                                 maxWorldLength: 36000,
                                 minWorldLength: 1
                               },
                               callout: {
                                 type: "line",  // autocasts as new LineCallout3D()
                                 size: 1.5,
                                 color: [150, 150, 150],
                                 border: {
                                   color: [50, 50, 50]
                                 }
                               }
                             };
                	    	 queryByAttr(bufferParams); 
                       }else{
                    	   queryByAttr(null);
                       }
					   function queryByAttr(bufferParams){
						   if(bufferParams!=null){
	                            var pt = new Point(bufferParams.longtitude, bufferParams.latitude);
	                            pt.hasZ = false;
	                            pt.z = undefined;
	                       		var buffer = geometryEngine.geodesicBuffer(pt, bufferRadius,"meters");
                          		var graphic=new Graphic({
                                    geometry : pt,
                                    symbol : pointSym
                                })
                          		analysisPointLayer.add(graphic);
                          		analysisGraphicLayer.add(new Graphic({
                                      geometry: buffer,
                                      symbol: polySym
                                }));
                	            view.goTo({
                	                target : graphic,
                	                tilt : 45,
                	                zoom:13
                	            });
                         	   query.geometry = buffer;  
						   }
                   	 	   sqlEditAreaVal = sqlEditAreaVal.replace(/且/g, 'and');
                   	 	   sqlEditAreaVal = sqlEditAreaVal.replace(/或/g, 'or');
                   	 	   sqlEditAreaVal = sqlEditAreaVal.replace(/null/g, "''");
                   	 	   if(layerChoose=="xb"){
	                   	 	   sqlEditAreaVal = sqlEditAreaVal.replace(/林班号/g, 'LIN_BAN');
	                   	 	   sqlEditAreaVal = sqlEditAreaVal.replace(/小班号/g, 'XIAO_BAN');
	                   	 	   sqlEditAreaVal = sqlEditAreaVal.replace(/地类/g, '土地种');
	                   	 	   sqlEditAreaVal = sqlEditAreaVal.replace(/优势树种/g, '优势树');
	                   	 	   sqlEditAreaVal = sqlEditAreaVal.replace(/坡度/g, 'PO_DU');
	                   	 	   sqlEditAreaVal = sqlEditAreaVal.replace(/郁闭度/g, 'YU_BI_DU');
	                   	 	   sqlEditAreaVal = sqlEditAreaVal.replace(/林地保护等级/g, '保护等'); 
	                   	 	   query.outFields = ["FID","MIAN_JI"];
                   	 	   }else if(layerChoose=="jmd"){
	                   	 	   sqlEditAreaVal = sqlEditAreaVal.replace(/名称/g, 'cuntun');
	                   	 	   query.outFields = ["*"];
                   	 	   }else if(layerChoose=="ghz"){
	                   	       sqlEditAreaVal = sqlEditAreaVal.replace(/站点编号/g, 'ID');
	                   	       sqlEditAreaVal = sqlEditAreaVal.replace(/名称/g, '管护站');
	                   	       sqlEditAreaVal = sqlEditAreaVal.replace(/所属林场/g, '林场名');
	                   	       query.outFields = ["*"];
                   	 	   }else if(layerChoose=="tower"){
                   	 		   sqlEditAreaVal = sqlEditAreaVal.replace(/所在林场/g, '林场');
                   	 		   query.outFields = ["*"];
                   	 	   }else if(layerChoose=="xiangzhen"){
                   	 		   sqlEditAreaVal = sqlEditAreaVal.replace(/乡镇名/g, 'cuntun');
                   	 		   query.outFields = ["*"];
						   }else if(layerChoose=="cuntun"){
	                   	 	   sqlEditAreaVal = sqlEditAreaVal.replace(/村屯名/g, 'cuntun');
	                   	 	   query.outFields = ["*"];
						   }else if(layerChoose=="myd"){
	                   	 	   sqlEditAreaVal = sqlEditAreaVal.replace(/牧业点名/g, 'Name');
	                   	 	   sqlEditAreaVal = sqlEditAreaVal.replace(/林场/g, '林场');
	                   	 	   query.outFields = ["*"];
						   }else if(layerChoose=="tjp"){
	                   	 	   sqlEditAreaVal = sqlEditAreaVal.replace(/停机坪名/g, 'cuntun');
	                   	 	   query.outFields = ["*"];
						   }
                   	  	   query.returnGeometry=true;
                   	  	   if(layerChoose=="xb"){
                   	  		   if(linchangName == ""){
                  	  				query.where = sqlEditAreaVal;
                  	  		   }else{
                  	  				query.where = sqlEditAreaVal+" and 林场='"+linchangName+"'";
                  	  		   }
	                     	   query.returnGeometry=false;
	                     	   xbQueryTask.execute(query).then(function(results){
	                 		   	  var features = results.features;
	                 		   	  var sumArea = 0;
	                 		   	  var lindiList = [];//林地的FID
	                 		   	  for(var i=0;i<features.length;i++){
	                 		   			sumArea+=features[i].attributes.MIAN_JI; 
	                 		   			lindiList.push(features[i].attributes.FID);
	                 		   	  }
	       						  str = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;">'
	                                  + '<table class="layui-table" lay-size="sm" lay-even style="text-align:left;margin-bottom:-1px"><tbody>'  
	                                  + '<tr><td style="width:90px;"><span>小班数</span></td><td><span>'+features.length +'</td></tr>'
	                                  + '<tr><td style="width:90px;"><span>面积</span></td><td><span>'+sumArea.toFixed(2)
	                                  + '公顷</span></td></tr></tbody></table></div>';
		       					   var lindiSql=lindiList.join(',');
                                   var dynamic_xb = dynamic_layers.findSublayerById(0);
                          	 	   dynamic_xb.definitionExpression ='FID in ('+lindiSql+')';
                        	       map.add(dynamic_layers,6);
	                               var params={
	                            		 SqlExpression : 'FID in ('+lindiSql+')'
	                               };
	                               if($("#intelQueryDiv").find("#flag_point").get(0).checked){
	                            	   popupsResult(str,loadIndex);
	                               }else{
		                               require(["esri/tasks/Geoprocessor"],function(Geoprocessor) {
		                            	  var gp=new Geoprocessor("http://58.18.226.130:6080/arcgis/rest/services/FeatureSetExtent/GPServer/FeatureSetExtent");
			                              gp.submitJob(params).then(function(data){
			                   	  			   layer.close(loadIndex);
 			                                   var jobId = data.jobId;
			                                   var status = data.jobStatus;
			                                   if(status=="job-succeeded"){
			                                       gp.getResultData(jobId, "FeaturesEnvelop").then(function(result){
					                   	  			   if(result.value.features.length>0){
				                                    	   var geometry = result.value.features[0].geometry;
				                                    	   view.goTo({
				                                               target : geometry,
				                                               heading : 0,
				                                               tilt : 0,
				                                           }, {
				                                               speedFactor : 0.7,
				                                               easing : 'ease-out'
				                                           });
				                                    	   popupsResult(str,loadIndex);
					                   	  			   }else{
					                   	  				   $("#queryErrorSpan").html("查询失败");
					                   	  			   }
			                                       })
			                                   }else{
			                                	   $("#queryErrorSpan").html("查询失败");
			                                   } 
			                               })
		                               });
	                               }
                     	   }).otherwise(function(e){
	                        	    layer.close(loadIndex);
	                        	    $("#queryErrorSpan").html("查询失败");
	                           });
                   	  	   }else{
                   	  		   query.where = sqlEditAreaVal;
		                       choicefeatureLayer.queryFeatures(query).then(function(results){
	                      	   		var str='';
									var features = results.features;
									if (features.length>0) {
										var picUrl="/ResourceMonitor/images/mark/32/cuntun.png";
										var field="居民点数:";
										if(layerChoose=="jmd"){
											picUrl="/ResourceMonitor/images/mark/32/cuntun.png",
											field="居民点数:";	
										}else if(layerChoose=="ghz"){
											picUrl="/ResourceMonitor/images/mark/32/guanhuzhan.png",
											field="站点数:";	
										}else if(layerChoose=="tower"){
											picUrl="/ResourceMonitor/images/mark/32/ta.png",
											field="塔数:";	
										}else if(layerChoose=="myd"){
											picUrl="/ResourceMonitor/images/mark/32/myd.png";
											field="牧业点数:";
									    }else if(layerChoose=="tjp"){
									    	picUrl="/ResourceMonitor/images/mark/32/tingjiping.png";
									    	field="停机坪数:";
									    }
										if(layerChoose=="xiangzhen"||layerChoose=="cuntun"){
				                        	 for(var i = 0; i < features.length; i++) {
					                      	  	var resultSymbol={
					                      	  		text:features[i].attributes['cuntun'],
					     				            type: "text", // autocasts as new TextSymbol3DLayer()
					    				            color: [0,255,0],
					    				            font:{
					    				            	family :'serif',
					    				            	weight :'bold',
					    				            	style:'italic',
					    				            },
					    				            size: 16
					    				          }
		                        	    		 var curGraphic=new Graphic({
		                            				  geometry: features[i].geometry,
		                            				  symbol: resultSymbol,
		                        	    		 });
					                      	  analysisPointLayer.add(curGraphic);
				 	      					 }
										}else{
				                      	  	 var resultSymbol={
				          	    	            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
			            	    	            url: picUrl,
			            	    	            height: 35,
			            	    	            width: 35
				             	    	      };
				                        	 for(var i = 0; i < features.length; i++) {
		                        	    		 var curGraphic=new Graphic({
		                            				  geometry: features[i].geometry,
		                            				  symbol: resultSymbol,
		                        	    		 });
		                        	    		 analysisPointLayer.add(curGraphic);
				 	      					 }	
										}

			       						  str = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;">'
			                                  + '<table class="layui-table" lay-size="sm" lay-even style="text-align:left;margin-bottom:-1px"><tbody>'  
			                                  + '<td style="width:90px;"><span>'+field+'</span></td><td><span>'+features.length 
			                                  + '</span></td></tr></tbody></table></div>';
											
										var resultGraphics=analysisPointLayer.graphics;
										var targetParams={
											target : resultGraphics,
			                                heading : 0,
			                                tilt : 0,
										}
										if(resultGraphics.length==1){
											targetParams.zoom=13;
				                      	}
			                      		view.goTo(targetParams,{
			                                speedFactor : 1,
			                                easing : 'ease-out'
			                            });
			                      		popupsResult(str,loadIndex);
									}else{
										popupsResult('无符合条件的结果',loadIndex);
									}
	                           }).otherwise(function(e){
	                        	    layer.close(loadIndex);
	                        	    $("#queryErrorSpan").html("查询失败");
	                           });		                   	  		   
                   	  	   }
					   }
				  
                  })
                  $("#clearQuery").click(function() {
                	  $("#sqlEditArea").val("");
                	  $("#queryErrorSpan").html("&nbsp;");
                  })	                      
         	  }else{
         		  clearLocationDiv();
         		  clearAll();
         	  }
         	  function popupsResult(contentStr,loadIndex){
				   layer.close(loadIndex);
				   clearAll();
			       view.popup.open({
			           title: '查询结果统计',
			           buttonEnabled: false,
			           autoCloseEnabled:false,
			           actions:[],
			           content:contentStr
			       });	
			       view.popup.set("dockOptions", {
				       breakpoint: false,
				       buttonEnabled: false,
				       position: 'bottom-right',
				   });
         	  }
			});
			/*行军推演*/
			$("#nav").on("click","#flagDrawId",function(){
				
				layer.closeAll();
				
				analysis.funCloseAllPanel();
         	    clearLocationDiv();
        	    clearAll();
        	    $("[id^='panel']").hide();
				document.body.style.cursor='default';
				analysis.isDrawing=false;
				signPointFlag=false;
				layer.close(analysis.bodyIndex);
				layer.close(analysis.eventChoice);
				
            	var longt;
            	var lat;
            	var layerLeft ='175px'; 
            	if($('#nav').hasClass('nav-mini')){
            		layerLeft='75px';
            	}
            	analysis.layerName="插旗标注";
            	analysis.bodyIndex = layer.open({
            		title : "插旗标注",
            		type : 2,
            		resize : false,
            		area : [ '310px', '380px' ],
            		offset: [ '60px', layerLeft],
            		content : 'flaglocateTo.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
            		shade:0,
            		cancel: function(index, layero){ 
    					document.body.style.cursor='default';
    					signPointFlag=false;
        			}, 
            		success : function(layero,index) {
            			analysis.flagColor='red';
            			analysis.flagSize=24;
            			var body = layer.getChildFrame('body', index);
            			var iframeWin = window[layero.find('iframe')[0]['name']];
            			body.find("#pointFlagButton").off().on("click",function(){
            				if($(this).css("background-color")=='rgb(255, 255, 255)'){
            					$(this).css("background-color","rgb(5,133,99)");
            					$(this).css("color","rgb(255, 255, 255)");
            					document.body.style.cursor='crosshair';
	        					signPointFlag=true;
            				}else{
            					$(this).css("background-color","rgb(255, 255, 255)");
            					$(this).css("color","#555");
            					document.body.style.cursor='default';
            					signPointFlag=false;
            				}
            			})
            			body.find(".fColor").off().on("click",function(){
    						analysis.flagColor = $(this).attr('id');
    					})
    					body.find("#flagSize").off().on("input porpertychange",function(){
    						body.find("#flagSizeVal").html($(this).val());
    						analysis.flagSize = $(this).val();
    					})
    					body.find("#saveFlagButton").off().on("click",function(){
    						if(signFlagLayer.graphics.length==0){
    							layer.msg("请在图层上插入旗帜！");
    							return;
    						}
    						var graphics = signFlagLayer.graphics.items;
    						var graphicAttrs=[];
    						for(var i=0;i<graphics.length;i++){
    							var graphic = graphics[i];
    							var x = graphic.geometry.x;
    							var y = graphic.geometry.y;
    							var href = graphic.symbol.symbolLayers.items[0].resource.href;
    							var size = graphic.symbol.symbolLayers.items[0].size;
    							var text ='';
    							var color=[255,0,0];
    							if(graphic.symbol.symbolLayers.items.length==2){
    								text = graphic.symbol.symbolLayers.items[1].text;
    								color = graphic.symbol.symbolLayers.items[1].material.color;
    							}
    							graphicAttrs.push({x,y,href,size,text,color});
    						}
							var points = JSON.stringify(graphicAttrs);
							var time = new Date();
							var person = localStorage.getItem('cookie_logingUser');
						    $.post("/ResourceMonitor/flagBack/addFlagBack",
						    {
						    	points,
						    	time,
						    	person
						    },
						        function(data,status){
						    	if(data.code>0){
						    		layer.msg("预设方案保存成功!");
						    	}
						    });
    					})
            			body.find("#locationFlagButton").off().on("click",function(){
                			if(!iframeWin.paramsValidate())
                				return;
                			var class_dfz = body.find('#dfz').attr("Class");
                			var class_sjz = body.find('#sjz').attr("Class");
                			var class_xian80 = body.find('#xian80').attr("Class");
                			if (class_dfz == "active") {
                				var du,fen,miao;
                				du = body.find('#longtDu').val();
                				if (du == "") {
                					du = "0";
                				}
                				fen  = body.find('#longtFen').val();
                				if (fen == "") {
                					fen = "0";
                				}
                				miao  = body.find('#longtMiao').val();
                				if (miao == "") {
                					miao = "0";
                				}
                				// 度分秒转经纬度
                				longt = Math.abs(du)  + (Math.abs(fen)/60 + Math.abs(miao)/3600);
                				du = body.find('#latDu').val();
                				if (du == "") {
                					du = "0";
                				}
                				fen  = body.find('#latFen').val();
                				if (fen == "") {
                					fen = "0";
                				}
                				miao  = body.find('#latMiao').val();
                				if (miao == "") {
                					miao = "0";
                				}
                				lat = Math.abs(du)  + (Math.abs(fen)/60 + Math.abs(miao)/3600);
                				
                				
                				
                			}
                			if (class_sjz == "active") {
                				longt = body.find('#longtFull').val();
                				lat = body.find('#latFull').val();
                			}
                			if (class_xian80 == "active") {
                				xCoor = body.find('#xCoor').val();
                				yCoor = body.find('#yCoor').val();
                				var firstProjection='';
				                if(xCoor.substring(0,2)=='20'){
				                	firstProjection ='+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=20500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs';
				                }else{
				                	firstProjection ='+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=21500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs';
				                }
                                var secondProjection = "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees";
                                var mm = proj4(firstProjection,secondProjection,[parseInt(xCoor),parseInt(yCoor) ]);
                                longt=mm[0];
                                lat=mm[1];
                			}
                            var signImg="/ResourceMonitor/images/mark/32/signPoint-red.png";
                            if(analysis.flagColor=="red"){
                                signImg="/ResourceMonitor/images/mark/32/signPoint-red.png";
                            }else if(analysis.flagColor=="blue"){
                                signImg="/ResourceMonitor/images/mark/32/signPoint-blue.png";
                            }else{
                                signImg="/ResourceMonitor/images/mark/32/signPoint-yellow.png";
                            }
                            signPointClick(longt,lat);
                            function signPointClick(longt,lat){
                                var signPoint3dPnt = {
                                    type : "point", // autocasts as new Point()
                                    x : longt,
                                    y : lat,
                                    z : 0
                                };
                                var size = body.find("#flagSize").val();
                                var signPoint3dPntSymbol = {
                                    type: "point-3d", 
                                    symbolLayers: [{
                                      type: "icon", 
                                      size:analysis.flagSize,
                                      resource: { href: signImg },            
                                    }]             
                                };
                                var signPoint3dGraphic = new Graphic({
                                    geometry : signPoint3dPnt,
                                    symbol : signPoint3dPntSymbol
                                });
                                signFlagLayer.add(signPoint3dGraphic);
                        		view.goTo({
                                    target :signPoint3dGraphic,
                                    heading : 0,
                                    tilt : 45,
                                    scale :50000
                                 }, {
                                    speedFactor : 1,
                                    easing : 'ease-out'
                                 });
                            };
            			})
            		}
            	});                		
			});
			/*监听点击事件*/
			//事件标绘
         	$("#doDrawLocation").off().on("click",function(){
            	var longt;
            	var lat;
            	layer.open({
            		title : "事件标绘",
            		type : 2,
            		resize : false,
            		area : [ '325px', '300px' ],
            		content : 'locateTo.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
            		btn : [ '确定', '取消' ],
            		yes : function(index, layero) {
            			var body = layer.getChildFrame('body', index);
            			var iframeWin = window[layero.find('iframe')[0]['name']];
            			if(!iframeWin.paramsValidate())
            				return;
            			var class_dfz = body.find('#dfz').attr("Class");
            			var class_sjz = body.find('#sjz').attr("Class");
            			var class_xian80 = body.find('#xian80').attr("Class");
            			if (class_dfz == "active") {
            				var du,fen,miao;
            				du = body.find('#longtDu').val();
            				if (du == "") {
            					du = "0";
            				}
            				fen  = body.find('#longtFen').val();
            				if (fen == "") {
            					fen = "0";
            				}
            				miao  = body.find('#longtMiao').val();
            				if (miao == "") {
            					miao = "0";
            				}
            				// 度分秒转经纬度
            				longt = Math.abs(du)  + (Math.abs(fen)/60 + Math.abs(miao)/3600);
            				du = body.find('#latDu').val();
            				if (du == "") {
            					du = "0";
            				}
            				fen  = body.find('#latFen').val();
            				if (fen == "") {
            					fen = "0";
            				}
            				miao  = body.find('#latMiao').val();
            				if (miao == "") {
            					miao = "0";
            				}
            				lat = Math.abs(du)  + (Math.abs(fen)/60 + Math.abs(miao)/3600);
            				
            				
            				
            			}
            			if (class_sjz == "active") {
            				longt = body.find('#longtFull').val();
            				lat = body.find('#latFull').val();
            			}
            			if (class_xian80 == "active") {
            				xCoor = body.find('#xCoor').val();
            				yCoor = body.find('#yCoor').val();
            				// 西安80转经纬度
            				var firstProjection='';
			                if(xCoor.substring(0,2)=='20'){
			                	firstProjection ='+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=20500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs';
			                }else{
			                	firstProjection ='+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=21500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs';
			                }
                            var secondProjection = "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees";
                            var mm = proj4(firstProjection,secondProjection,[parseInt(xCoor),parseInt(yCoor) ]);
                            longt=mm[0];
                            lat=mm[1];
            			}
        	        	var dingweiSymbol = {
    	                    type: "point-3d", 
    	                    symbolLayers: [{
    	                      type: "icon", 
    	                      size:24,
    	                      resource: { href:"/ResourceMonitor/images/mark/32/eventDisp_07.png" }           
    	                    }
    	                    ],             
    	                };
        	            var pnt = {
    	                    type: "point", 
    	                    x: longt,
    	                    y: lat,
    	                };
        	        	var graphic = new Graphic();
        	    		graphic.geometry=pnt;
        	    		graphic.symbol=dingweiSymbol;
        	    		dingweiLayer.add(graphic);
                		view.goTo({
                            target :graphic,
                            heading : 0,
                            tilt : 45,
                            scale :50000
                         }, {
                            speedFactor : 1,
                            easing : 'ease-out'
                         });
                        var query = new Query();
                        query.geometry = pnt; 
                        query.distance = 1;
                        query.outFields = ["*"];
                        query.units = "meters";
                        query.spatialRelationship = "intersects";
                        query.returnGeometry = false;
                        linChangQueryTask.execute(query).then(function(result){
                        	var department = result.features[0].attributes.林场名;
                        	var longitude = longt;
                        	var latitude = lat;
                        	var time = new Date();
                            $.post("/ResourceMonitor/recentEvent/addEvent",
                    	    {
                            	department,
                            	longitude,
                            	latitude,
                            	time
                    	    },
                    	        function(data,status){
                    	    });
                        })
                        analysis.funSetPointByClick({x:longt,y:lat});
                        //aaaaaa
            			layer.close(index); // 如果设定了yes回调，需进行手工关闭
            		},
            		btn2 : function(index, layero) {
            			// do something
            			layer.close(index); // 如果设定了yes回调，需进行手工关闭
            		},
            	});                		
         	})
			$("#doMapDraw").off().on("click",function(){
		   	 	analysis.isDrawing=true;
		   	 	document.body.style.cursor='crosshair';
			});
         	$("#nav").on("click","#eventDrawId",function(){
         		layer.closeAll();
         		analysis.funCloseAllPanel();
         	    clearLocationDiv();
        	    clearAll();
				$("#panelEventDraw").css("display","none");
				document.body.style.cursor='default';
				analysis.isDrawing=false;
				signPointFlag=false;
				layer.close(analysis.bodyIndex);
				layer.close(analysis.eventChoice);
				
		   	 	$("#panelEventDraw").css("display","");
		   	 	
		   	 	$("#recentEvent").css({"background-color":"#058563","color":"#fff"});
				$("#reportEvent").css({"background-color":"transparent","color":"#555;"});
				$("#sosAlert").css({"background-color":"transparent","color":"#555;"});
				var html= '<table id="formTable">'
					+'<tr><td style="width:40px;height:30px;"><label for="recentEventTime">时间</label></td>'
					+'<td style="width:220px;"><input class="form-control" type="text" id="recentEventTime" style="width:200px;"/></td>'
					+'</tr>'
					+'<tr style="height:30px;"><td><label for="eventDrawDepartment">部门</label> </td>'
					+'<td><select class="form-control" type="text" id="eventDrawDepartment" style="width:200px;"></select></td>'
					+'<td><button type="button" class="btn btn-default" id="eventDrawSubmit" title="查询">'
					+'<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">'
					+'</button></td>'
					+'</tr>'
					+'</table>'
					+'<div  id="gridCond">'
					+'<table style="width: 100%;">'
					+'<thead>'
					+'<tr style="width: 100%; height: 38px; background-color: #E6E6E6;">'
					+'<th style="width:80px; text-align: center; color: #058563;">部门</th>'
					+'<th style="width:150px; text-align: center; color: #058563;">时间</th>'
					+'<th style="text-align: center; color: #058563;">定位</th>'
					+'</tr>'
					+'</thead>'
					+'</table>'
					+'<table id="eventDrawTable" lay-filter="eventDrawFilter"></table>'
					+'</div>'	
				$("#eventDrawDivHead").html(html);
				analysis.loadRecentEvent();
				
				$("#recentEvent").off().on("click",function(){
					$("#recentEvent").css({"background-color":"#058563","color":"#fff"});
					$("#reportEvent").css({"background-color":"transparent","color":"#555;"});
					$("#sosAlert").css({"background-color":"transparent","color":"#555;"});
					var html= '<table id="formTable">'
						+'<tr><td style="width:40px;height:30px;"><label for="recentEventTime">时间</label></td>'
						+'<td  style="width:220px;"><input class="form-control" type="text" id="recentEventTime" style="width:200px;"/></td>'
						+'</tr>'
						+'<tr style="height:30px;"><td><label for="eventDrawDepartment">部门</label> </td>'
						+'<td><select class="form-control" type="text" id="eventDrawDepartment" style="width:200px;"></select></td>'
						+'<td><button type="button" class="btn btn-default" id="eventDrawSubmit" title="查询">'
						+'<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">'
						+'</button></td>'
						+'</tr>'
						+'</table>'
						+'<div  id="gridCond">'
						+'<table style="width: 100%;">'
						+'<thead>'
						+'<tr style="width: 100%; height: 38px; background-color: #E6E6E6;">'
						+'<th style="width:80px; text-align: center; color: #058563;">部门</th>'
						+'<th style="width:150px; text-align: center; color: #058563;">时间</th>'
						+'<th style="text-align: center; color: #058563;">定位</th>'
						+'</tr>'
						+'</thead>'
						+'</table>'
						+'<table id="eventDrawTable" lay-filter="eventDrawFilter"></table>'
						+'</div>'
					$("#eventDrawDivHead").html(html);
					analysis.loadRecentEvent();
				});
				$("#reportEvent").off().on("click",function(){
					$("#reportEvent").css({"background-color":"#058563","color":"#fff"});
					$("#recentEvent").css({"background-color":"transparent","color":"#555;"});
					$("#sosAlert").css({"background-color":"transparent","color":"#555;"});
					var html='<table id="formTable">'
							+'<tr><td style="width:40px;height:30px;">部门</td>'
							+'<td style="width:130px;"><select class="form-control" type="text" id="eventDrawDepartment" style="width:120px;"></select></td>'
							+'<td style="width:40px;">姓名 </td>'
							+'<td><input class="form-control" type="text" id="personName" style="width:115px;"/></td>'
							+'</tr>'
							+'<tr style="height:30px;">'
							+'<td><label for="reportEventTime">时间</label></td>'
							+'<td colspan="3"><input class="form-control" type="text" id="reportEventTime" style="width:200px;"/></td>'
							+'</tr>'
							+'<tr style="height:30px;">'
							+'<td>状态 </td>'
							+'<td colspan="3"><select id="readState" class="form-control" style="width:200px; padding-left: 3px;float:left;">'
							+'<option value=5>全部</option>'
							+'<option value=0>未读</option>'
							+'<option value=1>已读</option>'
							+'<option value=2>已回复</option></select>'
							+'<button style="margin-left:30px;float:left;" type="button" class="btn btn-default" id="eventDrawSubmit" title="查询">'
							+'<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">'
							+'</button></td>'
							+'</tr>'
							+'</table>'
							+'<div  id="gridCond">'
							+'<table style="width: 100%;">'
							+'<thead>'
							+'<tr style="width: 100%; height: 38px; background-color: #E6E6E6;">'
							+'<th style="width:60px; text-align: center; color: #058563;">人员</th>'
							+'<th style="width:130px; text-align: center; color: #058563;">时间</th>'
							+'<th style="width:60px; text-align: center; color: #058563;">详情</th>'
							+'<th style="text-align: center; color: #058563;">定位</th>'
							+'</tr>'
							+'</thead>'
							+'</table>'
							+'<table id="eventDrawTable" lay-filter="eventDrawFilter"></table>'
							+'</div>';	
					$("#eventDrawDivHead").html(html);
					analysis.loadReportEvent();
				});
				$("#sosAlert").off().on("click",function(){
					$("#sosAlert").css({"background-color":"#058563","color":"#fff"});
					$("#reportEvent").css({"background-color":"transparent","color":"#555;"});
					$("#recentEvent").css({"background-color":"transparent","color":"#555;"});
					var html='<table id="formTable">'
						+'<tr><td style="width:40px;height:30px;">部门</td>'
						+'<td style="width:130px;"><select class="form-control" type="text" id="eventDrawDepartment" style="width:120px;"></select></td>'
						+'<td style="width:40px;">姓名 </td>'
						+'<td><input class="form-control" type="text" id="personName" style="width:115px;"/></td>'
						+'</tr>'
						+'<tr style="height:30px;">'
						+'<td><label for="sosAlertTime">时间</label></td>'
						+'<td colspan="3"><input class="form-control" type="text" id="sosAlertTime" style="width:200px;"/></td>'
						+'</tr>'
						+'<tr style="height:30px;">'
						+'<td>状态 </td>'
						+'<td colspan="3"><select id="readState" class="form-control" style="width:200px; padding-left: 3px;float:left;">'
						+'<option value=5>全部</option>'
						+'<option value=0>未读</option>'
						+'<option value=1>已读</option>'
						+'<option value=2>已回复</option></select>'
						+'<button style="margin-left:30px;float:left;" type="button" class="btn btn-default" id="eventDrawSubmit" title="查询">'
						+'<img src="/ResourceMonitor/images/indexpage/search.png" class="" alt="查询">'
						+'</button></td>'
						+'</tr>'
						+'</table>'
						+'<div  id="gridCond">'
						+'<table style="width: 100%;">'
						+'<thead>'
						+'<tr style="width: 100%; height: 38px; background-color: #E6E6E6;">'
						+'<th style="width:100px; text-align: center; color: #058563;">人员</th>'
						+'<th style="width:130px; text-align: center; color: #058563;">时间</th>'
						+'<th style="text-align: center; color: #058563;">定位</th>'
						+'</tr>'
						+'</thead>'
						+'</table>'
						+'<table id="eventDrawTable" lay-filter="eventDrawFilter"></table>'
						+'</div>';
					$("#eventDrawDivHead").html(html);
					analysis.loadSosAlert();
				});
			});
			$("#closeEventDraw").off().on("click",function(){
				$("#panelEventDraw").css("display","none");
			});
			
			//最近设施分析
			$("#nav").on("click","#clostestFacilityId",function(){
				layer.closeAll();
				analysis.funCloseAllPanel();
				choosedFlag=false;
				signPointFlag=false;
				document.body.style.cursor='default';
				analysis.isDrawing=false;
         	    clearLocationDiv();
         	    clearAll();
				$("#panelEventDraw").css("display","none");
				analysis.funClosestFacilityAnalysis();
				
			});
			//最短路径分析
			$("#nav").on("click","#routeId",function(){
				layer.closeAll();
				analysis.funCloseAllPanel();
				choosedFlag=false;
				signPointFlag=false;
				document.body.style.cursor='default';
				analysis.isDrawing=false;
         	    clearLocationDiv();
        	    clearAll();
				$("#panelEventDraw").css("display","none");
				analysis.funRouteAnalysis();
			});
			$("#simpleQueryId").off().on("click",function(){
				analysis.funCloseAllPanel();
				choosedFlag=false;
				signPointFlag=false;
				document.body.style.cursor='default';
				analysis.isDrawing=false;
         	    clearLocationDiv();
        	    clearAll();
				$("#panelEventDraw").css("display","none");
				analysis.funSimpleQuery();
			});
			//视域分析
			$("#nav").on("click","#viewshedId",function(){
				layer.closeAll();
				analysis.funCloseAllPanel();
				choosedFlag=false;
				signPointFlag=false;
				document.body.style.cursor='default';
				analysis.isDrawing=false;
         	    clearLocationDiv();
        	    clearAll();
				$("#panelEventDraw").css("display","none");
				analysis.funViewShedAnalysis();
			});
			$("#nav").on("click","#tongshiId",function(){
				layer.closeAll();
				analysis.funCloseAllPanel();
				choosedFlag=false;
				signPointFlag=false;
				document.body.style.cursor='default';
				analysis.isDrawing=false;
         	    clearLocationDiv();
        	    clearAll();
				$("#panelEventDraw").css("display","none");
				analysis.funPointVisibilityAnalysis();
			});
			$("#nav").on("click","#separatorId",function(){
				layer.closeAll();
				analysis.funCloseAllPanel();
				choosedFlag=false;
				signPointFlag=false;
				document.body.style.cursor='default';
				analysis.isDrawing=false;
         	    clearLocationDiv();
        	    clearAll();
				$("#panelEventDraw").css("display","none");
				analysis.funBufferLine();
			});
			$("#nav").on("click","#bufferComputedId",function(){
				layer.closeAll();
				analysis.funCloseAllPanel();
				choosedFlag=false;
				signPointFlag=false;
				document.body.style.cursor='default';
				analysis.isDrawing=false;
         	    clearLocationDiv();
        	    clearAll();
				$("#panelEventDraw").css("display","none");
				analysis.funPntBufferAnalysis();
			});
			//灾害损失评估
			$("#nav").on("click","#lossComputedId",function(){
				layer.closeAll();
				analysis.funCloseAllPanel();
				choosedFlag=false;
				signPointFlag=false;
				document.body.style.cursor='default';
				analysis.isDrawing=false;
         	    clearLocationDiv();
        	    clearAll();
				$("#panelEventDraw").css("display","none");
				analysis.funFireComputed();
			});
		})
	},
	//关闭所有弹窗
	funCloseAllPanel:function(){
		VrmarkLayer.removeAll();
		$('#drawResourceQuery').css('display','none');
		$('#topSearchDiv').css('display','none');
		$("[id^='panel']").hide();
		$("#iconFlight").css("color","#6e6e6e");
		$("#Flight").css("background-color","rgb(255, 255, 255)");
		locationLayer.removeAll();
		$('#flightEchart').css('visibility','hidden');
		$('#time_slider_div').css('display','none');
  		view.center=view.center;
        if(eChartTimer!=null){
        	clearInterval(eChartTimer);
        	eChartTimer=null;
        }
		document.getElementById("intelQueryDiv").style.visibility = "hidden";
		analysis.funClearLayerGraphics();
		$('#resourceQueryResultDiv').css('display','none');
		$('#drawResourceQueryResultDiv').css('display','none');
		layer.close(layerIndex);
	},
	//清空空间分析图层
	funClearLayerGraphics:function(){
   	 	layer.close(this.bodyIndex);
   	 	choosedFlag=false;
   	 	signPointFlag=false;
   	 	document.body.style.cursor='default';
   	 	analysis.isDrawing=false;
   	 	map.remove(dynamic_layers);
		dingweiLayer.removeAll();
		analysisPointLayer.removeAll();
		analysisGraphicLayer.removeAll();
		signFlagLayer.removeAll();
		drawResourceLayer.removeAll();
		highlightRouteLyr.removeAll();
	},
	//清空空间分析弹窗
	funClearLayers:function(){
   	 	layer.close(this.bodyIndex);
   	 	choosedFlag=false;
   	 	signPointFlag=false;
   	 	document.body.style.cursor='default';
	},
	lonlatLocator:function(lon,lat){
		this.funEventLocator({lon,lat});
	},
	//点击定位图标进行定位
    funEventLocator:function (obj){
    	require(["esri/Graphic"], function(Graphic) {
            var point = {
                type: "point", 
                x: obj.lon,
                y: obj.lat,
            };
        	var dingweiSymbol = {
                type: "point-3d", 
                symbolLayers: [{
                  type: "icon", 
                  size:24,
                  resource: { href:"/ResourceMonitor/images/mark/32/eventDisp_07.png" }           
                }
                ],             
            };
        	var graphic = new Graphic();
    		graphic.geometry=point;
    		graphic.symbol=dingweiSymbol;
    		dingweiLayer.removeAll();
    		dingweiLayer.add(graphic);
    		view.goTo({
               target :graphic,
               heading : 0,
               tilt : 45,
               scale :50000
            }, {
               speedFactor : 1,
               easing : 'ease-out'
            });
    	});
    },	
    //打开事件选择弹窗
	funOpenEventChoice:function(){
		layer.close(this.eventChoice);
		this.offsetLeft=450;
		if(this.layerName=='最近设施分析'){
			this.offsetLeft=442;
		}else if(this.layerName=='路径分析'){
			this.offsetLeft=449;
		}else if(this.layerName=='隔离带设置'){
			this.offsetLeft=458;
		}else if(this.layerName=='缓冲区分析'){
			this.offsetLeft=438;
		}
    	 if(!$('#nav').hasClass('nav-mini')){
    		 this.offsetLeft+=115;
    	 }
		this.eventChoice = layer.open({
			//id:"eventChoice",
			type : 2,
			title : "选择已录入事件",
			shadeClose : false,
			area : [ '400px', '400px' ],
			offset : ['60px',this.offsetLeft+'px'],
			shade : 0,
			resize : false,
			skin: 'layer-class',
			content : '../analysis/eventLocation.jsp',
			cancel: function(index, layero){ 
 				if(this.layerName=='路径分析'){
					var body = layer.getChildFrame('body', this.bodyIndex); 
					body.contents().find("#radioStartPnt").prop("disabled",true);
					body.contents().find("#radioEndPnt").prop("disabled",true);
				} 
			} 
		});	
	},
   	//点缓冲区分析
    funPntBufferAnalysis:function() {
    	layer.close(this.bodyIndex);
    	this.layerName='缓冲区分析';
    	var layerLeft ='175px'; 
    	if($('#nav').hasClass('nav-mini')){
    		layerLeft='75px';
    	}
    	this.bodyIndex = layer.open({
          type : 2,
          title : '缓冲区分析',
          shadeClose : false,
          btn : [ '确定', '取消' ],
          area : [ '380px', '400px' ],
          offset:['60px',layerLeft],
          shade : 0,
          resize : false,
          skin: 'layer-class',
          content : '../analysis/pntBuffer.jsp',
          yes:function (index, layero){
               $(layero).find("iframe")[0].contentWindow.sumbit(analysis.bodyIndex);
          },
          end : function(index, layero) {
        	  	layer.close(index);
				layer.close(analysis.eventChoice);
				$("#bufferComputedId").parent().css("color","rgb(51, 51, 51)");
				$("#bufferComputedId").parent().css("background","");
          }             
          ,cancel:function(){
         	 $("#bufferComputedId").parent().css("color","rgb(51, 51, 51)");
         	 $("#bufferComputedId").parent().css("background","");
          }
      });
   },
   //缓冲区分析
   funDobufferAna:function (bufferParams) {
	   this.funClearLayerGraphics();
	   layer.close(analysis.eventChoice);
       require([ "esri/geometry/Point","esri/Graphic","esri/geometry/geometryEngine", "esri/tasks/support/Query","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol","esri/Color","esri/geometry/Circle"],
               function(Point, Graphic,geometryEngine,Query,SimpleLineSymbol,SimpleFillSymbol,Color,Circle){
           var polySym = {
               type : "simple-fill", // autocasts as new SimpleFillSymbol()
               color : [ 1, 97, 255, 0.2 ],//[250,128,114][233,150,122]
               outline : {
                   color : [ 255, 255, 0, 1 ],
                   width : 2
               }
           };

           var pointSym = {
                type: "point-3d",  // autocasts as new PointSymbol3D()
                 symbolLayers: [{
                   type: "icon",  // autocasts as new ObjectSymbol3DLayer()
                   size:24,
                   resource: { href: "/ResourceMonitor/images/mark/32/huanchong.png" },
                   //material: { color: "red" }
                 }],
                 verticalOffset: {
                       screenLength: 0,
                       maxWorldLength: 36000,
                       minWorldLength: 1
                     },
                 callout: {
                       type: "line",  // autocasts as new LineCallout3D()
                       size: 1.5,
                       color: [150, 150, 150],
                       border: {
                         color: [50, 50, 50]
                       }
                     }
               };

           var bufPnts = new Array();
           var bufRadius = new Array();
           for(var gradeIndex=0;gradeIndex<bufferParams.bufferGrade;gradeIndex++){
                var pt = new Point(bufferParams.longtitude, bufferParams.latitude);
                pt.hasZ = false;
                pt.z = undefined;
                bufPnts.push(pt);
           
                bufRadius.push(bufferParams.bufferRadius+gradeIndex*bufferParams.gradeInterval);
            }

           progressDlg=layer.load(0, {shade: false});
           var buffer = geometryEngine.geodesicBuffer(bufPnts, bufRadius,
                   "meters");
           for(var circleIndex=0;circleIndex<buffer.length;circleIndex++){
        	   analysisGraphicLayer.add(new Graphic({
                     geometry: buffer[circleIndex],
                     symbol: polySym
                 }));
            }

           //查找缓冲区内瞭望塔、管护站、居民点、有林地面积
           var lindiTR = '';
           var ghzTR = '';
           var lwtTR = '';
           var jmdTR = '';
    	   for(var i=0;i<bufferParams.bufferGrade;i++){
               lindiTR+='<tr><td><span>&nbsp;&nbsp;&nbsp;&nbsp;'+(bufferParams.bufferRadius+i*bufferParams.gradeInterval)+'米内林地面积:</span></td>'
               +'<td><span id="lindiSpan'+i+'">正在查找</span></td></tr>';
               ghzTR+='<tr><td><span>&nbsp;&nbsp;&nbsp;&nbsp;'+(bufferParams.bufferRadius+i*bufferParams.gradeInterval)+'米内管护站数量:</span></td>'
               +'<td><span id="ghzSpan'+i+'">正在查找</span></td></tr>';
               lwtTR+='<tr><td><span>&nbsp;&nbsp;&nbsp;&nbsp;'+(bufferParams.bufferRadius+i*bufferParams.gradeInterval)+'米内瞭望塔数量:</span></td>'
               +'<td><span id="lwtSpan'+i+'">正在查找</span></td></tr>';
               jmdTR+='<tr><td><span>&nbsp;&nbsp;&nbsp;&nbsp;'+(bufferParams.bufferRadius+i*bufferParams.gradeInterval)+'米内居民点数量:</span></td>'
               +'<td><span id="jmdSpan'+i+'">正在查找</span></td></tr>';
    	   }
            var htmlStr = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;">'
                    + '<table class="layui-table" lay-size="sm" lay-skin="line" style="text-align:left;margin-bottom:-1px"><tbody>'
                    + '<tr id="lindiTR"><td colspan="2"><span style="font-weight:bold">缓冲区内林地面积：</span></td></tr>'
                    + lindiTR
                    + '<tr id="ghzTR"><td colspan="2"><span style="font-weight:bold">缓冲区内管护站数量：</span></td></tr>'
                    + ghzTR
                    + '<tr id="lwtTR"><td colspan="2"><span style="font-weight:bold">缓冲区内瞭望塔数量：</span></td></tr>'
                    + lwtTR
                    + '<tr id="jmdTR"><td colspan="2"><span style="font-weight:bold">缓冲区内居民点数量：</span></td></tr>'
                    + jmdTR
                    + '</tbody></table></div>';
            layer.close(analysis.layerMessageIndex);
            analysis.layerMessageIndex=layer.open({
                type : 1,
                shade:0,
                title : ["灾害损失评估", 'font-size:12px;'],
                content : htmlStr,
                offset:  'r',
                anim: -1,
                area: ['270px', '450px'],
                isOutAnim: false,
             });
            var bufferPnt = {
                type : "point", // autocasts as new Point()
                x : bufferParams.longtitude,
                y : bufferParams.latitude,
                z : 0
            };
            var mercator = lonlat2mercator({x:parseFloat(bufferParams.longtitude),y:parseFloat(bufferParams.latitude)});
            var mercatorPnt = new Point(mercator.x, mercator.y,view.spatialReference);
            var bufferLeng = parseFloat(bufferParams.bufferRadius)+(bufferParams.bufferGrade-1)*parseFloat(bufferParams.gradeInterval);
            var bufferMercator = geometryEngine.geodesicBuffer(mercatorPnt, bufferLeng,"meters");
            for(var i=0;i<bufferParams.bufferGrade;i++){
                analysis.loopLinDiQueryTask(xbQueryTask,bufferMercator,buffer,bufferParams.bufferRadius,bufferParams.gradeInterval,i,bufferParams.bufferGrade==(i+1));
                analysis.loopBuffQueryTask(fhzQueryTask,0,buffer,bufferParams.bufferRadius,bufferParams.gradeInterval,i);
                analysis.loopBuffQueryTask(lwtQueryTask,1,buffer,bufferParams.bufferRadius,bufferParams.gradeInterval,i);
                analysis.loopBuffQueryTask(jmdQueryTask,2,buffer,bufferParams.bufferRadius,bufferParams.gradeInterval,i);
            }
            layer.close(progressDlg);
			var graphic=new Graphic({
               geometry : bufferPnt,
               symbol : pointSym
           })
			analysisPointLayer.add(graphic);
            view.goTo({
                target : graphic,
                tilt : 45,
                zoom:13
            });
           layer.close(pntBufferDlgIndex);
       });
   },
   //遍历各级缓冲区内小班林地面积
   loopLinDiQueryTask:function (task,bufferMercator,bufferCircles,bufferRadius,gradeInterval,circleIndex,isLast){
       require(["esri/geometry/geometryEngine", "esri/tasks/support/Query","esri/tasks/Geoprocessor","esri/tasks/support/FeatureSet","esri/Graphic"],function(geometryEngine,Query,Geoprocessor,FeatureSet,Graphic) {
           if(isLast){
        	   var gp=new Geoprocessor("http://58.18.226.130:6080/arcgis/rest/services/Clip/GPServer/Clip");
           	   var inputGraphicContainer = [];
               var graphic = new Graphic({
                  geometry : bufferMercator
               });
       	       inputGraphicContainer.push(graphic);
               var featureSet = new FeatureSet();
               featureSet.features = inputGraphicContainer;
          	   var params={
              		 'input':featureSet
               };
          	   gp.submitJob(params).then(function(data){
                  var jobId = data.jobId;
                  var status = data.jobStatus;
                  if(status=="job-succeeded"){
                     gp.getResultData(jobId, "Output").then(function(result){
                     	var features=result.value.features;
                	    for(var i=0;i<features.length;i++){
                			var symbol = {
                				type: "simple-fill",  // autocasts as new SimpleFillSymbol()
        			         	 color: [ 244, 134, 186, 0.5],
        			         	 outline: {  // autocasts as new SimpleLineSymbol()
        			         		width: 1,
            			         	color: [ 255, 0, 0, 1]
        			      	 	 }
	                		};
		                	var graphic = new Graphic({
		                		geometry: features[i].geometry,
		                		symbol: symbol
		                	});
		                	analysisGraphicLayer.add(graphic);
                	    }
                     })
                   }
                })
           }
    	   var query = new Query();
           query.distance = 1;
           query.outFields = ["FID","DI_LEI","MIAN_JI"];
           query.units = "meters";
           query.spatialRelationship = "intersects";
           query.returnGeometry = true;
           query.geometry = bufferCircles[circleIndex]; 
           task.execute(query).then(function(result){
        	   	var lindiList = [];//林地的FID
                var sumArea_pingcha=0;
                var dilei_lindi=['0111','0120','0131','0132','0141','0142','0150'];
                for(var j=0;j<result.features.length;j++){
                    var graphic=result.features[j];
                     var attributes = graphic.attributes;
                     var intersectGeo=geometryEngine.intersect(graphic.geometry,query.geometry);
                     if(dilei_lindi.indexOf(attributes.DI_LEI)!==-1){
                         var ratio=geometryEngine.geodesicArea(intersectGeo,'square-meters')/geometryEngine.geodesicArea(graphic.geometry,'square-meters');
                         sumArea_pingcha+=attributes.MIAN_JI *ratio;
                         lindiList.push(attributes["FID"]);
                     }
                }
                var forestArea_pingcha=sumArea_pingcha.toFixed(2);
                $("#lindiSpan"+circleIndex).html(forestArea_pingcha+'公顷');
            });
       });
   } ,
   //遍历各级管护站数量、瞭望塔数量、居民点数量
   loopBuffQueryTask:function (task,taskIndex,bufferCircles,bufferRadius,gradeInterval,circleIndex){
       require(["esri/geometry/geometryEngine", "esri/tasks/support/Query"],function(geometryEngine,Query) {
           var query = new Query();
           query.distance = 1;
           query.outFields = ["*"];
           query.units = "meters";
           query.spatialRelationship = "contains";
           query.returnGeometry = true;
       	   query.geometry = bufferCircles[circleIndex]; 
              task.executeForCount(query).then(function(count){
               	   if(taskIndex==0){
                   		$("#ghzSpan"+circleIndex).html(count+'个');
               	   }else if(taskIndex==1){
                   		$("#lwtSpan"+circleIndex).html(count+'个');
               	   }else if(taskIndex==2){
      			   		$("#jmdSpan"+circleIndex).html(count+'个');
               	   }
              });
       });
   },
    //打开视域分析弹窗
    funViewShedAnalysis:function () {
    	 layer.close(this.bodyIndex);
    	 this.layerName ='可视范围分析';
     	var layerLeft ='175px'; 
    	if($('#nav').hasClass('nav-mini')){
    		layerLeft='75px';
    	}
		 this.bodyIndex = layer.open({
	         type : 2,
	         title : '可视范围分析',
	         shadeClose : false,
	         btn : [ '确定', '取消' ],
	         area : [ '380px', '310px'],
	         offset : [ '60px', layerLeft],
	         shade : 0,
	         resize : false,
	         skin: 'layer-class',
	         content : '../analysis/viewShed.jsp',
	         yes : function(index, layero) {
	             $(layero).find("iframe")[0].contentWindow.sumbit();
	         },
	         end : function(index, layero) {
	         }
             ,cancel:function(){
             }
	     });
	 },
     //可视范围分析
	 funDoViewShedAna:function(viewShedParams) {
		 this.funClearLayerGraphics();
	      require([ "esri/geometry/Point", "esri/Graphic","esri/tasks/support/FeatureSet","esri/tasks/support/LinearUnit",
	              "esri/tasks/Geoprocessor","esri/geometry/geometryEngine" ],
	          function(Point, Graphic,FeatureSet,LinearUnit, Geoprocessor, geometryEngine) {
	              var observerPnt = new Point(viewShedParams.longtitude,viewShedParams.latitude);
	              var sumArea=(viewShedParams.radius * viewShedParams.radius)*Math.PI;
	
	              var pointSym = {
	                   type: "point-3d",  // autocasts as new PointSymbol3D()
	                    symbolLayers: [{
	                      type: "icon",  // autocasts as new ObjectSymbol3DLayer()
	                      size:24,
	                      resource: { href: "/ResourceMonitor/images/mark/32/shiyu.png" },
	                      //material: { color: "red" }
	                    }],
	                    verticalOffset: {
	                          screenLength: 0,
	                          maxWorldLength: 36000,
	                          minWorldLength: 1
	                        },
	                    callout: {
	                          type: "line",  // autocasts as new LineCallout3D()
	                          size: 1.5,
	                          color: [150, 150, 150],
	                          border: {
	                            color: [50, 50, 50]
	                          }
	                        }
	                  };
	
	              var observerGraphic = new Graphic({
	                  geometry : observerPnt,
	                  symbol : pointSym
	              });
	              analysisPointLayer.add(observerGraphic);
	              
	              var inputGraphicContainer = [];
	              inputGraphicContainer.push(observerGraphic);
	              var featureSet = new FeatureSet();
	              featureSet.features = inputGraphicContainer;
	              
	              var vsDistance = new LinearUnit();
	              vsDistance.distance = viewShedParams.radius;
	              vsDistance.units = "meters";
	          
	              var params = {
	                  "observer_point": featureSet,
	                  "outer_radius": viewShedParams.radius,
	                  "buf_radius": vsDistance,
	                  "observer_offset ":viewShedParams.observerOffset
	              };
	
	              var fillSymbol = {
	                  type : "simple-fill", // autocasts as new SimpleFillSymbol()
	                  color : [ 226, 119, 40, 0.75 ],
	                  outline : { // autocasts as new SimpleLineSymbol()
	                      color : [ 255, 255, 255 ],
	                      width : 1
	                  }
	              };
	
	              var gpUrl = "http://58.18.226.130:6080/arcgis/rest/services/VisibilityAnalysis/GPServer/VisibilityModel";
	              var gp = new Geoprocessor(gpUrl);
	              gp.outSpatialReference = { // autocasts as new SpatialReference()
	                  wkid : 102100
	              };
	              var index = layer.load(0, {shade : false}); //0代表加载的风格，支持0-2
	              layer.close(viewshedDlgIndex);
	              gp.submitJob(params).then(function(data) {
	           	   var jobId = data.jobId;
	                  var status = data.jobStatus;
	                  if(status=="job-succeeded"){
	               	   gp.getResultData(jobId, "output_polygons").then(function(result){
	                           var resultFeatures = result.value.features; 
	                           var viewshedGraphics = resultFeatures.map(function(feature) {
	                               feature.symbol = fillSymbol;
	                               return feature;
	                            });
	                            
	                            var sumViewShedArea=0;
	                            for(var i=0;i<viewshedGraphics.length;i++){
	                                sumViewShedArea+=geometryEngine.planarArea(viewshedGraphics[i].geometry,'square-meters');
	                            }
	                            var visibleRate=Math.round(sumViewShedArea*100/sumArea);
	                            analysisGraphicLayer.addMany(viewshedGraphics);
	                            view.goTo({
	                                target : viewshedGraphics,
	                                heading : 0,
	                                tilt : 45,
	                            });
	                            layer.close(analysis.layerMessageIndex);
	                            analysis.layerMessageIndex=layer.open({
	                                type: 1, 
	                                shade: false,
	                                content: '<div style="padding: 10px 15px 10px 15px;">当前位置可视范围占比'+visibleRate+'%</div><br/>' ,
	                                offset: 'rb',
	                                title:'可视范围分析结果'
	                            });
	                            layer.close(index);
	               	   });
	                  }else{
	                	  layer.close(analysis.layerMessageIndex);
	                	  analysis.layerMessageIndex=layer.open({
	                          type: 1, 
	                          shade: false,
	                          content: '可视分析失败' ,
	                          offset: 'rb',
	                          title:'可视范围分析结果'
	                      });
	               	   layer.close(index);
	                  }
	           	  
	              });
	          });
      },
    //打开通视分析弹窗
     funPointVisibilityAnalysis:function (){
    	 layer.close(this.bodyIndex);
    	 this.layerName ='通视分析';
      	var layerLeft ='175px'; 
    	if($('#nav').hasClass('nav-mini')){
    		layerLeft='75px';
    	}
	   	 this.bodyIndex = layer.open({
            type : 2,
            title : '通视分析',
            shadeClose : false,
            btn : [ '确定', '取消' ],
            area : [ '370px', '390px' ],
            offset:['60px',layerLeft],
            shade : 0,
            resize : false,
            skin: 'layer-class',
            content : '../analysis/pointVisibility.jsp',
            yes : function(index, layero) {
                $(layero).find("iframe")[0].contentWindow.sumbit();
            },
            end : function(index, layero) {
            }
        });
    },	
    funDoPntVisibilityAnalysis :function (pntVisibilityParams){
      this.funClearLayerGraphics();
  	  require([ "esri/geometry/Point","esri/geometry/Polyline", "esri/Graphic",
  		  "esri/tasks/support/FeatureSet","esri/tasks/Geoprocessor",
  		  "esri/geometry/geometryEngine","dojo/domReady!" ],
        function(Point,Polyline, Graphic, FeatureSet,Geoprocessor,geometryEngine) {
  		  //设定通视分析参数
             var stopSymbol = {
                type : "simple-marker", // autocasts as new SimpleMarkerSymbol()
                style : "cross",
                size : 15,
                outline : { // autocasts as new SimpleLineSymbol()
                    width : 4
                 }
              };

              var startPnt = new Point(pntVisibilityParams.longtitudeStart,pntVisibilityParams.latitudeStart);
              var endPnt = new Point(pntVisibilityParams.longtitudeEnd,pntVisibilityParams.latitudeEnd);
              var startPntGraphic = new Graphic({
                  geometry : startPnt,
                  symbol : stopSymbol
              });

               var endPntGraphic = new Graphic({
                   geometry : endPnt,
                   symbol : stopSymbol
               });

               var observerGraphics = [];
               observerGraphics.push(startPntGraphic);
               var observerFeatureSet = new FeatureSet();
               observerFeatureSet.features = observerGraphics;
               
               var targetGraphics = [];
               targetGraphics.push(endPntGraphic);
               var targetFeatureSet = new FeatureSet();
               targetFeatureSet.features = targetGraphics;
               var params = {
                   "observer_points": observerFeatureSet,
                   "target_features": targetFeatureSet,
               };
               
               //绘制观测点、目标点、视线
               var startPntSymbol = {
                 type: "point-3d",  // autocasts as new PointSymbol3D()
                  symbolLayers: [{
                    type: "icon",  // autocasts as new ObjectSymbol3DLayer()
                    size:24,
                    resource: { href: "/ResourceMonitor/images/mark/32/observer_pnt_icon.png" },
                  }],
                  verticalOffset: {
                     screenLength: 0,
                     maxWorldLength: 36000,
                     minWorldLength: 1
                  },
                  callout: {
                     type: "line",  // autocasts as new LineCallout3D()
                     size: 1.5,
                     color: [150, 150, 150],
                     border: {
                       color: [50, 50, 50]
                     }
                  }
               };
                  
               var endPntSymbol = {
                  type: "point-3d",  // autocasts as new PointSymbol3D()
                  symbolLayers: [{
                     type: "icon",  // autocasts as new ObjectSymbol3DLayer()
                     size:24,
                     resource: { href: "/ResourceMonitor/images/mark/32/target_pnt_icon.png" },
                   }],
                   verticalOffset: {
                      screenLength: 0,
                      maxWorldLength: 36000,
                      minWorldLength: 1
                   },
                   callout: {
                      type: "line",  // autocasts as new LineCallout3D()
                      size: 1.5,
                      color: [150, 150, 150],
                      border: {
                        color: [50, 50, 50]
                      }
                   }
               };
               
               // Define the symbology used to display the route
               
               var sightline = {
         		     type: "polyline",  
         		     paths: [[startPnt.x,startPnt.y],[endPnt.x,endPnt.y]]
         		  };
               var startStopGraphic=new Graphic({
                   geometry : startPnt,
                   symbol : startPntSymbol
               });
               var endStopGraphic=new Graphic({
                   geometry : endPnt,
                   symbol : endPntSymbol
               });
               analysisPointLayer.add(startStopGraphic);
               analysisPointLayer.add(endStopGraphic);
               
               
               //通视分析
               var gp = new Geoprocessor("http://58.18.226.130:6080/arcgis/rest/services/PointVisibilityAnalysis/GPServer/VisibilityAnalysis");
               var index = layer.load(0, {shade : false}); //0代表加载的风格，支持0-2
               gp.submitJob(params).then(function(data) {
            	     var jobId = data.jobId;
                   var status = data.jobStatus;
                   if(status=="job-succeeded"){
                	   gp.getResultData(jobId, "sightline_results").then(function(result){
                           var resultFeatures = result.value.features; 
                            var isVisible=resultFeatures[0].attributes.TarIsVis;
                            var resultTip=isVisible===0?"两点间不可通视":"两点间可通视";
                            if(isVisible==0){
                          	  sightLineSymbol = {
                                    type : "simple-line", // autocasts as SimpleLineSymbol()
                                    color : [ 255, 0, 0, 0.8 ],
                                    width : 5
                                };  
                            }else{
                          	  sightLineSymbol = {
                                    type : "simple-line", // autocasts as SimpleLineSymbol()
                                    color : [ 0, 255, 0, 0.8 ],
                                    width : 5
                                }; 
                            }
          		    	  var sightlineGraphic = new Graphic({
         		    		     geometry: sightline,   
         		    		     symbol: sightLineSymbol,   
         		    		  });
          		    	   analysisPointLayer.add(sightlineGraphic);
          		    	   layer.close(analysis.layerMessageIndex);
          		    	   analysis.layerMessageIndex=layer.open({
                                type: 1, 
                                shade: false,
                                content: '<div style="padding: 10px 15px 10px 15px;">'+resultTip+'</div><br/>' ,
                                offset: 'rb',
                                title:'通视分析结果'
                            });
                            layer.close(index);
                	   });
                   }else{
                	   layer.close(analysis.layerMessageIndex);
                	   analysis.layerMessageIndex=layer.open({
                           type: 1, 
                           shade: false,
                           content: '通视分析失败' ,
                           offset: 'rb',
                           title:'通视分析结果'
                       });
                	   layer.close(index);
                   }
               });   
    	  });
    },
	   //路径分析弹窗
     funRouteAnalysis:function () {
    	 layer.close(this.bodyIndex);
    	 this.layerName ='路径分析';
       	var layerLeft ='175px'; 
    	if($('#nav').hasClass('nav-mini')){
    		layerLeft='75px';
    	}
    	 this.bodyIndex = layer.open({
             type : 2,
             title : '路径分析',
             shadeClose : false,
             btn : [ '确定', '取消' ],
             area : [ '390px', '430px' ],
             offset:['60px',layerLeft],
             shade : 0,
             resize : false,
             skin: 'layer-class',
             content : '../analysis/routeConfig.jsp',
             yes : function(index, layero) {
                 $(layero).find("iframe")[0].contentWindow.sumbit();
             },
             end : function(index, layero) {
             },
             cancel:function(){
             }
         });
     },
	   //路径分析计算
     funDoRouteAna:function(routeAnaParams) {
    	 this.funClearLayerGraphics();
         require([ "esri/geometry/Point", "esri/Graphic","esri/tasks/RouteTask","esri/tasks/support/RouteParameters",
             "esri/tasks/support/FeatureSet","esri/geometry/geometryEngine","esri/views/2d/draw/Draw",
             "esri/Graphic",
             "esri/geometry/Polyline",
             "esri/geometry/geometryEngine",
				"dojo/domReady!" ],
         function(Point, Graphic, RouteTask, RouteParameters,FeatureSet,geometryEngine,Draw, Graphic,
      		      Polyline, geometryEngine) {
             // Point the URL to a valid route service
             var routeTask = new RouteTask({
                 url : "http://58.18.226.130:6080/arcgis/rest/services/road_analyst/NAServer/%E8%B7%AF%E5%BE%84"
             });

             // Setup the route parameters
             var routeParams = new RouteParameters({
                 stops : new FeatureSet(),
                 outSpatialReference : { // autocasts as new SpatialReference()
                     wkid : 102100
                 },
             });

             // Define the symbology used to display the stops
             var stopSymbol = {
                 type : "simple-marker", // autocasts as new SimpleMarkerSymbol()
                 style : "cross",
                 size : 15,
                 outline : { // autocasts as new SimpleLineSymbol()
                     width : 4
                 }
             };
             
             var startPntSymbol = {
                  type: "point-3d",  // autocasts as new PointSymbol3D()
                   symbolLayers: [{
                     type: "icon",  // autocasts as new ObjectSymbol3DLayer()
                     size:24,
                     resource: { href: "/ResourceMonitor/images/mark/32/qidian.png" },
                   }],
                   verticalOffset: {
                         screenLength: 0,
                         maxWorldLength: 36000,
                         minWorldLength: 1
                       },
                   callout: {
                         type: "line",  // autocasts as new LineCallout3D()
                         size: 1.5,
                         color: [150, 150, 150],
                         border: {
                           color: [50, 50, 50]
                         }
                       }
                 };
             
             var endPntSymbol = {
                  type: "point-3d",  // autocasts as new PointSymbol3D()
                   symbolLayers: [{
                     type: "icon",  // autocasts as new ObjectSymbol3DLayer()
                     size:24,
                     resource: { href: "/ResourceMonitor/images/mark/32/zhongdian.png" },
                   }],
                   verticalOffset: {
                         screenLength: 0,
                         maxWorldLength: 36000,
                         minWorldLength: 1
                       },
                   callout: {
                         type: "line",  // autocasts as new LineCallout3D()
                         size: 1.5,
                         color: [150, 150, 150],
                         border: {
                           color: [50, 50, 50]
                         }
                       }
                 };

             // Define the symbology used to display the route
             var routeSymbol = {
                 type : "simple-line", // autocasts as SimpleLineSymbol()
                 color : [ 0, 255, 0, 0.8 ],
                 width : 5
             };

             // Execute the route task if 2 or more stops are input
             var startPnt = new Point(routeAnaParams.longtitudeStart,routeAnaParams.latitudeStart);
             var endPnt = new Point(routeAnaParams.longtitudeEnd,routeAnaParams.latitudeEnd);
             var startPntGraphic = new Graphic({
                 geometry : startPnt,
                 symbol : stopSymbol
             });

             var endPntGraphic = new Graphic({
                 geometry : endPnt,
                 symbol : stopSymbol
             });
             
             var startStopGraphic=new Graphic({
                 geometry : startPnt,
                 symbol : startPntSymbol
             });
             var endStopGraphic=new Graphic({
                 geometry : endPnt,
                 symbol : endPntSymbol
             });
             analysisPointLayer.add(startStopGraphic);
             analysisPointLayer.add(endStopGraphic);

             routeParams.stops.features.push(startPntGraphic);
             routeParams.stops.features.push(endPntGraphic);
             routeParams.returnRoutes=true;
             var mercatorstartPnt=lonlat2mercator(startPnt);
             var mercatorendPnt=lonlat2mercator(endPnt);

             routeTask.solve(routeParams).then(
                 function(data){
                     var routeResult = data.routeResults[0].route;
                     var paths=routeResult.geometry.paths;
                     
                     var startPntPath=[mercatorstartPnt.x,mercatorstartPnt.y];
                     var endPntPath=[mercatorendPnt.x,mercatorendPnt.y];
					   //计算直线距离
   	   		   		   var linePaths = [[startPntPath,endPntPath]];
   					   var line = new Polyline({
   						  hasZ: false,
   						  hasM: true,
   						  paths: linePaths,
   						  spatialReference: { wkid: 102100}
   					   });
   					   var lineDistance = geometryEngine.geodesicLength(line,'kilometers');
   					   var daoluDistance = geometryEngine.geodesicLength(routeResult.geometry,'kilometers');
                     paths[0].unshift(startPntPath);
                     paths[paths.length-1].push(endPntPath);
                     routeResult.geometry.paths=paths;
                     var routeLength=geometryEngine.geodesicLength(routeResult.geometry,'kilometers');
                     var otherRouteLength=0;
                     otherRouteLength = routeLength - daoluDistance;
					   if(lineDistance<otherRouteLength&&routeAnaParams.analysisWay=="shortest"){
						   routeResult.geometry.paths=linePaths;
						   routeLength = lineDistance; 
					   }
					   routeResult.symbol = routeSymbol;
					   analysisGraphicLayer.add(routeResult);
                     view.goTo({
                         target : routeResult,
                     });
                     layer.close(analysis.layerMessageIndex);
                     analysis.layerMessageIndex=layer.open({
                           type: 1, 
                           shade: false, 
                           content: '<div style="padding: 10px 15px 10px 15px;">最短路径长度'+routeLength.toFixed(2)+'Km</div><br/>' ,
                           offset: 'rb',
                           title:'路径分析'
                     });
                 },function(err){
                     var polyline = {
                         type: "polyline",  // autocasts as new Polyline()
                         paths: [
                             [mercatorstartPnt.x,mercatorstartPnt.y],
                             [mercatorendPnt.x,mercatorendPnt.y]
                         ],
                         spatialReference: { wkid: 102100 }
                     };
                     
                     var polylineGraphic = new Graphic({
                           geometry: polyline,
                           symbol: routeSymbol,
                     });
                     view.goTo({
                         target : polylineGraphic,
                     });
                     analysisGraphicLayer.add(polylineGraphic);
                     
                     var routeLength=geometryEngine.geodesicLength(polylineGraphic.geometry,'kilometers');
                     layer.close(analysis.layerMessageIndex);
                     analysis.layerMessageIndex=layer.open({
                           type: 1, 
                           shade: false, 
                           content: '<div style="padding: 10px 15px 10px 15px;">直线距离'+routeLength.toFixed(2)+'Km</div><br/>' ,
                           offset: 'rb',
                           title:'路径分析'
                     });
                     
                 });
         });
     },
   //最近设施分析弹框
     funClosestFacilityAnalysis:function (){
    	 layer.close(this.bodyIndex);
    	 this.layerName ='最近设施分析';
    	var layerLeft ='175px'; 
    	if($('#nav').hasClass('nav-mini')){
    		layerLeft='75px';
    	}
    	 this.bodyIndex = layer.open({
			type : 2,
			title : '最近设施分析',
			shadeClose : false,
			btn : [ '确定', '取消' ],
			area : [ '385px', '350px' ],
			offset: ['60px', layerLeft],
			shade : 0,
			resize : false,
			skin: 'layer-class',
			content : '../analysis/closestFacility.jsp',
			yes : function(index, layero) {
				$(layero).find("iframe")[0].contentWindow.sumbit(this.bodyIndex);
				if(this.eventChoice!=-1){
					layer.close(this.eventChoice);
				}
			},
			btn2 : function(index, layero) {
				layer.close(this.eventChoice);
			},cancel:function(){
				layer.close(this.eventChoice);
			}
		});
	},
    //最近设施计算
	funDoClosestFacilityAna:function(params){
		this.funClearLayerGraphics();
		require(["esri/geometry/Point", "esri/Graphic","esri/geometry/geometryEngine","esri/tasks/support/Query","esri/geometry/Polyline"],
				function(Point, Graphic,geometryEngine,Query,Polyline) {
				var centerPntSymbol = {
					type : "simple-marker", // autocasts as new SimpleMarkerSymbol()
					style : "cross",
					size : 15,
					outline : { // autocasts as new SimpleLineSymbol()
						width : 4
					}
				};
				
				var centerPnt = new Point(params.longtitude,params.latitude);
				var centerPntGraphic = new Graphic({
					geometry : centerPnt,
					symbol : centerPntSymbol
				});
				
				var incidentsPntSymbol = {
					 type: "point-3d",  // autocasts as new PointSymbol3D()
					  symbolLayers: [{
					    type: "icon",  // autocasts as new ObjectSymbol3DLayer()
						size:24,
					    resource: { href: "/ResourceMonitor/images/mark/32/qidian.png" },
					  }],
					  verticalOffset: {
						    screenLength: 0,
						    maxWorldLength: 36000,
						    minWorldLength: 1
						  },
					  callout: {
						    type: "line",  // autocasts as new LineCallout3D()
						    size: 1.5,
						    color: [150, 150, 150],
						    border: {
						      color: [50, 50, 50]
						    }
						  }
					};
					
					var facilityPntSymbol = {
						 type: "point-3d",  // autocasts as new PointSymbol3D()
						  symbolLayers: [{
						    type: "icon",  // autocasts as new ObjectSymbol3DLayer()
							size:24,
						    resource: { href: "/ResourceMonitor/images/mark/32/zhongdian.png" },
						  }],
						  verticalOffset: {
							    screenLength: 0,
							    maxWorldLength: 36000,
							    minWorldLength: 1
						  },
					  	callout: {
						    type: "line",  // autocasts as new LineCallout3D()
						    size: 1.5,
						    color: [150, 150, 150],
						    border: {
						      color: [50, 50, 50]
						    }
						  }
					};
					
				var incidentsPntGraphic=new Graphic({
					geometry : centerPnt,
					symbol : incidentsPntSymbol
				});
				analysisPointLayer.add(incidentsPntGraphic);
	            view.goTo({
	                target : incidentsPntGraphic,
	                tilt : 45,
	                zoom:13
	            });
                layer.close(closestFacilityDlgIndex);
                progressDlg=layer.load(0, {shade: false});
				var htmlStr= '<table class="layui-table" lay-size="sm" style="text-align:center;height:176px;">'
						+'<tr style="color:#058563">'
						+'<td style="font-weight:bold;text-align:center;">分析内容</td>'
						+'<td style="font-weight:bold;width:120px;text-align:center;">分析结果</td>'
						+'<td style="font-weight:bold;">距离(KM)</td>'
						+'<td style="font-weight:bold;">高亮</td>'
						+'<td style="font-weight:bold;">兵力详情</td>'
						+'</tr>'
                       +'<tr><td>最近兵力部署</td>'
                       +'<td><span id="xiangzhSpan">正在查询</span></td>'
                       +'<td><span id="xiangzhLen">正在查询</span></td>'
                       +'<td><img  style="width:22px;" id="xiangzhClick" onclick="analysis.hightLight(0);" src="/ResourceMonitor/images/mark/32/light.png"></td>'
                       +'<td rowspan="4" style="text-align:center;font-size:25px;"><img style="width:40px;" id="xiangzhDetails" xiangName="no"  src="/ResourceMonitor/images/indexpage/nodetails.png"></td></tr>'
                       +'<tr><td>最近居民点</td>'
                       +'<td><span id="cuntSpan">正在查询</span></td>'
                       +'<td><span id="cuntLen">正在查询</span></td>'
                       +'<td><img  style="width:22px;" id="cuntClick" onclick="analysis.hightLight(1);" src="/ResourceMonitor/images/mark/32/light.png"></td>'
                       +'</tr>'
                       +'<tr><td>最近道路</td>'
                       +'<td><span id="jmdSpan">正在查询</span></td>'
                       +'<td><span id="jmdLen">正在查询</span></td>'
                       +'<td><img  style="width:22px;" id="jmdClick" onclick="analysis.hightLight(2);" src="/ResourceMonitor/images/mark/32/light.png"></td>'
                       +'</tr>'
                       +'<tr><td>最近河流</td>'
                       +'<td><span id="heliuSpan">正在查询</span></td>'
                       +'<td><span id="heliuLen">正在查询</span></td>'
                       +'<td><img style="width:22px;" id="heliuClick" onclick="analysis.hightLight(3);" src="/ResourceMonitor/images/mark/32/light.png"></td>'
                       +'</tr>'
                       +'</table>';
				layer.close(analysis.layerMessageIndex);
				analysis.layerMessageIndex=layer.open({
	                 type : 1,
	                 shade:0,
	                 title : "最近设施分析",
	                 content : htmlStr,
	                 offset:  'rb',
	                 anim: -1,
	                 area:['380px','220px'],
	                 isOutAnim: false,
	            });
				$("#xiangzhDetails").off().on('click',function(){
					var cuntun=$(this).attr("xiangName").trim();
					if(cuntun=='no'){
						layer.msg('附近'+params.radius+'米内无兵力部署');
					}else{
						$.post("/ResourceMonitor/binglibushu/queryBinglibushu",
						{cuntun},
						function(data,status){
							if(data.length==0){
								layer.msg('附近'+params.radius+'米内无兵力部署');
							}else{
								var html= '<table class="layui-table" lay-size="sm" style="text-align:center;">'
									+'<tr style="color:#058563">'
									+'<td style="font-weight:bold;width:80px;">所在地区</td>'
									+'<td style="font-weight:bold;">单位</td>'
									+'<td style="font-weight:bold;">队伍情况</td>'
									+'<td style="font-weight:bold;">队员</td>'
									+'<td style="font-weight:bold;">风力灭火机</td>'
									+'<td style="font-weight:bold;">二号工具</td>'
									+'<td style="font-weight:bold;">车载台</td>'
									+'<td style="font-weight:bold;">对讲机</td>'
									+'<td style="font-weight:bold;">运兵车</td>'
									+'<td style="font-weight:bold;">指挥车</td>'
									+'</tr>'
									for(var i=0;i<data.length;i++){
										var obj = data[i];
										html+='<tr>';
										if(i==0){
											html+='<td  rowspan="'+data.length+'" style="text-align:center;">'+obj.cuntun+'</td>';
										}
										html+='<td>'+obj.danWei+'</td>'
											+'<td>'+obj.duiwuQk+'</td>'
											+'<td>'+Number(obj.duiYuan)+'</td>'
											+'<td>'+Number(obj.fengliMhj)+'</td>'
											+'<td>'+Number(obj.erhaoGj)+'</td>'
											+'<td>'+Number(obj.chezaiTai)+'</td>'
											+'<td>'+Number(obj.duijiangJ)+'</td>'
											+'<td>'+Number(obj.yunbingC)+'</td>'
											+'<td>'+Number(obj.zhihuiC)+'</td></tr>';
									}
									 html+='</table>';
									 layer.open({
							    			title:'兵力部署详情',
							    			type: 1,
							    			area: '600px',
							    			content: html,
							    	 });
	
							}

						});
					}

				});
				$.post("/ResourceMonitor/binglibushu/queryBinglibushu",
				{cuntun:''},
				function(data,status){
					var dataList=[];
					for(var i =0;i<data.length;i++){
						dataList.push("'%"+data[i].cuntun+"%'");
					}
					analysis.closetFacilityQueryLoop(centerPntGraphic,jmdFeatureLayer,params.radius,params.analysisWay,0,dataList);
					analysis.closetFacilityQueryLoop(centerPntGraphic,jmdFeatureLayer,params.radius,params.analysisWay,1);
					analysis.closetFacilityQueryLoop(centerPntGraphic,jmdFeatureLayer,params.radius,params.analysisWay,2);
				})
				var buffer = geometryEngine.geodesicBuffer(centerPntGraphic.geometry, params.radius,"meters");
	            var query = new Query();
	        	query.geometry = buffer; 
	            query.distance = 1;
	            query.outFields = ["*"];
                query.units = "meters";
                query.spatialRelationship = "contains";
                query.returnGeometry = true;
            	heliudLayer.queryFeatures(query).then(function(riverPntResults){
        			if(riverPntResults.features.length==0){
       			 		layer.close(progressDlg);
    					$("#heliuSpan").html('');
    					$("#heliuLen").html('');
    					$("#heliuClick").css('display','none');
        			}else{
       					var lineShortest=0;
    					var shorestPath=null;
    					var facilityFeatures = riverPntResults.features;
    		   			for(var i=0;i<facilityFeatures.length;i++){
 	   		   			var startPoint = centerPntGraphic.geometry;
 						var endPoint = facilityFeatures[i].geometry;
 						startPoint=lonlat2mercator(startPoint);
 						endPoint=lonlat2mercator(endPoint);
 	   		   			var paths = [[  // first path
 						  [startPoint.x,startPoint.y],
 						  [endPoint.x,endPoint.y]
 						 ]];
 						var line = new Polyline({
 						  hasZ: false,
 						  hasM: true,
 						  paths: paths,
 						  spatialReference: { wkid: 102100}
 						});
 					    var distance = geometryEngine.geodesicLength(line,'kilometers');
 					    if(i==0){
 					    	lineShortest=distance;
 					    	shorestPath=line;
 					    }else if(distance<lineShortest){
 					    	lineShortest=distance;
 					    	shorestPath=line;
 					    }
 					}
           			analysis.closetRiverQueryLoop(centerPntGraphic,riverPntResults.features,params.radius,0,new Array(),lineShortest,shorestPath,params.analysisWay);
        			}
               	});
			});
    },
	hightLight:function (index){
 	 require(["esri/symbols/SimpleLineSymbol","esri/Graphic"], function(SimpleLineSymbol,Graphic) { 
	    	 highlightRouteLyr.removeAll();
	    	 var polylineSymbol = {
				 type: "simple-line", 
				 color: [255,0,0],
				 width: 10
			 };
	    	 var polylineGraphic = new Graphic({
		   		 geometry: highlightRoutes[index],
		   		 symbol: polylineSymbol,
		   	 });
	    	 var i=0;
	    	 var timer = setInterval(function(){ 
	    		 if(i%2==0){
	    			 highlightRouteLyr.add(polylineGraphic);
	    		 }else{
	    			 highlightRouteLyr.removeAll();
	    		 }
	    		 if(i==11){
	    			 clearInterval(timer);
	    		 }
	    		 i++;
	    	 }, 300);

 	 });
  }, 
    
   //最近设施:最近乡镇、村屯、道路计算
   /*
   		*incidents-事件点*
   		*facilityLayerArray-设施图层数组*
   		*searchRadius-搜索半径*
   		*loopIndex-当前查询索引（设施层索引）
   		*loopCount-设施类别数量（设施层数）*
   */
    closetFacilityQueryLoop:function (incidents,facilityLayer,searchRadius,analysisWay,loopIndex,dataList){
	   require([ "esri/geometry/Point","esri/Graphic","esri/tasks/ClosestFacilityTask","esri/tasks/support/ClosestFacilityParameters",
				"esri/tasks/support/FeatureSet","esri/geometry/geometryEngine","esri/geometry/Polyline","esri/tasks/support/Query"],
				function(Point, Graphic, ClosestFacilityTask, ClosestFacilityParameters,FeatureSet,geometryEngine,Polyline,Query) {
		           var query = new Query();
		            query.outFields = ["*"];
		            if(loopIndex==0){
		            	var dataStr='';
		            	for(var i=0;i<dataList.length;i++){
		            		if(i==0){
		            			dataStr+="cuntun like "+dataList[i];
		            		}else{
		            			dataStr+=" or cuntun like "+dataList[i];
		            		}
		            		
		            	}
		            	query.where = dataStr;
		            }else{
		            	query.where = "1=1";
		            }
		            query.returnGeometry = true;
		   			facilityLayer.queryFeatures(query).then(function(results){
		   		   		var closestFacilityTask = new ClosestFacilityTask({
							url : "http://58.18.226.130:6080/arcgis/rest/services/road_analyst/NAServer/%E6%9C%80%E8%BF%91%E8%AE%BE%E6%96%BD%E7%82%B9"
						});
						var closestFacilityParams = new ClosestFacilityParameters({
							defaultCutoff: loopIndex===2?500000:searchRadius,//最近道路搜居民点，扩大到50km(本地经验值)
							facilities:new FeatureSet(),
							incidents:new FeatureSet(),
							returnRoutes: true,
							returnFacilities:true,
							outSpatialReference : { // autocasts as new SpatialReference()
								wkid : 102100
							},
						});
						closestFacilityParams.incidents.features.push(incidents);
						closestFacilityParams.facilities.features=results.features;

						var mercatorstartPnt=lonlat2mercator(incidents.geometry);
						var endPntSymbol = {
							 type: "point-3d",  // autocasts as new PointSymbol3D()
							  symbolLayers: [{
							    type: "icon",  // autocasts as new ObjectSymbol3DLayer()
								size:24,
							    resource: { href: "/ResourceMonitor/images/mark/32/zhongdian.png" },
							  }],
							  verticalOffset: {
								    screenLength: 0,
								    maxWorldLength: 36000,
								    minWorldLength: 1
								  },
							  callout: {
							    type: "line",  // autocasts as new LineCallout3D()
							    size: 1.5,
							    color: [150, 150, 150],
							    border: {
							      color: [50, 50, 50]
							    }
							  }
						};
						closestFacilityTask.solve(closestFacilityParams).then(function(solveResult){
							var routeResult = solveResult.routes[0];
							var	facilityID=routeResult.attributes.FacilityID;
							var	facilityPntArray=solveResult.facilities;
							var closestFacility;
							for(var i=0;i<facilityPntArray.length;i++){
								if(facilityPntArray[i].attributes.ObjectID===facilityID){
									closestFacility=facilityPntArray[i];
									break;
								}
							}
							var closestFacilityPnt=new Point(closestFacility.geometry.longitude,closestFacility.geometry.latitude);
							var mercatorFacilityPnt=lonlat2mercator(closestFacilityPnt);
    					    
							var routeSymbol = {
								type : "simple-line", // autocasts as SimpleLineSymbol()
								width : 8
							};
							
							switch(loopIndex){
								case 1:
									routeSymbol.color=[ 0, 238, 0];
									routeSymbol.width=8;
									break;
								case 2:
									routeSymbol.color=[ 255, 0, 204];
									routeSymbol.width=8;
									break;
								default:
									routeSymbol.color=[ 0, 100, 0];
							}
							//
							var routeLength=0;
							var paths=routeResult.geometry.paths;
							
							//计算直线距离
    	   		   			var linePaths = [[  // first path
    						  [mercatorstartPnt.x,mercatorstartPnt.y],
    						  [mercatorFacilityPnt.x,mercatorFacilityPnt.y]
    						 ]];
    						var line = new Polyline({
    						  hasZ: false,
    						  hasM: true,
    						  paths: linePaths,
    						  spatialReference: { wkid: 102100}
    						});
    					    var lineDistance = geometryEngine.geodesicLength(line,'kilometers');
    					    
							//计算在公路上的距离
							var daoluRouteLength=0;
							daoluRouteLength=geometryEngine.geodesicLength(routeResult.geometry,'kilometers');
							if(loopIndex===2){
								paths[0].unshift([mercatorstartPnt.x,mercatorstartPnt.y]);
								for(var i=paths.length-1;i>0;i--){
									routeResult.geometry.removePath(i);
								}
								routeResult.geometry.paths=paths;
								paths=routeResult.geometry.paths;
								for(var i=paths[0].length;i>1;i--){
									routeResult.geometry.removePoint(0,i);
								}
								routeResult.geometry.paths=paths;
								routeLength=geometryEngine.geodesicLength(routeResult.geometry,'kilometers');
								var otherRouteLength = routeLength-daoluRouteLength;
								if(lineDistance<otherRouteLength&&analysisWay=="shortest"){
									routeResult.geometry.paths=linePaths;
								}
								if(routeLength*1000<searchRadius){
									routeResult.symbol = routeSymbol;
									analysisGraphicLayer.add(routeResult);
									highlightRoutes[2] = routeResult.geometry;
								}
							}else{
								paths[0].unshift([mercatorstartPnt.x,mercatorstartPnt.y]);
								paths[paths.length-1].push([mercatorFacilityPnt.x,mercatorFacilityPnt.y]);
								routeResult.geometry.paths=paths;
								routeLength=geometryEngine.geodesicLength(routeResult.geometry,'kilometers');
								var otherRouteLength = routeLength-daoluRouteLength;
								if(lineDistance<otherRouteLength&&analysisWay=="shortest"){
									routeResult.geometry.paths=linePaths;
								}
								routeResult.symbol = routeSymbol;
								if(loopIndex==0){
									highlightRoutes[0] = routeResult.geometry;
								}else{
									highlightRoutes[1] = routeResult.geometry;
								}
								analysisGraphicLayer.add(routeResult);
							}

							if(loopIndex!==2){
								var endStopGraphic=new Graphic({
									geometry : closestFacilityPnt,
									symbol : endPntSymbol
								});
								analysisPointLayer.add(endStopGraphic);
							}
							 if(loopIndex===0){
								 $("#xiangzhSpan").html(results.features[facilityID-1].attributes.cuntun);
								 $("#xiangzhLen").html( routeLength.toFixed(2));
								 $("#xiangzhClick").css('display','');
								 $("#xiangzhDetails").attr("xiangName",results.features[facilityID-1].attributes.cuntun);
								 $("#xiangzhDetails").attr("src","/ResourceMonitor/images/indexpage/details.png");
		                     
							 }else if(loopIndex===1){
		                    	 $("#cuntSpan").html(results.features[facilityID-1].attributes.cuntun);
		                    	 $("#cuntLen").html(routeLength.toFixed(2));
		                    	 $("#cuntClick").css('display','');
		                     }else if(loopIndex===2){
		                    	 if(routeLength*1000>searchRadius){
		                    		 $("#jmdSpan").html(''); 
		                    		 $("#jmdLen").html(routeLength.toFixed(2));
		                    		 $("#jmdClick").css('display','none');
		                    	 }else{
		                    		 $("#jmdSpan").html('');
		                    		 $("#jmdLen").html(routeLength.toFixed(2)); 
		                    		 $("#jmdClick").css('display','');
		                    	 }
		                     }
						},function(err){
							if(loopIndex===0){
								$("#xiangzhSpan").html('无'); 
								$("#xiangzhLen").html('');
								$("#xiangzhClick").css('display','none');
		                     }else if(loopIndex===1){
		                    	 $("#cuntSpan").html('无'); 
		                    	 $("#cuntLen").html('');
		                    	 $("#cuntClick").css('display','none');
		                     }else if(loopIndex===2){
		                    	 $("#jmdSpan").html(''); 
		                    	 $("#jmdLen").html(''); 
		                    	 $("#jmdClick").css('display','none');
							 }
						});
						
		   		});
	   });
   },
	  //最近设施：最近河流计算
  closetRiverQueryLoop:function (incidents,facilityFeatures,searchRadius,gradeIndex,routeResultArray,lineShortest,shorestPath,analysisWay){
	   require([ "esri/geometry/Point","esri/Graphic","esri/tasks/ClosestFacilityTask","esri/tasks/support/ClosestFacilityParameters",
				"esri/tasks/support/FeatureSet","esri/geometry/geometryEngine","esri/geometry/Polyline"],
				function(Point, Graphic, ClosestFacilityTask, ClosestFacilityParameters,FeatureSet,geometryEngine,Polyline) {
		   		   var subFacilityArr;
	        	   if(gradeIndex*100+99<facilityFeatures.length){
	        		   subFacilityArr=facilityFeatures.slice(gradeIndex*100,gradeIndex*100+99);
	        	   }else{
	        		   subFacilityArr=facilityFeatures.slice(gradeIndex*100);
	        	   }
	        	   var closestFacilityTask = new ClosestFacilityTask({
	    				url : "http://58.18.226.130:6080/arcgis/rest/services/road_analyst/NAServer/%E6%9C%80%E8%BF%91%E8%AE%BE%E6%96%BD%E7%82%B9"
	    			});
	
	    			var closestFacilityParams = new ClosestFacilityParameters({
	    				defaultCutoff: 500000,
	    				facilities:new FeatureSet(),
	    				incidents:new FeatureSet(),
	    				returnRoutes: true,
	    				returnFacilities:true,
	    				outSpatialReference : { // autocasts as new SpatialReference()
	    					wkid : 102100
	    				},
	    			});
	    			closestFacilityParams.incidents.features.push(incidents);
	    			closestFacilityParams.facilities.features=subFacilityArr;
	    			
	    			var mercatorstartPnt=lonlat2mercator(incidents.geometry);
	    			var endPntSymbol = {
	    				 type: "point-3d",  // autocasts as new PointSymbol3D()
	    				  symbolLayers: [{
	    				    type: "icon",  // autocasts as new ObjectSymbol3DLayer()
	    					size:24,
	    				    resource: { href: "/ResourceMonitor/images/mark/32/zhongdian.png" },
	    				  }],
	    				  verticalOffset: {
	    					    screenLength: 0,
	    					    maxWorldLength: 36000,
	    					    minWorldLength: 1
	    					  },
	    				  callout: {
	    				    type: "line",  // autocasts as new LineCallout3D()
	    				    size: 1.5,
	    				    color: [150, 150, 150],
	    				    border: {
	    				      color: [50, 50, 50]
	    				    }
	    				  }
	    			};
	    			closestFacilityTask.solve(closestFacilityParams).then(function(solveResult){
	    				var routeResult = solveResult.routes[0];
	    				var facilityID=routeResult.attributes.FacilityID;
	    				var facilityPntArray=solveResult.facilities;
	    				var closestFacility;
	    				for(var i=0;i<facilityPntArray.length;i++){
	    					if(facilityPntArray[i].attributes.ObjectID===facilityID){
	    						closestFacility=facilityPntArray[i];
	    						break;
	    					}
	    				}
	    				
	    				var closestFacilityPnt=new Point(closestFacility.geometry.longitude,closestFacility.geometry.latitude);
	    				var mercatorFacilityPnt=lonlat2mercator(closestFacilityPnt);
	    				
	    				var routeSymbol = {
	    					type : "simple-line", // autocasts as SimpleLineSymbol()
	    				    color:[0,0,255],
	    					width : 8
	    				};
	    				var paths=routeResult.geometry.paths;
	    				if(paths.length==0){
	    					routeResult.geometry.paths=shorestPath.paths;
	    				}else{
		    				var distanceDaoDu=geometryEngine.geodesicLength(routeResult.geometry,'kilometers');//道路长度
		    				paths[0].unshift([mercatorstartPnt.x,mercatorstartPnt.y]);
		    				paths[paths.length-1].push([mercatorFacilityPnt.x,mercatorFacilityPnt.y]);					
		    				routeResult.geometry.paths=paths;
		    				var distanceSum=geometryEngine.geodesicLength(routeResult.geometry,'kilometers');//总长度
		    				var distanceOther=(distanceSum-distanceDaoDu).toFixed(2);
		    				if(lineShortest<distanceOther&&analysisWay=="shortest"){
		    					routeResult.geometry.paths=shorestPath.paths;
		    				}
	    				}
	    				routeResultArray.push(routeResult);
	    				gradeIndex++;
	    				if(gradeIndex*100<facilityFeatures.length){
	    					analysis.closetRiverQueryLoop(incidents,facilityFeatures,searchRadius,gradeIndex,routeResultArray,lineShortest,shorestPath);
	    				}else{
	    					 layer.close(progressDlg);
	    					if(routeResultArray.length==0){
	    						$("#heliuSpan").html('');
	    						$("#heliuLen").html('');
	    						$("#heliuClick").css('display','none');
	    					}else if(routeResultArray.length==1){
	    						var closestRiverRouteLength=geometryEngine.geodesicLength(routeResultArray[0].geometry,'kilometers');
	    						
	    						if(closestRiverRouteLength*1000>searchRadius){
	    							$("#heliuSpan").html('');
	    							$("#heliuLen").html('');
	    							$("#heliuClick").css('display','none');
	    						}else{
	    							routeResultArray[0].symbol = routeSymbol;
	    							analysisGraphicLayer.add(routeResultArray[0]);
	    							highlightRoutes[3] = routeResultArray[0].geometry;
		    						$("#heliuSpan").html(''); 
		    						$("#heliuLen").html(closestRiverRouteLength.toFixed(2)); 
		    						$("#heliuClick").css('display','');
		    	                    bufQueryResult+=subhtmlStr;
		    						
		    	                    paths=routeResultArray[0].geometry.paths;
		    	                    var lastPathPntCount=paths[paths.length-1].length;
		    	                    var nearPntCoor=paths[paths.length-1][lastPathPntCount-1];
		    	                    var nearPnt = {
	    	                    	    type: "point",  // autocasts as new Polyline()
	    	                    	    x:nearPntCoor[0],
		    	                    	y:nearPntCoor[1],
		    	                    	spatialReference:{wkid : 102100}
	    	                    	  };
		    	                    
		    	                    var endStopGraphic=new Graphic({
		    							geometry : nearPnt,
		    							symbol : endPntSymbol
		    						});
		    	                    analysisPointLayer.add(endStopGraphic);
	    						}
	    					}else{
	    						var closestRiverRouteIndex=0;
	    						var closestRiverRouteLength=geometryEngine.geodesicLength(routeResultArray[0].geometry,'kilometers');
	    						for(var i=1;i<routeResultArray.length;i++){
	    							var curRouteLength=geometryEngine.geodesicLength(routeResultArray[i].geometry,'kilometers');
	    							if(curRouteLength<closestRiverRouteLength){
	    								closestRiverRouteIndex=i;
	    								closestRiverRouteLength=curRouteLength;
	    							}	
	    						}

	    						if(closestRiverRouteLength*1000>searchRadius){
	    							$("#heliuSpan").html('');
	    							$("#heliuLen").html('');
	    							$("#heliuClick").css('display','none');
	    						}else{
	    							routeResultArray[closestRiverRouteIndex].symbol = routeSymbol;
	    							analysisGraphicLayer.add(routeResultArray[closestRiverRouteIndex]);
		    						highlightRoutes[3] = routeResultArray[closestRiverRouteIndex].geometry;
		    						$("#heliuSpan").html(''); 
		    						$("#heliuLen").html(closestRiverRouteLength.toFixed(2)); 
		    						$("#heliuClick").css('display','');
		    	                    bufQueryResult+=subhtmlStr;
		    	                    
		    	                    paths=routeResultArray[closestRiverRouteIndex].geometry.paths;
		    	                    var lastPathPntCount=paths[paths.length-1].length;
		    	                    var nearPntCoor=paths[paths.length-1][lastPathPntCount-1];

		    	                    var nearPnt = {
	    	                    	    type: "point",  // autocasts as new Polyline()
	    	                    	    x:nearPntCoor[0],
		    	                    	y:nearPntCoor[1],
		    	                    	spatialReference:{wkid : 102100}
	    	                    	  };

		    						var endStopGraphic=new Graphic({
		    							geometry : nearPnt,
		    							symbol : endPntSymbol
		    						});
		    						analysisPointLayer.add(endStopGraphic);
	    						}
	    					}
	    				}
				});
	   	});
    },
    /*最近设施分析计算结束*/
     // 隔离带分析弹窗
    funBufferLine:function (){
    	 this.layerName ='隔离带设置';
    	 layer.close(this.bodyIndex);
     	 var layerLeft ='175px'; 
    	 if($('#nav').hasClass('nav-mini')){
    		layerLeft='75px';
    	 }
    	 this.bodyIndex = layer.open({
			id:"lineWidth",
			type : 2,
			title : '隔离带设置',
			shadeClose : false,
			btn : [ '确定', '取消' ],
			area : [ '400px', '280px' ],
			offset : ['60px',layerLeft],
			shade : 0,
			resize : false,
			skin: 'layer-class',
			content : '../analysis/lineWidth.jsp',
			yes : function(index, layero) {
                var body = layer.getChildFrame('body', index);  
                var iframeWin = window[layero.find('iframe')[0]['name']];  
                var result = iframeWin.paramsValidate();  
    	    	var longtD=0;
    	    	var latD=0;
    			var locationType=body.contents().find("#locationType").val();
    			if(locationType=="optionDMS"){
    				longtD=parseFloat(body.contents().find("#longtD").val());
    				latD=parseFloat(body.contents().find("#latD").val());
    				var longtM=body.contents().find("#longtM").val();
    				var longtS=body.contents().find("#longtS").val();
    				var latM=body.contents().find("#latM").val();
    				var latS=body.contents().find("#latS").val();
    				if(longtM !==null&&longtM !=="")
    					longtD+=parseFloat(longtM)/60;
    				if(longtS !==null&&longtS !=="")
    					longtD+=parseFloat(longtS)/3600;
    				longtD=longtD.toFixed(6);
    	
    				if(latM !==null&&latM !=="")
    					latD+=parseFloat(latM)/60;
    				if(latS !==null&&latS !=="")
    					latD+=parseFloat(latS)/3600;
    				latD=latD.toFixed(6);
    			}else{
    				longtD=parseFloat(body.contents().find("#longtD").val());
    				latD=parseFloat(body.contents().find("#latD").val());
    			}
               	var radius=body.contents().find("#radius").val();
				if(result){
					// 划线
					analysis.funClearLayerGraphics();
					analysis.lonlatLocator(longtD,latD);
					layer.close(index);
					layer.close(analysis.eventChoice);
					document.body.style.cursor='crosshair';
					analysis.funDodrawLine(radius,longtD,latD);
				}
			},
			end : function(index, layero) {
				layer.close(analysis.eventChoice);
				$("#separatorId").parent().css("color","rgb(51, 51, 51)");
				$("#separatorId").parent().css("background","");
			},
			cancel:function(){
				$("#separatorId").parent().css("color","rgb(51, 51, 51)");
				$("#separatorId").parent().css("background","");
				layer.close(analysis.eventChoice);
			}
		});
     },
     // 隔离带分析:划出隔离带后计算所需信息
     funDodrawLine:function (radius,longtD,latD){
  	   	 require([
  		      "esri/Map",
  		      "esri/views/MapView",
  		      "esri/views/2d/draw/Draw",
  		      "esri/Graphic",
  		      "esri/geometry/Polyline",
  		      "esri/geometry/Polygon",
  		      "esri/tasks/support/Query",
  		      "esri/geometry/geometryEngine",
  		      "esri/geometry/Point",
  		      "dojo/domReady!"
  		    ], function(
  		      Map, MapView,Draw, Graphic,Polyline,Polygon,Query,geometryEngine,Point
  		    ){
	    		     draw = new Draw({
	        		   view: view
	        		 });
	    		   enablecreatePolyline(draw, view);
                 function enablecreatePolyline(draw, view) {
                     var action = draw.create("polyline");
                     view.focus();
                     action.on("vertex-add", drawPolyline);
                     action.on("cursor-update",drawPolyline);
                     action.on("vertex-remove",drawPolyline);
                     action.on("draw-complete",drawPolylineComplete);
                 }
                 function drawPolyline(evt) {
                     var vertices = evt.vertices;           
                     view.graphics.removeAll();
                     // 新建一个多边形
                     var polygon = createPolygon(vertices);
                     var polyline = createPolyline(vertices);
                     var buffer = geometryEngine.geodesicBuffer(polyline, radius,"meters");   
                     // 创建一个表示多边形的新图形，将其添加到视图中
                     var graphic = createGraphic(polyline);
                     var bufferGraphic = createBufferGraphic(buffer);
                     view.graphics.add(graphic);
                     view.graphics.add(bufferGraphic);
                     // 计算缓冲线的长度
                     var lineLength = geometryEngine.geodesicLength(polyline,"kilometers");

                     // 开始显示多边形的面积
                     labelLength(polygon, lineLength);
                 }                    
                 function drawPolylineComplete(evt) {
                	 document.body.style.cursor='default';
                     var vertices = evt.vertices;           
                     view.graphics.removeAll();
                     // 新建一个多边形
                     var polygon = createPolygon(vertices);
                     var bufferLinePolyline = createPolyline(vertices);
                     var buffer = geometryEngine.geodesicBuffer(bufferLinePolyline, radius,"meters");
                     var indexQuery = layer.load(0);
                     var query = new Query();
                     query.geometry = buffer; 
                     query.distance = 1;
                     query.outFields = ["*"];
                     query.units = "meters";
                     query.spatialRelationship = "intersects";
                     query.returnGeometry = true;
                     xbQueryTask.execute(query).then(function(result){
                        var sumArea_pingcha=0;
                        var dilei_lindi=['0111','0120','0131','0132','0141','0142','0150'];
                        for(var j=0;j<result.features.length;j++){
                            var graphic=result.features[j];
                             var attributes = graphic.attributes;
                             var intersectGeo=geometryEngine.intersect(graphic.geometry,buffer);
                             if(dilei_lindi.indexOf(attributes.DI_LEI)!==-1){
                                 var ratio=geometryEngine.geodesicArea(intersectGeo,'square-meters')/geometryEngine.geodesicArea(graphic.geometry,'square-meters');
                                 sumArea_pingcha+=attributes.MIAN_JI *ratio;
                             }  
                        }
                        var lineStart = bufferLinePolyline.paths[0][0];
                        var lineEnd = bufferLinePolyline.paths[0][bufferLinePolyline.paths[0].length-1];
                        var mercatorStart={x:lineStart[0],y:lineStart[1]}; 
                        var mercatorEnd={x:lineEnd[0],y:lineEnd[1]};
                        var lonlatStart = mercator2lonlat(mercatorStart);
                        var lonlatEnd = mercator2lonlat(mercatorEnd);
                        var areaBuffer = geometryEngine.geodesicArea(buffer, "hectares");
                        var forestArea_pingcha=sumArea_pingcha.toFixed(2);
                        // 计算缓冲线的长度
                        var lineLength = geometryEngine.geodesicLength(bufferLinePolyline,"kilometers");
                  	    var mercatorPnt =new Point(longtD,latD);
                     	  var mercator =lonlat2mercator(mercatorPnt);
                     	  mercatorPnt.x=mercator.x;
                     	  mercatorPnt.y=mercator.y;
                          var shortestLength = geometryEngine.distance(bufferLinePolyline,mercatorPnt,"kilometers");
                        	layer.close(indexQuery);
                        	layer.close(analysis.layerMessageIndex);
                        	analysis.layerMessageIndex=layer.open({
								  //id:"lineBuffer",
								  type: 1, 
								  shade: false, 
								  content: '<div style="padding: 10px 15px 10px 15px;">起点坐标:  '+lonlatStart.x.toFixed(6)+','+lonlatStart.y.toFixed(6)+'<br/>'
								  +'终点坐标:  '+lonlatEnd.x.toFixed(6)+','+lonlatEnd.y.toFixed(6)+'<br/>'
								  +'隔离带长度:  '+lineLength.toFixed(3)+'千米<br/>'
								  +'隔离带面积:'+areaBuffer.toFixed(2)+'公顷<br/>'
								  +'带内有林地面积:'+forestArea_pingcha+'公顷<br/>'
								  +'距事发地距离:<span id="shortestDistance">'+shortestLength.toFixed(3)+'千米<span/>'
								  +'</div><br/>' ,
								  offset: 'rb',
								  title:'隔离带信息'
							});
							//draw.complete();
                    });                            
                      // 创建一个表示多边形的新图形，将其添加到视图中
                     var graphic = createGraphic(bufferLinePolyline);
                     var bufferGraphic = createBufferGraphic(buffer);
                     view.graphics.add(graphic);
                     view.graphics.add(bufferGraphic);
                 }   
                 // 使用所提供的顶点创建多边形
                 function createPolygon(vertices) {
                     return new Polygon({
                         rings : vertices,
                         spatialReference : view.spatialReference
                     });
                 }

                 // 使用所提供的顶点创建折线
                 function createPolyline(vertices) {
                     return new Polyline(
                             {
                                 paths : vertices,
                                 spatialReference : view.spatialReference
                             });
                 }

                 // 创建一个新的图形，表示在视图上绘制的多边形。
                 function createGraphic(polyline) {
                     graphic = new Graphic({
                         geometry : polyline,
                         symbol : {
                             type : "simple-line", // autocasts as new SimpleFillSymbol
                             color : [255, 90, 0],
                             width : 4,
                             cap : "round",
                             join : "round"
                         }
                     });
                     return graphic;
                 } 
                 function createBufferGraphic(buffer) {
                     graphic = new Graphic({
                         geometry : buffer,
                         symbol : {
                             type : "simple-fill", // autocasts as SimpleFillSymbol
                             color: [1, 97,255, 0.2],
                             style : "solid",
                             outline : { // autocasts as SimpleLineSymbol
                                 color: [0,0,0,1],
                                 width : 2
                             }
                         }
                     });
                     return graphic;
                 }                   
                                   
                 function labelLength(geom, length) {
                   var screenPoint = view.toScreen(geom.centroid);
                   var mapPoint = view.toMap({
                 	   x : screenPoint.x,
               		   y : screenPoint.y-20
                   });
                   var centroid = {
                     type : "point", 
                     x : mapPoint.longitude,
                     y : mapPoint.latitude,
                 };
                 var graphicCD = new Graphic({
                     geometry : centroid,
                     symbol : {
                         type : "text",
                         color : "white",
                         haloColor : "black",
                         haloSize : "1px",
                         /*保留的小数位*/
                         text : length.toFixed(3)
                                 + "千米",
                         xoffset : 3,
                         yoffset : 3,
                         font : { // 自动字体
                             size : 14,
                             family : "sans-serif"
                         }
                     }
                 });  
                 view.graphics.add(graphicCD);   
             }                                                    
  	   });
     },
     //
     //灾害损失评估弹框
     funFireComputed:function (){
    	 layer.close(this.bodyIndex);
    	 this.layerName ='损失评估';
     	 var layerLeft ='175px'; 
    	 if($('#nav').hasClass('nav-mini')){
    		layerLeft='75px';
    	 }
    	 this.bodyIndex = layer.open({
	  		   type: 1,
			   id:'area',
			   title:'损失评估',
			   shade: 0,
			   resize:false,
			   scrollbar: false,
			   shadeClose:false,
			   offset: ['60px', layerLeft],	
			   area:['340px','290px'],
			   content:'<form class="layui-form" style="height:80px;">'+
					'<div class="layui-form-item" style="margin:0">'+
					'<label class="layui-form-label layui-show-md-block" style="padding:0;line-height:40px;text-align:center;">受灾范围</label>'+
					'<div  id="yuan" style="margin-left:18px;float:left;">'+
  						'<input name="yuan" value="yuan" type="checkbox" lay-skin="switch" lay-text="圆|圆" checked="checked" class="analysis-fireSum">'+
					'</div>'+
					'<div  id="juxing" style="margin-left:10px;float:left;">'+
      						'<input name="juxing" value="juxing" type="checkbox" lay-skin="switch" lay-text="矩形|矩形" class="analysis-fireSum">'+
  					'</div>'+
					'<div  id="zidingyi" style="margin-left:10px;float:left;">'+
						'<input name="zidingyi" value="zidingyi" type="checkbox" lay-skin="switch" lay-text="多边形|多边形" class="analysis-fireSum">'+
					'</div>'+
					'<div class="layui-input-block" style="margin-left:18px;float:left;">'+
					'<input id="newareaDraw" type="button" class="btn btn-default" style="margin-left:0px; margin-top:10px; border: 1px solid #dedede; border-radius: 2px; height: 30px; width: 65px; line-height: 30px; border-color: #0062ac; background-color: #058563; color: #ffffff;" value="绘制"/>'+
					'<input id="importPoints" type="button" class="btn btn-default" style="margin-left:40px; margin-top:10px; border: 1px solid #dedede; border-radius: 2px; height: 30px; width: 65px; line-height: 30px; border-color: #0062ac; background-color: #058563; color: #ffffff;" value="导入"/>'+
					'</div>'+
					'</div>'+
					'</form>'+
				'<div style="margin: 10px 10px"><table class="layui-table" lay-size="sm" style="text-align:center;">'+
				'<tr><td style="font-weight:bold;width:80px;">受灾面积</td>'+
			      '<td  id="areaSum">0.00公顷</td>'+
			    '</tr>'+
			    '<tr>'+
			      '<td  style="font-weight:bold;">有林地面积</td>'+
			      '<td  id="areaLinDi">0.00公顷</td></tr>'+
			    '<tr>'+
			      '<td style="font-weight:bold;">保护等级</td>'+
			      '<td  id="areaBhdj"></td></tr>'+
			    '<tr>'+
			      '<td style="font-weight:bold;">优势树种</td>'+
			      '<td  id="areaYssz"></td></tr>'+
				'</table></div>',
				cancel:function(){
				   layer.close(analysis.bodyIndex);
				   layer.close(this.eventChoice);
				   document.body.style.cursor='default';
				   if(draw){
					  draw.reset();
				   }
				},
				success: function(layero, index){
					var type = 'yuan';
					layui.use('form', function(){
					   var form = layui.form; 
   					   form.render();
   					   form.on('switch', function(data){
						   $(".analysis-fireSum").prop("checked",false);
					   	   $(data.elem).prop("checked",true);
					   	   type = data.elem.name;
					   		if(type == "yuan"){
					   			$("#yuan div").addClass('layui-form-onswitch');
					   			$("#juxing div").removeClass('layui-form-onswitch');
					   			$("#zidingyi div").removeClass('layui-form-onswitch');
					   		}else if(type == "juxing"){
					   			$("#yuan div").removeClass('layui-form-onswitch');
					   			$("#juxing div").addClass('layui-form-onswitch');
					   			$("#zidingyi div").removeClass('layui-form-onswitch');
					   		}else{
					   			$("#yuan div").removeClass('layui-form-onswitch');
					   			$("#juxing div").removeClass('layui-form-onswitch');
					   			$("#zidingyi div").addClass('layui-form-onswitch');
					   		}
   					   });
   					   $("#newareaDraw").off().on("click",function(){
   						   $("#areaLinDi").html("0.00公顷");
   						   $("#areaSum").html("0.00公顷");
   						   document.body.style.cursor='crosshair';
   						   analysis.doFunFireComputed(type);
   					   })
   					   $("#importPoints").off().on("click",function(){
							 layer.open({
					    			title:'导入坐标信息',
					    			type: 2,
					    			id:"uploadExcel",
					    			area: ['400px', '300px'],
					    			btn : [ '上传', '取消' ],
					    			content: ['/ResourceMonitor/jsp/commandForFire/BaseStationMap/layers/importExcel.jsp','no'],
					    			yes : function(index, layero) {
										var iframeWin = window[layero.find('iframe')[0]['name']]; // 得到iframe页的窗口对象，执行iframe页的方法：
										layer.close(index);
										iframeWin.uploadFile();
									},
					    	 });
   					   })
					})
				}
		});
	},
	uploadExcel:function (data){
		require(["esri/Map",
  		      "esri/views/MapView",
  		      "esri/views/2d/draw/Draw",
  		      "esri/Graphic",
  		      "esri/geometry/Polyline",
  		      "esri/geometry/Polygon",
  		      "esri/tasks/support/Query",
  		      "esri/geometry/geometryEngine",
  		      "esri/geometry/Point",
  		      "esri/geometry/SpatialReference"], 
  		      function(Map, MapView,Draw, Graphic,Polyline,Polygon,Query,geometryEngine,Point,SpatialReference) { 
			var message='';
			var vertice=[];
			for(var i=0;i<data.length;i++){
				var regX = new RegExp(/^[\d]+(\.[\d]+)?$/);
				var regY = new RegExp(/^[\d]+(\.[\d]+)?$/);
				var xy=data[i];
				var xStr = xy.split(',')[0];
				if(!regX.test(xStr)){
					message+=(i+2)+":X错误  ";
				}
				var x=parseFloat(xStr);
				var yStr = xy.split(',')[1];
				if(!regY.test(yStr)){
					message+=(i+2)+":Y错误  ";
				}
				if(regX.test(xStr)&&regY.test(yStr)){
					var y=parseFloat(yStr);
/*				    var firstProjection ='+proj=tmerc +lat_0=0 +lon_0=105 +k=1 +x_0=35500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +towgs84=-100.0,-60,-6,0,0,0,0 +no_defs';
				    var secondProjection = "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees";
				    var mm = proj4(firstProjection,secondProjection,[x,y]);
				    var mercator = lonlat2mercator({x:mm[0],y:mm[1]});*/
					vertice.push([x,y]);
				}
			}
			if(message!=''){
				layer.alert(message);
			}else{
				var vertices=[];
				vertices.push(vertice);
                view.graphics.removeAll();
                var polygon=new Polygon({
                	rings:vertices,
                    spatialReference : view.spatialReference
                });
 			     if(!polygon){
				     return;
			     }
     			 var graphic = new Graphic({
     			    geometry: polygon,
     			    symbol:{
     					type : "simple-fill",
     					color : [ 255, 0, 0, 0.3 ],
     					style : "solid",
     					outline : {
     						color : [ 255, 255, 0 ],
     						width : 2
     					}
     				}
     			 });
     			 var area = geometryEngine.geodesicArea(polygon, 'square-kilometers');
     			 if(area<0){
     				area*=-1;
     			 }
     			 $("#areaSum").html((area*100).toFixed(2)+ "公顷");
     			 view.goTo({
	                target : polygon,
	                tilt : 45,
	                zoom:13
     			 });
     			 view.graphics.add(graphic);
                var indexQuery = layer.load(0);
                var query = new Query();
                query.geometry = polygon; 
                query.distance = 1;
                query.outFields = ["*"];
                query.units = "meters";
                query.spatialRelationship = "intersects";
                query.returnGeometry = true;
                xbQueryTask.execute(query).then(function(result){
                    var sumArea_pingcha=0;
                    var lindiList = [];//林地的FID
                    var dilei_lindi=['0111','0120','0131','0132','0141','0142','0150'];
                    var bahudengList=[];
                    var youshishuList=[];
                    analysisGraphicLayer.removeAll();
                    for(var j=0;j<result.features.length;j++){
                        var graphic=result.features[j];
                         var attributes = graphic.attributes;
                         var intersectGeo=geometryEngine.intersect(graphic.geometry,query.geometry);
                         if(dilei_lindi.indexOf(attributes.DI_LEI)!==-1){
                             var ratio=geometryEngine.geodesicArea(intersectGeo,'square-meters')/geometryEngine.geodesicArea(graphic.geometry,'square-meters');
                             sumArea_pingcha+=attributes.MIAN_JI *ratio;
                             lindiList.push(attributes.FID);
                             if(!bahudengList.includes(attributes['保护等'])){
                           	  bahudengList.push(attributes['保护等']);
                             }
                             if(!youshishuList.includes(attributes['优势树'])){
                           	  youshishuList.push(attributes['优势树']);
                             }
                             var symbol = {
               			    	 type: "simple-fill",  // autocasts as new SimpleFillSymbol()
           			         	 color: [ 244, 134, 186, 0.5],
           			         	 outline: {  // autocasts as new SimpleLineSymbol()
                   			         width: 1,
                   			         color: [ 255, 0, 0, 1]
           			      	 	 }
                              };
                              var graphic = new Graphic({
			                	  geometry: intersectGeo,
			                	  symbol: symbol
                              });
                              analysisGraphicLayer.add(graphic);
                         }  
                    }
			        var lindiSql=lindiList.join(',');
			        /*map.remove(dynamic_layers);
                    var dynamic_xb = dynamic_layers.findSublayerById(0);
           	 	    dynamic_xb.definitionExpression ='FID in ('+lindiSql+')';
         	        map.add(dynamic_layers,6);*/
                    $("#areaLinDi").html(sumArea_pingcha.toFixed(2)+"公顷");
                    $("#areaBhdj").html(bahudengList.join(','));
                    $("#areaYssz").html(youshishuList.join(','));
                	layer.close(analysis.layerMessageIndex);
                    layer.close(indexQuery);
                });
			}
		});
	},	
     // 灾害损失评估
     doFunFireComputed:function (type){
  	   	 require([
  		      "esri/Map",
  		      "esri/views/MapView",
  		      "esri/views/2d/draw/Draw",
  		      "esri/Graphic",
  		      "esri/geometry/Polyline",
  		      "esri/geometry/Polygon",
  		      "esri/tasks/support/Query",
  		      "esri/geometry/geometryEngine",
  		      "esri/geometry/Point",
  		      "esri/geometry/Circle",
  		      "dojo/domReady!"
  		    ], function(
  		      Map, MapView,Draw, Graphic,Polyline,Polygon,Query,geometryEngine,Point,Circle
  		    ){
    		     draw = new Draw({
        		   view: view
        		 });
    		     enableCreatePolygon(draw, view);
	    		 function enableCreatePolygon(draw, view) {
	    		   var action = null;
	    		   if(type=='yuan'){
	    			   action = draw.create("circle", {mode: "click"});
	    		   }else if(type=='juxing'){
	    			   action = draw.create("rectangle",{mode: "click"});
	    		   }else{
	    			   action = draw.create("polygon");
	    		   }
    			   view.focus();
    			   if(type=='zidingyi'){
	    			   action.on("vertex-add", function (evt) {
	      			     createPolygonGraphic(evt.vertices);
	      			   });
    			   }
      			   action.on("vertex-remove", function (evt) {
      			     createPolygonGraphic(evt.vertices);
      			   });
      			   action.on("cursor-update", function (evt) {
      			     createPolygonGraphic(evt.vertices);
      			   });

      			   action.on("draw-complete", function (evt) {
      			     createPolygonGraphicComplete(evt.vertices);
      			   });  

    			 }

    			 function createPolygonGraphic(vertices){
    			   view.graphics.removeAll();
    			   var polygon = createPolygon(vertices);
    			   if(!polygon){
    				   return;
    			   }
    			   var graphic = new Graphic({
    			     geometry: polygon,
    			     symbol:{
    						type : "simple-fill",
    						color : [ 255, 0, 0, 0.3 ],
    						style : "solid",
    						outline : {
    							color : [ 255, 255, 0 ],
    							width : 2
    						}
    					}
    			   });
    			   var area = geometryEngine.geodesicArea(polygon, 'square-kilometers');
	      		   if(area<0){
		      		   area*=-1;
		      	   }
    			   $("#areaSum").html((area*100).toFixed(2)+ "公顷");
    			   view.graphics.add(graphic);
    			 }
                 function createPolygonGraphicComplete(vertices) {
                	 document.body.style.cursor='default';
                     view.graphics.removeAll();
                     var polygon = createPolygon(vertices);
      			     if(!polygon){
    				     return;
    			     }
	      			 var graphic = new Graphic({
	      			    geometry: polygon,
	      			    symbol:{
	      					type : "simple-fill",
	      					color : [ 255, 0, 0, 0.3 ],
	      					style : "solid",
	      					outline : {
	      						color : [ 255, 255, 0 ],
	      						width : 2
	      					}
	      				}
	      			 });
	      			 var area = geometryEngine.geodesicArea(polygon, 'square-kilometers');
	      			 if(area<0){
	      				area*=-1;
	      			 }
	      			 $("#areaSum").html((area*100).toFixed(2)+ "公顷");
	      			 view.graphics.add(graphic);
                     var indexQuery = layer.load(0);
                     var query = new Query();
                     query.geometry = polygon; 
                     query.distance = 1;
                     query.outFields = ["*"];
                     query.units = "meters";
                     query.spatialRelationship = "intersects";
                     query.returnGeometry = true;
                     xbQueryTask.execute(query).then(function(result){
                         var sumArea_pingcha=0;
                         var lindiList = [];//林地的FID
                         var dilei_lindi=['0111','0120','0131','0132','0141','0142','0150'];
                         var bahudengList=[];
                         var youshishuList=[];
                         analysisGraphicLayer.removeAll();
                         for(var j=0;j<result.features.length;j++){
                             var graphic=result.features[j];
                              var attributes = graphic.attributes;
                              var intersectGeo=geometryEngine.intersect(graphic.geometry,query.geometry);
                              if(dilei_lindi.indexOf(attributes.DI_LEI)!==-1){
                                  var ratio=geometryEngine.geodesicArea(intersectGeo,'square-meters')/geometryEngine.geodesicArea(graphic.geometry,'square-meters');
                                  sumArea_pingcha+=attributes.MIAN_JI *ratio;
                                  //lindiList.push(attributes.FID);
                                  if(!bahudengList.includes(attributes['保护等'])){
                                	  bahudengList.push(attributes['保护等']);
                                  }
                                  if(!youshishuList.includes(attributes['优势树'])){
                                	  youshishuList.push(attributes['优势树']);
                                  }
                                  var symbol = {
                   			    	 type: "simple-fill",  // autocasts as new SimpleFillSymbol()
               			         	 color: [ 244, 134, 186, 0.5],
               			         	 outline: {  // autocasts as new SimpleLineSymbol()
	                   			         width: 1,
	                   			         color: [ 255, 0, 0, 1]
               			      	 	 }
                                  };
                                  var graphic = new Graphic({
 				                	  geometry: intersectGeo,
 				                	  symbol: symbol
                                  });
                                  analysisGraphicLayer.add(graphic);
                              }  
                         }
  				         //var lindiSql=lindiList.join(',');
                         /*var dynamic_xb = dynamic_layers.findSublayerById(0);
                         map.remove(dynamic_layers);
               	 	     dynamic_xb.definitionExpression ='FID in ('+lindiSql+')';
             	         map.add(dynamic_layers,6);*/
                         $("#areaLinDi").html(sumArea_pingcha.toFixed(2)+"公顷");
                         $("#areaBhdj").html(bahudengList.join(','));
                         $("#areaYssz").html(youshishuList.join(','));
                     	 layer.close(analysis.layerMessageIndex);
                         layer.close(indexQuery);
                     });                           
                 } 

                 // 使用所提供的顶点创建多边形
                 function createPolygon(vertices) {
  	    		   if(type=='yuan'){
                       //少于一个点无法展示圆
                       if(vertices.length<2){
                           return
                       }
                       //生成绘制的图形,两点画圆
                       var center=new Point({
                           x:vertices[0][0],
                           y:vertices[0][1],
                           spatialReference: view.spatialReference
                       });
                       var dis=center.distance(new Point({
                           x:vertices[1][0],
                           y:vertices[1][1],
                           spatialReference: view.spatialReference
                       }));
                       return new Circle({
                           center:center,
                           radius:dis,
                           spatialReference: view.spatialReference
                       })
	    		   }else if(type=='juxing'){
	    	            //两点画矩形
	    	            if(vertices.length<2){
	    	                return
	    	            }
	    	            var rings=[vertices[0],[vertices[0][0],vertices[1][1]],vertices[1],[vertices[1][0],vertices[0][1]]];
	    	            return new Polygon({
	                        rings: [rings],
	                        spatialReference: view.spatialReference
	                    })
	    		   }else{
                       return new Polygon({
                           rings : vertices,
                           spatialReference : view.spatialReference
                       });
	    		   }
                 }
                                                   
  	   });
     },
     funSimpleQuery:function(){
    	 this.funClearLayerGraphics();
    	 this.layerName ='简单查询';
     	 var layerLeft ='175px'; 
    	 if($('#nav').hasClass('nav-mini')){
    		layerLeft='75px';
    	 }
    	 require(["esri/layers/FeatureLayer","esri/renderers/smartMapping/statistics/uniqueValues",
    		 "esri/tasks/support/Query","esri/tasks/Geoprocessor"],
    			 function(FeatureLayer,uniqueValues,Query,Geoprocessor) {
	    	 analysis.bodyIndex = layer.open({
				id:"SimpleQuery",
				type : 2,
				title : '简单查询',
				shadeClose : false,
				btn : [ '查询', '取消' ],
				area : [ '600px', '280px' ],
				offset : ['60px',layerLeft],
				shade : 0,
				resize : false,
				skin: 'layer-class',
				content : '../analysis/simpleQuery.jsp',
				success:function(layero,index){
					var body = layer.getChildFrame('body', index);
					var xbfeatureLayer=new FeatureLayer({
						url: "http://58.18.226.130:6080/arcgis/rest/services/EEGN_SHP/MapServer/11"
					})
					var xbFields = [['林场','linchangDiv'],
						['PO_DU','poduDiv'],
						['坡向','poxiangDiv'],
						['保护等','baohuDiv']];
					for(let i=0;i<xbFields.length;i++){
		        	   	uniqueValues({
		        		   	layer: xbfeatureLayer,
		        		   	field: xbFields[i][0]
		    		 	}).then(function(response){
			    		   	var infos = response.uniqueValueInfos;
			    		   	body.find("#"+xbFields[i][1]).append('<button class="layui-btn layui-btn-primary layui-btn-sm" style="background:#058563;color:#fff;">全部</button>');
			    		   	infos.forEach(function(info){
			    		   		body.find("#"+xbFields[i][1]).append('<button class="layui-btn layui-btn-primary layui-btn-sm">'+info.value+'</button>');
			    		   	});
		    		 	})	
					}

				},
				yes : function(index, layero) {
	                var body = layer.getChildFrame('body', index);  
	                var iframeWin = window[layero.find('iframe')[0]['name']]; 
	                var linchang=body.find("#linchangDiv").attr("data");
	                var podu=body.find("#poduDiv").attr("data");
	                var poxiang=body.find("#poxiangDiv").attr("data");
	                var baohu=body.find("#baohuDiv").attr("data");
	                layer.close(index);
	                var sqlEditAreaVal = '1=1';
	                if(linchang!=''){
	                	sqlEditAreaVal+=" and 林场='"+linchang+"'"
	                }
	                if(podu!=''){
	                	sqlEditAreaVal+=" and PO_DU="+podu+""
	                }
	                if(poxiang!=''){
	                	sqlEditAreaVal+=" and 坡向='"+poxiang+"'"
	                }
	                if(baohu!=''){
	                	sqlEditAreaVal+=" and 保护等='"+baohu+"'"
	                }
	                var loadIndex = layer.load(0, {shade : false});
	                function openPop(str){
	                   layer.close(loadIndex);
				       view.popup.open({
				           title: '查询结果统计',
				           buttonEnabled: false,
				           autoCloseEnabled:false,
				           actions:[],
				           content:str
				       });	
				       view.popup.set("dockOptions", {
					       breakpoint: false,
					       buttonEnabled: false,
					       position: 'bottom-right',
					   });
	                }
	                var query = new Query();
	                query.where = sqlEditAreaVal;
	                query.returnGeometry=false;
	                query.outFields=['*'];
              	   	xbQueryTask.execute(query).then(function(results){
          		   	  var features = results.features;
          		   	  var sumArea = 0;
          		   	  var lindiList = [];//林地的FID
          		   	  for(var i=0;i<features.length;i++){
          		   			sumArea+=features[i].attributes.MIAN_JI; 
          		   			lindiList.push(features[i].attributes.FID);
          		   	  }
					  var str = '<div style="text-align:center;border-bottom:1px solid #e5e5e5;">'
                       + '<table class="layui-table" lay-size="sm" lay-even style="text-align:left;margin-bottom:-1px"><tbody>'  
                       + '<tr><td style="width:90px;"><span>小班数</span></td><td><span>'+features.length +'</td></tr>'
                       + '<tr><td style="width:90px;"><span>面积</span></td><td><span>'+sumArea.toFixed(2)
                       + '</span></td></tr></tbody></table></div>';
				       var lindiSql=lindiList.join(',');
                       var dynamic_xb = dynamic_layers.findSublayerById(0);
               	 	   dynamic_xb.definitionExpression ='FID in ('+lindiSql+')';
             	       map.add(dynamic_layers,6);
             	       var params={
                     		 SqlExpression : 'FID in ('+lindiSql+')'
                        };
                   	  	var gp=new Geoprocessor("http://58.18.226.130:6080/arcgis/rest/services/FeatureSetExtent/GPServer/FeatureSetExtent");
                   	  	gp.submitJob(params).then(function(data){
                           var jobId = data.jobId;
                           var status = data.jobStatus;
                           if(status=="job-succeeded"){
                               gp.getResultData(jobId, "FeaturesEnvelop").then(function(result){
                            	   openPop(str);
                            	   if(result.value.features.length>0){
                                	   var geometry = result.value.features[0].geometry;
                                	   view.goTo({
                                           target : geometry,
                                           heading : 0,
                                           tilt : 0,
                                       }, {
                                           speedFactor : 0.7,
                                           easing : 'ease-out'
                                       });
                   	  			   }
                               })
                           }else{
                        	   openPop("查询失败");
                           } 
                       })
              	   	}).otherwise(function(e){
              	   		openPop("查询失败");
                    });
				},
				end : function(index, layero) {
				},
				cancel:function(){
				}
			});  
    	 });
     },
     //点击坐标列表的一列,设置坐标信息
  	 funSetEventLocation:function (longitude,latitude){
         var longtD,latD,longtM,latM,longtS,latS; 
         var body = layer.getChildFrame('body', this.bodyIndex); 
         if (this.layerName=='路径分析'||this.layerName=='通视分析') {
             if (body.contents().find("#locationType").val()=="optionDMS") {//度分秒
                 longtD = parseInt(longitude);
                 latD = parseInt(latitude);
                 longtM = parseInt((longitude - longtD) * 60);
                 latM = parseInt((latitude - latD) * 60);
                 longtS = parseInt(((longitude - longtD) * 60 - longtM) * 60);
                 latS = parseInt(((latitude - latD) * 60 - latM) * 60);
                 if (this.pointType=="start") {
                     body.contents().find("#longtDStart").val(longtD);
                     body.contents().find("#latDStart").val(latD);
                     body.contents().find("#longtMStart").val(longtM);
                     body.contents().find("#latMStart").val(latM);
                     body.contents().find("#longtSStart").val(longtS);
                     body.contents().find("#latSStart").val(latS);
                 }else if(this.pointType=="end"){
                     body.contents().find("#longtDEnd").val(longtD);
                     body.contents().find("#latDEnd").val(latD);
                     body.contents().find("#longtMEnd").val(longtM);
                     body.contents().find("#latMEnd").val(latM);
                     body.contents().find("#longtSEnd").val(longtS);
                     body.contents().find("#latSEnd").val(latS);
                 }

             } else {
                 if (this.pointType=="start") {
                     body.contents().find("#longtDStart").val(longitude.toFixed(6));
                     body.contents().find("#latDStart").val(latitude.toFixed(6));
                 }else if(this.pointType=="end"){
                     body.contents().find("#longtDEnd").val(longitude.toFixed(6));
                     body.contents().find("#latDEnd").val(latitude.toFixed(6));
                 }
             }
         } else{
        	 var locationType='';
        	 if(this.layerName=='资源查询'){
                 if ($("#intelQueryDiv").find("#locationType").val()=="optionDMS") {//度分秒
                     var longtD = parseInt(longitude);
                     var latD = parseInt(latitude);
                     var longtM = parseInt((longitude - longtD) * 60);
                     var latM = parseInt((latitude - latD) * 60);
                     var longtS = parseInt(((longitude - longtD) * 60 - longtM) * 60);
                     var latS = parseInt(((latitude - latD) * 60 - latM) * 60);
                     $("#intelQueryDiv").find("#longtD").val(longtD);
                     $("#intelQueryDiv").find("#latD").val(latD);
                     $("#intelQueryDiv").find("#longtM").val(longtM);
                     $("#intelQueryDiv").find("#latM").val(latM);
                     $("#intelQueryDiv").find("#longtS").val(longtS);
                     $("#intelQueryDiv").find("#latS").val(latS);
                 } else {
              	   $("#intelQueryDiv").find("#longtD").val(longitude.toFixed(6));
              	   $("#intelQueryDiv").find("#latD").val(latitude.toFixed(6));
                 }	 
        	 }else{
                 if (body.contents().find("#locationType").val()=="optionDMS" ) {//度分秒
                     longtD = parseInt(longitude);
                     latD = parseInt(latitude);
                     longtM = parseInt((longitude - longtD) * 60);
                     latM = parseInt((latitude - latD) * 60);
                     longtS = parseInt(((longitude - longtD) * 60 - longtM) * 60);
                     latS = parseInt(((latitude - latD) * 60 - latM) * 60);

                     body.contents().find("#longtD").val(longtD);
                     body.contents().find("#latD").val(latD);
                     body.contents().find("#longtM").val(longtM);
                     body.contents().find("#latM").val(latM);
                     body.contents().find("#longtS").val(longtS);
                     body.contents().find("#latS").val(latS);
                 } else {
                     body.contents().find("#longtD").val(longitude.toFixed(6));
                     body.contents().find("#latD").val(latitude.toFixed(6));
                 } 
        	 }
         }
 	},
  	funSetPointByClick:function (obj){
 		var body = layer.getChildFrame('body',this.bodyIndex);
 		if(this.layerName=="插旗标注"){
 			return;
 		}
 		if(this.layerName=='资源查询'){
 			var vs = document.getElementById("intelQueryDiv").style.visibility;
 			var chc = $("#intelQueryDiv").find("#screen_point").get(0).checked;
            if(document.getElementById("intelQueryDiv").style.visibility == "visible"&&$("#intelQueryDiv").find("#screen_point").get(0).checked){
                if ($("#intelQueryDiv").find("#locationType").val()=="optionDMS") {//度分秒
                    var longtD = parseInt(obj.x);
                    var latD = parseInt(obj.y);
                    var longtM = parseInt((obj.x - longtD) * 60);
                    var latM = parseInt((obj.y - latD) * 60);
                    var longtS = parseInt(((obj.x - longtD) * 60 - longtM) * 60);
                    var latS = parseInt(((obj.y - latD) * 60 - latM) * 60);
                    $("#intelQueryDiv").find("#longtD").val(longtD);
                    $("#intelQueryDiv").find("#latD").val(latD);
                    $("#intelQueryDiv").find("#longtM").val(longtM);
                    $("#intelQueryDiv").find("#latM").val(latM);
                    $("#intelQueryDiv").find("#longtS").val(longtS);
                    $("#intelQueryDiv").find("#latS").val(latS);
                } else {
             	   $("#intelQueryDiv").find("#longtD").val(obj.x.toFixed(6));
             	   $("#intelQueryDiv").find("#latD").val(obj.y.toFixed(6));
                }
            }
    	}else if (body.length!=0) {
        	if(this.layerName!='路径分析'&&this.layerName!='通视分析'){
                if (body.contents().find("#screen_point")==null || !body.contents().find("#screen_point").get(0).checked) {//非屏幕选点则点击屏幕无反应
                    return;
                }  
     	   }else{
                if (!body.contents().find("#screenStart").get(0).checked&&!body.contents().find("#screenEnd").get(0).checked) {//非屏幕选点则点击屏幕无反应
                    return;
                } 
     	   }
     	   this.funSetEventLocation(obj.x,obj.y);
        }
     },
     /*事件绘制*/
     /*最近事件加载*/
     loadRecentEvent:function(){
		var cookie_department = localStorage.getItem('cookie_department');
		cookie_department = cookie_department.substring(0,cookie_department.length - 1);
		var eachDepart = cookie_department.split("&");
		for (var i = 0; i < eachDepart.length; i++) {
			var eachDep = eachDepart[i].split("-");
			// 添加选项 department为select的id
			$("#eventDrawDepartment").append("<option value='" + eachDep[0] + "'>" + eachDep[1]+ "<oprion>")
		}
		layui.use(['laydate','table','util'], function(){
		  var laydate = layui.laydate;
		  var util = layui.util;
		  //日期时间范围
		  laydate.render({
		    elem: '#recentEventTime'
		    ,range: '~'
		    ,format: 'yyyy-M-d'
		  });
		  var threeAgo = moment().subtract(3,'days').format("YYYY-M-DD");
		  var now=moment().format("YYYY-M-DD");
		  $("#recentEventTime").val(now+" ~ "+now);
		  var table = layui.table;
		  var closData =  [[
		      {field:'department',title: '部门',align:'center',width:100}
		      ,{field:'time',title: '时间',align:'center',width:144
		          ,templet: function(d){
		              return util.toDateString(d.time,'yyyy/MM/dd HH:mm:ss').substr(2)
		          }    
		      }
		      ,{field:'locate',title: '定位',align:'center',width:64
		          ,templet: function(d){
		              return '<img style="margin-top:5px;" onclick="analysis.lonlatLocator('+d.longitude+','+d.latitude+')" src="/ResourceMonitor/images/indexpage/dingwei.png">'
		          }    
		      }
		      ,{field:'id',hide: true,}
	      ]];
		  
		  var time = $("#recentEventTime").val(); 
		  //视频回放表格渲染
		  table.render({
		    elem: '#eventDrawTable'
		    ,url:'/ResourceMonitor/recentEvent/queryEvent'
		    ,cols:closData
		  	,id: 'eventDrawTableId'
		  	,page: {
		  		layout:['prev', 'page', 'next']			  		
		  	}
		  	, skin: 'line' 
		  	,limits:[10,30,90]
		  	,where:{
		  		time
		  	},
		  	done:function(){
		  		tableHeight = $("#panelEventDraw").height() - 210;
		  		$('.layui-table-header').css('display', 'none');
		  		$(".layui-table-body").height(tableHeight-40);
		  		$(".layui-table-box").height(tableHeight-40);
		  		$(".layui-form").height(tableHeight-40);
		  	}
		  });
		  $(window).resize(function() {
			    tableHeight = $("#panelEventDraw").height() - 210;
			  	$(".layui-table-body").height(tableHeight-40);
		  		$(".layui-table-box").height(tableHeight-40);
		  		$(".layui-form").height(tableHeight-40);
		  });
		  //查询
		  $("#eventDrawSubmit").off().on("click",function(){
			  queryTable();
		  }); 
		  function queryTable(){
			  var department = $("#eventDrawDepartment option:selected").text();
			  var time = $("#recentEventTime").val(); 
			  if(department=="额尔古纳林业局"){
				  department='';
			  }
		      table.reload('eventDrawTableId', {
		        page: {
		          curr: 1 
		        }
		        ,where: {
		            department,
		            time
		        }
		      });
		  }
		  //点击定位事件
		  table.on('tool(eventDrawFilter)', function(obj){
			 var data = obj.data;
		  });
		  
		}); 	 
     },
     idLocator:function(rowId){
	    	$.ajax({
	    		url : '/ResourceMonitor/event/findEventCoor', 
	    		dataType : "json", // 返回格式为json
	    		async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
	    		data : {
	    			id : rowId,
	    		}, // 参数值
	    		type : "POST", // 请求方式
	    		beforeSend : function() {
	    		},
	    		success : function(req) {
	   			   var longitude = req.rows[0].longitude; 
	   			   var latitude =  req.rows[0].latitude;
	   			   analysis.funEventLocator({lon:longitude,lat:latitude});
	    		},
	    		complete : function() {
	    			// 请求完成的处理
	    		},
	    		error : function() {
	    			// 请求出错处理
	    		}
	    	}); 
     },
     loadReportEvent:function(){
		var cookie_department =  localStorage.getItem('cookie_department');
		cookie_department = cookie_department.substring(0,cookie_department.length - 1);
		var eachDepart = cookie_department.split("&");
		for (var i = 0; i < eachDepart.length; i++) {
			var eachDep = eachDepart[i].split("-");
			// 添加选项 department为select的id
			$("#eventDrawDepartment").append("<option value='" + eachDep[0] + "'>" + eachDep[1]+ "<oprion>")
		}
		layui.use(['laydate','table','util'], function(){
		  var laydate = layui.laydate;
		  var util = layui.util;
		  laydate.render({
		    elem: '#reportEventTime'
		    ,range: '~'
		    ,format: 'yyyy-M-d'
		  });
		  var threeAgo = moment().subtract(3,'days').format("YYYY-M-DD");
		  var now=moment().format("YYYY-M-DD");
		  $("#reportEventTime").val(now+" ~ "+now);
		  var table = layui.table;
		  var closData =  [[
		      {field:'reportPeople',title: '人员',align:'center',width:60}
		     
		      ,{field:'uploadTime',title: '时间',align:'center',width:125
		          ,templet: function(d){
		              return util.toDateString(d.uploadTime,'yyyy/MM/dd HH:mm:ss').substr(2)
		          }    
		      } ,{field:'eventDe',title: '详情',align:'center',width:60
		          ,templet: function(d){
		        	  var id= d.id;
		              return '<img style="margin-top:5px;width:16px;height:16px;" onclick="showDetail(\''+d.id+'\')" src="/ResourceMonitor/images/indexpage/details.png">'
		          }    
		      }
		      ,{field:'locate',title: '定位',align:'center'
		          ,templet: function(d){
		        	  var id= d.id;
		              return '<img style="margin-top:5px;" onclick="analysis.idLocator(\''+d.id+'\')" src="/ResourceMonitor/images/indexpage/dingwei.png">'
		          }    
		      }
		      ,{field:'id',hide: true,}
	      ]];
		  //事件渲染
		  table.render({
		    elem: '#eventDrawTable'
		    ,url:'/ResourceMonitor/event/queryEvent'
		    ,cellMinWidth: 60 
		    ,cols:closData
		  	,id: 'eventDrawTableId'
		  	,page: {
		  		layout:['prev', 'page', 'next']			  		
		  	}
		  	,height: '400'
		  	, skin: 'line' 
		  	,limits:[10,30,90]
			,method : 'post' // 如果无需自定义HTTP类型，可不加该参数
			,request : {
				pageName : 'page' // 页码的参数名称，默认：page
				,limitName : 'rows' // 每页数据量的参数名，默认：limit

			},
			response : {
				statusName : 'status' // 规定数据状态的字段名称，默认：code
				,statusCode : 200 // 规定成功的状态码，默认：0
				,msgName : 'msg' // 规定状态信息的字段名称，默认：msg
				,countName : 'records' // 规定数据总数的字段名称，默认：count
				,dataName : 'rows' // 规定数据列表的字段名称，默认：data
			},
			where : {
				department : '全部',
				startTime : $("#reportEventTime").val().split(' ~ ')[0],
				personName :'',
				endTime : $("#reportEventTime").val().split(' ~ ')[1],
				readState : '',
				projectType :''
			},
		  	done:function(){
		  		tableHeight = $("#panelEventDraw").height() - 240;
		  		$('.layui-table-cell').css('padding','0px');
		  		$('.layui-table-header').css('display', 'none');
		  		$(".layui-table-body").height(tableHeight-40);
		  		$(".layui-table-box").height(tableHeight-40);
		  		$(".layui-form").height(tableHeight-40);
		  	}
		  });
		  $(window).resize(function() {
			  tableHeight = $("#panelEventDraw").height() - 240;
			  	$(".layui-table-body").height(tableHeight-40);
		  		$(".layui-table-box").height(tableHeight-40);
		  		$(".layui-form").height(tableHeight-40);
		  });
		  //查询
		  $("#eventDrawSubmit").off().on("click",function(){
				var department = $("#eventDrawDiv").find("#eventDrawDepartment").val();
				if(department == "0"){
					department = "全部";
				}
				var personName = $("#eventDrawDiv").find("#personName").val();
				var readState = $("#eventDrawDiv").find("#readState").val();
		      table.reload('eventDrawTableId', {
		        page: {
		          curr: 1 
		        }
		        ,where: {
		            department:department,
		            startTime:$("#reportEventTime").val().split(' ~ ')[0],
		            endTime:$("#reportEventTime").val().split(' ~ ')[1],
					personName : personName,
					readState : readState,
					projectType : ''
		        }
		      });
		  }); 
		  //点击定位事件
		  table.on('tool(eventDrawFilter)', function(obj){
			 var data = obj.data;
		  });
		  
		}); 	 
     },
     sosIdLocator:function (rowId) {
    		$.ajax({
    			url : localhostPath + projectName + '/sos/sosDetail', // 请求的url地址
    			dataType : "json", // 返回格式为json
    			async : true,// 请求是否异步，默认为异步，这也是ajax重要特性
    			data : {
    				id : rowId,
    			}, // 参数值
    			type : "POST", // 请求方式
    			beforeSend : function() {
    				// 请求前的处理
    			},
    			success : function(req) {
 	   			   var longitude = req.rows[0].longitude; 
	   			   var latitude =  req.rows[0].latitude;
	   			   analysis.funEventLocator({lon:longitude,lat:latitude});
    			},
    			complete : function() {
    				// 请求完成的处理
    			},
    			error : function() {
    				// 请求出错处理
    			}
    		});
    	},
     //sos列表渲染
     loadSosAlert:function(){
 		var cookie_department = localStorage.getItem('cookie_department');
 		cookie_department = cookie_department.substring(0,cookie_department.length - 1);
 		var eachDepart = cookie_department.split("&");
 		for (var i = 0; i < eachDepart.length; i++) {
 			var eachDep = eachDepart[i].split("-");
 			// 添加选项 department为select的id
 			$("#eventDrawDepartment").append("<option value='" + eachDep[0] + "'>" + eachDep[1]+ "<oprion>")
 		}
 		layui.use(['laydate','table','util'], function(){
 		  var laydate = layui.laydate;
 		  var util = layui.util;
		  laydate.render({
		    elem: '#sosAlertTime'
		    ,range: '~'
		    ,format: 'yyyy-M-d'
		  });
		  var threeAgo = moment().subtract(3,'days').format("YYYY-M-DD");
		  var now=moment().format("YYYY-M-DD");
		  $("#sosAlertTime").val(now+" ~ "+now);
 		  var table = layui.table;
 		  var closData =  [[
 		      {field:'personName',title: '人员',align:'center',width:100}
 		      ,{field:'reportTime',title: '时间',align:'center',width:144
 		          ,templet: function(d){
 		              return util.toDateString(d.reportTime,'yyyy/MM/dd HH:mm:ss').substr(2)
 		          }    
 		      }
 		      ,{field:'locate',title: '定位',align:'center'
 		          ,templet: function(d){
 		              return '<img style="margin:5px;" onclick="analysis.sosIdLocator(\''+d.id+'\')" src="/ResourceMonitor/images/indexpage/dingwei.png">'
 		          }    
 		      }
 		      ,{field:'id',hide: true,}
 	      ]];
 		  //事件渲染
 		  table.render({
 		    elem: '#eventDrawTable'
 		    ,url:'/ResourceMonitor/sos/querySOS'
 		    ,cellMinWidth: 60 
 		    ,cols:closData
 		  	,id: 'eventDrawTableId'
		  	,page: {
		  		layout:['prev', 'page', 'next']			  		
		  	}
 		  	,height: '400'
 		  	, skin: 'line' 
 		  	,limits:[10,30,90]
 			,method : 'post' // 如果无需自定义HTTP类型，可不加该参数
 			,request : {
 				pageName : 'page' // 页码的参数名称，默认：page
 				,limitName : 'rows' // 每页数据量的参数名，默认：limit

 			},
 			response : {
 				statusName : 'status' // 规定数据状态的字段名称，默认：code
 				,statusCode : 200 // 规定成功的状态码，默认：0
 				,msgName : 'msg' // 规定状态信息的字段名称，默认：msg
 				,countName : 'records' // 规定数据总数的字段名称，默认：count
 				,dataName : 'rows' // 规定数据列表的字段名称，默认：data
 			},
 			where : {
 				department : '全部',
				startTime : $("#sosAlertTime").val().split(' ~ ')[0],
				personName :'',
				endTime : $("#sosAlertTime").val().split(' ~ ')[1],
 				readState : '',
 				projectType :''
 			},
		  	done:function(){
		  		tableHeight = $("#panelEventDraw").height() - 240;
		  		$('.layui-table-cell').css('padding','0px');
		  		$('.layui-table-header').css('display', 'none');
		  		$(".layui-table-body").height(tableHeight-40);
		  		$(".layui-table-box").height(tableHeight-40);
		  		$(".layui-form").height(tableHeight-40);
		  	}
 		  });
		  $(window).resize(function() {
			  tableHeight = $("#panelEventDraw").height() - 240;
			    $(".layui-table-body").height(tableHeight-40);
		  		$(".layui-table-box").height(tableHeight-40);
		  		$(".layui-form").height(tableHeight-40);
		  });
 		  //查询
 		  $("#eventDrawSubmit").off().on("click",function(){
 				var department = $("#eventDrawDiv").find("#eventDrawDepartment").val();
 				if(department == "0"){
 					department = "全部";
 				}
 				var personName = $("#eventDrawDiv").find("#personName").val();
 				var readState = $("#eventDrawDiv").find("#readState").val();
 		      table.reload('eventDrawTableId', {
 		        page: {
 		          curr: 1 
 		        }
 		        ,where: {
 		            department:department,
		            startTime:$("#sosAlertTime").val().split(' ~ ')[0],
		            endTime:$("#sosAlertTime").val().split(' ~ ')[1],
 					personName : personName,
 					readState : readState,
 					projectType : ''
 		        }
 		      });
 		  }); 
 		}); 	 
      },
     getNowFormatDate:function () {
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
    	},
    	addFlagPoints:function(pointStr){
    		require(["esri/Graphic"], function(Graphic) {
    			var points = JSON.parse(pointStr);
    			var graphics = [];
    			signFlagLayer.removeAll();
    			for(var i=0;i<points.length;i++){
    				var point = points[i];
    	        	var signPoint3dPnt = {
		                type : "point", // autocasts as new Point()
		                x : point.x,
		                y : point.y,
		                z : 0
		            };
                    var signPoint3dPntSymbol = {
                        type: "point-3d", 
                        symbolLayers: [{
                          type: "icon", 
                          size:point.size,
                          resource: { href: point.href },            
                        },{
                 	      type: "text",  
                 	      text: point.text,
                 	      material: { color: point.color },
                 	      size: 12  
                 	    }
                        ],             
                    };
		            var signPoint3dGraphic = new Graphic({
		                geometry : signPoint3dPnt,
		                symbol : signPoint3dPntSymbol
		            });
		            graphics.push(signPoint3dGraphic);
		            signFlagLayer.add(signPoint3dGraphic);
    			}
    			if(graphics.length==1){
    	    		view.goTo({
    	                target :graphics[0],
    	                heading : 0,
    	                tilt : 45,
    	                scale :50000
    	             }, {
    	                speedFactor : 1,
    	                easing : 'ease-out'
    	             });
    			}else{
    	    		view.goTo({
    	                target :graphics,
    	                heading : 0,
    	                tilt : 45,
    	             }, {
    	                speedFactor : 1,
    	                easing : 'ease-out'
    	             });
    			}

    		});
    	}
}







     

     


    //

