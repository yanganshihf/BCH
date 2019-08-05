// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define([],function(){var J={defaultNoDataValue:-3.4027999387901484E38,decode:function(c,n){var y;n=n||{};var g=n.inputOffset||0,h=n.encodedMaskData||null===n.encodedMaskData,a={},b=new Uint8Array(c,g,10);a.fileIdentifierString=String.fromCharCode.apply(null,b);if("CntZImage"!=a.fileIdentifierString.trim())throw"Unexpected file identifier string: "+a.fileIdentifierString;g+=10;b=new DataView(c,g,24);a.fileVersion=b.getInt32(0,!0);a.imageType=b.getInt32(4,!0);a.height=b.getUint32(8,!0);a.width=b.getUint32(12,
!0);a.maxZError=b.getFloat64(16,!0);g+=24;if(!h)if(b=new DataView(c,g,16),a.mask={},a.mask.numBlocksY=b.getUint32(0,!0),a.mask.numBlocksX=b.getUint32(4,!0),a.mask.numBytes=b.getUint32(8,!0),a.mask.maxValue=b.getFloat32(12,!0),g+=16,0<a.mask.numBytes){var h=new Uint8Array(Math.ceil(a.width*a.height/8)),b=new DataView(c,g,a.mask.numBytes),p=b.getInt16(0,!0),k=2,z=0;do{if(0<p)for(;p--;)h[z++]=b.getUint8(k++);else for(var A=b.getUint8(k++),p=-p;p--;)h[z++]=A;p=b.getInt16(k,!0);k+=2}while(k<a.mask.numBytes);
if(-32768!==p||z<h.length)throw"Unexpected end of mask RLE encoding";a.mask.bitset=h;g+=a.mask.numBytes}else 0===(a.mask.numBytes|a.mask.numBlocksY|a.mask.maxValue)&&(h=new Uint8Array(Math.ceil(a.width*a.height/8)),a.mask.bitset=h);b=new DataView(c,g,16);a.pixels={};a.pixels.numBlocksY=b.getUint32(0,!0);a.pixels.numBlocksX=b.getUint32(4,!0);a.pixels.numBytes=b.getUint32(8,!0);a.pixels.maxValue=b.getFloat32(12,!0);g+=16;h=a.pixels.numBlocksX;b=a.pixels.numBlocksY;h+=0<a.width%h?1:0;p=b+(0<a.height%
b?1:0);a.pixels.blocks=Array(h*p);k=1E9;for(A=z=0;A<p;A++)for(var E=0;E<h;E++){var d=0,b=new DataView(c,g,Math.min(10,c.byteLength-g)),e={};a.pixels.blocks[z++]=e;var f=b.getUint8(0);d++;e.encoding=f&63;if(3<e.encoding)throw"Invalid block encoding ("+e.encoding+")";if(2===e.encoding)g++,k=Math.min(k,0);else{if(0!==f&&2!==f){f>>=6;e.offsetType=f;if(2===f)e.offset=b.getInt8(1),d++;else if(1===f)e.offset=b.getInt16(1,!0),d+=2;else if(0===f)e.offset=b.getFloat32(1,!0),d+=4;else throw"Invalid block offset type";
k=Math.min(e.offset,k);if(1===e.encoding)if(f=b.getUint8(d),d++,e.bitsPerPixel=f&63,f>>=6,e.numValidPixelsType=f,2===f)e.numValidPixels=b.getUint8(d),d++;else if(1===f)e.numValidPixels=b.getUint16(d,!0),d+=2;else if(0===f)e.numValidPixels=b.getUint32(d,!0),d+=4;else throw"Invalid valid pixel count type";}g+=d;if(3!=e.encoding)if(0===e.encoding){b=(a.pixels.numBytes-1)/4;if(b!==Math.floor(b))throw"uncompressed block has invalid length";d=new ArrayBuffer(4*b);f=new Uint8Array(d);f.set(new Uint8Array(c,
g,4*b));d=new Float32Array(d);for(f=0;f<d.length;f++)k=Math.min(k,d[f]);e.rawData=d;g+=4*b}else 1===e.encoding&&(b=Math.ceil(e.numValidPixels*e.bitsPerPixel/8),d=new ArrayBuffer(4*Math.ceil(b/4)),f=new Uint8Array(d),f.set(new Uint8Array(c,g,b)),e.stuffedData=new Uint32Array(d),g+=b)}}a.pixels.minValue=k;a.eofOffset=g;c=null!=n.noDataValue?n.noDataValue:J.defaultNoDataValue;var h=n.encodedMaskData,e=n.returnMask,b=0,p=a.pixels.numBlocksX,k=a.pixels.numBlocksY,z=Math.floor(a.width/p),A=Math.floor(a.height/
k),E=2*a.maxZError,h=h||(a.mask?a.mask.bitset:null),t,g=new (n.pixelType||Float32Array)(a.width*a.height);e&&h&&(t=new Uint8Array(a.width*a.height));for(var e=new Float32Array(z*A),u,v,d=0;d<=k;d++)if(f=d!==k?A:a.height%k,0!==f)for(var F=0;F<=p;F++){var B=F!==p?z:a.width%p;if(0!==B){var l=d*a.width*A+F*z,G=a.width-B,r=a.pixels.blocks[b],m,q;if(2>r.encoding){if(0===r.encoding)m=r.rawData;else{m=r.stuffedData;q=r.bitsPerPixel;u=r.numValidPixels;v=r.offset;var K=E,N=e,L=a.pixels.maxValue,I=(1<<q)-1,
M=0,H=void 0,w=0,C=void 0,D=void 0,O=Math.ceil((L-v)/K);m[m.length-1]<<=8*(4*m.length-Math.ceil(q*u/8));for(H=0;H<u;H++)0===w&&(D=m[M++],w=32),w>=q?(C=D>>>w-q&I,w-=q):(w=q-w,C=(D&I)<<w&I,D=m[M++],w=32-w,C+=D>>>w),N[H]=C<O?v+C*K:L;m=e}q=0}else y=2===r.encoding?0:r.offset;var x;if(h)for(v=0;v<f;v++){l&7&&(x=h[l>>3],x<<=l&7);for(u=0;u<B;u++)l&7||(x=h[l>>3]),x&128?(t&&(t[l]=1),g[l++]=2>r.encoding?m[q++]:y):(t&&(t[l]=0),g[l++]=c),x<<=1;l+=G}else if(2>r.encoding)for(v=0;v<f;v++){for(u=0;u<B;u++)g[l++]=
m[q++];l+=G}else for(v=0;v<f;v++)if(g.fill)g.fill(y,l,l+B),l+=B+G;else{for(u=0;u<B;u++)g[l++]=y;l+=G}if(1===r.encoding&&q!==r.numValidPixels)throw"Block and Mask do not match";b++}}y=t;t={width:a.width,height:a.height,pixelData:g,minValue:a.pixels.minValue,maxValue:a.pixels.maxValue,noDataValue:c};y&&(t.maskData=y);n.returnEncodedMask&&a.mask&&(t.encodedMaskData=a.mask.bitset?a.mask.bitset:null);if(n.returnFileInfo&&(t.fileInfo=P(a),n.computeUsedBitDepths)){n=t.fileInfo;y=a.pixels.numBlocksX*a.pixels.numBlocksY;
x={};for(m=0;m<y;m++)q=a.pixels.blocks[m],0===q.encoding?x.float32=!0:1===q.encoding?x[q.bitsPerPixel]=!0:x[0]=!0;a=Object.keys(x);n.bitDepths=a}return t}},P=function(c){return{fileIdentifierString:c.fileIdentifierString,fileVersion:c.fileVersion,imageType:c.imageType,height:c.height,width:c.width,maxZError:c.maxZError,eofOffset:c.eofOffset,mask:c.mask?{numBlocksX:c.mask.numBlocksX,numBlocksY:c.mask.numBlocksY,numBytes:c.mask.numBytes,maxValue:c.mask.maxValue}:null,pixels:{numBlocksX:c.pixels.numBlocksX,
numBlocksY:c.pixels.numBlocksY,numBytes:c.pixels.numBytes,maxValue:c.pixels.maxValue,minValue:c.pixels.minValue,noDataValue:this.noDataValue}}};return J});