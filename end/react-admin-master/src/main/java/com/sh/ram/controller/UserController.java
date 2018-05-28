package com.sh.ram.controller;

import com.sh.ram.annotations.HasPermission;
import com.sh.ram.common.Page;
import com.sh.ram.common.R;
import com.sh.ram.common.Utils;
import com.sh.ram.entity.UserEntity;
import com.sh.ram.vo.UserRoleVo;
import com.sh.ram.service.RoleService;
import com.sh.ram.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * @author sunh
 * @date 2018\4\27 0027 16:55
 */
@RestController
@RequestMapping("/user")
public class UserController extends BaseController {

    private static Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    /**
     * 用户列表
     * @param request
     * @param param 查询参数 userName-用户名  name-姓名
     * @return
     */
    @PostMapping("/list")
    @HasPermission("user-select")
    public Object list(HttpServletRequest request, @RequestParam Map<String, Object> param){
        logger.debug(" --- 后台用户列表接口参数:{} --- ", param);
        Page p = new Page(request);
        p.setParam(param);
        // 获取当前用户的id
        Integer userId = currentUserId(request);
        // 查询当前用户创建的用户
        Page page = userService.queryAll(userId, p);
        R r = R.ok(page);
        logger.debug(" --- 后台用户列表接口成功,返回值:{} --- ", r);
        return r;
    }

    @PostMapping("/save")
    @HasPermission("user-save")
    public Object save(UserEntity userEntity, HttpServletRequest request){
        // 设置基本信息
        Utils.setObjectCreateBaseData(userEntity, currentUserId(request));
        userService.save(userEntity);
        return R.ok();
    }

    @PostMapping("/update")
    @HasPermission("user-update")
    public Object update(UserEntity userEntity, HttpServletRequest request){
        // 设置基本信息
        Utils.setObjectUpdateBaseData(userEntity, currentUserId(request));
        userService.update(userEntity);
        return R.ok();
    }

    @PostMapping("/del")
    @HasPermission("user-del")
    public Object del(int[] ids){
        userService.del(ids);
        return R.ok();
    }

    @GetMapping("/getAllRoles")
    @HasPermission("user-role-get")
    public Object getAllRoles(){
        List<UserRoleVo> allRoles = roleService.getAllRoles();
        return R.ok(allRoles);
    }

    @GetMapping("/getUserRoleIds")
    @HasPermission("user-role-get")
    public Object getUserRoleIds(int userId){
        List<Integer> userRoleIds = roleService.getUserRoleIds(userId);
        return R.ok(userRoleIds);
    }
}

