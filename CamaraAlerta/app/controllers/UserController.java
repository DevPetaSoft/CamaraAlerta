package controllers;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dto.FacebookDTO;
import models.Cidadao;
import models.Denuncia;
import models.User;
import play.Logger;
import play.Play;
import play.mvc.Controller;
import utils.EmailUtils;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Date;




/**
 * Created by gudominguete on 24/11/16.
 */
public class UserController extends Controller {

    /*
     *  Requisição get para realizar o login via facebook,
     *  Se encontrar um usuário pelo token, ele retorna o usuário,
     *  caso ao contrário, é enviada uma flag para realizar um novo cadastro.
     */
    public void facebookLogin(String token, String nome, String email){

        // TODO: Verificar se ja existe um cidadao com o email utilizado
        Cidadao cidadao = Cidadao.find("byTokenFacebook",token).first();
        if(cidadao == null){
            cidadao = new Cidadao();
            cidadao.tokenFacebook = token;
            cidadao.nome = nome;
            cidadao.email = email;
            cidadao.dataCriacao = new Date();
            cidadao.save();
            FacebookDTO dto = new FacebookDTO(cidadao,true);
            renderJSON(dto);
        }else{

            FacebookDTO dto = new FacebookDTO(cidadao,false);
            renderJSON(dto);
        }
    }

    public void facebookJaLogado(String email){
        Cidadao cidadao = Cidadao.find("byEmail", email).first();
        if(cidadao == null){
            renderJSON(new String("Login com Facebook falhou!"));
        } else {
            renderJSON(cidadao);
        }
    }

    // Cria um novo cadastro de um cidadao contendo nome, login, email e senha
    public void novoCadastroCidadao(String nome, String email, String senha, String telefone){
        try{
            Logger.info("Tentando criar um novo cidadao");
            Cidadao cidadao = Cidadao.find("byEmail", email).first();
            if(cidadao==null){

                cidadao = new Cidadao();
                cidadao.nome = nome;
                cidadao.telefone = telefone;
                cidadao.email = email;
                cidadao.senha = senha;
                cidadao.dataCriacao = new Date();
                cidadao.save();
                renderJSON(cidadao);

            }else{
                renderJSON(new String("E-mail já cadastrado no sistema!"));
            }
        }
	    catch(Throwable ex){
            renderJSON(new String("E-mail já cadastrado no sistema!"));
		}
    }

    // Realiza a o login de um cidadao
    public void cidadaoLogin(String login, String senha){
        Logger.info(login);
        Logger.info(senha);
        Cidadao cidadao;
        cidadao = Cidadao.find("byEmailAndSenha",login,senha).first();
        if(cidadao == null){
            renderJSON(new String("Usuário não encontrado, verifique seu e-mail e senha!"));
        }else{
            renderJSON(cidadao);
        }
    }

    public void numeroDenuncias(int idUsuario){
        long count = Denuncia.count("cidadao_id = ? AND valida = true", idUsuario);
        int codResolvido = 2;
        long countResolvidas = Denuncia.count("cidadao_id = ? and status = ? AND valida = true", idUsuario, codResolvido);
        String message = "Numero de denuncias = " + count;
        Logger.info(message);
        int[] contador = {(int)count, (int)countResolvidas};
        renderJSON(contador);
    }

    public void recuperarSenha(String email){
        Logger.info("Tentando enviar email de recuperação de senha");
        Cidadao cidadao = Cidadao.find("byEmail", email).first();
        if(cidadao!=null) {
            renderJSON(new String("Email de recuperação enviado!"));
        } else {
            renderJSON(new String("Email não cadastrado no sistema!"));
        }
    }

    public void cadastrarSenhaFacebook(String id, String telefone){


        if(id == null){

            renderJSON(new String("É necessário passar um id"));
        }

        if(telefone == null){
            renderJSON(new String("É necessário passar um telefone"));
        }

        Integer idt =Integer.parseInt(id);

        if(idt == null){

            renderJSON(new String("É necessário passar um id válido"));
        }

        Cidadao cidadao = Cidadao.findById(idt);

        if(cidadao == null){
            renderJSON(new String("Não foi possível encontrar o cidadao com esse email"));
        }

        cidadao.telefone = telefone;

        cidadao.save();

        renderJSON(cidadao);
    }

    /**
     * Função para realizar a troca de senha de um usuário
     * @param body
     */
    public void trocarSenha(String body){

        Logger.info("Trocando senha");

        JsonParser parser = new JsonParser();
        JsonObject json =(JsonObject) parser.parse(body);


        String email = json.get("email").getAsString();

        if(email == null){
            renderJSON(new String("Não foi passado um e-mail!"));
        }

        User usuario = User.find("byEmail", email).first();

        if(usuario == null){
            renderJSON(new String("Não foi possível encontrar o usuário com o e-mail informado!"));
        }

        String token = json.get("token").getAsString();

        if(token == null){
            renderJSON(new String("Não foi passado um token!"));
        }

        if(!token.equals(usuario.resetPasswordTocken)){
            renderJSON(new String("O token passado não confere com o enviado por e-mail"));
        }


        String password = json.get("password").getAsString();

        if(password == null){
            renderJSON(new String("Não foi passado uma senha!"));
        }

        usuario.senha = password;
        usuario.resetPasswordTocken = null;

        usuario.save();

        renderJSON(new String("Ok"));

    }

    /**
     *
     * @param email
     */
    public void esqueceuSenha(String email){
        Logger.info("Gerar token");

       
        if(email == null){
            renderJSON(new String("Não foi passado nenhum e-mail"));
        }


        Cidadao cidadao = Cidadao.find("byEmail",email).first();

        if(cidadao == null){

            renderJSON(new String("Não foi encontrado nenhuma conta com esse e-mail"));
        }


        SecureRandom random = new SecureRandom();

        String codigoCadastro = new BigInteger(130, random).toString(32);


        cidadao.resetPasswordTocken = codigoCadastro;

        cidadao.save();

        String subject = "Câmara Alerta - E-mail de recuperação de senha";

        String corpoDoEmail = "Olá, para realizar a recuperação de senha, basta clicar no link:\n"+
                Play.configuration.getProperty("application.url")+
                "changePassword \ne digitar o código: " + codigoCadastro +
                "\n com a nova senha. \n Equipe Venit agradece a sua experiência com o Câmara Alerta!";

        EmailUtils.enviarEmail(email,subject,corpoDoEmail);


        renderJSON(new String("Ok"));
    }
}
