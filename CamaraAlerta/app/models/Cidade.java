package models;

import play.db.jpa.GenericModel;
import play.db.jpa.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
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

    public String nome;

    public String estado;

}
