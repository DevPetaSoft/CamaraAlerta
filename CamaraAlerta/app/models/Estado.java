package models;

import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by gudominguete on 18/02/17.
 */

@Entity(name="ca_estado")
@Table(name="ca_estado")
public class Estado extends GenericModel implements Serializable {
    @Id
    @GeneratedValue
    public int id;

    @Column(name = "nome")
    public String nome;
}
