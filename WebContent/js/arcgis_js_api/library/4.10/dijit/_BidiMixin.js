//>>built
define([],function(){return{getTextDir:function(a){return"auto"==this.textDir?this._checkContextual(a):this.textDir},_checkContextual:function(a){return(a=/[A-Za-z\u05d0-\u065f\u066a-\u06ef\u06fa-\u07ff\ufb1d-\ufdff\ufe70-\ufefc]/.exec(a))?"z">=a[0]?"ltr":"rtl":this.dir?this.dir:this.isLeftToRight()?"ltr":"rtl"},applyTextDir:function(a,b){if(this.textDir){var c=this.textDir;"auto"==c&&("undefined"===typeof b&&(b=a.tagName.toLowerCase(),b="input"==b||"textarea"==b?a.value:a.innerText||a.textContent||
""),c=this._checkContextual(b));a.dir!=c&&(a.dir=c)}},enforceTextDirWithUcc:function(a,b){return this.textDir?(a&&(a.originalText=b),("ltr"==("auto"==this.textDir?this._checkContextual(b):this.textDir)?"\u202a":"\u202b")+b+"\u202c"):b},restoreOriginalText:function(a){a.originalText&&(a.text=a.originalText,delete a.originalText);return a},_setTextDirAttr:function(a){this._created&&this.textDir==a||(this._set("textDir",a),a=null,this.displayNode?(a=this.displayNode,this.displayNode.align="rtl"==this.dir?
"right":"left"):a=this.textDirNode||this.focusNode||this.textbox,a&&this.applyTextDir(a))}}});