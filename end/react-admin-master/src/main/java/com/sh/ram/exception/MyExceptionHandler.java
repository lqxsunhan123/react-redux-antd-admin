package com.sh.ram.exception;

import com.sh.ram.common.R;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;


/**
 * @author sunh
 * @date 2018\4\27 0027 9:43
 * @desc 全局异常处理
 */
@RestControllerAdvice
public class MyExceptionHandler {

    private static Logger logger = LoggerFactory.getLogger(MyExceptionHandler.class);

    @ExceptionHandler(value = Rexception.class)
    @ResponseBody
    public Object handleRexception(Rexception exception){
        logger.error(" ------- 发生业务异常开始: code:{}, msg:{}, status:{} ------ ", exception.getCode(), exception.getMsg(), exception.getStatus());
        exception.printStackTrace();
        logger.error(" ------- 发生业务异常结束 ------ ");
        return new R(exception.getCode(), exception.getStatus(), exception.getMsg());
    }

    @ExceptionHandler(value = RuntimeException.class)
    @ResponseBody
    public Object handleRuntimeException(RuntimeException r){
        logger.error(" ------- 发生运行时异常开始:msg:{} ------ ", r.getMessage());
        r.printStackTrace();
        logger.error(" ------- 发生运行时异常结束 ------ ");
        return R.fail();
    }
}

