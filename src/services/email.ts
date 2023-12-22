import axios from "axios";

require("dotenv").config();

export async function SendConfirmationEmail(
  destination: string,
  name: string,
  code: string
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
        htmlContent: `<html><head></head><body><p>Ola ${name},</p>Esse e um email de confirmacao de cadastro. Segue o codigo de confirmacao ${code}</p></body></html>`,
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
