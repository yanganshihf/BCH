//>>built
define(["dojo/_base/kernel","dojo/_base/array","./_base"],function(g,k,d){d.Dictionary=function(c){var b={};this.count=0;var e={};this.add=function(a,c){var h=a in b;b[a]=new d.DictionaryEntry(a,c);h||this.count++};this.clear=function(){b={};this.count=0};this.clone=function(){return new d.Dictionary(this)};this.contains=this.containsKey=function(a){return e[a]?!1:null!=b[a]};this.containsValue=function(a){for(var b=this.getIterator();b.get();)if(b.element.value==a)return!0;return!1};this.entry=function(a){return b[a]};
this.forEach=function(a,c){var d=[],f;for(f in b)e[f]||d.push(b[f]);g.forEach(d,a,c)};this.getKeyList=function(){return this.getIterator().map(function(a){return a.key})};this.getValueList=function(){return this.getIterator().map(function(a){return a.value})};this.item=function(a){if(a in b)return b[a].valueOf()};this.getIterator=function(){return new d.DictionaryIterator(b)};this.remove=function(a){return a in b&&!e[a]?(delete b[a],this.count--,!0):!1};if(c)for(c=c.getIterator();c.get();)this.add(c.element.key,
c.element.value)};return d.Dictionary});