package com.sh.ram.vo;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * @author sunh
 * @date 2018\5\26 0026 16:42
 * @desc 资源树antd简单数据格式
 */
public class SimpleResourceTreeVo {

    private String id;

    @JSONField(name = "pId")
    private String parentId;


    private String label;

    private String value;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }
}

