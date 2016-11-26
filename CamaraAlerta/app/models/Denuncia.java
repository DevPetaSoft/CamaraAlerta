package models;

import play.db.jpa.GenericModel;
import play.db.jpa.Model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

/**
 * Created by gudominguete on 24/11/16.
 */

@Entity(name="ca_denuncia")
@Table(name="ca_denuncia")
public class Denuncia extends GenericModel implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue
    public int id;

    @Column(nullable=false,unique=false, length=4000)
    public String descricao;

    @Column(nullable=false,unique=false)
    public Date data;

    @Column(nullable=false,unique=false)
    public boolean anonima;

    @Column(nullable=false,unique=false, length=4000)
    public String mensagem;

    @Column(nullable=false,unique=false)
    public ArrayList<String> fotos;

    @ManyToOne(targetEntity=Coordenadas.class, fetch=FetchType.EAGER, optional=false)
    public Coordenadas coordenadas;

    @Column(nullable=false,unique=false)
    public int status;

    @Column(nullable=false,unique=false)
    public boolean comunicacaoPermitida;

    @Column(nullable=false,unique=false, length=4000)
    public String relatorio;

    @ManyToOne(targetEntity=Cidadao.class, fetch=FetchType.EAGER, optional=false)
    public Cidadao cidadao;

    @ManyToOne(targetEntity=Vereador.class, fetch=FetchType.EAGER, optional=false)
    public Vereador vereador;

    @Column(nullable=false,unique=false)
    public boolean deleted;
}
