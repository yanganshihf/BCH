//>>built
define(["../library/greek"],function(c){return{convertHTML:function(b){return b?b.replace(/&([^;]+);/g,function(b,a){if("#"==a.charAt(0)){if(a=+a.substr(1),!isNaN(a))return String.fromCharCode(a)}else if(c[a])return String.fromCharCode(c[a]);console.warn("no HTML conversion for ",b);return b}):b},convertLaTeX:function(b){return b?b.replace(/\\([a-zA-Z]+)/g,function(d,a){if(c[a])return String.fromCharCode(c[a]);if("mu"==a.substr(0,2))return String.fromCharCode(c.mu)+a.substr(2);if("theta"==a.substr(0,
5))return String.fromCharCode(c.theta)+a.substr(5);if("phi"==a.substr(0,3))return String.fromCharCode(c.phi)+a.substr(3);console.log("no match for ",d," in ",b);console.log("Need user-friendly error handling here!")}).replace(/\\\\/g,"\\"):b}}});