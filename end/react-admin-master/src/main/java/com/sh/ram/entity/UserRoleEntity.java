package com.sh.ram.entity;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * @author sunh
 * @date 2018\5\17 0017 12:49
 * @desc 用户新增时的角色信息所需要的entity    value和label是为了对应antd的要求
 */
public class UserRoleEntity {

    @JSONField(name = "value")
    private int id;

    @JSONField(name = "label")
    private String name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

