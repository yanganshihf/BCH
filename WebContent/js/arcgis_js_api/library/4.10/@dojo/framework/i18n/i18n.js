//>>built
(function(e){"object"===typeof module&&"object"===typeof module.exports?(e=e(require,exports),void 0!==e&&(module.exports=e)):"function"===typeof define&&define.amd&&define("require exports tslib ../shim/global ../shim/iterator ../shim/Map ../core/Evented ../has/preset ../core/util globalize/dist/globalize/message ./cldr/load ./util/main".split(" "),e)})(function(e,g){function v(a){if(w.isArrayLike(a)){for(var b=[],c=0;c<a.length;c++){var d=a[c];b.push(d.__esModule&&d.default?d.default:d)}return b}if(w.isIterable(a)){b=
[];try{for(c=m.__values(a),d=c.next();!d.done;d=c.next()){var f=d.value;b.push(f.__esModule&&f.default?f.default:f)}}catch(E){e={error:E}}finally{try{d&&!d.done&&(g=c.return)&&g.call(c)}finally{if(e)throw e.error;}}return b}return a.__esModule&&a.default?a.default:a;var e,g}function q(a){if(a.id)return a.id;var b=F.uuid();Object.defineProperty(a,"id",{value:b});return b}function G(a,b,c){c=l.normalizeLocale(c||n());var d=c+":"+a+":"+b,f=x.get(d);if(f)return f;f=(c!==n()?new p(l.normalizeLocale(c)):
p).messageFormatter(a+"/"+b);(a=h.get(a))&&a.get(c)&&x.set(d,f);return f}function H(a,b){return Promise.all(b.map(function(c){return a[c]()})).then(function(a){return a.map(function(a){return v(a)})})}function n(){return k||g.systemLocale}function y(a,b){void 0===b&&(b=[]);return l.generateLocales(a).filter(function(a){return-1<b.indexOf(a)})}function r(a,b,c){void 0===c&&(c="root");var d=h.get(a);d||(d=new t.default,h.set(a,d));d.set(c,b);p.loadMessages((f={},f[c]=(e={},e[a]=b,e),f));var f,e}function z(a,
b){var c=a.id,d=void 0===c?q(a):c,c=a.locales;a=a.messages;var f=h.get(d);if(f){if(d=f.get(b))return d}else r(d,a);b=y(b,c&&Object.keys(c));if(!b.length)return a;if(f)return f.get(b[b.length-1])}function A(a,b,c){var d=a.id;a=void 0===d?q(a):d;if(u.isLoaded("supplemental","likelySubtags")&&u.isLoaded("supplemental","plurals-type-cardinal"))return G(a,b,c);var f=(a=h.get(a))?a.get(c||n())||a.get("root"):null;if(!f)throw Error("The bundle has not been registered.");return function(a){void 0===a&&(a=
Object.create(null));return f[b].replace(I,function(c,b){c=a[b];if("undefined"===typeof c)throw Error("Missing property "+b);return c})}}function B(a,b){return m.__awaiter(this,void 0,void 0,function(){var c,d,f,e,g;return m.__generator(this,function(h){switch(h.label){case 0:c=b?l.normalizeLocale(b):n();if(d=z(a,c))return[2,d];f=a.locales;e=y(c,Object.keys(f));return[4,H(f,e)];case 1:return g=h.sent(),[2,g.reduce(function(b,d){b=m.__assign({},b,d);r(q(a),Object.freeze(b),c);return b},a.messages)]}})})}
Object.defineProperty(g,"__esModule",{value:!0});var m=e("tslib"),J=e("../shim/global"),w=e("../shim/iterator"),t=e("../shim/Map"),K=e("../core/Evented"),C=e("../has/preset"),F=e("../core/util"),p=e("globalize/dist/globalize/message"),u=e("./cldr/load"),l=e("./util/main");g.useDefault=v;var I=/\{([a-z0-9_]+)\}/gi,h=new t.default,x=new t.default,D=new K.default,k;g.formatMessage=function(a,b,c,d){return A(a,b,d)(c)};g.getCachedMessages=z;g.getMessageFormatter=A;Object.defineProperty(B,"locale",{get:n});
g.default=B;g.invalidate=function(a){a?a.id&&h.delete(a.id):h.clear()};g.observeLocale=function(a){return D.on("change",function(b){a(b.target)})};g.setLocaleMessages=function(a,b,c){b=m.__assign({},a.messages,b);r(q(a),Object.freeze(b),c)};g.switchLocale=function(a){var b=k;k=a?l.normalizeLocale(a):"";b!==k&&(u.isLoaded("supplemental","likelySubtags")&&(p.load({main:(c={},c[k]={},c)}),p.locale(k)),D.emit({type:"change",target:k}));var c};g.systemLocale=function(){var a="en";C.default("host-browser")?
(a=J.default.navigator,a=a.language||a.userLanguage):C.default("host-node")&&(a=process.env.LANG||a);return l.normalizeLocale(a)}()});