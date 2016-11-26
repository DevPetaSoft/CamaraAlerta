package controllers;

import models.Cidadao;
import play.Logger;
import play.mvc.Controller;

import java.util.Date;

/**
 * Created by gudominguete on 24/11/16.
 */
public class UserController extends Controller {

    public void facebookLogin(String token, String nome, String email){
        Logger.info("Realizando login por facebook");
        Logger.info("Token: "+token);
        Logger.info("Nome: "+nome);
        Logger.info("Email: "+email);
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
}
