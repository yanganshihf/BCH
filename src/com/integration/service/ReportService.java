package com.integration.service;

import java.util.List;
import java.util.Map;

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

public interface ReportService { 
	public List<ReportPcTcd> YHSW_TCJLB(String id);	

	public List<String>  YHSW_BHYDBZD(String id);

	public List<ReportPcBhyd> YHSW_BHYDJLB(String id);	
	
	public List<String>  YHSW_CHYDBZD(String id);
	
	public List<ReportPcChyd> YHSW_CHYDJLB(String id); 
	
	public List<String>  YHSW_SHYDBZD(String id);
	
	public List<ReportPcShyd> YHSW_SHYDJLB(String id); 
	
	public List<String>  YHSW_ZWYDBZD(String id);
	
	public List<ReportPcYhswyd> YHSW_ZWYDJLB(String id); 
	
	public List<ReportPcYcdfc> YHSW_YCDJLB(String id); 
	
	public List<ReportPcYcZsgpfc> YHSW_ZSGPJLB(String id); 
	
	public List<ReportPcMpfc> YHSW_MPJLB(String id);
	
	public List<ReportPcByxfc> YHSW_BYXYHSWJLB(String id);
	
	public List<ReportXcFzqh> YHSWXC_FQFHDCB(Map<String, Object> param); 
	
	public List<String>  YHSWXC_BZD_BHDC_FQ_COUNT(String id);
	
	public List<ReportXcBhdcFh> YHSWXC_BZD_BHDC_FQ(String id,String ydh);  
	
	public List<String>  YHSWXC_BZD_BHDC_FH_COUNT(String id);
	
	public List<ReportXcBhdcFh> YHSWXC_BZD_BHDC_FH(String id,String ydh);  
	
	public List<String>  YHSWXC_BZD_CHDC_FH_COUNT(String id);
	
	public List<ReportXcChdcFh> YHSWXC_BZD_CHDC_FH(String id,String ydh);  
	
	public List<String>  YYHSWXC_BZD_CHDC_FQ_COUNT(String id);
	
	public List<ReportXcChdcFh> YHSWXC_BZD_CHDC_FQ(String id,String ydh);  
	
	public List<String>  YHSWXC_BZD_SHDC_FH_COUNT(String id);
	
	public List<ReportXcShdcFh> YHSWXC_BZD_SHDC_FH(String id,String ydh);  
	
	public List<String>  YHSWXC_BZD_SHDC_FQ_COUNT(String id);
	
	public List<ReportXcShdcFh> YHSWXC_BZD_SHDC_FQ(String id,String ydh);  
	
	
	public List<ReportXcBhhzFh> YHSWXC_BZD_BHHZ_FH(Map<String, Object> param);  
	
	public List<ReportXcChhzFh> YHSWXC_BZD_CHHZ_FH(Map<String, Object> param);  
	
	public List<ReportXcShhzFh> YHSWXC_BZD_SHHZ_FH(Map<String, Object> param);  
	
	public List<ReportXcBhhzFh> YHSWXC_BZD_BHHZ_FQ(Map<String, Object> param);  
	
	public List<ReportXcChhzFh> YHSWXC_BZD_CHHZ_FQ(Map<String, Object> param);  
	
	public List<ReportXcShhzFh> YHSWXC_BZD_SHHZ_FQ(Map<String, Object> param);  
	
	public List<ReportCzmjDx> YHSWXC_CZD_DCB_COUNT(Map<String, Object> param);
	
	public List<ReportCzmjDx> YHSWXC_CZD_DCB(String xiang,String cun,String xiaoban); 
	
	
}
