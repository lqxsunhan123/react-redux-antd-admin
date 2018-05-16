package com.sh.ram.mapper;

import com.sh.ram.entity.UserEntity;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * @author sunh
 * @date 2018\4\25 0025 12:31
 */
public interface RoleMapper {

    // 获取所有的角色name和id
    List<Map<String, Object>> getAllRoles();

    // 获取用户的角色id
    @Select("select role_id as roleId from t_sys_user_role where user_id = #{userId}")
    List<Integer> getUserRoleIds(@Param("userId") int userId);


    Integer save(UserEntity userEntity);

    int update(UserEntity userEntity);

    int del(@Param("ids") int[] ids);
}
