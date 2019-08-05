package com.integration.entity;

import java.io.Serializable;
import java.util.List;

public class ChengZai implements Serializable{
	
	private static final long serialVersionUID = 7587072199897938428L;

	private List<XingzhengQuhua> xingzheng;
	

	public List<XingzhengQuhua> getXingzheng() {
		return xingzheng;
	}

	public void setXingzheng(List<XingzhengQuhua> xingzheng) {
		this.xingzheng = xingzheng;
	}

	@Override
	public String toString() {
		return "ChengZai [xingzheng=" + xingzheng + "]";
	}

}
