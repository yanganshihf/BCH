package com.integration.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.MenuDAO;
import com.integration.dao.RoleDAO;
import com.integration.dao.UserDAO;
import com.integration.entity.SysMenu;
import com.integration.entity.SysRole;
import com.integration.entity.SysUser;
import com.integration.service.UserService;
@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDAO userDao;
	
	@Autowired
	private MenuDAO menuDao;
	
	@Autowired
	RoleDAO roleDao;

	

	@Override
	public List<SysMenu> findMenuByUserId(String id) {
		return this.menuDao.findByUserId(id);
	}

	@Override
	public SysUser loginUser(String mobile, String password) {
		// TODO Auto-generated method stub
		return userDao.loginUser(mobile, password);
	}

	@Override
	public SysRole findSysRoleById(String id) {
		// TODO Auto-generated method stub
		return roleDao.findRoleById(id);
	}
        @Override
        public SysUser findUserByMobile(String mobile) {
                // TODO Auto-generated method stub
                return userDao.findUserByMobile(mobile);
        }

        @Override
        public List<SysUser> findUserByMobileAndName(String mobile, String name,String department) {
            // TODO Auto-generated method stub
            return userDao.findUserByMobileAndName(mobile,name,department);
        }	

}