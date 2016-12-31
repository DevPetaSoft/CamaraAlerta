package dto;

import java.io.Serializable;

/**
 * Created by gudominguete on 30/12/16.
 */
public class NumerosMenuDTO implements Serializable {

    private Integer numerosDeSolicitacoesNovas;
    private Integer numerosDeMensagensNovas;

    public Integer getNumerosDeSolicitacoesNovas() {
        return numerosDeSolicitacoesNovas;
    }

    public void setNumerosDeSolicitacoesNovas(Integer numerosDeSolicitacoesNovas) {
        this.numerosDeSolicitacoesNovas = numerosDeSolicitacoesNovas;
    }

    public Integer getNumerosDeMensagensNovas() {
        return numerosDeMensagensNovas;
    }

    public void setNumerosDeMensagensNovas(Integer numerosDeMensagensNovas) {
        this.numerosDeMensagensNovas = numerosDeMensagensNovas;
    }
}
