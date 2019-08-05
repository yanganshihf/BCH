/**
 * 
 */
package com.integration.entity;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import java.io.Serializable;
import java.util.*;
/**
 * @author	cl.he
 *
 * @Description:
 *
 * @Date	2018年9月10日 下午1:33:37 
 */
@XmlType(propOrder = {"flItems","stsItems","chItems"})
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "DataMapping")
public class DataMapping implements Serializable { 
	private static final long serialVersionUID = 1L;
	
	@XmlElement(name = "FielxItems")
    private FielxItems flItems;
	
	@XmlElement(name = "StatisItems")
    private StatisItems stsItems;
	
	@XmlElement(name = "ChangItems")
    private ChangItems chItems; 
	
	public DataMapping() {
        this.flItems =new FielxItems();
        this.stsItems =new StatisItems();
        this.chItems =new ChangItems();
    }
	
	/**
	 * @return the stsItems
	 */
	public StatisItems getStsItems() {
		return stsItems;
	}




	/**
	 * @param stsItems the stsItems to set
	 */
	public void setStsItems(StatisItems stsItems) {
		this.stsItems = stsItems;
	}




	/**
	 * @return the flItems
	 */
	public FielxItems getFlItems() {
		return flItems;
	}

	/**
	 * @param flItems the flItems to set
	 */
	public void setFlItems(FielxItems flItems) {
		this.flItems = flItems;
	}

	/**
	 * @return the chItems
	 */
	public ChangItems getChItems() {
		return chItems;
	}

	/**
	 * @param chItems the chItems to set
	 */
	public void setChItems(ChangItems chItems) {
		this.chItems = chItems;
	}
}
