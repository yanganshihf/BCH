// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../layers/support/rasterFormats/LercCodec","../support/mathUtils","./TerrainConst"],function(w,x,u,t,v){return function(){function n(a,c,b,g){this.samplerData=null;this.level=a;this.i=c;this.j=b;this.extent=g}n.prototype.computeMinMaxValue=function(a,c,b,g){var e=Infinity,f=-Infinity;a-=this.level;var d=Math.pow(2,a);if(Math.floor(c/d)===this.i&&Math.floor(b/d)===this.j&&0<a){var h=this.samplerData.width,l=this.samplerData.pixelData,n=.5*v.ELEVATION_NODATA_VALUE;
a=(h-1)/d;b=(b-this.j*d)*a;c=(c-this.i*d)*a;if(1>a){var d=Math.floor(b),m=Math.floor(c),k=d+m*h,p=l[k],q=l[k+1],r=l[k+h],k=l[k+h+1];if(p+q+r+k<n)return e=t.bilerp(p,q,r,k,b-d,c-m),f=t.bilerp(p,q,r,k,b-d+a,c-m),h=t.bilerp(p,q,r,k,b-d,c-m+a),a=t.bilerp(p,q,r,k,b-d+a,c-m+a),g[0]=Math.min(e,f,h,a),g[1]=Math.max(e,f,h,a),g;b=d;c=m;a=1}else b=Math.floor(b),c=Math.floor(c),a=Math.ceil(a);for(d=b;d<=b+a;d++)for(m=c;m<=c+a;m++)k=d+m*h,p=l[k],p<n?(e=Math.min(e,p),f=Math.max(f,p)):(e=0<e?0:e,f=0>f?0:f)}g[0]=
e;g[1]=f;return g};n.createFromLERC=function(a,c,b,g){b=u.decode(b,g);a=new n(a[0],a[1],a[2],c);a.samplerData={pixelData:b.pixelData,width:b.width,height:b.height,minValue:b.minValue,maxValue:b.maxValue,noDataValue:b.noDataValue,safeWidth:.99999999*(b.width-1),dx:(b.width-1)/(a.extent[2]-a.extent[0]),dy:(b.width-1)/(a.extent[3]-a.extent[1]),x0:a.extent[0],y1:a.extent[3]};a.bounds=[a.samplerData.minValue,-3E38<a.samplerData.maxValue?a.samplerData.maxValue:0];return a};n.createFromFetchTileResult=function(a,
c,b){a=new n(a[0],a[1],a[2],c);c=b.values;for(var g=b.noDataValue,e=Infinity,f=-Infinity,d=!0,h=0;h<c.length;h++){var l=c[h];l!==g&&(e=l<e?l:e,f=l>f?l:f,d=!1)}d&&(f=e=0);a.samplerData={pixelData:b.values,width:b.width,height:b.height,minValue:e,maxValue:f,noDataValue:g,safeWidth:.99999999*(b.width-1),dx:(b.width-1)/(a.extent[2]-a.extent[0]),dy:(b.width-1)/(a.extent[3]-a.extent[1]),x0:a.extent[0],y1:a.extent[3]};a.bounds=[e,f];return a};return n}()});