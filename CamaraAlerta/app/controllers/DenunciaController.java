package controllers;

import com.google.gson.Gson;
import dto.DenunciaDTO;
import dto.MinhasDenunciasDTO;
import models.*;
import play.Logger;
import play.Play;
import play.mvc.Controller;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;


/**
 * Created by Lucas on 12/14/2016.
 */
public class DenunciaController extends Controller {

    //Cria uma nova denuncia e salva fotos da denuncia no servidor
    public void novaDenuncia(String dDTOString){

        Gson gson = new Gson();
        DenunciaDTO dDTO = gson.fromJson(dDTOString, DenunciaDTO.class);
        ArrayList<String> listaDeFotos = (ArrayList<String>) dDTO.getListaFotos();
        ArrayList<String> photoPaths = new ArrayList<String>();


        //Mock coordenadas
        Coordenadas c = new Coordenadas();
        c.latitude = -21.232756;
        c.longitude = -44.995004;
        c.save();

        //Adm
        /*Administrador a = Administrador.find("byEmail", "adm@email.com").first();
        if(a==null) {
            a = new Administrador();
            a.email = "adm@email.com";
            a.nome = "Adm";
            a.save();
        }*/

        Cidade cidade = Cidade.find("byNome", "Lavras").first();
        if(cidade==null) {
            cidade.estado = "MG";
            cidade.nome = "Lavras";
            cidade.save();
        }
        /*
        Vereador vereador = Vereador.find("byEmail", "vereador1@email.com").first();
        if(vereador==null) {
            vereador.cidade=cidade;
            vereador.nome = "Vereador 1";
            vereador.dataCadastro = new Date();
            vereador.email = "vereador1@email.com";
            vereador.criadoPor = a;
            vereador.save();
        }*/

        Denuncia d = dDTO.getDenuncia();
        d.mensagem = "Mensagem";
        d.relatorio = "Relatorio";
        //d.vereador = vereador;
        d.coordenadas = c;
        d.save();

        //salvando fotos
        for(int i = 0; i<listaDeFotos.size(); i++){
            byte[] decoded = org.apache.commons.codec.binary.Base64.decodeBase64(listaDeFotos.get(i).getBytes());
            try {
                InputStream in2 = new ByteArrayInputStream(decoded);
                BufferedImage bImageFromConvert = ImageIO.read(in2);
                ImageIO.write(bImageFromConvert, "png", new File(Play.applicationPath+"/public/denounce_image/" + d.id + "_" + i + ".png"));
                photoPaths.add(Play.applicationPath+"/public/denounce_image/" + i + ".png");
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        Logger.info("Sucesso incluindo denuncia!");
        renderJSON(d);
    }

    public void minhasDenuncias(String idUsuario){
        ArrayList<Denuncia> denunciasUsuario = (ArrayList) Denuncia.find("byCidadao_id", idUsuario).fetch();
        if(denunciasUsuario == null){
            renderJSON(new String("Usuário não tem denuncias!"));
        } else {
            int count = denunciasUsuario.size();
            MinhasDenunciasDTO minhasDenunciaDTO = new MinhasDenunciasDTO(denunciasUsuario, count);
            renderJSON(minhasDenunciaDTO);
        }
    }
}
