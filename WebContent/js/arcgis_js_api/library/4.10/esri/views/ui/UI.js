// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/assignHelper ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper dojo/dom-class dojo/dom-construct dojo/dom-style ../../core/Accessor ../../core/domUtils ../../core/Evented ../../core/Handles ../../core/watchUtils ../../core/accessorSupport/decorators ./Component".split(" "),function(A,B,p,t,g,u,h,m,v,w,x,y,q,f,k){function n(e){return"object"!==typeof e||e&&e.isInstanceOf&&e.isInstanceOf(k)||!("component"in e||"index"in e||"position"in
e)?null:e}var z={left:0,top:0,bottom:0,right:0},r={bottom:30,top:15,right:15,left:15};return function(e){function b(){var a=e.call(this)||this;a._cornerNameToContainerLookup={};a._positionNameToContainerLookup={};a._components=[];a._handles=new y;a._componentToKey=new Map;a.view=null;a._initContainers();return a}t(b,e);b.prototype.initialize=function(){this._handles.add([q.init(this,"view.padding, container",this._applyViewPadding.bind(this)),q.init(this,"padding",this._applyUIPadding.bind(this))])};
b.prototype.destroy=function(){this.container=null;this._components.forEach(function(a){a.destroy()});this._components.length=0;this._handles.destroy();this._componentToKey.clear();this._componentToKey=null};Object.defineProperty(b.prototype,"container",{set:function(a){var c=this._get("container");a!==c&&(a&&(a.classList.add("esri-ui"),this._attachContainers(a)),c&&(c.classList.remove("esri-ui"),m.set(c,{top:"",bottom:"",left:"",right:""}),w.orphan(c)),this._set("container",a))},enumerable:!0,configurable:!0});
Object.defineProperty(b.prototype,"height",{get:function(){var a=this.get("view.height")||0;if(0===a)return a;var c=this._getViewPadding();return Math.max(a-(c.top+c.bottom),0)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"padding",{get:function(){return this._get("padding")},set:function(a){a?this._override("padding",a):this._clearOverride("padding")},enumerable:!0,configurable:!0});b.prototype.castPadding=function(a){return"number"===typeof a?{bottom:a,top:a,right:a,left:a}:
p({},r,a)};Object.defineProperty(b.prototype,"width",{get:function(){var a=this.get("view.width")||0;if(0===a)return a;var c=this._getViewPadding();return Math.max(a-(c.left+c.right),0)},enumerable:!0,configurable:!0});b.prototype.add=function(a,c){var b=this,d,l;if(Array.isArray(a))a.forEach(function(a){return b.add(a,c)});else{var e=n(a);e&&(d=e.index,c=e.position,a=e.component,l=e.key);c&&"object"===typeof c&&(d=c.index,l=c.key,c=c.position);!a||c&&!this._isValidPosition(c)||(a&&a.isInstanceOf&&
a.isInstanceOf(k)||(a=new k({node:a})),this._place({component:a,position:c,index:d}),this._components.push(a),l&&this._componentToKey.set(a,l))}};b.prototype.remove=function(a,c){var b=this;if(a){if(Array.isArray(a))return a.map(function(a){return b.remove(a,c)});var d=this.find(a);if(d){var e=this._componentToKey;if(!e.has(a)||e.get(a)===c)return e=this._components.indexOf(d),d.node.parentNode&&d.node.parentNode.removeChild(d.node),this._componentToKey.delete(a),this._components.splice(e,1)[0]}}};
b.prototype.empty=function(a){var c=this;if(Array.isArray(a))return a.map(function(a){return c.empty(a)}).reduce(function(a,c){return a.concat(c)});a=a||"manual";if("manual"===a)return Array.prototype.slice.call(this._manualContainer.children).filter(function(a){return!u.contains(a,"esri-ui-corner")}).map(function(a){return c.remove(a)});if(this._isValidPosition(a))return Array.prototype.slice.call(this._cornerNameToContainerLookup[a].children).map(this.remove,this)};b.prototype.move=function(a,c){var b=
this;Array.isArray(a)&&a.forEach(function(a){return b.move(a,c)});if(a){var d,e=n(a)||n(c);e&&(d=e.index,c=e.position,a=e.component||a);(!c||this._isValidPosition(c))&&(a=this.remove(a))&&this.add(a,{position:c,index:d})}};b.prototype.find=function(a){return a?a&&a.isInstanceOf&&a.isInstanceOf(k)?this._findByComponent(a):"string"===typeof a?this._findById(a):this._findByNode(a.domNode||a):null};b.prototype._getViewPadding=function(){return this.get("view.padding")||z};b.prototype._attachContainers=
function(a){a.appendChild(this._manualContainer);a.appendChild(this._innerContainer)};b.prototype._initContainers=function(){var a=h.create("div",{className:"esri-ui-inner-container esri-ui-corner-container"}),c=h.create("div",{className:"esri-ui-inner-container esri-ui-manual-container"}),b=h.create("div",{className:"esri-ui-top-left esri-ui-corner"},a),d=h.create("div",{className:"esri-ui-top-right esri-ui-corner"},a),e=h.create("div",{className:"esri-ui-bottom-left esri-ui-corner"},a),f=h.create("div",
{className:"esri-ui-bottom-right esri-ui-corner"},a);this._innerContainer=a;this._manualContainer=c;this._cornerNameToContainerLookup={"top-left":b,"top-right":d,"bottom-left":e,"bottom-right":f};this._positionNameToContainerLookup=p({manual:c},this._cornerNameToContainerLookup)};b.prototype._isValidPosition=function(a){return!!this._positionNameToContainerLookup[a]};b.prototype._place=function(a){var c=a.component,b=a.index;a=this._positionNameToContainerLookup[a.position||"manual"];var d;-1<b?(d=
Array.prototype.slice.call(a.children),0===b?this._placeComponent(c,a,"first"):b>=d.length?this._placeComponent(c,a,"last"):this._placeComponent(c,d[b],"before")):this._placeComponent(c,a,"last")};b.prototype._placeComponent=function(a,c,b){var d=a.widget;d&&!d._started&&"function"===typeof d.postMixInProperties&&"function"===typeof d.buildRendering&&"function"===typeof d.postCreate&&"function"===typeof d.startup&&a.widget.startup();h.place(a.node,c,b)};b.prototype._applyViewPadding=function(){var a=
this.container;a&&m.set(a,this._toPxPosition(this._getViewPadding()))};b.prototype._applyUIPadding=function(){this._innerContainer&&m.set(this._innerContainer,this._toPxPosition(this.padding))};b.prototype._toPxPosition=function(a){return{top:this._toPxUnit(a.top),left:this._toPxUnit(a.left),right:this._toPxUnit(a.right),bottom:this._toPxUnit(a.bottom)}};b.prototype._toPxUnit=function(a){return 0===a?0:a+"px"};b.prototype._findByComponent=function(a){var c=null,b;this._components.some(function(d){(b=
d===a)&&(c=d);return b});return c};b.prototype._findById=function(a){var c=null,b;this._components.some(function(d){(b=d.id===a)&&(c=d);return b});return c};b.prototype._findByNode=function(a){var c=null,b;this._components.some(function(d){(b=d.node===a)&&(c=d);return b});return c};g([f.property()],b.prototype,"container",null);g([f.property({dependsOn:["view.height"]})],b.prototype,"height",null);g([f.property({value:r})],b.prototype,"padding",null);g([f.cast("padding")],b.prototype,"castPadding",
null);g([f.property()],b.prototype,"view",void 0);g([f.property({dependsOn:["view.width"]})],b.prototype,"width",null);return b=g([f.subclass("esri.views.ui.UI")],b)}(f.declared(v,x))});