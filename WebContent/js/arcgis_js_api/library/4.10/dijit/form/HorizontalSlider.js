//>>built
require({cache:{"url:dijit/form/templates/HorizontalSlider.html":'\x3ctable class\x3d"dijit dijitReset dijitSlider dijitSliderH" cellspacing\x3d"0" cellpadding\x3d"0" border\x3d"0" rules\x3d"none" data-dojo-attach-event\x3d"onkeydown:_onKeyDown, onkeyup:_onKeyUp"\r\n\trole\x3d"presentation"\r\n\t\x3e\x3ctr class\x3d"dijitReset"\r\n\t\t\x3e\x3ctd class\x3d"dijitReset" colspan\x3d"2"\x3e\x3c/td\r\n\t\t\x3e\x3ctd data-dojo-attach-point\x3d"topDecoration" class\x3d"dijitReset dijitSliderDecoration dijitSliderDecorationT dijitSliderDecorationH"\x3e\x3c/td\r\n\t\t\x3e\x3ctd class\x3d"dijitReset" colspan\x3d"2"\x3e\x3c/td\r\n\t\x3e\x3c/tr\r\n\t\x3e\x3ctr class\x3d"dijitReset"\r\n\t\t\x3e\x3ctd class\x3d"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH"\r\n\t\t\t\x3e\x3cdiv class\x3d"dijitSliderDecrementIconH" style\x3d"display:none" data-dojo-attach-point\x3d"decrementButton"\x3e\x3cspan class\x3d"dijitSliderButtonInner"\x3e-\x3c/span\x3e\x3c/div\r\n\t\t\x3e\x3c/td\r\n\t\t\x3e\x3ctd class\x3d"dijitReset"\r\n\t\t\t\x3e\x3cdiv class\x3d"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderLeftBumper" data-dojo-attach-event\x3d"press:_onClkDecBumper"\x3e\x3c/div\r\n\t\t\x3e\x3c/td\r\n\t\t\x3e\x3ctd class\x3d"dijitReset"\r\n\t\t\t\x3e\x3cinput data-dojo-attach-point\x3d"valueNode" type\x3d"hidden" ${!nameAttrSetting}\r\n\t\t\t/\x3e\x3cdiv class\x3d"dijitReset dijitSliderBarContainerH" role\x3d"presentation" data-dojo-attach-point\x3d"sliderBarContainer"\r\n\t\t\t\t\x3e\x3cdiv role\x3d"presentation" data-dojo-attach-point\x3d"progressBar" class\x3d"dijitSliderBar dijitSliderBarH dijitSliderProgressBar dijitSliderProgressBarH" data-dojo-attach-event\x3d"press:_onBarClick"\r\n\t\t\t\t\t\x3e\x3cdiv class\x3d"dijitSliderMoveable dijitSliderMoveableH"\r\n\t\t\t\t\t\t\x3e\x3cdiv data-dojo-attach-point\x3d"sliderHandle,focusNode" class\x3d"dijitSliderImageHandle dijitSliderImageHandleH" data-dojo-attach-event\x3d"press:_onHandleClick" role\x3d"slider"\x3e\x3c/div\r\n\t\t\t\t\t\x3e\x3c/div\r\n\t\t\t\t\x3e\x3c/div\r\n\t\t\t\t\x3e\x3cdiv role\x3d"presentation" data-dojo-attach-point\x3d"remainingBar" class\x3d"dijitSliderBar dijitSliderBarH dijitSliderRemainingBar dijitSliderRemainingBarH" data-dojo-attach-event\x3d"press:_onBarClick"\x3e\x3c/div\r\n\t\t\t\x3e\x3c/div\r\n\t\t\x3e\x3c/td\r\n\t\t\x3e\x3ctd class\x3d"dijitReset"\r\n\t\t\t\x3e\x3cdiv class\x3d"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderRightBumper" data-dojo-attach-event\x3d"press:_onClkIncBumper"\x3e\x3c/div\r\n\t\t\x3e\x3c/td\r\n\t\t\x3e\x3ctd class\x3d"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH"\r\n\t\t\t\x3e\x3cdiv class\x3d"dijitSliderIncrementIconH" style\x3d"display:none" data-dojo-attach-point\x3d"incrementButton"\x3e\x3cspan class\x3d"dijitSliderButtonInner"\x3e+\x3c/span\x3e\x3c/div\r\n\t\t\x3e\x3c/td\r\n\t\x3e\x3c/tr\r\n\t\x3e\x3ctr class\x3d"dijitReset"\r\n\t\t\x3e\x3ctd class\x3d"dijitReset" colspan\x3d"2"\x3e\x3c/td\r\n\t\t\x3e\x3ctd data-dojo-attach-point\x3d"containerNode,bottomDecoration" class\x3d"dijitReset dijitSliderDecoration dijitSliderDecorationB dijitSliderDecorationH"\x3e\x3c/td\r\n\t\t\x3e\x3ctd class\x3d"dijitReset" colspan\x3d"2"\x3e\x3c/td\r\n\t\x3e\x3c/tr\r\n\x3e\x3c/table\x3e\r\n'}});
define("dojo/_base/array dojo/_base/declare dojo/dnd/move dojo/_base/fx dojo/dom-geometry dojo/dom-style dojo/keys dojo/_base/lang dojo/sniff dojo/dnd/Moveable dojo/dnd/Mover dojo/query dojo/mouse dojo/on ../_base/manager ../focus ../typematic ./Button ./_FormValueWidget ../_Container dojo/text!./templates/HorizontalSlider.html".split(" "),function(q,f,e,r,g,t,b,h,u,v,l,w,x,y,z,m,n,D,A,B,C){var p=f("dijit.form._SliderMover",l,{onMouseMove:function(a){var c=this.widget,d=c._abspos;d||(d=c._abspos=
g.position(c.sliderBarContainer,!0),c._setPixelValue_=h.hitch(c,"_setPixelValue"),c._isReversed_=c._isReversed());a=a[c._mousePixelCoord]-d[c._startingPixelCoord];c._setPixelValue_(c._isReversed_?d[c._pixelCount]-a:a,d[c._pixelCount],!1)},destroy:function(a){l.prototype.destroy.apply(this,arguments);var c=this.widget;c._abspos=null;c._setValueAttr(c.value,!0)}});e=f("dijit.form.HorizontalSlider",[A,B],{templateString:C,value:0,showButtons:!0,minimum:0,maximum:100,discreteValues:Infinity,pageIncrement:2,
clickSelect:!0,slideDuration:z.defaultDuration,_setIdAttr:"",_setNameAttr:"valueNode",baseClass:"dijitSlider",cssStateNodes:{incrementButton:"dijitSliderIncrementButton",decrementButton:"dijitSliderDecrementButton",focusNode:"dijitSliderThumb"},_mousePixelCoord:"pageX",_pixelCount:"w",_startingPixelCoord:"x",_handleOffsetCoord:"left",_progressPixelSize:"width",_onKeyUp:function(a){this.disabled||this.readOnly||a.altKey||a.ctrlKey||a.metaKey||this._setValueAttr(this.value,!0)},_onKeyDown:function(a){if(!(this.disabled||
this.readOnly||a.altKey||a.ctrlKey||a.metaKey)){switch(a.keyCode){case b.HOME:this._setValueAttr(this.minimum,!1);break;case b.END:this._setValueAttr(this.maximum,!1);break;case this._descending||this.isLeftToRight()?b.RIGHT_ARROW:b.LEFT_ARROW:case !1===this._descending?b.DOWN_ARROW:b.UP_ARROW:case !1===this._descending?b.PAGE_DOWN:b.PAGE_UP:this.increment(a);break;case this._descending||this.isLeftToRight()?b.LEFT_ARROW:b.RIGHT_ARROW:case !1===this._descending?b.UP_ARROW:b.DOWN_ARROW:case !1===this._descending?
b.PAGE_UP:b.PAGE_DOWN:this.decrement(a);break;default:return}a.stopPropagation();a.preventDefault()}},_onHandleClick:function(a){this.disabled||this.readOnly||(u("ie")||m.focus(this.sliderHandle),a.stopPropagation(),a.preventDefault())},_isReversed:function(){return!this.isLeftToRight()},_onBarClick:function(a){if(!this.disabled&&!this.readOnly&&this.clickSelect){m.focus(this.sliderHandle);a.stopPropagation();a.preventDefault();var c=g.position(this.sliderBarContainer,!0),d=a[this._mousePixelCoord]-
c[this._startingPixelCoord];this._setPixelValue(this._isReversed()?c[this._pixelCount]-d:d,c[this._pixelCount],!0);this._movable.onMouseDown(a)}},_setPixelValue:function(a,c,d){if(!this.disabled&&!this.readOnly){var b=this.discreteValues;if(1>=b||Infinity==b)b=c;b--;this._setValueAttr(Math.max(Math.min((this.maximum-this.minimum)*Math.round(a/(c/b))/b+this.minimum,this.maximum),this.minimum),d)}},_setValueAttr:function(a,c){this._set("value",a);this.valueNode.value=a;this.focusNode.setAttribute("aria-valuenow",
a);this.inherited(arguments);var d=this.maximum>this.minimum?(a-this.minimum)/(this.maximum-this.minimum):0,b=!1===this._descending?this.remainingBar:this.progressBar,f=!1===this._descending?this.progressBar:this.remainingBar;this._inProgressAnim&&"stopped"!=this._inProgressAnim.status&&this._inProgressAnim.stop(!0);if(c&&0<this.slideDuration&&b.style[this._progressPixelSize]){var e=this,g={},h=parseFloat(b.style[this._progressPixelSize]),k=this.slideDuration*(d-h/100);0!=k&&(0>k&&(k=0-k),g[this._progressPixelSize]=
{start:h,end:100*d,units:"%"},this._inProgressAnim=r.animateProperty({node:b,duration:k,onAnimate:function(a){f.style[e._progressPixelSize]=100-parseFloat(a[e._progressPixelSize])+"%"},onEnd:function(){delete e._inProgressAnim},properties:g}),this._inProgressAnim.play())}else b.style[this._progressPixelSize]=100*d+"%",f.style[this._progressPixelSize]=100*(1-d)+"%"},_bumpValue:function(a,c){if(!(this.disabled||this.readOnly||this.maximum<=this.minimum)){var b=t.getComputedStyle(this.sliderBarContainer),
e=g.getContentBox(this.sliderBarContainer,b),b=this.discreteValues;if(1>=b||Infinity==b)b=e[this._pixelCount];b--;a=Math.round((this.value-this.minimum)*b/(this.maximum-this.minimum))+a;0>a&&(a=0);a>b&&(a=b);a=a*(this.maximum-this.minimum)/b+this.minimum;this._setValueAttr(a,c)}},_onClkBumper:function(a){this.disabled||this.readOnly||!this.clickSelect||this._setValueAttr(a,!0)},_onClkIncBumper:function(){this._onClkBumper(!1===this._descending?this.minimum:this.maximum)},_onClkDecBumper:function(){this._onClkBumper(!1===
this._descending?this.maximum:this.minimum)},decrement:function(a){this._bumpValue(a.keyCode==b.PAGE_DOWN?-this.pageIncrement:-1)},increment:function(a){this._bumpValue(a.keyCode==b.PAGE_UP?this.pageIncrement:1)},_mouseWheeled:function(a){this.focused&&(a.stopPropagation(),a.preventDefault(),this._bumpValue(0>a.wheelDelta?-1:1,!0))},startup:function(){this._started||(q.forEach(this.getChildren(),function(a){this[a.container]!=this.containerNode&&this[a.container].appendChild(a.domNode)},this),this.inherited(arguments))},
_typematicCallback:function(a,b,d){if(-1==a)this._setValueAttr(this.value,!0);else this[b==(this._descending?this.incrementButton:this.decrementButton)?"decrement":"increment"](d)},buildRendering:function(){this.inherited(arguments);this.showButtons&&(this.incrementButton.style.display="",this.decrementButton.style.display="");var a=w('label[for\x3d"'+this.id+'"]');a.length&&(a[0].id||(a[0].id=this.id+"_label"),this.focusNode.setAttribute("aria-labelledby",a[0].id));this.focusNode.setAttribute("aria-valuemin",
this.minimum);this.focusNode.setAttribute("aria-valuemax",this.maximum)},postCreate:function(){this.inherited(arguments);this.showButtons&&this.own(n.addMouseListener(this.decrementButton,this,"_typematicCallback",25,500),n.addMouseListener(this.incrementButton,this,"_typematicCallback",25,500));this.own(y(this.domNode,x.wheel,h.hitch(this,"_mouseWheeled")));var a=f(p,{widget:this});this._movable=new v(this.sliderHandle,{mover:a});this._layoutHackIE7()},destroy:function(){this._movable.destroy();
this._inProgressAnim&&"stopped"!=this._inProgressAnim.status&&this._inProgressAnim.stop(!0);this.inherited(arguments)}});e._Mover=p;return e});