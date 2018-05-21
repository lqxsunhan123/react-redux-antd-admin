package com.sh.ram.mapper;


import com.sh.ram.pojo.Resource;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author sunh
 * @date 2018\4\25 0025 12:31
 */
public interface ResourceMapper {

    /**
     * 根据用户id查询根菜单
     * @param userId
     * @return
     */
    List<Resource> queryRootMenuByUserId(@Param("userId") Integer userId, @Param("type") int type, @Param("rootId") int rootId);

    /**
     * 根据父菜单id查询子菜单
     * @param parentId
     * @return
     */
    List<Resource> queryChildMenuByParentId(@Param("parentId") int parentId, @Param("userId") Integer userId);
}
