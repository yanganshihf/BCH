//>>built
define("dojo/_base/kernel dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/array dojo/dom-class dojo/dnd/common dojo/dnd/Selector dojo/dnd/Manager".split(" "),function(m,g,e,c,h,d,k,l,f){var b=g("dojox.mdnd.PureSource",l,{horizontal:!1,copyOnly:!0,skipForm:!1,withHandles:!1,isSource:!0,targetState:"Disabled",generateText:!0,constructor:function(a,b){e.mixin(this,e.mixin({},b));this.mouseDown=this.isDragging=!1;this.sourceState="";d.add(this.node,"dojoDndSource");this.horizontal&&d.add(this.node,
"dojoDndHorizontal");this.topics=[c.subscribe("/dnd/cancel",this,"onDndCancel"),c.subscribe("/dnd/drop",this,"onDndCancel")]},onDndCancel:function(){this.mouseDown=this.isDragging=!1;delete this.mouseButton},copyState:function(a){return this.copyOnly||a},destroy:function(){b.superclass.destroy.call(this);h.forEach(this.topics,c.unsubscribe);this.targetAnchor=null},markupFactory:function(a,c){a._skipStartup=!0;return new b(c,a)},onMouseMove:function(a){if(!this.isDragging){b.superclass.onMouseMove.call(this,
a);var d=f.manager();if(this.mouseDown&&!this.isDragging&&this.isSource){var e=this.getSelectedNodes();e.length&&(d.startDrag(this,e,this.copyState(c.isCopyKey(a))),this.isDragging=!0)}}},onMouseDown:function(a){!this._legalMouseDown(a)||this.skipForm&&k.isFormElement(a)||(this.mouseDown=!0,this.mouseButton=a.button,b.superclass.onMouseDown.call(this,a))},onMouseUp:function(a){this.mouseDown&&(this.mouseDown=!1,b.superclass.onMouseUp.call(this,a))},onOverEvent:function(){b.superclass.onOverEvent.call(this);
f.manager().overSource(this)},onOutEvent:function(){b.superclass.onOutEvent.call(this);f.manager().outSource(this)},_markDndStatus:function(a){this._changeState("Source",a?"Copied":"Moved")},_legalMouseDown:function(a){if(!this.withHandles)return!0;for(a=a.target;a&&!d.contains(a,"dojoDndItem");a=a.parentNode)if(d.contains(a,"dojoDndHandle"))return!0;return!1}});return b});