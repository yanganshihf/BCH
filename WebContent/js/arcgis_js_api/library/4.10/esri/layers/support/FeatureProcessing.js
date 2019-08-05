// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/Accessor ../../core/lang ../../core/accessorSupport/decorators ./Field ./fieldUtils".split(" "),function(n,p,h,d,k,l,c,g,m){return function(f){function a(){return null!==f&&f.apply(this,arguments)||this}h(a,f);e=a;a.fromWorker=function(b){if(!b)return null;b=JSON.parse(b);var a=new e;a.fields=b.fields&&b.fields.map(function(a){return g.fromJSON(a)});a.options=b.options;a.process=new (Function.bind.apply(Function,
[void 0].concat(b.process.args,[b.process.body])));return a};Object.defineProperty(a.prototype,"version",{get:function(){return(this._get("version")||0)+1},enumerable:!0,configurable:!0});a.prototype.clone=function(){return new e(l.clone({fields:this.fields,options:this.options,process:this.process}))};a.prototype.getField=function(a){return m.getField(a,this.fields)};a.prototype.refresh=function(){this.notifyChange("version")};a.prototype.toWorker=function(){var a=this.process.toString();return JSON.stringify({fields:this.fields,
options:this.options,process:{body:a.substring(a.indexOf("{")+1,a.lastIndexOf("}")),args:a.slice(a.indexOf("(")+1,a.indexOf(")")).match(/([^\s,]+)/g)}})};var e;d([c.property({type:[g]})],a.prototype,"fields",void 0);d([c.property()],a.prototype,"options",void 0);d([c.property()],a.prototype,"process",void 0);d([c.property({readOnly:!0,dependsOn:["process","options","fields"]})],a.prototype,"version",null);return a=e=d([c.subclass("esri.layers.support.FeatureProcessing")],a)}(c.declared(k))});