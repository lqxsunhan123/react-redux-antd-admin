package com.sh.ram.service;

import com.sh.ram.common.*;
import com.sh.ram.entity.UserEntity;
import com.sh.ram.entity.UserRoleEntity;
import com.sh.ram.exception.Rexception;
import com.sh.ram.mapper.ResourceMapper;
import com.sh.ram.mapper.RoleMapper;
import com.sh.ram.mapper.TokenMapper;
import com.sh.ram.mapper.UserMapper;
import com.sh.ram.pojo.Resource;
import com.sh.ram.pojo.Token;
import com.sh.ram.pojo.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
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
    public List<UserRoleEntity> getAllRoles(){
        return roleMapper.getAllRoles();
    }

    // 获取用户的角色id
    public List<Integer> getUserRoleIds(int userId){
        return roleMapper.getUserRoleIds(userId);
    }

}

