package models;

import play.db.jpa.GenericModel;
import play.db.jpa.Model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by gudominguete on 24/11/16.
 */

@Entity(name="ca_coordenadas")
@Table(name="ca_coordenadas")
public class Coordenadas extends GenericModel implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue
    public int id;

    @Column(nullable=false,unique=false)
    public double latitude;

    @Column(nullable=false,unique=false)
    public double longitude;
}
