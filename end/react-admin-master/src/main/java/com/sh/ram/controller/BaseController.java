package com.sh.ram.controller;

import com.sh.ram.common.Constant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;

/**
 * @author sunh
 * @date 2018\5\1 0001 19:37
 */
public class BaseController {

    protected static final Logger logger = LoggerFactory.getLogger(BaseController.class);

    protected Integer currentUserId(HttpServletRequest request){
        Object userId = WebUtils.getSessionAttribute(request, Constant.USER_ID);
        return userId == null ? null : (int)userId;
    }
}

