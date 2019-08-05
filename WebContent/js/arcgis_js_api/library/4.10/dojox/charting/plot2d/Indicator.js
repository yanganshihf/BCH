//>>built
define("dojo/_base/lang dojo/_base/array dojo/_base/declare ./CartesianBase ./_PlotEvents ./common ../axis2d/common dojox/gfx dojox/lang/utils dojox/gfx/fx dojo/has dojo/sniff".split(" "),function(t,H,z,I,J,w,K,r,D,L,E,M){var N=function(b,c){var e=b.declaredClass,a;if(-1!=e.indexOf("svg"))try{var d=b.rawNode.getBBox();if(E("dojo-bidi")&&M("ff")){for(a=b.rawNode.cloneNode();a.lastChild;)a.removeChild(a.lastChild);a.appendChild(document.createTextNode(c.replace(/[\u200E\u202A\u202C\u200f\u202B]/g,"")));
a.setAttribute("style","visibility: hidden");b.rawNode.parentNode.appendChild(a);d=a.getBBox();a.parentNode.removeChild(a)}else d=b.rawNode.getBBox();return t.mixin({},d)}catch(h){}else{if(-1!=e.indexOf("vml"))return e=b.rawNode,d=e.style.display,e.style.display="inline",c=r.pt2px(parseFloat(e.currentStyle.width)),a=r.pt2px(parseFloat(e.currentStyle.height)),c={x:0,y:0,width:c,height:a},A(b,c),e.style.display=d,c;if(-1!=e.indexOf("silverlight"))return A(b,{width:b.rawNode.actualWidth,height:b.rawNode.actualHeight},
.75);if(b.getTextWidth)return c=b.getTextWidth(),e=b.getFont(),a=r.normalizedLength(e?e.size:r.defaultFont.size),c={width:c,height:a},A(b,c,.75),c}return null},A=function(b,c,e){var a=c.width,d=c.height;b=b.getShape();switch(b.align){case "end":c.x=b.x-a;break;case "middle":c.x=b.x-a/2;break;default:c.x=b.x}c.y=b.y-d*(e||1);return c};z=z("dojox.charting.plot2d.Indicator",[I,J],{defaultParams:{vertical:!0,fixed:!0,precision:0,lines:!0,labels:"line",markers:!0},optionalParams:{lineStroke:{},outlineStroke:{},
shadowStroke:{},lineFill:{},stroke:{},outline:{},shadow:{},fill:{},fillFunc:null,labelFunc:null,font:"",fontColor:"",markerStroke:{},markerOutline:{},markerShadow:{},markerFill:{},markerSymbol:"",values:[],offset:{},start:!1,animate:!1},constructor:function(b,c){this.opt=t.clone(this.defaultParams);D.updateWithObject(this.opt,c);"number"==typeof c.values&&(c.values=[c.values]);D.updateWithPattern(this.opt,c,this.optionalParams);this.animate=this.opt.animate},render:function(b,c){if(this.zoom)return this.performZoom(b,
c);if(!this.isDirty())return this;this.cleanGroup(null,!0);if(!this.opt.values)return this;this._updateIndicator();return this},_updateIndicator:function(){var b=this.chart.theme,c=this._hAxis.name,e=this._vAxis.name,a=this._hAxis.getScaler().bounds,d=this._vAxis.getScaler().bounds,h={};h[c]=a.from;h[e]=d.from;var t=this.toPage(h);h[c]=a.to;h[e]=d.to;var F=this.toPage(h),m=this.events(),a=H.map(this.opt.values,function(a,b){return this._renderIndicator(a,b,c,e,t,F,m,this.animate)},this),d=a.length;
if("trend"==this.opt.labels){var h=this.opt.vertical,g=this._data[0][0],k=this._data[d-1][0]-g,g=this.opt.labelFunc?this.opt.labelFunc(-1,this.values,this._data,this.opt.fixed,this.opt.precision):w.getLabel(k,this.opt.fixed,this.opt.precision)+" ("+w.getLabel(100*k/g,!0,2)+"%)";this._renderText(this.getGroup(),g,this.chart.theme,h?(a[0].x+a[d-1].x)/2:a[1].x,h?a[0].y:(a[1].y+a[d-1].y)/2,-1,this.opt.values,this._data)}(b=void 0!=this.opt.lineFill?this.opt.lineFill:b.indicator.lineFill)&&1<d&&(h=Math.min(a[0].x1,
a[d-1].x1),g=Math.min(a[0].y1,a[d-1].y1),this.getGroup().createRect({x:h,y:g,width:Math.max(a[0].x2,a[d-1].x2)-h,height:Math.max(a[0].y2,a[d-1].y2)-g}).setFill(b).moveToBack())},_renderIndicator:function(b,c,e,a,d,h,z,F){var m=this.chart.theme,g=this.chart.getCoords(),k=this.opt.vertical,u=this.getGroup().createGroup(),f={};f[e]=k?b:0;f[a]=k?0:b;E("dojo-bidi")&&(f.x=this._getMarkX(f.x));var f=this.toPage(f),l=k?f.x>=d.x&&f.x<=h.x:f.y>=h.y&&f.y<=d.y,r=f.x-g.x,G=f.y-g.y,n=k?r:d.x-g.x,v=k?d.y-g.y:G,
B=k?n:h.x-g.x,x=k?h.y-g.y:v;if(this.opt.lines&&l){var q=this.opt.hasOwnProperty("lineShadow")?this.opt.lineShadow:m.indicator.lineShadow,y=this.opt.hasOwnProperty("lineStroke")?this.opt.lineStroke:m.indicator.lineStroke,p=this.opt.hasOwnProperty("lineOutline")?this.opt.lineOutline:m.indicator.lineOutline;q&&u.createLine({x1:n+q.dx,y1:v+q.dy,x2:B+q.dx,y2:x+q.dy}).setStroke(q);p&&(p=w.makeStroke(p),p.width=2*p.width+(y?y.width:0),u.createLine({x1:n,y1:v,x2:B,y2:x}).setStroke(p));u.createLine({x1:n,
y1:v,x2:B,y2:x}).setStroke(y)}var A;if(this.opt.markers&&l){var C=this._data[c],D=this;C&&(A=H.map(C,function(c,l){f[e]=k?b:c;f[a]=k?c:b;E("dojo-bidi")&&(f.x=D._getMarkX(f.x));f=this.toPage(f);if(k?f.y<=d.y&&f.y>=h.y:f.x>=d.x&&f.x<=h.x){r=f.x-g.x;G=f.y-g.y;l=this.opt.markerSymbol?this.opt.markerSymbol:m.indicator.markerSymbol;var n="M"+r+" "+G+" "+l;q=void 0!=this.opt.markerShadow?this.opt.markerShadow:m.indicator.markerShadow;y=void 0!=this.opt.markerStroke?this.opt.markerStroke:m.indicator.markerStroke;
p=void 0!=this.opt.markerOutline?this.opt.markerOutline:m.indicator.markerOutline;q&&u.createPath("M"+(r+q.dx)+" "+(G+q.dy)+" "+l).setFill(q.color).setStroke(q);p&&(p=w.makeStroke(p),p.width=2*p.width+(y?y.width:0),u.createPath(n).setStroke(p));l=u.createPath(n);n=this._shapeFill(void 0!=this.opt.markerFill?this.opt.markerFill:m.indicator.markerFill,l.getBoundingBox());l.setFill(n).setStroke(y)}return c},this))}C=this.opt.start?{x:n,y:k?v:x}:{x:k?n:B,y:k?x:v};this.opt.labels&&"trend"!=this.opt.labels&&
l&&(this.opt.labelFunc?l=this.opt.labelFunc(c,this.opt.values,this._data,this.opt.fixed,this.opt.precision,this.opt.labels):"markers"==this.opt.labels?(l=H.map(A,function(a){return w.getLabel(a,this.opt.fixed,this.opt.precision)},this),l=1!=l.length?"[ "+l.join(", ")+" ]":l[0]):l=w.getLabel(b,this.opt.fixed,this.opt.precision),this._renderText(u,l,m,C.x,C.y,c,this.opt.values,this._data));z&&this._connectEvents({element:"indicator",run:this.run?this.run[c]:void 0,shape:u,value:b});F&&this._animateIndicator(u,
k,k?v:n,k?v+x:n+B,F);return t.mixin(C,{x1:n,y1:v,x2:B,y2:x})},_animateIndicator:function(b,c,e,a,d){L.animateTransform(t.delegate({shape:b,duration:1200,transform:[{name:"translate",start:c?[0,e]:[e,0],end:[0,0]},{name:"scale",start:c?[1,1/a]:[1/a,1],end:[1,1]},{name:"original"}]},d)).play()},clear:function(){this.inherited(arguments);this._data=[]},addSeries:function(b){this.inherited(arguments);this._data.push(b.data)},_renderText:function(b,c,e,a,d,h,r,t){this.opt.offset&&(a+=this.opt.offset.x,
d+=this.opt.offset.y);c=K.createText.gfx(this.chart,b,a,d,this.opt.vertical?"middle":this.opt.start?"start":"end",c,this.opt.font?this.opt.font:e.indicator.font,this.opt.fontColor?this.opt.fontColor:e.indicator.fontColor);a=N(c,c.getShape().text);this.opt.vertical&&!this.opt.start&&(a.y+=a.height/2,c.setShape({y:d+a.height/2}));a.x-=2;--a.y;a.width+=4;a.height+=2;a.r=this.opt.radius?this.opt.radius:e.indicator.radius;var m=void 0!=this.opt.shadow?this.opt.shadow:e.indicator.shadow;d=void 0!=this.opt.stroke?
this.opt.stroke:e.indicator.stroke;var g=void 0!=this.opt.outline?this.opt.outline:e.indicator.outline;m&&b.createRect(a).setFill(m.color).setStroke(m);g&&(g=w.makeStroke(g),g.width=2*g.width+(d?d.width:0),b.createRect(a).setStroke(g));e=this.opt.fillFunc?this.opt.fillFunc(h,r,t):void 0!=this.opt.fill?this.opt.fill:e.indicator.fill;b.createRect(a).setFill(this._shapeFill(e,a)).setStroke(d);c.moveToFront()},getSeriesStats:function(){return t.delegate(w.defaultStats)}});E("dojo-bidi")&&z.extend({_getMarkX:function(b){return this.chart.isRightToLeft()?
this.chart.axes.x.scaler.bounds.to+this.chart.axes.x.scaler.bounds.from-b:b}});return z});