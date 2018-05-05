package com.sh.ram.exception;

import com.sh.ram.common.R;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;


/**
 * @author sunh
 * @date 2018\4\27 0027 9:43
 */
@RestControllerAdvice
public class MyExceptionHandler {

    @ExceptionHandler(value = Rexception.class)
    @ResponseBody
    public Object handleException(Rexception exception){
        return new R(exception.getCode(), exception.getStatus(), exception.getMsg());
    }
}

