//>>built
define(["dojo/_base/lang","../util/oo","./_Base","../manager/_registry"],function(c,b,d,e){b=b.declare(d,function(a){},{type:"dojox.drawing.stencil.Line",anchorType:"single",baseRender:!0,dataToPoints:function(a){a=a||this.data;if(a.radius||a.angle){var b=this.util.pointOnCircle(a.x,a.y,a.radius,a.angle);this.data=a={x1:a.x,y1:a.y,x2:b.x,y2:b.y}}return this.points=[{x:a.x1,y:a.y1},{x:a.x2,y:a.y2}]},pointsToData:function(a){a=a||this.points;return this.data={x1:a[0].x,y1:a[0].y,x2:a[1].x,y2:a[1].y}},
_create:function(a,b,c){this.remove(this[a]);this[a]=this.container.createLine(b).setStroke(c);this._setNodeAtts(this[a])},render:function(){this.onBeforeRender(this);this.renderHit&&this._create("hit",this.data,this.style.currentHit);this._create("shape",this.data,this.style.current)}});c.setObject("dojox.drawing.stencil.Line",b);e.register({name:"dojox.drawing.stencil.Line"},"stencil");return b});