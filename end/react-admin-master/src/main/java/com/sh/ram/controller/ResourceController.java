package com.sh.ram.controller;

import com.sh.ram.annotations.HasPermission;
import com.sh.ram.common.Constant;
import com.sh.ram.common.R;
import com.sh.ram.common.Utils;
import com.sh.ram.entity.ResourceEntity;
import com.sh.ram.service.ResourceService;
import com.sh.ram.vo.ResourceTreeVo;
import com.sh.ram.vo.ResourceVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author sunh
 * @date 2018\4\24 0024 17:05
 */
@RestController
@RequestMapping("/resource")
public class ResourceController extends BaseController {

    @Autowired
    private ResourceService resourceService;

    @PostMapping("/list")
    @HasPermission("resource-select")
    public Object list(){
        logger.debug(" --- 后台ResourceController获取资源列表接口开始 --- ");
        List<ResourceVo> allResource = resourceService.list(Constant.MENU_ROOT_ID);
        clearListIfEmpty(allResource);
        R r = R.ok(allResource);
        logger.debug(" --- 后台ResourceController获取资源列表接口:{} --- ", r);
        return r;
    }

    /**
     * 消除空数组的方法
     * @param list
     */
    public void clearListIfEmpty(List<ResourceVo> list){
        for(ResourceVo t: list){
            if(t.getSub().size() == 0){
                t.setSub(null);
            } else {
                clearListIfEmpty(t.getSub());
            }
        }
    }

    /**
     * 新增资源时的选择框中的资源列表树结构
     * @return
     */
    @GetMapping("/getAllResource")
    @HasPermission("resource-select")
    public Object getAllResource(){
        logger.debug(" --- 后台ResourceController获取资源树形选择框数据接口开始 --- ");
        List<ResourceTreeVo> allResource = resourceService.getAllResource();
        R r = R.ok(allResource);
        logger.debug(" --- 后台ResourceController获取资源树形选择框数据接口:{} --- ", r);
        return r;
    }

    /**
     * 保存
     * @param resourceEntity
     * @return
     */
    @PostMapping("/save")
    @HasPermission("resource-save")
    public Object save(ResourceEntity resourceEntity, HttpServletRequest request){
        logger.debug(" --- 后台ResourceController保存资源接口开始:{} --- ", resourceEntity);
        Utils.setObjectCreateBaseData(resourceEntity, currentUserId(request));
        resourceService.save(resourceEntity);
        R r = R.ok();
        logger.debug(" --- 后台ResourceController保存资源接口接口:{} --- ", r);
        return r;
    }

    /**
     * 更新
     * @param resourceEntity
     * @return
     */
    @PostMapping("/update")
    @HasPermission("resource-update")
    public Object update(ResourceEntity resourceEntity){
        logger.debug(" --- 后台ResourceController更新资源接口开始:{} --- ", resourceEntity);
        resourceService.update(resourceEntity);
        R r = R.ok();
        logger.debug(" --- 后台ResourceController更新资源接口接口:{} --- ", r);
        return r;
    }

    /**
     * 删除
     * @param ids
     * @return
     */
    @PostMapping("/del")
    @HasPermission("resource-del")
    public Object del(int[] ids){
        logger.debug(" --- 后台ResourceController删除资源接口开始:{} --- ", ids);
        resourceService.del(ids);
        R r = R.ok();
        logger.debug(" --- 后台ResourceController删除资源接口接口:{} --- ", r);
        return r;
    }

}

