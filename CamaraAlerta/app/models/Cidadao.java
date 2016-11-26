package models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by gudominguete on 24/11/16.
 */

@Entity(name="ca_cidadao")
@Table(name="ca_cidadao")
public class Cidadao extends User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(nullable=true)
    public Date dataNascimento;

    @Column(nullable=true, length=1)
    public String genero;

    @Column(nullable=false)
    public Date dataCriacao;

    @ManyToOne(targetEntity=Cidade.class, fetch= FetchType.EAGER, optional=true)
    public Cidade cidade;


    @Column(nullable=true, length=14)
    public String cpf;

    @Column(nullable=true, length=50)
    public String endereco;

    @Column(nullable=true, length=15)
    public String telefone;

    @Column(nullable=true)
    public boolean deleted;
}
