package models;

import play.db.jpa.GenericModel;
import play.db.jpa.Model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by gudominguete on 24/11/16.
 */


@Entity(name="ca_cidade")
@Table(name="ca_cidade")
public class Cidade extends GenericModel implements Serializable{

    @Id
    @GeneratedValue
    public int id;

    @Column(name = "nome")
    public String nome;


    @ManyToOne(targetEntity=Estado.class, fetch=FetchType.LAZY, optional=false)
    public Estado estado;

}
