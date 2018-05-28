package com.sh.ram.service;

import com.sh.ram.common.Constant;
import com.sh.ram.entity.ResourceEntity;
import com.sh.ram.mapper.ResourceMapper;
import com.sh.ram.vo.ResourceTreeVo;
import com.sh.ram.vo.ResourceVo;
import com.sh.ram.vo.SimpleResourceTreeVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


/**
 * @author sunh
 * @date 2018\4\25 0025 13:20
 */
@Service
public class ResourceService extends BaseService {

    @Autowired
    private ResourceMapper resourceMapper;


    /**
     * 获取所有的菜单信息
     * @return
     */
    public List<ResourceVo> list(int id){
        return resourceMapper.getResourceByParentId(id);
    }

    /**
     * 获取所有资源信息(生成树选择时用的)
     * @return
     */
    public List<ResourceTreeVo> getAllResource(){
        return resourceMapper.getAllResource(Constant.MENU_ROOT_ID);
    }

    /**
     * 获取简单数据格式的资源树结构数据
     * @return
     */
    public List<SimpleResourceTreeVo> getSimpleResourceTree(){
        return resourceMapper.getSimpleResourceTree();
    }

    /**
     * 获取角色资源信息id
     * @return
     */
    public List<Map<String, Object>> getRoleResources(int roleId){
        return resourceMapper.getRoleResources(roleId);
    }

    public void save(ResourceEntity resourceEntity){
        Integer id = resourceMapper.save(resourceEntity);
        checkOperate(id);
    }
    public void update(ResourceEntity resourceEntity){
        Integer id = resourceMapper.update(resourceEntity);
        checkOperate(id);
    }

    public void del(int[] ids){
        Integer id = resourceMapper.del(ids);
        checkOperate(id);
    }

}

