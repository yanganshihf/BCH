/**
 * 
 */
 package com.integration.dao;

import java.util.Map;

import org.apache.ibatis.jdbc.SQL;

/**
 * @author zonghsu
 *
 * @Description:简单查询中构建动态条件查询语句
 *
 * @Date 2019年2月1日 下午3:41:47
 */
public class XiaoBanDynaSqlProvider { 
	public String selectXiaoBanParamSql(Map<String, Object> param) {
		return new SQL() {
			{
				SELECT("*");
				FROM("YHSWXC_FQFHDCB"); 
				// 林管局
				if (param.get("XU_HAO") != null) {
					String  dls = param.get("XU_HAO").toString();
					String[] yxs=dls.split(","); 
					String wheresql = "";
					for (int i = 0; i < yxs.length; i++) {
						wheresql += " XU_HAO = '" + yxs[i] + "' or ";
					}
					wheresql = "(" + wheresql.substring(0, wheresql.length() - 4) + ")";
					WHERE(wheresql);
				} 
			}
		}.toString();
	}
	
	
	
	public String YHSWXC_BZD_BHHZ_FH(Map<String, Object> param) {
		return new SQL() {
			{
				SELECT("a.*,b.*");
				FROM("YHSWXC_BZD a INNER JOIN YHSWXC_BZD_BHHZ_FH b ON a.UUID_BZD = b.UUID_BZD"); 
				// 林管局
				if (param.get("UUID_BZD") != null) {
					String  dls = param.get("UUID_BZD").toString();
					String[] yxs=dls.split(","); 
					String wheresql = "";
					for (int i = 0; i < yxs.length; i++) {
						wheresql += " a.UUID_BZD = '" + yxs[i] + "' or ";
					}
					wheresql = "(" + wheresql.substring(0, wheresql.length() - 4) + ")";
					WHERE(wheresql);
				} 
			}
		}.toString();
	}
	
	public String YHSWXC_BZD_CHHZ_FH(Map<String, Object> param) {
		return new SQL() {
			{
				SELECT("a.*,b.*");
				FROM("YHSWXC_BZD a INNER JOIN YHSWXC_BZD_CHHZ_FH b ON a.UUID_BZD = b.UUID_BZD"); 
				// 林管局
				if (param.get("UUID_BZD") != null) {
					String  dls = param.get("UUID_BZD").toString();
					String[] yxs=dls.split(","); 
					String wheresql = "";
					for (int i = 0; i < yxs.length; i++) {
						wheresql += " a.UUID_BZD = '" + yxs[i] + "' or ";
					}
					wheresql = "(" + wheresql.substring(0, wheresql.length() - 4) + ")";
					WHERE(wheresql);
				} 
			}
		}.toString();
	}
	
	public String YHSWXC_BZD_SHHZ_FH(Map<String, Object> param) {
		return new SQL() {
			{
				SELECT("a.*,b.*");
				FROM("YHSWXC_BZD a INNER JOIN YHSWXC_BZD_SHHZ_FH b ON a.UUID_BZD = b.UUID_BZD"); 
				// 林管局
				if (param.get("UUID_BZD") != null) {
					String  dls = param.get("UUID_BZD").toString();
					String[] yxs=dls.split(","); 
					String wheresql = "";
					for (int i = 0; i < yxs.length; i++) {
						wheresql += " a.UUID_BZD = '" + yxs[i] + "' or ";
					}
					wheresql = "(" + wheresql.substring(0, wheresql.length() - 4) + ")";
					WHERE(wheresql);
				} 
			}
		}.toString();
	}
	
	public String YHSWXC_BZD_BHHZ_FQ(Map<String, Object> param) {
		return new SQL() {
			{
				SELECT("a.*,b.*");
				FROM("YHSWXC_BZD a INNER JOIN YHSWXC_BZD_BHHZ_FQ b ON a.UUID_BZD = b.UUID_BZD"); 
				// 林管局
				if (param.get("UUID_BZD") != null) {
					String  dls = param.get("UUID_BZD").toString();
					String[] yxs=dls.split(","); 
					String wheresql = "";
					for (int i = 0; i < yxs.length; i++) {
						wheresql += " a.UUID_BZD = '" + yxs[i] + "' or ";
					}
					wheresql = "(" + wheresql.substring(0, wheresql.length() - 4) + ")";
					WHERE(wheresql);
				} 
			}
		}.toString();
	}
	
	public String YHSWXC_BZD_CHHZ_FQ(Map<String, Object> param) {
		return new SQL() {
			{
				SELECT("a.*,b.*");
				FROM("YHSWXC_BZD a INNER JOIN YHSWXC_BZD_CHHZ_FQ b ON a.UUID_BZD = b.UUID_BZD"); 
				// 林管局
				if (param.get("UUID_BZD") != null) {
					String  dls = param.get("UUID_BZD").toString();
					String[] yxs=dls.split(","); 
					String wheresql = "";
					for (int i = 0; i < yxs.length; i++) {
						wheresql += " a.UUID_BZD = '" + yxs[i] + "' or ";
					}
					wheresql = "(" + wheresql.substring(0, wheresql.length() - 4) + ")";
					WHERE(wheresql);
				} 
			}
		}.toString();
	}
	
	public String YHSWXC_BZD_SHHZ_FQ(Map<String, Object> param) {
		return new SQL() {
			{
				SELECT("a.*,b.*");
				FROM("YHSWXC_BZD a INNER JOIN YHSWXC_BZD_SHHZ_FQ b ON a.UUID_BZD = b.UUID_BZD"); 
				// 林管局
				if (param.get("UUID_BZD") != null) {
					String  dls = param.get("UUID_BZD").toString();
					String[] yxs=dls.split(","); 
					String wheresql = "";
					for (int i = 0; i < yxs.length; i++) {
						wheresql += "a.UUID_BZD = '" + yxs[i] + "' or ";
					}
					wheresql = "(" + wheresql.substring(0, wheresql.length() - 4) + ")";
					WHERE(wheresql);
				} 
			}
		}.toString();
	}
 
	public String YHSWXC_CZD_DCB_COUNT(Map<String, Object> param) {
		return new SQL() {
			{
				SELECT("DISTINCT XIANG,CUN,XIAO_BAN");
				FROM("YHSWXC_CZD"); 
				// 林管局
				if (param.get("UUID_CZD") != null) {
					String  dls = param.get("UUID_CZD").toString();
					String[] yxs=dls.split(","); 
					String wheresql = "";
					for (int i = 0; i < yxs.length; i++) {
						wheresql += "UUID_CZD = '" + yxs[i] + "' or ";
					}
					wheresql = "(" + wheresql.substring(0, wheresql.length() - 4) + ")";
					WHERE(wheresql);
				} 
			}
		}.toString();
	}
}
