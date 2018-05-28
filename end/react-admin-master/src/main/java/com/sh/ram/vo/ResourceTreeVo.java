package com.sh.ram.vo;

import com.alibaba.fastjson.annotation.JSONField;

import java.util.List;

/**
 * @author sunh
 * @date 2018\5\24 0024 12:13
 * @desc 新增资源时的树菜单需要的数据格式
 */
public class ResourceTreeVo {

    @JSONField(name = "key")
    private Integer id;

    @JSONField(name = "children")
    private List<ResourceTreeVo> sub;

    @JSONField(name = "label")
    private String text;

    /**
     * 这个value其实等同于key,antd的需要一个string类型的value
     */
    @JSONField(name = "value")
    private String value;

    private int parentId;

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId = parentId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<ResourceTreeVo> getSub() {
        return sub;
    }

    public void setSub(List<ResourceTreeVo> sub) {
        this.sub = sub;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}

