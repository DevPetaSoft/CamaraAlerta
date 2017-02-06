package dto;

import models.CanalDeComunicacao;
import models.MensagemChat;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by gudominguete on 02/01/17.
 */
public class MensagensDTO implements Serializable{

    private List<MensagemChat> list;
    private CanalDeComunicacao canal;
    private Integer numeroMensagensNaoLidasVereador;
    private Integer numeroMensagensNaoLidasCidadao;


    public MensagensDTO() {
        this.list = new ArrayList<MensagemChat>();
    }

    public Integer getNumeroMensagensNaoLidasVereador() {
        return numeroMensagensNaoLidasVereador;
    }

    public void setNumeroMensagensNaoLidasVereador(Integer numeroMensagensNaoLidasVereador) {
        this.numeroMensagensNaoLidasVereador = numeroMensagensNaoLidasVereador;
    }

    public Integer getnumeroMensagensNaoLidasCidadao() {
        return numeroMensagensNaoLidasCidadao;
    }

    public void setnumeroMensagensNaoLidasCidadao(Integer numeroMensagensNaoLidasCidadao) {
        this.numeroMensagensNaoLidasCidadao = numeroMensagensNaoLidasCidadao;
    }

    public List<MensagemChat> getList() {
        return list;
    }

    public void setList(List<MensagemChat> list) {
        this.list = list;
    }

    public CanalDeComunicacao getCanal() {
        return canal;
    }

    public void setCanal(CanalDeComunicacao canal) {
        this.canal = canal;
    }
}
