package com.integration.service;

import java.util.List;

import com.integration.entity.Flagback;

public interface FlagBackService {
    public List<Flagback> queryFlagBack();
    public Integer addFlagBack(Flagback fb);
}
