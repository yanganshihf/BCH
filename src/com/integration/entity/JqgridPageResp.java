package com.integration.entity;

import java.util.List;

public class JqgridPageResp<T> {
	/**
	 * 状态码
	 * 
	 * @param status
	 */
	private Integer Status = 200;
	
	public Integer getStatus() {
		return Status;
	}

	public void setStatus(Integer status) {
		Status = status;
	}

	/**
     * 总页数
     */
    private Integer total = 0;

    /**
     * 当前页
     */
    private Integer page = 0;

    /**
     * 本次查询总记录数
     */
    private Integer records = 0;
    
    /**
     * 信息
     */
    private String msg;

    /**
     * 结果集
     */
    private List rows;

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getPage() {
        return page;
    }

	public Integer getRecords() {
		return records;
	}

	public void setRecords(Integer records) {
		this.records = records;
	}


	public List getRows() {
		return rows;
	}

	public void setRows(List rows) {
		this.rows = rows;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	
    
    
}
