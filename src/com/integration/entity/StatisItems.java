/**
 * 
 */
package com.integration.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
/**
 * @author	cl.he
 *
 * @Description:
 *
 * @Date	2018年9月10日 下午1:35:51 
 */
@XmlType(propOrder = {"Items"})
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement
public class StatisItems implements Serializable{   
	private static final long serialVersionUID = 1L; 
	
	@XmlElement(name = "TextItem")
    private List<TextItem> Items;
	
	public StatisItems() { 
        this.Items = new ArrayList<TextItem>();
    }
 
    public void addChangProcess(TextItem process) {
        this.Items.add(process);
    }
 
    public Iterator<TextItem> changIterator() {
        return Items.iterator();
    } 
    
	/**
	 * @return the items
	 */
	public List<TextItem> getItems() {
		return Items;
	}

	/**
	 * @param items the items to set
	 */
	public void setItems(List<TextItem> items) {
		Items = items;
	} 
}


