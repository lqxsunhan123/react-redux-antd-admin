package com.sh.ram.mapper;

import com.sh.ram.entity.RoleEntity;
import com.sh.ram.pojo.Role;
import com.sh.ram.vo.UserRoleVo;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author sunh
 * @date 2018\4\25 0025 12:31
 */
public interface RoleMapper extends BaseMapper<RoleEntity>{

    // 获取所有的角色name和id
    List<UserRoleVo> getAllRoles();

    // 获取用户的角色id
    @Select("select role_id as roleId from t_sys_user_role where user_id = #{userId}")
    List<Integer> getUserRoleIds(@Param("userId") int userId);

    /**
     * 保存角色资源对应关系
     * @param resourceIds
     * @param roleId
     * @return
     */
    int saveRoleResource(@Param("resourceIds") Integer[] resourceIds, @Param("roleId") int roleId);

    /**
     * 删除角色对应的资源
     * @param roleId
     * @return
     */
    int delRoleResource(int roleId);

    /**
     * 查询全部
     * @return
     */
    List<Role> queryAll();

}
