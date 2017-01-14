package dto;

/**
 * Created by gudominguete on 14/01/17.
 */
public class NumerosSolicitacoesDTO {

    private int numeroSolicitacoes;

    private int numeroSolicitacoesResolvidas;

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

    public int getNumeroSolicitacoes() {
        return numeroSolicitacoes;
    }

    public void setNumeroSolicitacoes(int numeroSolicitacoes) {
        this.numeroSolicitacoes = numeroSolicitacoes;
    }
}
