// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../Color ../../../../core/compilerUtils ../../../../core/compilerUtils ../../../../core/screenUtils ../../../../core/libs/gl-matrix-2/gl-matrix".split(" "),function(m,b,g,h,k,d,l){function e(f,a,c){if(h.isNone(a))return null;var b=l.vec4f64.fromArray(g.toUnitRGBA(a.color));c=c.opacity;switch(a.type){case "solid":return f.createSolidEdgeMaterial({color:b,size:d.pt2px(a.size),extensionLength:d.pt2px(a.extensionLength),opacity:c});case "sketch":return f.createSketchEdgeMaterial({color:b,
size:d.pt2px(a.size),extensionLength:d.pt2px(a.extensionLength),opacity:c});default:k.neverReached(a)}}Object.defineProperty(b,"__esModule",{value:!0});b.createMaterial=function(b,a,c){return e(b,a&&a.enabled&&a.edges||null,c)};b.createMaterialFromEdges=e});