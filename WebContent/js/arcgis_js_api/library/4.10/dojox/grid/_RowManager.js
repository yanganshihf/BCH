//>>built
define(["dojo/_base/declare","dojo/_base/lang","dojo/dom-class"],function(e,f,g){return e("dojox.grid._RowManager",null,{constructor:function(a){this.grid=a},linesToEms:2,overRow:-2,prepareStylingRow:function(a,b){return{index:a,node:b,odd:!!(a&1),selected:!!this.grid.selection.isSelected(a),over:this.isOver(a),customStyles:"",customClasses:"dojoxGridRow"}},styleRowNode:function(a,b){a=this.prepareStylingRow(a,b);this.grid.onStyleRow(a);this.applyStyles(a)},applyStyles:function(a){a.node.className=
a.customClasses;var b=a.node.style.height,c=a.node,d=a.customStyles+";"+(a.node._style||"");void 0==c.style.cssText?c.setAttribute("style",d):c.style.cssText=d;a.node.style.height=b},updateStyles:function(a){this.grid.updateRowStyles(a)},setOverRow:function(a){var b=this.overRow;this.overRow=a;b!=this.overRow&&(f.isString(b)||0<=b)&&this.updateStyles(b);this.updateStyles(this.overRow)},isOver:function(a){return this.overRow==a&&!g.contains(this.grid.domNode,"dojoxGridColumnResizing")}})});