export class SendConfirmationEmailDTO {
  constructor(
    destinationEmail: string,
    senderEmail: string,
    code: string,
    destinationName: string
  ) {
    this.DestinationEmail = destinationEmail;
    this.SenderEmail = senderEmail;
    this.Code = code;
    this.DestinationName = destinationName;
  }

  DestinationEmail: string;
  DestinationName: string;
  SenderEmail: string;
  Code: string;
}
