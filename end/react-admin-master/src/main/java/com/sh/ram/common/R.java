package com.sh.ram.common;

import java.util.HashMap;

/**
 * @author sunh
 * @date 2018\4\27 0027 9:47
 */
public class R extends HashMap {

    private R(int code, int status, String msg, Object data){
        this(code, status, msg);
        this.put("data", data);
    }


    public R(int code, int status, String msg){
        this.put("code", code);
        this.put("status", status);
        this.put("msg", msg);
    }


    public static R ok(Object data){
        return new R(APIReturnData.SERVER_CODE_OK, APIReturnData.STATUS_OK, APIReturnData.SERVER_MSG_OK, data);
    }
    public static R ok(){
        return new R(APIReturnData.SERVER_CODE_OK, APIReturnData.STATUS_OK, APIReturnData.SERVER_MSG_OK);
    }

    public R put(String key, Object value){
        super.put(key, value);
        return this;
    }

    public static R fail(){
        return new R(APIReturnData.SERVER_CODE_FAIL, APIReturnData.STATUS_FAIL, APIReturnData.SERVER_MSG_FAIL);
    }
}

