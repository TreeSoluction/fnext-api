import { FenextResponse } from "../responses/fenextResponse";

interface IController {
  getAll(page?: number, countPerPage?: number): Promise<FenextResponse>;
}

export default IController;
