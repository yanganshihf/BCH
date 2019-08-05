// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ./Domain".split(" "),function(l,m,h,e,c,k){return function(g){function a(b){b=g.call(this,b)||this;b.maxValue=null;b.minValue=null;b.type="range";return b}h(a,g);f=a;a.prototype.clone=function(){return new f({maxValue:this.maxValue,minValue:this.minValue,name:this.name})};var f;e([c.property({json:{read:{source:"range",reader:function(b,d){return d.range&&d.range[1]}},
write:{target:"range",writer:function(b,d,a){d[a]=[this.minValue,b]}}}})],a.prototype,"maxValue",void 0);e([c.property({json:{read:{source:"range",reader:function(b,a){return a.range&&a.range[0]}},write:{target:"range",writer:function(a,d,c){d[c]=[a,this.maxValue]}}}})],a.prototype,"minValue",void 0);e([c.enumeration.serializable()({range:"range"})],a.prototype,"type",void 0);return a=f=e([c.subclass("esri.layers.support.RangeDomain")],a)}(c.declared(k))});