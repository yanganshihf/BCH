// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/ObjectPool"],function(b,c,d){Object.defineProperty(c,"__esModule",{value:!0});b=function(){function a(){this.color=[0,0,0,0];this.haloColor=[0,0,0,0];this.haloSize=0;this.size=12;this.vAnchor=this.hAnchor=this.offsetY=this.offsetX=this.angle=0}a.prototype.acquire=function(a,b,c,d,e,f,g,h,k){this.color=a;this.haloColor=b;this.haloSize=c;this.size=d;this.angle=e;this.offsetX=f;this.offsetY=g;this.hAnchor=h;this.vAnchor=k};a.prototype.release=function(){this.color[0]=
this.color[1]=this.color[2]=this.color[3]=0;this.vAnchor=this.hAnchor=this.offsetY=this.offsetX=this.angle=this.size=this.haloSize=this.haloColor[0]=this.haloColor[1]=this.haloColor[2]=this.haloColor[3]=0};a.pool=new d(a);return a}();c.TextProperties=b});