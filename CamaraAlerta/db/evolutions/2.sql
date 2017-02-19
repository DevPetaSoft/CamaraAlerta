# --- !Ups

INSERT INTO `ca_usuario` (`id`, `email`, `login`, `nome`, `senha`, `tokenFacebook`, `tokenGPlus`) VALUES (NULL, 'adm@adm.com', NULL, 'Administrador', 'c552982dd2c96522cb1182b8aa53a48f', NULL, NULL);

INSERT INTO `ca_administrador` (`deleted`, `nivalDeAcesso`, `id`) VALUES ('0', '0', '1');

# --- !Downs


DELETE FROM `ca_administrador` WHERE `id` = 1;

DELETE FROM `ca_usuario` WHERE `id` = 1 ;
