package com.integration.service;

import java.util.List;
import com.integration.entity.Binghai;
import com.integration.entity.Chonghia;
import com.integration.entity.ShuHai;
import com.integration.entity.XingzhengQuhua;
import com.integration.entity.YouhaiZhiwu;

public interface CodeManageService {

    public List<Binghai> queryCodeManageBinghai(String name,String code);
    public Integer deleteCodeManageBinghai(String[] ids);
    public Integer addCodeManageBinghai(Binghai binghai);
    
    public List<Chonghia> queryCodeManageChonghai(String name,String code);
    public Integer deleteCodeManageChonghai(String[] ids);
    public Integer addCodeManageChonghai(Chonghia chonghai);
    
    public List<ShuHai> queryCodeManageShuhai(String name,String code);
    public Integer deleteCodeManageShuhai(String[] ids);
    public Integer addCodeManageShuhai(ShuHai shuhai);
    
    public List<YouhaiZhiwu> queryCodeManageYouhaizhiwu(String name,String code);
    public Integer deleteCodeManageYouhaizhiwu(String[] ids);
    public Integer addCodeManageYouhaizhiwu(YouhaiZhiwu youhaizhiwu);
    
    public List<XingzhengQuhua> queryCodeManageXingzhengquhua(String name,String code);
    public Integer deleteCodeManageXingzhengquhua(String[] ids);
    public Integer addCodeManageXingzhengquhua(XingzhengQuhua xingzhengquhua);
}
