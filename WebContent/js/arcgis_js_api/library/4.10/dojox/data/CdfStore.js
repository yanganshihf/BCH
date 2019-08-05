//>>built
define(["dojo","dojox","dojo/data/util/sorter"],function(f,h){h.data.ASYNC_MODE=0;h.data.SYNC_MODE=1;return f.declare("dojox.data.CdfStore",null,{identity:"jsxid",url:"",xmlStr:"",data:null,label:"",mode:h.data.ASYNC_MODE,constructor:function(a){a&&(this.url=a.url,this.xmlStr=a.xmlStr||a.str,a.data&&(this.xmlStr=this._makeXmlString(a.data)),this.identity=a.identity||this.identity,this.label=a.label||this.label,this.mode=void 0!==a.mode?a.mode:this.mode);this._modifiedItems={};this.byId=this.fetchItemByIdentity},
getValue:function(a,b,e){return a.getAttribute(b)||e},getValues:function(a,b){a=this.getValue(a,b,[]);return f.isArray(a)?a:[a]},getAttributes:function(a){return a.getAttributeNames()},hasAttribute:function(a,b){return void 0!==this.getValue(a,b)},hasProperty:function(a,b){return this.hasAttribute(a,b)},containsValue:function(a,b,e){a=this.getValues(a,b);for(b=0;b<a.length;b++)if(null!==a[b])if("string"===typeof e){if(a[b].toString&&a[b].toString()===e)return!0}else if(a[b]===e)return!0;return!1},
isItem:function(a){return a.getClass&&a.getClass().equals(jsx3.xml.Entity.jsxclass)?!0:!1},isItemLoaded:function(a){return this.isItem(a)},loadItem:function(a){},getFeatures:function(){return{"dojo.data.api.Read":!0,"dojo.data.api.Write":!0,"dojo.data.api.Identity":!0}},getLabel:function(a){if(""!==this.label&&this.isItem(a)&&(a=this.getValue(a,this.label)))return a.toString()},getLabelAttributes:function(a){return""!==this.label?[this.label]:null},fetch:function(a){a=a||{};a.store||(a.store=this);
void 0!==a.mode&&(this.mode=a.mode);var b=this,e=function(b){a.onError?a.onError.call(a.scope||f.global,b,a):console.error("cdfStore Error:",b)},g=function(c,d){d=d||a;var e=d.abort||null,k=!1,g=d.start?d.start:0,h=d.count&&Infinity!==d.count?g+d.count:c.length;d.abort=function(){k=!0;e&&e.call(d)};var m=d.scope||f.global;d.store||(d.store=b);d.onBegin&&d.onBegin.call(m,c.length,d);d.sort&&c.sort(f.data.util.sorter.createSortFunction(d.sort,b));if(d.onItem)for(var l=g;l<c.length&&l<h;++l){var n=c[l];
k||d.onItem.call(m,n,d)}d.onComplete&&!k?(d.onItem||(c=c.slice(g,h),d.byId&&(c=c[0])),d.onComplete.call(m,c,d)):(c=c.slice(g,h),d.byId&&(c=c[0]));return c};if(!this.url&&!this.data&&!this.xmlStr)return e(Error("No URL or data specified.")),!1;var k=a||"*";if(this.mode==h.data.SYNC_MODE){var c=this._loadCDF();if(c instanceof Error)return a.onError?a.onError.call(a.scope||f.global,c,a):console.error("CdfStore Error:",c),c;this.cdfDoc=c;return c=(c=this._getItems(this.cdfDoc,k))&&0<c.length?g(c,a):g([],
a)}c=this._loadCDF();c.addCallbacks(f.hitch(this,function(b){(b=this._getItems(this.cdfDoc,k))&&0<b.length?g(b,a):g([],a)}),f.hitch(this,function(b){e(b,a)}));return c},_loadCDF:function(){var a=new f.Deferred;if(this.cdfDoc){if(this.mode==h.data.SYNC_MODE)return this.cdfDoc;setTimeout(f.hitch(this,function(){a.callback(this.cdfDoc)}),0);return a}this.cdfDoc=jsx3.xml.CDF.Document.newDocument();this.cdfDoc.subscribe("response",this,function(b){a.callback(this.cdfDoc)});this.cdfDoc.subscribe("error",
this,function(b){a.errback(b)});this.cdfDoc.setAsync(!this.mode);if(this.url)this.cdfDoc.load(this.url);else if(this.xmlStr&&(this.cdfDoc.loadXML(this.xmlStr),this.cdfDoc.getError().code))return Error(this.cdfDoc.getError().description);return this.mode==h.data.SYNC_MODE?this.cdfDoc:a},_getItems:function(a,b){a=a.selectNodes(b.query,!1,1);for(b=[];a.hasNext();)b.push(a.next());return b},close:function(a){},newItem:function(a,b){a=a||{};a.tagName&&("record"!=a.tagName&&console.warn("Only record inserts are supported at this time"),
delete a.tagName);a.jsxid=a.jsxid||this.cdfDoc.getKey();this.isItem(b)&&(b=this.getIdentity(b));a=this.cdfDoc.insertRecord(a,b);this._makeDirty(a);return a},deleteItem:function(a){this.cdfDoc.deleteRecord(this.getIdentity(a));this._makeDirty(a);return!0},setValue:function(a,b,e){this._makeDirty(a);a.setAttribute(b,e);return!0},setValues:function(a,b,e){this._makeDirty(a);console.warn("cdfStore.setValues only partially implemented.");return a.setAttribute(b,e)},unsetAttribute:function(a,b){this._makeDirty(a);
a.removeAttribute(b);return!0},revert:function(){delete this.cdfDoc;this._modifiedItems={};return!0},isDirty:function(a){if(a)return!!this._modifiedItems[this.getIdentity(a)];a=!1;for(var b in this._modifiedItems){a=!0;break}return a},_makeDirty:function(a){var b=this.getIdentity(a);this._modifiedItems[b]=a},_makeXmlString:function(a){var b=function(a,g){var e="",c;if(f.isArray(a))for(c=0;c<a.length;c++)e+=b(a[c],g);else if(f.isObject(a)){e+="\x3c"+g+" ";for(c in a)f.isObject(a[c])||(e+=c+'\x3d"'+
a[c]+'" ');e+="\x3e";for(c in a)f.isObject(a[c])&&(e+=b(a[c],c));e+="\x3c/"+g+"\x3e"}return e};return b(a,"data")},getIdentity:function(a){return this.getValue(a,this.identity)},getIdentityAttributes:function(a){return[this.identity]},fetchItemByIdentity:function(a){f.isString(a)?a={query:"//record[@jsxid\x3d'"+a+"']",mode:h.data.SYNC_MODE}:(a&&(a.query="//record[@jsxid\x3d'"+a.identity+"']"),a.mode||(a.mode=this.mode));a.byId=!0;return this.fetch(a)},byId:function(a){}})});