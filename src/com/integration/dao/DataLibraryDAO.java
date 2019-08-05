package com.integration.dao;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.integration.entity.Binghai;
import com.integration.entity.Bingji;
import com.integration.entity.Chonghai;
import com.integration.entity.Department;
import com.integration.entity.ShugShmj;
import com.integration.entity.WeihaiBw;
import com.integration.entity.WeihaiCd;
import com.integration.entity.XingzhengQuhua;
import com.integration.entity.YhswLb;

public interface DataLibraryDAO {
	
	@Select("select * from WEIHAI_BW")
	List<WeihaiBw> weihai_wb();
	
	@Select("select * from WEIHAI_CD")
	List<WeihaiCd> weihai_cd();
	
	@Select("select * from XINGZHENGQUHUA")
	List<XingzhengQuhua> xingzhengquhua();
	
	@Select("select * from YHSW_LB")
	List<YhswLb> yhsw_lb();
	
	@Select("select * from JZZW_LX")
	List<YhswLb> jzzw_lx();
	
	@Select("select * from CHONGHAI")
	List<Chonghai> chonghai();
	
	@Select("select * from SHUG_SHMJ")
	List<ShugShmj> shug_shmj();
	
	@Select("select * from BINGHAI")
	List<Binghai> binghai();
	
	@Select("select * from BINGJI")
	List<Bingji> Bingji();
	
	@Select("select * from WEIHAI_BW")
	List<YhswLb> weihai_bw();
	
	@Select("select * from CHONGTAI")
	List<Chonghai> chongtai();
	
	@Select("select * from department")
	List<Department> department();
	
}
