package com.sh.ram.controller;

import com.sh.ram.annotations.IgnoreAuth;
import com.sh.ram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author sunh
 * @date 2018\4\24 0024 17:05
 */
@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    @IgnoreAuth
    public Object login(String userName, String password){
        return userService.login(userName, password);
    }
}

