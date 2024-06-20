import { Injectable } from "@nestjs/common";
import axios from "axios";
import { log } from "console";
import MercadoPagoConfig, {
  Payment,
  CustomerCard,
  Customer,
  CardToken,
} from "mercadopago";
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
      let customersQuery = await this.listCustomers();
      console.log(customersQuery.results[0]);

      this.addCardToCustomer(customersQuery.results[0].id);
    } catch (exception) {}
  }

  async addCardToCustomer(customerId: string): Promise<any> {
    const customer = new Customer(this.config);
    const cardTokenManager = new CardToken(this.config);

    // const token = await this.generateCardToken({
    //   card_number: "4235647728025682",
    //   expiration_month: 11,
    //   expiration_year: 25,
    //   security_code: "123",
    //   cardholder_identification_type: "nome",
    //   cardholder_identification_number: "123123123123",
    // });

    // const cardToken = cardTokenManager.create();

    const card = new CustomerCard(this.config);
  }

  async listCustomers(): Promise<any> {
    try {
      const customer = new Customer(this.config);
      return await customer.search();
    } catch (exception) {}
  }

  async generateCardToken(cardData: any): Promise<any> {
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
            Authorization: `Bearer TEST-4850281787796350-031120-5dbdb6b48b89bd11ce6ac0f7189f079f-330672726`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        return res.data.id;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // async createPayment(
  //   cardData: cardDto,
  //   userEmail: string,
  //   planNumber: number
  // ): Promise<any> {
  //   try {
  //     var cardToken = await this.generateCardToken(cardData);
  //     console.log(cardToken);

  //     const payment = new Payment(this.config);
  //     payment
  //       .create({
  //         body: {
  //           description:
  //             planNumber == 1
  //               ? "Professional Business Plan"
  //               : "Big Business Plan",
  //           installments: 1,
  //           issuer_id: 25,
  //           payer: {
  //             email: userEmail,
  //           },
  //           payment_method_id: "visa",
  //           token: cardToken,
  //           transaction_amount: planNumber == 1 ? 49.9 : 89.9,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         return res;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         return EOperations.FAIL;
  //       });
  //   } catch (error) {
  //     console.log(error);
  //     return EOperations.FAIL;
  //   }
  // }

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
}
