/**
 * 
 */
package com.integration.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.BinghaiMapper;
import com.integration.dao.BingjiMapper;
import com.integration.dao.ChonghaiMapper;
import com.integration.dao.ChongtaiMapper;
import com.integration.dao.ShuHaiMapper;
import com.integration.dao.ShugShmjMapper;
import com.integration.dao.WeihaiBwMapper;
import com.integration.dao.WeihaiCdMapper;
import com.integration.dao.XingzhengQuhuaMapper;
import com.integration.dao.YhswLbMapper;
import com.integration.dao.YouhaiZhiwuMapper;
import com.integration.entity.Binghai;
import com.integration.entity.Bingji;
import com.integration.entity.Chonghai;
import com.integration.entity.Chongtai;
import com.integration.entity.ShuHai;
import com.integration.entity.ShugShmj;
import com.integration.entity.WeihaiBw;
import com.integration.entity.WeihaiCd;
import com.integration.entity.XingzhengQuhua;
import com.integration.entity.YhswLb;
import com.integration.entity.YouhaiZhiwu;

/**
 * @author cl.he
 *
 * @Description:
 *
 * @Date 2018年8月8日 下午12:44:50
 */

@Service
public class DictionaryManageImpl implements com.integration.service.DictionaryManageService {
 
	@Autowired
	XingzhengQuhuaMapper xingzhengQuhuaMapper;
	
	@Autowired
	BinghaiMapper binghaiMapper;

	@Autowired
	ChonghaiMapper chonghaiMapper;

	@Autowired
	ShuHaiMapper shuHaiMapper;

	@Autowired
	YouhaiZhiwuMapper youhaiZhiwuMapper;

	@Autowired
	WeihaiBwMapper weihaiBwMapper;

	@Autowired
	WeihaiCdMapper weihaiCdMapper;

	@Autowired
	ChongtaiMapper chongtaiMapper;

	@Autowired
	BingjiMapper bingjiMapper; 
	
	@Autowired
	ShugShmjMapper shugShmjMapper; 
	
	@Autowired
	YhswLbMapper yhswLbMapper; 
	
	 
	Map<String, String> xingzhengQuhuaMap;

	Map<String, String> binghaiMap;

	Map<String, String> chonghaiMap;

	Map<String, String> shuHaiMap;

	Map<String, String> youhaiZhiwuMap;

	Map<String, String> weihaiBwMap;

	Map<String, String> weihaiCdMap;

	Map<String, String> chongtaiMap;

	Map<String, String> bingjiMap;

	Map<String, String> shugShmjMap;

	Map<String, String> yhswLbMap;
	
	@Override
	public Map<String, String> getShugShmjMap() {
		if (shugShmjMap == null) {
			shugShmjMap = new HashMap<String, String>();
			Map<Integer, ShugShmj> maps = shugShmjMapper.getAllReturnMap();
			for (Map.Entry<Integer, ShugShmj> entry : maps.entrySet()) {
				shugShmjMap.put(entry.getValue().getCode(), entry.getValue().getName());
			}
		}
		return shugShmjMap;
	}
	
	@Override
	public Map<String, String> getYhswLbMap() {
		if (yhswLbMap == null) {
			yhswLbMap = new HashMap<String, String>();
			Map<Integer, YhswLb> maps = yhswLbMapper.getAllReturnMap();
			for (Map.Entry<Integer, YhswLb> entry : maps.entrySet()) {
				yhswLbMap.put(entry.getValue().getCode(), entry.getValue().getName());
			}
		}
		return yhswLbMap;
	}
	
	@Override
	public Map<String, String> getXingzhengQuhuaMap() {
		if (xingzhengQuhuaMap == null) {
			xingzhengQuhuaMap = new HashMap<String, String>();
			Map<Integer, XingzhengQuhua> maps = xingzhengQuhuaMapper.getAllReturnMap();
			for (Map.Entry<Integer, XingzhengQuhua> entry : maps.entrySet()) {
				xingzhengQuhuaMap.put(entry.getValue().getCode(), entry.getValue().getName());
			}
		}
		return xingzhengQuhuaMap;
	}
	
	@Override
	public Map<String, String> getBinghaiMap() {
		if (binghaiMap == null) {
			binghaiMap = new HashMap<String, String>();
			Map<Integer, Binghai> maps = binghaiMapper.getAllReturnMap();
			for (Map.Entry<Integer, Binghai> entry : maps.entrySet()) {
				binghaiMap.put(entry.getValue().getCode(), entry.getValue().getName());
			}
		}
		return binghaiMap;
	}

	@Override
	public Map<String, String> getChonghaiMap() {
		if (chonghaiMap == null) {
			chonghaiMap = new HashMap<String, String>();
			Map<Integer, Chonghai> maps = chonghaiMapper.getAllReturnMap();
			for (Map.Entry<Integer, Chonghai> entry : maps.entrySet()) {
				chonghaiMap.put(entry.getValue().getCode(), entry.getValue().getName());
			}
		}
		return chonghaiMap;
	}

	@Override
	public Map<String, String> getShuHaiMap() {
		if (shuHaiMap == null) {
			shuHaiMap = new HashMap<String, String>();
			Map<Integer, ShuHai> maps = shuHaiMapper.getAllReturnMap();
			for (Map.Entry<Integer, ShuHai> entry : maps.entrySet()) {
				shuHaiMap.put(entry.getValue().getCode(), entry.getValue().getName());
			}
		}
		return shuHaiMap;
	}

	@Override
	public Map<String, String> getYouhaiZhiwuMap() {
		if (youhaiZhiwuMap == null) {
			youhaiZhiwuMap = new HashMap<String, String>();
			Map<Integer, YouhaiZhiwu> maps = youhaiZhiwuMapper.getAllReturnMap();
			for (Map.Entry<Integer, YouhaiZhiwu> entry : maps.entrySet()) {
				youhaiZhiwuMap.put(entry.getValue().getCode(), entry.getValue().getName());
			}
		}
		return youhaiZhiwuMap;
	}

	@Override
	public Map<String, String> getWeihaiBwMap() {
		if (weihaiBwMap == null) {
			weihaiBwMap = new HashMap<String, String>();
			Map<Integer, WeihaiBw> maps = weihaiBwMapper.getAllReturnMap();
			for (Map.Entry<Integer, WeihaiBw> entry : maps.entrySet()) {
				weihaiBwMap.put(entry.getValue().getCode(), entry.getValue().getName());
			}
		}
		return weihaiBwMap;
	}

	@Override
	public Map<String, String> getWeihaiCdMap() {
		if (weihaiCdMap == null) {
			weihaiCdMap = new HashMap<String, String>();
			Map<Integer, WeihaiCd> maps = weihaiCdMapper.getAllReturnMap();
			for (Map.Entry<Integer, WeihaiCd> entry : maps.entrySet()) {
				weihaiCdMap.put(entry.getValue().getCode(), entry.getValue().getName());
			}
		}
		return weihaiCdMap;
	}

	@Override
	public Map<String, String> getChongtaiMap() {
		if (chongtaiMap == null) {
			chongtaiMap = new HashMap<String, String>();
			Map<Integer, Chongtai> maps = chongtaiMapper.getAllReturnMap();
			for (Map.Entry<Integer, Chongtai> entry : maps.entrySet()) {
				chongtaiMap.put(entry.getValue().getCode(), entry.getValue().getName());
			}
		}
		return chongtaiMap;
	}

	@Override
	public Map<String, String> getBingjiMap() {
		if (bingjiMap == null) {
			bingjiMap = new HashMap<String, String>();
			Map<Integer, Bingji> maps = bingjiMapper.getAllReturnMap();
			for (Map.Entry<Integer, Bingji> entry : maps.entrySet()) {
				bingjiMap.put(entry.getValue().getCode(), entry.getValue().getName());
			}
		}
		return bingjiMap;
	}

	 
	
	/**
	 * 需要更改
	 */
	@Override
	public Map<String, String> GetMapByFieldName(String name,String guanl) {
		switch (name) { 
		// 有害生物类别
		case "YHSW_LB": 
			return getYhswLbMap();			
		// 有害生物名称
		case "YHSW_MC": 
			switch(guanl) {
			    case "1": return getBinghaiMap();		
			    case "2": return getChonghaiMap();		
			    case "3": return getShuHaiMap();		
			    case "4": return getYouhaiZhiwuMap();	
			}
		// 危害部位
		case "WEIHAI_BW":
			return getWeihaiBwMap();
		/*// 影像生长环境因素
		case "WEIHAI_CD":
			return getWeihaiCdMap();*/
		// 生长场所
		case "CHONGTAI":
			return getChongtaiMap();
		// 管护现状（古树群）
		case "KUNCHONG":
			return getChonghaiMap();
		// 生长势
		case "BING_JI":
			return getBingjiMap();
		// 古树等级
		case "SHUG_SHMJ":
			return getShugShmjMap();
		// 古树划分类别
		case "WEIHAI_Q":
			return getChongtaiMap();
		default:
			return null;
		}
	}

	@Override
	public String GetValueByFieldCode(String fieldName, String code,String guanl) {
		Map<String, String> maps = GetMapByFieldName(fieldName,guanl);
		if (maps != null) {
			if (maps.containsKey(code))
				return maps.get(code);
			else
				return code;
		}
		return code;
	}

	@Override
	public String GetCodeByFieldValue(String fieldName, String value,String guanl) {
		Map<String, String> maps = GetMapByFieldName(fieldName,guanl);
		if (maps != null) {
			if (maps.containsValue(value)) {
				for (Map.Entry<String, String> entry : maps.entrySet()) {
					if (entry.getValue().equals(value)) {
						return entry.getKey();
					}
				}
			}
			else
				return "";
		}
		return "";
	}
}
