//>>built
define(["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dijit/tree/ForestStoreModel"],function(g,f,d,h){return g("dojox.grid.LazyTreeGridStoreModel",h,{serverStore:!1,constructor:function(b){this.serverStore=!!b.serverStore},mayHaveChildren:function(b){var a=null;return f.some(this.childrenAttrs,function(c){a=this.store.getValue(b,c);return d.isString(a)?0<parseInt(a,10)||"true"===a.toLowerCase()?!0:!1:"number"==typeof a?0<a:"boolean"==typeof a?a:this.store.isItem(a)?(a=this.store.getValues(b,
c),d.isArray(a)?0<a.length:!1):!1},this)},getChildren:function(b,a,c,e){if(e){var f=e.start||0,k=e.count,g=e.parentId,l=e.sort;if(b===this.root)this.root.size=0,this.store.fetch({start:f,count:k,sort:l,query:this.query,onBegin:d.hitch(this,function(a){this.root.size=a}),onComplete:d.hitch(this,function(b){a(b,e,this.root.size)}),onError:c});else{var m=this.store;if(m.isItemLoaded(b))this.serverStore&&!this._isChildrenLoaded(b)?(this.childrenSize=0,this.store.fetch({start:f,count:k,sort:l,query:d.mixin({parentId:g},
this.query||{}),onBegin:d.hitch(this,function(a){this.childrenSize=a}),onComplete:d.hitch(this,function(b){a(b,e,this.childrenSize)}),onError:c})):this.inherited(arguments);else{var h=d.hitch(this,arguments.callee);m.loadItem({item:b,onItem:function(b){h(b,a,c,e)},onError:c})}}}else this.inherited(arguments)},_isChildrenLoaded:function(b){var a=null;return f.every(this.childrenAttrs,function(c){a=this.store.getValues(b,c);return f.every(a,function(a){return this.store.isItemLoaded(a)},this)},this)},
onNewItem:function(b,a){},onDeleteItem:function(b){}})});