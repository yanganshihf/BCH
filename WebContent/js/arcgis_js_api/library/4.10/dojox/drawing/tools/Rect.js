//>>built
define(["dojo/_base/lang","../util/oo","../manager/_registry","../stencil/Rect"],function(f,c,g,h){c=c.declare(h,function(){},{draws:!0,onDrag:function(a){var b=a.start,d=b.x<a.x?b.x:a.x,e=b.y<a.y?b.y:a.y,c=b.x<a.x?a.x-b.x:b.x-a.x;a=b.y<a.y?a.y-b.y:b.y-a.y;this.keys.shift&&(c=a=Math.max(c,a));this.keys.alt&&(d-=c,e-=a,c*=2,a*=2,d=Math.max(d,0),e=Math.max(e,0));this.setPoints([{x:d,y:e},{x:d+c,y:e},{x:d+c,y:e+a},{x:d,y:e+a}]);this.render()},onUp:function(a){if(!this.created&&this._downOnCanvas){this._downOnCanvas=
!1;if(this.shape){if(a=this.data,a.width<this.minimumSize&&a.height<this.minimumSize){this.remove(this.shape,this.hit);return}}else{a=a.start;var b=4*this.minimumSize;this.setPoints([{x:a.x,y:a.y},{x:a.x+b,y:a.y},{x:a.x+b,y:a.y+b},{x:a.x,y:a.y+b}]);this.render()}this.onRender(this)}}});f.setObject("dojox.drawing.tools.Rect",c);c.setup={name:"dojox.drawing.tools.Rect",tooltip:'\x3cspan class\x3d"drawingTipTitle"\x3eRectangle Tool\x3c/span\x3e\x3cbr/\x3e\x3cspan class\x3d"drawingTipDesc"\x3eSHIFT - constrain to square\x3c/span\x3e',
iconClass:"iconRect"};g.register(c.setup,"tool");return c});