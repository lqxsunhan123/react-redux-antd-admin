package com.sh.ram.common;

/**
 * @author sunh
 * @date 2018\5\1 0001 19:49
 */
public class APIReturnData {

    /**
     * 程序接口的返回状态  1-正常 2-异常
     */
    public static final int STATUS_OK = 1;
    public static final int STATUS_FAIL = 2;


    public static final int SERVER_CODE_OK = 200;
    public static final String SERVER_MSG_OK = "success";

    public static final int SERVER_CODE_FAIL = 500;
    public static final String SERVER_MSG_FAIL = "fail";

    /**
     * 业务异常代码
     */

    public static final int SERVER_CODE_10000 = 10000;
    public static final String SERVER_MSG_10000 = "TOKEN无效";

    public static final int SERVER_CODE_10001 = 10001;
    public static final String SERVER_MSG_10001 = "用户名或密码不正确";

    public static final int SERVER_CODE_10002 = 10002;
    public static final String SERVER_MSG_10002 = "权限不足,请联系管理员";

    public static final int SERVER_CODE_10003 = 10003;
    public static final String SERVER_MSG_10003 = "操作失败!";
}

