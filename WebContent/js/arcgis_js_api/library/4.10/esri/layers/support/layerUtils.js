// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(k,h){Object.defineProperty(h,"__esModule",{value:!0});h.serializeLayerDefinitions=function(a){var b=/[:;]/,f=[],c=!1;if(a&&(a.forEach(function(a,e){f.push([e,a]);!c&&b.test(a)&&(c=!0)}),0<f.length)){a=void 0;if(c){var d={};f.forEach(function(a){d[a[0]]=a[1]});a=JSON.stringify(d)}else{var e=[];f.forEach(function(a){e.push(a[0]+":"+a[1])});a=e.join(";")}return a}return null};h.serializeTimeOptions=function(a){if(a){var b=[];a.forEach(function(a,c){b.push('"'+c+
'":'+JSON.stringify(a))});if(b.length)return"{"+b.join(",")+"}"}};h.getLayersForScale=function(a,b){var f=[];if(0<a&&b)for(var c=function(e){if(0<=b[e].parentLayerId&&-1===f.indexOf(b[e].parentLayerId)&&b.some(function(a){return a.id===b[e].parentLayerId}))return"continue";if(0<=b[e].id){var c=!0,d=b[e].maxScale,g=b[e].minScale;if(0<d||0<g)0<d&&0<g?c=d<=a&&a<=g:0<d?c=d<=a:0<g&&(c=a<=g);c&&f.push(b[e].id)}},d=0;d<b.length;d++)c(d);return f}});