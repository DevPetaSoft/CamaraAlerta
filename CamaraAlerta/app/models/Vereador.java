package models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by gudominguete on 24/11/16.
 */

@Entity(name="ca_vereador")
@Table(name="ca_vereador")
public class Vereador extends User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(nullable=false)
    public Date dataCadastro;

    @Column(nullable=false)
    public int nivalDeAcesso = 0;

    @Column(nullable=false)
    public boolean emDia=true;

    @ManyToOne(targetEntity=Cidade.class, fetch= FetchType.EAGER, optional=false)
    public Cidade cidade;

    @Column(nullable=true, length=14)
    public String cpf;

    @ManyToOne(targetEntity=Administrador.class, fetch=FetchType.EAGER, optional=false)
    public Administrador criadoPor;

    @Column(nullable=false)
    public boolean deleted = false;

    @Column(nullable=true, length=14)
    public String telefone;

}
