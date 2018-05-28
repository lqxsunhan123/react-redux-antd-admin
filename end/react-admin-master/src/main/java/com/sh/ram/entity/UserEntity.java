package com.sh.ram.entity;

import com.sh.ram.pojo.User;

/**
 * @author sunh
 * @date 2018\5\1 0001 19:44
 * @desc 新增用户时接收的entity
 */
public class UserEntity extends User {

    // 用户的角色id
    private Integer[] roleIds;

    public Integer[] getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(Integer[] roleIds) {
        this.roleIds = roleIds;
    }
}

