//>>built
define(["dojo/_base/declare","dojo/_base/lang","dojo/dom-style","dojo/dom-class","dojo/Stateful"],function(k,l,g,h,m){return k("dojox.calendar._RendererMixin",m,{item:null,owner:null,edited:!1,focused:!1,hovered:!1,selected:!1,storeState:!1,moveEnabled:!0,resizeEnabled:!0,_orientation:"vertical",_displayValue:"block",_displayValueMap:{},visibilityLimits:{resizeStartHandle:50,resizeEndHandle:-1,summaryLabel:15,startTimeLabel:45,endTimeLabel:50},_setSelectedAttr:function(a){this._setState("selected",
a,"Selected")},_setFocusedAttr:function(a){this._setState("focused",a,"Focused")},_setEditedAttr:function(a){this._setState("edited",a,"Edited")},_setHoveredAttr:function(a){this._setState("hovered",a,"Hovered")},_setStoreStateAttr:function(a){var b=null;switch(a){case "storing":b="Storing";break;case "unstored":b="Unstored";break;default:b=null}var d=this.stateNode||this.domNode;h.remove(d,"Storing");h.remove(d,"Unstored");this._set("storeState",a);null!=b&&h.add(d,b)},_setState:function(a,b,d){this[a]!=
b&&(h[b?"add":"remove"](this.stateNode||this.domNode,d),this._set(a,b))},_setItemAttr:function(a){null==a?(this.item&&this.item.cssClass&&h.remove(this.domNode,this.item.cssClass),this.item=null):(null!=this.item?(this.item.cssClass!=a.cssClass&&this.item.cssClass&&h.remove(this.domNode,this.item.cssClass),this.item=l.mixin(this.item,a)):this.item=a,a.cssClass&&h.add(this.domNode,a.cssClass))},_setText:function(a,b,d){this.owner&&this.owner._setText(a,b,d)},_isElementVisible:function(a,b,d,e){var c,
f=this.visibilityLimits[a];switch(a){case "moveHandle":c=this.moveEnabled;break;case "resizeStartHandle":c=this.mobile?this.resizeEnabled&&!b&&this.edited&&(-1==f||e>f):this.resizeEnabled&&!b&&(-1==f||e>f);break;case "resizeEndHandle":c=this.mobile?this.resizeEnabled&&!d&&this.edited&&(-1==f||e>f):this.resizeEnabled&&!d&&(-1==f||e>f);break;case "startTimeLabel":c=this.mobile?!b&&(!this.edited||this.edited&&(-1==f||e>f)):!b&&(-1==f||e>f);break;case "endTimeLabel":c=this.edited&&!d&&(-1==f||e>f);break;
case "summaryLabel":c=this.mobile?!this.edited||this.edited&&(-1==f||e>f):-1==f||e>f}return c},_formatTime:function(a,b){if(this.owner){var d=this.owner.get("formatItemTimeFunc");if(null!=d&&"function"===typeof d)return d(b,a,this.owner,this.item)}return a.dateLocaleModule.format(b,{selector:"time"})},getDisplayValue:function(a){return this._displayValue},updateRendering:function(a,b){b=b||this.item.h;a=a||this.item.w;if(b||a){this.item.h=b;this.item.w=a;a="vertical"==this._orientation?b:a;b=this.owner.renderData;
var d=0!=b.dateModule.compare(this.item.range[0],this.item.startTime),e=0!=b.dateModule.compare(this.item.range[1],this.item.endTime),c;null!=this.beforeIcon&&(c="horizontal"!=this._orientation||this.isLeftToRight()?d:e,g.set(this.beforeIcon,"display",c?this.getDisplayValue("beforeIcon"):"none"));null!=this.afterIcon&&(c="horizontal"!=this._orientation||this.isLeftToRight()?e:d,g.set(this.afterIcon,"display",c?this.getDisplayValue("afterIcon"):"none"));this.moveHandle&&(c=this._isElementVisible("moveHandle",
d,e,a),g.set(this.moveHandle,"display",c?this.getDisplayValue("moveHandle"):"none"));this.resizeStartHandle&&(c=this._isElementVisible("resizeStartHandle",d,e,a),g.set(this.resizeStartHandle,"display",c?this.getDisplayValue("resizeStartHandle"):"none"));this.resizeEndHandle&&(c=this._isElementVisible("resizeEndHandle",d,e,a),g.set(this.resizeEndHandle,"display",c?this.getDisplayValue("resizeEndHandle"):"none"));this.startTimeLabel&&(c=this._isElementVisible("startTimeLabel",d,e,a),g.set(this.startTimeLabel,
"display",c?this.getDisplayValue("startTimeLabel"):"none"),c&&this._setText(this.startTimeLabel,this._formatTime(b,this.item.startTime)));this.endTimeLabel&&(c=this._isElementVisible("endTimeLabel",d,e,a),g.set(this.endTimeLabel,"display",c?this.getDisplayValue("endTimeLabel"):"none"),c&&this._setText(this.endTimeLabel,this._formatTime(b,this.item.endTime)));this.summaryLabel&&(c=this._isElementVisible("summaryLabel",d,e,a),g.set(this.summaryLabel,"display",c?this.getDisplayValue("summaryLabel"):
"none"),c&&this._setText(this.summaryLabel,this.item.summary,!0))}}})});