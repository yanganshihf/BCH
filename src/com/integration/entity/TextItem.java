/**
 * 
 */
package com.integration.entity;

import java.io.Serializable;

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
@XmlType(propOrder = { "DefaultValue", "JoinField","Condition", "FieldName", "Column" ,"Row"})
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement
public class TextItem implements Serializable{   
	private static final long serialVersionUID = 1L;

	@XmlAttribute(name="DefaultValue")
	private String DefaultValue;
	 
	@XmlElement(name="JoinField")
	private String JoinField;
	
	@XmlElement(name="Condition")
	private String Condition;
	
    @XmlElement(name="FieldName") 
	private String FieldName;
		        
    @XmlElement(name="Column") 
    private String Column;

	@XmlElement(name="Row") 
	private String Row; 
	
	/**
	 * @return the condition
	 */
	public String getCondition() {
		return Condition;
	}

	/**
	 * @param condition the condition to set
	 */
	public void setCondition(String condition) {
		Condition = condition;
	}

	public String getJoinField() {
		return JoinField;
	}

	public void setJoinField(String joinField) {
		JoinField = joinField;
	}

	
	public String getDefaultValue() {
		return DefaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		DefaultValue = defaultValue;
	}

	public String getFieldName() {
		return FieldName;
	}

	public void setFieldName(String fieldName) {
		FieldName = fieldName;
	}

	public String getColumn() {
		return Column;
	}

	public void setColumn(String column) {
		Column = column;
	}

	public String getRow() {
		return Row;
	}

	public void setRow(String row) {
		Row = row;
	}
}


