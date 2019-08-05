// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/generatorHelper ../core/tsSupport/awaiterHelper ../Basemap ../Ground ../WebScene ../core/compilerUtils ../core/JSONSupport ../core/MultiOriginJSONSupport ../core/accessorSupport/ensureType ../core/accessorSupport/extensions/serializableProperty/type ../layers/GroupLayer ../layers/mixins/OperationalLayer".split(" "),function(ca,p,e,f,K,L,M,D,N,O,E,P,F,G){function u(a,b){return f(this,void 0,void 0,function(){var c;return e(this,function(d){switch(d.label){case 0:c=
a.typeName;switch(c){case "array":return[3,1];case "union":return[3,3];case "json":return[3,5];case "native":return[3,7];case "enum":return[3,9]}return[3,11];case 1:return[4,Q(a,b)];case 2:return d.sent(),[3,12];case 3:return[4,R(a,b)];case 4:return d.sent(),[3,12];case 5:return[4,q(a,b)];case 6:return d.sent(),[3,12];case 7:return[4,S(a,b)];case 8:return d.sent(),[3,12];case 9:return[4,T(a,b)];case 10:return d.sent(),[3,12];case 11:D.neverReached(a),d.label=12;case 12:return[2]}})})}function S(a,
b){return f(this,void 0,void 0,function(){return e(this,function(c){b.addProperty({path:b.pathString,type:k(a),default:a.default});return[2]})})}function U(a){a=a.slice();a.sort();return a}function T(a,b){return f(this,void 0,void 0,function(){var c;return e(this,function(d){c=a.values.slice();a.nullable&&c.push(null);b.addProperty({path:b.pathString,type:k(a),enum:U(c).map(function(a){return"string"===typeof a?'"'+a+'"':""+a}).join("|"),default:a.default});return[2]})})}function Q(a,b){return f(this,
void 0,void 0,function(){return e(this,function(c){switch(c.label){case 0:return b.pushPath(b.popPath()+"[]"),[4,u(a.elementType,b)];case 1:return c.sent(),[2]}})})}function V(a){return W[a]||a}function R(a,b){return f(this,void 0,void 0,function(){var c,d,g,r,l,m,h;return e(this,function(e){switch(e.label){case 0:c=b.pathString,d=b.popPath(),g=[],r=0,l=a.types,e.label=1;case 1:if(!(r<l.length))return[3,5];m=l[r];if("native"!==m.type.typeName)return[3,2];g.push(m.type);return[3,4];case 2:return b.pushPath(d+
"\x3c"+V(m.value)+"\x3e"),[4,u(m.type,b)];case 3:e.sent(),b.popPath(),e.label=4;case 4:return r++,[3,1];case 5:return g.length&&(h=g.map(k),a.nullable&&h.push("null"),h.sort(),b.addProperty({type:h.join("|"),path:c,default:a.default})),b.pushPath(d),[2]}})})}function X(a,b,c){return f(this,void 0,void 0,function(){return e(this,function(d){switch(d.label){case 0:return a.type!==M||"layers"!==b?[3,2]:[4,t("web-scene/operational-layers")];case 1:return[2,d.sent()];case 2:return a.type!==K||"baseLayers"!==
b?[3,4]:[4,t("web-scene/basemap")];case 3:return[2,d.sent()];case 4:return a.type!==L||"layers"!==b?[3,6]:[4,t("web-scene/ground")];case 5:return[2,d.sent()];case 6:return a.type!==F||"layers"!==b?[3,8]:[4,t("web-scene/operational-layers",function(a){return a!==F})];case 7:return[2,d.sent()];case 8:return[2,Y(c)]}})})}function q(a,b){return f(this,void 0,void 0,function(){var c,d,g,r,l,m,h,f,n,k,t,w,x,p,y,v,u,q,z,A;return e(this,function(e){switch(e.label){case 0:c=a.type.__accessorMetadata__;d=a.type.prototype.declaredClass.replace(/\./g,
"/");g=c&&c.properties;d&&b.classPaths&&(b.classPaths[b.pathString]=d);if(!g)return b.addProperty({path:b.pathString,type:"unknown"}),[2];if(r=b.seen.get(a.type)){l=0;for(m=r;l<m.length;l++)h=m[l],b.pushPath(h.path),b.addProperty({path:b.pathString,type:h.type,default:h.default}),b.popPath();return[2]}f=b.flatProperties.length;n=b.pathString;k=[];for(t in g)k.push(t);w=0;e.label=1;case 1:if(!(w<k.length))return[3,7];x=k[w];p=g[x];y=H(p);if(!y||!y.enabled)return[3,6];v=y.target;return"string"!==typeof v&&
null!=v?[3,4]:[4,X(a,x,p)];case 2:return(u=e.sent())?[4,I(u,"string"===typeof v?v:x,b)]:[3,6];case 3:return e.sent(),[3,6];case 4:return[4,Z(v,b)];case 5:e.sent(),e.label=6;case 6:return w++,[3,1];case 7:if(b.flatProperties.length===f)return b.addProperty({path:b.pathString,type:"unknown"}),[2];q=[];for(z=f;z<b.flatProperties.length;z++)A=b.flatProperties[z],q.push({path:A.path.slice(n.length+1),type:A.type,default:A.default});b.addSeen(a.type,q);return[2]}})})}function I(a,b,c){return f(this,void 0,
void 0,function(){return e(this,function(d){switch(d.label){case 0:return c.pushPath(b),[4,u(a,c)];case 1:return d.sent(),c.popPath(),[2]}})})}function Z(a,b){return f(this,void 0,void 0,function(){var c,d,g;return e(this,function(e){for(c in a)d=a[c],g=void 0,g=d.types?B(d.types):n(d.type),g.default=d.default,I(g,c,b);return[2]})})}function t(a,b){return f(this,void 0,void 0,function(){var c,d,g,f,l,m,h,k;return e(this,function(e){switch(e.label){case 0:c=G.supportedTypes[a];d={typeName:"union",
key:"layerType",types:[]};g=[];for(f in c)g.push(f);l=0;e.label=1;case 1:if(!(l<g.length))return[3,4];m=g[l];return[4,G.typeModuleMap[m]()];case 2:h=e.sent();if(!h||b&&!b(h))return[3,3];d.types.push({type:{typeName:"json",type:h},value:m});e.label=3;case 3:return l++,[3,1];case 4:if(0===d.types.length)return[2,null];k={typeName:"array",elementType:1===d.types.length?d.types[0].type:d};return[2,k]}})})}function k(a){switch(a.typeName){case "array":return k(a.elementType)+"[]";case "union":var b=a.types.map(function(a){return k(a.type)});
a.nullable&&b.push("null");return""+b.join(" | ");case "native":switch(a.type){case Number:return"number";case E.Integer:return"integer";case String:return"string";case Boolean:return"boolean";default:return"unknown"}case "json":return a.type.prototype.declaredClass;case "enum":return"string";default:D.neverReached(a)}}function aa(a){a=a.prototype.itemType&&a.prototype.itemType.Type;if(!a)return{typeName:"array",elementType:{typeName:"native",type:null}};if("function"===typeof a)return{typeName:"array",
elementType:n(a)};if(a.typeMap){var b=[],c;for(c in a.typeMap){var d=a.typeMap[c];b.push({type:n(d),value:C(d)?null:c})}return{typeName:"array",elementType:{typeName:"union",key:"string"===typeof a.key?a.key:"type",types:b}}}}function Y(a){if(a.types)return B(a.types);var b;if(a.json){b=a.json.origins;var c=a.json,d=b&&b["web-document"];b=b&&b["web-scene"]||d||c||null}else b=null;c=H(a);a=n(b&&b.type||a.type);b&&void 0!==b.default&&"function"!==typeof b.default&&(a.default=b.default);c.allowNull&&
(a.nullable=!0);return a}function B(a){if(Array.isArray(a))return{typeName:"array",elementType:B(a[0])};var b=[],c;for(c in a.typeMap){var d=a.typeMap[c];b.push({type:n(d),value:C(d)?null:c})}return 1===b.length?b[0].type:{typeName:"union",key:"string"===typeof a.key?a.key:"type",types:b}}function n(a){return a?Array.isArray(a)?"string"===typeof a[0]||"number"===typeof a[0]?{typeName:"enum",values:a}:1<a.length?{typeName:"union",key:null,types:a.map(function(a){return{type:n(a),value:null}})}:{typeName:"array",
elementType:n(a[0])}:P.isCollection(a)?aa(a):C(a)?{typeName:"native",type:a}:ba(a)?{typeName:"json",type:a}:{typeName:"native",type:null}:{typeName:"native",type:null}}function ba(a){return(a=a._meta&&a._meta.bases)?-1!==a.indexOf(N)||-1!==a.indexOf(O):!1}function C(a){return a===String||a===Boolean||a===Number||a===E.Integer}function H(a){if(!a.json)return null;var b=a.json.origins;a=a.json.write;var c=b&&b["web-document"]&&b["web-document"].write;return b&&b["web-scene"]&&b["web-scene"].write||
c||a||null}Object.defineProperty(p,"__esModule",{value:!0});p.scan=function(a){return f(this,void 0,void 0,function(){var b,c;return e(this,function(d){switch(d.label){case 0:return b=new J,[4,q({typeName:"json",type:a},b)];case 1:return d.sent(),c=b.flatProperties,c.sort(function(a,b){return a.path.localeCompare(b.path)}),[2,c]}})})};p.collectClassPaths=function(a){return f(this,void 0,void 0,function(){var b;return e(this,function(c){switch(c.label){case 0:return b=new J({classPaths:{},cacheEnabled:!1}),
[4,q({typeName:"json",type:a},b)];case 1:return c.sent(),[2,b.classPaths]}})})};var W={"unique-value":"uniqueValue","class-breaks":"classBreaks","point-3d":"PointSymbol3D","line-3d":"LineSymbol3D","mesh-3d":"MeshSymbol3D","polygon-3d":"PolygonSymbol3D","label-3d":"LabelSymbol3D","web-style":"styleSymbolReference",text:"Text",object:"Object",icon:"Icon",fill:"Fill",extrude:"Extrude",line:"Line",path:"Path","point-cloud-class-breaks":"pointCloudClassBreaksRenderer","point-cloud-rgb":"pointCloudRGBRenderer",
"point-cloud-stretch":"pointCloudStretchRenderer","point-cloud-unique-value":"pointCloudUniqueValueRenderer","fixed-size":"pointCloudFixedSizeAlgorithm",splat:"pointCloudSplatAlgorithm",bitfield:"pointCloudBitfieldFilter",return:"pointCloudReturnFilter",value:"pointCloudValueFilter","stay-above":"stayAbove",color:"colorInfo",opacity:"transparencyInfo",size:"sizeInfo",rotation:"rotationInfo"},J=function(){function a(a){this.flatProperties=[];this.path=[];this.seen=new Map;a&&a.classPaths&&(this.classPaths=
a.classPaths);this.cacheEnabled=!(!a||!a.cacheEnabled)}a.prototype.addProperty=function(a){this.flatProperties.push(a)};a.prototype.addSeen=function(a,c){this.cacheEnabled&&this.seen.set(a,c)};a.prototype.pushPath=function(a){this.path.push(a)};a.prototype.popPath=function(){return this.path.pop()};Object.defineProperty(a.prototype,"pathString",{get:function(){return this.path.join(".")},enumerable:!0,configurable:!0});return a}()});