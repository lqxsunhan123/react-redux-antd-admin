package com.sh.ram.service;

import com.sh.ram.entity.RoleEntity;
import com.sh.ram.pojo.Role;
import com.sh.ram.vo.UserRoleVo;
import com.sh.ram.mapper.RoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * @author sunh
 * @date 2018\4\25 0025 13:20
 */
@Service
@Transactional
public class RoleService extends BaseService {

    @Autowired
    private RoleMapper roleMapper;

    // 获取所有的角色name和id
    public List<UserRoleVo> getAllRoles(){
        return roleMapper.getAllRoles();
    }

    // 获取用户的角色id
    public List<Integer> getUserRoleIds(int userId){
        return roleMapper.getUserRoleIds(userId);
    }


    public void save(RoleEntity roleEntity){
        // 保存基本信息,获取保存后的角色id,然后保存角色资源的对应关系
        Integer r = roleMapper.save(roleEntity);
        checkOperate(r);
        int i = roleMapper.saveRoleResource(roleEntity.getResourceIds(), roleEntity.getId());
        checkOperate(i);
    }

    public void update(RoleEntity roleEntity){
        // 更新基本信息,删除角色对应资源的关系，然后保存角色资源的对应关系
        Integer id = roleMapper.update(roleEntity);
        checkOperate(id);
        // 这里不check,因为角色可能没有对应一个资源
        roleMapper.delRoleResource(roleEntity.getId());
        int i = roleMapper.saveRoleResource(roleEntity.getResourceIds(), roleEntity.getId());
        checkOperate(i);
    }

    public void del(int[] ids){
        Integer id = roleMapper.del(ids);
        checkOperate(id);
    }

    public List<Role> queryAll(){
        return roleMapper.queryAll();
    }

}

