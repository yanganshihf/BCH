package com.integration.service.impl;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.integration.dao.BinghaiMapper;
import com.integration.dao.ChonghiaMapper;
import com.integration.dao.ShuHaiMapper;
import com.integration.dao.XingzhengQuhuaMapper;
import com.integration.dao.YouhaiZhiwuMapper;
import com.integration.entity.Binghai;
import com.integration.entity.BinghaiExample;
import com.integration.entity.BinghaiExample.Criteria;
import com.integration.entity.Chonghia;
import com.integration.entity.ChonghiaExample;
import com.integration.entity.ShuHai;
import com.integration.entity.ShuHaiExample;
import com.integration.entity.XingzhengQuhua;
import com.integration.entity.XingzhengQuhuaExample;
import com.integration.entity.YouhaiZhiwu;
import com.integration.entity.YouhaiZhiwuExample;
import com.integration.service.CodeManageService;
@Service
public class CodeManageServiceImpl implements CodeManageService{
    @Autowired
    private BinghaiMapper binghaiMapper;
    @Autowired 
    private ChonghiaMapper chonghiaMapper;
    @Autowired
    private ShuHaiMapper shuHaiMapper;
    @Autowired
    private YouhaiZhiwuMapper youhaiZhiwuMapper;
    @Autowired
    private XingzhengQuhuaMapper xingzhengQuhuaMapper;
    @Override
    public List<Binghai> queryCodeManageBinghai(String name, String code) {
        BinghaiExample example = new BinghaiExample();
        Criteria c = example.createCriteria();
        c.andCodeLike("%"+code+"%");
        c.andNameLike("%"+name+"%");
        return binghaiMapper.selectByExample(example);
    }
    @Override
    public Integer deleteCodeManageBinghai(String[] ids) {
        BinghaiExample example = new BinghaiExample();
        Criteria c = example.createCriteria();
        List<String> list=Arrays.asList(ids);
        c.andIdIn(list);
        return binghaiMapper.deleteByExample(example);
    }
    @Override
    public Integer addCodeManageBinghai(Binghai binghai) {
        binghai.setId(UUID.randomUUID().toString());
        return binghaiMapper.insert(binghai);
    }
    
    @Override
    public List<Chonghia> queryCodeManageChonghai(String name, String code) {
        ChonghiaExample example = new ChonghiaExample();
        ChonghiaExample.Criteria  c = example.createCriteria();
        c.andCodeLike("%"+code+"%");
        c.andNameLike("%"+name+"%");
        return chonghiaMapper.selectByExample(example);
    }
    @Override
    public Integer deleteCodeManageChonghai(String[] ids) {
        ChonghiaExample example = new ChonghiaExample();
        ChonghiaExample.Criteria c = example.createCriteria();
        List<String> list=Arrays.asList(ids);
        c.andIdIn(list);
        return chonghiaMapper.deleteByExample(example);
    }
    @Override
    public Integer addCodeManageChonghai(Chonghia chonghia) {
        chonghia.setId(UUID.randomUUID().toString());
        return chonghiaMapper.insert(chonghia);
    }
    
    @Override
    public List<ShuHai> queryCodeManageShuhai(String name, String code) {
        ShuHaiExample example = new ShuHaiExample();
        ShuHaiExample.Criteria  c = example.createCriteria();
        c.andCodeLike("%"+code+"%");
        c.andNameLike("%"+name+"%");
        return shuHaiMapper.selectByExample(example);
    }
    @Override
    public Integer deleteCodeManageShuhai(String[] ids) {
        ShuHaiExample example = new ShuHaiExample();
        ShuHaiExample.Criteria c = example.createCriteria();
        List<String> list=Arrays.asList(ids);
        c.andIdIn(list);
        return shuHaiMapper.deleteByExample(example);
    }
    @Override
    public Integer addCodeManageShuhai(ShuHai shuhai) {
        shuhai.setId(UUID.randomUUID().toString());
        return shuHaiMapper.insert(shuhai);
    }
    
    @Override
    public List<YouhaiZhiwu> queryCodeManageYouhaizhiwu(String name, String code) {
        YouhaiZhiwuExample example = new YouhaiZhiwuExample();
        com.integration.entity.YouhaiZhiwuExample.Criteria c = example.createCriteria();
        c.andCodeLike("%"+code+"%");
        c.andNameLike("%"+name+"%");
        return youhaiZhiwuMapper.selectByExample(example);
    }
    @Override
    public Integer deleteCodeManageYouhaizhiwu(String[] ids) {
        YouhaiZhiwuExample example = new YouhaiZhiwuExample();
        YouhaiZhiwuExample.Criteria c = example.createCriteria();
        List<String> list=Arrays.asList(ids);
        c.andIdIn(list);
        return youhaiZhiwuMapper.deleteByExample(example);
    }
    @Override
    public Integer addCodeManageYouhaizhiwu(YouhaiZhiwu youhaizhiwu) {
        youhaizhiwu.setId(UUID.randomUUID().toString());
        return youhaiZhiwuMapper.insert(youhaizhiwu);
    }
    
    //@Override
    public List<XingzhengQuhua> queryCodeManageXingzhengquhua(String name, String code) {
        XingzhengQuhuaExample example = new XingzhengQuhuaExample();
        XingzhengQuhuaExample.Criteria c = example.createCriteria();
        c.andCodeLike("%"+code+"%");
        c.andNameLike("%"+name+"%");
        return xingzhengQuhuaMapper.selectByExample(example);
    }
    @Override
    public Integer deleteCodeManageXingzhengquhua(String[] ids) {
        XingzhengQuhuaExample example = new XingzhengQuhuaExample();
        XingzhengQuhuaExample.Criteria c = example.createCriteria();
        List<String> list=Arrays.asList(ids);
        c.andIdIn(list);
        return xingzhengQuhuaMapper.deleteByExample(example);
    }
    @Override
    public Integer addCodeManageXingzhengquhua(XingzhengQuhua xingzhengquhua) {
        xingzhengquhua.setId(UUID.randomUUID().toString());
        return xingzhengQuhuaMapper.insert(xingzhengquhua);
    }   
}
