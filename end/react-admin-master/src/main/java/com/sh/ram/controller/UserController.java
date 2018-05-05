package com.sh.ram.controller;

import com.sh.ram.common.Page;
import com.sh.ram.common.R;
import com.sh.ram.entity.UserEntity;
import com.sh.ram.pojo.User;
import com.sh.ram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author sunh
 * @date 2018\4\27 0027 16:55
 */
@RestController
@RequestMapping("/user")
public class UserController extends BaseController {

    @Autowired
    private UserService userService;

    @PostMapping("/list")
    public Object list(HttpServletRequest request){
        // 获取当前用户的id
        Integer userId = currentUserId(request);
        // 查询当前用户创建的用户
        Page page = userService.queryAll(userId, new Page(request));
        return R.ok(page);
    }

    @PostMapping("/save")
    public Object save(UserEntity userEntity){
        userService.save(userEntity);
        return R.ok();
    }

    @PostMapping("/update")
    public Object update(UserEntity userEntity){
        userService.update(userEntity);
        return R.ok();
    }

    @PostMapping("/del")
    public Object del(int[] ids){
        userService.del(ids);
        return R.ok();
    }
}

