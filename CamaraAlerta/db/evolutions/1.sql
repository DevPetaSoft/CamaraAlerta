# Update Denuncia

# --- !Ups
ALTER TABLE `ca_denuncia` CHANGE `fotos` `fotos` BLOB NOT NULL;

ALTER TABLE `ca_denuncia` CHANGE `fotosServidor` `fotosServidor` BLOB NOT NULL;

# --- !Downs

ALTER TABLE `ca_denuncia` CHANGE `fotos` `fotos` TINYBLOB NOT NULL;

ALTER TABLE `ca_denuncia` CHANGE `fotosServidor` `fotosServidor` TINYBLOB NOT NULL;
