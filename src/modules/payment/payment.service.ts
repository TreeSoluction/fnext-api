import { Injectable, Res } from "@nestjs/common";
import { createStartupDTO } from "src/dto/create/createStartupDTO";
import MercadoPagoConfig, {
  Payment,
  CardToken,
  CustomerCard,
  Invoice,
  Customer,
} from "mercadopago";
import axios from "axios";
import { cardDto } from "src/dto/payment/cardDto";
import { buyerDto } from "src/dto/payment/buyerDto";
import { EOperations } from "src/enums/operationsResults/EOperations";

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
    amount: number,
    cardData: cardDto,
    buyerData: buyerDto
  ): Promise<any> {
    try {
      axios
        .post(
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
              Authorization: `Bearer ${this.config.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          const payment = new Payment(this.config);
          payment
            .create({
              body: {
                description: "Pro Plan Fenext",
                installments: 1,
                issuer_id: 25,
                payer: {
                  email: buyerData.email,
                },
                payment_method_id: "visa",
                token: res.data.id,
                transaction_amount: amount,
              },
            })
            .then((res) => {
              console.log(res);
              return res;
            })
            .catch((err) => {
              return EOperations.FAIL;
            });
        })
        .catch();
    } catch (error) {
      return EOperations.FAIL;
    }
  }
}
