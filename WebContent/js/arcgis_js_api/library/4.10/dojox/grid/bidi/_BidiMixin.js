//>>built
define("../../main dojo/_base/lang ../_Builder dijit/_BidiSupport ../_Grid ../cells/_base ../cells/dijit".split(" "),function(g,c,h,f,m,k,l){c.extend(m,{setCellNodeTextDirection:function(a,b,d){this.getCell(a).getNode(b).style.direction=d||""},getCellNodeTextDirection:function(a,b){return this.getCell(a).getNode(b).style.direction},_setTextDirAttr:function(a){this.textDir=a;this.render()}});c.extend(h._ContentBuilder,{_getTextDirStyle:function(a,b,d){var e=this.grid.getItem(d);"auto"===a&&(b=b.get?
b.get(d,e):b.value||b.defaultValue)&&(a=f.prototype._checkContextual(b));return" direction:"+a+";"}});c.extend(h._HeaderBuilder,{_getTextDirStyle:function(a,b,d){"auto"===a&&(b=d||b.name||b.grid.getCellName(b))&&(a=f.prototype._checkContextual(b));return" direction:"+a+"; "}});c.extend(k.Cell,{LRE:"\u202a",RLE:"\u202b",PDF:"\u202c",KEY_HANDLER:'onkeyup\x3d\' javascript:(function(){var target; if (event.target) target \x3d event.target; else if (event.srcElement) target \x3d event.srcElement; if(!target) return;var regExMatch \x3d /[A-Za-z\u05d0-\u065f\u066a-\u06ef\u06fa-\u07ff\ufb1d-\ufdff\ufe70-\ufefc]/.exec(target.value);target.dir \x3d regExMatch ? ( regExMatch[0] \x3c\x3d "z" ? "ltr" : "rtl" ) : target.dir ? target.dir : "ltr"; })();\'',
_getTextDirMarkup:function(a){var b="",d=this.textDir||this.grid.textDir;d&&("auto"===d&&(b=this.KEY_HANDLER,d=f.prototype._checkContextual(a)),b+=" dir\x3d'"+d+"'; ");return b},formatEditing:function(a,b){this.needFormatNode(a,b);return'\x3cinput class\x3d"dojoxGridInput" '+this._getTextDirMarkup(a)+' type\x3d"text" value\x3d"'+a+'"\x3e'},_enforceTextDirWithUcc:function(a,b){a="auto"===a?f.prototype._checkContextual(b):a;return("rtl"===a?this.RLE:this.LRE)+b+this.PDF}});c.extend(k.Select,{_getValueCallOrig:g.grid.cells.Select.prototype.getValue,
getValue:function(a){(a=this._getValueCallOrig(a))&&(this.textDir||this.grid.textDir)&&(a=a.replace(/\u202A|\u202B|\u202C/g,""));return a},formatEditing:function(a,b){this.needFormatNode(a,b);b=['\x3cselect dir \x3d "'+(this.grid.isLeftToRight()?"ltr":"rtl")+'" class\x3d"dojoxGridSelect"\x3e'];for(var d=0,e,c;void 0!==(e=this.options[d])&&void 0!==(c=this.values[d]);d++){c=c.replace?c.replace(/&/g,"\x26amp;").replace(/</g,"\x26lt;"):c;e=e.replace?e.replace(/&/g,"\x26amp;").replace(/</g,"\x26lt;"):
e;if(this.textDir||this.grid.textDir)e=this._enforceTextDirWithUcc(this.textDir||this.grid.textDir,e);b.push("\x3coption",a==c?" selected":"",' value \x3d "'+c+'"',"\x3e",e,"\x3c/option\x3e")}b.push("\x3c/select\x3e");return b.join("")}});c.extend(l.ComboBox,{getWidgetPropsCallOrig:g.grid.cells.ComboBox.prototype.getWidgetProps,getWidgetProps:function(a){a=this.getWidgetPropsCallOrig(a);if(this.textDir||this.grid.textDir)a.textDir=this.textDir||this.grid.textDir;return a}});c.extend(l._Widget,{getWidgetPropsCallOrig:g.grid.cells._Widget.prototype.getWidgetProps,
getWidgetProps:function(a){a=this.getWidgetPropsCallOrig(a);if(this.textDir||this.grid.textDir)a.textDir=this.textDir||this.grid.textDir;return a}})});