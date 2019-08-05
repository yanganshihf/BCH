    var oWebControl = null;// 插件对象
    var bIE = (!!window.ActiveXObject || 'ActiveXObject' in window);// 是否为IE浏览器
    var pubKey = '';

    var iLastCoverLeft = 0;
    var iLastCoverTop = 0;
    var iLastCoverRight = 0;
    var iLastCoverBottom = 0;
	var initCount = 0;		
    // 标签关闭
    $(window).unload(function () {
		// 此处请勿调反初始化
        if (oWebControl != null){
                oWebControl.JS_Disconnect().then(function(){}, function() {});
            }
    });

    // 窗口resize
/*    $(window).resize(function () {
        if (oWebControl != null) {
            oWebControl.JS_Resize(700, 400);
            setWndCover();
        }
    });*/
	
    // 初始化插件
	function initPlugin () {
		oWebControl = new WebControl({
			szPluginContainer: "playWnd",
			iServicePortStart: 15900,
			iServicePortEnd: 15909,
			cbConnectSuccess: function () {
				setCallbacks();
				oWebControl.JS_StartService("window", {
					dllPath: "./VideoPluginConnect.dll"
				}).then(function () {
					var height = $(window).height();
					var width = $(window).width();
					oWebControl.JS_CreateWnd("playWnd",width/2, height+5).then(function () {
						funInit();
					});
				}, function () {
				});
			},
			cbConnectError: function () {
				console.log("cbConnectError");
				oWebControl = null;
				$("#playWnd").html("插件未启动，正在尝试启动，请稍候...");
				WebControl.JS_WakeUp("VideoWebPlugin://");
				initCount ++;
				if (initCount < 3) {
					setTimeout(function () {
						initPlugin();
					}, 3000)
				} else {
					$("#playWnd").html("插件启动失败，请检查插件是否安装！");
				}
			},
			cbConnectClose: function () {
				console.log("cbConnectClose");
				oWebControl = null;
			}
		});
	}
	//initPlugin();
    // 获取公钥
    function getPubKey (callback) {
        oWebControl.JS_RequestInterface({
            funcName: "getRSAPubKey",
            argument: JSON.stringify({
                keyLength: 1024
            })
        }).then(function (oData) {
            console.log(oData)
            if (oData.responseMsg.data) {
                pubKey = oData.responseMsg.data
                callback()
            }
        })
    }

    // 设置窗口控制回调
    function setCallbacks() {
        oWebControl.JS_SetWindowControlCallback({
            cbIntegrationCallBack: cbIntegrationCallBack
        });
    }

    // 推送消息
    function cbIntegrationCallBack(oData) {
    	console.log(JSON.stringify(oData.responseMsg));
    }

    // RSA加密
    function setEncrypt (value) {
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(pubKey);
        return encrypt.encrypt(value);
    }

    // 初始化
    function funInit(){
        getPubKey(function () {
            var appkey = '28634284';
            var secret = setEncrypt('48TJJqrzTev35fwhLFlB');
            var ip = '192.168.2.99';
			var szPort=443;
            var snapDir = 'D:\SnapDir';
			var videoDir = 'D:\VideoDir';
            var layout = '1x1';
            var enableHttps = 1;
            oWebControl.JS_RequestInterface({
                funcName: "init",
                argument: JSON.stringify({
                    appkey: appkey,
                    secret: secret,
                    ip: ip,
                    playMode: 0, // 预览
                    port: szPort,
                    snapDir: snapDir,
					videoDir: videoDir,
                    layout: layout,
					enableHTTPS: enableHttps,
                    encryptedFields: 'secret'
                })
            }).then(function (oData) {
                console.log(JSON.stringify(oData ? oData.responseMsg : ''));
            });
        })
    }
	
	//设置当前布局
	$("#SetLayout").click(function (){
	    var layout = $("#setlayout").val();
		
		oWebControl.JS_RequestInterface({
            funcName: "setLayout",
            argument: JSON.stringify({
                layout : layout
            })
        }).then(function (oData) {
        	console.log(JSON.stringify(oData ? oData.responseMsg : ''));
        });
	})
	
	//获取当前布局
	$("#GetLayout").click(function (){
		oWebControl.JS_RequestInterface({
            funcName: "getLayout"
        }).then(function (oData) {
        	console.log(JSON.stringify(oData ? oData.responseMsg : ''));
        });
	})
	
	//抓图
	$("#SnapPic").click(function (){
	    var snapName = $("#snapName").val();
		var wndId = 0; //选中窗口抓图
		
		snapName = snapName.replace(/(^\s*)/g, "");
		snapName = snapName.replace(/(\s*$)/g, "");
		
		var sel = document.getElementById("SnapType");
		var selectedId = sel.selectedIndex;
		var v = sel.options[selectedId].value;
		if (1 == v)//指定窗口抓图
		{
			wndId = parseInt($("#SnapWndId option:selected").val(), 10);
		}
		else if (0 == v) //选中窗口抓图
		{
			wndId = 0;
		}
		
		oWebControl.JS_RequestInterface({
            funcName: "snapShot",
            argument: JSON.stringify({
                name : snapName,
				wndId: wndId
            })
        }).then(function (oData) {
        	console.log(JSON.stringify(oData ? oData.responseMsg : ''));
        });
	})

    // 视频预览
    $("#startPreview").click(function () {
        var cameraIndexCode  = $("#cameraIndexCode ").val();
        var streamMode = +$("#streamMode").val();
        var transMode = +$("#transMode").val();
        var gpuMode = +$("#gpuMode").val();
		var wndId = -1;  //默认为空闲窗口回放
		
		cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
		cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");
		
		var sel = document.getElementById("PlayType");
		var selectedId = sel.selectedIndex;
		var v = sel.options[selectedId].value;
		if (2 == v)//指定窗口回放
		{
			wndId = parseInt($("#playWndId option:selected").val(), 10);
		}
		else if (1 == v) //选中窗口回放
		{
			wndId = 0;
		}

        if (!cameraIndexCode ) {
            console.log("监控点编号不能为空！", 'error');
            return
        }

        oWebControl.JS_RequestInterface({
            funcName: "startPreview",
            argument: JSON.stringify({
                cameraIndexCode : cameraIndexCode ,
                streamMode: streamMode,
                transMode: transMode,
                gpuMode: gpuMode,
				wndId: wndId
            })
        }).then(function (oData) {
        	console.log(JSON.stringify(oData ? oData.responseMsg : ''));
        });
    })
	
	//字符叠加
	$("#setOSDText").click(function (){
	    var text = $("#OSDText").val();
		var x = +$("#Xsite").val();
		var y = +$("#Ysite").val();
		var ColorR = parseInt($("#RColor").val());
		var ColorG = parseInt($("#GColor").val());
		var ColorB = parseInt($("#BColor").val());
		var Color = 65536 * ColorB + 256 * ColorG + ColorR;
		var wndId = 0;
		
		var sel = document.getElementById("SetOSDType");
		var selectedId = sel.selectedIndex;
		var v = sel.options[selectedId].value;
		if (1 == v)//指定窗口字符叠加
		{
			wndId = parseInt($("#osdWndId option:selected").val(), 10);
		}
		else  //空闲窗口字符叠加
		{
			wndId = 0;
		}
		
		oWebControl.JS_RequestInterface({
            funcName: "drawOSD",
            argument: JSON.stringify({
                text : text,
				x: x,
				y: y,
				color: Color,
				wndId: wndId
            })
        }).then(function (oData) {
        	console.log(JSON.stringify(oData ? oData.responseMsg : ''));
        });
	})
    
    // 停止预览
    $("#stopAllPreview").click(function () {
        oWebControl.JS_RequestInterface({
            funcName: "stopAllPreview"
        }).then(function (oData) {
        	console.log(JSON.stringify(oData ? oData.responseMsg : ''));
        });
    })

    // 反初始化
    function uninit () {
        oWebControl.JS_RequestInterface({
            funcName: "uninit"
        }).then(function (oData) {
        	console.log(JSON.stringify(oData ? oData.responseMsg : ''));
        });
    }
    $("#uninit").click(uninit)




    // 格式化时间
    function dateFormat(oDate, fmt) {
        var o = {
            "M+": oDate.getMonth() + 1, //月份
            "d+": oDate.getDate(), //日
            "h+": oDate.getHours(), //小时
            "m+": oDate.getMinutes(), //分
            "s+": oDate.getSeconds(), //秒
            "q+": Math.floor((oDate.getMonth() + 3) / 3), //季度
            "S": oDate.getMilliseconds()//毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }

	function textbox(obj, min, max){
		obj.value=obj.value.replace(/[^\d]/g,'');
		if(parseInt(obj.value)==obj.value && parseInt(obj.value)>=min && parseInt(obj.value)<=max)
		{}
		else
		{
			if(parseInt(obj.value) < min)
			{
				obj.value = min;
			}
			if(parseInt(obj.value) > max)
			{
				obj.value = max;
			}
		}	
	}
