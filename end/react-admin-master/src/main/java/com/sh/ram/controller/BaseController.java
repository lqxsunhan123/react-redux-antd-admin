package com.sh.ram.controller;

import com.sh.ram.common.Constant;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;

/**
 * @author sunh
 * @date 2018\5\1 0001 19:37
 */
public class BaseController {

    protected Integer currentUserId(HttpServletRequest request){
        Object userId = WebUtils.getSessionAttribute(request, Constant.USER_ID);
        return userId == null ? null : (int)userId;
    }
}

