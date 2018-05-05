package com.sh.ram.mapper;

import com.sh.ram.pojo.Token;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.Map;

/**
 * @author sunh
 * @date 2018\4\25 0025 12:31
 */
public interface TokenMapper {

    @Select("select id, expire_date as expireDate from t_sys_token where token = #{token}")
    Map<String, Object> queryToken(@Param("token") String token);

    @Select("select token from t_sys_token where user_id = #{userId}")
    String queryTokenByUserId(@Param("userId") int userId);

    int save(Token token);

    int update(Token token);
}
