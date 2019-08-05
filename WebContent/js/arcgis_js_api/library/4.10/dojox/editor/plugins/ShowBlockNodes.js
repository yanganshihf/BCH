//>>built
define("dojo dijit dojox dijit/_editor/_Plugin dijit/form/Button dijit/form/ToggleButton dojo/_base/connect dojo/_base/declare dojo/i18n dojo/i18n!dojox/editor/plugins/nls/ShowBlockNodes".split(" "),function(a,d,k,l){var h=a.declare("dojox.editor.plugins.ShowBlockNodes",l,{useDefaultCommand:!1,iconClassPrefix:"dijitAdditionalEditorIcon",_styled:!1,_initButton:function(){var b=a.i18n.getLocalization("dojox.editor.plugins","ShowBlockNodes");this.button=new d.form.ToggleButton({label:b.showBlockNodes,
showLabel:!1,iconClass:this.iconClassPrefix+" "+this.iconClassPrefix+"ShowBlockNodes",tabIndex:"-1",onChange:a.hitch(this,"_showBlocks")});this.editor.addKeyHandler(a.keys.F9,!0,!0,a.hitch(this,this.toggle))},updateState:function(){this.button.set("disabled",this.get("disabled"))},setEditor:function(b){this.editor=b;this._initButton()},toggle:function(){this.button.set("checked",!this.button.get("checked"))},_showBlocks:function(b){var g=this.editor.document;if(!this._styled)try{this._styled=!0;var e=
"";a.forEach("div p ul ol table h1 h2 h3 h4 h5 h6 pre dir center blockquote form fieldset address object pre hr ins noscript li map button dd dt".split(" "),function(b){e+="@media screen {\n\t.editorShowBlocks {TAG} {\n\t\tbackground-image: url({MODURL}/images/blockelems/{TAG}.gif);\n\t\tbackground-repeat: no-repeat;\n\t\tbackground-position: top left;\n\t\tborder-width: 1px;\n\t\tborder-style: dashed;\n\t\tborder-color: #D0D0D0;\n\t\tpadding-top: 15px;\n\t\tpadding-left: 15px;\n\t}\n}\n".replace(/\{TAG\}/gi,
b)});var c=a.moduleUrl(k._scopeName,"editor/plugins/resources").toString();if(!c.match(/^https?:\/\//i)&&!c.match(/^file:\/\//i)){var f;f="/"===c.charAt(0)?a.doc.location.protocol+"//"+a.doc.location.host:this._calcBaseUrl(a.global.location.href);"/"!==f[f.length-1]&&"/"!==c.charAt(0)&&(f+="/");c=f+c}e=e.replace(/\{MODURL\}/gi,c);if(a.isIE)g.createStyleSheet("").cssText=e;else{var d=g.createElement("style");d.appendChild(g.createTextNode(e));g.getElementsByTagName("head")[0].appendChild(d)}}catch(m){console.warn(m)}b?
a.addClass(this.editor.editNode,"editorShowBlocks"):a.removeClass(this.editor.editNode,"editorShowBlocks")},_calcBaseUrl:function(b){var a=null;null!==b&&(a=b.indexOf("?"),-1!=a&&(b=b.substring(0,a)),a=b.lastIndexOf("/"),a=0<a&&a<b.length?b.substring(0,a):b);return a}});a.subscribe(d._scopeName+".Editor.getPlugin",null,function(a){a.plugin||"showblocknodes"!==a.args.name.toLowerCase()||(a.plugin=new h)});return h});