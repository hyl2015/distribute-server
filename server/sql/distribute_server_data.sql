/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : distribute_server

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 03/09/2017 17:34:24 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Records of `res_version`
-- ----------------------------
BEGIN;
INSERT INTO `res_version` VALUES ('1', 'v1', 'ttt', '', '0', '0', '2017-03-09 14:13:25', '2017-03-09 10:56:25'), ('2', 'v2', 'ttt', '', '0', '1', '2017-03-09 10:56:31', '2017-03-09 10:56:31'), ('3', 'v1', 'test', 'develop_67cd0d004c1926af5d4aecddf6a40e00bf317391', '0', '0', '2017-03-09 15:15:57', '2017-03-09 15:15:57');
COMMIT;

-- ----------------------------
--  Records of `sys_config`
-- ----------------------------
BEGIN;
INSERT INTO `sys_config` VALUES ('1', 'config.rn.dir', '/Users/linlin.huang/Documents/workspace/rn/lifeline', '2017-03-08 16:54:19', '2017-03-08 16:54:19'), ('2', 'config.resource.dir', '/tmp/res', '2017-03-08 16:54:19', '2017-03-08 16:54:19'), ('3', 'config.app.dir', '/tmp/app', '2017-03-08 16:54:19', '2017-03-08 16:54:19');
COMMIT;

-- ----------------------------
--  Records of `sys_menu`
-- ----------------------------
BEGIN;
INSERT INTO `sys_menu` VALUES ('1', '0', '发布资源', '/resources', 'send', '2017-03-07 16:45:53', '2017-03-07 16:45:53'), ('2', '0', '发布', '/publish', 'send', '2017-03-07 16:45:53', '2017-03-07 16:45:53');
COMMIT;

-- ----------------------------
--  Records of `sys_permission`
-- ----------------------------
BEGIN;
INSERT INTO `sys_permission` VALUES ('1', '系统管理员', '2017-03-07 16:46:06', '2017-03-07 16:46:06');
COMMIT;

-- ----------------------------
--  Records of `sys_permission_menu`
-- ----------------------------
BEGIN;
INSERT INTO `sys_permission_menu` VALUES ('1', '1', '1'), ('2', '1', '2');
COMMIT;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', 'admin', 'admin', 'admin', 'admin', '1', '0', '2017-03-07 16:46:15', '2017-03-07 16:46:15');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
