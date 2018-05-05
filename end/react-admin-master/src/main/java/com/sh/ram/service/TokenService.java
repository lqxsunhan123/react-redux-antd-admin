package com.sh.ram.service;

import com.sh.ram.mapper.TokenMapper;
import com.sh.ram.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * @author sunh
 * @date 2018\4\25 0025 13:20
 */
@Service
public class TokenService {

    @Autowired
    private TokenMapper tokenMapper;

    public Map<String, Object> getToken(String token){
        return tokenMapper.queryToken(token);
    }


}

