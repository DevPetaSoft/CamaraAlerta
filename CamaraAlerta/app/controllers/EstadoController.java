package controllers;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import models.Estado;
import play.Logger;
import play.mvc.Controller;

import java.util.List;

/**
 * Created by gudominguete on 18/02/17.
 */
public class EstadoController extends Controller {

    public static void cadastrarEstado(String body){

        Logger.info("Cadastrar estado");
        JsonParser parser = new JsonParser();
        JsonObject json =(JsonObject) parser.parse(body);

        String nome = json.get("nome").getAsString();

        if(nome == null){
            renderJSON("Não foi passado um nome");
        }

        Estado estado = new Estado();
        estado.nome = nome;

        estado.save();
        renderJSON(estado);
    }

    public static void listAll(){
        Logger.info("Listar todos estados");

        List<Estado> estadoList = Estado.findAll();

        renderJSON(estadoList);
    }
}
