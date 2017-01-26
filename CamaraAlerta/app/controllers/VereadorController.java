package controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dto.NumerosMenuDTO;
import dto.NumerosSolicitacoesDTO;
import models.Denuncia;
import models.MensagemChat;
import models.SolicitacaoPorMes;
import models.Vereador;
import play.Logger;
import play.mvc.Controller;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by gudominguete on 28/12/16.
 */
public class VereadorController extends Controller {

    /**
     * Função que realiza login de um vereador e retorna o objeto vereador
     */
    public void login(String body){
        Logger.info("Tentativa de login de vereador");
        JsonParser parser = new JsonParser();
        JsonObject json =(JsonObject) parser.parse(body);

        String email = json.get("email").getAsString();

        if(email.isEmpty() || email.compareTo("null")==0){
            renderJSON(new String("Não foi passado o email"));

        }


        String senha = json.get("senha").getAsString();

        if(senha.isEmpty() || senha.compareTo("null") == 0){
            renderJSON(new String("Não foi passado o email"));
        }


        Vereador vereador =  Vereador.find("byEmailAndSenha",email,senha).first();

        if(vereador == null){
            renderJSON(new String("E-mail ou senha incorretas!"));
        }
        renderJSON(vereador);

    }

    /**
     * Listar vereadores
     * TODO: filtrar por cidades
     */
    public void listVereadoresPorCidade(){
        Logger.info("Obtendo lista de vereadores");
        List<Vereador> list = new ArrayList<Vereador>();
        list = Vereador.findAll();
        if(list.size()>0){
            renderJSON(list);
        }else{
            renderJSON(new String("Não existem vereadores nessa cidade"));
        }
    }

    /**
     * Listar denuncias do vereador
     * @param id
     */
    public void listDenunciasPorVereador(Integer id){
        Logger.info("Listagem de todas as denuncias por vereador");
        if(id == null){
            renderJSON(new String("Não foi passado o vereador para buscar as denuncias"));
        }

        Vereador vereador = Vereador.findById(id);

        if(vereador == null){
            renderJSON(new String("Não exista vereador com o id passado"));
        }


        List<Denuncia> list = Denuncia.find("byVereador", vereador).fetch();

        //TODO: Criar serializer
        renderJSON(list);
    }

    /**
     * Listar denuncias não visualizadas pelo vereador
     * @param id
     */
    public void listNovasDenunciasPorVereador(Integer id){
        Logger.info("Listagem de solicitacoes novas");
        if(id == null){
            renderJSON(new String("Não foi passado o vereador para buscar as denuncias"));
        }

        Vereador vereador = Vereador.findById(id);

        if(vereador == null){
            renderJSON(new String("Não exista vereador com o id passado"));
        }

        List<Denuncia> list = Denuncia.find("byVereadorAndNovo", vereador,true).fetch();

        //TODO: Criar serializer
        renderJSON(list);
    }


    /**
     * Listagem dos numeros de solicitações e mensagens novas
     * @param id
     */
    public void listNumerosMenu(Integer id){

        if(id == null){
            renderJSON(new String("Não foi passado o vereador para buscar as denuncias"));
        }

        Vereador vereador = Vereador.findById(id);

        if(vereador == null){
            renderJSON(new String("Não exista vereador com o id passado"));
        }

        NumerosMenuDTO dto = new NumerosMenuDTO();
        dto.setNumerosDeSolicitacoesNovas((int) Denuncia.count("vereador = ? AND novo = ?", vereador, true));

        //TODO: Arrumar os Warnings vindo dessa linha
        //dto.setNumerosDeMensagensNovas((int) MensagemChat.count("denuncia.vereador = ?1 AND novo = ?2",vereador,true));
        dto.setNumerosDeMensagensNovas(0);
        renderJSON(dto);
    }


    /**
     * Lista o perfil de um vereador
     * @param id
     */
    public void listPerfilVereador(Integer id){

        if(id == null){
            renderJSON("Não foi passado um id para realizar a busca");
        }

        Vereador vereador = Vereador.findById(id);

        if(vereador == null){
            renderJSON("Não foi possivel encontrar um vereador com esse Id");
        }

        renderJSON(vereador);

    }

    /**
     * Função para editar o perfil de um usuário
     * @param body
     */
    public void editProfile(String body){
        Logger.info("Edit profile");
        JsonParser parser = new JsonParser();
        JsonObject json =(JsonObject) parser.parse(body);


        Integer vereadorId = json.get("id").getAsInt();

        if(vereadorId == null){
            renderJSON(new String("Não foi passado um id de vereador"));
        }

        Vereador vereador = Vereador.findById(vereadorId);

        if(vereador == null){
            renderJSON(new String("Não foi possivel encontrar um vereador com esse ID"));
        }

        String telefone = json.get("telefone").getAsString();
        String cpf = json.get("cpf").getAsString();

        vereador.telefone = telefone;
        vereador.cpf = cpf;
        vereador.save();

        renderJSON(vereador);
    }

    public void editConfigurations(String body){
        Logger.info("Edit configurations");
        JsonParser parser = new JsonParser();
        JsonObject json =(JsonObject) parser.parse(body);


        Integer vereadorId = json.get("id").getAsInt();

        if(vereadorId == null){
            renderJSON(new String("Não foi passado um id de vereador"));
        }

        Vereador vereador = Vereador.findById(vereadorId);

        if(vereador == null){
            renderJSON(new String("Não foi possivel encontrar um vereador com esse ID"));
        }

        boolean solicitationNotification = json.get("solicitationNotification").getAsBoolean();
        boolean messageNotification = json.get("messageNotification").getAsBoolean();

        vereador.notificacaoSolicitacao = solicitationNotification;
        vereador.notificacaoMensagem = messageNotification;
        vereador.save();

        renderJSON(vereador);
    }

    /**
     * Listagem do numero de solicitações que o vereador possui, quantas foram resolvidas e quantas estao pendentes
     * @param vereadorId
     */
    public void listNumbersSolicitations(Integer vereadorId){

        if(vereadorId == null){
            renderJSON(new String("Não foi passado um id de um vereador"));
        }

        Vereador vereador = Vereador.findById(vereadorId);

        if(vereador == null){
            renderJSON(new String("Não foi encontrado esse vereador"));
        }

        NumerosSolicitacoesDTO dto = new NumerosSolicitacoesDTO();

        dto.setNumeroSolicitacoes((int) Denuncia.count("vereador = ?", vereador));
        dto.setNumeroSolicitacoesResolvidas((int) Denuncia.count("vereador = ? AND status = ?", vereador, 2));
        dto.setNuemroSolicitacoesPendentes((int) Denuncia.count("vereador = ? AND status = ?", vereador, 0));

        renderJSON(dto);
    }

    public void listSolicitacoesPorMesList(Integer vereadorId){
        if(vereadorId == null){
            renderJSON(new String("Não foi passado um id de um vereador"));
        }

        Vereador vereador = Vereador.findById(vereadorId);

        if(vereador == null){
            renderJSON(new String("Não foi encontrado esse vereador"));
        }

        // TODO: Implementar serializer

        List<SolicitacaoPorMes> list = SolicitacaoPorMes.find("byVereador",vereador).fetch(0,12);

        renderJSON(list);
    }

}
