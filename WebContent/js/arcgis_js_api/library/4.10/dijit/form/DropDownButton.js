//>>built
require({cache:{"url:dijit/form/templates/DropDownButton.html":'\x3cspan class\x3d"dijit dijitReset dijitInline"\r\n\t\x3e\x3cspan class\x3d\'dijitReset dijitInline dijitButtonNode\'\r\n\t\tdata-dojo-attach-event\x3d"ondijitclick:__onClick" data-dojo-attach-point\x3d"_buttonNode"\r\n\t\t\x3e\x3cspan class\x3d"dijitReset dijitStretch dijitButtonContents"\r\n\t\t\tdata-dojo-attach-point\x3d"focusNode,titleNode,_arrowWrapperNode,_popupStateNode"\r\n\t\t\trole\x3d"button" aria-haspopup\x3d"true" aria-labelledby\x3d"${id}_label"\r\n\t\t\t\x3e\x3cspan class\x3d"dijitReset dijitInline dijitIcon"\r\n\t\t\t\tdata-dojo-attach-point\x3d"iconNode"\r\n\t\t\t\x3e\x3c/span\r\n\t\t\t\x3e\x3cspan class\x3d"dijitReset dijitInline dijitButtonText"\r\n\t\t\t\tdata-dojo-attach-point\x3d"containerNode"\r\n\t\t\t\tid\x3d"${id}_label"\r\n\t\t\t\x3e\x3c/span\r\n\t\t\t\x3e\x3cspan class\x3d"dijitReset dijitInline dijitArrowButtonInner"\x3e\x3c/span\r\n\t\t\t\x3e\x3cspan class\x3d"dijitReset dijitInline dijitArrowButtonChar"\x3e\x26#9660;\x3c/span\r\n\t\t\x3e\x3c/span\r\n\t\x3e\x3c/span\r\n\t\x3e\x3cinput ${!nameAttrSetting} type\x3d"${type}" value\x3d"${value}" class\x3d"dijitOffScreen" tabIndex\x3d"-1"\r\n\t\tdata-dojo-attach-event\x3d"onclick:_onClick" data-dojo-attach-point\x3d"valueNode" aria-hidden\x3d"true"\r\n/\x3e\x3c/span\x3e\r\n'}});
define("dojo/_base/declare dojo/_base/kernel dojo/_base/lang dojo/query ../registry ../popup ./Button ../_Container ../_HasDropDown dojo/text!./templates/DropDownButton.html ../a11yclick".split(" "),function(e,d,f,p,g,h,k,l,m,n){return e("dijit.form.DropDownButton",[k,l,m],{baseClass:"dijitDropDownButton",templateString:n,_fillContent:function(){var a=this.srcNodeRef,c=this.containerNode;if(a&&c)for(;a.hasChildNodes();){var b=a.firstChild;b.hasAttribute&&(b.hasAttribute("data-dojo-type")||b.hasAttribute("dojoType")||
b.hasAttribute("data-"+d._scopeName+"-type")||b.hasAttribute(d._scopeName+"Type"))?(this.dropDownContainer=this.ownerDocument.createElement("div"),this.dropDownContainer.appendChild(b)):c.appendChild(b)}},startup:function(){this._started||(!this.dropDown&&this.dropDownContainer&&(this.dropDown=g.byNode(this.dropDownContainer.firstChild),delete this.dropDownContainer),this.dropDown&&h.hide(this.dropDown),this.inherited(arguments))},isLoaded:function(){var a=this.dropDown;return!!a&&(!a.href||a.isLoaded)},
loadDropDown:function(a){var c=this.dropDown,b=c.on("load",f.hitch(this,function(){b.remove();a()}));c.refresh()},isFocusable:function(){return this.inherited(arguments)&&!this._mouseDown}})});