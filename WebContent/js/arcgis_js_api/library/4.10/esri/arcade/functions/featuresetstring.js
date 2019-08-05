// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports dojo/Deferred ../Feature ../kernel ../languageUtils".split(" "),function(m,h,k,l,g,b){Object.defineProperty(h,"__esModule",{value:!0});h.registerFunctions=function(c){"async"===c.mode&&(c.functions.domainname=function(e,f){return c.standardFunctionAsync(e,f,function(c,e,a){b.pcCheck(a,2,4);if(a[0]instanceof l)return a[0].domainValueLookup(b.toString(a[1]),a[2],void 0===a[3]?void 0:b.toNumber(a[3]));if(b.isFeatureSet(a[0])){var d=new k;a[0]._ensureLoaded().then(g.callback(function(){var c=
b.getDomain(b.toString(a[1]),a[0],null,void 0===a[3]?void 0:b.toNumber(a[3]));d.resolve(b.getDomainValue(c,a[2]))},d),g.errback(d));return d.promise}throw Error("Invalid Parameter");})},c.signatures.push({name:"domainname",min:"2",max:"4"}),c.functions.domaincode=function(e,f){return c.standardFunctionAsync(e,f,function(c,e,a){b.pcCheck(a,2,4);if(a[0]instanceof l)return a[0].domainCodeLookup(b.toString(a[1]),a[2],void 0===a[3]?void 0:b.toNumber(a[3]));if(b.isFeatureSet(a[0])){var d=new k;a[0]._ensureLoaded().then(g.callback(function(){var c=
b.getDomain(b.toString(a[1]),a[0],null,void 0===a[3]?void 0:b.toNumber(a[3]));d.resolve(b.getDomainCode(c,a[2]))},d),g.errback(d));return d.promise}throw Error("Invalid Parameter");})},c.signatures.push({name:"domaincode",min:"2",max:"4"}));c.functions.text=function(e,f){return c.standardFunctionAsync(e,f,function(c,e,a){b.pcCheck(a,1,2);if(b.isFeatureSet(a[0])){c=b.defaultUndefined(a[2],"");if(""===c)return a[0].castToText();if("schema"===c.toLowerCase())return a[0].convertToText("schema");if("featureset"===
c.toLowerCase())return a[0].convertToText("featureset")}else return b.toStringExplicit(a[0],a[1])})}}});