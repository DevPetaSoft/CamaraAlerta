package models;

import play.db.jpa.GenericModel;
import play.db.jpa.Model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by gudominguete on 24/11/16.
 */

@Entity(name="ca_usuario")
@Table(name="ca_usuario")
@Inheritance(strategy= InheritanceType.JOINED)
public class User extends GenericModel implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue
    public int id;

    @Column(nullable=false,unique=false,length=50)
    public String nome;

    @Column(nullable=true,unique=true,length=50)
    public String login;

    @Column(nullable=true,unique=false,length=16)
    public String senha;

    @Column(nullable=false,unique=true,length=50)
    public String email;

    @Column(nullable=true, length=255)
    public String tokenFacebook;

    @Column(nullable=true, length=255)
    public String tokenGPlus;
}
