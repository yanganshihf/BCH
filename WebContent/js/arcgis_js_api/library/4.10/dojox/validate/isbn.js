//>>built
define(["dojo/_base/lang","./_base"],function(g,f){f.isValidIsbn=function(a){var e,d=0,c;g.isString(a)||(a=String(a));a=a.replace(/[- ]/g,"");e=a.length;switch(e){case 10:c=e;for(var b=0;9>b;b++)d+=parseInt(a.charAt(b))*c,c--;a=a.charAt(9).toUpperCase();d+="X"==a?10:parseInt(a);return 0==d%11;case 13:c=-1;for(b=0;b<e;b++)d+=parseInt(a.charAt(b))*(2+c),c*=-1;return 0==d%10}return!1};return f.isValidIsbn});