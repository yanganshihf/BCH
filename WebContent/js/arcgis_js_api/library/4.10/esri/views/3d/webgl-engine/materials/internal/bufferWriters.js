// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../support/buffer/BufferView","../../lib/Util"],function(B,r,t,p){function w(l,e,a,c,f){var g=a.typedBuffer;a=a.typedBufferStride;var k=l.length;c*=a;if(null==f||1===f)for(var h=0;h<k;++h){var b=2*l[h];g[c]=e[b];g[c+1]=e[b+1];c+=a}else for(h=0;h<k;++h)for(var b=2*l[h],d=0;d<f;++d)g[c]=e[b],g[c+1]=e[b+1],c+=a}function u(l,e,a,c,f){var g=a.typedBuffer;a=a.typedBufferStride;var k=l.length;c*=a;if(null==f||1===f)for(var h=0;h<k;++h){var b=3*l[h];g[c]=e[b];g[c+1]=e[b+
1];g[c+2]=e[b+2];c+=a}else for(h=0;h<k;++h)for(var b=3*l[h],d=0;d<f;++d)g[c]=e[b],g[c+1]=e[b+1],g[c+2]=e[b+2],c+=a}function x(l,e,a,c,f){var g=a.typedBuffer;a=a.typedBufferStride;var k=l.length;c*=a;if(null==f||1===f)for(var h=0;h<k;++h){var b=4*l[h];g[c]=e[b];g[c+1]=e[b+1];g[c+2]=e[b+2];g[c+3]=e[b+3];c+=a}else for(h=0;h<k;++h)for(var b=4*l[h],d=0;d<f;++d)g[c]=e[b],g[c+1]=e[b+1],g[c+2]=e[b+2],g[c+3]=e[b+3],c+=a}function y(l,e,a,c,f,g){if(a){var k=c.typedBuffer;c=c.typedBufferStride;var h=l.length;
f*=c;if(null==g||1===g)for(var b=0;b<h;++b){var d=3*l[b],m=e[d],n=e[d+1],q=e[d+2];k[f]=a[0]*m+a[4]*n+a[8]*q+a[12];k[f+1]=a[1]*m+a[5]*n+a[9]*q+a[13];k[f+2]=a[2]*m+a[6]*n+a[10]*q+a[14];f+=c}else for(b=0;b<h;++b)for(var d=3*l[b],m=e[d],n=e[d+1],q=e[d+2],d=a[0]*m+a[4]*n+a[8]*q+a[12],p=a[1]*m+a[5]*n+a[9]*q+a[13],m=a[2]*m+a[6]*n+a[10]*q+a[14],n=0;n<g;++n)k[f]=d,k[f+1]=p,k[f+2]=m,f+=c}else u(l,e,c,f,g)}function z(l,e,a,c,f,g){if(a){var k=c.typedBuffer;c=c.typedBufferStride;var h=l.length;f*=c;if(null==g||
1===g)for(var b=0;b<h;++b){var d=3*l[b],m=e[d],n=e[d+1],q=e[d+2];k[f]=a[0]*m+a[4]*n+a[8]*q;k[f+1]=a[1]*m+a[5]*n+a[9]*q;k[f+2]=a[2]*m+a[6]*n+a[10]*q;f+=c}else for(b=0;b<h;++b)for(var d=3*l[b],m=e[d],n=e[d+1],q=e[d+2],d=a[0]*m+a[4]*n+a[8]*q,p=a[1]*m+a[5]*n+a[9]*q,m=a[2]*m+a[6]*n+a[10]*q,n=0;n<g;++n)k[f]=d,k[f+1]=p,k[f+2]=m,f+=c}else u(l,e,c,f,g)}function v(l,e,a,c,f,g){var k=c.typedBuffer;c=c.typedBufferStride;var h=l.length;f*=c;if(null==g||1===g)if(4===a)for(a=0;a<h;++a){var b=4*l[a];k[f]=e[b];k[f+
1]=e[b+1];k[f+2]=e[b+2];k[f+3]=e[b+3];f+=c}else{if(3===a)for(a=0;a<h;++a)b=3*l[a],k[f]=e[b],k[f+1]=e[b+1],k[f+2]=e[b+2],k[f+3]=255,f+=c}else if(4===a)for(a=0;a<h;++a)for(var b=4*l[a],d=0;d<g;++d)k[f]=e[b],k[f+1]=e[b+1],k[f+2]=e[b+2],k[f+3]=e[b+3],f+=c;else if(3===a)for(a=0;a<h;++a)for(b=3*l[a],d=0;d<g;++d)k[f]=e[b],k[f+1]=e[b+1],k[f+2]=e[b+2],k[f+3]=255,f+=c}function A(l,e,a,c,f,g,k){var h=f.typedBuffer;f=f.typedBufferStride;var b=l.length;g*=f;if(null==k||1===k)if(4===a)for(a=0;a<b;++a){var d=4*
l[a];h[g]=e[d]*c[0];h[g+1]=e[d+1]*c[1];h[g+2]=e[d+2]*c[2];h[g+3]=e[d+3]*c[3];g+=f}else{if(3===a){var m=255*c[3];for(a=0;a<b;++a)d=3*l[a],h[g]=e[d]*c[0],h[g+1]=e[d+1]*c[1],h[g+2]=e[d+2]*c[2],h[g+3]=m,g+=f}}else if(4===a)for(a=0;a<b;++a)for(var d=4*l[a],n=0;n<k;++n)h[g]=e[d]*c[0],h[g+1]=e[d+1]*c[1],h[g+2]=e[d+2]*c[2],h[g+3]=e[d+3]*c[3],g+=f;else if(3===a)for(m=255*c[3],a=0;a<b;++a)for(d=3*l[a],n=0;n<k;++n)h[g]=e[d]*c[0],h[g+1]=e[d+1]*c[1],h[g+2]=e[d+2]*c[2],h[g+3]=m,g+=f}Object.defineProperty(r,"__esModule",
{value:!0});r.writeBufferVec2=w;r.writeBufferVec3=u;r.writeBufferVec4=x;r.writePosition=y;r.writeNormal=z;r.writeColor=v;r.writeMultipliedColor=A;r.writeDefaultAttributes=function(l,e,a,c,f,g,k){var h=0;for(a=a.fieldNames;h<a.length;h++){var b=a[h],d=l.vertexAttr[b],m=l.indices[b];if(d&&m)switch(b){case p.VertexAttrConstants.POSITION:p.assert(3===d.size);(b=g.getField(b,t.BufferViewVec3f))&&y(m,d.data,c,b,k);break;case p.VertexAttrConstants.NORMAL:p.assert(3===d.size);(b=g.getField(b,t.BufferViewVec3f))&&
z(m,d.data,f,b,k);break;case p.VertexAttrConstants.UV0:p.assert(2===d.size);(b=g.getField(b,t.BufferViewVec2f))&&w(m,d.data,b,k);break;case p.VertexAttrConstants.REGION:p.assert(4===d.size);(b=g.getField(b,t.BufferViewVec4u16))&&x(m,d.data,b,k);break;case p.VertexAttrConstants.COLOR:p.assert(3===d.size||4===d.size);(b=g.getField(b,t.BufferViewVec4u8))&&(e&&e.color?A(m,d.data,d.size,e.color,b,k):v(m,d.data,d.size,b,k));break;case p.VertexAttrConstants.SYMBOLCOLOR:p.assert(3===d.size||4===d.size),(b=
g.getField(b,t.BufferViewVec4u8))&&v(m,d.data,d.size,b,k)}}}});