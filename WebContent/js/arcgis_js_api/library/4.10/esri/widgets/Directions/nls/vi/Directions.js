// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define({widgetLabel:"Ch\u1ec9 \u0111\u01b0\u1eddng",advancedOptions:"T\u00f9y ch\u1ecdn n\u00e2ng cao",disclaimer:"Vi\u1ec7c s\u1eed d\u1ee5ng ph\u1ea3i tu\u00e2n theo {esriTerms}.",esriTerms:"\u0110i\u1ec1u kho\u1ea3n S\u1eed d\u1ee5ng c\u1ee7a Esri",travelMode:"H\u00ecnh th\u1ee9c di chuy\u1ec3n",viewActive:"Nh\u1ea5p v\u00e0o b\u1ea3n \u0111\u1ed3 \u0111\u1ec3 th\u00eam m\u1ed9t \u0111i\u1ec3m d\u1eebng",showStop:"Hi\u1ec3n th\u1ecb \u0111i\u1ec3m d\u1eebng n\u00e0y",addStopTitle:"Th\u00eam \u0111i\u1ec3m d\u1eebng m\u1edbi",
addStop:"Th\u00eam \u0111i\u1ec3m d\u1eebng",removeStop:"Lo\u1ea1i b\u1ecf \u0111i\u1ec3m d\u1eebng",reverseStops:"\u0110\u1ea3o ng\u01b0\u1ee3c c\u00e1c \u0111i\u1ec3m d\u1eebng",dndHandle:"K\u00e9o \u0111\u1ec3 thay \u0111\u1ed5i th\u1ee9 t\u1ef1 \u0111\u1ebfn",serviceTime:"Th\u1eddi gian d\u1ecbch v\u1ee5",serviceDistance:"Kho\u1ea3ng c\u00e1ch d\u1ecbch v\u1ee5",leaveNow:"Tho\u00e1t ngay",departBy:"Kh\u1edfi h\u00e0nh tr\u01b0\u1edbc",departureTime:"Th\u1eddi gian kh\u1edfi h\u00e0nh",zoomToRoute:"Thu ph\u00f3ng \u0111\u1ebfn tuy\u1ebfn \u0111\u01b0\u1eddng",
printDescription:"In ch\u1ec9 \u0111\u01b0\u1eddng",gmt:"GMT",stop:"D\u1eebng",stopLabelTemplate:"\u0110i\u1ec3m d\u1eebng {number} ({label})",unlocated:"Ch\u01b0a \u0111\u1ecbnh v\u1ecb",searchFieldPlaceholder:"T\u00ecm ki\u1ebfm ho\u1eb7c b\u1ea5m v\u00e0o b\u1ea3n \u0111\u1ed3",viewlessSearchFieldPlaceholder:"T\u00ecm ki\u1ebfm",directionsPlaceholder:"Tuy\u1ebfn \u0111\u01b0\u1eddng c\u1ee7a b\u1ea1n s\u1ebd xu\u1ea5t hi\u1ec7n \u1edf \u0111\u00e2y.",serviceError:"D\u01b0\u1eddng nh\u01b0 \u0111\u00e3 c\u00f3 l\u1ed7i.",
etaTemplate:"{time} {gmt}",eta:"Th\u1eddi gian \u0111\u1ebfn d\u1ef1 ki\u1ebfn",distanceTemplate:"{distance} {units}",cumulativeCosts:"Chi ph\u00ed t\u00edch l\u0169y",intermediateCosts:"Chi ph\u00ed trung gian",optimizeRoute:"T\u1ed1i \u01b0u h\u00f3a tuy\u1ebfn \u0111\u01b0\u1eddng",optimizingRoute:"T\u1ed1i \u01b0u h\u00f3a tuy\u1ebfn \u0111\u01b0\u1eddng",clearRoute:"X\u00f3a tuy\u1ebfn \u0111\u01b0\u1eddng",signInRequired:"Y\u00eau c\u1ea7u \u0111\u0103ng nh\u1eadp",time:{min:"ph\u00fat",hr:"gi\u1edd"},
units:{kilometers:{name:"ki-l\u00f4-m\u00e9t",abbr:"km"},meters:{name:"m\u00e9t",abbr:"m"},miles:{name:"d\u1eb7m",abbr:"mi"},feet:{name:"feet",abbr:"ft"},yards:{name:"yard",abbr:"yd"},nauticalMiles:{name:"h\u1ea3i l\u00fd",abbr:"nm"}},traffic:{average:"th\u00f4ng th\u01b0\u1eddng",none:"Kh\u00f4ng c\u00f3 th\u00f4ng tin L\u01b0u l\u01b0\u1ee3ng giao th\u00f4ng",heavy:"Giao th\u00f4ng M\u1eadt \u0111\u1ed9 cao",light:"Giao th\u00f4ng M\u1eadt \u0111\u1ed9 th\u1ea5p"},messages:{errors:{unableToLoadServiceMetadata:"Kh\u00f4ng th\u1ec3 t\u1ea3i d\u1ecbch v\u1ee5 \u0111\u1ecbnh tuy\u1ebfn. \u0110i\u1ec1u n\u00e0y c\u00f3 th\u1ec3 do d\u1ecbch v\u1ee5 kh\u00f4ng th\u1ec3 truy c\u1eadp \u0111\u01b0\u1ee3c.",
notEnoughStops:"C\u1ea7n \u00edt nh\u1ea5t hai \u0111i\u1ec3m d\u1eebng \u0111\u1ec3 x\u1eed l\u00fd tuy\u1ebfn \u0111\u01b0\u1eddng.",needValidStops:"Ph\u1ea3i c\u00f3 \u00edt nh\u1ea5t hai \u0111i\u1ec3m d\u1eebng h\u1ee3p l\u1ec7 \u0111\u1ec3 ti\u1ebfn h\u00e0nh \u0111\u1ecbnh tuy\u1ebfn.",locationCannotBeLocated:"Kh\u00f4ng th\u00ea\u0309 \u0111\u1ecbnh v\u1ecb vi\u0323 tri\u0301 ch\u1ec9 \u0111\u1ecbnh.",allInputStopsMustBeValid:"T\u1ea5t c\u1ea3 c\u00e1c \u0111i\u1ec3m d\u1eebng \u0111\u01b0\u1ee3c nh\u1eadp ph\u1ea3i l\u00e0 v\u1ecb tr\u00ed h\u1ee3p l\u1ec7 \u0111\u1ec3 t\u1ea1o tuy\u1ebfn \u0111\u01b0\u1eddng."}}});