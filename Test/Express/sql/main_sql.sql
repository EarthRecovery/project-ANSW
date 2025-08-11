-- 用户表
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '用户ID，主键，自增',
  `username` VARCHAR(50) NOT NULL UNIQUE COMMENT '账号，用户名，不重复',
  `password_hash` VARCHAR(255) NOT NULL COMMENT '密码哈希（加盐）',
  `permission` TINYINT NOT NULL DEFAULT 0 COMMENT '权限，0=用户，1=管理员',
  `points` INT DEFAULT 0 COMMENT '积分点数',
  `level` INT DEFAULT 1 COMMENT '等级',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `is_disabled` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否停用，0=启用，1=停用',
  `avatar_url` VARCHAR(255) COMMENT '头像URL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 文章表
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '文章ID，主键，自增',
  `author_id` BIGINT NOT NULL COMMENT '作者用户ID',
  `title` VARCHAR(255) NOT NULL COMMENT '文章标题',
  `html_content` MEDIUMTEXT NOT NULL COMMENT '文章HTML内容',
  `publish_time` DATETIME COMMENT '发布时间',
  `last_modified_time` DATETIME COMMENT '最新修改时间',
  `is_published` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '发布状态，0=未发布，1=发布',
  `up_count` INT DEFAULT 0 COMMENT '点赞数',
  `down_count` INT DEFAULT 0 COMMENT '点踩数',
  PRIMARY KEY (`id`),
  INDEX (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 文章图片列表
DROP TABLE IF EXISTS `article_image`;
CREATE TABLE `article_image` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '图片ID，主键，自增',
  `article_id` BIGINT NOT NULL COMMENT '所属文章ID',
  `image_path` VARCHAR(255) NOT NULL COMMENT '图片路径（相对父目录）',
  PRIMARY KEY (`id`),
  INDEX (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 文章-标签表
DROP TABLE IF EXISTS `article_tag`;
CREATE TABLE `article_tag` (
  `article_id` BIGINT NOT NULL COMMENT '文章ID',
  `tag` VARCHAR(50) NOT NULL COMMENT '标签内容',
  PRIMARY KEY (`article_id`, `tag`),
  INDEX (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 用户浏览记录
DROP TABLE IF EXISTS `view_history`;
CREATE TABLE `view_history` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `article_id` BIGINT NOT NULL COMMENT '文章ID',
  `view_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '浏览时间',
  PRIMARY KEY (`id`),
  INDEX (`user_id`),
  INDEX (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- up/down表
DROP TABLE IF EXISTS `article_vote`;
CREATE TABLE `article_vote` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `article_id` BIGINT NOT NULL COMMENT '文章ID',
  `is_up` TINYINT(1) NOT NULL COMMENT '点赞/点踩标记，1=up，0=down',
  `vote_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '投票时间',
  PRIMARY KEY (`id`),
  INDEX (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 评论表
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '评论ID，主键，自增',
  `parent_id` BIGINT DEFAULT NULL COMMENT '父评论ID，NULL表示顶级评论',
  `article_id` BIGINT NOT NULL COMMENT '所属文章ID',
  `content` TEXT NOT NULL COMMENT '评论内容',
  `user_id` BIGINT NOT NULL COMMENT '评论用户ID',
  `comment_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
  PRIMARY KEY (`id`),
  INDEX (`parent_id`),
  INDEX (`article_id`),
  INDEX (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
