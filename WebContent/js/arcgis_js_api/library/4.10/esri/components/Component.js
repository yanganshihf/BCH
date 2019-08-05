// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(function(){return function(x){function a(e){if(b[e])return b[e].exports;var h=b[e]={i:e,l:!1,exports:{}};return x[e].call(h.exports,h,h.exports,a),h.l=!0,h.exports}var b={};return a.m=x,a.c=b,a.d=function(e,h,b){a.o(e,h)||Object.defineProperty(e,h,{enumerable:!0,get:b})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,h){if((1&h&&(e=a(e)),8&h)||4&h&&
"object"==typeof e&&e&&e.__esModule)return e;var b=Object.create(null);if(a.r(b),Object.defineProperty(b,"default",{enumerable:!0,value:e}),2&h&&"string"!=typeof e)for(var w in e)a.d(b,w,function(a){return e[a]}.bind(null,w));return b},a.n=function(e){var b=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(b,"a",b),b},a.o=function(b,a){return Object.prototype.hasOwnProperty.call(b,a)},a.p="",a(a.s=249)}({0:function(x,a,b){function e(b,a){function e(){this.constructor=b}
h(b,a);b.prototype=null===a?Object.create(a):(e.prototype=a.prototype,new e)}b.d(a,"b",function(){return e});b.d(a,"a",function(){return z});var h=function(b,a){return(h=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(b,a){b.__proto__=a}||function(b,a){for(var e in a)a.hasOwnProperty(e)&&(b[e]=a[e])})(b,a)},z=function(){return(z=Object.assign||function(a){for(var b,e=1,h=arguments.length;e<h;e++)for(var t in b=arguments[e])Object.prototype.hasOwnProperty.call(b,t)&&(a[t]=b[t]);return a}).apply(this,
arguments)}},113:function(x,a,b){!function(a){var b,e=[],w=function(d,c){var l={};return Object.keys(d).forEach(function(c){l[c]=d[c]}),c&&Object.keys(c).forEach(function(d){l[d]=c[d]}),l},x=function(d,c){return d.vnodeSelector===c.vnodeSelector&&(d.properties&&c.properties?d.properties.key===c.properties.key&&d.properties.bind===c.properties.bind:!d.properties&&!c.properties)},A=function(d){if("string"!=typeof d)throw Error("Style values must be strings");},y=function(d,c,l,a){var b=d[c];if(""!==
b.vnodeSelector){var g=b.properties;if(!(g&&(void 0===g.key?g.bind:g.key)))for(g=0;g<d.length;g++)if(g!==c&&x(d[g],b))throw Error(l.vnodeSelector+" had a "+b.vnodeSelector+" child "+("added"===a?a:"removed")+", but there is now more than one. You must add unique key properties to make them distinguishable.");}},t=[],B=!1,F=function(d){(d.children||[]).forEach(F);d.properties&&d.properties.afterRemoved&&d.properties.afterRemoved.apply(d.properties.bind||d.properties,[d.domNode])},C=function(){B=!1;
t.forEach(F);t.length=0},D=function(d){t.push(d);B||(B=!0,"undefined"!=typeof window&&"requestIdleCallback"in window?window.requestIdleCallback(C,{timeout:16}):setTimeout(C,16))},E=function(d){var c=d.domNode;if(d.properties){var l=d.properties.exitAnimation;if(l)return c.style.pointerEvents="none",void l(c,function(){c.parentNode&&(c.parentNode.removeChild(c),D(d))},d.properties)}c.parentNode&&(c.parentNode.removeChild(c),D(d))},G=function(d,c,l){!function(c,d,l){if(d)for(var a=0;a<d.length;a++)r(d[a],
c,void 0,l)}(d,c.children,l);c.text&&(d.textContent=c.text);(function(c,d,l){if(d)for(var a=l.eventHandlerInterceptor,b=Object.keys(d),g=b.length,e=function(m){m=b[m];var g=d[m];if("className"===m)throw Error('Property "className" is not supported, use "class".');if("class"===m)p(c,g,!0);else if("classes"===m){var e=Object.keys(g),k=e.length;for(m=0;m<k;m++){var v=e[m];g[v]&&c.classList.add(v)}}else if("styles"===m)for(e=Object.keys(g),k=e.length,m=0;m<k;m++){var v=e[m],q=g[v];q&&(A(q),l.styleApplyer(c,
v,q))}else"key"!==m&&null!==g&&void 0!==g&&(e=typeof g,"function"===e?0===m.lastIndexOf("on",0)&&(a&&(g=a(m,g,c,d)),"oninput"===m&&function(){var c=g;g=function(d){c.apply(this,[d]);d.target["oninput-value"]=d.target.value}}(),c[m]=g):"http://www.w3.org/2000/svg"===l.namespace?"href"===m?c.setAttributeNS("http://www.w3.org/1999/xlink",m,g):c.setAttribute(m,g):"string"===e&&"value"!==m&&"innerHTML"!==m?c.setAttribute(m,g):c[m]=g)},k=0;k<g;k++)e(k)})(d,c.properties,l);c.properties&&c.properties.afterCreate&&
c.properties.afterCreate.apply(c.properties.bind||c.properties,[d,l,c.vnodeSelector,c.properties,c.children])},r=function(d,c,l,a){var b,g=0,e=d.vnodeSelector,k=c.ownerDocument;if(""===e)b=d.domNode=k.createTextNode(d.text),void 0!==l?c.insertBefore(b,l):c.appendChild(b);else{for(var p=0;p<=e.length;++p){var q=e.charAt(p);if(p===e.length||"."===q||"#"===q)q=e.charAt(g-1),g=e.slice(g,p),"."===q?b.classList.add(g):"#"===q?b.id=g:("svg"===g&&(a=w(a,{namespace:"http://www.w3.org/2000/svg"})),void 0!==
a.namespace?b=d.domNode=k.createElementNS(a.namespace,g):(b=d.domNode=d.domNode||k.createElement(g),"input"===g&&d.properties&&void 0!==d.properties.type&&b.setAttribute("type",d.properties.type)),void 0!==l?c.insertBefore(b,l):b.parentNode!==c&&c.appendChild(b)),g=p+1}G(b,d,a)}},p=function(d,c,b){c&&c.split(" ").forEach(function(c){return d.classList.toggle(c,b)})};b=function(d,c,l){var a=d.domNode,k=!1;if(d===c)return!1;var g=!1;if(""===c.vnodeSelector){if(c.text!==d.text)return d=a.ownerDocument.createTextNode(c.text),
a.parentNode.replaceChild(d,a),c.domNode=d,k=!0;c.domNode=a}else 0===c.vnodeSelector.lastIndexOf("svg",0)&&(l=w(l,{namespace:"http://www.w3.org/2000/svg"})),d.text!==c.text&&(g=!0,void 0===c.text?a.removeChild(a.firstChild):a.textContent=c.text),c.domNode=a,g=function(c,d,a,l,g){if(a===l)return!1;a=a||e;l=l||e;for(var m,k=a.length,p=l.length,n=m=0,v=!1;n<p;){var f=m<k?a[m]:void 0,q=l[n];if(void 0!==f&&x(f,q))v=b(f,q,g)||v,m++;else{a:{var f=a,u=q;if(""!==u.vnodeSelector)for(var h=m+1;h<f.length;h++)if(x(f[h],
u)){f=h;break a}f=-1}if(0<=f){for(;m<f;m++)E(a[m]),y(a,m,c,"removed");v=b(a[f],q,g)||v;m=f+1}else r(q,d,m<k?a[m].domNode:void 0,g),q.properties&&(f=q.properties.enterAnimation)&&f(q.domNode,q.properties),y(l,n,c,"added")}n++}if(k>m)for(;m<k;m++)E(a[m]),y(a,m,c,"removed");return v}(c,a,d.children,c.children,l)||g,g=function(c,d,a,l){if(a){for(var b=!1,g=Object.keys(a),e=g.length,k=0;k<e;k++){var f=g[k],n=a[f],q=d[f];if("class"===f)q!==n&&(p(c,q,!1),p(c,n,!0));else if("classes"===f)for(var v=c.classList,
r=Object.keys(n),u=r.length,f=0;f<u;f++){var h=r[f],t=!!n[h];t!==!!q[h]&&(b=!0,t?v.add(h):v.remove(h))}else if("styles"===f)for(v=Object.keys(n),r=v.length,f=0;f<r;f++)u=v[f],h=n[u],h!==q[u]&&(b=!0,h?(A(h),l.styleApplyer(c,u,h)):l.styleApplyer(c,u,""));else(n||"string"!=typeof q||(n=""),"value"===f)?(v=c[f],v!==n&&(c["oninput-value"]?v===c["oninput-value"]:n!==q)&&(c[f]=n,c["oninput-value"]=void 0),n!==q&&(b=!0)):n!==q&&(q=typeof n,"function"===q&&l.eventHandlerInterceptor||("http://www.w3.org/2000/svg"===
l.namespace?"href"===f?c.setAttributeNS("http://www.w3.org/1999/xlink",f,n):c.setAttribute(f,n):"string"===q&&"innerHTML"!==f?"role"===f&&""===n?c.removeAttribute(f):c.setAttribute(f,n):c[f]!==n&&(c[f]=n),b=!0))}return b}}(a,d.properties,c.properties,l)||g,c.properties&&c.properties.afterUpdate&&c.properties.afterUpdate.apply(c.properties.bind||c.properties,[a,l,c.vnodeSelector,c.properties,c.children]);return g&&c.properties&&c.properties.updateAnimation&&c.properties.updateAnimation(a,c.properties,
d.properties),k};var f,u=function(d,c){return{getLastRender:function(){return d},update:function(a){if(d.vnodeSelector!==a.vnodeSelector)throw Error("The selector for the root VNode may not be changed. (consider using dom.merge and add one extra level to the virtual DOM)");var l=d;d=a;b(l,a,c)},domNode:d.domNode}},k={namespace:void 0,performanceLogger:function(){},eventHandlerInterceptor:void 0,styleApplyer:function(d,c,a){d.style[c]=a}},n={create:function(d,c){return c=w(k,c),r(d,document.createElement("div"),
void 0,c),u(d,c)},append:function(d,c,a){return a=w(k,a),r(c,d,void 0,a),u(c,a)},insertBefore:function(a,c,b){return b=w(k,b),r(c,a.parentNode,a,b),u(c,b)},merge:function(a,c,b){return b=w(k,b),c.domNode=a,G(a,c,b),u(c,b)},replace:function(a,c,b){return b=w(k,b),r(c,a.parentNode,a,b),a.parentNode.removeChild(a),u(c,b)}},I=function(a,c,b){for(var d=0,f=c.length;d<f;d++){var g=c[d];Array.isArray(g)?I(a,g,b):null!==g&&void 0!==g&&!1!==g&&("string"==typeof g&&(g={vnodeSelector:"",properties:void 0,children:void 0,
text:g.toString(),domNode:null}),b.push(g))}};f=Array.prototype.find?function(a,c){return a.find(c)}:function(a,c){return a.filter(c)[0]};var J=function(a,c,b){var d=function(d){b("domEvent",d);var g=c(),e=function(c,a){for(var d=[];c!==a;)d.push(c),c=c.parentNode;return d}(d.currentTarget,g.domNode);e.reverse();var k,g=function(c,a){var d=c;return a.forEach(function(c){d=d&&d.children?f(d.children,function(a){return a.domNode===c}):void 0}),d}(g.getLastRender(),e);return a.scheduleRender(),g&&(k=
g.properties["on"+d.type].apply(g.properties.bind||this,arguments)),b("domEventProcessed",d),k};return function(c,a,b,f){return d}};a.dom=n;a.h=function(a,c,b){if(Array.isArray(c))b=c,c=void 0;else if(c&&("string"==typeof c||c.hasOwnProperty("vnodeSelector"))||b&&("string"==typeof b||b.hasOwnProperty("vnodeSelector")))throw Error("h called with invalid arguments");var d,f;return void 0!==b&&1===b.length&&"string"==typeof b[0]?d=b[0]:b&&(I(a,b,f=[]),0===f.length&&(f=void 0)),{vnodeSelector:a,properties:c,
children:f,text:""===d?void 0:d,domNode:null}};a.createProjector=function(a){var c,b,d=w(k,a),f=d.performanceLogger,g=!0,e=!1,p=[],h=[],r=function(a,b,g){var e;d.eventHandlerInterceptor=J(c,function(){return e},f);e=a(b,g(),d);p.push(e);h.push(g)},u=function(){if(b=void 0,g){g=!1;f("renderStart",void 0);for(var c=0;c<p.length;c++){var a=h[c]();f("rendered",void 0);p[c].update(a);f("patched",void 0)}f("renderDone",void 0);g=!0}};return c={renderNow:u,scheduleRender:function(){b||e||(b=requestAnimationFrame(u))},
stop:function(){b&&(cancelAnimationFrame(b),b=void 0);e=!0},resume:function(){e=!1;g=!0;c.scheduleRender()},append:function(c,a){r(n.append,c,a)},insertBefore:function(c,a){r(n.insertBefore,c,a)},merge:function(c,a){r(n.merge,c,a)},replace:function(c,a){r(n.replace,c,a)},detach:function(c){for(var a=0;a<h.length;a++)if(h[a]===c)return h.splice(a,1),p.splice(a,1)[0];throw Error("renderFunction was not found");}}};a.createCache=function(){var a,c;return{invalidate:function(){a=c=void 0},result:function(b,
d){if(a)for(var f=0;f<b.length;f++)a[f]!==b[f]&&(c=void 0);return c||(c=d(),a=b),c}}};a.createMapping=function(a,c,b){var d=[],f=[];return{results:f,map:function(g){for(var e=g.map(a),k=f.slice(),n=0,p=0;p<g.length;p++){var h=g[p],r=e[p];if(r===d[n])f[p]=k[n],b(h,k[n],p),n++;else{for(var u=!1,l=1;l<d.length+1;l++){var t=(n+l)%d.length;if(d[t]===r){f[p]=k[t];b(g[p],k[t],p);n=t+1;u=!0;break}}u||(f[p]=c(h,p))}}f.length=g.length;d=e}}};Object.defineProperty(a,"__esModule",{value:!0})}(a)},14:function(x,
a,b){function e(){for(var a=[],b=0;b<arguments.length;b++)a[b]=arguments[b];return function(b){return a.reduceRight(function(a,b){return b(a)},b)}}b.d(a,"a",function(){return e})},24:function(x,a,b){function e(a){return 0===Object.keys(a).length&&a.constructor===Object}function h(a,b){return A.apply(null,arguments)}function z(a,b){return y.apply(null,arguments)}b.d(a,"a",function(){return e});b.d(a,"d",function(){return H});b.d(a,"b",function(){return h});b.d(a,"c",function(){return z});var w=b(0);
x=b(7);var H=Object(x.a)(function(a,b){b=w.a({},b);return delete b[a],b}),A=Object(x.a)(function(a,b){return Object.keys(b).reduce(function(e,h){return e[h]=a(b[h],h,b),e},{})}),y=Object(x.a)(function(a,b){return Object.keys(b).reduce(function(e,h){return a(b[h],h,b)&&(e[h]=b[h]),e},{})})},249:function(x,a,b){function e(a,b,f,e){var k=new E({key:"root"},b);k.store=a;var n=Object(B.createProjector)(e);b=t.a({},n,{append:function(a){return n.append(a,function(){return k.render.bind(k)(k.tsx.bind(k))})}});
return b.append(f),a.subscribe(function(){return n.scheduleRender()}),b}function h(a,b){return function(f){return function(e,k){return function(n,p){return k(f,t.a({},e,a(p(),e),b(n,e)))}}}}function z(){for(var a=[],b=0;b<arguments.length;b++)a[b]=arguments[b];return function(b){return function(f,e){var k=b(f,e);f=F.a;var p=k.dispatch;e=a.map(function(a){return a({dispatch:function(a){return p(a)},getState:k.getState})});return p=f.apply(void 0,e)(k.dispatch),t.a({},k,{dispatch:p})}}}function w(a){return function(b){return function(f,
e){return b(function(b,e){if("@@shunt/SETSTATE"===e.type)return e.payload;b=f(b,e);return a(e,b),b},e)}}}function H(a){return function(b){b.dispatch;var e=b.getState;return function(b){return function(f){var k=b(f);return a(f,e()),k}}}}function A(a){var b=Object(C.c)(function(a){return"function"==typeof a},a);return function(a,e){return void 0===a&&(a={}),Object(C.b)(function(b,f){return b(a[f],e)},b)}}function y(a,b){var e=b,h=[];b={dispatch:function(b){return e=a(e,b),h.forEach(function(a){return a()}),
b},subscribe:function(a){return h.push(a),function(){h.splice(h.indexOf(a),1)}},getState:function(){return e}};return b.dispatch({type:"@@component/INIT"+Math.random().toString(36).substring(7)}),b}b.r(a);b.d(a,"createProjector",function(){return e});b.d(a,"Component",function(){return D});b.d(a,"RootComponent",function(){return E});b.d(a,"connect",function(){return h});b.d(a,"applyMiddleware",function(){return z});b.d(a,"shunt",function(){return w});b.d(a,"thunk",function(){return G});b.d(a,"addListener",
function(){return H});b.d(a,"combineReducers",function(){return A});b.d(a,"createStore",function(){return y});var t=b(0),B=b(113),F=b(14),C=b(24),D=function(){function a(a){this.childComponents={};this.state={};this.props=a}return a.prototype.componentDidConnect=function(){},a.prototype.componentWillReceiveProps=function(a){},a.prototype.setState=function(a){this.state=t.a({},this.state,a);this.store?this.store.dispatch({type:this.props.key+"_COMPONENT_STATE_UPDATE"}):console.warn("\n                A component's 'setState' method was called from its constructor function.\n                Set component state directly in the constructor function, and use 'setState' in callbacks etc.\n            ")},
a.prototype.tsx=function(a,b,e){var f,h=Array.prototype.slice.call(arguments).slice(2);if("string"==typeof a)f=B.h.apply(this,[a,b,h]);else if(a.prototype&&a.prototype.constructor.name){var p=a,h=t.a({},b,{children:h}),r=this.childComponents[h.key];r?(r.componentWillReceiveProps(h),r.props=h,f=r.render(r.tsx.bind(r))):((r=this.childComponents[h.key]=new p(h)).store=this.store,r.componentDidConnect(),f=r.render(r.tsx.bind(r)))}else{var p;f=(p=a)(t.a({},b,{children:h}),this.tsx.bind(this))}return"function"==
typeof f?f(this.store.dispatch,this.store.getState):f},a}(),E=function(a){function b(b,e){b=a.call(this,b)||this;return b.renderRoot=e,b}return t.b(b,a),b.prototype.render=function(a){var b=this;return a(function(a,e){return b.renderRoot(e)})},b}(D);void 0===Function.prototype.name&&void 0!==Object.defineProperty&&Object.defineProperty(Function.prototype,"name",{get:function(){var a=/function\s([^(]{1,})\(/.exec(this.toString());return a&&1<a.length?a[1].trim():""},set:function(a){}});var G=function(a){var b=
a.dispatch,e=a.getState;return function(a){return function(f){return"function"==typeof f?f(b,e):a(f)}}}},7:function(x,a,b){function e(a){return function w(){for(var b=this,e=[],h=0;h<arguments.length;h++)e[h]=arguments[h];return e.length>=a.length?a.call.apply(a,[this].concat(e)):function(){for(var a=[],h=0;h<arguments.length;h++)a[h]=arguments[h];return w.call.apply(w,[b].concat(e,a))}}}b.d(a,"a",function(){return e})}})});