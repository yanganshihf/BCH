// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require"],function(c){var b={_supportedRegions:"ar-iq ar-kw bg-bg cs-cz da-dk da-gl da-gl de-at de-ch de-de de-li el-gr en-ae en-au en-ca en-ca en-eg en-gb en-hk en-id en-ie en-ie en-il en-in en-iq en-ke en-lu en-mo en-my en-nz en-rw en-sg en-us en-us en-vi en-vi en-wo en-za es-ar es-ar es-bo es-bo es-cl es-cl es-co es-co es-cr es-cr es-es es-gt es-gt es-mx es-mx es-ni es-ni es-pe es-pe es-pr es-pr es-sv es-sv es-ve et-ee fi-fi fi-fi fr-ci fr-fr fr-ma fr-mg fr-ml fr-tn is-is is-is it-it ja-jp ja-jp ko-kr lt-lt lv-lv nl-be nl-nl nl-sr nl-sr nn-no nn-no pl-pl pt-br pt-br pt-pt ro-ro ru-ru sk-sk sv-se sv-se th-th zh-cn zh-tw".split(" "),
_defaultRegion:"en-us",_getSupportedRegion:function(a){a=a?a.toLowerCase():"";return-1<b._supportedRegions.indexOf(a)?a:b._defaultRegion},getScalePreviewSource:function(a){a="./images/scalePreview/"+b._getSupportedRegion(a)+".jpg";return"url("+c.toUrl(a)+")"},getScalePreviewSpriteBackgroundPosition:function(a){return"-"+a%5*128+"px -"+128*Math.floor(a/5)+"px"}};return b});