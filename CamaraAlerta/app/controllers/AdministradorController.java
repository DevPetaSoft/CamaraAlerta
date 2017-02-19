package controllers;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import models.Administrador;
import play.Logger;
import play.mvc.Controller;

/**
 * Created by gudominguete on 18/02/17.
 */
public class AdministradorController extends Controller {

    public static void adminsitradorLogin(String body){
        Logger.info("Tentativa de login de adminsitrador");
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

        Administrador administrador = Administrador.find("byEmailAndSenha", email, senha).first();

        if(administrador == null){
            renderJSON(new String("E-mail ou senha incorretas!"));
        }
        renderJSON(administrador);
    }
}
