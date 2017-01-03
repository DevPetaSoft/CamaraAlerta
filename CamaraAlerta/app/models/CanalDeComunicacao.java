package models;

import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Classe do canal de comunicação entre o vereador e o cidadão
 * Created by gudominguete on 02/01/17.
 */

@Entity(name="ca_canal_comunicacao")
@Table(name="ca_canal_comunicacao")
public class CanalDeComunicacao extends GenericModel implements Serializable {

    @Id
    @GeneratedValue
    public int id;

    @ManyToOne(targetEntity=Denuncia.class, fetch=FetchType.EAGER, optional=false)
    public Denuncia denuncia;

    @ManyToOne(targetEntity=Cidadao.class, fetch=FetchType.EAGER, optional=false)
    public Cidadao cidadao;

    @ManyToOne(targetEntity=Vereador.class, fetch=FetchType.EAGER, optional=false)
    public Vereador vereador;

    @Transient
    public List<MensagemChat> mensagens;


}
