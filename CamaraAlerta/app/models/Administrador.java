package models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Created by gudominguete on 24/11/16.
 */

@Entity(name="ca_administrador")
@Table(name="ca_administrador")
public class Administrador extends User implements Serializable {

    private static final long serialVersionUID = 1L;


    @Column(nullable=false)
    public int nivalDeAcesso = 0;

    @Column(nullable=false)
    public boolean deleted = false;


}
