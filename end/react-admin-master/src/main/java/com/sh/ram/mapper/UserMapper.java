package com.sh.ram.mapper;

import com.sh.ram.common.Page;
import com.sh.ram.entity.UserEntity;
import com.sh.ram.pojo.User;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * @author sunh
 * @date 2018\4\25 0025 12:31
 */
public interface UserMapper {

    Map<String, Object> queryById(@Param("id") int id);

    @Select("select id from t_sys_user where user_name = #{userName} and password = #{password} and deleted = 0")
    Integer queryIdByUserNameAndPassword(@Param("userName") String userName, @Param("password") String password);

    List<User> queryByCreateId(@Param("createId") int userId, @Param("page") Page page);

    int countUserByCreateId(@Param("createId") int userId);

    Integer save(UserEntity userEntity);

    int update(UserEntity userEntity);

    int del(@Param("ids") int[] ids);

    /**
     * 保存用户的角色信息
     * @param userId
     * @param roleIds
     * @return
     */
    int saveUserRole(@Param("userId") int userId, @Param("roleIds") Integer[] roleIds);

    /**
     * 删除用户的角色id
     * @param userId
     * @return
     */
    int delUseRole(@Param("userId") Integer userId);
}
