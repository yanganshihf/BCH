package com.integration.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.ReportDAO;
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
import com.integration.service.ReportService;
@Service
public class ReportServiceImpl implements ReportService { 

	@Autowired
	ReportDAO nd;
	
	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_BZD_BHDC_FQ_COUNT(java.lang.String)
	 */
	@Override
	public List<String> YHSWXC_BZD_BHDC_FQ_COUNT(String id) {
		// TODO Auto-generated method stub
		return nd.YHSWXC_BZD_BHDC_FQCOUNTS(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_BZD_BHDC_FH_COUNT(java.lang.String)
	 */
	@Override
	public List<String> YHSWXC_BZD_BHDC_FH_COUNT(String id) {
		// TODO Auto-generated method stub
		return nd.YHSWXC_BZD_BHDC_FHCOUNTS(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_BZD_CHDC_FH_COUNT(java.lang.String)
	 */
	@Override
	public List<String> YHSWXC_BZD_CHDC_FH_COUNT(String id) {
		// TODO Auto-generated method stub
		return nd.YHSWXC_BZD_CHDC_FHCOUNTS(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YYHSWXC_BZD_CHDC_FQ_COUNT(java.lang.String)
	 */
	@Override
	public List<String> YYHSWXC_BZD_CHDC_FQ_COUNT(String id) {
		// TODO Auto-generated method stub
		return nd.YYHSWXC_BZD_CHDC_FQCOUNTS(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_BZD_SHDC_FH_COUNT(java.lang.String)
	 */
	@Override
	public List<String> YHSWXC_BZD_SHDC_FH_COUNT(String id) {
		// TODO Auto-generated method stub
		return nd.YHSWXC_BZD_SHDC_FHCOUNTS(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_BZD_SHDC_FQ_COUNT(java.lang.String)
	 */
	@Override
	public List<String> YHSWXC_BZD_SHDC_FQ_COUNT(String id) {
		// TODO Auto-generated method stub
		return nd.YHSWXC_BZD_SHDC_FQCOUNTS(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSW_TCJLB(java.lang.String)
	 */
	@Override
	public List<ReportPcTcd> YHSW_TCJLB(String id){
		// TODO Auto-generated method stub
		return nd.YHSW_TCJLB(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSW_BHYDBZD(java.lang.String)
	 */
	@Override
	public List<String> YHSW_BHYDBZD(String id) {
		// TODO Auto-generated method stub
		return nd.YHSW_BHYDBZD(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSW_BHYDJLB(java.lang.String)
	 */
	@Override
	public List<ReportPcBhyd> YHSW_BHYDJLB(String id) {
		// TODO Auto-generated method stub
		return nd.YHSW_BHYDJLB(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSW_CHYDBZD(java.lang.String)
	 */
	@Override
	public List<String> YHSW_CHYDBZD(String id) {
		// TODO Auto-generated method stub
		return nd.YHSW_CHYDBZD(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSW_CHYDJLB(java.lang.String)
	 */
	@Override
	public List<ReportPcChyd> YHSW_CHYDJLB(String id) {
		// TODO Auto-generated method stub
		return nd.YHSW_CHYDJLB(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSW_SHYDBZD(java.lang.String)
	 */
	@Override
	public List<String> YHSW_SHYDBZD(String id) {
		// TODO Auto-generated method stub
		return nd.YHSW_SHYDBZD(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSW_SHYDJLB(java.lang.String)
	 */
	@Override
	public List<ReportPcShyd> YHSW_SHYDJLB(String id) {
		// TODO Auto-generated method stub
		return nd.YHSW_SHYDJLB(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSW_ZWYDBZD(java.lang.String)
	 */
	@Override
	public List<String> YHSW_ZWYDBZD(String id) {
		// TODO Auto-generated method stub
		return nd.YHSW_ZWYDBZD(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSW_ZWYDJLB(java.lang.String)
	 */
	@Override
	public List<ReportPcYhswyd> YHSW_ZWYDJLB(String id) {
		// TODO Auto-generated method stub
		return nd.YHSW_ZWYDJLB(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSW_YCDJLB(java.lang.String)
	 */
	@Override
	public List<ReportPcYcdfc> YHSW_YCDJLB(String id) {
		// TODO Auto-generated method stub
		return nd.YHSW_YCDJLB(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSW_ZSGPJLB(java.lang.String)
	 */
	@Override
	public List<ReportPcYcZsgpfc> YHSW_ZSGPJLB(String id) {
		// TODO Auto-generated method stub
		return nd.YHSW_ZSGPJLB(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSW_MPJLB(java.lang.String)
	 */
	@Override
	public List<ReportPcMpfc> YHSW_MPJLB(String id) {
		// TODO Auto-generated method stub
		return nd.YHSW_MPJLB(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSW_BYXYHSWJLB(java.lang.String)
	 */
	@Override
	public List<ReportPcByxfc> YHSW_BYXYHSWJLB(String id) {
		// TODO Auto-generated method stub
		return nd.YHSW_BYXYHSWJLB(id);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_FQFHDCB(java.lang.String)
	 */
	@Override
	public List<ReportXcFzqh> YHSWXC_FQFHDCB(Map<String, Object> param){
		// TODO Auto-generated method stub
		return nd.YHSWXC_FQFHDCB(param);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_BZD_BHDC_FQ(java.lang.String)
	 */
	@Override
	public List<ReportXcBhdcFh> YHSWXC_BZD_BHDC_FQ(String id,String ydh) {
		// TODO Auto-generated method stub
		return nd.YHSWXC_BZD_BHDC_FQ(id,ydh);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_BZD_BHDC_FH(java.lang.String)
	 */
	@Override
	public List<ReportXcBhdcFh> YHSWXC_BZD_BHDC_FH(String id,String ydh) {
		// TODO Auto-generated method stub
		return nd.YHSWXC_BZD_BHDC_FH(id,ydh);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_BZD_CHDC_FH(java.lang.String)
	 */
	@Override
	public List<ReportXcChdcFh> YHSWXC_BZD_CHDC_FH(String id,String ydh) {
		// TODO Auto-generated method stub
		return nd.YHSWXC_BZD_CHDC_FH(id,ydh);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_BZD_CHDC_FQ(java.lang.String)
	 */
	@Override
	public List<ReportXcChdcFh> YHSWXC_BZD_CHDC_FQ(String id,String ydh) {
		// TODO Auto-generated method stub
		return nd.YHSWXC_BZD_CHDC_FQ(id,ydh);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_BZD_SHDC_FH(java.lang.String)
	 */
	@Override
	public List<ReportXcShdcFh> YHSWXC_BZD_SHDC_FH(String id,String ydh) {
		// TODO Auto-generated method stub
		return nd.YHSWXC_BZD_SHDC_FH(id,ydh);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_BZD_SHDC_FQ(java.lang.String)
	 */
	@Override
	public List<ReportXcShdcFh> YHSWXC_BZD_SHDC_FQ(String id,String ydh) {
		// TODO Auto-generated method stub
		return nd.YHSWXC_BZD_SHDC_FQ(id,ydh);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_BZD_BHHZ_FH(java.lang.String)
	 */
	@Override
	public List<ReportXcBhhzFh> YHSWXC_BZD_BHHZ_FH(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return nd.YHSWXC_BZD_BHHZ_FH(param);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_BZD_CHHZ_FH(java.lang.String)
	 */
	@Override
	public List<ReportXcChhzFh> YHSWXC_BZD_CHHZ_FH(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return nd.YHSWXC_BZD_CHHZ_FH(param);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_BZD_SHHZ_FH(java.lang.String)
	 */
	@Override
	public List<ReportXcShhzFh> YHSWXC_BZD_SHHZ_FH(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return nd.YHSWXC_BZD_SHHZ_FH(param);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_BZD_BHHZ_FQ(java.lang.String)
	 */
	@Override
	public List<ReportXcBhhzFh> YHSWXC_BZD_BHHZ_FQ(Map<String, Object> param){
		// TODO Auto-generated method stub
		return nd.YHSWXC_BZD_BHHZ_FQ(param);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_BZD_CHHZ_FQ(java.lang.String)
	 */
	@Override
	public List<ReportXcChhzFh> YHSWXC_BZD_CHHZ_FQ(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return nd.YHSWXC_BZD_CHHZ_FQ(param);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_BZD_SHHZ_FQ(java.lang.String)
	 */
	@Override
	public List<ReportXcShhzFh> YHSWXC_BZD_SHHZ_FQ(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return nd.YHSWXC_BZD_SHHZ_FQ(param);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_CZD_DCB_COUNT(java.util.Map)
	 */
	@Override
	public List<ReportCzmjDx> YHSWXC_CZD_DCB_COUNT(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return nd.YHSWXC_CZD_DCBCOUNTS(param);
	}

	/* (non-Javadoc)
	 * @see com.integration.service.ReportService#YHSWXC_CZD_DCB(java.lang.String)
	 */
	@Override
	public List<ReportCzmjDx> YHSWXC_CZD_DCB(String xiang,String cun,String xiaoban){
		// TODO Auto-generated method stub
		return nd.YHSWXC_CZD_DCB(xiang,cun,xiaoban);
	}
	
	 

}
