package models;

import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by gudominguete on 18/02/17.
 */
@Entity(name="ca_historico_relatorio")
@Table(name="ca_historico_relatorio")
public class HistoricoRelatorio extends GenericModel implements Serializable{

    @Id
    @GeneratedValue
    public int id;

    @Column(name="relatorio")
    public String relatorio;

    @Column(name="status")
    public Integer status;


    @ManyToOne(targetEntity=Denuncia.class, fetch= FetchType.LAZY, optional=false)
    public Denuncia denuncia;

}
