// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../request ../../symbols ../../core/devEnvironmentUtils ../../core/Error ../../core/has ../../core/promiseUtils ../../core/urlUtils ../../portal/Portal ../../portal/PortalQueryParams ./jsonUtils ./StyleOrigin ./Thumbnail".split(" "),function(G,f,w,x,m,l,y,n,h,z,A,B,p,q){function C(a,b){return r(a).then(function(b){return{data:b.data,baseUrl:h.removeFile(a),styleUrl:a}})}function D(a,b){b=b.portal||z.getDefault();var d,c=b.url+" - "+(b.user&&b.user.username)+" - "+a;g[c]||
(g[c]=E(a,b).then(function(a){d=a;return a.fetchData()}).then(function(b){return{data:b,baseUrl:d.itemUrl,styleName:a}}));return g[c]}function E(a,b){return b.load().then(function(){var d=new A({disableExtraQuery:!0,query:"owner:"+k+" AND type:"+t+' AND typekeywords:"'+a+'"'});return b.queryItems(d)}).then(function(b){b=b.results;var d=null,h=a.toLowerCase();if(b&&Array.isArray(b))for(var f=0;f<b.length;f++){var e=b[f];if(e.typeKeywords.some(function(a){return a.toLowerCase()===h})&&e.type===t&&e.owner===
k){d=e;break}}if(d)return d.load();throw new l("symbolstyleutils:style-not-found","The style '"+a+"' could not be found",{styleName:a});})}function u(a,b){return a.styleUrl?C(a.styleUrl,b):a.styleName?D(a.styleName,b):n.reject(new l("symbolstyleutils:style-url-and-name-missing","Either styleUrl or styleName is required to resolve a style"))}function v(a,b,d){for(var c=a.data,f={portal:d.portal,url:h.urlToObject(a.baseUrl),origin:"portal-item"},g=function(c){if(c.name!==b)return"continue";var e=h.fromJSON(F(c),
f),g=c.thumbnail&&c.thumbnail.href,k=c.thumbnail&&c.thumbnail.imageData;m.isDevEnvironment()&&(e=m.adjustStaticAGOUrl(e),g=m.adjustStaticAGOUrl(g));var l={portal:d.portal,url:h.urlToObject(h.removeFile(e)),origin:"portal-item"};return{value:r(e).then(function(c){if((c=B.fromJSON(c.data,l))&&c.isInstanceOf(x.BaseSymbol3D)){if(g){var e=h.fromJSON(g,f);c.thumbnail=new q.default({url:e})}else k&&(c.thumbnail=new q.default({url:"data:image/png;base64,"+k}));a.styleUrl?c.styleOrigin=new p({portal:d.portal,
styleUrl:a.styleUrl,name:b}):a.styleName&&(c.styleOrigin=new p({portal:d.portal,styleName:a.styleName,name:b}))}return c})}},e=0,c=c.items;e<c.length;e++){var k=g(c[e]);if("object"===typeof k)return k.value}return n.reject(new l("symbolstyleutils:symbol-name-not-found","The symbol name '"+b+"' could not be found",{symbolName:b}))}function F(a){if(a.formatInfos&&!y("enable-feature:jschmid/force-wosr"))for(var b=0,d=a.formatInfos;b<d.length;b++){var c=d[b];if("gltf"===c.type)return c.href}return a.webRef}
function r(a){return w(h.normalize(a),{responseType:"json",query:{f:"json"}})}Object.defineProperty(f,"__esModule",{value:!0});var g={};f.fetchStyle=u;f.resolveWebStyleSymbol=function(a,b){return a.name?u(a,b).then(function(d){return v(d,a.name,b)}):n.reject(new l("symbolstyleutils:style-symbol-reference-name-missing","Missing name in style symbol reference"))};f.fetchSymbolFromStyle=v;f.styleNameFromItem=function(a){var b=0;for(a=a.typeKeywords;b<a.length;b++){var d=a[b];if(/^Esri.*Style$/.test(d)&&
"Esri Style"!==d)return d}};var k="esri_en",t="Style"});