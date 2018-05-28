package com.sh.ram.entity;

import com.sh.ram.pojo.Role;

import java.util.Arrays;

/**
 * @author sunh
 * @date 2018\5\26 0026 14:30
 */
public class RoleEntity extends Role {

    // 角色的资源id
    private Integer[] resourceIds;

    public Integer[] getResourceIds() {
        return resourceIds;
    }

    public void setResourceIds(Integer[] resourceIds) {
        this.resourceIds = resourceIds;
    }

    @Override
    public String toString() {
        return "RoleEntity{" +
                "resourceIds=" + Arrays.toString(resourceIds) +
                '}';
    }
}

