/*
Navicat MySQL Data Transfer

Source Server         : gl
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : react-admin

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2018-05-10 19:00:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_sys_resource
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_resource`;
CREATE TABLE `t_sys_resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL COMMENT '文本信息',
  `icon` varchar(255) DEFAULT NULL COMMENT '图标',
  `parent_id` int(11) DEFAULT '0' COMMENT '父级id',
  `path` varchar(255) DEFAULT NULL COMMENT '对应路径',
  `type` int(1) DEFAULT NULL COMMENT '1-目录 2-菜单 3-资源',
  `perm` varchar(255) DEFAULT NULL COMMENT '权限信息',
  `deleted` tinyint(1) DEFAULT '0',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `create_user_id` int(11) DEFAULT NULL,
  `update_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of t_sys_resource
-- ----------------------------
INSERT INTO `t_sys_resource` VALUES ('1', '基础管理', 'setting', '0', null, '1', null, '0', '2018-04-25 17:39:21', '2018-04-25 17:39:21', null, null);
INSERT INTO `t_sys_resource` VALUES ('2', '用户管理', 'user', '1', '/user', '2', null, '0', '2018-04-25 17:39:30', '2018-04-25 17:39:30', null, null);
INSERT INTO `t_sys_resource` VALUES ('3', '角色管理', 'up-circle-o', '1', '/', '2', null, '0', '2018-04-25 17:39:36', '2018-04-25 17:39:36', null, null);
INSERT INTO `t_sys_resource` VALUES ('4', '资源管理', 'up-circle-o', '1', '/resource', '2', null, '0', '2018-04-25 17:39:58', '2018-04-25 17:39:58', null, null);
INSERT INTO `t_sys_resource` VALUES ('5', '查看', null, '2', '/user/list', '3', 'user-select', '0', '2018-04-27 16:50:55', '2018-04-27 16:50:55', null, null);
INSERT INTO `t_sys_resource` VALUES ('6', '修改', null, '2', '/user/update', '3', 'user-update', '0', '2018-04-27 16:51:05', '2018-04-27 16:51:05', null, null);
INSERT INTO `t_sys_resource` VALUES ('7', '新增', null, '2', '/user/save', '3', 'user-save', '0', '2018-04-27 16:51:20', '2018-04-27 16:51:20', null, null);
INSERT INTO `t_sys_resource` VALUES ('8', '删除', null, '2', '/user/del', '3', 'user-del', '0', '2018-04-27 16:51:32', '2018-04-27 16:51:32', null, null);

-- ----------------------------
-- Table structure for t_sys_role
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_role`;
CREATE TABLE `t_sys_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(32) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `create_user_id` int(11) DEFAULT NULL,
  `update_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of t_sys_role
-- ----------------------------
INSERT INTO `t_sys_role` VALUES ('1', 'ROLE_ADMIN', '管理员', '0', '2018-04-25 17:30:28', '2018-04-25 17:30:28', null, null);
INSERT INTO `t_sys_role` VALUES ('2', 'ROLE_ADMIN1', '管理员1', '0', '2018-04-27 12:59:25', '2018-04-27 12:59:25', null, null);

-- ----------------------------
-- Table structure for t_sys_role_resource
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_role_resource`;
CREATE TABLE `t_sys_role_resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL,
  `resource_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of t_sys_role_resource
-- ----------------------------
INSERT INTO `t_sys_role_resource` VALUES ('1', '1', '1');
INSERT INTO `t_sys_role_resource` VALUES ('2', '1', '2');
INSERT INTO `t_sys_role_resource` VALUES ('3', '1', '4');
INSERT INTO `t_sys_role_resource` VALUES ('5', '1', '3');
INSERT INTO `t_sys_role_resource` VALUES ('6', '1', '5');
INSERT INTO `t_sys_role_resource` VALUES ('7', '1', '6');
INSERT INTO `t_sys_role_resource` VALUES ('8', '1', '7');
INSERT INTO `t_sys_role_resource` VALUES ('9', '1', '9');

-- ----------------------------
-- Table structure for t_sys_token
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_token`;
CREATE TABLE `t_sys_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expire_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `create_user_id` int(11) DEFAULT NULL,
  `update_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of t_sys_token
-- ----------------------------
INSERT INTO `t_sys_token` VALUES ('1', '1', 'sss', '2018-05-11 05:11:12', '0', '2018-05-10 17:11:12', '2018-05-10 17:11:12', '0', '0');

-- ----------------------------
-- Table structure for t_sys_user
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_user`;
CREATE TABLE `t_sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `create_user_id` int(11) DEFAULT NULL,
  `update_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of t_sys_user
-- ----------------------------
INSERT INTO `t_sys_user` VALUES ('1', 'admin', '21232f297a57a5a743894a0e4a801fc3', '0', '2018-04-25 17:11:28', '2018-04-25 17:11:28', null, null);
INSERT INTO `t_sys_user` VALUES ('2', 'fangfang', null, '0', '2018-04-27 17:08:50', '2018-04-27 17:08:50', '1', null);
INSERT INTO `t_sys_user` VALUES ('3', 'jingjing', null, '0', '2018-04-27 17:08:56', '2018-04-27 17:08:56', '1', null);
INSERT INTO `t_sys_user` VALUES ('4', 'mingming', null, '0', '2018-04-27 17:09:01', '2018-04-27 17:09:01', '1', null);
INSERT INTO `t_sys_user` VALUES ('5', 'mingming1', null, '0', '2018-05-01 20:54:11', '2018-05-01 20:54:11', '1', null);
INSERT INTO `t_sys_user` VALUES ('6', 'mingming2', null, '0', '2018-05-01 20:54:14', '2018-05-01 20:54:14', '1', null);
INSERT INTO `t_sys_user` VALUES ('7', 'mingming3', null, '0', '2018-05-01 20:54:17', '2018-05-01 20:54:17', '1', null);
INSERT INTO `t_sys_user` VALUES ('8', 'mingming4', null, '0', '2018-05-01 20:54:20', '2018-05-01 20:54:20', '1', null);
INSERT INTO `t_sys_user` VALUES ('9', 'mingming5', null, '0', '2018-05-01 20:54:23', '2018-05-01 20:54:23', '1', null);
INSERT INTO `t_sys_user` VALUES ('10', 'mingming6', null, '0', '2018-05-01 20:54:26', '2018-05-01 20:54:26', '1', null);
INSERT INTO `t_sys_user` VALUES ('11', 'mingming7', null, '0', '2018-05-01 20:54:29', '2018-05-01 20:54:29', '1', null);
INSERT INTO `t_sys_user` VALUES ('12', 'mingming8', null, '0', '2018-05-01 20:54:32', '2018-05-01 20:54:32', '1', null);

-- ----------------------------
-- Table structure for t_sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_user_role`;
CREATE TABLE `t_sys_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of t_sys_user_role
-- ----------------------------
INSERT INTO `t_sys_user_role` VALUES ('1', '1', '2');
INSERT INTO `t_sys_user_role` VALUES ('2', '1', '1');

-- ----------------------------
-- Procedure structure for generateCommonField
-- ----------------------------
DROP PROCEDURE IF EXISTS `generateCommonField`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `generateCommonField`(in tableName varchar(32))
BEGIN
-- set @_sql = '';
set @_sql = concat(' alter table ', tableName ,' add column deleted tinyint(1) default 0;');
PREPARE stmt from @_sql;
EXECUTE stmt; 
set @_sql = concat(' alter table ', tableName ,' add column create_time datetime default CURRENT_TIMESTAMP;');
PREPARE stmt from @_sql;
EXECUTE stmt; 
set @_sql = concat(' alter table ', tableName ,' add column update_time datetime default CURRENT_TIMESTAMP;');
PREPARE stmt from @_sql;
EXECUTE stmt; 
set @_sql = concat(' alter table ', tableName ,' add column create_user_id int;');
PREPARE stmt from @_sql;
EXECUTE stmt; 
set @_sql = concat(' alter table ', tableName ,' add column update_user_id int;');
PREPARE stmt from @_sql;
EXECUTE stmt; 
DEALLOCATE PREPARE stmt; 
END
;;
DELIMITER ;
