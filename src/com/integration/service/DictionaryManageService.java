/**
 * 
 */
package com.integration.service; 
import java.util.Map; 
/**
 * @author	zongshu
 *
 * @Description:
 *
 * @Date	2018年8月8日 下午12:44:50 
 */
 
public interface DictionaryManageService {  
	
	public Map<String, String> getXingzhengQuhuaMap();
	
	public Map<String, String> getBinghaiMap(); 
	
	public Map<String, String> getChonghaiMap(); 

	public Map<String, String> getShuHaiMap();
	
	public Map<String, String> getYouhaiZhiwuMap();
	
	public Map<String, String> getWeihaiBwMap();
	
	public Map<String, String> getWeihaiCdMap();
	
	public Map<String, String> getChongtaiMap();
	
	public Map<String, String> getBingjiMap();
	
	public Map<String, String> getYhswLbMap();
	
	public Map<String, String> getShugShmjMap();
	 
	
	public Map<String, String> GetMapByFieldName(String name,String guanl) ; 
	
	public String GetValueByFieldCode(String fieldName, String code,String guanl); 
	
	public String GetCodeByFieldValue(String fieldName,String value,String guanl); 
	
}
