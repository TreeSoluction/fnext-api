import { Injectable } from "@nestjs/common";
import axios from "axios";
import { SendConfirmationEmailDTO } from "src/dto/email/sendConfirmationEmailDTO";

@Injectable()
export class EmailService {
  async SendEmail(dto: SendConfirmationEmailDTO) {
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
              email: dto.DestinationEmail,
              name: dto.DestinationName,
            },
          ],
          subject: "Confirmacao de Email",
          htmlContent: `<html><head></head><body><p>Ola ${dto.DestinationName},</p>Esse e um email de confirmacao de cadastro. Segue o codigo de confirmacao ${dto.Code}</p></body></html>`,
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
