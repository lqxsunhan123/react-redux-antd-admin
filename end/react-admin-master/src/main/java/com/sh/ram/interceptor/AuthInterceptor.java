package com.sh.ram.interceptor;

import com.sh.ram.annotations.IgnoreAuth;
import com.sh.ram.common.APIReturnData;
import com.sh.ram.common.Constant;
import com.sh.ram.exception.Rexception;
import com.sh.ram.service.TokenService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author sunh
 * @date 2018\4\25 0025 9:45
 */
public class AuthInterceptor implements HandlerInterceptor {

    @Autowired
    private TokenService tokenService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("进入拦截器");
        if(! (handler instanceof HandlerMethod)){
            // 这里如果是浏览器跨域时发送的options请求handler不是HandlerMethod类型，所以我们直接放行,让spring boot处理这次options请求
            return true;
        }
        HandlerMethod method = (HandlerMethod)handler;
        if(method.hasMethodAnnotation(IgnoreAuth.class)){
            // 如果有忽略token注解则直接放行
            return true;
        }
        // 暂时省略cookie的判断
        Cookie[] cookies = request.getCookies();

        // 获取token
        String token = request.getHeader(Constant.AUTH_TOKEN);
        // 判断token是否为null
        if(StringUtils.isNotEmpty(token)){
            // 判断token是否过期
            Map<String, Object> r = tokenService.getToken(token);
            if(r != null && r.size() > 0) {
                Date date = (Date) r.get("expireDate");
                if (date.getTime() - new Date().getTime() > 0) {
                    // 判断用户访问的url是否在用户的请求权限中
                    String requestURI = request.getRequestURI().replace(request.getContextPath(), "");
                    // 从缓存获取用户的uri集合
                    List uriList = (List)WebUtils.getSessionAttribute(request, Constant.AUTH_URI);
                    if(uriList == null){
                        setCros(response);
                        throw new Rexception(APIReturnData.SERVER_CODE_10000, APIReturnData.STATUS_FAIL, APIReturnData.SERVER_MSG_10000);
                    }

                    // 判断用户访问的url是否在集合中
                    boolean contains = uriList.contains(requestURI);
                    if(!contains){
                        setCros(response);
                        // 没有权限
                        throw new Rexception(APIReturnData.SERVER_CODE_10002, APIReturnData.STATUS_FAIL, APIReturnData.SERVER_MSG_10002);
                    }
                    return true;
                }
            }
        }
        setCros(response);
        // token过期
        throw new Rexception(APIReturnData.SERVER_CODE_10000, APIReturnData.STATUS_FAIL, APIReturnData.SERVER_MSG_10000);
    }

    private void setCros(HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Credentials","true");
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
        System.out.println("离开拦截器");
    }


}

