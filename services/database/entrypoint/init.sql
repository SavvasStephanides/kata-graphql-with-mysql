CREATE DATABASE playlist;

USE playlist;

-- Adminer 4.7.7 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `artists`;
CREATE TABLE `artists` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `artists` (`id`, `name`) VALUES
(1,	'Headhunterz'),
(2,	'Sound Rush'),
(3,	'KELTEK'),
(4,	'Phuture Noize'),
(5,	'Wildstylez'),
(6,	'Noisecontrollers'),
(7,	'Bass Modulators'),
(8,	'Sub Zero Project');

DROP TABLE IF EXISTS `tracks`;
CREATE TABLE `tracks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `artistId` int(11) NOT NULL,
  `releaseYear` int(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `tracks` (`id`, `name`, `artistId`, `releaseYear`) VALUES
(1,	'The Hunter & The Prey',	1,	2020),
(2,	'Infinite Skies',	2,	2020),
(3,	'No One Ever Knows',	2,	2020),
(4,	'Dragonborn Part 3 (Oceans Apart)',	1,	2020),
(5,	'The Power Of The Mind',	1,	2007),
(6,	'The Temple',	4,	2016),
(7,	'Fire',	4,	2016),
(8,	'My Beautiful Fantasy',	4,	2019),
(9,	'The Spirit of Hardstyle',	6,	2017);

-- 2020-11-25 15:12:33