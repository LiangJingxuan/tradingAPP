/*
Navicat MySQL Data Transfer

Source Server         : liang
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : juyi

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2018-07-17 09:04:34
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
  `state` tinyint(1) unsigned zerofill NOT NULL COMMENT '商品上下架状态',
  `nice` tinyint(1) unsigned zerofill NOT NULL COMMENT '热门商品状态',
  `standard_id` varchar(100) DEFAULT NULL COMMENT '规格外键',
  `sid` int(10) unsigned NOT NULL COMMENT '类目外键',
  `goods_time` int(10) unsigned NOT NULL COMMENT '商品添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('11', '测试', '测试', '/uploads/goods/upload_2a5826fdeb3e90899f0ab1de59a724bd.jpg,/uploads/goods/upload_54844ec1e79a3988e987de0c27f17ee0.jpg', '<p>测试</p>\r\n', '1', '0', null, '4', '1531789271');
INSERT INTO `goods` VALUES ('13', '测试', '测试', '/uploads/goods/upload_1e80377878bee4c841acab28baa93ad9.jpg', '<p>测试</p>\r\n', '1', '0', null, '5', '1531789350');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '新闻id',
  `title` varchar(40) NOT NULL COMMENT '新闻标题',
  `time` int(10) unsigned NOT NULL COMMENT '新闻时间',
  `content` varchar(5000) NOT NULL COMMENT '新闻内容',
  `sid` int(11) NOT NULL COMMENT '类目外键',
  `state` tinyint(1) unsigned NOT NULL COMMENT '发布状态',
  `uid` int(10) unsigned NOT NULL COMMENT '用户id',
  PRIMARY KEY (`id`,`title`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('1', '保护世界，守护家园', '1530498347', '<p><a href=\"http://www.hbjynt.com/\" target=\"_self\">保定空气能热泵</a>：空气能热泵比天然气有那些优点？</p>\r\n\r\n<p>近年来，北方冬季雾霾天气频发，已经成为社会普遍关注的问题，而散煤采暖大量排放的污染物是导致雾霾的基本因素之一。现今，我国每年散煤用量高达3亿多吨，占煤炭总用量近10%左右，由于基本都没有采取除尘、脱硫等措施，大气污染物排放严重超标，燃烧一吨散煤所排放的大气污染物是等量电煤的10倍以上。因此，散煤的治理和清洁供暖改造工程已经迫在眉睫。一时间空气源热泵采暖、天然气采暖成为清洁采暖的热门产品。<br />\r\n天然气是一种清洁的化石燃料，近几年随着煤改清洁能源以及低碳环保的深入人心，天然气的消费也进入到快速增长期。但自去年以来，天然气消费遭遇了瓶颈，出现了低水平的富余。究其原因在于：<br />\r\n&nbsp;&nbsp;&nbsp; 一是天然气气价不稳定，相对较高；二是天然气输送管线特别是配气管网建设相对滞后，很多区域无法使用。改善大气污染，在燃煤替代的过程中即要让老百姓从根本上认同，同时也要保证老百姓用得起、用得舒心。这就出现近年来技术日渐成熟的空气源热泵采暖在北方煤改清洁能源的进程中所发挥的巨大作用。空气源热泵采暖与天然气采暖不同，它主要运用的是空气中无时无刻不存在的空气源能，是一种可再生清洁能源。北方的利普曼空气源更是超高能效比，克服北方低温限制，在北方地区大受欢迎。空气源热泵采暖具有环保、节能、安全、智能等特点，在近两年尤其是京津冀地区，应用最为广泛。</p>\r\n', '1', '1', '36');
INSERT INTO `news` VALUES ('25', '保护野生动物，热爱世界', '1531466700', '<p>在野生动物保护工作的各个领域里，最直观、最感人，也最容易引发共鸣的，无疑是&ldquo;救助个体&rdquo;。看到一只伤愈的红隼重返蓝天，足以让每一个在场者热泪盈眶。</p>\n\n<p>但是，很容易被志愿者忽略的一点是，救助野生动物个体的价值往往并不在个体本身，而更多地在个体背后的整个种群。这和救助人类社会中的弱势个体是不同的。</p>\n\n<p>动物和人的差异很多，按照演化生物学家 <a href=\"http://www.guokr.com/article/66487/\" target=\"_blank\">道金斯</a> 等人的观点，最大的差异可能在于动物缺乏文化。在这里，文化的定义是&ldquo;与遗传无关、但可以模仿和传承的行为模式&rdquo;。</p>\n\n<p>人类社会中，文化因素正在逐渐压倒遗传生理的因素。我们对自我的改造能力越来越强，先天遗传素质的重要性也越来越小。当我们说 &ldquo;每个人都独一无二&rdquo; 的时候，这种独特性大部分来源于后天。而一个人对社会的贡献更是几乎全部来自文化领域：他的一生中会创造出无数的新思想和新事物，影响身边的每一个人；而当他死去时，哪怕他的血脉有后代来传承，那些未曾表达出来的无数思想也会永远消失。相比之下，他对人类的遗传贡献显得微不足道。</p>\n\n<p>然而，野生动物个体在环境中的绝大部分行为，都可以回溯到它的基因；个体间的文化传承即便存在，影响也通常微乎其微 <a href=\"#id12\">[1]</a> 。 如果两群狼面对同一场景做出了不同的反应，那是因为它们的遗传特征不同，而不是因为它们各自经历了不同的狼群历史、有不同的狼群文化。就算有动物因为和人相处而从人类这里习得了复杂的行为，当它回归野外时也几乎不可能把自己学会的 &ldquo;人类技巧&rdquo; 教给其它动物、改变原有的文化。一种不适应其所在环境的人类文化可以导致一个文明的毁灭，但动物界中的文化似乎从来没有这样巨大的效果。</p>\n\n<p>因此，野生动物的价值更多地承载于它的基因之中，种群本身的延续更为关键。个体的死亡是必然的，但基因通过种群基因库可以长存下去，维持物种的存在。 <strong>我们保护野生动物个体，更多是一种保护种群的手段，本身并非目的。</strong> 所以黄石公园才会引入狼来控制鹿的数量、来淘汰老弱病残。这样的行为在人类中无法想象，在自然界却是完全正常合理的；我们经常用人类的眼光去看野生动物，忘记了我们之间的客观差异。</p>\n\n<p>而假如一个物种本身并未濒危，那么刻意保护它们的个体，对整个物种也没有多少好处。如果我们出于其他理由、依然希望保护这些个体免于死亡的话，那就不属于狭义动物保护的范畴了。</p>\n\n<p><br />\n<br />\n作者：Ent<br />\n链接：https://www.guokr.com/article/89800/<br />\n来源：果壳<br />\n本文版权属于果壳网（guokr.com），禁止转载。如有需要，请联系sns@guokr.com</p>\n', '3', '1', '36');
INSERT INTO `news` VALUES ('26', '热爱大自然，保护野生动物', '1531147200', '<p>121212</p>\n', '2', '1', '36');
INSERT INTO `news` VALUES ('27', '热爱世界，热爱野生动物', '1531147500', '<p>说说</p>\n', '2', '1', '36');
INSERT INTO `news` VALUES ('28', '守护野生动物，守护大自然', '1531147800', '<p>说说</p>\n', '1', '1', '36');
INSERT INTO `news` VALUES ('29', '中储粮集团：4月以来未购美国大豆 南美大豆占比已超美国', '1532070300', '<p>近期，中储粮集团公司紧密跟踪中美贸易摩擦相关情况，坚决执行国家对外贸易政策。自今年4月以来，中储粮未再新采购美国大豆，转而全部采购以巴西、阿根廷、乌拉圭为主的南美大豆。</p>\n\n<p>　　本报北京7月10日电 （记者杜海涛）&ldquo;近两年，我们已经主动调整进口来源地，降低集中度过高带来的风险，并已形成稳定成熟的多元化国际贸易渠道。&rdquo;中储粮集团公司相关负责人介绍，从中储粮集团油脂公司的情况看，2017年进口的大豆26.2%来自巴西，43.2%来自阿根廷、乌拉圭，30.6%来自美国。在大豆进口贸易实际操作中，采购方拥有货源地选择权，更倾向于选择贸易关系良好、有稳定政策预期、进口税率更低的大豆主产国。</p>\n\n<p>　　这位负责人表示，近期，中储粮集团公司紧密跟踪中美贸易摩擦相关情况，坚决执行国家对外贸易政策。自今年4月以来，中储粮未再新采购美国大豆，转而全部采购以巴西、阿根廷、乌拉圭为主的南美大豆。</p>\n\n<p>　　根据中国海关统计，我国大豆进口来源呈现多元化趋势，南美大豆供给占比超过美国。2016&mdash;2017年度，我国大豆进口量9349万吨，其中巴西4534万吨，占48.5%，较三年前增加1.7个百分点；美国3684万吨，占39.4%，较三年前下降1个百分点。以南美为主的非美大豆进口已经占到我国大豆进口量的六成以上，且呈稳定增长趋势。未来，南美将越来越成为我国进口大豆供应的主力地区。</p>\n\n<p>　　中储粮集团公司相关负责人表示，当前我国油脂油料储备体系完善，储备资源充足，加工和流通配套能力良好，能够随时响应保证供应、稳定市场的调控指令，储备资源充足，流通能力良好。</p>\n\n<p>　　&ldquo;中储粮集团在布局油脂油料储备时，遵循市场流通的规律，将储备库与加工厂一体布局，形成油脂油料储备和加工基地，使储备轮出到加工的链条缩短、效率提高。目前，中储粮年油脂压榨能力达到650万吨，成为参与市场供应的重要主体。由于与储备结合，在原料供应更有保障的同时，储备投放市场更加高效，维护市场稳定的能力更强。&rdquo;这位负责人说。</p>\n', '2', '0', '36');
INSERT INTO `news` VALUES ('30', '大自然保护协会', '1531293512', '<p><a href=\"https://www.baidu.com/s?wd=%E5%A4%A7%E8%87%AA%E7%84%B6%E4%BF%9D%E6%8A%A4%E5%8D%8F%E4%BC%9A&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">大自然保护协会</a>The Nature Conservancy (TNC) 是从事生态环境保护的国际民间组织，成立于1951年，总部设在<a href=\"https://www.baidu.com/s?wd=%E7%BE%8E%E5%9B%BD%E5%8D%8E%E7%9B%9B%E9%A1%BF&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">美国华盛顿</a>。协会的使命是：通过保护代表地球<a href=\"https://www.baidu.com/s?wd=%E7%94%9F%E7%89%A9%E5%A4%9A%E6%A0%B7%E6%80%A7&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">生物多样性</a>的动物、植物和自然群落赖以生存的陆地和水域，来实现对这些动物、植物和自然群落的保护。 由于坚持采取合作而非对抗性的策略，以及用科学的原理和方法来指导保护行动，经过50余年的不懈努力，协会已跻身美国十大慈善机构行列，位居全球生态环境保护非营利民间组织前茅。目前仅美国本土而言，协会拥有1600多个自然保护区，总面积达1400万英亩，遍布50个州。并与合作伙伴一起在<a href=\"https://www.baidu.com/s?wd=%E6%8B%89%E4%B8%81%E7%BE%8E%E6%B4%B2&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">拉丁美洲</a>、<a href=\"https://www.baidu.com/s?wd=%E5%8A%A0%E5%8B%92%E6%AF%94%E6%B5%B7&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">加勒比海</a>，以及亚太等30个国家管护着超过1.02x108英亩的<a href=\"https://www.baidu.com/s?wd=%E7%94%9F%E7%89%A9%E5%A4%9A%E6%A0%B7%E6%80%A7&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">生物多样性</a>热点地区。协会在全球设有400个办公室，员工人数达3800名，拥有会员上百万，约20000名志愿者参与服务。 1997年，协会开始进入中国。经前期全面考察，并在科学论证的基础上，最终将云南滇西北选定为协会在中国的<a href=\"https://www.baidu.com/s?wd=%E7%94%9F%E7%89%A9%E5%A4%9A%E6%A0%B7%E6%80%A7&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">生物多样性</a>保护的首要 实施地。在与<a href=\"https://www.baidu.com/s?wd=%E4%BA%91%E5%8D%97%E7%9C%81%E6%94%BF%E5%BA%9C&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">云南省政府</a>合作编制了&ldquo;滇西北保护与发展行动计划&rdquo;之后，协会在滇西北的老君山、拉市海、<a href=\"https://www.baidu.com/s?wd=%E6%A2%85%E9%87%8C%E9%9B%AA%E5%B1%B1&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">梅里雪山</a>、<a href=\"https://www.baidu.com/s?wd=%E9%A6%99%E6%A0%BC%E9%87%8C%E6%8B%89&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">香格里拉</a>和<a href=\"https://www.baidu.com/s?wd=%E9%AB%98%E9%BB%8E%E8%B4%A1%E5%B1%B1&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">高黎贡山</a>北段开展并实施了一些具体的保护项目。北京办公室的设立，标志着协会在中国更大范围内开展生物多样性保护工作。 经过短短几年的努力，<a href=\"https://www.baidu.com/s?wd=%E5%A4%A7%E8%87%AA%E7%84%B6%E4%BF%9D%E6%8A%A4%E5%8D%8F%E4%BC%9A&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">大自然保护协会</a>在中国逐渐成长壮大，成为民间生态环境保护队伍中的重要力量，为生态环境保护事业做出了贡献。</p>\n', '2', '1', '37');

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
INSERT INTO `user` VALUES ('37', '景轩', 'ae2d874fe06430805b3fa7e61ae7f46d', '听管理员的', '15100284121');
