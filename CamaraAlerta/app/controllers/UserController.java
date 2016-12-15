package controllers;

import models.Cidadao;
import models.Denuncia;
import play.Logger;
import play.mvc.Controller;

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
        Cidadao cidadao = Cidadao.find("byTokenFacebook",token).first();
        if(cidadao == null){
            cidadao = new Cidadao();
            cidadao.tokenFacebook = token;
            cidadao.nome = nome;
            cidadao.email = email;
            cidadao.dataCriacao = new Date();
            cidadao.save();
            Logger.info(cidadao.nome);
            renderJSON(cidadao);
        }else{
            renderJSON(cidadao);
        }
    }

    // Cria um novo cadastro de um cidadao contendo nome, login, email e senha
    public void novoCadastroCidadao(String nome, String email, String senha){
        try{
            Logger.info("Tentando criar um novo cidadao");
            Cidadao cidadao = Cidadao.find("byEmail", email).first();
            if(cidadao==null){
                //cidadao = Cidadao.find("byLogin",login).first();
                if(cidadao==null){
                    cidadao = new Cidadao();
                    cidadao.nome = nome;
                    //cidadao.login = login;
                    cidadao.email = email;
                    cidadao.senha = senha;
                    cidadao.dataCriacao = new Date();
                    cidadao.save();
                    renderJSON(cidadao);
                }else{
                    //renderJSON(new String("Login já cadastrado no sistema !"));
                }
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
        Cidadao cidadao;
        cidadao = Cidadao.find("byEmailAndSenha",login,senha).first();
        if(cidadao == null){
            renderJSON(new String("Usuário não encontrado, verifique seu e-mail e senha!"));
        }else{
            renderJSON(cidadao);
        }
    }

    public void numeroDenuncias(String idUsuario){
        long count = Denuncia.count("byCidadao_id", idUsuario);
        String message = "Numero de denuncias = " + count;
        Logger.info(message);
        renderJSON(""+count);
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
}
