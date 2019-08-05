// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["../Component","../ItemBrowser/index"],function(h,l){return function(e){function a(b){if(c[b])return c[b].exports;var d=c[b]={i:b,l:!1,exports:{}};return e[b].call(d.exports,d,d.exports,a),d.l=!0,d.exports}var c={};return a.m=e,a.c=c,a.d=function(b,d,c){a.o(b,d)||Object.defineProperty(b,d,{enumerable:!0,get:c})},a.r=function(b){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(b,Symbol.toStringTag,{value:"Module"});Object.defineProperty(b,"__esModule",{value:!0})},a.t=
function(b,d){if((1&d&&(b=a(b)),8&d)||4&d&&"object"==typeof b&&b&&b.__esModule)return b;var c=Object.create(null);if(a.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:b}),2&d&&"string"!=typeof b)for(var f in b)a.d(c,f,function(d){return b[d]}.bind(null,f));return c},a.n=function(b){var d=b&&b.__esModule?function(){return b.default}:function(){return b};return a.d(d,"a",d),d},a.o=function(b,d){return Object.prototype.hasOwnProperty.call(b,d)},a.p="",a(a.s=302)}({0:function(e,a,c){function b(b,
a){function c(){this.constructor=b}d(b,a);b.prototype=null===a?Object.create(a):(c.prototype=a.prototype,new c)}c.d(a,"b",function(){return b});c.d(a,"a",function(){return g});var d=function(b,a){return(d=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(b,a){b.__proto__=a}||function(b,a){for(var d in a)a.hasOwnProperty(d)&&(b[d]=a[d])})(b,a)},g=function(){return(g=Object.assign||function(b){for(var a,d=1,c=arguments.length;d<c;d++)for(var k in a=arguments[d])Object.prototype.hasOwnProperty.call(a,
k)&&(b[k]=a[k]);return b}).apply(this,arguments)}},1:function(e,a){e.exports=h},302:function(e,a,c){c.r(a);c.d(a,"ItemBrowserWrapper",function(){return h});var b=c(0),d=c(33),g=c.n(d),f=c(1);c.d(a,"changeSearchSection",function(){return d.changeSearchSection});c.d(a,"initialState",function(){return d.initialState});c.d(a,"search",function(){return d.search});c.d(a,"updateExtent",function(){return d.updateExtent});var h=function(){function a(a,c){this.options=c;this.listener=this.listener.bind(this);
this.renderContainer=document.createElement("div");this.renderContainer.style.width="100%";this.renderContainer.style.height="100%";this.renderContainer.id="item-browser-wrapper";a.appendChild(this.renderContainer);a=c.initialState?c.initialState:d.initialState;this.initialState=b.a({},a,{settings:{config:a.settings.config,utils:{request:4===c.apiVersion?c.request:this.shimmedRequest.bind(this),portal:4===c.apiVersion?c.portal:b.a({},c.portal,{restUrl:c.portal.portalUrl.slice(0,-1),credential:c.portal.user&&
c.portal.user.credential?c.portal.user.credential:void 0}),iconDir:4===c.apiVersion?window.require.toUrl("esri/images/portal"):window.require.toUrl("esri/css/images/item_type_icons")}}});this.store=Object(f.applyMiddleware)(f.thunk,Object(f.addListener)(this.listener))(f.createStore)(d.reducers,this.initialState);this.projector=Object(f.createProjector)(this.store,function(a){return a(g.a,{key:"ib"})},this.renderContainer);this.store.dispatch(Object(d.search)(!0))}return a.prototype.shimmedRequest=
function(a,c){var d=b.a({},c.query);return this.options.portal.user&&this.options.portal.user.credential&&-1<a.indexOf(this.options.portal.restUrl)&&(d.token=this.options.portal.user.credential.token),this.options.request({url:a,content:c.query},{usePost:"post"===c.method}).then(function(a){return{data:a}})},a.prototype.dispatch=function(a){this.store&&this.store.dispatch(a)},a.prototype.getState=function(){return this.store?this.store.getState():this.initialState},a.prototype.listener=function(a,
b){this.options.listener&&this.options.listener(a,b)},a}()},33:function(e,a){e.exports=l}})});