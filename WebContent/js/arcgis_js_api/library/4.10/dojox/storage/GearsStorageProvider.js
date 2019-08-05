//>>built
define(["dojo","dijit","dojox","dojo/require!dojo/gears,dojox/storage/Provider,dojox/storage/manager,dojox/sql"],function(f,m,c){f.provide("dojox.storage.GearsStorageProvider");f.require("dojo.gears");f.require("dojox.storage.Provider");f.require("dojox.storage.manager");f.require("dojox.sql");f.gears.available&&function(){f.declare("dojox.storage.GearsStorageProvider",c.storage.Provider,{constructor:function(){},TABLE_NAME:"__DOJO_STORAGE",initialized:!1,_available:null,_storageReady:!1,initialize:function(){1!=
f.config.disableGearsStorage&&(this.TABLE_NAME="__DOJO_STORAGE",this.initialized=!0,c.storage.manager.loaded())},isAvailable:function(){return this._available=f.gears.available},put:function(a,b,e,d){this._initStorage();if(!this.isValidKey(a))throw Error("Invalid key given: "+a);d=d||this.DEFAULT_NAMESPACE;if(!this.isValidKey(d))throw Error("Invalid namespace given: "+a);b=f.isString(b)?"string:"+b:f.toJson(b);try{c.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace \x3d ? AND key \x3d ?",d,a),
c.sql("INSERT INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)",d,a,b)}catch(h){console.debug("dojox.storage.GearsStorageProvider.put:",h);e(this.FAILED,a,h.toString(),d);return}e&&e(c.storage.SUCCESS,a,null,d)},get:function(a,b){this._initStorage();if(!this.isValidKey(a))throw Error("Invalid key given: "+a);b=b||this.DEFAULT_NAMESPACE;if(!this.isValidKey(b))throw Error("Invalid namespace given: "+a);a=c.sql("SELECT * FROM "+this.TABLE_NAME+" WHERE namespace \x3d ? AND  key \x3d ?",b,a);if(a.length)a=a[0].value;
else return null;return a=f.isString(a)&&/^string:/.test(a)?a.substring(7):f.fromJson(a)},getNamespaces:function(){this._initStorage();for(var a=[c.storage.DEFAULT_NAMESPACE],b=c.sql("SELECT namespace FROM "+this.TABLE_NAME+" DESC GROUP BY namespace"),e=0;e<b.length;e++)b[e].namespace!=c.storage.DEFAULT_NAMESPACE&&a.push(b[e].namespace);return a},getKeys:function(a){this._initStorage();a=a||this.DEFAULT_NAMESPACE;if(!this.isValidKey(a))throw Error("Invalid namespace given: "+a);a=c.sql("SELECT key FROM "+
this.TABLE_NAME+" WHERE namespace \x3d ?",a);for(var b=[],e=0;e<a.length;e++)b.push(a[e].key);return b},clear:function(a){this._initStorage();a=a||this.DEFAULT_NAMESPACE;if(!this.isValidKey(a))throw Error("Invalid namespace given: "+a);c.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace \x3d ?",a)},remove:function(a,b){this._initStorage();if(!this.isValidKey(a))throw Error("Invalid key given: "+a);b=b||this.DEFAULT_NAMESPACE;if(!this.isValidKey(b))throw Error("Invalid namespace given: "+a);c.sql("DELETE FROM "+
this.TABLE_NAME+" WHERE namespace \x3d ? AND key \x3d ?",b,a)},putMultiple:function(a,b,e,d){this._initStorage();if(!this.isValidKeyArray(a)||!b instanceof Array||a.length!=b.length)throw Error("Invalid arguments: keys \x3d ["+a+"], values \x3d ["+b+"]");if(null==d||"undefined"==typeof d)d=c.storage.DEFAULT_NAMESPACE;if(!this.isValidKey(d))throw Error("Invalid namespace given: "+d);this._statusHandler=e;try{c.sql.open();c.sql.db.execute("BEGIN TRANSACTION");for(var h="REPLACE INTO "+this.TABLE_NAME+
" VALUES (?, ?, ?)",g=0;g<a.length;g++){var k=b[g],k=f.isString(k)?"string:"+k:f.toJson(k);c.sql.db.execute(h,[d,a[g],k])}c.sql.db.execute("COMMIT TRANSACTION");c.sql.close()}catch(l){console.debug("dojox.storage.GearsStorageProvider.putMultiple:",l);e&&e(this.FAILED,a,l.toString(),d);return}e&&e(c.storage.SUCCESS,a,null,d)},getMultiple:function(a,b){this._initStorage();if(!this.isValidKeyArray(a))throw new ("Invalid key array given: "+a);if(null==b||"undefined"==typeof b)b=c.storage.DEFAULT_NAMESPACE;
if(!this.isValidKey(b))throw Error("Invalid namespace given: "+b);for(var e="SELECT * FROM "+this.TABLE_NAME+" WHERE namespace \x3d ? AND  key \x3d ?",d=[],h=0;h<a.length;h++){var g=c.sql(e,b,a[h]);g.length?(g=g[0].value,f.isString(g)&&/^string:/.test(g)?d[h]=g.substring(7):d[h]=f.fromJson(g)):d[h]=null}return d},removeMultiple:function(a,b){this._initStorage();if(!this.isValidKeyArray(a))throw Error("Invalid arguments: keys \x3d ["+a+"]");if(null==b||"undefined"==typeof b)b=c.storage.DEFAULT_NAMESPACE;
if(!this.isValidKey(b))throw Error("Invalid namespace given: "+b);c.sql.open();c.sql.db.execute("BEGIN TRANSACTION");for(var e="DELETE FROM "+this.TABLE_NAME+" WHERE namespace \x3d ? AND key \x3d ?",d=0;d<a.length;d++)c.sql.db.execute(e,[b,a[d]]);c.sql.db.execute("COMMIT TRANSACTION");c.sql.close()},isPermanent:function(){return!0},getMaximumSize:function(){return this.SIZE_NO_LIMIT},hasSettingsUI:function(){return!1},showSettingsUI:function(){throw Error(this.declaredClass+" does not support a storage settings user-interface");
},hideSettingsUI:function(){throw Error(this.declaredClass+" does not support a storage settings user-interface");},_initStorage:function(){if(!this._storageReady){if(!google.gears.factory.hasPermission&&!google.gears.factory.getPermission(null,null,"This site would like to use Google Gears to enable enhanced functionality."))throw Error("You must give permission to use Gears in order to store data");try{c.sql("CREATE TABLE IF NOT EXISTS "+this.TABLE_NAME+"(  namespace TEXT,  key TEXT,  value TEXT )"),
c.sql("CREATE UNIQUE INDEX IF NOT EXISTS namespace_key_index ON "+this.TABLE_NAME+" (namespace, key)")}catch(a){throw console.debug("dojox.storage.GearsStorageProvider._createTables:",a),Error("Unable to create storage tables for Gears in Dojo Storage");}this._storageReady=!0}}});c.storage.manager.register("dojox.storage.GearsStorageProvider",new c.storage.GearsStorageProvider)}()});