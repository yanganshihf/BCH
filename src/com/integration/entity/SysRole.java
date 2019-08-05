package com.integration.entity;

/**
 * 角色列表
 * 
 */
public class SysRole {

	private String id;
	private String roleName;
	private String remarks;
	private String menuArray;

	public String getMenuArray(){
		return menuArray;
	}
	public void setMenuArray(String MenuArray){
		this.menuArray = MenuArray;
	}
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

}
