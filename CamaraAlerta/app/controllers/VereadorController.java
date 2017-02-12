package controllers;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dto.NumerosMenuDTO;
import dto.NumerosSolicitacoesDTO;
import models.Denuncia;
import models.SolicitacaoPorMes;
import models.Vereador;
import play.Logger;
import play.Play;
import play.mvc.Controller;
import utils.EmailUtils;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;

import java.util.Properties;
import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

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


        List<Denuncia> list = Denuncia.find("vereador = ? AND valida = true order by data desc", vereador).fetch();

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

        List<Denuncia> list = Denuncia.find("byVereadorAndNovoAndValida", vereador,true,true).fetch();

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
        dto.setNumerosDeSolicitacoesNovas((int) Denuncia.count("vereador = ? AND novo = ? AND valida = true", vereador, true));

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

        dto.setNumeroSolicitacoes((int) Denuncia.count("vereador = ? AND valida = ?", vereador, true));
        dto.setNumeroSolicitacoesResolvidas((int) Denuncia.count("vereador = ? AND status = ? AND valida = true", vereador, 2));
        dto.setNuemroSolicitacoesPendentes((int) Denuncia.count("vereador = ? AND status = ? AND valida = true", vereador, 0));

        renderJSON(dto);
    }

    public void listSolicitacoesPorMesList(Integer vereadorId) {
        if (vereadorId == null) {
            renderJSON(new String("Não foi passado um id de um vereador"));
        }

        Vereador vereador = Vereador.findById(vereadorId);

        if (vereador == null) {
            renderJSON(new String("Não foi encontrado esse vereador"));
        }

        // TODO: Implementar serializer

        List<SolicitacaoPorMes> list = SolicitacaoPorMes.find("byVereador", vereador).fetch(0, 12);

        renderJSON(list);
    }


    public void gerarChaveDeRecuperarSenha(String body){


        Logger.info("Gerar token");
        JsonParser parser = new JsonParser();
        JsonObject json =(JsonObject) parser.parse(body);


        String email = json.get("email").getAsString();

        Logger.info(email);

        if(email == null){
            renderJSON(new String("Não foi passado nenhum e-mail"));
        }


        Vereador vereador = Vereador.find("byEmail",email).first();

        if(vereador == null){

            renderJSON(new String("Não foi encontrado nenhuma conta com esse e-mail"));
        }


        SecureRandom random = new SecureRandom();

        String codigoCadastro = new BigInteger(130, random).toString(32);


        vereador.resetPasswordTocken = codigoCadastro;

        vereador.save();

        String subject = "Câmara Alerta - E-mail de recuperação de senha";

        String corpoDoEmail = "Olá, para realizar a recuperação de senha, basta clicar no link:\n"+
                                Play.configuration.getProperty("application.url")+
                                "changePassword \ne digitar o código: " + codigoCadastro +
                                "\n com a nova senha. \n Equipe Venit agradece a sua experiência com o Câmara Alerta!";

        EmailUtils.enviarEmail(email,subject,corpoDoEmail);


        renderJSON(new String("Ok"));
    }

}
