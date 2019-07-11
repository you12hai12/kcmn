/*
Navicat MySQL Data Transfer

Source Server         : 本地库
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : student_info

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2019-07-11 10:40:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_sales
-- ----------------------------
DROP TABLE IF EXISTS `t_sales`;
CREATE TABLE `t_sales` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `week` varchar(10) NOT NULL COMMENT '星期',
  `sales` int(5) NOT NULL COMMENT '种植量',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tk_sales` (`week`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_sales
-- ----------------------------
INSERT INTO `t_sales` VALUES ('1', '星期一', '96');
INSERT INTO `t_sales` VALUES ('2', '星期二', '86');
INSERT INTO `t_sales` VALUES ('3', '星期三', '54');
INSERT INTO `t_sales` VALUES ('4', '星期四', '74');
INSERT INTO `t_sales` VALUES ('5', '星期五', '32');
INSERT INTO `t_sales` VALUES ('6', '星期六', '41');
INSERT INTO `t_sales` VALUES ('7', '星期日', '67');

-- ----------------------------
-- Table structure for t_stu
-- ----------------------------
DROP TABLE IF EXISTS `t_stu`;
CREATE TABLE `t_stu` (
  `sno` int(10) NOT NULL,
  `sname` varchar(20) NOT NULL,
  `sage` int(3) NOT NULL,
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_stu
-- ----------------------------
INSERT INTO `t_stu` VALUES ('1', 'A', '18');
INSERT INTO `t_stu` VALUES ('2', 'B', '17');
INSERT INTO `t_stu` VALUES ('3', 'C', '18');
INSERT INTO `t_stu` VALUES ('4', 'D', '19');
INSERT INTO `t_stu` VALUES ('5', 'E', '20');
INSERT INTO `t_stu` VALUES ('6', 'F', '21');
INSERT INTO `t_stu` VALUES ('7', 'G', '22');
INSERT INTO `t_stu` VALUES ('8', 'H', '22');
INSERT INTO `t_stu` VALUES ('9', 'I', '20');
INSERT INTO `t_stu` VALUES ('10', 'J', '20');
INSERT INTO `t_stu` VALUES ('11', 'K', '19');
INSERT INTO `t_stu` VALUES ('12', 'J', '20');
INSERT INTO `t_stu` VALUES ('13', 'J', '20');
INSERT INTO `t_stu` VALUES ('14', 'J', '20');
INSERT INTO `t_stu` VALUES ('15', 'K', '20');
INSERT INTO `t_stu` VALUES ('16', 'L', '19');
