package com.sh.ram.pojo;

import java.util.Date;

/**
 * @author sunh
 * @date 2018\4\27 0027 13:33
 */
public class Token extends Base {

    private Integer userId;

    private String token;

    private Date expireDate;

    public Token(int userId, String token, Date expireDate) {
        this.userId = userId;
        this.token = token;
        this.expireDate = expireDate;
    }

    public Token() {
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(Date expireDate) {
        this.expireDate = expireDate;
    }
}

