import { Injectable, Res } from "@nestjs/common";
import { createStartupDTO } from "src/dto/commands/create/createStartupDTO";
import MercadoPagoConfig, {
  Payment,
  CardToken,
  CustomerCard,
  Invoice,
  Customer,
  PreApproval,
} from "mercadopago";
import axios from "axios";
import { cardDto } from "src/dto/commands/payment/cardDto";
import { buyerDto } from "src/dto/commands/payment/buyerDto";
import { EOperations } from "src/enums/operationsResults/EOperations";
import { Subscription } from "rxjs";
import { log } from "console";

@Injectable()
export class PaymentService {
  private config: MercadoPagoConfig;

  constructor() {
    this.config = new MercadoPagoConfig({
      accessToken:
        "TEST-4850281787796350-031120-5dbdb6b48b89bd11ce6ac0f7189f079f-330672726",
    });
  }

  async createCardToken(): Promise<any> {
    try {
      const customer = new Customer(this.config);
      const body = {
        email: "mataveli91@gmail.com",
      };

      customer.get({ customerId: "1666728346-2JB8xj9okgbLzD" }).then((res) => {
        const customerCard = new CustomerCard(this.config);

        customerCard
          .create({
            customerId: res.id,
            body: { token: "1666728346-2JB8xj9okgbLzD" },
          })
          .then((result) => console.log(result))
          .catch(console.log);

        // const cardToken = new CardToken(this.config);
        // cardToken
        //   .create({
        //     body: {
        //       card_id: "",
        //       customer_id: "1666728346-2JB8xj9okgbLzD",
        //       security_code: "123",
        //     },
        //   })
        //   .then(console.log);

        // return res;
      });
    } catch (exception) {}
  }

  async createPayment(
    cardData: cardDto,
    userEmail: string,
    planNumber: number
  ): Promise<any> {
    try {
      var cardToken = await this.generateCardToken(cardData);
      console.log(cardToken);

      const payment = new Payment(this.config);
      payment
        .create({
          body: {
            description:
              planNumber == 1
                ? "Professional Business Plan"
                : "Big Business Plan",
            installments: 1,
            issuer_id: 25,
            payer: {
              email: userEmail,
            },
            payment_method_id: "visa",
            token: cardToken,
            transaction_amount: planNumber == 1 ? 49.9 : 89.9,
          },
        })
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((err) => {
          console.log(err);
          return EOperations.FAIL;
        });
    } catch (error) {
      console.log(error);
      return EOperations.FAIL;
    }
  }

  // async subscribeToPlan(
  //   cardData: cardDto,
  //   userEmail: string,
  //   planNumber: number
  // ): Promise<any> {
  //   try {
  //     var cardToken = await this.generateCardToken(cardData);
  //     if (cardToken === EOperations.FAIL) {
  //       return EOperations.FAIL;
  //     }
  //     const plan = new PreApproval(this.config);
  //     console.log(cardToken);
  //     plan
  //       .create({
  //         body: {
  //           auto_recurring: {
  //             frequency: 1,
  //             frequency_type: "months",
  //             start_date: new Date().toISOString(),
  //             end_date: (() => {
  //               var actualDate = new Date();
  //               actualDate.setFullYear(actualDate.getFullYear() + 1);
  //               return actualDate.toISOString();
  //             })(),
  //             transaction_amount: planNumber == 1 ? 50 : 90,
  //             currency_id: "BRL",
  //           },
  //           back_url: "https://youtube.com.br",
  //           card_token_id: cardToken,
  //           payer_email: userEmail,
  //           reason:
  //             planNumber == 1
  //               ? "Professional Business Plan"
  //               : "Big Business Plan",
  //           status: "authorized",
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         return res;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         return err;
  //       });
  //   } catch (error) {
  //     console.log(error);
  //     return EOperations.FAIL;
  //   }
  // }

  async generateCardToken(cardData: cardDto): Promise<any> {
    var token = await axios.post(
      "https://api.mercadopago.com/v1/card_tokens",
      {
        card_number: cardData.card_number,
        expiration_month: cardData.expiration_month,
        expiration_year: cardData.expiration_year,
        security_code: cardData.security_code,
        cardholder: {
          identification: {
            type: cardData.cardholder_identification_type,
            number: cardData.cardholder_identification_number,
          },
          name: cardData.card_number,
        },
      },
      {
        headers: {
          Authorization: `Bearer TEST-4850281787796350-031120-5dbdb6b48b89bd11ce6ac0f7189f079f-330672726`,
          "Content-Type": "application/json",
        },
      }
    );
    return token.data.id;
  }
}
