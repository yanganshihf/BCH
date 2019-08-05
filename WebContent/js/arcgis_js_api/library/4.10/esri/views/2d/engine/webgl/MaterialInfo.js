// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ./enums ./MaterialInfoUtils ./MaterialInfoUtils_updateMaterialVariations ./MaterialKeyInfo ./util/serializationUtils".split(" "),function(n,h,d,p,r,k,l){Object.defineProperty(h,"__esModule",{value:!0});var m=function(){function c(b,c,e){this.unit=b;this.pageId=c;this.semantic=e}c.prototype.clone=function(){return new c(this.unit,this.pageId,this.semantic)};c.prototype.serialize=function(b){b.push(this.unit);b.push(this.pageId);return b};c.deserialize=function(b){var g=b.readInt32();
b=b.readInt32();return new c(g,b,"u_texture")};return c}();h.TexBindingInfo=m;var q=function(){function c(b,c){this.name=b;this.value=c}c.prototype.clone=function(){return new c(this.name,this.value)};c.prototype.serialize=function(b){b.push(this.value);return b};c.deserialize=function(b){b=b.readInt32();return new c("u_my_param",b)};return c}();h.MaterialParam=q;n=function(){function c(){this.texBindingInfo=[];this.materialParams=[]}c.fromSprite=function(b,g,e){var f=new c,a=new k;a.geometryType=
g;b?(a.sdf=b.sdf,a.pattern=!0,a.simplePattern=b.simplePattern,f.texBindingInfo.push(new m(1,b.page,"u_texture"))):(a.sdf=!1,a.pattern=!1,a.simplePattern=!1);0===e?a.vvOpacity=a.vvSizeMinMaxValue=a.vvSizeScaleStops=a.vvSizeFieldStops=a.vvSizeUnitValue=a.vvColor=a.vvRotation=!1:(a.vvOpacity=0!==(e&d.WGLVVFlag.OPACITY),a.vvSizeMinMaxValue=0!==(e&d.WGLVVFlag.SIZE_MINMAX_VALUE),a.vvSizeScaleStops=0!==(e&d.WGLVVFlag.SIZE_SCALE_STOPS),a.vvSizeFieldStops=0!==(e&d.WGLVVFlag.SIZE_FIELD_STOPS),a.vvSizeUnitValue=
0!==(e&d.WGLVVFlag.SIZE_UNIT_VALUE),a.vvColor=0!==(e&d.WGLVVFlag.COLOR),a.vvRotation=0!==(e&d.WGLVVFlag.ROTATION));a.visibility=!1;f.materialKey=p.getMaterialKey(a);f.materialKeyInfo=a;return f};c.fromGlyph=function(b,g,e){var f=new c,a=new k;a.geometryType=g;a.sdf=!0;a.pattern=!1;a.visibility=!1;a.simplePattern=!1;f.texBindingInfo.push(new m(2,b.page,"u_texture"));0===e?a.vvOpacity=a.vvSizeMinMaxValue=a.vvSizeScaleStops=a.vvSizeFieldStops=a.vvSizeUnitValue=a.vvColor=a.vvRotation=!1:(a.vvOpacity=
0!==(e&d.WGLVVFlag.OPACITY),a.vvSizeMinMaxValue=0!==(e&d.WGLVVFlag.SIZE_MINMAX_VALUE),a.vvSizeScaleStops=0!==(e&d.WGLVVFlag.SIZE_SCALE_STOPS),a.vvSizeFieldStops=0!==(e&d.WGLVVFlag.SIZE_FIELD_STOPS),a.vvSizeUnitValue=0!==(e&d.WGLVVFlag.SIZE_UNIT_VALUE),a.vvColor=0!==(e&d.WGLVVFlag.COLOR),a.vvRotation=0!==(e&d.WGLVVFlag.ROTATION));f.materialKey=p.getMaterialKey(a);f.materialKeyInfo=a;return f};c.prototype.copy=function(b){this.materialParams=b.materialParams.map(function(b){return b.clone()});this.texBindingInfo=
b.texBindingInfo.map(function(b){return b.clone()});b.materialKeyInfo&&(this.materialKeyInfo=new k,this.materialKeyInfo.copy(b.materialKeyInfo));this.materialKey=b.materialKey};c.prototype.serialize=function(b){b.push(this.materialKey);l.serializeList(b,this.texBindingInfo);l.serializeList(b,this.materialParams);return b};c.deserialize=function(b){var d=new c;d.materialKey=b.readInt32();d.texBindingInfo=l.deserializeList(b,m);d.materialParams=l.deserializeList(b,q);d.materialKeyInfo=new k;r(d.materialKeyInfo,
d.materialKey);return d};return c}();h.default=n});