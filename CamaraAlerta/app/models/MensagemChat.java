package models;

import play.db.jpa.GenericModel;
import play.db.jpa.Model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by gudominguete on 24/11/16.
 */

@Entity(name="ca_mensagem_chat")
@Table(name="ca_mensagem_chat")
public class MensagemChat extends GenericModel implements Serializable {
    @Id
    @GeneratedValue
    public int id;

    @Column(nullable=false,unique=false, length=4000)
    public String mensagem;

    @Column(nullable=false,unique=false)
    public int enviadoPor;

    @Column(nullable=false,unique=false)
    public int ordem;

    @Column(nullable=false, unique=false)
    public boolean novo;

    @ManyToOne(targetEntity=Denuncia.class, fetch=FetchType.EAGER, optional=false)
    public Denuncia denuncia;
}
