import { FenextResponse } from "./dto/responses/fenextResponse";

interface IController {
  register(dto: Dto): Promise<FenextResponse>;
  getAll(page?: number, countPerPage?: number): Promise<FenextResponse>;
  getById(id: string): Promise<FenextResponse>;
  delete(id: string): Promise<FenextResponse>;
}

export default IController;
