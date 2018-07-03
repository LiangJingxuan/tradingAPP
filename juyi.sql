/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50703
Source Host           : localhost:3306
Source Database       : juyi

Target Server Type    : MYSQL
Target Server Version : 50703
File Encoding         : 65001

Date: 2018-07-03 23:43:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for about
-- ----------------------------
DROP TABLE IF EXISTS `about`;
CREATE TABLE `about` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '关于我们id',
  `content` varchar(1000) NOT NULL COMMENT '关于我们内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of about
-- ----------------------------

-- ----------------------------
-- Table structure for case
-- ----------------------------
DROP TABLE IF EXISTS `case`;
CREATE TABLE `case` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '案例id',
  `case_title` varchar(20) NOT NULL COMMENT '案例标题',
  `case_time` int(10) unsigned NOT NULL COMMENT '案例时间',
  `case_pic` varchar(300) NOT NULL COMMENT '案例图片',
  `states` tinyint(1) unsigned zerofill NOT NULL COMMENT '热门案例状态',
  `cid` int(10) unsigned NOT NULL COMMENT '类目外键',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of case
-- ----------------------------

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '类目id',
  `cname` varchar(20) NOT NULL COMMENT '类目名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '公司产品');
INSERT INTO `category` VALUES ('2', '公司案例');
INSERT INTO `category` VALUES ('3', '新闻中心');

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '公司id',
  `adds` varchar(100) NOT NULL COMMENT '公司地址',
  `phone` varchar(100) NOT NULL COMMENT '公司电话',
  `email` varchar(100) NOT NULL COMMENT '公司邮箱',
  `location` varchar(100) NOT NULL COMMENT '公司坐标',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company
-- ----------------------------

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '客户id',
  `name` varchar(7) DEFAULT NULL COMMENT '客户姓名',
  `email` varchar(40) DEFAULT NULL COMMENT '客户邮箱',
  `phone` char(11) NOT NULL COMMENT '客户电话',
  `title` varchar(40) DEFAULT NULL COMMENT '客户标题',
  `content` varchar(150) DEFAULT NULL COMMENT '客户留言',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of customer
-- ----------------------------

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `goods_name` varchar(20) NOT NULL COMMENT '商品名称',
  `goods_point` varchar(100) DEFAULT NULL COMMENT '商品卖点',
  `goods_pic` varchar(300) DEFAULT NULL COMMENT '商品图片',
  `goods_summary` varchar(500) DEFAULT NULL COMMENT '商品概述',
  `state` tinyint(1) unsigned zerofill NOT NULL COMMENT '热门商品状态',
  `standard_id` varchar(100) DEFAULT NULL COMMENT '规格外键',
  `subcategory_id` int(10) unsigned NOT NULL COMMENT '类目外键',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '新闻id',
  `title` varchar(40) NOT NULL COMMENT '新闻标题',
  `time` int(10) unsigned NOT NULL COMMENT '新闻时间',
  `timing` int(10) unsigned DEFAULT NULL COMMENT '定时发布',
  `content` varchar(5000) NOT NULL COMMENT '新闻内容',
  `sid` int(11) NOT NULL COMMENT '类目外键',
  `state` tinyint(1) unsigned NOT NULL COMMENT '发布状态',
  `uid` int(10) unsigned NOT NULL COMMENT '用户id',
  PRIMARY KEY (`id`,`title`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('1', '保定空气能热泵：空气能热泵比天然气有那些优点？', '1530498347', null, '<p><a href=\"http://www.hbjynt.com/\" target=\"_self\">保定空气能热泵</a>：空气能热泵比天然气有那些优点？</p>\r\n\r\n<p>近年来，北方冬季雾霾天气频发，已经成为社会普遍关注的问题，而散煤采暖大量排放的污染物是导致雾霾的基本因素之一。现今，我国每年散煤用量高达3亿多吨，占煤炭总用量近10%左右，由于基本都没有采取除尘、脱硫等措施，大气污染物排放严重超标，燃烧一吨散煤所排放的大气污染物是等量电煤的10倍以上。因此，散煤的治理和清洁供暖改造工程已经迫在眉睫。一时间空气源热泵采暖、天然气采暖成为清洁采暖的热门产品。<br />\r\n天然气是一种清洁的化石燃料，近几年随着煤改清洁能源以及低碳环保的深入人心，天然气的消费也进入到快速增长期。但自去年以来，天然气消费遭遇了瓶颈，出现了低水平的富余。究其原因在于：<br />\r\n&nbsp;&nbsp;&nbsp; 一是天然气气价不稳定，相对较高；二是天然气输送管线特别是配气管网建设相对滞后，很多区域无法使用。改善大气污染，在燃煤替代的过程中即要让老百姓从根本上认同，同时也要保证老百姓用得起、用得舒心。这就出现近年来技术日渐成熟的空气源热泵采暖在北方煤改清洁能源的进程中所发挥的巨大作用。空气源热泵采暖与天然气采暖不同，它主要运用的是空气中无时无刻不存在的空气源能，是一种可再生清洁能源。北方的利普曼空气源更是超高能效比，克服北方低温限制，在北方地区大受欢迎。空气源热泵采暖具有环保、节能、安全、智能等特点，在近两年尤其是京津冀地区，应用最为广泛。</p>\r\n', '1', '1', '36');
INSERT INTO `news` VALUES ('17', '55', '1530629928', '1530964500', '<p>55</p>\n', '3', '0', '36');

-- ----------------------------
-- Table structure for standard
-- ----------------------------
DROP TABLE IF EXISTS `standard`;
CREATE TABLE `standard` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '规格id',
  `standard_key` char(20) NOT NULL COMMENT '规格名',
  `standard_val` char(20) NOT NULL COMMENT '规格值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of standard
-- ----------------------------

-- ----------------------------
-- Table structure for subcategory
-- ----------------------------
DROP TABLE IF EXISTS `subcategory`;
CREATE TABLE `subcategory` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '子类目id',
  `sname` varchar(20) NOT NULL,
  `cid` int(10) unsigned NOT NULL COMMENT '父类id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subcategory
-- ----------------------------
INSERT INTO `subcategory` VALUES ('1', '公司新闻', '3');
INSERT INTO `subcategory` VALUES ('2', '行业新闻', '3');
INSERT INTO `subcategory` VALUES ('3', '公司公告', '3');
INSERT INTO `subcategory` VALUES ('4', '地暖', '1');
INSERT INTO `subcategory` VALUES ('5', '光伏发电', '1');
INSERT INTO `subcategory` VALUES ('6', '空气能', '1');
INSERT INTO `subcategory` VALUES ('7', '太阳能', '1');
INSERT INTO `subcategory` VALUES ('8', '风机盘管', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` char(10) NOT NULL COMMENT '用户名',
  `password` varchar(50) NOT NULL COMMENT '用户密码',
  `roles` varchar(100) NOT NULL COMMENT '用户权限',
  `tel` char(11) NOT NULL COMMENT '用户电话',
  PRIMARY KEY (`id`,`tel`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('36', '海琦', 'ae2d874fe06430805b3fa7e61ae7f46d', '管理员', '15100284122');
INSERT INTO `user` VALUES ('37', '景轩', 'ae2d874fe06430805b3fa7e61ae7f46d', '管理员', '15100284121');
