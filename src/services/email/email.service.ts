import axios from "axios";

require("dotenv").config();

export class EmailService {
  async sendConfirmationEmail(
    destination: String,
    name: String,
    code: String
  ): Promise<boolean> {
    try {
      const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: "FENEXT",
            email: "fenext2023@gmail.com",
          },
          to: [
            {
              email: destination,
              name: name,
            },
          ],
          subject: "Confirmacao de Email",
          htmlContent: `<html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Email Marketing</title>
            <style>
             /*ss*/
              @font-face {
                  font-family: 'Arimo';
                  src: url('font/Arimo-VariableFont_wght.ttf') format('truetype');
                  
              }
          /* Estilo para a div com borda preta */
          .borda-preta {
                      border: 1px solid rgb(34, 8, 150); /* Adiciona uma borda preta de 1px */
                      padding: 5px; /* Adiciona um espaçamento interno de 10px (opcional) */
                  }
           </style>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Arimo', sans-serif; " >
            <main style="background-color: #f5f3f3; padding: 20px;">
            <table text align ="center" border="0" cellpadding="0" cellspacing="0" width="600">
          
              <tr>
                <td  style="padding: 20px; background-color: #ffffff">
                  
                 
               <img src="https://i.imgur.com/U1gQbh3.png" alt="banner" style="border-radius: 15px;margin: 10px 10px 10px 10px;">
                <div style="margin: 9px 10px 10px 39px;padding: 10px 10px 10px;color: rgb(83, 83, 83); font-size: 1.125em;">
                  <p style="line-height:1.75em">
                     Olá, ${name}! 
                    <br> 
                     tudo bem?
                    </p>
                    <p>
          Para garantirmos mais segurança em sua conta,<strong> precisamos validar o seu endereço e-mail.</strong>        
                      </p>
                   <br>
                   
                    <h3 style="color: black; text-align: center;">Seu código de verificação por e-mail</h3>
               <p style="color:black;font-size: small;margin:1.2em 0;line-height:1.75em; text-align: center;">Insira esse código na tela de verificação de identidade:</p>
          
                            <!--codigo de verifição-->
          
                            
          
                             
              <div class="borda-preta">
                <h3 style="color: rgb(15, 15, 15); text-align: center;">${code}</h3>
            </div>
          
           <br>
                 <p style="text-align: justify;margin: 1px 22px 1px 1px;">
                  <strong>Atente-se aos golpes! A Fenext não vai solicitar a autorização de um novo dispositivo por outros meios além deste e-mail. </strong>
               </p>
               </div>
              </td>
              </tr>
              
              <tr>
                <td style="padding: 20px; background-color: rgb(226, 226, 226);">
                  <p><p style="text-align: center;">Caso haja alguma dúvida, estamos à disposição para ajudar </p><p style="text-align: center;">atraves dos canais:</p> <p style="text-align: center;"> Via WhatsApp <a href="#">+55 51 2160-9600</a> <br>
          
          
                    ou no e-mail: <a href="#">contato@Fenext.com.br</a> <br>
                
                
                    Lembre-se de fornecer informações importantes.</p>
                </td>
              </tr>
              <tr>
                <td  style="padding: 20px; color: #ffffff; background-color: rgba(6, 6, 116, 0.966);">
                  <p style="text-align: center; color: rgb(255, 255, 255);"><a href="#">Politica de privacidade</a></p>
                  <p style="text-align: center;">© 2023 Fenext. Todos os direitos reservados.</p>
                </td>
              </tr>
            </table>
          </main>
          </body>
          </html>`,
        },
        {
          headers: {
            accept: "application/json",
            "api-key": process.env.BREVO_PASSWORD || "",
            "content-type": "application/json",
          },
        }
      );

      return response.status === 200;
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      return false;
    }
  }
}
