import { FenextResponse } from "../responses/fenextResponse";

interface IUserController {
  setFavoriteFranchise(id: string, header: any): Promise<FenextResponse>;
}

export default IUserController;
