package com.sh.ram.common;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * @author sunh
 * @date 2018\5\1 0001 20:23
 */
public class Page<T> {

    // 结果集
    private List<T> result;

    // 每页显示条数
    private int pageSize;

    // 当前页
    private int currentPage;

    // 总量
    private int total;

    // 参数
    private Map param;

    public Map getParam() {
        return param;
    }

    public void setParam(Map param) {
        this.param = param;
    }

    public Page(HttpServletRequest request){
        pageSize = request.getParameter("pageSize") == null ? 5 : Integer.parseInt(request.getParameter("pageSize"));
        currentPage = request.getParameter("current") == null ? 1 : Integer.parseInt(request.getParameter("current"));
    }

    public Page(){}

    public int getTotalPage(){
        return total % pageSize > 0 ? total / pageSize + 1 : total / pageSize ;
    }

    public int getOffset(){
        return (currentPage - 1) * pageSize;
    }

    public List<T> getResult() {
        return result;
    }

    public void setResult(List<T> result) {
        this.result = result;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }
}

