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
    public void novaDenuncia(String dDTOString){

        Gson gson = new Gson();
        DenunciaDTO dDTO = gson.fromJson(dDTOString, DenunciaDTO.class);
        ArrayList<String> listaDeFotos = (ArrayList<String>) dDTO.getListaFotos();
        ArrayList<String> photoPaths = new ArrayList<String>();

        Denuncia dAnterior = Denuncia.find("order by id desc").first();
        int lastId;
        if(dAnterior!=null) {
            lastId = dAnterior.id;
        } else {
            lastId = 0;
        }

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

        Denuncia d = dDTO.getDenuncia();
        d.mensagem = "";
        d.relatorio = "";
        d.data = new Date();
        Logger.info("Paths" + d.fotos);
        //d.vereador = vereador;
        //d.coordenadas = c;

        //Salvando coordenadas no banco
        Coordenadas c = d.coordenadas;
        c.save();

        //salvando fotos
        for(int i = 0; i<listaDeFotos.size(); i++){
            byte[] decoded = org.apache.commons.codec.binary.Base64.decodeBase64(listaDeFotos.get(i).getBytes());
            try {
                InputStream in2 = new ByteArrayInputStream(decoded);
                BufferedImage bImageFromConvert = ImageIO.read(in2);
                ImageIO.write(bImageFromConvert, "png", new File(Play.applicationPath+"/public/denounce_image/" + (lastId+1) + "_" + i + ".png"));
                photoPaths.add("public/denounce_image/" + (lastId+1) + "_" + i + ".png");
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        d.fotosServidor = photoPaths;
        d.save();

        Logger.info("Sucesso incluindo denuncia!");
        renderJSON(d);
    }

    public void minhasDenuncias(String idUsuario){
        ArrayList<Denuncia> denunciasUsuario = (ArrayList) Denuncia.find("byCidadao_id", idUsuario).fetch();
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
    public void findSolicitacaoUsuario(String idCidadao, String idSolicitacao){
        Integer idCidadaoInt = Integer.parseInt(idCidadao);
        Integer idSolicitacaoInt = Integer.parseInt(idSolicitacao);

        if(idCidadaoInt == null){
            renderJSON(new String("Não foi passado um cidadão como parametro"));
        }

        if(idSolicitacaoInt == null){
            renderJSON(new String("Não foi passado um id de solicitacao como parametro"));
        }

        Cidadao cidadao = Cidadao.findById(idCidadaoInt);

        if(cidadao == null){
            renderJSON(new String("Não foi possivel encontrar um cidadao com o id passado"));
        }

        Denuncia solicitacao = Denuncia.findById(idSolicitacaoInt);

        if(solicitacao == null){
            renderJSON(new String("Não foi possivel encontrar uma solicitação com o id passado"));
        }

        if(solicitacao.cidadao.id == cidadao.id){
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

        if(solicitacao.vereador.id == vereador.id){
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

        Denuncia solicitacao = Denuncia.findById(solicitacaoId);

        if(solicitacao == null){
            renderJSON(new String("Não foi encotnrado nenhuma solicitacao com esse id"));
        }

        solicitacao.relatorio = relatorio;
        solicitacao.status = status;

        solicitacao.save();

        renderJSON(solicitacao);

    }
}
