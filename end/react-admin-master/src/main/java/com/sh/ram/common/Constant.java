package com.sh.ram.common;

/**
 * @author sunh
 * @date 2018\4\27 0027 9:40
 */
public class Constant {


    /**
     * 验证的token和用户的url权限以及用户id
     */
    public static final String AUTH_TOKEN = "token";
    public static final String AUTH_URI = "uri";
    public static final String USER_ID = "userId";
    /**
     * token有效期12小时
     */
    public static final int TOKEN_VALID_TIME = 1000 * 60 * 60 * 12;


    /**
     * 资源类型 1-菜单 2-资源
     */
    public static final int RESOURCE_TYPE_MENU = 1;
    public static final int RESOURCE_TYPE_RESROUCE = 2;

    /**
     * 根菜单id
     */
    public static final int MENU_ROOT_ID = 0;

}

