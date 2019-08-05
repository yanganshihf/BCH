// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/assignHelper ../../config ../../request ../../core/promiseUtils ../../core/urlUtils".split(" "),function(x,u,y,v,w,p,f){function l(b){b&&(b=f.getOrigin(b),m&&-1===m.indexOf(b)&&m.push(b))}function n(){for(var b=[],a=0;a<arguments.length;a++)b[a]=arguments[a];for(var a=void 0,d=0;d<b.length;++d)f.isProtocolRelative(b[d])?a&&(a=a.split("://")[0]+":"+b[d].trim()):a=f.isAbsolute(b[d])?b[d]:f.join(a,b[d]);return a}function q(b,a,d){var e,g,h;"string"===typeof a?
(a=f.normalize(a),l(a),e=f.urlToObject(a),e=w(e.path,{query:{f:"json"},responseType:"json"}),h=g=a):(e=p.resolve({data:a}),g=a.jsonUrl||null,h=d);return e.then(function(a){var c=a.data;a.ssl&&(g&&(g=g.replace(/^http:/i,"https:")),h&&(h=h.replace(/^http:/i,"https:")));if(c.sources){b.styleUrl=g||null;a=h?f.removeFile(h):f.appBaseUrl;b.styleBase=a;b.style=c;b.styleUrl&&l(b.styleUrl);if(b.source)c=p.resolve();else{b:if(c=c.sources,c.esri)c=c.esri;else{for(var d=0,e=Object.keys(c);d<e.length;d++){var k=
e[d];if("vector"===c[k].type){c=c[k];break b}}c=null}c=c.url?q(b,n(a,c.url)):q(b,c,a)}return c}if(c.sources)return p.reject("You must specify the URL or the JSON for a service or for a style.");b.sourceUrl=g||null;a=h?f.removeTrailingSlash(h)+"/":f.appBaseUrl;b.sourceBase=a;b.source=c;if(c.hasOwnProperty("tileInfo"))d=c;else{for(var d={xmin:-2.0037507067161843E7,ymin:-2.0037507067161843E7,xmax:2.0037507067161843E7,ymax:2.0037507067161843E7,spatialReference:{wkid:102100}},k=(d.xmax-d.xmin)/512,e=[],
r=c.hasOwnProperty("minzoom")?parseFloat(c.minzoom):0,t=c.hasOwnProperty("maxzoom")?parseFloat(c.maxzoom):16;r<t;r++){var m=k/Math.pow(2,r);e.push({level:r,scale:Math.floor(3779.527559055118*m),resolution:m})}k=0;for(t=c.tiles;k<t.length;k++)l(n(a,t[k]));d={capabilities:"TilesOnly",initialExtent:d,fullExtent:d,minScale:e[0].scale,maxScale:e[e.length-1].scale,tiles:c.tiles,tileInfo:{rows:512,cols:512,dpi:96,format:"pbf",origin:{x:-2.0037508342787E7,y:2.0037508342787E7},lods:e,spatialReference:{wkid:102100}}}}b.validatedSource=
d;b.sourceUrl&&l(b.sourceUrl);c=b.style?p.resolve():null==c.defaultStyles?p.reject():"string"===typeof c.defaultStyles?q(b,n(a,c.defaultStyles,"root.json")):q(b,c.defaultStyles,n(a,"root.json"));return c})}Object.defineProperty(u,"__esModule",{value:!0});var m=v.defaults&&v.defaults.io.corsEnabledServers;u.loadMetadata=function(b){var a={source:null,sourceBase:null,sourceUrl:null,validatedSource:null,style:null,styleBase:null,styleUrl:null},d="string"===typeof b?[b,null]:[null,b.jsonUrl],e=d[0],d=
d[1],g=e?f.urlToObject(e):null;return q(a,b,d).then(function(){var b={layerDefinition:a.validatedSource,url:e,parsedUrl:g,serviceUrl:a.sourceUrl,style:a.style,styleUrl:a.styleUrl,spriteUrl:a.style.sprite&&n(a.styleBase,a.style.sprite),glyphsUrl:a.style.glyphs&&n(a.styleBase,a.style.glyphs)};l(b.spriteUrl);l(b.glyphsUrl);return b})}});