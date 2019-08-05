// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../../PooledArray","../quickselect/quickselect"],function(z,A,v,I){function n(b,a){t(b,0,b.children.length,a,b)}function t(b,a,d,c,e){e||(e=q(null,!0));e.minX=Infinity;e.minY=Infinity;e.maxX=-Infinity;e.maxY=-Infinity;for(var f=void 0;a<d;a++)f=b.children[a],u(e,b.leaf?c(f):f);return e}function u(b,a){b.minX=Math.min(b.minX,a.minX);b.minY=Math.min(b.minY,a.minY);b.maxX=Math.max(b.maxX,a.maxX);b.maxY=Math.max(b.maxY,a.maxY);return b}function F(b,a){return b.minX-a.minX}
function G(b,a){return b.minY-a.minY}function B(b){return(b.maxX-b.minX)*(b.maxY-b.minY)}function w(b){return b.maxX-b.minX+(b.maxY-b.minY)}function C(b,a){return b.minX<=a.minX&&b.minY<=a.minY&&a.maxX<=b.maxX&&a.maxY<=b.maxY}function x(b,a){return a.minX<=b.maxX&&a.minY<=b.maxY&&a.maxX>=b.minX&&a.maxY>=b.minY}function q(b,a){return{children:b,height:1,leaf:a,minX:Infinity,minY:Infinity,maxX:-Infinity,maxY:-Infinity}}function H(b,a,d,c,e){for(var f=[a,d];f.length;)if(d=f.pop(),a=f.pop(),!(d-a<=c)){var l=
a+Math.ceil((d-a)/c/2)*c;I(b,l,a,d,e);f.push(a,l,l,d)}}Object.defineProperty(A,"__esModule",{value:!0});z=function(){function b(a,d){void 0===a&&(a=9);this.compareMinX=F;this.compareMinY=G;this.toBBox=function(a){return a};this._maxEntries=Math.max(4,a||9);this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries));d&&("function"===typeof d?this.toBBox=d:this._initFormat(d));this.clear()}b.prototype.all=function(a){this._all(this.data,a)};b.prototype.search=function(a,d){var c=this.data,b=this.toBBox;
if(x(a,c))for(r.clear();c;){for(var f=0,l=c.children.length;f<l;f++){var g=c.children[f],h=c.leaf?b(g):g;x(a,h)&&(c.leaf?d(g):C(a,h)?this._all(g,d):r.push(g))}c=r.pop()}};b.prototype.collides=function(a){var d=this.data,c=this.toBBox;if(!x(a,d))return!1;for(r.clear();d;){for(var b=0,f=d.children.length;b<f;b++){var l=d.children[b],g=d.leaf?c(l):l;if(x(a,g)){if(d.leaf||C(a,g))return!0;r.push(l)}}d=r.pop()}return!1};b.prototype.load=function(a,d){void 0===d&&(d=a.length);if(!d)return this;if(d<this._minEntries){for(var c=
0;c<d;c++)this.insert(a[c]);return this}a=this._build(a.slice(0,d),0,d-1,0);this.data.children.length?this.data.height===a.height?this._splitRoot(this.data,a):(this.data.height<a.height&&(c=this.data,this.data=a,a=c),this._insert(a,this.data.height-a.height-1,!0)):this.data=a;return this};b.prototype.insert=function(a){a&&this._insert(a,this.data.height-1);return this};b.prototype.clear=function(){this.data=q([],!0);return this};b.prototype.remove=function(a,d){if(!a)return this;var c=this.data,b,
f,l,g,h=this.toBBox(a);k.clear();for(D.clear();c||k.length;){c||(c=k.pop(),b=k.data[k.length-1],f=D.pop(),l=!0);if(c.leaf){a:{g=a;var m=c.children,p=d;if(p){for(var y=0;y<m.length;y++)if(p(g,m[y])){g=y;break a}g=-1}else g=m.indexOf(g)}if(-1!==g){c.children.splice(g,1);k.push(c);this._condense(k);break}}l||c.leaf||!C(c,h)?b?(f++,c=b.children[f],l=!1):c=null:(k.push(c),D.push(f),f=0,b=c,c=c.children[0])}return this};b.prototype.toJSON=function(){return this.data};b.prototype.fromJSON=function(a){this.data=
a;return this};b.prototype._all=function(a,d){for(E.clear();a;){if(!0===a.leaf){var c=0;for(a=a.children;c<a.length;c++)d(a[c])}else E.pushArray(a.children);a=E.pop()}};b.prototype._build=function(a,d,c,b){var f=c-d+1,e=this._maxEntries,g;if(f<=e)return g=q(a.slice(d,c+1),!0),n(g,this.toBBox),g;b||(b=Math.ceil(Math.log(f)/Math.log(e)),e=Math.ceil(f/Math.pow(e,b-1)));g=q([],!1);g.height=b;f=Math.ceil(f/e);e=f*Math.ceil(Math.sqrt(e));for(H(a,d,c,e,this.compareMinX);d<=c;d+=e){var h=Math.min(d+e-1,c);
H(a,d,h,f,this.compareMinY);for(var m=d;m<=h;m+=f)g.children.push(this._build(a,m,Math.min(m+f-1,h),b-1))}n(g,this.toBBox);return g};b.prototype._chooseSubtree=function(a,d,b,e){for(;;){e.push(d);if(!0===d.leaf||e.length-1===b)break;for(var c=Infinity,l=Infinity,g=void 0,h=0,m=d.children.length;h<m;h++){var p=d.children[h],k=B(p),n=(Math.max(p.maxX,a.maxX)-Math.min(p.minX,a.minX))*(Math.max(p.maxY,a.maxY)-Math.min(p.minY,a.minY))-k;n<l?(l=n,c=k<c?k:c,g=p):n===l&&k<c&&(c=k,g=p)}d=g||d.children[0]}return d};
b.prototype._insert=function(a,d,c){var b=this.toBBox;c=c?a:b(a);k.clear();b=this._chooseSubtree(c,this.data,d,k);b.children.push(a);for(u(b,c);0<=d;)if(k.data[d].children.length>this._maxEntries)this._split(k,d),d--;else break;this._adjustParentBBoxes(c,k,d)};b.prototype._split=function(a,d){var b=a.data[d],e=b.children.length,f=this._minEntries;this._chooseSplitAxis(b,f,e);e=this._chooseSplitIndex(b,f,e);e=q(b.children.splice(e,b.children.length-e),b.leaf);e.height=b.height;n(b,this.toBBox);n(e,
this.toBBox);d?a.data[d-1].children.push(e):this._splitRoot(b,e)};b.prototype._splitRoot=function(a,b){this.data=q([a,b],!1);this.data.height=a.height+1;n(this.data,this.toBBox)};b.prototype._chooseSplitIndex=function(a,b,c){var d,f,l;d=f=Infinity;for(var g=b;g<=c-b;g++){var h=t(a,0,g,this.toBBox),m=t(a,g,c,this.toBBox),k;k=Math.max(0,Math.min(h.maxX,m.maxX)-Math.max(h.minX,m.minX))*Math.max(0,Math.min(h.maxY,m.maxY)-Math.max(h.minY,m.minY));h=B(h)+B(m);k<d?(d=k,l=g,f=h<f?h:f):k===d&&h<f&&(f=h,l=
g)}return l};b.prototype._chooseSplitAxis=function(a,b,c){var d=a.leaf?this.compareMinX:F,f=a.leaf?this.compareMinY:G,l=this._allDistMargin(a,b,c,d);b=this._allDistMargin(a,b,c,f);l<b&&a.children.sort(d)};b.prototype._allDistMargin=function(a,b,c,e){a.children.sort(e);e=this.toBBox;for(var d=t(a,0,b,e),l=t(a,c-b,c,e),g=w(d)+w(l),h=b;h<c-b;h++){var k=a.children[h];u(d,a.leaf?e(k):k);g+=w(d)}for(h=c-b-1;h>=b;h--)k=a.children[h],u(l,a.leaf?e(k):k),g+=w(l);return g};b.prototype._adjustParentBBoxes=function(a,
b,c){for(;0<=c;c--)u(b.data[c],a)};b.prototype._condense=function(a){for(var b=a.length-1,c=void 0;0<=b;b--)0===a.data[b].children.length?0<b?(c=a.data[b-1].children,c.splice(c.indexOf(a.data[b]),1)):this.clear():n(a.data[b],this.toBBox)};b.prototype._initFormat=function(a){var b=["return a"," - b",";"];this.compareMinX=new Function("a","b",b.join(a[0]));this.compareMinY=new Function("a","b",b.join(a[1]));this.toBBox=new Function("a","return {minX: a"+a[0]+", minY: a"+a[1]+", maxX: a"+a[2]+", maxY: a"+
a[3]+"};")};return b}();A.PooledRBush=z;var r=new v,E=new v,k=new v,D=new v({deallocator:null});A.default=z});