// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/extendsHelper ../../../core/tsSupport/decorateHelper ./Container ./webgl/enums".split(" "),function(h,k,m,p,n,l){Object.defineProperty(k,"__esModule",{value:!0});h=function(a){function e(){return null!==a&&a.apply(this,arguments)||this}m(e,a);e.prototype.doRender=function(c){this.visible&&c.drawPhase===l.WGLDrawPhase.MAP&&a.prototype.doRender.call(this,c)};e.prototype.renderChildren=function(c){var f=this.stage.painter,a=this.children,e=c.drawPhase;
this.sortChildren(function(a,b){return b.resolution-a.resolution});c.drawPhase=l.WGLDrawPhase.CLIP;f.startStencilBurn();for(var b=0,g=a.length;b<g;b++){var d=a[b];d.attached&&d.visible&&(f.stencilRef=b,d.processRender(c))}c.drawPhase=e;f.startStencilDraw();b=0;for(g=a.length;b<g;b++)d=a[b],d.attached&&d.visible&&(f.stencilRef=b,d.processRender(c));f.endStencilDraw()};return e}(n.Container);k.BitmapContainer=h});