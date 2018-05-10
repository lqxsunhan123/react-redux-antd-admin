package com.sh.ram.common;

/**
 * @author sunh
 * @date 2018\4\27 0027 9:40
 */
public class Constant {

    /**
     * 项目名
     */
    public static final String PROJECT_NAME = "ram";

    /**
     * 移动端文件,后台文件保存路径
     */
    public static final String APP_FILE_PATH = System.getProperty("user.home") + "/" + PROJECT_NAME + "/app/img/";
    public static final String BACK_FILE_PATH = System.getProperty("user.home") + "/" + PROJECT_NAME + "/back/img/";

    /**
     * 返回给移动端,文件的访问路径,映射的路径
     */
    public static final String APP_IMG_URI = "/img/app";
    public static final String BACK_IMG_URI = "/img/back";

    /**
     * 保存的路径type 1-移动端 2-后台
     */
    public static final int SAVE_TYPE_APP = 1;
    public static final int SAVE_TYPE_BACK = 2;

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

