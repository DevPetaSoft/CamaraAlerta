package dto;

/**
 * Created by gudominguete on 14/01/17.
 */
public class NumerosSolicitacoesDTO {

    private int numeroSolicitacoes;

    private int numeroSolicitacoesResolvidas;

    private int numeroSolicitacoesNaoResolvidas;

    private int numeroSolicitacoesEmAndamento;

    private int nuemroSolicitacoesPendentes;

    public int getNumeroSolicitacoesResolvidas() {
        return numeroSolicitacoesResolvidas;
    }

    public void setNumeroSolicitacoesResolvidas(int numeroSolicitacoesResolvidas) {
        this.numeroSolicitacoesResolvidas = numeroSolicitacoesResolvidas;
    }

    public int getNuemroSolicitacoesPendentes() {
        return nuemroSolicitacoesPendentes;
    }

    public void setNuemroSolicitacoesPendentes(int nuemroSolicitacoesPendentes) {
        this.nuemroSolicitacoesPendentes = nuemroSolicitacoesPendentes;
    }


    public int getNumeroSolicitacoesEmAndamento() {
        return numeroSolicitacoesEmAndamento;
    }

    public void setNumeroSolicitacoesEmAndamento(int numeroSolicitacoesEmAndamento) {
        this.numeroSolicitacoesEmAndamento = numeroSolicitacoesEmAndamento;
    }

    public int getNumeroSolicitacoesNaoResolvidas() {
        return numeroSolicitacoesNaoResolvidas;
    }

    public void setNumeroSolicitacoesNaoResolvidas(int numeroSolicitacoesNaoResolvidas) {
        this.numeroSolicitacoesNaoResolvidas = numeroSolicitacoesNaoResolvidas;
    }
    public int getNumeroSolicitacoes() {
        return numeroSolicitacoes;
    }

    public void setNumeroSolicitacoes(int numeroSolicitacoes) {
        this.numeroSolicitacoes = numeroSolicitacoes;
    }
}
