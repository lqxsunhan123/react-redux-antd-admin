package com.sh.ram.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author sunh
 * @date 2018\4\27 0027 10:36
 * @desc 判断用户权限
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface HasPermission {

    String value();
}
