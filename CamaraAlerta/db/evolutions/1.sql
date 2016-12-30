# Update Denuncia

# --- !Ups
ALTER TABLE ca_denuncia MODIFY fotos BLOB

ALTER TABLE ca_denuncia MODIFY fotosServidor BLOB

# --- !Downs

ALTER TABLE ca_denuncia MODIFY fotos TINYBLOB

ALTER TABLE ca_denuncia MODIFY fotosServidor TINYBLOB