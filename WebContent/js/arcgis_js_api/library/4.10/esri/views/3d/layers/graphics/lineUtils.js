// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../webgl-engine/lib/GeometryData ../../webgl-engine/lib/Util ../../webgl-engine/materials/NativeLineMaterial ../../webgl-engine/materials/RibbonLineMaterial".split(" "),function(u,g,m,q,r,t){function n(a){var f=a.length;return a[0]===a[f-3]&&a[1]===a[f-2]&&a[2]===a[f-1]}Object.defineProperty(g,"__esModule",{value:!0});var h=q.VertexAttrConstants;g.createRibbonMaterial=function(a){var f={width:a.width,color:a.color,miterLimit:a.miterLimit,polygonOffset:!0,join:"miter",slicePlaneEnabled:a.slicePlaneEnabled};
"miter"===a.join||"bevel"===a.join?f.join=a.join:a.join&&console.warn("unsupported join type for line symbol: "+a.join);return new t(f,a.idHint+"_ribbonlinemat")};g.createNativeMaterial=function(a){return new r({color:a.color,slicePlaneEnabled:a.slicePlaneEnabled},a.idHint+"_nativelinemat")};g.isClosed=n;g.createPolylineGeometry=function(a,f,d,g,e){var c,b,k;if(d=d&&!n(a)){d=new Float32Array(a.length+3);for(b=0;b<a.length;b++)d[b]=a[b];b=d.length;d[b-3]=a[0];d[b-2]=a[1];d[b-1]=a[2];c=a.length/3+1;
b=new Uint32Array(2*(c-1));k=new Uint32Array(2*(c-1))}else c=a.length/3,b=new Uint32Array(2*(c-1)),k=new Uint32Array(2*(c-1)),d=a;a=new Float32Array(1);a[0]=e;for(var p=e=0,l=0;l<c-1;l++)b[e++]=l,b[e++]=l+1,k[p++]=0,k[p++]=0;e={};c={};e[h.POSITION]=b;e[h.COLOR]=k;e[h.SIZE]=k;c[h.POSITION]={size:3,data:d,offsetIdx:0,strideIdx:3};c[h.COLOR]={size:4,data:g,offsetIdx:0,strideIdx:4};c[h.SIZE]={size:1,data:a,offsetIdx:0,strideIdx:1};f&&(e.mapPos=b,c.mapPos={size:3,data:f,offsetIdx:0,strideIdx:3});return new m(c,
e,m.DefaultOffsets,"line")}});