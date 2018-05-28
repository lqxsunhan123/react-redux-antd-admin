package com.sh.ram.controller;

import com.sh.ram.annotations.HasPermission;
import com.sh.ram.common.Constant;
import com.sh.ram.common.R;
import com.sh.ram.common.Utils;
import com.sh.ram.entity.RoleEntity;
import com.sh.ram.pojo.Role;
import com.sh.ram.service.ResourceService;
import com.sh.ram.service.RoleService;
import com.sh.ram.vo.ResourceTreeVo;
import com.sh.ram.vo.SimpleResourceTreeVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * @author sunh
 * @date 2018\4\24 0024 17:05
 */
@RestController
@RequestMapping("/role")
public class RoleController extends BaseController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private ResourceService resourceService;

    @PostMapping("/list")
    @HasPermission("role-select")
    public Object list(){
        logger.debug(" --- 后台RoleController获取角色列表接口开始 --- ");
        List<Role> roles = roleService.queryAll();
        R r = R.ok(roles);
        logger.debug(" --- 后台RoleController获取角色列表接口:{} --- ", r);
        return r;
    }


    /**
     * 新增角色时的选择框中的资源列表树结构(因为antd对于父子关联关系不能满足需求,由我们前端自定义实现)
     * @return
     */
    @GetMapping("/getAllResource")
    @HasPermission("role-resource-get")
    public Object getAllResource(){
        logger.debug(" --- 后台RoleController获取角色树形选择框数据接口开始 --- ");
        List<ResourceTreeVo> allResource = resourceService.getAllResource();
        R r = R.ok(allResource);
        logger.debug(" --- 后台RoleController获取角色树形选择框数据接口:{} --- ", r);
        return r;
    }

    /**
     * 新增角色时的选择框中的资源列表树  获取角色对应资源id - name
     * @return
     */
    @GetMapping("/getRoleResource")
    @HasPermission("role-resource-get")
    public Object getRoleResource(Integer id){
        logger.debug(" --- 后台RoleController获取角色对应资源接口开始: roleId:{} --- ", id);
        List<Map<String, Object>> resources = resourceService.getRoleResources(id);
        R r = R.ok(resources);
        logger.debug(" --- 后台RoleController获取角色对应资源接口:{} --- ", r);
        return r;
    }

    /**
     * 新增角色时的选择框中的资源列表树  获取角色对应资源id - name
     * @return
     */
    @GetMapping("/getSimpleTree")
    @HasPermission("role-resource-get")
    public Object getSimpleTreeData(){
        logger.debug(" --- 后台RoleController获取简单数据格式tree接口开始 --- ");
        List<SimpleResourceTreeVo> simpleResourceTree = resourceService.getSimpleResourceTree();
        R r = R.ok(simpleResourceTree);
        logger.debug(" --- 后台RoleController获取简单数据格式tree接口:{} --- ", r);
        return r;
    }

    /**
     * 保存
     * @param roleEntity
     * @return
     */
    @PostMapping("/save")
    @HasPermission("role-save")
    public Object save(RoleEntity roleEntity, HttpServletRequest request){
        logger.debug(" --- 后台RoleController保存角色接口开始:{} --- ", roleEntity);
        Utils.setObjectCreateBaseData(roleEntity, currentUserId(request));
        roleService.save(roleEntity);
        R r = R.ok();
        logger.debug(" --- 后台RoleController保存角色接口接口:{} --- ", r);
        return r;
    }

    /**
     * 更新
     * @param roleEntity
     * @return
     */
    @PostMapping("/update")
    @HasPermission("role-update")
    public Object update(RoleEntity roleEntity){
        logger.debug(" --- 后台RoleController更新角色接口开始:{} --- ", roleEntity);
        roleService.update(roleEntity);
        R r = R.ok();
        logger.debug(" --- 后台RoleController更新角色接口接口:{} --- ", r);
        return r;
    }

    /**
     * 删除
     * @param ids
     * @return
     */
    @PostMapping("/del")
    @HasPermission("role-del")
    public Object del(int[] ids){
        logger.debug(" --- 后台RoleController删除角色接口开始:{} --- ", ids);
        roleService.del(ids);
        R r = R.ok();
        logger.debug(" --- 后台RoleController删除角色接口接口:{} --- ", r);
        return r;
    }

}

