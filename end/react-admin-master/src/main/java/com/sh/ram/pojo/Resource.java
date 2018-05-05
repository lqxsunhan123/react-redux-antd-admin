package com.sh.ram.pojo;


import java.util.ArrayList;
import java.util.List;

/**
 * @author sunh
 * @date 2018\4\27 0027 12:54
 */
public class Resource extends Base {

    private String text;

    private String icon;

    private String path;

    private List<Resource> sub = new ArrayList();

    private Integer type;

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public List<Resource> getSub() {
        return sub;
    }

    public void setSub(List<Resource> sub) {
        this.sub = sub;
    }
}

