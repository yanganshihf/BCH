//>>built
define(["dojo/_base/array","dojo/_base/lang","dojo/window","../place","../main"],function(h,f,k,g,e){var b={getViewport:function(){return k.getBox()}};b.placeOnScreen=g.at;b.placeOnScreenAroundElement=function(b,d,c,l){var a;if(f.isArray(c))a=c;else{a=[];for(var e in c)a.push({aroundCorner:e,corner:c[e]})}return g.around(b,d,a,!0,l)};b.placeOnScreenAroundNode=b.placeOnScreenAroundElement;b.placeOnScreenAroundRectangle=b.placeOnScreenAroundElement;b.getPopupAroundAlignment=function(b,d){var c={};h.forEach(b,
function(b){var a=d;switch(b){case "after":c[d?"BR":"BL"]=d?"BL":"BR";break;case "before":c[d?"BL":"BR"]=d?"BR":"BL";break;case "below-alt":a=!a;case "below":c[a?"BL":"BR"]=a?"TL":"TR";c[a?"BR":"BL"]=a?"TR":"TL";break;case "above-alt":a=!a;default:c[a?"TL":"TR"]=a?"BL":"BR",c[a?"TR":"TL"]=a?"BR":"BL"}});return c};f.mixin(e,b);return e});