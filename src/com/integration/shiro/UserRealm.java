package com.integration.shiro;
 
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.Cookie;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.druid.util.StringUtils;
import com.integration.entity.Department;
import com.integration.entity.SysRole;
import com.integration.entity.SysUser;
import com.integration.service.UserService;
 
/**
 * @todo 自定义 Realm,查询数据库并返回正确的数据
 * @author Hans
 * @time 2018下午6:11:20
 *
 */
public class UserRealm extends AuthorizingRealm{
        
        @Autowired
        private UserService userService;
 
        /**
         * 认证方法
         */
        protected AuthenticationInfo doGetAuthenticationInfo(
                        AuthenticationToken token) throws AuthenticationException {
                UsernamePasswordToken upToken = (UsernamePasswordToken) token;
                String username = upToken.getUsername();// 从令牌中获得用户名
                SysUser user = userService.findUserByMobile(username);
                if (user == null) {
                        // 用户名不存在
                        return null;
                } else {
                        // 用户名存在
                        String password = user.getPassword();// 获得数据库中存储的密码
                        // 创建简单认证信息对象
                        /***
                         * 参数一：签名，程序可以在任意位置获取当前放入的对象
                         * 参数二：从数据库中查询出的密码
                         * 参数三：当前realm的名称
                         */
                        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(user,
                                        password, this.getClass().getSimpleName());
                        return info;//返回给安全管理器，由安全管理器负责比对数据库中查询出的密码和页面提交的密码
                }
        }

        /**
         * 授权方法
         */
        protected AuthorizationInfo doGetAuthorizationInfo(
                        PrincipalCollection principals) {
                SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
                //根据当前登录用户查询其对应的权限，授权
                SysUser user = (SysUser) principals.getPrimaryPrincipal();
                SysRole userRole = userService.findSysRoleById(user.getRole_id());
                String[] menuArray = userRole.getMenuArray().split(",");
                info.addStringPermission("monitorForVideo");
                info.addStringPermission("patrolForRanger");
                info.addStringPermission("videoManager");
                info.addStringPermission("system");
                info.addStringPermission("commandForFire");
                info.addStringPermission("FunctionMenu");
                for (String menu : menuArray) {
                    if (!StringUtils.isEmpty(menu.trim())) {
                        info.addStringPermission(menu);
                    }
                }
                return info;
        }
}
