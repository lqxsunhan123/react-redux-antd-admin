package com.sh.ram.controller;

import com.sh.ram.annotations.IgnoreAuth;
import com.sh.ram.common.Constant;
import com.sh.ram.common.R;
import com.sh.ram.common.Utils;
import com.sh.ram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;

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
        R r = userService.login(userName, password);
        return r;
    }

    @RequestMapping("/uploadImg")
    @IgnoreAuth
    public Object upload(MultipartFile file) throws IOException {
        String s = Utils.saveFile(Constant.SAVE_TYPE_APP, file);
        return R.ok(s);
    }
}

