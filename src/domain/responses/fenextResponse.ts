import { FenextMessage } from "./fenextMessage";

export class FenextResponse {
  constructor(
    public messages: FenextMessage[],
    public data: any
  ) {
    this.messages = messages;
    this.data = data;
  }
}
