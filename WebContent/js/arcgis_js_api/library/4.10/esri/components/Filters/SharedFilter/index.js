// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["../../Component","../../Dropdowns/AccordionDropdown/index","../../Buttons/Toggle","dojo/i18n!../../Filters/SharedFilter/nls/resources"],function(g,h,l,m){return function(e){function b(a){if(d[a])return d[a].exports;var c=d[a]={i:a,l:!1,exports:{}};return e[a].call(c.exports,c,c.exports,b),c.l=!0,c.exports}var d={};return b.m=e,b.c=d,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{enumerable:!0,get:d})},b.r=function(a){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,
Symbol.toStringTag,{value:"Module"});Object.defineProperty(a,"__esModule",{value:!0})},b.t=function(a,c){if((1&c&&(a=b(a)),8&c)||4&c&&"object"==typeof a&&a&&a.__esModule)return a;var d=Object.create(null);if(b.r(d),Object.defineProperty(d,"default",{enumerable:!0,value:a}),2&c&&"string"!=typeof a)for(var e in a)b.d(d,e,function(c){return a[c]}.bind(null,e));return d},b.n=function(a){var c=a&&a.__esModule?function(){return a.default}:function(){return a};return b.d(c,"a",c),c},b.o=function(a,c){return Object.prototype.hasOwnProperty.call(a,
c)},b.p="",b(b.s=282)}({0:function(e,b,d){function a(a,b){function d(){this.constructor=a}c(a,b);a.prototype=null===b?Object.create(b):(d.prototype=b.prototype,new d)}d.d(b,"b",function(){return a});d.d(b,"a",function(){return f});var c=function(a,b){return(c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])})(a,b)},f=function(){return(f=Object.assign||function(a){for(var b,c=1,d=arguments.length;c<d;c++)for(var k in b=
arguments[c])Object.prototype.hasOwnProperty.call(b,k)&&(a[k]=b[k]);return a}).apply(this,arguments)}},11:function(e,b){e.exports=h},19:function(e,b){e.exports=l},282:function(e,b,d){d.r(b);var a=d(0),c=d(60);e=d(5);var f=d(11),g=d.n(f),f=d(19),h=d.n(f);d=function(b){function d(a){a=b.call(this,a)||this;return a.state={options:[{value:"public",displayName:c.options.public},{value:"org",displayName:c.options.org},{value:"shared",displayName:c.options.shared},{value:"private",displayName:c.options.private}]},
a.mapOptionsToToggles=a.mapOptionsToToggles.bind(a),a.handleToggleClick=a.handleToggleClick.bind(a),a.handleClearFilter=a.handleClearFilter.bind(a),a}return a.b(d,b),d.prototype.render=function(a){return a(g.a,{key:"shared-accordion",title:c.shared,clearable:!!this.props.sharedFilter,onClear:this.handleClearFilter},a("ul",{id:"shared-accordion-tree",class:"ftr-shared__tree",role:"tree","aria-label":c.shared},this.mapOptionsToToggles(a)))},d.prototype.mapOptionsToToggles=function(a){var b=this,c=this.state.options;
return this.props.hideOrgGroupFilters&&(c=[this.state.options[0],this.state.options[3]]),c.map(function(c){return a(h.a,{count:b.props.counts[c.value],key:c.value,name:c.displayName,value:c.value,selectedToggle:b.props.sharedFilter?b.props.sharedFilter.value:void 0,childOptions:c.childOptions,onToggleClick:b.handleToggleClick})})},d.prototype.handleToggleClick=function(a,b){var c=this.props.sharedFilter;c&&c.value===a?this.props.onSharedSelect():this.props.onSharedSelect({value:a,text:b})},d.prototype.handleClearFilter=
function(){this.props.onSharedSelect()},d}(e.Component);b.default=d},5:function(e,b){e.exports=g},60:function(e,b){e.exports=m}})});