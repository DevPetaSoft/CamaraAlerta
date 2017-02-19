package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.Cidade;
import play.Logger;
import play.mvc.Controller;
import utils.HibernateProxyTypeAdapter;

import java.util.List;

/**
 * Created by gudominguete on 18/02/17.
 */
public class CidadeController extends Controller {

    public static void cadastroCidade(String body){

        Gson gson = new Gson();
        Cidade cidade = gson.fromJson(body, Cidade.class);

        if(cidade == null){
            renderJSON(new String("Não foi possível salvar a cidade"));
        }

        cidade.save();

        renderJSON(cidade);

    }

    public static void listAll(){

        Logger.info("Listando todas cidades");

        List<Cidade> cidades = Cidade.findAll();

        GsonBuilder builder = new GsonBuilder();

        builder.registerTypeAdapterFactory(HibernateProxyTypeAdapter.FACTORY);

        Gson gson = builder.create();


        renderJSON(gson.toJson(cidades));

    }
}
