package com.sh.ram.pojo;

import com.alibaba.fastjson.annotation.JSONField;

import java.util.Date;

/**
 * @author sunh
 * @date 2018\4\27 0027 13:19
 */
public class Base {

    @JSONField(name = "key")
    protected int id;

    protected Date createTime = new Date();

    protected Date updateTime = new Date();

    protected int createUserId;

    protected int updateUserId;

    protected int deleted = 0;

    public int getDeleted() {
        return deleted;
    }

    public void setDeleted(int deleted) {
        this.deleted = deleted;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public int getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(int createUserId) {
        this.createUserId = createUserId;
    }

    public int getUpdateUserId() {
        return updateUserId;
    }

    public void setUpdateUserId(int updateUserId) {
        this.updateUserId = updateUserId;
    }
}

