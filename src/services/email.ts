import axios from "axios";
<<<<<<< HEAD

=======
>>>>>>> 75d9b087d785683f4cb878bfc5e8b5fd49c105a6
require("dotenv").config();

export async function SendConfirmationEmail(
  destination: string,
  name: string,
  code: string
): Promise<boolean> {
<<<<<<< HEAD
  try {
    const response = await axios.post(
=======
  const response = await axios
    .post(
>>>>>>> 75d9b087d785683f4cb878bfc5e8b5fd49c105a6
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
        subject: "Hello world",
        htmlContent: `<html><head></head><body><p>Hello,</p>Esse e um email de confirmacao de cadastro. Segue o codigo de confirmacao ${code}</p></body></html>`,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_PASSWORD || "",
          "content-type": "application/json",
        },
      }
    );

    // Assuming a successful response indicates success
    return response.status === 200;
  } catch (error) {
    // Handle errors and return false
    console.error("Error sending confirmation email:", error);
    return false;
  }
}
