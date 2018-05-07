CREATE DATABASE IF NOT EXISTS `uncracked`;

USE `uncracked`;

DROP TABLE IF EXISTS `seguimientos`;

CREATE TABLE `seguimientos` (
  `id` double NOT NULL AUTO_INCREMENT,
  `id_soul` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `detalle` text NOT NULL,
  `alarma` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

INSERT INTO `seguimientos` VALUES("1","1","2018-04-02","Visita por Primera vez Servicio","0");
INSERT INTO `seguimientos` VALUES("4","6","2018-04-10","Visita por Primera vez Servicio","0");
INSERT INTO `seguimientos` VALUES("3","3","2018-04-02","Visita por Primera vez Servicio","0");
INSERT INTO `seguimientos` VALUES("5","7","2018-05-02","Visita por Primera vez Servicio","0");



DROP TABLE IF EXISTS `souls`;

CREATE TABLE `souls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `barrio` varchar(255) NOT NULL,
  `nacimiento` date NOT NULL,
  `IdGv` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

INSERT INTO `souls` VALUES("1","HEINER GOMEZ","3217478593","KRA 10 NO 9A - 22 APTO 1","ALFONZO LOPEZ","1989-03-23","0");
INSERT INTO `souls` VALUES("4","LORAINE GUTIERREZ","0","A","S","2018-04-01","0");
INSERT INTO `souls` VALUES("3","BORIS MIRANDA","A","452","el oaiss","2000-02-02","0");
INSERT INTO `souls` VALUES("5","BENJAMIN GOMEZ","AA","JJ","KJ","2017-11-03","0");
INSERT INTO `souls` VALUES("6","jose gomez","3014445588","calle","el carmen","2000-01-20","0");
INSERT INTO `souls` VALUES("7","Jairo","123","321","321","2018-03-10","0");



DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `ident` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO `usuarios` VALUES("1","consolidacion","8cb2237d0679ca88db6464eac60da96345513964","2","Consolidacion","123456789","1234567890");
