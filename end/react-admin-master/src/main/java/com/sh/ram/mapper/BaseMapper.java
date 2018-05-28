package com.sh.ram.mapper;

import org.apache.ibatis.annotations.Param;


/**
 * @author sunh
 * @date 2018\4\25 0025 12:31
 * @desc 基mapper
 */
public interface BaseMapper<T> {

    Integer save(T t);

    Integer update(T t);

    Integer del(@Param("ids") int[] ids);
}
