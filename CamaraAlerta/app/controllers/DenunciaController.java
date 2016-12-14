package controllers;

import com.google.gson.Gson;
import dto.DenunciaDTO;
import models.Cidadao;
import models.Denuncia;
import play.Logger;
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
        for(int i = 0; i<listaDeFotos.size(); i++){
            byte[] decoded = org.apache.commons.codec.binary.Base64.decodeBase64(listaDeFotos.get(i).getBytes());
            try {
                InputStream in2 = new ByteArrayInputStream(decoded);
                BufferedImage bImageFromConvert = ImageIO.read(in2);
                ImageIO.write(bImageFromConvert, "png", new File("d:/imageFromServer" + i + ".png"));
                photoPaths.add("d:/imageFromServer" + i + ".png");
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        Denuncia d = dDTO.getDenuncia();
        d.fotos = photoPaths;
        Logger.info("Sucesso incluindo denuncia!");
        renderJSON(d);
    }
}
