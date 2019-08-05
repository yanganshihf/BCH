//>>built
define(["dojo/_base/kernel","dojo/_base/declare","dojo/_base/array","dojo/dom-geometry","dojox/mdnd/AreaManager"],function(k,l,m,h,n){k=l("dojox.mdnd.dropMode.DefaultDropMode",null,{_oldXPoint:null,_oldYPoint:null,_oldBehaviour:"up",addArea:function(a,d){var b=a.length,c=h.position(d.node,!0);d.coords={x:c.x,y:c.y};if(0==b)a.push(d);else{for(var e=d.coords.x,c=0;c<b;c++)if(e<a[c].coords.x){for(e=b-1;e>=c;e--)a[e+1]=a[e];a[c]=d;break}c==b&&a.push(d)}return a},updateAreas:function(a){var d=a.length;
if(1<d)for(var b,c,e=0;e<d;e++){var f=a[e];f.coords.x1=-1;f.coords.x2=-1;0==e?(c=a[e+1],this._updateArea(f),this._updateArea(c),b=f.coords.x+f.node.offsetWidth,c=c.coords.x,f.coords.x2=b+(c-b)/2):e==d-1?f.coords.x1=a[e-1].coords.x2:(c=a[e+1],this._updateArea(c),b=f.coords.x+f.node.offsetWidth,c=c.coords.x,f.coords.x1=a[e-1].coords.x2,f.coords.x2=b+(c-b)/2)}},_updateArea:function(a){var d=h.position(a.node,!0);a.coords.x=d.x;a.coords.y=d.y},initItems:function(a){m.forEach(a.items,function(a){var b=
h.position(a.item.node,!0);a.y=b.y+b.h/2});a.initItems=!0},refreshItems:function(a,d,b,c){if(-1!=d&&a&&b&&b.h){b=b.h;a.margin&&(b+=a.margin.t);for(var e=a.items.length;d<e;d++){var f=a.items[d];f.y=c?f.y+b:f.y-b}}},getDragPoint:function(a,d,b){b=a.y;this._oldYPoint&&(b>this._oldYPoint?(this._oldBehaviour="down",b+=d.h):b<=this._oldYPoint&&(this._oldBehaviour="up"));this._oldYPoint=b;return{x:a.x+d.w/2,y:b}},getTargetArea:function(a,d,b){var c=0,e=d.x,f=a.length;if(1<f){var g=0,k="right",h=!1;-1==
b||3>arguments.length?h=!0:this._checkInterval(a,b,e)?c=b:(this._oldXPoint<e?g=b+1:(g=b-1,f=0,k="left"),h=!0);if(h)if("right"===k)for(;g<f;g++){if(this._checkInterval(a,g,e)){c=g;break}}else for(;g>=f;g--)if(this._checkInterval(a,g,e)){c=g;break}}this._oldXPoint=e;return c},_checkInterval:function(a,d,b){a=a[d].coords;if(-1==a.x1){if(b<=a.x2)return!0}else if(-1==a.x2){if(b>a.x1)return!0}else if(a.x1<b&&b<=a.x2)return!0;return!1},getDropIndex:function(a,d){var b=a.items.length;d=d.y;if(0<b)for(var c=
0;c<b;c++){if(d<a.items[c].y)return c;if(c==b-1)break}return-1},destroy:function(){}});n.areaManager()._dropMode=new k;return k});