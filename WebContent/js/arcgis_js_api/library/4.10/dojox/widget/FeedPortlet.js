//>>built
define(["dojo","dijit","dojox","dojo/require!dojox/widget/Portlet,dijit/Tooltip,dijit/form/TextBox,dijit/form/Button,dojox/data/GoogleFeedStore"],function(a,g,e){a.provide("dojox.widget.FeedPortlet");a.require("dojox.widget.Portlet");a.require("dijit.Tooltip");a.require("dijit.form.TextBox");a.require("dijit.form.Button");a.require("dojox.data.GoogleFeedStore");a.declare("dojox.widget.FeedPortlet",e.widget.Portlet,{local:!1,maxResults:5,url:"",openNew:!0,showFeedTitle:!0,postCreate:function(){this.inherited(arguments);
if(this.local&&!e.data.AtomReadStore)throw Error(this.declaredClass+": To use local feeds, you must include dojox.data.AtomReadStore on the page.");},onFeedError:function(){this.containerNode.innerHTML="Error accessing the feed."},addChild:function(a){this.inherited(arguments);var b=a.attr("feedPortletUrl");b&&this.set("url",b)},_getTitle:function(a){a=this.store.getValue(a,"title");return this.local?a.text:a},_getLink:function(a){a=this.store.getValue(a,"link");return this.local?a.href:a},_getContent:function(a){a=
this.store.getValue(a,"summary");if(!a)return null;this.local&&(a=a.text);a=a.split("\x3cscript").join("\x3c!--").split("\x3c/script\x3e").join("--\x3e");return a=a.split("\x3ciframe").join("\x3c!--").split("\x3c/iframe\x3e").join("--\x3e")},_setUrlAttr:function(a){this.url=a;this._started&&this.load()},startup:function(){if(!this.started&&!this._started){this.inherited(arguments);if(!this.url||""==this.url)throw Error(this.id+": A URL must be specified for the feed portlet");this.url&&""!=this.url&&
this.load()}},load:function(){this._resultList&&a.destroy(this._resultList);var b,d;this.local?(b=new e.data.AtomReadStore({url:this.url}),d={}):(b=new e.data.GoogleFeedStore,d={url:this.url});d={query:d,count:this.maxResults,onComplete:a.hitch(this,function(a){if(this.showFeedTitle&&b.getFeedValue){var c=this.store.getFeedValue("title");c&&this.set("title",c.text?c.text:c)}this.generateResults(a)}),onError:a.hitch(this,"onFeedError")};this.store=b;b.fetch(d)},generateResults:function(b){var d,c=
this._resultList=a.create("ul",{"class":"dojoxFeedPortletList"},this.containerNode);a.forEach(b,a.hitch(this,function(b){var h=a.create("li",{innerHTML:'\x3ca href\x3d"'+this._getLink(b)+'"'+(this.openNew?' target\x3d"_blank"':"")+"\x3e"+this._getTitle(b)+"\x3c/a\x3e"},c);a.connect(h,"onmouseover",a.hitch(this,function(e){d&&clearTimeout(d);d=setTimeout(a.hitch(this,function(){d=null;var f=this._getContent(b);f&&(f='\x3cdiv class\x3d"dojoxFeedPortletPreview"\x3e'+f+"\x3c/div\x3e",a.query("li",c).forEach(function(a){a!=
e.target&&g.hideTooltip(a)}),g.showTooltip(f,h.firstChild,!this.isLeftToRight()))}),500)}));a.connect(h,"onmouseout",function(){d&&(clearTimeout(d),d=null);g.hideTooltip(h.firstChild)})}));this.resize()}});a.declare("dojox.widget.ExpandableFeedPortlet",e.widget.FeedPortlet,{onlyOpenOne:!1,generateResults:function(b){var d=this._resultList=a.create("ul",{"class":"dojoxFeedPortletExpandableList"},this.containerNode);a.forEach(b,a.hitch(this,a.hitch(this,function(b){var c=a.create("li",{"class":"dojoxPortletItemCollapsed"},
d),f=a.create("div",{style:"width: 100%;"},c);a.create("div",{"class":"dojoxPortletItemSummary",innerHTML:this._getContent(b)},c);a.create("span",{"class":"dojoxPortletToggleIcon",innerHTML:"\x3cimg src\x3d'"+a.config.baseUrl+"/resources/blank.gif'\x3e"},f);b=a.create("a",{href:this._getLink(b),innerHTML:this._getTitle(b)},f);this.openNew&&a.attr(b,"target","_blank")})));a.connect(d,"onclick",a.hitch(this,function(b){if(a.hasClass(b.target,"dojoxPortletToggleIcon")||a.hasClass(b.target.parentNode,
"dojoxPortletToggleIcon")){a.stopEvent(b);for(var c=b.target.parentNode;"LI"!=c.tagName;)c=c.parentNode;this.onlyOpenOne&&a.query("li",d).filter(function(a){return a!=c}).removeClass("dojoxPortletItemOpen").addClass("dojoxPortletItemCollapsed");b=a.hasClass(c,"dojoxPortletItemOpen");a.toggleClass(c,"dojoxPortletItemOpen",!b);a.toggleClass(c,"dojoxPortletItemCollapsed",b)}}))}});a.declare("dojox.widget.PortletFeedSettings",e.widget.PortletSettings,{"class":"dojoxPortletFeedSettings",urls:null,selectedIndex:0,
buildRendering:function(){var b;this.urls&&0<this.urls.length&&(console.log(this.id+" -\x3e creating select with urls ",this.urls),b=a.create("select"),this.srcNodeRef&&(a.place(b,this.srcNodeRef,"before"),a.destroy(this.srcNodeRef)),this.srcNodeRef=b,a.forEach(this.urls,function(c){a.create("option",{value:c.url||c,innerHTML:c.label||c},b)}));if("SELECT"==this.srcNodeRef.tagName){this.text=this.srcNodeRef;var d=a.create("div",{},this.srcNodeRef,"before");d.appendChild(this.text);this.srcNodeRef=
d;a.query("option",this.text).filter("return !item.value;").forEach("item.value \x3d item.innerHTML");this.text.value||(this.content&&0==this.text.options.length&&this.text.appendChild(this.content),a.attr(b||this.text,"value",this.text.options[this.selectedIndex].value))}this.inherited(arguments)},_setContentAttr:function(){},postCreate:function(){console.log(this.id+" -\x3e postCreate");if(!this.text){var b=this.text=new g.form.TextBox({});a.create("span",{innerHTML:"Choose Url: "},this.domNode);
this.addChild(b)}this.addChild(new g.form.Button({label:"Load",onClick:a.hitch(this,function(){this.portlet.attr("url","SELECT"==this.text.tagName?this.text.value:this.text.attr("value"));"SELECT"==this.text.tagName&&a.some(this.text.options,a.hitch(this,function(a,b){return a.selected?(this.set("selectedIndex",b),!0):!1}));this.toggle()})}));this.addChild(new g.form.Button({label:"Cancel",onClick:a.hitch(this,"toggle")}));this.inherited(arguments)},startup:function(){if(!this._started){console.log(this.id+
" -\x3e startup");this.inherited(arguments);if(!this.portlet)throw Error(this.declaredClass+": A PortletFeedSettings widget cannot exist without a Portlet.");"SELECT"==this.text.tagName&&a.forEach(this.text.options,a.hitch(this,function(b,c){a.attr(b,"selected",c==this.selectedIndex)}));var b=this.portlet.attr("url");b?"SELECT"==this.text.tagName?!this.urls&&1>a.query("option[value\x3d'"+b+"']",this.text).length&&a.place(a.create("option",{value:b,innerHTML:b,selected:"true"}),this.text,"first"):
this.text.attr("value",b):this.portlet.attr("url",this.get("feedPortletUrl"))}},_getFeedPortletUrlAttr:function(){return this.text.value}})});