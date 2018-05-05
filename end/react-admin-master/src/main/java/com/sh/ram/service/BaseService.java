package com.sh.ram.service;

import com.sh.ram.exception.Rexception;

/**
 * @author sunh
 * @date 2018\5\1 0001 20:04
 */
public class BaseService {

    /**
     * 根据dao的方法的返回结果确定是否抛出异常的方法
     * @param flag
     */
    protected void checkOperate(Integer flag){
        if(flag == null){
            throw Rexception.operateFail();
        } else {
            if(flag <= 0){
                throw Rexception.operateFail();
            }
        }
    }
}

