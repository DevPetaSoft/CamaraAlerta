package controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import models.Vereador;
import play.Logger;
import play.mvc.Controller;

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
}
