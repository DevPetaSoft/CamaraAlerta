
# --- !Ups

INSERT INTO ca_cidade (id, estado, nome) VALUES (NULL, 'Minas Gerais', 'Lavras');

INSERT INTO `ca_usuario` (`id`, `email`, `login`, `nome`, `senha`, `tokenFacebook`, `tokenGPlus`) VALUES (NULL, 'adm@adm.com', NULL, 'Administrador', '123', NULL, NULL);

INSERT INTO `ca_usuario` (`id`, `email`, `login`, `nome`, `senha`, `tokenFacebook`, `tokenGPlus`) VALUES (NULL, 'vereador@vereador.com', NULL, 'Vereador', '57ffdbffec2f242b823ce260126ce551', NULL, NULL);

INSERT INTO `ca_administrador` (`deleted`, `nivalDeAcesso`, `id`) VALUES ('0', '0', '1');

INSERT INTO `ca_vereador` (`cpf`, `dataCadastro`, `deleted`, `emDia`, `nivalDeAcesso`, `notificacaoMensagem`, `notificacaoSolicitacao`, `telefone`, `id`, `cidade_id`, `criadoPor_id`) VALUES ('11111111111', '2016-12-31 00:00:00', '0', '0', '0', '0', '0', '33333333', '2', '1', '1')


# --- !Downs

DELETE FROM `ca_vereador` WHERE `id` = 2;

DELETE FROM `ca_administrador` WHERE `id` = 1;

DELETE FROM `ca_usuario` WHERE `id` = 1 OR `id` = 2;

DELETE FROM `ca_cidade` WHERE `id` == 1;