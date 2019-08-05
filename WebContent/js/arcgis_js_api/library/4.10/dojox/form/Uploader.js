//>>built
require({cache:{"url:dojox/form/resources/Uploader.html":'\x3cspan class\x3d"dijit dijitReset dijitInline"\r\n\t\x3e\x3cspan class\x3d"dijitReset dijitInline dijitButtonNode"\r\n\t\tdata-dojo-attach-event\x3d"ondijitclick:_onClick"\r\n\t\t\x3e\x3cspan class\x3d"dijitReset dijitStretch dijitButtonContents"\r\n\t\t\tdata-dojo-attach-point\x3d"titleNode,focusNode"\r\n\t\t\trole\x3d"button" aria-labelledby\x3d"${id}_label"\r\n\t\t\t\x3e\x3cspan class\x3d"dijitReset dijitInline dijitIcon" data-dojo-attach-point\x3d"iconNode"\x3e\x3c/span\r\n\t\t\t\x3e\x3cspan class\x3d"dijitReset dijitToggleButtonIconChar"\x3e\x26#x25CF;\x3c/span\r\n\t\t\t\x3e\x3cspan class\x3d"dijitReset dijitInline dijitButtonText"\r\n\t\t\t\tid\x3d"${id}_label"\r\n\t\t\t\tdata-dojo-attach-point\x3d"containerNode"\r\n\t\t\t\x3e\x3c/span\r\n\t\t\x3e\x3c/span\r\n\t\x3e\x3c/span\r\n\t\x3e \r\n\t\x3cinput ${!nameAttrSetting} type\x3d"${type}" value\x3d"${value}" class\x3d"dijitOffScreen" tabIndex\x3d"-1" data-dojo-attach-point\x3d"valueNode" /\x3e\r\n\x3c/span\x3e\r\n'}});
define("dojo/_base/kernel dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/window dojo/dom-style dojo/dom-class dojo/dom-geometry dojo/dom-attr dojo/dom-construct dojo/dom-form dijit dijit/form/Button ./uploader/_Base ./uploader/_HTML5 ./uploader/_IFrame ./uploader/_Flash dojo/i18n!./nls/Uploader dojo/text!./resources/Uploader.html".split(" "),function(w,m,x,e,f,y,b,h,z,k,g,n,A,l,p,q,r,t,u,v){return m("dojox.form.Uploader",[p,l,q,r,t],{uploadOnSelect:!1,tabIndex:0,
multiple:!1,label:u.label,url:"",name:"uploadedfile",flashFieldName:"",force:"",uploadType:"",showInput:"",focusedClass:"dijitButtonHover",_nameIndex:0,templateString:v,baseClass:"dijitUploader "+l.prototype.baseClass,postMixInProperties:function(){this._inputs=[];this._cons=[];this.force=this.force.toLowerCase();this.supports("multiple")?this.uploadType="form"===this.force?"form":"html5":this.uploadType="flash"===this.force?"flash":"iframe";this.inherited(arguments)},buildRendering:function(){this.inherited(arguments);
b.set(this.domNode,{overflow:"hidden",position:"relative"});this._buildDisplay();k.set(this.titleNode,"tabIndex",-1)},_buildDisplay:function(){this.showInput&&(this.displayInput=g.create("input",{"class":"dijitUploadDisplayInput",tabIndex:-1,autocomplete:"off",role:"presentation"},this.containerNode,this.showInput),this._attachPoints.push("displayInput"),this.connect(this,"onChange",function(a){for(var d=0,c,b=[];c=a[d++];)c&&c.name&&b.push(c.name);this.displayInput.value=b.join(", ")}),this.connect(this,
"reset",function(){this.displayInput.value=""}))},startup:function(){this._buildInitialized||(this._buildInitialized=!0,this._getButtonStyle(this.domNode),this._setButtonStyle(),this.inherited(arguments))},onChange:function(a){},onBegin:function(a){},onProgress:function(a){},onComplete:function(a){this.reset()},onCancel:function(){},onAbort:function(){},onError:function(a){},upload:function(a){a=a||{};a.uploadType=this.uploadType;this.inherited(arguments)},submit:function(a){a=a?a.tagName?a:this.getForm():
this.getForm();a=n.toObject(a);a.uploadType=this.uploadType;this.upload(a)},reset:function(){delete this._files;this._disconnectButton();e.forEach(this._inputs,g.destroy);this._inputs=[];this._nameIndex=0;this._createInput()},getFileList:function(){var a=[];this.supports("multiple")?e.forEach(this._files,function(d,b){a.push({index:b,name:d.name,size:d.size,type:d.type})},this):e.forEach(this._inputs,function(b,c){b.value&&a.push({index:c,name:b.value.substring(b.value.lastIndexOf("\\")+1),size:0,
type:b.value.substring(b.value.lastIndexOf(".")+1)})},this);return a},_getValueAttr:function(){return this.getFileList()},_setValueAttr:function(a){console.error("Uploader value is read only")},_setDisabledAttr:function(a){this.disabled!=a&&this.inputNode&&(this.inherited(arguments),b.set(this.inputNode,"display",a?"none":""))},_getButtonStyle:function(a){this.btnSize={w:b.get(a,"width"),h:b.get(a,"height")}},_setButtonStyle:function(){this.inputNodeFontSize=Math.max(2,Math.max(Math.ceil(this.btnSize.w/
60),Math.ceil(this.btnSize.h/15)));this._createInput()},_getFileFieldName:function(){return this.supports("multiple")&&this.multiple?this.name+"s[]":this.name+(this.multiple?this._nameIndex:"")},_createInput:function(){this._inputs.length&&(b.set(this.inputNode,{top:"500px"}),this._disconnectButton(),this._nameIndex++);var a=this._getFileFieldName();this.focusNode=this.inputNode=g.create("input",{type:"file",name:a,"aria-labelledby":this.id+"_label"},this.domNode,"first");this.supports("multiple")&&
this.multiple&&k.set(this.inputNode,"multiple",!0);this._inputs.push(this.inputNode);b.set(this.inputNode,{position:"absolute",fontSize:this.inputNodeFontSize+"em",top:"-3px",right:"-3px",opacity:0});this._connectButton()},_connectButton:function(){this._cons.push(f.connect(this.inputNode,"change",this,function(a){this._files=this.inputNode.files;this.onChange(this.getFileList(a));!this.supports("multiple")&&this.multiple&&this._createInput()}));-1<this.tabIndex&&(this.inputNode.tabIndex=this.tabIndex,
this._cons.push(f.connect(this.inputNode,"focus",this,function(){h.add(this.domNode,this.focusedClass)})),this._cons.push(f.connect(this.inputNode,"blur",this,function(){h.remove(this.domNode,this.focusedClass)})))},_disconnectButton:function(){e.forEach(this._cons,f.disconnect);this._cons.splice(0,this._cons.length)}})});