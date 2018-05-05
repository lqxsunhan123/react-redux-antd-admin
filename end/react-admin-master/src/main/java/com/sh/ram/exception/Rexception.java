package com.sh.ram.exception;

import com.sh.ram.common.APIReturnData;

/**
 * @author sunh
 * @date 2018\4\26 0026 16:21
 */
public class Rexception extends RuntimeException {

    private int code;

    private int status;

    private String msg;

    public Rexception(int code, int status, String msg){
        this.code = code;
        this.status = status;
        this.msg = msg;
    }

    /**
     * 在业务中操作失败是返回的exception,具体表现为事务回滚时,保存更新失败时
     * @return
     */
    public static Rexception operateFail(){
        return new Rexception(APIReturnData.SERVER_CODE_10003, APIReturnData.STATUS_FAIL, APIReturnData.SERVER_MSG_10003);
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}

