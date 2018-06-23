/*
Navicat MySQL Data Transfer

Source Server         : liang
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : juyi

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2018-06-23 17:35:57
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------

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
  `content` varchar(5000) NOT NULL COMMENT '新闻内容',
  `cid` int(11) NOT NULL COMMENT '类目外键',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subcategory
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` char(10) NOT NULL COMMENT '用户名',
  `password` varchar(50) NOT NULL COMMENT '用户密码',
  `roles` varchar(100) NOT NULL COMMENT '用户权限',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
