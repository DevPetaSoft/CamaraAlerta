package utils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

/**
 * Created by gudominguete on 10/02/17.
 */
public class EmailUtils {

    public static void enviarEmail(String emailRecebedor, String subject, String corpoDoTexto){
        Properties props = new Properties();
        /** Parâmetros de conexão com servidor Gmail */
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "465");

        Session session = Session.getDefaultInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication()
                    {
                        return new PasswordAuthentication("noreply.venit@gmail.com", "noreplyvenit");
                    }
                });

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("noreply.venit@gmail.com")); //Remetente

            Address[] toUser = InternetAddress //Destinatário(s)
                    .parse(emailRecebedor);

            message.setRecipients(Message.RecipientType.TO, toUser);
            message.setSubject(subject);//Assunto
            message.setText(corpoDoTexto);
            /**Método para enviar a mensagem criada*/
            Transport.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException(e);

        }
    }
}
