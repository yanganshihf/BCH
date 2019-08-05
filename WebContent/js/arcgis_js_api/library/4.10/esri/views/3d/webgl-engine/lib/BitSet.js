// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(f,g){return function(){function e(){this.bitsPerWord=32;this.addressBitsPerWord=5;this._store=[]}e.prototype.clone=function(){var b=new e;b._store=this._store.slice();return b};e.prototype.wordIndex=function(b){return b>>this.addressBitsPerWord};e.prototype.set=function(b){return this._store[this.wordIndex(b-1)]|=1<<b-1};e.prototype.clear=function(b){return this._store[this.wordIndex(b-1)]&=255^1<<b-1};e.prototype.clearAll=function(){for(var b=0;b<this._store.length;++b)this._store[b]=
0};e.prototype.get=function(b){return 0!==(this._store[this.wordIndex(b-1)]&1<<b-1)};e.prototype.length=function(){return 0===this.wordLength()?0:this.bitsPerWord*(this.wordLength()-1)+(this._store[this.wordLength()-1].toString(2).length+1)};e.prototype.wordLength=function(){for(var b,c=this._store.length,a=b=this._store.length-1;(0>=b?0>=a:0<=a)&&0===this._store[a];0>=b?a++:a--)c--;return c};e.prototype.store=function(){return this._store};e.prototype.cardinality=function(){for(var b=0,c=this.length(),
a=0;0<=c?a<=c:a>=c;0<=c?a++:a--)this.get(a)&&b++;return b};e.prototype.toString=function(){for(var b=[],c=this.length(),a=0;0<=c?a<=c:a>=c;0<=c?a++:a--)this.get(a)&&b.push(""+a);return"{"+b.join(",")+"}"};e.prototype.toBinaryString=function(){var b=this,c=function(a,b,c){for(;a.length<c;)a=b+a;return a};return 0<this.wordLength()?this._store.map(function(a){return c(a.toString(2),"0",b.bitsPerWord)}).join(""):c("","0",this.bitsPerWord)};e.prototype.or=function(b){if(this!==b){for(var c=Math.min(this.wordLength(),
b.wordLength()),a=c-1,d=0;0<=a?d<=a:d>=a;0<=a?d++:d--)this._store[d]|=b.store[d];c<b.wordLength()&&(this._store=this._store.concat(b._store.slice(c,b.wordLength())));return null}};e.prototype.and=function(b){if(this!==b){for(var c=this.wordLength(),a=b.wordLength(),d=c;c<=a?d<=a:d>=a;c<=a?d++:d--)this._store[d]=0;c=this.wordLength();for(d=0;0<=c?d<=c:d>=c;0<=c?d++:d--)this._store[d]&=b.store[d];return null}};e.prototype.andNot=function(b){for(var c=Math.min(this.wordLength(),b.wordLength())-1,a=0;0<=
c?a<=c:a>=c;0<=c?a++:a--)this._store[a]&=~b.store[a];return null};e.prototype.xor=function(b){if(this!==b){for(var c=this.wordLength(),a=0;0<=c?a<=c:a>=c;0<=c?a++:a--)this._store[a]^=b.store[a];return null}};return e}()});