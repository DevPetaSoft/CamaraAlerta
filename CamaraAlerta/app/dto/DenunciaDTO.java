package dto;

import models.Denuncia;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Lucas on 12/14/2016.
 */

public class DenunciaDTO implements Serializable{

    private Denuncia denuncia;
    private List<String> listaFotos = new ArrayList<String>();

    public DenunciaDTO(Denuncia denuncia, ArrayList<String> listaFotos){
        this.denuncia = denuncia;
        this.listaFotos = listaFotos;
    }

    public Denuncia getDenuncia(){
        return this.denuncia;
    }

    public void setDenuncia(Denuncia denuncia){
        this.denuncia = denuncia;
    }

    public List<String> getListaFotos(){
        return this.listaFotos;
    }

    public void setListaFotos(ArrayList<String> listaFotos){
        this.listaFotos = listaFotos;
    }
}

