package com.integration.service.impl;

import java.util.Arrays;

import java.util.List;
import java.util.UUID;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.integration.dao.VideoMapper;
import com.integration.entity.SysUser;
import com.integration.entity.Video;
import com.integration.entity.VideoExample;
import com.integration.service.VideoService;
@Service
public class VideoServiceImpl implements VideoService{
    @Autowired
    VideoMapper videoMapper;
    @Override
    public List<Video> queryVideo(String name, String code) {
        VideoExample example = new VideoExample();
        VideoExample.Criteria criteria = example.createCriteria();
        criteria.andNameLike(name+"%");
        criteria.andCodeLike(code+"%");
        SysUser user = (SysUser) SecurityUtils.getSubject().getSession().getAttribute("loginUser");
        if(!"0".equals(user.getRole_id())) {
            criteria.andAllowpersonsLike("%"+user.getMobile()+"%");
        }
        example.setOrderByClause("name");
        return videoMapper.selectByExample(example);
    }
    @Override
    public Integer deleteVideo(String[] ids) {
        VideoExample example = new VideoExample();
        VideoExample.Criteria criteria = example.createCriteria();
        List<String> list=Arrays.asList(ids);
        criteria.andIdIn(list);
        return videoMapper.deleteByExample(example);
    }
    @Override
    public Integer addVideo(Video video) {
        VideoExample example = new VideoExample();
        VideoExample.Criteria criteria = example.createCriteria();
        criteria.andCodeEqualTo(video.getCode());
        List<Video> list =  videoMapper.selectByExample(example);
        if(list.size()>0) {
            return 0;
        }else {
            video.setOnline(0);
            video.setId(UUID.randomUUID().toString());
            return videoMapper.insertSelective(video);
        }
    }
    @Override
    public Integer editVideo(Video video) {
        return videoMapper.updateByPrimaryKeySelective(video);
    }
    @Override
    public String queryMobilesById(String id) {
        Video video = videoMapper.selectByPrimaryKey(id);
        return video.getAllowpersons();
    }

}
