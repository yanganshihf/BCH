//>>built
define(["require","dojo/Deferred"],function(d,g){return function(a,k){if(a=a.nls){var b=new g,c;try{var e=a,f=e.indexOf("./");0<=f&&(e=a.substring(f+2));c=d.on?d.on("error",function(a){!b.isResolved()&&!b.isRejected()&&a.info[0]&&0<=a.info[0].indexOf(e)&&(b.resolve(!1),c&&c.remove())}):null;0==a.indexOf("./")&&(a="app/"+a);d(["dojo/i18n!"+a],function(a){b.resolve(a);c.remove()})}catch(h){b.reject(h),c&&c.remove()}return b}return!1}});