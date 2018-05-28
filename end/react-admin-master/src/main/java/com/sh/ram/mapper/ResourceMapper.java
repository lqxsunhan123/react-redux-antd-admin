package com.sh.ram.mapper;


import com.sh.ram.entity.ResourceEntity;
import com.sh.ram.pojo.Resource;
import com.sh.ram.vo.ResourceTreeVo;
import com.sh.ram.vo.ResourceVo;
import com.sh.ram.vo.SimpleResourceTreeVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @author sunh
 * @date 2018\4\25 0025 12:31
 */
public interface ResourceMapper extends BaseMapper<ResourceEntity> {

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

    /**
     * 获取所有的菜单信息
     * @return
     */
    List<ResourceVo> getResourceByParentId(int id);

    /**
     * 获取所有的菜单信息(在antd生成树选择时用的)
     * @param id
     * @return
     */
    List<ResourceTreeVo> getAllResource(int id);

    /**
     * 资源树  简单数据格式
     * @return
     */
    List<SimpleResourceTreeVo> getSimpleResourceTree();

    /**
     * 获取角色对应的资源id - name
     * @param roleId
     * @return
     */
    List<Map<String, Object>> getRoleResources(int roleId);
}
