package com.sh.ram.filter;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author sunh
 * @date 2018\4\24 0024 17:35
 */
@WebFilter
@Component
public class CrosFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse resp = (HttpServletResponse)servletResponse;
        System.out.println("放行之前,...");
//        resp.setHeader("Access-Control-Allow-Origin", "*");
        filterChain.doFilter(servletRequest, resp);
        System.out.println("放行之后....");
    }

    @Override
    public void destroy() {

    }
}

