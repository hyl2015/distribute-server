SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Records of `sys_menu`
-- ----------------------------
BEGIN;
TRUNCATE TABLE `sys_menu`;
INSERT INTO `sys_menu` VALUES ('1', '0', '发布资源', '/resources', 'send');
COMMIT;

-- ----------------------------
--  Records of `sys_permission`
-- ----------------------------
BEGIN;
TRUNCATE TABLE `sys_permission`;
INSERT INTO `sys_permission` VALUES ('1', '系统管理员');
COMMIT;

-- ----------------------------
--  Records of `sys_permission_menu`
-- ----------------------------
BEGIN;
TRUNCATE TABLE `sys_permission_menu`;
INSERT INTO `sys_permission_menu` VALUES ('1', '1', '1');
COMMIT;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
TRUNCATE TABLE `user`;
INSERT INTO `user` VALUES ('1', 'admin', 'admin', 'admin', 'admin', '1', '0', '0', '0');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
