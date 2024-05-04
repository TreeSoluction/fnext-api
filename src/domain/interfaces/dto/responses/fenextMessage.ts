import { EOperations } from "src/enums/operationsResults/EOperations";

export class FenextMessage {
  constructor(
    public errorCode: EOperations,
    public message: string
  ) {
    this.errorCode = errorCode;
    this.message = message;
  }
}
