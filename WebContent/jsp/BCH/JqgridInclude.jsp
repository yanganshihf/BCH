<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- jqGrid组件基础样式包-必要 -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/js/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/css/bootstrap.css" />
	
<!-- jqGrid主题包-非必要 -->
<!-- 在jqgrid/css/css这个目录下还有其他的主题包，可以尝试更换看效果 -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/js/jqgrid/css/css/redmond/jquery-ui-1.8.16.custom.css" />

<!-- jquery插件包-必要 -->
<!-- 这个是所有jquery插件的基础，首先第一个引入 -->
<script src="${pageContext.request.contextPath}/js/jquery-2.1.4/jquery.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/js/jquery-ui-1.9.2/js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/js/jquery-ui-1.9.2/js/jquery.ui.datepicker-zh-CN.js" type="text/javascript"></script>

<!-- jqGrid插件包-必要 -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jqgrid/js/jquery.jqGrid.src.js"></script>

<!-- jqGrid插件的多语言包-非必要 -->
<!-- 在jqgrid/js/i18n下还有其他的多语言包，可以尝试更换看效果 -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jqgrid/js/i18n/grid.locale-cn.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>

<!-- layer -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/layer-v3.0.3/layer/layer.js"></script>
</head>
</html>