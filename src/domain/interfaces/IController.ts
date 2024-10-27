import { FenextResponse } from "../responses/fenextResponse";

interface IController {
  register(dto: any): Promise<FenextResponse>;
  getAll(page?: number, countPerPage?: number): Promise<FenextResponse>;
  getById(id: string): Promise<FenextResponse>;
}

export default IController;
