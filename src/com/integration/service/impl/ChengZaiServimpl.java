package com.integration.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.ChengZaiMapper;
import com.integration.entity.XingzhengQuhua;
import com.integration.entity.YhswxcCzd;
import com.integration.service.ChengZaiService;

@Service
public class ChengZaiServimpl implements ChengZaiService{
	@Autowired
	private ChengZaiMapper chengMapper;
	
	@Override
	public List<YhswxcCzd> selectAll() {
			
		List<YhswxcCzd> selectAll = chengMapper.selectAll();
		if(selectAll.size() <= 0 || selectAll.isEmpty()) {
		return null;
		}
		return selectAll;
	}

	@Override
	public List<XingzhengQuhua> selectTop() {
		List<XingzhengQuhua> selectTop = chengMapper.selectTop();
		if(selectTop.size() <= 0 || selectTop.isEmpty()) {
			return null;
			}
	return selectTop;
	}
}
