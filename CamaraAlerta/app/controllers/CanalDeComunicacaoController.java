package controllers;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import models.CanalDeComunicacao;
import models.Denuncia;
import models.MensagemChat;
import models.Vereador;
import play.Logger;
import play.mvc.Controller;

import java.util.ArrayList;

/**
 * Created by gudominguete on 02/01/17.
 */
public class CanalDeComunicacaoController extends Controller {

    /**
     * Cria um canal de comunicacao entre o vereador e o cidadao por alguma solicitacao
     * Caso já existir esse canal, ele somente acrescenta uma mensagem no canal
     * @param body
     */
    public void entrarEmContato(String body){

        JsonParser parser = new JsonParser();
        JsonObject json =(JsonObject) parser.parse(body);

        String mensagem = json.get("mensagem").getAsString();

        if(mensagem == null){
            renderJSON(new String("Não foi passado uma mensagem"));
        }

        Integer vereadorId = json.get("vereadorId").getAsInt();

        if(vereadorId == null){
            renderJSON(new String("Não foi passado um id de vereador"));
        }

        Integer solicitacaoId = json.get("solicitacaoId").getAsInt();

        if(solicitacaoId == null){
            renderJSON(new String("Não foi passado um id de uma solicitação"));
        }

        Vereador vereador = Vereador.findById(vereadorId);

        Denuncia denuncia = Denuncia.findById(solicitacaoId);

        CanalDeComunicacao canal = CanalDeComunicacao.find("byVereadorAndDenuncia",vereador,denuncia).first();

        if(canal == null){
            canal = new CanalDeComunicacao();
            canal.vereador = vereador;
            canal.denuncia = denuncia;
            canal.cidadao = denuncia.cidadao;
            canal.save();

        }


        MensagemChat mensagemChat = new MensagemChat();
        mensagemChat.enviadoPor = 0;
        mensagemChat.canal = canal;
        mensagemChat.ordem = (int) MensagemChat.count("canal = ?", canal);
        mensagemChat.novo = true;
        mensagemChat.mensagem = mensagem;

        mensagemChat.save();

        renderJSON(canal);


    }
}
