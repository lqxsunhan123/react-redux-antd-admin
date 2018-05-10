package com.sh.ram.config;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import com.sh.ram.common.Constant;
import com.sh.ram.interceptor.AuthInterceptor;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

/**
 * @author sunh
 * @date 2018\4\25 0025 9:53
 */
@Configuration
public class MyWebMvcConfigurer implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(handlerInterceptor()).addPathPatterns("/**").excludePathPatterns("/img/**");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**").allowedOrigins("*")
//                .allowedMethods("PUT", "DELETE","GET","POST")
//                .allowedHeaders("*")
//                .exposedHeaders("access-control-allow-headers",
//                        "access-control-allow-methods",
//                        "access-control-allow-origin",
//                        "access-control-max-age",
//                        "X-Frame-Options")
//                .allowCredentials(true).maxAge(3600);
        // allowCredentials 表示允许浏览器跨域时携带cookie,这样才可以取到session
        registry.addMapping("/**").allowCredentials(true);
    }
    @Bean
    public HandlerInterceptor handlerInterceptor(){
        return new AuthInterceptor();
    }

    @Override
    public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> handlers) {
    }

    /**
     * 虚拟图片映射
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(Constant.APP_IMG_URI + "/**").addResourceLocations("file:" + Constant.APP_FILE_PATH);
        registry.addResourceHandler(Constant.BACK_IMG_URI + "/**").addResourceLocations("file:" + Constant.BACK_FILE_PATH);
    }
}

