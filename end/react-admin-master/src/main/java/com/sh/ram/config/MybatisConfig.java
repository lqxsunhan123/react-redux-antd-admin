package com.sh.ram.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

/**
 * @author sunh
 * @date 2018\4\25 0025 13:13
 */
@MapperScan(value = "com.sh.ram.mapper")
@Configuration
public class MybatisConfig {


}

