// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","./sources/resolver"],function(c,b,a){Object.defineProperty(b,"__esModule",{value:!0});b.transformTexture={name:"transform-texture",shaders:{vertexShader:a.resolveIncludes("raster/transform.vert"),fragmentShader:a.resolveIncludes("raster/texture.frag")},attributes:{a_position:0,a_texcoord:1}};b.transformSolid={name:"transform-solid",shaders:{vertexShader:a.resolveIncludes("raster/transform.vert"),fragmentShader:a.resolveIncludes("raster/solid.frag")},attributes:{a_position:0}}});