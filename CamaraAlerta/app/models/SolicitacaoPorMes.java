package models;

import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by gudominguete on 14/01/17.
 */

@Entity(name="ca_solicitacao_por_mes")
@Table(name="ca_solicitacao_por_mes")
public class SolicitacaoPorMes extends GenericModel implements Serializable {

    @Id
    @GeneratedValue
    public Integer id;

    @Column(nullable=false,unique=false)
    public Integer numeroDeSolicitacoesRecebidas;

    @Column(nullable=false,unique=false)
    public Integer numeroDeSolicitacoesResolvidas;

    @Column(nullable=false,unique=false)
    public Integer mes;

    @Column(nullable=false,unique=false)
    public Integer ano;

    @Column(nullable=false,unique=false)
    public Date data;

    @ManyToOne(targetEntity=Vereador.class, fetch=FetchType.EAGER, optional=false)
    public Vereador vereador;

}
