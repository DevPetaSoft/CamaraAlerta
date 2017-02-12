package controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dto.DenunciaDTO;
import dto.MinhasDenunciasDTO;
import models.*;
import play.Logger;
import play.Play;
import play.mvc.Controller;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;


/**
 * Created by Lucas on 12/14/2016.
 */
public class DenunciaController extends Controller {

    //Cria uma nova denuncia e salva fotos da denuncia no servidor
    public void novaDenuncia(String denunciaString){

        Gson gson = new Gson();
        Denuncia d = gson.fromJson(denunciaString, Denuncia.class);
        ArrayList<String> photoPaths = new ArrayList<String>();

        //Adm
        /*Administrador a = Administrador.find("byEmail", "adm@email.com").first();
        if(a==null) {
            a = new Administrador();
            a.email = "adm@email.com";
            a.nome = "Adm";
            a.save();
        }*/

        Cidade cidade = Cidade.find("byNome", "Lavras").first();
        if(cidade==null) {
            cidade.estado = "MG";
            cidade.nome = "Lavras";
            cidade.save();
        }
        /*
        Vereador vereador = Vereador.find("byEmail", "vereador1@email.com").first();
        if(vereador==null) {
            vereador.cidade=cidade;
            vereador.nome = "Vereador 1";
            vereador.dataCadastro = new Date();
            vereador.email = "vereador1@email.com";
            vereador.criadoPor = a;
            vereador.save();
        }*/

        d.mensagem = "";
        d.relatorio = "";
        d.data = new Date();
        Logger.info("Paths" + d.fotos);
        //d.vereador = vereador;
        //d.coordenadas = c;

        //Salvando coordenadas no banco
        Coordenadas c = d.coordenadas;
        c.save();
        d.fotosServidor = new ArrayList<String>();
        d.save();



        Logger.info("Sucesso incluindo denuncia!");
        renderJSON(d.id);
    }

    /**
     * Recebimento de foto individual da aplicação
     * @param foto
     * @param idSolicitacao
     */
    public void envioFoto(String foto, String idSolicitacao){
        Integer idSolicitacaoInt = Integer.parseInt(idSolicitacao);
        Denuncia dAtual = Denuncia.findById(idSolicitacaoInt);
        ArrayList<String> photoPaths = dAtual.fotosServidor;
        byte[] decoded = org.apache.commons.codec.binary.Base64.decodeBase64(foto.getBytes());
        try {
            InputStream in2 = new ByteArrayInputStream(decoded);
            BufferedImage bImageFromConvert = ImageIO.read(in2);
            ImageIO.write(bImageFromConvert, "png", new File(Play.applicationPath+"/public/denounce_image/" + (dAtual.id) + "_" + (dAtual.numeroFotosAtual) + ".png"));
            photoPaths.add("public/denounce_image/" + (dAtual.id) + "_" + (dAtual.numeroFotosAtual) + ".png");
            dAtual.fotosServidor = photoPaths;
            if(dAtual.numeroFotosAtual + 1 == dAtual.numeroFotos){
                dAtual.valida = true;
                SolicitacaoPorMes solicitacaoPorMes = SolicitacaoPorMes.find("byVereadorAndMesAndAno",dAtual.vereador,dAtual.data.getMonth(), dAtual.data.getYear()).first();

                // Criar uma nova solicitacao por mes
                if(solicitacaoPorMes == null){
                    solicitacaoPorMes = new SolicitacaoPorMes();
                    solicitacaoPorMes.ano = dAtual.data.getYear();
                    solicitacaoPorMes.mes = dAtual.data.getMonth();
                    solicitacaoPorMes.data = new Date();
                    solicitacaoPorMes.vereador = dAtual.vereador;
                    solicitacaoPorMes.numeroDeSolicitacoesRecebidas = 1;
                    solicitacaoPorMes.numeroDeSolicitacoesResolvidas = 0;
                    solicitacaoPorMes.save();
                }
                // Edita a solicitacao daquele mes
                else{
                    solicitacaoPorMes.numeroDeSolicitacoesRecebidas += 1;
                    solicitacaoPorMes.save();

                }
            }
            dAtual.numeroFotosAtual = dAtual.numeroFotosAtual + 1;
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        dAtual.save();
        Logger.info("Sucesso incluindo foto!");
        renderJSON(dAtual.numeroFotosAtual);
    }

    public void minhasDenuncias(Integer idUsuario){
        ArrayList<Denuncia> denunciasUsuario = (ArrayList) Denuncia.find("cidadao_id = ? and valida = true", idUsuario).fetch();
        if(denunciasUsuario == null){
            renderJSON(new String("Usuário não tem denuncias!"));
        } else {
            int count = denunciasUsuario.size();
            MinhasDenunciasDTO minhasDenunciaDTO = new MinhasDenunciasDTO(denunciasUsuario, count);
            renderJSON(minhasDenunciaDTO);
        }
    }

    /**
     * Listagem de uma solicitação por cidadão
     * @param idCidadao
     * @param idSolicitacao
     */
    public void findSolicitacaoUsuario(Integer idCidadao, Integer idSolicitacao){

        if(idCidadao == null){
            renderJSON(new String("Não foi passado um cidadão como parametro"));
        }

        if(idSolicitacao == null){
            renderJSON(new String("Não foi passado um id de solicitacao como parametro"));
        }

        Cidadao cidadao = Cidadao.findById(idCidadao);

        if(cidadao == null){
            renderJSON(new String("Não foi possivel encontrar um cidadao com o id passado"));
        }

        Denuncia solicitacao = Denuncia.findById(idSolicitacao);

        if(solicitacao == null){
            renderJSON(new String("Não foi possivel encontrar uma solicitação com o id passado"));
        }

        if(solicitacao.cidadao.id == cidadao.id && solicitacao.valida == true){
            renderJSON(solicitacao);
        }
    }

    /**
     * Listagem de uma solicitacao
     * @param idVereador
     * @param idSolicitacao
     */
    public void find(Integer idVereador, Integer idSolicitacao){

        if(idVereador == null){
            renderJSON(new String("Não foi passado um vereador como parametro"));
        }

        if(idSolicitacao == null){
            renderJSON(new String("Não foi passado um id de solicitacao como parametro"));
        }

        Vereador vereador = Vereador.findById(idVereador);

        if(vereador == null){
            renderJSON(new String("Não foi possivel encontrar um vereador com o id passado"));
        }

        Denuncia solicitacao = Denuncia.findById(idSolicitacao);

        // Verifica se a solicitacao buscada é nova, caso for ela é marcada como lida
        if(solicitacao.novo == true){
            solicitacao.novo = false;
            solicitacao.save();
        }

        if(solicitacao.vereador.id == vereador.id && solicitacao.valida == true){
            renderJSON(solicitacao);
        }

        renderJSON("Não foi possivel buscar a solicitacao");

    }

    /**
     * Função para mudar o estado de uma solicitação
     * @param body
     */
    public void changeStatus(String body){

        JsonParser parser = new JsonParser();
        JsonObject json =(JsonObject) parser.parse(body);

        String relatorio = json.get("relatorio").getAsString();

        if(relatorio == null){
            renderJSON(new String("Não foi passado nenhuma mensagem de relatorio"));
        }

        Integer status = json.get("status").getAsInt();

        if(status == null){
            renderJSON(new String("Não foi passado nenhum estado da solicitacao"));
        }

        Integer solicitacaoId = json.get("id").getAsInt();

        if(solicitacaoId == null){
            renderJSON(new String("Não foi passado nenhuma solicitacao para ser alterada"));
        }

        Denuncia solicitacao = Denuncia.find("id = ? and valida = true",solicitacaoId).first();

        if(solicitacao == null){
            renderJSON(new String("Não foi encotnrado nenhuma solicitacao com esse id"));
        }
        int statusAntigo = solicitacao.status;

        solicitacao.relatorio = relatorio;
        solicitacao.status = status;

        SolicitacaoPorMes solicitacaoPorMes = SolicitacaoPorMes.find("byVereadorAndMesAndAno",solicitacao.vereador,solicitacao.data.getMonth(), solicitacao.data.getYear()).first();

        if(statusAntigo != 2 && status == 2) {
            solicitacaoPorMes.numeroDeSolicitacoesResolvidas += 1;
        }else if (statusAntigo == 2 && status != 2){
            solicitacaoPorMes.numeroDeSolicitacoesResolvidas -=1;
        }

        solicitacao.save();
        solicitacaoPorMes.save();

        renderJSON(solicitacao);

    }
}
