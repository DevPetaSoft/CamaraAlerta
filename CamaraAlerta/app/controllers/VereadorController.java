package controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dto.NumerosMenuDTO;
import models.Denuncia;
import models.MensagemChat;
import models.Vereador;
import play.Logger;
import play.mvc.Controller;

import java.util.ArrayList;
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
        Logger.info("Listagens dos numeros de solicitacoes e mensagens novas");

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
        dto.setNumerosDeMensagensNovas((int) MensagemChat.count("denuncia.vereador = ?1 AND novo = ?2",vereador,true));
        renderJSON(dto);
    }
}
