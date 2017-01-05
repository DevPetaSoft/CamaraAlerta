package controllers;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dto.MensagensDTO;
import models.CanalDeComunicacao;
import models.Denuncia;
import models.MensagemChat;
import models.Vereador;
import play.Logger;
import play.mvc.Controller;

import java.util.ArrayList;
import java.util.List;

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
            /**
            Mudar o atributo da denuncia que permite comunicação
             */
            denuncia.comunicacaoPermitida = true;
            denuncia.save();
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

    /**
     * Função para listar as mensagens de um canatal pelo id da denuncia
     * @param idDenuncia
     */
    public void listarMensagensCanalPorIdDenuncia(Integer idDenuncia){
        if(idDenuncia == null){
            renderJSON(new String("Não foi passado um id da solicitação"));
        }

        CanalDeComunicacao canal = CanalDeComunicacao.find("byDenuncia_id", idDenuncia).first();
        if(canal == null){
            renderJSON(new String("N"));
        }

        List<MensagemChat> list = MensagemChat.find("byCanal", canal).fetch();

        MensagensDTO dto = new MensagensDTO();

        dto.setList(list);
        dto.setCanal(canal);

        renderJSON(dto);

    }


    /**
     * Função para listar todos os canais de comunicação de um vereador
     * @param idVereador
     */
    public void listCanais(Integer idVereador){

        if(idVereador == null){
            renderJSON(new String("Não foi passado um id como parametro"));
        }

        Vereador vereador = Vereador.findById(idVereador);

        if(vereador == null){
            renderJSON(new String("Não foi possivel encontrar um vereador com esse id"));
        }

        List<CanalDeComunicacao> list = CanalDeComunicacao.find("byVereador", vereador).fetch();

        renderJSON(list);

    }


    /**
     * Função para listar todas as mensagens de um canal de mensagens
     * @param idCanal
     */
    public void listarMensagensCanal(Integer idCanal){

        if(idCanal == null){
            renderJSON(new String("Não foi passado um id do canal de comunicação"));
        }

        CanalDeComunicacao canal = CanalDeComunicacao.findById(idCanal);

        if(canal == null){
            renderJSON(new String("N"));
        }

        List<MensagemChat> list = MensagemChat.find("byCanal", canal).fetch();

        MensagensDTO dto = new MensagensDTO();

        dto.setList(list);
        dto.setCanal(canal);

        renderJSON(dto);
    }


    /**
     * Função para adicionar uma nova mensagem no canal de comunicação de uma denuncia
     * @param body
     */
    public void novaMensagemVereador(String body){

        JsonParser parser = new JsonParser();
        JsonObject json =(JsonObject) parser.parse(body);

        String mensagem = json.get("mensagem").getAsString();

        if(mensagem == null){
            renderJSON(new String("Não foi passada uma mensagem como parametro"));
        }

        Integer canalId = json.get("canalId").getAsInt();

        if(mensagem == null){
            renderJSON(new String("Não foi passado um id do canal de comunicação"));
        }

        CanalDeComunicacao canal = CanalDeComunicacao.findById(canalId);

        if(canal == null){
            renderJSON(new String("Não foi possivel encontrar um canal de comunicação"));
        }

        MensagemChat mensagemChat = new MensagemChat();
        mensagemChat.mensagem = mensagem;
        mensagemChat.enviadoPor = 0;
        mensagemChat.novo = true;
        mensagemChat.ordem = (int) MensagemChat.count("canal = ?", canal);
        mensagemChat.canal = canal;

        mensagemChat.save();

        MensagensDTO dto = new MensagensDTO();
        dto.setCanal(canal);
        dto.setList(MensagemChat.find("byCanal",canal).<MensagemChat>fetch());

        renderJSON(dto);

    }

    /**
     * Função para adicionar uma nova mensagem vinda de cidadão no canal de comunicação de uma denuncia
     * @param mensagem
     * @param canal
     */
    public void novaMensagemCidadao(String mensagem, String canal){
        if(mensagem == null){
            renderJSON(new String("Não foi passada uma mensagem como parametro"));
        }
        if(canal == null){
            renderJSON(new String("Não foi passado um id do canal de comunicação"));
        }
        Integer intCanal = Integer.parseInt(canal);
        CanalDeComunicacao canalCom = CanalDeComunicacao.findById(intCanal);

        if(canalCom == null){
            renderJSON(new String("Não foi possivel encontrar um canal de comunicação"));
        }

        MensagemChat mensagemChat = new MensagemChat();
        mensagemChat.mensagem = mensagem;
        mensagemChat.enviadoPor = 1;
        mensagemChat.novo = true;
        mensagemChat.ordem = (int) MensagemChat.count("canal = ?", canalCom);
        mensagemChat.canal = canalCom;

        mensagemChat.save();

        //enviar todas mensagens de volta??

        renderJSON(new String("S"));
    }
}
