package com.integration.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.ResultType;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;

import com.integration.entity.ReportCzmjDx;
import com.integration.entity.ReportPcBhyd;
import com.integration.entity.ReportPcByxfc;
import com.integration.entity.ReportPcChyd;
import com.integration.entity.ReportPcMpfc;
import com.integration.entity.ReportPcShyd;
import com.integration.entity.ReportPcTcd;
import com.integration.entity.ReportPcYcZsgpfc;
import com.integration.entity.ReportPcYcdfc;
import com.integration.entity.ReportPcYhswyd;
import com.integration.entity.ReportXcBhdcFh;
import com.integration.entity.ReportXcBhhzFh;
import com.integration.entity.ReportXcChdcFh;
import com.integration.entity.ReportXcChhzFh;
import com.integration.entity.ReportXcFzqh;
import com.integration.entity.ReportXcShdcFh;
import com.integration.entity.ReportXcShhzFh; 

public interface ReportDAO { 
	
	//林业有害生物踏查记录表   YHSWPC_YX	YHSWPC_TCD
	@Select("SELECT a.*,b.* FROM YHSWPC_YX a INNER JOIN YHSWPC_TCD b ON a.UUID_YX = b.UUID_YX WHERE a.UUID_YX = #{0} order by b.TCD_BH")
	public List<ReportPcTcd> YHSW_TCJLB(String id);	
	
	//林木病害样地详查记录表  YHSWPC_BZD YHSWPC_BZD_BHDC
	@ResultType(String.class)
	@Select("SELECT DISTINCT(UUID_BZD) FROM YHSWPC_BZD_BHDC WHERE UUID_YX = #{0}")
	public List<String>  YHSW_BHYDBZD(String id);	
	
	@Select("SELECT a.*,b.*,c.DIAOCHA_RY,c.DIAOCHA_SJ,c.XIAN_MC,c.XIAN,c.XIANG_MC,c.XIANG FROM YHSWPC_BZD a INNER JOIN YHSWPC_BZD_BHDC b ON a.UUID_BZD = b.UUID_BZD INNER JOIN YHSWPC_YX c ON c.UUID_YX = b.UUID_YX WHERE a.UUID_BZD = #{0} order by b.BZD_BH")
	public List<ReportPcBhyd> YHSW_BHYDJLB(String id);	
	
	//林木虫害样地详查记录表 YHSWPC_BZD YHSWPC_BZD_CHDC
	@ResultType(String.class)
	@Select("SELECT DISTINCT(UUID_BZD) FROM YHSWPC_BZD_CHDC WHERE UUID_YX = #{0}")
	public List<String>  YHSW_CHYDBZD(String id);	
	
	@Select("SELECT a.*,b.*,c.DIAOCHA_RY,c.DIAOCHA_SJ,c.XIAN_MC,c.XIAN,c.XIANG_MC,c.XIANG FROM YHSWPC_BZD a INNER JOIN YHSWPC_BZD_CHDC b ON a.UUID_BZD = b.UUID_BZD INNER JOIN YHSWPC_YX c ON c.UUID_YX = b.UUID_YX  WHERE a.UUID_BZD = #{0} order by b.BZD_BH")
	public List<ReportPcChyd> YHSW_CHYDJLB(String id); 
	
	//林业地下鼠样地详查记录表 YHSWPC_BZD YHSWPC_BZD_SHDC
	@ResultType(String.class)
	@Select("SELECT DISTINCT(UUID_BZD) FROM YHSWPC_BZD_SHDC WHERE UUID_YX = #{0}")
	public List<String>  YHSW_SHYDBZD(String id);	
	
	@Select("SELECT a.*,b.*,c.DIAOCHA_RY,c.DIAOCHA_SJ,c.XIAN_MC,c.XIAN,c.XIANG_MC,c.XIANG FROM YHSWPC_BZD a INNER JOIN YHSWPC_BZD_SHDC b ON a.UUID_BZD = b.UUID_BZD INNER JOIN YHSWPC_YX c ON c.UUID_YX = b.UUID_YX WHERE a.UUID_BZD = #{0} order by b.BZD_BH")
	public List<ReportPcShyd> YHSW_SHYDJLB(String id); 
	
	//林业有害植物样地详查记录表  YHSWPC_BZD YHSWPC_BZD_YHZWDC
	@ResultType(String.class)
	@Select("SELECT DISTINCT(UUID_BZD) FROM YHSWPC_BZD_YHZWDC WHERE UUID_YX = #{0}")
	public List<String>  YHSW_ZWYDBZD(String id);	
	
	@Select("SELECT a.*,b.*,c.DIAOCHA_RY,c.DIAOCHA_SJ,c.XIAN_MC,c.XIAN,c.XIANG_MC,c.XIANG FROM YHSWPC_BZD a INNER JOIN YHSWPC_BZD_YHZWDC b ON a.UUID_BZD = b.UUID_BZD INNER JOIN YHSWPC_YX c ON c.UUID_YX = b.UUID_YX WHERE a.UUID_BZD = #{0} order by b.BZD_BH")
	public List<ReportPcYhswyd> YHSW_ZWYDJLB(String id);  
	
	//辅助调查（诱虫灯、引诱剂）调查记录表  YHSWPC_YZD  YHSWPC_YZDDC
	@Select("SELECT a.*,b.* FROM YHSWPC_YCD a INNER JOIN YHSWPC_YCDDC b ON a.UUID_YCD = b.UUID_YCD WHERE a.UUID_YCD = #{0} order by b.LAST_CHANGETIME")
	public List<ReportPcYcdfc> YHSW_YCDJLB(String id);  
	
	//种实、果品、花卉、木材及其制品有害生物调查记录表  YHSWPC_ZSGP YHSWPC_ZSGPDC
	@Select("SELECT a.*,b.* FROM YHSWPC_ZSGP a INNER JOIN YHSWPC_ZSGPDC b ON a.UUID_ZSGP = b.UUID_ZSGP WHERE a.UUID_ZSGP = #{0} order by b.LAST_CHANGETIME")
	public List<ReportPcYcZsgpfc> YHSW_ZSGPJLB(String id);  
	
	//苗圃（花圃）有害生物调查记录表  YHSWPC_MP YHSWPC_MPDC
	@Select("SELECT a.*,b.* FROM YHSWPC_MP a INNER JOIN YHSWPC_MPDC b ON a.UUID_MP = b.UUID_MP WHERE a.UUID_MP = #{0} order by b.LAST_CHANGETIME")
	public List<ReportPcMpfc> YHSW_MPJLB(String id);  
	
	
	//检疫性有害生物及国（境）外或省级行政区外传入的林业有害生物调查表  YHSWPC_JYX YHSWPC_JYXDC
	@Select("SELECT a.*,b.* FROM YHSWPC_JYX a INNER JOIN YHSWPC_JYX_DC b ON a.UUID_JYX = b.UUID_JYX WHERE a.UUID_JYX = #{0} order by b.LAST_CHANGETIME")
	public List<ReportPcByxfc> YHSW_BYXYHSWJLB(String id);  
	
	//林业有害生物防治防前防后调查表   YHSWXC_FQFHDCB 
	@SelectProvider(type=com.integration.dao.XiaoBanDynaSqlProvider.class,method="selectXiaoBanParamSql")
	public List<ReportXcFzqh> YHSWXC_FQFHDCB(Map<String, Object> param);  
	
	//病害防后调查表（标准地详查表）  按照标准地查询样方唯一编码
	@ResultType(String.class)
	@Select("SELECT DISTINCT(YANGF_H) FROM YHSWXC_BZD_BHDC_FQ WHERE UUID_BZD = #{0}")
	public List<String>  YHSWXC_BZD_BHDC_FQCOUNTS(String id);
	
	//病害防后调查表（标准地详查表）   YHSWXC_BZD YHSWXC_BZD_BHDC_FQ
	@Select("SELECT a.*,b.* FROM YHSWXC_BZD a INNER JOIN YHSWXC_BZD_BHDC_FQ b ON a.UUID_BZD = b.UUID_BZD WHERE a.UUID_BZD = #{0} and b.YANGF_H= #{1} order by b.LAST_CHANGETIME")
	public List<ReportXcBhdcFh> YHSWXC_BZD_BHDC_FQ(String id,String ydh); 
	
	//病害防前调查表（标准地详查表）  按照标准地查询样方唯一编码
	@ResultType(String.class)
	@Select("SELECT DISTINCT(YANGF_H) FROM YHSWXC_BZD_BHDC_FH WHERE UUID_BZD = #{0}")
	public List<String>  YHSWXC_BZD_BHDC_FHCOUNTS(String id);
	
	//病害防前调查表（标准地详查表）   YHSWXC_BZD YHSWXC_BZD_BHDC_FH
	@Select("SELECT a.*,b.* FROM YHSWXC_BZD a INNER JOIN YHSWXC_BZD_BHDC_FH b ON a.UUID_BZD = b.UUID_BZD WHERE a.UUID_BZD = #{0} and b.YANGF_H= #{1} order by b.LAST_CHANGETIME")
	public List<ReportXcBhdcFh> YHSWXC_BZD_BHDC_FH(String id,String ydh); 
	
	//虫害防前调查表（标准地详查表）  按照标准地查询样方唯一编码
	@ResultType(String.class)
	@Select("SELECT DISTINCT(YANGF_H) FROM YHSWXC_BZD_CHDC_FH WHERE UUID_BZD = #{0}")
	public List<String>  YHSWXC_BZD_CHDC_FHCOUNTS(String id);
	
	//虫害防后调查表（标准地详查表）  YHSWXC_BZD YHSWXC_BZD_CHDC_FH
	@Select("SELECT a.*,b.* FROM YHSWXC_BZD a INNER JOIN YHSWXC_BZD_CHDC_FH b ON a.UUID_BZD = b.UUID_BZD WHERE a.UUID_BZD = #{0} and b.YANGF_H= #{1} order by b.LAST_CHANGETIME")
	public List<ReportXcChdcFh> YHSWXC_BZD_CHDC_FH(String id,String ydh); 
	
	//虫害防前调查表（标准地详查表）  按照标准地查询样方唯一编码
	@ResultType(String.class)
	@Select("SELECT DISTINCT(YANGF_H) FROM YHSWXC_BZD_CHDC_FQ WHERE UUID_BZD = #{0}")
	public List<String>  YYHSWXC_BZD_CHDC_FQCOUNTS(String id);
	
	//虫害防前调查表（标准地详查表）   YHSWXC_BZD YHSWXC_BZD_CHDC_FQ
	@Select("SELECT a.*,b.* FROM YHSWXC_BZD a INNER JOIN YHSWXC_BZD_CHDC_FQ b ON a.UUID_BZD = b.UUID_BZD WHERE a.UUID_BZD = #{0} and b.YANGF_H= #{1} order by b.LAST_CHANGETIME")
	public List<ReportXcChdcFh> YHSWXC_BZD_CHDC_FQ(String id,String ydh); 
	
	//虫害防前调查表（标准地详查表）  按照标准地查询样方唯一编码
	@ResultType(String.class)
	@Select("SELECT DISTINCT(YANGF_H) FROM YHSWXC_BZD_SHDC_FH WHERE UUID_BZD = #{0}")
	public List<String>  YHSWXC_BZD_SHDC_FHCOUNTS(String id);
	
	//鼠害防后调查表（标准地详查表）  YHSWXC_BZD YHSWXC_BZD_SHDC_FH
	@Select("SELECT a.*,b.* FROM YHSWXC_BZD a INNER JOIN YHSWXC_BZD_SHDC_FH b ON a.UUID_BZD = b.UUID_BZD WHERE a.UUID_BZD = #{0} and b.YANGF_H= #{1} order by b.LAST_CHANGETIME")
	public List<ReportXcShdcFh> YHSWXC_BZD_SHDC_FH(String id,String ydh); 
	
	//虫害防前调查表（标准地详查表）  按照标准地查询样方唯一编码
	@ResultType(String.class)
	@Select("SELECT DISTINCT(YANGF_H) FROM YHSWXC_BZD_SHDC_FQ WHERE UUID_BZD = #{0}")
	public List<String>  YHSWXC_BZD_SHDC_FQCOUNTS(String id);
		
	//鼠害防前调查表（标准地详查表）   YHSWXC_BZD YHSWXC_BZD_SHDC_FQ
	@Select("SELECT a.*,b.* FROM YHSWXC_BZD a INNER JOIN YHSWXC_BZD_SHDC_FQ b ON a.UUID_BZD = b.UUID_BZD WHERE a.UUID_BZD = #{0} and b.YANGF_H= #{1} order by b.LAST_CHANGETIME")
	public List<ReportXcShdcFh> YHSWXC_BZD_SHDC_FQ(String id,String ydh); 
	
	
	
	
	//病害防后调查表（标准地调查汇总表）   YHSWXC_BZD YHSWXC_BZD_BHHZ_FH
	//@Select("SELECT a.*,b.* FROM YHSWXC_BZD a INNER JOIN YHSWXC_BZD_BHHZ_FH b ON a.UUID_BZD = b.UUID_BZD WHERE a.UUID_BZD = #{0} order by b.LAST_CHANGETIME")
	@SelectProvider(type=com.integration.dao.XiaoBanDynaSqlProvider.class,method="YHSWXC_BZD_BHHZ_FH")
	public List<ReportXcBhhzFh> YHSWXC_BZD_BHHZ_FH(Map<String, Object> param);  
	
	//虫害防后调查表（标准地调查汇总表）YHSWXC_BZD YHSWXC_BZD_CHHZ_FH
	//@Select("SELECT a.*,b.* FROM YHSWXC_BZD a INNER JOIN YHSWXC_BZD_CHHZ_FH b ON a.UUID_BZD = b.UUID_BZD WHERE a.UUID_BZD = #{0} order by b.LAST_CHANGETIME")
	@SelectProvider(type=com.integration.dao.XiaoBanDynaSqlProvider.class,method="YHSWXC_BZD_CHHZ_FH")
	public List<ReportXcChhzFh> YHSWXC_BZD_CHHZ_FH(Map<String, Object> param);  
	
	//鼠害防后调查表（标准地调查汇总表）   YHSWXC_BZD YHSWXC_BZD_SHHZ_FH
	//@Select("SELECT a.*,b.* FROM YHSWXC_BZD a INNER JOIN YHSWXC_BZD_SHHZ_FH b ON a.UUID_BZD = b.UUID_BZD WHERE a.UUID_BZD = #{0} order by b.LAST_CHANGETIME")
	@SelectProvider(type=com.integration.dao.XiaoBanDynaSqlProvider.class,method="YHSWXC_BZD_SHHZ_FH")
	public List<ReportXcShhzFh> YHSWXC_BZD_SHHZ_FH(Map<String, Object> param);  
	
	//病害防前调查表（标准地调查汇总表）   YHSWXC_BZD YHSWXC_BZD_BHHZ_FQ
	//@Select("SELECT a.*,b.* FROM YHSWXC_BZD a INNER JOIN YHSWXC_BZD_BHHZ_FQ b ON a.UUID_BZD = b.UUID_BZD WHERE a.UUID_BZD = #{0} order by b.LAST_CHANGETIME")
	@SelectProvider(type=com.integration.dao.XiaoBanDynaSqlProvider.class,method="YHSWXC_BZD_BHHZ_FQ")
	public List<ReportXcBhhzFh> YHSWXC_BZD_BHHZ_FQ(Map<String, Object> param);  
	
	//虫害防前调查表（标准地调查汇总表）   YHSWXC_BZD YHSWXC_BZD_CHHZ_FQ
	//@Select("SELECT a.*,b.* FROM YHSWXC_BZD a INNER JOIN YHSWXC_BZD_CHHZ_FQ b ON a.UUID_BZD = b.UUID_BZD WHERE a.UUID_BZD = #{0} order by b.LAST_CHANGETIME")
	@SelectProvider(type=com.integration.dao.XiaoBanDynaSqlProvider.class,method="YHSWXC_BZD_CHHZ_FQ")
	public List<ReportXcChhzFh> YHSWXC_BZD_CHHZ_FQ(Map<String, Object> param);  
	
	//鼠害防前调查表（标准地调查汇总表） YHSWXC_BZD YHSWXC_BZD_SHHZ_FQ
	//@Select("SELECT a.*,b.* FROM YHSWXC_BZD a INNER JOIN YHSWXC_BZD_SHHZ_FQ b ON a.UUID_BZD = b.UUID_BZD WHERE a.UUID_BZD = #{0} order by b.LAST_CHANGETIME")
	@SelectProvider(type=com.integration.dao.XiaoBanDynaSqlProvider.class,method="YHSWXC_BZD_SHHZ_FQ")
	public List<ReportXcShhzFh> YHSWXC_BZD_SHHZ_FQ(Map<String, Object> param);  
	
	//成灾面积调差表  YHSWXC_CZD   YHSWXC_CZD_DC
	@SelectProvider(type=com.integration.dao.XiaoBanDynaSqlProvider.class,method="YHSWXC_CZD_DCB_COUNT")
	public List<ReportCzmjDx> YHSWXC_CZD_DCBCOUNTS(Map<String, Object> param);    
	
	//成灾面积调差表  YHSWXC_CZD   YHSWXC_CZD_DC
	@Select("SELECT a.*,b.* FROM YHSWXC_CZD a INNER JOIN YHSWXC_CZD_DC b ON a.UUID_CZD = b.UUID_CZD WHERE a.XIANG = #{0} and a.CUN= #{1} and a.XIAO_BAN= #{2} order by b.LAST_CHANGETIME")
	public List<ReportCzmjDx> YHSWXC_CZD_DCB(String xiang,String cun,String xiaoban); 
}
