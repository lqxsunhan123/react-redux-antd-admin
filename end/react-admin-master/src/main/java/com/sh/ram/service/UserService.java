package com.sh.ram.service;

import com.sh.ram.common.*;
import com.sh.ram.entity.UserEntity;
import com.sh.ram.exception.Rexception;
import com.sh.ram.mapper.ResourceMapper;
import com.sh.ram.mapper.TokenMapper;
import com.sh.ram.mapper.UserMapper;
import com.sh.ram.pojo.Resource;
import com.sh.ram.pojo.Token;
import com.sh.ram.pojo.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * @author sunh
 * @date 2018\4\25 0025 13:20
 */
@Service
@Transactional
public class UserService extends BaseService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private TokenMapper tokenMapper;

    @Autowired
    private ResourceMapper resourceMapper;

    @Autowired
    private HttpServletRequest request;

    public Map<String, Object> getUserById(int id){
        return userMapper.queryById(id);
    }

    /**
     * 用户登录的方法
     * @param userName
     * @param password
     * @return
     */
    public R login(String userName, String password){
        Integer userId = userMapper.queryIdByUserNameAndPassword(userName, Utils.md5(password));
        if(userId == null){
            // 用户名密码不正确
            throw new Rexception(APIReturnData.SERVER_CODE_10001, APIReturnData.STATUS_FAIL, APIReturnData.SERVER_MSG_10001);
        }
        Map r = new HashMap();
        // 创建token
        String token = tokenMapper.queryTokenByUserId(userId);
        if(StringUtils.isEmpty(token)){
            // 新增token
            Token obj = new Token(userId, Utils.generateUUID(), Utils.subOrAddMillSeconds(new Date(), Constant.TOKEN_VALID_TIME));
            tokenMapper.save(obj);
            r.put(Constant.AUTH_TOKEN, obj.getToken());
        } else {
            // 更新token
            Token obj = new Token();
            obj.setToken(token);
            obj.setExpireDate(Utils.subOrAddMillSeconds(new Date(), Constant.TOKEN_VALID_TIME));
            tokenMapper.update(obj);
            r.put(Constant.AUTH_TOKEN, obj.getToken());
        }
        // 保存用户权限信息的集合
        List<String> list = new ArrayList();
        // 获取用户的菜单信息
        List<Resource> userMenus = getUserMenus(userId, list);

        // 将用户拥有的权限放进session中(已经进行过,切割的)
        WebUtils.setSessionAttribute(request, Constant.AUTH_PERM, list);
        // 将用户id放进session中
        WebUtils.setSessionAttribute(request, Constant.USER_ID, userId);
        r.put("menus", userMenus);
        r.put("perms", list);
        return R.ok(r);
    }

    /**
     * 获取用户对应菜单的方法,并获取用户所有的权限
     * @param userId
     * @param permList
     * @return
     */
    List<Resource> getUserMenus(Integer userId, List permList){
        // 用户所有的根菜单(超级管理员获取所有)
        List<Resource> rootMenus = resourceMapper.queryRootMenuByUserId(userId == Constant.SUPER_ADMIN_ID ? null : userId, Constant.RESOURCE_TYPE_MENU, Constant.MENU_ROOT_ID);
        List<Resource> menus = menus(rootMenus, userId == Constant.SUPER_ADMIN_ID ? null : userId, permList);
        return menus;
    }
    // 递归获取
    private List<Resource> menus(List<Resource> list, Integer userId, List permList){
        List childs = new ArrayList();
        for(Resource resource : list){
            // 根据根菜单id查询用户相应的子菜单
            List<Resource> childList = resourceMapper.queryChildMenuByParentId(resource.getId(), userId);
            if(childList != null && childList.size() > 0){
                List l = menus(childList, userId, permList);
                resource.setSub(l);
            }
            // 添加权限,如果有逗号的,需要把逗号切割
            if(StringUtils.isNotEmpty(resource.getPerm())) {
                if(resource.getPerm().contains(",")){
                    String[] perms = resource.getPerm().split(",");
                    for(String perm : perms){
                        permList.add(perm);
                    }
                } else {
                    permList.add(resource.getPerm());
                }
            }
            childs.add(resource);
        }
        return childs;
    }

    /**
     * 查询所有用户
     * @param userId
     * @return
     */
    public Page queryAll(int userId, Page page){
        int total = userMapper.countUserByCreateId(userId);
        List<User> list = userMapper.queryByCreateId(userId, page);
        page.setTotal(total);
        page.setResult(list);
       return page;
    }

    public void save(UserEntity userEntity){
        // 保存基本信息
        Integer id = userMapper.save(userEntity);
        checkOperate(id);
        // 根据id保存角色信息
        if(userEntity.getRoleIds() != null) {
            int i = userMapper.saveUserRole(userEntity.getId(), userEntity.getRoleIds());
            checkOperate(i);
        }
    }

    public void update(UserEntity userEntity){
        if(StringUtils.isNotEmpty(userEntity.getPassword())) {
            userEntity.setPassword(Utils.md5(userEntity.getPassword()));
        }
        int c = userMapper.update(userEntity);
        checkOperate(c);
        // 删除用户原有的角色信息在保存
        userMapper.delUseRole(userEntity.getId());
        // 上面不进行验证,因为用户可能没有角色,导致删除后返回成功数为0
        if(userEntity.getRoleIds() != null) {
            int i = userMapper.saveUserRole(userEntity.getId(), userEntity.getRoleIds());
            checkOperate(i);
        }
    }

    public void del(int[] ids){
        int c = userMapper.del(ids);
        checkOperate(c);
    }




}

