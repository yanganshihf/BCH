package com.integration.service;

import java.util.List;

import com.integration.entity.XingzhengQuhua;
import com.integration.entity.YhswxcCzd;

public interface ChengZaiService {
	
	List<YhswxcCzd> selectAll();
	
	List<XingzhengQuhua> selectTop();
	
}
