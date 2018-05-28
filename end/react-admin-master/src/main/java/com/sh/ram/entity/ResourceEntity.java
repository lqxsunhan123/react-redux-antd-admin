package com.sh.ram.entity;

import com.sh.ram.pojo.Resource;
import com.sh.ram.pojo.User;

/**
 * @author sunh
 * @date 2018\5\1 0001 19:44
 * @desc 新增用户时接收的entity
 */
public class ResourceEntity extends Resource {

    // 父级菜单 id
    private Integer parentId;

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }
}

