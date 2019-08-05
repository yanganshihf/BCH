// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","./MaterialUtil","../../shaders/MiscPrograms"],function(f,g,c,e){return function(){function b(a,b,c,d){void 0===d&&(d=4);this.program=a.getProgram(e.simple);this.color=b;this.depthFunc=c;this.drawMode=d}b.prototype.beginSlot=function(a){return 1===a};b.prototype.getProgram=function(){return this.program};b.prototype.bind=function(a,b){a.bindProgram(this.program);this.program.setUniformMatrix4fv("model",c.IDENTITY);this.program.setUniformMatrix4fv("proj",b.proj);this.program.setUniform4fv("color",
this.color);a.setBlendingEnabled(!0);a.setBlendFunctionSeparate(a.gl.SRC_ALPHA,a.gl.ONE_MINUS_SRC_ALPHA,a.gl.ONE,a.gl.ONE_MINUS_SRC_ALPHA);a.setDepthTestEnabled(!0);void 0!==this.depthFunc&&a.setDepthFunction(this.depthFunc)};b.prototype.release=function(a){void 0!==this.depthFunc&&a.setDepthFunction(513);a.setBlendingEnabled(!1)};b.prototype.bindView=function(a,b){c.bindView(b.origin,b.view,this.program)};b.prototype.bindInstance=function(a,b){this.program.setUniformMatrix4fv("model",b.transformation)};
b.prototype.getDrawMode=function(a){return this.drawMode};return b}()});