// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","./kebabDictionary"],function(d,a,b){Object.defineProperty(a,"__esModule",{value:!0});var c={"short-date":"(datePattern: 'M/d/y', selector: 'date')","short-date-le":"(datePattern: 'd/M/y', selector: 'date')","long-month-day-year":"(datePattern: 'MMMM d, y', selector: 'date')","day-short-month-year":"(datePattern: 'd MMM y', selector: 'date')","long-date":"(datePattern: 'EEEE, MMMM d, y', selector: 'date')","short-date-short-time":"(datePattern: 'M/d/y', timePattern: 'h:mm a', selector: 'date and time')",
"short-date-le-short-time":"(datePattern: 'd/M/y', timePattern: 'h:mm a', selector: 'date and time')","short-date-short-time-24":"(datePattern: 'M/d/y', timePattern: 'H:mm', selector: 'date and time')","short-date-le-short-time-24":"(datePattern: 'd/M/y', timePattern: 'H:mm', selector: 'date and time')","short-date-long-time":"(datePattern: 'M/d/y', timePattern: 'h:mm:ss a', selector: 'date and time')","short-date-le-long-time":"(datePattern: 'd/M/y', timePattern: 'h:mm:ss a', selector: 'date and time')",
"short-date-long-time-24":"(datePattern: 'M/d/y', timePattern: 'H:mm:ss', selector: 'date and time')","short-date-le-long-time-24":"(datePattern: 'd/M/y', timePattern: 'H:mm:ss', selector: 'date and time')","long-month-year":"(datePattern: 'MMMM y', selector: 'date')","short-month-year":"(datePattern: 'MMM y', selector: 'date')",year:"(datePattern: 'y', selector: 'date')"};a.dictionary=b.strict()({shortDate:"short-date",shortDateLE:"short-date-le",longDate:"long-date",dayShortMonthYear:"day-short-month-year",
longMonthDayYear:"long-month-day-year",shortDateLongTime:"short-date-long-time",shortDateLELongTime:"short-date-le-long-time",shortDateShortTime:"short-date-short-time",shortDateLEShortTime:"short-date-le-short-time",shortDateShortTime24:"short-date-short-time-24",shortDateLEShortTime24:"short-date-le-short-time-24",shortDateLongTime24:"short-date-long-time-24",shortDateLELongTime24:"short-date-le-long-time-24",longMonthYear:"long-month-year",shortMonthYear:"short-month-year",year:"year"});a.toJSON=
a.dictionary.toJSON.bind(a.dictionary);a.fromJSON=a.dictionary.fromJSON.bind(a.dictionary);a.getFormat=function(a){return c[a]}});