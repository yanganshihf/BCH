//>>built
define(["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","./_FilterExpr"],function(f,g,d,c){var b=function(a){return d.partial(function(a,b){return new c[a](b)},a)},e=function(a){return d.partial(function(a,b){return new c.LogicNOT(new c[a](b))},a)};return f("dojox.grid.enhanced.plugins.filter.FilterBuilder",null,{buildExpression:function(a){if("op"in a)return this.supportedOps[a.op.toLowerCase()](g.map(a.data,this.buildExpression,this));var b=d.mixin(this.defaultArgs[a.datatype],a.args||
{});return new this.supportedTypes[a.datatype](a.data,a.isColumn,b)},supportedOps:{equalto:b("EqualTo"),lessthan:b("LessThan"),lessthanorequalto:b("LessThanOrEqualTo"),largerthan:b("LargerThan"),largerthanorequalto:b("LargerThanOrEqualTo"),contains:b("Contains"),startswith:b("StartsWith"),endswith:b("EndsWith"),notequalto:e("EqualTo"),notcontains:e("Contains"),notstartswith:e("StartsWith"),notendswith:e("EndsWith"),isempty:b("IsEmpty"),range:function(a){return new c.LogicALL(new c.LargerThanOrEqualTo(a.slice(0,
2)),new c.LessThanOrEqualTo(a[0],a[2]))},logicany:b("LogicANY"),logicall:b("LogicALL")},supportedTypes:{number:c.NumberExpr,string:c.StringExpr,"boolean":c.BooleanExpr,date:c.DateExpr,time:c.TimeExpr},defaultArgs:{"boolean":{falseValue:"false",convert:function(a,b){var c=b.falseValue;b=b.trueValue;if(d.isString(a)){if(b&&a.toLowerCase()==b)return!0;if(c&&a.toLowerCase()==c)return!1}return!!a}}}})});