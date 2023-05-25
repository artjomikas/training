import { IReview } from "../domain/IReview";
import { BaseEntityService } from "./BaseEntityService";

export class CommentService extends BaseEntityService<IReview> {
    constructor(){
        super('v1/Comments');
    }

    async removeComment(id: string): Promise<any | undefined> {
        try {
          const response = await this.axios.delete<any>("/" + id, );
    
          if (response.status === 200) {
            return response.data;
          }
    
          return undefined;
        } catch (e) {
          console.log("error: ", (e as Error).message);
          return undefined;
        }
      }
}
