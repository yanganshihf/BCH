package com.integration.service;

import java.util.List;

import com.integration.entity.Video;
public interface VideoService {
    public List<Video> queryVideo(String name,String code);
    public Integer deleteVideo(String[] ids);
    public Integer addVideo(Video video);
    public Integer editVideo(Video video);
    public String queryMobilesById(String id);
}
