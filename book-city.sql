/*
Navicat MySQL Data Transfer

Source Server         : book
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : book-city

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2020-06-02 17:46:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for back_user
-- ----------------------------
DROP TABLE IF EXISTS `back_user`;
CREATE TABLE `back_user` (
  `account` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=188884 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for bookshelf
-- ----------------------------
DROP TABLE IF EXISTS `bookshelf`;
CREATE TABLE `bookshelf` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `gender_type` int(255) DEFAULT NULL COMMENT '1:男频 2：女频',
  `image` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '封面图片地址',
  `text` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '书籍文件地址',
  `charge` int(11) DEFAULT NULL COMMENT '收费标准(1:收费 ，2：收费，3：限免，4：章节免费)',
  `price` int(11) DEFAULT NULL COMMENT '书本价格',
  `describe_txt` text COLLATE utf8_bin COMMENT '描述信息',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=112 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
